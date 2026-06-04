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
      { label: "Jobs under $1,000", pct: "5% member rate" },
      { label: "Jobs $1,000–$5,000", pct: "3% member rate" },
      { label: "Jobs over $5,000", pct: "1.5% member rate" },
    ],
    features: [
      "Annual 360° Home Scan (2–3 hr documented assessment)",
      "Spring visit — post-rain assessment + moss & gutter service",
      "Fall visit — rain-season prep + weatherization",
      "Prioritized findings report with written scope of work",
      "Member rates on all out-of-scope work",
      "HP direct line — no hold queues",
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
      { label: "Jobs under $1,000", pct: "8% member rate" },
      { label: "Jobs $1,000–$5,000", pct: "5% member rate" },
      { label: "Jobs over $5,000", pct: "2.5% member rate" },
    ],
    features: [
      "Everything in Essential, plus:",
      "$300 labor bank credit (applied to any in-between visit task)",
      "Summer visit — dry-season exterior + HVAC prep",
      "Winter visit — freeze protection + moisture inspection",
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
      { label: "Jobs under $1,000", pct: "12% member rate" },
      { label: "Jobs $1,000–$5,000", pct: "8% member rate" },
      { label: "Jobs over $5,000", pct: "4% member rate" },
    ],
    features: [
      "Everything in Full Coverage, plus:",
      "$600 labor bank credit — you're ahead after month 5",
      "Priority scheduling — your calls go first",
      "Dedicated HP account manager",
      "Pre-negotiated vetted-tradesman rates on major work",
      "Home equity maintenance log for refinancing or sale",
    ],
  },
];

/* ── Home-size pricing (size is an INTERNAL pricing input only) ──────────────
 * The visitor never sees a size label, band name, or the multiplier — only the
 * final price for their home. The typical single-family home is the "estate"
 * anchor and pays the published base prices; smaller homes price down, larger up.
 * Monthly figures are the approved grid (hand-set to the $9 convention); other
 * cadences apply the band multiplier to the base cadence price.
 */
export type HomeSizeBand = "residence" | "estate" | "manor" | "signature";

export interface SizeBandData {
  id: HomeSizeBand;
  multiplier: number;
  sqftMax: number | null; // exclusive upper bound; null = no cap (top band)
}

export const SIZE_BANDS: SizeBandData[] = [
  { id: "residence", multiplier: 0.85, sqftMax: 2000 },
  { id: "estate", multiplier: 1.0, sqftMax: 3500 },
  { id: "manor", multiplier: 1.3, sqftMax: 5000 },
  { id: "signature", multiplier: 1.6, sqftMax: null },
];

export const DEFAULT_BAND: HomeSizeBand = "estate";

export function bandForSqft(sqft: number): HomeSizeBand {
  for (const b of SIZE_BANDS) {
    if (b.sqftMax === null || sqft < b.sqftMax) return b.id;
  }
  return "signature";
}

function bandMultiplier(band: HomeSizeBand): number {
  return SIZE_BANDS.find((b) => b.id === band)?.multiplier ?? 1;
}

// Approved monthly grid — internal source of truth, never surfaced as a label.
const MONTHLY_GRID: Record<HomeSizeBand, Record<MemberTier, number>> = {
  residence: { bronze: 49, silver: 85, gold: 129 },
  estate: { bronze: 59, silver: 99, gold: 149 },
  manor: { bronze: 79, silver: 129, gold: 199 },
  signature: { bronze: 99, silver: 159, gold: 239 },
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
