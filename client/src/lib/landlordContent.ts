/*
 * landlordContent.ts - copy/data for the Proactive Path for Landlords (/multifamily).
 *
 * Two data sets, both display-only:
 *  1. LANDLORD_SEASONS - the seasonal BUILDING + common-area + grounds visit menu,
 *     fed into the same <SeasonalVisitsGrid> the homeowner page uses. In-unit work
 *     is a separate once-a-year pass (the unit is occupied), so it is NOT a season
 *     here; it is called out in the page footnotes.
 *  2. TURNOVER_SCOPE + TURNOVER_FROM - the standardized make-ready scope and
 *     indicative "from" pricing by unit type. Mirrors the estimator engine
 *     (HP-Estimator-app shared/turnoverQuickQuote.ts) and HP-SOP-212. Turnovers are
 *     member-rate, billed per event, never folded into the membership fee.
 *
 * Retail/display only: no cost, markup, or margin math, nothing that can leak to a
 * customer. The seasonal menu is examples matched to the building at the baseline;
 * turnover "from" figures are starting ranges firmed on the move-out walkthrough.
 */
import type { SeasonData } from "@/components/membership/SeasonalVisitsGrid";

export const LANDLORD_SEASONS: SeasonData[] = [
  {
    season: "Spring",
    emoji: "🌱",
    timing: "March-April",
    categories: [
      {
        title: "Gutters & site drainage",
        tasks: [
          "Clear gutters and flush downspouts we can reach from a ladder, or clear the tops of gutter covers",
          "Confirm water exits well away from the building",
        ],
      },
      {
        title: "Shared safety & systems",
        tasks: [
          "Test smoke and CO detectors in shared spaces and check fire extinguishers",
          "Replace common-area and shared-system air filters",
        ],
      },
      {
        title: "Plumbing leak check",
        tasks: ["Check shared plumbing, the water heater area and accessible shutoffs for drips"],
      },
      {
        title: "Where present",
        tasks: ["Test the sump pump", "Start up irrigation and check the zones"],
      },
    ],
  },
  {
    season: "Summer",
    emoji: "☀️",
    timing: "June-July",
    categories: [
      {
        title: "Air & ventilation",
        tasks: [
          "Clean shared laundry and dryer vent runs and their outside hoods",
          "Clean shared exhaust fans and confirm they pull air",
          "Replace common-area and shared-system air filters",
        ],
      },
    ],
  },
  {
    season: "Fall",
    emoji: "🍂",
    timing: "September-October",
    categories: [
      {
        title: "Rain-season gutter prep",
        tasks: [
          "Clear gutters and flush and high-flow test downspouts from a ladder, or clear the tops of gutter covers",
          "Confirm downspout extensions and nearby drains are clear",
        ],
      },
      {
        title: "Freeze protection",
        tasks: ["Disconnect hoses and fit insulated covers on exterior and shared hose bibs"],
      },
      {
        title: "Heating-season readiness",
        tasks: [
          "Test smoke and CO detectors and replace batteries in shared spaces",
          "Replace common-area and shared-system filters for the heating season",
        ],
      },
    ],
  },
  {
    season: "Winter",
    emoji: "❄️",
    timing: "December-January",
    categories: [
      {
        title: "Water & plumbing",
        tasks: [
          "Locate, tag and exercise the main water shutoff",
          "Check the shared water heater: leaks, drain pan, relief line, venting and temperature",
        ],
      },
      {
        title: "Doors & drafts",
        tasks: ["Check weatherstripping and door sweeps at shared entries; adjust or replace"],
      },
      {
        title: "Shared safety",
        tasks: ["Test shared GFCI outlets, inside and out"],
      },
      {
        title: "Where present",
        tasks: ["Check pipe insulation in the crawlspace and garage"],
      },
    ],
  },
];

// ─── Standardized turnover scope (HP-SOP-212; mirrors the estimator engine) ───
export interface TurnoverScopePhase {
  title: string;
  items: string[];
}

export const TURNOVER_SCOPE: TurnoverScopePhase[] = [
  {
    title: "Move-out inspection",
    items: [
      "Photo-document every room as a condition record",
      "Log damage beyond normal wear for your deposit decision",
      "Flag anything that is a separate project, never absorbed",
    ],
  },
  {
    title: "Clean",
    items: [
      "Full unit clean: floors, surfaces, fixtures, cabinets in and out",
      "Kitchen and bath detail: appliances, sinks, tub and shower, grout",
      "Windows, blinds, vents, and baseboards",
    ],
  },
  {
    title: "Paint",
    items: [
      "Patch nail holes and dings; spot-prime stains",
      "Touch-up or full repaint matched to the unit's condition",
    ],
  },
  {
    title: "Repairs",
    items: [
      "Re-key or re-code locks for the next tenant",
      "Fix loose fixtures, towel bars, blinds, doors, drawers, and screens",
      "Replace burned-out bulbs, reset GFCIs, and swap the air filter",
    ],
  },
  {
    title: "Safety & habitability",
    items: [
      "Test smoke and CO detectors; replace batteries or units",
      "Verify the water heater, heat, and major systems operate",
      "Confirm the unit meets the habitability bar before re-listing",
    ],
  },
  {
    title: "Make-ready",
    items: [
      "Final walk and photo set for you, a ready-to-list record",
      "Hand back keys and codes; note anything to watch next cycle",
    ],
  },
];

// Indicative "from" starting prices by unit type, for a VACANT, UNFURNISHED unit
// (a full make-ready, where most of the work is the deep clean). These are a floor,
// not a quote: the real number is set on the move-out walkthrough and the member
// rate applies on top. Priced a touch high on purpose, since the member discount
// brings it down. Furnished units are a different, usually lighter scope.
export interface TurnoverFromRow {
  unit: string;
  from: number;
}

export const TURNOVER_FROM: TurnoverFromRow[] = [
  { unit: "Studio", from: 650 },
  { unit: "1 Bed", from: 850 },
  { unit: "2 Bed", from: 1100 },
  { unit: "3 Bed", from: 1500 },
  { unit: "4 Bed +", from: 2000 },
];
