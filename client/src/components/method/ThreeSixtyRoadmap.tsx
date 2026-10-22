/**
 * COPIED FROM HP-Estimator-app by scripts/sync-360-method.mjs. Do not edit
 * here; change the source in the pro app and run the sync again.
 */
/**
 * ThreeSixtyRoadmap: the one 360 Method visual, rendered from data.
 *
 * Mirrors the published roadmap ("The 360 Method: A Roadmap to Home Ownership
 * Mastery"): a title, three phase bands, nine step cards with an icon and one
 * sentence each. Every surface that shows the method (member portal, staff
 * app, PDFs and emails through the PNG export, the website) renders THIS
 * component from THIS data shape, so the picture of the method never drifts.
 *
 * Self-contained on purpose: no app imports, its own small stylesheet, plain
 * hex tones carried in the data. The website keeps a copy of this file and
 * renders it from a copied canon.json (see scripts/generate-method-roadmap.mjs
 * and scripts/sync-360-method.mjs in the site repo). Only lucide-react is
 * shared, and both repos pin the same major.
 *
 * Variants:
 *   full     title + bands + cards with the sentence. Pages and print.
 *   compact  bands + cards with icon and name only; sentence is the tooltip.
 *            Member home, funnel, confirmation. Always three across so the
 *            3 x 3 map survives a 320px phone.
 *   strip    nine numbered dots under three phase labels, one row. Banners.
 *
 * Status tones (done / active / attention / upcoming) come from the caller
 * when the visual is about ONE home; without them the cards wear their phase
 * tone and the picture is the method itself.
 *
 * Copy rules: everything shown comes from the canon. No em or en dashes, no
 * costs, no tier codes. Safe for a customer glancing at a tech's phone.
 */
import type { CSSProperties, ReactNode } from "react";
import {
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Landmark,
  ListChecks,
  Search,
  ShieldCheck,
  TrendingUp,
  Wrench,
} from "lucide-react";

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
  /** Root-relative (or data) URL of the step's picture; shown on the full variant. */
  image?: string;
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
  /** Makes every card or dot a button. */
  onSelect?: (stepKey: string) => void;
  /** full only: show the title block. Default true. */
  showTitle?: boolean;
  /** Show the education footnote under the map (customer surfaces). */
  footnote?: boolean;
  /** Text color context: dark backgrounds get cream text. */
  tone?: "light" | "dark";
  className?: string;
  /** full and compact: an aria-label for the whole figure. */
  label?: string;
  /** full only: show each step's picture when the canon carries one. Default true. */
  pictures?: boolean;
}

const ICONS: Record<string, typeof Wrench> = {
  ClipboardList,
  Search,
  BarChart3,
  ListChecks,
  CalendarCheck,
  Wrench,
  ShieldCheck,
  TrendingUp,
  Landmark,
};

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
 * the same inside the app, on the website and in the headless export. Grid
 * breakpoints: three across from 640px for full; compact stays three across.
 */
export const THREE_SIXTY_ROADMAP_CSS = `
.tsr{color:${INK};font-family:inherit;line-height:1.35}
.tsr *{box-sizing:border-box}
.tsr-dark{color:${CREAM}}
.tsr-title{font-family:var(--hp-serif,"Playfair Display","Cormorant Garamond",Georgia,serif);font-weight:600;font-size:clamp(20px,4.2vw,30px);letter-spacing:-0.01em;margin:0;line-height:1.15}
.tsr-sub{margin:6px 0 0;font-size:clamp(13px,2.6vw,15px);opacity:.82}
.tsr-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:14px}
.tsr-mark{flex:0 0 auto;width:44px;height:44px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;letter-spacing:.02em;border:2px solid currentColor;opacity:.9}
.tsr-phase{margin-top:10px;border-radius:14px;overflow:hidden;border:1px solid ${HAIRLINE};background:#fff}
.tsr-band{display:flex;align-items:baseline;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:8px 14px}
.tsr-band-label{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin:0}
.tsr-band-sub{font-size:12px;font-weight:600;margin:0;opacity:.92}
.tsr-cards{display:grid;gap:10px;padding:10px}
.tsr-full .tsr-cards{grid-template-columns:1fr}
@media (min-width:640px){.tsr-full .tsr-cards{grid-template-columns:repeat(3,minmax(0,1fr))}}
.tsr-compact .tsr-cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:8px}
.tsr-card{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-align:left;padding:12px;border-radius:12px;border:1px solid ${HAIRLINE};background:#fff;color:${INK};min-width:0;width:100%;font:inherit}
.tsr-compact .tsr-card{padding:8px 6px;align-items:center;text-align:center;gap:4px}
button.tsr-card{cursor:pointer;appearance:none}
button.tsr-card:hover{box-shadow:0 2px 8px rgba(26,46,26,.08)}
button.tsr-card:focus-visible{outline:2px solid ${GOLD};outline-offset:2px}
.tsr-card-current{box-shadow:0 0 0 2px ${GOLD} inset}
.tsr-art{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:9px;background:#f1ece2;margin-bottom:2px}
.tsr-full .tsr-card-pic .tsr-icon{margin-top:-24px;margin-left:6px;box-shadow:0 0 0 3px #fff}
.tsr-icon{width:36px;height:36px;border-radius:999px;display:flex;align-items:center;justify-content:center;flex:0 0 auto}
.tsr-compact .tsr-icon{width:32px;height:32px}
.tsr-icon svg{width:18px;height:18px}
.tsr-step{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;opacity:.7;margin:0}
.tsr-name{font-size:15px;font-weight:800;margin:0;line-height:1.2;overflow-wrap:anywhere}
.tsr-compact .tsr-name{font-size:12px}
.tsr-line{font-size:13px;margin:0;opacity:.88}
.tsr-here{display:inline-block;margin-top:2px;border-radius:999px;background:${GOLD};color:#fff;font-size:10px;font-weight:800;padding:2px 8px;letter-spacing:.04em}
.tsr-compact .tsr-here{position:absolute;top:-7px;left:50%;transform:translateX(-50%);white-space:nowrap}
.tsr-foot{margin:10px 2px 0;font-size:11px;opacity:.7}
.tsr-strip{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}
.tsr-strip-group{display:flex;align-items:center;gap:4px}
.tsr-strip-label{font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin:0 2px 0 0;opacity:.75}
.tsr-dot{width:22px;height:22px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;border:1px solid transparent;font:inherit;padding:0}
button.tsr-dot{cursor:pointer;appearance:none}
.tsr-dot-current{box-shadow:0 0 0 2px ${GOLD}}
`;

