import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-full-logo_4f724ec4.jpg";
const NAVBAR_HEIGHT = 72; // px — matches scroll-padding-top in index.css

const navLinks = [
  { label: "Home", section: "", route: null },
  { label: "About", section: null, route: "/about" },
  { label: "Services", section: "services", route: null },
  { label: "360° Method", section: null, route: "/360-method" },
  { label: "Gallery", section: "gallery", route: null },
  { label: "Reviews", section: null, route: "/reviews" },
  { label: "FAQ", section: null, route: "/faq" },
  { label: "Blog", section: "blog", route: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check on mount + route changes if there's a pending scroll target
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (!target) return;
    sessionStorage.removeItem("scrollTarget");

    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };
    // Small delay so the page has time to render
    setTimeout(() => tryScroll(), 50);
  }, []);

  const handleNavClick = (link: { label: string; section: string | null; route: string | null }) => {
    setMobileOpen(false);

    // Route-based navigation (e.g. /reviews)
    if (link.route) {
      navigate(link.route);
      return;
    }

    const section = link.section ?? "";

    // "Home" → scroll to top
    if (!section) {
      const isHome = window.location.pathname === "/";
      if (isHome) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      }
      return;
    }

    const el = document.getElementById(section);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollTarget", section);
      navigate("/");
    }
  };

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
        <button
          onClick={() => handleNavClick({ label: "Home", section: "", route: null })}
          className="flex items-center gap-2 shrink-0 bg-transparent border-0 p-0 cursor-pointer"
          aria-label="Go to top"
        >
          <img
            src={LOGO_URL}
            alt="Handy Pioneers LLC Logo"
            className="h-12 w-auto object-contain"
            style={{ maxWidth: "52px" }}
          />
          <div className="flex flex-col leading-tight text-left">
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
              Reliable Renovations, Trusted Results
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="text-sm font-semibold uppercase tracking-wider transition-colors hover:opacity-70 bg-transparent border-0 cursor-pointer"
              style={{
                color: "oklch(0.32 0.07 160)",
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              {link.label}
            </button>
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
          className="md:hidden border-t px-6 py-5 flex flex-col gap-1"
          style={{
            backgroundColor: "oklch(0.97 0.015 80)",
            borderColor: "oklch(0.85 0.015 80)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="text-sm font-semibold uppercase tracking-wider py-3 text-right border-b bg-transparent border-0 cursor-pointer w-full"
              style={{
                color: "oklch(0.32 0.07 160)",
                fontFamily: "'Source Sans 3', sans-serif",
                borderBottom: "1px solid oklch(0.88 0.015 80)",
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:+13605449858"
            className="text-sm font-semibold py-3 text-right"
            style={{ color: "oklch(0.32 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Call: (360) 544-9858
          </a>
          <button className="hcp-button w-full mt-2" onClick={handleBookOnline}>
            Request Estimate
          </button>
        </div>
      )}
    </nav>
  );
}
