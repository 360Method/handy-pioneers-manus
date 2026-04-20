/**
 * Gallery — Photo-only gallery section.
 * Design: Pacific Northwest Craftsman
 * Shows a masonry grid of project photos with tag filtering and a lightbox.
 * Project Stories have moved to the Blog section (#blog).
 */

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ─── PHOTO GALLERY DATA ───────────────────────────────────────────────────────
interface Photo {
  id: number;
  src: string;
  caption: string;
  tag?: string;
}

const photos: Photo[] = [
  { id: 1, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_1_da2fb275.jpg", caption: "Basement transformation — unfinished space to modern kitchen and living area", tag: "Remodel" },
  { id: 2, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_2_aa4bef8d.jpg", caption: "Basement room transformation with new flooring, kitchen area, and dining space", tag: "Before & After" },
  { id: 3, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_3_927cbef0.jpg", caption: "Bathroom remodel with white subway tiles, bathtub, and modern black fixtures", tag: "Remodel" },
  { id: 4, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_4_ae1bbf41.jpg", caption: "Bathroom remodel featuring new vanity, sink, flooring, and fresh paint", tag: "Remodel" },
  { id: 5, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_5_b9619a03.jpg", caption: "Bathroom remodel with new vanity, mirror, lighting, and flooring", tag: "Remodel" },
  { id: 6, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_6_c4d0d10b.jpg", caption: "Garage transformation — demolition and clean-out to organized empty space", tag: "Before & After" },
  { id: 7, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_7_fce0b698.jpg", caption: "Living room and kitchen remodel with hardwood flooring, updated lighting, and fresh paint", tag: "Remodel" },
  { id: 8, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_8_3f6a02ec.jpg", caption: "Bathroom remodel — outdated yellow room transformed into a modern white space", tag: "Before & After" },
  { id: 9, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_9_f469cf74.jpg", caption: "Bathroom remodel — outdated space updated with modern fixtures and finishes", tag: "Remodel" },
  { id: 10, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_10_65bb2ef3.jpg", caption: "Kitchen remodel — bare wall transformed into a functional modern cooking space", tag: "Remodel" },
  { id: 11, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_11_2ae75362.jpg", caption: "Room remodel — transformed into a modern kitchenette with white cabinets and new flooring", tag: "Before & After" },
  { id: 12, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_12_5a42fbb8.jpg", caption: "Kitchen remodel with dark countertops, updated cabinets, and modern fixtures", tag: "Remodel" },
  { id: 13, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_13_6ea38b41.jpg", caption: "Exterior home remodel with new siding, windows, and updated landscaping", tag: "Remodel" },
  { id: 14, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_14_15196e9d.jpg", caption: "Bathroom remodel featuring new flooring, trim, and toilet replacement", tag: "Remodel" },
  { id: 15, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_15_f36cfa9c.jpg", caption: "Room transformation with new flooring, light-colored paint, and window blinds", tag: "Before & After" },
  { id: 16, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_16_0caa7420.jpg", caption: "Complete room transformation — empty yellow space to modern kitchen and laundry area", tag: "Before & After" },
  { id: 18, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_18_7ce45eaa.jpg", caption: "Living room transformation with hardwood flooring, recessed lighting, and updated fireplace", tag: "Remodel" },
  { id: 19, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_19_5f0f2089.jpg", caption: "Bathroom transformation with new tiles, vanity, and modern fixtures", tag: "Before & After" },
  { id: 20, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_20_0e2bd3a6.jpg", caption: "Basement room transformation with new flooring, recessed lighting, and fresh paint", tag: "Before & After" },
  { id: 21, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_21_7e2f0c7b.jpg", caption: "Clean and organized kitchen with white cabinets and stainless steel appliances", tag: "Remodel" },
  { id: 22, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_22_ff4b5bbe.jpg", caption: "Trex railing installation with custom gate on a deck — before and after", tag: "Carpentry" },
  { id: 23, src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386531688/PMFhFJDf55eBmmtmS9ai7o/gallery_23_61a9f859.jpg", caption: "72-inch TV wall mount installation — clean and professional finish", tag: "Before & After" },
];

const PHOTO_TAGS = ["All", ...Array.from(new Set(photos.map((p) => p.tag).filter(Boolean))) as string[]];

export default function Gallery() {
  const [activePhotoTag, setActivePhotoTag] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activePhotoTag === "All" ? photos : photos.filter((p) => p.tag === activePhotoTag);

  const openLightbox = (index: number) => { setLightboxIndex(index); document.body.style.overflow = "hidden"; };
  const closeLightbox = () => { setLightboxIndex(null); document.body.style.overflow = ""; };
  const prevPhoto = (e: React.MouseEvent) => { e.stopPropagation(); if (lightboxIndex === null) return; setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length); };
  const nextPhoto = (e: React.MouseEvent) => { e.stopPropagation(); if (lightboxIndex === null) return; setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length); };
  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: "oklch(0.97 0.015 80)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8 reveal">
          <div className="section-divider justify-center mb-4">
            <span className="section-divider-label">Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.07 160)" }}>
            Project Gallery
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "oklch(0.45 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
            Real projects, real results. Browse our completed work across Clark County.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 reveal">
          {PHOTO_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActivePhotoTag(tag); setLightboxIndex(null); }}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                backgroundColor: activePhotoTag === tag ? "oklch(0.32 0.07 160)" : "oklch(0.90 0.015 80)",
                color: activePhotoTag === tag ? "oklch(1 0 0)" : "oklch(0.35 0.04 80)",
                border: "none",
                letterSpacing: "0.03em",
              }}
            >
              {tag}{tag === "All" && <span className="ml-1.5 text-xs opacity-70">({photos.length})</span>}
            </button>
          ))}
        </div>

        {/* Masonry Photo Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 reveal" style={{ columnGap: "0.75rem" }}>
          {filteredPhotos.map((photo, index) => (
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
              <div
                className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, oklch(0 0 0 / 0.72) 0%, transparent 55%)" }}
              >
                <div className="flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    {photo.tag && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1" style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif" }}>
                        {photo.tag}
                      </span>
                    )}
                    <p className="text-xs font-medium leading-snug truncate" style={{ color: "oklch(0.96 0.01 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
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
          <button className="hcp-button" onClick={() => (window as any).HCPWidget?.openModal()}>
            Request Estimate Today
          </button>
        </div>
      </div>

      {/* Photo Lightbox */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Close">
            <X size={20} />
          </button>
          <button onClick={prevPhoto} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Previous">
            <ChevronLeft size={22} />
          </button>
          <button onClick={nextPhoto} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "oklch(0.25 0.02 80)", color: "oklch(0.96 0.01 80)" }} aria-label="Next">
            <ChevronRight size={22} />
          </button>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              className="w-full rounded-2xl object-contain"
              style={{ maxHeight: "78vh" }}
            />
            <div className="mt-3 text-center">
              {currentPhoto.tag && (
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mr-2" style={{ backgroundColor: "oklch(0.65 0.14 65)", color: "oklch(1 0 0)", fontFamily: "'Source Sans 3', sans-serif" }}>
                  {currentPhoto.tag}
                </span>
              )}
              <span className="text-sm" style={{ color: "oklch(0.80 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                {currentPhoto.caption}
              </span>
              <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.02 80)", fontFamily: "'Source Sans 3', sans-serif" }}>
                {(lightboxIndex ?? 0) + 1} / {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
