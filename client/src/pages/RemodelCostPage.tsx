// Remodel cost calculator page - /remodel-cost
// Public, honest investment ranges + an interactive estimator. Numbers come from
// client/src/lib/remodelCost.ts (RETAIL presets). Mirrors the prerender in
// scripts/generate-static-pages.ts so crawlers see the same bands.

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import FinalCTA from "@/components/FinalCTA";
import SEO from "@/components/SEO";
import RemodelCostCalculator from "@/components/RemodelCostCalculator";
import HearthCallout from "@/components/hearth/HearthCallout";
import { ArrowRight } from "lucide-react";
import { presetsByCategory, highLevelBand, formatBand } from "@/lib/remodelCost";

const REMODEL_PRESETS = presetsByCategory("remodel");

const SITE = "https://handypioneers.com";
const GREEN = "oklch(0.22 0.07 160)";
const GOLD = "oklch(0.65 0.14 65)";
const BORDER = "oklch(0.88 0.015 80)";

function jsonLd(): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "What a Remodel Costs in Clark County, WA",
      description:
        "Honest, realistic investment ranges for kitchen, bathroom, flooring, basement, and interior painting projects in Clark County, plus an interactive estimator.",
      url: `${SITE}/remodel-cost`,
    },
    ...REMODEL_PRESETS.map((p) => {
      const band = highLevelBand(p);
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: p.label,
        serviceType: p.label,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${SITE}/#business`,
          name: "Handy Pioneers",
          telephone: "(360) 838-6731",
          url: SITE,
        },
        areaServed: { "@type": "AdministrativeArea", name: "Clark County, Washington" },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: band.low,
          highPrice: band.high,
          description: `Typical retail investment range for a ${p.label.toLowerCase()} in Clark County, WA.`,
        },
      };
    }),
  ];
}

