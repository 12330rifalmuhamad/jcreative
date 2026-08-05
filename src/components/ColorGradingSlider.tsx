'use client';

import { useState, useRef, MouseEvent, TouchEvent } from 'react';

export default function ColorGradingSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section id="color-grade" className="py-24 bg-[#070709] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            DAVINCI RESOLVE STUDIO // COLOR GRADING SUITE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            RAW LOG VS. <span className="text-slate-400">MASTER COLOR GRADE</span>
          </h2>
          <p className="text-slate-400 text-sm font-light mt-4 leading-relaxed">
            Geser slider interaktif di bawah untuk melihat transformasi footage mentah (ARRI LogC4 / RED Log3G10) menjadi hasil akhir kelas layar lebar.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          className="relative w-full aspect-[16/9] max-h-[600px] rounded-3xl overflow-hidden border border-white/20 select-none cursor-ew-resize shadow-2xl bg-black"
        >
          {/* AFTER Image (Final Master Grade) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/images/bts_set.png"
              alt="Final Master Color Grade"
              className="w-full h-full object-cover filter contrast-125 brightness-105"
            />
            {/* Label Badge Right */}
            <div className="absolute top-6 right-6 bg-white/90 text-black px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg">
              FINAL MASTER GRADE [LUT J-CINEMA 01]
            </div>
          </div>

          {/* BEFORE Image (RAW Flat LOG) */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="/images/bts_set.png"
              alt="RAW Flat LOG Footage"
              className="absolute inset-0 w-full h-full object-cover filter brightness-125 contrast-50 saturate-50 sepia-0"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                maxWidth: 'none',
              }}
            />
            {/* Label Badge Left */}
            <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-slate-300 border border-white/20 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
              RAW LOG FOOTAGE [ARRI LogC4]
            </div>
          </div>

          {/* Divider Handle Bar */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-black font-extrabold text-xs">
              ↔
            </div>
          </div>
        </div>

        {/* Technical Specs Footer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-center text-xs font-mono text-slate-400">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            COLOR SPACE: <span className="text-white font-bold">Rec.709 / DCI-P3</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            BIT DEPTH: <span className="text-white font-bold">12-Bit ProRes 4444 XQ</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            DYNAMIC RANGE: <span className="text-white font-bold">17 Stops Native</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            GRAIN EMULATION: <span className="text-white font-bold">Kodak Vision3 500T</span>
          </div>
        </div>
      </div>
    </section>
  );
}
