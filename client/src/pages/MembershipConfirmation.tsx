/*
 * MembershipConfirmation.tsx — /membership/confirmation
 * Stripe success redirect target. Reads tier/cadence from sessionStorage,
 * session_id from URL params. Portal deep-link CTA.
 */

import { useMemo } from "react";
import { TIERS, CADENCE_LABELS } from "@/lib/tiers";
import type { BillingCadence } from "@/lib/tiers";
import SEO from "@/components/SEO";

const G = "oklch(22% 0.07 155)";
const A = "oklch(65% 0.15 72)";
const B = "oklch(85% 0.02 80)";
const M = "oklch(50% 0.02 60)";

export default function MembershipConfirmation() {
  const params = useMemo(
    () => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""),
    []
  );

  const sessionId = params.get("session_id") ?? null;
  const tierParam =
    typeof window !== "undefined"
      ? sessionStorage.getItem("hp360_tier") ?? params.get("tier") ?? null
      : params.get("tier") ?? null;
  const cadenceParam = (typeof window !== "undefined"
    ? sessionStorage.getItem("hp360_cadence") ?? params.get("cadence") ?? null
    : params.get("cadence") ?? null) as BillingCadence | null;
  const isPortfolio =
    (typeof window !== "undefined" && sessionStorage.getItem("hp360_type") === "portfolio") ||
    params.get("type") === "portfolio";

  if (typeof window !== "undefined" && sessionId) {
    sessionStorage.removeItem("hp360_tier");
    sessionStorage.removeItem("hp360_cadence");
    sessionStorage.removeItem("hp360_type");
  }

  const tierData = tierParam ? TIERS.find((t) => t.id === tierParam) ?? null : null;
  const cadenceLabel = cadenceParam ? CADENCE_LABELS[cadenceParam] : null;
  const hasLaborBank = tierData ? tierData.laborBankDollars > 0 : false;
  const laborBankActive = hasLaborBank && cadenceParam !== null && cadenceParam !== "monthly";

  const portalUrl = sessionId
    ? `https://client.handypioneers.com/portal/home?session_id=${sessionId}`
    : "https://client.handypioneers.com/portal/home";

  const nextSteps = [
    {
      icon: "📧",
      title: "Check your email",
      body: "A welcome email with your membership details and receipt is on its way from help@handypioneers.com.",
    },
    {
      icon: "📅",
      title: "We'll contact you within 24 hours",
      body: "Our team will reach out to confirm your address and schedule your Annual 360° Home Scan at a time that works for you.",
    },
    {
      icon: "🔧",
      title: "First seasonal visit queued within 48 hours",
      body: "Based on today's date, we'll schedule your next seasonal visit and send a reminder 2 weeks before.",
    },
    ...(laborBankActive && tierData
      ? [
          {
            icon: "💰",
            title: `$${tierData.laborBankDollars} labor bank is loaded`,
            body: "Your labor bank credit is available now. Use it on any in-between visit task — call or message us and we'll apply it to your invoice.",
          },
        ]
      : hasLaborBank && tierData && cadenceParam === "monthly"
      ? [
          {
            icon: "⏳",
            title: `$${tierData.laborBankDollars} labor bank — accruing`,
            body: "Your labor bank credit accrues over your first 90 days on the Monthly plan. It will be available in full after day 90.",
          },
        ]
      : []),
  ];

  return (
    <>
      <SEO
        path="/membership/confirmation"
        title="Membership Confirmed | Handy Pioneers"
        description="Your 360° Method membership is active. Here's what happens next for your Clark County home."
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

      <nav className="bg-white border-b shadow-sm" style={{ borderColor: B }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="font-display text-lg font-black" style={{ color: G }}>
            Handy Pioneers · 360° Method
          </span>
        </div>
      </nav>

      <div className="py-16 px-4 text-center text-white" style={{ background: G }}>
        <div
          className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "oklch(65% 0.15 72 / 0.2)",
            border: "2px solid oklch(65% 0.15 72 / 0.4)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M7 16l7 7 11-11"
              stroke="oklch(75% 0.15 72)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="font-display text-4xl font-black mb-3">
          You're in. Welcome to the<br />
          <span style={{ color: A }}>360° Method.</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-2" style={{ color: "oklch(100% 0 0 / 0.75)" }}>
          Your{" "}
          <strong className="text-white">
            {tierData?.name ?? (isPortfolio ? "Portfolio" : "360°")}
          </strong>{" "}
          membership is active.
        </p>
        {cadenceLabel && (
          <p className="text-sm" style={{ color: "oklch(100% 0 0 / 0.5)" }}>
            Billing: {cadenceLabel}
            {sessionId && <span className="ml-2 text-xs">· Ref: {sessionId.slice(-8)}</span>}
          </p>
        )}
      </div>

      <div className="flex-1 px-4 py-12">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: A }}>
            What Happens Next
          </p>
          <div className="space-y-4 mb-8">
            {nextSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white rounded-lg p-5"
                style={{ border: `1px solid ${B}` }}
              >
                <div className="text-2xl flex-shrink-0">{step.icon}</div>
                <div>
                  <div className="font-bold mb-1" style={{ color: G }}>{step.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: M }}>{step.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <a
              href={portalUrl}
              className="block w-full text-center text-white font-bold py-3 rounded-md text-sm uppercase tracking-wide transition-all"
              style={{ background: A }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = "oklch(55% 0.14 68)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = A)
              }
            >
              Access My Member Portal →
            </a>
            <a
              href="tel:+13608386731"
              className="block w-full text-center font-medium py-3 rounded-md text-sm transition-all"
              style={{ background: "oklch(100% 0 0)", border: `1px solid ${B}`, color: G }}
            >
              Questions? Call (360) 838-6731
            </a>
          </div>

          <div
            className="mt-8 rounded-lg p-4 text-center"
            style={{
              background: "oklch(22% 0.07 155 / 0.05)",
              border: `1px solid oklch(22% 0.07 155 / 0.12)`,
            }}
          >
            <p className="text-xs" style={{ color: M }}>
              <strong style={{ color: G }}>Remember:</strong> Every task we perform is backed by our 1-Year Labor Guarantee. If something we touched fails within 12 months, we return and resolve it — no service call fee.
            </p>
          </div>

          <p className="mt-8 text-center text-xs" style={{ color: "oklch(60% 0.02 60)" }}>
            © {new Date().getFullYear()} Handy Pioneers LLC · 360° Method
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
