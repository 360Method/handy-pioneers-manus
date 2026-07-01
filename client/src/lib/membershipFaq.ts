/**
 * membershipFaq.ts - single source of truth for the /membership FAQ.
 *
 * Two consumers:
 *   1. Membership.tsx renders it as the on-page accordion.
 *   2. scripts/generate-static-pages.ts emits it as static HTML + FAQPage
 *      JSON-LD so crawlers and AI assistants can read the membership story.
 */

export interface MembershipFaq {
  q: string;
  a: string;
}

export const MEMBERSHIP_FAQS: MembershipFaq[] = [
  {
    q: "What happens when a visit identifies something that needs a larger scope of work?",
    a: "Your technician documents the finding with photos and generates a prioritized written scope on the spot - linked directly to your membership record. You receive a clear scope, a member rate, and can authorize the work in one step. No separate sales call, no sourcing a contractor, no waiting for a quote.",
  },
  {
    q: "How does the labor bank work?",
    a: "Labor bank credit is included in Quarterly and Annual memberships. Your credit is loaded at the end of your first billing period and renews annually. Apply it to any in-between visit task - a fixture swap, a door adjustment, a caulk renewal. Your technician logs time on-site and the system records the draw automatically. Credits do not carry over year-to-year, which keeps the membership priced accurately. Monthly memberships include all visits and member rates but do not include a labor bank.",
  },
  {
    q: "What does the baseline walkthrough cover?",
    a: "The baseline is a 2-3 hour documented whole-home assessment - roof, foundation, exterior envelope, interior systems, plumbing, electrical panels, HVAC, crawl space, and attic. You receive a written report with photos, a condition rating for each system, a prioritized findings list, and a written scope of work. This report is stored permanently in your member account and is shareable with your agent, lender, or insurer.",
  },
  {
    q: "Is there a contract or minimum commitment?",
    a: "No contract. Monthly and quarterly memberships cancel at the end of the current billing period. Annual memberships can be cancelled with a prorated refund for unused months, net of any labor bank credits already applied. We expect to earn your renewal - not enforce it.",
  },
  {
    q: "Is this available outside Clark County, Washington?",
    a: "Currently the 360° Method is delivered in Clark County, Washington - Vancouver, Camas, Battle Ground, Ridgefield, Washougal, La Center, and surrounding communities. We are expanding regionally - join the waitlist for your area at the bottom of this page.",
  },
  {
    q: "How do member rates apply to work beyond the scheduled visits?",
    a: "Member rates apply to all out-of-scope work billed separately - scopes that go beyond what your labor bank covers. On a larger scope, your labor bank credit applies first; member rates apply to any remaining balance. You are never billed at standard retail on either category.",
  },
  {
    q: "Does the member rate change with the size of the job?",
    a: "Yes, and it works in your favor. The bigger the project, the deeper your member rate - we reward bundling work together rather than spreading it out. Essential members save 2.5% on jobs under $5,000, 5% from $5,000 to $20,000, and 7% above $20,000. Full Coverage saves 4.5% / 8% / 11%. Maximum saves 7% / 12% / 15%. Your rate applies automatically and stacks with any labor bank credit.",
  },
  {
    q: "Is this a licensed home inspection?",
    a: "No - and that distinction actually works in your favor. The 360° Method is a proactive maintenance service, not a licensed home inspection. Think of it as what happens after the inspection: a licensed inspector tells you what is wrong at a point in time, and we take it from there - completing the recommended work, maintaining the home season after season, and documenting every visit so your home's condition is always on record. If you have recently had a home inspection, your inspection report is the ideal starting point for your 360° baseline. We work in tandem with home inspectors, not in place of them. Our documentation does not replace a licensed inspector, structural engineer, or specialist for major assessments, and we are not liable for pre-existing conditions not visible or accessible during a visit. Full scope is in our Terms & Conditions.",
  },
];
