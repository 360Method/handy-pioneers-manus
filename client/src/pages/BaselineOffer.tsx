/**
 * BaselineOffer.tsx — /baseline/offer (Step 3 of the baseline funnel)
 * One-time buy-now upsell: lock the annual plan at 30% off the month-to-month cost.
 * Accept -> Stripe checkout (offer=buynow, annual). Decline -> confirmation.
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import { TIERS } from "@/lib/tiers";
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
    document.title = "One-Time Offer | Baseline Walkthrough — Handy Pioneers";
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
  const buyNow = Math.round(annualizedMonthly * 0.7); // 30% off month-to-month
  const savings = annualizedMonthly - buyNow;
  const buyNowMonthly = Math.round(buyNow / 12);

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
          origin: window.location.origin,
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`Server error ${res.status}: ${t.slice(0, 160)}`);
      }
      const json = await res.json();
      if (!json?.url) throw new Error(json?.error ?? "Checkout could not start.");
      window.location.href = json.url;
    } catch (err: any) {
      setError(
        err?.message ??
          "We couldn't start checkout. No worries — your walkthrough is still booked; we'll follow up."
      );
      setLoading(false);
    }
  }

  const firstName = stash?.firstName || "there";

  return (
    <div className="min-h-screen bg-[#0D1F14] text-[#F5F0E8]">
      <Navbar />

      <div className="bg-[#C9A84C] text-[#0D1F14] py-2 px-4 text-center text-sm font-bold tracking-wide">
        One-time offer — only on this page, only right now.
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <p className="text-[#C9A84C] text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center">
          One moment, {firstName}
        </p>
        <h1
          className="text-3xl md:text-5xl font-bold text-center leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Your walkthrough is booked. <span className="text-[#C9A84C]">Want to lock your rate?</span>
        </h1>
        <p className="text-[#B8C8B8] text-center text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          We'll be in touch to schedule your baseline either way. But homeowners who commit to the
          annual plan right now — before the walkthrough — get our deepest rate of the year.
        </p>

        <div className="rounded-2xl border-2 border-[#C9A84C] bg-[#1A3A28] overflow-hidden mb-6">
          <div className="bg-[#C9A84C] text-[#0D1F14] px-6 py-3 flex items-center justify-between">
            <span className="font-black text-sm tracking-widest uppercase">{tier.name} — Annual</span>
            <span className="flex items-center gap-1 text-sm font-bold">
              <Clock className="w-4 h-4" /> Buy-now rate
            </span>
          </div>

          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {tier.features.slice(0, 6).map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                  <span className="text-[#B8C8B8] text-sm leading-snug">{text}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#0D1F14] rounded-xl p-5 mb-6 text-center">
              <p className="text-[#8BA898] text-xs uppercase tracking-widest mb-1">
                Pay month-to-month and a year runs {usd(annualizedMonthly)}
              </p>
              <p
                className="text-[#C9A84C] text-5xl font-black mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {usd(buyNow)}/yr
              </p>
              <p className="text-[#F5F0E8] text-sm mb-1">
                That's about {usd(buyNowMonthly)}/mo — and you save{" "}
                <span className="font-bold text-[#C9A84C]">{usd(savings)}</span> this year.
              </p>
              <p className="text-[#6A8A78] text-xs">
                30% off the month-to-month cost. This rate is only on this page.
              </p>
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
                    Yes — lock my annual rate ({usd(buyNow)}/yr)
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <button
                onClick={() => navigate("/baseline/confirmed")}
                className="w-full text-[#6A8A78] text-sm py-2 hover:text-[#8BA898] transition-colors underline underline-offset-2"
              >
                No thanks — just schedule my baseline walkthrough
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
