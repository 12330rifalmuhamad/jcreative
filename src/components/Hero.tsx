'use client';

import { useState } from 'react';

interface HeroProps {
  onOpenReel: () => void;
}

export default function Hero({ onOpenReel }: HeroProps) {
  const slides = [
    {
      title: "CRAFTING UNFORGETTABLE EXPERIENCES",
      category: "Premier Visual Storytelling & Production Studio",
      image: "/images/DSC03485.jpg",
    },
    {
      title: "ELEVATE YOUR VISUAL IDENTITY",
      category: "World-Class Cinematography & Media Excellence",
      image: "/images/DSC03481.jpg",
    },
    {
      title: "WHERE PASSION MEETS PRECISION",
      category: "End-to-End Creative Film & Media Production",
      image: "/images/DSC03563.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center">
      {/* Fullscreen Slide Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover filter contrast-125 brightness-80 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
      </div>

      {/* Main Title & Action Overlay (Baliprod Style) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-12 w-full pt-24 sm:pt-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] mb-4 break-words uppercase">
            {slides[currentSlide].title}{' '}
            <span className="block text-base sm:text-3xl lg:text-5xl font-light opacity-90 text-slate-300 mt-3 sm:mt-4 leading-snug normal-case">
              {slides[currentSlide].category}
            </span>
          </h1>

          <button
            onClick={onOpenReel}
            className="group mt-6 sm:mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span>WATCH EVENT REEL</span>
            <span className="w-8 h-px bg-white group-hover:w-12 transition-all" />
          </button>
        </div>

        {/* Bottom Left Slide Navigation Buttons */}
        <div className="mt-8 sm:mt-16 flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer text-sm font-light"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer text-sm font-light"
          >
            ›
          </button>
        </div>
      </div>

      {/* Right Edge Vertical Dash Slider Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden sm:flex flex-col gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-6 transition-all duration-300 ${currentSlide === idx
                ? 'w-1 bg-white'
                : 'w-[2px] bg-white/30 hover:bg-white/60'
              }`}
          />
        ))}
      </div>
    </section>
  );
}
