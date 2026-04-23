// FAQ Page — Handy Pioneers
// Design: Clean, editorial. Accordion-style Q&A with category grouping.
// Fonts: Playfair Display (headings), Source Sans 3 (body)

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { ChevronDown } from "lucide-react";
import SEO from "@/components/SEO";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const faqs: FAQCategory[] = [
  {
    category: "Pricing & Cost",
    items: [
      {
        q: "Why don't you list prices on your website?",
        a: "Every home is different. A deck repair in a 1,200 sq ft rancher is a different project than the same repair on a 3,500 sq ft craftsman with rot underneath. We start every engagement with a complimentary on-site consultation — we walk the property, assess the full scope, and present a written plan tailored to your home. No ballpark numbers, no assumptions. We're happy to talk through your situation on a call before scheduling.",
      },
      {
        q: "What do most projects cost?",
        a: "Small repairs and maintenance tasks (caulking, fixture replacement, minor drywall) typically run $150–$500. Mid-size projects (bathroom upgrades, deck repairs, flooring) generally range from $1,500–$8,000. Full remodels and additions are quoted individually. The 360° Baseline Walkthrough is a flat-fee service — ask us for current pricing when you reach out.",
      },
      {
        q: "Do you require a deposit?",
        a: "Yes. Most projects require a 30–50% deposit before materials are ordered and work begins. The remainder is due upon completion. We never ask for full payment upfront.",
      },
      {
        q: "What affects the final cost of a project?",
        a: "The main factors are: scope and complexity, material selections, access and site conditions, and whether hidden issues are discovered once work begins. We document any scope changes in writing before proceeding.",
      },
    ],
  },
  {
    category: "Who Does the Work",
    items: [
      {
        q: "Do you use subcontractors?",
        a: "For specialized trades (electrical, plumbing, HVAC), yes — we work with vetted, licensed subcontractors. Every trade partner is screened and coordinated through a single point of contact. You'll always know in advance who is coming to your home.",
      },
      {
        q: "Who will actually be on my property?",
        a: "Every assessment walkthrough is owner-led. The work is executed by a vetted crew of skilled tradesmen and licensed specialists. You are never handed off to someone you haven't met — the relationship is consistent from first call to final walkthrough.",
      },
      {
        q: "Are you licensed and insured?",
        a: "Yes. Handy Pioneers LLC is a Washington State licensed contractor and carries full general liability insurance. We're happy to provide proof of insurance before any work begins.",
      },
    ],
  },
  {
    category: "The 360° Method",
    items: [
      {
        q: "What exactly is the 360° Method?",
        a: "It's a proactive home maintenance system — not a legal inspection. We assess your home's current condition across all major systems, document everything in a written report, and give you a prioritized NOW / SOON / WAIT roadmap. Think of it as a health record for your home that we update over time.",
      },
      {
        q: "Is the 360° Walkthrough the same as a home inspection?",
        a: "No. The 360° Baseline Walkthrough is a proactive maintenance assessment, not a licensed home inspection. It is not a legal document and cannot be used for real estate transactions. If you need a licensed inspection for a purchase or sale, we can refer you to a vetted inspector in our network (Path 3). The 360° Method is designed to work alongside — and after — a licensed inspection.",
      },
      {
        q: "\"Certified technician\" — certified by whom?",
        a: "Marcin holds certifications in home maintenance assessment and has completed professional training in residential systems evaluation. He is not a licensed home inspector (see above). We use 'certified technician' to describe his trade credentials and training — not to imply a licensed inspection credential. We're working on making this clearer on the site.",
      },
      {
        q: "How long does a Baseline Walkthrough take?",
        a: "Typically 2–3 hours for a standard single-family home. Larger properties or homes with complex systems may take longer. You'll receive your written report and prioritized roadmap within 48 hours of the walkthrough.",
      },
    ],
  },
  {
    category: "Scheduling & Process",
    items: [
      {
        q: "How quickly can you start?",
        a: "We typically schedule your initial consultation within 3–5 business days. Project start dates depend on scope and current workload — we'll give you a realistic timeline during your consultation. We don't overbook.",
      },
      {
        q: "What's your warranty on completed work?",
        a: "We stand behind our work. Labor is warranted for 1 year from completion. Material warranties vary by manufacturer and will be documented in your project paperwork. If something we did isn't right, we come back and fix it — no argument.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve Clark County, WA — including Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and surrounding communities. If you're just outside this area, reach out and we'll let you know if we can accommodate.",
      },
    ],
  },
];


// ── FAQPage JSON-LD (derived from faqs) ─────────────────────────────────────
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: "oklch(0.88 0.015 80)" }}
    >
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="text-base font-semibold leading-snug"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: "oklch(0.22 0.07 160)",
          }}
        >
          {item.q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 mt-0.5 transition-transform duration-200"
          style={{
            color: "oklch(0.65 0.14 65)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && (
        <div
          className="pb-5 text-sm leading-relaxed"
          style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <SEO
        path="/faq"
        title="Frequently Asked Questions | Handy Pioneers — Clark County, WA"
        description="Answers to common questions from Vancouver WA and Clark County homeowners about pricing, scheduling, service areas, licensing, and the 360° Method."
        jsonLd={FAQ_JSONLD}
      />
      <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.98 0.012 80)", fontFamily: "'Source Sans 3', sans-serif" }}
    >
      <TopBar />
      <Navbar />

      {/* ─── Hero ─── */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
      >
        <div className="container max-w-3xl mx-auto px-6">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.65 0.14 65)" }}
          >
            Common Questions
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Answers Before<br />You Pick Up the Phone
          </h1>
          <p
            className="mt-4 text-lg max-w-xl"
            style={{ color: "rgba(255,255,255,0.70)" }}
          >
            The questions every skeptical homeowner asks — answered honestly.
          </p>
        </div>
      </section>

      {/* ─── FAQ Content ─── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="space-y-12">
            {faqs.map((cat) => (
              <div key={cat.category}>
                <h2
                  className="text-xs font-bold uppercase tracking-widest mb-6 pb-3 border-b"
                  style={{
                    color: "oklch(0.65 0.14 65)",
                    fontFamily: "'Source Sans 3', sans-serif",
                    borderColor: "oklch(0.85 0.015 80)",
                  }}
                >
                  {cat.category}
                </h2>
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    borderColor: "oklch(0.88 0.015 80)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="px-7">
                    {cat.items.map((item) => (
                      <FAQAccordion key={item.q} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div
            className="mt-16 rounded-2xl p-8 text-center border"
            style={{
              backgroundColor: "oklch(0.22 0.07 160)",
              borderColor: "oklch(0.30 0.07 160)",
            }}
          >
            <h3
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Still Have Questions?
            </h3>
            <p
              className="mb-6 text-sm"
              style={{ color: "rgba(255,255,255,0.70)" }}
            >
              Reach us directly — no gatekeepers, no callback queues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="hcp-button"
                onClick={() => window.open("https://client.handypioneers.com/book", "_blank", "noopener")}
              >
                Schedule a Complimentary Consultation
              </button>
              <a
                href="tel:+13608386731"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border font-semibold text-sm text-white transition-opacity hover:opacity-80"
                style={{
                  borderColor: "rgba(255,255,255,0.35)",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Call (360) 838-6731
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
