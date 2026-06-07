// SampleReportModal.tsx - Shared popup for 360° Priority Roadmap sample report
// Reusable from homepage, 360° Method page, Translation page, etc.
//
// The viewer scrolls pre-rendered page images instead of iframing the PDF - 
// mobile browsers render an iframed PDF as a frozen first page (the "stuck on
// the cover" bug), while images scroll everywhere. The full PDF stays one tap
// away. Sample content is a fictionalized real roadmap (regenerate in
// HP-Estimator-app: scripts/generate-roadmap-sample.mjs, render pages to webp,
// copy here with NEW filenames - the CDN serves stale bytes on reused names).

import { X, FileText } from "lucide-react";

const PDF_URL = "/sample/360-roadmap-sample-alder2.pdf";
const PAGE_COUNT = 14;
const PAGE_URLS = Array.from(
  { length: PAGE_COUNT },
  (_, i) => `/images/roadmap-sample/alder2-page-${String(i + 1).padStart(2, "0")}.webp`,
);

interface SampleReportModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SampleReportModal({ open, onClose }: SampleReportModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.80)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: "oklch(0.15 0.05 160)",
          maxHeight: "90vh",
          boxShadow: "0 24px 80px rgba(0,0,0,0.60)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom: "1px solid oklch(0.25 0.05 160)" }}
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-0.5"
              style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Sample Deliverable
            </p>
            <h3
              className="text-lg font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              360° Priority Roadmap - Sample Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full border-0 cursor-pointer transition-opacity hover:opacity-70"
            style={{ backgroundColor: "oklch(0.25 0.05 160)", color: "white" }}
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable page images - renders on every device, unlike a PDF iframe */}
        <div
          className="flex-1 overflow-y-auto px-3 py-3 sm:px-6 sm:py-5"
          style={{ minHeight: 0, WebkitOverflowScrolling: "touch" }}
        >
          {PAGE_URLS.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Sample 360° Roadmap, page ${i + 1} of ${PAGE_COUNT}`}
              loading={i < 2 ? "eager" : "lazy"}
              className="w-full rounded-md mb-3"
              style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.35)" }}
            />
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 shrink-0"
          style={{ borderTop: "1px solid oklch(0.25 0.05 160)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            This is what you receive within 24 hours of submitting your inspection report.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
              style={{
                border: "1px solid oklch(0.65 0.14 65)",
                color: "oklch(0.65 0.14 65)",
                fontFamily: "'Source Sans 3', sans-serif",
                textDecoration: "none",
              }}
            >
              <FileText size={16} />
              Open the PDF
            </a>
            <button
              onClick={onClose}
              className="text-sm font-bold px-5 py-2 rounded-lg border-0 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "oklch(0.65 0.14 65)",
                color: "oklch(0.10 0.04 80)",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
