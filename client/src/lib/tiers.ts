export type MemberTier = "bronze" | "silver" | "gold";
export type BillingCadence = "monthly" | "quarterly" | "annual";

export interface TierData {
  id: MemberTier;
  name: string;
  tagline: string;
  color: string;
  borderColor: string;
  bgColor: string;
  badgeBg: string;
  badgeText: string;
  prices: Record<BillingCadence, number>;
  annualMonthly: number;
  laborBankDollars: number;
  visits: number;
  visitDescription: string;
  discountBrackets: { label: string; pct: string }[];
  /** Numeric member discount by job size (percent off out-of-scope work). */
  discountPct: { underOneK: number; oneToFiveK: number; overFiveK: number };
  features: string[];
  popular?: boolean;
}

export const TIERS: TierData[] = [
  {
    id: "bronze",
    name: "Essential",
    tagline: "Protect the basics. Catch issues early.",
    color: "#c8922a",
    borderColor: "border-amber-400",
    bgColor: "bg-amber-50",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    prices: { monthly: 59, quarterly: 169, annual: 588 },
    annualMonthly: 49,
    laborBankDollars: 0,
    visits: 2,
    visitDescription: "Spring + Fall",
    discountBrackets: [
      { label: "Jobs under $5,000", pct: "2.5% member rate" },
      { label: "Jobs $5,000-$20,000", pct: "5% member rate" },
      { label: "Jobs over $20,000", pct: "7% member rate" },
    ],
    // Keys are historical band labels; values are now under-$5k / $5k-$20k / over-$20k.
    discountPct: { underOneK: 2.5, oneToFiveK: 5, overFiveK: 7 },
    features: [
      "Annual 360° Home Scan (2-3 hr documented assessment)",
      "Spring visit - post-rain assessment + focused seasonal care",
      "Fall visit - rain-season prep + weatherization",
      "Each visit matched to your home - we do what it needs, not a fixed checklist",
      "Prioritized findings report with written scope of work",
      "Member rates on all out-of-scope work",
      "HP direct line - no hold queues",
    ],
  },
  {
    id: "silver",
    name: "Full Coverage",
    tagline: "Four seasons of protection + pre-paid labor.",
    color: "#6b7280",
    borderColor: "border-slate-400",
    bgColor: "bg-slate-50",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800",
    prices: { monthly: 99, quarterly: 279, annual: 948 },
    annualMonthly: 79,
    laborBankDollars: 300,
    visits: 4,
    visitDescription: "All 4 Seasons",
    popular: true,
    discountBrackets: [
      { label: "Jobs under $5,000", pct: "4.5% member rate" },
      { label: "Jobs $5,000-$20,000", pct: "8% member rate" },
      { label: "Jobs over $20,000", pct: "11% member rate" },
    ],
    discountPct: { underOneK: 4.5, oneToFiveK: 8, overFiveK: 11 },
    features: [
      "Everything in Essential, plus:",
      "$300 labor bank credit (applied to any in-between visit task)",
      "Summer visit - dry-season exterior + HVAC prep",
      "Winter visit - freeze protection + moisture inspection",
      "Findings convert to written scope in one tap",
      "Annual maintenance report for home equity documentation",
    ],
  },
  {
    id: "gold",
    name: "Maximum Protection",
    tagline: "The full system. Priority access. Maximum stewardship.",
    color: "#0f1f3d",
    borderColor: "border-navy",
    bgColor: "bg-blue-50",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-900",
    prices: { monthly: 149, quarterly: 419, annual: 1428 },
    annualMonthly: 119,
    laborBankDollars: 600,
    visits: 4,
    visitDescription: "All 4 Seasons + Priority",
    discountBrackets: [
      { label: "Jobs under $5,000", pct: "7% member rate" },
      { label: "Jobs $5,000-$20,000", pct: "12% member rate" },
      { label: "Jobs over $20,000", pct: "15% member rate" },
    ],
    discountPct: { underOneK: 7, oneToFiveK: 12, overFiveK: 15 },
    features: [
      "Everything in Full Coverage, plus:",
      "$600 labor bank credit - you're ahead after month 5",
      "Priority scheduling - your calls go first",
      "Dedicated HP account manager",
      "Pre-negotiated vetted-tradesman rates on major work",
      "Home equity maintenance log for refinancing or sale",
    ],
  },
];

