'use client';

import { useContent } from '@/context/ContentContext';

export default function Creatives() {
  const { pageSettings } = useContent();
  const creatives = pageSettings?.creatives;

  return (
    <section id="talents" className="py-16 sm:py-24 px-5 sm:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {creatives?.badge && (
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block">
            {creatives.badge}
          </span>
        )}

        <h2 className="text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight break-words">
          {creatives?.title || 'World Class Event Videographers & Crew'}
        </h2>

        <div className="max-w-3xl text-slate-300 text-sm sm:text-base font-light leading-relaxed space-y-6">
          <p>{creatives?.description}</p>

          {creatives?.highlightRoles && creatives.highlightRoles.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono text-slate-400 mr-2 uppercase">Spesialisasi:</span>
              {creatives.highlightRoles.map((role, idx) => (
                <a
                  key={idx}
                  href="#contact"
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/15 hover:bg-white hover:text-black transition-colors"
                >
                  {role}
                </a>
              ))}
            </div>
          )}

          {creatives?.locationNote && (
            <p className="text-slate-400 text-xs sm:text-sm italic pt-2 border-t border-white/10">
              {creatives.locationNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
