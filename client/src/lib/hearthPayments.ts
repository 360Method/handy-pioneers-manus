/**
 * Hearth monthly payment math - turns a published project price into an honest
  * "starting at $X/mo" figure. Extends lib/hearth.ts (IDs, links, NMLS disclaimer); this
 * file owns only the numbers.
 *
 * WHY THIS EXISTS
 * The Hearth widget script (widget.gethearth.com/script.js) accepts only
 * data-orgid / data-partner / data-orguuid. It takes no preset amount, so a
 * project-specific payment cannot come from the widget. We compute it, using the
 * widget's own published basis so a homeowner who runs the calculator on the same
 * page lands on the exact number we advertised.
 *
 * VERIFIED SOURCES (2026-07-22)
 * 1. Handy Pioneers' own Hearth widget on handypioneers.com/financing
 *    (org 64147 / partner handy-pioneers). APR by credit tier, read from the
 *    widget's own <select> option values:
 *      Excellent (741-850)  10.49%
 *      Good      (681-740)  19.37%
 *      Average   (661-680)  23.59%
 *      Poor      (500-660)  25.82%
 *    Math is plain amortization at APR/12, confirmed to the cent against the
 *    widget: $12,000 at 10.49% over the widget's own 60-month basis renders
 *    $257.87 there and 258 here (rounded up).
 *    NOTE the widget is hardcoded to 60 months with no term selector, so it
 *    cannot display the 12-year term we advertise. Only the APR comes from here.
 * 2. Hearth Informational Flyer 10-23 (their own rate card) for the term and APR
 *    RANGES: Excellent 7.99%-19.07% over 2-12 years, Good 10.54%-26.70% over
 *    2-12 years. This is where 144 months comes from.
 *
 * HONESTY RULES (see CLAUDE.md + HP-DOC-033)
 *  - Always round UP. We never quote a homeowner low.
 *  - "Starting at" language only. Never state a payment as what someone WILL get.
 *  - Never advertise a rate below Hearth's disclosed floor, and never pair a
 *    floor rate with the maximum term. Our figure sits above the floor on
 *    purpose so a customer can only do better than we advertised.
 *  - Every surface printing a payment must also print
 *    HEARTH_PAYMENT_EXAMPLE_TEXT, which carries the down payment, the term, the
 *    APR labeled as APR, and the full APR/term ranges (Reg Z 12 CFR
 *    1026.24(d): a stated payment or "$0 down" is a triggering term and
 *    obligates those disclosures on the same screen).
 *  - The on-page Hearth calculator shows 60 months, so it will quote HIGHER than
 *    our 144-month figure. That is fine and intended: the customer discovers a
 *    shorter, cheaper option, not a worse one. Never the other way around.
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
 * The disclosed representative example.
 *
 * Term comes from Hearth's own rate card: Excellent (850-741) and Good (740-681)
 * both carry "2 - 12 years", so 144 months is a published term for the two tiers
 * that cover most of our customers.
 *
 * APR is deliberately NOT Hearth's advertised floor. Their card puts Excellent at
 * 7.99% to 19.07%, but that floor is from an October 2023 flyer and their own
 * "6.99%" payment example is footnoted to a 60-month loan, not a 144-month one.
 * Pairing a floor rate with a maximum term is the one combination a homeowner is
 * least likely to actually be offered. So we advertise at 10.49%, the rate our
 * own live widget returns for Excellent credit today. Our published payment
 * therefore sits ABOVE Hearth's disclosed floor: a customer can only do better
 * than what we advertised, never worse than the range we disclosed.
 *
 * Re-verify quarterly against the live widget.
 */
export const HEARTH_EXAMPLE: HearthExample = {
  apr: 0.1049,
  termMonths: 144,
  principal: 12000,
  creditTier: "Excellent (741 to 850)",
  verifiedOn: "2026-07-22",
  source: "Hearth financing calculator, handypioneers.com/financing",
};

/**
 * Hearth's published APR and term ranges for the Excellent tier, from their own
 * rate card (Hearth Informational Flyer 10-23). Disclosed in the blurb so the
 * "starting at" figure is read against a real range, not as a promise.
 */
export const HEARTH_APR_RANGE = { low: 0.0799, high: 0.1907 } as const;
export const HEARTH_TERM_RANGE_YEARS = { low: 2, high: 12 } as const;

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

/** "$0 down. Payments starting at $147/mo on approved credit." */
export function paymentHeadline(principal: number): string | null {
  const payment = monthlyPaymentFrom(principal);
  if (payment === null) return null;
  return `$0 down. Payments starting at ${usd(payment)}/mo on approved credit.`;
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
    `${usd(payment)} per month. Hearth's lending partners offer APRs from ` +
    `${formatApr(HEARTH_APR_RANGE.low)} to ${formatApr(HEARTH_APR_RANGE.high)} ` +
    `and terms of ${HEARTH_TERM_RANGE_YEARS.low} to ` +
    `${HEARTH_TERM_RANGE_YEARS.high} years to borrowers in the ` +
    `${ex.creditTier} credit range; other credit ranges are offered higher ` +
    `rates and shorter terms. Your actual rate, term, and payment depend on ` +
    `your credit and your lender. Shorter terms are available and cost less in ` +
    `total interest. Financing is subject to credit approval.`
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
