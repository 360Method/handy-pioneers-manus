/**
 * City / service-area pages data - one entry per /service-areas/<slug> page.
 *
 * Two kinds:
 *  - status "active": Clark County, WA cities we serve now (full local content).
 *  - status "waitlist": greater Portland metro (OR). HONEST PRE-SEED ONLY.
 *    Handy Pioneers is WA L&I-licensed, not Oregon CCB-licensed, so these pages
 *    make NO service claim and carry NO Service/areaServed schema. They are
 *    education + "expanding soon, join the waitlist".
 *
 * Anti-doorway rule: each intro must be genuinely specific to that town (true
 * geography/housing/climate facts + real neighborhoods). Shared template
 * structure is fine; shared sentences are not. Marcin should verify the local
 * specifics before publish. serviceArea.ts stays the ZIP/boundary source for
 * forms; this module is the page-content layer.
 */

export type CityStatus = "active" | "waitlist";

export interface CityDef {
  slug: string;
  name: string;
  state: "WA" | "OR";
  region: "clark-county-wa" | "portland-metro-or";
  status: CityStatus;
  zips: string[];
  neighborhoods: string[];
  geo: { lat: number; lng: number };
  intro: string[];
  servicesOffered: string[]; // service slugs, ordered by local relevance
  seoTitle: string;
  seoDesc: string;
  image: string;
  imageAlt: string;
}

const IMG = (slug: string) => `https://handypioneers.com/images/blog/${slug}.webp`;

