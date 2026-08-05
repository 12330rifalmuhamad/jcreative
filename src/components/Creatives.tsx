'use client';

export default function Creatives() {
  return (
    <section id="talents" className="py-24 px-8 sm:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-none">
          We Represent World Class Creatives
        </h2>

        <div className="max-w-2xl text-slate-300 text-sm sm:text-base font-light leading-relaxed space-y-4">
          <p>
            J Creative works with visionary international and local{' '}
            <a href="#contact" className="underline decoration-white underline-offset-4 text-white font-medium hover:text-slate-300">
              Directors
            </a>{' '}
            <a href="#contact" className="underline decoration-white underline-offset-4 text-white font-medium hover:text-slate-300">
              DOP
            </a>{' '}
            <a href="#contact" className="underline decoration-white underline-offset-4 text-white font-medium hover:text-slate-300">
              Photographers
            </a>
            . We are lucky to work with incredibly talented creatives from all over the world, each with their individual and unique style.
          </p>

          <p>
            Most based in Indonesia but others close by and ready to jump on a plane at a moment&apos;s notice.
          </p>
        </div>
      </div>
    </section>
  );
}
