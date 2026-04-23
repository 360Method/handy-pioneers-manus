/**
 * ProjectDetail — Full-page project story view
 * Opens at /project/:slug in a new browser tab
 * Design: Pacific Northwest Craftsman — matches main site aesthetic
 * Includes: back-to-home link, full story, photo(s), tags, and Book Service CTA
 */

import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { projects } from "@/lib/projects";
import { Calendar, MapPin, Tag, ArrowLeft, Phone } from "lucide-react";

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const project = projects.find((p) => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Update page title for SEO
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Handy Pioneers`;
    } else {
      document.title = "Project Not Found | Handy Pioneers";
    }
    return () => {
      document.title = "Handy Pioneers — Reliable Renovations, Trusted Results";
    };
  }, [project]);

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
        style={{ backgroundColor: "oklch(0.97 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }}
      >
        <h1
          className="text-3xl font-bold text-center"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
        >
          Project Not Found
        </h1>
        <p style={{ color: "oklch(0.45 0.02 80)" }}>
          We couldn't find that project. It may have moved or been removed.
        </p>
        <Link href="/">
          <a
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
            style={{
              backgroundColor: "oklch(0.32 0.07 160)",
              color: "oklch(1 0 0)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} />
            Back to Handy Pioneers
          </a>
        </Link>
      </div>
    );
  }

  const extraImages = (project as any).extraImages as string[] | undefined;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.97 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }}
    >
      {/* ── Top Nav Bar ── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "oklch(0.22 0.07 160)",
          borderColor: "oklch(0.28 0.07 160)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "oklch(0.95 0.02 80)", textDecoration: "none" }}
          >
            <ArrowLeft size={16} />
            Back to Handy Pioneers
          </a>

          <div className="flex items-center gap-3">
            <a
              href="tel:+13605449858"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "oklch(0.80 0.10 80)", textDecoration: "none" }}
            >
              <Phone size={14} />
              (360) 544-9858
            </a>
            <button
              className="hcp-button"
              onClick={() => window.open("https://client.handypioneers.com/book", "_blank", "noopener")}
              style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Image ── */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="overflow-hidden rounded-xl" style={{ maxHeight: "480px" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-cover"
            style={{ maxHeight: "480px", objectPosition: "center" }}
          />
        </div>
      </div>

      {/* ── Article Body ── */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "oklch(0.32 0.07 160)",
              color: "oklch(1 0 0)",
            }}
          >
            {project.category}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "oklch(0.55 0.04 65)" }}
          >
            <Calendar size={12} />
            {project.date}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "oklch(0.55 0.04 65)" }}
          >
            <MapPin size={12} />
            {project.location}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "oklch(0.22 0.07 160)",
          }}
        >
          {project.title}
        </h1>

        {/* Excerpt */}
        <p
          className="text-lg mb-6 leading-relaxed"
          style={{ color: "oklch(0.40 0.03 80)", fontStyle: "italic" }}
        >
          {project.excerpt}
        </p>

        {/* Divider */}
        <hr style={{ borderColor: "oklch(0.88 0.015 80)", marginBottom: "1.5rem" }} />

        {/* Full description */}
        <p
          className="text-base leading-relaxed mb-8"
          style={{ color: "oklch(0.35 0.02 80)" }}
        >
          {project.description}
        </p>

        {/* Extra images for multi-photo posts (e.g. pressure washing 3 driveways) */}
        {extraImages && extraImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {extraImages.map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img
                  src={src}
                  alt={`${project.title} — photo ${i + 2}`}
                  className="w-full object-cover"
                  style={{ maxHeight: "340px" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: "oklch(0.91 0.015 80)",
                color: "oklch(0.38 0.04 80)",
              }}
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Block */}
        <div
          className="rounded-2xl p-6 md:p-8 text-center"
          style={{
            backgroundColor: "oklch(0.22 0.07 160)",
            background: "linear-gradient(135deg, oklch(0.22 0.07 160) 0%, oklch(0.28 0.06 160) 100%)",
          }}
        >
          <h2
            className="text-2xl font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "oklch(0.96 0.02 80)",
            }}
          >
            Need a Similar Job Done?
          </h2>
          <p
            className="text-sm mb-5"
            style={{ color: "oklch(0.78 0.04 80)" }}
          >
            Handy Pioneers serves Clark County, WA. We’ll walk the property, listen to your priorities, and present a written plan tailored to your home.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="hcp-button"
              onClick={() => window.open("https://client.handypioneers.com/book", "_blank", "noopener")}
              style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
            >
              Schedule a Consultation
            </button>
            <a
              href="tel:+13605449858"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-colors"
              style={{
                borderColor: "oklch(0.65 0.10 80)",
                color: "oklch(0.90 0.06 80)",
                textDecoration: "none",
              }}
            >
              <Phone size={15} />
              (360) 544-9858
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a
            href="/#gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.32 0.07 160)", textDecoration: "none" }}
          >
            <ArrowLeft size={14} />
            View All Projects
          </a>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-6 text-center text-xs border-t mt-10"
        style={{
          backgroundColor: "oklch(0.18 0.06 160)",
          borderColor: "oklch(0.25 0.06 160)",
          color: "oklch(0.65 0.03 80)",
        }}
      >
        <p>© {new Date().getFullYear()} Handy Pioneers, LLC · Clark County, WA · (360) 544-9858</p>
        <p className="mt-1">
          <a
            href="/"
            style={{ color: "oklch(0.75 0.06 80)", textDecoration: "none" }}
          >
            handypioneers.com
          </a>
          {" · "}
          <a
            href="/#gallery"
            style={{ color: "oklch(0.75 0.06 80)", textDecoration: "none" }}
          >
            Project Gallery
          </a>
        </p>
      </footer>
    </div>
  );
}
