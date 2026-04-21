/**
 * Hero.tsx — Full-Viewport Decision Gate
 * Design: Dark forest green. Two dominant split choices fill the viewport.
 * Every element pushes toward one of two paths — no neutral content.
 * Track A: Project Path → HousecallPro modal
 * Track B: Proactive Path → /360-method
 * Mobile-first: stacked on mobile, side-by-side on md+
 */

import { Star, ArrowRight, Wrench, ShieldCheck, ChevronDown } from "lucide-react";
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
    else window.open("https://app.housecallpro.com/book/handy-pioneers", "_blank");
  };

  return (
    <section
      className="relative flex flex-col"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        minHeight: "100vh",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,20,15,0.92) 0%, rgba(10,20,15,0.85) 60%, rgba(10,20,15,0.96) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1" style={{ minHeight: "100vh" }}>

        {/* ── Top strip: trust signals ── */}
        <div
          className="flex items-center justify-center gap-3 py-3 px-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} fill="#C8892A" color="#C8892A" />
            ))}
          </div>
          <span
            className="text-xs font-semibold tracking-wide"
            style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            4.9 · 34 Reviews · Licensed &amp; Insured · Clark County, WA
          </span>
        </div>

        {/* ── Central headline ── */}
        <div className="flex flex-col items-center justify-center text-center px-6 pt-12 pb-8">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Handy Pioneers · Clark County's Home Management Partner
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", maxWidth: "720px" }}
          >
            Your Home Deserves a{" "}
            <span style={{ color: "oklch(0.80 0.10 65)" }}>Plan,</span>
            <br className="hidden sm:block" />
            {" "}Not a Reaction.
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed mb-3"
            style={{
              color: "rgba(255,255,255,0.72)",
              fontFamily: "'Source Sans 3', sans-serif",
              maxWidth: "520px",
            }}
          >
            Tell us where you are. We'll show you exactly where to go next.
          </p>
          {/* Marcin context */}
          <div className="flex items-center gap-3 mt-1 mb-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/marcin-working_961d0334.jpg"
              alt="Marcin Micek — Owner"
              className="w-10 h-10 rounded-full object-cover object-top border-2 shrink-0"
              style={{ borderColor: "oklch(0.65 0.14 65)", objectPosition: "center 15%" }}
            />
            <p
              className="text-xs text-left"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "400px" }}
            >
              <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Marcin Micek</span>, owner &amp; lead technician — WA Lic. HANDYP*761NH. Personally on every walkthrough and job in Clark County, WA.
            </p>
          </div>
          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Choose your path ↓
          </p>
        </div>

        {/* ── Split Path Cards ── */}
        <div className="flex flex-col md:flex-row flex-1 px-4 md:px-8 pb-10 gap-4 max-w-5xl mx-auto w-full">

          {/* ── Track A: Project Path ── */}
          <button
            onClick={handleBookOnline}
            className="group flex-1 text-left rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
            style={{
              backgroundColor: "rgba(200,137,42,0.12)",
              border: "1.5px solid rgba(200,137,42,0.55)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "oklch(0.65 0.14 65)" }}
                >
                  <Wrench size={20} color="white" />
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Path A
                  </p>
                  <p
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    The Project Path
                  </p>
                </div>
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "I have a specific project in mind."
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Deck repair. Bathroom remodel. Fence replacement. Whatever the project, we walk the property, assess the full scope, and present a clear plan with no surprises.
              </p>

              <ul className="space-y-2 mb-8">
                {[
                  "Free on-site consultation",
                  "Detailed written estimate",
                  "Licensed, insured, vetted crew",
                  "Marcin on every walkthrough",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                    <span style={{ color: "oklch(0.80 0.10 65)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-200 group-hover:brightness-110"
              style={{ backgroundColor: "oklch(0.65 0.14 65)" }}
            >
              <span
                className="font-bold text-sm uppercase tracking-wider"
                style={{ color: "oklch(0.10 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Schedule a Consultation
              </span>
              <ArrowRight size={18} color="oklch(0.10 0.04 80)" className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* ── Divider ── */}
          <div className="hidden md:flex flex-col items-center justify-center gap-3 px-2">
            <div className="flex-1" style={{ width: "1px", backgroundColor: "rgba(255,255,255,0.12)" }} />
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-full"
              style={{
                color: "rgba(255,255,255,0.40)",
                backgroundColor: "rgba(255,255,255,0.06)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              or
            </span>
            <div className="flex-1" style={{ width: "1px", backgroundColor: "rgba(255,255,255,0.12)" }} />
          </div>

          <div className="flex md:hidden items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Source Sans 3', sans-serif" }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
          </div>

          {/* ── Track B: Proactive Path ── */}
          <button
            onClick={() => navigate("/360-method")}
            className="group flex-1 text-left rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
            style={{
              backgroundColor: "rgba(30,55,42,0.60)",
              border: "1.5px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
                >
                  <ShieldCheck size={20} color="white" />
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.50)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Path B
                  </p>
                  <p
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    The Proactive Path
                  </p>
                </div>
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "I want my home proactively managed."
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                The 360° Method gives you a complete picture of your home's condition, a prioritized roadmap, and a dedicated team to execute it — before problems become emergencies.
              </p>

              <ul className="space-y-2 mb-8">
                {[
                  "Full baseline property assessment",
                  "NOW / SOON / WAIT priority roadmap",
                  "Ongoing Home Score tracking",
                  "Single point of contact — always",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                    <span style={{ color: "oklch(0.65 0.18 160)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-200 group-hover:brightness-110"
              style={{ backgroundColor: "oklch(0.28 0.07 160)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span
                className="font-bold text-sm uppercase tracking-wider text-white"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Enter the 360° Method
              </span>
              <ArrowRight size={18} color="white" className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* ── Scroll nudge ── */}
        <div className="flex flex-col items-center pb-6 gap-1 opacity-40">
          <span className="text-xs text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Scroll to learn more
          </span>
          <ChevronDown size={16} color="white" className="animate-bounce" />
        </div>

      </div>
    </section>
  );
}
