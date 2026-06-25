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
        q: "Why don't you list prices on your website?",
        a: "Every home is different. A deck repair in a 1,200 sq ft rancher is a different project than the same repair on a 3,500 sq ft craftsman with rot underneath. We start every engagement with an on-site consultation - we walk the property, assess the full scope, and present a written plan tailored to your home. No ballpark numbers, no assumptions. We're happy to talk through your situation on a call before scheduling.",
      },
      {
        q: "What do most projects cost?",
        a: "Small repairs and maintenance tasks (caulking, fixture replacement, minor drywall) typically run $150-$500. Mid-size projects (bathroom upgrades, deck repairs, flooring) generally range from $1,500-$8,000. Full remodels and additions are quoted individually. The 360° Baseline Walkthrough is a flat-fee service - ask us for current pricing when you reach out.",
      },
      {
        q: "What does the initial consultation include?",
        a: "Every engagement starts with an on-site consultation. We walk the property, assess the full scope, listen to your priorities, and present a written plan tailored to your home, not a generic quote. No ballpark numbers over the phone for complex work. You know exactly what you're getting, and why, before any work begins.",
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
