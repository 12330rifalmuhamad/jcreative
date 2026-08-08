'use client';

import { useState } from 'react';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

export default function ShowcaseGrid() {
  const [activeItem, setActiveItem] = useState<ShowcaseItem | null>(null);

  const items: ShowcaseItem[] = [
    {
      id: 'item-1',
      title: 'Cinematic Stage & Concert Production',
      subtitle: 'Unforgettable Live Music Experiences',
      image: '/images/DSC03485.jpg',
      category: 'Brand Slogan & Vision',
    },
    {
      id: 'item-2',
      title: 'Outdoor Festival Experience',
      subtitle: 'Global Music Festival Series',
      image: '/images/DSC03563.jpg',
      category: 'Festival Film',
    },
    {
      id: 'item-3',
      title: 'Soloist Arena World Tour',
      subtitle: 'Live Spotlight Performance',
      image: '/images/DSC03611.jpg',
      category: 'Arena Tour',
    },
    {
      id: 'item-4',
      title: 'Showreel Concert 2026',
      subtitle: 'J Creative Live Master Reel',
      image: '/images/DSC03638.jpg',
      category: 'Official Reel',
    },
  ];

  return (
    <section id="work" className="bg-black text-white w-full border-t border-white/10">
      {/* 2x2 Full Bleed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black cursor-pointer border-b border-r border-white/10"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
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
              <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <span className="text-xs font-mono text-slate-400 block mb-1">{activeItem.category}</span>
              <h3 className="text-3xl font-bold text-white mb-2">{activeItem.title}</h3>
              <p className="text-sm text-slate-300 font-light">{activeItem.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
