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
                  className="rounded-2xl p-8 border flex flex-col"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    borderColor: "oklch(0.88 0.015 80)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: p.color }}
                    >
                      <Icon size={22} color="white" />
                    </div>
                    <div>
                      <div
                        className="text-xs font-bold uppercase tracking-widest mb-0.5"
                        style={{ color: p.color, fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {p.phase}
                      </div>
                      <div
                        className="text-2xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                      >
                        {p.name}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.55 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {p.steps}
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {p.description}
                  </p>
                </div>
              );
            })}
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
                  className="group text-left rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    borderColor: "oklch(0.88 0.015 80)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
                    style={{ backgroundColor: path.accent }}
                  >
                    <Icon size={22} color="white" />
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: path.accent, fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {path.number}
                  </div>
                  <h3
                    className="text-xl font-bold mb-2 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                  >
                    {path.title}
                  </h3>
                  <p
                    className="text-xs font-semibold uppercase tracking-wide mb-3"
                    style={{ color: "oklch(0.55 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {path.condition}
                  </p>
                  <p
                    className="text-sm leading-relaxed flex-1 mb-6"
                    style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {path.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider group-hover:gap-2 transition-all"
                    style={{ color: path.accent, fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {path.cta} <ChevronRight size={14} />
                  </span>
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
