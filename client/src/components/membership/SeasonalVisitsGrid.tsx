import { useState, type ReactNode } from "react";

export interface SeasonCategory {
  title: string;
  tasks: string[];
}
export interface SeasonData {
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
        title: "Gutters & drainage",
        tasks: [
          "Clear gutters and flush downspouts we can reach from a ladder (where gutters are present), or clear the tops of gutter covers where you have them",
          "Confirm water exits well away from the foundation",
        ],
      },
      {
        title: "Safety & systems",
        tasks: [
          "Test every smoke and CO detector and check the fire extinguisher",
          "Replace the heating and cooling air filter; check the thermostat and condensate drain",
        ],
      },
      {
        title: "Plumbing leak check",
        tasks: [
          "Look under every sink and at each toilet supply line and shutoff",
          "Check the water heater pan for drips",
        ],
      },
      {
        title: "Where present",
        tasks: ["Test the sump pump", "Start up irrigation and check the zones"],
      },
    ],
  },
  {
    season: "Summer",
    emoji: "☀️",
    timing: "June-July",
    categories: [
      {
        title: "Air & ventilation",
        tasks: [
          "Clean the dryer vent run and its outside hood",
          "Clean bathroom exhaust fans and confirm they pull air",
          "Degrease the range hood filter",
          "Replace the air filter",
        ],
      },
      {
        title: "Wet areas",
        tasks: ["Check tub and shower caulk and grout; reseal small failed sections"],
      },
    ],
  },
  {
    season: "Fall",
    emoji: "🍂",
    timing: "September-October",
    categories: [
      {
        title: "Rain-season gutter prep",
        tasks: [
          "Clear gutters and flush and high-flow test downspouts, from a ladder (where present), or clear the tops of gutter covers where you have them",
          "Confirm downspout extensions and nearby drains are clear",
        ],
      },
      {
        title: "Freeze protection",
        tasks: ["Disconnect hoses and fit insulated faucet covers (where hose bibs are present)"],
      },
      {
        title: "Heating-season readiness",
        tasks: [
          "Test smoke and CO detectors and replace batteries",
          "Replace the air filter for the heating season",
        ],
      },
      {
        title: "Where present",
        tasks: ["Run the sump pump through a full cycle"],
      },
    ],
  },
  {
    season: "Winter",
    emoji: "❄️",
    timing: "December-January",
    categories: [
      {
        title: "Water & plumbing",
        tasks: [
          "Locate, tag and exercise the main water shutoff",
          "Check the water heater: leaks, drain pan, relief line, venting and temperature",
        ],
      },
      {
        title: "Doors & drafts",
        tasks: ["Check weatherstripping and door sweeps on every exterior door; adjust or replace"],
      },
      {
        title: "Safety & air",
        tasks: ["Test every GFCI outlet, inside and out", "Replace the air filter"],
      },
      {
        title: "Where present",
        tasks: ["Check pipe insulation in the crawlspace and garage"],
      },
    ],
  },
];

// The homeowner copy is the default. The landlord page (/multifamily) passes its
// own building + common-area seasons and footnotes through these props, reusing
// the exact same UI so the two pages look identical and only the wording differs.
interface Props {
  seasons?: SeasonData[];
  overline?: string;
  heading?: ReactNode;
  intro?: ReactNode;
  tapHint?: string;
  footnotes?: ReactNode[];
}

const HOMEOWNER_FOOTNOTES: ReactNode[] = [
  <>
    These are examples. Each visit is a focused window matched to your home, so a home without a
    deck or irrigation isn't charged that time. We do what your home actually needs, highest
    priority first.
  </>,
  <>
    Maintenance is included. If something needs repair or replacement (rotted decking or fascia, a
    leaking roof, a broken fixture, or any heating, cooling, plumbing, or electrical system
    repair), that is separate work. We document it and give you a written scope to approve at your
    member rate, never absorbed into the visit.
  </>,
  <>
    Some work varies too much from home to home to carry in a flat plan fee: window and track
    cleaning, soft-washing siding and walkways, sealing a deck or fence, roof moss treatment, and
    sealing driveway cracks. We spot it on your visits and quote it as its own job at your member
    rate.
  </>,
  <>
    Visits keep your home in shape once it is in shape. If gutters, a roof or a dryer vent has gone
    more than a year without service, the first catch-up clean is quoted once at your member rate,
    with the regular price beside it. After that it is covered on every visit. If you can show it
    was serviced in the last year, it goes straight onto your seasonal schedule.
  </>,
  <>
    Essential includes Spring + Fall. Full Coverage and Maximum Protection include all four
    seasons.
  </>,
  <em>
    We clear gutters and work on the roof only where we can safely reach, from a ladder or a
    walkable, low-slope roof. Gutters or roof areas that need steep-pitch access or a second or
    third-story dormer are referred to a licensed roofer; we do what we can from below and hand off
    the rest.
  </em>,
];

export default function SeasonalVisitsGrid({
  seasons = SEASONS,
  overline = "Your Year, Managed",
  heading = (
    <>
      Season by season,<br />your home gets better.
    </>
  ),
  intro = (
    <>
      Your home accumulates the specific wear patterns of the Pacific Northwest: moss on the
      roof, debris in the gutters, freeze-thaw stress on the foundation. Each seasonal visit is
      a focused window matched to your home at the baseline, so your technician works on what
      your home actually needs. You receive the report.
    </>
  ),
  tapHint = "Tap any category to see example tasks.",
  footnotes = HOMEOWNER_FOOTNOTES,
}: Props = {}) {
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
        <div className="hp-overline">{overline}</div>
        <h2
          className="font-display text-3xl sm:text-4xl font-black text-center mb-4"
          style={{ color: "oklch(22% 0.07 155)" }}
        >
          {heading}
        </h2>
        <p
          className="text-center max-w-xl mx-auto mb-3"
          style={{ color: "oklch(50% 0.02 60)" }}
        >
          {intro}
        </p>
        <p
          className="text-center max-w-xl mx-auto mb-10 text-sm"
          style={{ color: "oklch(60% 0.02 60)" }}
        >
          {tapHint}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {seasons.map((s, i) => (
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
        {footnotes.map((note, i) => (
          <p
            key={i}
            className={`text-center text-xs max-w-2xl mx-auto ${i === 0 ? "mt-6" : "mt-3"}`}
            style={{ color: "oklch(55% 0.02 60)" }}
          >
            {note}
          </p>
        ))}
      </div>
    </section>
  );
}
