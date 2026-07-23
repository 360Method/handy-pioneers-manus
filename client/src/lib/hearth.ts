/**
 * Hearth financing - single source of truth for the partner IDs, links, value
 * props, and the required disclosure. Handy Pioneers partnered with Hearth so
 * homeowners can see monthly payment options on a project without a hard credit
 * pull. Hearth is a broker, NOT a lender, and Handy Pioneers is neither - every
 * placement that shows a payment or rate must render HEARTH_DISCLAIMER nearby.
 *
 * Honest-messaging rule (see CLAUDE.md + /financing guardrails):
 *  - Never advertise flat "0% financing," "0% off," or a bare "0% APR." Hearth's
 *    0% offers are INTRODUCTORY rates on third-party credit cards (typically up
 *    to 21 months), after which the card's standard APR applies to any remaining
 *    balance. Hearth cannot confirm whether a given issuer defers interest; they
 *    point to the cardholder agreement. So any 0% mention must say
 *    "introductory", say it ends, and say terms vary by issuing bank
 *    (Reg Z 1026.16(d)). Lead with "monthly payment options" instead.
 *  - No cost / markup / margin math. This is convenience financing, not a price.
 *
 * The org id and partner slug are already exposed in the on-page Hearth widget,
 * so they are public config, not secrets - hardcoded here, no .env needed.
 * Flip HEARTH_ENABLED to false to hide every financing surface at once.
 */

export const HEARTH_ENABLED = true;

export const HEARTH_ORG_ID = "64147";
export const HEARTH_PARTNER = "handy-pioneers";
export const HEARTH_AGENT = "marcin";

/** Primary "Apply now" destination (starts an application). */
export const HEARTH_APPLY_URL =
  "https://app.gethearth.com/partners/handy-pioneers/marcin/apply";
/** "See options / prequalify" landing (soft check, no score impact). */
export const HEARTH_PREQUAL_URL =
  "https://app.gethearth.com/partners/handy-pioneers/marcin";
/** The embeddable calculator widget script. */
export const HEARTH_WIDGET_SRC = "https://widget.gethearth.com/script.js";

/** Value props for the financing sections. Kept honest and non-price. */
export const HEARTH_BULLETS: string[] = [
  "Loan amounts up to $250,000",
  "Affordable monthly payment options",
  "0% introductory APR offers from partner credit cards, on approved credit",
  "See your options in minutes with no impact to your credit score",
  "Funding in as little as 1-3 days",
  "No prepayment penalties",
  "No home equity required",
];

/** Short lead line for the every-page strip and hero. */
export const HEARTH_TAGLINE =
  "See monthly payment options in minutes - no impact to your credit score.";

/**
 * Required broker/NMLS disclosure. Render this on the same screen as any monthly
 * payment or APR claim (Reg Z reasonable-person rule - no scrolling to find it).
 */
export const HEARTH_DISCLAIMER =
  "Handy Pioneers is not a lender. Financing is provided through our lending " +
  "partner, Hearth. Hearth is a technology company, which is licensed as a " +
  "broker as may be required by state law. Hearth does not accept applications " +
  "for credit, does not make loans, and does not make credit decisions. All " +
  "APRs, intro rates, terms, interest rates, amounts and fees are provided by " +
  "Hearth's lending partners. Payment options are on approved credit. NMLS ID #1628533.";
