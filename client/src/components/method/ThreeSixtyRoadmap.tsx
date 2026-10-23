/**
 * COPIED FROM HP-Estimator-app by scripts/sync-360-method.mjs. Do not edit
 * here; change the source in the pro app and run the sync again.
 */
/**
 * ThreeSixtyRoadmap: the one 360 Method visual.
 *
 * The picture is Marcin's published roadmap artwork ("The 360 Method: A
 * Roadmap to Home Ownership Mastery": a title, three phase bands, nine
 * illustrated step panels). Nothing redraws it. This component shows that
 * one file, served from the path the canon carries, and adds the data-driven
 * pieces around it: a visually hidden text version of the nine steps for
 * screen readers and crawlers, and, when the visual is about ONE home, a
 * strip of nine numbered dots wearing that home's status with "You are here".
 *
 * Self-contained on purpose: no app imports, its own small stylesheet, plain
 * hex tones carried in the data. The website keeps a copy of this file and
 * renders it from a copied canon.json (scripts/sync-360-method.mjs in the
 * site repo). The picture path is the same in both repos.
 *
 * Variants:
 *   full     the picture at the width it is given (pages, print).
 *   compact  the same picture, plus a "tap to open full size" hint because
 *            the artwork's text is small at phone width. Member home, funnel,
 *            confirmation, membership pages on the site.
 *   strip    nine numbered dots under three phase labels, one row. Banners.
 *
 * full and compact also show the strip under the picture when the caller
 * passes statusByKey, currentStepKey or onSelect.
 *
 * Copy rules: everything shown comes from the canon. No em or en dashes, no
 * costs, no tier codes. Safe for a customer glancing at a tech's phone.
 */
import type { CSSProperties } from "react";

export type RoadmapStepStatus = "done" | "active" | "attention" | "upcoming";

export interface RoadmapTone {
  accent: string;
  onAccent: string;
  wash: string;
}

export interface RoadmapStep {
  number: number;
  key: string;
  name: string;
  icon: string;
  line: string;
}

export interface RoadmapPhase {
  id: string;
  name: string;
  label: string;
  subtitle: string;
  tone: RoadmapTone;
  steps: RoadmapStep[];
}

export interface RoadmapData {
  title: string;
  subtitle: string;
  footnote: string;
  /** Root-relative path of the roadmap artwork. */
  image: string;
  imageAlt: string;
  phases: RoadmapPhase[];
}

export type RoadmapVariant = "full" | "compact" | "strip";

export interface ThreeSixtyRoadmapProps {
  canon: RoadmapData;
  variant?: RoadmapVariant;
  /** Per-step tone when the visual is about one home. */
  statusByKey?: Partial<Record<string, RoadmapStepStatus>>;
  /** The step to mark "You are here". */
  currentStepKey?: string | null;
  /** Makes every dot a button. */
  onSelect?: (stepKey: string) => void;
  /** Show the education footnote under the map (customer surfaces). */
  footnote?: boolean;
  /** Text color context: dark backgrounds get cream text. */
  tone?: "light" | "dark";
  className?: string;
  /** full and compact: an aria-label for the whole figure. */
  label?: string;
  /** Override the picture source (the export script inlines a data URI). */
  src?: string;
}

const STATUS_FILL: Record<RoadmapStepStatus, { bg: string; fg: string; label: string }> = {
  done: { bg: "#3F6B3A", fg: "#FFFFFF", label: "Done" },
  active: { bg: "#C8922A", fg: "#FFFFFF", label: "Underway" },
  attention: { bg: "#E0A93A", fg: "#1A2E1A", label: "Needs attention" },
  upcoming: { bg: "#E7E1D4", fg: "#5B574F", label: "Coming up" },
};

const INK = "#1a2e1a";
const CREAM = "#faf6ef";
const HAIRLINE = "#e7e1d4";
const GOLD = "#c8922a";

/**
 * One small stylesheet, scoped by the tsr- prefix, so the component renders
 * the same inside the app, on the website and in the headless export.
 */
