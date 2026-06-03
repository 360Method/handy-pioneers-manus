/**
 * Global trigger for the project inquiry modal.
 *
 * Every "Book Online / Request Estimate / Schedule a Consultation" CTA across the
 * site calls openInquiry(); the InquiryModal (rendered once at the App root)
 * registers a listener and opens. This replaces the old Housecall Pro booking
 * links so project leads are captured into the HP Estimator CRM instead.
 */
type Listener = () => void;

let listener: Listener | null = null;

export function registerInquiry(l: Listener | null) {
  listener = l;
}

export function openInquiry() {
  if (listener) {
    listener();
  } else if (typeof window !== "undefined") {
    // Modal not mounted yet (shouldn't happen — it lives at the App root).
    window.location.href = "/";
  }
}
