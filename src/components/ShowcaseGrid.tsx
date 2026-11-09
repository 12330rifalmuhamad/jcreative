'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useContent, ShowcaseItem } from '@/context/ContentContext';

export default function ShowcaseGrid() {
  const [activeItem, setActiveItem] = useState<ShowcaseItem | null>(null);
  const { showcaseItems } = useContent();

  const items = showcaseItems;

  return (
    <section id="work" className="bg-black text-white w-full border-t border-white/10">
      {/* 2x2 Full Bleed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.image}`}
            onClick={() => setActiveItem(item)}
            className="group relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black cursor-pointer border-b border-r border-white/10"
          >
            {/* Background Image */}
            <Image
              key={item.image}
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:bg-black/40 transition-colors" />

            {/* Typography Overlay (Baliprod Style) */}
            <div className="absolute inset-0 p-5 sm:p-12 flex flex-col justify-end">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-300 block mb-1 sm:mb-2 opacity-80">
                {item.category}
              </span>
              <h3 className="text-xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-1 sm:mb-2 break-words">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-slate-300">
                {item.subtitle}
              </p>

              {/* View Circle Button */}
              <div className="absolute bottom-5 right-5 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/40 bg-black/40 backdrop-blur-xs text-white font-semibold text-[10px] sm:text-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                View
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
          <div className="relative w-full max-w-4xl bg-[#0c0c10] border border-white/20 rounded-2xl overflow-hidden">
            <div className="relative aspect-video">
              <Image
                key={activeItem.image}
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-bold uppercase tracking-wider">
                  {activeItem.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  Event Showcase // 8K HDR
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {activeItem.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 text-slate-300">
                    🎥 Multi-Camera 8K
                  </span>
                  <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 text-slate-300">
                    🔊 Stereo Audio Feed
                  </span>
                  <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 text-slate-300">
                    🚁 Drone Aerial 4K
                  </span>
                  <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 text-slate-300">
                    ⚡ Express Recap
                  </span>
                </div>

                <a
                  href="#contact"
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Ajukan Brief Acara Ini</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
