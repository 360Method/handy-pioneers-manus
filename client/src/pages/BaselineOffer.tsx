/**
 * BaselineOffer.tsx - /baseline/offer (Step 3 of the baseline funnel)
 * One-time buy-now upsell: lock the annual plan at 30% off the month-to-month cost.
 * Accept -> Stripe checkout (offer=buynow, annual). Decline -> confirmation.
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import {
  TIERS,
  DEFAULT_BAND,
  valueStackFor,
  memberSavingsExample,
  cumulativeFeatures,
} from "@/lib/tiers";
import { getApiBase, isStagingHost } from "@/lib/api";

interface Stash {
  leadId?: string;
  customerId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  tier?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  sqft?: string | number;
  yearBuilt?: string | number;
}

/** Strip commas/spaces and coerce to a positive integer, or undefined. */
function toInt(v: string | number | undefined): number | undefined {
  if (v === undefined || v === null) return undefined;
  const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

const usd = (n: number) => `$${n.toLocaleString()}`;

// Review-only placeholder so the page renders on direct navigation on staging.
const PREVIEW_STASH: Stash = {
  leadId: "preview",
  customerId: "preview",
  firstName: "Preview",
  lastName: "Visitor",
  phone: "(360) 555-0100",
  email: "preview@example.com",
  tier: "silver",
  street: "123 NE Main St",
  city: "Vancouver",
  state: "WA",
  zip: "98661",
};

export default function BaselineOffer() {
  const [, navigate] = useLocation();
  const [stash, setStash] = useState<Stash | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "One-Time Offer | Baseline Walkthrough - Handy Pioneers";
    window.scrollTo(0, 0);
    try {
      const raw = sessionStorage.getItem("hp_baseline");
      if (!raw) {
        if (isStagingHost()) {
          setStash(PREVIEW_STASH);
          return;
        }
        navigate("/membership");
        return;
      }
      setStash(JSON.parse(raw) as Stash);
    } catch {
      navigate("/membership");
    }
  }, [navigate]);

  const tier = TIERS.find((t) => t.id === (stash?.tier ?? "silver")) ?? TIERS[1];
  const monthly = tier.prices.monthly;
  const annualizedMonthly = monthly * 12; // pay-monthly cost over a year
  const standardAnnual = tier.prices.annual; // our normal annual rate
  const buyNow = Math.round(annualizedMonthly * 0.7); // 30% off month-to-month
  const savings = annualizedMonthly - buyNow; // vs paying monthly
  const belowAnnual = standardAnnual - buyNow; // how much buy-now beats the normal annual
  const buyNowMonthly = Math.round(buyNow / 12);

  // Value stack: what the plan is worth a la carte vs today's price. The baseline
  // funnel prices at the standard band, so the value is figured at the same band.
  const stack = valueStackFor(tier, DEFAULT_BAND);
  const netOfLaborBank = buyNow - stack.laborBank; // out-of-pocket after the credit
  const repairExample = 4000;
  const repairSaved = memberSavingsExample(tier, repairExample);
  const allFeatures = cumulativeFeatures(tier.id);

  async function handleAccept() {
    if (!stash) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${getApiBase()}/api/360/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: stash.tier ?? "silver",
          cadence: "annual",
          offer: "buynow",
          customerName: `${stash.firstName ?? ""} ${stash.lastName ?? ""}`.trim(),
          customerEmail: stash.email,
          customerPhone: stash.phone,
          serviceAddress: stash.street,
          serviceCity: stash.city,
          serviceState: stash.state,
          serviceZip: stash.zip,
          sqft: toInt(stash.sqft),
          yearBuilt: toInt(stash.yearBuilt),
          // Link the membership back to the CRM lead created in Step 1 (explicit, not email-only).
          hpCustomerId: stash.customerId,
          origin: window.location.origin,
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`Server error ${res.status}: ${t.slice(0, 160)}`);
      }
      const json = await res.json();
      if (!json?.url) throw new Error(json?.error ?? "Checkout could not start.");
      // Carry plan context so the post-payment confirmation page personalizes.
      sessionStorage.setItem("hp360_tier", stash.tier ?? "silver");
      sessionStorage.setItem("hp360_cadence", "annual");
      sessionStorage.setItem("hp360_type", "homeowner");
      window.location.href = json.url;
    } catch (err: any) {
      setError(
        err?.message ??
          "We couldn't start checkout. No worries - your walkthrough is still booked; we'll follow up."
      );
      setLoading(false);
    }
  }

  const firstName = stash?.firstName || "there";

  return (
    <div className="min-h-screen bg-[#0D1F14] text-[#F5F0E8]">
      <Navbar />

      <div className="bg-[#C9A84C] text-[#0D1F14] py-2 px-4 text-center text-sm font-bold tracking-wide">
        One-time offer - only on this page, only right now.
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center">
          One moment, {firstName}
        </p>
        <h1
          className="text-3xl md:text-5xl font-bold text-center leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Your walkthrough is booked.{" "}
          <span className="text-[#C9A84C]">Here's what membership adds.</span>
        </h1>
        <p className="text-[#B8C8B8] text-center text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          {usd(stack.total)} of visits, a documented home scan, and {usd(stack.laborBank)} of
          real work credit, plus member pricing on every repair your walkthrough turns up.
          Homeowners who join right now, before the visit, lock it for {usd(buyNow)} for the year.
        </p>

        <div className="rounded-2xl border-2 border-[#C9A84C] bg-[#1A3A28] overflow-hidden mb-6">
          <div className="bg-[#C9A84C] text-[#0D1F14] px-6 py-3 flex items-center justify-between">
            <span className="font-black text-sm tracking-widest uppercase">{tier.name} - Annual</span>
            <span className="flex items-center gap-1 text-sm font-bold">
              <Clock className="w-4 h-4" /> Buy-now rate
            </span>
          </div>

          <div className="px-6 py-8">
            {/* Value stack: what the plan is worth a la carte, totaled. */}
            <div className="bg-[#0D1F14] rounded-xl p-5 mb-6">
              <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-3">
                What you get this year
              </p>
              <div className="space-y-2 mb-3">
                {stack.lines.map((line, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 text-sm">
                    <span className="flex items-start gap-2 text-[#B8C8B8] leading-snug">
                      <CheckCircle className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                      {line.label}
                    </span>
                    <span className="text-[#F5F0E8] font-semibold whitespace-nowrap">{usd(line.value)}</span>
                  </div>
                ))}
                <div className="flex items-start justify-between gap-3 text-sm">
                  <span className="flex items-start gap-2 text-[#B8C8B8] leading-snug">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                    Member pricing on every repair, all year
                  </span>
                  <span className="text-[#C9A84C] font-semibold whitespace-nowrap">
                    up to {tier.discountPct.underOneK}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#2A4A38]">
                <span className="text-[#8BA898] text-sm font-semibold">Comparable value</span>
                <span className="text-[#B8C8B8] font-bold">~{usd(stack.total)}+</span>
              </div>
            </div>

            {/* Price block: month-to-month vs annual vs today's buy-now. */}
            <div className="bg-[#0D1F14] rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[#8BA898]">Pay month-to-month, a year is</span>
                <span className="text-[#B8C8B8] line-through">{usd(annualizedMonthly)}/yr</span>
              </div>
              <div className="flex items-center justify-between text-sm pb-3 mb-4 border-b border-[#2A4A38]">
                <span className="text-[#8BA898]">Our standard annual rate</span>
                <span className="text-[#B8C8B8]">{usd(standardAnnual)}/yr</span>
              </div>
              <div className="text-center">
                <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-1">
                  Today only - buy now
                </p>
                <p
                  className="text-[#C9A84C] text-5xl font-black mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {usd(buyNow)}/yr
                </p>
                <p className="text-[#F5F0E8] text-sm mb-1">
                  About {usd(buyNowMonthly)}/mo - save{" "}
                  <span className="font-bold text-[#C9A84C]">{usd(savings)}</span> vs monthly
                  {belowAnnual > 0 ? <>, {usd(belowAnnual)} below our annual rate</> : null}.
                </p>
                {stack.laborBank > 0 && (
                  <p className="text-[#F5F0E8] text-sm mb-1">
                    {usd(stack.laborBank)} of that is labor-bank credit you spend on real work, so your
                    net for everything else is about <span className="font-bold text-[#C9A84C]">{usd(netOfLaborBank)}</span>.
                  </p>
                )}
                <p className="text-[#6A8A78] text-xs">
                  30% off the month-to-month cost. This rate is only on this page.
                </p>
              </div>
            </div>

            {/* Member discount on future work, tied to their walkthrough findings. */}
            <div className="bg-[#0D1F14] rounded-xl p-5 mb-6">
              <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-3">
                Member pricing on every repair
              </p>
              <div className="space-y-1.5 mb-3">
                {[
                  { label: "Jobs under $1,000", pct: tier.discountPct.underOneK },
                  { label: "Jobs $1,000-$5,000", pct: tier.discountPct.oneToFiveK },
                  { label: "Jobs over $5,000", pct: tier.discountPct.overFiveK },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-[#8BA898]">{row.label}</span>
                    <span className="text-[#F5F0E8] font-semibold">{row.pct}% off</span>
                  </div>
                ))}
              </div>
              <p className="text-[#B8C8B8] text-sm leading-snug">
                Every finding from your walkthrough, at member rates. A {usd(repairExample)} repair
                saves you about <span className="font-bold text-[#C9A84C]">{usd(repairSaved)}</span> on
                its own.
              </p>
            </div>

            {/* The full list, not a teaser slice. */}
            <div className="mb-6">
              <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-3">
                Everything included
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {allFeatures.map((text, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                    <span className="text-[#B8C8B8] text-sm leading-snug">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-center text-sm mb-4 text-[#E7B7A8]">{error}</p>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAccept}
                disabled={loading}
                className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-[#0D1F14] font-black py-4 px-6 rounded-xl text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
              >
                {loading ? "Starting checkout…" : (
                  <>
                    Yes - lock my annual rate ({usd(buyNow)}/yr)
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <button
                onClick={() => navigate("/baseline/confirmed")}
                className="w-full text-[#6A8A78] text-sm py-2 hover:text-[#8BA898] transition-colors underline underline-offset-2"
              >
                No thanks - just schedule my baseline walkthrough
              </button>
            </div>
          </div>
        </div>

        <p className="text-[#4A6A54] text-xs leading-relaxed text-center">
          The 360° Method is a proactive maintenance service, not a licensed home inspection under
          RCW 18.280. Membership is an annual subscription billed today; renews at the standard
          annual rate. The buy-now rate applies to this first year and is available only during this
          session.
        </p>
      </div>

      <Footer />
    </div>
  );
}
