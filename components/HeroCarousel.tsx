// components/HeroCarousel.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type HeroSlide = {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  image: string;
  overlay?: "dark" | "none";
};

export default function HeroCarousel({
  slides,
  interval = 5500,
}: {
  slides: HeroSlide[];
  interval?: number;
}) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!slides.length) return;
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    timer.current = setInterval(
      () => setIdx((p) => (p + 1) % slides.length),
      interval
    );
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [slides.length, interval]);

  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) setIdx((p) => (p - 1 + slides.length) % slides.length);
    if (dx < -50) setIdx((p) => (p + 1) % slides.length);
    startX.current = null;
  };

  return (
    <section className="relative" aria-roledescription="carousel">
      <div
        className="relative h-[56vw] max-h-[560px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            role={i === idx ? "group" : undefined}
            aria-roledescription="slide"
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            {s.overlay !== "none" && (
              <div className="absolute inset-0 bg-black/40" />
            )}
            <div className="absolute inset-0 p-6 sm:p-10 flex items-end sm:items-center">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-4xl font-extrabold drop-shadow">
                  {s.title}
                </h2>
                {s.subtitle && (
                  <p className="mt-2 text-white/85">{s.subtitle}</p>
                )}
                {s.cta && (
                  <a
                    href={s.cta.href}
                    className="inline-flex mt-4 px-4 py-2 rounded-xl bg-brand-gold text-black font-semibold hover:brightness-110"
                  >
                    {s.cta.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === idx ? "bg-brand-gold" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
