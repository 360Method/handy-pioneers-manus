#!/usr/bin/env node
/**
 * Generates client/public/sitemap.xml from:
 *   - A fixed list of static routes.
 *   - Dynamic /blog/:slug routes from client/src/lib/blog.ts (published only).
 *   - Dynamic /project/:slug routes from client/src/lib/projects.ts.
 *
 * We rip the `slug:` lines out of each file with a simple regex so we
 * don't need to transpile TS.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const SITE = "https://handypioneers.com";
const OUT = resolve(ROOT, "client/public/sitemap.xml");

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/reviews", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/membership", changefreq: "monthly", priority: "0.9" },
  { path: "/priority-translation", changefreq: "monthly", priority: "0.8" },
  { path: "/360-method", changefreq: "monthly", priority: "0.8" },
  { path: "/360-method/walkthrough", changefreq: "monthly", priority: "0.6" },
  { path: "/360-method/translation", changefreq: "monthly", priority: "0.6" },
  { path: "/360-method/referral", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.3" },
];

function extractSlugs(filePath) {
  const raw = readFileSync(filePath, "utf8");
  const rx = /slug:\s*"([^"]+)"/g;
  const slugs = [];
  let m;
  while ((m = rx.exec(raw)) !== null) slugs.push(m[1]);
  return slugs;
}

function extractPublishedBlogSlugs(filePath) {
  const raw = readFileSync(filePath, "utf8");
  const records = raw.split(/\n\s*\{\n/).slice(1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const out = [];
  for (const block of records) {
    const slugMatch = block.match(/slug:\s*"([^"]+)"/);
    const pubMatch = block.match(/publishDate:\s*"(\d{4}-\d{2}-\d{2})"/);
    const isoMatch = block.match(/isoDate:\s*"([^"]+)"/);
    if (!slugMatch) continue;
    if (pubMatch) {
      const d = new Date(pubMatch[1] + "T00:00:00Z");
      if (d > today) continue;
    }
    out.push({ slug: slugMatch[1], lastmod: isoMatch ? isoMatch[1] : null });
  }
  return out;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlTag({ loc, lastmod, changefreq, priority }) {
  const lines = [`  <url>`, `    <loc>${escapeXml(loc)}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) lines.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) lines.push(`    <priority>${priority}</priority>`);
  lines.push(`  </url>`);
  return lines.join("\n");
}

const today = new Date().toISOString().split("T")[0];
const entries = [];

for (const r of STATIC_ROUTES) {
  entries.push({
    loc: SITE + r.path,
    lastmod: today,
    changefreq: r.changefreq,
    priority: r.priority,
  });
}

const blogPath = resolve(ROOT, "client/src/lib/blog.ts");
const projectPath = resolve(ROOT, "client/src/lib/projects.ts");

for (const b of extractPublishedBlogSlugs(blogPath)) {
  entries.push({
    loc: `${SITE}/blog/${b.slug}`,
    lastmod: b.lastmod || today,
    changefreq: "monthly",
    priority: "0.7",
  });
}

for (const slug of extractSlugs(projectPath)) {
  entries.push({
    loc: `${SITE}/project/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.6",
  });
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries.map(urlTag).join("\n") +
  `\n</urlset>\n`;

writeFileSync(OUT, xml, "utf8");
console.log(`[sitemap] wrote ${entries.length} urls \u2192 ${OUT}`);
