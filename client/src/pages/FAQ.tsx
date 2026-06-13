// FAQ Page - Handy Pioneers
// Design: Clean, editorial. Accordion-style Q&A with category grouping.
// Fonts: Playfair Display (headings), Source Sans 3 (body)
// Q&A data lives in @/lib/faq (shared with the static-page generator).

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { ChevronDown } from "lucide-react";
import SEO from "@/components/SEO";
import { openInquiry } from "@/lib/inquiry";
import { faqs, FAQ_JSONLD, type FAQItem } from "@/lib/faq";

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
        title="Frequently Asked Questions | Handy Pioneers - Clark County, WA"
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
            The questions every skeptical homeowner asks - answered honestly.
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
              Reach us directly - no gatekeepers, no callback queues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="hcp-button"
                onClick={() => openInquiry()}
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
