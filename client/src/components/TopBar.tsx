import { Phone, CreditCard } from "lucide-react";
import { Link } from "wouter";
import { track } from "@/lib/analytics";
import { HEARTH_ENABLED } from "@/lib/hearth";

export default function TopBar() {
  return (
    <div
      className="w-full text-white text-sm py-2 px-4 flex items-center justify-between gap-3"
      style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
    >
      {/* Left: Phone */}
      <a
        href="tel:+13608386731"
        onClick={() => track("contact", { method: "phone", location: "topbar" })}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity font-semibold tracking-wide shrink-0"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        <Phone size={14} />
        <span>(360) 838-6731</span>
      </a>

      {/* Center: financing lead - the site-wide "lead with financing" line.
          Hidden on the tightest phones so the phone + login stay uncrowded. */}
      {HEARTH_ENABLED && (
        <Link
          href="/financing"
          onClick={() => track("financing_strip_click", { location: "topbar" })}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold hover:opacity-90 transition-opacity text-center"
          style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          <CreditCard size={14} />
          <span>Monthly payment options available - no credit impact to check</span>
        </Link>
      )}

      {/* Right: Portal Login - de-emphasized for new visitors */}
      <button
        onClick={() =>
          window.open("https://client.handypioneers.com/portal/login", "_blank")
        }
        className="text-xs hover:opacity-80 transition-opacity shrink-0"
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