function Mark() {
  return (
    <span className="tsr-mark" aria-hidden="true">
      360°
    </span>
  );
}

function iconFor(name: string) {
  return ICONS[name] ?? Wrench;
}

function cardColors(
  phase: RoadmapPhase,
  status: RoadmapStepStatus | undefined,
): { bg: string; fg: string; title: string | undefined } {
  if (status) {
    const s = STATUS_FILL[status];
    return { bg: s.bg, fg: s.fg, title: s.label };
  }
  return { bg: phase.tone.accent, fg: phase.tone.onAccent, title: undefined };
}

function Card({
  phase,
  step,
  compact,
  status,
  current,
  onSelect,
  picture,
}: {
  phase: RoadmapPhase;
  step: RoadmapStep;
  compact: boolean;
  status: RoadmapStepStatus | undefined;
  current: boolean;
  onSelect?: (key: string) => void;
  picture: boolean;
}) {
  const Icon = iconFor(step.icon);
  const c = cardColors(phase, status);
  const showArt = picture && !compact && !!step.image;
  const body: ReactNode = (
    <>
      {showArt && <img className="tsr-art" src={step.image} alt="" loading="lazy" decoding="async" />}
      <span className="tsr-icon" style={{ background: c.bg, color: c.fg }} aria-hidden="true">
        <Icon />
      </span>
      <p className="tsr-step">Step {step.number}</p>
      <p className="tsr-name">{step.name}</p>
      {!compact && <p className="tsr-line">{step.line}</p>}
      {current && <span className="tsr-here">You are here</span>}
    </>
  );
  const cls = `tsr-card${current ? " tsr-card-current" : ""}${showArt ? " tsr-card-pic" : ""}`;
  const aria = `Step ${step.number}, ${step.name}. ${step.line}${c.title ? ` ${c.title}.` : ""}`;
  if (onSelect) {
    return (
      <button type="button" className={cls} onClick={() => onSelect(step.key)} aria-label={aria} title={compact ? step.line : undefined}>
        {body}
      </button>
    );
  }
  return (
    <div className={cls} role="group" aria-label={aria} title={compact ? step.line : undefined}>
      {body}
    </div>
  );
}

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

export default function ThreeSixtyRoadmap({
  canon,
  variant = "full",
  statusByKey,
  currentStepKey = null,
  onSelect,
  showTitle = true,
  footnote = false,
  tone = "light",
  className,
  label,
  pictures = true,
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
  return (
    <figure className={root} style={{ margin: 0 }} aria-label={label ?? canon.title}>
      <style>{THREE_SIXTY_ROADMAP_CSS}</style>
      {!compact && showTitle && (
        <div className="tsr-head">
          <Mark />
          <div>
            <h2 className="tsr-title">{canon.title}</h2>
            <p className="tsr-sub">{canon.subtitle}</p>
          </div>
        </div>
      )}
      {canon.phases.map((phase) => (
        <section key={phase.id} className="tsr-phase" aria-label={`${phase.label} (${phase.subtitle})`}>
          <div className="tsr-band" style={{ background: phase.tone.accent, color: phase.tone.onAccent }}>
            <p className="tsr-band-label">{phase.label}</p>
            <p className="tsr-band-sub">{phase.subtitle}</p>
          </div>
          <div className="tsr-cards" style={{ background: phase.tone.wash }}>
            {phase.steps.map((step) => (
              <Card
                key={step.key}
                phase={phase}
                step={step}
                compact={compact}
                status={statusByKey?.[step.key]}
                current={step.key === currentStepKey}
                onSelect={onSelect}
                picture={pictures}
              />
            ))}
          </div>
        </section>
      ))}
      {footnote && <figcaption className="tsr-foot">{canon.footnote}</figcaption>}
    </figure>
  );
}