/* ── Home-size pricing (size is an INTERNAL pricing input only) ──────────────
 * The visitor never sees a size label, band name, or the multiplier - only the
 * final price for their home. The smallest homes (under 2,000 sq ft) are the FLOOR
 * and pay the published base prices ($59/$99/$149); there is no discount below
 * that. Larger homes build up with a multiplication markup.
 * Monthly figures are hand-set to the $9 convention; other cadences apply the
 * band multiplier to the base cadence price.
 */
export type HomeSizeBand = "standard" | "large" | "estate" | "grand";

export interface SizeBandData {
  id: HomeSizeBand;
  multiplier: number;
  sqftMax: number | null; // exclusive upper bound; null = no cap (top band)
}

export const SIZE_BANDS: SizeBandData[] = [
  { id: "standard", multiplier: 1.0, sqftMax: 2000 }, // floor - under 2,000 sq ft
  { id: "large", multiplier: 1.3, sqftMax: 3500 }, // 2,000-3,500
  { id: "estate", multiplier: 1.6, sqftMax: 5000 }, // 3,500-5,000
  { id: "grand", multiplier: 1.9, sqftMax: null }, // 5,000+
];

export const DEFAULT_BAND: HomeSizeBand = "standard";

export function bandForSqft(sqft: number): HomeSizeBand {
  for (const b of SIZE_BANDS) {
    if (b.sqftMax === null || sqft < b.sqftMax) return b.id;
  }
  return "grand";
}

function bandMultiplier(band: HomeSizeBand): number {
  return SIZE_BANDS.find((b) => b.id === band)?.multiplier ?? 1;
}

// Monthly grid - internal source of truth, never surfaced as a label.
// Floor is $59/$99/$149; larger bands build up via the band multiplier.
const MONTHLY_GRID: Record<HomeSizeBand, Record<MemberTier, number>> = {
  standard: { bronze: 59, silver: 99, gold: 149 },
  large: { bronze: 79, silver: 129, gold: 199 },
  estate: { bronze: 99, silver: 159, gold: 239 },
  grand: { bronze: 119, silver: 189, gold: 289 },
};

export function getPrice(
  tier: TierData,
  cadence: BillingCadence,
  band: HomeSizeBand = DEFAULT_BAND
): number {
  if (cadence === "monthly") return MONTHLY_GRID[band][tier.id];
  return Math.round(tier.prices[cadence] * bandMultiplier(band));
}

// Monthly-equivalent display price for any cadence (what a card shows as "/mo").
export function getMonthlyEquivalent(
  tier: TierData,
  cadence: BillingCadence,
  band: HomeSizeBand = DEFAULT_BAND
): number {
  if (cadence === "monthly") return getPrice(tier, "monthly", band);
  if (cadence === "quarterly") return Math.round((getPrice(tier, "quarterly", band) * 4) / 12);
  return Math.round(getPrice(tier, "annual", band) / 12);
}

export function getSavingsVsMonthly(
  tier: TierData,
  cadence: BillingCadence,
  band: HomeSizeBand = DEFAULT_BAND
): number {
  if (cadence === "monthly") return 0;
  const monthlyTotal = getPrice(tier, "monthly", band) * 12;
  const cadenceTotal =
    cadence === "quarterly"
      ? getPrice(tier, "quarterly", band) * 4
      : getPrice(tier, "annual", band);
  return monthlyTotal - cadenceTotal;
}

export const CADENCE_LABELS: Record<BillingCadence, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  annual: "Annual",
};

/* -- Landlord (multi-family) pricing: building base + per-unit ---------------
 * The Proactive Path for Landlords (HP-DOC-024): one price for the building =
 * the size-banded building base + a per-unit fee on every unit. A single-family
 * rental (1 unit) folds its unit into the base. Mirrors the estimator engine
 * (HP-Estimator-app shared/threeSixtyTiers.ts getLandlordPrice). Display-only and
 * monthly here; the funnel is consult-first, so this is illustrative "from"
 * pricing, never the contract. Size is an internal input: the visitor sees only
 * the final building price, never a band.
 */
export const LANDLORD_PER_UNIT_MONTHLY: Record<MemberTier, number> = {
  bronze: 25,
  silver: 39,
  gold: 55,
};

/** Units that carry the per-unit fee (SFR folds its one unit into the base). */
export function billableUnits(unitCount: number): number {
  return unitCount <= 1 ? 0 : unitCount;
}

