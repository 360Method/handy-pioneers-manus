#!/usr/bin/env tsx
/**
 * generate-static-pages.ts - the "getting found" build step.
 *
 * Most AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot) never execute
 * JavaScript, so the SPA's content is invisible to them. This script runs
 * AFTER `vite build` and emits real HTML from the same data modules the SPA
 * renders, so crawlers and users see identical content (no cloaking):
 *
 *   dist/public/_prerendered/<route>.html
 *     - Tier 1 (blog posts, /blog, /faq): route-specific <head> plus the
 *       full article/FAQ content rendered as semantic HTML inside #root.
 *       React replaces it with the identical component tree on load.
 *     - Tier 2 (every other public marketing route): route-specific <head>
 *       only; body is the untouched SPA shell.
 *   dist/public/llms.txt        - AI-crawler site guide (llmstxt.org format)
 *   dist/public/llms-full.txt   - full public narrative in one fetch
 *   dist/public/feed.xml        - RSS, all published posts, non-www URLs
 *
 * Express (server/index.ts) serves _prerendered files at the canonical
 * URLs before the SPA catch-all. Checkout/confirmation/offer/funnel routes
 * are never generated here and keep the plain SPA behavior.
 *
 * Single sources of truth (never duplicate content in this file):
 *   blog posts  client/src/lib/blog.ts
 *   FAQ         client/src/lib/faq.ts
 *   page meta   client/src/lib/pageMeta.ts
 *   tiers       client/src/lib/tiers.ts   (public names/prices/features only)
 *   projects    client/src/lib/projects.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";

import { blogPosts, getPublishedPosts, type BlogPost, type BlogBlock } from "../client/src/lib/blog";
import { faqs, FAQ_JSONLD } from "../client/src/lib/faq";
import { PAGE_META, type PageMeta } from "../client/src/lib/pageMeta";
import { TIERS } from "../client/src/lib/tiers";
import { projects } from "../client/src/lib/projects";
import { SERVICE_AREA_CITIES, SERVICE_AREA_LABEL } from "../client/src/lib/serviceArea";

const ROOT = resolve(process.cwd());
const SITE = "https://handypioneers.com";
const SITE_NAME = "Handy Pioneers";
const PHONE = "(360) 838-6731";
const EMAIL = "help@handypioneers.com";
const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/og-image_c4d500b1.jpg";

const DIST_PUBLIC = resolve(ROOT, "dist/public");
const SHELL_PATH = resolve(DIST_PUBLIC, "index.html");
const OUT_DIR = resolve(DIST_PUBLIC, "_prerendered");

// ─── helpers ────────────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function writeOut(relPath: string, html: string) {
  const file = resolve(OUT_DIR, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html, "utf8");
}

/** Strip the shell's baseline head tags so route-specific ones replace them. */
function stripBaselineHead(shell: string): string {
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description"[^>]*\/?>/g, "")
    .replace(/<link rel="canonical"[^>]*\/?>/g, "")
    .replace(/<meta name="robots"[^>]*\/?>/g, "")
    .replace(/<meta property="og:[^"]*"[^>]*\/?>/g, "")
    .replace(/<meta name="twitter:[^"]*"[^>]*\/?>/g, "");
}

interface HeadData {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  image?: string;
  publishedTime?: string;
  author?: string;
  jsonLd?: object[];
}

function headBlock(h: HeadData): string {
  const canonical = `${SITE}${h.path === "/" ? "/" : h.path}`;
  const image = h.image || DEFAULT_OG_IMAGE;
  const lines = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="index,follow" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${h.ogType || "website"}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ];
  if (h.publishedTime)
    lines.push(`<meta property="article:published_time" content="${h.publishedTime}" />`);
  if (h.author) lines.push(`<meta property="article:author" content="${esc(h.author)}" />`);
  for (const block of h.jsonLd || []) {
    lines.push(
      `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`
    );
  }
  return lines.join("\n    ");
}

/** Minimal readable styling for static content shown before React mounts. */
const STATIC_STYLE = `<style>
.hp-static{max-width:46rem;margin:0 auto;padding:2.5rem 1.5rem;font-family:'Source Sans 3',sans-serif;color:#2b2b26;line-height:1.65}
.hp-static h1{font-family:'Playfair Display',serif;font-size:2rem;line-height:1.2;color:#13321f;margin:0 0 1rem}
.hp-static h2{font-family:'Playfair Display',serif;font-size:1.4rem;color:#13321f;margin:2rem 0 .75rem}
.hp-static h3{font-size:1.1rem;color:#13321f;margin:1.5rem 0 .5rem}
.hp-static p,.hp-static li{font-size:1rem;margin:.6rem 0}
.hp-static blockquote{border-left:3px solid #c8922a;margin:1rem 0;padding:.25rem 0 .25rem 1rem;color:#555}
.hp-static .hp-meta{font-size:.85rem;color:#777;margin-bottom:1.5rem}
.hp-static img{max-width:100%;height:auto;border-radius:.5rem}
.hp-static a{color:#13321f}
.hp-static nav{font-size:.9rem;margin-bottom:1rem}
</style>`;

