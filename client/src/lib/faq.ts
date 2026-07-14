/**
 * FAQ data for Handy Pioneers.
 *
 * Single source of truth: the /faq page renders this array, and
 * scripts/generate-static-pages.ts emits the same Q&As as static HTML
 * and FAQPage JSON-LD so crawlers that don't run JavaScript (most AI
 * crawlers) can read them. Edit here, never in the page or the script.
 */

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export const faqs: FAQCategory[] = [
  {
    category: "Pricing & Cost",
    items: [
      {
        q: "Can I see real pricing before I reach out?",
        a: "Yes, and that is on purpose. Most contractors keep pricing a secret. We do the opposite. Use the Investment Estimator on our remodeling and service pages, or go straight to handypioneers.com/remodel-cost: pick the project, set the size, choose a finish level, and you get an honest range in seconds. It covers kitchens, bathrooms, flooring, basement finishes, deck rebuilds, windows and doors, and ADUs, and the numbers come from the same pricing we use internally. The range is a planning number, not a final quote. Your exact price comes from a walkthrough, where we measure the space and look at what is behind the walls. We would rather you start informed than guess.",
      },
      {
        q: "What do most projects cost?",
        a: "It depends on the project, so here are honest ballparks. Small repairs and maintenance (caulking, a fixture swap, minor drywall) typically run $150 to $500. Mid-size work like flooring, a deck rebuild, or a bathroom refresh generally lands between $1,500 and $10,000. Kitchens, basement finishes, additions, and ADUs are larger and vary widely with size and finish. For a range tailored to your home, use the estimator at handypioneers.com/remodel-cost, then we confirm the exact number on a walkthrough. The 360° Baseline Walkthrough is a separate flat-fee service; ask for current pricing when you reach out.",
      },
      {
        q: "What does the initial consultation include?",
        a: "The online estimator gives you a real ballpark up front; the consultation is where we turn that into an exact, written number. We walk the property, assess the full scope, listen to your priorities, and present a plan tailored to your home, not a generic quote. You know exactly what you are getting, and why, before any work begins.",
      },
      {
        q: "Do you require a deposit?",
        a: "Yes. Most projects require a 30-50% deposit before materials are ordered and work begins. The remainder is due upon completion. We never ask for full payment upfront.",
      },
      {
        q: "What affects the final cost of a project?",
        a: "The main factors are: scope and complexity, material selections, access and site conditions, and whether hidden issues are discovered once work begins. If anything changes the agreed scope, we handle it through a written change order you approve before that work begins, so there are no surprises (see \"What is a change order?\" below).",
      },
      {
        q: "What is a change order, and what happens if I want to add or change something?",
        a: "A change order is a short written agreement for any work that wasn't in your original plan. That can be something you decide to add or change, or something we find during the job that needs attention. We write up exactly what the work is and what it costs, and we walk through it with you before any of it starts. Nothing changes without your okay. Here is the part we like to be upfront about: a change order is paid in full before that new piece of work begins. The reason is simple. The deposit you already paid is committed to the materials and tradespeople for your original project, so any new work needs its own funding before we can order materials and put it on the schedule. This keeps your project moving and keeps everyone on the same page. The rest of your project continues on its original terms, and you always see the price in writing first.",
      },
      {
        q: "What is the seasonal offer I see on the site, and what does \"included\" mean?",
        a: "We run one seasonal offer each month, matched to what Pacific Northwest homes actually need that time of year. Some months it is a modest saving on your project. Most months it is an included visit: a real, defined service, usually 30 to 60 minutes, where we check the season's trouble spots (things like gutters and drainage in winter, roof moss in spring, shutoffs and locks before summer travel, weatherstripping in fall) and leave you a short written summary of what we found, sorted by what needs attention now, soon, or can wait. Every included visit follows a written checklist, so you know exactly what you are getting. It comes with any job booked that month, it applies automatically, and there are no strings. The current offer is always shown in the banner at the top of the site. If you would rather have that kind of visit every season instead of once, that is what the 360° Method membership is.",
      },
    ],
  },
  {
    category: "Who Does the Work",
    items: [
      {
        q: "Who actually does the work on my home?",
        a: "The Handy Pioneers team. A vetted crew of skilled tradesmen handles carpentry, repair, painting, and renovation, and separately licensed specialists handle electrical, plumbing, and HVAC where Washington law requires it. Everyone is screened and coordinated through a single point of contact, so you'll always know in advance who is coming to your home, and the work is held to Handy Pioneers standards.",
      },
      {
        q: "Who will actually be on my property?",
        a: "Every assessment walkthrough is owner-led. The work is executed by a vetted crew of skilled tradesmen and licensed specialists. You are never handed off to someone you haven't met - the relationship is consistent from first call to final walkthrough.",
      },
      {
        q: "Are you licensed and insured?",
        a: "Yes. Handy Pioneers LLC is a Washington State licensed contractor (HANDYP*761NH) and carries full general liability insurance up to $1,000,000. We're happy to provide proof of insurance before any work begins.",
      },
    ],
  },
  {
    category: "The 360° Method",
    items: [
      {
        q: "What exactly is the 360° Method?",
        a: "It's our complete system for caring for a home, not just maintenance and not a legal inspection. It works in three parts: understand the home (we assess its condition across every major system and put it in writing), fix what matters (a prioritized NOW / SOON / WAIT roadmap so nothing urgent slips), and advance the home over time (a living record we keep so the property keeps getting better). Maintenance is one piece of a bigger picture: a health record for your home that grows with you.",
      },
      {
        q: "Is the 360° Walkthrough the same as a home inspection?",
        a: "No. The 360° Baseline Walkthrough is a proactive maintenance assessment, not a licensed home inspection. It is not a legal document and cannot be used for real estate transactions. If you need a licensed inspection for a purchase or sale, we can refer you to a vetted inspector in our network (Path 3). The 360° Method is designed to work alongside - and after - a licensed inspection.",
      },
      {
        q: "How long does a Baseline Walkthrough take?",
        a: "Typically 2-3 hours for a standard single-family home. Larger properties or homes with complex systems may take longer. You'll receive your written report and prioritized roadmap within 48 hours of the walkthrough.",
      },
      {
        q: "What does a seasonal visit actually include?",
        a: "Each seasonal visit is a focused maintenance window matched to your home. At your baseline we note what your home has (deck, gutters, irrigation, crawlspace, and so on), and each visit we work the tasks your home actually needs, so you're never charged time for things you don't have. The window is sized to your home, and your technician works the highest-priority maintenance first. Anything larger or skilled-trade (a full repaint, roof flashing, drainage excavation) isn't squeezed into the visit; we document it and give you a written scope to approve separately, at your member rate.",
      },
    ],
  },
  {
    category: "Scheduling & Process",
    items: [
      {
        q: "How quickly can you start?",
        a: "We typically schedule your initial consultation within 3-5 business days. Project start dates depend on scope and current workload - we'll give you a realistic timeline during your consultation. We don't overbook.",
      },
      {
        q: "What's your warranty on completed work?",
        a: "We stand behind our work. Labor is warranted for 1 year from completion when it's built on a sound foundation, and full-restoration work we rebuild to sound structure (like a full-frame window replacement or rebuilt framing, decking, or subfloor) carries a 2-year guarantee. Material warranties vary by manufacturer and will be documented in your project paperwork. If something we did isn't right, we come back and fix it - no argument. The one thing we can't guarantee is work we install over a hidden problem you've asked us to cover instead of repair - when we find one, we show you, give you the choice in writing, and only the covered-over part falls outside the guarantee.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve Clark County, WA - including Vancouver, Camas, Washougal, Ridgefield, Battle Ground, and surrounding communities. If you're just outside this area, reach out and we'll let you know if we can accommodate.",
      },
      {
        q: "Is any job too small?",
        a: "No. A door that will not latch, a cabinet hinge, a squeaky floor, a wobbly railing, an attic ladder, a stuck window: these are exactly the jobs most contractors will not return a call for, and exactly the ones we planned for. Bring us a list; small repairs bundle well into a single visit, which is also how Proactive Path members get theirs handled every season without thinking about it.",
      },
      {
        q: "Do you work with property managers or commercial buildings?",
        a: "Yes. We handle work orders, tenant turnovers, and small-commercial repairs (storefronts, offices, rentals) across Clark County, with written scopes before work and photos at close-out so you can update owners without a site visit. For rental portfolios there is a multifamily membership that puts every door on scheduled care. See our commercial services page or handypioneers.com/multifamily.",
      },
    ],
  },
  {
    category: "Common Home Problems (Pacific Northwest)",
    items: [
      {
        q: "How do I know if my wood is rotten?",
        a: "Press a screwdriver into the suspect spot with light pressure. Sound wood resists; rotted wood gives, crumbles, or feels spongy. Other signs: paint that bubbles or peels in the same place every year, dark staining near joints, and a musty smell around window or door frames. In our climate rot spreads while wood stays damp, which is most of the year, so a soft spot in trim is worth checking now rather than after it reaches the framing behind it.",
      },
      {
        q: "How often do gutters need cleaning in Clark County?",
        a: "Twice a year for most homes: late fall after the leaves finish dropping, and once in spring. Homes under firs and cedars (common in Battle Ground, Brush Prairie, and Camas) often need a third pass, because needles keep coming all winter. A clogged gutter here does not just overflow; it soaks fascia boards and siding for months, which is where much of the rot we repair begins.",
      },
      {
        q: "What is the difference between pressure washing and soft washing?",
        a: "Pressure washing uses high-pressure water and is right for concrete: driveways, walkways, some pavers. Soft washing uses low pressure with a cleaning solution and is what siding, roofs, and most painted or wood surfaces need; high pressure on those can force water behind siding, strip paint, and gouge wood. If a house wash quote only mentions a pressure washer, ask what pressure they plan to use on the siding.",
      },
      {
        q: "Why does moss keep coming back on my roof and walkways?",
        a: "Because the conditions that grow it (shade, moisture, organic debris) are still there. Killing the visible moss is the easy half. Keeping it away means clearing the debris that feeds it, improving drainage and sun exposure where possible, and re-treating on a schedule, which is exactly the kind of recurring task a seasonal maintenance plan exists to carry for you.",
      },
    ],
  },
];

/** FAQPage JSON-LD derived from the data above. */
export const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};
