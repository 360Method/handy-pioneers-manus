/**
 * InquiryModal — one global dialog holding the CRM ProjectInquiryForm.
 *
 * Rendered once at the App root. Opens whenever any CTA calls openInquiry().
 * Auto-closes on route change (the form navigates to /thankyou on success).
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import { registerInquiry } from "@/lib/inquiry";

export default function InquiryModal() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    registerInquiry(() => setOpen(true));
    return () => registerInquiry(null);
  }, []);

  // Close when the route changes (e.g. the form redirects to /thankyou on submit).
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle
            className="text-2xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Request a Complimentary Estimate
          </DialogTitle>
          <DialogDescription>
            Tell us what you need. We'll reach out within one business day.
          </DialogDescription>
        </DialogHeader>
        <ProjectInquiryForm source="inquiry-modal" variant="cta" funnel="project" />
      </DialogContent>
    </Dialog>
  );
}
