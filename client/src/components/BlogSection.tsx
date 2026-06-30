/**
 * BlogSection - embedded on the homepage at #blog-section
 * A teaser: the latest 3 items from the blended feed (local project stories +
 * knowledge/insight articles), sorted newest-first. The full archive lives at
 * /blog, reached via the "Read the blog" button below the cards.
 * Project cards link to /project/:slug, articles to /blog/:slug.
 * Design: Pacific Northwest Craftsman
 */

import { getPublishedPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";
import { localImage } from "@/lib/img";
import { Clock, Tag, ArrowRight, BookOpen, MapPin, ExternalLink } from "lucide-react";

// Homepage shows only the newest few; the rest live on the /blog archive.
const HOME_FEED_LIMIT = 3;

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

export default function BlogSection() {
  // Drip-released articles + project stories, blended newest-first.
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

  const allItems = [...projectItems, ...articleItems].sort((a, b) => b.sortTime - a.sortTime);
  const items = allItems.slice(0, HOME_FEED_LIMIT);

  return (
    <section id="blog-section" className="py-20 px-4" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: "oklch(0.92 0.06 160)", color: "oklch(0.28 0.07 160)" }}
          >
            <BookOpen size={12} />
            The Handy Pioneers Blog
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
          >
            Local Work &amp; Home Care Insights
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "oklch(0.45 0.03 80)" }}>
            Completed projects across Clark County and practical home-care knowledge - for
            homeowners who believe a well-maintained home is a well-lived life.
          </p>
        </div>

        {/* Latest cards (newest 3), blended newest-first */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: "oklch(0.55 0.03 80)" }}>New posts coming soon - check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const isProject = item.kind === "project";
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    boxShadow: "0 2px 16px oklch(0 0 0 / 0.07)",
                    border: "1px solid oklch(0.91 0.015 80)",
                    textDecoration: "none",
                  }}
                  aria-label={isProject ? `Read project story: ${item.title}` : `Read: ${item.title}`}
                >
                  {/* Image + kind badge */}
                  <div className="relative overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={localImage(item.image)}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: isProject ? "oklch(0.32 0.07 160)" : "oklch(0.62 0.14 65)",
                        color: "oklch(1 0 0)",
                        fontFamily: "'Source Sans 3', sans-serif",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {isProject ? "Project Story" : "Insight"}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{ backgroundColor: "oklch(0.92 0.06 160)", color: "oklch(0.28 0.07 160)" }}
                      >
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "oklch(0.58 0.03 80)" }}>
                        {isProject ? <MapPin size={12} /> : <Clock size={12} />}
                        {item.meta}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2 leading-snug group-hover:underline"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "oklch(0.22 0.07 160)",
                        textDecorationColor: "oklch(0.62 0.14 65)",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "oklch(0.45 0.02 80)" }}>
                      {item.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.slice(0, 3).map((tag) => (
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

                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "oklch(0.91 0.015 80)" }}>
                      <span className="text-xs" style={{ color: "oklch(0.58 0.03 80)" }}>
                        {item.dateLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "oklch(0.32 0.07 160)" }}>
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

        {/* Archive CTA - the full feed lives at /blog */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "oklch(0.32 0.07 160)",
              color: "oklch(1 0 0)",
              fontFamily: "'Source Sans 3', sans-serif",
              letterSpacing: "0.05em",
              textDecoration: "none",
              boxShadow: "0 2px 12px oklch(0.32 0.07 160 / 0.25)",
            }}
            aria-label="See all posts on the Handy Pioneers blog"
          >
            See all posts
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