function tier1Page(shell: string, head: HeadData, bodyHtml: string): string {
  let out = stripBaselineHead(shell);
  out = out.replace("</head>", `    ${headBlock(head)}\n    ${STATIC_STYLE}\n  </head>`);
  // Static content sits inside #root; React's render() replaces it with the
  // identical component tree once the bundle loads.
  out = out.replace(
    /<div id="root"><\/div>/,
    `<div id="root"><div class="hp-static"><nav><a href="/">${SITE_NAME}</a> &middot; <a href="/blog">Blog</a> &middot; <a href="/faq">FAQ</a> &middot; <a href="/membership">Membership</a></nav>${bodyHtml}</div></div>`
  );
  return out;
}

function tier2Page(shell: string, head: HeadData): string {
  let out = stripBaselineHead(shell);
  out = out.replace("</head>", `    ${headBlock(head)}\n  </head>`);
  return out;
}

// ─── blog rendering ─────────────────────────────────────────────────────────

function blockToHtml(b: BlogBlock): string {
  switch (b.type) {
    case "h2":
      return `<h2>${esc(b.text || "")}</h2>`;
    case "h3":
      return `<h3>${esc(b.text || "")}</h3>`;
    case "p":
      return `<p>${esc(b.text || "")}</p>`;
    case "blockquote":
      return `<blockquote>${esc(b.text || "")}</blockquote>`;
    case "cite":
      return `<p><em>${esc(b.text || "")}</em></p>`;
    case "ul":
      return `<ul>${(b.items || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    case "ol":
      return `<ol>${(b.items || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ol>`;
    case "cta": {
      const label = b.ctaLabel || "Contact Handy Pioneers";
      const href =
        b.ctaAction === "phone" ? "tel:+13608386731" : b.ctaHref || `${SITE}/#contact`;
      return `<p>${esc(b.text || "")} <a href="${esc(href)}">${esc(label)}</a></p>`;
    }
    default:
      return "";
  }
}

function postBodyHtml(post: BlogPost): string {
  const parts = [
    `<article>`,
    `<h1>${esc(post.title)}</h1>`,
    `<p class="hp-meta">${esc(post.date)} &middot; ${esc(post.author)} &middot; ${esc(post.category)} &middot; ${post.readTime} min read</p>`,
    `<p><em>${esc(post.excerpt)}</em></p>`,
    ...post.body.map(blockToHtml),
  ];
  if (post.references?.length) {
    parts.push(`<h2>References</h2><ol>`);
    for (const r of post.references)
      parts.push(`<li><a href="${esc(r.url)}" rel="noopener">${esc(r.label)}</a></li>`);
    parts.push(`</ol>`);
  }
  parts.push(`</article>`);
  return parts.join("\n");
}

function postJsonLd(post: BlogPost): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.isoDate,
      author: { "@type": "Person", name: "Marcin Micek" },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE },
      image: post.image,
      mainEntityOfPage: `${SITE}/blog/${post.slug}`,
      keywords: post.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
      ],
    },
  ];
}

// ─── main ───────────────────────────────────────────────────────────────────

