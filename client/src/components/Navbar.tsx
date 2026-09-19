import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { openInquiry } from "@/lib/inquiry";
import { track } from "@/lib/analytics";

import { LOGO } from "@/lib/assets";
const LOGO_URL = LOGO;
const NAVBAR_HEIGHT = 72; // px - matches scroll-padding-top in index.css

const navLinks = [
  { label: "Home", section: "", route: null },
  { label: "Services", section: "services", route: null },
  { label: "360° Method", section: "method", route: null },
  { label: "Roadmap Generator", section: null, route: "/roadmap-generator" },
  { label: "Financing", section: null, route: "/financing" },
  { label: "Gallery", section: "gallery", route: null },
  { label: "Reviews", section: "reviews", route: null },
  { label: "Blog", section: "blog-section", route: null },
  { label: "About", section: "about", route: null },
  { label: "FAQ", section: "faq", route: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, navigate] = useLocation();

  const isMethodOrMembership =
    location === "/360-method" ||
    location.startsWith("/360-method/") ||
    location === "/membership" ||
    location.startsWith("/membership/");

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
    openInquiry();
  };

  // Enroll CTA: send the visitor to the membership pricing section. If we are
  // already on /membership, smooth-scroll to it; otherwise navigate there first,
  // then scroll once the section renders (retry while the page mounts).
  const goToPricing = () => {
    setMobileOpen(false);
    const scrollToPricing = (attempts = 0) => {
      const el = document.getElementById("pricing");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempts < 10) {
        setTimeout(() => scrollToPricing(attempts + 1), 100);
      }
    };
    if (location === "/membership" || location.startsWith("/membership/")) {
      scrollToPricing();
    } else {
      navigate("/membership");
      setTimeout(() => scrollToPricing(), 100);
    }
  };

  return (
    <nav
      className={`sticky z-50 w-full transition-all duration-300 ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
      style={{
        // Pin just below the seasonal-offer bar (0 when there's no bar).
        top: "var(--hp-promo-h, 0px)",
        backgroundColor: scrolled ? "oklch(0.97 0.015 80)" : "oklch(1 0 0)",
        borderBottom: "1px solid oklch(0.85 0.015 80)",
      }}
    >
      {/* The full bar (tagline + 10 links + phone + CTA) needs ~1,450px, so it only
          shows at 2xl inside a wider container. xl gets a compact bar (no tagline,
          no phone: the top bar already carries the number). Below xl, tablets and
          phones get the menu button, or the row overflows and the whole page
          renders wider than the screen. */}
      <div className="container flex items-center justify-between gap-4 h-16 2xl:max-w-[1536px]">
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
              className="text-xs xl:hidden 2xl:block"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: "oklch(0.50 0.06 65)", letterSpacing: "0.04em" }}
            >
              Reliable Renovations, Trusted Results
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex items-center gap-x-3 2xl:gap-x-4 shrink-0">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="text-sm font-semibold uppercase whitespace-nowrap transition-colors hover:opacity-70 bg-transparent border-0 cursor-pointer"
              style={{
                color: "oklch(0.32 0.07 160)",
                fontFamily: "'Source Sans 3', sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <a
            href="tel:+13608386731"
            onClick={() => track("contact", { method: "phone", location: "navbar" })}
            className="hidden 2xl:inline text-sm font-semibold whitespace-nowrap"
            style={{ color: "oklch(0.32 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            (360) 838-6731
          </a>
          {isMethodOrMembership ? (
            <button className="hcp-button hcp-button--nav" onClick={goToPricing}>
              Enroll in 360° Method →
            </button>
          ) : (
            <button className="hcp-button hcp-button--nav" onClick={handleBookOnline}>
              Schedule a Consultation
            </button>
          )}
        </div>

        {/* Tablet: keep the CTA in the bar next to the menu button (phones get it
            from MobileCTABar instead). */}
        <div className="flex xl:hidden items-center gap-3 shrink-0">
          <div className="hidden md:block">
            {isMethodOrMembership ? (
              <button className="hcp-button hcp-button--nav" onClick={goToPricing}>
                Enroll in 360° Method →
              </button>
            ) : (
              <button className="hcp-button hcp-button--nav" onClick={handleBookOnline}>
                Schedule a Consultation
              </button>
            )}
          </div>
          {/* Mobile Menu Toggle */}
          <button
            className="p-2 rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "oklch(0.32 0.07 160)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="xl:hidden border-t px-6 py-5 flex flex-col gap-1 max-h-[calc(100dvh-8rem)] overflow-y-auto"
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
            href="tel:+13608386731"
            onClick={() => track("contact", { method: "phone", location: "navbar-mobile" })}
            className="text-sm font-semibold py-3 text-right"
            style={{ color: "oklch(0.32 0.07 160)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Call: (360) 838-6731
          </a>
          {isMethodOrMembership ? (
            <button className="hcp-button w-full mt-2" onClick={goToPricing}>
              Enroll in 360° Method →
            </button>
          ) : (
            <button className="hcp-button w-full mt-2" onClick={handleBookOnline}>
              Schedule a Consultation
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
