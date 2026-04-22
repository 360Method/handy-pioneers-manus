import type { TierData, BillingCadence, MemberTier } from "@/lib/tiers";
import { getPrice, getSavingsVsMonthly } from "@/lib/tiers";

interface Props {
  tier: TierData;
  cadence: BillingCadence;
  onEnroll: (tier: MemberTier, cadence: BillingCadence) => void;
}

export default function TierCard({ tier, cadence, onEnroll }: Props) {
  const price = getPrice(tier, cadence);
  const savings = getSavingsVsMonthly(tier, cadence);

  return (
    <div
      className="relative rounded-lg border-2 p-6 flex flex-col bg-white transition-shadow hover:shadow-lg"
      style={{
        borderColor: tier.popular ? "oklch(22% 0.07 155)" : "oklch(85% 0.02 80)",
        transform: tier.popular ? "scale(1.02)" : undefined,
      }}
    >
      {tier.popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
          style={{ background: "oklch(22% 0.07 155)" }}
        >
          Most Popular
        </div>
      )}

      <div
        className="inline-flex self-start px-3 py-1 rounded-full text-xs font-bold mb-4"
        style={{
          background: tier.popular ? "oklch(22% 0.07 155 / 0.1)" : "oklch(65% 0.15 72 / 0.12)",
          color: tier.popular ? "oklch(22% 0.07 155)" : "oklch(55% 0.14 68)",
        }}
      >
        {tier.name}
      </div>

      <div className="mb-1">
        <span
          className="text-4xl font-black font-display"
          style={{ color: "oklch(22% 0.07 155)" }}
        >
          $
          {cadence === "annual"
            ? tier.annualMonthly
            : cadence === "quarterly"
            ? Math.round((price * 4) / 12)
            : price}
        </span>
        <span className="text-sm ml-1" style={{ color: "oklch(50% 0.02 60)" }}>
          /mo
        </span>
      </div>
      {cadence !== "monthly" && (
        <div className="text-xs mb-1" style={{ color: "oklch(50% 0.02 60)" }}>
          billed ${price}/{cadence === "quarterly" ? "qtr" : "yr"}
        </div>
      )}
      {savings > 0 && (
        <div
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded mb-3"
          style={{
            background: "oklch(40% 0.12 145 / 0.1)",
            border: "1px solid oklch(40% 0.12 145 / 0.25)",
          }}
        >
          <span className="text-xs font-bold" style={{ color: "oklch(35% 0.12 145)" }}>
            Save ${savings}/yr · {cadence === "quarterly" ? "5" : "17"}% off
          </span>
        </div>
      )}

      <p className="text-sm mb-4 leading-relaxed" style={{ color: "oklch(50% 0.02 60)" }}>
        {tier.tagline}
      </p>

      <div
        className="text-xs font-semibold mb-3 inline-flex items-center gap-1 px-2 py-1 rounded self-start"
        style={{ background: "oklch(22% 0.07 155 / 0.07)", color: "oklch(22% 0.07 155)" }}
      >
        📅 {tier.visits} visit{tier.visits > 1 ? "s" : ""}/yr — {tier.visitDescription}
      </div>
      {tier.laborBankDollars > 0 && (
        <div
          className="rounded-md px-3 py-2 mb-4 text-sm"
          style={{
            background: cadence === "monthly" ? "oklch(94% 0.01 60)" : "oklch(65% 0.15 72 / 0.08)",
            border: `1px solid ${
              cadence === "monthly" ? "oklch(80% 0.02 60)" : "oklch(65% 0.15 72 / 0.25)"
            }`,
          }}
        >
          {cadence === "monthly" ? (
            <>
              <span className="font-bold" style={{ color: "oklch(50% 0.02 60)" }}>
                ⏳ Labor bank credit — accrues after 90 days on Monthly
              </span>
              <span style={{ color: "oklch(50% 0.02 60)" }}>
                {" "}— ${tier.laborBankDollars} becomes available after your first 90 days. Switch
                to Quarterly or Annual to unlock the full credit on day one.
              </span>
            </>
          ) : (
            <>
              <span className="font-bold" style={{ color: "oklch(55% 0.14 68)" }}>
                ✅ ${tier.laborBankDollars} labor bank credit — full credit, day one
              </span>
              <span style={{ color: "oklch(35% 0.03 255)" }}>
                {" "}— pre-paid labor for any in-between visit task (leaky faucet, stuck door,
                fixture swap). Use-it-or-lose-it annually.
              </span>
            </>
          )}
        </div>
      )}

      <ul className="space-y-2 mb-6 flex-1">
        {tier.features.map((feature, fi) => (
          <li
            key={fi}
            className="flex items-start gap-2 text-sm"
            style={{ color: "oklch(35% 0.03 255)" }}
          >
            <span style={{ color: "oklch(65% 0.15 72)" }} className="mt-0.5 flex-shrink-0">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mb-5">
        <div
          className="text-xs font-bold uppercase tracking-wide mb-2"
          style={{ color: "oklch(60% 0.02 60)" }}
        >
          Member Rates on Out-of-Scope Work
        </div>
        <div className="space-y-1 mb-2">
          {tier.discountBrackets.map((b, bi) => (
            <div key={bi} className="flex justify-between text-xs">
              <span style={{ color: "oklch(50% 0.02 60)" }}>{b.label}</span>
              <span className="font-bold" style={{ color: "oklch(22% 0.07 155)" }}>
                {b.pct}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs leading-snug" style={{ color: "oklch(55% 0.02 60)" }}>
          Larger jobs already include negotiated vetted-tradesman pricing — your total cost is
          lower either way.
        </p>
      </div>

      <button
        onClick={() => onEnroll(tier.id, cadence)}
        className="w-full py-3 rounded-md font-bold text-sm uppercase tracking-wide transition-all text-white"
        style={{
          background: tier.popular ? "oklch(22% 0.07 155)" : "oklch(65% 0.15 72)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = tier.popular
            ? "oklch(30% 0.08 155)"
            : "oklch(55% 0.14 68)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = tier.popular
            ? "oklch(22% 0.07 155)"
            : "oklch(65% 0.15 72)";
        }}
      >
        Enroll — ${price}/{cadence === "monthly" ? "mo" : cadence === "quarterly" ? "qtr" : "yr"}
      </button>
      <p className="text-center text-xs mt-2" style={{ color: "oklch(60% 0.02 60)" }}>
        You'll confirm your address, select billing frequency, and get your first visit scheduled
        within 48 hours.
      </p>
    </div>
  );
}
