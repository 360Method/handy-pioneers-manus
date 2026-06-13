/**
 * Per-route page metadata - single source of truth.
 *
 * Two consumers:
 *   1. scripts/generate-static-pages.ts injects these values into the
 *      static HTML served to crawlers (most AI crawlers never run JS).
 *   2. Page components pass the same values to <SEO /> for runtime parity.
 *
 * Keep titles/descriptions outcome-first: lead with what the homeowner
 * gets (protected equity, nothing slips, peace of mind), not the process.
 *
 * Checkout, confirmation, offer, and funnel-step routes are deliberately
 * absent - they are never prerendered and never indexed.
 */

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article" | "product";
}

export const PAGE_META: PageMeta[] = [
  {
    path: "/",
    title:
      "Handy Pioneers - Remodeling & Restoration in Vancouver, WA & Clark County",
    description:
      "Licensed craftsmen handling whole-home remodels, deck & porch restoration, kitchen and bath builds across Vancouver WA, Camas, Washougal, Ridgefield, Battle Ground and La Center. 4.9 stars, one-year labor guarantee.",
  },
  {
    path: "/about",
    title: "About Handy Pioneers - Family-Owned Craftsmen in Vancouver, WA",
    description:
      "Marcin Micek and the Handy Pioneers team - licensed, insured, and family-owned. Serving Vancouver WA, Camas, Washougal, Ridgefield, Battle Ground and La Center since day one.",
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions | Handy Pioneers - Clark County, WA",
    description:
      "Answers to common questions from Vancouver WA and Clark County homeowners about pricing, scheduling, service areas, licensing, and the 360° Method.",
  },
  {
    path: "/reviews",
    title: "Customer Reviews - 4.9★ on Google | Handy Pioneers - Vancouver WA",
    description:
      "Read verified reviews from Clark County homeowners. Handy Pioneers holds a 4.9 star rating across 34+ Google reviews from Vancouver WA, Camas, and Battle Ground clients.",
  },
  {
    path: "/blog",
    title: "Notes from the Field - The Handy Pioneers Blog | Clark County, WA",
    description:
      "Project write-ups, Pacific Northwest homeowner guidance, and field notes from our craftsmen working across Vancouver WA, Camas, Washougal, and Battle Ground.",
  },
  {
    path: "/membership",
    title: "360° Method Membership for Clark County Homeowners | Handy Pioneers",
    description:
      "A seasonal whole-home care membership for Vancouver WA and Clark County homeowners who want their home monitored, documented, and kept in top condition - not patched up when something breaks.",
    ogType: "product",
  },
  {
    path: "/360-method",
    title: "The 360° Method - How We Care for Clark County Homes | Handy Pioneers",
    description:
      "Our end-to-end approach for Vancouver WA homeowners: documented baseline walkthrough, prioritized scope, and seasonal visits. Licensed restoration specialists serving all of Clark County.",
  },
  {
    path: "/360-method/walkthrough",
    title: "The 360° Baseline Walkthrough | Handy Pioneers - Clark County, WA",
    description:
      "A 2-3 hour documented assessment of your home's major systems, delivered as a written report with a prioritized NOW / SOON / WAIT roadmap within 48 hours.",
  },
  {
    path: "/360-method/referral",
    title: "360° Inspector Referral | Handy Pioneers",
    description:
      "Home inspectors in Clark County WA: refer your clients to the 360° Method and keep a long-term relationship with the homes you inspect.",
  },
  {
    path: "/roadmap-generator",
    title:
      "360° Roadmap Generator - Turn Your Inspection Report into a Plan | Handy Pioneers",
    description:
      "See a real sample, then upload your Clark County WA inspection report. You get a prioritized NOW / SOON / WAIT roadmap with investment ranges within 24 hours. Free.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Handy Pioneers",
    description:
      "How Handy Pioneers collects, uses, and protects information from our Clark County WA clients.",
  },
  {
    path: "/terms-and-conditions",
    title: "Terms & Conditions | Handy Pioneers",
    description:
      "Handy Pioneers' terms of service, SMS/communications policy, and site usage terms.",
  },
];

export function metaForPath(path: string): PageMeta | undefined {
  return PAGE_META.find((m) => m.path === path);
}