export const THREE_SIXTY_ROADMAP_CSS = `
.tsr{color:${INK};font-family:inherit;line-height:1.35}
.tsr *{box-sizing:border-box}
.tsr-dark{color:${CREAM}}
.tsr-pic-link{display:block;border-radius:12px;overflow:hidden;border:1px solid ${HAIRLINE};background:#fff;line-height:0}
.tsr-pic-link:focus-visible{outline:2px solid ${GOLD};outline-offset:2px}
.tsr-pic{display:block;width:100%;height:auto;aspect-ratio:2000/1096;background:#eef3f6}
.tsr-hint{margin:6px 2px 0;font-size:11px;opacity:.7}
.tsr-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.tsr-foot{margin:8px 2px 0;font-size:11px;opacity:.7}
.tsr-here-line{margin:8px 2px 0;font-size:13px;font-weight:700}
.tsr-under{margin-top:10px}
.tsr-strip{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}
.tsr-strip-group{display:flex;align-items:center;gap:4px}
.tsr-strip-label{font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin:0 2px 0 0;opacity:.75}
.tsr-dot{width:22px;height:22px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;border:1px solid transparent;font:inherit;padding:0}
button.tsr-dot{cursor:pointer;appearance:none}
button.tsr-dot:focus-visible{outline:2px solid ${GOLD};outline-offset:2px}
.tsr-dot-current{box-shadow:0 0 0 2px ${GOLD}}
`;

function Strip({
  canon,
  statusByKey,
  currentStepKey,
  onSelect,
}: Pick<ThreeSixtyRoadmapProps, "canon" | "statusByKey" | "currentStepKey" | "onSelect">) {
  return (
    <div className="tsr-strip" role="list" aria-label="The 360 Method, nine steps">
      {canon.phases.map((phase) => (
        <div key={phase.id} className="tsr-strip-group">
          <span className="tsr-strip-label">{phase.name}</span>
          {phase.steps.map((step) => {
            const status = statusByKey?.[step.key];
            const current = step.key === currentStepKey;
            const style: CSSProperties = status
              ? { background: STATUS_FILL[status].bg, color: STATUS_FILL[status].fg }
              : { background: phase.tone.wash, color: phase.tone.accent, borderColor: phase.tone.accent };
            const cls = `tsr-dot${current ? " tsr-dot-current" : ""}`;
            const aria = `Step ${step.number}, ${step.name}${status ? `, ${STATUS_FILL[status].label}` : ""}${current ? ", you are here" : ""}`;
            return onSelect ? (
              <button key={step.key} type="button" className={cls} style={style} onClick={() => onSelect(step.key)} aria-label={aria} title={step.name} role="listitem">
                {step.number}
              </button>
            ) : (
              <span key={step.key} className={cls} style={style} aria-label={aria} title={step.name} role="listitem">
                {step.number}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** The nine steps as text, visually hidden: screen readers and crawlers read the same canon the picture shows. */
function TextVersion({ canon }: { canon: RoadmapData }) {
  return (
    <div className="tsr-sr">
      <p>
        {canon.title}. {canon.subtitle}
      </p>
      {canon.phases.map((phase) => (
        <div key={phase.id}>
          <p>
            {phase.label} ({phase.subtitle})
          </p>
          <ul>
            {phase.steps.map((step) => (
              <li key={step.key}>
                Step {step.number}: {step.name}. {step.line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function ThreeSixtyRoadmap({
  canon,
  variant = "full",
  statusByKey,
  currentStepKey = null,
  onSelect,
  footnote = false,
  tone = "light",
  className,
  label,
  src,
}: ThreeSixtyRoadmapProps) {
  const root = `tsr tsr-${variant}${tone === "dark" ? " tsr-dark" : ""}${className ? ` ${className}` : ""}`;

  if (variant === "strip") {
    return (
      <div className={root}>
        <style>{THREE_SIXTY_ROADMAP_CSS}</style>
        <Strip canon={canon} statusByKey={statusByKey} currentStepKey={currentStepKey} onSelect={onSelect} />
      </div>
    );
  }

  const compact = variant === "compact";
  const aboutOneHome = !!statusByKey || !!currentStepKey || !!onSelect;
  const current = currentStepKey ? canon.phases.flatMap((p) => p.steps).find((s) => s.key === currentStepKey) ?? null : null;
  const picture = src ?? canon.image;

  return (
    <figure className={root} style={{ margin: 0 }} aria-label={label ?? canon.title}>
      <style>{THREE_SIXTY_ROADMAP_CSS}</style>
      <a className="tsr-pic-link" href={canon.image} target="_blank" rel="noreferrer" aria-label={`${canon.title}. Opens the full-size picture in a new tab.`}>
        <img className="tsr-pic" src={picture} alt={canon.imageAlt} width={2000} height={1096} loading="lazy" decoding="async" />
      </a>
      <TextVersion canon={canon} />
      {compact && <p className="tsr-hint">Tap the picture to open it full size.</p>}
      {aboutOneHome && (
        <div className="tsr-under">
          <Strip canon={canon} statusByKey={statusByKey} currentStepKey={currentStepKey} onSelect={onSelect} />
          {current && (
            <p className="tsr-here-line">
              You are here: Step {current.number}, {current.name}.
            </p>
          )}
        </div>
      )}
      {footnote && <figcaption className="tsr-foot">{canon.footnote}</figcaption>}
    </figure>
  );
}
