'use client';

import { useState, FormEvent } from 'react';

interface ContactProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export default function ContactSection({ isModal = false, onCloseModal }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const formElement = (
    <div className="w-full">
      {submitted ? (
        <div className="p-8 border border-white/20 rounded-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl mx-auto">
            ✓
          </div>
          <h3 className="text-xl font-bold uppercase text-white tracking-wider">Brief Received</h3>
          <p className="text-xs text-slate-300 font-light">
            Our producers at J Creative Division will contact you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-white text-black text-xs font-bold uppercase rounded"
          >
            Submit Another Brief
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Name *"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white"
            />
            <input
              type="text"
              required
              placeholder="Brand / Agency *"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              required
              placeholder="Work Email *"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white"
            />
            <input
              type="tel"
              required
              placeholder="WhatsApp / Phone *"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white"
            />
          </div>

          <textarea
            rows={4}
            required
            placeholder="Project Details / Brief..."
            className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white"
          />

          <button
            type="submit"
            className="w-full py-4 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors"
          >
            Send Project Brief →
          </button>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
        <div className="relative w-full max-w-lg bg-[#0a0a0c] border border-white/20 p-8">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            ✕
          </button>
          <h3 className="text-2xl font-bold uppercase text-white mb-6 tracking-tight">Contact Us</h3>
          {formElement}
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className="py-16 sm:py-28 px-5 sm:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-3xl sm:text-6xl font-bold tracking-tight uppercase text-white leading-tight break-words">
            Let&apos;s Create Together
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Ready to bring your commercial, music video, or brand documentary vision to life? Connect with our executive producers.
          </p>

          <div className="pt-6 space-y-2 text-xs font-mono text-slate-400 border-t border-white/10">
            <div>
              <strong className="text-white">INSTAGRAM:</strong>{' '}
              <a
                href="https://www.instagram.com/j.creative.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
              >
                @j.creative.official ↗
              </a>
            </div>
            <div><strong className="text-white">EMAIL:</strong> -</div>
            <div><strong className="text-white">WHATSAPP:</strong> -</div>
            <div><strong className="text-white">LOCATION:</strong> -</div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#0a0a0d] border border-white/15 p-5 sm:p-10 rounded-2xl">
          {formElement}
        </div>
      </div>
    </section>
  );
}
