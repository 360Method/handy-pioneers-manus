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

import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { Paperclip, X, Loader2 } from "lucide-react";
import { getApiBase } from "@/lib/api";
import { track } from "@/lib/analytics";
import {
  isInServiceArea,
  SERVICE_AREA_LABEL,
  CONSULTATION_OUT_OF_AREA_MESSAGE,
} from "@/lib/serviceArea";
import { uploadInquiryFile, type UploadedAttachment } from "@/lib/uploadAttachment";

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
  const [outOfArea, setOutOfArea] = useState(false);
  const [attachments, setAttachments] = useState<UploadedAttachment[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [smsConsent, setSmsConsent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  const isHero = variant === "hero";

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    // Reset the input so picking the same file again still fires onChange.
    e.target.value = "";
    if (files.length === 0) return;
    if (!startedRef.current) {
      startedRef.current = true;
      track("consult_form_start", { funnel });
    }
    setError(null);
    setUploadingCount((n) => n + files.length);
    // Upload in parallel; surface the first failure but keep the successes.
    await Promise.all(
      files.map(async (file) => {
        try {
          const uploaded = await uploadInquiryFile(file);
          setAttachments((prev) => [...prev, uploaded]);
        } catch (err: any) {
          setError(err?.message ?? `Could not upload "${file.name}".`);
        } finally {
          setUploadingCount((n) => Math.max(0, n - 1));
        }
      })
    );
  };

  const removeAttachment = (url: string) => {
    setAttachments((prev) => prev.filter((a) => a.url !== url));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("consult_form_start", { funnel });
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (uploadingCount > 0) {
      setError("Please wait for your files to finish uploading.");
      return;
    }
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

    // Service-area gate. On-site consultations are limited to Clark County, WA.
    // Out-of-area homeowners are still captured, but onto the waitlist rather
    // than the booking pipeline, and we show them the call-in option.
    const inArea = isInServiceArea(form.zip);

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
          source: inArea ? source : `${source}_waitlist_out_of_area`,
          funnel,
          inServiceArea: inArea,
          zip: form.zip.trim(),
          description,
          timeline: form.timeline,
          photoUrls: attachments.map((a) => a.url),
          street: form.street.trim(),
          city: form.city.trim(),
          state: "WA",
          smsConsent,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? "Something went wrong. Please try again.");
      }

      track("generate_lead", {
        funnel,
        lead_type: funnel === "360_method" ? "home_assessment" : "consultation",
        service_type: form.serviceType || undefined,
        city: form.city.trim() || undefined,
        in_service_area: inArea,
      });

      if (!inArea) {
        // Captured on the waitlist - show the out-of-area state in place of the form.
        setOutOfArea(true);
        return;
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

  if (outOfArea) {
    return (
      <div
        className={`w-full max-w-lg rounded-xl border p-6 text-center ${
          isHero
            ? "bg-white/10 border-white/30 text-white"
            : "bg-amber-50 border-amber-200 text-gray-800"
        }`}
      >
        <h3
          className="text-xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          You're on our list
        </h3>
        <p className={`text-sm mb-4 ${isHero ? "text-white/80" : "text-gray-700"}`}>
          {CONSULTATION_OUT_OF_AREA_MESSAGE}
        </p>
        <p className={`text-sm ${isHero ? "text-white/80" : "text-gray-700"}`}>
          Just outside {SERVICE_AREA_LABEL}? Give us a call at{" "}
          <a
            href="tel:+13608386731"
            className="font-semibold underline whitespace-nowrap"
          >
            (360) 838-6731
          </a>{" "}
          and we'll see if we can help.
        </p>
      </div>
    );
  }

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

      {/* Photos & documents — the more we can see, the better we can prepare. */}
      <div>
        <label className={labelClass}>
          Photos &amp; documents <span className="normal-case opacity-60">(optional, recommended)</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,.doc,.docx,.txt"
          onChange={handleFiles}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`flex w-full items-center justify-center gap-2 rounded-md border border-dashed px-4 py-3 text-sm transition-all ${
            isHero
              ? "border-white/40 text-white/80 hover:bg-white/10"
              : "border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Paperclip size={16} />
          Add photos or documents
        </button>
        <p className={`mt-1 text-xs ${isHero ? "text-white/40" : "text-gray-400"}`}>
          Add as many as you like — photos of the area, inspection reports, quotes, or plans. The more we can see, the better we can prepare.
        </p>

        {(attachments.length > 0 || uploadingCount > 0) && (
          <ul className="mt-3 space-y-2">
            {attachments.map((a) => (
              <li
                key={a.url}
                className={`flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm ${
                  isHero ? "bg-white/10 text-white/90" : "bg-gray-100 text-gray-700"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Paperclip size={14} className="shrink-0 opacity-60" />
                  <span className="truncate">{a.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(a.url)}
                  aria-label={`Remove ${a.name}`}
                  className="shrink-0 opacity-70 hover:opacity-100"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
            {uploadingCount > 0 && (
              <li className={`flex items-center gap-2 px-3 py-2 text-sm ${isHero ? "text-white/70" : "text-gray-500"}`}>
                <Loader2 size={14} className="animate-spin" />
                Uploading {uploadingCount} file{uploadingCount > 1 ? "s" : ""}…
              </li>
            )}
          </ul>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400 font-medium">{error}</p>
      )}

      <label className={`flex items-start gap-2 text-xs leading-snug ${isHero ? "text-white/60" : "text-gray-500"}`}>
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0"
        />
        <span>
          Text me about my request. I agree to receive text messages from Handy Pioneers
          (confirmations, scheduling, and follow-ups) at the number provided. Msg &amp; data
          rates may apply; message frequency varies. Reply STOP to opt out, HELP for help. See our{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a> and{" "}
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline">Terms</a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting || uploadingCount > 0}
        className="hcp-button w-full text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending your request..." : funnel === "360_method" ? "Request My Home Assessment" : "Request My Consultation"}
      </button>

      <p className={`text-xs text-center ${isHero ? "text-white/40" : "text-gray-400"}`}>
        We'll reach out within one business day to schedule your walkthrough.
      </p>
    </form>
  );
}
