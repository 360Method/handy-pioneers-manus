/**
 * Blog post data for Handy Pioneers
 * Each post follows the Hook-Story-Offer framework.
 * Add new posts to the TOP of the array (newest first).
 */

export interface BlogBlock {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "blockquote" | "cta";
  text?: string;
  items?: string[];
  ctaLabel?: string;
  ctaAction?: "booking" | "phone" | "link";
  ctaHref?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  author: string;
  category: string;
  audience: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  readTime: number;
  body: BlogBlock[];
  seoTitle?: string;
  seoDesc?: string;
}

export const blogPosts: BlogPost[] = [
  // ─── Post 11 — 360° Method (updated date) ───────────────────────────────
  {
    slug: "the-360-method-why-we-look-at-your-whole-home",
    title: "The 360° Method: Why We Look at Your Whole Home, Not Just the One Thing You Called About",
    excerpt:
      "Most contractors fix what you point at. We've built a system that finds what you haven't noticed yet — and it's changing how Clark County homeowners think about home care.",
    date: "March 7, 2026",
    isoDate: "2026-03-07",
    author: "Handy Pioneers Team",
    category: "Home Care Strategy",
    audience: ["Homeowners", "Prospects", "Clark County Community"],
    tags: [
      "360° Method",
      "whole home assessment",
      "preventive maintenance",
      "Vancouver WA",
      "Clark County",
      "home systems",
    ],
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/blog-360-method-hero_cd5decc0.jpg",
    imageAlt:
      "Pacific Northwest craftsman home exterior — the kind of home the 360° Method was designed to protect",
    readTime: 6,
    seoTitle:
      "The 360° Method: Whole Home Assessment in Vancouver WA | Handy Pioneers",
    seoDesc:
      "Most contractors fix what you point at. Handy Pioneers built the 360° Method — a complete home systems assessment that finds what you haven't noticed yet. Free for Clark County homeowners.",
    body: [
      {
        type: "p",
        text: "Most contractors fix what you point at. You call about a squeaky floor, they fix the squeaky floor. You call about a leaky faucet, they fix the leaky faucet. And then they leave — without ever telling you about the soft spot in the subfloor three feet away, or the slow drip under the cabinet that's been there since last winter.",
      },
      {
        type: "p",
        text: "We've built a different system. We call it the 360° Method — and it's changing how Clark County homeowners think about home care.",
      },
      {
        type: "h2",
        text: "The Story That Started It All",
      },
      {
        type: "p",
        text: "A homeowner in Camas called us about a squeaky floor in her hallway. Standard job — we've done hundreds of them. Our tech arrived, walked the hallway, and fixed the squeak in about 45 minutes.",
      },
      {
        type: "p",
        text: "But before he left, he did what we train every Handy Pioneers tech to do: he walked the rest of the house. Not intrusively — just a professional set of eyes moving through each space with a checklist in mind.",
      },
      {
        type: "p",
        text: "What he found: a bathroom exhaust fan that was venting into the attic instead of outside (a moisture and mold risk), a deck ledger board with early signs of separation from the house framing, two windows with failed seals (visible fogging between the panes), and a GFCI outlet in the garage that hadn't been tested in years and didn't trip when tested.",
      },
      {
        type: "p",
        text: "None of those things were why she called. All of them were real problems — at various stages of becoming expensive ones.",
      },
      {
        type: "p",
        text: "She left that visit with a written, prioritized home health report. Twelve items. Ranked by urgency. With rough cost estimates for each. She told us it was the first time in eight years of homeownership that she felt like she actually knew what was going on with her house.",
      },
      {
        type: "h2",
        text: "What the 360° Method Actually Is",
      },
      {
        type: "p",
        text: "A home is not a collection of independent problems. It's an interconnected system — and problems in one area almost always have causes or consequences in another. Water damage in a cabinet usually traces back to a failing supply line or a caulk gap at the sink. A soft floor usually means moisture below. A high energy bill usually means air sealing failures at the envelope.",
      },
      {
        type: "p",
        text: "The 360° Method is a structured walk-through protocol that Handy Pioneers runs on every new client engagement. It evaluates five interconnected systems:",
      },
      {
        type: "ul",
        items: [
          "**Envelope** — Roof condition, siding integrity, window and door seals, caulking lines, fascia and soffit",
          "**Structure** — Foundation visible areas, deck ledger and post bases, fence posts, stair stringers",
          "**Moisture** — Gutters and downspout extensions, crawl space vapor barrier, bathroom ventilation, under-sink areas",
          "**Interior Finish** — Flooring condition, wall and ceiling staining, trim and cabinetry, door and window operation",
          "**Safety** — GFCI outlets, smoke and CO detector placement and function, handrail integrity, egress windows",
        ],
      },
      {
        type: "p",
        text: "For each system, we're looking for three things: active problems that need immediate attention, early-stage issues that should be monitored or addressed this season, and deferred maintenance items that are fine now but will become expensive if ignored for another year or two.",
      },
      {
        type: "h2",
        text: "Why This Matters More in Clark County",
      },
      {
        type: "p",
        text: "The Pacific Northwest has a specific set of home health challenges that most national home care content doesn't address. The combination of wet winters, mild summers, and the freeze-thaw cycles in our shoulder seasons creates moisture stress that shows up in predictable places: deck ledger connections, window sill caulking, crawl space vapor barriers, and roof moss accumulation.",
      },
      {
        type: "p",
        text: "Clark County homes — especially those built in the 1980s through early 2000s — were often built with materials and techniques that are now at or past their expected service life. A 1995 deck. A 2002 roof. Original windows from when the house was built. These aren't problems yet. But they're on a timeline.",
      },
      {
        type: "p",
        text: "The 360° Method was designed specifically for this environment. It's not a generic national checklist — it's a protocol built around what actually fails in Clark County homes, in Clark County weather, at Clark County home ages.",
      },
      {
        type: "h2",
        text: "What You Get at the End",
      },
      {
        type: "p",
        text: "Every 360° Assessment produces a written home health report — a prioritized list of findings organized by urgency, with plain-language descriptions, photos of anything notable, and rough cost estimates for each item. You're not getting a sales pitch. You're getting information.",
      },
      {
        type: "p",
        text: "Some items you'll handle yourself. Some you'll want us to address. Some you'll want to get a second opinion on. That's fine. The goal of the 360° Method isn't to sell you a repair list — it's to make sure you know what's going on with your home so you can make informed decisions.",
      },
      {
        type: "blockquote",
        text: "\"I've owned this house for eight years and I've never felt like I actually knew what was going on with it. This was the first time.\" — Camas homeowner, 2026",
      },
      {
        type: "h2",
        text: "How to Get Your 360° Assessment",
      },
      {
        type: "p",
        text: "The 360° Assessment is free for new clients in Clark County. It takes about 60–90 minutes depending on the size of your home. You'll receive your written report within 24 hours of the visit.",
      },
      {
        type: "p",
        text: "If you're an existing Handy Pioneers client, ask your tech to run the 360° protocol on your next visit — we'll add it to any scheduled job at no additional charge.",
      },
      {
        type: "cta",
        text: "Schedule your free 360° Home Assessment",
        ctaLabel: "Schedule Free Assessment",
        ctaAction: "booking",
      },
    ],
  },

  // ─── Post 1 — Spring Maintenance Checklist ──────────────────────────────
  {
    slug: "3-things-vancouver-homeowners-forget-to-check-every-spring",
    title: "The 3 Things Vancouver Homeowners Forget to Check Every Spring (And Why One of Them Could Cost $10,000)",
    excerpt:
      "Most Clark County homeowners spend spring cleaning the inside of their house. The damage is almost always on the outside — and in three specific places most people never look.",
    date: "March 7, 2026",
    isoDate: "2026-03-07",
    author: "Handy Pioneers Team",
    category: "Seasonal Maintenance",
    audience: ["Homeowners", "Prospects"],
    tags: [
      "spring maintenance",
      "Vancouver WA",
      "Clark County",
      "home inspection",
      "deck repair",
      "water damage prevention",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    imageAlt:
      "Exterior of a Pacific Northwest home in spring — siding, deck, and windows visible",
    readTime: 5,
    seoTitle:
      "3 Spring Home Maintenance Checks Vancouver WA Homeowners Miss | Handy Pioneers",
    seoDesc:
      "Most Clark County homeowners miss three critical spring checks that can lead to $10,000+ in repairs. Handy Pioneers walks you through what to look for — and when to call a pro.",
    body: [
      {
        type: "p",
        text: "Most homeowners in Clark County spend spring cleaning the inside of their house. New season, fresh start — vacuum the carpets, wipe down the baseboards, maybe repaint a room. It feels productive. And it is.",
      },
      {
        type: "p",
        text: "But the damage is almost always on the outside. And in three specific places most people never think to look.",
      },
      {
        type: "p",
        text: "We've been inside hundreds of Clark County homes, and the pattern is consistent: the repairs that cost the most money are almost never the ones homeowners called about. They're the ones that were quietly getting worse in the background while everyone was focused on something else.",
      },
      {
        type: "p",
        text: "Here are the three checks we recommend every Vancouver-area homeowner make before April.",
      },
      {
        type: "h2",
        text: "1. The Deck Ledger Board",
      },
      {
        type: "p",
        text: "The ledger board is the horizontal framing member that connects your deck to your house. It's typically hidden behind the deck surface, bolted through the rim joist of your home's floor framing. And in the Pacific Northwest, it is the single most common source of structural deck failure.",
      },
      {
        type: "p",
        text: "Here's why: water gets behind the ledger flashing (or there is no flashing — common in decks built before 2000), sits against the wood through our wet winters, and causes rot that you can't see from the deck surface. By the time you notice the deck feels soft or bouncy, the rot has often spread into the rim joist of the house itself.",
      },
      {
        type: "p",
        text: "We had a job in Battle Ground last year where a homeowner called about a single soft board on their deck. When we pulled it up, we found the ledger had been rotting for at least two seasons. What would have been a $400 board replacement became a $4,200 structural repair — new ledger, new rim joist section, new flashing, new boards over the affected area.",
      },
      {
        type: "p",
        text: "**What to check:** From below the deck, look at where the deck frame meets the house. Look for dark staining, soft wood, gaps in the flashing, or any separation between the ledger and the house. If you see any of those, call a pro before you put weight on that deck this summer.",
      },
      {
        type: "h2",
        text: "2. The Crawl Space Vapor Barrier",
      },
      {
        type: "p",
        text: "Clark County gets an average of 42 inches of rain per year — most of it between October and April. That moisture doesn't just run off your roof. It saturates the soil around and under your foundation, and without a properly installed and maintained vapor barrier, it migrates up into your crawl space as humidity.",
      },
      {
        type: "p",
        text: "Elevated crawl space humidity causes wood rot in floor joists and subfloor sheathing, mold growth on framing members, and pest activity (termites and carpenter ants are attracted to moist wood). It also raises your heating and cooling costs because a damp crawl space makes your floor feel cold and your HVAC work harder.",
      },
      {
        type: "p",
        text: "**What to check:** If you can access your crawl space safely, look for torn, bunched, or missing vapor barrier sections. Look for standing water or dark staining on the ground. Look at the floor joists — if they're dark, soft, or show white fuzzy growth, that's a problem. If you haven't been in your crawl space in more than two years, spring is the time.",
      },
      {
        type: "h2",
        text: "3. Window and Door Caulk Lines",
      },
      {
        type: "p",
        text: "This one sounds minor. It isn't.",
      },
      {
        type: "p",
        text: "The caulk lines around your windows and doors are the primary barrier between the outside world and your wall cavity. When they crack, shrink, or separate — which happens every 5–7 years in our climate — water gets into the wall. Not a lot at first. A slow seep during heavy rain. But over one or two winters, that moisture saturates the insulation, wets the OSB sheathing, and begins to rot the framing.",
      },
      {
        type: "p",
        text: "By the time you see a water stain on your interior wall or ceiling, the damage inside the wall cavity is typically 3–5 times worse than what's visible.",
      },
      {
        type: "p",
        text: "**What to check:** Walk the exterior of your house and look at every window and door frame. Run your finger along the caulk line. If it's cracked, pulling away from the frame, or missing in sections, it needs to be replaced. This is a $150–$300 repair that prevents a $3,000–$8,000 wall repair.",
      },
      {
        type: "blockquote",
        text: "\"The repairs that cost the most money are almost never the ones homeowners called about. They're the ones that were quietly getting worse in the background.\"",
      },
      {
        type: "h2",
        text: "The 360° Spring Check",
      },
      {
        type: "p",
        text: "At Handy Pioneers, we look at your home as a complete system — not just individual repairs. Our 360° approach means that when we come out for any job, we're also looking at the things you didn't call about. Because catching a $300 problem before it becomes a $10,000 problem is the best service we can offer.",
      },
      {
        type: "p",
        text: "If you'd like us to walk your property this spring and give you a prioritized list of what needs attention — with no obligation to hire us for any of it — we're happy to do that. It takes about an hour and it's free.",
      },
      {
        type: "cta",
        text: "Book your free spring home assessment before our April schedule fills up.",
        ctaLabel: "Request Free Assessment",
        ctaAction: "booking",
      },
    ],
  },

  // ─── Post 2 — Pressure Washing Project Story ────────────────────────────
  {
    slug: "pressure-washing-3-driveways-in-one-week-vancouver",
    title: "We Pressure Washed 3 Driveways in One Week in Vancouver — Here's What We Found Under the Moss",
    excerpt:
      "Moss in the Pacific Northwest isn't just ugly — it's actively destroying your concrete. Here's what we uncovered on three Clark County driveways this spring, and what it means for yours.",
    date: "March 7, 2026",
    isoDate: "2026-03-07",
    author: "Handy Pioneers Team",
    category: "Project Story",
    audience: ["Current Clients", "Homeowners"],
    tags: [
      "pressure washing",
      "Vancouver WA",
      "driveway cleaning",
      "moss removal",
      "Clark County",
      "concrete maintenance",
    ],
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/blog-pressure-washing-driveway_797d78a6.jpg",
    imageAlt:
      "Before and after pressure washing a mossy concrete driveway in the Pacific Northwest",
    readTime: 4,
    seoTitle:
      "Pressure Washing Vancouver WA — What Moss Is Hiding on Your Driveway | Handy Pioneers",
    seoDesc:
      "Moss on your Clark County driveway isn't just cosmetic — it's destroying your concrete. Handy Pioneers shares what we found under the moss on three Vancouver driveways this spring.",
    body: [
      {
        type: "p",
        text: "Moss on your driveway looks like a cosmetic problem. It isn't.",
      },
      {
        type: "p",
        text: "Moss retains moisture against your concrete surface for weeks at a time — long after the rain has stopped. That sustained moisture accelerates a process called spalling: the surface layer of the concrete absorbs water, freezes during cold nights, expands, and breaks away. Over two or three winters, a moss-covered driveway can go from surface staining to active surface deterioration that no amount of pressure washing will fix.",
      },
      {
        type: "p",
        text: "We pressure washed three driveways in the Vancouver area this past week. Here's what we found under the moss on each one — and what it means for homeowners across Clark County.",
      },
      {
        type: "h2",
        text: "Driveway 1: Vancouver — Surface Checking and Oil Staining",
      },
      {
        type: "p",
        text: "This driveway had about two years of moss growth concentrated along the shaded north side closest to the house. Under the moss, we found hairline surface cracks (called checking) running with the aggregate pattern — a sign that the surface has been through multiple freeze-thaw cycles with retained moisture. We also found oil staining from a slow drip that had been masked by the moss.",
      },
      {
        type: "p",
        text: "The good news: the cracks were surface-only, not structural. After cleaning, we applied a penetrating concrete sealer to the affected area to slow future moisture absorption. The homeowner now has a clean surface and a maintenance baseline — we recommended re-sealing every two years.",
      },
      {
        type: "h2",
        text: "Driveway 2: Battle Ground — Joint Erosion",
      },
      {
        type: "p",
        text: "The second driveway was older — poured in the mid-1990s — and the expansion joints between the concrete slabs had lost most of their filler material. Moss had colonized the joints heavily, and the moisture retention there was accelerating erosion of the joint edges.",
      },
      {
        type: "p",
        text: "After cleaning, we re-filled the expansion joints with a flexible polyurethane sealant. This is a simple repair that most homeowners overlook — but open expansion joints are one of the primary entry points for water that causes slab heaving and cracking over time.",
      },
      {
        type: "h2",
        text: "Driveway 3: Camas — Clean Bill of Health",
      },
      {
        type: "p",
        text: "The third driveway looked the worst before we started — heavy moss coverage across the full surface. But under the moss, the concrete was in excellent condition. No cracking, no spalling, no joint erosion. The homeowner had sealed it about three years prior, and the sealer had done its job.",
      },
      {
        type: "p",
        text: "This is the best-case scenario: moss that looks bad but hasn't had time to cause damage. A thorough pressure wash, a moss inhibitor treatment, and a fresh coat of sealer — and this driveway is good for another five years.",
      },
      {
        type: "h2",
        text: "What This Means for Your Driveway",
      },
      {
        type: "p",
        text: "The pattern we see consistently across Clark County: homeowners wait until the moss is visually obvious before calling. By that point, the moss has usually been there for two or more years — which means the moisture damage has already started. The difference between a $250 cleaning and a $2,000+ resurfacing job is often just one or two seasons of waiting.",
      },
      {
        type: "p",
        text: "Spring is the ideal time to pressure wash — the moss is fully hydrated from winter rain and releases cleanly, and you have the full dry season ahead to apply sealer and let it cure properly.",
      },
      {
        type: "blockquote",
        text: "\"The difference between a $250 cleaning and a $2,000 resurfacing job is often just one or two seasons of waiting.\"",
      },
      {
        type: "cta",
        text: "Book your spring pressure wash before our April schedule fills up.",
        ctaLabel: "Book Pressure Wash",
        ctaAction: "booking",
      },
    ],
  },
];
