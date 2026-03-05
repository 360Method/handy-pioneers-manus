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

      {/* Right: Portal Login */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs hidden sm:inline"
          style={{ color: "oklch(0.78 0.04 80)", fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Already a Client?
        </span>
        <button
        data-token="171462604fd34b4fa38d9f4e36a1ce42"
        data-orgname="Handy-Pioneers"
        onClick={() =>
          window.open(
            "https://client.housecallpro.com/customer_portal/request-link?token=171462604fd34b4fa38d9f4e36a1ce42",
            "_blank"
          )
        }
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/40 hover:bg-white/10 transition-all"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        <span>🔑</span>
        LOG IN TO PORTAL
        </button>
      </div>
    </div>
  );
}
