/**
 * Shared project data — used by Gallery carousel AND individual project detail pages.
 * To add a new project: append an object to the `projects` array.
 * The `slug` field maps to the URL: /project/:slug (e.g. /project/porch-step-repair-in-battle-ground)
 */

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  description: string;
  image: string;
  extraImages?: string[];
  tags: string[];
  location: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "porch-step-repair-in-battle-ground",
    title: "Porch Step Repair in Battle Ground",
    category: "Stairs & Railings",
    date: "November 21, 2025",
    excerpt: "Rebuilt two rotting steps and installed new railings for a safe, beautiful front porch.",
    description: "At Handy Pioneers, we believe in making your home safer and more comfortable. Realizing the original front porch steps were not safe and starting to warp, we rolled up our sleeves and got to work. Our expertise in porch step repair came in handy as we rebuilt the two steps and railings. Now, you can safely use your front porch without any worries.",
    image: `${CDN}/porch-step-before-after_e99469e2.png`,
    tags: ["battle ground handyman", "battle ground wa", "Clark County", "porch step repair", "railings"],
    location: "Battle Ground, WA",
  },
  {
    id: 2,
    slug: "gutter-cleaning-service-in-vancouver",
    title: "Gutter Cleaning Service in Vancouver",
    category: "Gutters",
    date: "October 16, 2025",
    excerpt: "Removed debris, flushed downspouts, and tidied the roof — turning overflowing gutters into an efficient drainage system.",
    description: "One thing we at Handy Pioneers understand is that rainwater flowing over your gutter can lead to a mess. Our gutter cleaning service removed accumulated debris, flushed the downspouts, and tidied up the roof — turning over-flooding gutters back into an efficient drainage system.",
    image: `${CDN}/gutter-cleaning-before-after_59d3998e.png`,
    tags: ["gutter cleaning", "Clark County", "debris removal", "downspout flushing", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 3,
    slug: "graffiti-removal-and-painting-in-vancouver",
    title: "Graffiti Removal and Painting in Vancouver",
    category: "Painting",
    date: "October 1, 2025",
    excerpt: "Transformed a vandalized vacant building with a fresh coat of paint — quick, efficient, and restored to full curb appeal.",
    description: "When a busy out-of-town client found themselves with a graffiti-covered vacant building, we jumped in immediately. After swiftly cleaning up the trash, we transformed the vandalized exterior with a fresh coat of paint — relieving our client from the burden while restoring their property's look and value.",
    image: `${CDN}/graffiti-removal_9fbe4828.png`,
    tags: ["graffiti removal", "painting service", "building maintenance", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 4,
    slug: "porch-screen-installation-in-vancouver",
    title: "Porch Screen Installation in Vancouver",
    category: "Screen Installation",
    date: "October 1, 2025",
    excerpt: "Installed a privacy screen and rod for a homeowner who needed it done right but lacked the time and tools.",
    description: "This Vancouver homeowner wanted a privacy screen and rod installed but lacked the time and tooling to do it cleanly. Our craftsmen measured, mounted, and finished the install in a single visit — the kind of small-but-precise job where a restoration specialist beats a DIY weekend every time.",
    image: `${CDN}/porch-screen-before-after_71f6836e.png`,
    tags: ["porch screen installation", "privacy screen", "rod installation", "Clark County", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 5,
    slug: "kitchen-water-damage-repair-in-camas",
    title: "Kitchen Water Damage Repair in Camas",
    category: "Home Repair",
    date: "September 18, 2025",
    excerpt: "What started as moving a fridge revealed major water damage — drywall, flooring, paint, and new cabinet all restored.",
    description: "When a customer asked us to help move a heavy fridge, we discovered significant water damage behind it. We transformed the unfortunate scenario into a fresh renovation — restoring drywall, flooring, painting, and installing a new cabinet and trim. The kitchen was left looking better than before the damage ever occurred.",
    image: `${CDN}/kitchen-cabinet_642933c3.png`,
    tags: ["kitchen water damage repair", "drywall repair", "flooring installation", "cabinet installation", "Camas WA"],
    location: "Camas, WA",
  },
  {
    id: 6,
    slug: "shower-recaulking-service-in-camas",
    title: "Shower Re-Caulking Service in Camas",
    category: "Caulking",
    date: "September 15, 2025",
    excerpt: "Removed old caulk, prepped the surface, and applied fresh caulk — shower left in top condition.",
    description: "A busy customer barely had the time or tools for a shower re-caulking service. We carefully prepared the surface before applying new caulk — making sure the job was done right and saving the customer valuable time.",
    image: `${CDN}/shower-recaulking_4ec1b209.webp`,
    tags: ["shower re-caulking", "caulking removal", "new caulk application", "Camas WA", "Clark County"],
    location: "Camas, WA",
  },
  {
    id: 7,
    slug: "porch-step-and-lattice-replacement-in-battle-ground",
    title: "Porch Step & Lattice Replacement in Battle Ground",
    category: "Stairs & Railings",
    date: "September 15, 2025",
    excerpt: "Replaced rotting steps and privacy lattice for a returning client — curb appeal and safety fully restored.",
    description: "We completed a porch step and lattice replacement for a returning client whose front porch steps and privacy lattice had started to rot. This boosted the appeal of their home and increased the longevity and safety of their porch. The new cedar steps and fresh lattice panels gave the whole front entry a clean, welcoming look.",
    image: `${CDN}/porch-steps-replacement_4121aa4e.png`,
    tags: ["porch step repair", "lattice installation", "front porch remodel", "Battle Ground WA", "Clark County"],
    location: "Battle Ground, WA",
  },
  {
    id: 8,
    slug: "kitchen-island-appliance-installation-in-vancouver",
    title: "Kitchen Island Appliance Installation in Vancouver",
    category: "Appliance Installation",
    date: "August 1, 2025",
    excerpt: "Installed a telescoping downdraft and gas cooktop on a newly countered kitchen island — more functional and better looking.",
    description: "We installed a telescoping downdraft and a gas cooktop to match our client's newly installed countertops. The client noted: 'Marcin did an excellent job installing my cooktop and downdraft. He arrived promptly and listened carefully to what I wanted. I would definitely recommend him.' The kitchen island is now a fully functional cooking centerpiece.",
    image: `${CDN}/kitchen-cooktop_e7072d75.png`,
    tags: ["appliance installation", "gas cooktop installation", "kitchen island upgrade", "telescoping downdraft", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 9,
    slug: "pressure-washing-service-in-vancouver",
    title: "Pressure Washing Service in Vancouver",
    category: "Pressure Washing",
    date: "July 1, 2025",
    excerpt: "Years of grime, moss, and tough stains wiped out from three driveways — curb appeal fully restored in one visit.",
    description: "Years of grime, moss, and tough stains completely wiped out with our power-packed pressure washing service. We tackled three driveways in the Vancouver area — a wide residential driveway with a Japanese maple, a steep concrete garage approach, and a large suburban driveway. We take pride in rejuvenating your property's exterior, rapidly boosting its curb appeal across Clark County.",
    image: `${CDN}/driveway-pw-1_64f291b3.png`,
    extraImages: [
      `${CDN}/driveway-pw-2_14482dc2.png`,
      `${CDN}/driveway-pw-3_973ec259.png`,
    ],
    tags: ["pressure washing", "driveway cleaning", "moss removal", "curb appeal", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 10,
    slug: "deck-pressure-washing-in-camas",
    title: "Deck Pressure Washing in Camas",
    category: "Pressure Washing",
    date: "July 1, 2025",
    excerpt: "Renewed a weather-beaten, moss-covered deck — now clean, safe, and prepped for summer.",
    description: "We helped a homeowner in Camas rediscover the beauty of their deck. Weather-beaten and rendered unsafe due to moss build-up, we renewed it with a robust session of deck pressure washing — now clean as a whistle and safe for foot traffic. The deck is ready for summer entertaining.",
    image: `${CDN}/deck-washing_39b2272a.png`,
    tags: ["deck pressure washing", "moss removal", "deck restoration", "Camas WA", "Clark County"],
    location: "Camas, WA",
  },
  {
    id: 11,
    slug: "house-washing-services-in-vancouver",
    title: "House Washing Services in Vancouver",
    category: "Pressure Washing",
    date: "July 1, 2025",
    excerpt: "Low-pressure house wash removed dirt, mildew, and grime from siding — exterior restored to original curb appeal.",
    description: "The siding was covered in dirt, mildew, and grime. We performed a low-pressure house wash — resulting in a stunning, bright, and refreshed exterior restored to its original curb appeal with no surface damage.",
    image: `${CDN}/house-washing_aa00df1e.webp`,
    tags: ["pressure washing", "house wash", "siding cleaning", "curb appeal restoration", "Vancouver WA"],
    location: "Vancouver, WA",
  },
  {
    id: 12,
    slug: "window-cleaning-service-in-camas",
    title: "Window Cleaning Service in Camas",
    category: "Windows",
    date: "June 16, 2025",
    excerpt: "Cleaned windows buried under dust, streaks, and spider webs — sills, tracks, and screens included.",
    description: "These windows in Camas were hidden behind layers of dust, streaks, and spider webs. Now they're sparkling and fresh — letting the light flood back in. We clean windows, interior sills, tracks, and screens throughout Clark County.",
    image: `${CDN}/window-cleaning_2282ea39.png`,
    tags: ["window cleaning", "streak removal", "interior sill cleaning", "Camas WA", "Clark County"],
    location: "Camas, WA",
  },
];


