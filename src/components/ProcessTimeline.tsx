'use client';

export default function ProcessTimeline() {
  const steps = [
    {
      num: '01',
      title: 'Brief & Event Rundown',
      subtitle: 'BRIEF & SHOT-LIST PLANNING',
      desc: 'Konsultasi konsep liputan, pemetaan rundown acara, pemetaan titik kamera panggung utama, serta penetapan daftar momen krusial.',
    },
    {
      num: '02',
      title: 'Persiapan Teknis Venue',
      subtitle: 'RECCE & SYSTEM CHECK',
      desc: 'Pemeriksaan sistem multi-kamera, sinergi audio board venue, pemasangan drone aerial, dan briging kru teknis sebelum acara.',
    },
    {
      num: '03',
      title: 'On-Site Live Coverage',
      subtitle: 'REAL-TIME EVENT FILMING',
      desc: 'Eksekusi liputan lapangan secara real-time menangkap aksi panggung utama, ekspresi penonton, tamu VIP, dan atmosfer acara.',
    },
    {
      num: '04',
      title: 'Express Edit & Aftermovie',
      subtitle: 'EXPRESS EDIT & DELIVERY',
      desc: 'Penyuntingan cepat (Express 24-Hour Edit), DaVinci Color Grading sinematik, serta penyerahan master video recap & foto event.',
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#070709] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            THE J CREATIVE STANDARD
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            ALUR PRODUKSI <span className="text-slate-400">SINEMATIK</span>
          </h2>
          <p className="text-slate-400 text-sm font-light mt-4 leading-relaxed">
            Metode terstruktur yang menjamin kualitas visual tanpa kompromi dari ide awal hingga penyerahan file master.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#101016] border border-white/10 rounded-2xl p-6 relative hover:border-white/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black text-white font-mono group-hover:text-gradient">
                  {step.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                {step.subtitle}
              </p>

              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
