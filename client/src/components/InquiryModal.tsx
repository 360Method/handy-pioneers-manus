/**
 * InquiryModal - one global dialog holding the CRM lead form.
 *
 * Rendered once at the App root. Opens whenever any CTA calls openInquiry().
 * Project mode shows ProjectInquiryForm; baseline mode (openInquiry({ mode:
 * "baseline", tier, sqft })) shows Step 1 of the baseline-walkthrough funnel.
 * Auto-closes on route change (forms navigate away on success).
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
import BaselineInquiryForm from "@/components/BaselineInquiryForm";
import RoadmapInquiryForm from "@/components/RoadmapInquiryForm";
import { registerInquiry, type InquiryContext } from "@/lib/inquiry";

export default function InquiryModal() {
  const [open, setOpen] = useState(false);
  const [ctx, setCtx] = useState<InquiryContext>({});
  const [location] = useLocation();

  const [, navigate] = useLocation();

  useEffect(() => {
    registerInquiry((c) => {
      // Give-first funnel (2026-06-06): roadmap CTAs no longer open a contact
      // form - the report goes in first at /roadmap/details, email comes after.
      if (c.mode === "roadmap") {
        navigate("/roadmap/details");
        return;
      }
      setCtx(c);
      setOpen(true);
    });
    return () => registerInquiry(null);
  }, [navigate]);

  // Close when the route changes (forms redirect away on submit).
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const isBaseline = ctx.mode === "baseline";
  const isRoadmap = ctx.mode === "roadmap";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle
            className="text-2xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            {isRoadmap
              ? "Get Your Complimentary 360° Roadmap"
              : isBaseline
                ? "Schedule Your Baseline Walkthrough"
                : "Request a Complimentary Estimate"}
          </DialogTitle>
          <DialogDescription>
            {isRoadmap
              ? "First, a few quick details. Takes about 20 seconds."
              : isBaseline
                ? "First, a few quick details so we can reach out. Takes about 20 seconds."
                : "Tell us what you need. We'll reach out within one business day."}
          </DialogDescription>
        </DialogHeader>
        {isRoadmap ? (
          <RoadmapInquiryForm />
        ) : isBaseline ? (
          <BaselineInquiryForm tier={ctx.tier} sqft={ctx.sqft} />
        ) : (
          <ProjectInquiryForm source="inquiry-modal" variant="cta" funnel="project" />
        )}
      </DialogContent>
    </Dialog>
  );
}
