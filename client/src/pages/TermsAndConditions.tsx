/**
 * TermsAndConditions — /terms-and-conditions
 * Compliant with Twilio SMS requirements.
 * Includes: program name, description, message/data rates, message frequency,
 * support contact info, and opt-out instructions (HELP and STOP in bold).
 * Design: Pacific Northwest Craftsman — matches site typography and color system.
 */

import { useEffect } from "react";
import { Link } from "wouter";

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | Handy Pioneers";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Handy Pioneers";
    };
  }, []);

  return (
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
      <div className="max-w-4xl mx-auto px-6 py-14">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
        >
          Terms &amp; Conditions
        </h1>
        <p className="text-sm mb-10" style={{ color: "oklch(0.55 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
          Last updated: April 7, 2026
        </p>

        <div className="prose max-w-none" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.30 0.03 80)", lineHeight: "1.8" }}>

          <Section title="1. Agreement to Terms">
            <p>
              These Terms and Conditions ("Terms") govern your use of the services provided by Handy Pioneers ("we," "us," or "our"), a licensed home services and remodeling contractor serving Clark County, Washington. By requesting a service estimate, scheduling a project, or communicating with us via our website, phone, email, or text message, you agree to be bound by these Terms.
            </p>
          </Section>

          <Section title="2. Services">
            <p>
              Handy Pioneers provides residential home services, repair, and remodeling in Clark County, Washington, including but not limited to carpentry, painting, flooring, deck maintenance, pressure washing, and general home repair. All services are performed by licensed and insured professionals. Washington State Contractor License: HANDYP*761NH.
            </p>
            <p>
              Estimates are provided at no charge and are valid for 30 days from the date of issue. Acceptance of an estimate constitutes agreement to proceed with the described work at the quoted price, subject to any conditions noted in the estimate.
            </p>
          </Section>

          <Section title="3. SMS Messaging Program — Terms">
            <p>
              <strong>Program Name:</strong> Handy Pioneers SMS Service Communications
            </p>
            <p>
              <strong>Program Description:</strong> By providing your mobile phone number and consenting to receive text messages, you agree to receive SMS messages from Handy Pioneers related to your service request. These messages may include estimate confirmations, appointment reminders, project status updates, follow-up messages after service completion, and responses to inquiries you initiate.
            </p>
            <p>
              <strong>Message Frequency:</strong> Message frequency varies based on your service activity. You may receive up to 5 messages per service engagement (estimate request, scheduling, appointment reminder, day-of confirmation, and follow-up).
            </p>
            <p>
              <strong>Message and Data Rates:</strong> Message and data rates may apply. Check with your mobile carrier for details about your plan's messaging rates.
            </p>
            <p>
              <strong>Opt-Out:</strong> You may opt out of SMS communications at any time by replying <strong>STOP</strong> to any message from Handy Pioneers. After opting out, you will receive one final confirmation message confirming your opt-out, and no further SMS messages will be sent. To opt back in, contact us directly.
            </p>
            <p>
              <strong>Help:</strong> For assistance, reply <strong>HELP</strong> to any message or contact us at (360) 544-9858 or info@handypioneers.com.
            </p>
            <p>
              <strong>Supported Carriers:</strong> SMS service is available on most major U.S. carriers. Carrier support may vary.
            </p>
            <p>
              <strong>Privacy:</strong> We do not share your phone number or SMS opt-in data with third parties for marketing purposes. For full details, see our{" "}
              <Link href="/privacy-policy" style={{ color: "oklch(0.32 0.07 160)" }}>Privacy Policy</Link>.
            </p>
          </Section>

          <Section title="4. Scheduling and Cancellations">
            <p>
              Appointments may be rescheduled or cancelled with at least 24 hours' notice at no charge. Cancellations with less than 24 hours' notice may be subject to a cancellation fee of up to $75 to cover scheduling and travel costs. We reserve the right to reschedule appointments due to weather conditions, material availability, or other circumstances beyond our control.
            </p>
          </Section>

          <Section title="5. Payment Terms">
            <p>
              Payment is due upon completion of work unless otherwise agreed in writing. We accept cash, check, and major credit cards. For larger projects (over $2,000), a deposit of up to 50% may be required before work begins. Invoices not paid within 30 days of the due date may be subject to a late fee of 1.5% per month on the outstanding balance.
            </p>
          </Section>

          <Section title="6. Warranty">
            <p>
              Handy Pioneers provides a 1-year labor warranty on all completed work. This warranty covers defects in workmanship but does not cover damage caused by misuse, normal wear and tear, or conditions outside our control (including but not limited to flooding, acts of nature, or pre-existing structural issues). Manufacturer warranties on materials and products are separate and governed by the respective manufacturer's terms.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, Handy Pioneers' total liability for any claim arising from our services shall not exceed the amount paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, consequential, or punitive damages.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All content on handypioneers.com, including text, images, project photos, and the 360° Method framework, is the property of Handy Pioneers and may not be reproduced, distributed, or used without written permission.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These Terms are governed by the laws of the State of Washington. Any disputes arising from these Terms or our services shall be resolved in Clark County, Washington.
            </p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>
              We may update these Terms from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our services after changes are posted constitutes acceptance of the updated Terms.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            <address className="not-italic mt-2" style={{ color: "oklch(0.35 0.04 80)" }}>
              <strong>Handy Pioneers</strong><br />
              Vancouver, WA (Clark County)<br />
              Phone: <a href="tel:3605449858" style={{ color: "oklch(0.32 0.07 160)" }}>(360) 544-9858</a><br />
              Email: <a href="mailto:info@handypioneers.com" style={{ color: "oklch(0.32 0.07 160)" }}>info@handypioneers.com</a><br />
              Website: <a href="https://handypioneers.com" style={{ color: "oklch(0.32 0.07 160)" }}>handypioneers.com</a>
            </address>
          </Section>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t py-6 text-center" style={{ borderColor: "oklch(0.88 0.015 80)" }}>
        <p className="text-xs" style={{ color: "oklch(0.60 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
          © {new Date().getFullYear()} Handy Pioneers. All rights reserved. ·{" "}
          <Link href="/privacy-policy" className="hover:underline" style={{ color: "oklch(0.45 0.05 160)" }}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
