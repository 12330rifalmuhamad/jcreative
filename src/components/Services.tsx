'use client';

import { useContent } from '@/context/ContentContext';

export default function Services() {
  const { services } = useContent();

  const divisions = services;

  return (
    <section id="divisi" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
      <div className="mb-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
          CAPABILITIES
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-white">
          DIVISI KREATIF
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {divisions.map((div) => (
          <div
            key={div.id}
            className="p-6 bg-[#0f0f14] border border-white/10 rounded-2xl hover:border-white/25 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl font-black font-mono text-slate-400 block mb-4">
                {div.id}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{div.title}</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {div.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
