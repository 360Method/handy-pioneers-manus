/**
 * methodSteps.ts - the nine 360 Method step pages (/360-method/<key>).
 *
 * The canon (names, order, the nine sentences, phase tones) lives in
 * methodCanon.ts and is copied from the pro app; it is never extended here,
 * because check-site-assets.mjs compares canon.json with pro every four hours.
 * Everything a step PAGE needs beyond the canon (SEO, the gap, the teaching,
 * how the membership delivers it, FAQ) lives in this file, keyed by the canon
 * step key and joined at render time.
 *
 * publishDate gates the route, the sitemap, the prerender and prev/next, the
 * same way blog posts drip. Records start with a line containing only `  {`
 * so scripts/generate-sitemap.mjs and scripts/check-due-today.mjs can read
 * publishDate with the blog regex and no TypeScript.
 *
 * Copy rules (checked by scripts/check-copy.mjs at build): no em or en
 * dashes; never free, cheap, discount, deal, handyman, hourly, subcontractor
 * or one-and-done; tier names Essential, Full Coverage, Maximum Protection
 * only; no dollar figures; no invented statistics. Step 9 carries the
 * education line. Teach, do not gatekeep: every page tells a homeowner how to
 * do the step alone, then how Handy Pioneers does it inside the Proactive Path.
 */
import { METHOD_CANON } from "./methodCanon";
import type { RoadmapPhase, RoadmapStep } from "../components/method/ThreeSixtyRoadmap";
import { METHOD_STEP_OG, METHOD_STEP_PANEL, type MethodPhaseKey, type MethodStepKey } from "./assets";

export type StepCta = "baseline" | "roadmap" | "consultation";

export interface MethodStepPage {
  key: MethodStepKey;
  /** YYYY-MM-DD. The page is unreachable, unlisted and unlinked before this day. */
  publishDate: string;
  seoTitle: string;
  seoDesc: string;
  h1: string;
  /** Search phrases the page answers. Also the Article keywords. */
  targetQueries: string[];
  panelAlt: string;
  gap: {
    nowTitle: string;
    now: string[];
    couldTitle: string;
    could: string[];
  };
  /** The step itself, business-agnostic. 2 to 4 paragraphs. */
  whatItIs: string[];
  /** Ordered. Feeds the HowTo block. */
  diySteps: string[];
  delivery: {
    customerLabel: string;
    cadence: string;
    included: string[];
    /** Plain sentence naming the plans, from TIERS names, never prices. */
    plans: string;
    yearTwoPlus?: string;
  };
  diyVsWithUs: { row: string; diy: string; withUs: string }[];
  faq: { q: string; a: string }[];
  cta: StepCta;
  relatedBlogSlugs: string[];
  relatedServiceSlugs: string[];
  /** Baseline and Inspect say plainly that this is not a licensed inspection. */
  disclaimer?: "inspection" | "education";
}

