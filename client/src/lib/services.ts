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
}

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
  },
  {
    slug: "deck-restoration",
    name: "Deck Restoration",
    serviceType: "Deck and Porch Restoration",
    h1: "Deck & Porch Restoration in Clark County, WA",
    seoTitle: "Deck Repair & Restoration in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Deck and porch restoration for Pacific Northwest homes: rot repair, resurfacing, railings, and sealing that actually sheds our rain. Serving Vancouver WA and all of Clark County.",
    image: "https://handypioneers.com/images/blog/deck-water-damage-signs-camas.webp",
    imageAlt: "A restored wood deck in good condition",
    intro: [
      "In the Pacific Northwest a deck spends eight months a year wet. The damage almost never starts where you can see it. It starts underneath, at the joints and the posts and the ledger where the deck meets the house, where the wood stays shaded and damp.",
      "We restore decks and porches before that hidden rot becomes a structural problem: sound boards reset and resealed, failing members replaced, railings made safe, and the whole surface protected for the seasons ahead.",
    ],
    whatsIncluded: [
      "A full inspection of boards, framing, posts, and the house connection",
      "Replacement of rotted or unsafe boards and structural members",
      "Railing repair and safety correction",
      "Cleaning, prep, and a protective seal applied when the wood can dry",
      "A clear written scope of what is sound and what needs attention",
    ],
    signsYouNeedThis: [
      "A board that flexes, gives, or feels spongy underfoot",
      "Gray or black discoloration spreading from the seams",
      "Loose, wobbly, or rusted railings and fasteners",
      "A deck heading into another wet winter without being sealed",
    ],
    faq: [
      {
        q: "How do I know if my deck has water damage?",
        a: "Look for boards that feel spongy, gray or black staining from the joints, cupping or splitting, and popped fasteners. The most important spots are where the deck meets the house and the base of the posts. A screwdriver that sinks into the wood with light pressure is a clear sign.",
      },
      {
        q: "When is the best time to restore a deck in the PNW?",
        a: "The dry season, roughly late June through September, when the wood can dry fully before it is sealed. Catching damage in summer is far simpler than finding it after another wet winter.",
      },
    ],
    membershipTieIn:
      "Proactive Path members get their deck checked and resealed on schedule, so it never quietly rots out from underneath.",
    relatedServiceSlugs: ["rot-repair", "pressure-washing", "exterior-painting"],
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
    relatedServiceSlugs: ["deck-restoration", "exterior-painting", "gutter-services"],
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
    image: "https://handypioneers.com/images/blog/what-its-really-like-to-work-with-handy-pioneers.webp",
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
  },
  {
    slug: "flooring",
    name: "Flooring",
    serviceType: "Flooring Installation",
    h1: "Flooring Installation in Clark County, WA",
    seoTitle: "Flooring Installation in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Flooring installation and replacement for Clark County homes: hard surface, tile, and more, installed level and lasting. Serving Vancouver WA, Camas, and surrounding areas.",
    image: "https://handypioneers.com/images/blog/kitchen-water-damage-vancouver-how-we-stopped-a-small-leak.webp",
    imageAlt: "Newly installed hard-surface flooring in a home",
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
    relatedServiceSlugs: ["deck-restoration", "gutter-services", "exterior-painting"],
  },
  {
    slug: "gutter-services",
    name: "Gutter Cleaning & Repair",
    serviceType: "Gutter Cleaning and Repair",
    h1: "Gutter Cleaning & Repair in Clark County, WA",
    seoTitle: "Gutter Cleaning & Repair in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Gutter cleaning and repair for Pacific Northwest homes, where drainage is everything. Clear, sealed, and routed away from your foundation. Serving Vancouver WA and Clark County.",
    image: "https://handypioneers.com/images/blog/3-things-vancouver-homeowners-forget-to-check-every-spring.webp",
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
    image: "https://handypioneers.com/images/blog/what-a-1-year-labor-guarantee-actually-covers.webp",
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
    image: "https://handypioneers.com/images/blog/window-cleaning-camas-what-we-found-behind-3-years-of-grime.webp",
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
    ],
    membershipTieIn:
      "Weather seals and the wood around doors and windows are on the list of things the Proactive Path checks each year.",
    relatedServiceSlugs: ["rot-repair", "carpentry-trim", "exterior-painting"],
  },
  {
    slug: "fencing",
    name: "Fencing",
    serviceType: "Fence Installation and Repair",
    h1: "Fence Installation & Repair in Clark County, WA",
    seoTitle: "Fence Installation & Repair in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Fence installation and repair for Clark County homes: set to last in soft, wet PNW ground, with posts that do not lean after the first winter. Serving Vancouver WA and surrounding areas.",
    image: "https://handypioneers.com/images/blog/deck-season-is-here-what-vancouver-homeowners-should-know.webp",
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
    name: "Property Maintenance",
    serviceType: "Home Maintenance",
    h1: "Proactive Property Maintenance in Clark County, WA",
    seoTitle: "Home & Property Maintenance in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Ongoing property maintenance for Clark County homeowners who would rather their home was looked after than reacted to. The 360° Method, delivered season after season. Serving Vancouver WA and Clark County.",
    image: "https://handypioneers.com/images/blog/does-home-maintenance-increase-home-value.webp",
    imageAlt: "A well-maintained Pacific Northwest home exterior",
    intro: [
      "Most home repair losses start small and invisible: a clogged gutter, a slow leak, moss working under shingles. The difference between catching them early and reacting after failure is rarely small.",
      "Property maintenance with Handy Pioneers means your home is looked after on a schedule rather than patched up when something breaks. It is the 360° Method delivered season after season, so nothing slips and the home holds its value.",
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
        q: "What is the 360° Method?",
        a: "A proactive home-care framework: assess and document every major system, work a prioritized plan, and keep it current with seasonal visits, so small issues never become large ones. Handy Pioneers delivers it through the Proactive Path membership.",
      },
      {
        q: "Is this a membership?",
        a: "The done-for-you version is. The Proactive Path membership delivers ongoing property maintenance on a schedule, with a documented record of your home over time.",
      },
    ],
    membershipTieIn:
      "This is the Proactive Path membership: the 360° Method, delivered for you.",
    relatedServiceSlugs: ["gutter-services", "deck-restoration", "rot-repair"],
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
