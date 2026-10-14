/**
 * ZoomableImage - a single page image that opens full size in the shared
 * PhotoLightbox when tapped or clicked. Pass the same props you would pass to
 * an <img>; className and style land on the image itself.
 */

import { useState, type ImgHTMLAttributes } from "react";
import PhotoLightbox from "@/components/PhotoLightbox";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  /** Caption shown under the photo in the viewer. Defaults to the alt text. */
  caption?: string;
  /** Classes for the button that wraps the image. */
  wrapperClassName?: string;
};

export default function ZoomableImage({ caption, wrapperClassName, ...img }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className={`block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${wrapperClassName ?? "w-full"}`}
        aria-label={`Open photo: ${caption ?? img.alt}`}
      >
        <img {...img} />
      </button>
      <PhotoLightbox
        photos={[{ src: img.src, alt: img.alt, caption: caption ?? img.alt }]}
        index={index}
        onChange={setIndex}
      />
    </>
  );
}
