/**
 * WorkPhotoGrid - the "recent work" photo grid on the Membership and
 * Multifamily pages. Every photo opens the shared PhotoLightbox at that photo,
 * and you can page through the whole set from there.
 */

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import PhotoLightbox from "@/components/PhotoLightbox";
import { WORK_PHOTOS } from "@/lib/workPhotos";

export default function WorkPhotoGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const photos = WORK_PHOTOS.map((p) => ({ src: p.src, alt: p.caption, caption: p.caption }));

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WORK_PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group block w-full text-left rounded-lg overflow-hidden shadow-sm cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label={`Open photo: ${photo.caption}`}
          >
            <div className="relative overflow-hidden">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100"
                style={{ backgroundColor: "oklch(0 0 0 / 0.55)", color: "oklch(0.96 0.01 80)" }}
                aria-hidden="true"
              >
                <ZoomIn size={16} />
              </span>
            </div>
            <div className="px-3 py-2 bg-white">
              <p className="text-xs font-medium" style={{ color: "oklch(45% 0.02 60)" }}>
                {photo.caption}
              </p>
            </div>
          </button>
        ))}
      </div>
      <PhotoLightbox photos={photos} index={index} onChange={setIndex} />
    </>
  );
}
