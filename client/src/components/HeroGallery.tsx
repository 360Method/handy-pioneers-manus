/**
 * HeroGallery — Hero-style before/after photo wall
 * Design: Pacific Northwest Craftsman
 * Masonry-inspired grid layout with lightbox on click.
 *
 * TO ADD MORE PHOTOS: append a new object to the `photos` array below with:
 *   id: next sequential number
 *   src: CDN URL from `manus-upload-file --webdev`
 *   caption: short description of the project (10-15 words)
 *   tag: one of "Before & After" | "Remodel" | "Repair" | "Painting" | "Pressure Washing" | "Carpentry" | "Cleaning"
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  caption: string;
  tag?: string;
}

// ─── ADD NEW PHOTOS HERE ──────────────────────────────────────────────────────
const photos: Photo[] = [
  {
    id: 1,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/wjLagUVyHJnefJeB.jpg",
    caption: "Basement transformation — unfinished space to modern kitchen and living area",
    tag: "Remodel",
  },
  {
    id: 2,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/UCqTnokKBAzttFFs.jpg",
    caption: "Basement room transformation with new flooring, kitchen area, and dining space",
    tag: "Before & After",
  },
  {
    id: 3,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/OGRouAudxeyHawdy.jpg",
    caption: "Bathroom remodel with white subway tiles, bathtub, and modern black fixtures",
    tag: "Remodel",
  },
  {
    id: 4,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/HsevCHMMnApBXAqN.jpg",
    caption: "Bathroom remodel featuring new vanity, sink, flooring, and fresh paint",
    tag: "Remodel",
  },
  {
    id: 5,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/jXBeWLauPzuNoocm.jpg",
    caption: "Bathroom remodel with new vanity, mirror, lighting, and flooring",
    tag: "Remodel",
  },
  {
    id: 6,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/WrTgmbwrBOLkeuvQ.jpg",
    caption: "Garage transformation — demolition and clean-out to organized empty space",
    tag: "Before & After",
  },
  {
    id: 7,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/VzlGuBOWFXHnpjig.jpg",
    caption: "Living room and kitchen remodel with hardwood flooring, updated lighting, and fresh paint",
    tag: "Remodel",
  },
  {
    id: 8,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/elKuhgxmpmZnBtDa.jpg",
    caption: "Bathroom remodel — outdated yellow room transformed into a modern white space",
    tag: "Before & After",
  },
  {
    id: 9,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/MPYajNZmbQZgLzvS.jpg",
    caption: "Bathroom remodel — outdated space updated with modern fixtures and finishes",
    tag: "Remodel",
  },
  {
    id: 10,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/RUDYmgCyMipRnwka.jpg",
    caption: "Kitchen remodel — bare wall transformed into a functional modern cooking space",
    tag: "Remodel",
  },
  {
    id: 11,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/ifxXRKwuQfvSbApZ.jpg",
    caption: "Room remodel — transformed into a modern kitchenette with white cabinets and new flooring",
    tag: "Before & After",
  },
  {
    id: 12,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/nRlKKIJALACEEquv.jpg",
    caption: "Kitchen remodel with dark countertops, updated cabinets, and modern fixtures",
    tag: "Remodel",
  },
  {
    id: 13,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/SJzOyycrDNaWEYHN.jpg",
    caption: "Exterior home remodel with new siding, windows, and updated landscaping",
    tag: "Remodel",
  },
  {
    id: 14,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/qMQRAbINWFvrUPEB.jpg",
    caption: "Bathroom remodel featuring new flooring, trim, and toilet replacement",
    tag: "Remodel",
  },
  {
    id: 15,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/jPOgJPckBdaPcCPr.jpg",
    caption: "Room transformation with new flooring, light-colored paint, and window blinds",
    tag: "Before & After",
  },
  {
    id: 16,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/AwSmGNttlDLyBDuO.jpg",
    caption: "Complete room transformation — empty yellow space to modern kitchen and laundry area",
    tag: "Before & After",
  },
  {
    id: 17,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/yzuTNmsrwjoSvvTt.jpg",
    caption: "House exterior before and after — newly installed white gutters",
    tag: "Before & After",
  },
  {
    id: 18,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/ryLhHcoLDKcrOody.jpg",
    caption: "Living room transformation with hardwood flooring, recessed lighting, and updated fireplace",
    tag: "Remodel",
  },
  {
    id: 19,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/xwDBZkjnyzCPfPzP.jpg",
    caption: "Bathroom transformation with new tiles, vanity, and modern fixtures",
    tag: "Before & After",
  },
  {
    id: 20,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/NnOoZJHBczCXjeKB.jpg",
    caption: "Basement room transformation with new flooring, recessed lighting, and fresh paint",
    tag: "Before & After",
  },
  {
    id: 21,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/pJHcMDChEQIqznEz.jpg",
    caption: "Clean and organized kitchen with white cabinets and stainless steel appliances",
    tag: "Remodel",
  },
  {
    id: 22,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/hsBQUCJsPHmAqWDF.jpg",
    caption: "Trex railing installation with custom gate on a deck — before and after",
    tag: "Carpentry",
  },
  {
    id: 23,
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663386531688/XVCTcQFFmRquAQZe.jpg",
    caption: "72-inch TV wall mount installation — clean and professional finish",
    tag: "Before & After",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const ALL_TAGS = ["All", ...Array.from(new Set(photos.map((p) => p.tag).filter(Boolean))) as string[]];

export default function HeroGallery() {
  const [activeTag, setActiveTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTag === "All" ? photos : photos.filter((p) => p.tag === activeTag);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  const currentPhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section
      id="photo-gallery"
      className="py-16"
      style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8 reveal">
          <div className="section-divider justify-center mb-4">
            <span
              className="section-divider-label"
              style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(1 0 0)" }}
            >
              Photo Gallery
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.96 0.01 80)" }}
          >
            Our Work in Pictures
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.75 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
          >
            A growing collection of before &amp; after photos from jobs across Clark County.
          </p>
        </div>

        {/* Tag Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 reveal">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setLightboxIndex(null); }}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                backgroundColor: activeTag === tag ? "oklch(0.65 0.14 65)" : "oklch(0.30 0.06 160)",
                color: "oklch(0.96 0.01 80)",
                border: "none",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry Photo Grid */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 reveal"
          style={{ columnGap: "0.75rem" }}
        >
          {filtered.map((photo, index) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group mb-3 break-inside-avoid"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, oklch(0 0 0 / 0.72) 0%, transparent 55%)",
                }}
              >
                <div className="flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    {photo.tag && (
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1"
                        style={{
                          backgroundColor: "oklch(0.65 0.14 65)",
                          color: "oklch(1 0 0)",
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                      >
                        {photo.tag}
                      </span>
                    )}
                    <p
                      className="text-xs font-medium leading-snug truncate"
                      style={{ color: "oklch(0.96 0.01 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {photo.caption}
                    </p>
                  </div>
                  <ZoomIn size={16} color="oklch(0.96 0.01 80)" className="flex-none" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 reveal">
          <button
            className="hcp-button"
            onClick={() => window.open("https://client.handypioneers.com/book", "_blank", "noopener")}
          >
            Schedule a Consultation
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }}
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }}
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              className="w-full rounded-2xl object-contain"
              style={{ maxHeight: "78vh" }}
            />
            <div className="mt-3 text-center">
              {currentPhoto.tag && (
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mr-2"
                  style={{
                    backgroundColor: "oklch(0.65 0.14 65)",
                    color: "oklch(1 0 0)",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {currentPhoto.tag}
                </span>
              )}
              <span
                className="text-sm"
                style={{ color: "oklch(0.80 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {currentPhoto.caption}
              </span>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {(lightboxIndex ?? 0) + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
