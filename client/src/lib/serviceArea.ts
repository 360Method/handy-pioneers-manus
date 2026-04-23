// TODO: move to CMS (nucleus) — service area boundary should be editable
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
  "We currently serve Clark County, Washington only. We'll reach out if that changes — can we keep you on our list?";
