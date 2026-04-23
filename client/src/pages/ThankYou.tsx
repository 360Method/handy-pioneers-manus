/**
 * ThankYou — Post-inquiry confirmation page at /thankyou
 * Design: Pacific Northwest Craftsman — matches main site aesthetic
 * Auto-redirects to home after 10 seconds with a visible countdown.
 */

import { useEffect, useState } from "react";
import { CheckCircle, Star, ArrowLeft, Phone } from "lucide-react";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-full-logo_4f724ec4.jpg";

export default function ThankYou() {
  const [countdown, setCountdown] = useState(10);

  // Auto-redirect countdown
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Thank You | Handy Pioneers";

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
      document.title = "Handy Pioneers — Reliable Renovations, Trusted Results";
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.97 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }}
    >
      {/* ── Top Nav ── */}
      <header
        className="w-full border-b"
        style={{
          backgroundColor: "oklch(0.22 0.07 160)",
          borderColor: "oklch(0.28 0.07 160)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{ textDecoration: "none" }}
          >
            <img src={LOGO_URL} alt="Handy Pioneers Logo" className="h-10 w-auto" />
            <span
              className="font-bold text-base hidden sm:inline"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.95 0.02 80)" }}
            >
              Handy Pioneers
            </span>
          </a>
          <a
            href="tel:+13608386731"
            className="inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "oklch(0.80 0.10 80)", textDecoration: "none" }}
          >
            <Phone size={14} />
            (360) 838-6731
          </a>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="w-full max-w-xl text-center rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: "oklch(1 0 0)",
            boxShadow: "0 4px 32px oklch(0 0 0 / 0.08)",
            border: "1px solid oklch(0.90 0.015 80)",
          }}
        >
          {/* Check icon */}
          <div className="flex justify-center mb-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.92 0.06 160)" }}
            >
              <CheckCircle size={44} style={{ color: "oklch(0.32 0.07 160)" }} strokeWidth={1.8} />
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Thank You!
          </h1>

          {/* Message */}
          <p
            className="text-base leading-relaxed mb-2"
            style={{ color: "oklch(0.38 0.02 80)" }}
          >
            We appreciate you taking the time to submit your inquiry. A member of the Handy Pioneers team will be in touch with you shortly.
          </p>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: "oklch(0.38 0.02 80)" }}
          >
            We look forward to providing you with excellent service and earning your 5-star review!
          </p>

          {/* 5 stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={28} fill="oklch(0.62 0.14 65)" color="oklch(0.62 0.14 65)" />
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "oklch(0.32 0.07 160)",
                color: "oklch(1 0 0)",
                textDecoration: "none",
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              <ArrowLeft size={15} />
              Back to Home
            </a>
            <a
              href="tel:+13608386731"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-colors hover:opacity-80"
              style={{
                borderColor: "oklch(0.32 0.07 160)",
                color: "oklch(0.32 0.07 160)",
                textDecoration: "none",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <Phone size={15} />
              (360) 838-6731
            </a>
          </div>

          {/* Auto-redirect notice */}
          <p
            className="text-xs"
            style={{ color: "oklch(0.62 0.02 80)" }}
          >
            Redirecting you to the home page in{" "}
            <span style={{ fontWeight: 700, color: "oklch(0.32 0.07 160)" }}>{countdown}</span>{" "}
            second{countdown !== 1 ? "s" : ""}…
          </p>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-5 text-center text-xs border-t"
        style={{
          backgroundColor: "oklch(0.18 0.06 160)",
          borderColor: "oklch(0.25 0.06 160)",
          color: "oklch(0.65 0.03 80)",
        }}
      >
        <p>© {new Date().getFullYear()} Handy Pioneers, LLC · Clark County, WA · (360) 838-6731</p>
      </footer>
    </div>
  );
}
