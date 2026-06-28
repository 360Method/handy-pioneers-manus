/**
 * Calendly booking links - single source of truth, one event per assessment type.
 *
 * On the paid plan we run two distinct events:
 *  - consultation: the on-site project assessment / walkthrough (~1 hour)
 *  - baseline:     the whole-home baseline assessment (~2 hours)
 *
 * Durations and availability live in Calendly, not here - changing them needs no
 * redeploy. This is a temporary layer; it will be replaced by our own internal
 * booking system later.
 */
export const CALENDLY_URLS = {
  // On-site project assessment / consultation (~1 hour)
  consultation: "https://calendly.com/handypioneers/30min",
  // Whole-home baseline assessment (~2 hours)
  baseline: "https://calendly.com/handypioneers/baseline-assessment",
} as const;

export type BookingFunnel = keyof typeof CALENDLY_URLS;

/**
 * Calendly inline-embed src for a given funnel. `embed_domain` is required for
 * Calendly to post the `calendly.event_scheduled` message we listen for to fire
 * the booking conversion.
 */
export function calendlyEmbedSrc(funnel: BookingFunnel = "consultation"): string {
  const base = CALENDLY_URLS[funnel] ?? CALENDLY_URLS.consultation;
  const domain =
    typeof window !== "undefined" ? window.location.hostname : "handypioneers.com";
  return (
    `${base}?hide_gdpr_banner=1&background_color=ffffff&primary_color=c8892a&text_color=1a2e1a` +
    `&embed_type=Inline&embed_domain=${domain}`
  );
}
