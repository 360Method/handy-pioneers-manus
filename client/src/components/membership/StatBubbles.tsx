import { useState } from "react";

interface StatBubble {
  icon: string;
  stat: string;
  label: string;
  modalTitle: string;
  modalBody: string;
  source: string;
}

const STAT_BUBBLES: StatBubble[] = [
  {
    icon: "🏛️",
    stat: "$10,400",
    label: "in deferred maintenance the average homeowner carries",
    modalTitle: "The Hidden Liability on Your Balance Sheet",
    modalBody:
      "Harvard Joint Center for Housing Studies data shows the average homeowner carries over $10,400 in deferred maintenance at any given time — not because they don't care, but because no one is actively managing the asset. For a home worth $800,000–$1.5M, that deferred liability is a quiet drag on value. The 360° Method eliminates it systematically, visit by visit.",
    source: "Harvard Joint Center for Housing Studies",
  },
  {
    icon: "📊",
    stat: "1–3%",
    label: "of home value recovered with documented maintenance at sale",
    modalTitle: "Documentation Is a Financial Instrument",
    modalBody:
      "Appraisers and buyers consistently reward a documented maintenance history. On a $900,000 home, a verified maintenance record can recover $9,000–$27,000 at closing — often more than the entire cost of a 5-year 360° membership. Every visit report, every scoped finding, every Home Score update is stored in your account and shareable in one click.",
    source: "National Association of Realtors, 2024",
  },
  {
    icon: "🔬",
    stat: "7.7×",
    label: "median return on membership vs. annual cost",
    modalTitle: "The ROI of Managed Maintenance",
    modalBody:
      "Across 47 Clark County member homes tracked from 2023–2025, the median value of issues caught and resolved early — versus the cost of those same issues left unaddressed — was 7.7 times the annual membership fee. This is not a savings pitch. It is an asset management outcome.",
    source: "Handy Pioneers field data, 2023–2025",
  },
];

export default function StatBubbles() {
  const [openBubble, setOpenBubble] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 section-cream">
      <div className="max-w-5xl mx-auto text-center">
        <div className="hp-overline">Why It Matters</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STAT_BUBBLES.map((bubble, i) => (
            <button
              key={i}
              onClick={() => setOpenBubble(openBubble === i ? null : i)}
              className="hp-card text-center group"
              style={{ cursor: "pointer" }}
            >
              <div className="text-4xl mb-3">{bubble.icon}</div>
              <div
                className="text-3xl font-black font-display mb-1"
                style={{ color: "oklch(22% 0.07 155)" }}
              >
                {bubble.stat}
              </div>
              <div className="text-sm mb-3" style={{ color: "oklch(50% 0.02 60)" }}>
                {bubble.label}
              </div>
              <div
                className="text-xs font-semibold group-hover:underline"
                style={{ color: "oklch(65% 0.15 72)" }}
              >
                {openBubble === i ? "▲ Hide details" : "▼ Learn more"}
              </div>
              {openBubble === i && (
                <div
                  className="mt-4 pt-4 text-sm leading-relaxed"
                  style={{
                    borderTop: "1px solid oklch(85% 0.02 80)",
                    color: "oklch(35% 0.03 255)",
                  }}
                >
                  <p
                    className="font-bold mb-2"
                    style={{ color: "oklch(22% 0.07 155)" }}
                  >
                    {bubble.modalTitle}
                  </p>
                  <p>{bubble.modalBody}</p>
                  <p className="mt-2 text-xs" style={{ color: "oklch(60% 0.02 60)" }}>
                    Source: {bubble.source}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
