import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-full-logo_4f724ec4.jpg";

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
              Licensed and insured home care and remodeling contractor serving Clark County, WA. (WA Lic. HANDYP★761NH)
              Quality craftsmanship backed by a 1-year labor guarantee.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="tel:+13608386731"
                className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
                style={{ color: "rgba(255,255,255,0.80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <Phone size={15} style={{ color: "oklch(0.65 0.14 65)" }} />
                (360) 838-6731
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

          {/* Service Areas column — embedded map */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Service Areas
            </h4>
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Source Sans 3', sans-serif" }}>
              Vancouver · Camas · Washougal · Battle Ground · La Center · Ridgefield · Clark County, WA
            </p>
            <div className="rounded-xl overflow-hidden" style={{ height: "180px", border: "1px solid rgba(255,255,255,0.10)" }}>
              <iframe
                title="Handy Pioneers Service Area — Clark County, WA"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d175263.0!2d-122.5!3d45.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495a1f4e4e4e4e5%3A0x1234567890abcdef!2sClark%20County%2C%20WA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="180"
                style={{ border: 0, filter: "grayscale(30%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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
                { label: "FAQ", href: "#faq" },
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
              onClick={() => {
                const el = document.getElementById("home");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Choose Your Path
            </button>

            {/* Related */}
            <div className="mt-8">
              <h4
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.65 0.14 65)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                More
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/membership"
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    Explore the 360° Method
                  </a>
                </li>
                <li>
                  <a
                    href="/roadmap-generator"
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: "oklch(0.80 0.10 65)", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}
                  >
                    Run the 360° Roadmap Generator →
                  </a>
                </li>
              </ul>
            </div>
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
            <button
              onClick={() => window.open("/privacy-policy", "_blank", "width=900,height=700,scrollbars=yes")}
              className="text-xs hover:opacity-80 transition-opacity text-left"
              style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => window.open("/terms-and-conditions", "_blank", "width=900,height=700,scrollbars=yes")}
              className="text-xs hover:opacity-80 transition-opacity text-left"
              style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Source Sans 3', sans-serif", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
