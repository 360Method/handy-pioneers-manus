/**
 * BlogPost — /blog/:slug
 * Full blog post detail page with share buttons.
 * Design: Pacific Northwest Craftsman — matches main site aesthetic.
 * Opens in a new tab from blog index cards.
 */

import { useEffect } from "react";
import { useParams } from "wouter";
import { getPublishedPosts, BlogBlock } from "@/lib/blog";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Link2,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hp-full-logo_4f724ec4.jpg";

// GMB profile link
const GMB_URL = "https://share.google/OJgEhJ3AIQZ7AZP";

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

function ShareButtons({ title, url }: { title: string; url: string }) {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link.");
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
        style={{ color: "oklch(0.55 0.03 80)" }}
      >
        <Share2 size={13} /> Share
      </span>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#1877F2", color: "#fff", textDecoration: "none" }}
        aria-label="Share on Facebook"
      >
        <Facebook size={13} /> Facebook
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#000", color: "#fff", textDecoration: "none" }}
        aria-label="Share on X"
      >
        <Twitter size={13} /> X
      </a>

      {/* Copy link */}
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 border"
        style={{
          borderColor: "oklch(0.82 0.015 80)",
          backgroundColor: "oklch(0.97 0.015 80)",
          color: "oklch(0.35 0.04 80)",
        }}
        aria-label="Copy link"
      >
        <Link2 size={13} /> Copy Link
      </button>
    </div>
  );
}

