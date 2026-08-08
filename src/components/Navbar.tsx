'use client';

import { useState } from 'react';

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('WORK');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'WORK', href: '#work' },
    { name: 'SERVICES', href: '#services' },
    { name: 'STORIES', href: '#stories' },
    { name: 'TALENTS', href: '#talents' },
    { name: 'ABOUT', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-5 sm:px-12 bg-gradient-to-b from-black/95 via-black/60 to-transparent flex items-center justify-between">
      {/* Logo Image */}
      <a href="#" className="flex items-center gap-3 select-none">
        <img
          src="/logo.jpg"
          alt="J Creative Division Logo"
          className="h-10 sm:h-20 w-auto object-contain filter invert mix-blend-screen transition-opacity hover:opacity-80"
        />
      </a>

      {/* Desktop Nav Links */}
      <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest text-slate-300">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setActiveTab(item.name)}
            className={`relative py-1 transition-colors hover:text-white ${
              activeTab === item.name ? 'text-white' : 'text-slate-400'
            }`}
          >
            {item.name}
            {activeTab === item.name && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
            )}
          </a>
        ))}
        <button
          onClick={onOpenContact}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          CONTACT
        </button>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        className="md:hidden flex flex-col justify-center items-center w-9 h-9 text-white focus:outline-none"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
      </button>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-xs font-bold tracking-widest text-slate-300 animate-fadeIn">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveTab(item.name);
                setIsMobileMenuOpen(false);
              }}
              className={`py-2 transition-colors ${
                activeTab === item.name ? 'text-white font-extrabold' : 'text-slate-400'
              }`}
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={() => {
              onOpenContact();
              setIsMobileMenuOpen(false);
            }}
            className="text-left py-2 text-white font-extrabold tracking-widest uppercase border-t border-white/10 pt-4"
          >
            CONTACT →
          </button>
        </div>
      )}
    </header>
  );
}
