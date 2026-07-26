/**
 * brand.ts - single source of truth for who Handy Pioneers is.
 *
 * The "what is this company" paragraph used to be hand-typed in five places
 * (index.html, pageMeta.ts, Home.tsx, the LocalBusiness JSON-LD, and the
 * llms.txt header). They drifted. This file is the one place to edit it.
 *
 * Consumers:
 *   - scripts/generate-static-pages.ts  LocalBusiness JSON-LD + llms.txt/llms-full.txt
 *   - client/src/lib/pageMeta.ts        homepage meta description
 *   - client/index.html                 static shell (cannot import; keep in sync by hand)
 *
 * The written standard behind this file is HP-DOC-035 in the OS repo
 * (businesses/Handy Pioneers/04_Marketing/). Supporting demand research and
 * the data behind the pillars is HP-DOC-029. Edit the standard first, then
 * this file, then let it propagate.
 *
 * THE POSITIONING, in one line: Handy Pioneers is a proactive home service and
 * remodel company. The product is the 360° Method (a framework, a documented
 * record, and a partnership). It is not hourly handyman labor.
 *
 * On the word "handyman": it is the highest-volume local search term and we
 * deliberately still compete for it, but only on CAPTURE surfaces where someone
 * is already searching for a task: /services, the commercial-handyman service
 * page, city pages, and specific blog posts. It never appears on ENTITY
 * surfaces (this file, the homepage, the LocalBusiness schema, llms.txt), which
 * are what answer "what is this company" for search snippets and AI assistants.
 * Capture on the task, describe the company on the entity. See HP-DOC-035.
 */

/** ~155 chars. Meta descriptions, where Google truncates around 160. */
export const ENTITY_DESCRIPTION_SHORT =
  "Handy Pioneers is a proactive home service and remodel company in Vancouver WA. Repairs, remodels, and year-round care on the 360° Method. Licensed, insured.";

/**
 * The canonical paragraph. LocalBusiness JSON-LD, llms.txt, and every off-site
 * directory profile (Google Business Profile, BBB, Yelp) use this text.
 */
export const ENTITY_DESCRIPTION =
  "Handy Pioneers is a proactive home service and remodel company serving Vancouver, Washington and all of Clark County. Homeowners hire us for the 360° Method: we assess every system in the home, document its condition, and work a prioritized NOW / SOON / WAIT plan so problems get handled before they get expensive. Repairs, remodels, and seasonal upkeep all run through one accountable team that carries the record of your home. Priced by the project, never by the hour.";

/** Nav, social bios, email signatures, the proposal document footer. */
export const ONE_LINER =
  "One team that knows your home. Repairs, remodels, and year-round care, run on the 360° Method.";

/**
 * The three proof pillars, in the order they should always be used. Lead with
 * the relationship, make it concrete, then justify it. Cost math never leads.
 * The supporting survey data lives in HP-DOC-029 section 5.
 */
export const PILLARS = [
  {
    title: "The dedicated partner",
    body: "One team that knows your home. One point of contact, owner-led assessments, and a crew that carries the memory of the property instead of starting cold every visit.",
  },
  {
    title: "Off your plate, made concrete",
    body: "Named seasonal visits, a checklist built for your specific home, and a written record after every visit. You stop running a vendor roster.",
  },
  {
    title: "Stay ahead",
    body: "Small problems get caught while they are still small. The plan tells you what needs doing now, what can wait, and what to budget for, before anything becomes urgent.",
  },
] as const;

/**
 * Vocabulary rules. Documentation, not enforcement: no build step reads this.
 * Full table with the reasoning is in HP-DOC-035.
 */
export const NEVER_SAY = [
  ["handyman (on entity and affluent-facing surfaces)", "home service and remodel company, home care"],
  ["hourly, per hour, hourly rate", "priced by the project"],
  ["free, complimentary, no cost", "included"],
  ["cheap, affordable, budget, discount", "(nothing: compete on the record, not on price)"],
  ["one-and-done, on-call, as-needed", "proactive, on the plan, ahead of it"],
  ["subcontractor, sub, our subs", "vetted crew of skilled tradesmen, licensed specialists"],
] as const;
