/**
 * Contact - /contact
 * Public consultation-request page. Renders ProjectInquiryForm inline (not behind
 * the global InquiryModal popup) so the form, and its optional SMS-consent
 * checkbox, are visible on page load.
 *
 * This is the canonical opt-in URL cited in our A2P 10DLC campaign's message-flow /
 * call-to-action: a carrier reviewer can reach the consent checkbox directly here
 * without clicking through a CTA. Design matches Guarantee / Terms typography.
 */

import { useEffect } from "react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Handy Pioneers";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Handy Pioneers";
    };
  }, []);

  return (
    <>
      <SEO
        path="/contact"
        title="Contact Us | Handy Pioneers - Vancouver, WA"
        description="Request a consultation with Handy Pioneers. Share a few details about your project and we'll reach out within one business day. Vancouver, WA and Clark County."
      />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
        {/* Header bar */}
        <div className="py-4 px-6 border-b" style={{ backgroundColor: "oklch(0.18 0.06 160)", borderColor: "oklch(0.25 0.06 160)" }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.95 0.02 80)" }}>
                Handy Pioneers
              </span>
            </Link>
            <Link href="/" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "oklch(0.75 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-14">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Request a Consultation
          </h1>
          <p className="text-base mb-8" style={{ color: "oklch(0.40 0.03 80)", fontFamily: "'Source Sans 3', sans-serif", lineHeight: "1.7" }}>
            Share a few details about your project and we'll reach out within one
            business day to schedule an in-person walkthrough. Prefer to talk now?
            Call <a href="tel:+13608386731" style={{ color: "oklch(0.32 0.07 160)" }}>(360) 838-6731</a> or
            email <a href="mailto:help@handypioneers.com" style={{ color: "oklch(0.32 0.07 160)" }}>help@handypioneers.com</a>.
          </p>

          <div
            className="rounded-xl border bg-white p-6 sm:p-8 shadow-sm"
            style={{ borderColor: "oklch(0.88 0.015 80)" }}
          >
            <ProjectInquiryForm source="contact-page" variant="cta" funnel="project" />
          </div>

          <p className="mt-6 text-xs" style={{ color: "oklch(0.55 0.03 80)", fontFamily: "'Source Sans 3', sans-serif", lineHeight: "1.7" }}>
            Checking the "Text me about my request" box above is optional and is not
            required to submit this form or to receive service. If you opt in, message
            and data rates may apply and message frequency varies. Reply STOP to opt
            out or HELP for help at any time. See our{" "}
            <Link href="/privacy-policy" style={{ color: "oklch(0.32 0.07 160)" }}>Privacy Policy</Link> and{" "}
            <Link href="/terms-and-conditions" style={{ color: "oklch(0.32 0.07 160)" }}>Terms &amp; Conditions</Link>.
          </p>
        </div>

        {/* Footer strip */}
        <div className="border-t py-6 text-center" style={{ borderColor: "oklch(0.88 0.015 80)" }}>
          <p className="text-xs" style={{ color: "oklch(0.60 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
            © {new Date().getFullYear()} Handy Pioneers. All rights reserved. ·{" "}
            <Link href="/privacy-policy" className="hover:underline" style={{ color: "oklch(0.45 0.05 160)" }}>
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms-and-conditions" className="hover:underline" style={{ color: "oklch(0.45 0.05 160)" }}>
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
