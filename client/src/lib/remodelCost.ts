/**
 * Public remodel cost data + math for handypioneers.com.
 *
 * SINGLE SOURCE OF TRUTH for every price the public site shows: the cost
 * calculator (/remodel-cost), the service-page "what it costs" bands, the blog
 * post, and the crawler/AEO prerender all read from here.
 *
 * Every figure in this module is RETAIL (the customer price, with our margin
 * already baked into the rate). There is no cost, markup, margin, or labor-rate
 * field anywhere in this file, so nothing internal can leak to a customer
 * screen. These numbers are ported verbatim from the HP Estimator's retail
 * quick-quote presets (shared/remodelQuickQuote.ts) so the public ranges match
 * what the team quotes on site.
 *
 * We publish these on purpose: an honest, realistic investment range up front,
 * instead of making homeowners pry it out of three contractors. The quoted band
 * is a starting point for a conversation, never a contract. The real number
 * comes from a walkthrough.
 */

export type FinishLevel = "good" | "better" | "best" | "premium";

export const FINISH_LEVELS: FinishLevel[] = ["good", "better", "best", "premium"];

export const LEVEL_LABELS: Record<FinishLevel, string> = {
  good: "Good",
  better: "Better",
  best: "Best",
  premium: "Premium",
};

interface LevelRate {
  /** Retail dollars per square foot, low and high bound. */
  low: number;
  high: number;
  /** Plain description of what this level of finish includes. */
  desc: string;
}

export interface CostPreset {
  /** Stable key used by costKey on a service + the calculator URL. */
  key: string;
  /** Customer-facing project name. */
  label: string;
  /** One-line plain description of the project scope. */
  scope: string;
  rates: Record<FinishLevel, LevelRate>;
  /** Fixed retail floor so a small project never prices unrealistically low. */
  baseFeeLow: number;
  baseFeeHigh: number;
  /** Typical project size used for the high-level "average" band + slider default. */
  avgSqft: number;
  /** Slider bounds. */
  minSqft: number;
  maxSqft: number;
  /** Helper line shown under the size slider. */
  sizeHelp: string;
}

/**
 * The five published presets. Rates, base fees, and minimums are copied exactly
 * from server/osCore/seed/quickquote-seed.json in the HP Estimator. Average
 * sizes are typical real-world project sizes (used only for the friendly
 * high-level band and the slider's starting point), not from the estimator.
 */
