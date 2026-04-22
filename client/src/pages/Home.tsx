/**
 * Home.tsx — Single-Page Layout
 * Design: Dark forest green / warm cream. Playfair Display headings, Source Sans 3 body.
 * All content lives here. Nav scrolls to anchors. Only two CTAs: Path A + Path B.
 * Sections: hero → outcomes/services → 360-method → gallery → reviews → about → faq → footer
 */

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Shield, Award, MapPin, Clock, Users, Wrench,
  ChevronDown, CheckCircle, Star, Home as HomeIcon, TrendingUp,
  Hammer, Paintbrush, TreePine, Zap, FileText, ShieldCheck
} from "lucide-react";
import { useLocation } from "wouter";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import SampleReportModal from "@/components/SampleReportModal";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
    eapps?: { AppsManager: { initAll: () => void } };
  }
}

// ── Constants ────────────────────────────────────────────────────────────────
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-hero-bg-R4GcYQJHeouBp86VQhqvCa.webp";
const MARCIN_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/marcin-working_961d0334.jpg";

const PHASE_IMAGES = {
  aware: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/method-aware-v3-c8jcSYFvmau28ZwUpGD4Vh.webp",
  act: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/method-act-v4-jwU4XG6UPccwgZoBTpgciD.webp",
  advance: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/method-advance-phase-BSxsz5RJSYWJEcHyZ44Bva.webp",
};

// ── Data ─────────────────────────────────────────────────────────────────────
const credentials = [
  { icon: Shield, label: "WA License HANDYP*761NH", detail: "Licensed Contractor — Washington State" },
  { icon: Award, label: "Insured up to $1,000,000", detail: "Full general liability coverage" },
  { icon: Clock, label: "1-Year Labor Guarantee", detail: "On every completed project" },
  { icon: MapPin, label: "Clark County, WA", detail: "Vancouver, Camas, Battle Ground, Ridgefield, Washougal" },
  { icon: Users, label: "4.9★ · 34 Reviews", detail: "Verified Google reviews" },
  { icon: Wrench, label: "Owner on Every Assessment", detail: "Marcin personally leads every walkthrough; skilled tradesmen execute the work" },
];

const values = [
  {
    title: "One Relationship, Full Accountability",
    body: "Every engagement runs through a single point of contact — from the first walkthrough through final sign-off. The work is executed by a vetted crew of skilled tradesmen and licensed specialists. You never manage vendors. The relationship manages it for you.",
  },
  {
    title: "Transparent From Day One",
    body: "Every engagement starts with a complimentary on-site consultation — we assess the full scope, listen to your priorities, and present a written plan tailored to your home. No ballpark numbers, no assumptions. You know exactly what you're getting, and why, before a single nail is driven.",
  },
  {
    title: "A System Built to Last",
    body: "Handy Pioneers isn't a one-and-done repair service. The 360° Method creates a living record of your home's condition — updated with every project, so the relationship compounds in value over time.",
  },
];

const outcomes = [
  {
    icon: TrendingUp,
    title: "Protected & Growing Asset Value",
    body: "A structured maintenance system prevents the deferred-cost spiral. Homes managed proactively consistently outperform neglected properties at resale — and the emergency repair premium disappears entirely.",
  },
  {
    icon: HomeIcon,
    title: "A Home That Performs at Its Best",
    body: "Every system working as designed. No mystery leaks, no seasonal surprises, no 'we'll deal with it later.' You live in the home you paid for — not a version of it that's slowly declining.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Contractor Coordination Burden",
    body: "One call, one relationship. We handle the full scope — from assessment to execution to trade coordination. You don’t manage vendors. You manage your life.",
  },
  {
    icon: FileText,
    title: "A Documented Property Record",
    body: "Every assessment, every project, every system update — documented in your 360° Priority Roadmap. When it's time to sell, refinance, or pass the property on, you have the receipts.",
  },
  {
    icon: Hammer,
    title: "Skilled Craftsmanship, Not Patch Work",
    body: "Every repair and renovation is done to last — using quality materials, proper technique, and vetted tradesmen. The standard is the same regardless of project size.",
  },
  {
    icon: Zap,
    title: "Predictable, Prioritized Spending",
    body: "The NOW / SOON / WAIT roadmap turns reactive spending into a planned budget. You know what's coming, when it's coming, and what it will cost — before it becomes urgent.",
  },
  {
    icon: Clock,
    title: "Proactive Maintenance as a Core Service",
    body: "Four times a year, we return to your home and work through a pre-defined seasonal task list built around the specific wear patterns of the Pacific Northwest. Moss treatment in spring. Deck sealing in summer. Gutter clearing before the rains. Pipe protection before the freeze. These visits are not improvised — they follow a standing protocol, and they happen regardless of what the assessment found. The program does not end when the roadmap is complete. It continues, season after season.",
  },
];

