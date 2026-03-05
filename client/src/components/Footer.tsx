import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-logo-v2-transparent_e546ae38.png";

const servicesList = [
  "Cabinets", "Carpentry", "Decking", "Doors", "Fencing",
  "Flooring", "General Contracting", "Gutter Cleaning",
  "Home Repair", "Painting", "Pressure Washing",
  "Punch List Repairs", "Remodeling", "Rot Repair",
  "Trim Carpentry", "TV Mounting", "Windows",
];

const areas = [
  "Vancouver, WA", "Camas, WA", "Washougal, WA",
  "Battle Ground, WA", "La Center, WA", "Ridgefield, WA",
  "Clark County, WA",
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "oklch(0.15 0.04 160)" }}>
      {/* Main footer content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
          <div className="mb-5">
            <img
              src={LOGO_URL}
              alt="Handy Pioneers LLC"
              className="h-20 w-auto object-contain"
              style={{ opacity: 0.95 }}
            />
          </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Licensed and insured handyman and remodeling contractor serving Clark County, WA.
              Quality craftsmanship backed by a 1-year labor guarantee.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="tel:+13605449858"
                className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
                style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Phone size={15} style={{ color: "oklch(0.65 0.14 65)" }} />
                (360) 544-9858
              </a>
              <a
                href="mailto:help@handypioneers.com"
                className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
                style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Mail size={15} style={{ color: "oklch(0.65 0.14 65)" }} />
                help@handypioneers.com
              </a>
              <div
                className="flex items-center gap-3 text-sm"
                style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <MapPin size={15} style={{ color: "oklch(0.65 0.14 65)" }} />
                Vancouver, WA 98660
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com/handypioneers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/handypioneers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "oklch(0.32 0.07 160)" }}
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {servicesList.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas column */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Service Areas
            </h4>
            <ul className="space-y-2">
              {areas.map((a) => (
                <li key={a}>
                  <span
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links / CTA column */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2 mb-8">
              {[
                { label: "Our Services", href: "#services" },
                { label: "Project Gallery", href: "#gallery" },
                { label: "Customer Reviews", href: "#reviews" },
                { label: "About Us", href: "#about" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    window.open(
                      "https://client.housecallpro.com/customer_portal/request-link?token=171462604fd34b4fa38d9f4e36a1ce42",
                      "_blank"
                    )
                  }
                  className="text-sm hover:opacity-80 transition-opacity text-left"
                  style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Customer Portal
                </button>
              </li>
            </ul>

            <button
              className="hcp-button w-full"
              onClick={() => (window as any).HCPWidget?.openModal()}
            >
              Request Estimate
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            © {new Date().getFullYear()} Handy Pioneers. All rights reserved. · WA Lic. HANDYP*761NH
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