export const PRESETS: CostPreset[] = [
  {
    key: "kitchen",
    label: "Full kitchen remodel",
    scope: "Cabinets, counters, surfaces, lighting, and finish.",
    rates: {
      good: { low: 175, high: 250, desc: "Stock cabinets, quality laminate or entry stone counters, fresh surfaces throughout." },
      better: { low: 250, high: 350, desc: "Semi-custom cabinets, quartz counters, tile backsplash, upgraded lighting." },
      best: { low: 350, high: 500, desc: "Custom cabinetry, premium stone, designer fixtures and an appliance-ready layout." },
      premium: { low: 475, high: 675, desc: "Chef-grade kitchen: full custom cabinetry, premium stone, integrated appliances and lighting design." },
    },
    baseFeeLow: 18000,
    baseFeeHigh: 22000,
    avgSqft: 175,
    minSqft: 100,
    maxSqft: 400,
    sizeHelp: "An average kitchen is about 175 square feet.",
  },
  {
    key: "bath",
    label: "Full bathroom remodel",
    scope: "Tear-out to turnkey: demo, surfaces, fixtures, finish.",
    rates: {
      good: { low: 250, high: 350, desc: "Quality stock fixtures and durable surfaces. A clean, solid bathroom built to last." },
      better: { low: 350, high: 475, desc: "Upgraded tile, name-brand fixtures, and nicer lighting. The noticeable step up." },
      best: { low: 475, high: 650, desc: "Custom tile work, premium fixtures, frameless glass. A magazine-page finish." },
      premium: { low: 650, high: 875, desc: "Spa-level finish: heated floors, frameless glass, designer stone and fixtures throughout." },
    },
    baseFeeLow: 9000,
    baseFeeHigh: 11000,
    avgSqft: 50,
    minSqft: 35,
    maxSqft: 150,
    sizeHelp: "A standard full bathroom is about 40 to 60 square feet; a primary bath runs larger.",
  },
  {
    key: "flooring",
    label: "Flooring replacement",
    scope: "Tear-out, prep, and new flooring across the measured area.",
    rates: {
      good: { low: 9, high: 13, desc: "Quality LVP or carpet. Durable, water-resistant, family-proof." },
      better: { low: 13, high: 19, desc: "Premium LVP, engineered hardwood, or tile in key areas." },
      best: { low: 19, high: 28, desc: "Solid hardwood or large-format tile with upgraded prep and transitions." },
      premium: { low: 26, high: 38, desc: "Wide-plank hardwood or large-format stone with full subfloor prep and custom transitions." },
    },
    baseFeeLow: 1200,
    baseFeeHigh: 1600,
    avgSqft: 600,
    minSqft: 100,
    maxSqft: 2500,
    sizeHelp: "Measure the floor area you want replaced; a main level often runs 600 to 1,200 square feet.",
  },
  {
    key: "basement",
    label: "Basement finish",
    scope: "Framing, insulation, drywall, flooring, lighting, and finish.",
    rates: {
      good: { low: 65, high: 90, desc: "Clean finished space: framed, insulated, drywalled, painted, durable flooring." },
      better: { low: 90, high: 130, desc: "Adds a finished ceiling system, upgraded flooring, and built-in lighting design." },
      best: { low: 130, high: 185, desc: "Full living space: wet-bar rough-in, premium finishes, custom built-ins." },
      premium: { low: 175, high: 250, desc: "Full luxury suite: wet bar, premium built-ins, designer lighting and finishes throughout." },
    },
    baseFeeLow: 15000,
    baseFeeHigh: 19000,
    avgSqft: 500,
    minSqft: 200,
    maxSqft: 1500,
    sizeHelp: "Measure the area you want finished; many basements finish 500 to 1,000 square feet.",
  },
  {
    key: "interior-paint",
    label: "Interior repaint",
    scope: "Walls, trim, and ceilings across the measured floor area.",
    rates: {
      good: { low: 3.5, high: 5, desc: "Walls in quality washable paint, standard prep." },
      better: { low: 5, high: 7, desc: "Walls plus trim and doors, upgraded prep and caulking." },
      best: { low: 7, high: 10, desc: "Walls, trim, doors, and ceilings with premium paint and full surface repair." },
      premium: { low: 9, high: 13, desc: "Designer finish: premium paint system, full surface repair, accent walls and specialty coatings." },
    },
    baseFeeLow: 900,
    baseFeeHigh: 1300,
    avgSqft: 1800,
    minSqft: 150,
    maxSqft: 4000,
    sizeHelp: "Use the floor area of the space you want painted; a whole interior is often 1,500 to 2,500 square feet.",
  },
];

export function getPreset(key: string): CostPreset | undefined {
  return PRESETS.find((p) => p.key === key);
}

export interface CostBand {
  low: number;
  high: number;
}

/** Round a retail figure to a presentation-friendly hundred (matches the estimator). */
function roundToHundred(n: number): number {
  return Math.round(n / 100) * 100;
}

/**
 * Estimate the retail investment band for a project at a given size and finish
 * level. Mirrors the estimator: total = max(base fee, rate x sqft), rounded to
 * the nearest hundred. Add-on runs (cabinets, vanities, trim) are quoted on site
 * and are not modeled here, so a real estimate can land above this band.
 */
export function estimate(preset: CostPreset, sqft: number, level: FinishLevel): CostBand {
  const rate = preset.rates[level];
  const size = Math.max(0, sqft);
  let low = roundToHundred(Math.max(preset.baseFeeLow, rate.low * size));
  let high = roundToHundred(Math.max(preset.baseFeeHigh, rate.high * size));
  if (high < low) high = low;
  return { low, high };
}

/** Round down to a clean number for the friendly high-level band. */
function floorClean(n: number): number {
  if (n >= 20000) return Math.floor(n / 5000) * 5000;
  return Math.floor(n / 1000) * 1000;
}
/** Round up to a clean number for the friendly high-level band. */
function ceilClean(n: number): number {
  if (n >= 20000) return Math.ceil(n / 5000) * 5000;
  return Math.ceil(n / 1000) * 1000;
}

/**
 * The friendly "an average project runs roughly $X to $Y" band: a Good finish at
 * the average size up to a Best finish at the average size, rounded to clean
 * numbers. Premium finishes and larger projects go higher, which the calculator
 * shows. This is an approximation, labeled as such in the copy.
 */
export function highLevelBand(preset: CostPreset): CostBand {
  const low = estimate(preset, preset.avgSqft, "good").low;
  const high = estimate(preset, preset.avgSqft, "best").high;
  return { low: floorClean(low), high: ceilClean(high) };
}

export function formatUSD(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/** "$30,000 to $90,000" (set plus to append a "+"). */
export function formatBand(band: CostBand, plus = false): string {
  return `${formatUSD(band.low)} to ${formatUSD(band.high)}${plus ? "+" : ""}`;
}
