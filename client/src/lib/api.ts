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
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.includes("staging") || host.includes("-staging")) return STAGING;
  }
  return PROD;
}
