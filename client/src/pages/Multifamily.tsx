/*
 * Multifamily.tsx - /multifamily
 * The Proactive Path for Landlords (HP-DOC-024): the 360° Method shaped for an
 * owner who does not live in the property and has tenants. One price for the
 * building = building base (by size) + per-unit coverage. Consult-first.
 * Voice: lead with the 360° Method + partnership (offload the rentals, keep them
 * protected and re-rentable). No cost math, no "sub", no em/en dashes, no
 * cheap/free positioning. Forbidden vocab scrubbed (handyman/estimate/repair/fix).
 */
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { MemberTier } from "@/lib/tiers";
import { TIERS, getLandlordMonthly } from "@/lib/tiers";
import { openInquiry } from "@/lib/inquiry";
import { track } from "@/lib/analytics";
import SEO from "@/components/SEO";

const UNIT_PRESETS = [
  { units: 1, label: "Single-family rental" },
  { units: 2, label: "Duplex" },
  { units: 3, label: "Triplex" },
  { units: 4, label: "Fourplex" },
  { units: 6, label: "5+ units" },
];

const COVERAGE = [
  {
    title: "The building",
    body:
      "Roof and gutters, exterior envelope, shared mechanicals, drainage and grading, walkways, shared entries, halls, laundry, and exterior lighting. Seasonal visits sized to the building.",
  },
  {
    title: "Every unit",
    body:
      "An in-unit pass per unit: detectors, HVAC filter, plumbing check, weatherstripping, GFCI, exhaust fan, water heater, and a habitability check. A photo record for each unit.",
  },
  {
    title: "Turnovers, on call",
    body:
      "When a tenant moves out, we run a standardized make-ready (inspect, clean, paint touch-up, repairs, safety check) at your member rate, with priority scheduling so the unit re-rents faster.",
  },
];

const FAQS = [
  {
    q: "How is a rental building priced?",
    a: "One price for the property. It is built from the size of the building plus coverage for each unit, so a single-family rental and a fourplex are each priced fairly. You see one number, billed monthly, quarterly, or annually. No long-term contract.",
  },
  {
    q: "What about turnovers between tenants?",
    a: "Turnovers are handled as their own scoped service at your member rate, not folded into the membership, because every turnover is different. Members get a standardized make-ready and priority scheduling. Maximum members go to the front of the line so vacant units turn faster.",
  },
  {
    q: "I have a full-time job and a few units. Is this for me?",
    a: "Yes. This is built for owners who do not want to chase the upkeep themselves. We watch the building and the units on a season rhythm, you get documented reports, and you have one number to call. We partner with you on the property rather than waiting for the emergency.",
  },
  {
    q: "Is this available outside Clark County, Washington?",
    a: "Today the 360° Method is delivered in Clark County, Washington and the surrounding communities. We are expanding regionally. Ask us about your area when we talk.",
  },
];

