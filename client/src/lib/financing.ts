/**
 * Financing-education content - single source of truth for the /financing page
 * and the static prerender in scripts/generate-static-pages.ts. Keep them in
 * sync so crawlers and users see the same content.
 *
 * Hard rules (see /financing disclaimer + CLAUDE.md):
 *  - Handy Pioneers is a contractor, NOT a lender or a financial/tax advisor.
 *    Everything here is general education, never personal advice.
 *  - No cost/markup/margin math. Dollar talk routes to the retail ranges on
 *    /remodel-cost.
 *  - Facts about HELOCs, home equity loans, and tax come from the third-party
 *    authoritative sources in SOURCES. Do not invent numbers.
 */

export interface FundingOption {
  key: string;
  title: string;
  plainDefinition: string;
  howItWorks: string;
  goodFit: string;
  watchOuts: string;
  blogSlug?: string;
}

export interface DecisionRow {
  consideration: string;
  leanEquity: string;
  leanCash: string;
}

export interface CompareRow {
  feature: string;
  heloc: string;
  homeEquityLoan: string;
}

export interface OtherOption {
  title: string;
  what: string;
  fit: string;
  watch: string;
}

export interface FinancingFaq {
  q: string;
  a: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

/** The four ways most homeowners fund a larger project. */
export const FUNDING_OPTIONS: FundingOption[] = [
  {
    key: "equity",
    title: "Home equity",
    plainDefinition:
      "Equity is the part of your home you actually own: its current market value minus what you still owe on your mortgage.",
    howItWorks:
      "As you pay down your mortgage and as your home's value rises, your equity grows. Lenders let you borrow against a portion of it, usually keeping a cushion so you do not borrow against the home's full value.",
    goodFit:
      "Larger projects where you would rather not drain your savings, and work that protects or adds value (fixing a real problem, a kitchen or bath, an ADU).",
    watchOuts:
      "Borrowing against equity means a loan secured by your home. You are turning value you own into debt, so the project and the terms both need to be worth it.",
    blogSlug: "home-equity-101-your-biggest-lever",
  },
  {
    key: "heloc",
    title: "HELOC (home equity line of credit)",
    plainDefinition:
      "An open-end line of credit secured by your home. You draw from it as you need to, up to a set limit, and pay interest only on what you have drawn.",
    howItWorks:
      "During the draw period (often around 10 years) you can borrow, repay, and borrow again, like a credit card. After that comes the repayment period, when you can no longer draw and monthly payments are often higher. The rate is usually variable, so it can move up or down.",
    goodFit:
      "Phased work, or projects where the final cost is not fully nailed down yet and you want flexibility to draw as you go.",
    watchOuts:
      "Variable rates mean your payment can change. Payments often jump when the draw period ends. As with any home-secured loan, falling behind puts the home at risk.",
    blogSlug: "what-a-heloc-actually-is",
  },
  {
    key: "loan",
    title: "Home equity loan",
    plainDefinition:
      "A one-time lump sum borrowed against your equity, repaid on a fixed schedule. Sometimes called a second mortgage.",
    howItWorks:
      "You get the full amount up front and pay it back in equal monthly payments, usually at a fixed interest rate that does not change for the life of the loan.",
    goodFit:
      "A defined project with a known cost, where you want one predictable payment and no surprises from a moving rate.",
    watchOuts:
      "You start paying interest on the whole amount right away, even if the project is phased. Like a HELOC, it is secured by your home.",
    blogSlug: "heloc-vs-home-equity-loan-plain-english",
  },
  {
    key: "cash",
    title: "Paying cash",
    plainDefinition:
      "Funding the project from savings, with no loan and no interest.",
    howItWorks:
      "You pay as the work progresses from money you already have, the same way our deposit and milestone schedule already works.",
    goodFit:
      "Projects you can fund without draining the reserve you would want for a real emergency, and work you would not take on debt for.",
    watchOuts:
      "Cash is not free either. Spending your whole cushion on a project can leave you exposed if something else breaks. Sometimes keeping cash liquid is worth more than avoiding interest.",
    blogSlug: "cash-vs-financing-home-project",
  },
];

/** Honest decision guide: when leaning toward equity vs cash makes sense. */
export const EQUITY_VS_CASH: DecisionRow[] = [
  {
    consideration: "Your savings",
    leanEquity: "Borrowing keeps your cash reserves intact for real emergencies.",
    leanCash: "You have a surplus well beyond a solid emergency fund.",
  },
  {
    consideration: "Project size",
    leanEquity: "The project is large enough that paying cash would wipe out your cushion.",
    leanCash: "It is small enough to fund without stress.",
  },
  {
    consideration: "Timing",
    leanEquity: "You want the whole project done now rather than waiting to save up.",
    leanCash: "You are comfortable phasing the work as you save.",
  },
  {
    consideration: "Cost of money",
    leanEquity: "You accept paying some interest in exchange for speed and staying liquid.",
    leanCash: "You would rather pay nothing in interest.",
  },
  {
    consideration: "What the work does",
    leanEquity: "It protects or grows value (a real repair, a remodel, an ADU).",
    leanCash: "It is discretionary work you would not want to borrow for.",
  },
  {
    consideration: "Comfort with risk",
    leanEquity: "You understand the loan is secured by your home and the terms work for you.",
    leanCash: "You prefer carrying no debt against the house.",
  },
];

/** Side-by-side: HELOC vs home equity loan. */
export const HELOC_VS_LOAN: CompareRow[] = [
  {
    feature: "How you get the money",
    heloc: "A revolving line you draw from as needed.",
    homeEquityLoan: "A single lump sum up front.",
  },
  {
    feature: "Interest rate",
    heloc: "Usually variable, so it can rise or fall.",
    homeEquityLoan: "Usually fixed for the life of the loan.",
  },
  {
    feature: "Monthly payment",
    heloc: "Varies with your balance and rate; can jump after the draw period ends.",
    homeEquityLoan: "Fixed and predictable from day one.",
  },
  {
    feature: "Best suited for",
    heloc: "Phased or open-ended projects where the cost is not fully set.",
    homeEquityLoan: "A defined project with a known cost.",
  },
  {
    feature: "Borrowing again",
    heloc: "Borrow, repay, and borrow again during the draw period.",
    homeEquityLoan: "One-time; borrowing more means a new loan.",
  },
  {
    feature: "Predictability",
    heloc: "Less predictable as the rate and balance move.",
    homeEquityLoan: "Highly predictable.",
  },
];

/**
 * Other ways people fund projects, beyond the four primary options above. Framed
 * honestly so the higher-cost choices are not over-elevated: for big jobs, the
 * equity options usually win on cost; these fit smaller or specific situations.
 */
export const OTHER_OPTIONS: OtherOption[] = [
  {
    title: "Cash-out refinance",
    what: "Replace your existing mortgage with a larger one and take the difference as cash.",
    fit: "Large projects when you have significant equity and current rates make refinancing worthwhile anyway.",
    watch: "It resets your whole mortgage and carries closing costs, so it only makes sense in the right rate environment. Run the numbers with a lender.",
  },
  {
    title: "Personal loan",
    what: "An unsecured lump-sum loan from a bank or lender, repaid over a fixed term, with no claim on your home.",
    fit: "Mid-size projects when you have little equity, or would rather not borrow against the house.",
    watch: "Rates usually run higher than home-secured options and terms are shorter, so the monthly payment can be steeper.",
  },
  {
    title: "Personal line of credit",
    what: "An unsecured revolving line you draw from as needed, like a HELOC but not tied to your home.",
    fit: "Smaller, ongoing, or uncertain costs when you want flexibility without using your equity.",
    watch: "Variable rates that run higher than home-secured credit, and usually smaller limits.",
  },
  {
    title: "Credit cards",
    what: "Fast and convenient, and a new card sometimes carries a 0% introductory rate for a set window.",
    fit: "Small jobs, or a short-term bridge you can pay off quickly. A 0% promo can genuinely help if you clear it before it ends.",
    watch: "Interest is high once any promotional period ends. Not the place to carry a large balance for long.",
  },
  {
    title: "Contractor financing (point of sale)",
    what: "Financing offered right through the contractor by a lending partner, so you can apply for a project without going to the bank yourself. We offer this through our lending partner, Hearth: see personalized monthly payment options in minutes, with no impact to your credit score.",
    fit: "Convenience, and getting an answer at the project instead of shopping lenders one by one. Loan amounts up to $250,000, funding in as little as 1-3 days, no prepayment penalty, and no home equity required.",
    watch: "Terms vary by lender and are set on approved credit, so it is still worth comparing against your own bank. Handy Pioneers is not a lender; the choice and the terms stay yours.",
  },
];

export const FINANCING_FAQ: FinancingFaq[] = [
  {
    q: "Does Handy Pioneers offer financing or loans?",
    a: "We do not lend money ourselves, and we will always be straight about that. We do offer financing through our lending partner, Hearth, so you can see personalized monthly payment options in minutes with no impact to your credit score, with loan amounts up to $250,000 and funding in as little as 1-3 days. Rates and terms are set by the lender on approved credit, and the choice always stays yours. We also help you understand every other option so you can walk into any conversation informed.",
  },
  {
    q: "Is a HELOC or a home equity loan better?",
    a: "Neither is better in general. A home equity loan gives you a lump sum at a fixed, predictable payment, which suits a project with a known cost. A HELOC is a flexible line you draw from over time, which suits phased or open-ended work. The comparison table above lays out the tradeoffs.",
  },
  {
    q: "How much can I borrow against my home?",
    a: "It depends on your equity, your credit, and the lender. Lenders generally let you borrow against a portion of your home's value minus what you still owe, keeping a cushion rather than lending against the full value. Your lender will give you the real number.",
  },
  {
    q: "Is the interest tax-deductible?",
    a: "It can be. The IRS allows interest on a home equity loan or HELOC to be deducted only when the money is used to buy, build, or substantially improve the home that secures the loan, and other limits apply. This is exactly the case for many renovations, but tax rules vary by situation. Confirm with a tax professional before counting on it.",
  },
  {
    q: "Should I pay cash or finance the project?",
    a: "There is no single right answer. Paying cash avoids interest; financing with equity keeps your savings liquid and lets you act now. The decision guide above walks through how to weigh it for your situation.",
  },
  {
    q: "What does a project actually cost?",
    a: "We publish honest, realistic investment ranges instead of hiding them. See our remodel cost page for kitchen, bathroom, flooring, basement, ADU, and other ranges, then use the estimator to see roughly where your project lands. The exact number comes from a walkthrough and a written scope.",
  },
];

export const SOURCES: SourceLink[] = [
  {
    label: "Consumer Financial Protection Bureau: What is a home equity line of credit (HELOC)?",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-line-of-credit-heloc-en-107/",
  },
  {
    label: "Consumer Financial Protection Bureau: What is a home equity loan?",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-loan-en-106/",
  },
  {
    label: "Consumer Financial Protection Bureau: Difference between a home equity loan and a HELOC",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-home-equity-loan-and-a-home-equity-line-of-credit-heloc-en-247/",
  },
  {
    label: "Consumer Financial Protection Bureau: What you should know about home equity lines of credit",
    url: "https://files.consumerfinance.gov/f/documents/cfpb_heloc-brochure.pdf",
  },
  {
    label: "IRS Publication 936: Home Mortgage Interest Deduction",
    url: "https://www.irs.gov/publications/p936",
  },
];
