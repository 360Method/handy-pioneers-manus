/**
 * Method360.tsx — /360-method
 * Design: Dark forest green + warm gold. Premium, estate-level aesthetic.
 * Sections: Hero intro, 3-phase breakdown, 3-path entry system, disclaimer, CTA.
 * Vocabulary: asset, proactive, curated, assessment, roadmap. No "handyman", no "free".
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Eye, Zap, TrendingUp, FileText, ClipboardList, Users, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-hero-bg-R4GcYQJHeouBp86VQhqvCa.webp";

const phases = [
  {
    number: "01",
    phase: "PHASE 1",
    name: "AWARE",
    steps: "Baseline · Inspect · Track",
    icon: Eye,
    description:
      "You cannot protect what you don't fully understand. Phase 1 establishes the complete picture of your home's current condition — a documented baseline that becomes your property's permanent health record. Every system, every surface, every vulnerability: assessed, recorded, and tracked.",
    color: "oklch(0.65 0.14 65)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/method-aware-phase-2F635avV6WHaupFCDniGEq.webp",
    imageAlt: "Handy Pioneers technician conducting a thorough home assessment with flashlight and clipboard",
    bullets: ["Full home condition baseline", "Documented health record", "Every system assessed & tracked"],
  },
  {
    number: "02",
    phase: "PHASE 2",
    name: "ACT",
    steps: "Prioritize · Schedule · Execute",
    icon: Zap,
    description:
      "With a clear baseline in place, Phase 2 transforms data into decisions. Your home's needs are organized into a NOW / SOON / WAIT roadmap — a tiered action plan that eliminates guesswork, prevents deferred maintenance from compounding into costly emergencies, and puts every project on a timeline that works for your life.",
    color: "oklch(0.50 0.14 65)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/method-act-phase-YChSs8K3sNEUJqvQnAJWUe.webp",
    imageAlt: "Skilled craftsman executing precision carpentry and repair work inside a Pacific Northwest home",
    bullets: ["NOW / SOON / WAIT roadmap", "Zero deferred maintenance", "Projects on your timeline"],
  },
  {
    number: "03",
    phase: "PHASE 3",
    name: "ADVANCE",
    steps: "Preserve · Upgrade · Scale",
    icon: TrendingUp,
    description:
      "Phase 3 is where proactive maintenance becomes strategic investment. With your home's foundation secured, we identify targeted upgrades that preserve long-term value, improve livability, and position your property to appreciate — whether your horizon is five years or twenty-five.",
    color: "oklch(0.32 0.07 160)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/method-advance-phase-BSxsz5RJSYWJEcHyZ44Bva.webp",
    imageAlt: "Beautifully maintained Pacific Northwest craftsman home at golden hour with new deck and landscaping",
    bullets: ["Long-term value preservation", "Strategic upgrade roadmap", "Property appreciation plan"],
  },
];

const paths = [
  {
    number: "PATH 1",
    title: "The 360° Priority Translation",
    condition: "You have a recent inspection report.",
    icon: FileText,
    description:
      "You've already invested in a home inspection. That 50-page report is sitting in your inbox — detailed, technical, and overwhelming. We translate it into a clear, prioritized NOW / SOON / WAIT roadmap, so you know exactly what to address and in what order.",
    cta: "Upload Your Report",
    route: "/360-method/translation",
    accent: "oklch(0.65 0.14 65)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/path-translation-eomtCv5VwKsAQfFYjgnQX5.webp",
    imageAlt: "Home inspection report open on a desk with reading glasses and coffee",
  },
  {
    number: "PATH 2",
    title: "The 360° Baseline Walkthrough",
    condition: "You don't have a recent inspection report.",
    icon: ClipboardList,
    description:
      "Our certified technician conducts a comprehensive 2–3 hour proactive maintenance assessment of your home — establishing the baseline that becomes your property's permanent health record. You receive a detailed written report, a prioritized action plan, and a clear picture of where your home stands today.",
    cta: "Schedule Your Walkthrough",
    route: "/360-method/walkthrough",
    accent: "oklch(0.32 0.07 160)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/path-walkthrough-CWMQUL8LTkJkmLirx7v9ff.webp",
    imageAlt: "Handy Pioneers technician checking window seal with moisture meter while homeowner watches",
  },
  {
    number: "PATH 3",
    title: "The 360° Inspector Referral",
    condition: "You need a deep dive or are preparing to list.",
    icon: Users,
    description:
      "For homeowners who want a comprehensive, legally documented assessment — or who are preparing for a sale — we connect you with a vetted, licensed inspector from our professional network. Once complete, we execute Path 1: translating the report into your prioritized roadmap.",
    cta: "Request a Referral",
    route: "/360-method/referral",
    accent: "oklch(0.45 0.10 160)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/path-referral-UxEgcJC8wtSCy6WJEF5ag9.webp",
    imageAlt: "Licensed inspector shaking hands with homeowner in front of a Pacific Northwest craftsman home",
  },
];

export default function Method360() {
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "The 360° Method | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navbar />

      {/* ─── Hero ─── */}
      <section
        className="relative flex items-center"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          minHeight: "60vh",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(14,26,20,0.95) 0%, rgba(14,26,20,0.75) 60%, rgba(14,26,20,0.40) 100%)" }}
        />
        <div className="container relative z-10 py-24">
          <div className="max-w-2xl">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-6"
              style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Exclusive to Handy Pioneers
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The 360° Method
            </h1>
            <p
              className="text-xl leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              A Roadmap to Home Ownership Mastery.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "500px" }}
            >
              A nine-step framework that moves homeowners from reactive maintenance to proactive
              wealth building — in three deliberate phases. Delivered exclusively by Handy Pioneers
              in Clark County, Washington.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Positioning Statement ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl text-center">
          <p
            className="text-xl md:text-2xl leading-relaxed text-white/90 italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "The 360° Method is the roadmap. Handy Pioneers is the exclusive, certified team that
            executes it. Together, they give you not just a repaired home — but a managed asset."
          </p>
          <p
            className="mt-4 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            — Marcin Micek, Founder · Handy Pioneers
          </p>
        </div>
      </section>

      {/* ─── Three Phases ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-divider mb-4 justify-center">
              <span className="section-divider-label">The Framework</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
            >
              Three Phases. One Destination.
            </h2>
            <p
              className="mt-4 text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              From establishing your home's baseline to advancing its long-term value — the 360°
              Method is a complete system, not a checklist.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="rounded-2xl overflow-hidden border flex flex-col"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    borderColor: "oklch(0.88 0.015 80)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Phase image */}
                  <div className="relative overflow-hidden" style={{ height: "220px" }}>
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="w-full h-full object-cover"
                      style={{ transition: "transform 0.4s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    {/* Phase badge overlay */}
                    <div
                      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: p.color, backdropFilter: "blur(4px)" }}
                    >
                      <Icon size={14} color="white" />
                      <span
                        className="text-xs font-bold uppercase tracking-widest text-white"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {p.phase}
                      </span>
                    </div>
                    {/* Number watermark */}
                    <div
                      className="absolute bottom-3 right-4 text-6xl font-bold leading-none select-none"
                      style={{ color: "rgba(255,255,255,0.18)", fontFamily: "'Playfair Display', serif" }}
                    >
                      {p.number}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3
                        className="text-2xl font-bold mb-1"
                        style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                      >
                        {p.name}
                      </h3>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: p.color, fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {p.steps}
                      </div>
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {p.description}
                    </p>

                    {/* Bullet points */}
                    <ul className="mt-auto space-y-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: p.color }}
                          />
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "oklch(0.38 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                          >
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Transformation Visual ─── */}
      <section className="py-0 overflow-hidden" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <div className="relative">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/360-before-after-home-3RbSRiUr6wXkF6L9EM95NW.webp"
            alt="Pacific Northwest home before and after the 360° Method — neglected exterior transformed into a pristine, well-maintained property"
            className="w-full object-cover"
            style={{ maxHeight: "520px", objectPosition: "center" }}
          />
          <div
            className="absolute inset-0 flex items-end"
            style={{ background: "linear-gradient(to top, rgba(14,26,20,0.75) 0%, transparent 50%)" }}
          >
            <div className="container pb-10">
              <div className="flex gap-8 justify-center">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>Before</div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Reactive. Deferred. Declining.</div>
                </div>
                <div className="w-px bg-white/30" />
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}>After the 360° Method</div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Proactive. Protected. Advancing.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Choose Your Starting Point ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.96 0.008 80)" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-divider mb-4 justify-center">
              <span className="section-divider-label">Your Entry Point</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
            >
              Choose Your Starting Point
            </h2>
            <p
              className="mt-4 text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Three entry points. One destination: a home that works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <button
                  key={path.number}
                  onClick={() => navigate(path.route)}
                  className="group text-left rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    borderColor: "oklch(0.88 0.015 80)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  }}
                >
                  {/* Path image */}
                  <div className="relative overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={path.image}
                      alt={path.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(14,26,20,0.55) 0%, transparent 60%)" }}
                    />
                    {/* Path badge */}
                    <div
                      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: path.accent }}
                    >
                      <Icon size={13} color="white" />
                      <span
                        className="text-xs font-bold uppercase tracking-widest text-white"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {path.number}
                      </span>
                    </div>
                    {/* Condition tag at bottom of image */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span
                        className="text-xs font-semibold text-white/90 italic"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {path.condition}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3
                      className="text-xl font-bold mb-3 leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                    >
                      {path.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed flex-1 mb-5"
                      style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {path.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-200"
                      style={{ color: path.accent, fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {path.cta} <ChevronRight size={14} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Disclaimer ─── */}
      <section className="py-10" style={{ backgroundColor: "oklch(0.94 0.008 80)" }}>
        <div className="container max-w-3xl">
          <div
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: "oklch(1 0 0)",
              borderColor: "oklch(0.85 0.015 80)",
              borderLeft: "4px solid oklch(0.65 0.14 65)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Important Disclaimer
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The 360° Method Baseline Walkthrough is a proactive maintenance assessment conducted
              by a trained home maintenance technician. It is <strong>not a legally binding real
              estate home inspection</strong> and does not replace the services of a licensed home
              inspector. Handy Pioneers does not assume liability for conditions not identified
              during the walkthrough. For legal inspection purposes — including real estate
              transactions — we recommend engaging a licensed home inspector. The 360° Method is
              designed to work in partnership with licensed inspections, not as a substitute for
              them.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container text-center max-w-2xl">
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Not Sure Where to Start?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Call Marcin directly. He'll help you identify the right entry point for your home in
            under five minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13605449858"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base border-2 border-white text-white hover:bg-white/10 transition-all"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              📞 (360) 544-9858
            </a>
            <button
              onClick={() => navigate("/360-method/walkthrough")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base transition-all hover:opacity-90"
              style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Schedule a Baseline Walkthrough <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
