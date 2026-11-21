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
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase">
                {statement.badge}
              </span>
            </div>
          )}

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] break-words uppercase">
            {statement?.title || 'Specialist Event Documentation & Media Production'}
          </h2>

          {/* Quick Metrics Badges - Focus on Professional Experience */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
            <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-xl">
              <span className="text-xl sm:text-2xl font-black font-mono text-white block">10+ TAHUN</span>
              <span className="text-[10px] font-mono uppercase text-slate-400">Pengalaman Profesional</span>
            </div>
            <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-xl">
              <span className="text-xl sm:text-2xl font-black font-mono text-white block">PRO CREW</span>
              <span className="text-[10px] font-mono uppercase text-slate-400">Liputan Konser &amp; Event</span>
            </div>
          </div>
        </div>

        {/* Right Column: 1 Clean Paragraph Focused on Professional Experience */}
        <div className="lg:col-span-7 space-y-8">
          <div className="border-l-2 border-white/40 pl-6 sm:pl-8 py-2">
            <p className="text-base sm:text-xl text-slate-200 font-light leading-relaxed">
              {statement?.paragraph1 ||
                'Sebagai rumah produksi media visual dan dokumentasi event profesional, J Creative berdedikasi mengabadikan atmosfer autentik, momen penting, dan energi magis di setiap perhelatan. Didukung oleh tim videografer dan fotografer yang kaya pengalaman bertahun-tahun menangani konser musik skala besar, festival, hingga konferensi dan corporate gathering nasional, kami menjamin eksekusi liputan yang cepat, presisi, dan berstandar sinematik tinggi untuk menghasilkan karya visual yang berkesan serta bernilai abadi.'}
            </p>
          </div>

          {/* Feature highlights grid - professional capabilities without 8k */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10">
            <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Multi-Camera Live Direction</h4>
                <p className="text-[11px] text-slate-400 font-light">Liputan simultan sudut panggung utama &amp; penonton</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Aerial FPV &amp; Drone</h4>
                <p className="text-[11px] text-slate-400 font-light">Sorotan atmosfer spektakuler skala festival &amp; stadion</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Same-Day Recap Highlight</h4>
                <p className="text-[11px] text-slate-400 font-light">Video aftermovie ekspres siap tayang kebutuhan medsos</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </div>
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