export const METHOD_STEP_PAGES: MethodStepPage[] = [
  {
    key: "baseline",
    publishDate: "2026-10-28",
    seoTitle: "Step 1 Baseline: Document Every System in Your Home | The 360° Method",
    seoDesc: "How to build a home baseline: every major system written down once, with age, condition and photos, so repairs stop being surprises. Step 1 of the 360° Method, from Handy Pioneers in Vancouver, WA.",
    h1: "Baseline: write your home down once, so it stops surprising you",
    targetQueries: ["home baseline assessment", "document home systems", "home maintenance record", "what to document about your house", "home medical record"],
    panelAlt: "Step 1, Baseline: a checklist beside a cutaway house with HVAC, electrical, windows, plumbing, roof and foundation labelled",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "Nobody has looked at every system since the inspection you bought the house with.",
        "The age of the water heater, the furnace and the roof is a guess.",
        "Every repair starts from zero, with a stranger explaining your own house to you.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "Every major system documented once: what it is, how old it is, what shape it is in, with a photo.",
        "A starting record that each later visit builds on instead of replacing.",
        "Decisions made from facts about this house, not from the last emergency.",
      ],
    },
    whatItIs: [
      "A baseline is your home's medical record on day one. It does not fix anything. It answers one question for every major system in the house: what do we actually have here, and what condition is it in right now? Roof, gutters and drainage, siding and trim, windows and doors, foundation and crawlspace, attic and insulation, plumbing, water heater, electrical, heating and cooling, decks and exterior structures, and the interior finishes that tell you about the rest.",
      "In Clark County the baseline matters more than in a drier climate. Nine wet months a year reward the house that was looked at in September and punish the one that was not. A baseline done once, in writing, is what turns the first seasonal walkthrough (Step 2) from a tour into a comparison.",
      "The baseline is a maintenance record, not a licensed home inspection. If you are buying or selling, hire a licensed inspector. The baseline is what you keep after that report goes in a drawer.",
    ],
    diySteps: [
      "Make a list of the major systems in your home. Twelve to fifteen lines is plenty.",
      "For each one, write down what it is and how old it is. Look for date stamps on the water heater, the furnace data plate, the electrical panel label and the roof permit.",
      "Walk the outside first, then the inside, then the attic and crawlspace. Rate each system in three words: good, watch, or needs attention.",
      "Take one wide photo and one close photo per system, including anything that worries you. Put the date in the file name.",
      "Note the brand and model of the big equipment so parts and manuals are findable later.",
      "Save the whole thing in one place you will find again: a shared folder, a notebook, or the home record in your portal.",
    ],
    delivery: {
      customerLabel: "Home Baseline",
      cadence: "Once, at the start of a membership, and refreshed when the home changes.",
      included: [
        "A two to three hour documented walkthrough of every major system by a trained technician.",
        "Photos, condition ratings and the age of each system, stored in your home record.",
        "A written summary with findings sorted into NOW, SOON and WAIT.",
        "The record stays yours and follows the house.",
      ],
      plans: "The Home Baseline starts every Proactive Path plan: Essential, Full Coverage and Maximum Protection.",
    },
    diyVsWithUs: [
      { row: "Time", diy: "A weekend, if you stay on task.", withUs: "One scheduled visit; you point out what worries you." },
      { row: "Attic and crawlspace", diy: "You, a headlamp and a moisture meter, if you own one.", withUs: "Done by someone who goes in crawlspaces every week and knows what PNW moisture damage looks like early." },
      { row: "Ratings", diy: "Your best judgment, which improves with practice.", withUs: "Consistent ratings across hundreds of Clark County homes, so good means the same thing every visit." },
      { row: "Where it lives", diy: "A folder you maintain.", withUs: "Your portal home record, updated every seasonal visit." },
    ],
    faq: [
      { q: "Is a home baseline the same as a home inspection?", a: "No. A licensed home inspection is a point in time report for a real estate transaction, done by a licensed inspector. A baseline is the maintenance record you keep afterwards, built to be updated season after season. If you are buying or selling, hire an inspector. Then baseline the house you now own." },
      { q: "How long does a baseline take?", a: "For a homeowner doing it alone, plan a weekend. A Handy Pioneers Home Baseline runs two to three hours on site for a typical Clark County home, with the written record delivered after." },
      { q: "What if I have no idea how old my roof or furnace is?", a: "Look for a permit sticker on the roof or in the county permit record, a data plate on the furnace (the serial number usually encodes the year), and a label on the water heater. If there is no record, write down what you can see and mark the age as unknown. Unknown is still better than guessing." },
      { q: "Do I need special tools?", a: "A flashlight, a phone camera and a notebook cover most of it. A moisture meter helps in a crawlspace. Anything that needs a ladder on a steep roof or opening an electrical panel is a reason to have a professional do that part." },
    ],
    cta: "baseline",
    relatedBlogSlugs: ["360-method-phase-1-aware-know-before-you-need", "the-360-method-why-we-look-at-your-whole-home", "home-maintenance-plan-vancouver-wa"],
    relatedServiceSlugs: ["property-maintenance", "home-repair"],
    disclaimer: "inspection",
  },
  {
    key: "inspect",
    publishDate: "2026-10-28",
    seoTitle: "Step 2 Inspect: The Seasonal Home Walkthrough | The 360° Method",
    seoDesc: "A seasonal home walkthrough checklist for the Pacific Northwest: what to look at each season, so cracked caulk and loose trim get caught before the rain finds them. Step 2 of the 360° Method, from Handy Pioneers in Vancouver, WA.",
    h1: "Inspect: walk the house every season, before the weather does",
    targetQueries: ["seasonal home walkthrough checklist", "seasonal home inspection checklist Pacific Northwest", "fall home maintenance checklist Vancouver WA", "spring home walkthrough"],
    panelAlt: "Step 2, Inspect: a person with a magnifying glass looking closely at a house, with spring and fall markers beside it",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "The roof gets looked at when it leaks.",
        "Caulk, flashing and trim fail quietly for two or three winters before anyone notices the stain inside.",
        "The first warning is a repair bill, not a walk around the house.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "Four short walkthroughs a year, each one comparing the house to its baseline.",
        "Small things caught small: a bead of caulk, a loose downspout strap, a soft spot on a deck board.",
        "A standing list of what changed, so Step 4 has something real to prioritize.",
      ],
    },
    whatItIs: [
      "Inspect is the habit that makes the baseline worth having. Each season you walk the same route and ask one question of every system: has anything changed since last time? You are not looking for perfection. You are looking for the small, inexpensive failures that become large, expensive ones when water gets involved.",
      "Clark County hands you the calendar. Fall is about keeping water out: gutters, downspout discharge, roof debris, caulk at windows and siding joints, the crawlspace vents. Winter is a check after the first big windstorm and the first hard freeze. Spring is where the winter showed: moss on the roof, paint failure on the south and west faces, soft wood on decks and trim. Summer is the dry window for paint, sealing and anything that needs a dry surface.",
      "A walkthrough is a maintenance habit, not a licensed inspection, and it never replaces one for a sale or a purchase.",
    ],
    diySteps: [
      "Pick a fixed route: start at the street, walk the exterior clockwise, then the interior room by room, then the attic and crawlspace.",
      "Bring your baseline. Compare, do not rediscover.",
      "Outside, look where materials meet: roof to wall, window to siding, deck to house, downspout to ground. Water gets in at joints.",
      "Inside, look at ceilings under bathrooms and at exterior corners, under every sink, around the water heater, and at the base of exterior doors.",
      "Photograph anything that changed and add it to the record with the date.",
      "Write a three line summary: what is new, what got worse, what to do before the next season.",
    ],
    delivery: {
      customerLabel: "Seasonal Walkthrough",
      cadence: "Two or four times a year, depending on the plan, on a fixed seasonal schedule.",
      included: [
        "A technician walks the full Clark County seasonal checklist for that time of year.",
        "Findings compared against your baseline and logged with photos.",
        "The listed seasonal maintenance performed on the same visit.",
        "A written NOW, SOON and WAIT summary after every visit.",
      ],
      plans: "Essential includes spring and fall walkthroughs. Full Coverage and Maximum Protection include all four seasons.",
    },
    diyVsWithUs: [
      { row: "Consistency", diy: "Depends on remembering, and on the weather the weekend you planned it.", withUs: "On the calendar every season, whether or not anything seems wrong." },
      { row: "The roof", diy: "From the ground with binoculars, which is the right call for most people.", withUs: "Looked at properly, with the gear and the footing to do it safely." },
      { row: "What you find", diy: "A list you still have to act on.", withUs: "Small items handled on the visit; the rest written up for Step 4." },
      { row: "Cost of missing something", diy: "Yours, and usually discovered in February.", withUs: "A second set of trained eyes on the same house every season." },
    ],
    faq: [
      { q: "How often should I walk through my house?", a: "Every season, four times a year. If you can only manage two, make them fall (before the rain) and spring (after it). Those two catch most of what the Pacific Northwest does to a house." },
      { q: "What should a fall walkthrough in Clark County include?", a: "Gutters and downspouts clear and discharging away from the foundation, roof clear of debris, caulk and flashing at windows and siding joints, exterior door seals, hose bibs protected, crawlspace vents and ground moisture checked, and a look at the attic for daylight or staining." },
      { q: "Should I go on the roof?", a: "Most homeowners should not. Steep pitches, moss and wet shingles put people in the hospital every year. Use binoculars from the ground and from an upstairs window, and have a professional go up when something needs a closer look." },
      { q: "Is a seasonal walkthrough a home inspection?", a: "No. It is a maintenance habit. A licensed home inspection is a formal report for a transaction. The walkthrough is what you do between those." },
    ],
    cta: "baseline",
    relatedBlogSlugs: ["3-things-vancouver-homeowners-forget-to-check-every-spring", "summer-home-prep-checklist-clark-county-2026", "moss-mold-moisture-pnw-homeowners-guide-roof-siding"],
    relatedServiceSlugs: ["gutter-services", "rot-repair", "property-maintenance"],
    disclaimer: "inspection",
  },
  {
    key: "track",
    publishDate: "2026-10-28",
    seoTitle: "Step 3 Track: Keep a Living Home Maintenance Log | The 360° Method",
    seoDesc: "How to keep a home maintenance log that shows where the money goes: every repair, every visit, every contractor, in one place. Step 3 of the 360° Method, from Handy Pioneers in Vancouver, WA.",
    h1: "Track: one living record of every repair, visit and dollar",
    targetQueries: ["home maintenance log", "home repair record for resale", "why keep home maintenance records", "home maintenance tracking"],
    panelAlt: "Step 3, Track: a laptop showing a home record with charts, a calendar and a calculator beside it",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "Receipts in a drawer. Contractor names forgotten. The year the roof was done is a family debate.",
        "The same problem gets paid for twice because nobody remembers the first time.",
        "At sale, the buyer's inspector knows more about the house than the owner does.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "One record: what was done, when, by whom, what it cost, with photos.",
        "Patterns you can see: the system that keeps asking for money, the season that always bites.",
        "A documented history that supports a sale, a refinance or an insurance conversation.",
      ],
    },
    whatItIs: [
      "Track turns the baseline and the walkthroughs into a history. Every repair, every seasonal visit, every contractor and every dollar goes into one log, dated. It sounds like bookkeeping. It is actually the thing that makes the next two steps possible, because you cannot prioritize what you cannot see, and you cannot see a pattern from a drawer of receipts.",
      "The log pays off in three places. Day to day, it stops repeat work and lost warranties. Over a few years, it shows you which systems are costing the most and which are quietly fine. And when the house changes hands, it is the difference between a seller who says the roof is fine and one who shows the invoice, the photos and the two walkthroughs since.",
    ],
    diySteps: [
      "Start one file. A spreadsheet, a notes app or a binder. One is enough; two is where it falls apart.",
      "Give it five columns: date, system, what was done, who did it, what it cost. Add a photo link when you have one.",
      "Enter the baseline and every walkthrough summary as a row, so the record has a spine.",
      "Each time anyone works on the house, add a row the same day, before the invoice disappears.",
      "Once a year, sort by system and look at the totals. That is your spending pattern.",
      "Keep warranties and manuals in the same place, named by system.",
    ],
    delivery: {
      customerLabel: "Home Health Record",
      cadence: "Continuous. Updated on every visit and every job.",
      included: [
        "Every walkthrough finding, photo and completed work order logged in your portal automatically.",
        "A system by system view of condition over time.",
        "Documents, photos and reports in one place that follows the house.",
        "Exportable when you sell, refinance or file a claim.",
      ],
      plans: "The Home Health Record is part of every Proactive Path plan: Essential, Full Coverage and Maximum Protection.",
    },
    diyVsWithUs: [
      { row: "Discipline", diy: "The log is only as good as the habit, and the habit breaks in a busy month.", withUs: "Logged by the people doing the work, on the day." },
      { row: "Photos", diy: "If you remember to take them, and can find them later.", withUs: "Before, during and after, attached to the entry." },
      { row: "Patterns", diy: "Visible if you sort and total once a year.", withUs: "Visible on the home record, by system, any time." },
      { row: "Resale", diy: "A folder you hand over.", withUs: "A documented history with dates, photos and reports." },
    ],
    faq: [
      { q: "What should a home maintenance log include?", a: "Date, system, what was done, who did it, what it cost, and a photo. Add warranties, manuals and the age of major equipment. Keep it in one place and add to it the day the work happens." },
      { q: "Does a maintenance record help when I sell?", a: "It helps a buyer trust the house. Documented history answers the questions an inspection raises, and it shows a pattern of care rather than a pattern of fixes. Washington sellers still complete the required disclosure form; the log is what makes filling it out easy and defensible." },
      { q: "Paper or digital?", a: "Whichever you will actually use. Digital wins on photos and search. Paper wins on simplicity. A member's portal record does both without the homeowner carrying the habit." },
      { q: "I have years of receipts and no log. Where do I start?", a: "Start today, not with the backlog. Enter the baseline, then add rows going forward. Backfill the big items you can date (roof, furnace, water heater, windows) and let the rest go." },
    ],
    cta: "baseline",
    relatedBlogSlugs: ["home-maintenance-plan-vancouver-wa", "clark-county-housing-market-2026-what-to-fix-first"],
    relatedServiceSlugs: ["property-maintenance"],
  },
  {
    key: "prioritize",
    publishDate: "2026-10-28",
    seoTitle: "Step 4 Prioritize: NOW, SOON, WAIT for Home Repairs | The 360° Method",
    seoDesc: "How to prioritize home repairs with three tiers: NOW for safety and water, SOON for return on the money, WAIT for comfort and cosmetics. Step 4 of the 360° Method, from Handy Pioneers in Vancouver, WA.",
    h1: "Prioritize: NOW, SOON, WAIT, so the money goes where it matters",
    targetQueries: ["how to prioritize home repairs", "now soon wait home repairs", "inspection report priorities", "which home repairs first"],
    panelAlt: "Step 4, Prioritize: three stacked tiers labelled NOW (Safety), SOON (ROI) and WAIT (Comfort)",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "Cosmetics first, the soft deck board last, because the paint is what you see every day.",
        "An inspection report with forty findings and no idea which three matter.",
        "Money spent on what was annoying instead of what was about to fail.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "Every finding sorted into one of three tiers, with a plain reason.",
        "NOW handled before the rainy season. SOON planned. WAIT left alone on purpose.",
        "A roadmap you can hand to a contractor, a spouse or a buyer and have it make sense.",
      ],
    },
    whatItIs: [
      "Prioritize is where the record becomes a plan. Every finding from the baseline and the walkthroughs gets one of three labels. NOW is safety and water: anything that can hurt someone or let water into the structure. SOON is return on the money: things that cost a little now and a lot later, like a failing gutter seam above a foundation or paint that is about to let water into siding. WAIT is comfort and cosmetics: real, worth doing, and not urgent.",
      "The discipline is in the WAIT column. Most homeowners spend first on what they look at every day. The method says to spend first on what the house needs, then on what you want, and to be honest about which is which. In the Pacific Northwest the test is simple: if this fails in a wet February, what happens? That answer puts the item in its tier.",
      "Three tiers, not ten. If the list has a fourth category, it has stopped being a decision tool.",
    ],
    diySteps: [
      "Put every open finding on one list, from the baseline, the walkthroughs and any inspection report you have.",
      "Ask of each: can it hurt someone, or can it let water in? If yes, NOW.",
      "Of the rest, ask: will waiting a year make this materially more expensive? If yes, SOON.",
      "Everything else is WAIT. Write it down anyway, so it is a choice and not a forgotten item.",
      "Inside each tier, order by the season. Exterior water items go before the rain; paint and sealing go in the dry months.",
      "Do the NOW list before the next wet season starts. Plan the SOON list over the next year.",
    ],
    delivery: {
      customerLabel: "Priority Roadmap",
      cadence: "Built after the baseline, refreshed after every seasonal walkthrough.",
      included: [
        "Every finding placed in NOW, SOON or WAIT with a written reason.",
        "An investment range for each item so the plan can be paced across the year.",
        "A roadmap you can share, with the reasoning intact.",
        "Members can also send an existing inspection report and get it translated into the three tiers.",
      ],
      plans: "The Priority Roadmap comes with every Proactive Path plan: Essential, Full Coverage and Maximum Protection. Anyone can also run an inspection report through the 360 Roadmap Generator.",
    },
    diyVsWithUs: [
      { row: "Judgment calls", diy: "Yours, and the hard ones are genuinely hard without seeing a lot of houses.", withUs: "Made by someone who has watched the same failures play out across Clark County." },
      { row: "Investment ranges", diy: "Guesses, or a round of quotes.", withUs: "A written range per item, so the year can be planned." },
      { row: "Inspection reports", diy: "Forty findings, read alone.", withUs: "Translated into NOW, SOON and WAIT in plain language." },
      { row: "Keeping it current", diy: "Redo it when you remember.", withUs: "Refreshed after every seasonal visit." },
    ],
    faq: [
      { q: "How do I decide what to fix first in my house?", a: "Safety and water first, always. Then anything that gets materially more expensive if it waits a year. Then comfort and cosmetics. Sort every open item into those three groups, and do the first group before the next rainy season." },
      { q: "What counts as a NOW item?", a: "Anything that can hurt someone (a loose railing, a tripping step, an electrical hazard) or let water into the structure (a roof leak, a failed flashing, a downspout dumping at the foundation, soft wood at a door threshold)." },
      { q: "Is cosmetic work ever a priority?", a: "Yes, when it protects something. Exterior paint is cosmetic right up until it stops keeping water out of the siding, and then it is a SOON item. The question is always what the item does for the house, not how it looks." },
      { q: "Can you prioritize an inspection report I already have?", a: "Yes. The 360 Roadmap Generator takes the report you already paid for and returns it sorted into NOW, SOON and WAIT with plain language and investment ranges." },
    ],
    cta: "roadmap",
    relatedBlogSlugs: ["clark-county-housing-market-2026-what-to-fix-first", "5-home-repairs-clark-county-homeowners-keep-putting-off"],
    relatedServiceSlugs: ["home-repair", "rot-repair"],
  },
  {
    key: "schedule",
    publishDate: "2026-10-28",
    seoTitle: "Step 5 Schedule: Build Your Home Maintenance Calendar | The 360° Method",
    seoDesc: "How to build a home maintenance calendar for the Pacific Northwest, with monthly, quarterly and annual tasks placed in the right season. Step 5 of the 360° Method, from Handy Pioneers in Vancouver, WA.",
    h1: "Schedule: put every task on a real calendar, in the right season",
    targetQueries: ["home maintenance calendar", "how do I make a home maintenance plan", "monthly quarterly annual home maintenance schedule", "home maintenance schedule Pacific Northwest"],
    panelAlt: "Step 5, Schedule: a maintenance calendar with monthly, quarterly and annual tasks checked off",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "I keep meaning to. The gutters, the furnace filter, the dryer vent, the hose bibs.",
        "Tasks remembered by the failure they were supposed to prevent.",
        "The dry season spent indoors and the first rain spent on a ladder.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "A calendar with every recurring task on it, monthly, quarterly and annual.",
        "Exterior water work before the rain, paint and sealing in the dry window, every year without deciding again.",
        "The SOON list from Step 4 scheduled into the year instead of waiting for an open weekend.",
      ],
    },
    whatItIs: [
      "Schedule is the step that removes willpower from the system. The priorities from Step 4 and the recurring tasks every house needs go on a calendar with dates, and the dates come from the climate, not from when you happen to think of it. Once the calendar exists, maintenance stops being a decision you make forty times a year and becomes one you made once.",
      "The Pacific Northwest calendar has a shape. September and October are for keeping water out: gutters, downspouts, roof debris, caulk, door seals, hose bibs. November through February is light: check after storms and freezes, keep the furnace filter honest. March and April are the post winter walkthrough, moss and the damage report. May through August is the dry window, the only time paint, stain, sealant and deck work should be scheduled.",
      "Monthly tasks are small and indoor. Quarterly tasks are the walkthroughs. Annual tasks are the big seasonal jobs and the service appointments. Put all three on the same calendar so nothing falls through the cracks.",
    ],
    diySteps: [
      "List the recurring tasks your house needs. Start with the monthly ones (filters, drains, detectors) and work up to annual (gutters, roof debris, water heater flush, furnace service, exterior sealing).",
      "Give each task a month that matches the climate: water work in early fall, paint and sealing in summer, the walkthroughs at each season change.",
      "Add the SOON items from your Priority Roadmap to the months that make sense for them.",
      "Put it all on the calendar you actually look at, with reminders a week ahead.",
      "Book the professional appointments (furnace service, roof work) for the year now, while the schedules are open.",
      "At each seasonal walkthrough, check the calendar for what slipped and move it, do not delete it.",
    ],
    delivery: {
      customerLabel: "Care Calendar",
      cadence: "Set once at enrollment, run every year, adjusted after each walkthrough.",
      included: [
        "Seasonal visits placed on the calendar for the year, with the Clark County checklist attached to each.",
        "The SOON items from your roadmap scheduled into the right months.",
        "Reminders before each visit; nothing for you to remember.",
        "Service appointments coordinated around the visit schedule.",
      ],
      plans: "Essential runs a two season calendar (spring and fall). Full Coverage and Maximum Protection run all four seasons.",
    },
    diyVsWithUs: [
      { row: "Building it", diy: "An evening with a list and a calendar app.", withUs: "Built from your baseline and roadmap, on the Clark County seasonal pattern." },
      { row: "Keeping it", diy: "Reminders you can dismiss.", withUs: "Visits that happen on the date, with the checklist worked through." },
      { row: "The dry window", diy: "Easy to miss; it is short and it is also vacation season.", withUs: "Paint, sealing and deck work booked into it ahead of time." },
      { row: "When life gets busy", diy: "The calendar is the first thing to slip.", withUs: "The schedule holds whether or not you are thinking about the house." },
    ],
    faq: [
      { q: "How do I make a home maintenance plan?", a: "List the recurring tasks your house needs, give each one a month that matches the climate, add the repairs you have already prioritized, and put all of it on a calendar you look at. Then walk the house every season and adjust. That is the whole plan." },
      { q: "What should be on a fall maintenance calendar in Vancouver, WA?", a: "Gutters and downspouts cleared and discharging away from the house, roof debris removed, caulk and flashing checked, exterior door seals, hose bibs protected before the first freeze, crawlspace vents and ground moisture checked, furnace filter changed and the furnace serviced." },
      { q: "When is the right time for exterior painting and sealing?", a: "The dry window, roughly late May through early September, when surfaces are dry and nights are warm enough for coatings to cure. Scheduling it in October is how exterior paint fails early here." },
      { q: "How is this different from a generic checklist?", a: "A generic checklist tells you what houses need. A calendar tells you when this house needs it, built from your own baseline and roadmap. The second one gets done." },
    ],
    cta: "roadmap",
    relatedBlogSlugs: ["home-maintenance-plan-vancouver-wa", "summer-home-prep-checklist-clark-county-2026"],
    relatedServiceSlugs: ["property-maintenance", "gutter-services", "exterior-painting"],
  },
  {
    key: "execute",
    publishDate: "2026-10-28",
    seoTitle: "Step 6 Execute: DIY or Hire, and Getting It Done | The 360° Method",
    seoDesc: "A plain DIY vs hire decision framework for home repairs: what to do yourself, what to hand off, and how to get the work done in priority order. Step 6 of the 360° Method, from Handy Pioneers in Vancouver, WA.",
    h1: "Execute: decide DIY or hire, then do the work in order",
    targetQueries: ["DIY vs hire home repairs", "when to hire a contractor vs DIY", "should I do it myself or hire someone", "home repair decision framework"],
    panelAlt: "Step 6, Execute: a DIY figure at a sink and a hired professional at an electrical panel, with a brain between them weighing the choice",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "Vetting a new contractor for every little thing, or putting it off because vetting is the hard part.",
        "A YouTube repair that took three weekends and still needs a professional.",
        "Work done in the order it got annoying, not the order it mattered.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "A clear line between what you do and what you hand off, decided once.",
        "The NOW list done before the rain, the SOON list done through the year.",
        "Work completed with photos and a record, by people who already know the house.",
      ],
    },
    whatItIs: [
      "Execute is where plans become finished work, and the first decision is who does it. The method uses a simple DIY vs hire framework with four questions. Is it safe for you to do (heights, electrical, gas, structure)? Do you have the tools and the skill, honestly? Does doing it yourself cost more in time than it saves in money? And if it goes wrong, what does wrong cost? Filters, caulk, drain cleaning, hose bib covers and smoke detector batteries almost always pass the test. Roofs, electrical panels, gas, structural rot and anything that needs a permit almost always fail it.",
      "The second decision is order. Work the roadmap: NOW items first, in season, then SOON. Resist the pull of the visible cosmetic item when a water item is open. And whoever does the work, close the loop: a photo, a date, a line in the record from Step 3.",
      "Handy Pioneers is the hire side of that framework for Clark County homeowners. We do not think everything should be hired out. We think the decision should be made on purpose, and that the work you do hire out should be done by a team that already knows your house.",
    ],
    diySteps: [
      "Take the open items from your roadmap in tier order: NOW, then SOON.",
      "For each one, run the four questions: safe for me, tools and skill, time versus money, cost of getting it wrong.",
      "Mark each item DIY or hire. Do not negotiate with yourself about ladders, electrical, gas or structure.",
      "Batch the DIY items into a weekend per season and put them on the calendar.",
      "Batch the hire items so one visit covers several, and get the scope in writing before the work starts.",
      "When each item is done, photograph it and add the row to your record the same day.",
    ],
    delivery: {
      customerLabel: "Work Completed",
      cadence: "Routine items on every seasonal visit. Roadmap work scheduled through the year.",
      included: [
        "The listed seasonal maintenance performed on each visit by your technician.",
        "Roadmap items quoted separately in writing at the member rate and approved before any work starts.",
        "Licensed specialty trades coordinated when a job needs them.",
        "Every completed item photographed and logged to your home record.",
      ],
      plans: "Seasonal work is included in every plan: Essential, Full Coverage and Maximum Protection. Full Coverage and Maximum Protection add pre-paid labor toward roadmap work. Repair, replacement and licensed trade work beyond the visit list are quoted separately and approved by you first.",
    },
    diyVsWithUs: [
      { row: "Deciding", diy: "The four questions, answered honestly.", withUs: "Answered with you on the walkthrough, item by item." },
      { row: "Finding help", diy: "Search, vet, schedule, repeat, for every job.", withUs: "One team that already knows the house and its record." },
      { row: "Order of work", diy: "Easy to drift toward the visible item.", withUs: "Worked from the roadmap, in season." },
      { row: "Proof", diy: "If you remember the photo.", withUs: "Before and after, logged automatically." },
    ],
    faq: [
      { q: "How do I decide whether to DIY a repair or hire someone?", a: "Four questions. Is it safe for you (heights, electrical, gas, structure)? Do you honestly have the tools and the skill? Does your time cost more than the savings? What does getting it wrong cost? If any answer worries you, hire it. If none do, do it and log it." },
      { q: "What home repairs should never be DIY?", a: "Anything on a steep or wet roof, anything inside an electrical panel, gas appliances and lines, structural rot repair, and anything that requires a permit and an inspection. The downside of a mistake is too large." },
      { q: "Does the membership do all the work for me?", a: "A seasonal visit performs the listed maintenance. Repair, replacement, licensed trade work and every finding on the 360 Roadmap are not included; each is quoted separately in writing at the member rate and approved before any work starts. You always see the scope first." },
      { q: "Do you tell members to do some things themselves?", a: "Yes, often. Filters, simple caulk, drain maintenance and hose bib covers are quick and satisfying. We would rather make you capable than keep you dependent. The work worth hiring is the work with real downside." },
    ],
    cta: "consultation",
    relatedBlogSlugs: ["5-home-repairs-clark-county-homeowners-keep-putting-off", "is-it-dry-rot-how-to-tell-clark-county"],
    relatedServiceSlugs: ["home-repair", "rot-repair", "deck-repair"],
  },
  {
    key: "preserve",
    publishDate: "2026-10-28",
    seoTitle: "Step 7 Preserve: Make Major Systems Last Longer | The 360° Method",
    seoDesc: "Preservation routines that extend the life of a water heater, furnace, roof and siding, so replacement comes later and on your schedule. Step 7 of the 360° Method, from Handy Pioneers in Vancouver, WA.",
    h1: "Preserve: routines that add years to the systems that cost the most",
    targetQueries: ["extend water heater life", "HVAC maintenance to extend lifespan", "preventive home maintenance", "make roof last longer Pacific Northwest"],
    panelAlt: "Step 7, Preserve: technicians servicing a water heater and an air conditioner beside an hourglass",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "Replacing the water heater early because nobody flushed it.",
        "A furnace that runs a decade less than it could, on dirty filters and no service.",
        "Siding and decks repainted because the last coat was left two summers too long.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "Simple, repeatable routines for each major system, on the calendar.",
        "Replacements that come later, planned, instead of early, in an emergency.",
        "The biggest line items in a home's lifetime cost pushed years down the road.",
      ],
    },
    whatItIs: [
      "Preserve is the move from fixing to extending. Once the house is documented, walked, prioritized, scheduled and the NOW list is handled, the next gain is making the expensive systems last. A water heater that is flushed and has its anode checked outlives one that is ignored. A furnace with clean filters and an annual service runs longer and cheaper. A roof kept clear of debris and moss, with gutters that drain, sheds water the way it was built to.",
      "In Clark County the preservation routines are mostly about water and organic growth: keep the roof and gutters clear, keep moss off, keep paint and sealant intact so siding and trim stay dry, keep the crawlspace ventilated and the ground sloped away. The routines are not glamorous. They are the reason one house needs a new roof at twenty years and the house next door needs one at fourteen.",
    ],
    diySteps: [
      "List your major systems with their age and expected service life. Water heater, furnace and air handler, roof, siding and exterior coatings, decks, windows.",
      "For each, write the two or three routines that extend it. Flush and anode check for the water heater. Filters and annual service for the furnace. Debris, moss and gutter care for the roof. Coating maintenance for siding and decks.",
      "Put the routines on the Care Calendar from Step 5, in the right season.",
      "Track them in the record. A system with a logged service history is worth more and fails less.",
      "Plan the replacement year for each system now, while it is a choice, and start setting money aside for it.",
    ],
    delivery: {
      customerLabel: "Preventive Care",
      cadence: "Built into the seasonal visits; service appointments coordinated annually.",
      included: [
        "Preservation routines for the major systems worked into each seasonal checklist.",
        "Roof, gutter, moss and drainage care kept current through the wet season.",
        "Service history for each system logged in your home record.",
        "A projected replacement timeline so the big items are planned, not sudden.",
      ],
      plans: "Preventive Care is part of every plan: Essential, Full Coverage and Maximum Protection. Full Coverage and Maximum Protection cover more of the routines across four visits a year.",
    },
    diyVsWithUs: [
      { row: "Water heater", diy: "A flush and an anode check are doable with care and the right valve.", withUs: "Done or coordinated on the visit, logged with the date." },
      { row: "Roof and moss", diy: "From the ground, with the right treatment at the right time.", withUs: "Kept clear and treated in season, safely." },
      { row: "Coatings", diy: "Catching failing paint early is the whole trick.", withUs: "Spotted on walkthroughs and booked into the dry window." },
      { row: "Replacement timing", diy: "A guess, until it fails.", withUs: "Projected from age and condition, so it is planned." },
    ],
    faq: [
      { q: "How do I make my water heater last longer?", a: "Flush the tank yearly to clear sediment, check the anode rod every couple of years and replace it when it is mostly consumed, keep the temperature setting moderate, and keep the area around it dry and clear. Those routines commonly add years." },
      { q: "What shortens a roof's life in the Pacific Northwest?", a: "Debris that holds moisture, moss that lifts shingles, gutters that back up under the edge, and shade that keeps the surface wet. Keeping the roof clear, treating moss early and keeping gutters draining are the preservation routines that matter here." },
      { q: "Is preventive maintenance really cheaper than replacing?", a: "Preservation routines are small, recurring and predictable. Replacement is large and usually arrives at the worst time. The method does not promise a specific saving; it promises that the replacement comes later and on your schedule." },
      { q: "Which systems should I focus on first?", a: "The ones that cost the most to replace and respond best to care: roof, water heater, furnace and air handler, and exterior coatings on siding, trim and decks." },
    ],
    cta: "consultation",
    relatedBlogSlugs: ["moss-mold-moisture-pnw-homeowners-guide-roof-siding", "gutters-battle-ground-clean-repair-or-replace", "house-washing-vancouver-wa-soft-wash-vs-pressure-wash"],
    relatedServiceSlugs: ["gutter-services", "pressure-washing", "exterior-painting", "property-maintenance"],
  },
  {
    key: "upgrade",
    publishDate: "2026-10-28",
    seoTitle: "Step 8 Upgrade: Good, Better, Best Home Improvements | The 360° Method",
    seoDesc: "A Good, Better, Best framework for home improvements, so every dollar either prevents a failure or adds value. Step 8 of the 360° Method, from Handy Pioneers in Vancouver, WA.",
    h1: "Upgrade: Good, Better, Best, so every improvement dollar earns its place",
    targetQueries: ["home improvements that add value", "good better best home upgrades", "which home upgrades are worth it", "home improvement priorities Clark County"],
    panelAlt: "Step 8, Upgrade: three kitchens side by side labelled Good, Better and Best",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "Improvement dollars spent on whatever caught your eye or whatever the neighbor did.",
        "A premium finish on a system that was about to fail underneath it.",
        "No way to tell a value upgrade from an expensive preference.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "Every improvement framed three ways, Good, Better, Best, with the trade-offs written down.",
        "Upgrades chosen because they prevent failure or raise value, not just because they are nice.",
        "Nice is still allowed. It is just chosen on purpose.",
      ],
    },
    whatItIs: [
      "Upgrade is the step most people start with and the method puts eighth, on purpose. Improvements made on a house that is documented, maintained and preserved hold their value. Improvements made on a house with open NOW items are money poured over a problem. Once the foundation is in order, every improvement dollar gets one test: does it prevent a failure, or does it increase value?",
      "The Good, Better, Best framework keeps the choice honest. For any project, write three versions. Good solves the problem soundly. Better adds durability or function that pays back. Best adds the finish and features you want. Then decide which level this house, this money and this horizon call for. Sometimes Best is right. The point is that you chose it knowing what Good would have cost.",
      "In Clark County the value upgrades cluster around the envelope and the wet months: drainage, siding and trim done right, windows and doors that seal, decks built to last, and kitchens and baths done to a level the neighborhood supports.",
    ],
    diySteps: [
      "Confirm the NOW list is closed. Upgrades wait until it is.",
      "For each project you are considering, write the Good, Better and Best version in a few lines each.",
      "Against each version, note what it prevents, what it adds and roughly how long you plan to own the house.",
      "Rank projects by what they do for the house first, and by what you want second.",
      "Get written scopes for the level you chose, in the right season for the work.",
      "Log the finished upgrade in the record with photos, invoices and warranties.",
    ],
    delivery: {
      customerLabel: "Smart Improvements",
      cadence: "Planned in year two and beyond, once the home is stable.",
      included: [
        "Good, Better, Best scopes written for the improvements on your roadmap.",
        "Plain explanation of what each level prevents or adds.",
        "Projects sequenced around the seasonal calendar and your horizon.",
        "The finished work documented in your home record.",
      ],
      plans: "Smart Improvements planning is part of every plan from year two: Essential, Full Coverage and Maximum Protection. Improvement projects are quoted separately in writing at the member rate and approved before any work starts.",
      yearTwoPlus: "Most members reach this step in their second year, after the baseline, the first seasons of walkthroughs and the NOW list are behind them.",
    },
    diyVsWithUs: [
      { row: "Three versions", diy: "Worth writing even if you only ever build Good.", withUs: "Scoped for you, with what each level prevents and adds." },
      { row: "Sequence", diy: "Tempting to start with the kitchen.", withUs: "Ordered after the house is stable, so the upgrade holds its value." },
      { row: "Market fit", diy: "Hard to judge from inside the house.", withUs: "Informed by what we see across Clark County homes." },
      { row: "Record", diy: "Keep the invoices.", withUs: "Logged with photos and warranties in the home record." },
    ],
    faq: [
      { q: "Which home improvements add value?", a: "Ones that keep water out and the structure sound first (drainage, siding and trim, windows and doors, decks), then ones that bring the home to the level its neighborhood supports (kitchens, baths, flooring). An upgrade over an unfixed problem does not add value; it hides a cost." },
      { q: "What does Good, Better, Best mean for a project?", a: "Three written versions of the same project. Good solves it soundly. Better adds durability or function that pays back. Best adds the finish and features you want. You choose the level knowing what the others cost." },
      { q: "Should I upgrade before I fix things?", a: "No. Close the NOW list first. Improvements on a stable house hold their value. Improvements over open problems get torn out later." },
      { q: "Is Best ever the right choice?", a: "Often, when you plan to stay, when the finish matters to you daily, or when the neighborhood supports it. The method does not say to choose Good; it says to choose on purpose." },
    ],
    cta: "consultation",
    relatedBlogSlugs: ["clark-county-housing-market-2026-what-to-fix-first", "interior-carpentry-wet-season-pnw"],
    relatedServiceSlugs: ["remodeling", "kitchen-remodel", "bathroom-remodel", "deck-repair", "doors-windows"],
  },
  {
    key: "scale",
    publishDate: "2026-10-28",
    seoTitle: "Step 9 Scale: Read Your Home's Equity Over Time | The 360° Method",
    seoDesc: "How to read your home as an asset: equity over time, the record of care behind it, and how to think about refinance, mortgage and investment decisions. Step 9 of the 360° Method, from Handy Pioneers in Vancouver, WA. Education, not financial advice.",
    h1: "Scale: read your home like the asset it is",
    targetQueries: ["home equity over time", "home as an asset", "home maintenance and equity", "home maintenance and resale value", "home equity records"],
    panelAlt: "Step 9, Scale: a person reviewing a property dashboard with a rising chart and a coin",
    gap: {
      nowTitle: "Where most homeowners are now",
      now: [
        "Equity you never read. The biggest number in the household, checked once at purchase and once at sale.",
        "Refinance, sell or stay decided on feel, without the house's own record in the room.",
        "A home that is treated as a place, which it is, and never also as an asset, which it also is.",
      ],
      couldTitle: "Where this step puts you",
      could: [
        "A clear picture of what the home is worth, what you owe and how both have moved.",
        "A documented record of care you can bring to a refinance, a sale or an insurance conversation.",
        "Decisions about the asset made with the same care you now give the structure.",
      ],
    },
    whatItIs: [
      "Scale is the step where the method turns from the house to the household. You have documented, inspected, tracked, prioritized, scheduled, executed, preserved and upgraded. The house is now an asset you understand. Scale asks you to read it that way: what is it worth, what is owed against it, how has that gap moved, and what do the next decisions look like? Refinance or not. Pull equity for a project or wait. Sell, hold, or rent.",
      "The maintenance record is what makes this step honest. A documented history of care supports the value you believe the house has, in a conversation with a lender, a buyer or an insurer. The eight steps before this one are not just about keeping water out. They are about owning a property whose condition you can prove.",
      "Handy Pioneers is a home service and remodel company. We teach this step because a well kept home is a financial asset, and homeowners deserve to see it that way. We are not lenders or financial advisors. Education for homeowners, not financial advice.",
    ],
    diySteps: [
      "Once a year, write down a realistic estimate of the home's value (recent nearby sales, not a wish) and what you owe. The difference is your equity; track it alongside the maintenance record.",
      "Pull the year's maintenance totals from your record and look at them next to the equity line. Care and value move together over time.",
      "List the decisions on the horizon: refinance, a funded project, a sale, a rental. Write what each would need to be true to make sense.",
      "Gather the record of care (baseline, walkthroughs, work completed, upgrades) into one packet you could hand to a lender, a buyer or an insurer.",
      "Talk to a qualified professional (a lender, a financial advisor, a tax professional) before acting on any of it. This page is education, not advice.",
    ],
    delivery: {
      customerLabel: "Property Value Intelligence",
      cadence: "An annual review in year two and beyond, with the record always available.",
      included: [
        "An annual condition and care summary for the home, drawn from the record.",
        "A documented history ready to share for a refinance, sale or insurance review.",
        "Plain language on how the maintenance record supports value.",
        "Pointers to how homeowners commonly fund larger projects, with no financial advice given.",
      ],
      plans: "Property Value Intelligence is part of every plan from year two: Essential, Full Coverage and Maximum Protection. Education for homeowners, not financial advice.",
      yearTwoPlus: "This is the last step on purpose. It is most useful once the home has at least a year of documented care behind it.",
    },
    diyVsWithUs: [
      { row: "Value and equity", diy: "A yearly estimate you write down.", withUs: "Your condition record next to it, so the number has a story." },
      { row: "The record", diy: "Whatever you kept in Step 3.", withUs: "Exportable from the portal: baseline, visits, work, photos." },
      { row: "Big decisions", diy: "Yours, with a qualified professional.", withUs: "Yours, with a qualified professional, and a documented house in the room." },
      { row: "Advice", diy: "Seek it from a lender or advisor.", withUs: "Same. We are the contractor, not the advisor." },
    ],
    faq: [
      { q: "Does home maintenance affect resale value?", a: "A documented history of care supports the value a seller claims and answers the questions an inspection raises. It is not a guarantee of price; it is proof of condition, and buyers and their inspectors respond to proof." },
      { q: "How do I read my home equity?", a: "Equity is a realistic estimate of what the home would sell for minus what you owe on it. Write both down once a year and watch the gap. Pair it with your maintenance record so you can see care and value moving together." },
      { q: "Will you tell me whether to refinance?", a: "No. Handy Pioneers is a home service and remodel company, not a lender or a financial advisor. We help you keep a house whose condition you can prove, and we explain in plain language how homeowners commonly fund projects. The decision belongs with you and a qualified professional." },
      { q: "Why is this the last step?", a: "Because it is only honest once the first eight are real. Reading equity on a house with open NOW items and no record is reading a number you cannot defend." },
    ],
    cta: "consultation",
    relatedBlogSlugs: ["step-9-reading-home-equity-over-time", "home-equity-101-your-biggest-lever", "heloc-vs-home-equity-loan-plain-english"],
    relatedServiceSlugs: ["remodeling", "property-maintenance"],
    disclaimer: "education",
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────

export const STEP_KEYS: MethodStepKey[] = METHOD_STEP_PAGES.map((s) => s.key);

export interface MethodStepView {
  page: MethodStepPage;
  step: RoadmapStep;
  phase: RoadmapPhase;
  phaseKey: MethodPhaseKey;
  phaseIndex: number;
  panel: string;
  og: string;
}

/** Join a page record with its canon step and phase. */
export function stepView(page: MethodStepPage): MethodStepView {
  for (let i = 0; i < METHOD_CANON.phases.length; i++) {
    const phase = METHOD_CANON.phases[i];
    const step = phase.steps.find((s) => s.key === page.key);
    if (step) {
      return {
        page,
        step,
        phase,
        phaseKey: phase.id as MethodPhaseKey,
        phaseIndex: i,
        panel: METHOD_STEP_PANEL[page.key],
        og: METHOD_STEP_OG[page.key],
      };
    }
  }
  throw new Error(`methodSteps: ${page.key} is not in the canon`);
}

function endOfToday(today = new Date()): Date {
  const d = new Date(today);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function isStepPublished(page: MethodStepPage, today = new Date()): boolean {
  return new Date(page.publishDate + "T00:00:00") <= endOfToday(today);
}

/** Published step pages in canon order. */
export function getPublishedSteps(today = new Date()): MethodStepPage[] {
  return METHOD_STEP_PAGES.filter((p) => isStepPublished(p, today));
}

/** The page for a slug, or undefined when unknown or not yet published. */
export function getStepPage(slug: string | undefined, today = new Date()): MethodStepPage | undefined {
  if (!slug) return undefined;
  const page = METHOD_STEP_PAGES.find((p) => p.key === slug);
  return page && isStepPublished(page, today) ? page : undefined;
}

/** Any record by key, published or not (for "coming" tiles). */
export function getStepRecord(key: string): MethodStepPage | undefined {
  return METHOD_STEP_PAGES.find((p) => p.key === key);
}

/** Neighbours in canon order. Unpublished neighbours come back with published: false. */
export function stepNeighbors(key: MethodStepKey, today = new Date()) {
  const i = METHOD_STEP_PAGES.findIndex((p) => p.key === key);
  const wrap = (p: MethodStepPage | undefined) => (p ? { page: p, published: isStepPublished(p, today) } : null);
  return { prev: wrap(METHOD_STEP_PAGES[i - 1]), next: wrap(METHOD_STEP_PAGES[i + 1]) };
}

/** "Coming January 2027" for an unpublished step. */
export function comingLabel(page: MethodStepPage): string {
  const d = new Date(page.publishDate + "T12:00:00");
  return `Coming ${d.toLocaleString("en-US", { month: "long", year: "numeric" })}`;
}

export const STEP_PATH = (key: string) => `/360-method/${key}`;

const SITE_URL = "https://handypioneers.com";

/** Article + BreadcrumbList + FAQPage + HowTo for one step page. Used by the page and the prerender. */
export function methodStepJsonLd(page: MethodStepPage): Record<string, unknown>[] {
  const v = stepView(page);
  const url = `${SITE_URL}${STEP_PATH(page.key)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.h1,
      description: page.seoDesc,
      image: `${SITE_URL}${v.og}`,
      datePublished: page.publishDate,
      author: { "@type": "Person", name: "Marcin Micek" },
      publisher: { "@type": "Organization", name: "Handy Pioneers", url: SITE_URL },
      mainEntityOfPage: url,
      isPartOf: { "@type": "WebPage", "@id": `${SITE_URL}/360-method`, name: "The 360° Method" },
      about: { "@type": "Thing", name: "The 360° Method" },
      keywords: page.targetQueries.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "The 360° Method", item: `${SITE_URL}/360-method` },
        { "@type": "ListItem", position: 3, name: `Step ${v.step.number}: ${v.step.name}`, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `${v.step.name} your home: 360° Method Step ${v.step.number}`,
      description: v.step.line,
      step: page.diySteps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
    },
  ];
}

/** ItemList of the nine steps for the pillar page (published steps carry their URL). */
export function methodStepsItemList(today = new Date()): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The 360° Method: nine steps",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: METHOD_STEP_PAGES.length,
    itemListElement: METHOD_STEP_PAGES.map((p, i) => {
      const v = stepView(p);
      const item: Record<string, unknown> = { "@type": "ListItem", position: i + 1, name: `Step ${v.step.number}: ${v.step.name}` };
      if (isStepPublished(p, today)) item.url = `${SITE_URL}${STEP_PATH(p.key)}`;
      return item;
    }),
  };
}
