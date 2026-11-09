'use client';

import { useState } from 'react';

interface EstimateCalculatorProps {
  onSelectEstimate: (details: string) => void;
}

const EVENT_TYPES = [
  {
    id: 'concert',
    label: 'Konser & Festival Musik',
    sub: 'Skala Stadion / Panggung Utama',
    basePrice: 65000000,
  },
  {
    id: 'corporate',
    label: 'Corporate Gathering & Summit',
    sub: 'Konferensi Nasional & Gala Dinner',
    basePrice: 40000000,
  },
  {
    id: 'exhibition',
    label: 'Exhibition & Awarding Night',
    sub: 'Expo, Karpet Merah, & Penganugerahan',
    basePrice: 45000000,
  },
  {
    id: 'private_event',
    label: 'Conference & Private Event',
    sub: 'Seminar Eksklusif & Intimate Gathering',
    basePrice: 30000000,
  },
];

const GEAR_PACKAGES = [
  {
    id: 'standard',
    title: 'Dual-Cam System',
    sub: '2 Unit Sony FX3/FX6 + 2 Crew',
    multiplier: 1.0,
  },
  {
    id: 'multicam',
    title: 'Multicam System 8K',
    sub: '3-4 Cam + Live Switch + Audio Board',
    multiplier: 1.35,
  },
  {
    id: 'master',
    title: 'Full Production Crew',
    sub: 'Multicam 8K + Drone FPV + Audio Master',
    multiplier: 1.7,
  },
];

const ADDONS = [
  {
    key: 'expressAftermovie',
    label: 'Express 24-Hour Aftermovie Edit',
    desc: 'Video recap highlight siap rilis dalam 24 jam',
    price: 15000000,
  },
  {
    key: 'aerialDrone',
    label: 'Aerial FPV & Cinema Drone 4K',
    desc: 'Liputan udara spektakuler venue & atmosfer panggung',
    price: 12000000,
  },
  {
    key: 'photoRecap',
    label: 'Live Photo Recap & DaVinci Color',
    desc: 'Foto event diedit on-site & grading warna profesional',
    price: 10000000,
  },
  {
    key: 'audioFeed',
    label: 'Stereo Master Soundboard Feed',
    desc: 'Rekaman audio stereo murni langsung dari audio console venue',
    price: 8000000,
  },
];

export default function EstimateCalculator({ onSelectEstimate }: EstimateCalculatorProps) {
  const [selectedType, setSelectedType] = useState('concert');
  const [shootingDays, setShootingDays] = useState(1);
  const [selectedGear, setSelectedGear] = useState('multicam');
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: boolean }>({
    expressAftermovie: true,
    aerialDrone: true,
    photoRecap: false,
    audioFeed: true,
  });

  const currentType = EVENT_TYPES.find((t) => t.id === selectedType) || EVENT_TYPES[0];
  const currentGear = GEAR_PACKAGES.find((g) => g.id === selectedGear) || GEAR_PACKAGES[1];

  const calculateTotal = () => {
    let base = currentType.basePrice * shootingDays * currentGear.multiplier;
    ADDONS.forEach((addon) => {
      if (selectedAddons[addon.key]) {
        base += addon.price;
      }
    });
    return base;
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(calculateTotal());

  const handleApplyToForm = () => {
    const detailString = `Estimasi Acara: ${currentType.label} | Durasi: ${shootingDays} Hari | Sistem Liputan: ${currentGear.title} | Estimasi Anggaran: ${formattedPrice}`;
    onSelectEstimate(detailString);
  };

  return (
    <section id="estimator" className="py-24 bg-[#09090d] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            PROPOSALS &amp; BUDGET ESTIMATOR
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            SIMULASI <span className="text-slate-400">ESTIMASI ANGGARAN</span>
          </h2>
          <p className="text-slate-400 text-sm font-light mt-4 leading-relaxed">
            Hitung perkiraan lingkup produksi dan anggaran dokumentasi acara Anda secara transparan berdasarkan kebutuhan teknis dan durasi acara.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#111117] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
            {/* 1. Project Type Selector */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                1. Kategori &amp; Konsep Acara:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                      selectedType === type.id
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{type.label}</div>
                    <div
                      className={`text-[10px] font-mono mt-1 ${
                        selectedType === type.id ? 'text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {type.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Shooting Days */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  2. Durasi Hari Pelaksanaan Acara:
                </label>
                <span className="text-sm font-black text-white font-mono px-3 py-1 bg-white/10 rounded-lg">
                  {shootingDays} Hari
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={shootingDays}
                onChange={(e) => setShootingDays(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                <span>1 Hari (Full Day)</span>
                <span>3 Hari (Festival)</span>
                <span>7 Hari (Series/Summit)</span>
              </div>
            </div>

            {/* 3. Gear & Resolution Package */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                3. Paket Kamera &amp; Konfigurasi Tim:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {GEAR_PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedGear(pkg.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedGear === pkg.id
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-black uppercase">{pkg.title}</div>
                    <div
                      className={`text-[9px] font-mono mt-1 ${
                        selectedGear === pkg.id ? 'text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {pkg.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Post-Production Addons */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                4. Opsi Layanan Tambahan (Event Add-ons):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDONS.map((addon) => (
                  <label
                    key={addon.key}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      selectedAddons[addon.key]
                        ? 'bg-white/15 border-white/40 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedAddons[addon.key]}
                      onChange={(e) =>
                        setSelectedAddons({
                          ...selectedAddons,
                          [addon.key]: e.target.checked,
                        })
                      }
                      className="rounded accent-white w-4 h-4 mt-0.5"
                    />
                    <div>
                      <span className="font-bold block text-white">{addon.label}</span>
                      <span className="text-[10px] text-slate-400 font-light block mt-0.5">
                        {addon.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-[#14141c] border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                RINGKASAN ESTIMASI
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                LENGKAP DENGAN KRU
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Kategori Acara:</span>
                <span className="font-bold text-white text-right">{currentType.label}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Durasi Acara:</span>
                <span className="font-bold text-white font-mono">{shootingDays} Hari Pelaksanaan</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-slate-400">Sistem Kamera:</span>
                <span className="font-bold text-white">{currentGear.title}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">
                ESTIMASI TOTAL KISARAN:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formattedPrice}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono leading-relaxed">
                *Estimasi mencakup pengarah liputan, tim videografer/fotografer, perlengkapan kamera 8K, live soundboard feed, dan draf aftermovie pertama.
              </p>
            </div>

            <button
              onClick={handleApplyToForm}
              className="w-full py-4 rounded-xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              Kirim Brief Dengan Estimasi Ini →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
