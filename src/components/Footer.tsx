'use client';

import { useContent } from '@/context/ContentContext';

export default function Footer() {
  const { pageSettings } = useContent();
  const branding = pageSettings?.branding;
  const footer = pageSettings?.footer;

  const logoUrl = branding?.logoUrl || '/logo.jpg';
  const siteTitle = branding?.siteTitle || 'J Creative Division';
  const copyright = footer?.copyright || '© 2026 J CREATIVE DIVISION. ALL RIGHTS RESERVED.';
  const socials = footer?.socials;

  return (
    <footer className="py-12 px-8 sm:px-12 bg-black border-t border-white/10 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-left">
          <img
            key={logoUrl}
            src={logoUrl}
            alt={siteTitle}
            className="h-14 sm:h-16 w-auto object-contain filter invert mix-blend-screen opacity-90"
          />
          <span className="text-[10px] text-slate-500 uppercase">{copyright}</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[11px] font-bold">
          {socials?.instagram && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <span>INSTAGRAM</span>
              <span className="text-[9px] opacity-70">↗</span>
            </a>
          )}
          {socials?.vimeo && (
            <a
              href={socials.vimeo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              VIMEO
            </a>
          )}
          {socials?.youtube && (
            <a
              href={socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YOUTUBE CINEMA
            </a>
          )}
          {socials?.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
          )}
          <a
            href="/admin"
            className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white hover:text-black transition-all text-[10px] tracking-wider"
          >
            ⚙ ADMIN PANEL
          </a>
        </div>
      </div>
    </footer>
  );
}
