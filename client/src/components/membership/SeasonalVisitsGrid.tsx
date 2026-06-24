import { useState } from "react";

interface SeasonCategory {
  title: string;
  tasks: string[];
}
interface SeasonData {
  season: string;
  emoji: string;
  timing: string;
  categories: SeasonCategory[];
}

// Per-season categories, each expandable to example MAINTENANCE tasks. This is a
// value-communication menu, not a fixed promise: the exact work is matched to the
// home at the baseline (a home without a deck or irrigation never gets that work)
// and time-boxed to the home's size. Mirror of HP-DOC-021 and the estimator's
// shared/seasonalTaskMenu.ts; keep the three in sync. Maintenance only: no
// licensed-trade repair, and repair/replace is always a separate written scope.
const SEASONS: SeasonData[] = [
  {
    season: "Spring",
    emoji: "🌱",
    timing: "March-April",
    categories: [
      {
        title: "Roof & moss care (walkable roofs)",
        tasks: [
          "Soft-brush and treat moss on walkable, low-slope roof areas",
          "Apply a zinc-based moss inhibitor before growth spreads",
          "Clear needles and debris from valleys and around vents and skylights",
          "Note worn shingles or flashing for a separate repair scope",
        ],
      },
      {
        title: "Gutters & drainage",
        tasks: [
          "Clear gutters and flush downspouts (where gutters are present)",
          "Confirm water exits well away from the foundation; clear splash blocks",
          "Re-seat loose gutter hangers and tighten fasteners",
          "Clear accessible perimeter and window-well drains",
        ],
      },
      {
        title: "Exterior weatherproofing",
        tasks: [
          "Re-caulk gaps at windows, doors, and exterior penetrations",
          "Touch up exterior paint or stain on small worn spots",
          "Reseal siding penetrations and hose-bib trim",
          "Replace cracked or missing exterior caulk beads",
        ],
      },
      {
        title: "Safety & systems upkeep",
        tasks: [
          "Test smoke and CO detectors and replace batteries",
          "Replace the heating and cooling air filter (common sizes carried)",
          "Lubricate garage-door rollers and hinges; test the auto-reverse",
          "Clean the dryer-vent run and press-test GFCI outlets",
        ],
      },
    ],
  },
  {
    season: "Summer",
    emoji: "☀️",
    timing: "June-July",
    categories: [
      {
        title: "Dry-season exterior care",
        tasks: [
          "Soft-wash siding, walkways, and patio",
          "Pressure-wash the driveway where suitable",
          "Wash exterior windows and clean tracks and weep holes",
          "Touch up exterior paint while conditions are dry",
        ],
      },
      {
        title: "Deck, fence & surfaces (where present)",
        tasks: [
          "Clean and reseal deck boards in the dry window (where a deck is present)",
          "Stain or seal fence sections (where a fence is present)",
          "Tighten deck and fence fasteners; note rot for a separate scope",
          "Seal driveway and walkway cracks before fall",
        ],
      },
      {
        title: "Moisture & ventilation (where present)",
        tasks: [
          "Re-secure lifted crawlspace vapor barrier",
          "Check the attic for blocked vents, staining, or daylight",
          "Confirm crawlspace and soffit vents are clear and screened",
          "Note standing water or pest signs for follow-up",
        ],
      },
      {
        title: "Air filters & safety devices",
        tasks: [
          "Replace the air filter and clear the visible condensate line",
          "Clear debris and growth around the outdoor unit",
          "Test smoke and CO detectors",
          "Clean range-hood and bath-fan filters and grilles",
        ],
      },
    ],
  },
  {
    season: "Fall",
    emoji: "🍂",
    timing: "September-October",
    categories: [
      {
        title: "Rain-season roof & gutter prep",
        tasks: [
          "Clear gutters and downspouts before the wet season (where present)",
          "High-flow test downspouts for underground clogs",
          "Re-treat walkable roof areas with moss inhibitor",
          "Confirm downspout extensions carry water well away from the foundation",
        ],
      },
      {
        title: "Weatherization & sealing",
        tasks: [
          "Replace worn weatherstripping at doors and windows",
          "Install or replace door sweeps and thresholds",
          "Re-caulk exterior gaps before the first rains",
          "Seal gaps at penetrations, vents, and trim",
        ],
      },
      {
        title: "Freeze protection for faucets & lines",
        tasks: [
          "Shut off and drain exterior hose bibs (where present)",
          "Install insulated faucet covers",
          "Add foam insulation to exposed exterior or crawlspace pipe runs",
          "Drain and store hoses; winterize irrigation lines (where present)",
        ],
      },
      {
        title: "Heating-season readiness",
        tasks: [
          "Replace the air filter for the heating season",
          "Test smoke and CO detectors and replace batteries",
          "Clear vents and registers of dust and obstruction",
          "Check the fireplace and chimney surround and screen; flag service (where present)",
        ],
      },
    ],
  },
  {
    season: "Winter",
    emoji: "❄️",
    timing: "December-January",
    categories: [
      {
        title: "Freeze & moisture protection",
        tasks: [
          "Re-check and re-secure pipe insulation in the crawlspace and exterior walls",
          "Confirm faucet covers and exterior shut-offs are holding",
          "Clear gutters of winter debris between storms",
          "Note recurring crawlspace moisture for a drainage scope",
        ],
      },
      {
        title: "Crawlspace & drainage (where present)",
        tasks: [
          "Test the sump pump and clear its intake screen (where present)",
          "Confirm the sump discharge line is clear and directed away",
          "Re-secure lifted crawlspace vapor barrier",
          "Check perimeter and foundation drains for winter blockage",
        ],
      },
      {
        title: "Interior safety",
        tasks: [
          "Test smoke and CO detectors and replace batteries",
          "Replace failed interior and exterior bulbs",
          "Press-test GFCI outlets and note any that fail to reset",
          "Clean bath and laundry exhaust-fan grilles and confirm they vent outside",
        ],
      },
      {
        title: "Storm-season readiness",
        tasks: [
          "Clear and secure outdoor drains and catch basins",
          "Reverse ceiling fans to push warm air down",
          "Treat shaded walkways for slick moss and algae",
          "Check exterior lighting and motion sensors and replace bulbs",
        ],
      },
    ],
  },
];

