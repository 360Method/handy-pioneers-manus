/*
 * Membership.tsx — /membership
 * The 360° Method enrollment page, ported from 360-funnel's FunnelPage.
 * Brand voice: forest green dark sections, warm cream light sections,
 * amber CTAs, Playfair Display headings, Inter body.
 * Forbidden vocab scrubbed: no handyman / estimate / repair / fix / simple / easy / best / free.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { MemberTier, BillingCadence } from "@/lib/tiers";
import { TIERS } from "@/lib/tiers";
import { HomeScoreAnimation } from "@/components/membership/HomeScoreAnimation";
import TierCard from "@/components/membership/TierCard";
import CadenceToggle from "@/components/membership/CadenceToggle";
import StatBubbles from "@/components/membership/StatBubbles";
import SeasonalVisitsGrid from "@/components/membership/SeasonalVisitsGrid";
import ReactiveVsMemberTimeline from "@/components/membership/ReactiveVsMemberTimeline";
import SEO from "@/components/SEO";

const FAQS = [
  {
    q: "What happens when a visit identifies something that needs a larger scope of work?",
    a: "Your technician documents the finding with photos and generates a prioritized written scope on the spot — linked directly to your membership record. You receive a clear scope, a member rate, and can authorize the work in one step. No separate sales call, no sourcing a contractor, no waiting for a quote.",
  },
  {
    q: "How does the labor bank work?",
    a: "Labor bank credit is included in Quarterly and Annual memberships. Your credit is loaded at the end of your first billing period and renews annually. Apply it to any in-between visit task — a fixture swap, a door adjustment, a caulk renewal. Your technician logs time on-site and the system records the draw automatically. Credits do not carry over year-to-year, which keeps the membership priced accurately. Monthly memberships include all visits and member rates but do not include a labor bank.",
  },
  {
    q: "What does the baseline walkthrough cover?",
    a: "The baseline is a 2–3 hour documented whole-home assessment — roof, foundation, exterior envelope, interior systems, plumbing, electrical panels, HVAC, crawl space, and attic. You receive a written report with photos, a condition rating for each system, a prioritized findings list, and a written scope of work. This report is stored permanently in your member account and is shareable with your agent, lender, or insurer.",
  },
  {
    q: "Is there a contract or minimum commitment?",
    a: "No contract. Monthly and quarterly memberships cancel at the end of the current billing period. Annual memberships can be cancelled with a prorated refund for unused months, net of any labor bank credits already applied. We expect to earn your renewal — not enforce it.",
  },
  {
    q: "Is this available outside Clark County, Washington?",
    a: "Currently the 360° Method is delivered in Clark County, Washington — Vancouver, Camas, Battle Ground, Ridgefield, Washougal, La Center, and surrounding communities. We are expanding regionally — join the waitlist for your area at the bottom of this page.",
  },
  {
    q: "How do member rates apply to work beyond the scheduled visits?",
    a: "Member rates apply to all out-of-scope work billed separately — scopes that go beyond what your labor bank covers. On a larger scope, your labor bank credit applies first; member rates apply to any remaining balance. You are never billed at standard retail on either category.",
  },
  {
    q: "Is this a licensed home inspection?",
    a: "No — and that distinction actually works in your favor. The 360° Method is a proactive maintenance service, not a licensed home inspection. Think of it as what happens after the inspection: a licensed inspector tells you what is wrong at a point in time, and we take it from there — completing the recommended work, maintaining the home season after season, and documenting every visit so your home's condition is always on record. If you have recently had a home inspection, your inspection report is the ideal starting point for your 360° baseline. We work in tandem with home inspectors, not in place of them. Our documentation does not replace a licensed inspector, structural engineer, or specialist for major assessments, and we are not liable for pre-existing conditions not visible or accessible during a visit. Full scope is in our Terms & Conditions.",
  },
];

export default function Membership() {
  const [, navigate] = useLocation();
  const [cadence, setCadence] = useState<BillingCadence>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "360° Method Membership | Handy Pioneers";
    window.scrollTo(0, 0);
  }, []);

  const handleEnroll = (tier: MemberTier, c: BillingCadence) => {
    navigate(`/membership/checkout?tier=${tier}&cadence=${c}`);
  };

  return (
    <>
      <SEO
        path="/membership"
        title="360° Method Membership for Clark County Homeowners | Handy Pioneers"
        description="A seasonal whole-home care membership for Vancouver WA and Clark County homeowners who want their home monitored, documented, and kept in top condition — not patched up when something breaks."
      />
      <div className="min-h-screen font-sans" style={{ background: "oklch(96% 0.015 80)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="text-white pt-20 pb-28 px-4"
        style={{ background: "oklch(22% 0.07 155)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium mb-6"
            style={{ background: "oklch(100% 0 0 / 0.1)", color: "oklch(78% 0.13 78)" }}
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/hp-360-logo_69b6cf24.png"
              alt="360°"
              className="w-5 h-5 object-contain"
            />
            <span>The 360° Method — Delivered by Handy Pioneers</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Most homes are maintained reactively.<br />
            <span style={{ color: "oklch(65% 0.15 72)" }}>Yours doesn't have to be.</span>
          </h1>

          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "oklch(100% 0 0 / 0.75)" }}
          >
            Most homeowners have a financial advisor. Almost none have someone actively managing
            the physical asset. The 360° Method is a fully managed home stewardship program —
            quarterly visits, documented reports, and a named technician who knows your home.
            Membership from <strong className="text-white">$588/year</strong>{" "}
            <span style={{ fontSize: "0.85em", opacity: 0.7 }}>($49/mo on an Annual plan)</span>.
          </p>

          <a href="#pricing" className="btn-hp-primary text-base px-10 py-4 shadow-lg">
            See Plans & Pricing →
          </a>
          <p className="mt-4 text-sm" style={{ color: "oklch(100% 0 0 / 0.45)" }}>
            No contracts · Cancel anytime · Currently serving Clark County, Washington
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm" style={{ color: "oklch(100% 0 0 / 0.6)" }}>
            {["5-Star Rated", "Licensed & Insured", "1-Year Labor Guarantee", "Dedicated Technician"].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <span style={{ color: "oklch(65% 0.15 72)" }}>✓</span> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOME SCORE ── */}
      <section className="py-20 px-4" style={{ background: "oklch(97% 0.01 80)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="hp-overline">Your Transformation Starts Here</div>
              <h2
                className="font-display text-3xl sm:text-4xl font-black mb-5"
                style={{ color: "oklch(22% 0.07 155)" }}
              >
                Visit 1: you see where your home stands.<br />
                <span style={{ color: "oklch(55% 0.13 72)" }}>Every visit after: it gets better.</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "oklch(38% 0.03 60)" }}
              >
                Your membership begins with a <strong>2–3 hour baseline walkthrough</strong> — a
                full documented assessment of every major system. We photograph every finding,
                rate every system, and give your home its first score. You leave knowing exactly
                where you stand.
              </p>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "oklch(38% 0.03 60)" }}
              >
                After each seasonal visit, your score updates. You watch your home improve — visit
                by visit, season by season — with a timestamped record that follows the asset for
                its entire life.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "📋", label: "Day One: Baseline", desc: "You see every system, every risk, every finding" },
                  { icon: "📈", label: "Every Visit: Score Climbs", desc: "Your home improves — and you have proof" },
                  { icon: "📁", label: "Always: On Record", desc: "Timestamped PDF after every visit, stored permanently" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg p-4"
                    style={{
                      background: "oklch(100% 0 0)",
                      border: "1px solid oklch(88% 0.02 80)",
                      boxShadow: "0 1px 4px oklch(0% 0 0 / 0.06)",
                    }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div
                      className="font-bold text-sm mb-1"
                      style={{ color: "oklch(22% 0.07 155)" }}
                    >
                      {item.label}
                    </div>
                    <div className="text-xs" style={{ color: "oklch(50% 0.02 60)" }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="rounded-lg px-5 py-4"
                style={{
                  background: "oklch(55% 0.13 72 / 0.1)",
                  border: "1px solid oklch(55% 0.13 72 / 0.3)",
                }}
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "oklch(38% 0.08 72)" }}
                >
                  Your transformation starts within 48 hours of enrollment
                </p>
                <p className="text-sm" style={{ color: "oklch(38% 0.03 60)" }}>
                  The day you enroll, your baseline walkthrough goes on the calendar. Every month
                  before that is a month of home history you can never recover. Members who start
                  today have their first visit scheduled before the week is out.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end" style={{ width: "100%" }}>
              <div style={{ width: "100%", maxWidth: "400px" }}>
                <HomeScoreAnimation variant="homeowner" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S IN YOUR REPORT ── */}
      <section className="py-20 px-4 section-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/report-card-mockup-4AdTXSJrKZ4HDyTzWNLbPz.webp"
                alt="360° Home Scan Report showing Home Score 91/100 with photo documentation"
                className="rounded-2xl shadow-xl"
                style={{ maxWidth: "320px", width: "100%" }}
              />
            </div>
            <div>
              <div className="hp-overline">What You Walk Away With</div>
              <h2
                className="font-display text-3xl sm:text-4xl font-black mb-5"
                style={{ color: "oklch(22% 0.07 155)" }}
              >
                A record that grows<br />with your home.
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "oklch(38% 0.03 60)" }}
              >
                After every visit, a written report lands in your account — photos, system
                ratings, findings, and your updated Home Score. Over time, this becomes the most
                complete record of your home's condition that has ever existed. Yours to share
                with an agent, lender, or insurer whenever you need it.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Baseline walkthrough with photos", why: "You know exactly what you own — before anything else" },
                  { label: "Prioritized findings with written scope of work", why: "You know what to address and what it costs — no surprises" },
                  { label: "Home Score updated each visit", why: "You watch your home improve — in a number you can track" },
                  { label: "Seasonal visit reports", why: "You have proof of every visit, every system, every season" },
                  { label: "Shareable PDF record", why: "You walk into any conversation with your agent or lender prepared" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex gap-3 rounded-lg px-4 py-3"
                    style={{
                      background: "oklch(97% 0.01 80)",
                      border: "1px solid oklch(88% 0.02 80)",
                    }}
                  >
                    <span
                      style={{ color: "oklch(45% 0.12 155)", flexShrink: 0, marginTop: "2px" }}
                    >
                      ✓
                    </span>
                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{ color: "oklch(22% 0.07 155)" }}
                      >
                        {row.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "oklch(50% 0.02 60)" }}>
                        {row.why}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT BUBBLES ── */}
      <StatBubbles />

      {/* ── FRAMEWORK ── */}
      <section className="py-16 px-4 section-green">
        <div className="max-w-4xl mx-auto text-center">
          <div className="hp-overline" style={{ color: "oklch(65% 0.15 72)" }}>
            The Framework
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-6">
            KNOW → MAINTAIN → ADVANCE
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "oklch(100% 0 0 / 0.75)" }}
          >
            Three phases. One continuous arc. You go from not knowing what you own, to having it
            maintained by someone who does, to watching its condition — and its value — improve
            over time. We are the guide. You are the one who arrives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                phase: "KNOW",
                icon: "🔍",
                title: "You See Everything",
                body: "Before the 360° Method, most homeowners are guessing. After your baseline walkthrough, you are not. Every system is rated, every risk is photographed, and your home has a score. You know exactly what you own.",
              },
              {
                phase: "MAINTAIN",
                icon: "🔧",
                title: "We Handle It",
                body: "Four seasonal visits address the specific demands of the Pacific Northwest climate. Your technician shows up, executes, and documents. You receive the report. Nothing falls through the cracks — because we are watching.",
              },
              {
                phase: "ADVANCE",
                icon: "📈",
                title: "Your Home Improves",
                body: "Visit by visit, your score climbs and your record grows. The home you have in five years — documented, maintained, with a verifiable condition history — is a fundamentally different asset than the one you have today.",
              },
            ].map((p) => (
              <div
                key={p.phase}
                className="rounded-lg p-6"
                style={{ background: "oklch(100% 0 0 / 0.08)" }}
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "oklch(65% 0.15 72)" }}
                >
                  {p.phase}
                </div>
                <div className="font-bold text-white text-lg mb-2">{p.title}</div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(100% 0 0 / 0.7)" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASONAL VISITS ── */}
      <SeasonalVisitsGrid />

      {/* ── SAVINGS STATS ── */}
      <section className="py-16 px-4 section-cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="hp-overline">The Difference It Makes</div>
          <h2
            className="font-display text-3xl sm:text-4xl font-black mb-6"
            style={{ color: "oklch(22% 0.07 155)" }}
          >
            What changes when your home is managed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Median value of issues resolved before escalation", value: "$3,200", sub: "per incident" },
              { label: "Median incidents identified per year", value: "2.4", sub: "per home" },
              { label: "Median annual return on membership", value: "7.7×", sub: "vs. annual fee" },
            ].map((stat, i) => (
              <div key={i} className="hp-card text-center">
                <div
                  className="text-3xl font-black font-display"
                  style={{ color: "oklch(65% 0.15 72)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs mt-1" style={{ color: "oklch(60% 0.02 60)" }}>
                  {stat.sub}
                </div>
                <div
                  className="text-sm mt-2 leading-snug"
                  style={{ color: "oklch(35% 0.03 255)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "oklch(50% 0.02 60)" }}>
            Based on Handy Pioneers field data from 2023–2025 across 47 Clark County member
            homes. Figures represent median outcomes; individual results vary by home age,
            condition, and tier.
          </p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 px-4 section-white">
        <div className="max-w-5xl mx-auto">
          <div className="hp-overline">Membership Tiers</div>
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-center mb-3"
            style={{ color: "oklch(22% 0.07 155)" }}
          >
            Select Your Level of Stewardship
          </h2>
          <p
            className="text-center max-w-xl mx-auto mb-8"
            style={{ color: "oklch(50% 0.02 60)" }}
          >
            Each tier is a retainer, not a subscription. Member rates apply to all work beyond the
            scheduled visits — the higher the tier, the more comprehensive the coverage.
          </p>

          <CadenceToggle value={cadence} onChange={setCadence} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <TierCard
                key={tier.id}
                tier={tier}
                cadence={cadence}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
          <p className="text-center text-xs mt-6" style={{ color: "oklch(60% 0.02 60)" }}>
            All plans include the Annual 360° Home Scan. No long-term contracts. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── 1-YEAR LABOR GUARANTEE ── */}
      <section className="py-16 px-4" style={{ background: "oklch(22% 0.07 155)" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="hp-overline text-center mb-3"
            style={{ color: "oklch(65% 0.15 72)" }}
          >
            Our Commitment to You
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-center mb-4"
            style={{ color: "oklch(100% 0 0)" }}
          >
            You are in good hands. We guarantee it.
          </h2>
          <p
            className="text-center text-base mb-10 max-w-2xl mx-auto"
            style={{ color: "oklch(100% 0 0 / 0.7)" }}
          >
            Every task your technician performs is backed by a full one-year labor guarantee. If
            something we completed fails due to workmanship, we return and correct it — no
            service call fee, no back-and-forth. That is what a guide owes the people they lead.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "🔧",
                title: "Workmanship Covered",
                body: "If any task we performed fails within 12 months due to workmanship, we return and correct it. No service call fee, no back-and-forth.",
              },
              {
                icon: "📋",
                title: "Everything on Record",
                body: "Every visit is timestamped and documented with photos. If a question arises — from you, your insurer, or a buyer — the record is already in your account.",
              },
              {
                icon: "🔐",
                title: "Straightforward Terms",
                body: "If we completed it, it is covered for a year. We do not carve out exceptions for tasks we just performed. That is the complete policy.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-6 flex flex-col items-center text-center"
                style={{
                  background: "oklch(100% 0 0 / 0.06)",
                  border: "1px solid oklch(100% 0 0 / 0.12)",
                }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "oklch(100% 0 0)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(100% 0 0 / 0.65)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <div
            className="rounded-xl px-6 py-5 max-w-2xl mx-auto text-center"
            style={{
              background: "oklch(65% 0.15 72 / 0.12)",
              border: "1px solid oklch(65% 0.15 72 / 0.3)",
            }}
          >
            <p className="text-sm" style={{ color: "oklch(100% 0 0 / 0.8)" }}>
              <strong style={{ color: "oklch(75% 0.15 72)" }}>What's not covered:</strong>{" "}
              Material failures from manufacturer defects, damage caused by third parties or acts
              of nature, or tasks outside the original scope of work. If we didn't do it, we don't
              guarantee it — but we'll tell you who should.
            </p>
          </div>
        </div>
      </section>

      {/* ── MEMBER REVIEWS ── */}
      <section className="py-14 px-4 section-white">
        <div className="max-w-4xl mx-auto">
          <div
            className="hp-overline text-center"
            style={{ color: "oklch(65% 0.15 72)" }}
          >
            From Members
          </div>
          <h2
            className="font-display text-3xl font-black text-center mb-8"
            style={{ color: "oklch(22% 0.07 155)" }}
          >
            People who made the same decision you're considering
          </h2>
          <div
            className="elfsight-app-3439582a-5f81-4ddb-ab1a-54f99c9da7af"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>

      {/* ── TIMELINE COMPARISON ── */}
      <ReactiveVsMemberTimeline />

      {/* ── WORK PHOTOS ── */}
      <section className="py-14 px-4 section-cream">
        <div className="max-w-5xl mx-auto">
          <div
            className="hp-overline text-center"
            style={{ color: "oklch(65% 0.15 72)" }}
          >
            The Work We Do
          </div>
          <h2
            className="font-display text-3xl font-black text-center mb-8"
            style={{ color: "oklch(22% 0.07 155)" }}
          >
            This is what your home looks like after a visit.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/roof_moss_cleaning_8ec59cf6.jpg", caption: "Roof Moss Cleaning" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/gutter_cleaning_ea6257be.jpg", caption: "Gutter Cleaning" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/hose_bib_covering_cd7cd768.jpg", caption: "Hose Bib Winterization" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/exterior_light_fixture_replacement_ebcaac9c.jpg", caption: "Exterior Light Fixture Replacement" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/rotted_stair_repair_7a04b221.jpg", caption: "Rotted Stair Restoration" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PdNJ394MjBP7Uu2hurkDFS/Before_Afters(10)_81ded948.png", caption: "Pressure Washing — Driveway" },
            ].map((photo, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-sm">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
                <div className="px-3 py-2 bg-white">
                  <p
                    className="text-xs font-medium"
                    style={{ color: "oklch(45% 0.02 60)" }}
                  >
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 section-cream">
        <div className="max-w-2xl mx-auto">
          <div className="hp-overline">Before You Enroll</div>
          <h2
            className="font-display text-3xl font-black text-center mb-10"
            style={{ color: "oklch(22% 0.07 155)" }}
          >
            Questions from people exactly where you are now
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-5 rounded-lg bg-white transition-all hover:shadow-md"
                style={{
                  border: `1px solid ${openFaq === i ? "oklch(65% 0.15 72)" : "oklch(85% 0.02 80)"}`,
                }}
              >
                <div className="flex justify-between items-start gap-3">
                  <span
                    className="font-semibold text-sm leading-snug"
                    style={{ color: "oklch(22% 0.07 155)" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="font-bold flex-shrink-0"
                    style={{ color: "oklch(65% 0.15 72)" }}
                  >
                    {openFaq === i ? "−" : "+"}
                  </span>
                </div>
                {openFaq === i && (
                  <p
                    className="mt-3 text-sm leading-relaxed pt-3"
                    style={{
                      borderTop: "1px solid oklch(85% 0.02 80)",
                      color: "oklch(35% 0.03 255)",
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 section-green">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
            Right now, your home has no guide.<br />
            <span style={{ color: "oklch(65% 0.15 72)" }}>
              That changes the day you enroll.
            </span>
          </h2>
          <p
            className="mb-8 leading-relaxed"
            style={{ color: "oklch(100% 0 0 / 0.7)" }}
          >
            Your baseline walkthrough is on the calendar within 48 hours. From that day forward,
            your technician knows your home, tracks its condition, and handles what needs
            handling — season by season — while your score climbs and your record grows. Annual
            membership from $588.
          </p>
          <a href="#pricing" className="btn-hp-primary text-base px-10 py-4">
            Start My Home's Transformation →
          </a>
          <p
            className="mt-4 text-xs max-w-sm mx-auto"
            style={{ color: "oklch(100% 0 0 / 0.38)", lineHeight: 1.55 }}
          >
            The 360° Method is a proactive maintenance service — not a licensed home inspection.
            We work in tandem with home inspectors: they identify, we maintain and document.
            Reports do not replace a licensed inspector or structural engineer.{" "}
            <a
              href="/terms-and-conditions"
              className="underline hover:text-white transition-colors"
              style={{ color: "oklch(100% 0 0 / 0.45)" }}
            >
              Full terms apply.
            </a>
          </p>
          <p className="mt-4 text-sm" style={{ color: "oklch(100% 0 0 / 0.5)" }}>
            Questions? Call us at{" "}
            <a
              href="tel:+13608386731"
              className="hover:underline"
              style={{ color: "oklch(65% 0.15 72)" }}
            >
              (360) 838-6731
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
