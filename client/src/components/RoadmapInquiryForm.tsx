/**
 * RoadmapInquiryForm - Step 1 of the roadmap-generator funnel.
 *
 * Captures basics only (first/last name, phone, email + SMS consent), saves the
 * lead to the HP Estimator CRM with funnel "roadmap_generator" (this is the
 * dropout-drip anchor - the backend schedules the recovery cadence here),
 * stashes the returned ids in sessionStorage, then advances to Step 2
 * (/roadmap/details).
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { getApiBase, isStagingHost } from "@/lib/api";
import { track } from "@/lib/analytics";

export default function RoadmapInquiryForm() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "" });
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const proceed = (leadId: string, customerId: string) => {
    sessionStorage.setItem(
      "hp_roadmap",
      JSON.stringify({
        leadId,
        customerId,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        smsConsent,
      })
    );
    track("generate_lead", { funnel: "roadmap_generator", lead_type: "roadmap" });
    navigate("/roadmap/details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // The report-submit endpoint requires a last name, so collect it up front.
    if (!form.firstName || !form.lastName || !form.phone || !form.email) {
      setError("Please add your full name, phone, and email.");
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
          serviceType: "360° Roadmap",
          source: "roadmap-funnel-step1",
          funnel: "roadmap_generator",
          state: "WA",
          timeline: "Flexible",
          smsConsent,
          partnerRef: sessionStorage.getItem("hp_roadmap_ref") ?? undefined,
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
          <label className={labelClass} htmlFor="rm-firstName">First Name</label>
          <input id="rm-firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Jane" value={form.firstName} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="rm-lastName">Last Name</label>
          <input id="rm-lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Smith" value={form.lastName} onChange={handleChange} className={inputClass} required />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="rm-phone">Phone</label>
        <input id="rm-phone" name="phone" type="tel" autoComplete="tel" placeholder="(360) 555-0100" value={form.phone} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label className={labelClass} htmlFor="rm-email">Email</label>
        <input id="rm-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
      </div>
      <label className="flex gap-2.5 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5"
          style={{ accentColor: "oklch(0.65 0.14 65)" }}
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          I agree to receive SMS text messages from Handy Pioneers at the phone number provided.
          Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out. See{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a>{" "}
          and{" "}
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline">Terms</a>.
        </span>
      </label>
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
      <button type="submit" disabled={submitting} className="hcp-button w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? "One moment…" : "Start My Roadmap →"}
      </button>
      <p className="text-xs text-center text-gray-400">Complimentary. Next: your home and your inspection report.</p>
    </form>
  );
}
