/**
 * RoadmapOffer.tsx - /roadmap/offer?tid=… (Step 3 of the roadmap-generator funnel)
 *
 * One-time offer shown while the roadmap is being generated in the background.
 * Personal homes: Maximum plan only, annual buy-now, priced for their home
 * (the size band is internal - only the final price renders; the backend
 * re-resolves the band server-side at checkout). Investment properties: a
 * consultation pitch instead of self-serve checkout (unit pricing is decided
 * on a portfolio walkthrough). Decline → the live processing page.
 */
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  TIERS,
  GOLD_BUYNOW_ANNUAL,
  bandForSqft,
  getPrice,
  DEFAULT_BAND,
  valueStackFor,
  memberSavingsExample,
  cumulativeFeatures,
  type HomeSizeBand,
} from "@/lib/tiers";
import { getApiBase, isStagingHost } from "@/lib/api";

interface Stash {
  leadId?: string;
  customerId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  sqft?: string | number;
  yearBuilt?: string | number;
  propertyKind?: "personal" | "investment";
  unitCount?: number;
  translationId?: string;
  confirmationUrl?: string;
}

/** Strip commas/spaces and coerce to a positive integer, or undefined. */
function toInt(v: string | number | undefined): number | undefined {
  if (v === undefined || v === null) return undefined;
  const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

const usd = (n: number) => `$${n.toLocaleString()}`;

/** Where "just send my roadmap" lands - the live processing page. */
function processingUrl(stash: Stash | null, tid: string | null): string {
  if (stash?.confirmationUrl) return stash.confirmationUrl;
  const base = isStagingHost()
    ? "https://staging-pro.handypioneers.com"
    : "https://pro.handypioneers.com";
  const id = stash?.translationId ?? tid ?? "";
  return id ? `${base}/portal/roadmap/submitted/${id}` : "/roadmap-generator";
}

export default function RoadmapOffer() {
  const [stash, setStash] = useState<Stash | null>(null);
  const [tid, setTid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walkthroughRequested, setWalkthroughRequested] = useState(false);

  useEffect(() => {
    document.title = "One-Time Offer | 360° Roadmap - Handy Pioneers";
    window.scrollTo(0, 0);
    const urlTid = new URLSearchParams(window.location.search).get("tid");
    setTid(urlTid);
    let parsed: Stash | null = null;
    try {
      const raw = sessionStorage.getItem("hp_roadmap");
      if (raw) parsed = JSON.parse(raw) as Stash;
    } catch {
      /* fall through */
    }
    // One-time ticket set by the details form right before it sends them here.
    // The offer is a single, in-session view: it can't be bookmarked, reloaded,
    // or shared. A returning visitor goes on to their roadmap, never back to the OTO.
    const ticket = sessionStorage.getItem("hp_roadmap_offer");
    if (parsed && ticket) {
      sessionStorage.removeItem("hp_roadmap_offer");
      setStash(parsed);
      return;
    }
    // No stash, or the ticket was already used (reload/bookmark): the roadmap is
    // still on its way - send them to the live processing page, not the offer.
    if (parsed || urlTid) {
      window.location.href = processingUrl(parsed, urlTid);
    } else {
      window.location.href = "/roadmap-generator";
    }
  }, []);

  const isInvestment = stash?.propertyKind === "investment";
  const gold = TIERS.find((t) => t.id === "gold")!;
  const band: HomeSizeBand = (() => {
    const n = toInt(stash?.sqft);
    return n ? bandForSqft(n) : DEFAULT_BAND;
  })();
  const buyNow = GOLD_BUYNOW_ANNUAL[band];
  const monthly = getPrice(gold, "monthly", band);
  const annualizedMonthly = monthly * 12;
  const standardAnnual = getPrice(gold, "annual", band);
  const savings = annualizedMonthly - buyNow;
  const belowAnnual = standardAnnual - buyNow;
  const buyNowMonthly = Math.round(buyNow / 12);
  const declineHref = processingUrl(stash, tid);

  // Value stack, sized to the home (same band as the price), so the gap holds.
  const stack = valueStackFor(gold, band);
  const netOfLaborBank = buyNow - stack.laborBank;
  const repairExample = 4000;
  const repairSaved = memberSavingsExample(gold, repairExample);
  const allFeatures = cumulativeFeatures("gold");

  async function handleAccept() {
    if (!stash) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${getApiBase()}/api/360/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: "gold",
          cadence: "annual",
          offer: "buynow_sized",
          customerName: `${stash.firstName ?? ""} ${stash.lastName ?? ""}`.trim(),
          customerEmail: stash.email,
          customerPhone: stash.phone,
          serviceAddress: stash.street,
          serviceCity: stash.city,
          serviceState: stash.state,
          serviceZip: stash.zip,
          sqft: toInt(stash.sqft),
          yearBuilt: toInt(stash.yearBuilt),
          hpCustomerId: stash.customerId && stash.customerId !== "preview" ? stash.customerId : undefined,
          translationId: stash.translationId,
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
      sessionStorage.setItem("hp360_tier", "gold");
      sessionStorage.setItem("hp360_cadence", "annual");
      sessionStorage.setItem("hp360_type", "homeowner");
      sessionStorage.setItem("hp360_fromRoadmap", "1");
      window.location.href = json.url;
    } catch (err: any) {
      setError(
        err?.message ??
          "We couldn't start checkout. No worries - your roadmap is still on its way; we'll follow up."
      );
      setLoading(false);
    }
  }

  /** Investment path: flag walkthrough intent on the existing lead. */
  async function handleWalkthroughRequest() {
    if (!stash) return;
    setLoading(true);
    setError(null);
    try {
      if (stash.customerId && stash.customerId !== "preview") {
        await fetch(`${getApiBase()}/api/public/inquiry/details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: stash.customerId,
            leadId: stash.leadId,
            street: stash.street ?? "",
            city: stash.city ?? "",
            state: stash.state ?? "WA",
            zip: stash.zip ?? "",
            notes: "INVESTOR WALKTHROUGH REQUESTED - wants to discuss the maintenance program for this property.",
            funnel: "roadmap_generator",
          }),
        });
      }
      setWalkthroughRequested(true);
    } catch {
      // The lead already exists and is routed - treat as requested anyway.
      setWalkthroughRequested(true);
    } finally {
      setLoading(false);
    }
  }

  const firstName = stash?.firstName || "there";

  if (!stash) return null;

  return (
    <div className="min-h-screen bg-[#0D1F14] text-[#F5F0E8]">
      <Navbar />

      <div className="bg-[#C9A84C] text-[#0D1F14] py-2 px-4 text-center text-sm font-bold tracking-wide">
        {isInvestment
          ? "Your roadmap is being generated right now."
          : "One-time offer - only on this page, only right now."}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center">
          One moment, {firstName}
        </p>

        {isInvestment ? (
          /* ── Investment property: consultation pitch, no checkout ── */
          <>
            <h1
              className="text-3xl md:text-5xl font-bold text-center leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your roadmap is on its way.{" "}
              <span className="text-[#C9A84C]">Want one partner across the whole property?</span>
            </h1>
            <p className="text-[#B8C8B8] text-center text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              For rental properties, our maintenance program is built around a portfolio
              walkthrough - we walk the property with you, document every system, and put
              the upkeep on a schedule that protects rent-readiness year round.
            </p>

            <div className="rounded-2xl border-2 border-[#C9A84C] bg-[#1A3A28] overflow-hidden mb-6">
              <div className="bg-[#C9A84C] text-[#0D1F14] px-6 py-3">
                <span className="font-black text-sm tracking-widest uppercase">The 360° Method for Rental Properties</span>
              </div>
              <div className="px-6 py-8">
                {walkthroughRequested ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-12 h-12 text-[#C9A84C] mx-auto mb-4" />
                    <p className="text-xl font-bold mb-2">Walkthrough requested.</p>
                    <p className="text-[#B8C8B8] text-sm mb-6">
                      We'll reach out within one business day to put it on the calendar.
                      Meanwhile, your roadmap is being generated.
                    </p>
                    <a
                      href={declineHref}
                      className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8973B] text-[#0D1F14] font-black py-3 px-6 rounded-xl text-base transition-all"
                    >
                      Watch my roadmap progress <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {[
                        "Seasonal visits across every unit - one schedule, one partner",
                        "Documented condition record for every system, every unit",
                        "Annual home scan and findings report you can file with a lender or buyer",
                        "Priority response when a tenant calls about a problem",
                        "Member rates on every repair - up to 12% off out-of-scope work",
                        "A labor-bank credit applied to in-between work",
                        "Pre-negotiated vetted-tradesman rates on major work",
                        "One number to call - no juggling trades",
                      ].map((text, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                          <span className="text-[#B8C8B8] text-sm leading-snug">{text}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[#B8C8B8] text-sm leading-snug mb-6">
                      Every item your roadmap turns up, at member rates. A {usd(repairExample)} repair
                      saves about <span className="font-bold text-[#C9A84C]">{usd(repairSaved)}</span> on
                      its own, across a portfolio that adds up fast. We size the plan to the property on
                      the walkthrough.
                    </p>
                    {error && <p className="text-center text-sm mb-4 text-[#E7B7A8]">{error}</p>}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleWalkthroughRequest}
                        disabled={loading}
                        className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-[#0D1F14] font-black py-4 px-6 rounded-xl text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
                      >
                        {loading ? "One moment…" : (
                          <>
                            Yes - book my portfolio walkthrough
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                      <a
                        href={declineHref}
                        className="w-full text-center text-[#6A8A78] text-sm py-2 hover:text-[#8BA898] transition-colors underline underline-offset-2"
                      >
                        No thanks - just send my roadmap
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ── Personal home: Maximum-only sized OTO ── */
          <>
            <h1
              className="text-3xl md:text-5xl font-bold text-center leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your roadmap is being generated.{" "}
              <span className="text-[#C9A84C]">Want member rates on every item on it?</span>
            </h1>
            <p className="text-[#B8C8B8] text-center text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Maximum Protection is {usd(stack.total)}+ of visits, a documented home scan, and{" "}
              {usd(stack.laborBank)} of real work credit, plus our deepest member pricing on every
              NOW, SOON, and WAIT item your roadmap is about to list. Lock it now, before the
              roadmap even lands, for {usd(buyNow)} for the year.
            </p>

            <div className="rounded-2xl border-2 border-[#C9A84C] bg-[#1A3A28] overflow-hidden mb-6">
              <div className="bg-[#C9A84C] text-[#0D1F14] px-6 py-3 flex items-center justify-between">
                <span className="font-black text-sm tracking-widest uppercase">Maximum Protection - Annual</span>
                <span className="flex items-center gap-1 text-sm font-bold">
                  <Clock className="w-4 h-4" /> Buy-now rate
                </span>
              </div>

              <div className="px-6 py-8">
                {/* Value stack: what the plan is worth a la carte, sized to the home. */}
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
                        Member pricing on every roadmap item, all year
                      </span>
                      <span className="text-[#C9A84C] font-semibold whitespace-nowrap">
                        up to {gold.discountPct.overFiveK}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#2A4A38]">
                    <span className="text-[#8BA898] text-sm font-semibold">Comparable value</span>
                    <span className="text-[#B8C8B8] font-bold">~{usd(stack.total)}+</span>
                  </div>
                </div>

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
                    <p className="text-[#F5F0E8] text-sm mb-1">
                      {usd(stack.laborBank)} of that is labor-bank credit you spend on real work, so your
                      net for everything else is about <span className="font-bold text-[#C9A84C]">{usd(netOfLaborBank)}</span>.
                    </p>
                    <p className="text-[#6A8A78] text-xs">
                      30% off the month-to-month cost. Priced for your home. Only on this page.
                    </p>
                  </div>
                </div>

                {/* Member discount on future work, tied to the roadmap they're getting. */}
                <div className="bg-[#0D1F14] rounded-xl p-5 mb-6">
                  <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-3">
                    Member pricing on every roadmap item
                  </p>
                  <div className="space-y-1.5 mb-3">
                    {[
                      { label: "Jobs under $1,000", pct: gold.discountPct.underOneK },
                      { label: "Jobs $1,000-$5,000", pct: gold.discountPct.oneToFiveK },
                      { label: "Jobs over $5,000", pct: gold.discountPct.overFiveK },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-[#8BA898]">{row.label}</span>
                        <span className="text-[#F5F0E8] font-semibold">{row.pct}% off</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#B8C8B8] text-sm leading-snug">
                    Every NOW, SOON, and WAIT item on your roadmap, at member rates. A {usd(repairExample)}{" "}
                    repair saves you about <span className="font-bold text-[#C9A84C]">{usd(repairSaved)}</span>{" "}
                    on its own.
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

                {error && <p className="text-center text-sm mb-4 text-[#E7B7A8]">{error}</p>}

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
                  <a
                    href={declineHref}
                    className="w-full text-center text-[#6A8A78] text-sm py-2 hover:text-[#8BA898] transition-colors underline underline-offset-2"
                  >
                    No thanks - just send my roadmap
                  </a>
                </div>
              </div>
            </div>

            <p className="text-[#4A6A54] text-xs leading-relaxed text-center">
              The 360° Method is a proactive maintenance service, not a licensed home inspection
              under RCW 18.280. Membership is an annual subscription billed today; renews at the
              standard annual rate for your home. The buy-now rate applies to this first year and
              is available only during this session. Your roadmap is yours either way.
            </p>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
