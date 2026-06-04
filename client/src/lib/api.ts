/**
 * Resolves the HP Estimator backend base URL.
 *
 * The staging website (staging.handypioneers.com / *-staging*.up.railway.app) talks
 * to the staging backend (test Stripe keys, MySQL-Staging) so funnel testing never
 * touches production data. Everything else uses production.
 */
const PROD = "https://pro.handypioneers.com";
const STAGING = "https://staging-pro.handypioneers.com";

export function getApiBase(): string {
  if (isStagingHost()) return STAGING;
  return PROD;
}

/** True on the staging website host. Used to enable review-only previews. */
export function isStagingHost(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname.includes("staging");
}
