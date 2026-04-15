import { CheckCircle } from "lucide-react";

const credentials = [
  "Licensed Contractor — WA License HANDYP*761NH",
  "Insured up to $1,000,000",
  "1-Year Labor Guarantee on all projects",
  "Clear communication & efficient timelines",
  "Serving Clark County since day one",
];

export default function About() {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: "oklch(1 0 0)" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="reveal">
            <div className="section-divider mb-4">
              <span className="section-divider-label">Who We Are</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
            >
              Built on Craftsmanship &amp; Trust
            </h2>
            <p
              className="text-lg leading-relaxed mb-4"
              style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Handy Pioneers is an owner-operated remodeling and repair company serving Clark County, WA.
              Marcin personally handles every project — from the first estimate to the final walkthrough.
              No subcontractors, no crews you've never met. One skilled craftsman, fully accountable for the result.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "oklch(0.50 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Founded by <strong>Marcin Micek</strong>, Handy Pioneers takes on projects ranging from
              single-trade repairs (rot repair, carpentry, fixture replacement) to full bathroom and deck
              remodels. If a project is larger than what one skilled craftsman can deliver at the quality
              you deserve, Marcin will tell you honestly — and point you in the right direction.
              That transparency is part of the service.
            </p>

            {/* Credentials */}
            <ul className="space-y-3 mb-8">
              {credentials.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="shrink-0 mt-0.5"
                    style={{ color: "oklch(0.65 0.14 65)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.40 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className="hcp-button"
              onClick={() => (window as any).HCPWidget?.openModal()}
            >
              Work With Us
            </button>
          </div>

          {/* Right: Visual */}
          <div className="reveal" style={{ transitionDelay: "150ms" }}>
            <div className="relative">
              {/* Main image */}
              <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/marcin-owner_0d194701.jpg"
                  alt="Marcin Micek, founder of Handy Pioneers, in his workshop"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating credential card */}
              <div
                className="absolute -bottom-6 -left-6 rounded-xl p-4 shadow-xl flex flex-col items-center"
                style={{ backgroundColor: "oklch(0.32 0.07 160)", maxWidth: "200px" }}
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-full-logo_4f724ec4.jpg"
                  alt="Handy Pioneers LLC"
                  className="w-24 h-auto object-contain mb-2"
                  style={{ opacity: 0.95 }}
                />
                <div
                  className="text-xs text-white/80 text-center leading-tight"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  5★ Rated · Clark County, WA
                </div>
              </div>

              {/* Floating license card */}
              <div
                className="absolute -top-4 -right-4 rounded-xl p-4 shadow-xl"
                style={{ backgroundColor: "oklch(0.65 0.14 65)" }}
              >
                <div
                  className="text-xs font-bold text-white uppercase tracking-wider"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Licensed &amp; Insured
                </div>
                <div
                  className="text-xs text-white/80 mt-1"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  WA Lic. HANDYP*761NH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
