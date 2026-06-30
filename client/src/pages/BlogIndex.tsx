/**
 * BlogIndex - /blog
 * The full archive: a blended feed of insight articles + local project stories,
 * sorted newest-first. Articles link to /blog/:slug, project stories to
 * /project/:slug. Mirrors the homepage teaser, which shows only the latest 3.
 * Design: Pacific Northwest Craftsman - matches main site aesthetic.
 */

import { useEffect } from "react";
import { getPublishedPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";
import { localImage } from "@/lib/img";
import { Clock, Tag, ArrowRight, ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import SEO from "@/components/SEO";

type FeedKind = "project" | "article";

interface FeedItem {
  key: string;
  href: string;
  image: string;
  imageAlt: string;
  category: string;
  title: string;
  excerpt: string;
  tags: string[];
  dateLabel: string;
  sortTime: number;
  kind: FeedKind;
  meta: string; // location (project) or "X min read" (article)
}

export default function BlogIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog & Project Stories | Handy Pioneers - Clark County WA";
    return () => {
      document.title = "Handy Pioneers - Reliable Renovations, Trusted Results";
    };
  }, []);

  const articleItems: FeedItem[] = getPublishedPosts().map((post) => ({
    key: `post-${post.slug}`,
    href: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    tags: post.tags ?? [],
    dateLabel: post.date,
    sortTime: Date.parse(post.isoDate || post.publishDate || post.date) || 0,
    kind: "article",
    meta: `${post.readTime} min read`,
  }));

  const projectItems: FeedItem[] = projects.map((p) => ({
    key: `proj-${p.id}`,
    href: `/project/${p.slug}`,
    image: p.image,
    imageAlt: p.title,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    tags: p.tags ?? [],
    dateLabel: p.date,
    sortTime: Date.parse(p.date) || 0,
    kind: "project",
    meta: p.location,
  }));

  const sorted = [...articleItems, ...projectItems].sort((a, b) => b.sortTime - a.sortTime);

  return (
    <>
      <SEO
        path="/blog"
        title="Notes from the Field - The Handy Pioneers Blog | Clark County, WA"
        description="Project write-ups, Pacific Northwest homeowner guidance, and field notes from our craftsmen working across Vancouver WA, Camas, Washougal, and Battle Ground."
      />
      <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.97 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }}
    >
      <TopBar />
      <Navbar />

      {/* ── Page Header ── */}
      <section
        className="py-14 px-4 text-center border-b"
        style={{
          backgroundColor: "oklch(0.22 0.07 160)",
          borderColor: "oklch(0.28 0.07 160)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: "oklch(0.62 0.14 65)", color: "oklch(0.15 0.04 65)" }}
          >
            Knowledge & Stories
          </span>
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.96 0.02 80)" }}
          >
            The Handy Pioneers Blog
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "oklch(0.78 0.04 80)" }}
          >
            Home care insights, project stories, and the 360° Method - built for Clark County homeowners, trade partners, and anyone who believes a well-maintained home is a well-lived life.
          </p>
        </div>
      </section>

      {/* ── Post Grid ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: "oklch(0.55 0.03 80)" }}>No posts yet - check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((item) => {
              const isProject = item.kind === "project";
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    boxShadow: "0 2px 16px oklch(0 0 0 / 0.07)",
                    border: "1px solid oklch(0.91 0.015 80)",
                    textDecoration: "none",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isProject ? `Read project story: ${item.title}` : `Read: ${item.title}`}
                >
                  {/* Card image + kind badge */}
                  <div className="relative overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={localImage(item.image)}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: isProject ? "oklch(0.32 0.07 160)" : "oklch(0.62 0.14 65)",
                        color: "oklch(1 0 0)",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {isProject ? "Project Story" : "Insight"}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Category + meta */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: "oklch(0.92 0.06 160)",
                          color: "oklch(0.28 0.07 160)",
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "oklch(0.58 0.03 80)" }}
                      >
                        {isProject ? <MapPin size={12} /> : <Clock size={12} />}
                        {item.meta}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-lg font-bold mb-2 leading-snug group-hover:underline"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "oklch(0.22 0.07 160)",
                        textDecorationColor: "oklch(0.62 0.14 65)",
                      }}
                    >
                      {item.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className="text-sm leading-relaxed mb-4 flex-1"
                      style={{ color: "oklch(0.45 0.02 80)" }}
                    >
                      {item.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.slice(0, 3).map((tag) => (
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
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "oklch(0.91 0.015 80)" }}>
                      <span className="text-xs" style={{ color: "oklch(0.58 0.03 80)" }}>
                        {item.dateLabel}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold"
                        style={{ color: "oklch(0.32 0.07 160)" }}
                      >
                        {isProject ? (
                          <>Full Story <ExternalLink size={11} /></>
                        ) : (
                          <>Read More <ArrowRight size={12} /></>
                        )}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Back to home */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.32 0.07 160)", textDecoration: "none" }}
          >
            <ArrowLeft size={14} />
            Back to Handy Pioneers
          </a>
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
}
