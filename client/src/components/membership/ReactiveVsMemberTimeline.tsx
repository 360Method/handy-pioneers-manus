const NEGLECT_TIMELINE = [
  { year: "Year 1", event: "Gutters clog with Douglas Fir needles. Ignored.", cost: "$0 spent" },
  { year: "Year 2", event: "Water overflows, saturates fascia. Rot begins.", cost: "$0 spent" },
  { year: "Year 3", event: "Fascia and soffit visibly rotting. Mold starts.", cost: "$0 spent" },
  { year: "Year 4", event: "Contractor called. Scope has grown significantly.", cost: "$8,400 scope" },
  { year: "Year 5", event: "Mold remediation required. Insurance won't cover.", cost: "$12,000 total" },
];

const MEMBER_TIMELINE = [
  { year: "Year 1", event: "Spring visit: gutters cleared, fascia inspected. All clear.", cost: "$49/mo" },
  { year: "Year 2", event: "Fall visit: minor caulk failure caught. Addressed on-site.", cost: "$49/mo" },
  { year: "Year 3", event: "Spring visit: small moss patch treated. $0 damage.", cost: "$49/mo" },
  { year: "Year 4", event: "Home in leading condition. Refinanced at full value.", cost: "$49/mo" },
  { year: "Year 5", event: "5-year maintenance log used at sale. $18K more at closing.", cost: "$49/mo" },
];

export default function ReactiveVsMemberTimeline() {
  return (
    <section className="py-16 px-4 section-green">
      <div className="max-w-5xl mx-auto">
        <div className="hp-overline" style={{ color: "oklch(65% 0.15 72)" }}>
          Two Paths. Five Years.
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-black text-center text-white mb-10">
          Where your home ends up depends on what you do today
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div
              className="text-sm font-bold uppercase tracking-wide mb-4"
              style={{ color: "oklch(70% 0.18 25)" }}
            >
              Unmanaged Home
            </div>
            <div className="space-y-3">
              {NEGLECT_TIMELINE.map((row, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className="text-xs font-bold px-2 py-1 rounded whitespace-nowrap mt-0.5"
                    style={{
                      background: "oklch(70% 0.18 25 / 0.2)",
                      color: "oklch(75% 0.15 25)",
                    }}
                  >
                    {row.year}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm" style={{ color: "oklch(100% 0 0 / 0.8)" }}>
                      {row.event}
                    </div>
                    <div
                      className="text-xs font-bold mt-0.5"
                      style={{ color: "oklch(70% 0.18 25)" }}
                    >
                      {row.cost}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-4 rounded-lg p-3 text-center"
              style={{ background: "oklch(70% 0.18 25 / 0.15)" }}
            >
              <div
                className="text-2xl font-black font-display"
                style={{ color: "oklch(70% 0.18 25)" }}
              >
                $20,400+
              </div>
              <div className="text-xs" style={{ color: "oklch(100% 0 0 / 0.6)" }}>
                total 5-year cost
              </div>
            </div>
          </div>

          <div>
            <div
              className="text-sm font-bold uppercase tracking-wide mb-4"
              style={{ color: "oklch(65% 0.15 72)" }}
            >
              360° Method — Essential Tier
            </div>
            <div className="space-y-3">
              {MEMBER_TIMELINE.map((row, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className="text-xs font-bold px-2 py-1 rounded whitespace-nowrap mt-0.5"
                    style={{
                      background: "oklch(65% 0.15 72 / 0.2)",
                      color: "oklch(70% 0.14 75)",
                    }}
                  >
                    {row.year}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm" style={{ color: "oklch(100% 0 0 / 0.8)" }}>
                      {row.event}
                    </div>
                    <div
                      className="text-xs font-bold mt-0.5"
                      style={{ color: "oklch(65% 0.15 72)" }}
                    >
                      {row.cost}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-4 rounded-lg p-3 text-center"
              style={{ background: "oklch(65% 0.15 72 / 0.15)" }}
            >
              <div
                className="text-2xl font-black font-display"
                style={{ color: "oklch(65% 0.15 72)" }}
              >
                $2,940
              </div>
              <div className="text-xs" style={{ color: "oklch(100% 0 0 / 0.6)" }}>
                total 5-year cost ($49/mo × 60)
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="#pricing" className="btn-hp-primary text-base px-10 py-4">
            View Membership Options →
          </a>
        </div>
      </div>
    </section>
  );
}
