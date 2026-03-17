/**
 * BlogSection — embedded on the homepage at #blog
 * Two sub-sections:
 *   1. Project Stories — 12 project cards linking to /project/:slug (open in new tab)
 *   2. Blog Posts — drip-released articles filtered by publishDate
 * Design: Pacific Northwest Craftsman
 */

import { useState } from "react";
import { getPublishedPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";
import { Clock, Tag, ArrowRight, BookOpen, Calendar, MapPin, ExternalLink, Images } from "lucide-react";

const PROJECT_CATS = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function BlogSection() {
  // Drip-release: only show posts whose publishDate is today or in the past
  const sorted = getPublishedPosts();

  // Project Stories filter
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="blog-section"
      className="py-20 px-4"
      style={{ backgroundColor: "oklch(0.97 0.015 80)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ══════════════════════════════════════════════════════════════
            SUB-SECTION 1: PROJECT STORIES
        ══════════════════════════════════════════════════════════════ */}
        <div id="project-stories" className="mb-20">
          {/* Sub-section header */}
          <div className="text-center mb-8">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.92 0.06 160)",
                color: "oklch(0.28 0.07 160)",
              }}
            >
              <Images size={12} />
              Project Stories
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.22 0.07 160)",
              }}
            >
              Real Work, Real Results
            </h2>
            <p
              className="text-base max-w-2xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.45 0.03 80)" }}
            >
              Each project tells a story. Browse our completed work across Clark County — click any card to read the full story.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {PROJECT_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  backgroundColor: activeCategory === cat ? "oklch(0.32 0.07 160)" : "oklch(0.90 0.015 80)",
                  color: activeCategory === cat ? "oklch(1 0 0)" : "oklch(0.35 0.04 80)",
                  border: "none",
                  letterSpacing: "0.03em",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={`/project/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: "oklch(1 0 0)",
                  boxShadow: "0 2px 16px oklch(0 0 0 / 0.07)",
                  border: "1px solid oklch(0.91 0.015 80)",
                  textDecoration: "none",
                }}
                aria-label={`Read project story: ${project.title}`}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden" style={{ height: "190px" }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "oklch(0.32 0.07 160)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "0.07em" }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-3 mb-2 text-xs" style={{ color: "oklch(0.58 0.03 80)" }}>
                    <span className="flex items-center gap-1"><Calendar size={11} />{project.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
                  </div>

                  <h3
                    className="text-base font-bold mb-2 leading-snug group-hover:underline"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "oklch(0.22 0.07 160)",
                      textDecorationColor: "oklch(0.62 0.14 65)",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-4 flex-1"
                    style={{ color: "oklch(0.45 0.02 80)" }}
                  >
                    {project.excerpt}
                  </p>

                  <div
                    className="flex items-center justify-between pt-3 border-t"
                    style={{ borderColor: "oklch(0.91 0.015 80)" }}
                  >
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                          style={{ backgroundColor: "oklch(0.93 0.012 80)", color: "oklch(0.45 0.03 80)" }}
                        >
                          <Tag size={9} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold"
                      style={{ color: "oklch(0.32 0.07 160)" }}
                    >
                      Full Story <ExternalLink size={11} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            DIVIDER
        ══════════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px" style={{ backgroundColor: "oklch(0.88 0.015 80)" }} />
          <span className="text-xs font-bold uppercase tracking-widest px-3" style={{ color: "oklch(0.60 0.03 80)" }}>
            Knowledge &amp; Insights
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "oklch(0.88 0.015 80)" }} />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SUB-SECTION 2: BLOG POSTS
        ══════════════════════════════════════════════════════════════ */}
        <div id="blog">
          {/* Sub-section header */}
          <div className="text-center mb-10">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.92 0.06 160)",
                color: "oklch(0.28 0.07 160)",
              }}
            >
              <BookOpen size={12} />
              The Blog
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.22 0.07 160)",
              }}
            >
              The Handy Pioneers Blog
            </h2>
            <p
              className="text-base max-w-2xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.45 0.03 80)" }}
            >
              Home care insights, the 360° Method, and trade knowledge — built for Clark County homeowners and anyone who believes a well-maintained home is a well-lived life.
            </p>
          </div>

          {/* Post grid */}
          {sorted.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: "oklch(0.55 0.03 80)" }}>
                New posts coming soon — check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sorted.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    boxShadow: "0 2px 16px oklch(0 0 0 / 0.07)",
                    border: "1px solid oklch(0.91 0.015 80)",
                    textDecoration: "none",
                  }}
                  aria-label={`Read: ${post.title}`}
                >
                  {/* Card image */}
                  <div className="overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Category + read time */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: "oklch(0.92 0.06 160)",
                          color: "oklch(0.28 0.07 160)",
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "oklch(0.58 0.03 80)" }}
                      >
                        <Clock size={12} />
                        {post.readTime} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold mb-2 leading-snug group-hover:underline"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "oklch(0.22 0.07 160)",
                        textDecorationColor: "oklch(0.62 0.14 65)",
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="text-sm leading-relaxed mb-4 flex-1"
                      style={{ color: "oklch(0.45 0.02 80)" }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: "oklch(0.93 0.012 80)",
                            color: "oklch(0.45 0.03 80)",
                          }}
                        >
                          <Tag size={9} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div
                      className="flex items-center justify-between pt-3 border-t"
                      style={{ borderColor: "oklch(0.91 0.015 80)" }}
                    >
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.58 0.03 80)" }}
                      >
                        {post.date}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold"
                        style={{ color: "oklch(0.32 0.07 160)" }}
                      >
                        Read More <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
