/**
 * Method360Section — Homepage section introducing the 360° Method
 * Design: Dark forest green background, warm amber accents, Playfair Display headings
 * Positioned between Services and Gallery to intercept mid-funnel visitors
 */
import { useLocation } from "wouter";
import { Search, ClipboardList, Wrench, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Full-Home Walk-Through",
    desc: "Every visit starts with a structured assessment of all visible systems — not just the one you called about.",
  },
  {
    icon: ClipboardList,
    title: "Written Priority Report",
    desc: "You receive a clear, prioritized list of findings: what needs attention now, what can wait, and what's in good shape.",
  },
  {
    icon: Wrench,
    title: "Repair on Your Terms",
    desc: "No pressure. You decide what to fix and when. We give you the information; you make the call.",
  },
  {
    icon: ShieldCheck,
    title: "1-Year Labor Guarantee",
    desc: "Every repair we complete is backed by our 1-year labor guarantee. If it fails, we come back — no charge.",
  },
];

export default function Method360Section() {
  const [, navigate] = useLocation();

  return (
    <section
      id="method-360"
      className="py-20"
      style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
    >
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="section-divider justify-center mb-4">
            <span
              className="section-divider-label"
              style={{ color: "oklch(0.80 0.10 65)", borderColor: "oklch(0.80 0.10 65)" }}
            >
              Our Approach
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The 360° Method
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Most contractors fix what you point at. We look at your whole home.
            The 360° Method is a structured walk-through that finds the problems
            you didn't know you had — before they become expensive emergencies.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14 reveal">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex gap-4 p-6 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.80 0.10 65 / 0.15)" }}
                >
                  <Icon size={22} style={{ color: "oklch(0.80 0.10 65)" }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value statement */}
        <div
          className="rounded-xl p-8 text-center mb-10 reveal"
          style={{ backgroundColor: "rgba(200,137,42,0.12)", border: "1px solid oklch(0.80 0.10 65 / 0.30)" }}
        >
          <p
            className="text-xl font-semibold text-white leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "Catching a $300 problem before it becomes a $10,000 problem
            is the best service we can offer."
          </p>
          <p
            className="mt-3 text-sm"
            style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            — Marcin Micek, Owner · Handy Pioneers
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
          <button
            className="hcp-button text-base px-8 py-4"
            onClick={() => (window as any).HCPWidget?.openModal()}
          >
            Schedule a 360° Assessment
          </button>
          <button
            onClick={() => {
              navigate("/blog/the-360-method-why-we-look-at-your-whole-home");
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base border-2 border-white/40 text-white hover:bg-white/10 transition-all"
            style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1rem" }}
          >
            Read the Full Story
          </button>
          <a
            href="https://360.handypioneers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold uppercase tracking-wide text-base border-2 border-amber-400/60 text-amber-300 hover:bg-amber-400/10 transition-all"
            style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1rem" }}
          >
            Explore the 360° Method
          </a>
        </div>
      </div>
    </section>
  );
}
