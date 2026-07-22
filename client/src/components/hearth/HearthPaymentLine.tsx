/**
 * The "$0 down. Payments starting at $147/mo." line that sits directly under a
 * published price. This is the whole point of the Hearth partnership: a homeowner
 * reading "$12,000 to $35,000+" does the payment math in their head and gets it
 * wrong. We do it for them, honestly.
 *
 * Reg Z (12 CFR 1026.24(d)): "$0 down" and a stated payment are both triggering
 * terms, so the example sentence carrying the term and the APR is not optional
 * and is not collapsible. It renders inline, every time, on the same screen.
 *
 * The NMLS/broker disclosure (HearthDisclaimer) is separate and already present
 * once per page on every surface that uses this component, so it is opt-in here
 * via `showDisclaimer` rather than duplicated by default.
 *
 * Renders nothing when financing is off, payments are off, or the amount falls
 * outside what Hearth funds. Callers can fall back to <HearthCallout /> then.
 */
import HearthCTA from "@/components/hearth/HearthCTA";
import HearthDisclaimer from "@/components/hearth/HearthDisclaimer";
import { HEARTH_ENABLED } from "@/lib/hearth";
import {
  HEARTH_PAYMENTS_ENABLED,
  HEARTH_PAYMENT_BASIS_TEXT,
  monthlyPaymentFrom,
  paymentExampleText,
  paymentHeadline,
} from "@/lib/hearthPayments";

const GREEN = "oklch(0.22 0.07 160)";
const GOLD = "oklch(0.65 0.14 65)";
const MUTED = "oklch(0.50 0.02 160)";

/**
 * The Reg Z payment example on its own. Use directly when a group of payment
 * lines shares one disclosure (e.g. the band grid on /remodel-cost), so the term
 * and APR appear once per screen instead of once per card.
 */
export function HearthPaymentExample({
  amount,
  className = "",
}: {
  /**
   * The amount this disclosure belongs to. Pass it whenever ONE payment is being
   * stated, so the example matches that figure. Omit only for a group of
   * payments (a band grid, the finish-level table), where the shared basis line
   * renders instead.
   */
  amount?: number;
  className?: string;
}) {
  if (!HEARTH_ENABLED || !HEARTH_PAYMENTS_ENABLED) return null;

  const text =
    amount === undefined
      ? HEARTH_PAYMENT_BASIS_TEXT
      : paymentExampleText(amount);
  if (!text) return null;

  return (
    <p
      className={`text-xs leading-relaxed ${className}`}
      style={{ color: MUTED, fontFamily: "'Source Sans 3', sans-serif" }}
    >
      {text}
    </p>
  );
}

export default function HearthPaymentLine({
  amount,
  location,
  size = "default",
  showCta = true,
  showExample = true,
  showDisclaimer = false,
  className = "",
}: {
  /** The project amount to quote a payment on, in dollars. */
  amount: number;
  /** Analytics label for which placement this is. */
  location: string;
  /** "compact" for dense spots like a band card in a grid. */
  size?: "default" | "compact";
  showCta?: boolean;
  /**
   * Set false ONLY when several payment lines sit together in one group and a
   * single <HearthPaymentExample /> renders directly below them. Reg Z wants the
   * term and APR on the same screen as the claim, not on every card.
   */
  showExample?: boolean;
  showDisclaimer?: boolean;
  className?: string;
}) {
  if (!HEARTH_ENABLED) return null;

  const payment = monthlyPaymentFrom(amount);
  const headline = paymentHeadline(amount);
  if (payment === null || headline === null) return null;

  const compact = size === "compact";

  return (
    <div className={className}>
      <p
        className={`${compact ? "text-sm" : "text-base md:text-lg"} font-bold leading-snug`}
        style={{ color: GREEN, fontFamily: "'Source Sans 3', sans-serif" }}
      >
        <span style={{ color: GOLD }}>$0 down.</span>{" "}
        {headline.replace("$0 down. ", "")}
      </p>

      {/* Reg Z: term + APR travel with the payment. Never hide or collapse this. */}
      {showExample && <HearthPaymentExample amount={amount} className="mt-1" />}

      {showCta && (
        <HearthCTA
          variant="prequal"
          style="link"
          location={location}
          className={`mt-2 ${compact ? "text-sm" : ""}`}
        >
          <span style={{ color: GOLD }}>
            See my payment options, no credit impact &rarr;
          </span>
        </HearthCTA>
      )}

      {showDisclaimer && <HearthDisclaimer className="mt-3" />}
    </div>
  );
}
