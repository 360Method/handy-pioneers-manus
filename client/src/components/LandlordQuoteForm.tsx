/**
 * LandlordQuoteForm - Step 1 of the landlord custom-quote funnel.
 *
 * Used for the two situations that can't be flat-priced on the page: a single
 * building with 5+ units, and a multi-property portfolio. Collects only the
 * basics (first name, last name, email) so there's almost no friction, creates
 * the lead in the HP Estimator CRM tagged for what it is, stashes the context,
 * then advances to /multifamily/quote (Step 2) where the tailored questions live.
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { getApiBase, isStagingHost } from "@/lib/api";
import { track } from "@/lib/analytics";

interface Props {
  kind?: "portfolio" | "building5plus";
  units?: number;
  properties?: number;
  sqft?: number;
  source?: string;
  serviceType?: string;
}

export default function LandlordQuoteForm({
  kind = "building5plus",
  units,
  properties,
  sqft,
  source,
  serviceType,
}: Props) {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const proceed = (leadId: string, customerId: string) => {
    sessionStorage.setItem(
      "hp_landlord_quote",
      JSON.stringify({
        leadId,
        customerId,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        kind,
        units: units ?? null,
        properties: properties ?? null,
        sqft: sqft ?? null,
        serviceType: serviceType ?? "360° Landlord Plan",
      })
    );
    track("generate_lead", { funnel: "landlord_quote", lead_type: kind });
    navigate("/multifamily/quote");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Step 1 is intentionally light: name + email only. We already hold the email
    // for a drip if they don't finish, and phone + consent come on Step 2.
    if (!form.firstName || !form.email) {
      setError("Please add your first name and email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${getApiBase()}/api/public/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          serviceType: serviceType ?? "360° Landlord Plan",
          source: source ?? "multifamily-quote-step1",
          funnel: "landlord_quote",
          state: "WA",
          timeline: "Flexible",
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error ?? "Something went wrong. Please try again.");
      }
      const data = await res.json();
      proceed(data.leadId, data.customerId);
    } catch (err: any) {
      // On staging the backend may be down - let reviewers walk the flow anyway.
      if (isStagingHost()) {
        proceed("preview", "preview");
        return;
      }
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-amber-500/60";
  const labelClass = "block text-xs font-semibold uppercase tracking-wide mb-1 text-gray-600";

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="lq-firstName">First Name</label>
          <input id="lq-firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Jane" value={form.firstName} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="lq-lastName">Last Name</label>
          <input id="lq-lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Smith" value={form.lastName} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="lq-email">Email</label>
        <input id="lq-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
      </div>
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
      <button type="submit" disabled={submitting} className="hcp-button w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? "One moment…" : "Continue →"}
      </button>
      <p className="text-xs text-center text-gray-400">
        No commitment. Next: a few quick details about{" "}
        {kind === "portfolio" ? "your properties" : "the building"}.
      </p>
    </form>
  );
}
