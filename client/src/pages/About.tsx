// About Page — Handy Pioneers
// Design: Craftsman / Pacific Northwest editorial. Warm cream background, forest green accents.
// Fonts: Playfair Display (headings), Source Sans 3 (body)
// Layout: Asymmetric — large photo left, story right on desktop; stacked on mobile

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { Shield, Award, MapPin, Clock, Users, Wrench } from "lucide-react";

const MARCIN_PHOTO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/marcin-working_961d0334.jpg";

const credentials = [
  { icon: Shield, label: "WA License HANDYP*761NH", detail: "Licensed Contractor — Washington State" },
  { icon: Award, label: "Insured up to $1,000,000", detail: "Full general liability coverage" },
  { icon: Clock, label: "1-Year Labor Guarantee", detail: "On every completed project" },
  { icon: MapPin, label: "Clark County, WA", detail: "Vancouver, Camas, Battle Ground, Ridgefield, Washougal, La Center" },
  { icon: Users, label: "4.9★ · 34 Reviews", detail: "Verified Google reviews" },
  { icon: Wrench, label: "Owner on Every Assessment", detail: "Owner-led assessments · Vetted crew on every project" },
];

const values = [
  {
    title: "One Relationship, Full Accountability",
    body:
      "Every engagement runs through a single point of contact — from the first walkthrough through final sign-off. The work is executed by a vetted crew of skilled tradesmen and licensed specialists. You never manage vendors. The relationship manages it for you.",
  },
  {
    title: "Transparent From Day One",
    body:
      "Every project starts with a clear written estimate. No surprises, no change orders without your sign-off. You know exactly what you're getting before a single nail is driven.",
  },
  {
    title: "A Partnership Built to Last",
    body:
      "Handy Pioneers isn't a one-and-done repair service. The 360° Method creates a living record of your home's condition — updated with every project, so the relationship compounds in value over time.",
  },
];

export default function About() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.98 0.012 80)", fontFamily: "'Source Sans 3', sans-serif" }}
    >
      <TopBar />
      <Navbar />

      {/* ─── Hero ─── */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
      >
        <div className="container max-w-5xl mx-auto px-6">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Who We Are · Clark County, WA
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Relationship Built Around<br />Your Home
          </h1>
          <p
            className="mt-4 text-lg max-w-xl"
            style={{ color: "rgba(255,255,255,0.70)" }}
          >
            An owner-operated remodeling and repair company serving Clark County, WA since day one.
          </p>
        </div>
      </section>

      {/* ─── Marcin Story ─── */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo column */}
            <div className="flex flex-col gap-6">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
              >
                <img
                  src={MARCIN_PHOTO}
                  alt="Marcin Micek — Owner, Handy Pioneers"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: "520px" }}
                />
              </div>
              {/* License badge */}
              <div
                className="rounded-xl p-5 border flex items-start gap-4"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  borderColor: "oklch(0.88 0.015 80)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
                >
                  <Shield size={18} color="white" />
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                  >
                    Marcin Micek — Owner &amp; Lead Technician
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.50 0.03 80)" }}
                  >
                    WA License HANDYP*761NH · Insured up to $1,000,000
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.55 0.03 80)" }}
                  >
                    Handy Pioneers LLC · Clark County, WA
                  </p>
                </div>
              </div>
            </div>

            {/* Story column */}
            <div className="flex flex-col gap-6">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.65 0.14 65)" }}
                >
                  The Story
                </p>
                <h2
                  className="text-3xl font-bold mb-5 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                >
                  Owner-Led Assessments. A Vetted Crew. One Relationship.
                </h2>
                <div
                  className="space-y-4 text-base leading-relaxed"
                  style={{ color: "oklch(0.38 0.02 80)" }}
                >
                  <p>
                    Handy Pioneers was built around a simple belief: your home is your most valuable asset, and it deserves a dedicated partner — not a rotating cast of contractors.
                  </p>
                  <p>
                    Every engagement runs through a single relationship. Owner-led assessments ensure nothing is missed. A vetted crew of skilled tradesmen and licensed specialists executes the work. You never manage vendors — we manage it for you.
                  </p>
                  <p>
                    The 360° Method creates a living record of your home's condition — updated with every project, so the relationship compounds in value over time. You're not a transaction. You're a long-term client.
                  </p>
                </div>
              </div>

              {/* Credentials grid */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {credentials.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.label}
                      className="rounded-xl p-4 border flex gap-3 items-start"
                      style={{
                        backgroundColor: "oklch(1 0 0)",
                        borderColor: "oklch(0.88 0.015 80)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
                      >
                        <Icon size={15} color="white" />
                      </div>
                      <div>
                        <p
                          className="text-xs font-bold"
                          style={{ color: "oklch(0.22 0.07 160)" }}
                        >
                          {c.label}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "oklch(0.55 0.03 80)" }}
                        >
                          {c.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.96 0.012 80)" }}
      >
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.65 0.14 65)" }}
            >
              How We Work
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
            >
              The Principles Behind Every Project
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl p-7 border"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  borderColor: "oklch(0.88 0.015 80)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.42 0.02 80)" }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Ready to Begin Your Engagement?
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "oklch(0.45 0.02 80)" }}
          >
            Every engagement starts with a complimentary on-site consultation — no pressure, no commitment. Tell us what you're dealing with and we'll show you exactly where to go next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="hcp-button"
              onClick={() => {
                if (window.HCPWidget) window.HCPWidget.openModal();
              }}
            >
              Request a Complimentary Estimate
            </button>
            <a
              href="tel:+13605449858"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border font-semibold text-sm transition-colors hover:opacity-80"
              style={{
                borderColor: "oklch(0.32 0.07 160)",
                color: "oklch(0.32 0.07 160)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Call (360) 544-9858
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
