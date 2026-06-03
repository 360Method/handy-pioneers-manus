/**
 * ProjectInquiryForm — Path A: Embedded mini-form for project inquiries.
 *
 * Posts directly to the HP Estimator app's public booking API.
 * On success, redirects to /thankyou?path=project which shows the 360 Method upsell.
 *
 * Embedded in Hero.tsx and FinalCTA.tsx.
 */

import { useState } from "react";
import { useLocation } from "wouter";

const APP_API_BASE = "https://pro.handypioneers.com";

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
  "Not Sure — Full Assessment",
];

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  serviceType: string;
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
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isHero = variant === "hero";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.firstName || !form.phone || !form.email) {
      setError("Please fill in your name, phone, and email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${APP_API_BASE}/api/public/inquiry`, {
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
          // Minimal required fields for the booking API
          zip: "",
          description: "",
          timeline: "Flexible",
          photoUrls: [],
          street: "",
          city: "",
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

      {error && (
        <p className="text-sm text-red-400 font-medium">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="hcp-button w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending your request..." : funnel === "360_method" ? "Request My Free Home Assessment" : "Request a Complimentary Estimate"}
      </button>

      <p className={`text-xs text-center ${isHero ? "text-white/40" : "text-gray-400"}`}>
        No commitment required. We'll reach out within one business day.
      </p>
    </form>
  );
}
