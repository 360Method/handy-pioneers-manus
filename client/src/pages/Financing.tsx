// Financing-education resource page - /financing
// Educational guide to how homeowners fund larger projects (home equity, HELOC,
// home equity loan, cash), tied to 360 Method Step 9 (Scale: reading your home's
// equity over time). Handy Pioneers is NOT a lender or financial advisor; this
// page educates and routes to a planning walkthrough. Content comes from
// client/src/lib/financing.ts and mirrors the prerender in
// scripts/generate-static-pages.ts so crawlers see the same thing.

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import FinalCTA from "@/components/FinalCTA";
import SEO from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import HearthCalculator from "@/components/hearth/HearthCalculator";
import HearthCTA from "@/components/hearth/HearthCTA";
import HearthDisclaimer from "@/components/hearth/HearthDisclaimer";
import { HearthPaymentExample } from "@/components/hearth/HearthPaymentLine";
import { HEARTH_ENABLED, HEARTH_BULLETS } from "@/lib/hearth";
import { monthlyPaymentFrom } from "@/lib/hearthPayments";
import { PRESETS, financingAnchor, formatUSD } from "@/lib/remodelCost";
import {
  FUNDING_OPTIONS,
  OTHER_OPTIONS,
  EQUITY_VS_CASH,
  HELOC_VS_LOAN,
  FINANCING_FAQ,
  SOURCES,
} from "@/lib/financing";
import { getPublishedPosts } from "@/lib/blog";

// Only link a funding card to its deep-dive post once that post is live.
// The cluster drips through July, so this keeps every "Read more" pointing at a
// published page instead of a not-yet-published URL.
const PUBLISHED_SLUGS = new Set(getPublishedPosts().map((p) => p.slug));

const SITE = "https://handypioneers.com";
const GREEN = "oklch(0.22 0.07 160)";
const GOLD = "oklch(0.65 0.14 65)";
const BORDER = "oklch(0.88 0.015 80)";
const CARD_BG = "oklch(1 0 0)";
const INK = "oklch(0.34 0.02 80)";

