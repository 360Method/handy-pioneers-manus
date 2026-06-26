/**
 * Calendly booking - single source of truth for the scheduler link, reused on the
 * consultation thank-you page and the member / walkthrough confirmation pages.
 *
 * On Calendly's free plan there's one event type, so the same link covers both the
 * project consultation and the baseline assessment; Marcin confirms the real
 * duration (a whole-home baseline runs 2-3 hours) with the customer. All
 * availability and slot length live in Calendly, not here - changing them needs no
 * redeploy.
 */
export const CALENDLY_URL = "https://calendly.com/handypioneers/30min";

/**
 * Calendly inline-embed src. `embed_domain` is required for Calendly to post the
 * `calendly.event_scheduled` message we listen for to fire the booking conversion.
 */
export function calendlyEmbedSrc(): string {
  const domain =
    typeof window !== "undefined" ? window.location.hostname : "handypioneers.com";
  return (
    `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&primary_color=c8892a&text_color=1a2e1a` +
    `&embed_type=Inline&embed_domain=${domain}`
  );
}
