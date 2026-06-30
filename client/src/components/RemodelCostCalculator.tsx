/**
 * RemodelCostCalculator - the public investment-range tool.
 *
 * Pick a project, slide the size, pick a finish level, and see an honest retail
 * investment band update live. Every number comes from client/src/lib/remodelCost.ts
 * (the RETAIL presets ported from the estimator). No cost, hours, or margin is
 * ever shown. The band is a starting point; the booking CTA gets the homeowner a
 * real number from a walkthrough.
 *
 * Used standalone on /remodel-cost and embedded (locked to one project) on the
 * service pages.
 */

import { useMemo, useState } from "react";
import {
  PRESETS,
  getPreset,
  presetsByCategory,
  estimate,
  highLevelBand,
  formatBand,
  FINISH_LEVELS,
  LEVEL_LABELS,
  type FinishLevel,
  type CostCategory,
} from "@/lib/remodelCost";
import { openInquiry } from "@/lib/inquiry";

const GREEN = "oklch(0.22 0.07 160)";
const GREEN_SOFT = "oklch(0.30 0.05 160)";
const GOLD = "oklch(0.65 0.14 65)";
const BORDER = "oklch(0.88 0.015 80)";
const INK = "oklch(0.34 0.02 80)";
const MUTED = "oklch(0.50 0.02 80)";

export default function RemodelCostCalculator({
  defaultPresetKey,
  lockProject = false,
  category,
}: {
  defaultPresetKey?: string;
  lockProject?: boolean;
  /** When set (and not locked), the project picker only shows this category. */
  category?: CostCategory;
}) {
  const available = category ? presetsByCategory(category) : PRESETS;
  const initial = (defaultPresetKey && getPreset(defaultPresetKey)) || available[0] || PRESETS[0];
  const [presetKey, setPresetKey] = useState(initial.key);
  const preset = getPreset(presetKey) || PRESETS[0];
  const [sqft, setSqft] = useState(initial.avgSqft);
  const [level, setLevel] = useState<FinishLevel>("better");

  const step = preset.sizeStep ?? (preset.maxSqft > 1200 ? 50 : preset.maxSqft > 500 ? 25 : 5);
  const unit = preset.unitLabel ?? "sq ft";
  const band = useMemo(() => estimate(preset, sqft, level), [preset, sqft, level]);

  function switchProject(key: string) {
    const next = getPreset(key);
    if (!next) return;
    setPresetKey(key);
    setSqft(next.avgSqft);
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "oklch(1 0 0)", border: `1px solid ${BORDER}` }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-5" style={{ backgroundColor: GREEN }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>
          Investment estimator
        </p>
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          {lockProject ? preset.label : "Estimate your project"}
        </h3>
        <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
          A realistic, honest range. Slide and choose to see how scope moves the number.
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Project */}
        {!lockProject && (
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: GREEN }}>
              What are you planning?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {available.map((p) => {
                const on = p.key === presetKey;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => switchProject(p.key)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-left transition-colors"
                    style={{
                      border: `1px solid ${on ? GREEN : BORDER}`,
                      backgroundColor: on ? GREEN : "oklch(0.99 0.005 80)",
                      color: on ? "#fff" : INK,
                    }}
                  >
                    {p.label.replace("Full ", "").replace(" replacement", "")}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="size-slider" className="text-sm font-semibold" style={{ color: GREEN }}>
              {preset.sizeQuestion ?? "How big is the space?"}
            </label>
            <span className="text-sm font-bold" style={{ color: GREEN }}>
              {sqft.toLocaleString("en-US")} {unit}
            </span>
          </div>
          <input
            id="size-slider"
            type="range"
            min={preset.minSqft}
            max={preset.maxSqft}
            step={step}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "oklch(0.45 0.12 160)" }}
          />
          <p className="mt-1.5 text-xs" style={{ color: MUTED }}>
            {preset.sizeHelp}
          </p>
        </div>

        {/* Finish level */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: GREEN }}>
            What level of finish?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {FINISH_LEVELS.map((lv) => {
              const on = lv === level;
              return (
                <button
                  key={lv}
                  type="button"
                  onClick={() => setLevel(lv)}
                  className="py-2 rounded-lg text-sm font-semibold transition-colors"
                  style={{
                    border: `1px solid ${on ? GOLD : BORDER}`,
                    backgroundColor: on ? "oklch(0.96 0.05 75)" : "oklch(0.99 0.005 80)",
                    color: on ? GREEN : INK,
                  }}
                >
                  {LEVEL_LABELS[lv]}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs leading-relaxed" style={{ color: MUTED }}>
            {preset.rates[level].desc}
          </p>
        </div>

        {/* Output */}
        <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "oklch(0.95 0.02 160)", border: `1px solid oklch(0.85 0.03 160)` }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: GREEN_SOFT }}>
            Estimated investment
          </p>
          <p className="text-3xl font-bold" style={{ color: GREEN, fontFamily: "'Playfair Display', serif" }}>
            {formatBand(band)}
          </p>
          <p className="mt-2 text-xs leading-relaxed" style={{ color: GREEN_SOFT }}>
            A planning range for a {preset.label.toLowerCase()} at {sqft.toLocaleString("en-US")} {unit}.
            Final materials, any structural work, and site conditions are set on a walkthrough, so a
            detailed estimate can land higher.
          </p>
        </div>

        {/* Honest note + CTA */}
        <div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: INK }}>
            Your real number comes from a walkthrough, not a slider. We measure the space, look at what
            is behind the walls, and put a written scope in front of you before anything is torn out.
            This is the Upgrade stage of the 360 Method: we are not here to move one project off the
            list, we are your partner in growing the home's value and getting you where you want to be.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="hcp-button"
              onClick={() =>
                openInquiry({ mode: "project", sqft, serviceType: preset.label })
              }
            >
              Get my real number
            </button>
            <a
              href="tel:+13608386731"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border font-semibold text-sm transition-opacity hover:opacity-80"
              style={{ borderColor: BORDER, color: GREEN }}
            >
              Call (360) 838-6731
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Compact, read-only band line, for the top of a service page. */
export function CostBandLine({ presetKey }: { presetKey: string }) {
  const preset = getPreset(presetKey);
  if (!preset) return null;
  // Uses the same highLevelBand() the blog + prerender use, so nothing drifts.
  const band = highLevelBand(preset);
  return (
    <span>
      An average {preset.label.toLowerCase()} in Clark County runs roughly{" "}
      <strong>{formatBand(band, true)}</strong>, depending on size and finish.
    </span>
  );
}
