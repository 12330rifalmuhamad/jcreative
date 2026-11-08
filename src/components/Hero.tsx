'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useContent, HeroSlide } from '@/context/ContentContext';

interface HeroProps {
  onOpenReel: () => void;
}

const SLIDE_DURATION = 5500; // 5.5 seconds per slide

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    title: "CRAFTING UNFORGETTABLE EXPERIENCES",
    category: "Premier Visual Storytelling & Production Studio",
    image: "https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790953351/jcreative/showcase/dsc03485.jpg",
  },
  {
    id: "hero-2",
    title: "ELEVATE YOUR VISUAL IDENTITY",
    category: "World-Class Cinematography & Media Excellence",
    image: "https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997521/jcreative/showcase/dsc03481.jpg",
  },
  {
    id: "hero-3",
    title: "WHERE PASSION MEETS PRECISION",
    category: "End-to-End Creative Film & Media Production",
    image: "https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997587/jcreative/hero/dsc02194.jpg",
  },
];

export default function Hero({ onOpenReel }: HeroProps) {
  const { heroSlides } = useContent();
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : FALLBACK_SLIDES;

  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Automatic slide interval - runs continuously
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide, currentSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSlide(); // swipe left
    } else if (diff < -50) {
      prevSlide(); // swipe right
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full h-screen bg-black overflow-hidden flex items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fullscreen Slide Backgrounds with smooth transitions & subtle Ken Burns scale */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={`${slide.id || idx}-${slide.image}`}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              currentSlide === idx
                ? 'opacity-100 scale-105 z-10'
                : 'opacity-0 scale-100 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover filter contrast-125 brightness-75"
            />
          </div>
        ))}
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/80 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-30 max-w-7xl mx-auto px-5 sm:px-12 w-full pt-24 sm:pt-16 flex flex-col justify-center">
        <div className="max-w-5xl lg:max-w-6xl">
          {/* Animated Slide Title */}
          <div key={currentSlide} className="animate-hero-fade-up">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.08] mb-4 uppercase whitespace-normal break-normal">
              {slides[currentSlide].title}{' '}
              <span className="block text-base sm:text-2xl md:text-3xl lg:text-4xl font-light opacity-90 text-slate-300 mt-3 sm:mt-4 leading-snug normal-case">
                {slides[currentSlide].category}
              </span>
            </h1>
          </div>

          {/* Action Reel Button */}
          <button
            onClick={onOpenReel}
            className="group mt-6 sm:mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span>WATCH EVENT REEL</span>
            <span className="w-8 h-px bg-white group-hover:w-12 transition-all" />
          </button>
        </div>

        {/* Bottom Slide Navigation & Progress Bars */}
        <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-6">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer text-sm font-light active:scale-95"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer text-sm font-light active:scale-95"
            >
              ›
            </button>
          </div>

          {/* Interactive Slide Progress Lines */}
          <div className="flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group relative h-9 flex items-center cursor-pointer py-2"
              >
                <div className="w-14 sm:w-20 h-1 bg-white/20 rounded-full overflow-hidden transition-all group-hover:bg-white/40">
                  {currentSlide === idx ? (
                    <div
                      key={`progress-${currentSlide}`}
                      className="h-full bg-white animate-slide-progress rounded-full"
                    />
                  ) : currentSlide > idx ? (
                    <div className="h-full w-full bg-white/60 rounded-full" />
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Edge Vertical Slide Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer ${
              currentSlide === idx
                ? 'h-8 w-1.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                : 'h-4 w-1 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
