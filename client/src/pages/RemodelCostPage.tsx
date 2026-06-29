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
import { ArrowRight } from "lucide-react";
import { PRESETS, highLevelBand, formatBand } from "@/lib/remodelCost";

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
    ...PRESETS.map((p) => {
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
            <RemodelCostCalculator />

            {/* High-level bands */}
            <h2 className="text-2xl font-bold mt-14 mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              Typical investment ranges
            </h2>
            <p className="text-base mb-6" style={{ color: "oklch(0.42 0.02 80)" }}>
              Rough ranges for an average-size project. Premium finishes and larger spaces go higher;
              the estimator above shows how scope moves the number.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {PRESETS.map((p) => (
                <div key={p.key} className="rounded-2xl p-5" style={{ backgroundColor: "oklch(1 0 0)", border: `1px solid ${BORDER}` }}>
                  <p className="text-base font-bold" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                    {p.label}
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: GREEN }}>
                    {formatBand(highLevelBand(p), true)}
                  </p>
                  <p className="text-sm mt-1" style={{ color: "oklch(0.50 0.02 80)" }}>{p.scope}</p>
                </div>
              ))}
            </div>

            {/* Why we publish */}
            <div className="rounded-2xl p-7 mt-12" style={{ backgroundColor: "oklch(0.95 0.02 160)", border: "1px solid oklch(0.85 0.03 160)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                Why we show our pricing
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.30 0.05 160)" }}>
                A remodel is one of the largest investments you make in your home, and you deserve to
                walk into it with eyes open. Hiding the number until a salesperson is in your kitchen is
                not how we want to work. We would rather you see a realistic range now, decide if it
                fits, and start a relationship built on straight talk. That is the same thinking behind
                the 360 Method: partner with you on the home over the long run, not chase a one-and-done
                job.
              </p>
              <Link href="/blog/what-a-remodel-costs-clark-county-2026" className="inline-flex items-center gap-1 mt-4 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                Read the full breakdown <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