export default function SeasonalVisitsGrid() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

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
          className="text-center max-w-xl mx-auto mb-3"
          style={{ color: "oklch(50% 0.02 60)" }}
        >
          Your home accumulates the specific wear patterns of the Pacific Northwest: moss on the
          roof, debris in the gutters, freeze-thaw stress on the foundation. Each seasonal visit is
          a focused window matched to your home at the baseline, so your technician works on what
          your home actually needs. You receive the report.
        </p>
        <p
          className="text-center max-w-xl mx-auto mb-10 text-sm"
          style={{ color: "oklch(60% 0.02 60)" }}
        >
          Tap any category to see example tasks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {SEASONS.map((s, i) => (
            <div key={i} className="hp-card self-start">
              <div
                className="flex items-center justify-center gap-3 mb-3 pb-3"
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
              <div>
                {s.categories.map((cat, ci) => {
                  const id = `${i}:${ci}`;
                  const isOpen = open.has(id);
                  return (
                    <div
                      key={ci}
                      style={{ borderTop: ci > 0 ? "1px solid oklch(93% 0.01 80)" : "none" }}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-2 text-left py-2.5"
                      >
                        <span
                          className="flex items-start gap-2 text-xs font-medium leading-snug"
                          style={{ color: "oklch(30% 0.03 255)" }}
                        >
                          <span style={{ color: "oklch(65% 0.15 72)", flexShrink: 0, marginTop: "2px" }}>
                            ✓
                          </span>
                          <span>{cat.title}</span>
                        </span>
                        <span
                          className="text-[11px] shrink-0 mt-0.5"
                          style={{ color: "oklch(65% 0.15 72)" }}
                          aria-hidden="true"
                        >
                          {isOpen ? "▾" : "▸"}
                        </span>
                      </button>
                      {isOpen && (
                        <ul className="pl-5 pb-2.5 space-y-1.5">
                          {cat.tasks.map((task, ti) => (
                            <li
                              key={ti}
                              className="text-[11px] leading-snug"
                              style={{ color: "oklch(45% 0.02 255)" }}
                            >
                              {task}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p
          className="text-center text-xs mt-6 max-w-2xl mx-auto"
          style={{ color: "oklch(50% 0.02 60)" }}
        >
          These are examples. Each visit is a focused window matched to your home, so a home without
          a deck or irrigation isn't charged that time. We do what your home actually needs, highest
          priority first.
        </p>
        <p
          className="text-center text-xs mt-3 max-w-2xl mx-auto"
          style={{ color: "oklch(50% 0.02 60)" }}
        >
          Maintenance is included. If something needs repair or replacement (rotted decking or
          fascia, a leaking roof, a broken fixture, or any heating, cooling, plumbing, or electrical
          system repair), that is separate work. We document it and give you a written scope to
          approve at your member rate, never absorbed into the visit.
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