function main() {
  if (!existsSync(SHELL_PATH)) {
    console.error(`[static-pages] missing ${SHELL_PATH} - run vite build first`);
    process.exit(1);
  }
  const shell = readFileSync(SHELL_PATH, "utf8");
  if (!/<div id="root"><\/div>/.test(shell)) {
    console.error(`[static-pages] shell has no empty <div id="root"></div> - aborting`);
    process.exit(1);
  }

  const published = getPublishedPosts();
  let count = 0;

  // Tier 1: blog posts
  for (const post of published) {
    const head: HeadData = {
      path: `/blog/${post.slug}`,
      title: post.seoTitle || `${post.title} | ${SITE_NAME}`,
      description: post.seoDesc || post.excerpt,
      ogType: "article",
      image: post.image,
      publishedTime: post.isoDate,
      author: post.author,
      jsonLd: postJsonLd(post),
    };
    writeOut(`blog/${post.slug}.html`, tier1Page(shell, head, postBodyHtml(post)));
    count++;
  }

  // Tier 1: blog index
  {
    const meta = PAGE_META.find((m) => m.path === "/blog")!;
    const items = published
      .map(
        (p) =>
          `<li><a href="${SITE}/blog/${p.slug}">${esc(p.title)}</a><br />${esc(p.excerpt)} <span class="hp-meta">(${esc(p.date)})</span></li>`
      )
      .join("\n");
    const body = `<h1>Notes from the Field - The ${SITE_NAME} Blog</h1>\n<p>Homeowner guidance and project write-ups from Clark County, Washington.</p>\n<ul>${items}</ul>`;
    writeOut(`blog.html`, tier1Page(shell, { ...meta, jsonLd: [] }, body));
    count++;
  }

  // Tier 1: FAQ
  {
    const meta = PAGE_META.find((m) => m.path === "/faq")!;
    const sections = faqs
      .map(
        (cat) =>
          `<h2>${esc(cat.category)}</h2>` +
          cat.items.map((i) => `<h3>${esc(i.q)}</h3><p>${esc(i.a)}</p>`).join("")
      )
      .join("\n");
    const body = `<h1>Frequently Asked Questions</h1>\n${sections}`;
    writeOut(`faq.html`, tier1Page(shell, { ...meta, jsonLd: [FAQ_JSONLD] }, body));
    count++;
  }

  // Tier 2: marketing routes (head only)
  const tier2Meta: PageMeta[] = PAGE_META.filter(
    (m) => !["/blog", "/faq"].includes(m.path)
  );
  for (const meta of tier2Meta) {
    const jsonLd: object[] = [];
    if (meta.path === "/") {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE,
      });
    }
    if (meta.path === "/membership") {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "360° Method Membership",
        serviceType: "Proactive home maintenance membership",
        provider: { "@type": "LocalBusiness", name: SITE_NAME, telephone: PHONE, url: SITE },
        areaServed: { "@type": "AdministrativeArea", name: SERVICE_AREA_LABEL },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Membership tiers",
          itemListElement: TIERS.map((t) => ({
            "@type": "Offer",
            name: t.name,
            description: t.tagline,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: t.prices.monthly,
              priceCurrency: "USD",
              unitText: "month, base price for homes under 2,000 sq ft",
            },
          })),
        },
      });
    }
    const file = meta.path === "/" ? "index.html" : `${meta.path.replace(/^\//, "")}.html`;
    writeOut(file, tier2Page(shell, { ...meta, jsonLd }));
    count++;
  }

  // Tier 2: project pages (head only, from projects.ts)
  for (const p of projects) {
    writeOut(
      `project/${p.slug}.html`,
      tier2Page(shell, {
        path: `/project/${p.slug}`,
        title: `${p.title} | ${SITE_NAME}`,
        description: p.excerpt,
        ogType: "article",
      })
    );
    count++;
  }

  // llms.txt + llms-full.txt + feed.xml
  writeFileSync(resolve(DIST_PUBLIC, "llms.txt"), llmsTxt(published), "utf8");
  writeFileSync(resolve(DIST_PUBLIC, "llms-full.txt"), llmsFullTxt(published), "utf8");
  writeFileSync(resolve(DIST_PUBLIC, "feed.xml"), feedXml(published), "utf8");

  console.log(
    `[static-pages] wrote ${count} prerendered pages + llms.txt + llms-full.txt + feed.xml`
  );
}

// ─── llms.txt ───────────────────────────────────────────────────────────────

function llmsTxt(published: BlogPost[]): string {
  const recent = published.slice(0, 10);
  return `# ${SITE_NAME}

> Residential maintenance and restoration contractor in Clark County, Washington (Vancouver, ${SERVICE_AREA_CITIES.filter((c) => c !== "Vancouver").join(", ")}). We help homeowners protect their home's value with the 360° Method: a proactive, documented home-care system delivered through the Proactive Path membership. Licensed and insured (Handy Pioneers LLC, WA). 4.9-star Google rating. Phone ${PHONE}. Email ${EMAIL}.

A homeowner does not need to hire us to benefit: the 360° Method is a framework
anyone can use to stay ahead of home maintenance instead of reacting to failures.

## The 360° Method
- [What the 360° Method is](${SITE}/360-method): assess every major system, document it, and work a prioritized NOW / SOON / WAIT roadmap so small issues never become big losses.
- [Baseline Walkthrough](${SITE}/360-method/walkthrough): a 2-3 hour documented assessment; written report and roadmap within 48 hours.
- [360° Roadmap Generator](${SITE}/roadmap-generator): turn an existing inspection report into a prioritized plan.

## Membership (Proactive Path)
- [Membership tiers](${SITE}/membership): ${TIERS.map((t) => `${t.name} (from $${t.prices.monthly}/mo)`).join(", ")}. Base prices apply to homes under 2,000 sq ft; larger homes are priced by size.

## Answers
- [FAQ](${SITE}/faq): pricing, scheduling, licensing, who does the work, what the 360° Method is and is not.
- [Customer reviews](${SITE}/reviews)
- [About the company](${SITE}/about)

## Recent articles
${recent.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.excerpt}`).join("\n")}