const services = [
  { icon: Hammer, label: "Kitchen & Bathroom Remodels" },
  { icon: Paintbrush, label: "Interior Painting & Finishing" },
  { icon: TreePine, label: "Deck & Fence Construction" },
  { icon: Wrench, label: "Plumbing & Fixture Upgrades" },
  { icon: Zap, label: "Electrical & Lighting" },
  { icon: HomeIcon, label: "Flooring Installation" },
  { icon: Shield, label: "Exterior Repairs & Siding" },
  { icon: TrendingUp, label: "ADU & Garage Conversions" },
  { icon: TreePine, label: "Pressure Washing & Moss Removal" },
  { icon: Hammer, label: "Carpentry & Custom Millwork" },
  { icon: Paintbrush, label: "Drywall & Texture" },
  { icon: Shield, label: "Gutter Cleaning & Repair" },
  { icon: Clock, label: "Proactive Maintenance Programs" },
  { icon: TrendingUp, label: "Seasonal Home Walkthroughs" },
];

const phases = [
  {
    phase: "PHASE 1",
    title: "Aware",
    tagline: "Know your home completely.",
    description: "You cannot protect what you don't fully understand. Phase 1 establishes the complete picture of your home's current condition — a documented baseline that becomes your property's permanent health record. Every system, every surface, every vulnerability: assessed, recorded, and tracked.",
    bullets: ["Full property walkthrough", "Documented baseline report", "System-by-system condition log"],
    image: PHASE_IMAGES.aware,
    color: "oklch(0.65 0.14 65)",
  },
  {
    phase: "PHASE 2",
    title: "Act",
    tagline: "Four visits a year. A standing seasonal task list. Nothing missed.",
    description: "Phase 2 runs on two parallel tracks. The first: your assessment findings are organized into a NOW / SOON / WAIT roadmap and executed in priority order. The second — and what makes this a proactive program, not a one-time fix — is a pre-defined seasonal visit schedule. Every spring, summer, fall, and winter, we return to your home and work through a standing list of Pacific Northwest–specific tasks: moss treatment, gutter clearing, weatherstripping, pipe protection, and more. These visits happen regardless of what the assessment found. Your home is never left unattended between projects.",
    bullets: ["NOW / SOON / WAIT priority roadmap", "Four seasonal visits per year", "Pre-defined PNW seasonal task list", "Trade coordination included"],
    image: PHASE_IMAGES.act,
    color: "oklch(0.55 0.18 160)",
  },
  {
    phase: "PHASE 3",
    title: "Advance",
    tagline: "Build long-term value, deliberately.",
    description: "Phase 3 is where proactive maintenance becomes strategic investment. With your home's foundation secured, we identify targeted upgrades that preserve long-term value, improve livability, and position your property to appreciate — whether your horizon is five years or twenty-five.",
    bullets: ["Strategic upgrade planning", "Home Score tracking over time", "Value-building project roadmap"],
    image: PHASE_IMAGES.advance,
    color: "oklch(0.60 0.14 200)",
  },
];

