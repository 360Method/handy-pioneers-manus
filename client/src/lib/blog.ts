/**
 * Blog post data for Handy Pioneers
 * Author: Marcin Micek | Handy Pioneers
 * Drip-release schedule: 2 posts per week, Tuesdays & Fridays
 * March 10 - May 29, 2026
 *
 * Posts are filtered by publishDate - only posts whose date has passed
 * are shown on the site. This creates an automatic drip release.
 */

export interface BlogBlock {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "blockquote" | "cite" | "cta";
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
  publishDate: string;
  author: string;
  category: string;
  audience: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  readTime: number;
  body: BlogBlock[];
  references?: { label: string; url: string }[];
  seoTitle?: string;
  seoDesc?: string;
}

/** Returns only posts whose publishDate is today or in the past, newest first */
export function getPublishedPosts(): BlogPost[] {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return blogPosts
    .filter((p) => new Date(p.publishDate) <= today)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
}

export const blogPosts: BlogPost[] = [

  {
    "slug": "what-a-remodel-costs-clark-county-2026",
    "title": "What a Remodel Actually Costs in Clark County (Real 2026 Ranges)",
    "excerpt": "Most contractors will not put a number anywhere near their website. We will. Here are honest, realistic investment ranges for kitchens, baths, flooring, basements, and painting in Clark County, plus a calculator that shows where your project lands.",
    "date": "June 29, 2026",
    "isoDate": "2026-06-29",
    "publishDate": "2026-06-29",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling & Cost",
    "audience": ["Homeowners"],
    "tags": [
      "remodel cost Clark County",
      "kitchen remodel cost Vancouver WA",
      "bathroom remodel cost Vancouver WA",
      "home remodel pricing transparency"
    ],
    "image": "https://handypioneers.com/images/blog/what-a-remodel-costs-clark-county-2026.webp",
    "imageAlt": "A bright, finished Clark County remodel with new cabinets, counters, and flooring",
    "readTime": 7,
    "seoTitle": "What a Remodel Costs in Clark County, WA (Real 2026 Ranges) | Handy Pioneers",
    "seoDesc": "Honest, realistic remodel investment ranges for Clark County, WA: kitchens, baths, flooring, basements, and painting, plus a calculator to estimate your project.",
    "body": [
      { "type": "p", "text": "Ask most contractors what a remodel costs and you get the same answer: \"it depends.\" It is true, but it is also a dodge. You are trying to figure out whether a project is a $15,000 conversation or a $90,000 one, and \"it depends\" sends you to call three more companies and sit through three more pitches before anyone gives you a number." },
      { "type": "p", "text": "So we are going to do the thing almost nobody in this trade does: publish our pricing. Below are honest, realistic investment ranges for the projects Clark County homeowners ask about most. These are complete ranges with everything included, not a teaser number that balloons once the work starts. Read them, see if the project fits your plans, and then decide whether it is worth a real conversation." },
      { "type": "h2", "text": "Why we put our numbers on the internet" },
      { "type": "p", "text": "A remodel is one of the largest investments you make in your home. You deserve to walk into it with your eyes open, not to have a price held back until a salesperson is standing in your kitchen. We would rather you see a realistic range now and trust us because we were straight with you from the first click." },
      { "type": "p", "text": "It also fits how we work. We are not chasing one-and-done jobs. Through the 360 Method, we partner with homeowners on the whole home over time: assess it, document it, and keep it maintained so the money you put in holds its value. A relationship like that does not start with a number we cannot stand behind." },
      { "type": "h2", "text": "How to read these ranges" },
      { "type": "p", "text": "Each range below is for an average-size project at a Good-to-Best level of finish. Smaller jobs land lower; premium finishes and larger spaces go higher. The ranges assume one accountable team doing the whole scope the right way, including the planning and the parts you do not see. Your real number comes from a walkthrough, where we measure the space, look at what is behind the walls, and put a written scope in front of you before anything is torn out." },
      { "type": "h2", "text": "Kitchen remodel: roughly $30,000 to $90,000+" },
      { "type": "p", "text": "Kitchens cover the widest range because they hold the most moving parts: cabinets, countertops, appliances, lighting, plumbing, and the layout itself. A refreshed kitchen with quality stock cabinets and durable surfaces sits near the bottom. Semi-custom cabinets, quartz, and a tile backsplash move you into the middle. Custom cabinetry, premium stone, and a reworked layout push toward the top, and a full chef-grade kitchen goes beyond it." },
      { "type": "h2", "text": "Bathroom remodel: roughly $12,000 to $35,000+" },
      { "type": "p", "text": "A full bathroom remodel runs from tear-out to turnkey: demo, surfaces, fixtures, and finish. A clean, solid bathroom with quality stock fixtures anchors the low end. Upgraded tile, name-brand fixtures, and better lighting step it up. Custom tile work, frameless glass, and a spa-level finish carry it higher, especially in a larger primary bath." },
      { "type": "h2", "text": "Flooring replacement: roughly $5,000 to $17,000+" },
      { "type": "p", "text": "Flooring is priced by the area you are replacing. Quality luxury vinyl plank or carpet is durable and family-proof at the low end. Premium LVP, engineered hardwood, or tile lands in the middle. Solid hardwood and large-format tile with upgraded prep and transitions reach the top. The bigger the area, the more the material choice drives the total." },
      { "type": "h2", "text": "Basement finish: roughly $30,000 to $95,000+" },
      { "type": "p", "text": "Finishing a basement turns raw space into real living space: framing, insulation, drywall, flooring, lighting, and finish. A clean finished room anchors the low end. A finished ceiling system, upgraded flooring, and built-in lighting move it up. A full living suite with a wet-bar rough-in, premium finishes, and custom built-ins carries it higher. Square footage is the biggest lever here." },
      { "type": "h2", "text": "Interior repaint: roughly $6,000 to $18,000+" },
      { "type": "p", "text": "A whole-interior repaint is priced by the floor area you are covering. Walls in a quality washable paint with standard prep is the baseline. Adding trim, doors, and upgraded prep steps it up. Walls, trim, doors, and ceilings with premium paint and full surface repair reach the top. Prep is where the quality difference actually lives, and it is where cheap quotes cut corners." },
      { "type": "blockquote", "text": "A web page can get you close. Only a walkthrough gets you exact. We measure, we look behind the walls, and we write the scope down before anyone swings a hammer." },
      { "type": "h2", "text": "See where your project lands" },
      { "type": "p", "text": "We built a quick estimator so you do not have to do the math. Pick your project, slide the size, choose a level of finish, and it shows a realistic range in seconds. It is the same retail pricing our team works from, published for you to use before you ever call." },
      { "type": "cta", "text": "Want to see where your specific project lands?", "ctaLabel": "Try the cost estimator", "ctaAction": "link", "ctaHref": "/remodel-cost" }
    ]
  },

  {
    "slug": "what-does-a-kitchen-remodel-cost-vancouver-wa",
    "title": "What Does a Kitchen Remodel Cost in Vancouver, WA?",
    "excerpt": "A kitchen remodel in Clark County can land anywhere from a finish refresh to a full gut. Here is an honest look at what drives the number, what national data shows, and why a written scope beats a guess.",
    "date": "June 24, 2026",
    "isoDate": "2026-06-24",
    "publishDate": "2026-06-24",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "kitchen remodel cost Vancouver WA",
      "kitchen remodel Clark County",
      "kitchen renovation budget"
    ],
    "image": "https://handypioneers.com/images/blog/what-does-a-kitchen-remodel-cost-vancouver-wa.webp",
    "imageAlt": "A remodeled Clark County kitchen with new cabinets, quartz countertops, and a center island",
    "readTime": 6,
    "seoTitle": "Kitchen Remodel Cost in Vancouver, WA | Handy Pioneers",
    "seoDesc": "How much does a kitchen remodel cost in Vancouver, WA? What drives the price, what national data shows, and why a written scope beats a number sight unseen.",
    "references": [
      {
        "label": "NerdWallet: Kitchen Remodel Cost (citing the 2025 Cost vs. Value Report)",
        "url": "https://www.nerdwallet.com/home-ownership/home-improvement/learn/kitchen-remodel-cost"
      },
      {
        "label": "JLC / Zonda: 2025 Cost vs. Value Report, Pacific region",
        "url": "https://www.jlconline.com/cost-vs-value/2025/pacific/"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "There is no single price, and anyone who gives you one over the phone is guessing. A kitchen remodel in Vancouver, WA can range from a finish refresh (new counters, paint, hardware) to a full gut that moves walls, plumbing, and electrical. National data from the 2025 Cost vs. Value Report puts a minor kitchen remodel near $28,000 and a major midrange remodel near $83,000, with upscale major remodels above $160,000 [1]. The Pacific region (Washington, Oregon, California, Alaska) tends to run at the high end of those figures because of labor and material costs here [2]. Your number depends on size, finish level, and how much you change behind the walls. The honest way to find it is a walk-through and a written scope."
      },
      {
        "type": "h2",
        "text": "The three honest tiers most kitchens fall into"
      },
      {
        "type": "p",
        "text": "Kitchen projects sort into three rough buckets. Knowing which one you are in gets you most of the way to a realistic budget before anyone measures."
      },
      {
        "type": "ul",
        "items": [
          "Refresh: keep the layout, replace surfaces. New countertops, backsplash, paint, hardware, maybe a sink and faucet. Cabinets stay or get refaced. The lowest-cost path because nothing moves behind the walls.",
          "Mid-range remodel: new semi-custom cabinets, new countertops, updated appliances, new lighting and flooring. Layout mostly stays the same. This is where most Clark County homeowners land.",
          "Full remodel: the layout changes. Walls, plumbing, gas, and electrical move. Custom cabinetry, an added island, premium counters. This is the top of the range and where surprises live."
        ]
      },
      {
        "type": "p",
        "text": "The jump from refresh to full remodel is not small. The same kitchen footprint can swing widely depending on which tier you choose, which is why a number means nothing until the scope is on paper."
      },
      {
        "type": "h2",
        "text": "What actually drives the cost"
      },
      {
        "type": "p",
        "text": "A few decisions move the price far more than the rest. Understanding them helps you spend where it matters and hold back where it does not."
      },
      {
        "type": "ul",
        "items": [
          "Cabinets. Almost always the single biggest line. Stock, semi-custom, and full-custom cabinetry are different worlds in both price and lead time.",
          "Countertops. Material (laminate, butcher block, quartz, natural stone) and square footage set this number. Quartz is the common mid-range choice here.",
          "Layout changes. The moment a wall, sink, or stove moves, you add plumbing, electrical, and sometimes structural work. This is the biggest hidden cost driver.",
          "Appliances. A standard package and a pro-grade package can differ by many thousands of dollars on their own.",
          "Finish level. Tile, fixtures, hardware, and lighting add up quietly. Ten small upgrade decisions can move the total as much as one big one."
        ]
      },
      {
        "type": "h2",
        "text": "What the national data says (and how to read it)"
      },
      {
        "type": "p",
        "text": "The 2025 Cost vs. Value Report is one of the most cited sources for remodeling costs. It puts a minor (refresh-style) kitchen remodel near $28,000, a major midrange remodel near $83,000, and a major upscale remodel near $164,000 nationally [1]. Read these as general market data, not a quote. They describe defined project scopes on a typical home, and your kitchen is not the report's average kitchen."
      },
      {
        "type": "p",
        "text": "The same report ranks the Pacific region first in the country for remodeling return on cost, with a minor kitchen remodel recovering well over its cost at resale [2]. Useful context if you are weighing whether the work holds its value here in the Northwest."
      },
      {
        "type": "h2",
        "text": "Why Clark County kitchens have their own quirks"
      },
      {
        "type": "p",
        "text": "Homes in Vancouver, Camas, Washougal, and the surrounding area span a wide range of ages and build styles. Older homes hide more behind the walls: outdated wiring, plumbing that was never meant to move, framing that is not square. None of that shows up in a phone estimate. It shows up the day a cabinet comes off the wall."
      },
      {
        "type": "p",
        "text": "Permits matter too. A remodel that moves plumbing, gas, or electrical in Clark County needs the right permits and licensed trades for those phases. Handy Pioneers is licensed in Washington and brings in the licensed trades each phase requires, so the work passes inspection and the warranty means something. We work Clark County only and do not serve Oregon."
      },
      {
        "type": "h2",
        "text": "Why a written scope beats a number sight unseen"
      },
      {
        "type": "p",
        "text": "A real price comes from a real scope: measured dimensions, the cabinets and counters you actually chose, what moves and what stays, and the condition of what is behind the walls. A number given before any of that exists is a guess that almost always changes once work starts. That is how budgets blow up."
      },
      {
        "type": "p",
        "text": "When we walk a kitchen, we look at the bones, not just the surfaces. Then you get a written scope and a price tied to it, with the assumptions spelled out. If something does change once we open a wall, you see it in writing before any added work proceeds. No surprise bills."
      },
      {
        "type": "blockquote",
        "text": "The cheapest kitchen remodel is the one priced honestly the first time, because you are not paying twice to fix the parts a phone quote skipped."
      },
      {
        "type": "cta",
        "text": "Want a real number for your kitchen instead of a guess? We will walk your space and give you a written scope and price you can actually budget against.",
        "ctaLabel": "See Kitchen Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/kitchen-remodel"
      }
    ]
  },
  {
    "slug": "how-long-does-a-kitchen-remodel-take-clark-county",
    "title": "How Long Does a Kitchen Remodel Take? A Clark County Timeline",
    "excerpt": "A realistic phase-by-phase kitchen remodel timeline for Clark County homes, plus the things that stretch it and how planning before demo keeps you on track.",
    "date": "June 30, 2026",
    "isoDate": "2026-06-30",
    "publishDate": "2026-06-30",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "kitchen remodel timeline",
      "kitchen remodel Vancouver WA",
      "kitchen renovation"
    ],
    "image": "https://handypioneers.com/images/blog/how-long-does-a-kitchen-remodel-take-clark-county.webp",
    "imageAlt": "A kitchen remodel in progress in a Clark County home, with cabinets removed and rough-in work underway",
    "readTime": 6,
    "seoTitle": "How Long Does a Kitchen Remodel Take? Clark County Timeline | Handy Pioneers",
    "seoDesc": "A realistic kitchen remodel timeline for Vancouver WA and Clark County: phase by phase, what stretches it, and why planning before demo keeps it on track.",
    "references": [
      {
        "label": "KraftMaid: Kitchen and Bath Remodel Project Timeline",
        "url": "https://www.kraftmaid.com/getting-ready/planning-your-project/project-timeline/"
      },
      {
        "label": "National Kitchen and Bath Association (NKBA)",
        "url": "https://nkba.org/"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Most kitchen remodels in Clark County run about 4 to 6 months from your first planning conversation to the final walkthrough. The part where your kitchen is actually torn apart and unusable is shorter, usually 6 to 10 weeks. The long stretch up front is planning, selections, and waiting on materials, especially cabinets, which can take 8 weeks or more to build and ship [1]. The single biggest thing you control is how much you decide before demo starts. A kitchen with a finalized layout, ordered cabinets, and chosen counters moves fast. One that is still picking tile after the walls are open will stall."
      },
      {
        "type": "h2",
        "text": "The short answer and the honest one"
      },
      {
        "type": "p",
        "text": "If someone tells you a full kitchen remodel will be done in two weeks, they are either talking about a cosmetic refresh or they are not counting the planning and lead times. The active construction can be quick. Getting to the point where construction can start is what takes time. We would rather give you a realistic kitchen remodel timeline than a hopeful one that slips."
      },
      {
        "type": "h2",
        "text": "Phase 1: Planning and selections (2 to 8 weeks)"
      },
      {
        "type": "p",
        "text": "This is where the project is won or lost. We measure the space, talk through how you actually use the kitchen, and lock the layout. Then come selections: cabinets, countertop material, sink and faucet, appliances, flooring, lighting, and the backsplash. Every one of these has to be decided before the right phase, and some have to be decided early so they can be ordered."
      },
      {
        "type": "p",
        "text": "Cabinets drive the whole schedule. Industry planning guidance recommends finalizing your cabinet specs well before install day, because that is the part you wait on. Get selections done here and the rest of the project has a clear runway."
      },
      {
        "type": "h2",
        "text": "Phase 2: Permitting, if the work needs it"
      },
      {
        "type": "p",
        "text": "Not every kitchen remodel needs a permit, but many do. Moving plumbing, adding or relocating electrical circuits, or taking out a wall usually triggers one with the local jurisdiction (the City of Vancouver, Camas, Washougal, or Clark County, depending on where you live). A like-for-like swap that keeps everything in place often does not. We handle the permit process where it applies and build the review time into the schedule so it does not surprise you mid-project."
      },
      {
        "type": "h2",
        "text": "Phase 3: Ordering and lead times (the wait that overlaps planning)"
      },
      {
        "type": "p",
        "text": "Once selections are final, cabinets and counters get ordered. This is the long pole. Stock cabinets can arrive in a few weeks. Semi-custom and custom cabinets commonly run 8 to 12 weeks or more to manufacture [1]. We schedule demo to land near cabinet delivery so your kitchen is not torn out and sitting empty for a month waiting on boxes. Ordering early, during planning, is how you keep the timeline tight."
      },
      {
        "type": "h2",
        "text": "Phase 4: Demo through finish (the 6 to 10 weeks of construction)"
      },
      {
        "type": "p",
        "text": "This is the part most people picture when they think remodel. Here is roughly how it sequences once the work starts:"
      },
      {
        "type": "ol",
        "items": [
          "Demolition: 1 to 3 days. Old cabinets, counters, and flooring come out.",
          "Rough-in: plumbing and electrical get moved or added while the walls are open, then inspected if a permit applies.",
          "Drywall, paint, and flooring: the room gets put back to a finished shell ready for cabinets.",
          "Cabinet installation: a few days to a week, depending on the size of the kitchen.",
          "Countertop template and install: counters are measured (templated) only after cabinets are set, then fabricated and installed, which adds about 1 to 2 weeks of wait between template and install.",
          "Tile and backsplash: goes in after counters.",
          "Finish and punch list: faucet, appliances, hardware, trim, and a final walkthrough to catch anything that needs touching up."
        ]
      },
      {
        "type": "p",
        "text": "The countertop gap catches people off guard. Counters cannot be templated until the cabinets are physically in place, so there is a built-in pause while they are fabricated. We plan around it instead of pretending it does not exist."
      },
      {
        "type": "h2",
        "text": "What stretches a kitchen remodel timeline"
      },
      {
        "type": "p",
        "text": "A few things reliably add weeks. Knowing them ahead of time is how you avoid them."
      },
      {
        "type": "ul",
        "items": [
          "Custom cabinet lead times. The fancier and more bespoke the cabinets, the longer the build. Order early.",
          "Layout changes after demo. Deciding to move the sink once the walls are open means new plumbing, new electrical, sometimes a new permit, and a reset clock.",
          "Surprises behind the walls. Older Clark County homes can hide outdated wiring, hidden water damage, or plumbing that is not where the drawings expect. We open things up, show you, and price the fix before moving on.",
          "Slow selections. The backsplash you keep going back and forth on can hold up the whole finish phase.",
          "Appliance and fixture backorders. A specialty range with a long lead time can become the new bottleneck if it is ordered late."
        ]
      },
      {
        "type": "h2",
        "text": "Why planning before demo keeps it on track"
      },
      {
        "type": "p",
        "text": "The pattern is simple. The projects that finish close to schedule are the ones where the decisions were made on paper before anyone swung a hammer [1]. When the layout is set, the cabinets are ordered, and the counters and tile are chosen, the construction phase becomes a sequence the team can run cleanly. When decisions are still open after demo, every pending choice becomes a place the project can sit and wait."
      },
      {
        "type": "p",
        "text": "That is why we put real work into the front end. A written scope, a confirmed layout, and ordered materials before demo are what let us give you a date and keep it. The National Kitchen and Bath Association points to the same thing: time spent planning is time saved on the back end [2]."
      },
      {
        "type": "cta",
        "text": "Want a realistic timeline for your kitchen instead of a guess? We will walk the space, talk through what you want, and put a clear written scope and schedule in your hands. Call us at (360) 838-6731 or start here.",
        "ctaLabel": "See Kitchen Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/kitchen-remodel"
      }
    ]
  },
  {
    "slug": "bathroom-remodel-pnw-wet-climate",
    "title": "Bathroom Remodeling in the Pacific Northwest: What the Wet Climate Changes",
    "excerpt": "In a wet climate, the parts of a bathroom remodel you cannot see matter more than the tile you can. Here is what protects the work behind the walls.",
    "date": "June 24, 2026",
    "isoDate": "2026-06-24",
    "publishDate": "2026-06-24",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "bathroom remodel Vancouver WA",
      "bathroom remodel Pacific Northwest",
      "bathroom renovation Clark County",
      "shower waterproofing",
      "bathroom ventilation",
      "mold prevention"
    ],
    "image": "https://handypioneers.com/images/blog/bathroom-remodel-pnw-wet-climate.webp",
    "imageAlt": "Clean remodeled bathroom in a Clark County home with tiled shower and proper ventilation",
    "readTime": 6,
    "seoTitle": "Bathroom Remodel in the Pacific Northwest: What the Wet Climate Changes | Handy Pioneers",
    "seoDesc": "Before you remodel a bathroom in Vancouver WA, know what the wet PNW climate changes: waterproofing, ventilation, and moisture-smart materials.",
    "references": [
      {
        "label": "U.S. EPA: A Brief Guide to Mold, Moisture and Your Home",
        "url": "https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home"
      },
      {
        "label": "Home Ventilating Institute (HVI): Bathroom Exhaust Fans",
        "url": "https://www.hvi.org/resources/publications/bathroom-exhaust-fans/"
      },
      {
        "label": "Schluter Systems: Tiled Shower Waterproofing Systems",
        "url": "https://www.schluter.com/schluter-us/en_US/article-tiled-shower-waterproofing"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Before you remodel a bathroom in the Pacific Northwest, plan around moisture first and looks second. Our wet climate keeps indoor humidity high for months, so the parts you never see (the shower waterproofing, the exhaust fan, the way the plumbing is detailed) decide whether the room lasts or rots. The EPA puts it plainly: the key to mold control is moisture control [1]. Get the hidden work right and a bathroom remodel in Vancouver WA can stay dry behind the walls for decades. Get it wrong and the prettiest tile in the world sits on top of a problem."
      },
      {
        "type": "h2",
        "text": "Why the wet climate changes the priorities"
      },
      {
        "type": "p",
        "text": "In a drier region, a bathroom dries out fast between uses. Here it often does not. Long stretches of damp, cool weather mean a Clark County bathroom can hold humidity for hours after a shower. The EPA recommends keeping indoor humidity below 60 percent, ideally between 30 and 50 percent, because anything higher invites condensation and mold [1]. That single fact reorders the whole project. Fixtures and finishes are the easy part. The waterproofing, ventilation, materials, and plumbing detailing are what a bathroom remodel in the Pacific Northwest has to get right."
      },
      {
        "type": "h2",
        "text": "Waterproofing: the shower is a system, not a surface"
      },
      {
        "type": "p",
        "text": "Tile and grout are not waterproof. Water passes through grout lines and sits behind the tile, so the real barrier is the membrane underneath. As Schluter explains, tile has to be installed with a waterproofing system that manages the moisture that gets past it [3]. Two pieces matter most:"
      },
      {
        "type": "ul",
        "items": [
          "A bonded or sheet membrane behind the walls and under the floor that actually stops water, sealed tight at the drain and every corner.",
          "A shower base sloped to the drain so water leaves instead of pooling. Industry standard slope is about a quarter inch per foot; skip it and water saturates the bed and breeds mold [3]."
        ]
      },
      {
        "type": "p",
        "text": "Curbs, niches, benches, and the drain connection are the spots that fail when they are rushed. Done right, the membrane and the sloped base work together so water that gets through the tile still drains away instead of soaking the framing."
      },
      {
        "type": "h2",
        "text": "Ventilation: the fan is not optional here"
      },
      {
        "type": "p",
        "text": "An exhaust fan is the cheapest insurance in the room, and in our climate it earns its keep. It has to be sized to the space and vented all the way outside, never into the attic. The Home Ventilating Institute recommends at least 1 CFM per square foot of floor for a bathroom up to 100 square feet, with a 50 CFM minimum [2]. A few rules we hold to:"
      },
      {
        "type": "ul",
        "items": [
          "Size the fan to the room, then duct it straight to the exterior of the house [2].",
          "Place the fan over or very near the shower or tub where the moist air starts [2].",
          "Add a timer or humidity switch so it keeps running after the shower and pulls the room back under that 60 percent humidity line [1]."
        ]
      },
      {
        "type": "p",
        "text": "A fan that is too small, or one that dumps warm wet air into the attic, is a slow leak you cannot see until the damage shows."
      },
      {
        "type": "h2",
        "text": "Materials that handle moisture"
      },
      {
        "type": "p",
        "text": "What goes on the walls and floor should expect to get wet. Standard paper-faced drywall in a wet zone is a mistake. We use moisture-resistant or cement backer board behind tile, sealed properly, plus paint and finishes rated for high humidity outside the wet zone. None of this costs much more up front, and all of it buys years on the back end. The goal is a room where damp surfaces dry within a day or two, the window the EPA gives before mold takes hold [1]."
      },
      {
        "type": "h2",
        "text": "Plumbing detailing that prevents slow leaks"
      },
      {
        "type": "p",
        "text": "The leaks that do the most damage are the quiet ones. A drip behind a wall or under a vanity can run for months before a stain appears. Good plumbing detailing during a remodel means proper connections, clean seals at the valve and drain, and access where a fixture might need service later. We pressure-test and check the work before anything gets closed up, because once tile is on, a hidden leak is expensive to chase. Sealing around the tub, the base of the toilet, and every penetration keeps water on the right side of the wall."
      },
      {
        "type": "h2",
        "text": "Signs of past water damage to check first"
      },
      {
        "type": "p",
        "text": "Before you spend on a new look, find out what the old bathroom was hiding. Walk the room and look for:"
      },
      {
        "type": "ul",
        "items": [
          "Soft or spongy spots in the floor near the toilet, tub, or shower.",
          "Cracked, missing, or discolored grout and caulk, especially in shower corners.",
          "Peeling paint, bubbling, or staining on walls and ceilings.",
          "A musty smell that does not clear after the fan runs.",
          "Loose tiles or a floor that flexes underfoot.",
          "Water stains on the ceiling of the room below the bathroom."
        ]
      },
      {
        "type": "p",
        "text": "Any of these can mean moisture has already been at work. Opening the wall during a planned remodel is the right time to find and fix the source, not patch over it [1]."
      },
      {
        "type": "h2",
        "text": "Why the hidden work protects your investment"
      },
      {
        "type": "p",
        "text": "A bathroom is one of the higher-value rooms in a home, and in a wet climate it is also one of the most exposed. The waterproofing, ventilation, materials, and plumbing are what keep that value intact. Skimp on the membrane and the fan and you are buying a problem with a nice finish on top. Spend where it counts and a bathroom renovation in Clark County stays sound and dry for decades. That is the difference between a remodel that looks good on day one and one that still protects the house on year fifteen. Our team handles the full scope and brings in the licensed trades each phase requires. Reach Handy Pioneers at (360) 838-6731."
      },
      {
        "type": "cta",
        "text": "Want a bathroom that stays dry behind the walls, not just one that looks good on day one? We will walk your space and give you a clear written scope that covers the waterproofing, ventilation, and plumbing detailing, not just the finishes.",
        "ctaLabel": "See Bathroom Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/bathroom-remodel"
      }
    ]
  },
  {
    "slug": "walk-in-shower-vs-tub-clark-county-home-value",
    "title": "Walk-In Shower vs Tub: What Adds Value in a Clark County Home",
    "excerpt": "Whether to swap a tub for a walk-in shower depends on which bathroom you mean. Here is how to weigh resale, families, and aging in place in Clark County, WA.",
    "date": "July 3, 2026",
    "isoDate": "2026-07-03",
    "publishDate": "2026-07-03",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "walk-in shower vs tub",
      "bathroom remodel Clark County",
      "home value",
      "aging in place",
      "curbless shower"
    ],
    "image": "https://handypioneers.com/images/blog/walk-in-shower-vs-tub-clark-county-home-value.webp",
    "imageAlt": "Remodeled bathroom with a glass-enclosed walk-in shower and tile floor",
    "readTime": 6,
    "seoTitle": "Walk-In Shower vs Tub: What Adds Value | Handy Pioneers",
    "seoDesc": "Walk-in shower vs tub for a Clark County home: resale, families, and aging-in-place trade-offs, plus when to keep at least one tub.",
    "references": [
      {
        "label": "Glass Doctor: Walk-in Shower vs. Bathtub Resale Value",
        "url": "https://glassdoctor.com/blog/walk-in-shower-vs-bathtub-resale-value"
      },
      {
        "label": "AARP: Bathroom Upgrades as You Age",
        "url": "https://www.aarp.org/home-living/bathroom-upgrades-as-you-age/"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Should you replace your tub with a walk-in shower? It depends on which bathroom you mean. In the primary bath, a clean walk-in shower usually adds appeal and works better day to day, especially if you plan to stay in the home for years. The catch is the resale rule of thumb: keep at least one bathtub somewhere in the house. Real estate guidance points to a one-tub rule, since families with young kids and many buyers still expect a tub [1]. So the honest answer for most Clark County homes is to upgrade the primary bath to a shower and leave one tub in a hall or guest bath. Below is how to make that call for your home."
      },
      {
        "type": "h2",
        "text": "Start with the question: which bathroom?"
      },
      {
        "type": "p",
        "text": "This is the part most advice skips. A house is not one decision. The primary bathroom, the hall bath, and a guest bath each play a different role. The smart move is rarely to rip out every tub or keep every tub. It is to match each room to how it gets used and who might buy the home later."
      },
      {
        "type": "p",
        "text": "If your primary bath is where you start and end your day, a walk-in shower tends to win on comfort and looks. If the only tub in the house sits in that same primary bath, slow down before you pull it."
      },
      {
        "type": "h2",
        "text": "What buyers in this market tend to want"
      },
      {
        "type": "p",
        "text": "Two things are true at once. Updated walk-in showers, especially in the primary bath, read as modern and are a strong draw for buyers. And homes that keep at least one tub appeal to a wider pool, because families with small children often want one [1]. Removing your only tub can shrink that pool."
      },
      {
        "type": "p",
        "text": "The balanced setup performs best across the most buyers: one upgraded shower for daily use and modern appeal, plus one tub kept for flexibility [1]. If your home has two or more full baths, you usually get to have both."
      },
      {
        "type": "h2",
        "text": "The case for a walk-in shower"
      },
      {
        "type": "p",
        "text": "A walk-in shower is easier to clean, easier to step into, and usually feels larger and more open than a tub-shower combo. For a primary bath you use every day, that adds up. A curbless version removes the step over the threshold entirely, which helps anyone with balance issues, fatigue, or a temporary injury [2]."
      },
      {
        "type": "ul",
        "items": [
          "Easier daily entry and exit, no high tub wall to climb over",
          "More open, modern feel that photographs well for resale",
          "Simpler to clean than a tub surround",
          "Room for a built-in bench and grab-bar backing if you plan ahead"
        ]
      },
      {
        "type": "h2",
        "text": "Accessibility and aging in place"
      },
      {
        "type": "p",
        "text": "If you intend to stay in your home as you get older, this matters more than resale. AARP notes that most adults over 50 plan to stay in their homes as they age, and the bathroom is one of the highest-risk rooms for falls [2]. A curbless walk-in shower is a core aging-in-place feature: less to trip on, room for a seat, and space for a walker or wheelchair if it is ever needed."
      },
      {
        "type": "p",
        "text": "Even if you are nowhere near needing it, a few low-cost moves now make later changes simple. The most useful is wall blocking behind the tile so grab bars can be added wherever you want them, without opening the wall again [2]. We can install that during the remodel so the room is ready for the future without looking clinical today."
      },
      {
        "type": "h2",
        "text": "Waterproofing a curbless conversion"
      },
      {
        "type": "p",
        "text": "A curbless shower is the most demanding part to get right. With no curb to hold water back, the waterproofing and the floor slope do all the work. Done well, it is reliable for decades. Done poorly, water finds the subfloor and you are paying twice."
      },
      {
        "type": "ol",
        "items": [
          "The shower floor is sloped to the drain so water never reaches the bathroom floor.",
          "A linear drain at the entry or far wall is common in curbless designs and makes the slope easier to hide.",
          "A continuous waterproof membrane runs across the floor and up the walls before any tile goes on.",
          "The bathroom floor outside the shower may need to drop slightly, or the framing gets adjusted, so the transition stays flush.",
          "Everything is tested and verified before tile, because fixing it after is the expensive path."
        ]
      },
      {
        "type": "p",
        "text": "This is the kind of work where the licensed trades each phase requires earn their keep. Our team plans the slope, drain, and membrane up front so the finished room looks simple and stays dry."
      },
      {
        "type": "h2",
        "text": "How to decide for your home"
      },
      {
        "type": "p",
        "text": "Walk it through with these questions. They settle most cases quickly."
      },
      {
        "type": "ul",
        "items": [
          "How many full baths do you have? With two or more, keep one tub and convert the others if you like.",
          "Is your only tub in the primary bath? If so, consider moving the tub to a secondary bath rather than losing it.",
          "Do you have or expect young kids, or do buyers in your area? Keep a tub.",
          "Are you planning to stay long term? Lean toward a curbless walk-in shower with grab-bar backing.",
          "Selling within a year or two? A clean, updated shower plus one retained tub is the safe play."
        ]
      },
      {
        "type": "p",
        "text": "There is no single right answer, and anyone who gives you one without asking about your house is guessing. The goal is a bathroom that fits how you live now and does not box you in later."
      },
      {
        "type": "blockquote",
        "text": "The strongest setup for most homes is one upgraded walk-in shower and at least one tub kept somewhere in the house. You get the modern primary bath and the broad buyer appeal at the same time."
      },
      {
        "type": "cta",
        "text": "Not sure which bathroom to change or what fits your budget? We will walk your home, talk through the trade-offs honestly, and help you pick the option that fits your plans, not push one answer. Call us at (360) 838-6731 to start the conversation.",
        "ctaLabel": "See Bathroom Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/bathroom-remodel"
      }
    ]
  },
  {
    "slug": "deck-repair-vs-replace-clark-county",
    "title": "Repair or Replace? How to Know If Your Deck Needs Restoration or a Rebuild",
    "excerpt": "A plain decision framework for Clark County homeowners: when deck restoration is enough, when a rebuild is the honest call, and what to inspect before you spend a dollar.",
    "date": "June 24, 2026",
    "isoDate": "2026-06-24",
    "publishDate": "2026-06-24",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Decks & Exterior",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "deck repair vs replace",
      "deck restoration Vancouver WA",
      "deck safety Clark County",
      "deck inspection",
      "wood rot"
    ],
    "image": "https://handypioneers.com/images/blog/deck-repair-vs-replace-clark-county.webp",
    "imageAlt": "A weathered cedar deck in the Pacific Northwest being inspected for soft boards, rot, and ledger damage before a repair or replace decision",
    "readTime": 6,
    "seoTitle": "Deck Repair vs Replace: How to Decide | Handy Pioneers",
    "seoDesc": "Should you repair or replace your deck? A Clark County WA guide to when restoration is enough and when a rebuild is the honest, safe call.",
    "references": [
      {
        "label": "NADRA: How Ledger Boards Impact Deck Safety",
        "url": "https://www.nadra.org/blog/how-ledger-boards-impact-deck-safety"
      },
      {
        "label": "NADRA: Build Safer Decks in 2025",
        "url": "https://www.nadra.org/blog/build-safer-decks-in-2025"
      },
      {
        "label": "USDA Forest Products Laboratory: Limiting Conditions for Decay in Wood Systems",
        "url": "https://www.fpl.fs.usda.gov/documnts/pdf2002/morri02a.pdf"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Repair your deck when the framing is sound and the problems are on the surface: gray or splintered boards, a wobbly railing, loose fasteners, or a few soft planks. In that case restoration (new boards, new railing, refinishing) brings it back safely. Replace the deck when the structure itself is failing: rotted or undersized joists, posts that were never properly footed, or a ledger board pulling away from the house. Those are safety problems, not cosmetic ones, and patching over them is not honest work. The only way to know which camp your deck is in is a real assessment of the structure, not a glance at the surface."
      },
      {
        "type": "h2",
        "text": "Start with the question that actually matters: is the structure sound?"
      },
      {
        "type": "p",
        "text": "A deck is two different things stacked together. There is the part you see and touch (boards, railings, stairs, finish) and the part holding it all up (the ledger, posts, footings, joists, and fasteners). Almost every repair-or-replace decision comes down to which part is in trouble. If the bones are good and only the skin is worn, you are looking at restoration. If the bones are compromised, you are looking at a rebuild, and no amount of fresh decking changes that."
      },
      {
        "type": "h2",
        "text": "When restoration is enough"
      },
      {
        "type": "p",
        "text": "Restoration is the right call when the framing, posts, and ledger attachment are still solid and the issues are on the surface. Common examples we see on Clark County decks:"
      },
      {
        "type": "ul",
        "items": [
          "Weathered, gray, or splintering deck boards that are otherwise dry and firm underfoot",
          "A loose or wobbly railing that needs re-anchoring or replacement",
          "Popped nails or a handful of corroded screws that can be swapped for proper fasteners",
          "A few soft boards over framing that is still sound",
          "A tired finish that needs cleaning, sanding, and re-sealing"
        ]
      },
      {
        "type": "p",
        "text": "In these cases you keep the good structure and renew what wears out. It is the cheaper, faster, and completely honest path when the deck earns it."
      },
      {
        "type": "h2",
        "text": "When a rebuild is the honest call"
      },
      {
        "type": "p",
        "text": "Some problems cannot be fixed with new boards, and pretending otherwise puts people on an unsafe deck. A rebuild is the honest answer when we find:"
      },
      {
        "type": "ul",
        "items": [
          "Rotted, cracked, or undersized joists and beams that can no longer carry the load",
          "A ledger board that is rotting, separating from the house, or attached with nails alone",
          "Posts that are decayed at the base or were never set on proper footings",
          "Widespread decay across the framing, not one isolated board",
          "Guards, stairs, or connections that do not meet current safety code"
        ]
      },
      {
        "type": "p",
        "text": "The ledger connection deserves special attention. Industry data points to ledger connection failures as the cause behind an estimated 90 percent of deck collapses, and a rotting or nailed-only ledger almost never gets patched. It gets replaced and re-attached properly, and at that point you are usually into a full rebuild anyway. [1][2]"
      },
      {
        "type": "blockquote",
        "text": "If the part holding the deck to your house is failing, the safe answer is rebuild, not patch. Cosmetics can wait. Structure cannot."
      },
      {
        "type": "h2",
        "text": "What we actually inspect"
      },
      {
        "type": "p",
        "text": "A proper assessment looks past the deck boards at the parts that keep people safe:"
      },
      {
        "type": "ol",
        "items": [
          "Ledger board: Is it firmly attached with bolts and proper flashing, or nailed on and pulling away? Is the wood spongy or rotting where it meets the house? [1]",
          "Posts and footings: Are posts solid at the base, or soft and crumbling? Are they sitting on real footings or just resting on soil or pavers?",
          "Joists and beams: Are they sized right, dry, and firm, or sagging and decayed?",
          "Fasteners and connectors: Are they the correct galvanized or stainless hardware, or rusted and working loose? [2]",
          "Guards and stairs: Do railings hold firm, and are stair stringers and treads sound?"
        ]
      },
      {
        "type": "h2",
        "text": "Why our wet climate pushes the decision faster"
      },
      {
        "type": "p",
        "text": "Wood decay fungi need wet wood to grow. Research from the USDA Forest Products Laboratory shows decay gets going once wood moisture content climbs past roughly 20 to 25 percent and stays there. [3] In Clark County, with our long damp season across Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and La Center, decks rarely get the chance to fully dry out. Trapped moisture behind a poorly flashed ledger, at a post base sitting in wet soil, or in shaded framing that never sees sun is exactly the condition rot loves. That is why a PNW deck that looks fine on top can be quietly failing underneath, and why guessing from the surface is risky here in particular."
      },
      {
        "type": "h2",
        "text": "Why an assessment beats guessing"
      },
      {
        "type": "p",
        "text": "From the top, a restorable deck and a deck that needs replacing can look almost identical. The difference is in the ledger, the footings, and the framing, and that is where a careful, hands-on check earns its keep. A proper assessment ends with a clear written scope: what is sound, what needs work, and whether the right call is restoration or a rebuild, in plain language with no guesswork. This post is about that repair-or-replace boundary. If the decision lands on a brand-new deck, that is a separate scope we will walk through on its own."
      },
      {
        "type": "p",
        "text": "NADRA also recommends an annual deck inspection regardless of age, which is the simplest way to catch a small problem before it becomes a structural one. [2]"
      },
      {
        "type": "cta",
        "text": "Not sure which side of the line your deck is on? Have Handy Pioneers assess it and give you a clear written scope, so you know whether restoration is enough or a rebuild is the honest call. Reach us at (360) 838-6731.",
        "ctaLabel": "See Deck Restoration",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/deck-restoration"
      }
    ]
  },
  {
    "slug": "deck-building-cost-pacific-northwest",
    "title": "What It Costs to Build a Deck in the Pacific Northwest (and What Lasts Here)",
    "excerpt": "A plain look at what drives deck building cost, what the general market data shows, and why material and structure matter more in a wet climate than the per-square-foot guess you got over the phone.",
    "date": "July 7, 2026",
    "isoDate": "2026-07-07",
    "publishDate": "2026-07-07",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Decks & Exterior",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "deck building cost",
      "build a deck Vancouver WA",
      "deck materials PNW",
      "composite decking",
      "deck footings",
      "outdoor living"
    ],
    "image": "https://handypioneers.com/images/blog/deck-building-cost-pacific-northwest.webp",
    "imageAlt": "Newly built deck with composite boards and metal railing on a Pacific Northwest home surrounded by evergreens",
    "readTime": 6,
    "seoTitle": "What It Costs to Build a Deck in the Pacific Northwest | Handy Pioneers",
    "seoDesc": "What drives deck building cost, general market ranges, and why material and footings matter most in a wet Clark County climate.",
    "references": [
      {
        "label": "HomeAdvisor: Cost to Build a Deck (2025)",
        "url": "https://www.homeadvisor.com/cost/outdoor-living/build-a-deck/"
      },
      {
        "label": "Trex: How Long Does a Deck Last?",
        "url": "https://www.trex.com/deck-ideas/how-long-does-a-deck-last/"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Most homeowners want one number, so here is the honest version. National market data from HomeAdvisor puts the average deck around $8,300, with most projects landing between roughly $4,300 and $12,600, and cost per square foot driven mostly by material and labor [1]. That is general market data, not a Handy Pioneers quote. Your real number depends on size, material, how high the deck sits, how many footings the ground demands, railings, and permits. In Clark County, the wet climate adds one more factor that matters more than price: what will actually last out here. Below is what moves the cost and where your money is best spent."
      },
      {
        "type": "h2",
        "text": "What actually drives deck building cost"
      },
      {
        "type": "p",
        "text": "A deck price is not one decision. It is a stack of them. Each one moves the total up or down, and a good scope shows you which lever you are pulling."
      },
      {
        "type": "ul",
        "items": [
          "Size and square footage. More deck means more material, more framing, and more labor. This is the single biggest driver.",
          "Material. Pressure-treated, cedar, and composite sit at very different price points, and that gap follows you for the life of the deck.",
          "Height and elevation. A deck a step off the ground is simple. A raised deck over a slope needs taller posts, more bracing, and often stairs, which adds real cost.",
          "Footings and structure. The part you never see. Proper footings sized for our soil are not the place to save money.",
          "Railings. Code-required on raised decks, and the style you pick (wood, metal, cable, glass) swings the price.",
          "Permits and inspection. Most decks in Clark County need a building permit, and that time and fee belong in an honest estimate."
        ]
      },
      {
        "type": "h2",
        "text": "What the general market data says"
      },
      {
        "type": "p",
        "text": "Treat these as ranges to orient you, not a bid. HomeAdvisor reports labor commonly running about $15 to $35 per square foot, with materials anywhere from roughly $2 to $45 per square foot depending on what you choose [1]. That material spread is the whole story. Pressure-treated lumber sits at the low end. Composite sits at the high end on day one. The cheaper board is not always the cheaper deck once you count the years."
      },
      {
        "type": "h2",
        "text": "Why material choice matters more in a wet climate"
      },
      {
        "type": "p",
        "text": "In the Pacific Northwest, moisture is the deciding factor. The number one threat to any deck is water and the rot it causes, and decks fail first at the connection points between boards and the frame [2]. A board that drinks water in our long wet season is a board on a clock."
      },
      {
        "type": "p",
        "text": "The longevity gap is real. Industry data shows a wood deck commonly lasts about 10 to 15 years with steady upkeep, while composite lines are built to last roughly 25 to 50 years depending on the product [2]. Pressure-treated wood is the budget choice and works, but it wants annual cleaning, sealing, and staining to hold up here. Cedar looks beautiful and resists rot better than untreated wood, with similar maintenance. Composite costs more up front and asks for far less care: a periodic clean and you are done."
      },
      {
        "type": "blockquote",
        "text": "The cheapest board can become the most expensive deck once you add a decade of sealing, staining, and the early rebuild a wet climate forces."
      },
      {
        "type": "h2",
        "text": "Spend your money below the surface"
      },
      {
        "type": "p",
        "text": "If there is one place not to cut, it is the structure. Footings, posts, the ledger where the deck attaches to your house, beams, and joists are what hold everything up and what fail first when they are done cheap. A poorly flashed ledger or undersized footing is where rot and movement start, and it is the most expensive thing to fix later because the finished deck has to come apart to reach it."
      },
      {
        "type": "p",
        "text": "Good footings sized for the soil, correct ledger flashing, proper joist spacing, and the right fasteners cost more on day one and save you the whole deck on day 3,000. Pretty boards on a weak frame is money spent backward. The licensed trades each phase requires should be building to code and to our climate, not to the lowest line item."
      },
      {
        "type": "h2",
        "text": "Why a written scope beats a per-square-foot guess"
      },
      {
        "type": "p",
        "text": "A price per square foot over the phone hides everything that actually decides your cost. It does not know your slope, your soil, how high the deck sits, whether the ledger can attach cleanly to your framing, or which railing meets code. Two decks of the same size can differ by thousands for reasons you cannot see from a number."
      },
      {
        "type": "p",
        "text": "A written scope changes that. It lists the material, the footing and framing plan, the railing, the permit, and what is and is not included, so you are comparing real plans instead of guesses. It also protects you: when it is written down, nobody gets surprised mid-build, and you know exactly what you are paying for and why."
      },
      {
        "type": "h2",
        "text": "Building a deck in Vancouver WA"
      },
      {
        "type": "p",
        "text": "Handy Pioneers is a licensed residential maintenance and remodeling contractor serving Clark County, Washington. When we look at a deck, we start with the structure and the climate, not the cheapest board, because that is what decides whether your deck is solid in fifteen years. We will walk your site, talk through material trade-offs in plain terms, and put it in writing. Call us at (360) 838-6731."
      },
      {
        "type": "cta",
        "text": "Ready to build a deck that holds up in our climate? Let us walk your site and give you a written scope and price, with the material and structure trade-offs explained in plain language so you know exactly what you are paying for.",
        "ctaLabel": "See Deck Restoration",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/deck-restoration"
      }
    ]
  },
  {
    "slug": "composite-vs-wood-decking-wet-climate",
    "title": "Composite vs Wood Decking in a Wet Climate: An Honest Comparison",
    "excerpt": "A straight head-to-head on composite vs wood decking for the rainy Pacific Northwest: real cost, maintenance, moss and mildew, longevity, and how to pick the right one for your Clark County deck.",
    "date": "July 10, 2026",
    "isoDate": "2026-07-10",
    "publishDate": "2026-07-10",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Decks & Exterior",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "composite vs wood decking",
      "decking Pacific Northwest",
      "deck materials Vancouver WA",
      "deck restoration",
      "moss and mildew"
    ],
    "image": "https://handypioneers.com/images/blog/composite-vs-wood-decking-wet-climate.webp",
    "imageAlt": "Side by side comparison of weathered wood deck boards and clean composite deck boards in a wet Pacific Northwest yard",
    "readTime": 6,
    "seoTitle": "Composite vs Wood Decking in a Wet Climate | Handy Pioneers",
    "seoDesc": "Composite or wood decking in the rainy Pacific Northwest? An honest comparison of cost, upkeep, moss, and longevity for Clark County WA homeowners.",
    "references": [
      {
        "label": "Trex: Composite Deck Boards vs. Wood",
        "url": "https://www.trex.com/why-trex/deck-material-competitor-comparison/trex-vs-wood/"
      },
      {
        "label": "TimberTech: How Long Does Decking Last",
        "url": "https://www.timbertech.com/ideas/how-long-does-decking-last/"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "In the wet Pacific Northwest, neither composite nor wood is automatically better. It comes down to how you want to spend your time and money. Wood costs less upfront but needs regular cleaning, sealing, and staining to survive our rain, and it still weathers faster here. Composite costs more to install but skips the sealing and staining entirely. You just keep it clean to fight moss and mildew. Both will grow green film in shade. The honest answer for most Clark County homeowners: wood if budget is tight and you do not mind the upkeep, composite if you want to stop maintaining and just use your deck. Below is the full head-to-head."
      },
      {
        "type": "h2",
        "text": "First, the part both materials share"
      },
      {
        "type": "p",
        "text": "Whatever you walk on, the frame underneath is almost always pressure-treated lumber. The posts, beams, and joists that hold the deck up are wood treated to resist rot and insects. That structure is where the real longevity of a deck comes from. A beautiful composite surface on a failing frame is still a failing deck."
      },
      {
        "type": "p",
        "text": "So when we talk composite vs wood decking, we are really only talking about the boards you see and touch. The bones are the same either way, and in our climate keeping water moving off that frame matters more than the surface you pick."
      },
      {
        "type": "h2",
        "text": "Upfront cost"
      },
      {
        "type": "p",
        "text": "Wood wins on day one. Pressure-treated and cedar decking boards cost less than composite, sometimes a good bit less, so a wood deck is the cheaper project to build. If the goal is the lowest number to get a usable deck this season, wood is the honest answer."
      },
      {
        "type": "p",
        "text": "Composite costs more to buy and install. The trade is that you are paying upfront to avoid years of sealing and staining later. Whether that math works for you depends on how long you plan to stay in the home and how you feel about annual upkeep."
      },
      {
        "type": "h2",
        "text": "Maintenance in our rain"
      },
      {
        "type": "p",
        "text": "This is where the wet PNW changes the conversation. A wood deck here needs real, repeating care. Plan on cleaning it and reapplying sealer or stain on a regular cycle to keep water out of the boards. Skip it for a couple of seasons and our rain finds its way in, which leads to graying, splintering, and soft spots [1]."
      },
      {
        "type": "p",
        "text": "Composite does not need sealing, staining, or painting at any point [1]. The upkeep is cleaning. Soap, water, and a gentle wash a couple of times a year keep it looking right [1]. You are not eliminating maintenance, you are trading a weekend of sanding and staining for an occasional wash down."
      },
      {
        "type": "blockquote",
        "text": "The real question is not which deck needs zero work. It is which kind of work you are willing to keep doing every year in the rain."
      },
      {
        "type": "h2",
        "text": "Moss and mildew, honestly"
      },
      {
        "type": "p",
        "text": "Every horizontal surface in the shade here grows moss and mildew. Composite is not immune. Sit it under fir trees on the north side of the house and you will get a green film just like you would on wood. The difference is how it behaves."
      },
      {
        "type": "ul",
        "items": [
          "On wood, moss and mildew hold moisture against a porous, organic surface. Left alone, that trapped damp is what eventually rots the board.",
          "On composite, the same growth sits on top of a material that does not absorb water the way wood does, so it cleans off without feeding decay underneath.",
          "Both benefit from sun, airflow, and keeping leaves and debris swept off through our long wet months."
        ]
      },
      {
        "type": "h2",
        "text": "Longevity"
      },
      {
        "type": "p",
        "text": "A well-built wood deck can last a couple of decades here if you stay on top of the sealing and stay ahead of moisture. Let the upkeep slip and our climate shortens that fast. Composite is built to resist moisture, mold, and insects, and quality lines carry warranties in the 25 to 50 year range [2]. That resistance is the main reason composite outlasts wood in a place like ours [2]."
      },
      {
        "type": "p",
        "text": "Remember the shared part. Both numbers assume the pressure-treated frame underneath is sound and draining well. The surface can outlive the structure if the bones were never built or maintained right."
      },
      {
        "type": "h2",
        "text": "Appearance and feel"
      },
      {
        "type": "p",
        "text": "Wood looks and feels like wood because it is, with real grain and the option to change the color when you restain. Many homeowners simply prefer it. The catch is that the look only stays good with the upkeep behind it."
      },
      {
        "type": "p",
        "text": "Composite gives you a consistent color and texture that holds up without refinishing. Newer boards mimic wood grain well, though up close some people can still tell. It will not give you the option to restain a different shade later, so pick a color you will be happy with for years."
      },
      {
        "type": "h2",
        "text": "So which should you choose"
      },
      {
        "type": "p",
        "text": "Here is the balanced read for a Clark County deck:"
      },
      {
        "type": "ul",
        "items": [
          "Choose wood if budget upfront is the priority, you genuinely do not mind a yearly clean-and-seal routine, or you want the real-wood look and the freedom to change the color down the road.",
          "Choose composite if you would rather stop maintaining the surface and just use the deck, you plan to stay in the home long enough to earn back the higher upfront cost, or your deck sits in heavy shade where wood struggles most."
        ]
      },
      {
        "type": "p",
        "text": "There is no wrong answer. It is a trade between money now and time later, judged against your own deck, your shade, and how you actually live outside. Either way, the work starts with a sound, well-draining frame, because that is what carries the deck through our winters."
      },
      {
        "type": "cta",
        "text": "Not sure which way to go for your deck and budget? We will walk your deck, look at the frame and the drainage, and talk through composite or wood honestly for your spot in Clark County. Call (360) 838-6731 or reach out and we will help you pick the right material, not the most expensive one.",
        "ctaLabel": "See Deck Restoration",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/deck-restoration"
      }
    ]
  },
  {
    "slug": "planning-a-whole-home-remodel-sequence",
    "title": "Planning a Whole-Home Remodel: The Sequence That Saves Money",
    "excerpt": "A whole-home remodel costs less and goes smoother when you build in the right order. Here is the sequence we follow on Clark County homes, and why it protects your budget.",
    "date": "July 14, 2026",
    "isoDate": "2026-07-14",
    "publishDate": "2026-07-14",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "whole home remodel Vancouver WA",
      "whole house renovation Clark County",
      "remodel planning"
    ],
    "image": "https://handypioneers.com/images/blog/planning-a-whole-home-remodel-sequence.webp",
    "imageAlt": "Whole-home remodel underway in a Clark County, Washington house with open framing and new finishes going in",
    "readTime": 6,
    "seoTitle": "Whole-Home Remodel Sequence That Saves Money | Handy Pioneers",
    "seoDesc": "How to plan a whole-home remodel in Vancouver WA. The right order, from structure to finishes, that protects your budget. Call (360) 838-6731.",
    "references": [
      {
        "label": "ServiceTitan: rough-in sequencing (HVAC, plumbing, then electrical)",
        "url": "https://www.servicetitan.com/blog/plumbing-rough-in"
      },
      {
        "label": "Punchlist: what rough-in is and where it falls in the build",
        "url": "https://punchlist.com/article/rough-in-construction/"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "To plan a whole-home remodel, start with a written master scope and one accountable team, then build in order from the structure out: roof and envelope first, then the mechanical, electrical, and plumbing rough-in while walls are open, and surfaces and finishes last. The reason is money. Every time you finish a room and then reopen it to fix wiring, a pipe, or a roof leak, you pay twice. Sequence the messy work before the pretty work, group the permitted trades, and budget in phases. Done in the right order, the same project costs less and disrupts your home for fewer weeks."
      },
      {
        "type": "h2",
        "text": "Why the order matters more than the finishes"
      },
      {
        "type": "p",
        "text": "Most homeowners start a remodel by picking tile, paint, and cabinets. That is the fun part, and it is also the last part. The biggest cost overruns we see in Vancouver and Camas homes come from doing finishes before the bones are right. You install new flooring, then discover the old galvanized plumbing needs replacing, so the floor comes back up. The order is not a preference. It is how you avoid paying for the same work twice."
      },
      {
        "type": "p",
        "text": "The principle is simple: work from structural to cosmetic, and do the dusty, destructive work before anything beautiful goes in. Big and messy first, fine finishes last."
      },
      {
        "type": "h2",
        "text": "Step 1: Structure and envelope first"
      },
      {
        "type": "p",
        "text": "Before anything inside changes, the house has to be sound and dry. That means the roof, foundation, framing, windows, and exterior envelope. A leak you cannot see will ruin new drywall and flooring months after the crew leaves. If the roof or envelope needs work, it happens before a single interior finish is touched."
      },
      {
        "type": "ul",
        "items": [
          "Roof, flashing, and gutters",
          "Foundation and any structural framing changes",
          "Windows, doors, and exterior weatherproofing",
          "Anything that keeps water and air where they belong"
        ]
      },
      {
        "type": "h2",
        "text": "Step 2: Rough-in the systems while walls are open"
      },
      {
        "type": "p",
        "text": "Once the structure is set and walls are open, the systems go in. This is the rough-in phase, and it happens after framing and before drywall, while pipes, wires, and ductwork are still easy to reach [2]. Doing it now, with the walls open, is far cheaper than cutting back into finished walls later."
      },
      {
        "type": "p",
        "text": "There is an order within the order. Ductwork goes first because it is the largest and least flexible. Plumbing follows, since pipes are rigid and need clear runs. Electrical comes last, because wiring is small and flexes around what is already there [1]. Get this sequence wrong and the trades fight each other for space, which costs time and money."
      },
      {
        "type": "p",
        "text": "In Clark County, the rough-in work is inspected before walls close up. Insulation and drywall only go in after the systems pass. We plan around those inspection points so the project does not stall waiting on a sign-off."
      },
      {
        "type": "h2",
        "text": "Step 3: Surfaces and finishes last"
      },
      {
        "type": "p",
        "text": "Only after the structure is sound, the systems are in, and inspections pass do finishes go in. Insulation, drywall, then paint, flooring, cabinets, fixtures, and trim. By saving these for the end, nothing you just installed gets opened back up. The room you finish stays finished."
      },
      {
        "type": "h2",
        "text": "One team and one written scope beats piecemeal"
      },
      {
        "type": "p",
        "text": "The other money-saver is structural, not literal. When you hire one electrician, then a separate plumber, then a flooring company, nobody owns the sequence. Each shows up on their own schedule, no one coordinates the inspections, and the gaps between trades become your problem and your delay."
      },
      {
        "type": "p",
        "text": "Handy Pioneers runs the whole project as one engagement with a written master scope. Our team coordinates the licensed trades each phase requires, in the right order, so the work flows from one stage to the next without you playing project manager. One accountable point of contact, one schedule, one scope you signed off on. That is what keeps a whole-house renovation in Clark County from turning into a string of disconnected jobs."
      },
      {
        "type": "h2",
        "text": "Budgeting in phases and living through the work"
      },
      {
        "type": "p",
        "text": "A whole-home remodel does not have to happen in one continuous push. We can phase it so the structural and systems work, the parts that are expensive to redo, get done first and right, while cosmetic phases follow as budget allows. What you should not do is finish a space you know you will reopen later for a system you skipped."
      },
      {
        "type": "p",
        "text": "Plan for living arrangements too. A kitchen or whole-floor remodel may mean a temporary kitchen setup, a sealed-off work zone, or staying elsewhere during the dustiest weeks. We map that into the schedule up front so there are no surprises about which rooms are usable and when."
      },
      {
        "type": "ul",
        "items": [
          "Fund structure and systems first; they are the costly do-overs",
          "Group permitted trades so inspections do not stall the job",
          "Set a realistic contingency for what opening up old walls reveals",
          "Plan which rooms stay usable during each phase"
        ]
      },
      {
        "type": "blockquote",
        "text": "The cheapest remodel is the one you only build once. Right order, one team, one written scope."
      },
      {
        "type": "cta",
        "text": "Thinking about a whole-home remodel in Clark County? Let us plan the whole project as one engagement, with a written scope and the right sequence from structure to finish, so you build it once. Call (360) 838-6731 or see how we work.",
        "ctaLabel": "See Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/remodeling"
      }
    ]
  },
  {
    "slug": "general-contractor-vs-managing-trades-yourself",
    "title": "One Contractor or Several? Who Should Manage a Big Remodel",
    "excerpt": "Hiring a general contractor versus running the trades yourself comes down to who carries the schedule, the permits, the liability, and the warranty. Here is an honest look at both for Clark County homeowners.",
    "date": "July 17, 2026",
    "isoDate": "2026-07-17",
    "publishDate": "2026-07-17",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "general contractor vs managing trades",
      "hiring a contractor Clark County",
      "remodel project management",
      "general contractor",
      "home remodel",
      "Clark County WA"
    ],
    "image": "https://handypioneers.com/images/blog/general-contractor-vs-managing-trades-yourself.webp",
    "imageAlt": "A contractor reviewing remodel plans and coordinating trades inside a Clark County, Washington home",
    "readTime": 6,
    "seoTitle": "General Contractor vs Managing Trades Yourself | Handy Pioneers",
    "seoDesc": "Should you hire a general contractor or manage the trades yourself? An honest Clark County WA guide to cost, liability, permits, and warranty.",
    "references": [
      {
        "label": "Washington State L&I: Register as a Contractor",
        "url": "https://lni.wa.gov/licensing-permits/contractors/register-as-a-contractor/"
      },
      {
        "label": "Washington State L&I: Verify a Contractor, Tradesperson or Business",
        "url": "https://www.lni.wa.gov/licensing-permits/contractors/hiring-a-contractor/verify-contractor-tradesperson-business"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Hire a general contractor when your remodel involves more than one trade, permits, and a schedule that has to stay in order. One contractor carries the plan, sequences the work, pulls the permits, and stays accountable for the result and the warranty. Managing the trades yourself can make sense for a small, single-trade job where you only coordinate one crew. The trouble shows up on bigger projects: you become the scheduler, the inspector's contact, and the person liable when two trades disagree. For most multi-trade remodels in Clark County, one accountable team saves more than it costs."
      },
      {
        "type": "h2",
        "text": "What managing the trades yourself actually means"
      },
      {
        "type": "p",
        "text": "Acting as your own general contractor sounds like a way to save money. On paper you cut the coordination fee. In practice you take on a real job. You are sourcing each trade, checking that each one is licensed and bonded, booking them in the right order, and being on site when they arrive. You are the one the building inspector calls. You are the one who decides whether the framing is ready for the electrician."
      },
      {
        "type": "p",
        "text": "None of that is impossible. People do it. But it is unpaid work, and it competes with your day job and your family. The hours add up fast on anything bigger than a single room."
      },
      {
        "type": "h2",
        "text": "The real costs of self-managing"
      },
      {
        "type": "p",
        "text": "The price of running it yourself is rarely a line item. It hides in four places."
      },
      {
        "type": "ul",
        "items": [
          "Time. Calls, site visits, change decisions, and waiting on crews. A multi-trade remodel can eat evenings and weekends for months.",
          "Sequencing mistakes. Trades have to go in order. Plumbing and electrical rough-in before drywall. Drywall before paint. Get the order wrong and you pay to tear out and redo finished work.",
          "Gaps between trades. When one crew finishes early or shows up late, the next one is not booked yet. The job stalls, and a stalled remodel in a lived-in home is its own kind of expensive.",
          "Liability and warranty. If something fails later, you are chasing separate crews who each point at the other. There is no single party who owns the outcome."
        ]
      },
      {
        "type": "h2",
        "text": "Who is liable when you are the manager"
      },
      {
        "type": "p",
        "text": "This is the part homeowners underestimate. When you coordinate the trades, you are effectively the general contractor for your own project. Permits often get pulled in your name as the owner. If a crew damages something, or work fails inspection, or a finished surface has to come out, the responsibility tends to land on you rather than on a single contractor who took the job."
      },
      {
        "type": "p",
        "text": "Warranty splinters the same way. Five trades means up to five separate warranties, each with its own terms and its own phone number. A year later, when a problem could be plumbing or could be the tile work, you are the one mediating between them."
      },
      {
        "type": "h2",
        "text": "Licensing and bonding matter in Washington"
      },
      {
        "type": "p",
        "text": "Washington requires construction contractors to register with the Department of Labor & Industries, and state law requires them to be bonded and insured to protect the public [1]. As of July 2024, a general contractor must post a $30,000 bond and carry liability insurance [1]. Before anyone touches your home, you can confirm a contractor's registration, bond, and workers' comp status, and check for past complaints, using L&I's free verification tool [2]."
      },
      {
        "type": "p",
        "text": "If you manage the trades yourself, that verification is on you for every crew you bring in. Hire one general contractor, and you are vetting one registration instead of five, and one bond stands behind the whole project."
      },
      {
        "type": "blockquote",
        "text": "The question is not just what a remodel costs. It is who is responsible when something goes wrong six months later."
      },
      {
        "type": "h2",
        "text": "When self-managing can make sense"
      },
      {
        "type": "p",
        "text": "Running it yourself is reasonable when the job is small and single-trade. Swapping a water heater, repainting a couple of rooms, replacing one light fixture, having a fence built. One crew, one scope, one warranty. There is little to sequence and little to coordinate, so the coordination value of a general contractor is low."
      },
      {
        "type": "p",
        "text": "Even then, verify the crew's L&I registration and insurance before they start. A small job done by an unregistered handyman can still leave you exposed if they are hurt on your property."
      },
      {
        "type": "h2",
        "text": "When one general contractor pays off"
      },
      {
        "type": "p",
        "text": "The more trades and permits a project touches, the more a single accountable contractor is worth. A kitchen, a bathroom, an addition, anything structural. These need plumbing, electrical, framing, drywall, finish carpentry, and sometimes HVAC, all in the right order and all standing behind one finished result."
      },
      {
        "type": "p",
        "text": "With one general contractor, you make decisions once and the contractor carries them through. The schedule is theirs to hold. The permits and inspections are theirs to manage. The licensed trades each phase requires are booked and sequenced by the team, not by you. And when the project is done, one party stands behind the whole thing rather than handing you a stack of separate warranties."
      },
      {
        "type": "p",
        "text": "At Handy Pioneers, that is the trade-off we built around. You get one point of contact, one schedule, and one team accountable for the result, instead of a binder of phone numbers and a remodel you are running on the side."
      },
      {
        "type": "cta",
        "text": "If you would rather have one accountable team run your whole remodel, from permits to the final walkthrough, we are happy to talk it through. Call us at (360) 838-6731 or see how our remodeling work runs.",
        "ctaLabel": "See Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/remodeling"
      }
    ]
  },
  {
    "slug": "remodel-permits-clark-county-wa",
    "title": "Do You Need Permits to Remodel in Clark County, WA?",
    "excerpt": "A plain-English guide to which Clark County, WA remodels need a building permit, which usually do not, and why permits protect your home, your resale, and your insurance.",
    "date": "June 24, 2026",
    "isoDate": "2026-06-24",
    "publishDate": "2026-06-24",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "remodel permit Clark County WA",
      "building permit Vancouver WA",
      "home remodel permits",
      "Clark County remodeling",
      "Vancouver WA remodel"
    ],
    "image": "https://handypioneers.com/images/blog/remodel-permits-clark-county-wa.webp",
    "imageAlt": "Permitted home remodel in progress on a Clark County, WA house with framing and inspection underway",
    "readTime": 6,
    "seoTitle": "Do You Need Permits to Remodel in Clark County, WA? | Handy Pioneers",
    "seoDesc": "Which Clark County, WA remodels need a building permit, which usually do not, and why permits protect your home, resale, and insurance.",
    "references": [
      {
        "label": "Clark County Residential Permits",
        "url": "https://clark.wa.gov/community-development/residential-permits"
      },
      {
        "label": "Clark County Permit Center",
        "url": "https://clark.wa.gov/community-development/permit-center"
      },
      {
        "label": "City of Vancouver Residential Building Permits",
        "url": "https://www.cityofvancouver.us/business/building-construction/residential-building-permits/"
      },
      {
        "label": "Washington State Building Code Council",
        "url": "https://sbcc.wa.gov/state-codes-regulations-guidelines/state-building-code"
      },
      {
        "label": "WAC 51-16-080 (permit exemptions)",
        "url": "https://app.leg.wa.gov/wac/default.aspx?cite=51-16-080"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Often, yes. In Clark County, WA, most remodels that change structure or touch systems need a building permit. That includes additions, converting a garage or basement to living space, removing or adding walls, and any plumbing, gas, electrical, or HVAC work [1][3]. Cosmetic updates like paint, flooring, carpet, countertop swaps, and like-for-like fixture replacement usually do not [3][5]. The catch is that rules depend on where your home sits. Clark County and the cities inside it (Vancouver, Camas, Washougal, Battle Ground, Ridgefield, La Center) each run their own permit counter [2][3]. Before you start, confirm the specifics with the jurisdiction that covers your address."
      },
      {
        "type": "h2",
        "text": "What usually needs a permit"
      },
      {
        "type": "p",
        "text": "The line is mostly about safety and structure. If a project changes how your house stands up, how it is wired, or how water and gas move through it, a permit is generally required. In Clark County, additions and remodels to existing structures fall under permit review, and converting a space like a garage or basement to living area does too [1]."
      },
      {
        "type": "ul",
        "items": [
          "Structural changes: moving or removing load-bearing walls, altering beams, posts, or the foundation [3]",
          "Additions that expand the footprint or add livable space [1]",
          "New or relocated plumbing fixtures, or new gas lines [3]",
          "Electrical work: new circuits, new wiring, or modifying existing systems [3]",
          "HVAC and mechanical changes [3]",
          "Window and egress changes, especially adding or resizing openings in bedrooms and basements [1][3]",
          "Decks and platforms above the height your jurisdiction sets (commonly more than 30 inches above grade) [5]"
        ]
      },
      {
        "type": "p",
        "text": "Clark County uses different permit types for different work. Larger jobs like additions and conversions fall under one track, while minor repairs that keep the same use and add no plumbing or mechanical work fall under a lighter one [1]. A permit technician can tell you which applies to your project [2]."
      },
      {
        "type": "h2",
        "text": "What usually does not need a permit"
      },
      {
        "type": "p",
        "text": "Finish and cosmetic work generally does not require a permit. Washington's exemption rules cover painting, wallpaper, tile, carpet, and countertop replacement, and Clark County and Vancouver follow the same pattern for cosmetic updates [3][5]."
      },
      {
        "type": "ul",
        "items": [
          "Interior and exterior painting",
          "Flooring and carpet",
          "Cabinet swaps that do not move plumbing or wiring",
          "Like-for-like fixture replacement (same spot, same connections)",
          "Minor repairs that keep the existing use and add no plumbing or mechanical work [1]"
        ]
      },
      {
        "type": "p",
        "text": "One important note from the state: even exempt work still has to meet the building code [5]. Exempt does not mean the rules stop applying. It means you do not have to file paperwork for that specific task."
      },
      {
        "type": "h2",
        "text": "Why a permit protects you, not just the city"
      },
      {
        "type": "p",
        "text": "A permit puts a licensed inspector on your project at the right stages. That is worth real money to a homeowner."
      },
      {
        "type": "ul",
        "items": [
          "Safety: wiring, gas, and structural work get checked by someone whose job is to catch the mistake before it becomes a fire or a failure.",
          "Resale: unpermitted work can stall a sale. Buyers and their lenders ask, and an appraiser or inspector can flag a finished basement or addition that has no permit on record.",
          "Insurance: a claim tied to unpermitted work can be denied. If a remodel was never inspected, your insurer may argue it was never built to code."
        ]
      },
      {
        "type": "blockquote",
        "text": "The cheapest permit problem to fix is the one you pulled the permit for. The expensive one shows up years later, at closing or after a claim."
      },
      {
        "type": "h2",
        "text": "Every jurisdiction in the county has its own counter"
      },
      {
        "type": "p",
        "text": "This trips people up. Clark County's building division handles unincorporated areas, but the City of Vancouver, Camas, Washougal, Battle Ground, Ridgefield, and La Center each run their own permitting [2][3]. The general categories are similar across them, but submittal steps, fees, and some local thresholds differ. Clark County applications go through the county's online portal [1][2], and City of Vancouver residential permits are submitted electronically through its ePlans system [3]. If you are not sure which office covers you, your address decides it. Confirm before you assume."
      },
      {
        "type": "h2",
        "text": "Why working with a licensed contractor matters"
      },
      {
        "type": "p",
        "text": "Knowing a permit is needed is one thing. Knowing which permit, filing it correctly, and scheduling inspections at the right points is another. At Handy Pioneers we pull the right permits and bring in the licensed trades each phase requires (electrical, plumbing, mechanical), so the work is inspected and on record. That protects your resale and your insurance, and it keeps the project moving instead of getting red-tagged mid-stream. A licensed, bonded contractor also gives you recourse the cash-under-the-table route never will."
      },
      {
        "type": "h2",
        "text": "Bottom line"
      },
      {
        "type": "p",
        "text": "If your Clark County remodel changes structure, moves a wall, or touches plumbing, gas, electrical, or HVAC, plan on a permit [1][3]. If it is paint, flooring, cabinets, or a like-for-like fixture, you usually do not need one [5]. Because each city and the county set their own details, confirm with your jurisdiction before you start [2][3]. The official Clark County and City of Vancouver sites in the references below are the place to verify your specific project. When in doubt, a quick call to the permit counter, or to us, saves a lot of trouble later."
      },
      {
        "type": "cta",
        "text": "Planning a remodel in Clark County? We pull the right permits and coordinate inspections as part of the project wherever they apply, so the work is done right and on record. Call (360) 838-6731 to talk it through.",
        "ctaLabel": "See Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/remodeling"
      }
    ]
  },
  {
    "slug": "home-addition-vs-remodel-which-fits",
    "title": "Home Addition vs Remodel: Which Actually Fits Your House",
    "excerpt": "Deciding between a home addition and a remodel in Vancouver WA comes down to whether you need more square footage or just a better layout. Here is the honest framework.",
    "date": "July 21, 2026",
    "isoDate": "2026-07-21",
    "publishDate": "2026-07-21",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Remodeling",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "home addition Vancouver WA",
      "addition vs remodel",
      "home addition Clark County",
      "remodeling",
      "resale value"
    ],
    "image": "https://handypioneers.com/images/blog/home-addition-vs-remodel-which-fits.webp",
    "imageAlt": "Framed home addition under construction on a Clark County, WA house with new foundation and roof tie-in",
    "readTime": 6,
    "seoTitle": "Home Addition vs Remodel: Which Fits Your House | Handy Pioneers",
    "seoDesc": "Should you build a home addition or remodel in Vancouver WA? A clear framework on cost, permits, setbacks, disruption, and resale to help you decide.",
    "references": [
      {
        "label": "Clark County Community Development: Residential Permits (ADS permits, setbacks)",
        "url": "https://clark.wa.gov/community-development/residential-permits"
      },
      {
        "label": "Zonda: 2025 Cost vs. Value Report",
        "url": "https://zondahome.com/2025-cost-vs-value-report/"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Remodel your existing space if you mostly need a better layout, more light, or updated rooms, because reworking what you already have is usually cheaper, faster, and less disruptive. Build an addition only when you genuinely need more square footage that no rearranging can create, like an extra bedroom, a primary suite, or a larger kitchen footprint. The deciding question is simple: do you need more room, or just better room? Additions add a foundation, a roof tie-in, more permits, and zoning and setback limits, so they cost and complicate more [1]. A remodel works inside walls that already stand. Start with what you actually need, then match the project to it."
      },
      {
        "type": "h2",
        "text": "Start with the need, not the project"
      },
      {
        "type": "p",
        "text": "People often decide addition or remodel before they have named the real problem. Flip the order. Write down what is not working: too few bedrooms, a cramped kitchen, a home office squeezed into a closet, no main-floor bathroom. Then ask whether the square footage you have could solve it if it were arranged differently."
      },
      {
        "type": "p",
        "text": "A surprising number of we need an addition conversations end as a remodel. Removing a non-load-bearing wall, finishing a basement, converting a garage, or opening a galley kitchen can deliver the function you wanted without pouring new foundation. When the existing footprint truly cannot hold the use, that is when an addition earns its cost."
      },
      {
        "type": "h2",
        "text": "When a remodel is the smarter call"
      },
      {
        "type": "p",
        "text": "Reworking existing space tends to win when the bones are sound and the issue is layout or condition. Signs a remodel fits:"
      },
      {
        "type": "ul",
        "items": [
          "You have the square footage but it is chopped into rooms that fight how you live.",
          "Underused space exists: an unfinished basement, an attached garage, a bonus room.",
          "The kitchen or bathroom is dated but sized fine.",
          "You want to stay in the home long term and care more about daily comfort than resale.",
          "Your lot is tight and there is little room to expand outward."
        ]
      },
      {
        "type": "p",
        "text": "Remodels keep the existing roof, foundation, and exterior shell, so you avoid the most expensive structural work. They also move faster and disrupt less, since the building envelope stays closed to the weather."
      },
      {
        "type": "h2",
        "text": "When you genuinely need an addition"
      },
      {
        "type": "p",
        "text": "Sometimes the math only works with more square footage. An addition makes sense when:"
      },
      {
        "type": "ul",
        "items": [
          "You need a room that simply does not exist anywhere in the current footprint, like a true primary suite or an extra bedroom.",
          "Every interior space is already in full use, so there is nothing to reclaim.",
          "You want to expand the kitchen or living area beyond the current exterior walls.",
          "The household has grown and rearranging will not create the rooms you need."
        ]
      },
      {
        "type": "p",
        "text": "An addition is a bigger build. It needs a new foundation, framing that ties into the existing structure, a roofline that connects cleanly to the old roof, and new mechanical, electrical, and plumbing runs. It also opens your home to the elements during construction, which is part of why it costs and disrupts more than working inside existing walls."
      },
      {
        "type": "h2",
        "text": "Cost, permits, and complexity"
      },
      {
        "type": "p",
        "text": "The honest gap between the two is structural. A remodel mostly touches finishes and interior framing. An addition adds foundation work, a roof tie-in, exterior siding, and more inspections. In Clark County, additions and conversions fall under an Additional Dwelling or Structure (ADS) permit, and the work has to meet local rules including setbacks and height limits [1]."
      },
      {
        "type": "p",
        "text": "Setbacks are the buffers a structure must keep from your property lines, and they vary by zone and jurisdiction. Vancouver, Camas, Washougal, Ridgefield, Battle Ground, La Center, and unincorporated Clark County do not all read the same. Confirm your specific lot before you fall in love with a footprint. Clark County's Maps Online and the Community Development team can tell you what your parcel allows [1]. A lot that looks roomy can still cap how far you can build out once setbacks are applied."
      },
      {
        "type": "h2",
        "text": "Disruption and how long you live in it"
      },
      {
        "type": "p",
        "text": "Think about life during the project, not just the finished photo. A remodel can often be staged so part of the home stays usable. An addition tends to be longer and messier, with framing, weather exposure, and more trades on site over more weeks."
      },
      {
        "type": "blockquote",
        "text": "The right project is the one that solves your real need at the least cost and disruption. More square footage is not always more value."
      },
      {
        "type": "p",
        "text": "Handy Pioneers manages the licensed trades each phase requires, sequences the work, and keeps the parts of your home you still need running as long as the build allows. Knowing the disruption up front helps you choose with eyes open."
      },
      {
        "type": "h2",
        "text": "Resale: build for living first"
      },
      {
        "type": "p",
        "text": "Resale matters, but it should rarely be the only driver. National data shows interior projects pay back better when you plan to stay a while, while exterior replacements tend to return the most at sale [2]. Additions can add real value when they correct a true shortage, like a home with only one bathroom or too few bedrooms for its neighborhood. They return less when they push a house far above what nearby homes support."
      },
      {
        "type": "p",
        "text": "A good rule: if you are staying five-plus years, weight daily function. If you are selling soon, be careful not to over-improve past the block. Either way, build for how you will actually live, then let resale follow."
      },
      {
        "type": "h2",
        "text": "How to decide in three steps"
      },
      {
        "type": "ol",
        "items": [
          "Name the need in one sentence: more rooms, or better rooms?",
          "Test whether the existing footprint can solve it before assuming you must expand.",
          "Confirm your lot's zoning and setbacks locally, then price the realistic options side by side [1]."
        ]
      },
      {
        "type": "p",
        "text": "Most homeowners land on the right answer once they separate the need from the project. If you are still unsure, a walkthrough usually settles it fast."
      },
      {
        "type": "cta",
        "text": "Not sure whether an addition or a remodel fits your house and your lot? Handy Pioneers will walk your space, talk through what you actually need, and lay out honest options for Clark County homes. Call (360) 838-6731 or start here.",
        "ctaLabel": "See Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/remodeling"
      }
    ]
  },
  {
    "slug": "kitchen-bath-or-curb-appeal-best-roi-clark-county",
    "title": "What Adds the Most Value: Kitchen, Bath, or Curb Appeal?",
    "excerpt": "Curb appeal and smaller exterior projects often beat big interior remodels on percentage return, especially in the Pacific region. Here is what the ROI data shows for Clark County homeowners.",
    "date": "July 24, 2026",
    "isoDate": "2026-07-24",
    "publishDate": "2026-07-24",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Home Value",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "best ROI home improvement",
      "home improvements that add value Clark County",
      "remodel ROI",
      "curb appeal",
      "kitchen remodel"
    ],
    "image": "https://handypioneers.com/images/blog/kitchen-bath-or-curb-appeal-best-roi-clark-county.webp",
    "imageAlt": "Refreshed front entry and exterior of a Clark County home, the kind of curb-appeal upgrade that adds resale value",
    "readTime": 6,
    "seoTitle": "Best ROI Home Improvement: Kitchen, Bath, or Curb Appeal? | Handy Pioneers",
    "seoDesc": "What adds the most home value in Clark County WA? The ROI data shows curb appeal and exterior projects often beat big interior remodels.",
    "references": [
      {
        "label": "Zonda: 2024 Cost vs. Value Report",
        "url": "https://zondahome.com/the-2024-cost-vs-value-report-proves-curb-appeal-still-drives-highest-value-for-home-improvement-projects/"
      },
      {
        "label": "National Association of Realtors: Remodeling Impact Report",
        "url": "https://www.nar.realtor/magazine/real-estate-news/sales-marketing/why-remodeling-homeowners-need-a-real-estate-agents-guidance"
      }
    ],
    "body": [
      {
        "type": "p",
        "text": "Curb appeal and smaller exterior projects usually add the most value per dollar spent. In the 2024 Cost vs. Value Report, a garage door replacement returned about 194 percent of its cost at resale, and a steel entry door returned about 188 percent. A minor kitchen remodel returned about 96 percent, and bathroom work tends to land lower [1]. So the honest answer depends on your goal. If you are selling soon, exterior and condition projects win on percentage return. If you plan to stay, the project that protects your home from damage usually pays back the most over time."
      },
      {
        "type": "h2",
        "text": "What the ROI data actually shows"
      },
      {
        "type": "p",
        "text": "Every year Zonda surveys real estate professionals and contractors to compare what projects cost against what they add to resale value. The 2024 report is clear: nine of the top ten projects by return were exterior improvements. Garage door replacement led the list at about 194 percent, followed by a steel entry door at about 188 percent and manufactured stone veneer at about 153 percent [1]."
      },
      {
        "type": "p",
        "text": "The pattern is simple. Smaller exterior projects cost less, but they shape the first impression a buyer and an appraiser form before they ever walk inside. That first impression carries weight in how the whole house gets valued."
      },
      {
        "type": "h2",
        "text": "Why the Pacific region tends to lead the country"
      },
      {
        "type": "p",
        "text": "Homeowners in the Pacific region have been seeing some of the highest returns in the country. National reporting on the 2024 report noted exterior projects in the Pacific running well above national averages, with garage door and stone veneer work returning more here than in most other regions [1]. For Clark County homeowners in Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and La Center, that means the curb-appeal projects already topping the national list tend to perform even better locally."
      },
      {
        "type": "h2",
        "text": "Kitchen and bath: still worth it, just read the numbers"
      },
      {
        "type": "p",
        "text": "Kitchens and bathrooms are the rooms buyers judge hardest, so they are not off the table. They just rarely return more than a dollar for a dollar. The 2024 report put a minor kitchen remodel, meaning new surfaces and hardware rather than a gut job, at about 96 percent return [1]. A full kitchen renovation recovers less, closer to 75 percent in the NAR Remodeling Impact Report, with bathroom renovations near 71 percent [2]."
      },
      {
        "type": "p",
        "text": "The takeaway is not to skip these rooms. It is to match the scope to your reason. A modest refresh of a dated kitchen returns far more per dollar than a tear-out, and it still moves a buyer."
      },
      {
        "type": "h3",
        "text": "When a kitchen or bath remodel makes sense"
      },
      {
        "type": "ul",
        "items": [
          "You plan to live there for years and want to enjoy the space, not just resell it.",
          "The room is genuinely dated or not working, not just out of fashion.",
          "You keep the scope tight: surfaces, fixtures, and layout fixes over moving walls and plumbing.",
          "You are not pushing the finish level past the rest of the neighborhood."
        ]
      },
      {
        "type": "h2",
        "text": "The highest return is often protecting what you already have"
      },
      {
        "type": "p",
        "text": "Here is the part the glamour projects miss. The NAR Remodeling Impact Report found that refinishing existing hardwood floors recovered about 147 percent of its cost, and new wood flooring about 118 percent [2]. These are not flashy upgrades. They restore and protect something already in the home at a low cost, which is exactly why the percentage is so high."
      },
      {
        "type": "p",
        "text": "The same logic runs through condition itself. A sound roof, dry crawl space, working gutters, and sealed exterior return value in two ways. They keep a buyer from negotiating you down over deferred repairs, and they prevent the slow water and rot damage that quietly erases value between now and the day you sell. In our wet Clark County climate, that protective work is some of the best money a homeowner can spend."
      },
      {
        "type": "blockquote",
        "text": "The best ROI is rarely the prettiest project. It is the one that keeps a small problem from becoming a large one."
      },
      {
        "type": "h2",
        "text": "A practical order for Clark County homeowners"
      },
      {
        "type": "ol",
        "items": [
          "Fix condition first. Roof, drainage, exterior envelope, anything letting water in. This protects the value you already have.",
          "Improve curb appeal. Garage door, front entry, siding accents, and clean landscaping carry the strongest resale returns.",
          "Refresh, do not rebuild, the kitchen and bath. Surfaces and fixtures beat full gut jobs on return.",
          "Save the big interior remodel for the home you intend to keep, where you value living in it more than the resale math."
        ]
      },
      {
        "type": "h2",
        "text": "How we think about it at Handy Pioneers"
      },
      {
        "type": "p",
        "text": "We are a licensed residential maintenance and remodeling contractor serving Clark County, Washington. When a homeowner asks what to do first, our team starts with your goal and your home's condition, not a sales sheet. We bring in the licensed trades each phase requires and we are honest when the smart move is a smaller project, or just protecting what you have, rather than a big remodel that will not pay you back. Real market data should guide the plan, and your reason for doing the work should set the scope."
      },
      {
        "type": "cta",
        "text": "Want a plan that protects your home's value and grows it where it counts? Call Handy Pioneers at (360) 838-6731 and we will walk your home, weigh your goals against what the numbers actually support, and lay out the projects worth doing in the right order.",
        "ctaLabel": "See Remodeling",
        "ctaAction": "link",
        "ctaHref": "https://handypioneers.com/services/remodeling"
      }
    ]
  },

  {
    "slug": "dry-season-home-checklist-pnw-june",
    "title": "The Dry Season Is When Your Home Tells the Truth: 5 Things to Check in June",
    "excerpt": "For eight months a year, a Clark County home is wet. June is the first honest look you get. Here are the five checks that decide how your home heads into next winter.",
    "date": "June 2, 2026",
    "isoDate": "2026-06-02",
    "publishDate": "2026-06-02",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Seasonal Home Care",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "summer home maintenance Vancouver WA",
      "Pacific Northwest home maintenance",
      "Clark County home care",
      "June home checklist"
    ],
    "image": "https://handypioneers.com/images/blog/dry-season-home-checklist-pnw-june.webp",
    "imageAlt": "A well-kept Pacific Northwest home exterior on a clear summer day",
    "readTime": 5,
    "seoTitle": "Summer Home Maintenance in the Pacific Northwest: A June Checklist | Handy Pioneers",
    "seoDesc": "What home maintenance should you do in summer in the Pacific Northwest? Five checks every Clark County homeowner should make in June, while the weather finally cooperates.",
    "references": [{"label": "Oregon State University Extension Service: How to control roof moss and prevent long-term damage", "url": "https://extension.oregonstate.edu/news/how-control-roof-moss-prevent-long-term-damage"}],
    "body": [
      {
        "type": "p",
        "text": "In the Pacific Northwest, summer is the season for the work the rain won't let you do the rest of the year. If you only have one weekend, spend it on these five: clear and test the gutters and downspouts, look over the roof and treat moss before it spreads, check decks and exterior wood for soft spots, wash and reseal surfaces while they can actually dry, and look at the grading around the foundation now that the ground has firmed up. Handle these in June and you head into the next wet season ahead of the damage instead of chasing it."
      },
      {
        "type": "p",
        "text": "Here is why June is the moment, and what each check actually looks like."
      },
      {
        "type": "p",
        "text": "For roughly eight months a year, a Clark County home lives under water. Rain, then more rain, then the kind of damp that never fully leaves the north side of the house. Problems hide in that wet. A slow drip looks the same as a stain. Soft wood looks like sound wood until you press on it. Then the clouds break, the ground dries, and for a few weeks your home finally tells you the truth."
      },
      {
        "type": "p",
        "text": "Most people spend that window mowing and grilling. The ones who get ahead spend a little of it looking."
      },
      {
        "type": "h2",
        "text": "1. Gutters and downspouts"
      },
      {
        "type": "p",
        "text": "Start at the top of the water's path. After a winter here, gutters carry a season of needles, grit, and moss runoff. Clear them, then run a hose and watch where the water goes. You are looking for two things: water that overflows the front edge, which means a clog or a sag, and water that pools against the house at the bottom of a downspout, which means a drainage problem. Both send water exactly where you don't want it. Both are a simple fix in July and a much bigger job after they have soaked a wall all winter."
      },
      {
        "type": "h2",
        "text": "2. The roof and the moss"
      },
      {
        "type": "p",
        "text": "You don't need to climb up. From the ground with binoculars, or from a ladder at the edge, look for green fuzz in the shaded valleys, lifted or cracked shingles, and any spot where the surface looks worn smooth. Moss is the local villain. Oregon State University Extension explains that moss traps moisture against the roof, which invites the fungi that rot roofing and shorten its life. [1] June is the time to treat it, because it needs dry weather to die back and you want it gone before the rain feeds it again."
      },
      {
        "type": "h2",
        "text": "3. Decks, railings, and exterior wood"
      },
      {
        "type": "p",
        "text": "Walk the deck slowly and pay attention to your feet. Any board that feels soft, springy, or gives a little is telling you it has taken on water. Press a screwdriver into the spots that worry you, especially where boards meet posts and where the deck attaches to the house. Firm wood resists. Punky wood sinks. Do the same at the bottom of exterior door trim, at fence posts, and at the base of any wood that sits near soil. Catching one soft board now is a small job. Catching it after it has spread into the framing is not."
      },
      {
        "type": "h2",
        "text": "4. Wash and reseal while it can dry"
      },
      {
        "type": "p",
        "text": "Pressure washing and sealing only work when surfaces can dry fully, which is why winter is the wrong time and June is the right one. Clean the deck, the siding, the walkways, and the patio. Then give the wood a day or two to dry before you seal it. Sealing traps moisture if you rush it, so the dry stretch matters as much as the product. A sealed deck sheds the next eight months of rain instead of drinking it."
      },
      {
        "type": "h2",
        "text": "5. Grading and the foundation"
      },
      {
        "type": "p",
        "text": "This one stays invisible until it isn't. Walk the perimeter and look at how the ground meets the house. Soil should slope away from the foundation, not toward it. Look for cracks, soil that has settled into a low spot against the wall, and downspouts that dump right at the base. Water that collects against a foundation has nowhere to go but in. Fixing the slope or extending a downspout is a weekend's effort. A wet crawlspace is a different conversation."
      },
      {
        "type": "h2",
        "text": "The pattern worth noticing"
      },
      {
        "type": "p",
        "text": "None of these five are emergencies in June. That is exactly the point. Every one of them can become an emergency in November if you skip it now. Proactive home care is not about doing more work. It is about doing the small work in the season that allows it, so the big work never arrives."
      },
      {
        "type": "p",
        "text": "That rhythm, looking in summer and fixing before the rain, is the whole idea behind the way we care for the homes we manage in Clark County. You can run it yourself with this list. If you would rather have someone walk your home, write down what they find, and handle it on a schedule so you never have to think about it, that is what we do."
      },
      {
        "type": "cta",
        "text": "Want a second set of eyes before the dry weeks run out? Call us at (360) 838-6731 or book your walkthrough.",
        "ctaLabel": "Book a Walkthrough",
        "ctaAction": "booking"
      }
    ]
  },
  {
    "slug": "deck-water-damage-signs-camas",
    "title": "The Soft Board Is Never Just the Board: Spotting Deck Water Damage in June",
    "excerpt": "Most deck failures in Clark County start the same way: one board that flexes underfoot. Here is how to read the signs, and why June is the month to catch them.",
    "date": "June 5, 2026",
    "isoDate": "2026-06-05",
    "publishDate": "2026-06-05",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Decks & Exterior",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "deck water damage",
      "deck repair Camas WA",
      "rotting deck signs",
      "Clark County deck maintenance"
    ],
    "image": "https://handypioneers.com/images/blog/deck-water-damage-signs-camas.webp",
    "imageAlt": "A weathered wood deck showing gray boards and signs of moisture",
    "readTime": 5,
    "seoTitle": "How to Tell If Your Deck Has Water Damage | Handy Pioneers, Camas WA",
    "seoDesc": "How do you know if your deck has water damage? The signs to look for, why the soft board is rarely the whole story, and why catching it in June beats finding it in fall.",
    "references": [{"label": "USDA Forest Products Laboratory, Wood Handbook (FPL-GTR-190), Chapter 14: Biodeterioration of Wood", "url": "https://www.fpl.fs.usda.gov/documnts/fplgtr/fplgtr190/chapter_14.pdf"}],
    "body": [
      {
        "type": "p",
        "text": "Here is how to tell if your deck has water damage without guessing. Look for boards that feel spongy or give underfoot, gray or black discoloration spreading from the joints, boards that are cupping or splitting, fasteners that have popped up or rusted, and any spot where a screwdriver sinks into the wood instead of meeting resistance. The checks that matter most are where the deck attaches to the house and where the boards rest on the supports underneath, because that is where water sits longest and where damage costs the most."
      },
      {
        "type": "p",
        "text": "Most deck failures we see in Clark County start the same way. One board flexes a little when you walk across it. The homeowner notices, figures it needs a new plank, and books the repair. Reasonable read. It is also, often, the visible end of something larger."
      },
      {
        "type": "p",
        "text": "Here is how that plays out. The board itself is an easy fix. But when the gray streaking runs along the seam where two boards meet, and the support beam underneath that seam is dark and damp, you are not looking at a board problem. You are looking at water that has been wicking down through the gap between the boards all winter, sitting on top of the framing that holds the whole deck up. The surface looks fine from a lawn chair. The structure can be a few soft years from a real problem."
      },
      {
        "type": "p",
        "text": "That is the thing about deck rot in the Pacific Northwest. The deck does not fail where you can see it. It fails underneath, where the wood stays wet and shaded and nobody looks. The USDA Forest Products Laboratory's Wood Handbook puts a number on it: decay fungi need wood moisture above roughly 20 percent to grow, and shaded, ground-level deck wood stays wet far longer than that through our winters. Keep it drier than that and it does not rot. [1]"
      },
      {
        "type": "h2",
        "text": "The signs, in plain terms"
      },
      {
        "type": "h3",
        "text": "Spongy or springy boards"
      },
      {
        "type": "p",
        "text": "Sound decking feels solid. If a board flexes, gives, or bounces under your weight, it has absorbed water and started to break down inside."
      },
      {
        "type": "h3",
        "text": "Gray or black discoloration"
      },
      {
        "type": "p",
        "text": "Healthy wood weathers to a soft silver. Rot is darker, often blackish, and it tends to spread out from joints, fastener holes, and the ends of boards."
      },
      {
        "type": "h3",
        "text": "Cupping, splitting, and cracking"
      },
      {
        "type": "p",
        "text": "Boards that curl at the edges or split along the grain have been through repeated soaking and drying. Each cycle opens the wood up to more water."
      },
      {
        "type": "h3",
        "text": "Popped or rusted fasteners"
      },
      {
        "type": "p",
        "text": "When the wood around a screw or nail swells and shrinks, the fastener works loose. Rust streaks also tell you water has been sitting there."
      },
      {
        "type": "h3",
        "text": "The screwdriver test"
      },
      {
        "type": "p",
        "text": "This is the honest one. Press a screwdriver or an awl into the wood at the spots that worry you, especially near the house and at the base of the posts. Firm wood resists. If the tip sinks in with light pressure, that wood is gone."
      },
      {
        "type": "h2",
        "text": "Why June is the month to find it"
      },
      {
        "type": "p",
        "text": "Caught now, that kind of repair is contained: replace the damaged board, treat and protect the beam below, close the gap that let water through, and reseal. It takes part of a day and keeps the deck sound."
      },
      {
        "type": "p",
        "text": "The same deck, found in October, is a different job. By fall the beam has had another wet season to soften, and rot in a support member does not stay put. It spreads to the boards bolted to it. One soft beam becomes several. A part-of-a-day repair becomes a structural one, with more wood, more labor, and a deck you can't safely use until it's done. The difference between the two jobs is not the damage. It is the timing."
      },
      {
        "type": "p",
        "text": "This is why we tell people the dry season is for looking. A deck inspection in June, when the wood is dry enough to read clearly and there is still time to fix what you find, is one of the highest-value half hours a deck owner spends all year."
      },
      {
        "type": "h2",
        "text": "What to do this week"
      },
      {
        "type": "p",
        "text": "Walk your deck and run through the list above. Spend the most time where the deck meets the house and at the base of the posts. If everything is firm, seal it and enjoy your summer. If you find a soft spot, don't wait for it to get worse. It will, and it gets more expensive every month the rain is gone and you let it sit."
      },
      {
        "type": "cta",
        "text": "Want someone to check the parts you can't see? We will tell you honestly whether you have a small fix or a real one, with no upsell. Call (360) 838-6731 or schedule a deck check.",
        "ctaLabel": "Schedule a Deck Check",
        "ctaAction": "booking"
      }
    ]
  },
  {
    "slug": "best-time-paint-house-exterior-clark-county",
    "title": "Exterior Paint in Clark County: Why the Window Is Shorter Than You Think",
    "excerpt": "Most homeowners think they have all summer to paint. In our climate, the real window is narrower, and missing it is how good paint jobs fail early.",
    "date": "June 9, 2026",
    "isoDate": "2026-06-09",
    "publishDate": "2026-06-09",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Painting & Exterior",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "best time to paint house exterior",
      "exterior painting Vancouver WA",
      "house painting Washington",
      "Clark County painting"
    ],
    "image": "https://handypioneers.com/images/blog/best-time-paint-house-exterior-clark-county.webp",
    "imageAlt": "A painter applying fresh exterior paint to a home on a clear day",
    "readTime": 5,
    "seoTitle": "When Is the Best Time to Paint a House Exterior in Washington? | Handy Pioneers",
    "seoDesc": "The best window to paint a house exterior in Washington is narrower than most homeowners think. Here is when to paint in Clark County, and why timing decides how long it lasts.",
    "references": [{"label": "Sherwin-Williams: Exterior Product Application FAQs (temperature and dew point guidance)", "url": "https://www.sherwin-williams.com/painting-contractors/products/resources/faqs/exterior-product-application-faqs"}],
    "body": [
      {
        "type": "p",
        "text": "The best time to paint a house exterior in Washington is roughly late June through mid-September: a stretch of several dry days in a row, daytime temperatures between about 50 and 90 degrees, a surface that is fully dry, and overnight lows that stay warm enough for the paint to keep curing (often around 50 for the best result). That is a shorter, fussier window than most homeowners picture when they say they will paint this summer. The gap between hitting it and missing it is the gap between a paint job that lasts a decade and one that starts peeling in a couple of years."
      },
      {
        "type": "p",
        "text": "Here is what is really going on, and why our climate makes the timing matter more than it would somewhere dry."
      },
      {
        "type": "p",
        "text": "The thing people underestimate is not the rain on painting day. Everyone knows not to paint in the rain. The thing they miss is what the wall and the air are doing before and after the brush touches the siding."
      },
      {
        "type": "h2",
        "text": "Paint needs the wall to be dry, not just the sky"
      },
      {
        "type": "p",
        "text": "Latex and acrylic exterior paints cure by releasing water and forming a film. If the siding is still holding moisture from last week's rain, the paint can't bond properly, and it will lift, blister, or peel down the line even though it looked perfect when it went on. In the Pacific Northwest, siding that feels dry to the touch can still be damp underneath, especially on the north and east faces that never get much sun. That is why a single sunny day after a wet week is not enough. The wall needs time to dry all the way through, which is why a run of dry days matters more than one nice afternoon."
      },
      {
        "type": "h2",
        "text": "Temperature works on both ends of the day"
      },
      {
        "type": "p",
        "text": "Most paints have a minimum application temperature. Sherwin-Williams notes that traditional latex needs temperatures above 60 degrees to cure properly, though some newer exterior products are formulated to cure as low as 35. [1] Paint applied when it is too cold doesn't form its film correctly. The catch in our region is the overnight drop. You can have a beautiful 75-degree afternoon and a 45-degree night, and if the paint is still curing when the temperature falls, the finish suffers. So the question is not just whether it is warm enough now, it is whether it will stay warm enough through tonight. That one fact quietly rules out a lot of spring and fall days that look fine on the calendar."
      },
      {
        "type": "h2",
        "text": "Dew is the part nobody plans for"
      },
      {
        "type": "p",
        "text": "Even in dry months, mornings here bring dew. Paint a surface late in the day and that overnight moisture can settle on a finish that hasn't fully set, leaving a cloudy haze or causing adhesion problems. This is why the time of day matters too. The reliable working hours run from mid-morning, after the dew has burned off, to late afternoon, with enough daylight left for the surface to set before the evening damp returns. The same manufacturer guidance is to keep the surface above the dew point for at least 48 hours after you paint, not just while the brush is moving. [1]"
      },
      {
        "type": "h2",
        "text": "So when does that leave you?"
      },
      {
        "type": "p",
        "text": "Stack those three requirements together (a dry surface, the right temperature day and night, and time to set before dew) and the dependable exterior painting window in Clark County runs from about late June into September. June itself is often a tease, with warm afternoons and wet stretches that haven't fully cleared. By July the odds are with you. By late September they start slipping away again."
      },
      {
        "type": "p",
        "text": "That is also why exterior painting books up fast here. Everyone is chasing the same dozen or so good weeks. If a repaint is on your list this year, the homeowners who get it done well are the ones who planned for the window instead of waiting until they felt like it."
      },
      {
        "type": "h2",
        "text": "The honest version"
      },
      {
        "type": "p",
        "text": "You can paint outside that window and have it look great for a season. The problem is what you can't see. Paint applied to damp wood, or left to finish as the temperature drops, fails early. It fails in ways that cost more to fix than doing it right the first time, because the old coat has to come off before the new one can go on."
      },
      {
        "type": "p",
        "text": "Good exterior paint in this climate is less about the product in the can and more about the conditions the day it goes up. Get the timing right and a quality job protects your siding and your home's look for years. Get it wrong and you are repainting far sooner than you should be."
      },
      {
        "type": "cta",
        "text": "Weighing an exterior repaint this summer? We will look at your home, talk through the condition of the siding, and tell you honestly what the right window looks like for your walls. Call (360) 838-6731 or request an estimate.",
        "ctaLabel": "Request an Estimate",
        "ctaAction": "booking"
      }
    ]
  },
  {
    "slug": "does-home-maintenance-increase-home-value",
    "title": "What a Maintained Home Is Worth: The Appraisal Line Nobody Reads",
    "excerpt": "Maintenance doesn't add value the way a kitchen remodel does. It does something quieter and, over the years you own a home, usually worth more: it keeps the value you already have from leaking out.",
    "date": "June 12, 2026",
    "isoDate": "2026-06-12",
    "publishDate": "2026-06-12",
    "author": "Marcin Micek | Handy Pioneers",
    "category": "Home Value",
    "audience": [
      "Homeowners"
    ],
    "tags": [
      "does home maintenance increase home value",
      "deferred maintenance home value",
      "home equity protection",
      "Clark County home value"
    ],
    "image": "https://handypioneers.com/images/blog/does-home-maintenance-increase-home-value.webp",
    "imageAlt": "A well-maintained home with clean siding and tidy landscaping",
    "readTime": 5,
    "seoTitle": "Does Home Maintenance Increase Home Value? | Handy Pioneers, Clark County WA",
    "seoDesc": "Does home maintenance increase your home's value? The honest answer, what effective age means on an appraisal, and why deferred maintenance quietly costs Clark County homeowners.",
    "references": [{"label": "HUD Single Family Housing Policy Handbook 4000.1 (FHA appraisal valuation protocol)", "url": "https://www.hud.gov/sites/dfiles/OCHCO/documents/4000.1hsgh-011823.pdf"}],
    "body": [
      {
        "type": "p",
        "text": "Here is the honest answer: routine maintenance does not increase your home's value the way a kitchen remodel or an addition does. What it does is prevent the loss of value, which over the years you own a home is usually worth more. Deferred maintenance shows up in appraisals and inspection reports as repair credits, price adjustments, and something called effective age. A well-kept home holds its number. A neglected one gets quietly discounted, often by far more than the upkeep would have cost."
      },
      {
        "type": "p",
        "text": "That distinction, adding value versus protecting it, is the one most homeowners never get told. So let me walk through how it actually plays out."
      },
      {
        "type": "h2",
        "text": "The line on the appraisal nobody reads"
      },
      {
        "type": "p",
        "text": "When an appraiser evaluates a home, they don't just record how old it is. They estimate its effective age, which is how old the home behaves based on its condition. Federal appraisal rules build maintenance right in: HUD's appraisal handbook has the appraiser judge a home's remaining economic life assuming a reasonable level of continued upkeep, and report the deferred maintenance they find. [1] Two houses built the same year can have very different effective ages. The one with a sound roof, a dry crawlspace, maintained siding, and working systems reads younger. The one with deferred upkeep reads older, and an older effective age pulls the appraised value down."
      },
      {
        "type": "p",
        "text": "You will never see a line item that says lost value to neglect. The loss is baked into the comparison, into the condition adjustments, into the effective age. It is real money, and it is invisible, which is exactly why it is so easy to let happen."
      },
      {
        "type": "h2",
        "text": "How small neglect becomes a big discount"
      },
      {
        "type": "p",
        "text": "Deferred maintenance compounds. A clogged gutter overflows and soaks a fascia board. The soft fascia lets water into the wall. The wall feeds a damp crawlspace. Now a chore you skipped is a moisture problem an inspector flags, a buyer's repair credit, and a line on a report that makes everyone nervous about what else was ignored."
      },
      {
        "type": "p",
        "text": "That last part is the hidden cost. Buyers and their inspectors are pattern-matchers. Visible neglect makes them assume hidden neglect, and they price in a cushion for the unknown. A home that shows obvious deferred maintenance doesn't just lose the cost of those specific repairs. It loses the buyer's confidence, and confidence is worth real dollars at the negotiating table."
      },
      {
        "type": "h2",
        "text": "The flip side, and why it pays"
      },
      {
        "type": "p",
        "text": "A documented, maintained home does the opposite. When you can show that the roof was treated, the deck was sealed, the systems were serviced, and someone has been paying attention, you remove the buyer's fear. The home reads as cared-for, the inspection comes back clean, and the value holds. In a place like Clark County, where the median home is a serious asset, holding your number through the years you own it is not a small thing. It is most of the game."
      },
      {
        "type": "p",
        "text": "Here is the part that surprises people: the return on maintenance is highest precisely when you are not planning to sell. Every year you keep water out of the structure and catch small failures early is a year you are not paying for the large failure that neglect produces. The roof you maintain lasts its full life instead of half. The deck you seal doesn't become a rebuild. The home that gets looked after ages slowly."
      },
      {
        "type": "h2",
        "text": "Maintenance as equity protection"
      },
      {
        "type": "p",
        "text": "It helps to think about your home the way you think about the rest of your money. Most people would not leave a major investment completely unmanaged for twenty years and assume it would be fine. A home is usually the largest asset a family owns, and yet the physical upkeep that protects it is the thing that slides first when life gets busy."
      },
      {
        "type": "p",
        "text": "You do not need a service to do this well. You need a rhythm: look at the home on a schedule, fix small things before they grow, and keep a record of what was done. Run that for years and your home holds its value because you never let it leak."
      },
      {
        "type": "p",
        "text": "If keeping that rhythm yourself is realistic, our blog is full of seasonal checklists to help you do it. If you would rather hand the whole thing to someone, having your home assessed, documented, and maintained on a schedule so the value takes care of itself, that is what our 360° Method membership is built to do. Either way, the homes that hold their worth are the ones somebody is actually watching."
      },
      {
        "type": "cta",
        "text": "Curious where your home stands today? Call (360) 838-6731 or book a walkthrough, and we will give you an honest read.",
        "ctaLabel": "Book a Walkthrough",
        "ctaAction": "booking"
      }
    ]
  },

  // ─── Post 1 - March 10 (Tue) ─────────────────────────────────────────────
  {
    slug: "3-things-vancouver-homeowners-forget-to-check-every-spring",
    title: "The 3 Things Vancouver Homeowners Forget to Check Every Spring (And Why One of Them Could Cost $10,000)",
    excerpt: "Most Clark County homeowners spend spring cleaning the inside of their house. The damage is almost always on the outside - and in three specific places most people never look.",
    date: "March 7, 2026",
    isoDate: "2026-03-07",
    publishDate: "2026-03-07",
    author: "Marcin Micek | Handy Pioneers",
    category: "Seasonal Maintenance",
    audience: ["Homeowners", "Prospects"],
    tags: ["spring maintenance", "Vancouver WA", "Clark County", "deck repair", "water damage prevention"],
    image: "https://handypioneers.com/images/blog/3-things-vancouver-homeowners-forget-to-check-every-spring.webp",
    imageAlt: "Handyman working on home exterior maintenance on a sunny spring day",
    readTime: 5,
    seoTitle: "3 Spring Home Maintenance Checks Vancouver WA Homeowners Miss | Handy Pioneers",
    seoDesc: "Most Clark County homeowners miss three critical spring checks that can lead to $10,000+ in repairs. Marcin Micek of Handy Pioneers walks you through what to look for.",
    references: [
      { label: "NADRA: 90% of deck collapses result from ledger board failures", url: "https://www.nadra.org/blog/how-ledger-boards-impact-deck-safety" },
      { label: "Visit Vancouver WA: Clark County averages 42 inches of rain per year", url: "https://www.visitvancouverwa.com/trip-planning/weather/" },
      { label: "Angi 2025 State of Home Spending: 71% of homeowners postponed a project in 2025", url: "https://www.angi.com/press/angis-2025-state-of-home-spending-pulse-report" },
    ],
    body: [
      { type: "p", text: "Most homeowners in Clark County spend spring cleaning the inside of their house. New season, fresh start - vacuum the carpets, wipe down the baseboards, maybe repaint a room. It feels productive. And it is." },
      { type: "p", text: "But the damage is almost always on the outside. And in three specific places most people never think to look." },
      { type: "p", text: "According to Angi's 2025 State of Home Spending report, 71% of homeowners postponed at least one home project in 2025 - and the deferred maintenance is showing up in repair bills that are significantly larger than the original problem would have cost to fix. [1]" },
      { type: "h2", text: "1. The Deck Ledger Board" },
      { type: "p", text: "The ledger board is the horizontal framing member that connects your deck to your house. According to the North American Deck and Railing Association (NADRA), an estimated 90% of deck collapses result from ledger board connection failures - making it the single most critical structural point on any attached deck. [2]" },
      { type: "p", text: "In the Pacific Northwest, water gets behind the ledger flashing - or there is no flashing, which is common in decks built before 2000 - sits against the wood through our wet winters, and causes rot you cannot see from the deck surface. We had a job in Battle Ground last year where a homeowner called about a single soft board. When we pulled it up, the ledger had been rotting for at least two seasons. What would have been a $400 board replacement became a $4,200 structural repair." },
      { type: "p", text: "What to check: From below the deck, look at where the deck frame meets the house. Look for dark staining, soft wood, gaps in the flashing, or any separation between the ledger and the house. If you see any of those, call a pro before you put weight on that deck this summer." },
      { type: "h2", text: "2. The Crawl Space Vapor Barrier" },
      { type: "p", text: "Vancouver, WA averages 42 inches of rain per year - four inches above the U.S. average, with most of it falling between October and April. [3] That moisture saturates the soil around and under your foundation, and without a properly maintained vapor barrier, it migrates up into your crawl space as humidity. Elevated crawl space humidity causes wood rot in floor joists, mold growth on framing members, and pest activity." },
      { type: "p", text: "What to check: If you can access your crawl space safely, look for torn, bunched, or missing vapor barrier sections. Look for standing water or dark staining on the ground. Look at the floor joists - if they're dark, soft, or show white fuzzy growth, that's a problem. If you haven't been in your crawl space in more than two years, spring is the time." },
      { type: "h2", text: "3. Window and Door Caulk Lines" },
      { type: "p", text: "This one sounds minor. It isn't. The caulk lines around your windows and doors are the primary barrier between the outside world and your wall cavity. When they crack, shrink, or separate - which happens every 5-7 years in our climate - water gets into the wall. By the time you see a water stain on your interior wall, the damage inside the wall cavity is typically 3-5 times worse than what's visible." },
      { type: "p", text: "What to check: Walk the exterior of your house and look at every window and door frame. Run your finger along the caulk line. If it's cracked, pulling away from the frame, or missing in sections, it needs to be replaced. This is a $150-$300 repair that prevents a $3,000-$8,000 wall repair." },
      { type: "blockquote", text: "\"The repairs that cost the most money are almost never the ones homeowners called about. They're the ones that were quietly getting worse in the background.\" - Marcin Micek, Handy Pioneers" },
      { type: "p", text: "At Handy Pioneers, we look at your home as a complete system - not just individual repairs. Our 360° approach means that when we come out for any job, we're also looking at the things you didn't call about. Because catching a $300 problem before it becomes a $10,000 problem is the best service we can offer." },
      { type: "cta", text: "Begin your spring home assessment before our April schedule fills up.", ctaLabel: "Request Your Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 2 - March 13 (Fri) ─────────────────────────────────────────────
  {
    slug: "pressure-washing-3-driveways-in-one-week-vancouver",
    title: "We Pressure Washed 3 Driveways in One Week in Vancouver - Here's What We Found Under the Moss",
    excerpt: "Moss in the Pacific Northwest isn't just ugly - it's actively destroying your concrete. Here's what we uncovered on three Clark County driveways this spring.",
    date: "March 13, 2026",
    isoDate: "2026-03-13",
    publishDate: "2026-03-13",
    author: "Marcin Micek | Handy Pioneers",
    category: "Project Story",
    audience: ["Current Clients", "Homeowners"],
    tags: ["pressure washing", "Vancouver WA", "driveway cleaning", "moss removal", "Clark County"],
    image: "https://handypioneers.com/images/blog/pressure-washing-3-driveways-in-one-week-vancouver.webp",
    imageAlt: "Before and after pressure washing a mossy concrete driveway in the Pacific Northwest",
    readTime: 4,
    seoTitle: "Pressure Washing Vancouver WA - What Moss Is Hiding on Your Driveway | Handy Pioneers",
    seoDesc: "Moss on your Clark County driveway isn't just cosmetic - it's destroying your concrete. Marcin Micek of Handy Pioneers shares what we found under the moss on three Vancouver driveways.",
    references: [
      { label: "KPTV: Moss actively damages roofing materials by retaining moisture against shingles (July 2025)", url: "https://www.kptv.com/2025/07/14/portland-homeowners-how-moss-covered-roofs-are-threatening-your-insurance-coverage/" },
      { label: "Roof Portland: Moss can halve a typical 25-30 year shingle lifespan (Feb 2026)", url: "https://www.roofportland.com/2026/02/24/moss-on-your-portland-roof-the-hidden-dangers/" },
      { label: "Oregon State University Extension: Moss biology and roof damage in the Pacific Northwest", url: "https://extension.oregonstate.edu/sites/extd8/files/catalog/auto/PNW733.pdf" },
    ],
    body: [
      { type: "p", text: "Moss on your driveway looks like a cosmetic problem. It isn't." },
      { type: "p", text: "Moss retains moisture against your concrete surface for weeks at a time - long after the rain has stopped. That sustained moisture accelerates spalling: the surface layer of the concrete absorbs water, freezes during cold nights, expands, and breaks away. The same biology that damages roofs in the Pacific Northwest - where moss can halve a typical 25-30 year shingle lifespan according to roofing researchers [1] - applies to any porous surface it colonizes, including concrete. [2]" },
      { type: "p", text: "Over two or three winters, a moss-covered driveway can go from surface staining to active deterioration that no amount of pressure washing will fix. Here's what we found on three Clark County driveways this spring." },
      { type: "h2", text: "Driveway 1: Vancouver - Surface Checking and Oil Staining" },
      { type: "p", text: "This driveway had about two years of moss growth concentrated along the shaded north side. Under the moss, we found hairline surface cracks running with the aggregate pattern - a sign of multiple freeze-thaw cycles with retained moisture. We also found oil staining masked by the moss. The cracks were surface-only, not structural. After cleaning, we applied a penetrating concrete sealer to slow future moisture absorption." },
      { type: "h2", text: "Driveway 2: Battle Ground - Joint Erosion" },
      { type: "p", text: "The second driveway was poured in the mid-1990s, and the expansion joints had lost most of their filler material. Moss had colonized the joints heavily, accelerating erosion of the joint edges. After cleaning, we re-filled the expansion joints with a flexible polyurethane sealant - a simple repair that most homeowners overlook, but open expansion joints are one of the primary entry points for water that causes slab heaving over time." },
      { type: "h2", text: "Driveway 3: Camas - Clean Bill of Health" },
      { type: "p", text: "The third driveway looked the worst before we started - heavy moss coverage across the full surface. But under the moss, the concrete was in excellent condition. The homeowner had sealed it about three years prior, and the sealer had done its job. A thorough pressure wash, a moss inhibitor treatment, and a fresh coat of sealer - and this driveway is good for another five years." },
      { type: "h2", text: "What This Means for Your Driveway" },
      { type: "p", text: "The pattern we see consistently across Clark County: homeowners wait until the moss is visually obvious before calling. By that point, the moss has usually been there for two or more years - which means the moisture damage has already started. The difference between a $250 cleaning and a $2,000+ resurfacing job is often just one or two seasons of waiting." },
      { type: "blockquote", text: "\"The difference between a $250 cleaning and a $2,000 resurfacing job is often just one or two seasons of waiting.\" - Marcin Micek, Handy Pioneers" },
      { type: "cta", text: "Book your spring pressure wash before our April schedule fills up.", ctaLabel: "Book Pressure Wash", ctaAction: "booking" },
    ],
  },

  // ─── Post 3 - March 17 (Tue) ─────────────────────────────────────────────
  {
    slug: "clark-county-housing-market-2026-what-to-fix-first",
    title: "What the 2026 Clark County Housing Market Means for Your Home's Value (And What to Fix First)",
    excerpt: "The median Clark County home now sells for $549,000. The difference between the top 20% and the bottom 20% isn't location - it's maintenance.",
    date: "March 7, 2026",
    isoDate: "2026-03-07",
    publishDate: "2026-03-07",
    author: "Marcin Micek | Handy Pioneers",
    category: "Home Value",
    audience: ["Homeowners", "Prospects"],
    tags: ["Clark County real estate", "home value", "renovation ROI", "Vancouver WA", "home improvement"],
    image: "https://handypioneers.com/images/blog/clark-county-housing-market-2026-what-to-fix-first.webp",
    imageAlt: "Pacific Northwest home exterior with well-maintained landscaping and fresh paint",
    readTime: 5,
    seoTitle: "Clark County Home Value 2026 - What Repairs Return the Most | Handy Pioneers",
    seoDesc: "The median Clark County home sells for $549,000. Marcin Micek of Handy Pioneers explains which repairs consistently return the most value in the local market.",
    references: [
      { label: "Cano Real Estate: February 2026 Clark County Market Update - Average $624,200, Median $535,000", url: "https://www.canorealestate.com/blog/clark-county-washington-real-estate-market-update-for-february-2026/" },
      { label: "The Columbian: Clark County median price rises to $549,000 in January 2026", url: "https://www.columbian.com/news/2026/feb/26/number-of-new-home-listings-in-clark-county-18-higher-than-january-2025-median-price-rises-to-549000/" },
      { label: "HomeLight: What upgrades increase home value - exterior paint, deck, windows (Jan 2026)", url: "https://www.homelight.com/blog/what-upgrades-increase-home-value/" },
      { label: "SW Washington March 2026 Real Estate Market Report - pending sales climbed to 556", url: "https://washingtonhomes.realestate/nw-life-blog/f/southwest-washington-march-2026-real-estate-market-report" },
    ],
    body: [
      { type: "p", text: "The February 2026 Clark County real estate data tells an interesting story: the median sale price is $535,000, the average is $624,200, and new listings are up 18% over the same period last year. [1] By January 2026, the median had climbed to $549,000 - a 3.8% increase over January 2025. [2] The market hasn't cooled the way national headlines suggest. But it has gotten more discerning." },
      { type: "p", text: "Buyers in Clark County are more inspection-savvy than they were three years ago. They're walking away from deals over deferred maintenance items that would have been negotiated away in 2021. And sellers who haven't maintained their homes are taking price reductions that far exceed what the repairs would have cost." },
      { type: "h2", text: "The Repairs That Return the Most in Clark County" },
      { type: "p", text: "According to HomeLight's 2026 analysis of what upgrades increase home value, exterior improvements and minor updates consistently outperform major renovations in return on investment. [3] Here's what we see in the Clark County market specifically:" },
      { type: "ul", items: [
        "Exterior paint and trim touch-up: $500-$2,000 investment, $5,000-$15,000 perceived value increase at sale",
        "Deck repair and refinishing: $800-$3,000 investment, eliminates a common inspection flag that kills deals",
        "Window caulking and seal replacement: $300-$800 investment, removes a buyer objection and improves energy efficiency",
        "Kitchen cabinet refresh (paint, hardware, minor repairs): $600-$2,500, high visual impact for low cost",
        "Crawl space vapor barrier and moisture control: $800-$2,000, prevents the inspection report item that scares buyers most",
      ]},
      { type: "h2", text: "What Buyers Are Actually Flagging in Inspections" },
      { type: "p", text: "Based on our conversations with local real estate agents and the pre-listing work we do for sellers, the most common inspection items that trigger price negotiations or deal cancellations in Clark County are: deck structural concerns (ledger connections, post bases), evidence of moisture intrusion (water staining, soft floors, crawl space issues), deferred exterior maintenance (peeling paint, failed caulking, moss on roof), and electrical safety items (GFCI outlets, panel age). None of these are expensive to address proactively. All of them are expensive to negotiate around after an inspection report." },
      { type: "h2", text: "The 360° Approach to Home Value" },
      { type: "p", text: "At Handy Pioneers, we look at your home as a complete system - not just individual repairs. We call it our 360° approach: a structured walk-through that identifies what's working, what needs attention now, and what can wait. For homeowners thinking about selling in the next one to three years, this kind of prioritized assessment is the most valuable thing you can do before you call a real estate agent." },
      { type: "cta", text: "Not sure where to start? We'll walk your property and give you a prioritized list.", ctaLabel: "Request Your Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 4 - March 20 (Fri) ─────────────────────────────────────────────
  {
    slug: "hiring-a-handyman-in-vancouver-wa-7-questions",
    title: "Hiring a Handyman in Vancouver WA: 7 Questions You Must Ask Before Signing Anything",
    excerpt: "In Washington State, anyone can call themselves a handyman. Here's how to tell the difference between a pro and a problem - before they're in your home.",
    date: "March 7, 2026",
    isoDate: "2026-03-07",
    publishDate: "2026-03-07",
    author: "Marcin Micek | Handy Pioneers",
    category: "Homeowner Guide",
    audience: ["Homeowners", "Prospects"],
    tags: ["hire handyman Vancouver WA", "licensed contractor Clark County", "vetting a contractor", "Washington state contractor license"],
    image: "https://handypioneers.com/images/blog/hiring-a-handyman-in-vancouver-wa-7-questions.webp",
    imageAlt: "Contractor and homeowner reviewing a project estimate together",
    readTime: 6,
    seoTitle: "Hiring a Handyman in Vancouver WA: 7 Questions to Ask | Handy Pioneers",
    seoDesc: "In Washington State, anyone can call themselves a handyman. Marcin Micek of Handy Pioneers shares the 7 questions every Clark County homeowner should ask before hiring.",
    references: [
      { label: "WA L&I: Register as a Contractor - Washington State requires all construction contractors to register with L&I", url: "https://lni.wa.gov/licensing-permits/contractors/register-as-a-contractor/" },
      { label: "Next Insurance: Washington Handyman License and Insurance Requirements", url: "https://www.nextinsurance.com/blog/washington-handyman-license-and-insurance-requirements/" },
      { label: "L&I Contractor Verification Tool", url: "https://verify.lni.wa.gov" },
    ],
    body: [
      { type: "p", text: "In Washington State, the word 'handyman' is not a licensed classification. Anyone can use it. Washington State requires all construction contractors to register with the Department of Labor and Industries (L&I) - but registration is not the same as licensing, and the threshold for required registration is work over $500. [1] That means the person who shows up at your door could be a 20-year veteran with a full insurance package and a spotless record - or someone who watched a few YouTube videos and bought a tool belt last week." },
      { type: "p", text: "Here are the seven questions we'd want you to ask us - and anyone else." },
      { type: "h2", text: "1. Are you registered and bonded in Washington State?" },
      { type: "p", text: "Washington State requires a contractor registration for any work over $500. Registration through L&I requires proof of insurance, a surety bond, and a background check. [2] You can verify any contractor's registration at verify.lni.wa.gov. [3] Handy Pioneers is fully registered and bonded - our registration number is available on request." },
      { type: "h2", text: "2. Do you carry general liability insurance?" },
      { type: "p", text: "A contractor's bond protects you from non-completion. General liability insurance protects you if something goes wrong during the work - a broken window, a damaged floor, an injury on your property. Ask for a certificate of insurance before work begins. We carry $1M general liability and are happy to provide the certificate." },
      { type: "h2", text: "3. Do you pull permits when required?" },
      { type: "p", text: "In Clark County, permits are required for structural work, electrical, plumbing, and projects above certain size thresholds. A contractor who offers to skip the permit to save you money is offering to save you money now and cost you significantly more later - at resale, during an insurance claim, or if the work fails inspection. We pull permits when required. Always." },
      { type: "h2", text: "4. Do they present a written scope of work before starting?" },
      { type: "p", text: "A verbal agreement is not a plan. It's a conversation. A written scope of work protects both parties - it defines the scope, the materials, the timeline, and the price. If a contractor won't put it in writing, that tells you something important about how they operate. Every Handy Pioneers engagement is documented in a written scope of work, itemized and signed before a single nail is driven." },
      { type: "h2", text: "5. Can you provide local references?" },
      { type: "p", text: "Ask for references from jobs in Clark County, completed in the last 12 months, that are similar in scope to your project. Then call them. Ask about communication, timeliness, quality, and whether they'd hire the contractor again. Our Google reviews are public and reflect real Clark County homeowners - we're proud of every one of them." },
      { type: "h2", text: "6. What's your warranty policy?" },
      { type: "p", text: "A professional contractor stands behind their work. At Handy Pioneers, we offer a 1-year labor guarantee on all completed work. If something we did fails within a year due to workmanship, we come back and fix it. No charge." },
      { type: "h2", text: "7. Do you use subcontractors, and are they vetted?" },
      { type: "p", text: "Many contractors subcontract work without telling homeowners. That's not inherently wrong - specialty trades like electrical and plumbing require separate licensing. But you should know who is in your home and whether they're held to the same standards as the company you hired. At Handy Pioneers, we're transparent about when we use specialty partners, and every partner we work with is licensed, insured, and vetted." },
      { type: "blockquote", text: "\"We answer yes to all seven. That's not a boast - it's a baseline. It's what every contractor you hire should be able to say.\" - Marcin Micek, Handy Pioneers" },
      { type: "cta", text: "We answer yes to all seven. Schedule a consultation and see the difference.", ctaLabel: "Schedule a Consultation", ctaAction: "booking" },
    ],
  },

  // ─── Post 5 - March 24 (Tue) ─────────────────────────────────────────────
  {
    slug: "porch-step-repair-battle-ground-safety-wake-up-call",
    title: "The Porch Step Repair in Battle Ground That Turned Into a Safety Wake-Up Call",
    excerpt: "The homeowner had been stepping over the broken board for eight months. She didn't realize her kids were doing the same thing.",
    date: "March 24, 2026",
    isoDate: "2026-03-24",
    publishDate: "2026-03-24",
    author: "Marcin Micek | Handy Pioneers",
    category: "Project Story",
    audience: ["Current Clients", "Homeowners"],
    tags: ["porch repair", "Battle Ground WA", "exterior carpentry", "Clark County", "360 Method"],
    image: "https://handypioneers.com/images/blog/porch-step-repair-battle-ground-safety-wake-up-call.webp",
    imageAlt: "Repaired porch steps on a Pacific Northwest craftsman home",
    readTime: 4,
    seoTitle: "Porch Step Repair Battle Ground WA - Project Story | Handy Pioneers",
    seoDesc: "A Battle Ground homeowner called about a broken porch step. What Marcin Micek of Handy Pioneers found underneath changed the scope - and revealed why the 360° Method matters.",
    references: [
      { label: "NADRA: Ledger board connections represent the highest-risk moisture entry point in any deck structure", url: "https://www.nadra.org/blog/how-ledger-boards-impact-deck-safety" },
      { label: "Green Builder Media: Most major deck failures can be traced back to the ledger board", url: "https://www.greenbuildermedia.com/blog/when-will-my-deck-or-balcony-fail" },
    ],
    body: [
      { type: "p", text: "The homeowner had been stepping over the broken board for eight months. She'd been meaning to call. Life got busy. And honestly, it didn't seem that urgent - it was just one board, and she knew where it was." },
      { type: "p", text: "She didn't realize her kids were doing the same thing. Or that the board had been flexing against the stringer beneath it every time someone stepped on it, slowly working the fasteners loose." },
      { type: "h2", text: "What the Scope Discovery Revealed" },
      { type: "p", text: "The broken board was the visible symptom. The cause was a rotted stringer - the diagonal framing member that supports the stair treads. The rot had started at the base of the stringer where it contacts the concrete landing, a classic moisture trap in Pacific Northwest conditions. Research from the North American Deck and Railing Association confirms that moisture entry points at structural connections are the leading cause of stair and deck failures. [1]" },
      { type: "p", text: "We also found a lattice panel on the side of the porch that had been holding moisture against the siding. The lattice itself was in poor condition, but more importantly, the siding behind it showed early signs of moisture damage - soft spots in the paint, slight discoloration at the bottom course. Caught now, it's a $200 repair. Left for another season, it becomes a siding replacement." },
      { type: "h2", text: "The Repair Sequence" },
      { type: "p", text: "We replaced the rotted stringer with pressure-treated lumber, re-set the existing treads, and replaced the broken board. We removed the deteriorated lattice panel, treated the siding behind it with a wood hardener, and installed new lattice with a proper gap at the bottom to allow air circulation and prevent future moisture accumulation." },
      { type: "p", text: "Total time: about four hours. Total cost: $680. The homeowner's reaction when we walked her through what we'd found and what we'd done: 'I had no idea the stringer was the problem. I thought it was just a board.'" },
      { type: "h2", text: "Why This Is Exactly What the 360° Method Is For" },
      { type: "p", text: "This is exactly why we developed the 360° Method - a complete walk-through of every system in your home, not just the one you called about. A broken board is a symptom. The 360° Method finds the cause. In this case, the cause was a rotted stringer and a moisture-trapping lattice panel. Finding both on the same visit saved this homeowner from two separate repair calls - and from a siding replacement that would have cost 10 times what the lattice repair cost." },
      { type: "cta", text: "Don't wait for a fall. We'll assess your exterior.", ctaLabel: "Request Your Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 6 - March 27 (Fri) ─────────────────────────────────────────────
  {
    slug: "what-its-really-like-to-work-with-handy-pioneers",
    title: "What It's Really Like to Work With Handy Pioneers: A Day in the Field",
    excerpt: "Most job listings tell you what the job pays. They never tell you what the job actually feels like. Here's a real day in the field at Handy Pioneers.",
    date: "March 27, 2026",
    isoDate: "2026-03-27",
    publishDate: "2026-03-27",
    author: "Marcin Micek | Handy Pioneers",
    category: "Behind the Scenes",
    audience: ["Employees", "Recruiting", "Community"],
    tags: ["handyman jobs Vancouver WA", "trades career Clark County", "skilled trades Pacific Northwest", "Handy Pioneers team"],
    image: "https://handypioneers.com/images/blog/what-its-really-like-to-work-with-handy-pioneers.webp",
    imageAlt: "Skilled tradesperson working on a home repair project in the Pacific Northwest",
    readTime: 5,
    seoTitle: "Handyman Jobs Vancouver WA - What Working at Handy Pioneers Is Really Like | Marcin Micek",
    seoDesc: "A first-person look at a real day in the field at Handy Pioneers. If you're a skilled trade looking for work in Clark County, WA, this is for you.",
    references: [
      { label: "Angi 2025 State of Home Spending: Home services industry employment trends", url: "https://www.angi.com/press/angis-2025-state-of-home-spending-pulse-report" },
    ],
    body: [
      { type: "p", text: "Most job listings tell you what the job pays. They tell you about benefits, hours, and requirements. They never tell you what the job actually feels like - what a Tuesday in March looks like when you're a lead technician at a home services company in Clark County." },
      { type: "p", text: "Here's a real one." },
      { type: "h2", text: "7:30 AM - Morning Briefing" },
      { type: "p", text: "The day starts with a 15-minute check-in. Two jobs on the schedule. First job: kitchen cabinet repair in Camas, homeowner reported a cabinet door that won't close and a drawer that's been sticking since last fall. Second job: deck assessment in Ridgefield, new client, called after reading the spring maintenance post. Unknown scope - could be a quick visual, could be a full structural evaluation." },
      { type: "p", text: "The briefing isn't just logistics. It's a conversation about what to look for, what questions to ask, and what the 360° protocol requires for each type of job. Every tech at Handy Pioneers knows that the job on the work order is the starting point, not the whole story." },
      { type: "h2", text: "9:00 AM - Camas: The Cabinet Job" },
      { type: "p", text: "The cabinet door issue turns out to be a hinge that's pulled away from the face frame - a common failure in older cabinets where the original screws have stripped the wood. The fix is a set of longer screws with a wood filler insert. Twenty minutes. The drawer sticking is a humidity issue - the drawer box has swollen slightly. A light pass with a hand plane and a coat of paste wax, and it slides clean." },
      { type: "p", text: "While doing the 360° walk-through of the kitchen, the tech notices the caulk line at the backsplash has separated in two places. He photographs it, notes it in the job report, and mentions it to the homeowner before leaving. She didn't know. She's glad to know." },
      { type: "h2", text: "1:00 PM - Ridgefield: The Deck Assessment" },
      { type: "p", text: "The Ridgefield deck is a 400-square-foot cedar deck, probably 15 years old. The homeowner is thinking about selling in two years and wants to know what shape it's in. This is exactly the kind of job the 360° Method was built for." },
      { type: "p", text: "The assessment takes about 45 minutes. Findings: the ledger connection is solid and properly flashed - good news. Two post bases show early surface rust on the hardware, not structural but worth monitoring. Seven deck boards have surface checking that should be addressed before refinishing. One board near the stairs is soft and needs replacement. The overall structure is sound. The homeowner gets a written report with photos by end of day." },
      { type: "h2", text: "What the Job Actually Is" },
      { type: "p", text: "The job isn't fixing cabinets and assessing decks. The job is earning trust - one homeowner at a time, one visit at a time. The technical skills matter. But the thing that makes this work meaningful is the moment when a homeowner says 'I had no idea' and you realize you've just changed how they think about their home." },
      { type: "p", text: "We're growing. If this sounds like your kind of work - if you're a skilled trade who wants to be part of a team that takes the craft seriously - reach out." },
      { type: "cta", text: "We're growing. If this sounds like your kind of work, reach out.", ctaLabel: "Contact Us", ctaAction: "phone" },
    ],
  },

  // ─── Post 7 - March 31 (Tue) ─────────────────────────────────────────────
  {
    slug: "kitchen-water-damage-vancouver-how-we-stopped-a-small-leak",
    title: "Kitchen Water Damage in Vancouver: How We Stopped a Small Leak From Becoming a Big Remodel",
    excerpt: "The homeowner thought it was a slow drain. It was actually a failing supply line - and it had been leaking for six weeks.",
    date: "March 31, 2026",
    isoDate: "2026-03-31",
    publishDate: "2026-03-31",
    author: "Marcin Micek | Handy Pioneers",
    category: "Project Story",
    audience: ["Homeowners", "Prospects"],
    tags: ["kitchen water damage", "Vancouver WA", "water damage repair", "Clark County", "cabinet repair"],
    image: "https://handypioneers.com/images/blog/kitchen-water-damage-vancouver-how-we-stopped-a-small-leak.webp",
    imageAlt: "Kitchen under-cabinet area showing water damage repair work in progress",
    readTime: 5,
    seoTitle: "Kitchen Water Damage Repair Vancouver WA - Project Story | Handy Pioneers",
    seoDesc: "A Vancouver homeowner thought they had a slow drain. Marcin Micek of Handy Pioneers found a failing supply line that had been leaking for six weeks - here's how we stopped it.",
    references: [
      { label: "Philadelphia Fed: Total estimated cost of needed home repairs was $198.4 billion in 2024", url: "https://www.philadelphiafed.org/-/media/FRBP/Assets/Community-Development/Briefs/home-repair-costs-2025/home-repair-costs.pdf" },
      { label: "AHS: Financial experts recommend setting aside 1-4% of home value annually for maintenance", url: "https://www.ahs.com/home-matters/homebuyer-hub-resources-and-guides/big-fixes-big-price-tags-the-rising-cost-of-home-maintenance-and-repairs/" },
    ],
    body: [
      { type: "p", text: "The homeowner thought it was a slow drain. She'd noticed the cabinet under the kitchen sink felt a little damp when she reached under it, but she assumed it was condensation or a minor splash from washing dishes. She'd been meaning to look at it more closely for about six weeks." },
      { type: "p", text: "When we opened the cabinet, we found a failing braided supply line - the flexible hose that connects the shut-off valve to the faucet. It had developed a slow weep at the fitting, and for six weeks, it had been dripping onto the cabinet base and the subfloor below." },
      { type: "p", text: "This kind of deferred discovery is more common than most homeowners realize. According to a 2024 Federal Reserve Bank of Philadelphia study, the total estimated cost of needed repairs to occupied U.S. housing units was $198.4 billion - much of it driven by small problems that went unaddressed until they became large ones. [1]" },
      { type: "h2", text: "The Damage Assessment" },
      { type: "p", text: "The cabinet base was saturated. The particle board had swollen and delaminated - it needed to be replaced. We took a moisture reading on the subfloor below the cabinet: 22%, well above the 15% threshold where mold risk becomes significant. The subfloor itself was structurally intact, but the moisture had wicked into the adjacent cabinet base on the right side as well." },
      { type: "p", text: "We also checked the wall behind the cabinet. No moisture penetration into the drywall - we caught it before it reached the wall cavity. That was the good news." },
      { type: "h2", text: "The Repair Sequence" },
      { type: "p", text: "Step one: replace the supply line and verify the repair is dry. Step two: remove the saturated cabinet bases and allow the subfloor to dry with a dehumidifier running for 48 hours. Step three: treat the subfloor with a mold-inhibiting primer. Step four: install new cabinet bases, match the existing finish, and reinstall the plumbing connections." },
      { type: "p", text: "Total repair cost: $1,100. If the homeowner had waited another two months, the subfloor would have required replacement - a $3,500-$5,000 repair. Financial advisors recommend setting aside 1-4% of your home's value annually for maintenance precisely to avoid this kind of compounding cost. [2]" },
      { type: "h2", text: "The 360° Moisture Assessment" },
      { type: "p", text: "The 360° Method starts with a complete moisture assessment - because water damage rarely stays where you first find it. On this job, we also checked the dishwasher connection, the refrigerator water line, and the bathroom directly above the kitchen. The leak was isolated. But we needed to verify that before we could tell the homeowner she was in the clear." },
      { type: "cta", text: "Noticed something under your sink? Don't wait. We'll take a look.", ctaLabel: "Request Your Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 8 - April 3 (Fri) ─────────────────────────────────────────────
  {
    slug: "why-we-dont-subcontract-our-core-work",
    title: "Who Actually Shows Up to Your Home - And How We Vet Them",
    excerpt: "Every contractor says they stand behind their work. The better question: who is standing in your home, and what standard did they have to meet before they got there?",
    date: "April 3, 2026",
    isoDate: "2026-04-03",
    publishDate: "2026-04-03",
    author: "Marcin Micek | Handy Pioneers",
    category: "About Us",
    audience: ["Homeowners", "Subcontractors", "Partners"],
    tags: ["subcontractor Vancouver WA", "trade partner Clark County", "contractor quality", "licensed trades Washington"],
    image: "https://handypioneers.com/images/blog/why-we-dont-subcontract-our-core-work.webp",
    imageAlt: "Skilled tradesperson working carefully on a home repair project",
    readTime: 4,
    seoTitle: "Who Shows Up to Your Home and How We Vet Them | Handy Pioneers | Vancouver WA",
    seoDesc: "Every contractor says they stand behind their work. Marcin Micek of Handy Pioneers explains who is actually on your property, the vetting standard every tradesman must meet, and why one point of contact matters.",
    references: [
      { label: "WA L&I: Specialty trades - electrical, plumbing, HVAC require separate licensing in Washington State", url: "https://lni.wa.gov/licensing-permits/contractors/register-as-a-contractor/" },
    ],
    body: [
      { type: "p", text: "Every contractor says they stand behind their work. The better question: who is standing in your home, and what standard did they have to meet before they got there?" },
      { type: "p", text: "It's a question worth asking. In the home services industry, it's common for the person who quoted the job to disappear and for the work to be handed to whoever is available this week. Nobody tells the homeowner. That's the transparency problem we set out to fix." },
      { type: "h2", text: "How Handy Pioneers Is Structured" },
      { type: "p", text: "Every engagement starts owner-led. Marcin walks the property, builds the scope, and stays your single point of contact from first call to final walkthrough. The work itself is executed by the Handy Pioneers team: a vetted crew of skilled tradesmen for carpentry, repair, painting, pressure washing, deck, window, and door work, and separately licensed specialists where Washington law requires it." },
      { type: "p", text: "You are never handed off to someone you haven't met, and you always know in advance who is coming to your home. One standard, one point of contact, one company answerable for the result." },
      { type: "h2", text: "The Standard Every Tradesman Must Meet" },
      { type: "p", text: "Nobody works on a client's home before they clear our vetting: current Washington State licensing where the trade requires it (verified through L&I), general liability insurance, references from recent local jobs, and a direct conversation with us about how they communicate with homeowners. Electrical, plumbing, HVAC, and roofing each require their own separate license in Washington [1], and we only put separately licensed specialists on that work." },
      { type: "p", text: "The simplest way to say it: we don't send anyone we wouldn't trust in our own homes. And because every job carries our one-year labor guarantee, we have every reason to hold that line - if something isn't right, we come back and fix it." },
      { type: "h2", text: "Why We're Telling You This" },
      { type: "p", text: "Because you deserve to know who is in your home and why. The home services industry has a transparency problem, and we'd rather be the company that addresses it directly than the one that hopes you don't ask." },
      { type: "p", text: "If you're a licensed tradesman in Clark County who works the way we've described - licensed, insured, communicative, and proud of your craft - we'd like to meet you. We hold a high bar, and we're always looking for people who clear it." },
      { type: "cta", text: "Are you a licensed tradesman in Clark County? We'd like to meet you.", ctaLabel: "Contact Us", ctaAction: "phone" },
    ],
  },


  // ─── Post 9 - April 7 (Tue) ─────────────────────────────────────────────
  {
    slug: "deck-season-is-here-what-vancouver-homeowners-should-know",
    title: "Deck Season Is Here: What Every Vancouver Homeowner Should Know Before Calling a Contractor",
    excerpt: "In the Pacific Northwest, a deck that looks fine in March can be structurally compromised by June. Here's what to look for - and what it means for your summer plans.",
    date: "April 7, 2026",
    isoDate: "2026-04-07",
    publishDate: "2026-04-07",
    author: "Marcin Micek | Handy Pioneers",
    category: "Seasonal Maintenance",
    audience: ["Homeowners", "Prospects"],
    tags: ["deck repair Vancouver WA", "deck inspection Clark County", "wood deck maintenance", "Pacific Northwest"],
    image: "https://handypioneers.com/images/blog/deck-season-is-here-what-vancouver-homeowners-should-know.webp",
    imageAlt: "Cedar deck on a Pacific Northwest home in early spring",
    readTime: 5,
    seoTitle: "Deck Repair Vancouver WA - What to Check Before Summer | Handy Pioneers",
    seoDesc: "A PNW deck that looks fine in March can be structurally compromised by June. Marcin Micek of Handy Pioneers explains what to check before deck season starts.",
    references: [
      { label: "NADRA: 90% of deck collapses result from ledger board connection failures", url: "https://www.nadra.org/blog/how-ledger-boards-impact-deck-safety" },
      { label: "Consumer Product Safety Commission: More than 6,000 people injured annually in deck-related incidents", url: "https://www.robsonforensic.com/articles/deck-collapse-expert-witness" },
      { label: "Visit Vancouver WA: Clark County averages 42 inches of rain per year", url: "https://www.visitvancouverwa.com/trip-planning/weather/" },
    ],
    body: [
      { type: "p", text: "In the Pacific Northwest, a deck that looks fine in March can be structurally compromised by June. Not because anything dramatic happened - but because our winters are long, wet, and relentless, and wood absorbs moisture in ways that aren't always visible from the surface." },
      { type: "p", text: "According to the Consumer Product Safety Commission, more than 6,000 people are injured annually in deck-related incidents in the U.S. [1] The North American Deck and Railing Association (NADRA) reports that 90% of deck collapses result from ledger board connection failures - the point where the deck attaches to the house. [2] Most of these failures are preventable with a proper annual inspection." },
      { type: "h2", text: "The PNW Freeze-Thaw Problem" },
      { type: "p", text: "Vancouver, WA averages 42 inches of rain per year, with the bulk of it falling between October and April. [3] That sustained moisture works into deck fasteners, ledger connections, and post bases throughout the winter. Then we get the occasional freeze - and water that has infiltrated wood grain or fastener holes expands, widening the gap and accelerating deterioration." },
      { type: "p", text: "By the time you're ready to use your deck in May, the damage from last winter is already done. The question is whether it's cosmetic or structural." },
      { type: "h2", text: "What to Check Before You Call a Contractor" },
      { type: "ul", items: [
        "Ledger board: Look from below where the deck frame meets the house. Any dark staining, soft wood, or gaps in the flashing are red flags.",
        "Post bases: Check the metal hardware at the base of each post. Surface rust is normal; significant corrosion or separation from the post means the hardware needs replacement.",
        "Deck boards: Walk the deck and feel for soft spots, bounce, or boards that flex more than their neighbors. Surface checking (small cracks along the grain) is normal; soft or punky wood is not.",
        "Stair stringers: The diagonal framing under your stairs is the most moisture-exposed structural member on most decks. Press on it at the base where it meets the landing.",
        "Railing connections: Grab each post and apply lateral pressure. There should be no movement. A railing post that wobbles is a safety issue.",
      ]},
      { type: "h2", text: "Our 360° Deck Assessment" },
      { type: "p", text: "Our 360° Method includes a structural deck assessment as part of every exterior evaluation. We check all of the above, photograph our findings, and give you a written report with repair priorities and estimated costs. No sales pressure - just information you can use to make a decision." },
      { type: "cta", text: "We'll tell you exactly what you're working with.", ctaLabel: "Request a Deck Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 10 - April 10 (Fri) ─────────────────────────────────────────────
  {
    slug: "window-cleaning-camas-what-we-found-behind-3-years-of-grime",
    title: "Window Cleaning in Camas: What We Found Behind 3 Years of Pacific Northwest Grime",
    excerpt: "The windows looked dirty. What was underneath them was worse - and the homeowner had no idea.",
    date: "April 10, 2026",
    isoDate: "2026-04-10",
    publishDate: "2026-04-10",
    author: "Marcin Micek | Handy Pioneers",
    category: "Project Story",
    audience: ["Current Clients", "Homeowners"],
    tags: ["window cleaning Camas WA", "window washing Clark County", "exterior window cleaning Vancouver WA"],
    image: "https://handypioneers.com/images/blog/window-cleaning-camas-what-we-found-behind-3-years-of-grime.webp",
    imageAlt: "Clean windows on a Pacific Northwest home after professional cleaning",
    readTime: 4,
    seoTitle: "Window Cleaning Camas WA - Project Story | Handy Pioneers",
    seoDesc: "A Camas homeowner booked a window cleaning. Marcin Micek of Handy Pioneers found failed seals, oxidized frames, and a cracked sill - here's what a real cleaning reveals.",
    references: [
      { label: "Energy.gov: Failed window seals reduce insulating value and increase energy costs", url: "https://www.energy.gov/energysaver/update-or-replace-windows" },
    ],
    body: [
      { type: "p", text: "The windows looked dirty. Three years of Pacific Northwest grime - pollen, moss spores, mineral deposits from rain runoff, and oxidation from the aluminum frames. The homeowner had been putting off the cleaning for two seasons, and honestly, it was overdue." },
      { type: "p", text: "What was underneath them was more interesting than dirt." },
      { type: "h2", text: "The Cleaning Process" },
      { type: "p", text: "Professional window cleaning isn't just squeegee and go. The process starts with screen removal and inspection, then frame cleaning to remove oxidation and debris from the tracks, then glass cleaning with a proper squeegee technique that eliminates streaking, then track cleaning, and finally re-screening. On a house this size - 22 windows - the full process takes about four hours." },
      { type: "h2", text: "What the Tech Found" },
      { type: "p", text: "Two windows on the north-facing wall showed fogging between the panes - a clear sign of seal failure. When a double-pane window seal fails, the inert gas between the panes (typically argon) escapes and is replaced by humid air. The result is condensation that forms inside the glass, which you can't wipe off. Beyond the visual problem, failed seals reduce the window's insulating value significantly, increasing heating and cooling costs. [1]" },
      { type: "p", text: "The tech also found oxidized frames on four windows - the aluminum had developed a chalky white coating that was trapping dirt and beginning to pit. This is a surface condition, not structural, but left untreated it accelerates frame deterioration. We treated the frames with an aluminum oxidation remover and a protective coating." },
      { type: "p", text: "Finally: a cracked sill on the south side of the house. The crack ran the full width of the sill and had been channeling water toward the wall below. The homeowner had no idea it was there - it's not visible from inside the house." },
      { type: "h2", text: "What the Homeowner Thought They Were Booking" },
      { type: "p", text: "The homeowner thought they were booking a cleaning. They got a cleaning - and a full exterior health check that identified two failed window seals, four oxidized frames, and a cracked sill that was letting moisture into the wall. The cleaning cost $280. The repairs we identified, addressed proactively, cost $420. The alternative - discovering the failed seals and sill damage during a home inspection before a sale - would have cost significantly more in negotiated price reductions." },
      { type: "cta", text: "Book your spring window cleaning - and we'll flag anything that needs attention while we're there.", ctaLabel: "Book Window Cleaning", ctaAction: "booking" },
    ],
  },

  // ─── Post 11 - April 14 (Tue) - THE 360° METHOD ANCHOR POST ──────────────
  {
    slug: "the-360-method-why-we-look-at-your-whole-home",
    title: "Introducing the 360° Method: From Reactive Chaos to Proactive Control",
    excerpt: "Most homeowners manage their homes the same way - they wait for something to break, panic, call someone, pay more than they should, and repeat. The 360° Method is a 9-step system that ends that cycle.",
    date: "March 7, 2026",
    isoDate: "2026-03-07",
    publishDate: "2026-03-07",
    author: "Marcin Micek | Handy Pioneers",
    category: "360° Method",
    audience: ["Homeowners", "Prospects", "Community"],
    tags: ["360 method Vancouver WA", "proactive home maintenance Clark County", "home management system Vancouver WA"],
    image: "https://handypioneers.com/images/blog/the-360-method-why-we-look-at-your-whole-home.webp",
    imageAlt: "The 360° Method - Handy Pioneers home management system logo",
    readTime: 6,
    seoTitle: "The 360° Method: Proactive Home Management System | Handy Pioneers Vancouver WA",
    seoDesc: "Marcin Micek of Handy Pioneers introduces the 360° Method - a 9-step, 3-phase system that helps Clark County homeowners move from reactive chaos to proactive control of their homes.",
    references: [
      { label: "AHS: Financial experts recommend setting aside 1-4% of home value annually for maintenance", url: "https://www.ahs.com/home-matters/homebuyer-hub-resources-and-guides/big-fixes-big-price-tags-the-rising-cost-of-home-maintenance-and-repairs/" },
      { label: "Angi 2025 State of Home Spending: 71% of homeowners postponed at least one project in 2025", url: "https://www.angi.com/press/angis-2025-state-of-home-spending-pulse-report" },
      { label: "360° Method official site: www.360degreemethod.com", url: "https://www.360degreemethod.com" },
    ],
    body: [
      { type: "p", text: "Most homeowners manage their homes the same way. Something breaks. They panic. They call someone. They pay more than they should have - because they waited. Then they repeat the cycle six months later with a different problem that was caused, in part, by the first one they didn't fully address." },
      { type: "p", text: "This is what we call Reactive Chaos. And it's the default mode for the majority of homeowners in Clark County - not because they don't care about their homes, but because no one ever gave them a system." },
      { type: "p", text: "The 360° Method is that system." },
      { type: "h2", text: "What Is the 360° Method?" },
      { type: "p", text: "The 360° Method is a 9-step home management system organized into 3 phases and 5 modules. It was developed by Marcin Micek of Handy Pioneers based on years of field experience in Clark County - seeing the same preventable problems, the same expensive surprises, and the same homeowner frustration over and over again. The framework is both an education system and an operational protocol. The course teaches you how to think about your home as a managed asset. The app operationalizes that thinking into a daily, weekly, monthly, and annual system. [3]" },
      { type: "h2", text: "The Cascade Effect: Why Small Problems Become Big Ones" },
      { type: "p", text: "Before we walk through the 9 steps, it's worth understanding the villain of this story: the Cascade Effect. A small leak under a kitchen sink, ignored for six months, doesn't stay small. It saturates the cabinet base, wicks into the subfloor, creates the moisture conditions that mold requires, and eventually compromises the structural integrity of the floor system. What started as a $150 repair becomes a $4,000 project." },
      { type: "p", text: "The Cascade Effect is why financial advisors recommend setting aside 1-4% of your home's value annually for maintenance [1] - and why 71% of homeowners who postponed projects in 2025 ended up spending more than they would have if they'd acted sooner. [2] The 360° Method is designed to interrupt the Cascade Effect before it starts." },
      { type: "h2", text: "Phase 1: AWARE - Know Before You Need" },
      { type: "p", text: "The first phase has three steps: Baseline, Inspect, and Track. Baseline means documenting every major system in your home - HVAC age, roof condition, appliances, water heater - creating what we call your home's medical record. Inspect means conducting seasonal walkthroughs with a structured checklist, catching cracked caulk, aging filters, and loose trim before they become emergencies. Track means maintaining a living maintenance log that captures every repair, every contractor, and every dollar spent - revealing patterns and preventing repeated mistakes." },
      { type: "h2", text: "Phase 2: ACT - Fix Small Before It's Big" },
      { type: "p", text: "The second phase has three steps: Prioritize, Schedule, and Execute. Prioritize uses a three-tier system - NOW (safety), SOON (ROI), WAIT (comfort) - so you never waste money on cosmetics while a structural issue festers. Schedule builds a complete maintenance calendar with monthly, quarterly, and annual tasks so nothing falls through the cracks. Execute provides a decision framework for DIY vs. hire, plus the confidence and resources to actually complete the work." },
      { type: "h2", text: "Phase 3: ADVANCE - Build Wealth Through Property Care" },
      { type: "p", text: "The third phase has three steps: Preserve, Upgrade, and Scale. Preserve focuses on extending the life of major systems - extending an HVAC from 12 to 18+ years, a water heater from 8 to 12+ years - saving tens of thousands over a homeownership lifetime. Upgrade uses a Good-Better-Best framework to ensure every improvement dollar either increases value or prevents failure. Scale brings CFO-level intelligence to your property: understanding equity, evaluating refinance and HELOC decisions, and knowing whether to pay down mortgage or invest." },
      { type: "h2", text: "Three Ways to Use the 360° Method" },
      { type: "p", text: "Module 5 of the framework is called Choose Your Path - because not every homeowner needs the same level of support. The DIY path gives you the full system to run yourself. The Hybrid path uses the app to automate tracking, reminders, and prioritization while you handle execution. The Fully Managed path is what Handy Pioneers clients experience: we run the protocol, you get the results." },
      { type: "cta", text: "Ready to move from Reactive Chaos to Proactive Control? Start with a 360° assessment.", ctaLabel: "Schedule 360° Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 12 - April 17 (Fri) ─────────────────────────────────────────────
  {
    slug: "moss-mold-moisture-pnw-homeowners-guide-roof-siding",
    title: "Moss, Mold, and Moisture: The PNW Homeowner's Guide to Protecting Your Roof and Siding",
    excerpt: "Moss on your roof isn't a cosmetic problem. It's a slow-motion leak - and in the Pacific Northwest, it's on more roofs than most homeowners realize.",
    date: "April 17, 2026",
    isoDate: "2026-04-17",
    publishDate: "2026-04-17",
    author: "Marcin Micek | Handy Pioneers",
    category: "Seasonal Maintenance",
    audience: ["Homeowners", "Prospects"],
    tags: ["moss removal roof Vancouver WA", "roof moss treatment Clark County", "siding mold removal Vancouver", "PNW home exterior"],
    image: "https://handypioneers.com/images/blog/moss-mold-moisture-pnw-homeowners-guide-roof-siding.webp",
    imageAlt: "Pacific Northwest home roof with moss growth - before treatment",
    readTime: 5,
    seoTitle: "Moss Removal Roof Vancouver WA - PNW Homeowner's Guide | Handy Pioneers",
    seoDesc: "Moss on your roof isn't cosmetic - it's destroying your shingles. Marcin Micek of Handy Pioneers explains the biology, the damage, and the treatment process for Clark County homes.",
    references: [
      { label: "KPTV: Moss actively damages roofing materials by retaining moisture - can void manufacturer warranty (July 2025)", url: "https://www.kptv.com/2025/07/14/portland-homeowners-how-moss-covered-roofs-are-threatening-your-insurance-coverage/" },
      { label: "Roof Portland: Moss can halve a typical 25-30 year shingle lifespan to 12-15 years (Feb 2026)", url: "https://www.roofportland.com/2026/02/24/moss-on-your-portland-roof-the-hidden-dangers/" },
      { label: "Oregon State University Extension: Moss biology and roof damage in the Pacific Northwest", url: "https://extension.oregonstate.edu/sites/extd8/files/catalog/auto/PNW733.pdf" },
      { label: "Elite Roofing NW: Improper moss removal often causes more damage than the moss itself (Jan 2026)", url: "https://www.eliteroofingnw.com/news/why-moss-is-more-than-a-cosmetic-problem-for-pacific-northwest-roofs" },
    ],
    body: [
      { type: "p", text: "Moss on your roof isn't a cosmetic problem. It's a slow-motion leak." },
      { type: "p", text: "Moss retains moisture against your roofing materials for weeks at a time - long after the rain has stopped. According to roofing researchers, this sustained moisture causes shingles to curl, crack, and lose their protective granules at an accelerated rate. Moss can halve a typical 25-30 year shingle lifespan to just 12-15 years. [1] [2] In the Pacific Northwest, where moss is endemic and our roofs are wet for six months of the year, this isn't a theoretical risk - it's happening on roofs all over Clark County right now." },
      { type: "h2", text: "The Biology of Roof Moss" },
      { type: "p", text: "Moss is a non-vascular plant that reproduces via spores. It doesn't need soil - it colonizes any porous surface that stays moist and receives partial shade. Oregon State University Extension research documents that both moss and lichens grow readily on roofs throughout the Pacific Northwest, with north-facing slopes and areas shaded by trees being most vulnerable. [3] Once established, moss rhizoids (root-like structures) penetrate the surface of asphalt shingles, physically breaking down the material." },
      { type: "h2", text: "The Treatment Process" },
      { type: "p", text: "Proper moss treatment has three phases. First, a soft-wash treatment - a low-pressure application of a moss-killing solution (typically zinc sulfate or a commercial biocide). High-pressure washing should never be used on asphalt shingles; it removes granules and accelerates the damage you're trying to prevent. [4] Second, a zinc strip installation at the ridge - zinc ions wash down the roof with each rain, creating an inhospitable environment for moss regrowth. Third, a maintenance schedule - annual inspection and spot treatment to prevent re-establishment." },
      { type: "h2", text: "A Vancouver Case Study" },
      { type: "p", text: "We had a Vancouver homeowner last year whose roof had four years of moss growth on the north slope. When we treated it and inspected the shingles underneath, we found that the moss had voided the manufacturer's warranty - the warranty explicitly excluded damage caused by biological growth. The homeowner was planning to sell in two years. A $400 treatment and a zinc strip installation saved them from a warranty dispute and a potential roof replacement negotiation at sale." },
      { type: "p", text: "Spring is the best time to treat moss - before summer heat bakes the moss into the shingles and makes removal more difficult. If you can see green on your roof from the street, it's time." },
      { type: "cta", text: "Spring is the best time to treat moss before summer heat bakes it in. Request an exterior assessment.", ctaLabel: "Request Your Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 13 - April 21 (Tue) ─────────────────────────────────────────────
  {
    slug: "how-real-estate-agents-clark-county-can-use-a-handyman-to-close-more-deals",
    title: "How Real Estate Agents in Clark County Can Use a Handyman to Close More Deals",
    excerpt: "The deal fell through because of a $600 repair that no one caught until the inspection report. Here's how to prevent that from happening to your listings.",
    date: "April 21, 2026",
    isoDate: "2026-04-21",
    publishDate: "2026-04-21",
    author: "Marcin Micek | Handy Pioneers",
    category: "Partner Resources",
    audience: ["Business Partners", "Real Estate Agents"],
    tags: ["handyman for real estate agents Vancouver WA", "pre-listing repairs Clark County", "contractor for realtors Vancouver"],
    image: "https://handypioneers.com/images/blog/how-real-estate-agents-clark-county-can-use-a-handyman-to-close-more-deals.webp",
    imageAlt: "Real estate agent reviewing a home inspection report with a contractor",
    readTime: 5,
    seoTitle: "Handyman for Real Estate Agents Vancouver WA - Pre-Listing Repairs | Handy Pioneers",
    seoDesc: "Marcin Micek of Handy Pioneers explains how Clark County real estate agents can use pre-listing repairs to protect deals, reduce inspection surprises, and close faster.",
    references: [
      { label: "Cano Real Estate: February 2026 Clark County Market Update - 18% more new listings than prior year", url: "https://www.canorealestate.com/blog/clark-county-washington-real-estate-market-update-for-february-2026/" },
      { label: "HomeLight: Exterior improvements consistently outperform major renovations in ROI (Jan 2026)", url: "https://www.homelight.com/blog/what-upgrades-increase-home-value/" },
    ],
    body: [
      { type: "p", text: "The deal fell through because of a $600 repair that no one caught until the inspection report." },
      { type: "p", text: "It was a GFCI outlet in the garage. The buyer's agent flagged it as a safety issue. The seller's agent scrambled to find someone who could fix it before the inspection contingency deadline. The electrician they found wasn't available for four days. The buyer walked." },
      { type: "p", text: "This story is more common than it should be. In a Clark County market where new listings are up 18% year-over-year [1] and buyers are more inspection-savvy than ever, the sellers who close cleanly are the ones who addressed the inspection items before the inspector found them." },
      { type: "h2", text: "The Most Common Inspection Items That Kill Clark County Deals" },
      { type: "p", text: "Based on the pre-listing work we do for sellers and agents across Clark County, the most common inspection items that trigger price negotiations or deal cancellations are: deck structural concerns (ledger connections, post bases, railing stability), evidence of moisture intrusion (water staining, soft floors, crawl space issues), deferred exterior maintenance (peeling paint, failed caulking, moss on roof), electrical safety items (GFCI outlets, panel labeling, exposed wiring), and plumbing issues (slow drains, supply line age, water heater condition)." },
      { type: "p", text: "None of these are expensive to address proactively. According to HomeLight's 2026 analysis, exterior improvements and minor updates consistently deliver the highest return on investment of any pre-sale repair category. [2] The math is straightforward: a $1,500 pre-listing punch list prevents a $5,000-$10,000 price reduction negotiated from an inspection report." },
      { type: "h2", text: "How We Work With Real Estate Agents" },
      { type: "p", text: "Our 360° pre-listing assessment gives agents a complete picture before the inspector does. We walk the property, document every finding with photos, and deliver a written report with repair priorities and estimated costs - typically within 48 hours of the walk-through. Agents use this report to advise sellers on what to address before listing, and to have documentation ready for the disclosure packet." },
      { type: "p", text: "We offer priority scheduling for pre-listing work, a written scope of work within 24 hours, and photo documentation of all completed repairs. If you're a Clark County real estate agent and you'd like to talk about a preferred partner arrangement, reach out." },
      { type: "cta", text: "Real estate professionals: let's talk about a preferred partner arrangement.", ctaLabel: "Contact Marcin", ctaAction: "phone" },
    ],
  },

  // ─── Post 14 - April 24 (Fri) ─────────────────────────────────────────────
  {
    slug: "kitchen-island-appliance-installation-vancouver-what-we-learned",
    title: "Kitchen Island and Appliance Installation in Vancouver: What We Learned From a 'Simple' Job",
    excerpt: "The homeowner said it would take two hours. It took two days. Here's why that was actually a good thing.",
    date: "April 24, 2026",
    isoDate: "2026-04-24",
    publishDate: "2026-04-24",
    author: "Marcin Micek | Handy Pioneers",
    category: "Project Story",
    audience: ["Current Clients", "Homeowners"],
    tags: ["kitchen island installation Vancouver WA", "appliance installation Clark County", "kitchen remodel Vancouver WA"],
    image: "https://handypioneers.com/images/blog/kitchen-island-appliance-installation-vancouver-what-we-learned.webp",
    imageAlt: "Modern kitchen island installation in a Vancouver WA home",
    readTime: 5,
    seoTitle: "Kitchen Island Installation Vancouver WA - Project Story | Handy Pioneers",
    seoDesc: "A Vancouver homeowner thought their kitchen island installation would take two hours. Marcin Micek of Handy Pioneers explains why it took two days - and why that was the right call.",
    references: [
      { label: "Clark County WA: Permit requirements for kitchen remodels and electrical work", url: "https://www.clark.wa.gov/community-planning/permits" },
    ],
    body: [
      { type: "p", text: "The homeowner said it would take two hours. She'd watched a YouTube video. The island was pre-built, the appliances were sitting in boxes in the garage, and she'd already cleared out the old peninsula. 'It's basically just plugging things in,' she said." },
      { type: "p", text: "It took two days. And at the end of those two days, she had a kitchen that was safer, more functional, and up to current code - which the two-hour version would not have been." },
      { type: "h2", text: "What the Scope Discovery Revealed" },
      { type: "p", text: "The island required a new 20-amp dedicated circuit for the cooktop. The existing kitchen circuits were already at capacity, and the cooktop manufacturer's installation requirements specified a dedicated circuit. This meant coordinating with our licensed electrical partner - a half-day addition to the schedule, but a non-negotiable safety requirement." },
      { type: "p", text: "The flooring under the old peninsula location needed patching. The previous owners had installed the peninsula over the original hardwood, and the exposed area was a different finish and slightly different height than the surrounding floor. We sourced matching hardwood and patched the section before the island went in." },
      { type: "p", text: "The gas line for the range was not up to current Clark County code. The existing flex connector was an older style that is no longer approved for use in new installations. [1] We coordinated with our plumbing partner to replace the connector before the range was installed." },
      { type: "h2", text: "Why This Is the Right Way to Do It" },
      { type: "p", text: "The homeowner could have found someone to install the island and appliances in two hours. That person would have plugged in the cooktop to an existing circuit, set the range on the old flex connector, and left the flooring gap under the island where no one would see it. The job would have been 'done.'" },
      { type: "p", text: "It also would have been a fire risk, a code violation, and a disclosure issue at resale. The 360° approach means we don't stop at the visible scope. We look at what the job requires to be done correctly - and we have the partner network to make it happen." },
      { type: "cta", text: "Planning a kitchen update? Let's start with a 360° assessment so there are no surprises.", ctaLabel: "Request 360° Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 15 - April 28 (Tue) ─────────────────────────────────────────────
  {
    slug: "what-subcontractors-clark-county-want-from-a-general-contractor",
    title: "What Subcontractors in Clark County Actually Want From a General Contractor (We Asked)",
    excerpt: "We asked 12 subcontractors what makes a GC worth working with. The answers weren't what we expected.",
    date: "April 28, 2026",
    isoDate: "2026-04-28",
    publishDate: "2026-04-28",
    author: "Marcin Micek | Handy Pioneers",
    category: "Trade Partners",
    audience: ["Subcontractors", "Trade Partners"],
    tags: ["subcontractor Clark County WA", "trade partner Vancouver WA", "contractor subcontractor relationship Pacific Northwest"],
    image: "https://handypioneers.com/images/blog/what-subcontractors-clark-county-want-from-a-general-contractor.webp",
    imageAlt: "Two contractors reviewing project plans on a job site in Clark County",
    readTime: 4,
    seoTitle: "What Subcontractors in Clark County Want From a GC | Handy Pioneers",
    seoDesc: "Marcin Micek of Handy Pioneers asked 12 Clark County subcontractors what makes a general contractor worth working with. Here's what they said.",
    references: [],
    body: [
      { type: "p", text: "We asked 12 subcontractors what makes a general contractor worth working with. Electricians, plumbers, HVAC techs, roofers - people who work with multiple GCs across Clark County and Southwest Washington every week." },
      { type: "p", text: "The answers weren't what we expected. Nobody led with pay rate. Nobody mentioned job volume. The top four themes, in order:" },
      { type: "h2", text: "1. Clear Scope of Work" },
      { type: "p", text: "'I want to know exactly what I'm walking into before I show up.' This was the most consistent answer. Subcontractors who show up to a job without a clear written scope waste time, underestimate the job, and end up in disputes about what was included. A GC who provides a detailed written scope - with photos, measurements, and access information - gets better bids, faster turnarounds, and more reliable scheduling." },
      { type: "h2", text: "2. Prompt Payment" },
      { type: "p", text: "'Net-30 is fine. Net-90 is a dealbreaker.' Cash flow is the primary operational challenge for small specialty trades. A GC who pays on time - and who communicates proactively if there's a delay - builds a reputation that attracts the best subs. At Handy Pioneers, we operate on net-15 payment terms for all specialty partners." },
      { type: "h2", text: "3. Respectful Communication" },
      { type: "p", text: "'Treat me like a professional, not a commodity.' Subcontractors who are introduced to homeowners, included in scope conversations, and thanked for their work are more likely to prioritize your jobs, go above and beyond on difficult scopes, and refer other trades to your network. The GCs with the best subcontractor relationships are the ones who treat their subs the way they treat their clients." },
      { type: "h2", text: "4. Follow-Up" },
      { type: "p", text: "'Tell me how the job went. Good or bad.' Subcontractors want feedback. They want to know if the homeowner was happy, if there were any issues after they left, and if there's anything they should do differently next time. A GC who closes the loop - with a quick text or a photo of the finished result - builds a relationship, not just a transaction." },
      { type: "p", text: "These are the standards we hold ourselves to at Handy Pioneers. If you're a licensed specialty trade in Clark County and you want to work with a team that operates this way, reach out." },
      { type: "cta", text: "If you're a licensed trade in Clark County and want to work with a team that respects your craft, reach out.", ctaLabel: "Contact Marcin", ctaAction: "phone" },
    ],
  },

  // ─── Post 16 - May 1 (Fri) ─────────────────────────────────────────────
  {
    slug: "deck-pressure-washing-vancouver-before-during-after",
    title: "Deck Pressure Washing in Vancouver: Before, During, and After (With Real Photos)",
    excerpt: "The deck hadn't been cleaned in four years. The wood underneath was in better shape than anyone expected - because we caught it in time.",
    date: "May 1, 2026",
    isoDate: "2026-05-01",
    publishDate: "2026-05-01",
    author: "Marcin Micek | Handy Pioneers",
    category: "Project Story",
    audience: ["Current Clients", "Homeowners"],
    tags: ["deck pressure washing Vancouver WA", "deck cleaning Clark County", "wood deck restoration Vancouver"],
    image: "https://handypioneers.com/images/blog/deck-pressure-washing-vancouver-before-during-after.webp",
    imageAlt: "Cedar deck before and after professional pressure washing in Vancouver WA",
    readTime: 4,
    seoTitle: "Deck Pressure Washing Vancouver WA - Before & After | Handy Pioneers",
    seoDesc: "Marcin Micek of Handy Pioneers walks through a real deck pressure washing job in Vancouver - the process, what we found, and why timing matters for PNW wood decks.",
    references: [
      { label: "Oregon State University Extension: Wood deck maintenance and moisture management in the Pacific Northwest", url: "https://extension.oregonstate.edu/sites/extd8/files/catalog/auto/PNW733.pdf" },
    ],
    body: [
      { type: "p", text: "The deck hadn't been cleaned in four years. The homeowner knew it - she'd been watching the gray deepen and the surface checking spread across the cedar boards every summer. She kept putting it off because she wasn't sure if cleaning would help or if the deck was already too far gone." },
      { type: "p", text: "The wood underneath was in better shape than anyone expected. Because we caught it in time." },
      { type: "h2", text: "The Process" },
      { type: "p", text: "Deck pressure washing isn't just pointing a wand at the boards. The process matters - especially with cedar, which is softer than pressure-treated lumber and more susceptible to surface damage from improper technique." },
      { type: "p", text: "We start with a pre-treatment: a deck cleaner solution applied with a low-pressure sprayer and allowed to dwell for 15-20 minutes. This breaks down the gray oxidation layer and lifts embedded dirt before the pressure wash begins. Then the pressure wash itself - always working with the grain, at a distance that cleans without raising the grain or damaging the wood fibers. For cedar, we use a fan tip at 1,200-1,500 PSI. Pressure-treated lumber can handle more; cedar cannot. [1]" },
      { type: "p", text: "After washing, the deck needs to dry completely before any sealer or stain is applied - typically 48-72 hours in spring weather. Applying sealer to wet wood traps moisture and causes the finish to peel within one season." },
      { type: "h2", text: "What the Cleaning Revealed" },
      { type: "p", text: "Two boards near the stairs had surface checking that had progressed further than the rest of the deck - worth monitoring, but not structural. One post base showed early moisture staining on the concrete below it, suggesting the post base hardware may need replacement within the next year. The rest of the deck was in excellent condition. The homeowner had been worried for nothing - and now she has a baseline to compare against next spring." },
      { type: "p", text: "We applied a penetrating oil-based sealer after the drying period. The deck went from weathered gray to warm cedar brown in about four hours of work." },
      { type: "cta", text: "Book your deck cleaning before summer. We're scheduling May and June now.", ctaLabel: "Book Deck Cleaning", ctaAction: "booking" },
    ],
  },

  // ─── Post 17 - May 5 (Tue) ─────────────────────────────────────────────
  {
    slug: "5-home-repairs-clark-county-homeowners-keep-putting-off",
    title: "The 5 Home Repairs Clark County Homeowners Keep Putting Off (And What They Actually Cost to Fix)",
    excerpt: "Deferred maintenance doesn't save money. It just moves the bill to the future - with interest. Here are the five most common deferred repairs we see in Clark County homes.",
    date: "May 5, 2026",
    isoDate: "2026-05-05",
    publishDate: "2026-05-05",
    author: "Marcin Micek | Handy Pioneers",
    category: "Homeowner Guide",
    audience: ["Homeowners", "Prospects"],
    tags: ["home repair cost Vancouver WA", "deferred maintenance Clark County", "home repair estimate Vancouver"],
    image: "https://handypioneers.com/images/blog/5-home-repairs-clark-county-homeowners-keep-putting-off.webp",
    imageAlt: "Homeowner reviewing a home maintenance checklist on their porch",
    readTime: 6,
    seoTitle: "5 Deferred Home Repairs Clark County Homeowners Regret | Handy Pioneers",
    seoDesc: "Deferred maintenance doesn't save money - it moves the bill to the future with interest. Marcin Micek of Handy Pioneers lists the 5 most common deferred repairs in Clark County homes.",
    references: [
      { label: "Angi 2025: 71% of homeowners postponed at least one home project in 2025", url: "https://www.angi.com/press/angis-2025-state-of-home-spending-pulse-report" },
      { label: "Forbes: Deferred home projects create cascading health, safety, and financial risks (June 2025)", url: "https://www.forbes.com/sites/jamiegold/2025/06/10/deferred-home-projects-health-safety-fiscal-risks-you-cant-ignore/" },
      { label: "Philadelphia Fed: Total estimated cost of needed home repairs was $198.4 billion in 2024", url: "https://www.philadelphiafed.org/-/media/FRBP/Assets/Community-Development/Briefs/home-repair-costs-2025/home-repair-costs.pdf" },
    ],
    body: [
      { type: "p", text: "Deferred maintenance doesn't save money. It just moves the bill to the future - with interest." },
      { type: "p", text: "According to Angi's 2025 State of Home Spending report, 71% of homeowners postponed at least one home project in 2025. [1] Forbes calls it a 'growing crisis' - deferred projects create cascading health, safety, and financial risks that compound over time. [2] The Federal Reserve Bank of Philadelphia estimates the total cost of needed repairs to U.S. housing at $198.4 billion - most of it deferred. [3]" },
      { type: "p", text: "Here are the five repairs we see most commonly deferred in Clark County homes - and what they actually cost when addressed proactively versus reactively." },
      { type: "h2", text: "1. Window and Door Caulking" },
      { type: "p", text: "Proactive cost: $150-$300. Reactive cost: $3,000-$8,000 (wall cavity water damage, drywall replacement, mold remediation). Caulk lines crack and separate every 5-7 years in our climate. When they do, water gets into the wall cavity. By the time you see interior staining, the damage inside the wall is typically 3-5 times worse than what's visible." },
      { type: "h2", text: "2. Deck Board Replacement" },
      { type: "p", text: "Proactive cost: $400-$800 (individual boards). Reactive cost: $8,000-$15,000 (structural rebuild when rot reaches the framing). Soft or punky deck boards are a symptom. The cause is usually moisture that has reached the structural members below. Replacing boards when they first show deterioration prevents the moisture from reaching the framing." },
      { type: "h2", text: "3. Gutter Cleaning" },
      { type: "p", text: "Proactive cost: $150-$250 per cleaning. Reactive cost: $2,000-$5,000 (fascia board replacement, soffit repair, foundation drainage issues). Clogged gutters overflow against the fascia and soffit, saturating the wood. In Clark County, gutters should be cleaned at minimum twice per year - fall and spring." },
      { type: "h2", text: "4. Exterior Paint Touch-Up" },
      { type: "p", text: "Proactive cost: $200-$500 (spot touch-up). Reactive cost: $4,000-$12,000 (full exterior repaint plus wood repair). Paint is your siding's primary moisture barrier. When it peels or cracks, moisture gets into the wood beneath. Spot touch-up every 2-3 years extends the life of a full paint job by 5-7 years." },
      { type: "h2", text: "5. Crawl Space Vapor Barrier" },
      { type: "p", text: "Proactive cost: $600-$1,200 (repair or replacement). Reactive cost: $8,000-$20,000 (floor joist replacement, mold remediation, structural repair). A torn or missing vapor barrier allows ground moisture to migrate into the crawl space, elevating humidity and causing wood rot and mold in the floor framing. This is the repair that homeowners most consistently discover too late." },
      { type: "blockquote", text: "\"We'll walk your property and give you a prioritized repair list, no obligation. Because knowing what to fix first is worth more than any single repair.\" - Marcin Micek, Handy Pioneers" },
      { type: "cta", text: "We'll walk your property and give you a prioritized repair list, no obligation.", ctaLabel: "Request Your Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 18 - May 8 (Fri) ─────────────────────────────────────────────
  {
    slug: "graffiti-removal-repainting-vancouver-restored-in-one-day",
    title: "Graffiti Removal and Repainting in Vancouver: How We Restored a Business Owner's Curb Appeal in One Day",
    excerpt: "The call came in at 7 AM. By 4 PM, you couldn't tell anything had happened.",
    date: "May 8, 2026",
    isoDate: "2026-05-08",
    publishDate: "2026-05-08",
    author: "Marcin Micek | Handy Pioneers",
    category: "Project Story",
    audience: ["Community", "Business Owners"],
    tags: ["graffiti removal Vancouver WA", "commercial painting Clark County", "exterior painting contractor Vancouver"],
    image: "https://handypioneers.com/images/blog/graffiti-removal-repainting-vancouver-restored-in-one-day.webp",
    imageAlt: "Clean commercial building exterior after graffiti removal and repainting in Vancouver WA",
    readTime: 4,
    seoTitle: "Graffiti Removal Vancouver WA - Restored in One Day | Handy Pioneers",
    seoDesc: "A Vancouver business owner called Marcin Micek of Handy Pioneers at 7 AM about graffiti. By 4 PM, you couldn't tell anything had happened. Here's how we did it.",
    references: [],
    body: [
      { type: "p", text: "The call came in at 7 AM. A business owner in Vancouver - a small retail shop on a high-traffic street - had arrived to open up and found graffiti across the front of the building. Large, spray-painted tags across the stucco facade and the painted wood trim." },
      { type: "p", text: "By 4 PM, you couldn't tell anything had happened." },
      { type: "h2", text: "The Response Process" },
      { type: "p", text: "Speed matters for commercial graffiti removal. Every hour the graffiti is visible, it signals to the neighborhood that the property isn't being maintained - which invites more vandalism. We were on-site by 9 AM." },
      { type: "p", text: "The first step is surface assessment: what substrate are we working with, what type of paint was used, and how long has it been on the surface. Stucco is porous and absorbs spray paint quickly - the longer it sits, the deeper it penetrates. The tags had been there overnight, which meant chemical treatment was necessary before any mechanical removal." },
      { type: "h2", text: "The Removal and Repair Process" },
      { type: "p", text: "We applied a graffiti removal chemical to the stucco sections, allowed it to dwell, and then pressure washed at low pressure to lift the paint without damaging the stucco texture. The wood trim required a different approach - chemical treatment followed by light sanding to remove any remaining pigment before repainting." },
      { type: "p", text: "Color matching is the part most people don't think about. The existing paint on the stucco was a custom color that had been on the building for several years - meaning it had faded. We took a paint chip to a local supplier, had the color spectrophotometrically matched, and tinted the new paint to match the faded original rather than the original formula. The result was seamless." },
      { type: "h2", text: "What the Business Owner Said" },
      { type: "p", text: "'I was expecting to see a patch. There's no patch. It looks like it never happened.' That's the goal. Graffiti removal done right isn't just about removing the paint - it's about restoring the property to a condition that doesn't advertise that it was vandalized." },
      { type: "p", text: "Property managers and business owners: we offer priority scheduling for commercial exterior work. If you manage multiple properties in Clark County, ask about our preferred client program." },
      { type: "cta", text: "Property managers and business owners: we offer priority scheduling for commercial exterior work.", ctaLabel: "Contact Marcin", ctaAction: "phone" },
    ],
  },

  // ─── Post 19 - May 12 (Tue) ─────────────────────────────────────────────
  {
    slug: "summer-home-prep-checklist-clark-county-2026",
    title: "The Clark County Summer Home Prep Checklist: 8 Things to Do Before June",
    excerpt: "Summer in Clark County means outdoor living - and it means the repairs you've been putting off all winter are now visible to every neighbor and guest. Here's what to prioritize.",
    date: "May 12, 2026",
    isoDate: "2026-05-12",
    publishDate: "2026-05-12",
    author: "Marcin Micek | Handy Pioneers",
    category: "Seasonal Maintenance",
    audience: ["Homeowners", "Prospects"],
    tags: ["summer home maintenance Vancouver WA", "home prep checklist Clark County", "exterior home maintenance Vancouver"],
    image: "https://handypioneers.com/images/blog/summer-home-prep-checklist-clark-county-2026.webp",
    imageAlt: "Well-maintained Pacific Northwest home exterior in late spring",
    readTime: 5,
    seoTitle: "Summer Home Prep Checklist Clark County WA 2026 | Handy Pioneers",
    seoDesc: "Marcin Micek of Handy Pioneers shares the 8 things Clark County homeowners should do before June to protect their home and enjoy their summer.",
    references: [
      { label: "Visit Vancouver WA: Clark County averages 42 inches of rain per year, mostly Oct-Apr", url: "https://www.visitvancouverwa.com/trip-planning/weather/" },
      { label: "Angi 2025 State of Home Spending: Exterior projects top homeowner priority lists in spring", url: "https://www.angi.com/press/angis-2025-state-of-home-spending-pulse-report" },
    ],
    body: [
      { type: "p", text: "Summer in Clark County is short, spectacular, and unforgiving of deferred maintenance. The six months of Pacific Northwest rain end abruptly in June, and suddenly every exterior surface is visible - to you, your neighbors, and any buyer who might be walking through your neighborhood." },
      { type: "p", text: "Here are the eight things we recommend every Clark County homeowner address before June." },
      { type: "h2", text: "1. Deck Inspection and Cleaning" },
      { type: "p", text: "Your deck has been wet for six months. Before you put furniture on it, walk it carefully - feel for soft spots, check the railing connections, look at the post bases. Then clean it: pressure wash, allow to dry 48-72 hours, and apply a penetrating sealer if the wood is thirsty (test: drop water on the surface - if it absorbs rather than beads, it's time to seal)." },
      { type: "h2", text: "2. Gutter Cleaning" },
      { type: "p", text: "Spring means tree debris - pollen, seed pods, and the last of the fall leaves that didn't come out in October. Clogged gutters overflow against the fascia and soffit. Clean them now, before the dry season, so you're not dealing with wood rot when you go to paint in August." },
      { type: "h2", text: "3. Exterior Caulking Inspection" },
      { type: "p", text: "Walk the exterior and check every window and door frame. Caulk that cracked or separated over the winter needs to be replaced before summer heat bakes the gap open further. This is a two-hour job that prevents a two-week repair." },
      { type: "h2", text: "4. Moss Treatment" },
      { type: "p", text: "If you have moss on your roof or hardscapes, treat it now. Spring is the optimal time - the moss is actively growing and most susceptible to treatment, and you have the full dry season ahead for the treatment to work and the zinc strip to do its job." },
      { type: "h2", text: "5. Fence and Gate Hardware" },
      { type: "p", text: "Winter moisture works on fence post bases and gate hardware. Check every gate for sag or binding. Check fence posts for rot at the base - push on them; they shouldn't move. Address small issues now before they become fence replacement projects." },
      { type: "h2", text: "6. Exterior Paint Touch-Up" },
      { type: "p", text: "Look for peeling, cracking, or chalking paint on trim, siding, and fascia boards. Spot touch-up now, before the dry season, protects the wood through summer UV exposure and gives you time to plan a full repaint if needed for fall." },
      { type: "h2", text: "7. Crawl Space Check" },
      { type: "p", text: "After a wet winter, a crawl space check is not optional. Take a moisture reading or have a professional check for you. Elevated moisture in May means the vapor barrier needs attention before summer heat creates the humidity conditions that mold loves." },
      { type: "h2", text: "8. HVAC Filter and Dryer Vent" },
      { type: "p", text: "Before you turn on the AC for the first time, replace the HVAC filter. While you're at it, check the dryer vent for lint accumulation - it's one of the leading causes of residential fires and takes about 20 minutes to clean." },
      { type: "cta", text: "We can knock out your entire summer prep list in a single visit. Book now before June schedules fill.", ctaLabel: "Book Summer Prep Visit", ctaAction: "booking" },
    ],
  },

  // ─── Post 20 - May 15 (Fri) ─────────────────────────────────────────────
  {
    slug: "360-method-phase-1-aware-know-before-you-need",
    title: "360° Method Deep Dive: Phase 1 - AWARE (Know Before You Need)",
    excerpt: "The first phase of the 360° Method is about getting clear on what you have. Most homeowners don't know how old their water heater is. That's where the Cascade Effect starts.",
    date: "May 15, 2026",
    isoDate: "2026-05-15",
    publishDate: "2026-05-15",
    author: "Marcin Micek | Handy Pioneers",
    category: "360° Method",
    audience: ["Homeowners", "Prospects", "Community"],
    tags: ["360 method phase 1 Vancouver WA", "home baseline assessment Clark County", "proactive home maintenance Vancouver"],
    image: "https://handypioneers.com/images/blog/360-method-phase-1-aware-know-before-you-need.webp",
    imageAlt: "Homeowner reviewing a home inspection checklist - Phase 1 of the 360° Method",
    readTime: 5,
    seoTitle: "360° Method Phase 1: AWARE - Home Baseline & Inspection | Handy Pioneers Vancouver WA",
    seoDesc: "Marcin Micek of Handy Pioneers explains Phase 1 of the 360° Method - Baseline, Inspect, and Track - the three steps that give Clark County homeowners clarity and control.",
    references: [
      { label: "Building Science Corporation: Seasonal inspection is the most cost-effective maintenance strategy for existing homes", url: "https://www.buildingscience.com/documents/digests/bsd-001-the-building-enclosure" },
      { label: "360° Method official site: www.360degreemethod.com", url: "https://www.360degreemethod.com" },
    ],
    body: [
      { type: "p", text: "The 360° Method begins with a simple, uncomfortable question: Do you actually know what you have?" },
      { type: "p", text: "Most homeowners don't. They don't know how old their water heater is. They don't know when the roof was last inspected. They don't know whether the HVAC filter was changed three months ago or eight months ago. They're managing a $400,000 asset with sticky notes and vague memories." },
      { type: "p", text: "Phase 1 of the 360° Method - AWARE: Know Before You Need - fixes that." },
      { type: "h2", text: "Step 1: Baseline - Your Home's Medical Record" },
      { type: "p", text: "The Baseline step is about documentation. Every major system in your home gets catalogued: HVAC age and service history, roof age and last inspection, water heater age and condition, appliances, electrical panel, plumbing, foundation, and envelope. The goal is to create what we call your home's medical record - a complete, organized reference that tells you exactly what you have, how old it is, and when it was last serviced." },
      { type: "p", text: "This sounds simple. It is simple. But it's transformative. When you know your water heater is 9 years old, you're not surprised when it fails at 11. You budget for replacement at 10. That's the difference between a planned $1,200 expense and an emergency $2,400 expense on a Sunday night." },
      { type: "h2", text: "Step 2: Inspect - Seasonal Walkthroughs That Catch Problems Early" },
      { type: "p", text: "The Inspect step is about systematic observation. The 360° Method includes structured seasonal walkthrough checklists - what to look for in spring, summer, fall, and winter in the Pacific Northwest specifically. Cracked caulk at window frames. Moss growth on the north-facing roof slope. Soft spots on the deck boards. Gaps in the weatherstripping on the back door." },
      { type: "p", text: "Building Science Corporation identifies seasonal inspection as the most cost-effective maintenance strategy for existing homes. [1] The reason is simple: a problem caught early is a small repair. The same problem ignored for two winters means tearing out and replacing the wood that rotted behind it." },
      { type: "h2", text: "Step 3: Track - The Living Maintenance Log" },
      { type: "p", text: "The Track step is about memory. Every repair, every contractor, every dollar spent gets logged - not in a drawer full of receipts, but in a structured, searchable record. Over time, this log reveals patterns: the same contractor who does excellent work, the component that keeps failing, the repair that was done wrong and needs to be redone." },
      { type: "p", text: "The Track log is also your home's value documentation. When you sell, you hand the buyer a complete maintenance history. That's not just a nice-to-have - it's a negotiating tool. Buyers pay more for homes with documented care." },
      { type: "h2", text: "How to Start" },
      { type: "p", text: "The 360° Method app at www.360degreemethod.com [2] walks you through the Baseline, Inspect, and Track steps with guided prompts, checklists, and a pre-built maintenance log. You can start on your own and upgrade when you want AI-powered insights and automated scheduling." },
      { type: "p", text: "Or, if you'd rather have someone run the protocol for you, Handy Pioneers offers a full 360° assessment - we walk your home, document every system, identify every priority, and hand you a complete written report." },
      { type: "cta", text: "Start with a 360° assessment - we run Phase 1 for you and hand you the results.", ctaLabel: "Schedule 360° Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 21 - May 19 (Tue) ─────────────────────────────────────────────
  {
    slug: "what-a-1-year-labor-guarantee-actually-covers",
    title: "What Our 1-Year Labor Guarantee Actually Covers (And What It Doesn't)",
    excerpt: "Every contractor says they stand behind their work. Here's exactly what that means at Handy Pioneers - in plain language, no fine print.",
    date: "May 19, 2026",
    isoDate: "2026-05-19",
    publishDate: "2026-05-19",
    author: "Marcin Micek | Handy Pioneers",
    category: "About Us",
    audience: ["Homeowners", "Prospects"],
    tags: ["contractor warranty Vancouver WA", "handyman guarantee Clark County", "labor warranty home repair Vancouver"],
    image: "https://handypioneers.com/images/blog/what-a-1-year-labor-guarantee-actually-covers.webp",
    imageAlt: "Contractor reviewing a written warranty document with a homeowner",
    readTime: 5,
    seoTitle: "1-Year Labor Guarantee - What It Covers | Handy Pioneers Vancouver WA",
    seoDesc: "Marcin Micek of Handy Pioneers explains exactly what the 1-year labor guarantee covers, what it doesn't, and why it matters when hiring a contractor in Clark County.",
    references: [
      { label: "WA L&I: Washington State contractor registration and bond requirements", url: "https://lni.wa.gov/licensing-permits/contractors/register-as-a-contractor/" },
    ],
    body: [
      { type: "p", text: "Every contractor says they stand behind their work. It's in every marketing brochure, on every website, in every sales conversation. But what does it actually mean? What happens when something goes wrong?" },
      { type: "p", text: "Here's exactly what our 1-year labor guarantee covers at Handy Pioneers - in plain language, no fine print." },
      { type: "h2", text: "What the Guarantee Covers" },
      { type: "p", text: "If any work performed by Handy Pioneers fails within one year of completion due to workmanship - meaning the failure is attributable to how the work was done, not to external factors - we will return and correct it at no charge. No diagnostic fee, no trip charge, no labor cost. We fix it." },
      { type: "p", text: "Examples of covered failures: a door we hung that no longer closes properly due to hinge installation, a caulk line we applied that has separated at the joint, a deck board we replaced that has lifted due to fastener failure, a cabinet we repaired that has come loose from the wall." },
      { type: "h2", text: "What the Guarantee Doesn't Cover" },
      { type: "p", text: "The guarantee covers workmanship. It does not cover material failures (manufacturer defects in materials we supplied are handled through the manufacturer's warranty), damage caused by subsequent work by other contractors, normal wear and tear, or failures caused by conditions that existed before our work and were not within our scope to address." },
      { type: "p", text: "It also does not cover damage caused by events outside our control: flooding, storm damage, pest infestation, or structural movement. We're a home services and remodeling company, not an insurance policy." },
      { type: "h2", text: "When We Open Something Up and Find a Hidden Problem" },
      { type: "p", text: "Here's the honest part most contractors don't put in writing. Our guarantee covers workmanship built on a sound foundation. Sometimes we pull up a floor or open a wall and find a problem underneath that nobody could see from the outside - rotted decking under old underlayment, a window frame that's gone soft behind the trim. When that happens, we stop, show you photos, and give you a clear choice in writing." },
      { type: "p", text: "Rebuild it right: we fix the underlying problem and restore the area to a sound base, then do the work on top of it. A full structural rebuild like that carries our 2-year labor guarantee - the deeper we go and the more we control, the longer we can stand behind it. Or go over it: at your direction, we install over the existing condition. That keeps the cost down, but we can't guarantee work that sits on a base we weren't able to make sound - so that specific part falls outside the guarantee, and we put that in writing too. Everything else on the job stays covered." },
      { type: "p", text: "Think of a window. A simple insert dropped into an old frame is faster and cheaper, but if we never open it up to the framing, we can't promise what's behind it. A full tear-out and rebuild to the studs is more work, and it's the version we can stand behind for the long haul. The same logic runs through every job: how much we can guarantee depends on how deep the install goes and whether the foundation under it is sound. We'll always tell you which one you're getting." },
      { type: "h2", text: "Why We Have This Policy" },
      { type: "p", text: "Because we're confident in our work. A guarantee is only as meaningful as the company's willingness to honor it - and honoring it requires being in business, being reachable, and being willing to show up. We've been serving Clark County since 2019. We're not going anywhere." },
      { type: "p", text: "Washington State requires contractor registration and bonding through L&I. [1] The bond protects you if a contractor doesn't complete the work. Our guarantee goes further - it covers the quality of the work after it's complete. That's a choice we make because we believe it's the right way to operate." },
      { type: "blockquote", text: "\"A guarantee is only as meaningful as the company's willingness to honor it. We show up.\" - Marcin Micek, Handy Pioneers" },
      { type: "cta", text: "Ready to work with a team that stands behind every project? Schedule a consultation.", ctaLabel: "Schedule a Consultation", ctaAction: "booking" },
    ],
  },

  // ─── Post 22 - May 22 (Fri) ─────────────────────────────────────────────
  {
    slug: "ridgefield-washougal-la-center-we-serve-all-of-clark-county",
    title: "Ridgefield, Washougal, La Center: We Serve All of Clark County (And Here's Why That Matters)",
    excerpt: "Most handyman companies in Clark County quietly stop at the Vancouver city limits. We don't. Here's where we go and why.",
    date: "May 22, 2026",
    isoDate: "2026-05-22",
    publishDate: "2026-05-22",
    author: "Marcin Micek | Handy Pioneers",
    category: "Local Market",
    audience: ["Homeowners", "Community"],
    tags: ["handyman Ridgefield WA", "handyman Washougal WA", "handyman La Center WA", "contractor Clark County all cities"],
    image: "https://handypioneers.com/images/blog/ridgefield-washougal-la-center-we-serve-all-of-clark-county.webp",
    imageAlt: "Aerial view of Clark County Washington showing residential neighborhoods",
    readTime: 4,
    seoTitle: "Handyman Service Ridgefield Washougal La Center WA | Handy Pioneers Clark County",
    seoDesc: "Handy Pioneers serves all of Clark County WA - Vancouver, Camas, Battle Ground, Ridgefield, Washougal, La Center, and beyond. Marcin Micek explains why full-county coverage matters.",
    references: [
      { label: "U.S. Census Bureau: Clark County WA population approximately 530,000 (2024 estimate)", url: "https://www.census.gov/quickfacts/clarkcountywashington" },
      { label: "The Columbian: Clark County growth continues in 2025 with new subdivisions in Ridgefield and La Center", url: "https://www.columbian.com" },
    ],
    body: [
      { type: "p", text: "Most handyman companies in Clark County quietly stop at the Vancouver city limits. Their websites say 'Clark County' but their scheduling system stops at Battle Ground. If you're in Ridgefield, Washougal, or La Center, you've probably experienced this - you call, you get a quote, and then you get a 'we don't service that area' at the end of the conversation." },
      { type: "p", text: "We don't do that." },
      { type: "h2", text: "Where We Go" },
      { type: "p", text: "Handy Pioneers serves all of Clark County, Washington - including Vancouver, Camas, Battle Ground, Ridgefield, Washougal, La Center, Brush Prairie, Hazel Dell, and Salmon Creek. Clark County's population is approximately 530,000 and growing, with significant residential development in Ridgefield and La Center in particular. [1] [2] These are real communities with real homes that need real maintenance - and they deserve the same quality of service as any Vancouver neighborhood." },
      { type: "h2", text: "Why Full-County Coverage Matters" },
      { type: "p", text: "When a contractor doesn't serve your area, you have two options: find a local solo operator (who may or may not be licensed, insured, and reliable) or drive to Vancouver for every service call (which isn't realistic). Neither is a good option." },
      { type: "p", text: "Full-county coverage means you have access to a licensed, insured, 5-star-rated team regardless of your zip code. It means the same 360° assessment, the same written scope of work, the same 1-year labor guarantee, and the same communication standards - whether you're in a Vancouver suburb or a Ridgefield new construction." },
      { type: "h2", text: "A Note on Scheduling" },
      { type: "p", text: "We're honest about travel time. Jobs in La Center or Washougal may have slightly longer lead times than jobs in central Vancouver - not because we deprioritize those areas, but because we schedule efficiently to minimize drive time and keep costs reasonable for everyone. We'll always tell you the realistic timeline upfront." },
      { type: "cta", text: "Wherever you are in Clark County, we serve you. Schedule a consultation today.", ctaLabel: "Schedule a Consultation", ctaAction: "booking" },
    ],
  },

  // ─── Post 23 - May 26 (Tue) ─────────────────────────────────────────────
  {
    slug: "360-method-app-coming-soon-what-it-will-do",
    title: "We're Building an App: What the 360° Method Platform Will Do for Clark County Homeowners",
    excerpt: "The 360° Method started as a field protocol. Now we're building it into a platform at www.360degreemethod.com - giving every homeowner a complete home health record, a prioritized project queue, and a maintenance calendar that actually works.",
    date: "May 26, 2026",
    isoDate: "2026-05-26",
    publishDate: "2026-05-26",
    author: "Marcin Micek | Handy Pioneers",
    category: "360° Method",
    audience: ["Homeowners", "Community", "Prospects"],
    tags: ["360 method app Vancouver WA", "home maintenance app Clark County", "360degreemethod.com"],
    image: "https://handypioneers.com/images/blog/360-method-app-coming-soon-what-it-will-do.webp",
    imageAlt: "Homeowner reviewing a home maintenance app on their phone - the 360° Method platform",
    readTime: 5,
    seoTitle: "360° Method App - Home Management Platform | Handy Pioneers Vancouver WA",
    seoDesc: "Marcin Micek of Handy Pioneers is building the 360° Method platform at www.360degreemethod.com - a complete home management system for Clark County homeowners.",
    references: [
      { label: "AHS: Financial experts recommend setting aside 1-4% of home value annually for maintenance", url: "https://www.ahs.com/home-matters/homebuyer-hub-resources-and-guides/big-fixes-big-price-tags-the-rising-cost-of-home-maintenance-and-repairs/" },
      { label: "Angi 2025: 71% of homeowners postponed at least one home project in 2025", url: "https://www.angi.com/press/angis-2025-state-of-home-spending-pulse-report" },
      { label: "360° Method official site: www.360degreemethod.com", url: "https://www.360degreemethod.com" },
    ],
    body: [
      { type: "p", text: "The 360° Method started as a field protocol - a structured walk-through that Handy Pioneers runs on every new client engagement. We assess the home, document every system, identify every priority, and deliver a written report. The protocol works. Clients who go through it manage their homes differently - proactively instead of reactively." },
      { type: "p", text: "But the protocol has a limitation: it requires us to be there. Now we're removing that limitation." },
      { type: "h2", text: "Introducing the 360° Method Platform" },
      { type: "p", text: "The 360° Method platform at www.360degreemethod.com [3] is a complete home management system built on the same 9-step, 3-phase framework we use in the field. It has four core features designed to give every homeowner - not just Handy Pioneers clients - the tools to move from Reactive Chaos to Proactive Control." },
      { type: "h2", text: "Feature 1: Your Home's Medical Record" },
      { type: "p", text: "The Baseline module (Step 1 of the 360° Method) guides you through documenting every major system in your home - HVAC, roof, water heater, appliances, plumbing, electrical, foundation. Every entry is timestamped, searchable, and exportable. When you sell your home, you hand the buyer a complete maintenance history. When you call a contractor, you hand them context instead of starting from scratch." },
      { type: "h2", text: "Feature 2: The Prioritized Project Queue" },
      { type: "p", text: "The Prioritize module (Step 4) uses the three-tier system - NOW (safety), SOON (ROI), WAIT (comfort) - to generate a ranked list of what to address and when. Financial advisors recommend setting aside 1-4% of your home's value annually for maintenance. [1] The platform tells you exactly where to spend it, in what order, and why." },
      { type: "h2", text: "Feature 3: The Maintenance Calendar" },
      { type: "p", text: "The Schedule module (Step 5) builds a complete maintenance calendar - monthly, quarterly, and annual tasks - specific to your home's age, systems, and location. For Clark County homes, that means PNW-specific reminders: moss treatment in spring, gutter cleaning in October, crawl space check in March. 71% of homeowners postponed at least one project in 2025 [2] - not because they didn't care, but because they didn't have a system. The calendar is that system." },
      { type: "h2", text: "Feature 4: Direct Booking" },
      { type: "p", text: "Every reminder, every project queue item, and every assessment finding connects directly to a Handy Pioneers booking request. One tap from 'this needs attention' to 'job scheduled.' For Fully Managed clients, we handle the scheduling automatically." },
      { type: "h2", text: "Three Ways to Use It" },
      { type: "p", text: "The platform offers three paths: DIY (you run the full system yourself), Hybrid (the app automates tracking and reminders, you handle execution), and Fully Managed (Handy Pioneers runs everything). You choose the level of support that fits your situation." },
      { type: "p", text: "We're in active development now. Visit www.360degreemethod.com to learn more and get on the early access list. Current Handy Pioneers clients will have their existing assessment reports and repair history pre-loaded into their accounts." },
      { type: "cta", text: "Book a 360° assessment now and get early access to the platform when it launches.", ctaLabel: "Book 360° Assessment", ctaAction: "booking" },
    ],
  },

  // ─── Post 24 - May 29 (Fri) ─────────────────────────────────────────────
  {
    slug: "why-we-show-up-in-a-marked-truck",
    title: "Why We Always Show Up in a Marked Truck (And What It Says About How We Operate)",
    excerpt: "A marked truck is a small thing. It's also a signal about everything else.",
    date: "May 29, 2026",
    isoDate: "2026-05-29",
    publishDate: "2026-05-29",
    author: "Marcin Micek | Handy Pioneers",
    category: "About Us",
    audience: ["Homeowners", "Prospects", "Community"],
    tags: ["professional handyman Vancouver WA", "licensed contractor Clark County", "Handy Pioneers brand"],
    image: "https://handypioneers.com/images/blog/why-we-show-up-in-a-marked-truck.webp",
    imageAlt: "Professional contractor truck parked in front of a home in Clark County",
    readTime: 3,
    seoTitle: "Why Handy Pioneers Shows Up in a Marked Truck | Professional Contractor Vancouver WA",
    seoDesc: "Marcin Micek of Handy Pioneers explains why showing up in a marked truck is a small thing that signals everything about how a contractor operates.",
    references: [],
    body: [
      { type: "p", text: "A marked truck is a small thing. It costs money to wrap a vehicle. It means your company name is visible everywhere you park - in front of clients' homes, at the hardware store, in traffic. It means you can't have a bad day anonymously." },
      { type: "p", text: "That's exactly why we do it." },
      { type: "h2", text: "What a Marked Truck Signals" },
      { type: "p", text: "When a Handy Pioneers truck pulls up to your house, your neighbors can see it. They can read the name, the phone number, the website. They can look us up. They can call us. That visibility is accountability - and accountability is the foundation of trust." },
      { type: "p", text: "A contractor who shows up in an unmarked personal vehicle is making a different choice. Maybe it's a cost decision. Maybe it's a preference for anonymity. Either way, it's a signal about how they think about their business and their relationship with the community they serve." },
      { type: "h2", text: "The Bigger Picture" },
      { type: "p", text: "The marked truck is one piece of a larger commitment to operating transparently. A written scope of work before every engagement. Photo documentation of every repair. A 1-year labor guarantee. A team that shows up in uniform, introduces themselves by name, and cleans up before they leave." },
      { type: "p", text: "None of these things are required. They're choices. And the choices a contractor makes about the small things tell you everything about how they'll handle the big things." },
      { type: "blockquote", text: "\"The choices a contractor makes about the small things tell you everything about how they'll handle the big things.\" - Marcin Micek, Handy Pioneers" },
      { type: "p", text: "We're proud of the name on the truck. We've earned it one job at a time, in Clark County, since 2019. And we're not done." },
      { type: "cta", text: "Ready to work with a team that takes the small things seriously? Schedule a consultation.", ctaLabel: "Schedule a Consultation", ctaAction: "booking" },
    ],
  },

  {
    slug: "what-bbb-accreditation-means-contractor",
    title: "What It Means When a Contractor Is BBB Accredited (and Why We Pursued It)",
    excerpt: "BBB accreditation is not a sticker you buy. It is a standard you agree to be held to. Here is what it actually means when a Clark County contractor has it, and what it does not mean.",
    date: "June 26, 2026",
    isoDate: "2026-06-26",
    publishDate: "2026-06-26",
    author: "Marcin Micek | Handy Pioneers",
    category: "Trust & How We Work",
    audience: ["Homeowners", "Prospects", "Community"],
    tags: ["BBB accredited contractor", "is BBB accreditation worth it", "how to find a trustworthy contractor Clark County", "BBB accredited handyman Vancouver WA"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    imageAlt: "A contractor reviewing a home care plan with a homeowner at a kitchen table",
    readTime: 4,
    seoTitle: "What Does BBB Accreditation Mean for a Contractor? | Handy Pioneers, Clark County WA",
    seoDesc: "What does it mean when a contractor is BBB accredited? An honest explainer of what BBB accreditation requires, what it does not guarantee, and why Handy Pioneers pursued it.",
    references: [{ label: "Better Business Bureau: Standards for Trust", url: "https://www.bbb.org/standards-for-trust" }],
    body: [
      { type: "p", text: "When a contractor is BBB Accredited, it means the Better Business Bureau has reviewed how they operate and confirmed they meet its standards for trust: tell the truth, be transparent, honor promises, and respond in good faith to any complaint. It is not a sticker a business buys, and it is not a guarantee that nothing ever goes wrong. It is a public commitment to a standard, and an outside party agreeing to hold the business to it. We recently became a BBB Accredited Business, and since trust is the whole job in home care, it is worth explaining plainly what that does and does not mean." },
      { type: "h2", text: "What accreditation actually requires" },
      { type: "p", text: "BBB accreditation is not automatic and it is not just paying a fee. A business has to be operating, has to agree to BBB's standards of trust, and has to commit to addressing customer complaints through BBB rather than ignoring them. The standards themselves are not complicated, which is the point: advertise honestly, be transparent about who you are and what you do, honor your commitments, and deal with problems openly. A business can lose accreditation for failing to live up to that." },
      { type: "p", text: "So when you see it on a contractor, the useful signal is not that the company is perfect. It is that the company has agreed to be accountable to an outside body, and has a public record you can check." },
      { type: "h2", text: "What it does not mean" },
      { type: "p", text: "Being honest about this matters more than the badge. Accreditation does not mean BBB inspects the work, supervises the job, or guarantees the outcome. It does not replace a contractor's license, bond, or insurance, which in Washington you should always confirm separately. And a letter grade can move over time based on complaint history." },
      { type: "p", text: "What it gives you is a place to look. The BBB profile shows how long a business has been operating, its complaint history, how those complaints were handled, and real customer reviews. For a homeowner deciding who to let into their home, that record is worth more than any single claim a company makes about itself." },
      { type: "h2", text: "Why we pursued it" },
      { type: "p", text: "We did not chase accreditation for a logo. We pursued it because the standard behind it is the standard we already try to hold: tell the truth, be clear about scope and cost up front, and stand behind the work. It lines up with how we built the 360 Method, which is a partnership with a homeowner over the long run, looking at the whole home on a schedule, rather than a one-and-done fix and a goodbye. A business built around showing up again and again only works if people can trust it. Accreditation is one more way of making that trust checkable instead of just stated." },
      { type: "h2", text: "How to actually vet a contractor" },
      { type: "p", text: "If you take one thing from this, let it be the method, not the badge. Before you hire anyone in Clark County to work on your home:" },
      { type: "ul", items: ["Confirm the Washington contractor registration, bond, and insurance directly with L&I, not just on the company's word.", "Read the BBB profile and the reviews, including how the business responded to anything critical.", "Look for clear, written scope and pricing before work starts.", "Notice whether they treat your home like a relationship or a transaction."] },
      { type: "p", text: "We are proud to be BBB Accredited, but we would tell you the same thing if we were not: trust is earned, and you should make any contractor earn it. If you would like to talk through your home with someone who works that way, we are here." },
      { type: "cta", text: "If you would rather not carry the upkeep of your home alone, that is what the 360 Method is for. Call (360) 838-6731 to start with a walkthrough.", ctaLabel: "Book a Walkthrough", ctaAction: "booking" },
    ],
  },

];
