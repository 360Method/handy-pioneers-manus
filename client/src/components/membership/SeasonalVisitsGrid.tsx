interface SeasonData {
  season: string;
  emoji: string;
  timing: string;
  focus: string[];
}

// Focus areas per season: categories, not a fixed checklist. The exact tasks are
// matched to each home at the baseline walkthrough, so a home without a deck or
// irrigation never gets that work; the focused visit goes to what the home needs.
const SEASONS: SeasonData[] = [
  {
    season: "Spring",
    emoji: "🌱",
    timing: "March-April",
    focus: [
      "Moss & roof care on walkable surfaces",
      "Gutter & downspout clearing",
      "Exterior weatherproofing & caulking",
      "Foundation drainage & moisture check",
    ],
  },
  {
    season: "Summer",
    emoji: "☀️",
    timing: "June-July",
    focus: [
      "Dry-season exterior care",
      "HVAC performance & filter service",
      "Crawlspace & attic moisture check",
      "Seasonal surface care, where present",
    ],
  },
  {
    season: "Fall",
    emoji: "🍂",
    timing: "September-October",
    focus: [
      "Rain-season roof & gutter prep",
      "Weatherization & draft sealing",
      "Freeze protection for exterior plumbing",
      "Heating-season systems check",
    ],
  },
  {
    season: "Winter",
    emoji: "❄️",
    timing: "December-January",
    focus: [
      "Freeze & moisture protection",
      "Crawlspace & sump check, where present",
      "Interior safety & systems check",
      "Storm-season readiness",
    ],
  },
];

export default function SeasonalVisitsGrid() {
  return (
    <section className="py-16 px-4 section-white">
      <div className="max-w-5xl mx-auto">
        <div className="hp-overline">Your Year, Managed</div>
        <h2
          className="font-display text-3xl sm:text-4xl font-black text-center mb-4"
          style={{ color: "oklch(22% 0.07 155)" }}
        >
          Season by season,<br />your home gets better.
        </h2>
        <p
          className="text-center max-w-xl mx-auto mb-10"
          style={{ color: "oklch(50% 0.02 60)" }}
        >
          Your home accumulates the specific wear patterns of the Pacific Northwest: moss on the
          roof, debris in the gutters, freeze-thaw stress on the foundation. Each seasonal visit is
          a focused window matched to your home at the baseline, so your technician works on what
          your home actually needs. You receive the report.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEASONS.map((s, i) => (
            <div key={i} className="hp-card">
              <div
                className="flex items-center justify-center gap-3 mb-4 pb-3"
                style={{ borderBottom: "1px solid oklch(88% 0.02 80)" }}
              >
                <span className="text-2xl">{s.emoji}</span>
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: "oklch(22% 0.07 155)" }}
                  >
                    {s.season} Visit
                  </div>
                  <div className="text-xs" style={{ color: "oklch(65% 0.15 72)" }}>
                    {s.timing}
                  </div>
                </div>
              </div>
              <ul className="space-y-2.5 text-left">
                {s.focus.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-xs leading-snug"
                    style={{ color: "oklch(35% 0.03 255)" }}
                  >
                    <span
                      style={{ color: "oklch(65% 0.15 72)", flexShrink: 0, marginTop: "2px" }}
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          className="text-center text-xs mt-6 max-w-xl mx-auto"
          style={{ color: "oklch(50% 0.02 60)" }}
        >
          Each visit is a focused window matched to your home. We do the work your home actually
          needs, so a home without a deck or irrigation isn't charged that time. Larger items become
          a written scope you approve separately.
        </p>
        <p
          className="text-center text-xs mt-3"
          style={{ color: "oklch(60% 0.02 60)" }}
        >
          Essential includes Spring + Fall. Full Coverage and Maximum Protection include all four
          seasons.
        </p>
        <p
          className="text-center text-xs mt-2"
          style={{ color: "oklch(60% 0.02 60)" }}
        >
          <em>
            Roof work is limited to walkable, low-slope surfaces. Steep-pitch and third-story work
            is referred to a licensed roofer.
          </em>
        </p>
      </div>
    </section>
  );
}