/** Blended monthly landlord price: building base (by sqft) + per-unit × units. */
export function getLandlordMonthly(
  tier: TierData,
  unitCount: number,
  sqft: number,
): number {
  const band = bandForSqft(sqft > 0 ? sqft : 1);
  return getPrice(tier, "monthly", band) + LANDLORD_PER_UNIT_MONTHLY[tier.id] * billableUnits(unitCount);
}

/* ── Roadmap-funnel OTO: Maximum (gold) annual buy-now, sized by band ─────────
 * Derived from MONTHLY_GRID.gold × 12 × 0.70, rounded to the $9 convention.
 * MUST match the Stripe prices behind STRIPE_PRICE_MAX_ANNUAL_BUYNOW_{BAND}
 * (124900 / 166900 / 200900 / 242900 cents) and the band helpers in
 * HP-Estimator-app shared/threeSixtyContract.ts. Display-only here - the
 * backend resolves the band server-side at checkout.
 */
export const GOLD_BUYNOW_ANNUAL: Record<HomeSizeBand, number> = {
  standard: 1249,
  large: 1669,
  estate: 2009,
  grand: 2429,
};

/* ── Value stack (offer pages) ───────────────────────────────────────────────
 * Comparable a-la-carte worth of what a membership includes, so the one-time
 * offer can show what the plan is worth against today's price. These are market
 * comparables (a licensed home inspection runs $400-500; a seasonal maintenance
 * visit with services runs $150-300), NOT internal cost. Visit + scan worth
 * scale with the home-size band, the same way price does, so the gap holds for
 * larger homes. Edit the two anchors here and every offer page updates.
 */
export const SEASONAL_VISIT_VALUE = 225;
export const HOME_SCAN_VALUE = 299;

export interface ValueLine {
  label: string;
  value: number;
}
export interface ValueStack {
  lines: ValueLine[];
  total: number;
  laborBank: number;
}

export function valueStackFor(
  tier: TierData,
  band: HomeSizeBand = DEFAULT_BAND
): ValueStack {
  const m = bandMultiplier(band);
  const visitWorth = Math.round(SEASONAL_VISIT_VALUE * m);
  const scanWorth = Math.round(HOME_SCAN_VALUE * m);
  const lines: ValueLine[] = [
    {
      label: `${tier.visits} seasonal visits (${tier.visitDescription})`,
      value: visitWorth * tier.visits,
    },
    { label: "Annual 360° Home Scan (2-3 hr documented assessment)", value: scanWorth },
  ];
  if (tier.laborBankDollars > 0) {
    lines.push({
      label: `$${tier.laborBankDollars} labor bank credit (spendable on real work)`,
      value: tier.laborBankDollars,
    });
  }
  const total = lines.reduce((sum, l) => sum + l.value, 0);
  return { lines, total, laborBank: tier.laborBankDollars };
}

/** Member savings on one out-of-scope job, using the tier's discount brackets. */
export function memberSavingsExample(tier: TierData, jobAmount: number): number {
  const { underOneK, oneToFiveK, overFiveK } = tier.discountPct;
  // Progressive bands: under $5k / $5k-$20k / over $20k.
  const t1 = Math.min(jobAmount, 5000) * (underOneK / 100);
  const t2 = Math.max(0, Math.min(jobAmount, 20000) - 5000) * (oneToFiveK / 100);
  const t3 = Math.max(0, jobAmount - 20000) * (overFiveK / 100);
  return Math.round(t1 + t2 + t3);
}

/**
 * The full, concrete benefit list for a tier - bronze→…→tier flattened, with the
 * "Everything in X, plus:" pointer lines dropped. Use this where the offer needs
 * to show everything that comes with the plan, not a sliced teaser.
 */
export function cumulativeFeatures(tierId: MemberTier): string[] {
  const order: MemberTier[] = ["bronze", "silver", "gold"];
  const upto = order.slice(0, order.indexOf(tierId) + 1);
  // The labor bank does not stack - only the highest tier's credit applies, so
  // show that one line and drop the superseded lower-tier labor-bank line.
  const topLaborBankTier = [...upto]
    .reverse()
    .find((id) => (TIERS.find((t) => t.id === id)?.laborBankDollars ?? 0) > 0);
  const out: string[] = [];
  for (const id of upto) {
    const t = TIERS.find((x) => x.id === id);
    if (!t) continue;
    for (const f of t.features) {
      if (/^everything in/i.test(f)) continue;
      if (/labor bank/i.test(f) && id !== topLaborBankTier) continue;
      out.push(f);
    }
  }
  return out;
}
