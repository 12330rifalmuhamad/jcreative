'use client';

import { useState } from 'react';

interface EstimateCalculatorProps {
  onSelectEstimate: (details: string) => void;
}

export default function EstimateCalculator({ onSelectEstimate }: EstimateCalculatorProps) {
  const [projectType, setProjectType] = useState<'commercial' | 'music_video' | 'brand_film' | 'documentary'>('commercial');
  const [shootingDays, setShootingDays] = useState(1);
  const [gearPackage, setGearPackage] = useState<'standard' | 'anamorphic' | 'master'>('anamorphic');
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    colorGrading: true,
    aerialDrone: false,
    vfx3d: false,
    audioScoring: true,
  });

  // Base pricing matrix calculation
  const basePrices = {
    commercial: 75000000,
    music_video: 45000000,
    brand_film: 60000000,
    documentary: 50000000,
  };

  const gearMultiplier = {
    standard: 1,
    anamorphic: 1.35,
    master: 1.7,
  };

  const calculateTotal = () => {
    let base = basePrices[projectType] * shootingDays * gearMultiplier[gearPackage];
    if (addons.colorGrading) base += 15000000;
    if (addons.aerialDrone) base += 12000000;
    if (addons.vfx3d) base += 25000000;
    if (addons.audioScoring) base += 10000000;
    return base;
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(calculateTotal());

  const handleApplyToForm = () => {
    const typeLabel =
      projectType === 'commercial'
        ? 'Iklan Komersial / TVC'
        : projectType === 'music_video'
        ? 'Video Musik'
        : projectType === 'brand_film'
        ? 'Brand Film'
        : 'Dokumenter Narrative';
    const detailString = `Estimasi Proyek: ${typeLabel} | ${shootingDays} Hari Syuting | Paket Kamera: ${gearPackage.toUpperCase()} | Total Estimasi: ${formattedPrice}`;
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
            Hitung perkiraan lingkup produksi dan anggaran proyek Anda secara transparan berdasarkan kebutuhan teknis dan durasi syuting.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#111117] border border-white/15 rounded-3xl p-8 space-y-8 shadow-xl">
            {/* 1. Project Type Selector */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
                1. Jenis Event &amp; Dokumentasi:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'commercial', label: 'Konser & Festival Musik' },
                  { id: 'music_video', label: 'Corporate Gathering & Summit' },
                  { id: 'brand_film', label: 'Exhibition & Awarding Night' },
                  { id: 'documentary', label: 'Conference & Private Event' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id as any)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                      projectType === type.id
                        ? 'bg-white text-black border-white shadow-md'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Shooting Days */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  2. Durasi Acara (Hari):
                </label>
                <span className="text-sm font-black text-white font-mono">{shootingDays} Hari</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={shootingDays}
                onChange={(e) => setShootingDays(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 Hari (Half/Full Day)</span>
                <span>3 Hari</span>
                <span>7 Hari</span>
              </div>
            </div>

            {/* 3. Gear & Resolution Package */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
                3. Paket Kamera &amp; Tim Liputan:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', title: 'Single / Dual Cam', sub: 'Sony FX3/FX6 + 2 Crew' },
                  { id: 'anamorphic', title: 'Multicam System', sub: '3-4 Cam + Audio Feed' },
                  { id: 'master', title: 'Cinema Full Crew', sub: 'Multicam + Drone + Live Stream' },
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setGearPackage(pkg.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      gearPackage === pkg.id
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-black uppercase">{pkg.title}</div>
                    <div className="text-[9px] opacity-75 font-mono mt-1">{pkg.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Post-Production Addons */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
                4. Layanan Tambahan (Event Add-ons):
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'colorGrading', label: 'Express 24-Hour Aftermovie Edit' },
                  { key: 'aerialDrone', label: 'Aerial Drone Event Coverage' },
                  { key: 'vfx3d', label: 'Foto Highlight & Color Correct' },
                  { key: 'audioScoring', label: 'Audio Multitrack Live Board Record' },
                ].map((addon) => (
                  <label
                    key={addon.key}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      addons[addon.key]
                        ? 'bg-white/15 border-white/40 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addons[addon.key]}
                      onChange={(e) =>
                        setAddons({ ...addons, [addon.key]: e.target.checked })
                      }
                      className="rounded accent-white w-4 h-4"
                    />
                    <span className="font-semibold">{addon.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-[#14141c] border border-white/20 rounded-3xl p-8 space-y-6 sticky top-28 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                RINGKASAN ESTIMASI
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                TERMASUK TIM LENGKAP
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Tipe Proyek:</span>
                <span className="font-bold text-white uppercase">{projectType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Durasi Produksi:</span>
                <span className="font-bold text-white font-mono">{shootingDays} Hari Syuting</span>
              </div>
              <div className="flex justify-between">
                <span>Kamera &amp; Lensa:</span>
                <span className="font-bold text-white font-mono uppercase">{gearPackage}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/15">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">
                ESTIMASI TOTAL KISARAN:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formattedPrice}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono">
                *Estimasi awal mencakup sutradara, tim DP, lighting, peralatan kamera, dan draf pertama pasca-produksi.
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
