import type { BillingCadence } from "@/lib/tiers";
import { CADENCE_LABELS } from "@/lib/tiers";

interface Props {
  value: BillingCadence;
  onChange: (cadence: BillingCadence) => void;
}

export default function CadenceToggle({ value, onChange }: Props) {
  return (
    <div className="flex justify-center mb-10">
      <div
        className="inline-flex rounded-lg p-1 gap-1"
        style={{ background: "oklch(92% 0.02 78)" }}
      >
        {(["monthly", "quarterly", "annual"] as BillingCadence[]).map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="px-4 py-2 rounded-md text-sm font-semibold transition-all flex flex-col items-center leading-tight"
            style={
              value === c
                ? {
                    background: "oklch(100% 0 0)",
                    color: "oklch(22% 0.07 155)",
                    boxShadow: "0 1px 4px oklch(0% 0 0 / 0.1)",
                  }
                : { color: "oklch(50% 0.02 60)" }
            }
          >
            <span>{CADENCE_LABELS[c]}</span>
            {c === "quarterly" && (
              <span
                className="text-xs font-bold"
                style={{
                  color:
                    value === c
                      ? "oklch(40% 0.12 145)"
                      : "oklch(55% 0.12 145)",
                }}
              >
                Save ~5%
              </span>
            )}
            {c === "annual" && (
              <span
                className="text-xs font-bold"
                style={{
                  color:
                    value === c
                      ? "oklch(40% 0.12 145)"
                      : "oklch(55% 0.12 145)",
                }}
              >
                Save ~17%
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
