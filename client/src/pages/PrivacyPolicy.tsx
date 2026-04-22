/**
 * PrivacyPolicy — /privacy-policy
 * Compliant with Twilio SMS requirements and general data privacy standards.
 * Design: Pacific Northwest Craftsman — matches site typography and color system.
 */

import { useEffect } from "react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Handy Pioneers";
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
          Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: "oklch(0.55 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
          Last updated: April 7, 2026
        </p>

        <div className="prose max-w-none" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.30 0.03 80)", lineHeight: "1.8" }}>

          <Section title="1. Introduction">
            <p>
              Handy Pioneers ("we," "us," or "our") operates as a licensed home services and remodeling contractor serving Clark County, Washington. This Privacy Policy explains how we collect, use, disclose, and protect information you provide when you contact us, request a consultation, or communicate with us via phone, text message, email, or our website at <strong>handypioneers.com</strong>.
            </p>
            <p>
              By using our website or submitting your information, you agree to the practices described in this policy. If you do not agree, please do not submit your information or use our services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, phone number, email address, and service address provided when you request a consultation or contact us.</li>
              <li><strong>Project Information:</strong> Details about your home repair or remodeling project, including photos or descriptions you voluntarily share.</li>
              <li><strong>Communication Records:</strong> Records of phone calls, text messages, and emails exchanged between you and Handy Pioneers.</li>
              <li><strong>Website Usage Data:</strong> Pages visited, time spent on pages, browser type, and general geographic location (city/region), collected via standard web analytics tools.</li>
            </ul>
            <p>
              We do not collect payment card numbers or financial account information directly. Payments, if processed, are handled by third-party payment processors who maintain their own privacy and security standards.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect solely for the following purposes:</p>
            <ul>
              <li>To respond to consultation requests and schedule service appointments.</li>
              <li>To communicate with you about your project, including sending appointment reminders and follow-up messages.</li>
              <li>To send transactional SMS messages related to your service request (see Section 5 for SMS-specific terms).</li>
              <li>To improve our website and service quality based on aggregate, anonymized usage data.</li>
              <li>To comply with applicable legal obligations.</li>
            </ul>
            <p>
              <strong>We do not sell, rent, trade, or share your personal information with third parties for marketing purposes.</strong> Your information is used exclusively to fulfill your service request and communicate with you about your project.
            </p>
          </Section>

          <Section title="4. Information Sharing">
            <p>
              We do not share your personal information with third parties except in the following limited circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with trusted service providers (such as scheduling software or CRM platforms) who assist us in operating our business. These providers are contractually prohibited from using your information for any purpose other than providing services to Handy Pioneers.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government authority.</li>
              <li><strong>Business Transfer:</strong> In the event of a merger, acquisition, or sale of business assets, your information may be transferred as part of that transaction, subject to the same privacy protections.</li>
            </ul>
            <p>
              Under no circumstances do we share your personal information with third parties for advertising, marketing, or data brokerage purposes.
            </p>
          </Section>

          <Section title="5. SMS / Text Message Communications">
            <p>
              If you provide your phone number and consent to receive text messages, Handy Pioneers may send you SMS messages related to your service request, including consultation confirmations, appointment reminders, and follow-up messages. Message frequency varies based on your service activity.
            </p>
            <p>
              <strong>Message and data rates may apply.</strong> You may opt out of SMS communications at any time by replying <strong>STOP</strong> to any message. After opting out, you will receive one final confirmation message and no further SMS messages will be sent. To request help, reply <strong>HELP</strong> to any message or contact us at (360) 544-9858 or info@handypioneers.com.
            </p>
            <p>
              We do not share your phone number or SMS consent with third parties for marketing purposes. SMS opt-in data is not shared with any third party under any circumstances.
            </p>
          </Section>

          <Section title="6. Cookies and Tracking Technologies">
            <p>
              Our website uses standard web analytics tools (such as Google Analytics) that collect anonymized data about website traffic and usage patterns. This data does not identify you personally and is used solely to improve our website. You may disable cookies in your browser settings, though this may affect some website functionality.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law. Contact information associated with completed projects is typically retained for up to three years for warranty and follow-up purposes.
            </p>
          </Section>

          <Section title="8. Data Security">
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately and we will delete it.
            </p>
          </Section>

          <Section title="10. Your Rights">
            <p>
              You have the right to request access to the personal information we hold about you, request correction of inaccurate information, or request deletion of your information, subject to legal retention requirements. To exercise these rights, contact us at the information below.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our services after changes are posted constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have questions about this Privacy Policy or how we handle your information, please contact us:
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
          <Link href="/terms-and-conditions" className="hover:underline" style={{ color: "oklch(0.45 0.05 160)" }}>
            Terms &amp; Conditions
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