const faqs = [
  {
    category: "Pricing & Cost",
    items: [
      { q: "What does the initial consultation include?", a: "Every engagement starts with a complimentary on-site consultation. We walk the property, assess the full scope, listen to your priorities, and present a written plan tailored to your home — not a generic quote. No ballpark numbers over the phone for complex work." },
      { q: "What affects the final cost of a project?", a: "Scope and complexity, material selections, access and site conditions, and whether hidden issues are discovered once work begins. We document any scope changes in writing before proceeding." },
      { q: "Do you require a deposit?", a: "For larger projects, we typically ask for a materials deposit (usually 30–40%) before ordering. The balance is due upon completion. We never ask for full payment upfront." },
    ],
  },
  {
    category: "Who Does the Work",
    items: [
      { q: "Do you use subcontractors?", a: "For specialized trades (electrical, plumbing, HVAC), yes — we work with vetted, licensed subcontractors. Marcin coordinates and oversees all trade work. For general carpentry, maintenance, and renovation work, Marcin does the work himself." },
      { q: "Will Marcin personally be on my project?", a: "Yes. Marcin personally conducts every assessment walkthrough and is present on every job. He is not a salesperson who hands you off — he is the technician. This is a deliberate choice, not a limitation." },
      { q: "Are you licensed and insured?", a: "Yes. Handy Pioneers LLC is a Washington State licensed contractor (HANDYP*761NH) and carries full general liability insurance up to $1,000,000. We're happy to provide proof of insurance before any work begins." },
    ],
  },
  {
    category: "The 360° Method",
    items: [
      { q: "What exactly is the 360° Method?", a: "The 360° Method is a proactive home maintenance service — not a legal inspection. We assess your home’s current condition across all major systems, document everything in a written report, and give you a prioritized NOW / SOON / WAIT roadmap. Think of it as a health record for your home that we maintain over time." },
      { q: "Is the 360° Walkthrough the same as a home inspection?", a: "No. The 360° Baseline Walkthrough is a proactive maintenance assessment, not a licensed home inspection. It is not a legal document and cannot be used for real estate transactions. The 360° Method is designed to work alongside — and after — a licensed inspection." },
      { q: "How long does a Baseline Walkthrough take?", a: "Typically 2–3 hours for a standard single-family home. You'll receive your written report and prioritized roadmap within 48 hours of the walkthrough." },
    ],
  },
  {
    category: "Scheduling & Process",
    items: [
      { q: "How quickly can you start?", a: "We typically schedule your initial consultation within 3–5 business days. Project start dates depend on scope and current workload — we'll give you a realistic timeline during your consultation. We don't overbook." },
      { q: "What's your warranty on completed work?", a: "Labor is warranted for 1 year from completion. Material warranties vary by manufacturer and will be documented in your project paperwork. If something we did isn't right, we come back and fix it." },
      { q: "What areas do you serve?", a: "We serve Clark County, WA — including Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and surrounding communities." },
    ],
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "oklch(0.88 0.015 80)" }}>
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-semibold leading-snug" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.22 0.07 160)" }}>
          {q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 mt-0.5 transition-transform duration-200"
          style={{ color: "oklch(0.65 0.14 65)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
          {a}
        </p>
      )}
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Home() {
  const [, navigate] = useLocation();
  const [showReport, setShowReport] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Vancouver Home Services & Remodeling | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  // Re-init Elfsight when reviews section mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.eapps) {
        try { window.eapps.AppsManager.initAll(); } catch (_) {}
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleBookOnline = () => {
    if (window.HCPWidget) window.HCPWidget.openModal();
    else window.open("https://app.housecallpro.com/book/handy-pioneers", "_blank");
  };

  return (
    <div style={{ backgroundColor: "oklch(0.98 0.012 80)" }}>
      <TopBar />
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative flex flex-col"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          minHeight: "100vh",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(10,20,15,0.92) 0%, rgba(10,20,15,0.85) 60%, rgba(10,20,15,0.96) 100%)" }}
        />
        <div className="relative z-10 flex flex-col flex-1" style={{ minHeight: "100vh" }}>
          {/* Trust strip */}
          <div className="flex items-center justify-center gap-3 py-3 px-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#C8892A" color="#C8892A" />)}
            </div>
            <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}>
              4.9 · 34 Reviews · Licensed &amp; Insured · Clark County, WA
            </span>
          </div>

          {/* Headline */}
          <div className="flex flex-col items-center justify-center text-center px-6 pt-12 pb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              For homeowners who hold their asset to a higher standard.
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", maxWidth: "720px" }}>
              Your Home Deserves the Same{" "}
              <span style={{ color: "oklch(0.80 0.10 65)" }}>Standard of Care</span>
              <br className="hidden sm:block" />
              {" "}You Bring to Everything Else.
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "520px" }}>
              Every season. Every system. Every detail — taken care of.
            </p>           {/* Marcin context */}
            <div className="flex items-center gap-3 mt-1 mb-2">
              <img
                src={MARCIN_PHOTO}
                alt="Marcin Micek — Owner"
                className="w-10 h-10 rounded-full object-cover border-2 shrink-0"
                style={{ borderColor: "oklch(0.65 0.14 65)", objectPosition: "center 15%" }}
              />
              <p className="text-xs text-left" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif", maxWidth: "400px" }}>
                <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Owner-led assessments.</span> WA Lic. HANDYP*761NH · $1M insured · Vetted tradesmen on every project · Clark County, WA.
              </p>
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Choose your path ↓
            </p>
          </div>

          {/* ── Two Paths ── */}
          <div className="flex flex-col md:flex-row flex-1 px-4 md:px-8 pb-10 gap-4 max-w-5xl mx-auto w-full">
            {/* Path A */}
            <button
              onClick={handleBookOnline}
              className="group flex-1 text-left rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
              style={{ backgroundColor: "rgba(200,137,42,0.12)", border: "1.5px solid rgba(200,137,42,0.55)", backdropFilter: "blur(12px)" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.65 0.14 65)" }}>
                    <Wrench size={20} color="white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}></p>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>The Project Path</p>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "I have a specific project in mind."
                </h2>
                <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  Deck repair. Bathroom remodel. Fence replacement. Whatever the project, we walk the property, assess the full scope, and present a clear plan with no surprises.
                </p>
                <ul className="space-y-2 mb-8">
                  {["Complimentary on-site consultation", "Written scope of work and project plan", "Licensed, insured, vetted crew", "Owner-led assessment"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                      <span style={{ color: "oklch(0.80 0.10 65)" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-200 group-hover:brightness-110" style={{ backgroundColor: "oklch(0.65 0.14 65)" }}>
                <span className="font-bold text-sm uppercase tracking-wider" style={{ color: "oklch(0.10 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Schedule a Consultation</span>
                <ArrowRight size={18} color="oklch(0.10 0.04 80)" className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Divider */}
            <div className="hidden md:flex flex-col items-center justify-center gap-3 px-2">
              <div className="flex-1" style={{ width: "1px", backgroundColor: "rgba(255,255,255,0.12)" }} />
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-full" style={{ color: "rgba(255,255,255,0.40)", backgroundColor: "rgba(255,255,255,0.06)", fontFamily: "'Source Sans 3', sans-serif" }}>or</span>
              <div className="flex-1" style={{ width: "1px", backgroundColor: "rgba(255,255,255,0.12)" }} />
            </div>
            <div className="flex md:hidden items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Source Sans 3', sans-serif" }}>or</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
            </div>

            {/* Path B */}
            <div
              onClick={() => {
                const el = document.getElementById("method");
                if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 72; window.scrollTo({ top, behavior: "smooth" }); }
              }}
              className="group flex-1 text-left rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer"
              style={{ backgroundColor: "rgba(30,55,42,0.60)", border: "1.5px solid rgba(255,255,255,0.18)", backdropFilter: "blur(12px)" }}
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.32 0.07 160)" }}>
                    <ShieldCheck size={20} color="white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.50)", fontFamily: "'Source Sans 3', sans-serif" }}></p>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>The Proactive Path</p>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "I want my home proactively managed."
                </h2>
                <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  We assess your home, build your priority roadmap, and execute every item on it with our vetted crew. And four times a year — every season — we return on a standing schedule to work through a pre-defined list of Pacific Northwest maintenance tasks. The program does not end when the roadmap is complete. It continues, season after season.
                </p>
                <ul className="space-y-2 mb-4">
                  {["Full baseline property assessment", "NOW / SOON / WAIT priority roadmap", "Four seasonal visits per year", "Pre-defined PNW seasonal task list", "Single point of contact — always"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                      <span style={{ color: "oklch(0.65 0.18 160)" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowReport(true); }}
                  className="flex items-center gap-1.5 text-xs font-semibold mb-5 hover:opacity-80 transition-opacity"
                  style={{ color: "oklch(0.75 0.14 65)", fontFamily: "'Source Sans 3', sans-serif", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <FileText size={12} />
                  See a sample 360° Priority Roadmap
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-200 group-hover:brightness-110" style={{ backgroundColor: "oklch(0.28 0.07 160)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <span className="font-bold text-sm uppercase tracking-wider text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Learn the 360° Method</span>
                <ArrowRight size={18} color="white" className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Scroll nudge */}
          <div className="flex flex-col items-center pb-6 gap-1 opacity-40">
            <span className="text-xs text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Scroll to learn more</span>
            <ChevronDown size={16} color="white" className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OUTCOMES / SERVICES — What affluent buyers can expect
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-20 md:py-28" style={{ backgroundColor: "oklch(0.96 0.012 80)" }}>
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo column — shown second on mobile */}
            <div className="flex flex-col gap-6 order-last md:order-first">
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}>
                <img src={MARCIN_PHOTO} alt="Marcin Micek — Owner, Handy Pioneers" className="w-full object-cover object-top" style={{ maxHeight: "520px" }} />
              </div>
              {/* License badge */}
              <div className="rounded-xl p-5 border flex items-start gap-4" style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
                  <Shield size={18} color="white" />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "oklch(0.22 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}>Marcin Micek — Owner</p>
                  <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Handy Pioneers LLC · Clark County, WA</p>
                </div>
              </div>
            </div>

            {/* Story column — shown first on mobile */}
            <div className="order-first md:order-last">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
                Who We Are · Clark County, WA
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.07 160)" }}>
                A System Built Around Your Home
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  Handy Pioneers was built around a simple belief: your home is your most valuable asset, and it deserves a management system — not a rotating cast of contractors.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  The 360° Method was created after years of seeing the same pattern: homeowners reacting to problems instead of preventing them, paying the emergency premium, and never quite knowing the true condition of what they owned.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  Every engagement runs through a single relationship — owner-led assessments, a vetted crew of skilled tradesmen for execution, and a documented roadmap that compounds in value over time. You're not a transaction. You're a long-term client.
                </p>
              </div>
              {/* Credentials grid */}
              <div className="grid grid-cols-2 gap-3">
                {credentials.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="rounded-xl p-4 border flex gap-3 items-start" style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
                        <Icon size={15} color="white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: "oklch(0.22 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}>{c.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.03 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{c.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl p-7 border" style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 md:py-28" style={{ backgroundColor: "oklch(0.98 0.012 80)" }}>
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              What You Gain
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.07 160)" }}>
              The Outcomes of Partnering With Handy Pioneers
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
              We don't just complete projects. We protect your investment, eliminate the coordination burden, and give your home the management it deserves.
            </p>
          </div>

          {/* Outcomes grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {outcomes.map((o) => {
              const Icon = o.icon;
              return (
                <div
                  key={o.title}
                  className="rounded-2xl p-7 border flex flex-col gap-4"
                  style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
                    <Icon size={20} color="white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.07 160)" }}>
                      {o.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                      {o.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Services we perform */}
          <div className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
                What We Do
              </p>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Services Performed In-House &amp; Coordinated
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
                    <Icon size={15} color="oklch(0.65 0.14 65)" className="shrink-0" />
                    <span className="text-sm font-medium text-white leading-snug" style={{ fontFamily: "'Source Sans 3', sans-serif", wordBreak: "break-word", overflowWrap: "break-word", minWidth: 0 }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          360° METHOD
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="method" className="py-20 md:py-28" style={{ backgroundColor: "oklch(0.13 0.04 160)" }}>
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              The 360° Method
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Three Phases. One Destination.
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}>
              A structured approach that transforms reactive homeownership into proactive stewardship — in three deliberate phases. Four visits per year. A standing seasonal task list. A home that gets better every season.
            </p>
          </div>

          {/* Phase cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {phases.map((p, i) => (
              <div
                key={p.title}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ backgroundColor: "oklch(0.18 0.05 160)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 60%)" }} />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: p.color, color: "oklch(0.10 0.04 80)" }}>
                    {p.phase}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{p.title}</h3>
                    <p className="text-xs text-white opacity-70" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{p.tagline}</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}>
                    {p.description}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}>
                        <CheckCircle size={13} color={p.color} className="shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl p-5 mb-12" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif" }}>
              <strong style={{ color: "rgba(255,255,255,0.55)" }}>Important:</strong> The 360° Method is a proactive maintenance service, not a licensed home inspection. It is not a legal document and cannot be used for real estate transactions. Handy Pioneers cannot be held liable for issues not identified during the assessment. This service is designed to complement — not replace — a licensed home inspection.
            </p>
          </div>

          {/* Two entry points */}
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Choose Your Starting Point
            </p>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Already have an inspection report? Or starting fresh?
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <button
              onClick={() => navigate("/360-method/translation")}
              className="group rounded-2xl p-6 text-left border-0 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: "oklch(0.65 0.14 65)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.20 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}>I have a report</p>
              <h4 className="text-xl font-bold mb-2" style={{ color: "oklch(0.10 0.04 80)", fontFamily: "'Playfair Display', serif" }}>Upload Your Inspection Report</h4>
              <p className="text-sm mb-4" style={{ color: "oklch(0.25 0.05 80)", fontFamily: "'Source Sans 3', sans-serif" }}>We translate your inspector's findings into a clear, prioritized action plan.</p>
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider" style={{ color: "oklch(0.10 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <button
              onClick={() => navigate("/360-method/walkthrough")}
              className="group rounded-2xl p-6 text-left border-0 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: "oklch(0.20 0.06 160)", border: "1.5px solid rgba(255,255,255,0.15)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Source Sans 3', sans-serif" }}>Starting fresh</p>
              <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Schedule a Baseline Walkthrough</h4>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}>Marcin assesses your home from top to bottom and delivers your full 360° report.</p>
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Book a Walkthrough <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="gallery" style={{ backgroundColor: "oklch(0.98 0.012 80)" }}>
        <Gallery />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          REVIEWS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="reviews" className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "oklch(0.45 0.12 65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Google Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.20 0.05 160)" }}>
              What Clark County Homeowners Say
            </h2>
          </div>
          <div ref={reviewsRef}>
            <div className="elfsight-app-3439582a-5f81-4ddb-ab1a-54f99c9da7af" data-elfsight-app-lazy />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 md:py-28" style={{ backgroundColor: "oklch(0.98 0.012 80)" }}>
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.07 160)" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-8">
            {faqs.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b" style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif", borderColor: "oklch(0.88 0.015 80)" }}>
                  {cat.category}
                </h3>
                <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "oklch(1 0 0)", borderColor: "oklch(0.88 0.015 80)" }}>
                  <div className="px-6">
                    {cat.items.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Final CTA */}
          <div className="mt-16 text-center rounded-2xl p-10" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Choose Your Path?
            </h3>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Every engagement starts with a clear conversation — no pressure, no commitment. Choose the path that fits where you are today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="hcp-button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Choose Your Path
              </button>
              <a
                href="tel:+13605449858"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border font-semibold text-sm transition-colors hover:opacity-80"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Call (360) 544-9858
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <SampleReportModal open={showReport} onClose={() => setShowReport(false)} />
    </div>
  );
}
