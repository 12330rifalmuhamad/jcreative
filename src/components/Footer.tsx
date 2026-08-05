'use client';

export default function Footer() {
  return (
    <footer className="py-12 px-8 sm:px-12 bg-black border-t border-white/10 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-left">
          <img
            src="/logo.jpg"
            alt="J Creative Division"
            className="h-14 sm:h-16 w-auto object-contain filter invert mix-blend-screen opacity-90"
          />
          <span className="text-[10px] text-slate-500">© 2026 J CREATIVE DIVISION. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-8 text-[11px] font-bold">
          <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-white transition-colors">VIMEO</a>
          <a href="#" className="hover:text-white transition-colors">YOUTUBE CINEMA</a>
          <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
        </div>
      </div>
    </footer>
  );
}
