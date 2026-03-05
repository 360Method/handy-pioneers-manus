/**
 * HeroGallery — Hero-style before/after photo wall
 * Design: Pacific Northwest Craftsman
 * Masonry-inspired grid layout with lightbox on click.
 * TO ADD MORE PHOTOS: append to the `photos` array below with a CDN URL, caption, and optional tag.
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  caption: string;
  tag?: string; // e.g. "Before & After", "Remodel", "Repair"
}

// ─── ADD NEW PHOTOS HERE ──────────────────────────────────────────────────────
// Just append a new object to this array with:
//   id: next sequential number
//   src: CDN URL from manus-upload-file --webdev
//   caption: short description of the project
//   tag: optional label badge (e.g. "Before & After", "Remodel", "Repair")
const photos: Photo[] = [
  {
    id: 1,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/hero-photo-1_f7a79987.jpg",
    caption: "Basement Room Transformation — flooring, drywall, recessed lighting",
    tag: "Before & After",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % photos.length);
  };

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section
      id="photo-gallery"
      className="py-16"
      style={{ backgroundColor: "oklch(0.22 0.07 160)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10 reveal">
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

        {/* Photo Grid — masonry-inspired columns */}
        {photos.length === 1 ? (
          // Single photo: large centered hero display
          <div className="flex justify-center reveal">
            <div
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{ maxWidth: "600px", width: "100%" }}
              onClick={() => openLightbox(0)}
            >
              <img
                src={photos[0].src}
                alt={photos[0].caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ borderRadius: "1rem" }}
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, oklch(0 0 0 / 0.7) 0%, transparent 60%)",
                  borderRadius: "1rem",
                }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    {photos[0].tag && (
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1"
                        style={{
                          backgroundColor: "oklch(0.65 0.14 65)",
                          color: "oklch(1 0 0)",
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                      >
                        {photos[0].tag}
                      </span>
                    )}
                    <p
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.96 0.01 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {photos[0].caption}
                    </p>
                  </div>
                  <ZoomIn size={22} color="oklch(0.96 0.01 80)" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Multiple photos: responsive masonry grid
          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 reveal"
            style={{ columnGap: "1rem" }}
          >
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative overflow-hidden rounded-xl cursor-pointer group mb-4 break-inside-avoid"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to top, oklch(0 0 0 / 0.7) 0%, transparent 60%)",
                  }}
                >
                  <div className="flex items-end justify-between">
                    <div>
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
                        className="text-xs font-medium"
                        style={{ color: "oklch(0.96 0.01 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {photo.caption}
                      </p>
                    </div>
                    <ZoomIn size={18} color="oklch(0.96 0.01 80)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10 reveal">
          <button
            className="hcp-button"
            onClick={() => (window as any).HCPWidget?.openModal()}
          >
            Request Estimate Today
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "oklch(0 0 0 / 0.90)" }}
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
          {photos.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }}
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }}
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              className="w-full rounded-2xl object-contain"
              style={{ maxHeight: "80vh" }}
            />
            <div
              className="mt-3 text-center"
            >
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
              {photos.length > 1 && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {(lightboxIndex ?? 0) + 1} / {photos.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
