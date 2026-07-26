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
 * Entity vs capture: the homepage describes the COMPANY and pulls its
 * description from brand.ts. Task pages (/services, city pages) are CAPTURE
 * surfaces and may lead with the search term someone actually typed, including
 * "handyman". See brand.ts and HP-DOC-035 for where that line sits.
 *
 * Checkout, confirmation, offer, and funnel-step routes are deliberately
 * absent - they are never prerendered and never indexed.
 */

import { ENTITY_DESCRIPTION_SHORT } from "./brand";

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
      "Handy Pioneers - Proactive Home Care, Maintenance & Restoration in Vancouver, WA",
    // Entity surface: the description comes from brand.ts, never a search term.
    description: ENTITY_DESCRIPTION_SHORT,
  },
  {
    path: "/about",
    title: "About Handy Pioneers - Proactive Home Care in Vancouver, WA",
    description:
      "Why Handy Pioneers works on a documented plan instead of one-off calls, and the standard Marcin Micek holds every project to. Licensed and insured.",
  },
  {
    path: "/services",
    title: "Handyman & Home Improvement Services in Vancouver, WA | Handy Pioneers",
    description:
      "Handyman and home improvement for Vancouver WA and Clark County: remodeling, deck and rot repair, painting, flooring, gutters, and proactive maintenance.",
  },
  {
    path: "/service-areas",
    title: "Service Areas - Clark County, WA | Handy Pioneers",
    description:
      "Handy Pioneers serves all of Clark County, WA: Vancouver, Camas, Washougal, Ridgefield, Battle Ground, La Center, and more. Portland metro coming soon.",
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
      "Verified reviews from Clark County homeowners: Handy Pioneers holds a 4.9 star rating on 34+ Google reviews from Vancouver WA, Camas, and Battle Ground.",
  },
  {
    path: "/blog",
    title: "Notes from the Field - The Handy Pioneers Blog | Clark County, WA",
    description:
      "Project write-ups, Pacific Northwest homeowner guidance, and field notes from our craftsmen across Vancouver WA, Camas, and Battle Ground.",
  },
  {
    path: "/membership",
    title: "360° Method Membership for Clark County Homeowners | Handy Pioneers",
    description:
      "The 360° Method membership keeps Vancouver WA and Clark County homes maintained, documented, and ahead of problems, so nothing slips. Plans from $59/mo.",
    ogType: "product",
  },
  {
    path: "/360-method",
    title: "The 360° Method - Proactive Home Care for Clark County Homes | Handy Pioneers",
    description:
      "The 360° Method keeps Vancouver WA homes documented, maintained, and holding value: a baseline record, a prioritized plan, and seasonal care.",
  },
  // /360-method/walkthrough is a permanent redirect to /membership (see
  // server/index.ts) and is deliberately absent here.
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
      "Upload your Clark County WA inspection report for a prioritized NOW / SOON / WAIT roadmap with investment ranges within 24 hours. See a real sample first.",
  },
  {
    path: "/financing",
    title: "How to Pay for a Home Project: Equity, HELOCs & Cash | Handy Pioneers",
    description:
      "A plain-English guide to funding a Clark County, WA home project: home equity, HELOCs, loans, and cash, and how to decide. Your guide, not your lender.",
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
  {
    path: "/guarantee",
    title: "Our Labor Guarantee | Handy Pioneers - Vancouver, WA",
    description:
      "What the Handy Pioneers 1-year labor guarantee covers, and how we handle hidden problems found once a project is open. Honest, in writing, no surprises.",
  },
  {
    path: "/contact",
    title: "Contact Us - Request a Consultation | Handy Pioneers - Vancouver, WA",
    description:
      "Request a consultation with Handy Pioneers. Share a few details and we'll reach out within one business day. Serving Vancouver WA and Clark County.",
  },
];

export function metaForPath(path: string): PageMeta | undefined {
  return PAGE_META.find((m) => m.path === path);
}
