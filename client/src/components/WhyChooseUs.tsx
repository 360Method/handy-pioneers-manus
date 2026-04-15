/**
 * WhyChooseUs — Value proposition section addressing the "why hire us" question
 * Design: Light warm background (cream), dark green headings, amber accents
 * Positioned after Testimonials to convert visitors who have seen social proof
 */
import { BadgeCheck, Clock, FileText, Users, Hammer, ThumbsUp } from "lucide-react";

const values = [
  {
    icon: BadgeCheck,
    title: "Licensed, Bonded & Insured",
    desc: "WA State licensed contractor. Every job is covered — protecting your home and your investment from day one.",
  },
  {
    icon: Clock,
    title: "We Show Up On Time",
    desc: "Punctuality is a baseline, not a differentiator. We communicate arrival windows and stick to them.",
  },
  {
    icon: FileText,
    title: "Clear, Itemized Estimates",
    desc: "No vague quotes. You get a written, line-by-line estimate before any work begins — no surprises at invoice.",
  },
  {
    icon: Users,
    title: "Direct Access to Marcin",
    desc: "You work with the owner, not a dispatcher. Marcin personally oversees every project from estimate to completion.",
  },
  {
    icon: Hammer,
    title: "1-Year Labor Guarantee",
    desc: "If our work fails within a year, we come back and make it right — no charge, no argument, no hassle.",
  },
  {
    icon: ThumbsUp,
    title: "We Tell You What We Find",
    desc: "If we spot a problem you didn't call about, we tell you — even if we're not the right person to fix it. Honest information, always.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="py-20"
      style={{ backgroundColor: "oklch(0.97 0.015 80)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="section-divider justify-center mb-4">
            <span className="section-divider-label">Why Handy Pioneers</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            What You Can Expect From Us
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.40 0.05 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Hiring a contractor is a trust decision. Here's exactly what we commit to
            on every project — from a single repair to a full remodel.
          </p>
        </div>

        {/* Value cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14 reveal">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-6 rounded-xl reveal"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.88 0.015 80)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.22 0.07 160 / 0.08)" }}
                >
                  <Icon size={20} style={{ color: "oklch(0.22 0.07 160)" }} />
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)", fontSize: "1.05rem" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.45 0.05 160)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center reveal">
          <p
            className="text-base mb-6"
            style={{ color: "oklch(0.45 0.05 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Ready to see the difference? Get a free, no-obligation estimate today.
          </p>
          <button
            className="hcp-button text-base px-8 py-4"
            onClick={() => (window as any).HCPWidget?.openModal()}
          >
            Get a Free Estimate
          </button>
        </div>
      </div>
    </section>
  );
}
