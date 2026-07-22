/**
 * Hearth monthly payment math - turns a published project price into an honest
 * "from $X/mo" figure. Extends lib/hearth.ts (IDs, links, NMLS disclaimer); this
 * file owns only the numbers.
 *
 * WHY THIS EXISTS
 * The Hearth widget script (widget.gethearth.com/script.js) accepts only
 * data-orgid / data-partner / data-orguuid. It takes no preset amount, so a
 * project-specific payment cannot come from the widget. We compute it, using the
 * widget's own published basis so a homeowner who runs the calculator on the same
 * page lands on the exact number we advertised.
 *
 * VERIFIED SOURCE (2026-07-22, Handy Pioneers' own Hearth widget on
 * handypioneers.com/financing, org 64147 / partner handy-pioneers):
 *  - Term is hardcoded to 60 months. The widget offers no term selector, and the
 *    script literal is `60`. It is NOT a 12-year product.
 *  - APR by credit tier, read from the widget's own <select> option values:
 *      Excellent (741-850)  10.49%
 *      Good      (681-740)  19.37%
 *      Average   (661-680)  23.59%
 *      Poor      (500-660)  25.82%
 *  - Math is plain amortization at APR/12 over 60 payments. Confirmed to the
 *    cent: $12,000 at 10.49% renders $257.87/mo in the widget, and
 *    monthlyPaymentFrom(12000) returns 258 (ceil of 257.868).
 *
 * HONESTY RULES (see CLAUDE.md + HP-DOC-027)
 *  - Never advertise a payment we cannot reproduce in the on-page calculator.
 *  - Always round UP. We never quote a homeowner low.
 *  - "From $X/mo" uses the Excellent tier because that is the widget's default
 *    and its disclosed basis. Every surface that prints it must also print
 *    HEARTH_PAYMENT_EXAMPLE_TEXT so the term and the APR travel with the number
 *    (Reg Z 12 CFR 1026.24(d): a stated payment or "$0 down" is a triggering
 *    term and obligates the APR and the repayment terms on the same screen).
 *
 * If Hearth confirms longer terms on our lender panel, change HEARTH_EXAMPLE
 * below and every figure on the site follows. Nothing else needs to move.
 */

/**
 * Kill switch for the dollar figures only. Turning this off strips every
 * payment number and example while leaving the calculator, the callouts, and the
 * apply links in place. Independent of HEARTH_ENABLED, which kills all of it.
 */
export const HEARTH_PAYMENTS_ENABLED = true;

export interface HearthExample {
  /** Annual percentage rate as a decimal, e.g. 0.1049 for 10.49%. */
  apr: number;
  termMonths: number;
  /** The principal used in the printed example sentence. */
  principal: number;
  /** Credit tier the APR belongs to, named the way Hearth names it. */
  creditTier: string;
  /** ISO date the figures were last read off the live widget. */
  verifiedOn: string;
  source: string;
}

/**
 * The disclosed representative example. Read off the live widget, not from
 * Hearth's marketing pages. Re-verify quarterly.
 */
export const HEARTH_EXAMPLE: HearthExample = {
  apr: 0.1049,
  termMonths: 60,
  principal: 12000,
  creditTier: "Excellent (741 to 850)",
  verifiedOn: "2026-07-22",
  source: "Hearth financing calculator, handypioneers.com/financing",
};

/** Hearth's stated maximum loan amount. Above this we show no payment. */
export const HEARTH_MAX_LOAN = 250000;

/** Re-verify the example after this many days. */
export const STALE_AFTER_DAYS = 90;

/**
 * Standard amortization: p * r / (1 - (1 + r)^-n), where r is the monthly rate.
 * Matches the widget to the cent before rounding.
 */
function amortize(principal: number, apr: number, termMonths: number): number {
  if (principal <= 0) return 0;
  const r = apr / 12;
  if (r === 0) return principal / termMonths;
  return (principal * r) / (1 - Math.pow(1 + r, -termMonths));
}

/**
 * The advertised "from $X/mo" for a project amount, rounded UP to the next whole
 * dollar so the real payment is never higher than what we printed. Returns null
 * when payments are switched off or the amount is outside what Hearth funds, so
 * callers can fall back to the generic financing callout.
 */
export function monthlyPaymentFrom(principal: number): number | null {
  if (!HEARTH_PAYMENTS_ENABLED) return null;
  if (!Number.isFinite(principal) || principal <= 0) return null;
  if (principal > HEARTH_MAX_LOAN) return null;
  return Math.ceil(amortize(principal, HEARTH_EXAMPLE.apr, HEARTH_EXAMPLE.termMonths));
}

function usd(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/** "10.49%" from 0.1049. Trims a trailing ".00". */
export function formatApr(apr: number): string {
  const pct = (apr * 100).toFixed(2).replace(/\.00$/, "");
  return `${pct}%`;
}

/** "$0 down. From $258/mo on approved credit." */
export function paymentHeadline(principal: number): string | null {
  const payment = monthlyPaymentFrom(principal);
  if (payment === null) return null;
  return `$0 down. From ${usd(payment)}/mo on approved credit.`;
}

/**
 * The Reg Z sentence. Carries the down payment, the repayment terms, and the APR
 * labeled as APR. Must render on the same screen as any payment figure, without
 * the reader having to scroll to find it.
 */
export const HEARTH_PAYMENT_EXAMPLE_TEXT = (() => {
  const ex = HEARTH_EXAMPLE;
  const payment = Math.ceil(amortize(ex.principal, ex.apr, ex.termMonths));
  return (
    `Payment example: ${usd(ex.principal)} financed with $0 down at ` +
    `${formatApr(ex.apr)} APR over ${ex.termMonths} monthly payments is ` +
    `${usd(payment)} per month. Based on a ${ex.creditTier} credit range. ` +
    `Your rate, term, and payment depend on your credit and the lender, and ` +
    `may be higher. Financing is subject to credit approval.`
  );
})();

/** Short version for tight spots like an SMS or a staff card. */
export const HEARTH_PAYMENT_EXAMPLE_SHORT = `Example: ${usd(
  HEARTH_EXAMPLE.principal,
)} at ${formatApr(HEARTH_EXAMPLE.apr)} APR over ${
  HEARTH_EXAMPLE.termMonths
} months is ${usd(
  Math.ceil(amortize(HEARTH_EXAMPLE.principal, HEARTH_EXAMPLE.apr, HEARTH_EXAMPLE.termMonths)),
)}/mo. On approved credit; your rate and term may differ.`;

/** True once the verified figures are older than STALE_AFTER_DAYS. */
export function isExampleStale(now: Date = new Date()): boolean {
  const verified = new Date(HEARTH_EXAMPLE.verifiedOn + "T00:00:00Z");
  const days = (now.getTime() - verified.getTime()) / 86400000;
  return days > STALE_AFTER_DAYS;
}

// Dev-only nudge so the numbers cannot rot silently in production copy.
if (import.meta.env?.DEV && isExampleStale()) {
  // eslint-disable-next-line no-console
  console.warn(
    `[hearth] Payment example was verified ${HEARTH_EXAMPLE.verifiedOn}, more than ` +
      `${STALE_AFTER_DAYS} days ago. Re-read the live calculator and update HEARTH_EXAMPLE.`,
  );
}
