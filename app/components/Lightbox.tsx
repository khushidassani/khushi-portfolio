"use client";
import { useEffect } from "react";

interface Props {
  images: string[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}

export default function Lightbox({ images, index, onClose, onNav }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) onNav((index + 1) % images.length);
      if (e.key === "ArrowLeft" && images.length > 1) onNav((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images, index, onClose, onNav]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>Close ✕</button>
      {images.length > 1 && (
        <>
          <button className="lightbox-arrow prev" onClick={e => { e.stopPropagation(); onNav((index - 1 + images.length) % images.length); }}>‹</button>
          <button className="lightbox-arrow next" onClick={e => { e.stopPropagation(); onNav((index + 1) % images.length); }}>›</button>
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="lightbox-img"
        src={images[index]}
        alt="Portfolio image"
        onClick={e => e.stopPropagation()}
      />
      {images.length > 1 && (
        <div className="lightbox-counter">{index + 1} / {images.length}</div>
      )}
    </div>
  );
}
