"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setIdx((p) => (p + 1) % slides.length),
      interval
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [slides.length, interval]);

  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) setIdx((p) => (p - 1 + slides.length) % slides.length);
    if (dx < -50) setIdx((p) => (p + 1) % slides.length);
    startX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-black"
      aria-roledescription="carousel"
    >
      <div
        className="relative h-[70vh] min-h-[500px] max-h-[700px] lg:h-[65vh] lg:min-h-[600px] lg:max-h-[800px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ${
              i === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } ${isVisible ? "translate-y-0" : "translate-y-10"}`}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            )}

            {/* Animated Content */}
            <div className="absolute inset-0 flex items-end pb-12 lg:items-center lg:pb-0">
              <div className="container mx-auto px-4 lg:px-8">
                <div
                  className={`max-w-4xl transform transition-all duration-1000 delay-300 ${
                    i === idx
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-4 lg:mb-6">
                    <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 animate-pulse"></span>
                    <span className="text-brand-gold text-sm font-semibold uppercase tracking-wider">
                      Primus FC
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 lg:mb-6">
                    <span className="bg-gradient-to-r from-white via-brand-gold to-white bg-clip-text text-transparent">
                      {s.title}
                    </span>
                  </h1>

                  {s.subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 lg:mb-8 max-w-2xl leading-relaxed">
                      {s.subtitle}
                    </p>
                  )}

                  {s.cta && (
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                      <a
                        href={s.cta.href}
                        className="group inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 rounded-full bg-brand-gold text-black font-bold text-base lg:text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-brand-gold/30"
                      >
                        {s.cta.label}
                        <svg
                          className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                      <a
                        href="/about"
                        className="group inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 rounded-full border-2 border-white/30 text-white font-bold text-base lg:text-lg hover:bg-white hover:text-black transition-all duration-300"
                      >
                        Our Story
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Indicators */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-2 lg:h-3 rounded-full transition-all duration-500 ${
              i === idx
                ? "w-8 lg:w-12 bg-brand-gold"
                : "w-2 lg:w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 lg:h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
