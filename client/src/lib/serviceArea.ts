// TODO: move to CMS (nucleus) - service area boundary should be editable
// outside of code so Marcin can expand coverage without a deploy.

export const CLARK_COUNTY_ZIPS: readonly string[] = [
  "98601", "98604", "98606", "98607", "98629", "98642",
  "98660", "98661", "98662", "98663", "98664", "98665",
  "98666", "98667", "98668", "98671", "98674", "98675",
  "98682", "98683", "98684", "98685", "98686", "98687",
] as const;

const ZIP_SET = new Set<string>(CLARK_COUNTY_ZIPS);

export const SERVICE_AREA_CITIES: readonly string[] = [
  "Vancouver",
  "Camas",
  "Battle Ground",
  "Ridgefield",
  "Washougal",
  "La Center",
  "Brush Prairie",
  "Amboy",
  "Yacolt",
] as const;

export function isInServiceArea(zip: string): boolean {
  const trimmed = (zip ?? "").trim();
  if (!trimmed) return false;
  const five = trimmed.slice(0, 5);
  return ZIP_SET.has(five);
}

export const SERVICE_AREA_LABEL = "Clark County, Washington";

export const OUT_OF_AREA_MESSAGE =
  "We currently produce roadmaps for Clark County, Washington homes. Each one is individually researched and produced at our expense, so we limit the geography while we grow. Leave your details and we will reach out the moment your area opens.";

// Baseline walkthrough is a physical visit, so the geographic limit is about where
// we can actually send someone, not about per-roadmap cost.
export const BASELINE_SERVICE_AREA_BANNER =
  "We currently perform baseline walkthroughs for homes in Clark County, Washington. Outside that area? Leave your details anyway and you are first in line when we reach you.";

export const BASELINE_OUT_OF_AREA_MESSAGE =
  "That ZIP is outside our current service area. We perform baseline walkthroughs for Clark County, Washington homes today. Add your details below and we will reach out the moment we are serving your area. Thank you for your understanding.";

// Consultation is an on-site visit, so the limit is about where we can send
// someone. Out-of-area homeowners are captured on the list and invited to call
// in case we can still help just over the county line.
export const CONSULTATION_OUT_OF_AREA_MESSAGE =
  "That ZIP is outside our current service area. We schedule on-site consultations for Clark County, Washington homes today. We have saved your details and will reach out the moment we expand to your area.";
