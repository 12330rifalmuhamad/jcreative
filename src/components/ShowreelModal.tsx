'use client';

import { useState } from 'react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('8K HDR');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-fadeIn">
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-[#0c0c10] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070709]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-200">
              J Creative Division // Official Reel 2026 [{quality}]
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Video Player Display Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img
            src="/images/DSC03485.jpg"
            alt="Showreel Preview"
            className={`w-full h-full object-cover filter contrast-125 ${
              isPlaying ? 'brightness-100 scale-100' : 'brightness-50 scale-105'
            } transition-all duration-700`}
          />

          {/* Audio Visualizer Wave Overlay */}
          {isPlaying && (
            <div className="absolute top-6 left-6 flex items-end gap-1 h-6 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-1 bg-white h-full animate-bounce" />
              <span className="w-1 bg-white h-3/4 animate-bounce delay-75" />
              <span className="w-1 bg-white h-1/2 animate-bounce delay-150" />
              <span className="w-1 bg-white h-5/6 animate-bounce delay-100" />
              <span className="text-[10px] font-bold text-slate-300 ml-2 uppercase">24fps 48kHz</span>
            </div>
          )}

          {/* Overlay Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-20 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:scale-110 hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl"
          >
            {isPlaying ? (
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 fill-current translate-x-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Watermark Logo */}
          <div className="absolute bottom-6 right-6 opacity-40 pointer-events-none">
            <span className="font-extrabold text-xl tracking-tight text-white">
              Creative<span className="text-white">.</span>
            </span>
          </div>
        </div>

        {/* Video Control Bar & Tech Specs */}
        <div className="p-6 bg-[#09090d] border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-2"
            >
              {isMuted ? '🔇 Muted' : '🔊 Stereo Mastered'}
            </button>

            <div className="h-4 w-px bg-white/20" />

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Kualitas:</span>
              {['8K HDR', '4K UHD', '1080p'].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                    quality === q
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-slate-300 hover:bg-white/15'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-4">
            <span>ARRI ALEXA MINI LF</span>
            <span>•</span>
            <span>COOKE ANAMORPHIC</span>
            <span>•</span>
            <span>DAVINCI RESOLVE STUDIO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