export default function RemodelCostPage() {
  return (
    <>
      <SEO
        path="/remodel-cost"
        title="What a Remodel Costs in Clark County, WA | Handy Pioneers"
        description="Honest, realistic investment ranges for kitchen, bathroom, flooring, basement, and painting projects in Clark County, WA. Slide the size, pick a finish, and see a real range."
        jsonLd={jsonLd()}
      />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.012 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
        <TopBar />
        <Navbar />

        {/* Hero */}
        <section className="py-16 md:py-20" style={{ backgroundColor: GREEN }}>
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
              Clark County, WA
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              What a remodel actually costs
            </h1>
            <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>
              Most contractors will not put a number anywhere near their website. We will. Below are
              honest, realistic investment ranges for the projects Clark County homeowners ask about
              most, plus a quick estimator so you can see roughly where your project lands before you
              ever pick up the phone.
            </p>
            <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>
              These are full-scope, done-right ranges from one accountable team, not a teaser price that
              balloons later. The slider gets you close. A walkthrough gets you exact.
            </p>
          </div>
        </section>

        <section className="pt-12 pb-14 md:pt-14 md:pb-16">
          <div className="container max-w-3xl mx-auto px-6">
            {/* Calculator */}
            <RemodelCostCalculator category="remodel" />

            {/* High-level bands */}
            <h2 className="text-2xl font-bold mt-14 mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              Typical investment ranges
            </h2>
            <p className="text-base mb-6" style={{ color: "oklch(0.42 0.02 80)" }}>
              Rough ranges for an average-size project. Premium finishes and larger spaces go higher;
              the estimator above shows how scope moves the number.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {REMODEL_PRESETS.map((p) => {
                const inner = (
                  <>
                    <p className="text-base font-bold" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                      {p.label}
                    </p>
                    <p className="text-2xl font-bold mt-1" style={{ color: GREEN }}>
                      {formatBand(highLevelBand(p), true)}
                    </p>
                    <p className="text-sm mt-1" style={{ color: "oklch(0.50 0.02 80)" }}>{p.scope}</p>
                    {p.serviceSlug && (
                      <span className="inline-flex items-center gap-1 mt-2 text-sm font-semibold" style={{ color: "oklch(0.45 0.12 160)" }}>
                        Learn more <ArrowRight size={14} />
                      </span>
                    )}
                  </>
                );
                return p.serviceSlug ? (
                  <Link key={p.key} href={`/services/${p.serviceSlug}`} className="block rounded-2xl p-5 transition-shadow hover:shadow-md" style={{ backgroundColor: "oklch(1 0 0)", border: `1px solid ${BORDER}` }}>
                    {inner}
                  </Link>
                ) : (
                  <div key={p.key} className="rounded-2xl p-5" style={{ backgroundColor: "oklch(1 0 0)", border: `1px solid ${BORDER}` }}>
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Financing - right where the number lands */}
            <HearthCallout location="remodel_cost" className="mt-8" />

            {/* Why we publish */}
            <div className="rounded-2xl p-7 mt-12" style={{ backgroundColor: "oklch(0.95 0.02 160)", border: "1px solid oklch(0.85 0.03 160)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                A remodel is one step, not the whole plan
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.30 0.05 160)" }}>
                A remodel is one of the largest investments you make in your home, and you deserve to
                walk into it with eyes open. So we show the number instead of hiding it until a
                salesperson is in your kitchen. But a project is rarely the real goal. In the 360 Method,
                this is the Upgrade stage, and the stage after it is Scale ROI: making sure the money you
                put in actually moves your home's value and equity in the direction you want.
              </p>
              <p className="text-base leading-relaxed mt-3" style={{ color: "oklch(0.30 0.05 160)" }}>
                That is the difference between a contractor and a partner. We are not here to move one
                project off your list. We are here to help you decide what is worth doing, in what order,
                to get you where you want to be, and then to keep the home looked after so it holds what
                you built.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/360-method" className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                  How the 360 Method works <ArrowRight size={15} />
                </Link>
                <Link href="/blog/what-a-remodel-costs-clark-county-2026" className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                  Read the full breakdown <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* What drives the cost */}
            <h2 className="text-2xl font-bold mt-14 mb-4" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              What drives the cost
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                ["Finish level.", "The single biggest lever. The same kitchen in stock cabinets versus full custom is a different project. The estimator lets you see that swing."],
                ["Size and scope.", "More square footage and more rooms involved means more material and labor. A single-room project and a whole-floor one are not close."],
                ["What is behind the walls.", "Plumbing, electrical, and structure you cannot see set a real part of the cost. Moving a sink or opening a wall adds up; surprises behind old finishes do too."],
                ["Materials and fixtures.", "Cabinets, countertops, tile, and fixtures span a huge range. This is where taste and budget meet, and where most of the spread in a quote comes from."],
                ["Permits and code.", "Bigger projects need permits and have to meet current code, which is a real line item, not a hidden fee. We handle it and it is in the number."],
              ].map(([h, b], i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: "oklch(0.34 0.02 80)" }}>
                  <span className="shrink-0 mt-1" style={{ color: GOLD }}>•</span>
                  <span><strong>{h}</strong> {b}</span>
                </li>
              ))}
            </ul>

            {/* Get more from your budget */}
            <h2 className="text-2xl font-bold mt-12 mb-4" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              How to get more from your budget
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                ["Put money where it shows and lasts.", "A mid-level finish in the right places often beats a high-end finish everywhere. We will tell you where it actually matters."],
                ["Keep the layout when you can.", "Moving plumbing and walls is where budgets balloon. If the bones work, spend on what you see and touch instead."],
                ["Fix the cause, not just the surface.", "Cheaper now is rarely cheaper later. Solving the water or structural issue underneath protects what you just paid for."],
                ["Phase it on a plan.", "You do not have to do everything at once. The 360 Method sorts the work into what protects value now versus what can wait, so money goes to the right thing first."],
              ].map(([h, b], i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: "oklch(0.34 0.02 80)" }}>
                  <span className="shrink-0 mt-1" style={{ color: GOLD }}>•</span>
                  <span><strong>{h}</strong> {b}</span>
                </li>
              ))}
            </ul>

            {/* FAQ */}
            <h2 className="text-2xl font-bold mt-12 mb-4" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              Common questions
            </h2>
            <div className="space-y-5 mb-4">
              {[
                ["Are these prices real, or a teaser?", "Real. They are the same retail ranges our team works from, with our pricing included. Nothing gets quietly added later. The detailed number comes from a walkthrough and a written scope."],
                ["Why is there such a wide range?", "Because finish level and size move the number a lot. A Good finish in a small space and a Premium finish in a large one are genuinely different projects. The estimator shows where your choices land."],
                ["Will my real quote match the estimator?", "It will be close for a standard project. The walkthrough adjusts for what is behind the walls, your exact materials, and any structural work, which a slider cannot see."],
                ["Do I have to do the whole project at once?", "No. We can phase it on a plan so the most important work happens first. That is the heart of the 360 Method: protect the home's value in the right order."],
              ].map(([q, a], i) => (
                <div key={i}>
                  <p className="text-base font-semibold mb-1" style={{ color: GREEN }}>{q}</p>
                  <p className="text-base leading-relaxed" style={{ color: "oklch(0.34 0.02 80)" }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
