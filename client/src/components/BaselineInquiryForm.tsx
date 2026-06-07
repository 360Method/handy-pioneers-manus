/**
 * BaselineInquiryForm - Step 1 of the baseline-walkthrough funnel.
 *
 * Captures basics only (first/last name, phone, email), saves the lead to the HP
 * Estimator CRM with funnel "baseline_walkthrough", stashes the returned ids + the
 * chosen tier/size in sessionStorage, then advances to Step 2 (/baseline/details).
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { getApiBase, isStagingHost } from "@/lib/api";

interface Props {
  tier?: string;
  sqft?: number;
}

export default function BaselineInquiryForm({ tier, sqft }: Props) {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const proceed = (leadId: string, customerId: string) => {
    sessionStorage.setItem(
      "hp_baseline",
      JSON.stringify({
        leadId,
        customerId,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        tier: tier ?? "silver",
        sqft: sqft ?? null,
      })
    );
    navigate("/baseline/details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.firstName || !form.phone || !form.email) {
      setError("Please add your name, phone, and email.");
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
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          serviceType: "360° Baseline Walkthrough",
          source: "baseline-funnel-step1",
          funnel: "baseline_walkthrough",
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
          <label className={labelClass} htmlFor="bw-firstName">First Name</label>
          <input id="bw-firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Jane" value={form.firstName} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="bw-lastName">Last Name</label>
          <input id="bw-lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Smith" value={form.lastName} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="bw-phone">Phone</label>
        <input id="bw-phone" name="phone" type="tel" autoComplete="tel" placeholder="(360) 555-0100" value={form.phone} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label className={labelClass} htmlFor="bw-email">Email</label>
        <input id="bw-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
      </div>
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
      <button type="submit" disabled={submitting} className="hcp-button w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? "One moment…" : "Continue →"}
      </button>
      <p className="text-xs text-center text-gray-400">No commitment. Next: a few quick details about your home.</p>
    </form>
  );
}
