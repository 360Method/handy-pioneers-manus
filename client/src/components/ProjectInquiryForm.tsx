/**
 * ProjectInquiryForm - Path A: the consultation request form.
 *
 * Posts directly to the HP Estimator app's public booking API.
 * On success, redirects to /thankyou?path=project which shows the 360 Method upsell.
 *
 * Light-qualify fields (city, zip, project scope, timeline, optional investment)
 * filter low-intent leads and give Marcin the context to prep before the on-site
 * walkthrough. The backend already accepts city/zip/street/description/timeline;
 * timeline === "ASAP" routes the lead high-priority. Investment has no dedicated
 * backend field, so it is appended to the description that lands in the lead notes.
 *
 * Mounted once, via InquiryModal (funnel="project").
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { getApiBase } from "@/lib/api";

type Funnel = "project" | "360_method";

const SERVICE_OPTIONS_PROJECT = [
  "General Repairs & Maintenance",
  "Deck & Fence",
  "Bathroom Remodel",
  "Kitchen Remodel",
  "Painting (Interior or Exterior)",
  "Flooring",
  "Doors & Windows",
  "Drywall & Plaster",
  "Gutter Cleaning & Repair",
  "Other / Not Sure Yet",
];

const SERVICE_OPTIONS_360 = [
  "Roof & Gutters",
  "Plumbing",
  "Electrical",
  "HVAC / Heating & Cooling",
  "Foundation & Structure",
  "Windows & Doors",
  "Deck, Fence, or Exterior",
  "General Aging & Wear",
  "Not Sure - Full Assessment",
];

// Display label → value stored on the lead. Values stay within the three the
// backend understands so lead-routing priority (ASAP → high) keeps working.
const TIMELINE_OPTIONS: { label: string; value: string }[] = [
  { label: "As soon as possible", value: "ASAP" },
  { label: "Within a few weeks", value: "Within a week" },
  { label: "Flexible / planning ahead", value: "Flexible" },
];

// Optional, premium-framed. No backend field - appended to the description.
const INVESTMENT_OPTIONS = [
  "Not sure yet",
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
];

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  serviceType: string;
  city: string;
  zip: string;
  street: string;
  projectDetails: string;
  timeline: string;
  budget: string;
}

interface Props {
  source: string;
  variant?: "hero" | "cta";
  funnel?: Funnel;
}

export default function ProjectInquiryForm({ source, variant = "hero", funnel = "project" }: Props) {
  const [, navigate] = useLocation();
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    serviceType: "",
    city: "",
    zip: "",
    street: "",
    projectDetails: "",
    timeline: "",
    budget: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isHero = variant === "hero";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.firstName || !form.phone || !form.email) {
      setError("Please fill in your name, phone, and email.");
      return;
    }
    if (!form.city.trim() || !form.zip.trim()) {
      setError("Please add the property's city and ZIP code.");
      return;
    }
    if (form.projectDetails.trim().length < 10) {
      setError("Please tell us a little about your project so we can prepare.");
      return;
    }
    if (!form.timeline) {
      setError("Please choose a timeline.");
      return;
    }

    // Investment is optional - fold it into the description so it lands in the
    // lead notes alongside the scope.
    const investmentLine = form.budget ? `Anticipated investment: ${form.budget}` : "";
    const description = [form.projectDetails.trim(), investmentLine].filter(Boolean).join("\n");

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
          serviceType: form.serviceType || (funnel === "360_method" ? "360° Home Assessment" : "General Inquiry"),
          source,
          funnel,
          zip: form.zip.trim(),
          description,
          timeline: form.timeline,
          photoUrls: [],
          street: form.street.trim(),
          city: form.city.trim(),
          state: "WA",
          smsConsent: false,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? "Something went wrong. Please try again.");
      }

      // Redirect to thank-you page with 360 upsell
      navigate(`/thankyou?path=${funnel === "360_method" ? "360" : "project"}`);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full rounded-md border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
    isHero
      ? "bg-white/10 border-white/30 text-white placeholder-white/50 focus:ring-amber-400/60"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-amber-500/60"
  }`;

  const labelClass = `block text-xs font-semibold uppercase tracking-wide mb-1 ${
    isHero ? "text-white/70" : "text-gray-600"
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-4"
      noValidate
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor={`firstName-${source}`}>First Name</label>
          <input
            id={`firstName-${source}`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            value={form.firstName}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`lastName-${source}`}>Last Name</label>
          <input
            id={`lastName-${source}`}
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Smith"
            value={form.lastName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor={`phone-${source}`}>Phone</label>
        <input
          id={`phone-${source}`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(360) 555-0100"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`email-${source}`}>Email</label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* Property location - where the walkthrough happens, and our service-area signal. */}
      <div>
        <label className={labelClass} htmlFor={`street-${source}`}>Property Address <span className="normal-case opacity-60">(optional)</span></label>
        <input
          id={`street-${source}`}
          name="street"
          type="text"
          autoComplete="street-address"
          placeholder="123 Main St"
          value={form.street}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className={labelClass} htmlFor={`city-${source}`}>City</label>
          <input
            id={`city-${source}`}
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder="Vancouver"
            value={form.city}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`zip-${source}`}>ZIP</label>
          <input
            id={`zip-${source}`}
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="98665"
            maxLength={5}
            value={form.zip}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor={`serviceType-${source}`}>{funnel === "360_method" ? "Biggest home concern?" : "What can we help with?"}</label>
        <select
          id={`serviceType-${source}`}
          name="serviceType"
          value={form.serviceType}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a service...</option>
          {(funnel === "360_method" ? SERVICE_OPTIONS_360 : SERVICE_OPTIONS_PROJECT).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor={`projectDetails-${source}`}>Tell us about your project</label>
        <textarea
          id={`projectDetails-${source}`}
          name="projectDetails"
          rows={3}
          placeholder="e.g., Rebuild a ~200 sq ft deck and replace the railings."
          value={form.projectDetails}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor={`timeline-${source}`}>Timeline</label>
          <select
            id={`timeline-${source}`}
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select...</option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor={`budget-${source}`}>Investment <span className="normal-case opacity-60">(optional)</span></label>
          <select
            id={`budget-${source}`}
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Prefer not to say</option>
            {INVESTMENT_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="hcp-button w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending your request..." : funnel === "360_method" ? "Request My Free Home Assessment" : "Request My Consultation"}
      </button>

      <p className={`text-xs text-center ${isHero ? "text-white/40" : "text-gray-400"}`}>
        Owner-led. We'll reach out within one business day to schedule your walkthrough.
      </p>
    </form>
  );
}
