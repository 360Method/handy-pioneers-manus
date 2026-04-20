/**
 * Home.tsx — Decision Funnel Homepage
 * Architecture: Hero (choice gate) → Proof Strip → Two Paths Expanded →
 *               Social Proof → Gallery → Dual Final CTA → Footer
 * Every section reinforces one of the two paths. No neutral content.
 */


import { useLocation } from "wouter";
import { ArrowRight, Wrench, ShieldCheck, Star, Quote } from "lucide-react";
import { useEffect, useRef } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

// ── Proof Strip ──────────────────────────────────────────────────────────────
function ProofStrip() {
  const stats = [
    { value: "4.9★", label: "Google Rating" },
    { value: "34+", label: "Verified Reviews" },
    { value: "10+", label: "Years in Clark County" },
    { value: "Licensed", label: "& Fully Insured" },
    { value: "Free", label: "On-Site Consultation" },
  ];
  return (
    <div
      className="py-5 px-4"
      style={{ backgroundColor: "oklch(0.14 0.04 160)", borderBottom: "1px solid oklch(0.20 0.04 160)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <span
              className="text-lg font-bold"
              style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Playfair Display', serif" }}
            >
              {s.value}
            </span>
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Two Paths Expanded ───────────────────────────────────────────────────────
function TwoPathsExpanded() {
  const [, navigate] = useLocation();

  const handleBookOnline = () => {
    if (window.HCPWidget) window.HCPWidget.openModal();
    else window.open("https://app.housecallpro.com/book/handy-pioneers", "_blank");
  };

  return (
    <section
      id="paths"
      className="py-20 px-4"
      style={{ backgroundColor: "oklch(0.11 0.03 160)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Two Ways to Work With Us
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Where Are You Starting From?
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Both paths lead to the same outcome — a home that's protected, maintained, and advancing in value. The difference is where you are today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Path A */}
          <div
            className="rounded-2xl p-8 flex flex-col"
            style={{
              backgroundColor: "oklch(0.16 0.05 160)",
              border: "1px solid rgba(200,137,42,0.30)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "oklch(0.65 0.14 65)" }}
              >
                <Wrench size={22} color="white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}>Path A</p>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>The Project Path</h3>
              </div>
            </div>

            <p className="text-base italic mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              "I know what I need done. I want it done right, on time, and without managing a dozen contractors."
            </p>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}>
              You have a project — a deck, a bathroom, a fence, a full remodel. We walk the property with you, assess the full scope, and deliver a clear written plan. Marcin coordinates everything from first nail to final walkthrough.
            </p>

            <div className="space-y-2 mb-8 flex-1">
              {["Decks, fences & outdoor structures", "Bathroom & kitchen remodels", "Interior repairs & improvements", "Painting, drywall & finishing", "Licensed trade coordination (electrical, plumbing, HVAC)"].map(item => (
                <div key={item} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  <span style={{ color: "oklch(0.80 0.10 65)", marginTop: "2px" }}>→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleBookOnline}
              className="w-full flex items-center justify-between rounded-xl px-5 py-4 font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:brightness-110 border-0 cursor-pointer"
              style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(0.10 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Schedule a Free Consultation
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Path B */}
          <div
            className="rounded-2xl p-8 flex flex-col"
            style={{
              backgroundColor: "oklch(0.16 0.05 160)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
              >
                <ShieldCheck size={22} color="white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Source Sans 3', sans-serif" }}>Path B</p>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>The Proactive Path</h3>
              </div>
            </div>

            <p className="text-base italic mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}>
              "I want my home managed before problems become emergencies. I want a plan, not a repair bill."
            </p>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}>
              The 360° Method starts with a complete baseline assessment of your home's condition. You receive a prioritized NOW / SOON / WAIT roadmap. We track your Home Score over time and execute the work — so your home is always advancing, never reacting.
            </p>

            <div className="space-y-2 mb-8 flex-1">
              {["Baseline property walkthrough & assessment", "NOW / SOON / WAIT priority roadmap", "Home Score tracking over time", "Proactive maintenance scheduling", "Single point of contact for all trades"].map(item => (
                <div key={item} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  <span style={{ color: "oklch(0.65 0.18 160)", marginTop: "2px" }}>→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/360-method")}
              className="w-full flex items-center justify-between rounded-xl px-5 py-4 font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:brightness-110 border-0 cursor-pointer"
              style={{ backgroundColor: "oklch(0.28 0.07 160)", color: "white", border: "1px solid rgba(255,255,255,0.20)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Enter the 360° Method
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Social Proof ─────────────────────────────────────────────────────────────
function SocialProof() {
  const quotes = [
    {
      text: "Marcin walked the entire property with me, caught things I never would have noticed, and had a written plan in my hands within days. The work was done on time and exactly as described.",
      name: "Jennifer M.",
      detail: "Camas, WA · Deck rebuild + exterior painting",
      path: "A",
    },
    {
      text: "We enrolled in the 360° Method after our home inspection flagged a dozen deferred items. Within 60 days, every NOW item was resolved. I finally feel like our home is ahead of the curve.",
      name: "David & Sarah K.",
      detail: "Washougal, WA · 360° Method member",
      path: "B",
    },
    {
      text: "I've used a lot of contractors over the years. Handy Pioneers is the first team where I never had to follow up, chase a timeline, or wonder what was happening. They just handled it.",
      name: "Robert T.",
      detail: "Battle Ground, WA · Full bathroom remodel",
      path: "A",
    },
  ];

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: "oklch(0.13 0.04 160)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            What Clients Say
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Results Speak for Themselves
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                backgroundColor: "oklch(0.16 0.05 160)",
                border: `1px solid ${q.path === "B" ? "rgba(255,255,255,0.10)" : "rgba(200,137,42,0.20)"}`,
              }}
            >
              <Quote size={20} style={{ color: "oklch(0.65 0.14 65)", marginBottom: "12px", opacity: 0.6 }} />
              <p
                className="text-sm leading-relaxed flex-1 mb-5"
                style={{ color: "rgba(255,255,255,0.78)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                "{q.text}"
              </p>
              <div>
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#C8892A" color="#C8892A" />
                  ))}
                </div>
                <p className="text-sm font-bold text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{q.name}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif" }}>{q.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Dual Final CTA ───────────────────────────────────────────────────────────
function DualFinalCTA() {
  const [, navigate] = useLocation();

  const handleBookOnline = () => {
    if (window.HCPWidget) window.HCPWidget.openModal();
    else window.open("https://app.housecallpro.com/book/handy-pioneers", "_blank");
  };

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: "oklch(0.10 0.03 160)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Take the Next Step?
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Both paths start with a single conversation. Choose yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <button
            onClick={handleBookOnline}
            className="group rounded-2xl p-7 text-left border-0 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "oklch(0.65 0.14 65)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Wrench size={20} color="oklch(0.10 0.04 80)" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.20 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}>Path A</span>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "oklch(0.10 0.04 80)", fontFamily: "'Playfair Display', serif" }}>
              I have a project.
            </h3>
            <p className="text-sm mb-5" style={{ color: "oklch(0.25 0.05 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Schedule a free on-site consultation. We'll assess the scope and present a clear plan.
            </p>
            <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider" style={{ color: "oklch(0.10 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Schedule a Consultation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => navigate("/360-method")}
            className="group rounded-2xl p-7 text-left border-0 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "oklch(0.20 0.06 160)",
              border: "1.5px solid rgba(255,255,255,0.15)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck size={20} color="white" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Source Sans 3', sans-serif" }}>Path B</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              I want a plan.
            </h3>
            <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Enter the 360° Method. Get a full assessment, a prioritized roadmap, and a team to execute it.
            </p>
            <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-white" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Enter the 360° Method <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <p
          className="text-center text-sm mt-8"
          style={{ color: "rgba(255,255,255,0.30)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Questions? Call Marcin directly at{" "}
          <a href="tel:+13605449858" style={{ color: "oklch(0.65 0.14 65)" }}>
            (360) 544-9858
          </a>
        </p>
      </div>
    </section>
  );
}

// ── Google Reviews Widget ────────────────────────────────────────────────────
function GoogleReviews() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-initialize Elfsight widget after React mounts the DOM node
    const timer = setTimeout(() => {
      if ((window as any).eapps) {
        try {
          (window as any).eapps.AppsManager.initAll();
        } catch (_) {}
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.45 0.12 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Google Reviews
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.20 0.05 160)" }}
          >
            What Clark County Homeowners Say
          </h2>
        </div>
        <div ref={widgetRef}>
          <div
            className="elfsight-app-3439582a-5f81-4ddb-ab1a-54f99c9da7af"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}

// ── Gallery Strip ─────────────────────────────────────────────────────────────
function GalleryStrip() {
  return <Gallery />;
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    document.title = "Vancouver Handyman & Remodeler | Handy Pioneers";
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div style={{ backgroundColor: "oklch(0.11 0.03 160)" }}>
      <TopBar />
      <Navbar />
      <Hero />
      <ProofStrip />
      <TwoPathsExpanded />
      <SocialProof />
      <GoogleReviews />
      <GalleryStrip />
      <DualFinalCTA />
      <Footer />
    </div>
  );
}