export const CITIES: CityDef[] = [
  // ───────────────────────── Clark County, WA (active) ─────────────────────────
  {
    slug: "vancouver-wa",
    name: "Vancouver",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98660", "98661", "98662", "98663", "98664", "98665", "98682", "98683", "98684", "98685", "98686"],
    neighborhoods: ["Felida", "Salmon Creek", "Hazel Dell", "Cascade Park", "Fisher's Landing", "Downtown / Uptown"],
    geo: { lat: 45.6387, lng: -122.6615 },
    intro: [
      "Vancouver spans a wide range of homes, from the older cedar-sided houses near the downtown and Uptown core to the newer builds out in Fisher's Landing and Felida. The older stock tends to need rot and siding attention; the newer homes are usually about staying ahead of decks, paint, and drainage before our wet season finds the weak point.",
      "Whatever corner of Vancouver you're in, the constant is the rain. We help homeowners across the city keep water where it belongs, with repairs, restoration, and proactive care built for this climate.",
    ],
    servicesOffered: ["rot-repair", "gutter-services", "deck-restoration", "exterior-painting", "remodeling", "kitchen-remodel", "bathroom-remodel", "property-maintenance"],
    seoTitle: "Home Repair & Maintenance in Vancouver, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves Vancouver, WA with rot repair, deck restoration, painting, gutters, remodeling, and proactive home care built for our wet climate. From Felida to Fisher's Landing.",
    image: IMG("does-home-maintenance-increase-home-value"),
    imageAlt: "A well-maintained Vancouver WA home",
  },
  {
    slug: "camas-wa",
    name: "Camas",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98607"],
    neighborhoods: ["Prune Hill", "Grass Valley", "Lacamas Lake area", "Downtown Camas"],
    geo: { lat: 45.5871, lng: -122.3995 },
    intro: [
      "Camas is a tale of two housing stocks: the established homes around downtown and Lacamas Lake, and the larger newer builds up on Prune Hill and Grass Valley. The hillside homes catch wind-driven rain off the Gorge, which finds decks, window flashing, and exterior trim first.",
      "We help Camas homeowners protect homes that are often a significant investment, with careful remodeling, deck and rot work, and proactive maintenance that keeps the wet season from doing quiet damage.",
    ],
    servicesOffered: ["remodeling", "kitchen-remodel", "bathroom-remodel", "deck-restoration", "rot-repair", "exterior-painting", "property-maintenance"],
    seoTitle: "Home Repair & Remodeling in Camas, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves Camas, WA: remodeling, deck and rot repair, painting, and proactive home care for Prune Hill, Grass Valley, and downtown homes. Built for the Gorge's weather.",
    image: IMG("kitchen-island-appliance-installation-vancouver-what-we-learned"),
    imageAlt: "A Camas WA home in good repair",
  },
  {
    slug: "washougal-wa",
    name: "Washougal",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98671"],
    neighborhoods: ["Downtown Washougal", "Washougal River area", "Hathaway"],
    geo: { lat: 45.5826, lng: -122.3534 },
    intro: [
      "Sitting right at the mouth of the Columbia River Gorge, Washougal gets more of the wind-driven rain than almost anywhere else in the county. That weather is hard on exterior wood, decks, and anything the flashing doesn't fully protect.",
      "We help Washougal homeowners stay ahead of that exposure with deck restoration, rot repair, exterior painting in the right window, and seasonal care that accounts for the Gorge winds.",
    ],
    servicesOffered: ["deck-restoration", "rot-repair", "exterior-painting", "gutter-services", "doors-windows", "property-maintenance"],
    seoTitle: "Deck, Rot & Home Repair in Washougal, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves Washougal, WA, where Gorge winds drive rain into exterior wood. Deck restoration, rot repair, painting, and proactive care for homes near the river.",
    image: IMG("deck-water-damage-signs-camas"),
    imageAlt: "A Washougal WA home exterior",
  },
  {
    slug: "ridgefield-wa",
    name: "Ridgefield",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98642"],
    neighborhoods: ["Downtown Ridgefield", "Pioneer Canyon", "South Ridge"],
    geo: { lat: 45.8162, lng: -122.7426 },
    intro: [
      "Ridgefield is one of the fastest-growing parts of the county, with a lot of newer construction near the wildlife refuge and wetlands. Newer homes are less about rot and more about staying ahead of the things that fail early when nobody is watching: decks, paint, drainage, and the seals around doors and windows.",
      "We help Ridgefield homeowners protect newer homes before small issues become expensive, with proactive maintenance, deck and paint care, and the occasional repair done right.",
    ],
    servicesOffered: ["property-maintenance", "deck-restoration", "exterior-painting", "gutter-services", "remodeling", "kitchen-remodel", "bathroom-remodel"],
    seoTitle: "Home Maintenance & Repair in Ridgefield, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves Ridgefield, WA: proactive maintenance, deck and paint care, gutters, and repairs that keep newer homes near the refuge holding their value.",
    image: IMG("does-home-maintenance-increase-home-value"),
    imageAlt: "A Ridgefield WA home",
  },
  {
    slug: "battle-ground-wa",
    name: "Battle Ground",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98604"],
    neighborhoods: ["Downtown Battle Ground", "Meadow Glade", "Cedars"],
    geo: { lat: 45.7807, lng: -122.5337 },
    intro: [
      "Battle Ground mixes established neighborhoods with newer development and a fair number of homes on larger lots. The wetter, tree-heavy setting means gutters, moss, and drainage do a lot of the quiet damage here if they're left alone through the winter.",
      "We help Battle Ground homeowners keep ahead of that, clearing and repairing gutters, treating moss, handling rot and deck work, and maintaining homes on a schedule instead of in emergencies.",
    ],
    servicesOffered: ["gutter-services", "pressure-washing", "rot-repair", "deck-restoration", "property-maintenance", "fencing"],
    seoTitle: "Gutter, Rot & Home Repair in Battle Ground, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves Battle Ground, WA: gutter cleaning and repair, moss and pressure washing, rot and deck work, and proactive home care for a wet, tree-heavy setting.",
    image: IMG("3-things-vancouver-homeowners-forget-to-check-every-spring"),
    imageAlt: "A Battle Ground WA home with clean gutters",
  },
  {
    slug: "la-center-wa",
    name: "La Center",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98629"],
    neighborhoods: ["Downtown La Center", "East Fork Lewis River area"],
    geo: { lat: 45.8629, lng: -122.67 },
    intro: [
      "La Center is a smaller, more rural community in the north of the county, with homes often on acreage near the East Fork Lewis River. Rural and riverside homes tend to need more attention to decks, fences, outbuildings, and drainage than their in-town counterparts.",
      "We help La Center homeowners maintain homes and the structures around them, from deck and fence work to rot repair and proactive seasonal care.",
    ],
    servicesOffered: ["deck-restoration", "fencing", "rot-repair", "gutter-services", "property-maintenance", "exterior-painting"],
    seoTitle: "Deck, Fence & Home Repair in La Center, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves La Center, WA: deck and fence work, rot repair, gutters, and proactive maintenance for rural and riverside homes in north Clark County.",
    image: IMG("deck-season-is-here-what-vancouver-homeowners-should-know"),
    imageAlt: "A La Center WA home on acreage",
  },
  {
    slug: "brush-prairie-wa",
    name: "Brush Prairie",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98606"],
    neighborhoods: ["Hockinson area", "Brush Prairie"],
    geo: { lat: 45.734, lng: -122.529 },
    intro: [
      "Brush Prairie and the Hockinson area are semi-rural, heavily treed, and full of homes on larger lots. All that tree cover means gutters fill fast and moss takes hold quickly, and decks and outbuildings see a lot of shade and damp.",
      "We help Brush Prairie homeowners stay ahead of the tree-and-moisture combination with gutter work, moss treatment and pressure washing, deck and rot repair, and proactive seasonal maintenance.",
    ],
    servicesOffered: ["gutter-services", "pressure-washing", "deck-restoration", "rot-repair", "fencing", "property-maintenance"],
    seoTitle: "Gutter, Moss & Home Care in Brush Prairie, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves Brush Prairie and Hockinson, WA: gutter cleaning, moss treatment and pressure washing, deck and rot repair, and proactive care for heavily treed lots.",
    image: IMG("moss-mold-moisture-pnw-homeowners-guide-roof-siding"),
    imageAlt: "A tree-shaded Brush Prairie WA home",
  },
  {
    slug: "amboy-wa",
    name: "Amboy",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98601"],
    neighborhoods: ["Amboy", "Chelatchie", "Yale Valley"],
    geo: { lat: 45.9168, lng: -122.449 },
    intro: [
      "Amboy is rural north county, near the foothills, where homes sit on acreage and weather runs harder and colder than down in the valley. Freeze risk is real here, and decks, outbuildings, and exposed wood take a beating.",
      "We help Amboy homeowners maintain rural properties through that exposure, with deck and rot repair, fencing, freeze-aware seasonal care, and the kind of upkeep acreage homes need.",
    ],
    servicesOffered: ["deck-restoration", "rot-repair", "fencing", "gutter-services", "property-maintenance", "carpentry-trim"],
    seoTitle: "Rural Home Repair & Maintenance in Amboy, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves Amboy, WA: deck and rot repair, fencing, and proactive maintenance for rural foothill properties that face harder weather and freeze risk.",
    image: IMG("deck-season-is-here-what-vancouver-homeowners-should-know"),
    imageAlt: "A rural Amboy WA property",
  },
  {
    slug: "yacolt-wa",
    name: "Yacolt",
    state: "WA",
    region: "clark-county-wa",
    status: "active",
    zips: ["98675"],
    neighborhoods: ["Yacolt", "Amboy edge", "Sunset Falls area"],
    geo: { lat: 45.8654, lng: -122.4045 },
    intro: [
      "Yacolt sits up in the northeast corner of the county near the foothills, rural and treed, with the same colder, wetter exposure as its Amboy neighbors. Homes here are often older or on acreage, and the weather is hard on wood.",
      "We help Yacolt homeowners keep ahead of that with rot and deck repair, fencing, gutter and moss work, and proactive seasonal care suited to rural foothill homes.",
    ],
    servicesOffered: ["rot-repair", "deck-restoration", "gutter-services", "fencing", "property-maintenance", "pressure-washing"],
    seoTitle: "Home Repair & Maintenance in Yacolt, WA | Handy Pioneers",
    seoDesc:
      "Handy Pioneers serves Yacolt, WA: rot and deck repair, fencing, gutters, and proactive care for rural foothill homes facing colder, wetter weather.",
    image: IMG("moss-mold-moisture-pnw-homeowners-guide-roof-siding"),
    imageAlt: "A rural Yacolt WA home",
  },

  // ───────────────────────── Portland metro, OR (waitlist) ─────────────────────────
  {
    slug: "lake-oswego-or",
    name: "Lake Oswego",
    state: "OR",
    region: "portland-metro-or",
    status: "waitlist",
    zips: [],
    neighborhoods: ["First Addition", "Lake Grove", "Mountain Park"],
    geo: { lat: 45.4207, lng: -122.6706 },
    intro: [
      "Lake Oswego's homes are exactly the kind we're built to care for: significant investments, often with extensive decks, exterior wood, and finishes that reward proactive upkeep in a wet climate.",
      "We're expanding into the greater Portland metro. We're not yet serving Oregon, but the 360° Method, our proactive approach to keeping a home ahead of the weather, applies just as much across the river. Join the waitlist and you'll be first to know when we reach Lake Oswego.",
    ],
    servicesOffered: [],
    seoTitle: "Coming Soon to Lake Oswego, OR | Handy Pioneers 360° Method",
    seoDesc:
      "Handy Pioneers is expanding to the greater Portland metro. Proactive home care, the 360° Method, for Lake Oswego, OR. Not yet serving Oregon - join the waitlist to be first.",
    image: IMG("does-home-maintenance-increase-home-value"),
    imageAlt: "A well-kept Pacific Northwest home",
  },
  {
    slug: "west-linn-or",
    name: "West Linn",
    state: "OR",
    region: "portland-metro-or",
    status: "waitlist",
    zips: [],
    neighborhoods: ["Willamette", "Robinwood", "Tanner Basin"],
    geo: { lat: 45.3651, lng: -122.6126 },
    intro: [
      "West Linn's hillside and riverside homes face the same wet-winter realities as the rest of the Pacific Northwest, and the same reward for staying ahead of decks, drainage, and exterior wood rather than reacting to them.",
      "We're expanding into the greater Portland metro and aren't yet serving Oregon. The 360° Method applies on both sides of the river. Join the waitlist to be first to know when we reach West Linn.",
    ],
    servicesOffered: [],
    seoTitle: "Coming Soon to West Linn, OR | Handy Pioneers 360° Method",
    seoDesc:
      "Handy Pioneers is expanding to the greater Portland metro. Proactive home care for West Linn, OR. Not yet serving Oregon - join the waitlist to be first to know.",
    image: IMG("does-home-maintenance-increase-home-value"),
    imageAlt: "A well-kept Pacific Northwest home",
  },
  {
    slug: "portland-or",
    name: "Portland",
    state: "OR",
    region: "portland-metro-or",
    status: "waitlist",
    zips: [],
    neighborhoods: ["West Hills", "Irvington", "Alameda", "Eastmoreland"],
    geo: { lat: 45.5152, lng: -122.6784 },
    intro: [
      "Portland's older neighborhoods are full of character homes, cedar, original windows, mature trees, and the rot, moss, and drainage challenges that come with decades in a wet climate. They reward an owner who stays ahead of the water.",
      "We're expanding into the greater Portland metro and aren't yet serving Oregon. The 360° Method, our proactive approach to whole-home care, is built for exactly this climate. Join the waitlist to be first to know when we cross the river.",
    ],
    servicesOffered: [],
    seoTitle: "Coming Soon to Portland, OR | Handy Pioneers 360° Method",
    seoDesc:
      "Handy Pioneers is expanding to the greater Portland metro. Proactive whole-home care, the 360° Method, for Portland, OR. Not yet serving Oregon - join the waitlist.",
    image: IMG("moss-mold-moisture-pnw-homeowners-guide-roof-siding"),
    imageAlt: "A Pacific Northwest character home",
  },
  {
    slug: "beaverton-or",
    name: "Beaverton",
    state: "OR",
    region: "portland-metro-or",
    status: "waitlist",
    zips: [],
    neighborhoods: ["West Slope", "Raleigh Hills", "Cedar Hills"],
    geo: { lat: 45.4871, lng: -122.8037 },
    intro: [
      "Beaverton's mix of established and newer west-side homes faces the same Pacific Northwest wet season as the rest of the metro, and the same payoff for proactive care of decks, paint, and drainage.",
      "We're expanding into the greater Portland metro and aren't yet serving Oregon. Join the waitlist to be first to know when the 360° Method reaches Beaverton.",
    ],
    servicesOffered: [],
    seoTitle: "Coming Soon to Beaverton, OR | Handy Pioneers 360° Method",
    seoDesc:
      "Handy Pioneers is expanding to the greater Portland metro. Proactive home care for Beaverton, OR. Not yet serving Oregon - join the waitlist to be first to know.",
    image: IMG("does-home-maintenance-increase-home-value"),
    imageAlt: "A well-kept Pacific Northwest home",
  },
  {
    slug: "tigard-or",
    name: "Tigard",
    state: "OR",
    region: "portland-metro-or",
    status: "waitlist",
    zips: [],
    neighborhoods: ["Bull Mountain", "Summerfield", "Metzger"],
    geo: { lat: 45.4312, lng: -122.7715 },
    intro: [
      "Tigard and the Bull Mountain area blend newer hillside homes with established neighborhoods, all under the same wet-winter conditions that make proactive maintenance worth far more than reactive repair.",
      "We're expanding into the greater Portland metro and aren't yet serving Oregon. Join the waitlist to be first to know when the 360° Method reaches Tigard.",
    ],
    servicesOffered: [],
    seoTitle: "Coming Soon to Tigard, OR | Handy Pioneers 360° Method",
    seoDesc:
      "Handy Pioneers is expanding to the greater Portland metro. Proactive home care for Tigard, OR. Not yet serving Oregon - join the waitlist to be first to know.",
    image: IMG("does-home-maintenance-increase-home-value"),
    imageAlt: "A well-kept Pacific Northwest home",
  },
  {
    slug: "happy-valley-or",
    name: "Happy Valley",
    state: "OR",
    region: "portland-metro-or",
    status: "waitlist",
    zips: [],
    neighborhoods: ["Scouters Mountain", "Mt Scott", "Altamont"],
    geo: { lat: 45.4468, lng: -122.5267 },
    intro: [
      "Happy Valley is largely newer, larger homes on the metro's east side, the kind of significant investments where staying ahead of decks, paint, and drainage protects real value over time.",
      "We're expanding into the greater Portland metro and aren't yet serving Oregon. Join the waitlist to be first to know when the 360° Method reaches Happy Valley.",
    ],
    servicesOffered: [],
    seoTitle: "Coming Soon to Happy Valley, OR | Handy Pioneers 360° Method",
    seoDesc:
      "Handy Pioneers is expanding to the greater Portland metro. Proactive home care for Happy Valley, OR. Not yet serving Oregon - join the waitlist to be first to know.",
    image: IMG("does-home-maintenance-increase-home-value"),
    imageAlt: "A well-kept Pacific Northwest home",
  },
];

export const ACTIVE_CITIES = CITIES.filter((c) => c.status === "active");
export const WAITLIST_CITIES = CITIES.filter((c) => c.status === "waitlist");

export function getCity(slug: string): CityDef | undefined {
  return CITIES.find((c) => c.slug === slug);
}
