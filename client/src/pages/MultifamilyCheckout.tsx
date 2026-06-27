/*
 * MultifamilyCheckout.tsx - /multifamily/checkout
 * Landlord self-serve enrollment. Mirrors MembershipCheckout.tsx but prices the
 * BUILDING (base by total size + per-unit coverage) and posts to the landlord
 * REST shim /api/360/landlord-checkout. Reads tier, cadence, sqft, and units
 * from the URL (chosen on /multifamily). The owner ever sees ONE combined price
 * for the property - never a per-unit line, never cost or markup. Consult-first
 * stays primary on /multifamily; this is the secondary "enroll now" path,
 * staging-gated until Marcin flips prod on.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import type { MemberTier, BillingCadence } from "@/lib/tiers";
import { TIERS, bandForSqft, getLandlordPrice, getLandlordMonthlyEquivalent } from "@/lib/tiers";
import { isInServiceArea, OUT_OF_AREA_MESSAGE } from "@/lib/serviceArea";
import { getApiBase } from "@/lib/api";
import { track } from "@/lib/analytics";
import SEO from "@/components/SEO";

const LL_TIER_OPTIONS: { value: MemberTier; label: string; desc: string }[] = [
  { value: "bronze", label: "Essential", desc: "Spring + Fall building visits · member rates" },
  { value: "silver", label: "Full Coverage", desc: "All 4 seasons · $300 labor bank · member rates" },
  { value: "gold", label: "Maximum Protection", desc: "All 4 seasons · $600 labor bank · priority turnovers" },
];

const UNIT_LABEL: Record<number, string> = {
  1: "Single-family rental",
  2: "Duplex (2 units)",
  3: "Triplex (3 units)",
  4: "Fourplex (4 units)",
};

const PRO_API = getApiBase();

function Spinner() {
  return (
    <svg className="animate-spin inline-block mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function parseParams(search: string): {
  tier: MemberTier;
  cadence: BillingCadence;
  sqft: number;
  units: number;
} {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const rawTier = params.get("tier");
  const rawCadence = params.get("cadence");
  const tier: MemberTier =
    rawTier === "bronze" || rawTier === "silver" || rawTier === "gold" ? rawTier : "silver";
  const cadence: BillingCadence =
    rawCadence === "monthly" || rawCadence === "quarterly" || rawCadence === "annual"
      ? rawCadence
      : "monthly";
  const sqftRaw = parseInt(params.get("sqft") ?? "", 10);
  const sqft = Number.isFinite(sqftRaw) && sqftRaw > 0 ? sqftRaw : 4000;
  const unitsRaw = parseInt(params.get("units") ?? "", 10);
  // 1 to 4 units only price cleanly here; anything outside is consult/portfolio.
  const units = Number.isFinite(unitsRaw) ? Math.min(4, Math.max(1, unitsRaw)) : 2;
  return { tier, cadence, sqft, units };
}

export default function MultifamilyCheckout() {
  const [, navigate] = useLocation();
  const search = typeof window !== "undefined" ? window.location.search : "";
  const initial = parseParams(search);

  const [activeTier, setActiveTier] = useState<MemberTier>(initial.tier);
  const [activeCadence, setActiveCadence] = useState<BillingCadence>(initial.cadence);
  const sqft = initial.sqft;
  const units = initial.units;
  const band = bandForSqft(sqft);
  const tierData = TIERS.find((t) => t.id === activeTier)!;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zipError, setZipError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [fallbackCaptured, setFallbackCaptured] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "WA", zip: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    track("begin_checkout", {
      funnel: "landlord_selfcheckout",
      tier: initial.tier,
      cadence: initial.cadence,
      units: initial.units,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "zip") setZipError(null);
  };

  const handleBack = () => navigate("/multifamily");

  // One combined building price. Never expose the per-unit math.
  const price = getLandlordPrice(tierData, activeCadence, units, band);
  const monthlyEq = getLandlordMonthlyEquivalent(tierData, activeCadence, units, band);
  const cadenceLabel =
    activeCadence === "monthly" ? "Monthly" : activeCadence === "quarterly" ? "Quarterly" : "Annual";
  const cadenceSuffix = activeCadence === "monthly" ? "mo" : activeCadence === "quarterly" ? "qtr" : "yr";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms || !smsConsent) {
      setError("Please agree to the Terms & Conditions and SMS consent.");
      return;
    }
    const zip = form.zip.trim();
    if (zip && !isInServiceArea(zip)) {
      setZipError(OUT_OF_AREA_MESSAGE);
      return;
    }

    setLoading(true);
    setError(null);

    const customer = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
    };

    try {
      const res = await fetch(`${PRO_API}/api/360/landlord-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Flat shape required by threeSixty.landlordCheckout.createSession (the
          // REST shim passes this body straight through). The backend re-prices
          // from getLandlordPriceBreakdown(tier, cadence, sqft, units), so the
          // amount charged equals the price shown here.
          tier: activeTier,
          cadence: activeCadence,
          sqft,
          unitCount: units,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          serviceAddress: customer.address,
          serviceCity: customer.city,
          serviceState: customer.state,
          serviceZip: customer.zip,
          successPath: "/membership/confirmation",
          origin: window.location.origin,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text.slice(0, 200)}`);
      }
      const json = await res.json();
      const url = json?.url;
      if (!url) throw new Error(json?.error ?? "Checkout failed");
      sessionStorage.setItem("hp360_tier", activeTier);
      sessionStorage.setItem("hp360_cadence", activeCadence);
      sessionStorage.setItem("hp360_type", "portfolio");
      window.location.href = url;
    } catch (err: unknown) {
      // Network/CORS failure (TypeError: "Failed to fetch") routes to the
      // same-origin fallback so the landlord lead is never lost.
      const isNetworkOrCors = err instanceof TypeError;
      if (isNetworkOrCors) {
        try {
          await fetch("/api/fallback-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              source: "multifamily_checkout_cors_fallback",
              tier: activeTier,
              cadence: activeCadence,
              units,
              sqft,
              customer,
              submittedAt: new Date().toISOString(),
            }),
          });
        } catch {
          // Even the fallback failed - still show fallback UI so the visitor
          // has a next step.
        }
        setFallbackCaptured(true);
        setLoading(false);
        return;
      }
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const G = "oklch(22% 0.07 155)";
  const A = "oklch(65% 0.15 72)";
  const B = "oklch(85% 0.02 80)";
  const M = "oklch(50% 0.02 60)";

  const inputStyle: React.CSSProperties = {
    border: `1px solid ${B}`,
    background: "oklch(100% 0 0)",
    color: "oklch(18% 0.03 60)",
  };
  const focusAmber = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = A);
  const blurReset = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = B);

  if (fallbackCaptured) {
    return (
      <>
        <SEO
          path="/multifamily/checkout"
          title="Confirm Your 360° Landlord Plan | Handy Pioneers"
          description="Enroll your rental building in the 360° Method. Seasonal building visits, documented reports, and member-rate turnovers across Clark County, WA."
          noindex
        />
        <div className="min-h-screen font-sans flex flex-col" style={{ background: "oklch(96% 0.015 80)" }}>
          <div style={{ background: "oklch(16% 0.06 155)" }} className="text-white/80 text-xs py-2 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <span>5-Star Rated · Licensed &amp; Insured · WA Lic. HANDYP*761NH</span>
              <a href="tel:+13608386731" className="hover:text-white transition-colors font-medium">
                (360) 838-6731
              </a>
            </div>
          </div>
          <main className="flex-1 flex items-center justify-center px-4 py-16">
            <div
              className="w-full max-w-xl rounded-2xl p-8 text-center bg-white"
              style={{ border: `2px solid ${G}`, boxShadow: "0 4px 32px oklch(0 0 0 / 0.08)" }}
            >
              <h1 className="font-display text-2xl font-black mb-3" style={{ color: G }}>
                We've Captured Your Interest
              </h1>
              <p className="text-sm leading-relaxed mb-4" style={{ color: M }}>
                Payment processing is temporarily unavailable. A member of the Handy Pioneers team will reach out within one business day to complete your enrollment and book your building's baseline scan.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: M }}>
                You'll hear from us at <strong style={{ color: G }}>{form.email}</strong> or <strong style={{ color: G }}>{form.phone}</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+13608386731"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: G, textDecoration: "none" }}
                >
                  Call (360) 838-6731
                </a>
                <button
                  onClick={() => navigate("/multifamily")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm border transition-opacity hover:opacity-80"
                  style={{ borderColor: G, color: G, background: "white" }}
                >
                  Back to Plans
                </button>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        path="/multifamily/checkout"
        title="Confirm Your 360° Landlord Plan | Handy Pioneers"
        description="Enroll your rental building in the 360° Method. Seasonal building visits, documented reports, and member-rate turnovers across Clark County, WA."
        noindex
      />
      <div className="min-h-screen font-sans" style={{ background: "oklch(96% 0.015 80)" }}>
        {/* Top bar */}
        <div style={{ background: "oklch(16% 0.06 155)" }} className="text-white/80 text-xs py-2 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <span>Licensed &amp; Insured · WA Lic. HANDYP*761NH</span>
            <a href="tel:+13608386731" className="hover:text-white transition-colors font-medium">
              (360) 838-6731
            </a>
          </div>
        </div>

        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-white border-b shadow-sm" style={{ borderColor: B }}>
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-70"
              style={{ color: M }}
            >
              ← Back
            </button>
            <span style={{ color: B }}>|</span>
            <span className="font-display text-base font-black" style={{ color: G }}>
              360° Method for Landlords
            </span>
          </div>
        </nav>

        {/* Sticky mobile order bar */}
        <div
          className="sticky top-[49px] z-40 px-4 py-2 flex items-center justify-between text-sm font-semibold shadow-sm"
          style={{ background: G, color: "oklch(100% 0 0)" }}
        >
          <span className="truncate pr-2">{tierData.name} · {cadenceLabel}</span>
          <span className="flex-shrink-0">${price}/{cadenceSuffix}</span>
        </div>

        <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
          {/* Building summary - one combined price, no per-unit breakdown */}
          <div className="rounded-lg border-2 bg-white overflow-hidden" style={{ borderColor: G }}>
            <div className="px-5 py-4" style={{ background: G }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: "oklch(65% 0.07 155)" }}>
                360° Method for Landlords · {tierData.name}
              </p>
              <p className="font-display text-lg font-black" style={{ color: "oklch(100% 0 0)" }}>
                {cadenceLabel} Billing
              </p>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className="flex items-start justify-between gap-3 pb-3" style={{ borderBottom: `1px solid oklch(92% 0.01 80)` }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: G }}>Your building</p>
                  <p className="text-xs mt-0.5" style={{ color: M }}>
                    {UNIT_LABEL[units] ?? `${units} units`} · about {sqft.toLocaleString()} sq ft
                  </p>
                </div>
                <button
                  onClick={handleBack}
                  className="text-xs font-semibold underline flex-shrink-0"
                  style={{ color: A }}
                >
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-sm" style={{ color: G }}>Your price</span>
                <div className="text-right">
                  <span className="font-display text-2xl font-black" style={{ color: G }}>${price}</span>
                  <span className="text-sm ml-1" style={{ color: M }}>/{cadenceSuffix}</span>
                </div>
              </div>
              <p className="text-xs" style={{ color: M }}>
                One price for the whole property{activeCadence !== "monthly" ? ` (about $${monthlyEq}/mo)` : ""} · billed {cadenceLabel.toLowerCase()} · cancel anytime. We confirm the building and units at your first visit before anything begins.
              </p>
            </div>
          </div>

          {/* Plan + billing chooser */}
          <div>
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: M }}>
              Coverage level
            </label>
            <div className="space-y-2">
              {LL_TIER_OPTIONS.map((t) => {
                const tData = TIERS.find((td) => td.id === t.value)!;
                const tPrice = getLandlordPrice(tData, activeCadence, units, band);
                const isActive = activeTier === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setActiveTier(t.value)}
                    className="w-full rounded-md px-3 py-2.5 text-left transition-all border-2 flex items-center justify-between gap-3"
                    style={{
                      background: isActive ? "oklch(22% 0.07 155 / 0.06)" : "oklch(100% 0 0)",
                      borderColor: isActive ? G : "oklch(85% 0.02 80)",
                      color: G,
                    }}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{t.label}</p>
                      <p className="text-xs mt-0.5 leading-snug" style={{ color: M }}>{t.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-black">${tPrice}/{cadenceSuffix}</p>
                      {isActive && <p className="text-xs" style={{ color: A }}>✓ Selected</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-md px-4 py-3"
            style={{ background: "oklch(22% 0.07 155 / 0.06)", border: `1px solid oklch(22% 0.07 155 / 0.15)` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: M }}>
              Billing frequency
            </p>
            <div className="flex gap-2">
              {(["monthly", "quarterly", "annual"] as BillingCadence[]).map((c) => {
                const cLabel = c === "monthly" ? "Monthly" : c === "quarterly" ? "Quarterly" : "Annual";
                const cPrice = getLandlordPrice(tierData, c, units, band);
                const cSuffix = c === "monthly" ? "mo" : c === "quarterly" ? "qtr" : "yr";
                const isActive = activeCadence === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCadence(c)}
                    className="flex-1 rounded-md py-2 px-1 text-xs font-semibold transition-all border-2"
                    style={{
                      background: isActive ? G : "oklch(100% 0 0)",
                      color: isActive ? "oklch(100% 0 0)" : G,
                      borderColor: isActive ? G : "oklch(80% 0.02 80)",
                    }}
                  >
                    <div>{cLabel}</div>
                    <div className="font-black" style={{ fontSize: "0.85rem" }}>${cPrice}/{cSuffix}</div>
                    {c === "annual" && (
                      <div className="text-[0.65rem] mt-0.5" style={{ color: isActive ? "oklch(75% 0.12 72)" : A }}>
                        Best value
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Owner details */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-display text-xl font-black" style={{ color: G }}>
              Your information
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {(["firstName", "lastName"] as const).map((n) => (
                <div key={n}>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                    {n === "firstName" ? "First Name" : "Last Name"} *
                  </label>
                  <input
                    name={n}
                    value={form[n]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
                    style={inputStyle}
                    onFocus={focusAmber}
                    onBlur={blurReset}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
                style={inputStyle}
                onFocus={focusAmber}
                onBlur={blurReset}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                Phone *
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
                style={inputStyle}
                onFocus={focusAmber}
                onBlur={blurReset}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                Building Address *
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Street address"
                className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
                style={inputStyle}
                onFocus={focusAmber}
                onBlur={blurReset}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                  City *
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
                  style={inputStyle}
                  onFocus={focusAmber}
                  onBlur={blurReset}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                  State *
                </label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
                  style={inputStyle}
                  onFocus={focusAmber}
                  onBlur={blurReset}
                >
                  <option value="WA">WA</option>
                  <option value="OR">OR</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                  ZIP *
                </label>
                <input
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  placeholder="98660"
                  className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
                  style={{ ...inputStyle, borderColor: zipError ? "oklch(55% 0.18 25)" : undefined }}
                  onFocus={focusAmber}
                  onBlur={blurReset}
                />
              </div>
            </div>

            {zipError && (
              <div
                className="rounded-md px-4 py-3 text-sm"
                style={{ background: "oklch(95% 0.02 25)", border: "1px solid oklch(70% 0.18 25)", color: "oklch(35% 0.15 25)" }}
              >
                {zipError}
              </div>
            )}

            {error && (
              <div
                className="rounded-md px-4 py-3 text-sm"
                style={{ background: "oklch(95% 0.02 25)", border: "1px solid oklch(70% 0.18 25)", color: "oklch(35% 0.15 25)" }}
              >
                {error}
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded accent-amber-600"
              />
              <span className="text-xs leading-relaxed" style={{ color: M }}>
                I agree to the{" "}
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-semibold" style={{ color: G }}>
                  Terms &amp; Conditions
                </a>{" "}
                and authorize recurring subscription billing as described above. I understand I may cancel anytime from my member portal.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded accent-amber-600"
              />
              <span className="text-xs leading-relaxed" style={{ color: M }}>
                I agree to receive SMS text messages from Handy Pioneers at the phone number provided. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out. See{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-semibold" style={{ color: G }}>Privacy Policy</a>{" "}
                and{" "}
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-semibold" style={{ color: G }}>Terms</a>.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreedToTerms || !smsConsent}
              className="w-full text-white font-bold py-3 rounded-md transition-all text-sm uppercase tracking-wide disabled:opacity-60"
              style={{ background: G }}
            >
              {loading ? (
                <><Spinner />Redirecting to payment...</>
              ) : (
                `Enroll & Pay - $${price}/${cadenceSuffix}`
              )}
            </button>

            <p className="text-center text-xs" style={{ color: "oklch(60% 0.02 60)" }}>
              🔒 Secure checkout powered by Stripe · We confirm your building and units at the first visit before any work begins.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
