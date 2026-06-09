/**
 * Funnel event tracking — one call fires both GA4 and the Meta Pixel.
 *
 * Safe no-op until VITE_GA4_MEASUREMENT_ID / VITE_META_PIXEL_ID are set:
 * Analytics.tsx only loads gtag / fbq when those env vars exist, so window.gtag
 * and window.fbq are simply absent when analytics is off, and these calls do
 * nothing. Analytics must never break the page, so every call is wrapped.
 *
 * Use GA4 recommended event names where one fits (generate_lead, begin_checkout,
 * view_item, purchase) so GA4's built-in funnel + Meta's ad-optimization events
 * both work. Anything without a Meta standard mapping fires as a Meta custom event.
 */

// GA4 event name -> Meta standard event. Unmapped names fire via trackCustom.
const META_STANDARD: Record<string, string> = {
  generate_lead: "Lead",
  begin_checkout: "InitiateCheckout",
  view_item: "ViewContent",
  purchase: "Purchase",
  contact: "Contact",
  schedule: "Schedule",
};

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    if (window.gtag) {
      window.gtag("event", event, params);
    }
    if (window.fbq) {
      const meta = META_STANDARD[event];
      if (meta) window.fbq("track", meta, params);
      else window.fbq("trackCustom", event, params);
    }
  } catch {
    /* analytics is best-effort; never let it throw into the app */
  }
}
