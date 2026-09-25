/**
 * Service pages data - one entry per dedicated /services/<slug> page.
 *
 * Single source of truth: ServicePage.tsx renders from this, and
 * scripts/generate-static-pages.ts emits crawler-readable HTML + Service /
 * BreadcrumbList / FAQPage JSON-LD from the same data.
 *
 * Curated (~12), not every label on the home grid - thin pages hurt ranking.
 * Voice: premium, Clark County / Pacific Northwest specific. Never expose
 * cost, hours, or that trades partners deliver specialty work. Sell the
 * outcome, not the process.
 */

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceDef {
  slug: string;
  name: string;
  serviceType: string; // schema serviceType
  h1: string;
  seoTitle: string;
  seoDesc: string;
  image: string;
  imageAlt: string;
  /** Hero image pixel size when it is not the standard 1600x900 (16:9), e.g. a stacked before/after. */
  imageSize?: { width: number; height: number };
  /** More real job photos, shown in a small grid after "What's included". Paths are site-relative. */
  moreImages?: { src: string; alt: string; caption: string; width: number; height: number }[];
  intro: string[];
  whatsIncluded: string[];
  signsYouNeedThis: string[];
  faq: ServiceFAQ[];
  membershipTieIn: string;
  relatedServiceSlugs: string[];
  /**
   * Optional pricing. costKey maps to a single preset in
   * client/src/lib/remodelCost.ts and shows a "what it typically costs" band +
   * the embedded estimator (locked to this project). costHub names a pricing
   * category ("remodel" or "adu") and shows the bands + estimator for every
   * project in that category (used on the remodeling and ADU overview pages).
   * Leave both unset on pages we do not price.
   */
  costKey?: string;
  costHub?: "remodel" | "adu";
  /** Official rules/permitting links shown in a "Rules & resources" section. */
  resources?: { label: string; url: string }[];
  /**
   * Optional "How the process works" section: the phases a project moves
   * through, in order, with a planning timeframe and what the homeowner decides
   * or provides in each. Used on big-ticket pages (ADUs, additions, remodels)
   * so clients know what to expect before the first meeting.
   */
  process?: {
    intro: string;
    steps: ProcessStep[];
    /** Honest note on what moves the timeline, shown under the steps. */
    note?: string;
  };
}

export interface ProcessStep {
  title: string;
  /** Planning range, e.g. "2 to 4 weeks". Never a promise; the written schedule sets dates. */
  timeframe: string;
  detail: string;
  /** What the homeowner decides or provides in this phase. */
  youDecide?: string;
}

/**
 * Official ADU rules and permitting sources (state, county, local cities), shared
 * across the ADU pages. We link these so homeowners can verify the rules for
 * their own address; ADU regulations vary by jurisdiction and keep changing.
 * All URLs verified live 2026-06-29.
 */
export const ADU_RESOURCES: { label: string; url: string }[] = [
  { label: "Washington State: ADU law (RCW 36.70A.681, from HB 1337)", url: "https://app.leg.wa.gov/RCW/default.aspx?cite=36.70A.681" },
  { label: "Washington State Dept. of Commerce: Accessory Dwelling Units", url: "https://www.commerce.wa.gov/growth-management/housing-planning/adus/" },
  { label: "Clark County (unincorporated): ADUs and Cottage Housing", url: "https://clark.wa.gov/community-planning/adus-and-cottage-housing" },
  { label: "City of Vancouver: Accessory Dwelling Units", url: "https://www.cityofvancouver.us/business/building-construction/residential-building-permits/accessory-dwelling-units/" },
  { label: "City of Camas", url: "https://www.cityofcamas.us/" },
  { label: "City of Washougal", url: "https://www.cityofwashougal.us/" },
  { label: "City of Ridgefield", url: "https://www.ridgefieldwa.us/" },
  { label: "City of Battle Ground", url: "https://www.cityofbg.org/" },
];

/**
 * Official process sources shared by the ADU and addition pages. All URLs
 * verified live 2026-09-24.
 */
export const BUILD_PROCESS_RESOURCES: { label: string; url: string }[] = [
  { label: "City of Vancouver: Residential Building Permits (the 5-step permit process)", url: "https://www.cityofvancouver.us/business/building-construction/residential-building-permits/" },
  { label: "Clark County: Accessory Dwelling Unit (urban) rules and permit steps", url: "https://clark.wa.gov/community-development/accessory-dwelling-unit-urban" },
  { label: "Clark County: Typical New Home and Remodel Inspections", url: "https://clark.wa.gov/community-development/typical-new-home-and-remodel-inspections" },
  { label: "Washington State: Permit review time limits (RCW 36.70B.080)", url: "https://app.leg.wa.gov/rcw/default.aspx?cite=36.70b.080" },
];

const ADU_TIMELINE_NOTE =
  "Timeframes are planning ranges, not promises. What moves them most: how quickly design decisions get made, whether the permit application is complete the first time (Washington law gives cities and counties 65 days to decide a complete application that needs no public notice), utility and site conditions, and material lead times. Your written schedule sets the real dates.";

/** ADU overview page: the full path from idea to move-in. */
export const ADU_PROCESS: ServiceDef["process"] = {
  intro:
    "Every ADU, whether a conversion, an attached suite, or a detached cottage, moves through the same six phases. Knowing them up front is how you avoid the two most common ADU problems: designing something your lot does not allow, and starting construction before the budget and the permit are both settled.",
  steps: [
    {
      title: "Walkthrough and feasibility",
      timeframe: "1 to 3 weeks",
      detail:
        "We walk the property and check what your specific lot allows: zoning, size limits, setbacks and separation from other buildings, and where water, sewer, and power can come from. In Vancouver the city asks for a Request for Utility Services before a permit application, so utility questions get answered here, not halfway through design. You leave with the ADU type that fits, a planning budget, and the open questions.",
      youDecide: "Your goal (family, rental, office), the type you want to pursue, and a working budget.",
    },
    {
      title: "Plans and engineering (by your designer)",
      timeframe: "4 to 10 weeks",
      detail:
        "Permit-ready plans are drawn by an architect or residential designer, with structural engineering where the project needs it. We do not draw plans or do engineering in-house, and we recommend having them done first, so construction is priced from real drawings instead of a guess. The plan set typically includes a site plan, floor plans, foundation and framing plans, elevations, and the energy code forms Washington requires. Bring us in while the design develops and we will review it for buildability and cost, which is where the big material choices get made.",
      youDecide: "Hire the designer and engineer, then make the layout, window, exterior, heating, and finish choices that go into the plans.",
    },
    {
      title: "Permit application and plan review",
      timeframe: "1 to 3 months",
      detail:
        "The plan set is submitted to the City of Vancouver or Clark County (or your city), and reviewer comments get answered by whoever drew the plans. Vancouver's process runs application, prescreen, technical plan review, approval with final fees, and permit issuance. A complete, well-drawn application is the single biggest thing that keeps this phase short.",
      youDecide: "Sign the application and approve any changes a reviewer asks for.",
    },
    {
      title: "Fixed scope and contract",
      timeframe: "1 to 2 weeks",
      detail:
        "With approved plans in hand, the price is built from the actual drawings, not a guess. You get a written scope, a payment schedule tied to construction milestones, and a start date. Materials with long lead times, like windows and cabinets, get ordered now.",
      youDecide: "Final selections and signing the contract.",
    },
    {
      title: "Construction and inspections",
      timeframe: "2 to 8 months, by type",
      detail:
        "The build runs in the order the inspectors check it: foundation, framing, rough plumbing, mechanical, and electrical, insulation, drywall, then finishes. Each inspection has to pass before the next stage is covered up. A conversion is the shortest build because the shell exists; a detached unit is the longest because it starts from bare ground.",
      youDecide: "Walkthroughs at key milestones and any change you want to make, in writing, before it is built.",
    },
    {
      title: "Final inspection and move-in",
      timeframe: "1 to 2 weeks",
      detail:
        "Final inspection closes the permit, and in unincorporated Clark County a Certificate of Occupancy comes before anyone moves in. You get a walkthrough of the finished unit, the documents and warranties, and a record of what was built and where, which matters for rental, insurance, and resale.",
      youDecide: "Your final walkthrough punch list.",
    },
  ],
  note: ADU_TIMELINE_NOTE,
};

/** Garage and basement conversions. */
export const ADU_CONVERSION_PROCESS: ServiceDef["process"] = {
  intro:
    "A conversion is the fastest ADU path because the walls, roof, and foundation already exist. The work is making an unheated space into a legal home, and that is where the code details decide the project.",
  steps: [
    {
      title: "Walkthrough and feasibility",
      timeframe: "1 to 3 weeks",
      detail:
        "We check the space against what a living unit needs. In Vancouver, converted living space needs a finished ceiling of at least 6 feet 8 inches and legal egress windows, and each unit needs its own lockable door. We also look at the slab, moisture, and how plumbing will reach the new bathroom and kitchen, since that often sets the budget.",
      youDecide: "Whether the garage or basement is worth converting versus another ADU type.",
    },
    {
      title: "Plans (by your designer)",
      timeframe: "3 to 6 weeks",
      detail:
        "A designer draws the permit plans, with engineering if walls or openings change structurally. We do not draw plans in-house, and we recommend having them done before construction pricing. The plans show the new layout, egress, insulation, and heating. A garage becoming heated space must be brought fully up to the Washington State Energy Code, so walls, ceiling, and often the floor get insulated to current standards, and the garage door opening is usually framed in as a wall with windows.",
      youDecide: "Hire the designer, then choose the layout, kitchen size, finish level, and how the old garage door opening becomes a wall.",
    },
    {
      title: "Permit and plan review",
      timeframe: "1 to 3 months",
      detail:
        "The plans go to your city or the county for review. If the unit shares utilities with the main house, Vancouver requires separate shutoffs for each unit and independent temperature control, and a water meter worksheet comes with the permit.",
      youDecide: "Approve any reviewer-driven changes.",
    },
    {
      title: "Construction and inspections",
      timeframe: "2 to 4 months",
      detail:
        "Framing and egress openings, rough plumbing and electrical, insulation, drywall, then the kitchen, bath, flooring, and trim. Inspections sign off each stage before it is closed in.",
      youDecide: "Milestone walkthroughs and final selections on time so the schedule holds.",
    },
    {
      title: "Final inspection and move-in",
      timeframe: "1 to 2 weeks",
      detail: "Final inspection closes the permit. You get the documents, warranties, and a record of the work for rental and resale.",
    },
  ],
  note: ADU_TIMELINE_NOTE,
};

