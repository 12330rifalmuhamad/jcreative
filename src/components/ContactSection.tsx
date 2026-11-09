'use client';

import { useState, FormEvent } from 'react';
import { useContent } from '@/context/ContentContext';

interface ContactProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export default function ContactSection({ isModal = false, onCloseModal }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [agency, setAgency] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Konser & Festival Musik');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');

  const { addInquiry, pageSettings } = useContent();
  const contact = pageSettings?.contact;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addInquiry({
      name,
      email,
      phone,
      service: eventType ? `${eventType} (${agency || 'Klien'})` : (agency || 'General Inquiry'),
      eventDate: eventDate || undefined,
      message,
    });
    setSubmitted(true);
  };

  const formElement = (
    <div className="w-full">
      {submitted ? (
        <div className="p-8 border border-white/20 rounded-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl mx-auto">
            ✓
          </div>
          <h3 className="text-xl font-bold uppercase text-white tracking-wider">
            {contact?.successTitle || 'Brief Received'}
          </h3>
          <p className="text-xs text-slate-300 font-light">
            {contact?.successMessage || 'Our producers at J Creative Division will contact you within 24 hours.'}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setName('');
              setAgency('');
              setEmail('');
              setPhone('');
              setEventDate('');
              setMessage('');
            }}
            className="px-6 py-2 bg-white text-black text-xs font-bold uppercase rounded hover:bg-slate-200 transition-colors"
          >
            Submit Another Brief
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda..."
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                Brand / Penyelenggara *
              </label>
              <input
                type="text"
                required
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                placeholder="Nama Brand atau Event..."
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                Email Kerja *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@perusahaan.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                WhatsApp / No. Telepon *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 812..."
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                Kategori Acara *
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0d] border border-white/15 text-white text-xs focus:outline-none focus:border-white rounded cursor-pointer"
              >
                <option value="Konser & Festival Musik">Konser & Festival Musik</option>
                <option value="Corporate Gathering & Summit">Corporate Gathering & Summit</option>
                <option value="Exhibition & Awarding Night">Exhibition & Awarding Night</option>
                <option value="Conference & Seminar Nasional">Conference & Seminar Nasional</option>
                <option value="Arena Tour & Live Performance">Arena Tour & Live Performance</option>
                <option value="Private Event & Lainnya">Private Event & Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                Estimasi Tanggal Acara
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
              Deskripsi Acara &amp; Kebutuhan Liputan *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ceritakan konsep acara Anda: lokasi/venue acara, perkiraan durasi hari, konsep video aftermovie yang diinginkan, serta kebutuhan khusus seperti drone aerial atau live multicam..."
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-white rounded leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors rounded shadow-lg cursor-pointer"
          >
            Kirim Brief Acara →
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
          {contact?.badge && (
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block">
              {contact.badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-6xl font-bold tracking-tight uppercase text-white leading-tight break-words">
            {contact?.title || "Let's Create Together"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            {contact?.description}
          </p>

          <div className="pt-6 space-y-3 text-xs font-mono text-slate-400 border-t border-white/10">
            {contact?.instagram && (
              <div>
                <strong className="text-white">INSTAGRAM:</strong>{' '}
                <a
                  href={contact.instagramUrl || `https://instagram.com/${contact.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
                >
                  {contact.instagram} ↗
                </a>
              </div>
            )}
            <div>
              <strong className="text-white">EMAIL:</strong>{' '}
              {contact?.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="text-slate-300 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
                >
                  {contact.email}
                </a>
              ) : (
                '-'
              )}
            </div>
            <div>
              <strong className="text-white">WHATSAPP:</strong>{' '}
              {contact?.whatsapp ? (
                <a
                  href={
                    contact.whatsappNumber
                      ? `https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}`
                      : '#'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
                >
                  {contact.whatsapp} ↗
                </a>
              ) : (
                '-'
              )}
            </div>
            <div>
              <strong className="text-white">LOCATION:</strong>{' '}
              <span className="text-slate-300">{contact?.location || '-'}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#0a0a0d] border border-white/15 p-5 sm:p-10 rounded-2xl">
          {formElement}
        </div>
      </div>
    </section>
  );
}
