interface SeasonData {
  season: string;
  emoji: string;
  timing: string;
  tasks: string[];
}

const SEASONS: SeasonData[] = [
  {
    season: "Spring",
    emoji: "🌱",
    timing: "March–April",
    tasks: [
      "Scrub and treat moss colonies on walkable roof surfaces; flag lifted shingles and failed flashing for written scope",
      "Flush gutters and downspouts; clear Douglas Fir needle and moss buildup at all outlets",
      "Probe fascia and soffit for rot; mark moisture-wicking sections for replacement scope",
      "Clear foundation drains; regrade soil away from structure where clay saturation is found",
      "Tighten loose deck boards and fence fasteners; flag rot and structural damage for written scope",
      "Cut out failed caulk at windows, doors, and exterior penetrations; apply new weatherproof bead",
    ],
  },
  {
    season: "Summer",
    emoji: "☀️",
    timing: "June–July",
    tasks: [
      "Swap HVAC filters; test heat pump output and flag any efficiency drop for service",
      "Document paint and stain condition; apply touch-up coat or scope full repaint",
      "Start irrigation system; test backflow preventer and adjust coverage zones",
      "Inspect crawl space vapor barrier; resecure lifted sections and flag standing moisture",
      "Clear blocked attic vents; measure temperature differential and flag insulation gaps",
      "Clean deck surface and apply sealant during optimal dry-season application window",
    ],
  },
  {
    season: "Fall",
    emoji: "🍂",
    timing: "September–October",
    tasks: [
      "Clear gutters and downspouts before PNW rain season; flush to confirm full drainage",
      "Replace worn weatherstripping at all exterior doors and windows; test for drafts",
      "Apply zinc-sulfate moss inhibitor to walkable roof surfaces before wet season",
      "Replace worn door sweeps and thresholds; seal gaps at all exterior door bottoms",
      "Shut off and drain all exterior hose bibs; install foam insulating covers",
      "Inspect and reapply caulk at all exterior penetrations before first rains",
    ],
  },
  {
    season: "Winter",
    emoji: "❄️",
    timing: "December–January",
    tasks: [
      "Wrap exposed pipes in crawl space and exterior walls; flag uninsulated runs for written scope",
      "Check vapor barrier condition in crawl space; remove standing water and resecure barrier",
      "Test sump pump operation; clear intake screen and confirm discharge line is unobstructed",
      "Swap HVAC filter at mid-season; log replacement date in member record",
      "Check mold-prone bathrooms and laundry areas; treat surface mold and flag moisture source",
      "Audit exterior lighting; replace failed bulbs and test motion sensors for winter safety",
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
          Four times a year,<br />your home gets better.
        </h2>
        <p
          className="text-center max-w-xl mx-auto mb-10"
          style={{ color: "oklch(50% 0.02 60)" }}
        >
          Right now, your home is accumulating the specific wear patterns of the Pacific Northwest
          — moss on the roof, debris in the gutters, freeze-thaw stress on the foundation. Your
          technician knows exactly what to address each season. You receive the report.
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
                {s.tasks.map((task, j) => (
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
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          className="text-center text-xs mt-4"
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
