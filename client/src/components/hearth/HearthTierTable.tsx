/**
 * "What an average project costs per month, by finish level."
 *
 * A homeowner picking between Good and Premium is really asking what the
 * difference costs them each month, not in total. This table answers that
 * directly: the average project at each material tier, and its payment over
 * Hearth's 12-year term.
 *
 * Every figure derives from the published presets in lib/remodelCost.ts
 * (averageProjectCost = the midpoint of that tier's band at the typical project
 * size), so there is no second set of numbers to maintain and nothing can drift
 * from the ranges shown elsewhere on the page.
 *
 * Reg Z: the payments are stated terms, so HearthPaymentExample renders under the
 * table, on the same screen, carrying the term, the APR, and the full ranges.
 * Rows above Hearth's cap say so rather than printing a broken figure.
 */
import { HEARTH_ENABLED } from "@/lib/hearth";
import {
  HEARTH_MAX_LOAN,
  HEARTH_PAYMENTS_ENABLED,
  monthlyPaymentFrom,
} from "@/lib/hearthPayments";
import {
  averageProjectCost,
  formatUSD,
  FINISH_LEVELS,
  LEVEL_LABELS,
  type CostPreset,
} from "@/lib/remodelCost";
import { HearthPaymentExample } from "@/components/hearth/HearthPaymentLine";

const GREEN = "oklch(0.22 0.07 160)";
const MUTED = "oklch(0.50 0.02 160)";
const BORDER = "oklch(0.85 0.03 160)";

export default function HearthTierTable({
  preset,
  className = "",
}: {
  preset: CostPreset;
  className?: string;
}) {
  if (!HEARTH_ENABLED || !HEARTH_PAYMENTS_ENABLED) return null;

  const unit = preset.unitLabel ?? "sq ft";

  return (
    <div className={className}>
      <p className="text-sm font-semibold mb-1" style={{ color: GREEN }}>
        Average {preset.label.toLowerCase()} by finish level, per month
      </p>
      <p className="text-xs leading-relaxed mb-3" style={{ color: MUTED }}>
        An average project at {preset.avgSqft.toLocaleString("en-US")} {unit},
        spread over Hearth's longest term with nothing out of pocket up front.
      </p>

      {/* Wide content scrolls inside its own container, never the page. */}
      <div className="overflow-x-auto">
        <table
          className="w-full text-sm"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          <thead>
            <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
              <th className="py-2 pr-3 text-left font-semibold" style={{ color: MUTED }}>
                Finish level
              </th>
              <th className="py-2 pr-3 text-right font-semibold" style={{ color: MUTED }}>
                Average project
              </th>
              <th className="py-2 text-right font-semibold" style={{ color: MUTED }}>
                Per month
              </th>
            </tr>
          </thead>
          <tbody>
            {FINISH_LEVELS.map((level) => {
              const avg = averageProjectCost(preset, level);
              const payment = monthlyPaymentFrom(avg);
              return (
                <tr key={level} style={{ borderTop: `1px solid ${BORDER}` }}>
                  <td className="py-2 pr-3" style={{ color: GREEN }}>
                    {LEVEL_LABELS[level]}
                  </td>
                  <td className="py-2 pr-3 text-right whitespace-nowrap" style={{ color: MUTED }}>
                    {formatUSD(avg)}
                  </td>
                  <td
                    className="py-2 text-right whitespace-nowrap font-bold"
                    style={{ color: GREEN }}
                  >
                    {payment === null ? (
                      <span className="font-normal" style={{ color: MUTED }}>
                        over the {formatUSD(HEARTH_MAX_LOAN)} limit
                      </span>
                    ) : (
                      `${formatUSD(payment)}/mo`
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <HearthPaymentExample className="mt-3" />
    </div>
  );
}
