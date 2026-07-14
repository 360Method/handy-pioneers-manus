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

export const SERVICES: ServiceDef[] = [
  {
    slug: "remodeling",
    name: "Remodeling",
    serviceType: "Home Remodeling",
    h1: "Remodeling in Clark County, WA",
    seoTitle: "Remodeling in Vancouver WA | Kitchen, Bath & Whole-Home | Handy Pioneers",
    seoDesc:
      "Remodeling for Clark County homeowners: kitchens, bathrooms, and whole-home projects run by one accountable team with a written plan. Serving Vancouver, Camas, and all of Clark County, WA.",
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
    relatedServiceSlugs: ["kitchen-remodel", "bathroom-remodel", "flooring", "carpentry-trim", "interior-painting"],
    costHub: "remodel",
  },
  {
    slug: "kitchen-remodel",
    name: "Kitchen Remodeling",
    serviceType: "Kitchen Remodeling",
    h1: "Kitchen Remodeling in Vancouver, WA & Clark County",
    seoTitle: "Kitchen Remodeling in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Kitchen remodeling for Clark County homeowners: a written plan before demolition, one team coordinating every trade, and finish work that holds up. Serving Vancouver, Camas, and all of Clark County, WA.",
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
    relatedServiceSlugs: ["bathroom-remodel", "remodeling", "flooring", "carpentry-trim"],
    costKey: "kitchen",
  },
  {
    slug: "bathroom-remodel",
    name: "Bathroom Remodeling",
    serviceType: "Bathroom Remodeling",
    h1: "Bathroom Remodeling in Vancouver, WA & Clark County",
    seoTitle: "Bathroom Remodeling in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Bathroom remodeling built for the wet Pacific Northwest: proper waterproofing, a written plan, and one team coordinating every trade. Serving Vancouver, Camas, and all of Clark County, WA.",
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
    slug: "deck-repair",
    name: "Deck Repair & Rebuild",
    serviceType: "Deck Repair and Rebuilding",
    h1: "Deck Repair & Rebuild in Clark County, WA",
    seoTitle: "Deck Repair & Rebuild in Vancouver WA | Rot, Structural, Ledger | Handy Pioneers",
    seoDesc:
      "Deck repair and rebuilding for Pacific Northwest homes: rotted boards and framing, structural fixes, ledger board repair, and full rebuilds that hold up to our rain. Serving Vancouver WA and all of Clark County.",
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
      "Wood rot repair for Pacific Northwest homes: trim, siding, decks, door frames, and the framing behind them. We fix the cause, not just the symptom. Serving Vancouver WA and Clark County.",
    image: "https://handypioneers.com/images/blog/moss-mold-moisture-pnw-homeowners-guide-roof-siding.webp",
    imageAlt: "Exterior wood trim on a home being repaired",
    intro: [
      "Wood rot is the defining maintenance problem of a wet climate. Decay fungi need sustained moisture to grow, and a Pacific Northwest winter supplies it for months at a stretch. Left alone, a soft spot in trim becomes a soft spot in the wall behind it.",
      "We repair rot at the source: find where the water is getting in, replace what has failed, and protect the new work so it does not come back next season.",
    ],
    whatsIncluded: [
      "Tracing the moisture path so the cause is fixed, not just the surface",
      "Replacement of rotted trim, siding, fascia, sills, and framing",
      "Repair around windows, doors, and roof-to-wall connections",
      "Priming and sealing of new wood before the wet season returns",
    ],
    signsYouNeedThis: [
      "Soft, crumbling, or discolored wood at trim, sills, or siding",
      "Paint that bubbles or peels in the same spot every year",
      "A screwdriver that sinks into exterior wood with light pressure",
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
      "Exterior painting done right for the Pacific Northwest climate: proper prep, the right weather window, and a finish that protects your siding for years. Serving Vancouver WA and Clark County.",
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
      "Flooring installation and replacement for Clark County homes: hard surface, tile, and more, installed level and lasting. Serving Vancouver WA, Camas, and surrounding areas.",
    image: "https://handypioneers.com/images/blog/service-flooring.webp",
    imageAlt: "Newly installed hard-surface flooring across an open living room in a Clark County home",
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
      "Pressure washing for Pacific Northwest homes: driveways, decks, siding, and walkways cleared of the moss and grime our climate grows. Serving Vancouver WA and Clark County.",
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
      "Gutter cleaning and repair for Pacific Northwest homes, where drainage is everything. Clear, sealed, and routed away from your foundation. Serving Vancouver WA and Clark County.",
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
    name: "Carpentry & Trim",
    serviceType: "Finish Carpentry and Trim",
    h1: "Carpentry & Trim Work in Clark County, WA",
    seoTitle: "Finish Carpentry & Trim in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Finish carpentry and trim for Clark County homes: doors, baseboards, crown, built-ins, and the detail work that reads as quality. Serving Vancouver WA and surrounding areas.",
    image: "https://handypioneers.com/images/blog/service-carpentry-trim.webp",
    imageAlt: "Finished interior trim and millwork",
    intro: [
      "Trim and finish carpentry is where a home either reads as well-built or not. The joints, the reveals, the way a casing meets a baseboard, those details are what the eye picks up even when no one can name why.",
      "We handle finish carpentry and trim with the patience that work deserves, from a single repair to a whole home.",
    ],
    whatsIncluded: [
      "Baseboards, casing, crown, and door trim",
      "Interior and exterior door hanging and adjustment",
      "Built-ins, shelving, and custom details",
      "Repair and replacement of damaged trim and millwork",
    ],
    signsYouNeedThis: [
      "Gaps, cracks, or separated joints in existing trim",
      "Doors that stick, rub, or no longer latch cleanly",
      "Dated or damaged baseboards and casing",
      "A space that would benefit from built-in storage",
    ],
    faq: [
      {
        q: "Do you handle small trim repairs as well as full jobs?",
        a: "Yes. Whether it is one damaged casing or trim throughout a remodel, the same standard applies to the joints and the finish.",
      },
    ],
    membershipTieIn:
      "Small carpentry fixes are easy to fold into an ongoing Proactive Path relationship before they become eyesores.",
    relatedServiceSlugs: ["remodeling", "doors-windows", "interior-painting"],
  },
  {
    slug: "doors-windows",
    name: "Doors & Windows",
    serviceType: "Door and Window Installation and Repair",
    h1: "Door & Window Work in Clark County, WA",
    seoTitle: "Door & Window Installation & Repair in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Door and window installation, repair, and weatherproofing for Clark County homes, sealed against our wind-driven rain. Serving Vancouver WA and surrounding areas.",
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
      "Fence installation and repair for Clark County homes: set to last in soft, wet PNW ground, with posts that do not lean after the first winter. Serving Vancouver WA and surrounding areas.",
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
      "A whole-home maintenance plan for Clark County homeowners: scheduled seasonal visits, a documented baseline, and one team that knows your home. The 360° Method, season after season. Plans from $59/mo.",
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
      "Commercial handyman services for Vancouver WA and Clark County: property managers, landlords, small storefronts, and offices. One accountable team, documented work, and repairs handled before tenants or customers notice.",
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
      "Build an ADU in Clark County, WA: garage and basement conversions, attached mother-in-law suites, and detached units. Washington now allows up to two ADUs per lot with no owner-occupancy rule. Honest cost ranges and one accountable team.",
    image: "https://handypioneers.com/images/blog/service-adu.webp",
    imageAlt: "A detached accessory dwelling unit in the backyard of a Clark County home",
    intro: [
      "An accessory dwelling unit is a second, smaller home on your property: a converted garage or basement, a suite attached to the house, or a standalone unit in the backyard. Homeowners build them for aging parents, adult kids, a private home office, or rental income, and Washington just made them far easier to add.",
      "Under state law (HB 1337), most Clark County lots that allow a single-family home can now have up to two ADUs, with no requirement that you live on the property, and cities cannot cap an ADU below 1,000 square feet. That turns an ADU from a special-case project into one of the strongest moves a homeowner can make on their property's value and income.",
      "We handle the whole thing as one accountable engagement: feasibility and zoning, design, permitting, and the build. And we think past the project. In the 360 Method an ADU is an Upgrade that should pay you back, so we help you weigh which type actually fits your lot, your budget, and the return you are after, then keep the home looked after once it is built.",
    ],
    whatsIncluded: [
      "A feasibility and zoning check for your specific lot and goals",
      "Design and layout matched to your budget, your lot, and how the unit will be used",
      "Permitting handled through Clark County or the City of Vancouver",
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
    resources: ADU_RESOURCES,
  },
  {
    slug: "adu-garage-conversion",
    name: "Garage & Basement ADU Conversion",
    serviceType: "Garage Conversion ADU",
    h1: "Garage & Basement ADU Conversions in Clark County, WA",
    seoTitle: "Garage Conversion ADU in Vancouver WA | Basement Apartment | Handy Pioneers",
    seoDesc:
      "Convert a garage or basement into a permitted ADU in Clark County, WA. The most affordable way to add a living unit because the shell already exists. Honest cost ranges and one accountable team.",
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
      "Permitting and one accountable team through final inspection",
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
    resources: ADU_RESOURCES,
  },
  {
    slug: "mother-in-law-suite",
    name: "Attached ADU & Mother-in-Law Suites",
    serviceType: "Attached ADU and In-Law Suite",
    h1: "Attached ADUs & Mother-in-Law Suites in Clark County, WA",
    seoTitle: "Mother-in-Law Suite & Attached ADU in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Add an attached ADU or mother-in-law suite in Clark County, WA: a private living space connected to your home, with its own kitchen, bath, and entry. Honest cost ranges and one accountable team.",
    image: "https://handypioneers.com/images/blog/service-mother-in-law-suite.webp",
    imageAlt: "An attached mother-in-law suite addition with a private entrance",
    intro: [
      "An attached ADU, often called a mother-in-law suite, adds private living space to your home: typically an addition or a reworked wing with its own kitchen or kitchenette, a full bath, and a separate entrance. It keeps family close while giving everyone their own front door.",
      "It is the middle path between converting existing space and building a detached unit. You get more square footage than a conversion and more independence than a spare bedroom, tied into the home's structure and systems.",
      "Because it adds real, livable square footage, an attached suite is also a strong move on your home's value and flexibility. We scope it to fit how your family actually lives now and how the space can serve you later, whether that is aging parents today and rental or resale value down the road.",
    ],
    whatsIncluded: [
      "Design that ties the suite into your home's structure, roofline, and systems",
      "A private entrance, plus a kitchen or kitchenette and a full bathroom",
      "Heating, electrical, and insulation built for year-round comfort",
      "Permitting through Clark County or the City of Vancouver",
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
    relatedServiceSlugs: ["accessory-dwelling-units", "adu-garage-conversion", "detached-adu"],
    costKey: "adu-attached",
    resources: ADU_RESOURCES,
  },
  {
    slug: "detached-adu",
    name: "Detached ADUs",
    serviceType: "Detached ADU Construction",
    h1: "Detached ADUs in Clark County, WA",
    seoTitle: "Detached ADU Builder in Vancouver WA | Backyard Cottage | Handy Pioneers",
    seoDesc:
      "Build a detached ADU in Clark County, WA: a standalone backyard unit with its own foundation, kitchen, and bath. The most private, most rentable ADU. Honest cost ranges and one accountable team.",
    image: "https://handypioneers.com/images/blog/service-detached-adu.webp",
    imageAlt: "A detached backyard ADU cottage on a Clark County property",
    intro: [
      "A detached ADU is a standalone home on your lot, built from the ground up with its own foundation, walls, roof, kitchen, bath, and utilities. It is the most private and the most rentable type of ADU, and the one that adds the most independent value to a property.",
      "It is also a real construction project, and we treat it like one. We design and build the unit as one accountable engagement: site work and foundation, framing and roof, full mechanical, kitchen and bath, and the exterior that ties it to your home and neighborhood. You have a single point of contact from feasibility to final inspection.",
      "Of the ADU options this is the biggest investment, so the return matters most. We help you size and spec it to the income or use you are after, then keep it maintained once it is built, because a detached unit you can rent for years is an asset, not just a project.",
    ],
    whatsIncluded: [
      "Feasibility, site planning, and zoning for a standalone unit on your lot",
      "Foundation, framing, roofing, and a weather-tight exterior built for the PNW",
      "A full kitchen and bathroom, heating, electrical, and independent utilities",
      "Permitting through Clark County or the City of Vancouver",
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
    resources: ADU_RESOURCES,
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
