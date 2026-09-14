'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useContent, TeamMember, ShowcaseItem, ServiceItem, Inquiry } from '@/context/ContentContext';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setIsAuthenticated(sessionStorage.getItem('jcreative_admin_auth') === 'true');
    }
  }, []);

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'showcase' | 'services' | 'inquiries'>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    teamMembers,
    showcaseItems,
    services,
    inquiries,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addShowcaseItem,
    updateShowcaseItem,
    deleteShowcaseItem,
    updateService,
    deleteInquiry,
    resetToDefault,
  } = useContent();

  // Modals state
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [isShowcaseModalOpen, setIsShowcaseModalOpen] = useState(false);
  const [editingShowcase, setEditingShowcase] = useState<ShowcaseItem | null>(null);

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form fields for Member
  const [memberForm, setMemberForm] = useState({
    name: '',
    role: '',
    avatar: '',
    motto: '',
    bio: '',
    highlights: '',
  });

  // Form fields for Showcase
  const [showcaseForm, setShowcaseForm] = useState({
    title: '',
    subtitle: '',
    image: '',
    category: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.trim().toLowerCase() === 'admin') {
      sessionStorage.setItem('jcreative_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Passcode salah. Silakan coba lagi (Default PIN: admin123)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jcreative_admin_auth');
    setIsAuthenticated(false);
  };

  // Open member modal (Create or Edit)
  const openMemberModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setMemberForm({
        name: member.name,
        role: member.role,
        avatar: member.avatar,
        motto: member.motto,
        bio: member.bio,
        highlights: member.highlights,
      });
    } else {
      setEditingMember(null);
      setMemberForm({
        name: '',
        role: '',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        motto: '',
        bio: '',
        highlights: '',
      });
    }
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateTeamMember(editingMember.id, memberForm);
    } else {
      addTeamMember(memberForm);
    }
    setIsMemberModalOpen(false);
  };

  // Open showcase modal (Create or Edit)
  const openShowcaseModal = (item?: ShowcaseItem) => {
    if (item) {
      setEditingShowcase(item);
      setShowcaseForm({
        title: item.title,
        subtitle: item.subtitle,
        image: item.image,
        category: item.category,
      });
    } else {
      setEditingShowcase(null);
      setShowcaseForm({
        title: '',
        subtitle: '',
        image: '/images/DSC03485.jpg',
        category: 'Concert & Festival',
      });
    }
    setIsShowcaseModalOpen(true);
  };

  const handleSaveShowcase = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingShowcase) {
      updateShowcaseItem(editingShowcase.id, showcaseForm);
    } else {
      addShowcaseItem(showcaseForm);
    }
    setIsShowcaseModalOpen(false);
  };

  // Save edited service
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, {
        title: editingService.title,
        desc: editingService.desc,
      });
      setEditingService(null);
    }
  };
  // Handle File Upload to Base64 Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onSuccess(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Minimalist Icons Definitions
  const icons = {
    overview: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    members: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    showcase: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    services: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    inquiries: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    edit: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    delete: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    external: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    refresh: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    lock: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono text-xs uppercase tracking-widest border-t border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span>INITIALIZING ADMIN SYSTEM...</span>
        </div>
      </div>
    );
  }

  // Render Login Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 select-none border-t border-white/10">
        <div className="w-full max-w-md bg-[#0a0a0c] border border-white/15 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mx-auto">
              {icons.lock}
            </div>
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400 block">
              SYSTEM CONTROL
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              ADMIN ACCESS
            </h1>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Masukkan Passcode Admin untuk mengelola konten website J Creative.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                Passcode / PIN Admin
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan passcode (default: admin123)..."
                className="w-full px-4 py-3 bg-black border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-white transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 bg-white/5 border border-white/20 rounded text-slate-300 text-xs font-mono">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Masuk Ke Admin Dashboard →
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>← Kembali ke Website Utama</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navMenuItems = [
    { id: 'overview', label: 'OVERVIEW STATS', icon: icons.overview, badge: null },
    { id: 'members', label: 'ANGGOTA TIM', icon: icons.members, badge: teamMembers.length },
    { id: 'showcase', label: 'KARYA PORTOFOLIO', icon: icons.showcase, badge: showcaseItems.length },
    { id: 'services', label: 'DIVISI LAYANAN', icon: icons.services, badge: services.length },
    { id: 'inquiries', label: 'PESAN BRIEF', icon: icons.inquiries, badge: inquiries.length },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row selection:bg-white selection:text-black font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-black border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="J Creative" className="h-8 w-auto filter invert mix-blend-screen opacity-90" />
          <span className="text-xs font-black uppercase text-white tracking-widest">ADMIN PANEL</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-white bg-white/10 rounded"
        >
          {isMobileSidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ADMIN SIDEBAR */}
      <aside
        className={`w-72 bg-black border-r border-white/10 p-6 flex flex-col justify-between shrink-0 fixed md:sticky top-0 h-screen z-40 transition-transform duration-300 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Logo & Status */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.jpg"
                alt="J Creative"
                className="h-10 w-auto object-contain filter invert mix-blend-screen group-hover:opacity-80 transition-opacity"
              />
              <div>
                <h2 className="text-sm font-black uppercase tracking-tight text-white leading-none">
                  J CREATIVE
                </h2>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest block mt-0.5">
                  CMS DASHBOARD
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/15 text-slate-300 text-[10px] font-mono font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="space-y-1">
            <p className="px-3 text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-500 mb-3">
              MAIN NAVIGATION
            </p>
            {navMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTab === item.id
                    ? 'bg-white text-black font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="opacity-90">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono ${
                      activeTab === item.id ? 'bg-black text-white font-bold' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="space-y-2 border-t border-white/10 pt-4">
          <Link
            href="/"
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <span>WEBSITE UTAMA</span>
            {icons.external}
          </Link>

          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal?')) {
                resetToDefault();
              }
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors text-left"
          >
            <span>RESET DATA</span>
            {icons.refresh}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 hover:bg-white/20 border border-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors text-left font-bold"
          >
            <span>KELUAR</span>
            <span className="text-[10px]">✕</span>
          </button>
        </div>
      </aside>

      {/* Overlay backdrop for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-6 md:p-12 space-y-8 overflow-y-auto max-w-7xl">
        {/* Workspace Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
              CONTROL PANEL
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              {activeTab === 'overview' && 'OVERVIEW STATS'}
              {activeTab === 'members' && 'ANGGOTA TIM'}
              {activeTab === 'showcase' && 'KARYA PORTOFOLIO'}
              {activeTab === 'services' && 'DIVISI LAYANAN'}
              {activeTab === 'inquiries' && 'PESAN & BRIEF MASUK'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'members' && (
              <button
                onClick={() => openMemberModal()}
                className="px-6 py-3.5 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>+</span>
                <span>Tambah Anggota Tim</span>
              </button>
            )}
            {activeTab === 'showcase' && (
              <button
                onClick={() => openShowcaseModal()}
                className="px-6 py-3.5 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>+</span>
                <span>Tambah Karya Showcase</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                    {icons.members}
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-300 uppercase tracking-widest">
                    ACTIVE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold pt-2">TOTAL ANGGOTA</p>
                <p className="text-4xl font-black text-white">{teamMembers.length}</p>
                <p className="text-xs text-slate-400 font-light">Anggota aktif tampil di section #members</p>
              </div>

              <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                    {icons.showcase}
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-300 uppercase tracking-widest">
                    FEATURED
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">KARYA PORTOFOLIO</p>
                <p className="text-4xl font-black text-white">{showcaseItems.length}</p>
                <p className="text-xs text-slate-400 font-light">Showcase 2x2 grid tampil di section #work</p>
              </div>

              <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                    {icons.services}
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-300 uppercase tracking-widest">
                    DIVISI
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">DIVISI LAYANAN</p>
                <p className="text-4xl font-black text-white">{services.length}</p>
                <p className="text-xs text-slate-400 font-light">Tampil di section #divisi</p>
              </div>

              <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                    {icons.inquiries}
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-300 uppercase tracking-widest">
                    INBOUND
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">PESAN BRIEF</p>
                <p className="text-4xl font-black text-white">{inquiries.length}</p>
                <p className="text-xs text-slate-400 font-light">Dikirim via formulir kontak website</p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-[#0a0a0d] border border-white/15 p-8 rounded-2xl space-y-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                AKSI CEPAT
              </span>
              <h2 className="text-2xl font-black uppercase text-white tracking-tight">KONTROL KONTEN WEBSITE</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setActiveTab('members');
                    openMemberModal();
                  }}
                  className="px-6 py-4 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors"
                >
                  + Tambah Anggota Tim Baru
                </button>
                <button
                  onClick={() => {
                    setActiveTab('showcase');
                    openShowcaseModal();
                  }}
                  className="px-6 py-4 bg-white/10 border border-white/20 text-white font-extrabold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  + Tambah Karya Showcase Baru
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANGGOTA TIM (MEMBERS) */}
        {activeTab === 'members' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all group"
                >
                  <div>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-white/5">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent" />
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono font-extrabold uppercase text-slate-400 tracking-wider">
                          {member.role}
                        </span>
                        <h3 className="text-xl font-black text-white tracking-tight">{member.name}</h3>
                      </div>

                      <div className="bg-white/5 p-3 rounded-lg border-l-2 border-slate-400 space-y-1">
                        <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Motto Hidup</p>
                        <p className="text-xs text-slate-200 italic font-light leading-relaxed">&ldquo;{member.motto}&rdquo;</p>
                      </div>

                      <p className="text-xs text-slate-400 font-light leading-relaxed">{member.bio}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-white/10 mt-4">
                    <button
                      onClick={() => openMemberModal(member)}
                      className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono font-bold text-white uppercase inline-flex items-center gap-1.5"
                    >
                      {icons.edit}
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus ${member.name} dari anggota tim?`)) {
                          deleteTeamMember(member.id);
                        }
                      }}
                      className="px-4 py-2 bg-white/5 hover:bg-rose-600 hover:text-white transition-all text-xs font-mono font-bold text-slate-400 uppercase inline-flex items-center gap-1.5"
                    >
                      {icons.delete}
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PORTOFOLIO / SHOWCASE */}
        {activeTab === 'showcase' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {showcaseItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all group"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-2xl font-black uppercase text-white tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-xs text-slate-300 font-light">{item.subtitle}</p>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-end gap-3 border-t border-white/10 mt-auto">
                    <button
                      onClick={() => openShowcaseModal(item)}
                      className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono font-bold text-white uppercase inline-flex items-center gap-1.5"
                    >
                      {icons.edit}
                      <span>Edit Karya</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus karya "${item.title}"?`)) {
                          deleteShowcaseItem(item.id);
                        }
                      }}
                      className="px-4 py-2 bg-white/5 hover:bg-rose-600 hover:text-white transition-all text-xs font-mono font-bold text-slate-400 uppercase inline-flex items-center gap-1.5"
                    >
                      {icons.delete}
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LAYANAN / SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="bg-[#0a0a0d] border border-white/10 rounded-2xl p-6 space-y-4">
                  {editingService?.id === srv.id ? (
                    <form onSubmit={handleSaveService} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                          Judul Layanan ({srv.id})
                        </label>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-4 py-3 bg-black border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                          Deskripsi
                        </label>
                        <textarea
                          rows={3}
                          value={editingService.desc}
                          onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                          className="w-full px-4 py-3 bg-black border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-white text-black text-xs font-extrabold uppercase tracking-widest"
                        >
                          Simpan Perubahan
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 bg-white/10 text-slate-300 text-xs font-mono font-bold uppercase"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-2xl font-mono font-black text-slate-400">{srv.id}</span>
                        <button
                          onClick={() => setEditingService(srv)}
                          className="px-3 py-1 bg-white/10 hover:bg-white hover:text-black text-white text-xs font-mono font-bold uppercase transition-all inline-flex items-center gap-1.5"
                        >
                          {icons.edit}
                          <span>Edit</span>
                        </button>
                      </div>
                      <h3 className="text-xl font-bold uppercase text-white">{srv.title}</h3>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">{srv.desc}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PESAN MASUK (INQUIRIES) */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#0a0a0d] border border-white/10 rounded-2xl text-slate-400 text-xs font-mono uppercase tracking-widest">
                Belum ada pesan atau brief masuk saat ini.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-[#0a0a0d] border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-lg font-extrabold uppercase text-white">{inq.name}</h3>
                        <span className="text-xs font-mono text-slate-400">{inq.service}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-slate-400">{inq.createdAt}</span>
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="px-3 py-1 bg-white/10 hover:bg-rose-600 hover:text-white text-slate-300 text-xs font-mono font-bold uppercase transition-colors inline-flex items-center gap-1.5"
                        >
                          {icons.delete}
                          <span>Hapus Pesan</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                      <div><strong className="text-white">Email:</strong> {inq.email}</div>
                      <div><strong className="text-white">Telepon / WA:</strong> {inq.phone || '-'}</div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl text-xs text-slate-200 font-light leading-relaxed">
                      <strong className="block font-mono text-white text-[10px] uppercase mb-1">Rincian Brief / Pesan:</strong>
                      {inq.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL: TAMBAH / EDIT MEMBER */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="bg-[#0a0a0c] border border-white/20 rounded-2xl w-full max-w-lg p-8 space-y-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-black uppercase text-white tracking-tight">
                {editingMember ? 'Edit Anggota Tim' : 'Tambah Anggota Tim Baru'}
              </h3>
              <button
                onClick={() => setIsMemberModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Nama Anggota *</label>
                <input
                  type="text"
                  required
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  placeholder="Contoh: M. Rifaldi"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Role / Jabatan *</label>
                <input
                  type="text"
                  required
                  value={memberForm.role}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                  placeholder="Contoh: Head of Event Documentation & Director"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-2 text-[10px]">Foto Profil / Avatar *</label>
                
                {/* Image Upload Box & Live Preview */}
                <div className="flex items-center gap-4 mb-3">
                  {memberForm.avatar ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-white/5 relative">
                      <img src={memberForm.avatar} alt="Preview" className="w-full h-full object-cover object-top" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl border border-dashed border-white/20 flex items-center justify-center shrink-0 bg-white/5 text-slate-500 font-mono text-[10px]">
                      No Image
                    </div>
                  )}
                  <div className="flex-1 space-y-1.5">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white hover:text-black border border-white/20 rounded text-xs font-mono font-bold text-white uppercase cursor-pointer transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Upload Foto dari Komputer</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setMemberForm({ ...memberForm, avatar: url }))}
                      />
                    </label>
                    <p className="text-[9px] text-slate-400 font-mono">Format: JPG, PNG, WEBP, GIF</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Atau masukkan URL/Data Image:</span>
                  <input
                    type="text"
                    required
                    value={memberForm.avatar}
                    onChange={(e) => setMemberForm({ ...memberForm, avatar: e.target.value })}
                    placeholder="https://... atau data:image/..."
                    className="w-full px-4 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Motto Hidup *</label>
                <input
                  type="text"
                  required
                  value={memberForm.motto}
                  onChange={(e) => setMemberForm({ ...memberForm, motto: e.target.value })}
                  placeholder="Contoh: Abadikan emosi murni di setiap detik karya."
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Bio Singkat</label>
                <textarea
                  rows={2}
                  value={memberForm.bio}
                  onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                  placeholder="Pengalaman & latar belakang..."
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Pencapaian Utama (Highlight Tag)</label>
                <input
                  type="text"
                  value={memberForm.highlights}
                  onChange={(e) => setMemberForm({ ...memberForm, highlights: e.target.value })}
                  placeholder="Contoh: 150+ Major Events Covered"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-white text-black font-extrabold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Simpan Anggota →
                </button>
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-6 py-4 bg-white/10 text-white font-mono font-bold uppercase text-xs cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH / EDIT SHOWCASE */}
      {isShowcaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="bg-[#0a0a0c] border border-white/20 rounded-2xl w-full max-w-lg p-8 space-y-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-black uppercase text-white tracking-tight">
                {editingShowcase ? 'Edit Karya Portofolio' : 'Tambah Karya Portofolio Baru'}
              </h3>
              <button
                onClick={() => setIsShowcaseModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveShowcase} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Judul Karya *</label>
                <input
                  type="text"
                  required
                  value={showcaseForm.title}
                  onChange={(e) => setShowcaseForm({ ...showcaseForm, title: e.target.value })}
                  placeholder="Contoh: Concert Festival Live Stage"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Sub-Judul / Deskripsi Singkat *</label>
                <input
                  type="text"
                  required
                  value={showcaseForm.subtitle}
                  onChange={(e) => setShowcaseForm({ ...showcaseForm, subtitle: e.target.value })}
                  placeholder="Contoh: Global Live Concert Series"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Kategori *</label>
                <input
                  type="text"
                  required
                  value={showcaseForm.category}
                  onChange={(e) => setShowcaseForm({ ...showcaseForm, category: e.target.value })}
                  placeholder="Contoh: Festival Film / Arena Tour"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-2 text-[10px]">Gambar / Thumbnail Karya *</label>
                
                {/* Live Preview Box & File Upload Button */}
                <div className="space-y-3 mb-3">
                  {showcaseForm.image ? (
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/20 shrink-0 bg-white/5 relative">
                      <img src={showcaseForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-xl border border-dashed border-white/20 flex items-center justify-center shrink-0 bg-white/5 text-slate-500 font-mono text-[10px]">
                      No Thumbnail Image
                    </div>
                  )}

                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white hover:text-black border border-white/20 rounded text-xs font-mono font-bold text-white uppercase cursor-pointer transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Upload Foto Karya dari Perangkat</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setShowcaseForm({ ...showcaseForm, image: url }))}
                    />
                  </label>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Atau masukkan URL/Path Foto:</span>
                  <input
                    type="text"
                    required
                    value={showcaseForm.image}
                    onChange={(e) => setShowcaseForm({ ...showcaseForm, image: e.target.value })}
                    placeholder="/images/DSC03485.jpg atau https://..."
                    className="w-full px-4 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-white text-black font-extrabold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Simpan Karya →
                </button>
                <button
                  type="button"
                  onClick={() => setIsShowcaseModalOpen(false)}
                  className="px-6 py-4 bg-white/10 text-white font-mono font-bold uppercase text-xs cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