/** Attached ADUs and mother-in-law suites. */
export const ADU_ATTACHED_PROCESS: ServiceDef["process"] = {
  intro:
    "An attached suite is part addition, part ADU. It ties into the house's roof, walls, and systems, so the plan has to protect both homes: the new suite and the one you are living in during the build.",
  steps: [
    {
      title: "Walkthrough and feasibility",
      timeframe: "1 to 3 weeks",
      detail:
        "We confirm where the suite can go on your lot, how its roofline meets the house, and how it gets its own entrance. We also plan the separation between the two homes. In Vancouver, an attached ADU needs 1-hour fire-rated construction and a sound rating (STC/IIC 45) between the units, and each unit needs its own lockable door.",
      youDecide: "Where the suite goes, how it connects to the house, and your budget.",
    },
    {
      title: "Plans and engineering (by your designer)",
      timeframe: "4 to 8 weeks",
      detail:
        "An architect or residential designer draws the plan set, with structural engineering for the foundation and roof tie-in. We do not draw plans or do engineering in-house, and we recommend having them done first so construction is priced from real drawings. The plans cover the foundation, framing, roof tie-in, fire and sound separation, and energy code forms, and this is where exterior materials get chosen to match the house.",
      youDecide: "Hire the designer and engineer, then choose the layout, kitchen or kitchenette, bathroom, and exterior finishes.",
    },
    {
      title: "Permit and plan review",
      timeframe: "1 to 3 months",
      detail: "The plans go to your city or the county for review, reviewer comments get answered, and final fees are paid at approval. The permit is issued before any work starts.",
      youDecide: "Approve any changes a reviewer asks for.",
    },
    {
      title: "Construction and inspections",
      timeframe: "4 to 6 months",
      detail:
        "Foundation, framing, and the roof tie-in come first so the house is weather-tight again as fast as possible. Then rough plumbing, mechanical, and electrical, insulation, drywall, and finishes, with an inspection at each stage.",
      youDecide: "Plan for noise and access on the side of the house being built on; we stage the work to keep the rest of the home usable.",
    },
    {
      title: "Final inspection and move-in",
      timeframe: "1 to 2 weeks",
      detail: "Final inspection closes the permit. You get the documents, warranties, and a record of the build.",
    },
  ],
  note: ADU_TIMELINE_NOTE,
};

/** Detached ADUs: the full ground-up sequence. */
export const ADU_DETACHED_PROCESS: ServiceDef["process"] = {
  intro:
    "A detached ADU is a complete small house, so it follows the same sequence as any new home, only smaller. Here is every phase in order, with the inspection points that set the pace of the build.",
  steps: [
    {
      title: "Walkthrough and site feasibility",
      timeframe: "1 to 3 weeks",
      detail:
        "We check where the unit can sit: setbacks, size limits (Vancouver and unincorporated Clark County both cap most ADUs at 1,000 square feet), and separation from the house. In Vancouver a detached ADU must be at least 10 feet from other structures, or add sprinklers or fire-rated construction. We also map the utility runs, because trenching water, sewer, and power across a yard is a real part of the cost.",
      youDecide: "Unit size, where it goes in the yard, and your budget.",
    },
    {
      title: "Plans and engineering (by your designer)",
      timeframe: "6 to 10 weeks",
      detail:
        "An architect or residential designer draws the full plan set (site plan, foundation, framing, roof, elevations, and the Washington energy code forms) with structural engineering where needed. We do not draw plans or do engineering in-house, and we recommend having them done first so the build is priced from real drawings. New construction has to earn energy credits under the state energy code, which shapes insulation, windows, and heating choices.",
      youDecide: "Hire the designer and engineer, then choose the floor plan, exterior look, window package, heating type, and finish level.",
    },
    {
      title: "Permit and plan review",
      timeframe: "1 to 3 months",
      detail:
        "The plans go to the city or county for review and reviewer comments get answered. Impact fees for ADUs are reduced by state law: no more than half of what a new house would pay. Vancouver charges 50 percent, and unincorporated Clark County waives 75 percent of its transportation, school, and park impact fees. If the unit needs its own water and sewer connection, connection charges apply.",
      youDecide: "Approve reviewer changes and the final fee total.",
    },
    {
      title: "Site work and foundation",
      timeframe: "3 to 6 weeks",
      detail:
        "Erosion control, excavation, utility trenching, footings, and foundation. Inspectors check setbacks and footing steel before concrete, and footing drains before backfill.",
    },
    {
      title: "Framing, roof, and dry-in",
      timeframe: "3 to 6 weeks",
      detail:
        "Floor, walls, and roof framing, sheathing, windows, and roofing until the unit is weather-tight. In our wet climate, getting to dry-in fast protects everything that follows.",
    },
    {
      title: "Rough-ins, insulation, and drywall",
      timeframe: "4 to 8 weeks",
      detail:
        "Rough plumbing, mechanical, and electrical, each inspected before the walls close. Then insulation (inspected), drywall, and the drywall nailing inspection.",
    },
    {
      title: "Finishes and exterior",
      timeframe: "4 to 8 weeks",
      detail: "Cabinets, counters, flooring, tile, trim, paint, fixtures, siding and trim outside, and final grading.",
      youDecide: "Final finish selections on time; late changes are the most common cause of delay.",
    },
    {
      title: "Final inspection and move-in",
      timeframe: "1 to 2 weeks",
      detail:
        "Final inspection closes the permit; in unincorporated Clark County a Certificate of Occupancy comes before anyone lives there. You get the documents, warranties, and a record of the build.",
    },
  ],
  note: ADU_TIMELINE_NOTE,
};

/** Home additions. */
export const ADDITION_PROCESS: ServiceDef["process"] = {
  intro:
    "An addition is new construction attached to a house you are living in. The process protects both: the new space gets built right, and your home is opened to the weather for as short a time as possible.",
  steps: [
    {
      title: "Walkthrough and feasibility",
      timeframe: "1 to 3 weeks",
      detail:
        "We start with the need, not the footprint. Sometimes a remodel of the space you have solves it for less. When an addition is the answer, we check setbacks and zoning for your lot, how the new roof meets the old one, and what the existing foundation and framing will support.",
      youDecide: "What the new space has to do, and a working budget.",
    },
    {
      title: "Plans and engineering (by your designer)",
      timeframe: "4 to 8 weeks",
      detail:
        "An architect or residential designer draws the permit plans, with structural engineering for the foundation and roof tie-in. We do not draw plans or do engineering in-house, and we recommend having them done first so construction is priced from real drawings. The plan set includes a site plan, foundation and framing plans, wall sections, elevations, lateral (wind and earthquake) bracing or engineering, and energy code forms. Additions over 150 square feet have to earn energy credits under the Washington State Energy Code, which shapes insulation, windows, and heating.",
      youDecide: "Hire the designer and engineer, then choose the layout, windows, how the exterior matches the house, and finish level.",
    },
    {
      title: "Permit and plan review",
      timeframe: "1 to 3 months",
      detail:
        "In Vancouver an addition needs a residential building permit with a stormwater form, energy code compliance, and the full plan set. In unincorporated Clark County, additions fall under the Additional Dwelling or Structure (ADS) permit, which bundles the plumbing, mechanical, and connection permits.",
      youDecide: "Approve any reviewer-driven changes.",
    },
    {
      title: "Fixed scope and contract",
      timeframe: "1 to 2 weeks",
      detail: "Pricing built from approved drawings, a written scope, a milestone payment schedule, and a start date. Long-lead materials get ordered.",
      youDecide: "Final selections and signing.",
    },
    {
      title: "Construction and inspections",
      timeframe: "3 to 6 months",
      detail:
        "Foundation, framing, roof tie-in, and dry-in first, so the opening into your home is closed quickly. Then rough plumbing, mechanical, and electrical, insulation, drywall, and finishes, with an inspection at each stage. We break through into the existing house as late as practical to keep dust and weather out.",
      youDecide: "Plan for noise and access near the work area.",
    },
    {
      title: "Final inspection and handoff",
      timeframe: "1 to 2 weeks",
      detail: "Final inspection closes the permit. You get the documents, warranties, and a record of what was built.",
    },
  ],
  note:
    "Timeframes are planning ranges, not promises. Design decisions, a complete permit application, weather during the dry-in, and material lead times move them most. Your written schedule sets the real dates.",
};

