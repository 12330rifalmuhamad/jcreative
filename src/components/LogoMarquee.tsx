'use client';

export default function LogoMarquee() {
  const brands = [
    { name: 'NIKE CINEMA', tag: 'Commercial Campaign' },
    { name: 'PORSCHE', tag: 'Global Brand Film' },
    { name: 'SONY MUSIC', tag: 'Official Music Video' },
    { name: 'RED BULL', tag: 'Action Documentary' },
    { name: 'SPOTIFY', tag: 'Original Series' },
    { name: 'SAMSUNG', tag: 'Product Launch Film' },
    { name: 'BMW GROUP', tag: 'Automotive Narrative' },
    { name: 'UNIVERSAL', tag: 'Feature Film Production' },
  ];

  return (
    <section className="relative py-12 bg-[#09090d] border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
          Dipercaya oleh Brand Global &amp; Agensi Terkemuka
        </p>
      </div>

      {/* Marquee Track */}
      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee flex items-center justify-around gap-16 min-w-full">
          {brands.concat(brands).map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer group px-4"
            >
              <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-white group-hover:text-gradient">
                {brand.name}
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-1">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
