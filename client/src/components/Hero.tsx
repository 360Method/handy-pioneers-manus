/**
 * Hero.tsx — Dual-Track Hero
 * Design: Dark forest green overlay on PNW estate photography.
 * Two equal-weight choice cards below the headline.
 * Track A: Project Path → HousecallPro modal
 * Track B: Proactive Path → /360-method page
 * Vocabulary: premium, asset, proactive. No "handyman", no "free estimate".
 */

import { Star, ArrowRight, Wrench, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-hero-bg-R4GcYQJHeouBp86VQhqvCa.webp";

export default function Hero() {
  const [, navigate] = useLocation();

  const handleBookOnline = () => {
    if (window.HCPWidget) window.HCPWidget.openModal();
  };

  return (
    <section
      className="relative flex flex-col justify-center"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        minHeight: "100vh",
      }}
    >
      {/* Dark overlay — heavier left for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(14,26,20,0.93) 0%, rgba(14,26,20,0.78) 55%, rgba(14,26,20,0.40) 100%)",
        }}
      />

      <div className="container relative z-10 py-20">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="#C8892A" color="#C8892A" />
            ))}
          </div>
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            5-Star Rated · Licensed &amp; Insured · Clark County, WA
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5 text-white"
          style={{ fontFamily: "'Playfair Display', serif", maxWidth: "680px" }}
        >
          Most Homeowners
          <br />
          React.{" "}
          <span style={{ color: "oklch(0.80 0.10 65)" }}>Our Clients</span>
          <br />
          Are Always Three
          <br />
          Steps Ahead.
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl mb-12 leading-relaxed"
          style={{
            color: "rgba(255,255,255,0.82)",
            fontFamily: "'Source Sans 3', sans-serif",
            maxWidth: "520px",
          }}
        >
          Handy Pioneers is Clark County's exclusive delivery partner for the{" "}
          <strong style={{ color: "oklch(0.80 0.10 65)" }}>360° Method</strong> — a proven
          framework for protecting, preserving, and advancing your most valuable asset.
        </p>

        {/* Dual-Track Choice Cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          {/* Track A — Project Path */}
          <button
            onClick={handleBookOnline}
            className="group text-left rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              borderColor: "rgba(200,137,42,0.50)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "oklch(0.65 0.14 65)" }}
              >
                <Wrench size={18} color="white" />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Track A — The Project Path
              </span>
            </div>
            <p
              className="text-white font-semibold text-lg mb-1 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "I have a specific project in mind."
            </p>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Tell us about your project. We'll walk the property, assess the scope, and present a clear plan of action.
            </p>
            <span
              className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider group-hover:gap-2 transition-all"
              style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Schedule a Consultation <ArrowRight size={14} />
            </span>
          </button>

          {/* Track B — Proactive Path */}
          <button
            onClick={() => navigate("/360-method")}
            className="group text-left rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              borderColor: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
              >
                <ShieldCheck size={18} color="white" />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Track B — The Proactive Path
              </span>
            </div>
            <p
              className="text-white font-semibold text-lg mb-1 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "I want my home proactively managed."
            </p>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The 360° Method gives you a complete picture, a prioritized roadmap, and a dedicated team to execute it.
            </p>
            <span
              className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider group-hover:gap-2 transition-all"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Enter the 360° Method <ArrowRight size={14} />
            </span>
          </button>
        </div>

        {/* Phone + service area */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
          <a
            href="tel:+13605449858"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            📞 (360) 544-9858
          </a>
          <span className="hidden sm:block" style={{ color: "rgba(255,255,255,0.30)" }}>·</span>
          <span
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Serving Vancouver · Camas · Battle Ground · Ridgefield · Washougal · La Center
          </span>
        </div>
      </div>
    </section>
  );
}
