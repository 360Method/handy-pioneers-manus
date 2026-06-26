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
        title: "Roof & moss care (walkable roofs)",
        tasks: [
          "Soft-brush and treat moss on walkable, low-slope roof areas",
          "Apply a zinc-based moss inhibitor before growth spreads",
          "Clear needles and debris from valleys and around vents and skylights",
          "Note worn shingles or flashing for a separate repair scope",
        ],
      },
      {
        title: "Gutters & site drainage",
        tasks: [
          "Clear gutters and flush downspouts we can reach from a ladder or walkable roof",
          "Confirm water exits well away from the foundation; clear splash blocks",
          "Clear accessible area, yard, and parking-lot drains",
          "Re-seat loose gutter hangers and tighten fasteners",
        ],
      },
      {
        title: "Exterior envelope & common entries",
        tasks: [
          "Re-caulk gaps at windows, doors, and exterior penetrations",
          "Touch up worn exterior paint or stain on small spots",
          "Check shared entry doors, thresholds, and weatherstripping",
          "Reseal siding penetrations and hose-bib trim",
        ],
      },
      {
        title: "Common-area safety & lighting",
        tasks: [
          "Replace failed exterior, stairwell, and hallway bulbs; check photocells",
          "Check handrails, stair treads, and shared walkways for trip hazards",
          "Press-test exterior GFCI outlets",
          "Test smoke and CO detectors in shared spaces and laundry rooms",
        ],
      },
    ],
  },
  {
    season: "Summer",
    emoji: "☀️",
    timing: "June-July",
    categories: [
      {
        title: "Dry-season exterior wash",
        tasks: [
          "Soft-wash siding, shared walkways, and patios",
          "Pressure-wash parking, driveway, and entry surfaces where suitable",
          "Wash common-area windows and clear tracks and weep holes",
          "Touch up exterior paint while conditions are dry",
        ],
      },
      {
        title: "Grounds & shared surfaces",
        tasks: [
          "Tighten fence, gate, and railing fasteners; note rot for a separate scope",
          "Seal driveway and walkway cracks before fall",
          "Trim back growth touching the building and clearing exits",
          "Clear debris from shared exterior areas and dumpster enclosures",
        ],
      },
      {
        title: "Moisture & ventilation",
        tasks: [
          "Re-secure lifted crawlspace vapor barrier",
          "Check the attic for blocked vents, staining, or daylight",
          "Confirm shared laundry and dryer venting is clear and screened",
          "Note standing water or pest signs for follow-up",
        ],
      },
      {
        title: "Mechanical & device check",
        tasks: [
          "Replace common-area and shared-system air filters",
          "Clear debris and growth around outdoor units",
          "Test smoke and CO detectors in shared spaces",
          "Clean shared range-hood and exhaust-fan grilles",
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
        title: "Rain-season roof & gutter prep",
        tasks: [
          "Clear gutters and downspouts before the wet season, from a ladder or walkable roof",
          "High-flow test downspouts for underground clogs",
          "Re-treat walkable roof areas with moss inhibitor",
          "Confirm downspout extensions carry water well away from the building",
        ],
      },
      {
        title: "Weatherization & sealing",
        tasks: [
          "Replace worn weatherstripping at common doors and windows",
          "Install or replace door sweeps and thresholds at shared entries",
          "Re-caulk exterior gaps before the first rains",
          "Seal gaps at penetrations, vents, and trim",
        ],
      },
      {
        title: "Freeze protection for faucets & lines",
        tasks: [
          "Shut off and drain exterior and shared hose bibs",
          "Install insulated faucet covers",
          "Add foam insulation to exposed exterior or crawlspace pipe runs",
          "Protect the shared water-heater and mechanical area from freeze",
        ],
      },
      {
        title: "Heating-season readiness",
        tasks: [
          "Replace common-area and shared-system filters for the heating season",
          "Test smoke and CO detectors and replace batteries in shared spaces",
          "Clear vents and registers of dust and obstruction",
          "Flag shared heating-system service where needed",
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
        title: "Freeze & moisture protection",
        tasks: [
          "Re-check and re-secure pipe insulation in the crawlspace and exterior walls",
          "Confirm faucet covers and exterior shut-offs are holding",
          "Clear reachable gutters of winter debris between storms",
          "Note recurring crawlspace moisture for a drainage scope",
        ],
      },
      {
        title: "Drainage & sump (where present)",
        tasks: [
          "Test the sump pump and clear its intake screen",
          "Confirm the sump discharge line is clear and directed away",
          "Re-secure lifted crawlspace vapor barrier",
          "Check perimeter and foundation drains for winter blockage",
        ],
      },
      {
        title: "Common-area safety",
        tasks: [
          "Test smoke and CO detectors and replace batteries in shared spaces",
          "Replace failed interior and exterior bulbs in stairwells and hallways",
          "Press-test shared GFCI outlets and note any that fail to reset",
          "Confirm stairwell and hallway lighting is fully working",
        ],
      },
      {
        title: "Storm-season readiness",
        tasks: [
          "Clear and secure outdoor drains and catch basins",
          "Treat shaded walkways and stairs for slick moss and algae",
          "Check exterior and motion lighting and replace bulbs",
          "Secure loose exterior items before wind storms",
        ],
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

// Indicative "from" pricing by unit type (standard make-ready). Starting ranges,
// confirmed on the move-out walkthrough; the member rate applies on top. Mirrors
// the estimator's standard-level low bounds.
export interface TurnoverFromRow {
  unit: string;
  from: number;
}

export const TURNOVER_FROM: TurnoverFromRow[] = [
  { unit: "Studio", from: 550 },
  { unit: "1 Bed", from: 700 },
  { unit: "2 Bed", from: 900 },
  { unit: "3 Bed", from: 1300 },
  { unit: "4 Bed +", from: 1700 },
];