export const SERVICES: ServiceDef[] = [
  {
    slug: "remodeling",
    name: "Remodeling",
    serviceType: "Home Remodeling",
    h1: "Remodeling in Clark County, WA",
    seoTitle: "Remodeling in Vancouver WA | Kitchen, Bath & Whole-Home | Handy Pioneers",
    seoDesc:
      "Remodeling for Clark County, WA: kitchens, baths, and whole-home projects, one accountable team, one written plan before work starts. Serving Vancouver WA.",
    image: "https://handypioneers.com/images/blog/service-remodeling.webp",
    imageAlt: "A bright, freshly remodeled open living space in a Clark County home",
    intro: [
      "A remodel is one of the largest investments you make in your home, and the difference between a good one and a regret is almost never the cabinets or the tile. It is the planning, the sequencing, and whether one team stands behind the whole result.",
      "Handy Pioneers runs remodels for Clark County homeowners as a single accountable engagement: we assess the space, document a written scope before anything is torn out, and coordinate every trade so the finish lines up the way it should. Whether you are reworking one room or the whole house, you have one point of contact from the first walkthrough to the final detail.",
      "We also do not see a remodel as a one-and-done job. The real value is a home looked after over time, not a single project, so most homeowners we work with stay with us afterward through the 360 Method: proactive, year-round care that protects what you just invested in. A remodel is often where that partnership starts.",
    ],
    whatsIncluded: [
      "An on-site walkthrough and a written scope of work before demolition",
      "Layout, materials, and finish selection guidance matched to your home",
      "Coordination of every trade involved, managed through one point of contact",
      "Careful finish carpentry, tile, and trim, where the details actually show",
      "A documented project record you keep for resale and warranty",
    ],
    signsYouNeedThis: [
      "A layout that fights how you actually live in the space",
      "Dated finishes dragging down the feel and value of the whole home",
      "Water damage or soft spots discovered behind a vanity, under a sink, or in a wall",
      "You want one team accountable for the result, not a string of separate trades",
    ],
    faq: [
      {
        q: "What kinds of remodels do you handle?",
        a: "Kitchens, bathrooms, and whole-home projects, along with the flooring, trim, and finish work that ties a remodel together. For a single space, start with our kitchen remodeling or bathroom remodeling pages; for a larger project, we plan and sequence the whole thing as one engagement.",
      },
      {
        q: "Do you provide a written plan before work starts?",
        a: "Yes. Every remodel starts with an on-site consultation and a written scope of work so you know exactly what is being done, and why, before a single thing is torn out.",
      },
      {
        q: "Who manages the different trades on a remodel?",
        a: "We do. You have one point of contact from the first walkthrough to the final detail, and we coordinate the licensed specialists each phase requires.",
      },
      {
        q: "What areas do you remodel in?",
        a: "All of Clark County, WA, including Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and La Center.",
      },
    ],
    membershipTieIn:
      "After a remodel, the Proactive Path membership keeps the new work documented and maintained so it holds its value.",
    relatedServiceSlugs: ["kitchen-remodel", "bathroom-remodel", "home-additions", "flooring", "carpentry-trim", "built-ins"],
    costHub: "remodel",
  },
  {
    slug: "kitchen-remodel",
    name: "Kitchen Remodeling",
    serviceType: "Kitchen Remodeling",
    h1: "Kitchen Remodeling in Vancouver, WA & Clark County",
    seoTitle: "Kitchen Remodeling in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Kitchen remodeling for Clark County, WA: a written plan before demolition, one team coordinating every trade, and finish work that holds up.",
    image: "https://handypioneers.com/images/blog/service-kitchen-remodel.webp",
    imageAlt: "A remodeled kitchen with white shaker cabinets, a quartz island, and pendant lights",
    intro: [
      "The kitchen is the room a remodel is most often judged by, and the one where a rushed job shows the fastest: cabinet doors that do not line up, a counter seam in the wrong place, an island you have to squeeze around. A good kitchen remodel is decided long before the first cabinet goes in, in the layout and the sequence.",
      "Handy Pioneers remodels kitchens for Vancouver and Clark County homeowners as one accountable project. We assess the space, put a written scope and a clear order of work on paper before anything is torn out, and coordinate the cabinetry, counters, plumbing, electrical, and finish work so it all lands the way it should.",
      "And we are not a one-and-done crew. A new kitchen is an investment worth protecting, so most homeowners we remodel for stay with us afterward through the 360 Method: proactive, year-round care that keeps the new work, and the rest of the home, holding its value. The remodel is where the partnership starts.",
    ],
    whatsIncluded: [
      "An on-site walkthrough and a written scope of work before demolition",
      "Layout and workflow planning, so the finished kitchen fits how you cook and live",
      "Cabinetry, countertops, backsplash, and fixture coordination through one point of contact",
      "Plumbing and electrical updates handled by the licensed trades each phase requires",
      "Careful finish carpentry and tile, and a documented record you keep for resale",
    ],
    signsYouNeedThis: [
      "A layout that wastes steps or leaves you short on counter and storage",
      "Dated cabinets and finishes pulling down the feel and value of the whole home",
      "Water damage or soft spots found under the sink or behind the cabinets",
      "You want one team accountable for the result, not a string of separate trades",
    ],
    faq: [
      {
        q: "How long does a kitchen remodel take?",
        a: "Most kitchen remodels run several weeks from demolition to final finish, depending on the scope and how much the layout and systems change. We give you a realistic timeline in the written scope before work starts, and one point of contact to keep it on track.",
      },
      {
        q: "What should I budget for a kitchen remodel?",
        a: "Kitchen budgets vary widely with the size of the room, the materials you choose, and whether the layout, plumbing, or electrical change. Rather than quote a number sight unseen, we walk the space and put a written scope and price on paper so you can decide with the full picture in front of you.",
      },
      {
        q: "Do you provide a written plan before work starts?",
        a: "Yes. Every kitchen remodel starts with an on-site consultation and a written scope of work, so you know exactly what is being done, and in what order, before a single cabinet comes out.",
      },
      {
        q: "What areas do you remodel kitchens in?",
        a: "All of Clark County, WA, including Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and La Center.",
      },
    ],
    membershipTieIn:
      "After a kitchen remodel, the Proactive Path membership keeps the new work documented and maintained so it holds its value.",
    relatedServiceSlugs: ["bathroom-remodel", "cabinet-installation", "remodeling", "carpentry-trim"],
    costKey: "kitchen",
  },
  {
    slug: "bathroom-remodel",
    name: "Bathroom Remodeling",
    serviceType: "Bathroom Remodeling",
    h1: "Bathroom Remodeling in Vancouver, WA & Clark County",
    seoTitle: "Bathroom Remodeling in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Bathroom remodeling built for the wet Pacific Northwest: proper waterproofing, a written plan, and one team coordinating every trade. Clark County, WA.",
    image: "https://handypioneers.com/images/blog/service-bathroom-remodel.webp",
    imageAlt: "A serene remodeled bathroom with a tiled walk-in shower and floating vanity",
    intro: [
      "A bathroom is the most water-exposed room in the house, and in our climate that is exactly why the parts you cannot see matter most. The difference between a bathroom remodel that lasts and one that fails early is the waterproofing behind the tile and the way the plumbing is detailed, not the fixtures on the showroom floor.",
      "Handy Pioneers remodels bathrooms for Vancouver and Clark County homeowners with a written plan and one accountable team. We assess the space, document the scope before demolition, and coordinate the waterproofing, plumbing, tile, and finish work so the room looks right and stays dry behind the walls.",
      "We are also not a one-and-done crew. In a wet climate especially, a new bathroom is worth protecting, so most homeowners we remodel for stay with us through the 360 Method: proactive, year-round care that keeps the seals, the finish, and the rest of the home sound. The remodel is where the partnership starts.",
    ],
    whatsIncluded: [
      "An on-site walkthrough and a written scope of work before demolition",
      "Proper waterproofing and substrate prep behind tile and in the shower",
      "Plumbing and fixture updates handled by the licensed trades each phase requires",
      "Tile, vanity, lighting, and ventilation coordinated through one point of contact",
      "A documented project record you keep for resale and warranty",
    ],
    signsYouNeedThis: [
      "A dated or cramped layout that no longer fits the household",
      "Soft flooring, loose tile, or staining that points to water getting where it should not",
      "A shower or tub surround that leaks, cracks, or never feels clean",
      "Poor ventilation leaving the room damp and prone to mold",
    ],
    faq: [
      {
        q: "What makes a bathroom remodel last in the Pacific Northwest?",
        a: "Waterproofing and ventilation. In a wet climate, the membrane behind the tile, the way the shower is sloped and sealed, and a fan that actually clears the moisture are what keep a beautiful bathroom from quietly rotting behind the walls. We treat those as the foundation of the job, not an afterthought.",
      },
      {
        q: "How long does a bathroom remodel take?",
        a: "Most bathroom remodels run a few weeks depending on scope, with extra time when the layout or plumbing moves. We give you a realistic timeline in the written scope before work begins.",
      },
      {
        q: "What should I budget for a bathroom remodel?",
        a: "It depends on the size of the room, the materials, and whether the plumbing or layout changes. Rather than guess, we walk the space and put a written scope and price on paper so you can decide with the full picture in front of you.",
      },
      {
        q: "What areas do you remodel bathrooms in?",
        a: "All of Clark County, WA, including Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and La Center.",
      },
    ],
    membershipTieIn:
      "After a bathroom remodel, the Proactive Path membership keeps an eye on the seals, caulk, and ventilation so the new work stays sound.",
    relatedServiceSlugs: ["kitchen-remodel", "remodeling", "flooring", "rot-repair"],
    costKey: "bath",
  },
  {
    slug: "home-repair",
    name: "Home Repair",
    serviceType: "Home Repair",
    h1: "Home Repair in Vancouver, WA",
    seoTitle: "Home Repair in Vancouver WA | Clark County Repairs | Handy Pioneers",
    seoDesc:
      "Home repair in Vancouver WA and all of Clark County: rot, siding, decks, doors, drywall, gutters, and the running list that never shrinks. One accountable team, written scope before work starts.",
    image: "https://handypioneers.com/images/blog/5-home-repairs-clark-county-homeowners-keep-putting-off.webp",
    imageAlt: "A Clark County home being repaired, with exterior trim and siding work underway",
    intro: [
      "Most home repair in Vancouver starts the same way: a running list. A door that sticks, trim going soft at the corner, a stain on the ceiling nobody has traced yet, a rail that moves when you lean on it. None of it is urgent enough to interrupt a week, so the list grows, and the items on it quietly get more expensive.",
      "Handy Pioneers takes that whole list. One team, one point of contact, one written scope before anything starts, so you are not vetting a different company for every line. We repair what is actually wrong rather than covering the symptom, which in this climate usually means finding where water is getting in before we restore what it damaged.",
      "The part most homeowners end up valuing more is what happens after. We keep the record of your home, so the next repair starts with context instead of a cold walkthrough. That is the 360° Method: assess every system, document its condition, and work a prioritized NOW / SOON / WAIT plan so the list stops growing faster than you can work it.",
    ],
    whatsIncluded: [
      "Exterior repair: rot and wood damage, siding, trim, decks, railings, and fencing",
      "Interior repair: drywall, doors, casing and baseboard, flooring transitions, and hardware that no longer sits right",
      "Water intrusion traced to its source, then the damaged material restored to standard",
      "Gutters, downspouts, and the drainage that keeps Pacific Northwest rain away from the foundation",
      "The accumulated small list handled in one visit rather than spread across a season",
      "A written scope and a price on paper before any work begins, priced by the project",
    ],
    signsYouNeedThis: [
      "A list of small items that has not moved in months because no single one justifies a call",
      "Soft or discolored wood at trim, thresholds, deck boards, or the base of posts",
      "Doors and windows that stick, drag, or no longer latch the way they used to",
      "Staining on a ceiling or wall, or a smell of damp that comes back every wet season",
    ],
    faq: [
      {
        q: "What does home repair in Vancouver WA typically cover?",
        a: "For most Clark County homes it is exterior and interior repair on the structure and finishes: rot and wood damage, siding and trim, decks and railings, drywall, doors, flooring, gutters, and drainage. We take the whole running list in one engagement rather than one item at a time, and we put a written scope in front of you before work begins.",
      },
      {
        q: "Do you handle small repairs, or only large projects?",
        a: "Both. A short list of small items is one of the most common reasons homeowners call us, and handling them together in a single visit is far more efficient than scheduling each one separately. Larger structural repair and full remodels run through the same team.",
      },
      {
        q: "How do you price home repair?",
        a: "By the project, never by the hour. We walk the work, put a written scope and price on paper, and you decide with the full picture in front of you. You are not watching a clock or wondering what the number will be at the end.",
      },
      {
        q: "Is there anything you do not repair?",
        a: "We work on the house itself: structure, exterior, finishes, and fixtures. We do not service household appliances, and we do not take on licensed electrical or HVAC service work. If something falls outside what we do, we will tell you plainly on the walkthrough rather than take the job.",
      },
      {
        q: "What areas do you serve for home repair?",
        a: "All of Clark County, WA, including Vancouver, Camas, Washougal, Ridgefield, Battle Ground, Salmon Creek, Felida, and La Center.",
      },
    ],
    membershipTieIn:
      "Home repair is where most of our members start. The Proactive Path keeps the list from rebuilding itself: the home is assessed on a schedule, small items are caught while they are still small, and you stop being the one who has to notice.",
    relatedServiceSlugs: ["rot-repair", "deck-repair", "carpentry-trim", "property-maintenance"],
  },
  {
    slug: "deck-repair",
    name: "Deck Repair & Rebuild",
    serviceType: "Deck Repair and Rebuilding",
    h1: "Deck Repair & Rebuild in Clark County, WA",
    seoTitle: "Deck Repair & Rebuild in Vancouver WA | Rot, Structural, Ledger | Handy Pioneers",
    seoDesc:
      "Deck repair and rebuilds for PNW homes: rotted boards and framing, structural fixes, ledger repair, and full rebuilds. Vancouver WA and Clark County.",
    image: "https://handypioneers.com/images/blog/deck-water-damage-signs-camas.webp",
    imageAlt: "A deck being repaired, with framing and ledger connection exposed",
    intro: [
      "In the Pacific Northwest a deck spends eight months a year wet, and the damage almost never starts where you can see it. It starts underneath, at the joists, the posts, and the ledger board where the deck bolts to the house. By the time a board feels soft, the structure beneath it is often the real problem.",
      "We repair and rebuild decks with the structure first: failing joists, posts, and footings, and the ledger connection that is the single most common cause of deck collapses. When a deck is too far gone to patch safely, we rebuild it right, sized and flashed for this climate, so you are not paying to chase the same rot every few years.",
      "A deck is also part of how your home lives and what it is worth. We would rather build you one that lasts and then keep an eye on it than sell you a quick fix that fails. That is the 360 Method: a partner in the home, not a one-time repair.",
    ],
    whatsIncluded: [
      "A structural inspection: joists, beams, posts, footings, and the ledger-to-house connection",
      "Ledger board repair or replacement with proper flashing, the most safety-critical part of a deck",
      "Replacement of rotted or unsafe framing and decking",
      "Railings, stairs, and fasteners corrected to a safe, solid standard",
      "Full tear-out and rebuild when a deck is past repair, with a written scope before any work",
    ],
    signsYouNeedThis: [
      "A board, stair, or section that flexes, gives, or feels spongy underfoot",
      "The deck pulling away from the house, or a ledger board with rust streaks or movement",
      "Posts or stair stringers soft at the base, or footings that have shifted or heaved",
      "Wobbly railings, popped fasteners, or gray and black rot spreading from the joints",
    ],
    faq: [
      {
        q: "Do you repair decks or rebuild them?",
        a: "Both, and the inspection decides which. If the structure is sound, we replace the failed parts and make it safe. If the framing, posts, or ledger are too far gone, repairing it just buys a year, so we rebuild it properly. We put a written scope and a range in front of you before any work starts.",
      },
      {
        q: "What is a ledger board and why does it matter so much?",
        a: "The ledger is the board that attaches the deck to your house. A bad or rotted ledger connection is the leading cause of deck collapses. We inspect it on every deck, and repair or replace it with proper flashing so water cannot get behind it again.",
      },
      {
        q: "How much does a deck rebuild cost?",
        a: "A full rebuild runs roughly $10,000 to $30,000 and up depending on size, material, and height, and you can estimate yours with the calculator on this page. Rot and structural repairs vary too much to price sight unseen, so we scope those on a walkthrough.",
      },
    ],
    membershipTieIn:
      "Proactive Path members get the deck structure and ledger checked on schedule, so a small repair never becomes a rebuild or a safety problem.",
    relatedServiceSlugs: ["rot-repair", "carpentry-trim", "exterior-painting"],
    costKey: "deck-rebuild",
  },
  {
    slug: "rot-repair",
    name: "Rot Repair",
    serviceType: "Wood Rot Repair",
    h1: "Wood Rot Repair in Clark County, WA",
    seoTitle: "Dry Rot & Wood Rot Repair in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Wood rot repair for Pacific Northwest homes: trim, siding, decks, door frames, and the framing behind them. We fix the cause, not the symptom.",
    image: "https://handypioneers.com/images/porch-post-before-after-camas-16x9-2026-08.webp",
    imageAlt: "Before and after of a Camas, WA porch post: dry rot marked at the split base, then the rebuilt and painted column plinth",
    intro: [
      "Wood rot is the defining maintenance problem of a wet climate. Decay fungi need sustained moisture to grow, and a Pacific Northwest winter supplies it for months at a stretch. Left alone, a soft spot in trim becomes a soft spot in the wall behind it.",
      "We repair rot at the source: find where the water is getting in, replace what has failed, and protect the new work so it does not come back next season.",
    ],
    whatsIncluded: [
      "Tracing the moisture path so the cause is fixed, not just the surface",
      "Replacement of rotted trim, siding, fascia, sills, and framing",
      "Porch and column repair, including posts set straight into the concrete",
      "Correcting the detail that caused it: standoff bases, flashing, and drainage",
      "Repair around windows, doors, and roof-to-wall connections",
      "Priming and sealing of new wood before the wet season returns",
    ],
    signsYouNeedThis: [
      "Soft, crumbling, or discolored wood at trim, sills, or siding",
      "Paint that bubbles or peels in the same spot every year",
      "A screwdriver that sinks into exterior wood with light pressure",
      "Porch or deck posts sitting flush on concrete instead of raised on a metal base",
      "A dark tide line in the first few inches above a porch slab",
      "Dark staining or a musty smell near a window or door frame",
    ],
    faq: [
      {
        q: "What causes wood rot in the Pacific Northwest?",
        a: "Sustained moisture. Decay fungi need wood that stays damp, and our long wet season keeps shaded, poorly drained wood wet long enough to rot. Keeping wood sealed and drained is what prevents it.",
      },
      {
        q: "Do you fix what caused the rot, or just the visible damage?",
        a: "Both. Replacing soft wood without fixing the water path just buys a year. We find where the moisture is getting in and correct that as part of the repair.",
      },
      {
        q: "Why do porch posts rot at the bottom?",
        a: "Almost always because the post is set directly into the concrete with nothing between them. Concrete is porous, so it absorbs water and wicks it into the wood it touches, and the cut end grain at the base of a post soaks it up fastest. Debris packs into the seam and holds the moisture there, so the base never dries out between rains. The fix is to get the post up off the slab.",
      },
      {
        q: "What is a standoff post base, and does code require one?",
        a: "A standoff post base is a galvanized bracket that anchors a post to concrete while holding it about an inch clear of the surface, so air can move underneath and water drains away. The IRC requires exterior wood columns to be naturally decay resistant or pressure treated, and exempts columns supported on a pier or metal pedestal that projects at least an inch above the concrete. That inch is the whole point, and it is what is missing on most porches we open up.",
      },
      {
        q: "Can you just replace the rotted trim around my porch posts?",
        a: "We can, but if the structural post underneath is still standing in a wet pocket, that is covering the problem rather than ending it. The rot keeps climbing behind the new paint. We would rather tell you that up front and fix the base while we are already there.",
      },
    ],
    membershipTieIn:
      "Catching rot early is exactly what the Proactive Path seasonal checks are built to do, before it spreads into the structure.",
    relatedServiceSlugs: ["deck-repair", "exterior-painting", "gutter-services"],
  },
  {
    slug: "exterior-painting",
    name: "Exterior Painting",
    serviceType: "Exterior Painting",
    h1: "Exterior Painting in Clark County, WA",
    seoTitle: "Exterior House Painting in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Exterior painting done right for the PNW climate: proper prep, the right weather window, and a finish that protects your siding for years. Clark County.",
    image: "https://handypioneers.com/images/blog/best-time-paint-house-exterior-clark-county.webp",
    imageAlt: "Freshly painted home exterior siding",
    intro: [
      "Good exterior paint in our climate is less about the product on the can and more about the conditions the day it goes up. Paint applied to damp siding or finished as the temperature drops fails early, and it fails in ways that cost more to fix later.",
      "We prep properly, work within the weather window our climate actually allows, and protect your siding with a finish built to shed the next several winters.",
    ],
    whatsIncluded: [
      "Washing, scraping, and full surface prep before any paint goes on",
      "Repair of failing caulk lines and minor rot before painting",
      "Quality coatings applied within the right temperature and dew-point window",
      "Clean lines on trim, doors, and detail work",
    ],
    signsYouNeedThis: [
      "Fading, chalking, or peeling on the sunniest or wettest walls",
      "Bare or gray wood showing through worn paint",
      "Caulk lines that have cracked or pulled away",
      "It has been close to a decade since the last full exterior coat",
    ],
    faq: [
      {
        q: "When is the best time to paint a house exterior in Washington?",
        a: "Roughly late June through mid-September: several dry days in a row, surfaces fully dry, and overnight temperatures warm enough for the paint to keep curing. The dependable window here is shorter than most homeowners expect, which is why it books up.",
      },
      {
        q: "Do you prep, or just paint?",
        a: "Prep is most of the job. We wash, scrape, address failing caulk and minor rot, and make sure the surface is dry and sound before a finish coat goes on.",
      },
    ],
    membershipTieIn:
      "Members get exterior surfaces inspected each year, so small paint failures get caught before bare wood starts taking on water.",
    relatedServiceSlugs: ["interior-painting", "rot-repair", "pressure-washing"],
  },
  {
    slug: "interior-painting",
    name: "Interior Painting",
    serviceType: "Interior Painting",
    h1: "Interior Painting in Clark County, WA",
    seoTitle: "Interior House Painting in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Interior painting with careful prep, clean lines, and a tidy job site. Walls, trim, ceilings, and cabinets for Vancouver WA and Clark County homeowners.",
    image: "https://handypioneers.com/images/blog/service-interior-painting.webp",
    imageAlt: "A freshly painted interior room",
    intro: [
      "Interior painting is the fastest way to make a home feel cared for, and the easiest place to tell a careful crew from a rushed one. The difference is in the prep, the cut lines, and how the space is left at the end of the day.",
      "We paint walls, trim, ceilings, and cabinets with proper masking, clean edges, and a job site kept tidy from start to finish.",
    ],
    whatsIncluded: [
      "Surface prep: patching, sanding, and priming where needed",
      "Careful masking and protection of floors and furnishings",
      "Walls, ceilings, trim, doors, and cabinet refinishing",
      "Clean cut lines and a tidy site at the end of every day",
    ],
    signsYouNeedThis: [
      "Scuffed, marked, or dated wall color throughout the home",
      "Trim and doors that have yellowed or chipped",
      "A room or whole home you want refreshed before listing or after moving in",
      "Cabinets you would rather refinish than replace",
    ],
    faq: [
      {
        q: "Do you move and protect furniture?",
        a: "Yes. We mask and protect floors and furnishings, and keep the work area tidy so the home stays livable through the project.",
      },
    ],
    membershipTieIn:
      "Touch-ups and high-wear areas are easy to keep ahead of as part of an ongoing Proactive Path relationship.",
    relatedServiceSlugs: ["remodeling", "carpentry-trim", "exterior-painting"],
    costKey: "interior-paint",
  },
  {
    slug: "flooring",
    name: "Flooring",
    serviceType: "Flooring Installation",
    h1: "Flooring Installation in Clark County, WA",
    seoTitle: "Flooring Installation in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Flooring installation and replacement for Clark County, WA: hard surface, tile, and more, installed level and built to last. Serving Vancouver WA.",
    image: "https://handypioneers.com/images/hero-gallery/ryLhHcoLDKcrOody.jpg",
    imageSize: { width: 1440, height: 1440 },
    imageAlt: "Before and after of a living room: worn carpet (top) replaced with wood-look plank flooring, with recessed lighting and an updated fireplace (bottom)",
    moreImages: [
      {
        src: "/images/hero-gallery/VzlGuBOWFXHnpjig.jpg",
        alt: "Before and after of a living room and kitchen opening: old carpet and dark trim replaced with wood-look plank flooring, white trim, and fresh paint",
        caption: "Living room and entry, carpet out and plank flooring in, with new trim and paint",
        width: 1440,
        height: 1440,
      },
      {
        src: "/images/lvp-bedroom-before-after-2026-09.webp",
        alt: "Before and after of a rental bedroom: worn patterned vinyl replaced with gray luxury vinyl plank flooring",
        caption: "A rental bedroom refloored with luxury vinyl plank, ready for the next tenant",
        width: 1536,
        height: 1024,
      },
    ],
    intro: [
      "Flooring is the surface you live on every day, and a poor install shows itself fast: gaps, squeaks, lippage, and edges that lift. The substrate prep matters as much as the material.",
      "We install and replace flooring with the prep and care that make it sit flat, transition cleanly, and last.",
    ],
    whatsIncluded: [
      "Removal and disposal of old flooring",
      "Subfloor assessment, leveling, and moisture check",
      "Installation of hard-surface, tile, and other materials",
      "Clean transitions, trim, and finish detail",
    ],
    signsYouNeedThis: [
      "Flooring that is worn, lifting, or water-damaged",
      "Squeaks, soft spots, or an uneven surface underfoot",
      "A remodel or refresh where the floor needs to tie the rooms together",
    ],
    faq: [
      {
        q: "Do you check the subfloor before installing?",
        a: "Always. We assess and level the subfloor and check for moisture before any new flooring goes down, because that is what determines whether the finished floor lasts.",
      },
    ],
    membershipTieIn:
      "Spotting a slow leak or moisture under flooring early is part of what the Proactive Path is built to catch.",
    relatedServiceSlugs: ["remodeling", "carpentry-trim", "rot-repair"],
    costKey: "flooring",
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    serviceType: "Pressure Washing",
    h1: "Pressure Washing in Clark County, WA",
    seoTitle: "Pressure Washing in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Pressure washing for PNW homes: driveways, decks, siding, and walkways cleared of the moss and grime our climate grows. Vancouver WA and Clark County.",
    image: "https://handypioneers.com/images/blog/pressure-washing-3-driveways-in-one-week-vancouver.webp",
    imageAlt: "A driveway being pressure washed clean",
    intro: [
      "Moss and grime are not just unsightly here, they hold moisture against the surfaces they grow on. On concrete that means accelerated wear; on wood and siding it means a head start for rot.",
      "We clear driveways, decks, siding, and walkways of the buildup a Pacific Northwest year leaves behind, and do it without driving water where it does not belong.",
    ],
    whatsIncluded: [
      "Driveways, walkways, and patios",
      "Decks and fences, cleaned at the right pressure for the wood",
      "House siding and exterior surfaces",
      "Moss treatment where it has taken hold",
    ],
    signsYouNeedThis: [
      "Green or black growth spreading across concrete and pavers",
      "A deck or fence gone gray and grimy",
      "Siding streaked with algae on the shaded sides",
      "Slippery walkways heading into the wet season",
    ],
    faq: [
      {
        q: "Will pressure washing damage my deck or siding?",
        a: "Not when it is done at the right pressure for the surface. Wood and some sidings need a gentler approach than concrete, which is why technique matters as much as equipment.",
      },
    ],
    membershipTieIn:
      "Seasonal cleaning is part of the Proactive Path, so moss and grime never get the months they need to do damage.",
    relatedServiceSlugs: ["deck-repair", "gutter-services", "exterior-painting"],
  },
  {
    slug: "gutter-services",
    name: "Gutter Cleaning & Repair",
    serviceType: "Gutter Cleaning and Repair",
    h1: "Gutter Cleaning & Repair in Clark County, WA",
    seoTitle: "Gutter Cleaning & Repair in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Gutter cleaning and repair for PNW homes, where drainage is everything: clear, sealed, and routed away from your foundation. Vancouver WA and Clark County.",
    image: "https://handypioneers.com/images/blog/service-gutter-services.webp",
    imageAlt: "Clean gutters along a home roofline",
    intro: [
      "In a climate this wet, gutters are not a small thing. They are the system that keeps a season of rain off your siding, away from your foundation, and out of your crawlspace. When they clog or sag, water goes exactly where it does the most expensive damage.",
      "We clear, repair, and properly route gutters and downspouts so the water your roof sheds actually leaves the house.",
    ],
    whatsIncluded: [
      "Full clearing of gutters and downspouts",
      "Repair of sagging, leaking, or pulled-away sections",
      "Downspout extensions that move water away from the foundation",
      "A check of the fascia and roofline the gutters hang from",
    ],
    signsYouNeedThis: [
      "Water overflowing the front edge during rain",
      "Pooling at the base of downspouts near the house",
      "Sagging, separated, or leaking gutter sections",
      "Staining on siding or a damp crawlspace below",
    ],
    faq: [
      {
        q: "How often should gutters be cleaned in the Pacific Northwest?",
        a: "At least twice a year here, given our tree cover and long wet season, and ideally before the heavy rains return in fall. Homes under heavy tree cover often need more.",
      },
    ],
    membershipTieIn:
      "Gutter clearing is a standing item on the Proactive Path seasonal visits, so they are never the reason water gets into the house.",
    relatedServiceSlugs: ["rot-repair", "pressure-washing", "property-maintenance"],
  },
  {
    slug: "carpentry-trim",
    name: "Finish Carpentry & Trim",
    serviceType: "Finish Carpentry and Trim",
    h1: "Finish Carpentry & Trim in Vancouver, WA & Clark County",
    seoTitle: "Finish Carpentry & Trim in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Finish carpentry for Clark County, WA homes: trim, crown, wainscoting, built-ins, and cabinet installation. We work alongside your interior designer.",
    image: "https://handypioneers.com/images/blog/service-carpentry-trim.webp",
    imageAlt: "Painted interior trim, crown molding, and a built-in bookcase in a finished living room",
    intro: [
      "Trim and finish carpentry is where a home either reads as well built or not. The joints, the reveals, the way a casing meets a baseboard: those are the details the eye picks up even when no one can say why a room feels finished.",
      "Handy Pioneers handles interior finish carpentry across Vancouver and Clark County: baseboard, casing, and crown, wainscoting and wall paneling, built-in shelving and window seats, and installing the cabinets you or your designer have chosen. One point of contact, a written scope before we start, and the patience this kind of work needs.",
      "Many of our carpentry clients already have an interior designer. That is a good start, not a complication. We take the designer's drawings and selections, confirm what the walls and floors will actually allow, and build it to the plan. And because this is indoor work, fall and winter are a strong time to get it done while the rain keeps everyone inside.",
    ],
    whatsIncluded: [
      "Baseboard, door and window casing, and crown molding, new or matched to what you have",
      "Wainscoting, board and batten, shiplap, and picture-frame wall molding",
      "Built-in shelving, bookcases, window seats, mudroom benches, and media walls",
      "Installation of cabinets supplied by you or your designer, including scribing, crown, and hardware",
      "Interior door hanging, adjustment, and replacement",
      "Repair and replacement of damaged trim and millwork, matched to the existing profile",
      "Caulk, fill, and paint-ready prep so the finish coat looks right the first time",
    ],
    signsYouNeedThis: [
      "Gaps, cracks, or separated joints in existing trim",
      "Builder-grade baseboard and casing that make the rest of the home look unfinished",
      "Plain walls in a dining room, entry, or stairway that need character",
      "Not enough storage, and a wall or alcove that could hold a built-in",
      "Your designer has a plan and you need a carpenter to build it",
    ],
    faq: [
      {
        q: "Do you work with my interior designer?",
        a: "Yes, and we like it. Send us the designer's drawings, elevations, and selections. We walk the space, flag anything the walls or floors will not allow before it becomes a problem, and build to the plan. Your designer stays in charge of the look; we are responsible for how it is built.",
      },
      {
        q: "Is fall or winter a good time for interior carpentry?",
        a: "Yes. Interior trim, built-ins, and cabinet work are not held up by rain, so the wet season is a practical time to schedule them. We let wood materials acclimate to your home before we install them, which matters more when the heat is on and indoor air is drier.",
      },
      {
        q: "Do you build cabinets?",
        a: "We install cabinets that you or your designer supply, and we build site-made built-ins like shelving, bookcases, window seats, and benches. We do not manufacture cabinet boxes in a shop. If you need cabinets, we are glad to install the line your designer specifies.",
      },
      {
        q: "Can you match the trim I already have?",
        a: "Usually, yes. Many common profiles are still stocked. For older or unusual profiles, we match as closely as the available stock allows and tell you up front where a match will not be exact, so there are no surprises on install day.",
      },
      {
        q: "Do you handle small trim repairs as well as whole-home trim?",
        a: "Yes. Whether it is one damaged casing or new trim throughout the house, the same standard applies to the joints and the finish.",
      },
      {
        q: "Do you paint the trim you install?",
        a: "We can. We leave every joint filled, caulked, and sanded so it is ready for paint, and we can finish it ourselves or hand it off paint-ready to your painter.",
      },
      {
        q: "What areas do you serve for carpentry work?",
        a: "All of Clark County, WA, including Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and La Center.",
      },
    ],
    membershipTieIn:
      "Proactive Path members fold small carpentry fixes into their seasonal visits, so a loose casing or a sticking door gets handled before it becomes an eyesore.",
    relatedServiceSlugs: ["built-ins", "wainscoting", "cabinet-installation", "interior-painting"],
  },
  {
    slug: "built-ins",
    name: "Built-In Shelving & Built-Ins",
    serviceType: "Built-In Shelving and Cabinetry",
    h1: "Built-In Shelving & Built-Ins in Vancouver, WA & Clark County",
    seoTitle: "Built-In Shelving & Bookcases in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Custom built-in shelving, bookcases, window seats, mudroom benches, and media walls for Clark County, WA homes. Built on site to fit your walls.",
    image: "https://handypioneers.com/images/blog/service-built-ins.webp",
    imageAlt: "A painted built-in bookcase with open shelves and lower cabinet doors beside a window seat",
    intro: [
      "A good built-in looks like it came with the house. It fits the wall exactly, lines up with the trim around it, and holds what you put on it for decades without the shelves bowing. A bad one looks like furniture pushed against a wall.",
      "We build built-ins on site, in your home, so they fit the room you actually have: walls that are not quite plumb, floors that are not quite level, and a window casing that sits a half inch off from the drawing. Bookcases flanking a fireplace, a window seat with storage underneath, a mudroom bench with hooks and cubbies, a media wall, or simple floating shelves done right.",
      "If you are working with an interior designer, we build to their elevations. If you are not, we sketch it with you, confirm the dimensions on site, and put a written scope in front of you before we cut anything.",
    ],
    whatsIncluded: [
      "Bookcases and shelving built into alcoves, beside fireplaces, or around windows",
      "Window seats with lift-top or drawer storage",
      "Mudroom benches, lockers, hooks, and cubbies",
      "Media walls and entertainment built-ins with cable management planned in",
      "Shelf spans and materials chosen so shelves do not sag under books",
      "Scribed to your walls and trimmed to match the room, ready for paint or stain",
    ],
    signsYouNeedThis: [
      "An empty alcove or the wall beside a fireplace that could be storage",
      "A drop zone by the door that is a pile of shoes and bags",
      "Freestanding bookcases that wobble or never quite fit the space",
      "A bay or bump-out window that begs for a seat",
      "Your designer has drawn a built-in and you need someone to build it",
    ],
    faq: [
      {
        q: "Are your built-ins made on site or in a shop?",
        a: "On site. We build and fit them in your home so they conform to your actual walls, floors, and trim. That is what makes a built-in look original to the house instead of added later.",
      },
      {
        q: "How do you keep long shelves from sagging?",
        a: "Shelf sag comes down to the span, the material, and the load. We size the span and thickness for what the shelf will hold, add a face frame or a hidden support where a long shelf needs it, and avoid the thin, wide shelves that bow under a row of books.",
      },
      {
        q: "Can you build to my interior designer's drawings?",
        a: "Yes. We review the elevations and selections, confirm the dimensions on site, flag anything the room will not allow, and build to the plan.",
      },
      {
        q: "Paint-grade or stain-grade?",
        a: "Both are possible. Painted built-ins are the most common and let us use stable materials that stay flat. Stain-grade uses real hardwood throughout and takes more material and more careful work. We walk you through the tradeoff during the consultation.",
      },
      {
        q: "What does a built-in cost?",
        a: "It depends on the size, the materials, doors and drawers versus open shelves, and the finish. Rather than guess at a number sight unseen, we measure the space and give you a written scope and price so you can decide with the full picture.",
      },
    ],
    membershipTieIn:
      "Proactive Path members get their built-ins checked on seasonal visits: doors adjusted, hardware tightened, and touch-ups noted before wear shows.",
    relatedServiceSlugs: ["carpentry-trim", "wainscoting", "cabinet-installation", "interior-painting"],
  },
  {
    slug: "wainscoting",
    name: "Wainscoting & Wall Paneling",
    serviceType: "Wainscoting and Wall Paneling Installation",
    h1: "Wainscoting & Wall Paneling in Vancouver, WA & Clark County",
    seoTitle: "Wainscoting Installation in Clark County WA | Handy Pioneers",
    seoDesc:
      "Wainscoting, board and batten, shiplap, and picture-frame molding installed in Clark County, WA homes. Laid out to the room and finished paint-ready.",
    image: "https://handypioneers.com/images/blog/service-wainscoting.webp",
    imageAlt: "A dining room with painted panel wainscoting below tall windows looking out on evergreens",
    intro: [
      "Wainscoting changes a room more than almost any other single project. A plain dining room, entry, or stairway picks up depth and a sense of craftsmanship, and the lower wall gets a surface that stands up to chairs, bags, and kids far better than bare drywall.",
      "The difference between wainscoting that looks right and wainscoting that looks off is layout. Panels have to be spaced so they land evenly between corners, windows, and outlets, and the top rail has to hold a consistent height up a stair. We lay the whole room out before the first piece goes on the wall.",
      "We install every common style: traditional raised or flat panel, board and batten, shiplap, beadboard, and picture-frame molding. If your designer has chosen a style, we build to it. If not, we help you pick one that suits the age and character of the house.",
    ],
    whatsIncluded: [
      "Raised-panel and flat-panel (recessed) wainscoting",
      "Board and batten, shiplap, and beadboard",
      "Picture-frame and box molding on walls and stairways",
      "Chair rail, cap rail, and base details that tie into existing trim",
      "Room-by-room layout so panels space evenly around doors, windows, and outlets",
      "Outlet box extensions and paint-ready prep: filled, caulked, and sanded",
    ],
    signsYouNeedThis: [
      "A dining room, entry, or hallway that feels plain or unfinished",
      "Scuffed and dinged lower walls in high-traffic spaces",
      "A stairway wall that could use a finished, tailored look",
      "An older home whose original paneling was removed and you want the character back",
    ],
    faq: [
      {
        q: "What is the difference between wainscoting, board and batten, and shiplap?",
        a: "Wainscoting is any paneling on the lower part of a wall, traditionally raised or recessed panels under a chair rail. Board and batten uses flat panels with vertical strips over the seams for a simple, clean grid. Shiplap is horizontal boards with a small gap between them. They suit different homes, and we help you choose.",
      },
      {
        q: "How high should wainscoting be?",
        a: "There is no single right height. It depends on the ceiling height, the windows, and the style. Many homes put it around a third of the wall height, and taller treatments work well in rooms with high ceilings. We mock up the height on your wall so you can see it before we build.",
      },
      {
        q: "Can wainscoting go in a bathroom?",
        a: "Yes, with the right materials. In bathrooms and mudrooms we use moisture-resistant materials and seal every edge so the paneling holds up to humidity.",
      },
      {
        q: "Will you move my outlets and switches?",
        a: "We extend outlet and switch boxes so the covers sit flush with the new paneling. If a box needs to physically move, that is electrical work and we coordinate it with a licensed electrician.",
      },
    ],
    membershipTieIn:
      "Proactive Path members get caulk lines and paneling joints checked on seasonal visits, so small gaps are closed before they show.",
    relatedServiceSlugs: ["carpentry-trim", "built-ins", "interior-painting"],
  },
  {
    slug: "cabinet-installation",
    name: "Cabinet Installation",
    serviceType: "Cabinet Installation",
    h1: "Cabinet Installation in Vancouver, WA & Clark County",
    seoTitle: "Cabinet Installation in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Kitchen, bath, and built-in cabinet installation for Clark County, WA. We install the cabinets you or your designer choose: level, scribed, and trimmed out.",
    image: "https://handypioneers.com/images/blog/service-cabinet-installation.webp",
    imageAlt: "Newly installed painted shaker kitchen cabinets with crown molding, ready for countertops",
    intro: [
      "Cabinets are only as good as their installation. The most expensive cabinet line in the showroom will look second-rate if the doors do not line up, the crown does not meet the ceiling evenly, or the filler strips are sloppy. Most kitchens have a floor that is not level and walls that are not straight, and the installer's job is to make that invisible.",
      "Handy Pioneers installs the cabinets you or your interior designer have chosen, whether that is a stock line from a home center, semi-custom from a showroom, or a custom order. We check the delivery against the plan, set a level line, fasten into the framing, scribe fillers and end panels to the walls, and finish with crown, light rail, toe kick, and hardware.",
      "To be clear about what we do: we install, we do not manufacture cabinets. That keeps the choice of cabinet line with you and your designer, and keeps our focus on making it fit.",
    ],
    whatsIncluded: [
      "Kitchen, bathroom vanity, laundry, and pantry cabinet installation",
      "Delivery check against the plan before install, so missing or damaged boxes are caught early",
      "Level and plumb setup, secured into the wall framing",
      "Scribed fillers, end panels, and toe kicks",
      "Crown molding, light rail, and decorative trim on cabinets",
      "Door and drawer alignment and hardware installation",
      "Cabinets ready for countertop template",
    ],
    signsYouNeedThis: [
      "Your designer has ordered cabinets and you need an installer",
      "You bought cabinets and want them installed right, not just screwed to the wall",
      "Existing cabinet doors that are crooked, sagging, or rubbing",
      "A laundry room, pantry, or garage that needs cabinet storage added",
    ],
    faq: [
      {
        q: "Can you install cabinets my designer ordered?",
        a: "Yes. That is most of our cabinet work. Send us the layout and the order, and we will review it before delivery so questions get answered before install day.",
      },
      {
        q: "Do you sell or build cabinets?",
        a: "No. We install cabinets you or your designer supply. For site-built storage like bookcases, window seats, and benches, see our built-ins service.",
      },
      {
        q: "Do you install countertops too?",
        a: "We coordinate the countertop template and install as part of a kitchen project so the sequence stays on track. Stone counters are templated and installed by the fabricator after the cabinets are set.",
      },
      {
        q: "Do cabinet installs need a permit?",
        a: "Replacing cabinets on their own usually does not. If the project moves plumbing, electrical, or walls, those parts may need permits, and we tell you what applies before work starts.",
      },
    ],
    membershipTieIn:
      "Proactive Path members get cabinet doors and drawers adjusted on seasonal visits, and under-sink areas checked for leaks before they damage the boxes.",
    relatedServiceSlugs: ["carpentry-trim", "kitchen-remodel", "built-ins", "bathroom-remodel"],
  },
  {
    slug: "doors-windows",
    name: "Doors & Windows",
    serviceType: "Door and Window Installation and Repair",
    h1: "Door & Window Work in Clark County, WA",
    seoTitle: "Door & Window Installation & Repair in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Door and window installation, repair, and weatherproofing for Clark County, WA homes, sealed against our wind-driven rain. Serving Vancouver WA.",
    image: "https://handypioneers.com/images/blog/service-doors-windows.webp",
    imageAlt: "A well-installed exterior door and window",
    intro: [
      "Doors and windows are where a home meets the weather, and in a climate with this much wind-driven rain, how they are sealed and flashed matters as much as the unit itself. A poorly set window is a slow leak waiting to find the framing.",
      "We install, replace, and repair doors and windows with the flashing, sealing, and trim detail that keep water out and the unit operating cleanly for years.",
    ],
    whatsIncluded: [
      "Interior and exterior door installation and adjustment",
      "Window replacement with proper flashing and sealing",
      "Weatherstripping and draft correction",
      "Trim and finish around the new unit",
    ],
    signsYouNeedThis: [
      "Drafts, leaks, or daylight around a door or window",
      "Doors that stick, drag, or will not latch",
      "Fogging between window panes or rotted frames",
      "Staining or soft wood below a window",
    ],
    faq: [
      {
        q: "Why does flashing matter on a window install?",
        a: "Because in our climate the water finds any gap. Proper flashing and sealing are what keep wind-driven rain out of the wall behind the window, which is where the expensive damage happens.",
      },
      {
        q: "How much do replacement windows and exterior doors cost?",
        a: "As a planning range, figure roughly $700 to $2,300 and up per opening (each window or exterior door), depending on the unit and finish, with a small-project minimum. Use the estimator on this page to price your project by the number of openings, then we confirm it on a walkthrough.",
      },
      {
        q: "Can you just replace a few windows, or do I need to do the whole house?",
        a: "Either. We do single-window and single-door replacements as well as whole-home projects. Replacing the worst-performing openings first is a common, budget-friendly way to start.",
      },
    ],
    membershipTieIn:
      "Weather seals and the wood around doors and windows are on the list of things the Proactive Path checks each year.",
    relatedServiceSlugs: ["remodeling", "rot-repair", "carpentry-trim", "exterior-painting"],
    costKey: "windows-doors",
  },
  {
    slug: "fencing",
    name: "Fencing",
    serviceType: "Fence Installation and Repair",
    h1: "Fence Installation & Repair in Clark County, WA",
    seoTitle: "Fence Installation & Repair in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Fence installation and repair for Clark County, WA: set to last in soft, wet PNW ground, with posts that do not lean after the first winter.",
    image: "https://handypioneers.com/images/blog/service-fencing.webp",
    imageAlt: "A well-built wood fence",
    intro: [
      "A fence is only as good as its posts, and in soft, wet Pacific Northwest ground, posts that are not set properly lean and heave after a winter or two. The part you do not see is what determines how long the part you do see stays straight.",
      "We build and repair fences set to hold in our soil and our weather, square and solid for the long run.",
    ],
    whatsIncluded: [
      "New fence installation, set to last in PNW ground",
      "Post replacement and re-setting of leaning sections",
      "Gate repair and adjustment",
      "Board and panel replacement",
    ],
    signsYouNeedThis: [
      "Posts that lean, wobble, or have heaved",
      "Rotted or broken boards and panels",
      "A gate that sags or will not latch",
      "A fence at the end of its life heading into another wet season",
    ],
    faq: [
      {
        q: "Why do fence posts lean in the Pacific Northwest?",
        a: "Soft, saturated ground and posts that were not set deep or supported properly. Setting them correctly for our soil is what keeps a fence straight past the first winter.",
      },
    ],
    membershipTieIn:
      "Fence and gate condition is easy to keep ahead of as part of an ongoing Proactive Path relationship.",
    relatedServiceSlugs: ["rot-repair", "carpentry-trim", "property-maintenance"],
  },
  {
    slug: "property-maintenance",
    name: "Home Maintenance Plan",
    serviceType: "Home Maintenance Plan",
    h1: "A Home Maintenance Plan for Vancouver, WA and Clark County",
    seoTitle: "Home Maintenance Plan in Vancouver WA | Handy Pioneers",
    seoDesc:
      "A whole-home plan for Clark County, WA: seasonal visits, a documented baseline, and one team that knows your home. The 360° Method, from $59/mo.",
    image: "https://handypioneers.com/images/blog/does-home-maintenance-increase-home-value.webp",
    imageAlt: "A well-maintained Pacific Northwest home exterior",
    intro: [
      "Most home repair losses start small and invisible: a clogged gutter, a slow leak, moss working under shingles. The difference between catching them early and reacting after failure is rarely small.",
      "A home maintenance plan with Handy Pioneers means your home is looked after on a schedule rather than patched up when something breaks. It is the 360° Method delivered season after season, so nothing slips and the home holds its value.",
      "Unlike an HVAC tune-up club or a single-trade service agreement, this plan covers the whole home: roof, gutters, exterior envelope, plumbing, electrical, HVAC, interior, and drainage, with one team accountable for all of it.",
    ],
    whatsIncluded: [
      "A documented baseline of your home's condition across every major system",
      "A prioritized plan: what to handle now, soon, and later",
      "Scheduled seasonal visits with a standing Pacific Northwest task list",
      "One team that knows your home and a record you keep over time",
    ],
    signsYouNeedThis: [
      "A to-do list of small repairs that never quite gets done",
      "A home that is your largest asset and currently unmanaged",
      "You would rather pay for prevention than emergencies",
      "You want a single trusted team accountable for the whole home",
    ],
    faq: [
      {
        q: "What does a home maintenance plan cost in Vancouver, WA?",
        a: "Proactive Path plans start at $59/month for homes under 2,000 sq ft; larger homes are priced by size. Every plan includes scheduled seasonal visits, a documented home record, and member rates on any work beyond the plan's scope. Full pricing is published on the membership page.",
      },
      {
        q: "What is the 360° Method?",
        a: "A proactive home-care framework: assess and document every major system, work a prioritized plan, and keep it current with seasonal visits, so small issues never become large ones. Handy Pioneers delivers it through the Proactive Path membership.",
      },
      {
        q: "Is this a membership?",
        a: "The done-for-you version is. The Proactive Path membership delivers your home maintenance plan on a schedule, with a documented record of your home over time.",
      },
      {
        q: "How is this different from a home warranty?",
        a: "A warranty is contingent coverage: you pay, and it may or may not pay out when something breaks. A maintenance plan is visible service: scheduled visits happen every season, findings are documented, and small issues are handled before they become claims. You see the value every visit instead of hoping about it at claim time.",
      },
    ],
    membershipTieIn:
      "This is the Proactive Path membership: the 360° Method, delivered for you.",
    relatedServiceSlugs: ["gutter-services", "deck-repair", "rot-repair", "commercial-handyman"],
  },
  {
    slug: "commercial-handyman",
    name: "Commercial & Property Manager Services",
    serviceType: "Commercial Handyman Services",
    h1: "Commercial Handyman Services in Vancouver, WA",
    seoTitle: "Commercial Handyman in Vancouver WA | Property Managers, Rentals, Storefronts | Handy Pioneers",
    seoDesc:
      "Commercial handyman for Vancouver WA and Clark County: property managers, landlords, storefronts, and offices. One accountable team, documented work.",
    image: "https://handypioneers.com/images/blog/how-real-estate-agents-clark-county-can-use-a-handyman-to-close-more-deals.webp",
    imageAlt: "A commercial property in Clark County maintained by Handy Pioneers",
    intro: [
      "A property manager with a work-order backlog, a landlord with a turnover deadline, a storefront with a door that will not latch: commercial repair needs are rarely big, but they are always urgent to somebody. What they need is a team that shows up when scheduled, fixes it right, and documents what was done.",
      "Handy Pioneers handles ongoing repair and maintenance work for property managers, landlords, and small commercial spaces across Clark County: tenant turnovers, punch lists, door and lock hardware, drywall and paint, fixtures, caulking and water intrusion, decks, railings, and exterior upkeep.",
      "You get one accountable point of contact, written scopes before work begins, and photos and documentation after it is done, so you can close the work order without driving out to look. It is the same 360 Method discipline we bring to homes, applied to the properties you manage.",
    ],
    whatsIncluded: [
      "Tenant turnover repairs: patch, paint, hardware, fixtures, and the punch list that gets a unit rent-ready",
      "Recurring work-order service for property managers, with documentation you can forward to owners",
      "Storefront and office repairs: doors, locks, restrooms, fixtures, drywall, trim, and paint",
      "Exterior upkeep: gutters, pressure washing, rot repair, railings, and walkway safety items",
      "Written scope and photos on every job, so approval and close-out happen without a site visit",
    ],
    signsYouNeedThis: [
      "A work-order list that keeps growing because small jobs are hard to staff",
      "Turnovers that drag past the vacancy date you promised the owner",
      "A storefront repair that is costing you customers while you wait for callbacks",
      "You manage properties in Clark County and want one number that answers",
    ],
    faq: [
      {
        q: "Do you work with property managers on ongoing repairs?",
        a: "Yes. Property managers are some of our steadiest working relationships. We take work orders as they come or on a standing cadence, put a written scope on anything non-trivial, and send photos and documentation at close-out so you can update owners without driving to the property.",
      },
      {
        q: "I own rentals. Is there a program for that?",
        a: "Yes. For landlords and rental portfolios we offer a multifamily membership with scheduled proactive visits per door, so units get looked after between tenants instead of only at turnover. See handypioneers.com/multifamily, or reach out and we will walk you through it.",
      },
      {
        q: "What size commercial work do you take?",
        a: "The repair and maintenance layer: turnovers, punch lists, doors and hardware, drywall, paint, fixtures, water damage repair, decks and railings, and exterior upkeep for small storefronts, offices, and residential rentals. We are not a commercial general contractor for ground-up or large tenant-improvement construction, and we will say so honestly if a request is outside our lane.",
      },
      {
        q: "Are you licensed and insured for commercial property work?",
        a: "Yes. Handy Pioneers is a licensed, bonded, and insured Washington contractor, and we can provide certificates of insurance for your records or your owner's files on request.",
      },
    ],
    membershipTieIn:
      "For rental portfolios, the multifamily Proactive Path puts every door on scheduled seasonal care, so turnovers get cheaper and emergencies get rarer. One team, every property, documented.",
    relatedServiceSlugs: ["property-maintenance", "doors-windows", "interior-painting", "pressure-washing"],
  },
  {
    slug: "accessory-dwelling-units",
    name: "Accessory Dwelling Units (ADUs)",
    serviceType: "Accessory Dwelling Unit Construction",
    h1: "ADUs in Clark County, WA: Conversions, In-Law Suites & Detached Units",
    seoTitle: "ADU Builder in Vancouver WA | Garage Conversion, In-Law Suite, Detached ADU | Handy Pioneers",
    seoDesc:
      "Build an ADU in Clark County, WA: garage and basement conversions, attached suites, and detached units. Washington now allows up to two ADUs per lot.",
    image: "https://handypioneers.com/images/blog/service-adu.webp",
    imageAlt: "A detached accessory dwelling unit in the backyard of a Clark County home",
    intro: [
      "An accessory dwelling unit is a second, smaller home on your property: a converted garage or basement, a suite attached to the house, or a standalone unit in the backyard. Homeowners build them for aging parents, adult kids, a private home office, or rental income, and Washington just made them far easier to add.",
      "Under state law (HB 1337), most Clark County lots that allow a single-family home can now have up to two ADUs, with no requirement that you live on the property, and cities cannot cap an ADU below 1,000 square feet. That turns an ADU from a special-case project into one of the strongest moves a homeowner can make on their property's value and income.",
      "We guide the whole path and build it as one accountable engagement: a feasibility check before you spend money on plans, a buildability and cost review of the drawings, and the construction itself. We do not draw plans or do structural engineering in-house; we recommend having those done first by an architect or residential designer and an engineer, so the build is priced from real drawings. And we think past the project. In the 360 Method an ADU is an Upgrade that should pay you back, so we help you weigh which type actually fits your lot, your budget, and the return you are after, then keep the home looked after once it is built.",
    ],
    whatsIncluded: [
      "A feasibility and zoning check for your specific lot and goals",
      "A buildability and cost review of the plans your designer draws, before you commit",
      "Construction under a permit from Clark County or the City of Vancouver, with every inspection passed",
      "The full build: foundation or conversion, framing, kitchen, bath, and utilities",
      "One point of contact from the first walkthrough to the final inspection",
    ],
    signsYouNeedThis: [
      "Aging parents or adult children who need their own space close by",
      "A goal of rental income or more long-term value from your property",
      "A home office, studio, or guest space that the main house cannot give up",
      "A large garage, basement, or backyard that is not pulling its weight",
    ],
    faq: [
      {
        q: "Are ADUs allowed in Clark County and Vancouver?",
        a: "Yes. Washington's HB 1337 requires cities and counties to allow ADUs on most lots that permit single-family homes, generally up to two per lot within urban growth areas. Rules vary by exact location, so the first step is a feasibility check for your specific address, which we handle.",
      },
      {
        q: "Do I have to live on the property to have an ADU?",
        a: "Not under the current Washington law. Owner-occupancy is no longer required for the main home or the ADU, which is what makes ADUs work as rental income, not just family housing.",
      },
      {
        q: "Do you draw the plans or do the engineering?",
        a: "No. We do not draw plans or do structural engineering in-house. We recommend having plans drawn by an architect or residential designer, with engineering where the project needs it, before construction pricing. Start with a feasibility walkthrough so you hire a designer knowing what your lot allows, and we will review the drawings for buildability and cost as they come together.",
      },
      {
        q: "Which type of ADU should I build?",
        a: "It depends on your lot, budget, and goal. A garage or basement conversion is usually the most affordable because the shell already exists. An attached suite adds space to the house. A detached unit gives the most privacy and rental appeal but is a ground-up build. We help you compare all three on this page, then on a walkthrough.",
      },
      {
        q: "What does an ADU cost?",
        a: "Roughly: a conversion from about $45,000, an attached suite from about $80,000, and a detached unit from about $140,000, scaling with size and finish. Use the estimator on this page for a range on each, then we firm it up with a written scope.",
      },
    ],
    membershipTieIn:
      "Once your ADU is built, the Proactive Path keeps it and the main home maintained and documented on a schedule, so a rental-ready unit stays rental-ready.",
    relatedServiceSlugs: ["adu-garage-conversion", "mother-in-law-suite", "detached-adu", "remodeling"],
    costHub: "adu",
    resources: [...ADU_RESOURCES, ...BUILD_PROCESS_RESOURCES],
    process: ADU_PROCESS,
  },
  {
    slug: "adu-garage-conversion",
    name: "Garage & Basement ADU Conversion",
    serviceType: "Garage Conversion ADU",
    h1: "Garage & Basement ADU Conversions in Clark County, WA",
    seoTitle: "Garage Conversion ADU in Vancouver WA | Basement Apartment | Handy Pioneers",
    seoDesc:
      "Convert a garage or basement into a permitted ADU in Clark County, WA, the most affordable way to add a unit since the shell already exists.",
    image: "https://handypioneers.com/images/blog/service-adu-garage-conversion.webp",
    imageAlt: "A garage converted into a bright, finished accessory dwelling unit",
    intro: [
      "Converting a garage or basement is usually the most affordable way to add an ADU, because the walls, roof, and foundation are already there. You are paying to finish and outfit the space, not to build a structure from the ground up.",
      "We turn that existing shell into a real, permitted home: framing and insulation, a full kitchen and bath, heating and electrical, egress and light, and finishes you would actually want to live in. The result is a unit that works for family or rents on its own.",
      "It is also one of the highest-return upgrades on a property, which is exactly how we think about it. An ADU should pay you back, so we help you scope it to hit the return you are after, not just to fill the space.",
    ],
    whatsIncluded: [
      "A feasibility and zoning check for converting your specific garage or basement",
      "Framing, insulation, and the systems an existing shell is missing",
      "A full kitchen and bathroom, heating, and electrical brought to code",
      "Egress, windows, and light to meet living-space requirements",
      "One accountable team from permit issuance through final inspection",
    ],
    signsYouNeedThis: [
      "A garage or basement that stores clutter more than it earns its space",
      "A goal of rental income without building a separate structure",
      "Family who needs a private, self-contained unit on the property",
      "The most budget-friendly path to a legal ADU",
    ],
    faq: [
      {
        q: "Is a garage conversion cheaper than a detached ADU?",
        a: "Usually, yes. The foundation, walls, and roof already exist, so you are finishing and outfitting rather than building from scratch. That is why conversions typically start around $45,000 versus roughly $140,000 for a detached unit.",
      },
      {
        q: "Can a converted garage be a legal rental?",
        a: "Yes, when it is permitted as an ADU and meets code for egress, light, ceiling height, and systems. We handle the permitting and bring the space up to those standards as part of the conversion.",
      },
    ],
    membershipTieIn:
      "After the conversion, the Proactive Path keeps the new unit and the main home maintained on a schedule, so it holds its value and stays rentable.",
    relatedServiceSlugs: ["accessory-dwelling-units", "mother-in-law-suite", "detached-adu"],
    costKey: "adu-garage-conversion",
    resources: [...ADU_RESOURCES, ...BUILD_PROCESS_RESOURCES],
    process: ADU_CONVERSION_PROCESS,
  },
  {
    slug: "mother-in-law-suite",
    name: "Attached ADU & Mother-in-Law Suites",
    serviceType: "Attached ADU and In-Law Suite",
    h1: "Attached ADUs & Mother-in-Law Suites in Clark County, WA",
    seoTitle: "Mother-in-Law Suite & Attached ADU in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Add an attached ADU or mother-in-law suite in Clark County, WA: a private space connected to your home, with its own kitchen, bath, and entry.",
    image: "https://handypioneers.com/images/attached-adu-before-after-stacked.webp",
    imageSize: { width: 1440, height: 1383 },
    imageAlt: "Before and after of an attached ADU we built: a dated yellow bonus room (top) turned into a unit with a full kitchen and stacked laundry (bottom)",
    intro: [
      "An attached ADU, often called a mother-in-law suite, adds private living space to your home: typically an addition or a reworked wing with its own kitchen or kitchenette, a full bath, and a separate entrance. It keeps family close while giving everyone their own front door.",
      "The before and after below is an attached ADU we built: a dated bonus room with a closet and a chimney turned into a real living unit, with a full kitchen, stacked laundry, and new flooring and lighting throughout.",
      "It is the middle path between converting existing space and building a detached unit. You get more square footage than a conversion and more independence than a spare bedroom, tied into the home's structure and systems.",
      "Because it adds real, livable square footage, an attached suite is also a strong move on your home's value and flexibility. We scope it to fit how your family actually lives now and how the space can serve you later, whether that is aging parents today and rental or resale value down the road.",
    ],
    whatsIncluded: [
      "Construction that ties the suite into your home's structure, roofline, and systems, built from your designer's plans",
      "A private entrance, plus a kitchen or kitchenette and a full bathroom",
      "Heating, electrical, and insulation built for year-round comfort",
      "Construction under a permit from Clark County or the City of Vancouver, with every inspection passed",
      "One accountable team from design through final inspection",
    ],
    signsYouNeedThis: [
      "Aging parents who want independence but need to be close",
      "Adult children who need their own space without leaving home",
      "A desire for more usable square footage tied into the main house",
      "Flexibility for family now and rental or resale value later",
    ],
    faq: [
      {
        q: "What is the difference between a mother-in-law suite and a detached ADU?",
        a: "A mother-in-law suite is attached to your home, sharing a wall and the home's structure, while a detached ADU is a standalone building. Attached suites are usually less expensive than detached units and keep family under one roofline; detached units offer the most privacy and rental appeal.",
      },
      {
        q: "Does a mother-in-law suite need its own kitchen?",
        a: "To count as an ADU it generally needs its own kitchen or kitchenette and bathroom. We can build a full kitchen or a compact kitchenette depending on how the space will be used and the rules for your lot.",
      },
    ],
    membershipTieIn:
      "Once the suite is built, the Proactive Path keeps it and the main home maintained and documented on a schedule.",
    relatedServiceSlugs: ["accessory-dwelling-units", "adu-garage-conversion", "detached-adu", "home-additions"],
    costKey: "adu-attached",
    resources: [...ADU_RESOURCES, ...BUILD_PROCESS_RESOURCES],
    process: ADU_ATTACHED_PROCESS,
  },
  {
    slug: "detached-adu",
    name: "Detached ADUs",
    serviceType: "Detached ADU Construction",
    h1: "Detached ADUs in Clark County, WA",
    seoTitle: "Detached ADU Builder in Vancouver WA | Backyard Cottage | Handy Pioneers",
    seoDesc:
      "Build a detached ADU in Clark County, WA: a standalone backyard unit with its own foundation, kitchen, and bath. The most private, most rentable ADU.",
    image: "https://handypioneers.com/images/blog/service-detached-adu.webp",
    imageAlt: "A detached backyard ADU cottage on a Clark County property",
    intro: [
      "A detached ADU is a standalone home on your lot, built from the ground up with its own foundation, walls, roof, kitchen, bath, and utilities. It is the most private and the most rentable type of ADU, and the one that adds the most independent value to a property.",
      "It is also a real construction project, and we treat it like one. We build the unit from your approved plans as one accountable engagement: site work and foundation, framing and roof, full mechanical, kitchen and bath, and the exterior that ties it to your home and neighborhood. You have a single point of contact from feasibility to final inspection.",
      "Of the ADU options this is the biggest investment, so the return matters most. We help you size and spec it to the income or use you are after, then keep it maintained once it is built, because a detached unit you can rent for years is an asset, not just a project.",
    ],
    whatsIncluded: [
      "Feasibility, site planning, and zoning for a standalone unit on your lot",
      "Foundation, framing, roofing, and a weather-tight exterior built for the PNW",
      "A full kitchen and bathroom, heating, electrical, and independent utilities",
      "Construction under a permit from Clark County or the City of Vancouver, with every inspection passed",
      "One accountable team managing the whole ground-up build",
    ],
    signsYouNeedThis: [
      "You want the most private, most rentable type of ADU",
      "Rental income or long-term property value is the main goal",
      "You have backyard space and want a true second home on the lot",
      "Family who needs a fully independent, standalone living unit",
    ],
    faq: [
      {
        q: "How much does a detached ADU cost in Clark County?",
        a: "A detached, ground-up ADU typically runs from about $140,000 and scales with size and finish, because you are building a complete small home including foundation and utilities. Use the estimator on this page for a range, then we firm it up with a written scope.",
      },
      {
        q: "How big can a detached ADU be?",
        a: "Washington law prevents cities from capping an ADU below 1,000 square feet, and Vancouver caps an ADU at 1,000 square feet. Most detached units land between about 500 and 800 square feet. We size yours to your lot, budget, and goal.",
      },
    ],
    membershipTieIn:
      "A detached unit you rent for years is an asset. The Proactive Path keeps it and the main home maintained and documented so it stays one.",
    relatedServiceSlugs: ["accessory-dwelling-units", "adu-garage-conversion", "mother-in-law-suite"],
    costKey: "adu-detached",
    resources: [...ADU_RESOURCES, ...BUILD_PROCESS_RESOURCES],
    process: ADU_DETACHED_PROCESS,
  },
  {
    slug: "home-additions",
    name: "Home Additions",
    serviceType: "Home Addition Construction",
    h1: "Home Additions in Vancouver, WA & Clark County",
    seoTitle: "Home Additions in Vancouver WA & Clark County | Handy Pioneers",
    seoDesc:
      "Home additions in Clark County, WA: extra bedrooms, primary suites, bigger kitchens. See every step, from feasibility and permits to the final inspection.",
    image: "https://handypioneers.com/images/blog/service-home-additions.webp",
    imageAlt: "A new home addition framed and tied into the roofline of an existing Pacific Northwest house",
    intro: [
      "An addition is the answer when your home needs more space than any rearranging can create: another bedroom, a primary suite, a larger kitchen footprint, or a main-floor room for a parent who can no longer do stairs. It is also the most involved project you can do to a house you are still living in.",
      "Handy Pioneers runs additions as one accountable engagement, from the first feasibility check to the final inspection. Below is exactly how that works, phase by phase, so you know what happens when, what you decide, and roughly how long each part takes before we ever start.",
      "We start with the need, not the footprint. Sometimes a remodel of the space you already have solves the problem for less money and less disruption, and when it does, we will tell you. When more square footage is truly the answer, we plan it so the addition looks like it was always part of the house.",
    ],
    whatsIncluded: [
      "A feasibility check for your lot: setbacks, zoning, and what the existing structure will support",
      "Construction from your designer's permit-ready plans, reviewed with you for buildability and cost",
      "Construction under a permit from the City of Vancouver, Clark County, or your city",
      "Foundation, framing, roof tie-in, and an exterior matched to the house",
      "Plumbing, mechanical, electrical, insulation, and finishes through final inspection",
      "One point of contact and a written schedule from start to finish",
    ],
    signsYouNeedThis: [
      "You need another bedroom or bathroom, and no room can be converted",
      "A kitchen that is too small in footprint, not just in layout",
      "A parent moving in who needs a main-floor bedroom and bath",
      "You love your location and would rather add on than move",
    ],
    faq: [
      {
        q: "How long does a home addition take?",
        a: "Plan on roughly 6 to 12 months from the first walkthrough to move-in for a typical addition: a few weeks of feasibility, 1 to 2 months of design, 1 to 3 months of permit review, and 3 to 6 months of construction. Your written schedule sets the real dates once the plans are approved.",
      },
      {
        q: "Do I need a permit for an addition?",
        a: "Yes. Any addition needs a residential building permit. In Vancouver that includes a stormwater form, energy code compliance, and a full plan set. In unincorporated Clark County, additions fall under the Additional Dwelling or Structure (ADS) permit. The plan set comes from your designer; construction starts once the permit is issued.",
      },
      {
        q: "Do you draw the plans or do the engineering?",
        a: "No. We do not draw plans or do structural engineering in-house. We recommend having plans drawn by an architect or residential designer, with engineering where the project needs it, before construction pricing. Start with a feasibility walkthrough so you hire a designer knowing what your lot allows, and we will review the drawings for buildability and cost as they come together.",
      },
      {
        q: "Can we live in the house during an addition?",
        a: "Usually, yes. We build the new foundation, framing, and roof first and open into the existing house as late as practical, so dust, noise, and weather exposure stay limited to one area for as short a time as possible.",
      },
      {
        q: "Should I build an addition or an ADU?",
        a: "An addition makes the main house bigger. An ADU is a separate living unit with its own kitchen, bath, and entrance, which can house family or earn rent. If independence or income matters, look at an attached ADU. We help you compare both on the walkthrough.",
      },
      {
        q: "What drives the cost of an addition?",
        a: "Size, foundation type, how the new roof meets the old one, whether plumbing moves, and finish level. Because an addition includes foundation, roof, and exterior work, it costs more per square foot than remodeling space you already have. We price it from approved drawings so the number is real.",
      },
    ],
    membershipTieIn:
      "After an addition, the Proactive Path keeps the new space and the rest of the home maintained and documented, so the roof tie-in and new exterior stay tight through every wet season.",
    relatedServiceSlugs: ["remodeling", "mother-in-law-suite", "accessory-dwelling-units", "kitchen-remodel"],
    resources: [
      { label: "City of Vancouver: Residential Addition Checklist", url: "https://www.cityofvancouver.us/business/building-construction/residential-building-permits/residential-addition-checklist/" },
      { label: "Clark County: Residential Permits (ADS permits for additions)", url: "https://clark.wa.gov/community-development/residential-permits" },
      { label: "City of Vancouver: Residential Building Permits (the 5-step permit process)", url: "https://www.cityofvancouver.us/business/building-construction/residential-building-permits/" },
      { label: "Clark County: Typical New Home and Remodel Inspections", url: "https://clark.wa.gov/community-development/typical-new-home-and-remodel-inspections" },
      { label: "Washington State: Permit review time limits (RCW 36.70B.080)", url: "https://app.leg.wa.gov/rcw/default.aspx?cite=36.70b.080" },
    ],
    process: ADDITION_PROCESS,
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
