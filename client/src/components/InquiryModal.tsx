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
import LandlordQuoteForm from "@/components/LandlordQuoteForm";
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
  const isLandlord = ctx.mode === "landlord";
  const isPortfolio = ctx.kind === "portfolio";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle
            className="text-2xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            {isRoadmap
              ? "Get Your 360° Roadmap"
              : isLandlord
                ? isPortfolio
                  ? "Build Your Portfolio Plan"
                  : "Get Your Custom Quote"
                : isBaseline
                  ? "Schedule Your Baseline Walkthrough"
                  : "Schedule Your Consultation"}
          </DialogTitle>
          <DialogDescription>
            {isRoadmap
              ? "First, a few quick details. Takes about 20 seconds."
              : isLandlord
                ? "First, your name and email. Next, a few quick details about your properties."
                : isBaseline
                  ? "First, a few quick details so we can reach out. Takes about 20 seconds."
                  : "An in-person walkthrough of your project. Share a few details and we'll reach out within one business day."}
          </DialogDescription>
        </DialogHeader>
        {isRoadmap ? (
          <RoadmapInquiryForm />
        ) : isLandlord ? (
          <LandlordQuoteForm
            kind={ctx.kind}
            units={ctx.units}
            properties={ctx.properties}
            sqft={ctx.sqft}
            source={ctx.source}
            serviceType={ctx.serviceType}
          />
        ) : isBaseline ? (
          <BaselineInquiryForm tier={ctx.tier} sqft={ctx.sqft} units={ctx.units} source={ctx.source} serviceType={ctx.serviceType} />
        ) : (
          <>
            <ul className="space-y-2 mb-1">
              {[
                "A Handy Pioneers expert assesses your project in person.",
                "A written scope and plan, tailored to your home.",
                "A read on anything else worth your attention.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <span style={{ color: "oklch(0.65 0.14 65)", marginTop: "1px" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <ProjectInquiryForm
              source={ctx.promoCode ? `inquiry-modal_promo-${ctx.promoCode}` : "inquiry-modal"}
              variant="cta"
              funnel="project"
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
