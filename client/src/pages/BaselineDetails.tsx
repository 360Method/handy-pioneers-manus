/**
 * BaselineDetails.tsx — /baseline/details (Step 2 of the baseline funnel)
 * Captures the home's address + a few details and enriches the Step-1 lead.
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getApiBase, isStagingHost } from "@/lib/api";

// Review-only placeholder so the page renders on direct navigation on staging.
const PREVIEW_STASH: Stash = {
  leadId: "preview",
  customerId: "preview",
  firstName: "Preview",
  lastName: "Visitor",
  phone: "(360) 555-0100",
  email: "preview@example.com",
  tier: "silver",
  sqft: 2400,
};

interface Stash {
  leadId?: string;
  customerId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  tier?: string;
  sqft?: number | null;
}

export default function BaselineDetails() {
  const [, navigate] = useLocation();
  const [stash, setStash] = useState<Stash>({});
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "WA",
    zip: "",
    sqft: "",
    yearBuilt: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Your Home — Baseline Walkthrough | Handy Pioneers";
    window.scrollTo(0, 0);
    try {
      const raw = sessionStorage.getItem("hp_baseline");
      if (!raw) {
        if (isStagingHost()) {
          setStash(PREVIEW_STASH);
          setForm((f) => ({ ...f, sqft: String(PREVIEW_STASH.sqft) }));
          return;
        }
        navigate("/membership");
        return;
      }
      const s = JSON.parse(raw) as Stash;
      setStash(s);
      if (s.sqft) setForm((f) => ({ ...f, sqft: String(s.sqft) }));
    } catch {
      navigate("/membership");
    }
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.street || !form.city || !form.zip) {
      setError("Please add your street, city, and ZIP.");
      return;
    }
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
          state: form.state.trim(),
          zip: form.zip.trim(),
          sqft: form.sqft.trim(),
          yearBuilt: form.yearBuilt.trim(),
          notes: form.notes.trim(),
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error ?? "Something went wrong. Please try again.");
      }
      // Carry the address forward for the upsell checkout.
      sessionStorage.setItem("hp_baseline", JSON.stringify({ ...stash, ...form }));
      navigate("/baseline/offer");
    } catch (err: any) {
      // On staging the backend may be down — let reviewers walk the flow anyway.
      if (isStagingHost()) {
        sessionStorage.setItem("hp_baseline", JSON.stringify({ ...stash, ...form }));
        navigate("/baseline/offer");
        return;
      }
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all";
  const inputStyle = { border: "1px solid oklch(85% 0.02 80)", background: "white", color: "oklch(22% 0.07 155)" } as const;
  const labelClass = "block text-xs font-semibold uppercase tracking-wide mb-1";
  const labelStyle = { color: "oklch(45% 0.02 60)" } as const;

  return (
    <div className="min-h-screen font-sans" style={{ background: "oklch(96% 0.015 80)" }}>
      <Navbar />

      <section className="text-white pt-16 pb-10 px-4" style={{ background: "oklch(22% 0.07 155)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "oklch(78% 0.13 78)" }}>
            Step 2 of 3 · Your home
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-black leading-tight">
            {stash.firstName ? `Thanks, ${stash.firstName}. ` : ""}Tell us about your home.
          </h1>
          <p className="mt-3 text-sm" style={{ color: "oklch(100% 0 0 / 0.7)" }}>
            This is where your baseline walkthrough will happen. We'll reach out within one business
            day to put it on the calendar.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl p-6 sm:p-8 space-y-5"
            style={{ background: "white", border: "1px solid oklch(88% 0.02 80)", boxShadow: "0 6px 24px oklch(0% 0 0 / 0.06)" }}
            noValidate
          >
            <div>
              <label className={labelClass} style={labelStyle} htmlFor="bd-street">Street Address</label>
              <input id="bd-street" name="street" type="text" autoComplete="address-line1" placeholder="123 NE Main St" value={form.street} onChange={handleChange} className={inputClass} style={inputStyle} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className={labelClass} style={labelStyle} htmlFor="bd-city">City</label>
                <input id="bd-city" name="city" type="text" autoComplete="address-level2" placeholder="Vancouver" value={form.city} onChange={handleChange} className={inputClass} style={inputStyle} required />
              </div>
              <div>
                <label className={labelClass} style={labelStyle} htmlFor="bd-state">State</label>
                <input id="bd-state" name="state" type="text" autoComplete="address-level1" value={form.state} onChange={handleChange} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass} style={labelStyle} htmlFor="bd-zip">ZIP</label>
                <input id="bd-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" placeholder="98661" value={form.zip} onChange={handleChange} className={inputClass} style={inputStyle} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle} htmlFor="bd-sqft">Approx. Square Footage</label>
                <input id="bd-sqft" name="sqft" type="text" inputMode="numeric" placeholder="2,400" value={form.sqft} onChange={handleChange} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass} style={labelStyle} htmlFor="bd-year">Year Built (if known)</label>
                <input id="bd-year" name="yearBuilt" type="text" inputMode="numeric" placeholder="1998" value={form.yearBuilt} onChange={handleChange} className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle} htmlFor="bd-notes">Anything we should know? (optional)</label>
              <textarea id="bd-notes" name="notes" rows={3} placeholder="Gate code, a system you're concerned about, best times to reach you…" value={form.notes} onChange={handleChange} className={inputClass} style={inputStyle} />
            </div>

            {error && <p className="text-sm font-medium" style={{ color: "oklch(55% 0.18 25)" }}>{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-md font-bold text-sm uppercase tracking-wide transition-all text-white disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "oklch(22% 0.07 155)" }}
            >
              {submitting ? "Saving…" : "Continue →"}
            </button>
            <p className="text-center text-xs" style={{ color: "oklch(60% 0.02 60)" }}>
              Your details are saved to your record. One more step.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
