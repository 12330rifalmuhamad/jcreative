'use client';

import { useState } from 'react';

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('WORK');

  const navItems = [
    { name: 'WORK', href: '#work' },
    { name: 'SERVICES', href: '#services' },
    { name: 'STORIES', href: '#stories' },
    { name: 'TALENTS', href: '#talents' },
    { name: 'ABOUT', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8 sm:px-12 bg-gradient-to-b from-black/95 via-black/50 to-transparent flex items-center justify-between">
      {/* Logo Image */}
      <a href="#" className="flex items-center gap-3 select-none">
        <img
          src="/logo.jpg"
          alt="J Creative Division Logo"
          className="h-16 sm:h-36 w-auto object-contain filter invert mix-blend-screen transition-opacity hover:opacity-80"
        />
      </a>

      {/* Right Nav Links */}
      <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest text-slate-300">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setActiveTab(item.name)}
            className={`relative py-1 transition-colors hover:text-white ${activeTab === item.name ? 'text-white' : 'text-slate-400'
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
    </header>
  );
}
