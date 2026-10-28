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

/** Real job: a living room before and after. Also in the homepage gallery. */
export const LIVING_ROOM_BEFORE_AFTER = "/images/hero-gallery/ryLhHcoLDKcrOody.jpg";

/**
 * The 360 Method roadmap. Copied from HP-Estimator-app by
 * scripts/sync-360-method.mjs together with the component that renders it
 * (client/src/components/method/ThreeSixtyRoadmap.tsx) and the canon
 * (client/src/lib/methodCanon.ts). Never edited here.
 */
export const METHOD_ROADMAP_PNG = "/brand/360-method/360-roadmap.png";
export const METHOD_ROADMAP_OG = "/brand/360-method/360-roadmap-og.png";
export const METHOD_ROADMAP_PDF = "/brand/360-method/360-roadmap-letter.pdf";

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

// ── 360 Method step crops ────────────────────────────────────────────────────

/**
 * Crops of the roadmap artwork, one per step panel and one per phase band,
 * generated in HP-Estimator-app (scripts/generate-method-crops.ts from
 * crops.json) and copied here by scripts/sync-360-method.mjs. Never redrawn,
 * never recoloured. The version suffix changes when the master changes, so
 * the CDN never serves a stale crop under an old name.
 */
export type MethodStepKey =
  | "baseline" | "inspect" | "track"
  | "prioritize" | "schedule" | "execute"
  | "preserve" | "upgrade" | "scale";
export type MethodPhaseKey = "aware" | "act" | "advance";

const CROPS = "/brand/360-method/crops";
const STEP_FILE: Record<MethodStepKey, string> = {
  baseline: "step-01-baseline",
  inspect: "step-02-inspect",
  track: "step-03-track",
  prioritize: "step-04-prioritize",
  schedule: "step-05-schedule",
  execute: "step-06-execute",
  preserve: "step-07-preserve",
  upgrade: "step-08-upgrade",
  scale: "step-09-scale",
};
const PHASE_FILE: Record<MethodPhaseKey, string> = {
  aware: "phase-1-aware",
  act: "phase-2-act",
  advance: "phase-3-advance",
};
const CROP_VERSION = "v2";

function pick<K extends string>(map: Record<K, string>, output: string, ext: string): Record<K, string> {
  const out = {} as Record<K, string>;
  for (const k of Object.keys(map) as K[]) out[k] = `${CROPS}/${map[k]}.${output}.${CROP_VERSION}.${ext}`;
  return out;
}

/** The illustrated step panel, cut from the artwork (2x; WebP made by the sync from the PNG). */
export const METHOD_STEP_PANEL = pick(STEP_FILE, "panel", "webp");
/** 1200x630 share card per step. */
export const METHOD_STEP_OG = pick(STEP_FILE, "og", "png");
/** 1200x900 social image per step. */
export const METHOD_STEP_SOCIAL = pick(STEP_FILE, "social-landscape", "jpg");
/** The coloured phase band, cut from the artwork (the generator calls every cut a panel). */
export const METHOD_PHASE_BAND = pick(PHASE_FILE, "panel", "webp");
/** 1200x630 share card per phase. */
export const METHOD_PHASE_OG = pick(PHASE_FILE, "og", "png");
