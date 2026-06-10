"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/data/photos";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];

  const prev = useCallback(() => onNavigate((index - 1 + photos.length) % photos.length), [index, photos.length, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % photos.length), [index, photos.length, onNavigate]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <div className="relative max-h-[88vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <Image
          src={photo.src}
          alt="Photography by Jai M Sanghavi"
          width={photo.width}
          height={photo.height}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          className="max-h-[82vh] w-auto rounded-sm object-contain"
          priority
        />
        <p className="mt-3 text-center font-mono text-[11px] tracking-[0.25em] text-white/70">
          FRM {String(index + 1).padStart(3, "0")} / {String(photos.length).padStart(3, "0")}
        </p>
      </div>

      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 p-2 font-mono text-sm tracking-[0.2em] text-white/80 hover:text-white">
        ESC ✕
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-2xl text-white/70 hover:text-white">
        ←
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-2xl text-white/70 hover:text-white">
        →
      </button>
    </div>
  );
}
