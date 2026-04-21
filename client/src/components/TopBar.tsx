import { Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div
      className="w-full text-white text-sm py-2 px-4 flex items-center justify-between"
      style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
    >
      {/* Left: Phone */}
      <a
        href="tel:+13605449858"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity font-semibold tracking-wide"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        <Phone size={14} />
        <span>(360) 544-9858</span>
      </a>

      {/* Right: Portal Login — de-emphasized for new visitors */}
      <button
        data-token="171462604fd34b4fa38d9f4e36a1ce42"
        data-orgname="Handy-Pioneers"
        onClick={() =>
          window.open(
            "https://client.housecallpro.com/customer_portal/request-link?token=171462604fd34b4fa38d9f4e36a1ce42",
            "_blank"
          )
        }
        className="text-xs hover:opacity-80 transition-opacity"
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          color: "rgba(255,255,255,0.45)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          letterSpacing: "0.02em",
        }}
      >
        Existing Client? Log In
      </button>
    </div>
  );
}
