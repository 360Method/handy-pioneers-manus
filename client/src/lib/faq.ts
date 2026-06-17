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
        q: "Do you require a deposit?",
        a: "Yes. Most projects require a 30-50% deposit before materials are ordered and work begins. The remainder is due upon completion. We never ask for full payment upfront.",
      },
      {
        q: "What affects the final cost of a project?",
        a: "The main factors are: scope and complexity, material selections, access and site conditions, and whether hidden issues are discovered once work begins. We document any scope changes in writing before proceeding.",
      },
    ],
  },
  {
    category: "Who Does the Work",
    items: [
      {
        q: "Do you use subcontractors?",
        a: "For specialized trades (electrical, plumbing, HVAC), yes - we work with vetted, licensed subcontractors. Every trade partner is screened and coordinated through a single point of contact. You'll always know in advance who is coming to your home.",
      },
      {
        q: "Who will actually be on my property?",
        a: "Every assessment walkthrough is owner-led. The work is executed by a vetted crew of skilled tradesmen and licensed specialists. You are never handed off to someone you haven't met - the relationship is consistent from first call to final walkthrough.",
      },
      {
        q: "Are you licensed and insured?",
        a: "Yes. Handy Pioneers LLC is a Washington State licensed contractor and carries full general liability insurance. We're happy to provide proof of insurance before any work begins.",
      },
    ],
  },
  {
    category: "The 360° Method",
    items: [
      {
        q: "What exactly is the 360° Method?",
        a: "It's a proactive home maintenance system - not a legal inspection. We assess your home's current condition across all major systems, document everything in a written report, and give you a prioritized NOW / SOON / WAIT roadmap. Think of it as a health record for your home that we update over time.",
      },
      {
        q: "Is the 360° Walkthrough the same as a home inspection?",
        a: "No. The 360° Baseline Walkthrough is a proactive maintenance assessment, not a licensed home inspection. It is not a legal document and cannot be used for real estate transactions. If you need a licensed inspection for a purchase or sale, we can refer you to a vetted inspector in our network (Path 3). The 360° Method is designed to work alongside - and after - a licensed inspection.",
      },
      {
        q: "\"Certified technician\" - certified by whom?",
        a: "Marcin holds certifications in home maintenance assessment and has completed professional training in residential systems evaluation. He is not a licensed home inspector (see above). We use 'certified technician' to describe his trade credentials and training - not to imply a licensed inspection credential. We're working on making this clearer on the site.",
      },
      {
        q: "How long does a Baseline Walkthrough take?",
        a: "Typically 2-3 hours for a standard single-family home. Larger properties or homes with complex systems may take longer. You'll receive your written report and prioritized roadmap within 48 hours of the walkthrough.",
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
        a: "We stand behind our work. Labor is warranted for 1 year from completion when it's built on a sound foundation, and full-restoration work we rebuild to sound structure (like a full-frame window replacement or rebuilt framing, decking, or subfloor) carries a 3-year guarantee. Material warranties vary by manufacturer and will be documented in your project paperwork. If something we did isn't right, we come back and fix it - no argument. The one thing we can't guarantee is work we install over a hidden problem you've asked us to cover instead of repair - when we find one, we show you, give you the choice in writing, and only the covered-over part falls outside the guarantee.",
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
