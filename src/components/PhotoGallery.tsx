"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Photo = { src: string; alt: string; feature?: boolean };

export function PhotoGallery({ photos }: { photos: readonly Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") {
        setOpen((index) => (index === null ? index : (index + 1) % photos.length));
      }
      if (event.key === "ArrowLeft") {
        setOpen((index) =>
          index === null ? index : (index - 1 + photos.length) % photos.length
        );
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, photos.length]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-flow-dense md:grid-cols-12">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpen(index)}
            className={`group relative overflow-hidden rounded-2xl bg-steel-100 ${
              photo.feature
                ? "min-h-72 sm:col-span-2 md:col-span-7 md:row-span-2 md:min-h-[480px]"
                : index < 3
                  ? "min-h-56 md:col-span-5 md:min-h-[234px]"
                  : "min-h-52 md:col-span-4 md:min-h-[240px]"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                photo.feature
                  ? "(max-width: 768px) 100vw, 58vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((open - 1 + photos.length) % photos.length);
            }}
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white sm:flex"
            aria-label="Previous"
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[open].src}
            alt={photos[open].alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((open + 1) % photos.length);
            }}
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white sm:flex"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