## Full content
- [llms-full.txt](${SITE}/llms-full.txt): the complete public narrative (method, membership, FAQ, article index) in one file.
- [Blog index](${SITE}/blog) | [RSS](${SITE}/feed.xml) | [Sitemap](${SITE}/sitemap.xml)
`;
}

function llmsFullTxt(published: BlogPost[]): string {
  const tierSection = TIERS.map(
    (t) =>
      `### ${t.name} - from $${t.prices.monthly}/month\n${t.tagline}\nVisits: ${t.visits} per year (${t.visitDescription}).\n${t.features.map((f) => `- ${f}`).join("\n")}`
  ).join("\n\n");

  const faqSection = faqs
    .map(
      (cat) =>
        `### ${cat.category}\n` + cat.items.map((i) => `**${i.q}**\n${i.a}`).join("\n\n")
    )
    .join("\n\n");

  const articleIndex = published
    .map((p) => `- ${p.title} (${p.isoDate}) - ${SITE}/blog/${p.slug}\n  ${p.excerpt}`)
    .join("\n");

  return `# ${SITE_NAME} - full site content for AI assistants

${SITE_NAME} is a licensed, insured residential maintenance and restoration
contractor serving ${SERVICE_AREA_LABEL}: ${SERVICE_AREA_CITIES.join(", ")}.
Phone ${PHONE}. Email ${EMAIL}. Website ${SITE}.

## Why homeowners work with us

Most home-repair losses start as small, invisible problems: a slow leak, a
clogged gutter, moss working under shingles. Catching them early costs far
less than repairing the damage after something fails. Our work is
built around one outcome: your home holds its value and nothing slips, without
you having to become an expert or remember any of it.

## The 360° Method

The 360° Method is a proactive home-care framework. It is not a licensed home
inspection and is not a legal document. It works in three moves:

1. AWARE - assess and document the current condition of every major system
   (roof, drainage, envelope, mechanical, interior) in a written baseline.
2. ACT - work a prioritized NOW / SOON / WAIT roadmap, so money goes to what
   protects the home most, first.
3. ADVANCE - keep the record current with seasonal check-ins, so the home's
   documented history grows. A maintained, documented home holds resale value
   and avoids surprise failures.

Any homeowner can run this framework themselves: walk the home twice a year,
write down what you see, sort findings into NOW / SOON / WAIT, and do the NOW
items before the rainy season. Handy Pioneers delivers it done-for-you through
the Proactive Path membership for people who would rather not carry that load.

## Proactive Path membership tiers

Base prices apply to homes under 2,000 sq ft; larger homes are priced by size.
Every tier includes scheduled visits, a documented home record, and member
rates on work beyond the membership scope.

${tierSection}

## Frequently asked questions

${faqSection}

## Article index

${articleIndex}

Full articles are available as HTML at the URLs above.
`;
}

// ─── feed.xml ───────────────────────────────────────────────────────────────

function feedXml(published: BlogPost[]): string {
  const items = published
    .map((p) => {
      const pubDate = new Date(p.isoDate + "T08:00:00Z").toUTCString();
      return `  <item>
    <title>${escXml(p.title)}</title>
    <link>${SITE}/blog/${p.slug}</link>
    <guid isPermaLink="true">${SITE}/blog/${p.slug}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escXml(p.excerpt)}</description>
  </item>`;
    })
    .join("\n");
  const lastBuild = published.length
    ? new Date(published[0].isoDate + "T08:00:00Z").toUTCString()
    : new Date().toUTCString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escXml(`${SITE_NAME} Blog - Proactive Home Care in Clark County, WA`)}</title>
    <link>${SITE}</link>
    <description>Homeowner guidance, project stories, and the 360° Method from ${SITE_NAME} in Clark County, WA.</description>
    <language>en-us</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

main();
