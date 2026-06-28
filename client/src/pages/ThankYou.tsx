/**
 * ThankYou - Post-inquiry confirmation page at /thankyou
 * Design: Pacific Northwest Craftsman - matches main site aesthetic.
 *
 * Consult leads (?path=project | 360) get a "pick your consultation time" step
 * with the Calendly scheduler embedded and NO auto-redirect, so they can book on
 * the spot. Everyone else keeps the simple thank-you + 10s auto-redirect home.
 */

import { useEffect, useState } from "react";
import { CheckCircle, Star, ArrowLeft, Phone } from "lucide-react";
import SEO from "@/components/SEO";
import CalendlyEmbed from "@/components/CalendlyEmbed";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-full-logo_4f724ec4.jpg";

export default function ThankYou() {
  const path =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("path")
      : null;
  const isConsult = path === "project" || path === "360";

  const [countdown, setCountdown] = useState(10);

  // Auto-redirect only on the generic path. When we're asking a consult lead to
  // book, never pull them off the page.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Thank You | Handy Pioneers";
    if (isConsult) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      document.title = "Handy Pioneers - Reliable Renovations, Trusted Results";
    };
  }, [isConsult]);

  return (
    <>
      <SEO
        path="/thankyou"
        title="Thank You - We've Got Your Request | Handy Pioneers"
        description="Your inquiry reached Handy Pioneers. Pick your consultation time or we'll reach out."
        noindex
      />
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "oklch(0.97 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {/* ── Top Nav ── */}
        <header
          className="w-full border-b"
          style={{ backgroundColor: "oklch(0.22 0.07 160)", borderColor: "oklch(0.28 0.07 160)" }}
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" style={{ textDecoration: "none" }}>
              <img src={LOGO_URL} alt="Handy Pioneers Logo" className="h-10 w-auto" />
              <span className="font-bold text-base hidden sm:inline" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.95 0.02 80)" }}>
                Handy Pioneers
              </span>
            </a>
            <a href="tel:+13608386731" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "oklch(0.80 0.10 80)", textDecoration: "none" }}>
              <Phone size={14} />
              (360) 838-6731
            </a>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          {isConsult ? (
            // ── Consult lead: schedule-now step ──
            <div className="w-full max-w-2xl text-center">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.92 0.06 160)" }}>
                  <CheckCircle size={36} style={{ color: "oklch(0.32 0.07 160)" }} strokeWidth={1.8} />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>
                You're in. Pick your consultation time.
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "oklch(0.38 0.02 80)" }}>
                Your request is in. Choose a time below and we'll walk your project in person (about an hour). Prefer to talk first? Call us anytime.
              </p>

              <div className="mb-6">
                <CalendlyEmbed funnel="consultation" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+13608386731"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.32 0.07 160)", color: "oklch(1 0 0)", textDecoration: "none", letterSpacing: "0.04em" }}
                >
                  <Phone size={15} />
                  Call (360) 838-6731
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-colors hover:opacity-80"
                  style={{ borderColor: "oklch(0.32 0.07 160)", color: "oklch(0.32 0.07 160)", textDecoration: "none" }}
                >
                  <ArrowLeft size={15} />
                  Back to Home
                </a>
              </div>
            </div>
          ) : (
            // ── Generic inquiry: simple thank-you + auto-redirect ──
            <div
              className="w-full max-w-xl text-center rounded-2xl p-8 md:p-12"
              style={{ backgroundColor: "oklch(1 0 0)", boxShadow: "0 4px 32px oklch(0 0 0 / 0.08)", border: "1px solid oklch(0.90 0.015 80)" }}
            >
              <div className="flex justify-center mb-5">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.92 0.06 160)" }}>
                  <CheckCircle size={44} style={{ color: "oklch(0.32 0.07 160)" }} strokeWidth={1.8} />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>
                Thank You!
              </h1>
              <p className="text-base leading-relaxed mb-2" style={{ color: "oklch(0.38 0.02 80)" }}>
                We appreciate you taking the time to submit your inquiry. A member of the Handy Pioneers team will be in touch with you shortly.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.38 0.02 80)" }}>
                We look forward to providing you with excellent service and earning your 5-star review!
              </p>
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={28} fill="oklch(0.62 0.14 65)" color="oklch(0.62 0.14 65)" />
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.32 0.07 160)", color: "oklch(1 0 0)", textDecoration: "none", letterSpacing: "0.04em" }}
                >
                  <ArrowLeft size={15} />
                  Back to Home
                </a>
                <a
                  href="tel:+13608386731"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-colors hover:opacity-80"
                  style={{ borderColor: "oklch(0.32 0.07 160)", color: "oklch(0.32 0.07 160)", textDecoration: "none" }}
                >
                  <Phone size={15} />
                  (360) 838-6731
                </a>
              </div>
              <p className="text-xs" style={{ color: "oklch(0.62 0.02 80)" }}>
                Redirecting you to the home page in{" "}
                <span style={{ fontWeight: 700, color: "oklch(0.32 0.07 160)" }}>{countdown}</span>{" "}
                second{countdown !== 1 ? "s" : ""}…
              </p>
            </div>
          )}
        </main>

        {/* ── Footer ── */}
        <footer
          className="py-5 text-center text-xs border-t"
          style={{ backgroundColor: "oklch(0.18 0.06 160)", borderColor: "oklch(0.25 0.06 160)", color: "oklch(0.65 0.03 80)" }}
        >
          <p>© {new Date().getFullYear()} Handy Pioneers, LLC · Clark County, WA · (360) 838-6731</p>
        </footer>
      </div>
    </>
  );
}
