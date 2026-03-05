/**
 * MobileCTABar — shown only on mobile (<md).
 * Sits inline between TopBar and Navbar, scrolls away with the page
 * so it doesn't conflict with the Google Reviews floater at the bottom.
 */

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

export default function MobileCTABar() {
  const handleEstimate = () => {
    if (window.HCPWidget) {
      window.HCPWidget.openModal();
    }
  };

  return (
    <div className="md:hidden flex w-full" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
      {/* Call button — left half */}
      <a
        href="tel:+13605449858"
        className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider transition-opacity active:opacity-80"
        style={{
          backgroundColor: "oklch(0.27 0.07 160)",
          color: "oklch(0.95 0.02 80)",
          fontFamily: "'Source Sans 3', sans-serif",
          letterSpacing: "0.08em",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
        </svg>
        Call Now
      </a>

      {/* Divider */}
      <div style={{ width: "1px", backgroundColor: "oklch(0.35 0.07 160)" }} />

      {/* Request Estimate button — right half */}
      <button
        onClick={handleEstimate}
        className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider transition-opacity active:opacity-80"
        style={{
          backgroundColor: "oklch(0.62 0.14 65)",
          color: "oklch(0.15 0.04 160)",
          fontFamily: "'Source Sans 3', sans-serif",
          letterSpacing: "0.08em",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        Request Estimate
      </button>
    </div>
  );
}
