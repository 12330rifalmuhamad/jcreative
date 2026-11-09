'use client';

import { useContent } from '@/context/ContentContext';

export default function Statement() {
  const { pageSettings } = useContent();
  const statement = pageSettings?.statement;

  return (
    <section id="about" className="py-20 sm:py-32 px-5 sm:px-12 bg-black text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
        {/* Left Column: Heading & Capabilities Highlights */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          {statement?.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase">
                {statement.badge}
              </span>
            </div>
          )}

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] break-words uppercase">
            {statement?.title || 'Specialist Event Documentation & Media Production'}
          </h2>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-xl">
              <span className="text-xl sm:text-2xl font-black font-mono text-white block">8K HDR</span>
              <span className="text-[10px] font-mono uppercase text-slate-400">Multicam Standard</span>
            </div>
            <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-xl">
              <span className="text-xl sm:text-2xl font-black font-mono text-white block">24-HOUR</span>
              <span className="text-[10px] font-mono uppercase text-slate-400">Express Recap Turnaround</span>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Event Editorial Description */}
        <div className="lg:col-span-7 space-y-6">
          {/* Paragraph 1: Lead Paragraph with subtle accent bar */}
          {statement?.paragraph1 && (
            <div className="border-l-2 border-white/40 pl-5 sm:pl-6 py-1">
              <p className="text-base sm:text-lg text-white font-light leading-relaxed">
                {statement.paragraph1}
              </p>
            </div>
          )}

          {/* Paragraph 2: Technical Multicam Specs */}
          {statement?.paragraph2 && (
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {statement.paragraph2}
            </p>
          )}

          {/* Paragraph 3: Real-time highlights & editing speed */}
          {statement?.paragraph3 && (
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {statement.paragraph3}
            </p>
          )}

          {/* Paragraph 4: Closing Commitment in an elegant card */}
          {statement?.paragraph4 && (
            <div className="p-5 sm:p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Komitmen Eksekusi
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                {statement.paragraph4}
              </p>
            </div>
          )}

          {/* Feature highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-base">🎥</span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">8K Multi-Camera Live</h4>
                <p className="text-[11px] text-slate-400 font-light">Liputan simultan sudut panggung utama &amp; penonton</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-base">🚁</span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Aerial FPV &amp; Drone</h4>
                <p className="text-[11px] text-slate-400 font-light">Sorotan atmosfer spektakuler skala festival &amp; stadion</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-base">⚡</span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Same-Day Recap Highlight</h4>
                <p className="text-[11px] text-slate-400 font-light">Video aftermovie ekspres siap tayang kebutuhan medsos</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-base">🔊</span>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Stereo Master Soundboard</h4>
                <p className="text-[11px] text-slate-400 font-light">Rekaman audio langsung dari console mixer resmi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
