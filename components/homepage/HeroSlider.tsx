"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { heroSlides } from "@/data/homepage/hero";

const SLIDE_MS = 6000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(index + 1), SLIDE_MS);
    return () => clearInterval(timer);
  }, [index, go]);

  return (
    <section
      className="relative isolate overflow-hidden bg-campus-blue-dark"
      aria-roledescription="carousel"
    >
      <div className="relative h-[500px] w-full sm:h-[580px] lg:h-[720px]">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${heroSlides.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover ${
                  i === index ? "motion-safe:animate-kenburns" : ""
                }`}
                style={{ animationDuration: `${SLIDE_MS + 1500}ms` }}
              />
            </div>
            {/* Layered scrim: darker at the base for text contrast, a cool
                blue tint through the middle so the photo reads as part of
                the brand rather than a stock cutout, and a soft top vignette
                so the nav bar always stays legible over any image. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-campus-blue-dark/25 to-black/25" />
            <div className="absolute inset-0 bg-dot-grid text-white/[0.05]" />

            <div className="section-container absolute inset-x-0 bottom-8 sm:bottom-12 lg:bottom-16">
              {slide.eyebrow && (
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/25 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-campus-maroon" aria-hidden="true" />
                  {slide.eyebrow}
                </p>
              )}
              <h1 className="max-w-2xl font-display text-[2rem] font-bold leading-[1.08] text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85 sm:text-base">
                {slide.subtitle}
              </p>


            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20 sm:left-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20 sm:right-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

      </div>
    </section>
  );
}
