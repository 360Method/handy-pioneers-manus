// SampleReportModal.tsx — Shared popup for 360° Priority Roadmap sample report
// Reusable from homepage, 360° Method page, Translation page, etc.

import { X } from "lucide-react";

const PDF_URL =
  "https://docs.google.com/viewer?url=https%3A%2F%2Fd2xsxph8kpxj0f.cloudfront.net%2F310519663386531688%2FPMFhFJDf55eBmmtmS9ai7o%2F360-priority-roadmap-sample_945b4356.pdf&embedded=true";

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
              360° Priority Roadmap — Sample Report
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

        {/* PDF Embed */}
        <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          <iframe
            src={PDF_URL}
            title="360° Priority Roadmap Sample Report"
            className="w-full h-full"
            style={{ minHeight: "60vh", border: "none" }}
          />
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderTop: "1px solid oklch(0.25 0.05 160)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            This is what you receive within 5 business days of submitting your inspection report.
          </p>
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
  );
}
