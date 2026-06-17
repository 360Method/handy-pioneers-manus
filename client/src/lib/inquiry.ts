/**
 * Global trigger for the inquiry modal.
 *
 * Every "Book Online / Request Estimate / Schedule a Consultation" CTA across the
 * site calls openInquiry(); the InquiryModal (rendered once at the App root)
 * registers a listener and opens. Project leads are captured into the HP Estimator
 * CRM. Passing { mode: "baseline" } opens the baseline-walkthrough Step 1 form and
 * carries the chosen tier + home size into the funnel.
 */
export interface InquiryContext {
  mode?: "project" | "baseline" | "roadmap";
  tier?: string;
  sqft?: number;
  /** Seasonal-offer code the lead came in on (folded into the lead source). */
  promoCode?: string;
}

type Listener = (ctx: InquiryContext) => void;

let listener: Listener | null = null;

export function registerInquiry(l: Listener | null) {
  listener = l;
}

export function openInquiry(ctx: InquiryContext = {}) {
  if (listener) {
    listener(ctx);
  } else if (typeof window !== "undefined") {
    // Modal not mounted yet (shouldn't happen - it lives at the App root).
    window.location.href = "/";
  }
}
