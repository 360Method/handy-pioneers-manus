import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-logo-transparent_c9fbf0d1.png";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBookOnline = () => {
    if (window.HCPWidget) {
      window.HCPWidget.openModal();
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
      style={{
        backgroundColor: scrolled ? "oklch(0.97 0.015 80)" : "oklch(1 0 0)",
        borderBottom: "1px solid oklch(0.85 0.015 80)",
      }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img
            src={LOGO_URL}
            alt="Handy Pioneers LLC Logo"
            className="h-12 w-auto object-contain"
            style={{ maxWidth: "52px" }}
          />
          <div className="flex flex-col leading-tight">
            <span
              className="font-bold text-base"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)", letterSpacing: "0.01em" }}
            >
              Handy Pioneers
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.50 0.06 65)", letterSpacing: "0.04em" }}
            >
              Minor Repairs, Major Satisfaction
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wider transition-colors hover:opacity-70"
              style={{
                color: "oklch(0.32 0.07 160)",
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+13605449858"
            className="text-sm font-semibold"
            style={{ color: "oklch(0.32 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            (360) 544-9858
          </a>
          <button className="hcp-button" onClick={handleBookOnline}>
            Request Estimate
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "oklch(0.32 0.07 160)" }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
          style={{
            backgroundColor: "oklch(0.97 0.015 80)",
            borderColor: "oklch(0.85 0.015 80)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.32 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+13605449858"
            className="text-sm font-semibold"
            style={{ color: "oklch(0.32 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Call: (360) 544-9858
          </a>
          <button className="hcp-button w-full" onClick={handleBookOnline}>
            Book Online
          </button>
        </div>
      )}
    </nav>
  );
}
