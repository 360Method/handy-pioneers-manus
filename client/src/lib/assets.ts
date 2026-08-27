/**
 * assets.ts - every image, logo and document the site depends on, and where it
 * lives on our own origin.
 *
 * The rule: nothing in here points at a third-party host. If you are adding an
 * image, put the file under client/public/ and reference it from this file. Do
 * not paste a remote URL into a component.
 *
 * Why the rule exists. The site used to load its logo, hero art, Open Graph
 * card, owner photography and the whole Before/After gallery from Manus's
 * CloudFront bucket. On 2026-08-26 that bucket began answering 403 AccessDenied
 * to every request and all 36 assets went blank at once, including the header
 * logo on every page and the social share card. You cannot re-open someone
 * else's bucket, and there is no version of that failure we could have fixed
 * remotely. So we host the pixels we depend on.
 *
 * Companion: client/src/components/SafeImg.tsx collapses an image that fails
 * anyway, so a bad src can never render as a broken-image icon on a page a
 * client is looking at. scripts/check-site-assets.mjs walks the live site every
 * night and fails loudly if any of this stops resolving.
 *
 * Brand copy (the positioning paragraph, pillars, vocabulary) is a different
 * concern and lives in brand.ts.
 */

// ── Logo ─────────────────────────────────────────────────────────────────────

/** Wordmark and seal in brown line art. Use on light backgrounds. */
export const LOGO = "/brand/hp-logo.png";

/** The same mark in cream. Use on the dark green backgrounds (footer, About). */
export const LOGO_LIGHT = "/brand/hp-logo-light.png";

/** Absolute, for JSON-LD structured data. Google wants an absolute URL. */
export const LOGO_ABSOLUTE = "https://handypioneers.com/brand/hp-logo.png";

// ── Social ───────────────────────────────────────────────────────────────────

/** 1200x630 Open Graph and Twitter card. Absolute, because scrapers need it. */
export const OG_IMAGE = "https://handypioneers.com/brand/og-image.jpg";

// ── Site art ─────────────────────────────────────────────────────────────────

/**
 * Generated once by scripts/generate-brand-images.mjs and committed. These are
 * atmosphere, never evidence of a specific job: real work photos are shot on
 * real jobs and live under /images/ with a date in the filename.
 */
export const HERO_BG = "/images/site/hero-bg.webp";
export const CTA_BG = "/images/site/cta-bg.webp";
export const METHOD_TRANSFORMATION = "/images/site/method-transformation.webp";
export const REFERRAL_BANNER = "/images/site/referral-banner.webp";

export const PHASE_IMAGES = {
  aware: "/images/site/method-aware.webp",
  act: "/images/site/method-act.webp",
  advance: "/images/site/method-advance.webp",
} as const;

// ── Owner photography ────────────────────────────────────────────────────────

/** Real photographs of Marcin. Never generated, never stock. */
export const MARCIN_PHOTO = "/images/team/marcin-micek.jpg";
export const MARCIN_AVATAR = "/images/team/marcin-micek-avatar.jpg";

// ── Product mockups and documents ────────────────────────────────────────────

/** Pages lifted from the sample 360 roadmap, used as product mockups. */
export const REPORT_MOCKUP = "/images/roadmap-sample/stewardship-cover.webp";
export const HOME_SCORE_IMG = "/images/roadmap-sample/stewardship-score.webp";

/** The downloadable sample roadmap. */
export const ROADMAP_SAMPLE_PDF = "/sample/360-roadmap-sample.pdf";
