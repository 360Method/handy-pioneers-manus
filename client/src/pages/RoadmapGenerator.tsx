/**
 * RoadmapGenerator.tsx - /roadmap-generator
 *
 * Give-first landing page (2026-06-06 redesign). The visitor sees the actual
 * deliverable before any ask: rendered pages of the sample roadmap, a
 * drag-drop zone right in the hero, and short copy. No contact popup - the
 * report goes in first; email is collected on the details form at the moment
 * of generating.
 *
 *   /roadmap-generator   → this page (sample + dropzone)
 *   /roadmap/details     → report + property + email, then Generate
 *   /roadmap/offer       → one-time offer; decline → live processing page
 *
 * Voice: affluent, plain. No forbidden vocabulary in any string below.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Upload, ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SampleReportModal from "@/components/SampleReportModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { setPendingReport } from "@/lib/roadmapFile";
import { openInquiry } from "@/lib/inquiry";
import SEO from "@/components/SEO";

const MAX_PDF_BYTES = 100 * 1024 * 1024; // 100 MB

// ─── Page ────────────────────────────────────────────────────────────────────
export default function RoadmapGenerator() {
  const [, navigate] = useLocation();
  const [dragOver, setDragOver] = useState(false);
  const [dropError, setDropError] = useState<string | null>(null);
  const [sampleOpen, setSampleOpen] = useState(false);

  useEffect(() => {
    document.title = "360° Roadmap Generator - Upload Your Inspection Report | Handy Pioneers";

    // Partner attribution: realtor/inspector links look like
    // /roadmap-generator?ref=jane-inspector - stash it for the funnel posts.
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) sessionStorage.setItem("hp_roadmap_ref", ref.slice(0, 64));

    window.scrollTo({ top: 0 });
  }, []);

  const goToDetails = () => navigate("/roadmap/details");

  /** Hero dropzone: take the file, hand it to the details form, go. */
  const onHeroFile = (file: File | null) => {
    setDropError(null);
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setDropError("PDF files only. Have a Spectora link instead? Use the next page.");
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setDropError("That file is over 100 MB. Try the next page's link option instead.");
      return;
    }
    setPendingReport(file);
    navigate("/roadmap/details");
  };

  // TODO: move to CMS (nucleus) - tier chips
  const tiers = [
    { label: "NOW", color: "oklch(0.55 0.18 25)", bg: "oklch(0.97 0.04 25)", desc: "Fix in 30-60 days" },
    { label: "SOON", color: "oklch(0.60 0.14 65)", bg: "oklch(0.97 0.04 65)", desc: "Plan within 6 months" },
    { label: "WAIT", color: "oklch(0.45 0.08 160)", bg: "oklch(0.96 0.02 160)", desc: "Monitor, no rush" },
  ];

  // TODO: move to CMS (nucleus) - FAQ items
  const faqItems = [
    {
      q: "Is this a home inspection?",
      a: "No. The roadmap translates the inspection report you already have into plain language and priorities. It does not replace a licensed inspector's findings.",
    },
    {
      q: "What if I don't have an inspection report?",
      a: "We recommend getting a professional home inspection first. It is the most thorough read of your home, and that report is what powers your roadmap. If you would rather not arrange one, Handy Pioneers can do a baseline walkthrough of your home instead. It is not a licensed inspection and not as in-depth as an inspector's work, because it is not an inspector doing it, but it is a solid starting point for your maintenance plan.",
    },
    {
      q: "What does it cost?",
      a: "Nothing. It is how we introduce homeowners to the 360° Method, the standard of care we apply to every property we maintain.",
    },
    {
      q: "How are the investment ranges calculated?",
      a: "Each range comes from the findings in your report, grounded in Clark County market data. They orient your thinking; exact figures come after we walk the property with you.",
    },
    {
      q: "Does it work for rental or investment properties?",
      a: "Yes. Mark the property as an investment and the roadmap is framed around protecting rent-readiness.",
    },
    {
      q: "Do you make roadmaps outside Clark County?",
      a: "Not yet. Each roadmap is individually researched and produced at our expense, so we focus on the area we serve today: Clark County, Washington. If your home is elsewhere, leave your details anyway and we will reach out the moment your area opens.",
    },
    {
      q: "How is the Home Score calculated?",
      a: "Every home starts at 100 and each finding lowers the score by its urgency: NOW items weigh the most, SOON items less, WAIT items barely. It is a provisional baseline read from your report alone (never below 40, never a perfect 100), and it climbs as items are completed and verified at visits.",
    },
    {
      q: "Do I have to become a member?",
      a: "No. The roadmap is yours to keep, whatever you decide to do with it.",
    },
    {
      q: "What happens to my data?",
      a: "Your report stays in your private portal. We never resell or share it. Email help@handypioneers.com any time to have it deleted.",
    },
  ];

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        path="/roadmap-generator"
        title="360° Roadmap Generator - Turn Your Inspection Report into a Plan | Handy Pioneers"
        description="See a real sample, then upload your Clark County WA inspection report. You get a prioritized NOW / SOON / WAIT roadmap with investment ranges within 24 hours."
      />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <Navbar />

        {/* ─── Hero: the deliverable + the dropzone ─── */}
        <section className="py-14 md:py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left: headline + dropzone */}
              <div>
                <h1
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Your inspection report, turned into a plan.
                </h1>
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Every finding sorted into NOW, SOON, and WAIT, with investment
                  ranges, within 24 hours. This is what it looks like →
                </p>

                {/* Dropzone - the page's primary action */}
                <label
                  htmlFor="hero-pdf-upload"
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    onHeroFile(e.dataTransfer.files?.[0] ?? null);
                  }}
                  className="block rounded-xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-colors"
                  style={{
                    borderColor: dragOver ? "oklch(0.80 0.10 65)" : "rgba(255,255,255,0.35)",
                    backgroundColor: dragOver ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)",
                  }}
                >
                  <Upload size={28} className="mx-auto mb-2" style={{ color: "oklch(0.80 0.10 65)" }} />
                  <div className="font-bold text-white text-base" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    Drop your inspection report here
                  </div>
                  <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                    PDF up to 100 MB, or click to browse. No sign-up to start.
                  </div>
                  <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.50)" }}>
                    Currently producing roadmaps for homes in Clark County, Washington.
                  </div>
                  <input
                    id="hero-pdf-upload"
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    onChange={(e) => onHeroFile(e.target.files?.[0] ?? null)}
                  />
                </label>
                {dropError && (
                  <p className="mt-2 text-sm" style={{ color: "oklch(0.85 0.10 25)" }}>{dropError}</p>
                )}

                <div className="flex items-center gap-4 mt-4 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  <button
                    onClick={goToDetails}
                    className="inline-flex items-center gap-1 font-semibold underline bg-transparent border-0 cursor-pointer p-0"
                    style={{ color: "oklch(0.80 0.10 65)" }}
                  >
                    I have a Spectora or web link instead <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right: the actual deliverable */}
              <div className="relative">
                <button
                  onClick={() => setSampleOpen(true)}
                  className="block w-full bg-transparent border-0 p-0 cursor-zoom-in"
                  aria-label="View the full sample roadmap"
                >
                  <img
                    src="/images/roadmap-sample/alder4-page-01.webp"
                    alt="Sample 360° Roadmap: findings sorted into NOW, SOON, and WAIT with cost ranges"
                    className="w-full rounded-lg shadow-2xl"
                    style={{ transform: "rotate(1.5deg)" }}
                    loading="eager"
                  />
                </button>
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                  style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "white", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  A real sample · tap to read it
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The three tiers, in one glance ─── */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {tiers.map((t) => (
                <div key={t.label} className="rounded-xl px-5 py-4 flex items-center gap-3" style={{ backgroundColor: t.bg }}>
                  <span className="text-lg font-bold" style={{ color: t.color, fontFamily: "'Playfair Display', serif" }}>
                    {t.label}
                  </span>
                  <span className="text-sm" style={{ color: "oklch(0.38 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                    {t.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* The other two sample pages - more give */}
            <div className="grid grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
              {[
                { src: "alder4-page-03.webp", alt: "Sample roadmap summary with Home Score and NOW / SOON / WAIT totals" },
                { src: "alder4-page-04.webp", alt: "Sample roadmap item: finding, what it means, approach, investment range, and the inspector's photo" },
              ].map((img) => (
                <button
                  key={img.src}
                  onClick={() => setSampleOpen(true)}
                  className="bg-transparent border-0 p-0 cursor-zoom-in"
                  aria-label={img.alt}
                >
                  <img
                    src={`/images/roadmap-sample/${img.src}`}
                    alt={img.alt}
                    className="w-full rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* How it works - one line each */}
            <div className="max-w-2xl mx-auto mb-12">
              {[
                "Upload the inspection report you already have.",
                "We translate every finding into plain language with a priority and an investment range.",
                "Your roadmap arrives by email within 24 hours, with a private portal to track it.",
              ].map((line, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <CheckCircle size={18} className="mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.10 160)" }} />
                  <p className="text-base" style={{ color: "oklch(0.35 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                    {line}
                  </p>
                </div>
              ))}
            </div>

            {/* No inspection report? Recommend a real inspection first, then offer
                the in-house baseline walkthrough as an honest fallback. */}
            <div
              className="max-w-2xl mx-auto mb-12 rounded-xl p-6 border"
              style={{ backgroundColor: "oklch(0.97 0.02 160)", borderColor: "oklch(0.85 0.04 160)" }}
            >
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
              >
                Don't have an inspection report yet?
              </h3>
              <p className="text-base mb-4" style={{ color: "oklch(0.35 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                A professional home inspection is the most thorough read of your home, and
                we recommend it. Once you have the report, bring it back here and your
                roadmap follows.
              </p>
              <p className="text-base mb-5" style={{ color: "oklch(0.35 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                If you would rather not arrange one, Handy Pioneers can do a baseline
                walkthrough of your home instead. It is not a licensed inspection and not
                as in-depth as an inspector's work, because it is not an inspector doing
                it. It is a solid starting point for your maintenance plan when a full
                report is not on hand.
              </p>
              <button
                onClick={() => openInquiry({ mode: "baseline" })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold uppercase tracking-wide text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "white", color: "oklch(0.22 0.07 160)", border: "1px solid oklch(0.22 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Book a Baseline Walkthrough <ArrowRight size={16} />
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={goToDetails}
                className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "oklch(0.22 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Start My Roadmap <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-14" style={{ backgroundColor: "oklch(0.96 0.01 80)" }}>
          <div className="container max-w-3xl">
            <h2
              className="text-3xl font-bold mb-8 text-center"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
            >
              Questions, Answered
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger
                    className="text-left"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent
                    style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.40 0.02 80)" }}
                  >
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <SampleReportModal open={sampleOpen} onClose={() => setSampleOpen(false)} />
        <Footer />
      </div>
    </>
  );
}
