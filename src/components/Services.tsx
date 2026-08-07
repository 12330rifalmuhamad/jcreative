'use client';

export default function Services() {
  const divisions = [
    {
      id: '01',
      title: 'Concert & Festival Coverage',
      desc: 'Liputan konser musik dan festival dengan sistem multi-kamera 8K, live switching, dan rekaman audio stereo master.',
    },
    {
      id: '02',
      title: 'Corporate Event & Gathering',
      desc: 'Dokumentasi konferensi, summit, corporate gathering, gala dinner, dan peluncuran produk secara profesional.',
    },
    {
      id: '03',
      title: 'Cinema Event Aftermovie',
      desc: 'Pembuatan video recap dan teaser sinematik dengan ritme editing cepat (Express 24-Hour Turnaround).',
    },
    {
      id: '04',
      title: 'On-Site Photography & Drone',
      desc: 'Dokumentasi foto event resolusi tinggi, cetak cepat on-site, serta liputan udara (aerial drone coverage).',
    },
  ];

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
