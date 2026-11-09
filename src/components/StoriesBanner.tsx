'use client';

import Image from 'next/image';
import { useContent } from '@/context/ContentContext';

interface StoriesBannerProps {
  onOpenReel: () => void;
}

export default function StoriesBanner({ onOpenReel }: StoriesBannerProps) {
  const { pageSettings } = useContent();
  const banner = pageSettings?.storiesBanner;
  const bgImage = banner?.backgroundImage || '/images/DSC03481.jpg';

  return (
    <section id="stories" className="relative w-full min-h-[60vh] sm:min-h-[80vh] bg-black overflow-hidden flex items-center px-5 sm:px-12 py-16 sm:py-24">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <Image
          key={bgImage}
          src={bgImage}
          alt={banner?.title || 'J Creative Stories'}
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover filter contrast-125 brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-xl space-y-4 sm:space-y-6">
          {banner?.badge && (
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block">
              {banner.badge}
            </span>
          )}

          <h2 className="text-3xl sm:text-7xl font-bold tracking-tight text-white leading-tight break-words">
            {banner?.title || 'J Creative Event Stories'}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {banner?.description}
          </p>

          <button
            onClick={onOpenReel}
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white hover:text-slate-300 transition-colors cursor-pointer pt-2"
          >
            <span>{banner?.buttonText || 'WATCH EVENT AFTERMOVIE'}</span>
            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              ›
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
