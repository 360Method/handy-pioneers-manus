#!/usr/bin/env node
/**
 * check-site-assets.mjs - does handypioneers.com actually work right now?
 *
 * Walks the live sitemap, fetches every page, pulls out every image, script,
 * stylesheet, icon and social-card URL, and requests all of them. Exits
 * non-zero the moment anything a visitor would see fails to load.
 *
 * Written after 2026-08-26, when a third-party CDN we did not control started
 * answering 403 to all 36 images the site loaded from it. The header logo was
 * blank on every page and the share card was broken, for an unknown number of
 * days, before a human happened to look. Nothing told us. This tells us.
 *
 * Usage:
 *   node scripts/check-site-assets.mjs                     # check production
 *   node scripts/check-site-assets.mjs --base=http://localhost:5000
 *   node scripts/check-site-assets.mjs --max-pages=20      # quick pass
 *   node scripts/check-site-assets.mjs --json              # machine-readable
 *
 * Exit codes: 0 all good, 1 something is broken, 2 the checker itself failed.
 */

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : dflt;
};

const BASE = arg("base", "https://handypioneers.com").replace(/\/$/, "");
const MAX_PAGES = Number(arg("max-pages", "0")) || Infinity;
const AS_JSON = args.includes("--json");
const CONCURRENCY = Number(arg("concurrency", "8"));
const TIMEOUT_MS = Number(arg("timeout", "20000"));

const UA = "HandyPioneers-AssetCheck/1.0 (+https://handypioneers.com)";
const log = (...a) => { if (!AS_JSON) console.log(...a); };

/**
 * Known-noisy URLs that are not ours to fix.
 *
 * /cdn-cgi/ is Cloudflare's edge. Scrape Shield injects an email-decode script
 * tag into the HTML, but the file only exists when the request goes through the
 * edge with that feature active; fetching it directly answers 404 forever. It
 * is not a real breakage and it would fire every single night.
 */
const IGNORE = [/\/cdn-cgi\//];
const ignored = (url) => IGNORE.some((rx) => rx.test(url));

async function fetchWithTimeout(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...opts,
      signal: ctrl.signal,
      headers: { "User-Agent": UA, ...(opts.headers || {}) },
    });
  } finally {
    clearTimeout(t);
  }
}

/** Run tasks through a fixed worker pool. */
async function pool(items, worker, n = CONCURRENCY) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await worker(items[idx], idx);
      }
    })
  );
  return out;
}

// --- discover pages ---------------------------------------------------------

async function getPages() {
  const res = await fetchWithTimeout(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml -> HTTP ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) throw new Error("sitemap.xml parsed but held no <loc> entries");

  // Follow the sitemap's own paths against whatever base we were asked to check,
  // so the same script works against localhost and against production.
  const paths = [];
  for (const u of locs) {
    try {
      const p = new URL(u).pathname;
      if (!paths.includes(p)) paths.push(p);
    } catch {
      /* skip a malformed entry rather than abort the whole run */
    }
  }
  return paths.slice(0, MAX_PAGES).map((p) => `${BASE}${p}`);
}

// --- extract assets from one page -------------------------------------------

