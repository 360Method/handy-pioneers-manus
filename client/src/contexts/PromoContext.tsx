/**
 * PromoContext - fetches the one active seasonal offer from the estimator
 * backend once on boot and shares it site-wide. Read-only and null-safe: if the
 * endpoint is unreachable or there's no promo, the site simply shows no banner
 * (it never blocks rendering). The backend already clamps every offer to a safe
 * margin and strips cost/margin, so this only ever sees customer-safe fields.
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiBase } from "@/lib/api";

export interface ActivePromo {
  active: true;
  mechanic: "percent_off" | "bundle_save" | "free_addon" | "dollar_threshold";
  /** Marketing headline, e.g. "Summer-Ready: 10% off any job this month". */
  headline: string;
  /** Short label, e.g. "10% off" / "Free gutter check" / "$50 off $500+". */
  valueLabel: string;
  endsAt: string | null;
}

interface PromoContextType {
  promo: ActivePromo | null;
  loading: boolean;
}

const PromoContext = createContext<PromoContextType>({ promo: null, loading: true });

export function PromoProvider({ children }: { children: React.ReactNode }) {
  const [promo, setPromo] = useState<ActivePromo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${getApiBase()}/api/public/active-promo`);
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!cancelled) setPromo(data && data.active ? (data as ActivePromo) : null);
      } catch {
        if (!cancelled) setPromo(null); // unreachable = no banner, never an error
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <PromoContext.Provider value={{ promo, loading }}>{children}</PromoContext.Provider>;
}

export function usePromo() {
  return useContext(PromoContext);
}
