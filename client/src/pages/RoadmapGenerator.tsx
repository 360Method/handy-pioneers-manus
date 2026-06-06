/**
 * RoadmapGenerator.tsx — /roadmap-generator
 *
 * Marketing page for the complimentary 360° Roadmap Generator lead magnet.
 * The old single-page form is replaced by a 3-step funnel:
 *   Step 1 — popup (name/phone/email)        → openInquiry({ mode: "roadmap" })
 *   Step 2 — /roadmap/details (home + report upload)
 *   Step 3 — /roadmap/offer   (one-time offer; decline → live processing page)
 *
 * Voice: affluent. No forbidden vocabulary in any string below.
 */

import { useEffect } from "react";
import {
  FileText,
  CheckCircle,
  ArrowRight,
  Clock,
  AlertTriangle,
  Eye,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { openInquiry } from "@/lib/inquiry";
import SEO from "@/components/SEO";

// ─── Page ────────────────────────────────────────────────────────────────────
export default function RoadmapGenerator() {
  useEffect(() => {
    // TODO: move to CMS (nucleus) — page metadata for the 360° Roadmap Generator
    document.title = "360° Roadmap Generator — Upload Your Inspection Report | Handy Pioneers";

    const setMeta = (name: string, value: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    const description =
      "Upload your home inspection report and receive a prioritized NOW / SOON / WAIT roadmap in your private 360° client portal within 24 hours. Complimentary for Clark County, WA homeowners.";

    setMeta("description", description);
    setMeta("og:title", "360° Roadmap Generator | Handy Pioneers", "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", "360° Roadmap Generator | Handy Pioneers");
    setMeta("twitter:description", description);

    window.scrollTo({ top: 0 });
  }, []);

  const startFunnel = () => openInquiry({ mode: "roadmap" });

  // ─── Content data ─────────────────────────────────────────────────────────
  // TODO: move to CMS (nucleus) — roadmap tier copy
  const roadmapItems = [
    {
      label: "NOW",
      color: "oklch(0.55 0.18 25)",
      bg: "oklch(0.97 0.04 25)",
      border: "oklch(0.80 0.12 25)",
      icon: AlertTriangle,
      description:
        "Items requiring immediate attention to prevent safety concerns, structural deterioration, or compounding damage.",
    },
    {
      label: "SOON",
      color: "oklch(0.65 0.14 65)",
      bg: "oklch(0.97 0.04 65)",
      border: "oklch(0.85 0.10 65)",
      icon: Clock,
      description:
        "Items that are not urgent today but will become costly if deferred beyond the next 6–18 months.",
    },
    {
      label: "WAIT",
      color: "oklch(0.45 0.08 160)",
      bg: "oklch(0.96 0.02 160)",
      border: "oklch(0.80 0.06 160)",
      icon: Eye,
      description:
        "Items that are monitored, documented, and revisited at your next assessment cycle.",
    },
  ];

  // TODO: move to CMS (nucleus) — how-it-works steps
  const steps = [
    {
      n: "1",
      title: "Tell Us Where to Send It",
      desc: "Your name and contact — about 20 seconds. Then a few details about the property: address, size, and the inspection report you already have (PDF, Spectora, or most web formats).",
    },
    {
      n: "2",
      title: "The Generator Produces Your Roadmap",
      desc: "Our advisors run the report through the 360° Roadmap Generator — translating every finding into plain language, assigning a NOW / SOON / WAIT priority, and attaching an investment range grounded in Clark County market data.",
    },
    {
      n: "3",
      title: "Your 360° Roadmap Arrives In Your Portal",
      desc: "Within 24 hours, your 360° client portal is ready. Your roadmap lives inside — a single source of truth for your property, with progress tracking and direct access to our advisors.",
    },
  ];

  // TODO: move to CMS (nucleus) — FAQ items
  const faqItems = [
    {
      q: "Is this a home inspection?",
      a: "No. The 360° Roadmap Generator summarizes the inspection report you already have. It is not a legal home inspection and does not substitute for a licensed inspector's findings. Think of it as your trusted advisor translating the inspector's technical language into a clear action plan.",
    },
    {
      q: "What does it cost?",
      a: "Nothing. The 360° Roadmap Generator is complimentary. It is our way of introducing you to the 360° Method — the proactive standard of care we apply to every property we steward.",
    },
    {
      q: "How are investment ranges calculated?",
      a: "Each range is derived from the specific findings in your inspection report — what your home is telling us about the scope of work ahead. Consider them directional guides: a sense of the investment your property may warrant to address each priority. Actual figures come only after we walk the site with you and prepare a written scope of work. The ranges here are meant to orient your thinking, not to serve as a quote.",
    },
    {
      q: "Does it work for rental or investment properties?",
      a: "Yes. Tell us the property is an investment when you add its details and we'll frame the roadmap around protecting rent-readiness — and, if you'd like, walk the property with you to discuss a maintenance program across every unit.",
    },
    {
      q: "Do I have to become a member?",
      a: "Not at all. The roadmap is yours to keep. Many homeowners execute items on their own timeline. Others ask us to return and address each item through our 360° Maintenance Membership — a managed standard of care that puts your roadmap on a schedule we own together.",
    },
    {
      q: "How quickly is my roadmap delivered?",
      a: "Within 24 hours of submission. You'll receive an email with a magic-link login to your client portal, along with the PDF attached for convenience.",
    },
    {
      q: "What happens to my data?",
      a: "Your report and findings stay within your private client portal. We never resell data and never share your report with third parties. You may request deletion at any time by emailing help@handypioneers.com.",
    },
  ];

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        path="/roadmap-generator"
        title="360° Roadmap Generator — Turn Your Inspection Report into a Plan | Handy Pioneers"
        description="Upload your Clark County WA home inspection report and receive a prioritized NOW / SOON / WAIT roadmap with investment ranges. Built for Vancouver, Camas, Washougal, and Battle Ground homeowners."
      />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-5"
            style={{
              backgroundColor: "oklch(0.65 0.14 65)",
              color: "white",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            <FileText size={12} /> Complimentary · 24-Hour Turnaround
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The 360° Roadmap Generator
          </h1>
          <p
            className="text-lg leading-relaxed mb-8"
            style={{
              color: "rgba(255,255,255,0.80)",
              fontFamily: "'Source Sans 3', sans-serif",
              maxWidth: "620px",
            }}
          >
            You have an inspection report full of findings. We turn it into a
            prioritized NOW / SOON / WAIT plan with investment ranges, delivered
            to your private client portal — the same standard of care our
            members receive.
          </p>
          <button
            onClick={startFunnel}
            className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm text-white transition-all hover:opacity-90 mb-8"
            style={{
              backgroundColor: "oklch(0.65 0.14 65)",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Get My Free Roadmap <ArrowRight size={16} />
          </button>
          <div className="flex flex-wrap gap-6 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle size={16} style={{ color: "oklch(0.80 0.10 65)" }} /> Complimentary
            </div>
            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle size={16} style={{ color: "oklch(0.80 0.10 65)" }} /> 24-Hour Turnaround
            </div>
            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.75)" }}>
              <CheckCircle size={16} style={{ color: "oklch(0.80 0.10 65)" }} /> Private Client Portal
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-xl p-6 border"
                style={{ backgroundColor: "white", borderColor: "oklch(0.88 0.015 80)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold text-lg"
                  style={{
                    backgroundColor: "oklch(0.22 0.07 160)",
                    color: "oklch(0.80 0.10 65)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.22 0.07 160)",
                    fontSize: "1.15rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.42 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ─── Three-Tier Roadmap Explainer ─── */}
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Your Roadmap, Delivered in Three Tiers
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {roadmapItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-xl p-6 border"
                  style={{ backgroundColor: item.bg, borderColor: item.border }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} color={item.color} />
                    <span
                      className="text-lg font-bold"
                      style={{
                        color: item.color,
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "oklch(0.38 0.02 80)",
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button
              onClick={startFunnel}
              className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm text-white transition-all hover:opacity-90"
              style={{
                backgroundColor: "oklch(0.22 0.07 160)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Start My Roadmap <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.96 0.01 80)" }}>
        <div className="container max-w-3xl">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger
                  className="text-left"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "oklch(0.22 0.07 160)",
                  }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: "oklch(0.40 0.02 80)",
                  }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.22 0.07 160)" }}>
        <div className="container max-w-3xl text-center">
          <ShieldCheck
            size={40}
            className="mx-auto mb-4"
            style={{ color: "oklch(0.80 0.10 65)" }}
          />
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Clarity, Within 24 Hours
          </h2>
          <p
            className="text-base leading-relaxed mb-8 mx-auto"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "'Source Sans 3', sans-serif",
              maxWidth: "520px",
            }}
          >
            Stop guessing which inspector comment matters most. Start your
            roadmap and receive a prioritized plan in your private client portal
            — the same standard of care our members receive.
          </p>
          <button
            onClick={startFunnel}
            className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-sm transition-all hover:opacity-90"
            style={{
              backgroundColor: "oklch(0.65 0.14 65)",
              color: "white",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Get My Free Roadmap <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