function jsonLd(): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "How to Pay for a Home Project: Equity, HELOCs, and Cash",
      description:
        "A plain-English guide to funding a home project in Clark County, WA: home equity, HELOCs, home equity loans, and paying cash, and how to decide. Educational, not financial advice.",
      url: `${SITE}/financing`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Financing", item: `${SITE}/financing` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FINANCING_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export default function Financing() {
  return (
    <>
      <SEO
        path="/financing"
        title="How to Pay for a Home Project: Equity, HELOCs & Cash | Handy Pioneers"
        description="A plain-English guide to funding a home project in Clark County, WA: home equity, HELOCs, home equity loans, and cash, and how to decide. We are your guide, not your lender."
        jsonLd={jsonLd()}
      />
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "oklch(0.98 0.012 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
        <TopBar />
        <Navbar />

        {/* Hero */}
        <section className="py-16 md:py-20" style={{ backgroundColor: GREEN }}>
          <div className="container max-w-3xl mx-auto px-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
              360° Method · Step 9: Scale
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Smart ways to invest in your home
            </h1>
            <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>
              Most larger home projects are funded, not paid for out of pocket all at once, the same
              way most cars are. That is normal, and it is not something to feel behind about. The
              right way to pay depends on your situation, and you deserve to understand the options
              before anyone talks price.
            </p>
            <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "640px" }}>
              So here is a plain guide to home equity, HELOCs, home equity loans, and paying cash, and
              an honest way to decide between them. We are not a lender and we are not financial
              advisors. We are the partner who makes sure you walk in informed.
            </p>
          </div>
        </section>

        {/* Partnership image */}
        <div className="container max-w-3xl mx-auto px-6 -mt-8 md:-mt-10 relative z-10">
          <img
            src="/images/financing-partnership.webp"
            alt="A Handy Pioneers team member shaking hands with a homeowner in front of their home"
            width={1600}
            height={900}
            className="w-full rounded-2xl shadow-lg"
            style={{ border: `1px solid ${BORDER}`, aspectRatio: "16 / 9", objectFit: "cover" }}
          />
        </div>

        <section className="pt-12 pb-14 md:pt-14 md:pb-16">
          <div className="container max-w-3xl mx-auto px-6">

            {/* ── Hearth financing (primary action) ── */}
            {HEARTH_ENABLED && (
              <div className="rounded-2xl p-7 md:p-8 mb-14" style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}`, boxShadow: "0 8px 30px rgba(20,35,28,0.08)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD, letterSpacing: "0.08em" }}>
                  Financing through our partner, Hearth
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                  See your monthly payment options in minutes
                </h2>
                <p className="text-base leading-relaxed mb-5" style={{ color: INK }}>
                  Prefer to spread a project over affordable monthly payments? You can
                  see personalized options in minutes, with no impact to your credit
                  score. Handy Pioneers is not a lender; financing is offered through
                  our lending partner, Hearth.
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {HEARTH_BULLETS.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "oklch(0.32 0.03 160)" }}>
                      <span style={{ color: GOLD }}>✓</span> {b}
                    </li>
                  ))}
                </ul>

                {/* What our published projects come to per month. Prices are the
                    low end of the ranges on /remodel-cost, so nothing drifts. */}
                <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "oklch(0.97 0.015 160)", border: `1px solid ${BORDER}` }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: GREEN }}>
                    What a project comes to per month
                  </p>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "oklch(0.50 0.02 80)" }}>
                    Starting points for our published projects, with nothing out of pocket up front.
                    Larger scopes and higher finishes go up from here.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      <tbody>
                        {PRESETS.map((p) => {
                          const anchor = financingAnchor(p);
                          const payment = monthlyPaymentFrom(anchor);
                          if (payment === null) return null;
                          return (
                            <tr key={p.key} style={{ borderTop: `1px solid ${BORDER}` }}>
                              <td className="py-2 pr-3" style={{ color: INK }}>{p.label}</td>
                              <td className="py-2 pr-3 whitespace-nowrap text-right" style={{ color: "oklch(0.50 0.02 80)" }}>
                                from {formatUSD(anchor)}
                              </td>
                              <td className="py-2 whitespace-nowrap text-right font-bold" style={{ color: GREEN }}>
                                {formatUSD(payment)}/mo
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <HearthPaymentExample className="mt-3" />
                </div>

                {/* Inline payment calculator */}
                <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "oklch(0.97 0.015 160)", border: `1px solid ${BORDER}` }}>
                  <p className="text-sm font-semibold mb-3" style={{ color: GREEN }}>
                    Estimate a monthly payment
                  </p>
                  <HearthCalculator location="financing_page" />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <HearthCTA variant="apply" location="financing_page">
                    See my payment options
                  </HearthCTA>
                  <span className="text-sm" style={{ color: "oklch(0.50 0.02 80)" }}>
                    Soft check, no score impact
                  </span>
                </div>

                <HearthDisclaimer className="mt-5" />
              </div>
            )}

            {/* Step 9 / biggest asset */}
            <div className="rounded-2xl p-7" style={{ backgroundColor: "oklch(0.95 0.02 160)", border: "1px solid oklch(0.85 0.03 160)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                Your home is your biggest asset
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.30 0.05 160)" }}>
                For most families, the home is the largest thing they own. In the 360 Method, the final
                stage is Scale: reading your home's value and equity over time and making decisions like
                the asset it is, not just reacting when something breaks. Part of that is knowing how to
                fund the work that protects or grows that value, in a way that fits your money, not the
                contractor's.
              </p>
              <p className="text-base leading-relaxed mt-3" style={{ color: "oklch(0.30 0.05 160)" }}>
                That is the difference between a contractor and a partner. We are not here to push the
                biggest project. We are here to help you decide what is worth doing, in what order, and
                how to pay for it without putting yourself in a bad spot.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/360-method" className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                  How the 360 Method works <ArrowRight size={15} />
                </Link>
                <Link href="/remodel-cost" className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                  See what projects cost <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Funding options */}
            <h2 className="text-2xl font-bold mt-14 mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              The main ways people fund a project
            </h2>
            <p className="text-base mb-6" style={{ color: "oklch(0.42 0.02 80)" }}>
              Four common paths. Each has a place; none is right for everyone.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {FUNDING_OPTIONS.map((o) => (
                <div key={o.key} className="rounded-2xl p-5 flex flex-col" style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}>
                  <p className="text-base font-bold" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                    {o.title}
                  </p>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: INK }}>{o.plainDefinition}</p>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: INK }}>{o.howItWorks}</p>
                  <div className="mt-3 text-sm leading-relaxed">
                    <p style={{ color: "oklch(0.40 0.10 160)" }}><strong>Good fit:</strong> {o.goodFit}</p>
                    <p className="mt-1" style={{ color: "oklch(0.50 0.10 50)" }}><strong>Watch outs:</strong> {o.watchOuts}</p>
                  </div>
                  {o.blogSlug && PUBLISHED_SLUGS.has(o.blogSlug) && (
                    <Link href={`/blog/${o.blogSlug}`} className="inline-flex items-center gap-1 mt-3 text-sm font-semibold hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                      Read more <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Other ways people pay */}
            <h2 className="text-2xl font-bold mt-14 mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              Other ways people pay
            </h2>
            <p className="text-base mb-6" style={{ color: "oklch(0.42 0.02 80)" }}>
              These come up too. For a big project, the home equity options above usually win on cost,
              but each of these fits a certain situation.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {OTHER_OPTIONS.map((o) => (
                <div key={o.title} className="rounded-2xl p-5 flex flex-col" style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}>
                  <p className="text-base font-bold" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                    {o.title}
                  </p>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: INK }}>{o.what}</p>
                  <div className="mt-3 text-sm leading-relaxed">
                    <p style={{ color: "oklch(0.40 0.10 160)" }}><strong>Good fit:</strong> {o.fit}</p>
                    <p className="mt-1" style={{ color: "oklch(0.50 0.10 50)" }}><strong>Watch outs:</strong> {o.watch}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Equity vs cash decision guide */}
            <h2 className="text-2xl font-bold mt-14 mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              Equity or cash: how to decide
            </h2>
            <p className="text-base mb-6" style={{ color: "oklch(0.42 0.02 80)" }}>
              There is no single right answer. Here is an honest way to weigh it, point by point.
            </p>
            <div className="space-y-3">
              {EQUITY_VS_CASH.map((r, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}>
                  <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: GREEN, letterSpacing: "0.06em" }}>
                    {r.consideration}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl p-3" style={{ backgroundColor: "oklch(0.96 0.02 160)" }}>
                      <p className="text-xs font-bold mb-1" style={{ color: "oklch(0.40 0.10 160)" }}>Lean toward equity</p>
                      <p className="text-sm leading-relaxed" style={{ color: INK }}>{r.leanEquity}</p>
                    </div>
                    <div className="rounded-xl p-3" style={{ backgroundColor: "oklch(0.97 0.02 80)" }}>
                      <p className="text-xs font-bold mb-1" style={{ color: "oklch(0.50 0.10 50)" }}>Lean toward cash</p>
                      <p className="text-sm leading-relaxed" style={{ color: INK }}>{r.leanCash}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* HELOC vs home equity loan */}
            <h2 className="text-2xl font-bold mt-14 mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              HELOC vs home equity loan
            </h2>
            <p className="text-base mb-6" style={{ color: "oklch(0.42 0.02 80)" }}>
              Both let you borrow against your equity. The difference is how the money comes to you and
              how predictable the payment is.
            </p>
            <div className="space-y-3">
              {HELOC_VS_LOAN.map((r, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}` }}>
                  <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: GREEN, letterSpacing: "0.06em" }}>
                    {r.feature}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl p-3" style={{ backgroundColor: "oklch(0.96 0.02 160)" }}>
                      <p className="text-xs font-bold mb-1" style={{ color: "oklch(0.40 0.10 160)" }}>HELOC</p>
                      <p className="text-sm leading-relaxed" style={{ color: INK }}>{r.heloc}</p>
                    </div>
                    <div className="rounded-xl p-3" style={{ backgroundColor: "oklch(0.97 0.02 80)" }}>
                      <p className="text-xs font-bold mb-1" style={{ color: "oklch(0.50 0.10 50)" }}>Home equity loan</p>
                      <p className="text-sm leading-relaxed" style={{ color: INK }}>{r.homeEquityLoan}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "oklch(0.50 0.02 80)" }}>
              Both a HELOC and a home equity loan are secured by your home. That is what makes the rates
              lower than unsecured credit, and it is also the risk: if you cannot keep up with payments,
              the home is on the line. Borrow against a project and terms that are genuinely worth it.
            </p>

            {/* Tax note */}
            <div className="rounded-2xl p-6 mt-12" style={{ backgroundColor: "oklch(0.97 0.02 80)", border: `1px solid ${BORDER}` }}>
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
                One thing worth knowing about taxes
              </h2>
              <p className="text-base leading-relaxed" style={{ color: INK }}>
                The IRS allows the interest on a home equity loan or HELOC to be deducted only when the
                money is used to buy, build, or substantially improve the home that secures the loan, and
                other limits apply. Renovating that same home is often exactly that case. We are not tax
                advisors, and the rules vary by situation, so confirm it with a tax professional before
                you count on it.
              </p>
            </div>

            {/* Guide not lender */}
            <div className="rounded-2xl p-7 mt-12" style={{ backgroundColor: GREEN }}>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "white" }}>
                We are your guide, not your lender
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                Handy Pioneers is a home care and remodeling contractor. We are not a bank, a lender, or
                a financial or tax advisor, and nothing on this page is financial advice. The figures and
                rules here are general and can change over time and vary by lender and by your situation.
                Talk to a lender and a tax professional about your own numbers before you decide.
              </p>
              <p className="text-base leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.82)" }}>
                What we will do is help you scope the right project, show you honest pricing up front, and
                stay your partner long after the work is done. When you are ready, the next step is a
                walkthrough so the plan and the number are real.
              </p>
            </div>

            {/* FAQ */}
            <h2 className="text-2xl font-bold mt-14 mb-4" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              Common questions
            </h2>
            <div className="space-y-5 mb-4">
              {FINANCING_FAQ.map((f, i) => (
                <div key={i}>
                  <p className="text-base font-semibold mb-1" style={{ color: GREEN }}>{f.q}</p>
                  <p className="text-base leading-relaxed" style={{ color: INK }}>{f.a}</p>
                </div>
              ))}
            </div>

            {/* Sources */}
            <h2 className="text-xl font-bold mt-12 mb-3" style={{ fontFamily: "'Playfair Display', serif", color: GREEN }}>
              Where this comes from
            </h2>
            <ul className="space-y-2 mb-2">
              {SOURCES.map((s, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80" style={{ color: "oklch(0.45 0.12 160)" }}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