const ASSET_PATTERNS = [
  { kind: "img", re: /<img[^>]+src=["']([^"']+)["']/gi },
  { kind: "img", re: /<img[^>]+srcset=["']([^"']+)["']/gi, srcset: true },
  { kind: "source", re: /<source[^>]+srcset=["']([^"']+)["']/gi, srcset: true },
  { kind: "script", re: /<script[^>]+src=["']([^"']+)["']/gi },
  { kind: "style", re: /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi },
  { kind: "icon", re: /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)["']/gi },
  { kind: "og:image", re: /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi },
  { kind: "tw:image", re: /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/gi },
  { kind: "css-url", re: /url\((["']?)(\/[^)"']+\.(?:jpe?g|png|webp|gif|svg))\1\)/gi, group: 2 },
];

function extractAssets(html, pageUrl) {
  const found = new Map();
  for (const p of ASSET_PATTERNS) {
    for (const m of html.matchAll(p.re)) {
      const raw = m[p.group ?? 1];
      if (!raw) continue;
      const candidates = p.srcset
        ? raw.split(",").map((s) => s.trim().split(/\s+/)[0])
        : [raw];
      for (const c of candidates) {
        if (!c || c.startsWith("data:") || c.startsWith("blob:") || c.startsWith("#")) continue;
        let abs;
        try {
          abs = new URL(c, pageUrl).toString();
        } catch {
          continue;
        }
        if (!/^https?:/.test(abs)) continue;
        if (ignored(abs)) continue;
        if (!found.has(abs)) found.set(abs, p.kind);
      }
    }
  }
  return [...found].map(([url, kind]) => ({ url, kind }));
}

// --- extract assets from the JS and CSS bundles ------------------------------

/**
 * The important half of this check.
 *
 * Our prerendered pages carry text and meta tags for crawlers; they contain no
 * <img> markup at all. Every visible image on the site is written by React from
 * a string baked into the JS bundle, which means a page crawl can never see it.
 * The 2026-08-26 outage lived entirely in those baked-in strings.
 *
 * So: read the bundle, pull out every URL that looks like an asset, and check
 * each one. That is the check that would have caught it.
 */
async function getBundleAssets() {
  const res = await fetchWithTimeout(`${BASE}/`, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET / -> HTTP ${res.status}`);
  const shell = await res.text();

  const bundles = [
    ...[...shell.matchAll(/<script[^>]+src=["']([^"']+\.js)["']/gi)].map((m) => m[1]),
    ...[...shell.matchAll(/<link[^>]+href=["']([^"']+\.css)["']/gi)].map((m) => m[1]),
  ]
    .map((u) => {
      try { return new URL(u, `${BASE}/`).toString(); } catch { return null; }
    })
    .filter((u) => u && u.startsWith(BASE));

  if (!bundles.length) throw new Error("no JS or CSS bundle found in the page shell");

  const EXT = "jpe?g|png|webp|gif|svg|avif|pdf|mp4|ico";
  const found = new Map();
  for (const b of bundles) {
    const r = await fetchWithTimeout(b, { redirect: "follow" });
    if (!r.ok) continue;
    const src = await r.text();
    // Absolute URLs on any host, plus root-relative paths on ours.
    for (const m of src.matchAll(new RegExp(`https?://[A-Za-z0-9._~:/?#@!$&'*+,;=%-]+\\.(?:${EXT})\\b`, "gi"))) {
      found.set(m[0], "bundle");
    }
    for (const m of src.matchAll(new RegExp(`["'\`](/[A-Za-z0-9._~/-]+\\.(?:${EXT}))["'\`]`, "gi"))) {
      found.set(`${BASE}${m[1]}`, "bundle");
    }
  }
  return [...found]
    .map(([url, kind]) => ({ url, kind }))
    .filter((a) => !ignored(a.url));
}

// --- check one asset --------------------------------------------------------

const assetCache = new Map();

function checkAsset(url) {
  if (assetCache.has(url)) return assetCache.get(url);
  const p = (async () => {
    try {
      // HEAD first. A fair number of hosts do not implement it, or answer 403
      // to it specifically, so fall back to GET before calling it broken.
      let res = await fetchWithTimeout(url, { method: "HEAD", redirect: "follow" });
      if ([403, 405, 501].includes(res.status)) {
        res = await fetchWithTimeout(url, { method: "GET", redirect: "follow" });
      }
      return { ok: res.ok, status: res.status, type: res.headers.get("content-type") || "" };
    } catch (e) {
      return { ok: false, status: 0, type: "", error: e.name === "AbortError" ? "timeout" : e.message };
    }
  })();
  assetCache.set(url, p);
  return p;
}

// --- main -------------------------------------------------------------------

const started = Date.now();
let pages = [];
try {
  pages = await getPages();
} catch (e) {
  const msg = `[assets] could not read the sitemap: ${e.message}`;
  if (AS_JSON) console.log(JSON.stringify({ ok: false, fatal: msg }));
  else console.error(msg);
  process.exit(2);
}

log(`[assets] ${BASE} - checking ${pages.length} pages`);

const failures = [];
const pageFailures = [];
let assetsChecked = 0;

// Bundle assets first: this is the check that catches a dead hardcoded URL.
let bundleAssets = [];
try {
  bundleAssets = await getBundleAssets();
  log(`[assets] ${bundleAssets.length} assets referenced from the JS/CSS bundles`);
} catch (e) {
  // Not fatal on its own, but it means the most important check did not run,
  // so say so loudly rather than reporting a clean pass.
  pageFailures.push({ page: `${BASE}/ (bundle scan)`, status: 0, error: e.message });
}

await pool(bundleAssets, async ({ kind, url }) => {
  const r = await checkAsset(url);
  assetsChecked++;
  if (!r.ok) failures.push({ page: `${BASE}/ (bundle)`, kind, url, status: r.status, error: r.error });
});

await pool(
  pages,
  async (pageUrl) => {
    let html;
    try {
      const res = await fetchWithTimeout(pageUrl, { redirect: "follow" });
      if (!res.ok) {
        pageFailures.push({ page: pageUrl, status: res.status });
        return;
      }
      html = await res.text();
    } catch (e) {
      pageFailures.push({ page: pageUrl, status: 0, error: e.message });
      return;
    }

    const assets = extractAssets(html, pageUrl);
    await pool(assets, async ({ kind, url }) => {
      const r = await checkAsset(url);
      assetsChecked++;
      if (!r.ok) {
        failures.push({ page: pageUrl, kind, url, status: r.status, error: r.error });
        return;
      }
      // A host that serves index.html where a .js or an image should be is a
      // silent 200 that breaks the page just as thoroughly as a 404 does.
      const path = new URL(url).pathname;
      if (/\.(jpe?g|png|webp|gif|svg|js|css|pdf)$/i.test(path) && r.type.startsWith("text/html")) {
        failures.push({
          page: pageUrl, kind, url, status: r.status,
          error: "served text/html, expected a real file",
        });
      }
    });
  },
  4
);

const elapsed = ((Date.now() - started) / 1000).toFixed(1);

// Group by asset so one dead logo does not print itself 122 times.
const byAsset = new Map();
for (const f of failures) {
  if (!byAsset.has(f.url)) byAsset.set(f.url, { ...f, pages: [] });
  byAsset.get(f.url).pages.push(f.page);
}
const grouped = [...byAsset.values()].sort((a, b) => b.pages.length - a.pages.length);

const summary = {
  ok: grouped.length === 0 && pageFailures.length === 0,
  base: BASE,
  pagesChecked: pages.length,
  assetReferences: assetsChecked,
  uniqueAssets: assetCache.size,
  elapsedSeconds: Number(elapsed),
  brokenPages: pageFailures,
  brokenAssets: grouped.map((g) => ({
    url: g.url,
    kind: g.kind,
    status: g.status,
    error: g.error,
    affectedPages: g.pages.length,
    example: g.pages[0],
  })),
};

if (AS_JSON) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  log(`[assets] ${assetsChecked} references across ${assetCache.size} unique assets in ${elapsed}s`);
  if (pageFailures.length) {
    console.error(`\n[assets] ${pageFailures.length} PAGE(S) FAILED TO LOAD:`);
    for (const p of pageFailures) console.error(`  ${p.status || p.error}  ${p.page}`);
  }
  if (grouped.length) {
    console.error(`\n[assets] ${grouped.length} BROKEN ASSET(S):`);
    for (const g of grouped) {
      console.error(`  ${g.status || g.error}  [${g.kind}]  ${g.url}`);
      console.error(`        on ${g.pages.length} page(s), e.g. ${g.pages[0]}`);
    }
  }
  if (summary.ok) log("\n[assets] OK - every page and every asset resolved.");
}

process.exit(summary.ok ? 0 : 1);