function RenderBlock({ block }: { block: BlogBlock }) {
  const bodyColor = "oklch(0.32 0.02 80)";
  const headingColor = "oklch(0.22 0.07 160)";

  // Parse **bold** markdown in text
  const parseBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  switch (block.type) {
    case "h2":
      return (
        <h2
          className="text-2xl font-bold mt-10 mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: headingColor }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          className="text-xl font-bold mt-8 mb-3"
          style={{ fontFamily: "'Playfair Display', serif", color: headingColor }}
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-base leading-relaxed mb-5" style={{ color: bodyColor }}>
          {parseBold(block.text || "")}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-5 space-y-2 pl-5" style={{ color: bodyColor }}>
          {(block.items || []).map((item, i) => (
            <li key={i} className="text-base leading-relaxed list-disc">
              {parseBold(item)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-5 space-y-2 pl-5" style={{ color: bodyColor }}>
          {(block.items || []).map((item, i) => (
            <li key={i} className="text-base leading-relaxed list-decimal">
              {parseBold(item)}
            </li>
          ))}
        </ol>
      );
    case "blockquote":
      return (
        <blockquote
          className="my-6 pl-5 py-4 pr-4 rounded-r-xl border-l-4 italic text-base leading-relaxed"
          style={{
            borderColor: "oklch(0.62 0.14 65)",
            backgroundColor: "oklch(0.95 0.015 80)",
            color: "oklch(0.38 0.03 80)",
          }}
        >
          {block.text}
        </blockquote>
      );
    case "cta":
      return (
        <div
          className="my-8 rounded-2xl p-6 text-center"
          style={{
            background: "linear-gradient(135deg, oklch(0.22 0.07 160) 0%, oklch(0.28 0.06 160) 100%)",
          }}
        >
          <p
            className="text-base font-semibold mb-4"
            style={{ color: "oklch(0.92 0.02 80)" }}
          >
            {block.text}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="hcp-button"
              onClick={() => window.HCPWidget?.openModal()}
              style={{ fontSize: "0.95rem", padding: "0.75rem 1.75rem" }}
            >
              {block.ctaLabel || "Schedule a Consultation"}
            </button>
            <a
              href="tel:+13605449858"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm border"
              style={{
                borderColor: "oklch(0.65 0.10 80)",
                color: "oklch(0.90 0.06 80)",
                textDecoration: "none",
              }}
            >
              <Phone size={14} />
              (360) 544-9858
            </a>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  // Drip-release: only allow access to posts whose publishDate has passed
  const post = getPublishedPosts().find((p) => p.slug === slug);

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://handypioneers.com/blog/${slug}`;

  useEffect(() => {
    window.scrollTo(0, 0);

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = selector
          .replace('meta[', '')
          .replace(']', '')
          .split('="');
        el.setAttribute(attrName, attrVal.replace('"', ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (post) {
      const title = post.seoTitle || `${post.title} | Handy Pioneers`;
      const desc = post.seoDesc || post.excerpt;
      const image = post.image;
      const url = currentUrl;

      document.title = title;

      // Standard meta
      setMeta('meta[name="description"]', 'content', desc);

      // Open Graph
      setMeta('meta[property="og:title"]', 'content', title);
      setMeta('meta[property="og:description"]', 'content', desc);
      setMeta('meta[property="og:image"]', 'content', image);
      setMeta('meta[property="og:url"]', 'content', url);
      setMeta('meta[property="og:type"]', 'content', 'article');

      // Twitter / X Card
      setMeta('meta[name="twitter:title"]', 'content', title);
      setMeta('meta[name="twitter:description"]', 'content', desc);
      setMeta('meta[name="twitter:image"]', 'content', image);
      setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    } else {
      document.title = "Post Not Found | Handy Pioneers";
    }

    return () => {
      // Restore site-level defaults on unmount
      const siteTitle = "Vancouver Home Services & Remodeling | Handy Pioneers | Complimentary Consultations for Clark County Homeowners";
      const siteDesc = "Complimentary consultations. 5 Star Rated. Licensed & Insured. Handy Pioneers is Clark County's trusted home services and remodeling partner. Call or visit today.";

      const siteImage = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/og-image_2d8f1c3a.jpg";
      const siteUrl = "https://handypioneers.com/";
      document.title = "Handy Pioneers — Reliable Renovations, Trusted Results";
      const restore = (selector: string, value: string) => {
        const el = document.querySelector(selector) as HTMLMetaElement | null;
        if (el) el.setAttribute('content', value);
      };
      restore('meta[name="description"]', siteDesc);
      restore('meta[property="og:title"]', siteTitle);
      restore('meta[property="og:description"]', siteDesc);
      restore('meta[property="og:image"]', siteImage);
      restore('meta[property="og:url"]', siteUrl);
      restore('meta[name="twitter:title"]', siteTitle);
      restore('meta[name="twitter:description"]', siteDesc);
      restore('meta[name="twitter:image"]', siteImage);
    };
  }, [post, currentUrl]);

  if (!post) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
        style={{ backgroundColor: "oklch(0.97 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }}
      >
        <h1
          className="text-3xl font-bold text-center"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
        >
          Post Not Found
        </h1>
        <a
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
          style={{ backgroundColor: "oklch(0.32 0.07 160)", color: "#fff", textDecoration: "none" }}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </a>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.97 0.015 80)", fontFamily: "'Source Sans 3', sans-serif" }}
    >
      {/* ── Sticky Nav ── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "oklch(0.22 0.07 160)",
          borderColor: "oklch(0.28 0.07 160)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "oklch(0.95 0.02 80)", textDecoration: "none" }}
          >
            <ArrowLeft size={16} />
            All Posts
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "oklch(0.80 0.10 80)", textDecoration: "none" }}
            >
              <img src={LOGO_URL} alt="Handy Pioneers" className="h-7 w-auto" />
            </a>
            <button
              className="hcp-button"
              onClick={() => window.HCPWidget?.openModal()}
              style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Image ── */}
      <div className="max-w-4xl mx-auto w-full px-4 pt-8">
        <div className="overflow-hidden rounded-xl" style={{ maxHeight: "460px" }}>
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full object-cover"
            style={{ maxHeight: "460px", objectPosition: "center" }}
          />
        </div>
      </div>

      {/* ── Article ── */}
      <main className="max-w-4xl mx-auto w-full px-4 py-10">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: "oklch(0.32 0.07 160)", color: "#fff" }}
          >
            {post.category}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "oklch(0.55 0.04 65)" }}
          >
            <Calendar size={12} />
            {post.date}
          </span>
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: "oklch(0.55 0.04 65)" }}
          >
            <Clock size={12} />
            {post.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        <p
          className="text-lg mb-6 leading-relaxed"
          style={{ color: "oklch(0.40 0.03 80)", fontStyle: "italic" }}
        >
          {post.excerpt}
        </p>

        {/* Share buttons — top */}
        <div className="mb-8 pb-6 border-b" style={{ borderColor: "oklch(0.88 0.015 80)" }}>
          <ShareButtons title={post.title} url={currentUrl} />
        </div>

        {/* Body */}
        <article>
          {post.body.map((block, i) => (
            <RenderBlock key={i} block={block} />
          ))}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium"
              style={{ backgroundColor: "oklch(0.91 0.015 80)", color: "oklch(0.38 0.04 80)" }}
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        {/* Share buttons — bottom */}
        <div
          className="py-6 border-t border-b mb-8"
          style={{ borderColor: "oklch(0.88 0.015 80)" }}
        >
          <p
            className="text-sm font-semibold mb-3"
            style={{ color: "oklch(0.35 0.03 80)" }}
          >
            Found this helpful? Share it with a neighbor.
          </p>
          <ShareButtons title={post.title} url={currentUrl} />
        </div>

        {/* Google Review CTA */}
        <div
          className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4"
          style={{
            backgroundColor: "oklch(0.95 0.015 80)",
            border: "1px solid oklch(0.88 0.015 80)",
          }}
        >
          <div className="flex-1">
            <p
              className="font-bold text-base mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}
            >
              Happy with Handy Pioneers?
            </p>
            <p className="text-sm" style={{ color: "oklch(0.45 0.02 80)" }}>
              Leave us a Google review — it helps Clark County homeowners find trusted local service.
            </p>
          </div>
          <a
            href={GMB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#4285F4", color: "#fff", textDecoration: "none" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Leave a Review
          </a>
        </div>

        {/* References */}
        {post.references && post.references.length > 0 && (
          <div
            className="mb-8 rounded-xl p-5"
            style={{
              backgroundColor: "oklch(0.96 0.012 80)",
              border: "1px solid oklch(0.88 0.015 80)",
            }}
          >
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-3"
              style={{ color: "oklch(0.35 0.03 80)" }}
            >
              Sources &amp; References
            </h3>
            <ol className="space-y-2">
              {post.references.map((ref, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: "oklch(0.42 0.02 80)" }}>
                  <span className="font-semibold shrink-0" style={{ color: "oklch(0.32 0.07 160)" }}>
                    [{i + 1}]
                  </span>
                  <span>
                    {ref.label}{" "}
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 transition-opacity hover:opacity-70 break-all"
                      style={{ color: "oklch(0.32 0.07 160)" }}
                    >
                      {ref.url}
                    </a>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
        {/* Back links */}
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.32 0.07 160)", textDecoration: "none" }}
          >
            <ArrowLeft size={14} />
            All Blog Posts
          </a>
          <a
            href="/#gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.32 0.07 160)", textDecoration: "none" }}
          >
            View Project Gallery
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
          <a href="/" style={{ color: "oklch(0.75 0.06 80)", textDecoration: "none" }}>
            handypioneers.com
          </a>
          {" · "}
          <a href="/blog" style={{ color: "oklch(0.75 0.06 80)", textDecoration: "none" }}>
            Blog
          </a>
          {" · "}
          <a href="/#gallery" style={{ color: "oklch(0.75 0.06 80)", textDecoration: "none" }}>
            Project Gallery
          </a>
        </p>
      </footer>
    </div>
  );
}
