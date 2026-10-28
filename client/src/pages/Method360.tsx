/**
 * Method360.tsx - /360-method
 * Design: Dark forest green + warm amber. Premium, estate-level aesthetic.
 * Sections: Hero intro, 3-phase breakdown (anchors #aware #act #advance), the
 * nine steps with links to each step page, disclaimer, CTA.
 * Vocabulary: asset, proactive, curated, assessment, roadmap. Entity surface:
 * the NEVER_SAY table in brand.ts applies and scripts/check-copy.mjs enforces it.
 */

import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { ArrowRight, Eye, Zap, TrendingUp, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SampleReportModal from "@/components/SampleReportModal";
import PhotoLightbox from "@/components/PhotoLightbox";
import ZoomableImage from "@/components/ZoomableImage";
import { LIVING_ROOM_BEFORE_AFTER, METHOD_ROADMAP_OG, METHOD_ROADMAP_PDF } from "@/lib/assets";
import SEO from "@/components/SEO";
import ThreeSixtyRoadmap from "@/components/method/ThreeSixtyRoadmap";
import { METHOD_CANON } from "@/lib/methodCanon";
import { getStepPage, getStepRecord, isStepPublished, comingLabel, methodStepsItemList, STEP_PATH } from "@/lib/methodSteps";

const HERO_BG =
  "/images/site/hero-bg.webp";

const phases = [
  {
    number: "01",
    anchor: "aware",
    phase: "PHASE 1",
    name: "AWARE",
    steps: "Baseline · Inspect · Track",
    icon: Eye,
    description:
      "You cannot protect what you don't fully understand. Phase 1 establishes the complete picture of your home's current condition - a documented baseline that becomes your property's permanent health record. Every system, every surface, every vulnerability: assessed, recorded, and tracked.",
    color: "oklch(0.65 0.14 65)",
    image: "/images/site/method-aware.webp",
    imageAlt: "Handy Pioneers technician conducting a thorough home assessment with flashlight and clipboard",
    bullets: ["Full home condition baseline", "Documented health record", "Every system assessed & tracked"],
  },
  {
    number: "02",
    anchor: "act",
    phase: "PHASE 2",
    name: "ACT",
    steps: "Prioritize · Schedule · Execute",
    icon: Zap,
    description:
      "Phase 2 runs on two parallel tracks. The first: your assessment findings are organized into a NOW / SOON / WAIT roadmap and executed in priority order. The second - and what makes this a proactive program, not a one-time fix - is a pre-defined seasonal visit schedule. Every spring, summer, fall, and winter, we return to your home and work through a standing list of Pacific Northwest-specific tasks: moss treatment, gutter clearing, weatherstripping, pipe protection, and more. These visits happen regardless of what the assessment found. Your home is never left unattended between projects.",
    color: "oklch(0.50 0.14 65)",
    image: "/images/site/method-act.webp",
    imageAlt: "Skilled craftsman executing precision carpentry and repair work inside a Pacific Northwest home",
    bullets: ["NOW / SOON / WAIT priority roadmap", "Four seasonal visits per year", "Pre-defined PNW seasonal task list", "Trade coordination included"],
  },
  {
    number: "03",
    anchor: "advance",
    phase: "PHASE 3",
    name: "ADVANCE",
    steps: "Preserve · Upgrade · Scale",
    icon: TrendingUp,
    description:
      "Phase 3 is where proactive maintenance becomes strategic investment. With your home's foundation secured, we identify targeted upgrades that preserve long-term value, improve livability, and position your property to appreciate - whether your horizon is five years or twenty-five.",
    color: "oklch(0.32 0.07 160)",
    image: "/images/site/method-advance.webp",
    imageAlt: "Beautifully maintained Pacific Northwest craftsman home at golden hour with new deck and landscaping",
    bullets: ["Long-term value preservation", "Strategic upgrade roadmap", "Property appreciation plan"],
  },
];

export default function Method360() {
  const [, navigate] = useLocation();
  const [showReport, setShowReport] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState<number | null>(null);
  const phasePhotos = phases.map((p) => ({ src: p.image, alt: p.imageAlt, caption: `${p.phase}: ${p.name}` }));

  useEffect(() => {
    document.title = "The 360° Method | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <SEO
        path="/360-method"
        title="The 360° Method - Proactive Home Care for Clark County Homes | Handy Pioneers"
        description="A home where nothing slips. The 360° Method keeps Vancouver WA homes documented, maintained, and holding their value: a baseline record, a prioritized plan, and seasonal care that never misses. Serving all of Clark County."
        image={METHOD_ROADMAP_OG}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "The 360° Method - Proactive Home Care for Clark County Homes",
            url: "https://handypioneers.com/360-method",
          },
          methodStepsItemList(),
        ]}
      />
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
              The 360° Method™
            </h1>
            <p
              className="text-xl leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The Standard of Care Your Home Has Always Deserved.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "500px" }}
            >
              Most homeowners react. The ones who don't have a system - one that knows their home, maintains it with precision, and advances it with intention. Every season. Without exception.
            </p>

            {/* Above-the-fold enrollment CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => navigate("/membership")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold uppercase tracking-wide text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Schedule Your Baseline Walkthrough <ArrowRight size={16} />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("framework");
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 72;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70 bg-transparent border-0 cursor-pointer"
                style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Read the nine steps ↓
              </button>
            </div>
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
            “The homeowners who sleep well at night aren’t the ones who got lucky. They’re the ones who decided their home deserved the same attention they give everything else that matters - and found a partner who shows up every season to make sure it does.”
          </p>
          <p
            className="mt-4 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
 - Marcin Micek, Founder · Handy Pioneers
          </p>
        </div>
      </section>

      {/* ─── Three Phases ─── */}
      <section id="framework" className="py-20" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
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
              Know what your home needs. Maintain it without compromise. Advance it with intention. This is what a high standard of care looks like, applied to your most important asset.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  id={p.anchor}
                  className="rounded-2xl overflow-hidden border flex flex-col"
                  style={{
                    scrollMarginTop: "88px",
                    backgroundColor: "oklch(1 0 0)",
                    borderColor: "oklch(0.88 0.015 80)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Phase image */}
                  <div className="relative overflow-hidden" style={{ height: "220px" }}>
                    <button
                      type="button"
                      onClick={() => setPhaseIndex(phases.indexOf(p))}
                      className="block w-full h-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                      aria-label={`Open photo: ${p.imageAlt}`}
                    >
                      <img
                        src={p.image}
                        alt={p.imageAlt}
                        className="w-full h-full object-cover"
                        style={{ transition: "transform 0.4s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </button>
                    {/* Phase badge overlay */}
                    <div
                      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-none"
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

      {/* ─── The Nine Steps: the one roadmap visual, same component and data as the member portal ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.95 0.008 80)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="section-divider mb-4 justify-center">
              <span className="section-divider-label">The Nine Steps</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
            >
              Three Phases. Nine Steps.
            </h2>
            <p
              className="mt-4 text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              The full progression we run on every home we care for, from the first walkthrough to long-term value.
            </p>
          </div>
          <div
            className="rounded-2xl p-4 sm:p-6 border"
            style={{ backgroundColor: "oklch(0.98 0.005 80)", borderColor: "oklch(0.88 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            <ThreeSixtyRoadmap
              canon={METHOD_CANON}
              variant="full"
              footnote
              onSelect={(k) => { if (getStepPage(k)) navigate(STEP_PATH(k)); }}
            />
          </div>

          {/* Read each step: nine tiles, one per step page. Unpublished steps show
              their month; the tiles turn into links on their publish date. */}
          <div className="mt-10">
            <h3
              className="text-2xl font-bold text-center mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
            >
              Read each step
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {METHOD_CANON.phases.flatMap((phase) =>
                phase.steps.map((step) => {
                  const rec = getStepRecord(step.key);
                  const live = !!rec && isStepPublished(rec);
                  const inner = (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="w-8 h-8 rounded-full inline-flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ backgroundColor: phase.tone.wash, color: phase.tone.accent, border: `1px solid ${phase.tone.accent}` }}
                        >
                          {step.number}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: phase.tone.accent, fontFamily: "'Source Sans 3', sans-serif" }}>
                          {phase.name}
                        </span>
                      </div>
                      <p className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>{step.name}</p>
                      <p className="text-sm leading-relaxed mt-1" style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{step.line}</p>
                      <p className="text-xs font-semibold mt-3" style={{ color: live ? phase.tone.accent : "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                        {live ? "Read the step →" : rec ? comingLabel(rec) : ""}
                      </p>
                    </>
                  );
                  return live ? (
                    <Link
                      key={step.key}
                      href={STEP_PATH(step.key)}
                      className="block rounded-xl p-5 border transition-shadow hover:shadow-md"
                      style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)" }}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div
                      key={step.key}
                      className="rounded-xl p-5 border"
                      style={{ backgroundColor: "oklch(0.98 0.005 80)", borderColor: "oklch(0.88 0.015 80)" }}
                    >
                      {inner}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-sm" style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
            <a href={METHOD_ROADMAP_PDF} className="underline underline-offset-4" style={{ color: "oklch(0.32 0.07 160)" }}>
              Download the roadmap as a one-page PDF
            </a>
          </p>
        </div>
      </section>

      {/* ─── Transformation Visual ───
          A real job, not an illustration: the same living room before and
          after (the photo in the homepage gallery). Square and already labelled,
          so it is shown whole rather than cropped into a wide banner. */}
      <section className="py-14" style={{ backgroundColor: "oklch(0.22 0.04 155)" }}>
        <div className="container max-w-xl">
          <ZoomableImage
            src={LIVING_ROOM_BEFORE_AFTER}
            alt="The same living room before and after: bare subfloor and dated walls, then hardwood flooring, recessed lighting and an updated fireplace"
            caption="Living room transformation with hardwood flooring, recessed lighting, and updated fireplace"
            className="w-full h-auto rounded-xl shadow-lg"
            loading="lazy"
          />
          <div className="flex gap-6 sm:gap-8 justify-center mt-8">
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
              during the walkthrough. For legal inspection purposes - including real estate
              transactions - we recommend engaging a licensed home inspector. The 360° Method is
              designed to work in partnership with licensed inspections, not as a substitute for
              them.
            </p>
            <p
              className="text-sm leading-relaxed mt-4"
              style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <strong>Proprietary methodology.</strong> The 360° Method™, including its name, its
              three-phase structure (Aware, Act, Advance), its nine-step framework, and the
              Proactive Path membership program, is the proprietary methodology and intellectual
              property of Handy Pioneers. "The 360° Method" and "Proactive Path" are claimed as
              trademarks of Handy Pioneers. The framework, its written materials, and its branding
              may not be copied, adapted, rebranded, or used to market a competing program without
              the express written permission of Handy Pioneers.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Pricing Signal ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>Transparent Pricing</p>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>What Affects the Investment</h2>
            <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}>Every home is different. Here’s what shapes the cost of any project.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              { label: "Scope & Complexity", detail: "A single rot repair vs. a full deck rebuild are priced differently. We assess the full scope before quoting - no surprises." },
              { label: "Material Selections", detail: "You choose the finish level - we price accordingly and document it in writing before work begins." },
              { label: "Trade Coordination", detail: "Projects requiring licensed electricians, plumbers, or HVAC techs include vetted specialty-trade costs, always disclosed upfront." },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-6 border" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "oklch(0.65 0.14 65)" }}>
                  <DollarSign size={15} color="white" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{item.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}>{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-5 border flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: "rgba(200,137,42,0.10)", borderColor: "rgba(200,137,42,0.35)" }}>
            <p className="text-sm" style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}>Every engagement starts with an on-site consultation - we assess the full scope and present a written plan tailored to your home. Questions first? Call us: <a href="tel:+13608386731" className="font-bold underline hover:opacity-80">(360) 838-6731</a></p>
            <button
              onClick={() => setShowReport(true)}
              className="shrink-0 text-sm font-bold px-5 py-2.5 rounded-lg border-0 cursor-pointer transition-opacity hover:opacity-80 whitespace-nowrap"
              style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              See a Sample Report →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.16 0.05 160)" }}>
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
            Reach us directly. We'll help you identify the right entry point for your home in under five minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13608386731"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base border-2 border-white text-white hover:bg-white/10 transition-all"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              📞 (360) 838-6731
            </a>
            <button
              onClick={() => navigate("/membership")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base transition-all hover:opacity-90"
              style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              See Plans &amp; Book Your Baseline <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <SampleReportModal open={showReport} onClose={() => setShowReport(false)} />
      <PhotoLightbox photos={phasePhotos} index={phaseIndex} onChange={setPhaseIndex} />
    </div>
    </>
  );
}
