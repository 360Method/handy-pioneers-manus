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
 *  - "Starting at" language only, never "your payment is". We publish Hearth's
 *    floor, so most borrowers will be quoted more. The hedge is not optional.
 *  - Never advertise a rate below Hearth's published floor.
 *  - Every surface printing a payment must also render the matching disclosure
 *    (paymentExampleText for a single figure, HEARTH_PAYMENT_BASIS_TEXT for a
 *    group), carrying the down payment, the term, the APR labeled as APR, and
 *    the full APR/term ranges. Reg Z 12 CFR 1026.24(d): a stated payment or
 *    "$0 down" is a triggering term and obligates those on the same screen.
 *    Because we advertise the floor, the disclosed range is what keeps the
 *    claim honest. Removing it turns a legal ad into a deceptive one.
 *  - The on-page Hearth calculator shows 60 months at 10.49%, so it will quote
 *    HIGHER than our figure. Expected: the customer sees a shorter, cheaper
 *    option next to a longer, lower-payment one.
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
 * The disclosed representative example: Hearth's published best case for the
 * Excellent tier, presented as a floor rather than as a promise.
 *
 * Both figures come from Hearth's own rate card (Informational Flyer 10-23):
 * Excellent (850-741) is published at 7.99% to 19.07% APR over 2 to 12 years.
 * We advertise the bottom of both, which is why every surface says "starting
 * at" and why RANGE_TAIL discloses the full spread on the same screen. A real
 * borrower with excellent credit can reach this rate; most will land higher.
 *
 * KNOWN LIMITS OF THIS NUMBER, decided with eyes open (Marcin, 2026-07-22):
 *  - The 7.99% floor is from an October 2023 card. Our live widget returns
 *    10.49% for Excellent at 60 months today, so the floor may have moved.
 *  - The card does not tie its lowest APR to its longest term, but lenders
 *    normally price long terms higher, so 7.99% over 144 months is the most
 *    optimistic pairing the card permits.
 * Both are why the "starting at" framing and the disclosed range are load
 * bearing here, not decoration. Do not drop them.
 *
 * Re-verify quarterly, and confirm the current floor with the Hearth rep.
 */
export const HEARTH_EXAMPLE: HearthExample = {
  apr: 0.0799,
  termMonths: 144,
  principal: 12000,
  creditTier: "Excellent (741 to 850)",
  verifiedOn: "2026-07-22",
  source: "Hearth financing calculator, handypioneers.com/financing",
};

/**
 * Hearth's published APR and term spans, ACROSS ALL CREDIT TIERS, from their own
 * rate card (Hearth Informational Flyer 10-23):
 *   Excellent 850-741  7.99% to 19.07%   2 to 12 years
 *   Good      740-681  10.54% to 26.70%  2 to 12 years
 *   Average   680-661  16.85% to 34.83%  1 to 7 years
 *   Poor      660-550  20.50% to 36.99%  1 to 5 years
 *
 * These MUST span every tier, not just Excellent. We advertise the floor, so
 * disclosing a 19.07% ceiling (Excellent's max) while an average-credit borrower
 * can be quoted 34.83% understates the range in the deceptive direction, which
 * is precisely what Reg Z and the FTC care about. A brief window where the
 * disclosure read "7.99% to 19.07%" was a real defect; do not narrow these again.
 */
export const HEARTH_APR_RANGE = { low: 0.0799, high: 0.3699 } as const;
export const HEARTH_TERM_RANGE_YEARS = { low: 1, high: 12 } as const;

/**
 * Hearth's funded range. Outside it we show no payment at all, because a figure
 * on a loan they will not write is worse than no figure: the customer clicks
 * through and gets declined at the door.
 * Minimum confirmed by Marcin 2026-07-22; maximum from Hearth's rate card.
 */
export const HEARTH_MIN_LOAN = 1000;
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
 * when payments are switched off or the amount is outside Hearth's funded range
 * ($1,000 to $250,000), so callers fall back to the generic financing callout.
 * The low end matters in practice: the interior-repaint preset floors at $900 at
 * its smallest size, which Hearth will not finance.
 */
export function monthlyPaymentFrom(principal: number): number | null {
  if (!HEARTH_PAYMENTS_ENABLED) return null;
  if (!Number.isFinite(principal) || principal <= 0) return null;
  if (principal < HEARTH_MIN_LOAN || principal > HEARTH_MAX_LOAN) return null;
  return Math.ceil(amortize(principal, HEARTH_EXAMPLE.apr, HEARTH_EXAMPLE.termMonths));
}

function usd(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/** "7.99%" from 0.0799. Trims a trailing ".00". */
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
/** The credit-range and approval tail both disclosure variants share. */
const RANGE_TAIL =
  `APRs range from ${formatApr(HEARTH_APR_RANGE.low)} to ` +
  `${formatApr(HEARTH_APR_RANGE.high)} and terms from ` +
  `${HEARTH_TERM_RANGE_YEARS.low} to ${HEARTH_TERM_RANGE_YEARS.high} years ` +
  `depending on your credit. Subject to credit approval.`;

/**
 * The Reg Z line for ONE stated payment. Built from that payment's OWN amount,
 * so the example always matches the figure directly above it. A fixed example
 * (say, always $12,000) sitting under a $17,500 project reads as a mistake and
 * undermines the number it is supposed to support.
 *
 * Carries the three things Reg Z 12 CFR 1026.24(d) requires once a payment or
 * "$0 down" appears: the down payment, the terms of repayment, and the APR
 * labeled as APR. Everything else is kept short on purpose.
 */
export function paymentExampleText(principal: number): string | null {
  const payment = monthlyPaymentFrom(principal);
  if (payment === null) return null;
  const ex = HEARTH_EXAMPLE;
  return (
    `${usd(principal)} with $0 down at ${formatApr(ex.apr)} APR over ` +
    `${ex.termMonths} monthly payments is ${usd(payment)}/mo. ${RANGE_TAIL}`
  );
}

/**
 * The basis line for a GROUP of payments (a band grid, the finish-level table)
 * where no single principal applies. States the terms every figure was computed
 * on instead of picking one arbitrary example.
 */
export const HEARTH_PAYMENT_BASIS_TEXT =
  `Payments shown assume $0 down at ${formatApr(HEARTH_EXAMPLE.apr)} APR over ` +
  `${HEARTH_EXAMPLE.termMonths} monthly payments. ${RANGE_TAIL}`;

/** @deprecated Use paymentExampleText(amount) or HEARTH_PAYMENT_BASIS_TEXT. */
export const HEARTH_PAYMENT_EXAMPLE_TEXT = HEARTH_PAYMENT_BASIS_TEXT;

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