export default function Multifamily() {
  const [units, setUnits] = useState<number>(4);
  const [sqft, setSqft] = useState<number>(4000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "360° Method for Landlords | Handy Pioneers";
    window.scrollTo(0, 0);
    track("view_item", { item_category: "membership_landlord" });
  }, []);

  const handleConsult = (tier: MemberTier) => {
    track("begin_checkout", { tier, item_category: "membership_landlord", units });
    // Consult-first: open the baseline walkthrough so we can scope the building.
    openInquiry({ mode: "baseline", tier, sqft });
  };

  return (
    <>
      <SEO
        path="/multifamily"
        title="360° Method for Landlords | Handy Pioneers"
        description="Own rentals in Clark County WA? Hand off the upkeep. The 360° Method for landlords keeps your building and units maintained, documented, and re-rentable, with member-rate turnovers. One price per building, no long-term contract."
      />
      <div className="min-h-screen font-sans" style={{ background: "oklch(96% 0.015 80)" }}>
        <Navbar />

        {/* ── HERO ── */}
        <section className="text-white pt-20 pb-24 px-4" style={{ background: "oklch(22% 0.07 155)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium mb-6"
              style={{ background: "oklch(100% 0 0 / 0.1)", color: "oklch(78% 0.13 78)" }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/hp-360-logo_69b6cf24.png"
                alt="360°"
                className="w-5 h-5 object-contain"
              />
              <span>The 360° Method for Landlords, Delivered by Handy Pioneers</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              You own the rentals.<br />
              <span style={{ color: "oklch(65% 0.15 72)" }}>We carry the upkeep.</span>
            </h1>

            <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "oklch(100% 0 0 / 0.75)" }}>
              For owners with a full-time job and a few units. The 360° Method keeps your
              building and every unit maintained on a season rhythm, documented, and ready
              to re-rent, with turnovers handled on call. We partner with you on the
              property instead of waiting for the 9pm phone call.
            </p>

            <a href="#pricing" className="btn-hp-primary text-base px-10 py-4 shadow-lg">
              See coverage for your building
            </a>
          </div>
        </section>

        {/* ── WHAT'S COVERED ── */}
        <section className="px-4 py-16 max-w-5xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-center mb-3" style={{ color: "oklch(22% 0.07 155)" }}>
            One partner for the whole property
          </h2>
          <p className="text-center text-lg mb-10 max-w-2xl mx-auto" style={{ color: "oklch(40% 0.02 155)" }}>
            The building, the units, and the turnovers between tenants.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {COVERAGE.map((c) => (
              <div key={c.title} className="rounded-2xl bg-white p-6 shadow-sm border" style={{ borderColor: "oklch(88% 0.02 155)" }}>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "oklch(22% 0.07 155)" }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(40% 0.02 155)" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="px-4 py-16" style={{ background: "oklch(99% 0.005 80)" }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-center mb-3" style={{ color: "oklch(22% 0.07 155)" }}>
              One price for your building
            </h2>
            <p className="text-center text-lg mb-8 max-w-2xl mx-auto" style={{ color: "oklch(40% 0.02 155)" }}>
              Tell us about the building and see where coverage starts. We confirm the
              details on a walkthrough before anything begins.
            </p>

            {/* Building inputs */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border max-w-2xl mx-auto mb-10" style={{ borderColor: "oklch(88% 0.02 155)" }}>
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: "oklch(30% 0.04 155)" }}>How many units?</label>
                <div className="flex flex-wrap gap-2">
                  {UNIT_PRESETS.map((p) => (
                    <button
                      key={p.units}
                      type="button"
                      onClick={() => setUnits(p.units)}
                      className="rounded-full px-4 py-2 text-sm font-medium border transition-colors"
                      style={
                        units === p.units
                          ? { background: "oklch(22% 0.07 155)", color: "white", borderColor: "oklch(22% 0.07 155)" }
                          : { background: "white", color: "oklch(30% 0.04 155)", borderColor: "oklch(85% 0.02 155)" }
                      }
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="mf-sqft" className="block text-sm font-semibold mb-2" style={{ color: "oklch(30% 0.04 155)" }}>
                  About how many total square feet? <span className="font-normal opacity-70">(the whole building)</span>
                </label>
                <input
                  id="mf-sqft"
                  type="number"
                  min={500}
                  step={100}
                  value={sqft || ""}
                  onChange={(e) => setSqft(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border px-4 py-3 text-base"
                  style={{ borderColor: "oklch(85% 0.02 155)" }}
                  placeholder="e.g. 4000"
                />
              </div>
            </div>

            {/* Tier cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {TIERS.map((t) => {
                const monthly = getLandlordMonthly(t, units, sqft);
                return (
                  <div
                    key={t.id}
                    className="rounded-2xl bg-white p-6 shadow-sm border flex flex-col"
                    style={{ borderColor: t.popular ? "oklch(65% 0.15 72)" : "oklch(88% 0.02 155)" }}
                  >
                    {t.popular && (
                      <span className="self-start rounded-full px-3 py-1 text-xs font-bold mb-3" style={{ background: "oklch(94% 0.05 80)", color: "oklch(45% 0.13 72)" }}>
                        Most chosen
                      </span>
                    )}
                    <h3 className="font-display text-2xl font-black mb-1" style={{ color: "oklch(22% 0.07 155)" }}>{t.name}</h3>
                    <p className="text-sm mb-4" style={{ color: "oklch(45% 0.02 155)" }}>{t.tagline}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-black" style={{ color: "oklch(22% 0.07 155)" }}>${monthly}</span>
                      <span className="text-base font-normal" style={{ color: "oklch(50% 0.02 155)" }}>/mo</span>
                      <p className="text-xs mt-1" style={{ color: "oklch(55% 0.02 155)" }}>
                        for a {units === 1 ? "single-family rental" : `${units}-unit building`}, billed monthly
                      </p>
                    </div>
                    <ul className="space-y-2 mb-6 flex-1">
                      <li className="text-sm" style={{ color: "oklch(35% 0.02 155)" }}>
                        {t.visits} building visits a year ({t.visitDescription})
                      </li>
                      <li className="text-sm" style={{ color: "oklch(35% 0.02 155)" }}>
                        In-unit coverage for every unit
                      </li>
                      <li className="text-sm" style={{ color: "oklch(35% 0.02 155)" }}>
                        Annual 360° building scan + documented reports
                      </li>
                      {t.laborBankDollars > 0 && (
                        <li className="text-sm" style={{ color: "oklch(35% 0.02 155)" }}>
                          ${t.laborBankDollars} labor bank credit
                        </li>
                      )}
                      <li className="text-sm" style={{ color: "oklch(35% 0.02 155)" }}>
                        Member rates + {t.id === "gold" ? "priority" : t.id === "silver" ? "expedited" : "standard"} turnover scheduling
                      </li>
                    </ul>
                    <button onClick={() => handleConsult(t.id)} className="btn-hp-primary w-full py-3 text-base">
                      Book a building walkthrough
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-xs mt-6 max-w-2xl mx-auto" style={{ color: "oklch(55% 0.02 155)" }}>
              Pricing shown is where coverage starts for a building this size. We confirm the
              building and units on a walkthrough, then put one clear number in writing. No
              long-term contract.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-4 py-16 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-black text-center mb-8" style={{ color: "oklch(22% 0.07 155)" }}>
            Questions landlords ask
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-xl bg-white border overflow-hidden" style={{ borderColor: "oklch(88% 0.02 155)" }}>
                <button
                  className="w-full text-left px-5 py-4 font-semibold flex justify-between items-center"
                  style={{ color: "oklch(25% 0.05 155)" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="ml-3 shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "oklch(40% 0.02 155)" }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="text-white px-4 py-16 text-center" style={{ background: "oklch(22% 0.07 155)" }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-black mb-4">Hand off the upkeep</h2>
            <p className="text-lg mb-8" style={{ color: "oklch(100% 0 0 / 0.75)" }}>
              Book a walkthrough of your building. We will scope it, put one clear number in
              writing, and take it from there.
            </p>
            <a href="#pricing" className="btn-hp-primary text-base px-10 py-4">Book a building walkthrough</a>
            <p className="mt-6 text-sm" style={{ color: "oklch(100% 0 0 / 0.6)" }}>
              Or call us at <a href="tel:+13608386731" className="underline">(360) 838-6731</a>
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
