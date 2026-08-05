'use client';

interface StoriesBannerProps {
  onOpenReel: () => void;
}

export default function StoriesBanner({ onOpenReel }: StoriesBannerProps) {
  return (
    <section id="stories" className="relative w-full min-h-[80vh] bg-black overflow-hidden flex items-center px-8 sm:px-12 py-24">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/work_documentary.png"
          alt="J Creative Stories"
          className="w-full h-full object-cover filter contrast-125 brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-none">
            J Creative Stories
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            J Creative Stories is the documentary branch of J Creative Division. Because we love telling stories visually through inspirational videos. Indonesia is filled with many different types of culture and endless choice of subjects, we love its people and the stories they have to say.
          </p>

          <button
            onClick={onOpenReel}
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white hover:text-slate-300 transition-colors cursor-pointer pt-2"
          >
            <span>WATCH STORIES</span>
            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              ›
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
