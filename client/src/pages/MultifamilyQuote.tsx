/**
 * MultifamilyQuote.tsx - /multifamily/quote (Step 2 of the landlord custom-quote funnel)
 *
 * Reached from LandlordQuoteForm (Step 1). Reads the stashed context and shows
 * the questions tailored to the situation:
 *   - kind="portfolio"      → multi-property landlord: how many properties, types,
 *                             total units, area, phone.
 *   - kind="building5plus"  → one building with 5+ units: unit count, occupancy,
 *                             address, phone.
 * Enriches the Step-1 lead via /api/public/inquiry/details (tailored answers packed
 * into notes, a backend-safe existing field), then shows an inline thank-you.
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getApiBase, isStagingHost } from "@/lib/api";

interface Stash {
  leadId?: string;
  customerId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  kind?: "portfolio" | "building5plus";
  units?: number | null;
  properties?: number | null;
  sqft?: number | null;
  serviceType?: string;
}

const PREVIEW_STASH: Stash = {
  leadId: "preview",
  customerId: "preview",
  firstName: "Preview",
  lastName: "Visitor",
  email: "preview@example.com",
  kind: "portfolio",
  units: 6,
  properties: 3,
  sqft: 4000,
  serviceType: "360° Landlord Portfolio Plan",
};

const PROPERTY_TYPE_OPTIONS = [
  "Single-family",
  "Duplex",
  "Triplex",
  "Fourplex",
  "5+ unit building",
];

export default function MultifamilyQuote() {
  const [, navigate] = useLocation();
  const [stash, setStash] = useState<Stash>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    phone: "",
    propertyCount: "",
    types: [] as string[],
    totalUnits: "",
    unitCount: "",
    occupiedUnits: "",
    street: "",
    city: "",
    zip: "",
    notes: "",
  });

  const isPortfolio = stash.kind === "portfolio";

  useEffect(() => {
    document.title = "Your Quote - 360° Method for Landlords | Handy Pioneers";
    window.scrollTo(0, 0);
    try {
      const raw = sessionStorage.getItem("hp_landlord_quote");
      if (!raw) {
        if (isStagingHost()) {
          setStash(PREVIEW_STASH);
          return;
        }
        navigate("/multifamily");
        return;
      }
      const s = JSON.parse(raw) as Stash;
      setStash(s);
      // Prefill what they already told us on the page.
      setForm((f) => ({
        ...f,
        propertyCount: s.properties ? String(s.properties) : "",
        unitCount: s.units ? String(s.units) : "",
      }));
    } catch {
      navigate("/multifamily");
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleType = (t: string) =>
    setForm((prev) => ({
      ...prev,
      types: prev.types.includes(t)
        ? prev.types.filter((x) => x !== t)
        : [...prev.types, t],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.phone.trim()) {
      setError("Please add a phone number so we can reach you.");
      return;
    }

    // Pack the tailored answers into a single notes string (backend-safe; the
    // details endpoint already stores notes). The team reads it on the lead.
    const noteLines = isPortfolio
      ? [
          `LANDLORD PORTFOLIO QUOTE`,
          `Properties: ${form.propertyCount || stash.properties || "?"}`,
          `Property types: ${form.types.length ? form.types.join(", ") : "not specified"}`,
          `Approx. total units: ${form.totalUnits || "?"}`,
          `Primary area/city: ${form.city || "?"}`,
          `Phone: ${form.phone}`,
          form.notes ? `Notes: ${form.notes}` : "",
        ]
      : [
          `LANDLORD 5+ UNIT BUILDING QUOTE`,
          `Units: ${form.unitCount || stash.units || "?"}`,
          `Occupied units: ${form.occupiedUnits || "?"}`,
          `Address: ${[form.street, form.city, form.zip].filter(Boolean).join(", ") || "?"}`,
          `Phone: ${form.phone}`,
          form.notes ? `Notes: ${form.notes}` : "",
        ];
    const notes = noteLines.filter(Boolean).join("\n");

    setSubmitting(true);
    try {
      const res = await fetch(`${getApiBase()}/api/public/inquiry/details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: stash.customerId,
          leadId: stash.leadId,
          street: form.street.trim(),
          city: form.city.trim(),
          state: "WA",
          zip: form.zip.trim(),
          sqft: stash.sqft ? String(stash.sqft) : "",
          notes,
          funnel: "landlord_quote",
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error ?? "Something went wrong. Please try again.");
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      if (isStagingHost()) {
        setDone(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all";
  const inputStyle = {
    border: "1px solid oklch(85% 0.02 80)",
    background: "white",
    color: "oklch(22% 0.07 155)",
  } as const;
  const labelClass = "block text-xs font-semibold uppercase tracking-wide mb-1";
  const labelStyle = { color: "oklch(45% 0.02 60)" } as const;

  return (
    <div className="min-h-screen font-sans" style={{ background: "oklch(96% 0.015 80)" }}>
      <Navbar />

      <section className="text-white pt-16 pb-10 px-4" style={{ background: "oklch(22% 0.07 155)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "oklch(78% 0.13 78)" }}>
            Step 2 of 2 · {isPortfolio ? "Your portfolio" : "Your building"}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-black leading-tight">
            {stash.firstName ? `Thanks, ${stash.firstName}. ` : ""}
            {isPortfolio ? "Tell us about your properties." : "Tell us about the building."}
          </h1>
          <p className="mt-3 text-sm" style={{ color: "oklch(100% 0 0 / 0.7)" }}>
            {isPortfolio
              ? "A few quick details and we'll build a single plan across your properties, then reach out within one business day."
              : "A few quick details and we'll price the building per unit, then reach out within one business day."}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <div
              className="rounded-2xl p-10 border text-center"
              style={{ backgroundColor: "oklch(0.97 0.04 65)", borderColor: "oklch(0.85 0.10 65)" }}
            >
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "oklch(0.55 0.14 65)" }} />
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
              >
                Thank You - We're On It
              </h3>
              <p className="text-base mx-auto" style={{ color: "oklch(0.35 0.02 80)", maxWidth: "520px" }}>
                {isPortfolio
                  ? "Your details are in. We'll put together a portfolio plan across your properties and reach out within one business day to walk you through it."
                  : "Your details are in. We'll price the building per unit and reach out within one business day with your custom quote."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl p-6 sm:p-8 space-y-5"
              style={{ background: "white", border: "1px solid oklch(88% 0.02 80)", boxShadow: "0 6px 24px oklch(0% 0 0 / 0.06)" }}
              noValidate
            >
              {isPortfolio ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={labelStyle} htmlFor="mq-propertyCount">How many properties?</label>
                      <input id="mq-propertyCount" name="propertyCount" type="text" inputMode="numeric" placeholder="3" value={form.propertyCount} onChange={handleChange} className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle} htmlFor="mq-totalUnits">Approx. total units (all properties)</label>
                      <input id="mq-totalUnits" name="totalUnits" type="text" inputMode="numeric" placeholder="8" value={form.totalUnits} onChange={handleChange} className={inputClass} style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <span className={labelClass} style={labelStyle}>What types? (select all that apply)</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {PROPERTY_TYPE_OPTIONS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleType(t)}
                          className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                          style={
                            form.types.includes(t)
                              ? { background: "oklch(22% 0.07 155)", color: "white", border: "1px solid oklch(22% 0.07 155)" }
                              : { background: "white", color: "oklch(30% 0.04 155)", border: "1px solid oklch(85% 0.02 80)" }
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle} htmlFor="mq-city">Primary city / area</label>
                    <input id="mq-city" name="city" type="text" autoComplete="address-level2" placeholder="Vancouver, WA" value={form.city} onChange={handleChange} className={inputClass} style={inputStyle} />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={labelStyle} htmlFor="mq-unitCount">How many units?</label>
                      <input id="mq-unitCount" name="unitCount" type="text" inputMode="numeric" placeholder="6" value={form.unitCount} onChange={handleChange} className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle} htmlFor="mq-occupied">How many are occupied?</label>
                      <input id="mq-occupied" name="occupiedUnits" type="text" inputMode="numeric" placeholder="5" value={form.occupiedUnits} onChange={handleChange} className={inputClass} style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={labelStyle} htmlFor="mq-street">Building address</label>
                    <input id="mq-street" name="street" type="text" autoComplete="address-line1" placeholder="123 NE Main St" value={form.street} onChange={handleChange} className={inputClass} style={inputStyle} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={labelStyle} htmlFor="mq-city2">City</label>
                      <input id="mq-city2" name="city" type="text" autoComplete="address-level2" placeholder="Vancouver" value={form.city} onChange={handleChange} className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle} htmlFor="mq-zip">ZIP</label>
                      <input id="mq-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" placeholder="98661" value={form.zip} onChange={handleChange} className={inputClass} style={inputStyle} />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className={labelClass} style={labelStyle} htmlFor="mq-phone">Best phone to reach you</label>
                <input id="mq-phone" name="phone" type="tel" autoComplete="tel" placeholder="(360) 555-0100" value={form.phone} onChange={handleChange} className={inputClass} style={inputStyle} required />
              </div>
              <div>
                <label className={labelClass} style={labelStyle} htmlFor="mq-notes">Anything we should know? (optional)</label>
                <textarea id="mq-notes" name="notes" rows={3} placeholder={isPortfolio ? "Goals for the portfolio, turnover volume, best times to reach you…" : "Shared systems, recent issues, best times to reach you…"} value={form.notes} onChange={handleChange} className={inputClass} style={inputStyle} />
              </div>

              {error && <p className="text-sm font-medium" style={{ color: "oklch(55% 0.18 25)" }}>{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-md font-bold text-sm uppercase tracking-wide transition-all text-white disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "oklch(22% 0.07 155)" }}
              >
                {submitting ? "Sending…" : isPortfolio ? "Get My Portfolio Plan →" : "Get My Custom Quote →"}
              </button>
              <p className="text-center text-xs" style={{ color: "oklch(60% 0.02 60)" }}>
                We'll reach out within one business day. No commitment.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
