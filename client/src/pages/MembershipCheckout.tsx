/*
 * MembershipCheckout.tsx — /membership/checkout
 * Ported from 360-funnel CheckoutPage. Reads tier+cadence from URL params,
 * posts to pro.handypioneers.com/api/360/checkout with origin for redirect.
 * HP design system. No forbidden vocab.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import type { MemberTier, BillingCadence } from "@/lib/tiers";
import { TIERS, CADENCE_LABELS, getPrice, TIER_API_MAP } from "@/lib/tiers";
import { isInServiceArea, OUT_OF_AREA_MESSAGE } from "@/lib/serviceArea";

const HO_PROPERTY_TYPE_OPTIONS = [
  { value: "sfh", label: "Single-Family Home" },
  { value: "condo", label: "Condo / Townhome" },
  { value: "other", label: "Other" },
];

const HO_TIER_OPTIONS: { value: MemberTier; label: string; desc: string }[] = [
  { value: "bronze", label: "Essential", desc: "2 visits/yr · 5% member rate" },
  { value: "silver", label: "Full Coverage", desc: "4 visits/yr · 8% member rate · $300 labor bank" },
  { value: "gold", label: "Maximum Protection", desc: "4 visits/yr · 12% member rate · $600 labor bank" },
];

const PRO_API = "https://pro.handypioneers.com";

function Spinner() {
  return (
    <svg className="animate-spin inline-block mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function parseParams(search: string): { tier: MemberTier; cadence: BillingCadence } {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const rawTier = params.get("tier");
  const rawCadence = params.get("cadence");
  const tier: MemberTier =
    rawTier === "bronze" || rawTier === "silver" || rawTier === "gold" ? rawTier : "silver";
  const cadence: BillingCadence =
    rawCadence === "monthly" || rawCadence === "quarterly" || rawCadence === "annual"
      ? rawCadence
      : "annual";
  return { tier, cadence };
}

export default function MembershipCheckout() {
  const [location, navigate] = useLocation();
  const search = typeof window !== "undefined" ? window.location.search : "";
  const initial = parseParams(search);

  const [activeTier, setActiveTier] = useState<MemberTier>(initial.tier);
  const [activeCadence, setActiveCadence] = useState<BillingCadence>(initial.cadence);
  const [propertyType, setPropertyType] = useState("sfh");
  const tierData = TIERS.find((t) => t.id === activeTier)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zipError, setZipError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [fallbackCaptured, setFallbackCaptured] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "WA", zip: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "zip") setZipError(null);
  };

  const handleBack = () => navigate("/membership");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError("Please agree to the terms.");
      return;
    }

    const zip = form.zip.trim();
    if (zip && !isInServiceArea(zip)) {
      setZipError(OUT_OF_AREA_MESSAGE);
      return;
    }

    setLoading(true);
    setError(null);

    const apiTier = TIER_API_MAP[activeTier] ?? activeTier;
    const customer = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
    };

    fetch(`${PRO_API}/api/360/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "checkout_started",
        type: "homeowner",
        data: {
          tier: apiTier, cadence: activeCadence, ...customer,
          serviceAddress: form.address, serviceCity: form.city,
          serviceState: form.state, serviceZip: form.zip,
          propertyType,
        },
      }),
    }).catch(() => {});

    try {
      const res = await fetch(`${PRO_API}/api/360/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "homeowner",
          tier: apiTier,
          cadence: activeCadence,
          customer,
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
      sessionStorage.setItem("hp360_type", "homeowner");
      window.location.href = url;
    } catch (err: unknown) {
      // Detect network/CORS failure (TypeError: "Failed to fetch") and route
      // to the same-origin fallback endpoint so the lead isn't lost while
      // HP Estimator CORS is broken. See BACKEND_CORS_FIX.md.
      const isNetworkOrCors = err instanceof TypeError;
      if (isNetworkOrCors) {
        try {
          await fetch("/api/fallback-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              source: "membership_checkout_cors_fallback",
              tier: apiTier,
              cadence: activeCadence,
              propertyType,
              customer,
              submittedAt: new Date().toISOString(),
            }),
          });
        } catch {
          // Even the same-origin fallback failed — still show fallback UI so
          // the visitor has a next step.
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

  const price = getPrice(tierData, activeCadence);
  const cadenceLabel = CADENCE_LABELS[activeCadence];
  const cadenceSuffix = activeCadence === "monthly" ? "mo" : activeCadence === "quarterly" ? "qtr" : "yr";
  const hasLaborBank = tierData.laborBankDollars > 0;
  const visitsDesc = tierData.visits === 2 ? "2 seasonal visits/yr" : "4 seasonal visits/yr";

  if (fallbackCaptured) {
    return (
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
            className="w-full max-w-xl rounded-2xl p-8 md:p-10 text-center bg-white"
            style={{ border: `2px solid ${G}`, boxShadow: "0 4px 32px oklch(0 0 0 / 0.08)" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "oklch(22% 0.07 155 / 0.10)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-black mb-3" style={{ color: G }}>
              We've Captured Your Interest
            </h1>
            <p className="text-sm leading-relaxed mb-4" style={{ color: M }}>
              Payment processing is temporarily unavailable. A member of the Handy Pioneers team will reach out within 24 hours to complete your enrollment in the 360° Method and confirm your first visit.
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
                onClick={() => navigate("/membership")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-sm border transition-opacity hover:opacity-80"
                style={{ borderColor: G, color: G, background: "white" }}
              >
                Back to Membership
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: "oklch(96% 0.015 80)" }}>
      {/* Top bar */}
      <div style={{ background: "oklch(16% 0.06 155)" }} className="text-white/80 text-xs py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <span>5-Star Rated · Licensed &amp; Insured · WA Lic. HANDYP*761NH</span>
          <a href="tel:+13608386731" className="hover:text-white transition-colors font-medium">
            (360) 838-6731
          </a>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm" style={{ borderColor: B }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-70"
            style={{ color: M }}
          >
            ← Back
          </button>
          <span style={{ color: B }}>|</span>
          <span className="font-display text-lg font-black" style={{ color: G }}>
            360° Method
          </span>
          <span className="text-xs ml-1" style={{ color: M }}>· Secure Checkout</span>
        </div>
      </nav>

      {/* Sticky mobile order bar */}
      <div
        className="md:hidden sticky top-[52px] z-40 px-4 py-2 flex items-center justify-between text-sm font-semibold shadow-sm"
        style={{ background: G, color: "oklch(100% 0 0)" }}
      >
        <span>{tierData.name} · {cadenceLabel}</span>
        <span>${price}/{cadenceSuffix}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: FORM */}
        <div>
          <h2 className="font-display text-2xl font-black mb-6" style={{ color: G }}>
            Your Information
          </h2>

          <div className="mb-6 rounded-lg p-4 bg-white" style={{ border: `2px solid ${G}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: G }}>
              Your Property
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full rounded-md px-3 py-2 text-sm focus:outline-none"
                  style={inputStyle}
                  onFocus={focusAmber}
                  onBlur={blurReset}
                >
                  {HO_PROPERTY_TYPE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: M }}>
                  Plan
                </label>
                <div className="space-y-2">
                  {HO_TIER_OPTIONS.map((t) => {
                    const tData = TIERS.find((td) => td.id === t.value)!;
                    const tPrice = getPrice(tData, activeCadence);
                    const tSuffix = activeCadence === "monthly" ? "mo" : activeCadence === "quarterly" ? "qtr" : "yr";
                    const isActive = activeTier === t.value;
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setActiveTier(t.value)}
                        className="w-full rounded-md px-3 py-2.5 text-left transition-all border-2 flex items-center justify-between"
                        style={{
                          background: isActive ? "oklch(22% 0.07 155 / 0.06)" : "oklch(100% 0 0)",
                          borderColor: isActive ? G : "oklch(85% 0.02 80)",
                          color: G,
                        }}
                      >
                        <div>
                          <p className="text-sm font-bold">{t.label}</p>
                          <p className="text-xs mt-0.5" style={{ color: M }}>{t.desc}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <p className="text-sm font-black">${tPrice}/{tSuffix}</p>
                          {isActive && <p className="text-xs" style={{ color: A }}>✓ Selected</p>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-md px-4 py-3 mb-6"
            style={{
              background: "oklch(22% 0.07 155 / 0.06)",
              border: `1px solid oklch(22% 0.07 155 / 0.15)`,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: M }}>
              Billing Frequency
            </p>
            <div className="flex gap-2">
              {(["monthly", "quarterly", "annual"] as BillingCadence[]).map((c) => {
                const cLabel = c === "monthly" ? "Monthly" : c === "quarterly" ? "Quarterly" : "Annual";
                const cPrice = getPrice(tierData, c);
                const cSuffix = c === "monthly" ? "mo" : c === "quarterly" ? "qtr" : "yr";
                const isActive = activeCadence === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCadence(c)}
                    className="flex-1 rounded-md py-2 px-2 text-xs font-semibold transition-all border-2"
                    style={{
                      background: isActive ? G : "oklch(100% 0 0)",
                      color: isActive ? "oklch(100% 0 0)" : G,
                      borderColor: isActive ? G : "oklch(80% 0.02 80)",
                    }}
                  >
                    <div>{cLabel}</div>
                    <div className="font-black" style={{ fontSize: "0.9rem" }}>${cPrice}/{cSuffix}</div>
                    {c === "annual" && (
                      <div className="text-xs mt-0.5" style={{ color: isActive ? "oklch(75% 0.12 72)" : A }}>
                        Highest savings
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {activeCadence === "monthly" && hasLaborBank && (
            <div
              className="rounded-md px-4 py-3 mb-6 text-sm"
              style={{
                background: "oklch(65% 0.15 72 / 0.08)",
                border: "1px solid oklch(65% 0.15 72 / 0.3)",
              }}
            >
              <span style={{ color: "oklch(45% 0.12 68)" }}>
                💡 <strong>Unlock ${tierData.laborBankDollars} in labor bank credit on day one</strong> — switch to Quarterly or Annual above.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                Service Address *
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
              <div className="col-span-1">
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
                style={{
                  background: "oklch(95% 0.02 25)",
                  border: "1px solid oklch(70% 0.18 25)",
                  color: "oklch(35% 0.15 25)",
                }}
              >
                {zipError}
              </div>
            )}

            {error && (
              <div
                className="rounded-md px-4 py-3 text-sm"
                style={{
                  background: "oklch(95% 0.02 25)",
                  border: "1px solid oklch(70% 0.18 25)",
                  color: "oklch(35% 0.15 25)",
                }}
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
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 font-semibold transition-colors hover:opacity-70"
                  style={{ color: G }}
                >
                  Terms &amp; Conditions
                </a>{" "}
                and authorize recurring subscription billing as described above. I understand I may cancel anytime from my member portal.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full text-white font-bold py-3 rounded-md transition-all text-sm uppercase tracking-wide disabled:opacity-60"
              style={{ background: G }}
              onMouseEnter={(e) =>
                !loading && agreedToTerms &&
                ((e.currentTarget as HTMLButtonElement).style.background = "oklch(30% 0.08 155)")
              }
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = G)}
            >
              {loading ? (
                <><Spinner />Redirecting to payment...</>
              ) : (
                `Continue to Payment — $${price}/${cadenceSuffix}`
              )}
            </button>

            <p className="text-center text-xs" style={{ color: "oklch(60% 0.02 60)" }}>
              🔒 Secure checkout powered by Stripe · You'll confirm your address and get your first visit scheduled within 48 hours.
            </p>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-black mb-4" style={{ color: G }}>
              Order Summary
            </h2>
            <div className="rounded-lg border-2 bg-white overflow-hidden" style={{ borderColor: G }}>
              <div className="px-5 py-4" style={{ background: G }}>
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-1"
                  style={{ color: "oklch(65% 0.07 155)" }}
                >
                  360° Method — {tierData.name}
                </p>
                <p className="font-display text-lg font-black" style={{ color: "oklch(100% 0 0)" }}>
                  {cadenceLabel} Billing
                </p>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div className="pb-3" style={{ borderBottom: `1px solid oklch(92% 0.01 80)` }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: G }}>{tierData.name} Plan</p>
                      <p className="text-xs mt-0.5" style={{ color: M }}>
                        {cadenceLabel} membership · {visitsDesc}
                      </p>
                      {hasLaborBank && (
                        <p
                          className="text-xs mt-0.5 font-medium"
                          style={{
                            color: activeCadence === "monthly" ? "oklch(55% 0.02 60)" : "oklch(55% 0.14 68)",
                          }}
                        >
                          {activeCadence === "monthly"
                            ? `⏳ $${tierData.laborBankDollars} labor bank — unlocks after 90 days`
                            : `✅ $${tierData.laborBankDollars} labor bank — day one`}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: G }}>
                      ${price}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {tierData.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-xs"
                        style={{ color: "oklch(45% 0.03 255)" }}
                      >
                        <span style={{ color: A }} className="flex-shrink-0">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-sm" style={{ color: G }}>Total</span>
                  <div className="text-right">
                    <span className="font-display text-2xl font-black" style={{ color: G }}>${price}</span>
                    <span className="text-sm ml-1" style={{ color: M }}>/{cadenceSuffix}</span>
                  </div>
                </div>
                <p className="text-xs" style={{ color: M }}>
                  Billed {cadenceLabel.toLowerCase()} · Recurring subscription · Cancel anytime
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-4 space-y-2 bg-white" style={{ border: `1px solid ${B}` }}>
            {[
              "🔒 256-bit SSL encryption",
              "✓ Licensed & Insured — WA Lic. HANDYP*761NH",
              "✓ Cancel anytime, no long-term contracts",
              "✓ 1-Year Labor Guarantee on all work",
            ].map((t) => (
              <div key={t} className="text-xs" style={{ color: "oklch(40% 0.03 60)" }}>{t}</div>
            ))}
          </div>

          <div className="rounded-lg p-5 bg-white" style={{ border: `1px solid ${B}` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: A }}>
              What Happens Next
            </p>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Payment confirmed",
                  body: "You'll receive a receipt and welcome email from help@handypioneers.com within minutes.",
                },
                {
                  step: "2",
                  title: "We contact you within 24 hrs",
                  body: "Our team reaches out to confirm your address and schedule your Annual 360° Home Scan.",
                },
                {
                  step: "3",
                  title: "First visit scheduled within 48 hrs",
                  body: "Your first seasonal visit is queued. You'll receive a confirmation with your scheduled date.",
                },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 text-white"
                    style={{ background: G }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: G }}>{s.title}</p>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: M }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
