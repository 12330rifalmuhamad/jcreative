'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useContent, TeamMember, ShowcaseItem, HeroSlide, ServiceItem, Inquiry } from '@/context/ContentContext';

interface CloudinaryMediaItem {
  public_id: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
  created_at: string;
}

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
  const [activeTab, setActiveTab] = useState<'overview' | 'hero' | 'showcase' | 'members' | 'media' | 'services' | 'inquiries'>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const {
    teamMembers,
    showcaseItems,
    heroSlides,
    services,
    inquiries,
    isLoading: isContentLoading,
    refreshContent,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    changeTeamMemberAvatar,
    addShowcaseItem,
    updateShowcaseItem,
    deleteShowcaseItem,
    changeShowcaseItemImage,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    changeHeroSlideImage,
    updateService,
    deleteInquiry,
    resetToDefault,
  } = useContent();

  // Cloudinary media state
  const [cloudinaryMedia, setCloudinaryMedia] = useState<CloudinaryMediaItem[]>([]);
  const [isMediaLoading, setIsMediaLoading] = useState<boolean>(false);
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Upload state
  const [uploadStatus, setUploadStatus] = useState<{
    isUploading: boolean;
    message: string;
    target: 'member' | 'showcase' | 'hero' | 'media' | null;
  }>({
    isUploading: false,
    message: '',
    target: null,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quick Apply Modal for uploaded images
  const [quickApplyModal, setQuickApplyModal] = useState<{
    isOpen: boolean;
    url: string;
  }>({ isOpen: false, url: '' });
  const [quickApplyCategory, setQuickApplyCategory] = useState<'hero' | 'showcase' | 'member'>('hero');
  const [quickApplyTargetId, setQuickApplyTargetId] = useState<string>('');

  // Modals state
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [isShowcaseModalOpen, setIsShowcaseModalOpen] = useState(false);
  const [editingShowcase, setEditingShowcase] = useState<ShowcaseItem | null>(null);

  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<HeroSlide | null>(null);

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Cloudinary Picker Modal state
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'member' | 'showcase' | 'hero' | null>(null);

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

  // Form fields for Hero Slide
  const [heroForm, setHeroForm] = useState({
    title: '',
    category: '',
    image: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch Cloudinary media list
  const fetchCloudinaryMedia = useCallback(async () => {
    setIsMediaLoading(true);
    try {
      const res = await fetch('/api/media?limit=100');
      const json = await res.json();
      if (json.success && Array.isArray(json.resources)) {
        setCloudinaryMedia(json.resources);
      }
    } catch (err) {
      console.error('Failed to fetch Cloudinary media:', err);
    } finally {
      setIsMediaLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCloudinaryMedia();
    }
  }, [isAuthenticated, fetchCloudinaryMedia]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.trim().toLowerCase() === 'admin') {
      sessionStorage.setItem('jcreative_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      fetchCloudinaryMedia();
    } else {
      setAuthError('Passcode salah. Silakan coba lagi (Default PIN: admin123)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jcreative_admin_auth');
    setIsAuthenticated(false);
  };

  // Real Upload to Cloudinary function
  const uploadFileToCloudinary = async (file: File, folder: string = 'jcreative') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Gagal mengunggah file ke Cloudinary');
    }

    // Refresh media gallery
    fetchCloudinaryMedia();
    return data.secure_url as string;
  };

  // Handle direct file input upload
  const handleUploadInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'member' | 'showcase' | 'hero' | 'media',
    onSuccess?: (url: string) => void | Promise<void>
  ) => {
    const file = e.target.files?.[0];
    const inputEl = e.target;
    if (!file) return;

    const folderMap: Record<string, string> = {
      member: 'jcreative/team',
      showcase: 'jcreative/showcase',
      hero: 'jcreative/hero',
      media: 'jcreative/gallery',
    };

    setUploadStatus({
      isUploading: true,
      message: `Mengunggah ${file.name} ke Cloudinary CDN...`,
      target: target === 'media' ? null : target,
    });

    try {
      const secureUrl = await uploadFileToCloudinary(file, folderMap[target] || 'jcreative');
      if (onSuccess) {
        await onSuccess(secureUrl);
      } else {
        setQuickApplyModal({ isOpen: true, url: secureUrl });
      }
      showToast(`✓ Foto berhasil diunggah ke Cloudinary!`);
    } catch (err: any) {
      console.error(err);
      alert(`Upload gagal: ${err.message || 'Terjadi kesalahan'}`);
    } finally {
      setUploadStatus({
        isUploading: false,
        message: '',
        target: null,
      });
      // reset file input safely
      if (inputEl) inputEl.value = '';
    }
  };

  // Handle copy Cloudinary URL
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    showToast('✓ URL Cloudinary berhasil disalin ke clipboard');
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Handle delete from Cloudinary
  const handleDeleteCloudinary = async (publicId: string) => {
    if (!confirm(`Hapus foto ${publicId} dari Cloudinary secara permanen?`)) return;

    try {
      const res = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: publicId }),
      });
      const data = await res.json();
      if (data.success) {
        setCloudinaryMedia((prev) => prev.filter((m) => m.public_id !== publicId));
        showToast('✓ Foto berhasil dihapus dari Cloudinary');
      } else {
        alert(data.error || 'Gagal menghapus foto');
      }
    } catch (err: any) {
      alert(`Gagal menghapus: ${err.message}`);
    }
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
        avatar: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997522/jcreative/team/rifaldi.jpg',
        motto: '',
        bio: '',
        highlights: '',
      });
    }
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMember) {
        const ok = await updateTeamMember(editingMember.id, memberForm);
        if (ok) {
          showToast('✓ Data anggota tim berhasil diperbarui & tersimpan!');
        } else {
          alert('Gagal menyimpan pembaruan anggota ke server.');
        }
      } else {
        const ok = await addTeamMember(memberForm);
        if (ok) {
          showToast('✓ Anggota tim baru berhasil ditambahkan & tersimpan!');
        } else {
          alert('Gagal menambahkan anggota ke server.');
        }
      }
      setIsMemberModalOpen(false);
      await refreshContent();
    } catch (err: any) {
      alert(`Gagal menyimpan: ${err?.message || 'Terjadi kesalahan'}`);
    }
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
        image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790953351/jcreative/showcase/dsc03485.jpg',
        category: 'Concert & Festival',
      });
    }
    setIsShowcaseModalOpen(true);
  };

  const handleSaveShowcase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingShowcase) {
        const ok = await updateShowcaseItem(editingShowcase.id, showcaseForm);
        if (ok) {
          showToast('✓ Karya portofolio berhasil diperbarui & tersimpan!');
        } else {
          alert('Gagal menyimpan pembaruan karya ke server.');
        }
      } else {
        const ok = await addShowcaseItem(showcaseForm);
        if (ok) {
          showToast('✓ Karya portofolio baru berhasil ditambahkan & tersimpan!');
        } else {
          alert('Gagal menambahkan karya ke server.');
        }
      }
      setIsShowcaseModalOpen(false);
      await refreshContent();
    } catch (err: any) {
      alert(`Gagal menyimpan karya: ${err?.message || 'Terjadi kesalahan'}`);
    }
  };

  // Open hero slide modal (Create or Edit)
  const openHeroModal = (slide?: HeroSlide) => {
    if (slide) {
      setEditingHero(slide);
      setHeroForm({
        title: slide.title,
        category: slide.category,
        image: slide.image,
      });
    } else {
      setEditingHero(null);
      setHeroForm({
        title: '',
        category: 'Premier Visual Storytelling & Production Studio',
        image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790953351/jcreative/showcase/dsc03485.jpg',
      });
    }
    setIsHeroModalOpen(true);
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHero) {
        const ok = await updateHeroSlide(editingHero.id, heroForm);
        if (ok) {
          showToast('✓ Slide Hero berhasil diperbarui & tersimpan!');
        } else {
          alert('Gagal menyimpan pembaruan slide hero ke server.');
        }
      } else {
        const ok = await addHeroSlide(heroForm);
        if (ok) {
          showToast('✓ Slide Hero baru berhasil ditambahkan & tersimpan!');
        } else {
          alert('Gagal menambahkan slide hero ke server.');
        }
      }
      setIsHeroModalOpen(false);
      await refreshContent();
    } catch (err: any) {
      alert(`Gagal menyimpan slide hero: ${err?.message || 'Terjadi kesalahan'}`);
    }
  };

  const handleDeleteHero = async (id: string) => {
    if (heroSlides.length <= 1) {
      alert('Minimal harus ada 1 slide hero di halaman utama.');
      return;
    }
    if (!confirm('Hapus slide hero ini dari halaman utama?')) return;
    await deleteHeroSlide(id);
    showToast('✓ Slide hero berhasil dihapus');
  };

  // Save edited service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      await updateService(editingService.id, {
        title: editingService.title,
        desc: editingService.desc,
      });
      setEditingService(null);
      showToast('✓ Data layanan berhasil diperbarui');
    }
  };

  // Open picker modal
  const openCloudinaryPicker = (target: 'member' | 'showcase' | 'hero') => {
    setPickerTarget(target);
    setIsPickerOpen(true);
  };

  const handleSelectFromPicker = (url: string) => {
    if (pickerTarget === 'member') {
      setMemberForm((prev) => ({ ...prev, avatar: url }));
    } else if (pickerTarget === 'showcase') {
      setShowcaseForm((prev) => ({ ...prev, image: url }));
    } else if (pickerTarget === 'hero') {
      setHeroForm((prev) => ({ ...prev, image: url }));
    }
    setIsPickerOpen(false);
    showToast('✓ Foto Cloudinary terpilih!');
  };

  // Filtered media in gallery
  const filteredMedia = cloudinaryMedia.filter((item) =>
    item.public_id.toLowerCase().includes(mediaSearchQuery.toLowerCase()) ||
    item.format.toLowerCase().includes(mediaSearchQuery.toLowerCase())
  );

  // Minimalist Icons
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
    media: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    cloud: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    upload: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
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
    copy: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
          <span>MEMUAT PANEL ADMIN...</span>
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
              SYSTEM CONTROL &bull; CLOUDINARY CDN
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              ADMIN DASHBOARD
            </h1>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Panel Pengelolaan Konten Website &amp; Upload Media Cloudinary J Creative.
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
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-rose-300 text-xs font-mono">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Masuk Ke Admin Dashboard &rarr;
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>&larr; Kembali ke Website Utama</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navMenuItems = [
    { id: 'overview', label: 'OVERVIEW STATS', icon: icons.overview, badge: null },
    { id: 'hero', label: 'SLIDER HERO', icon: icons.showcase, badge: heroSlides.length },
    { id: 'showcase', label: 'KARYA PORTOFOLIO', icon: icons.showcase, badge: showcaseItems.length },
    { id: 'members', label: 'ANGGOTA TIM', icon: icons.members, badge: teamMembers.length },
    { id: 'media', label: 'GALERI CLOUDINARY', icon: icons.media, badge: cloudinaryMedia.length },
    { id: 'services', label: 'DIVISI LAYANAN', icon: icons.services, badge: services.length },
    { id: 'inquiries', label: 'PESAN BRIEF', icon: icons.inquiries, badge: inquiries.length },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row selection:bg-white selection:text-black font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[100] px-5 py-3.5 bg-white text-black font-mono text-xs font-bold rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Upload Overlay */}
      {uploadStatus.isUploading && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-white animate-spin mb-4" />
          <p className="text-sm font-mono uppercase tracking-widest text-white font-bold mb-1">
            MENGUNGGAH KE CLOUDINARY...
          </p>
          <p className="text-xs font-mono text-slate-400 max-w-sm">{uploadStatus.message}</p>
        </div>
      )}

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
        <div className="space-y-8 overflow-y-auto">
          {/* Logo & Cloudinary Connected Status */}
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

            {/* Cloudinary CDN Indicator */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase rounded">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CLOUDINARY CDN</span>
                </div>
                <span className="text-[9px] opacity-80">CONNECTED</span>
              </div>

              <div className="flex items-center justify-between px-3 py-1 bg-white/5 border border-white/10 text-slate-400 text-[9px] font-mono">
                <span>SERVER STORAGE</span>
                <span className="text-white font-bold">SYNCED</span>
              </div>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="space-y-1">
            <p className="px-3 text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-500 mb-3">
              NAVIGASI MENU
            </p>
            {navMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all rounded ${
                  activeTab === item.id
                    ? 'bg-white text-black font-extrabold shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="opacity-90">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono rounded ${
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
          <button
            onClick={async () => {
              await refreshContent();
              await fetchCloudinaryMedia();
              showToast('✓ Data server & Cloudinary diperbarui');
            }}
            className="w-full flex items-center justify-between px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors rounded"
          >
            <span>REFRESH DATA</span>
            {icons.refresh}
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-between px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors rounded"
          >
            <span>WEBSITE UTAMA</span>
            {icons.external}
          </Link>

          <button
            onClick={async () => {
              if (confirm('Kembalikan semua data ke pengaturan awal (Cloudinary default)?')) {
                await resetToDefault();
                showToast('✓ Data berhasil direset ke default');
              }
            }}
            className="w-full flex items-center justify-between px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors text-left rounded"
          >
            <span>RESET DATA</span>
            <span className="text-[10px]">↺</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-2 bg-white/5 hover:bg-rose-900/40 border border-white/15 text-white text-xs font-mono uppercase tracking-wider transition-colors text-left font-bold rounded"
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
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-slate-400">
                PANEL KONTROL AKTIF
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-bold uppercase rounded">
                Server Persistent
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              {activeTab === 'overview' && 'RINGKASAN STATISTIK'}
              {activeTab === 'hero' && 'SLIDER HERO UTAMA'}
              {activeTab === 'showcase' && 'KARYA PORTOFOLIO'}
              {activeTab === 'members' && 'ANGGOTA TIM'}
              {activeTab === 'media' && 'GALERI CLOUDINARY'}
              {activeTab === 'services' && 'DIVISI LAYANAN'}
              {activeTab === 'inquiries' && 'PESAN & BRIEF MASUK'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-all inline-flex items-center gap-2"
              title="Buka website di tab baru untuk melihat perubahan langsung"
            >
              <span>Lihat Website</span>
              <span>↗</span>
            </Link>

            {activeTab === 'hero' && (
              <button
                onClick={() => openHeroModal()}
                className="px-6 py-3.5 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors cursor-pointer inline-flex items-center gap-2 rounded shadow-lg"
              >
                <span>+</span>
                <span>Tambah Slide Hero</span>
              </button>
            )}
            {activeTab === 'members' && (
              <button
                onClick={() => openMemberModal()}
                className="px-6 py-3.5 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors cursor-pointer inline-flex items-center gap-2 rounded shadow-lg"
              >
                <span>+</span>
                <span>Tambah Anggota Tim</span>
              </button>
            )}
            {activeTab === 'showcase' && (
              <button
                onClick={() => openShowcaseModal()}
                className="px-6 py-3.5 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors cursor-pointer inline-flex items-center gap-2 rounded shadow-lg"
              >
                <span>+</span>
                <span>Tambah Karya Showcase</span>
              </button>
            )}
            {activeTab === 'media' && (
              <label className="px-6 py-3.5 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors cursor-pointer inline-flex items-center gap-2 rounded shadow-lg">
                {icons.upload}
                <span>Upload Foto ke Cloudinary</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUploadInput(e, 'media')}
                />
              </label>
            )}
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Members */}
              <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                    {icons.members}
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-300 uppercase tracking-widest rounded">
                    ACTIVE
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold pt-2">TOTAL ANGGOTA</p>
                <p className="text-4xl font-black text-white">{teamMembers.length}</p>
                <p className="text-xs text-slate-400 font-light">Tampil dengan avatar dari Cloudinary CDN</p>
              </div>

              {/* Card 2: Showcase */}
              <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                    {icons.showcase}
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-300 uppercase tracking-widest rounded">
                    FEATURED
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold pt-2">KARYA PORTOFOLIO</p>
                <p className="text-4xl font-black text-white">{showcaseItems.length}</p>
                <p className="text-xs text-slate-400 font-light">Grid showcase bersumber dari Cloudinary CDN</p>
              </div>

              {/* Card 3: Slider Hero */}
              <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                    {icons.showcase}
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-300 uppercase tracking-widest rounded">
                    HERO
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold pt-2">SLIDER HERO</p>
                <p className="text-4xl font-black text-white">{heroSlides.length}</p>
                <p className="text-xs text-slate-400 font-light">Slide foto utama dengan visual Cloudinary CDN</p>
              </div>

              {/* Card 4: Inquiries */}
              <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
                    {icons.inquiries}
                  </div>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-slate-300 uppercase tracking-widest rounded">
                    INBOUND
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold pt-2">PESAN &amp; BRIEF</p>
                <p className="text-4xl font-black text-white">{inquiries.length}</p>
                <p className="text-xs text-slate-400 font-light">Pesan nyata yang masuk dari pengunjung</p>
              </div>
            </div>

            {/* Cloudinary Integration Status Card */}
            <div className="bg-gradient-to-r from-[#0a0a0d] to-[#121218] border border-white/15 p-8 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                    STATUS INTEGRASI REAL
                  </span>
                  <h2 className="text-2xl font-black uppercase text-white tracking-tight">
                    CLOUDINARY CDN &amp; SERVER PERSISTENCE AKTIF
                  </h2>
                  <p className="text-xs text-slate-300 mt-2 max-w-2xl font-light leading-relaxed">
                    Setiap perubahan data (slider hero, portofolio, anggota tim, dan layanan) langsung disimpan ke database server secara permanen. Foto diunggah langsung ke Cloudinary CDN saat pembuatan maupun pengeditan data.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('hero');
                      openHeroModal();
                    }}
                    className="px-6 py-3.5 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors rounded inline-flex items-center justify-center gap-2"
                  >
                    <span>+ Slide Hero Baru</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('showcase');
                      openShowcaseModal();
                    }}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white font-extrabold uppercase text-xs tracking-widest transition-all rounded inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>+ Karya Showcase</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-[#0a0a0d] border border-white/15 p-8 rounded-2xl space-y-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">
                AKSI CEPAT PENGELOLAAN
              </span>
              <h3 className="text-xl font-black uppercase text-white tracking-tight">PILIH MENU UNTUK MENGELOLA KONTEN</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setActiveTab('hero');
                    openHeroModal();
                  }}
                  className="p-5 bg-white/5 border border-white/10 hover:border-white/30 text-left rounded-xl transition-all group"
                >
                  <span className="text-xs font-mono font-extrabold uppercase text-white group-hover:text-amber-400 transition-colors block mb-1">
                    + Tambah Slide Hero
                  </span>
                  <p className="text-[11px] text-slate-400 font-light">Upload foto slider utama ke Cloudinary CDN</p>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('showcase');
                    openShowcaseModal();
                  }}
                  className="p-5 bg-white/5 border border-white/10 hover:border-white/30 text-left rounded-xl transition-all group"
                >
                  <span className="text-xs font-mono font-extrabold uppercase text-white group-hover:text-amber-400 transition-colors block mb-1">
                    + Tambah Karya Showcase
                  </span>
                  <p className="text-[11px] text-slate-400 font-light">Upload foto konser/event ke Cloudinary</p>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('members');
                    openMemberModal();
                  }}
                  className="p-5 bg-white/5 border border-white/10 hover:border-white/30 text-left rounded-xl transition-all group"
                >
                  <span className="text-xs font-mono font-extrabold uppercase text-white group-hover:text-amber-400 transition-colors block mb-1">
                    + Tambah Anggota Tim
                  </span>
                  <p className="text-[11px] text-slate-400 font-light">Upload avatar ke Cloudinary &amp; edit profil</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANGGOTA TIM (MEMBERS) */}
        {activeTab === 'members' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => {
                const isCloudinary = member.avatar.includes('res.cloudinary.com');
                return (
                  <div
                    key={member.id}
                    className="bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all group shadow-xl"
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

                        {/* Cloudinary CDN Indicator badge */}
                        <div className="absolute top-3 right-3">
                          {isCloudinary ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">
                              Cloudinary
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-black/70 border border-white/20 text-slate-300 font-mono text-[9px] uppercase backdrop-blur-md">
                              External
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="inline-block px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-extrabold text-slate-200 uppercase tracking-wider">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="text-xl font-black text-white tracking-tight">{member.name}</h3>

                        <div className="bg-white/5 p-3 rounded-lg border-l-2 border-slate-400 space-y-1">
                          <p className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Motto</p>
                          <p className="text-xs text-slate-200 italic font-light leading-relaxed">&ldquo;{member.motto}&rdquo;</p>
                        </div>

                        <p className="text-xs text-slate-400 font-light leading-relaxed">{member.bio}</p>

                        {member.highlights && (
                          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                            ★ {member.highlights}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 mt-4">
                      <label className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold transition-all text-xs font-mono uppercase inline-flex items-center gap-1.5 rounded cursor-pointer shadow">
                        {icons.upload}
                        <span>Ganti Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleUploadInput(e, 'member', async (url) => {
                              const ok = await changeTeamMemberAvatar(member.id, url);
                              if (ok) {
                                showToast(`✓ Foto avatar "${member.name}" berhasil diperbarui!`);
                                await refreshContent();
                              } else {
                                alert('Gagal menyimpan foto ke server.');
                              }
                            })
                          }
                        />
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openMemberModal(member)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono font-bold text-white uppercase inline-flex items-center gap-1.5 rounded"
                        >
                          {icons.edit}
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Hapus ${member.name} dari anggota tim?`)) {
                              await deleteTeamMember(member.id);
                              showToast('✓ Anggota berhasil dihapus');
                              await refreshContent();
                            }
                          }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-rose-600 hover:text-white transition-all text-xs font-mono font-bold text-slate-400 uppercase inline-flex items-center gap-1.5 rounded"
                        >
                          {icons.delete}
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: SLIDER HERO UTAMA */}
        {activeTab === 'hero' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  Fullscreen Hero Banner Slider
                </h3>
                <p className="text-xs text-slate-400 font-light mt-1">
                  Foto slider ini adalah gambar pertama yang dilihat pengunjung saat membuka halaman utama website.
                </p>
              </div>
              <button
                onClick={() => openHeroModal()}
                className="px-5 py-2.5 bg-white text-black font-extrabold uppercase text-xs tracking-wider rounded hover:bg-slate-200 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>+</span>
                <span>Tambah Slide Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroSlides.map((slide, idx) => {
                const isCloudinary = slide.image.includes('res.cloudinary.com');
                return (
                  <div
                    key={slide.id || idx}
                    className="bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all group shadow-xl"
                  >
                    <div>
                      <div className="relative w-full aspect-video overflow-hidden bg-black">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white">
                          SLIDE #{idx + 1}
                        </div>
                        <div className="absolute top-3 right-3">
                          {isCloudinary ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">
                              Cloudinary
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-slate-300 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">
                              Local File
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                          {slide.category}
                        </span>
                        <h3 className="text-lg font-black text-white leading-tight uppercase">
                          {slide.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 mt-4">
                      <label className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold transition-all text-xs font-mono uppercase inline-flex items-center gap-1.5 rounded cursor-pointer shadow">
                        {icons.upload}
                        <span>Ganti Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleUploadInput(e, 'hero', async (url) => {
                              const ok = await changeHeroSlideImage(slide.id, url);
                              if (ok) {
                                showToast(`✓ Foto Hero Slide #${idx + 1} berhasil diperbarui!`);
                                await refreshContent();
                              } else {
                                alert('Gagal menyimpan foto slide ke server.');
                              }
                            })
                          }
                        />
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openHeroModal(slide)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono font-bold text-white uppercase inline-flex items-center gap-1.5 rounded cursor-pointer"
                        >
                          {icons.edit}
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteHero(slide.id)}
                          disabled={heroSlides.length <= 1}
                          className="px-3 py-1.5 bg-white/5 hover:bg-rose-600 hover:text-white transition-all text-xs font-mono font-bold text-slate-400 uppercase inline-flex items-center gap-1.5 rounded disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title={heroSlides.length <= 1 ? "Minimal harus ada 1 slide" : "Hapus slide"}
                        >
                          {icons.delete}
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PORTOFOLIO / SHOWCASE */}
        {activeTab === 'showcase' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {showcaseItems.map((item) => {
                const isCloudinary = item.image.includes('res.cloudinary.com');
                return (
                  <div
                    key={item.id}
                    className="bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all group shadow-xl"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                      <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-[10px] font-mono text-slate-300 uppercase tracking-widest border border-white/10">
                        {item.category}
                      </span>

                      {/* Cloudinary CDN Indicator badge */}
                      <div className="absolute top-3 right-3">
                        {isCloudinary ? (
                          <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">
                            Cloudinary CDN
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded bg-black/70 border border-white/20 text-slate-300 font-mono text-[9px] uppercase backdrop-blur-md">
                            Local / External
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="text-2xl font-black uppercase text-white tracking-tight leading-tight">{item.title}</h3>
                      <p className="text-xs text-slate-300 font-light">{item.subtitle}</p>
                    </div>

                    <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 mt-auto">
                      <label className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold transition-all text-xs font-mono uppercase inline-flex items-center gap-1.5 rounded cursor-pointer shadow">
                        {icons.upload}
                        <span>Ganti Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleUploadInput(e, 'showcase', async (url) => {
                              const ok = await changeShowcaseItemImage(item.id, url);
                              if (ok) {
                                showToast(`✓ Foto Karya "${item.title}" berhasil diperbarui!`);
                                await refreshContent();
                              } else {
                                alert('Gagal menyimpan foto karya ke server.');
                              }
                            })
                          }
                        />
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openShowcaseModal(item)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono font-bold text-white uppercase inline-flex items-center gap-1.5 rounded"
                        >
                          {icons.edit}
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Hapus karya "${item.title}"?`)) {
                              await deleteShowcaseItem(item.id);
                              showToast('✓ Karya berhasil dihapus');
                              await refreshContent();
                            }
                          }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-rose-600 hover:text-white transition-all text-xs font-mono font-bold text-slate-400 uppercase inline-flex items-center gap-1.5 rounded"
                        >
                          {icons.delete}
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: GALERI CLOUDINARY (MEDIA MANAGER) */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header Toolbar */}
            <div className="bg-[#0a0a0d] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Cari foto di Cloudinary (nama/format)..."
                  value={mediaSearchQuery}
                  onChange={(e) => setMediaSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white rounded"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchCloudinaryMedia}
                  disabled={isMediaLoading}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
                >
                  <span className={isMediaLoading ? 'animate-spin' : ''}>↺</span>
                  <span>{isMediaLoading ? 'Memuat...' : 'Muat Ulang'}</span>
                </button>

                <label className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider rounded cursor-pointer inline-flex items-center gap-2 transition-colors shadow">
                  {icons.upload}
                  <span>Upload Foto Baru</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUploadInput(e, 'media')}
                  />
                </label>
              </div>
            </div>

            {/* Media Grid */}
            {isMediaLoading ? (
              <div className="p-16 text-center text-slate-400 font-mono text-xs uppercase tracking-widest bg-[#0a0a0d] border border-white/10 rounded-2xl">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto mb-3" />
                Memuat galeri Cloudinary...
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="p-16 text-center text-slate-400 font-mono text-xs uppercase tracking-widest bg-[#0a0a0d] border border-white/10 rounded-2xl">
                Tidak ada foto Cloudinary yang ditemukan.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedia.map((m) => (
                  <div
                    key={m.public_id}
                    className="bg-[#0a0a0d] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all group flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      <div className="relative aspect-video overflow-hidden bg-black">
                        <img
                          src={m.secure_url}
                          alt={m.public_id}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[9px] font-mono text-slate-300 uppercase border border-white/10">
                          {m.format}
                        </div>
                      </div>

                      <div className="p-4 space-y-1">
                        <p className="text-xs font-mono text-white truncate font-bold" title={m.public_id}>
                          {m.public_id.split('/').pop()}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400">
                          {m.width}x{m.height} px &bull; {(m.bytes / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-white/5 space-y-2 mt-2">
                      <button
                        onClick={() => setQuickApplyModal({ isOpen: true, url: m.secure_url })}
                        className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-black uppercase tracking-wider rounded transition-colors inline-flex items-center justify-center gap-1.5 shadow"
                      >
                        <span>🌟 Gunakan Foto Ini</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyUrl(m.secure_url)}
                          className="flex-1 py-1.5 bg-white/10 hover:bg-white hover:text-black text-slate-200 text-[10px] font-mono uppercase tracking-wider rounded transition-colors inline-flex items-center justify-center gap-1"
                        >
                          {icons.copy}
                          <span>{copiedUrl === m.secure_url ? 'Disalin!' : 'Salin URL'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCloudinary(m.public_id)}
                          className="px-2.5 py-1.5 bg-white/5 hover:bg-rose-600 hover:text-white text-slate-400 text-[10px] font-mono uppercase rounded transition-colors"
                          title="Hapus dari Cloudinary"
                        >
                          {icons.delete}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: LAYANAN / SERVICES */}
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
                          className="w-full px-4 py-3 bg-black border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-white rounded"
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
                          className="w-full px-4 py-3 bg-black border border-white/20 text-white text-xs font-mono focus:outline-none focus:border-white rounded"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-white text-black text-xs font-extrabold uppercase tracking-widest rounded"
                        >
                          Simpan Perubahan
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 bg-white/10 text-slate-300 text-xs font-mono font-bold uppercase rounded"
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
                          className="px-3 py-1 bg-white/10 hover:bg-white hover:text-black text-white text-xs font-mono font-bold uppercase transition-all inline-flex items-center gap-1.5 rounded"
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

        {/* TAB 6: PESAN MASUK (INQUIRIES) */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#0a0a0d] border border-white/10 rounded-2xl text-slate-400 text-xs font-mono uppercase tracking-widest">
                Belum ada pesan atau brief masuk saat ini.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-[#0a0a0d] border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-lg font-extrabold uppercase text-white">{inq.name}</h3>
                        <span className="text-xs font-mono text-emerald-400">{inq.service}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-slate-400">{inq.createdAt}</span>
                        <button
                          onClick={async () => {
                            if (confirm(`Hapus pesan dari ${inq.name}?`)) {
                              await deleteInquiry(inq.id);
                              showToast('✓ Pesan berhasil dihapus');
                            }
                          }}
                          className="px-3 py-1 bg-white/10 hover:bg-rose-600 hover:text-white text-slate-300 text-xs font-mono font-bold uppercase transition-colors inline-flex items-center gap-1.5 rounded"
                        >
                          {icons.delete}
                          <span>Hapus Pesan</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
                      <div><strong className="text-white">Email:</strong> {inq.email}</div>
                      <div><strong className="text-white">Telepon/WA:</strong> {inq.phone || '-'}</div>
                      <div><strong className="text-white">Tanggal Event:</strong> {inq.eventDate || '-'}</div>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl text-xs text-slate-200 font-light leading-relaxed">
                      <strong className="block font-mono text-white text-[10px] uppercase mb-1">Rincian Brief:</strong>
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
          <div className="bg-[#0a0a0c] border border-white/20 rounded-2xl w-full max-w-lg p-8 space-y-6 overflow-y-auto max-h-[90vh] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  TIM KREATIF &bull; CLOUDINARY
                </span>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">
                  {editingMember ? 'Edit Anggota Tim' : 'Tambah Anggota Tim Baru'}
                </h3>
              </div>
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
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
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
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
                />
              </div>

              {/* Foto Profil / Cloudinary Upload */}
              <div className="space-y-2 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-mono font-bold uppercase text-[10px]">
                    Foto Profil / Avatar (Cloudinary) *
                  </label>
                  {memberForm.avatar.includes('res.cloudinary.com') && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase rounded">
                      Cloudinary CDN
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {memberForm.avatar ? (
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black relative">
                      <img src={memberForm.avatar} alt="Preview" className="w-full h-full object-cover object-top" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl border border-dashed border-white/20 flex items-center justify-center shrink-0 bg-white/5 text-slate-500 font-mono text-[10px]">
                      No Avatar
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    {/* Direct Upload Button */}
                    <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-slate-200 rounded text-xs font-mono font-bold uppercase cursor-pointer transition-all shadow">
                      {icons.upload}
                      <span>Upload Baru ke Cloudinary</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleUploadInput(e, 'member', (url) =>
                            setMemberForm((prev) => ({ ...prev, avatar: url }))
                          )
                        }
                      />
                    </label>

                    {/* Choose from Cloudinary button */}
                    <button
                      type="button"
                      onClick={() => openCloudinaryPicker('member')}
                      className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-[10px] font-mono font-bold uppercase text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {icons.cloud}
                      <span>Pilih dari Galeri Cloudinary</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">URL Gambar:</span>
                  <input
                    type="text"
                    required
                    value={memberForm.avatar}
                    onChange={(e) => setMemberForm({ ...memberForm, avatar: e.target.value })}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full px-3 py-2 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white rounded"
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
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Bio Singkat</label>
                <textarea
                  rows={2}
                  value={memberForm.bio}
                  onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                  placeholder="Pengalaman & latar belakang..."
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">Pencapaian Utama (Highlight Tag)</label>
                <input
                  type="text"
                  value={memberForm.highlights}
                  onChange={(e) => setMemberForm({ ...memberForm, highlights: e.target.value })}
                  placeholder="Contoh: 150+ Major Events Covered"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-white text-black font-extrabold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors cursor-pointer rounded"
                >
                  Simpan Anggota &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-6 py-4 bg-white/10 text-white font-mono font-bold uppercase text-xs cursor-pointer rounded"
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
          <div className="bg-[#0a0a0c] border border-white/20 rounded-2xl w-full max-w-lg p-8 space-y-6 overflow-y-auto max-h-[90vh] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  PORTOFOLIO SHOWCASE &bull; CLOUDINARY
                </span>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">
                  {editingShowcase ? 'Edit Karya Portofolio' : 'Tambah Karya Portofolio Baru'}
                </h3>
              </div>
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
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
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
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
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
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
                />
              </div>

              {/* Showcase Image Upload with Cloudinary */}
              <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-mono font-bold uppercase text-[10px]">
                    Foto Thumbnail Karya (Cloudinary) *
                  </label>
                  {showcaseForm.image.includes('res.cloudinary.com') && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase rounded">
                      Cloudinary CDN
                    </span>
                  )}
                </div>

                {showcaseForm.image ? (
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black relative">
                    <img src={showcaseForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-xl border border-dashed border-white/20 flex items-center justify-center shrink-0 bg-white/5 text-slate-500 font-mono text-[10px]">
                    No Thumbnail Image
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-black hover:bg-slate-200 rounded text-xs font-mono font-bold uppercase cursor-pointer transition-all shadow">
                    {icons.upload}
                    <span>Upload ke Cloudinary</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleUploadInput(e, 'showcase', (url) =>
                          setShowcaseForm((prev) => ({ ...prev, image: url }))
                        )
                      }
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => openCloudinaryPicker('showcase')}
                    className="py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs font-mono font-bold uppercase text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {icons.cloud}
                    <span>Pilih dari Galeri</span>
                  </button>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">URL / Path Foto:</span>
                  <input
                    type="text"
                    required
                    value={showcaseForm.image}
                    onChange={(e) => setShowcaseForm({ ...showcaseForm, image: e.target.value })}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full px-3 py-2 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white rounded"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-white text-black font-extrabold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors cursor-pointer rounded"
                >
                  Simpan Karya &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => setIsShowcaseModalOpen(false)}
                  className="px-6 py-4 bg-white/10 text-white font-mono font-bold uppercase text-xs cursor-pointer rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH / EDIT HERO SLIDE */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="bg-[#0a0a0c] border border-white/20 rounded-2xl w-full max-w-lg p-8 space-y-6 overflow-y-auto max-h-[90vh] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  BANNER HERO &bull; HALAMAN UTAMA
                </span>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">
                  {editingHero ? 'Edit Slide Hero' : 'Tambah Slide Hero Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsHeroModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveHero} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">
                  Judul Utama (Headline) *
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  placeholder="Contoh: CRAFTING UNFORGETTABLE EXPERIENCES"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono font-bold uppercase mb-1 text-[10px]">
                  Sub-Judul / Kategori Tag *
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.category}
                  onChange={(e) => setHeroForm({ ...heroForm, category: e.target.value })}
                  placeholder="Contoh: Premier Visual Storytelling & Production Studio"
                  className="w-full px-4 py-3 bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-white rounded"
                />
              </div>

              {/* Hero Image Upload with Cloudinary */}
              <div className="space-y-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-mono font-bold uppercase text-[10px]">
                    Foto Background Hero (Cloudinary) *
                  </label>
                  {heroForm.image.includes('res.cloudinary.com') && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold uppercase rounded">
                      Cloudinary CDN
                    </span>
                  )}
                </div>

                {heroForm.image ? (
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black relative">
                    <img src={heroForm.image} alt="Hero Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-xl border border-dashed border-white/20 flex items-center justify-center shrink-0 bg-white/5 text-slate-500 font-mono text-[10px]">
                    Belum ada Foto Background
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-black hover:bg-slate-200 rounded text-xs font-mono font-bold uppercase cursor-pointer transition-all shadow">
                    {icons.upload}
                    <span>Upload ke Cloudinary</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleUploadInput(e, 'hero', (url) =>
                          setHeroForm((prev) => ({ ...prev, image: url }))
                        )
                      }
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => openCloudinaryPicker('hero')}
                    className="py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs font-mono font-bold uppercase text-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {icons.cloud}
                    <span>Pilih dari Galeri</span>
                  </button>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">URL / Path Foto Hero:</span>
                  <input
                    type="text"
                    required
                    value={heroForm.image}
                    onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full px-3 py-2 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white rounded"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-white text-black font-extrabold uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors cursor-pointer rounded"
                >
                  Simpan Slide Hero &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => setIsHeroModalOpen(false)}
                  className="px-6 py-4 bg-white/10 text-white font-mono font-bold uppercase text-xs cursor-pointer rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QUICK APPLY / LANGSUNG TAMPILKAN DI HALAMAN UTAMA */}
      {quickApplyModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="bg-[#0a0a0c] border border-white/20 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  UPLOAD BERHASIL &bull; TAMPILKAN DI WEBSITE
                </span>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">
                  Tampilkan Foto di Halaman Utama?
                </h3>
              </div>
              <button
                onClick={() => setQuickApplyModal({ isOpen: false, url: '' })}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/20 bg-black relative">
                <img src={quickApplyModal.url} alt="Uploaded preview" className="w-full h-full object-cover" />
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Foto berhasil diunggah ke Cloudinary CDN! Pilih bagian website mana yang ingin langsung diperbarui:
              </p>

              {/* Category Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setQuickApplyCategory('hero');
                    setQuickApplyTargetId(heroSlides[0]?.id || '');
                  }}
                  className={`py-2 text-xs font-mono font-bold uppercase rounded transition-colors ${
                    quickApplyCategory === 'hero' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Slide Hero
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickApplyCategory('showcase');
                    setQuickApplyTargetId(showcaseItems[0]?.id || '');
                  }}
                  className={`py-2 text-xs font-mono font-bold uppercase rounded transition-colors ${
                    quickApplyCategory === 'showcase' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Showcase
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuickApplyCategory('member');
                    setQuickApplyTargetId(teamMembers[0]?.id || '');
                  }}
                  className={`py-2 text-xs font-mono font-bold uppercase rounded transition-colors ${
                    quickApplyCategory === 'member' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Anggota Tim
                </button>
              </div>

              {/* Target List based on Category */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {quickApplyCategory === 'hero' && (
                  <>
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Pilih slide hero yang ingin diganti gambarnya:</p>
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={slide.id || idx}
                        type="button"
                        onClick={async () => {
                          const imgUrl = quickApplyModal.url;
                          const ok = await changeHeroSlideImage(slide.id, imgUrl);
                          if (ok) {
                            showToast(`✓ Foto Hero Slide #${idx + 1} berhasil diperbarui!`);
                            setQuickApplyModal({ isOpen: false, url: '' });
                            await refreshContent();
                          } else {
                            alert('Gagal memperbarui slide hero ke server.');
                          }
                        }}
                        className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400 rounded-xl text-left transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={slide.image} alt={slide.title} className="w-12 h-8 object-cover rounded bg-black" />
                          <div>
                            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">Slide #{idx + 1}</span>
                            <span className="text-xs font-bold text-white truncate max-w-xs block">{slide.title}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-400">&rarr; Ganti</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const imgUrl = quickApplyModal.url;
                        setQuickApplyModal({ isOpen: false, url: '' });
                        setHeroForm({
                          title: '',
                          category: 'Premier Visual Storytelling & Production Studio',
                          image: imgUrl,
                        });
                        setEditingHero(null);
                        setIsHeroModalOpen(true);
                      }}
                      className="w-full p-2.5 bg-white/10 hover:bg-white/20 border border-dashed border-white/20 text-white rounded-xl text-xs font-mono font-bold uppercase text-center block mt-2"
                    >
                      + Tambah Sebagai Slide Hero Baru
                    </button>
                  </>
                )}

                {quickApplyCategory === 'showcase' && (
                  <>
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Pilih karya showcase yang ingin diganti fotonya:</p>
                    {showcaseItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={async () => {
                          const imgUrl = quickApplyModal.url;
                          const ok = await changeShowcaseItemImage(item.id, imgUrl);
                          if (ok) {
                            showToast(`✓ Foto Karya "${item.title}" berhasil diperbarui!`);
                            setQuickApplyModal({ isOpen: false, url: '' });
                            await refreshContent();
                          } else {
                            alert('Gagal memperbarui foto karya ke server.');
                          }
                        }}
                        className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400 rounded-xl text-left transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.title} className="w-12 h-8 object-cover rounded bg-black" />
                          <div>
                            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">{item.category}</span>
                            <span className="text-xs font-bold text-white truncate max-w-xs block">{item.title}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-400">&rarr; Ganti</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const imgUrl = quickApplyModal.url;
                        setQuickApplyModal({ isOpen: false, url: '' });
                        setShowcaseForm({
                          title: '',
                          subtitle: '',
                          category: 'Concert & Festival',
                          image: imgUrl,
                        });
                        setEditingShowcase(null);
                        setIsShowcaseModalOpen(true);
                      }}
                      className="w-full p-2.5 bg-white/10 hover:bg-white/20 border border-dashed border-white/20 text-white rounded-xl text-xs font-mono font-bold uppercase text-center block mt-2"
                    >
                      + Tambah Sebagai Karya Showcase Baru
                    </button>
                  </>
                )}

                {quickApplyCategory === 'member' && (
                  <>
                    <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Pilih anggota tim yang ingin diganti fotonya:</p>
                    {teamMembers.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={async () => {
                          const imgUrl = quickApplyModal.url;
                          const ok = await changeTeamMemberAvatar(member.id, imgUrl);
                          if (ok) {
                            showToast(`✓ Foto Avatar "${member.name}" berhasil diperbarui!`);
                            setQuickApplyModal({ isOpen: false, url: '' });
                            await refreshContent();
                          } else {
                            alert('Gagal memperbarui foto avatar ke server.');
                          }
                        }}
                        className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400 rounded-xl text-left transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={member.avatar} alt={member.name} className="w-10 h-10 object-cover object-top rounded-full bg-black border border-white/10" />
                          <div>
                            <span className="text-xs font-bold text-white block">{member.name}</span>
                            <span className="text-[10px] font-mono text-slate-400 block">{member.role}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-400">&rarr; Ganti</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const imgUrl = quickApplyModal.url;
                        setQuickApplyModal({ isOpen: false, url: '' });
                        setMemberForm({
                          name: '',
                          role: '',
                          avatar: imgUrl,
                          motto: '',
                          bio: '',
                          highlights: '',
                        });
                        setEditingMember(null);
                        setIsMemberModalOpen(true);
                      }}
                      className="w-full p-2.5 bg-white/10 hover:bg-white/20 border border-dashed border-white/20 text-white rounded-xl text-xs font-mono font-bold uppercase text-center block mt-2"
                    >
                      + Tambah Sebagai Anggota Baru
                    </button>
                  </>
                )}
              </div>

              <div className="pt-2 text-center border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setQuickApplyModal({ isOpen: false, url: '' })}
                  className="text-slate-400 hover:text-white font-mono text-xs underline cursor-pointer"
                >
                  Selesai, hanya simpan di Galeri Cloudinary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CLOUDINARY MEDIA PICKER */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
          <div className="bg-[#0a0a0c] border border-white/20 rounded-2xl w-full max-w-4xl p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  PILIH DARI CLOUDINARY
                </span>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">
                  Pilih Foto untuk {pickerTarget === 'member' ? 'Anggota Tim' : pickerTarget === 'hero' ? 'Slide Hero Halaman Utama' : 'Karya Showcase'}
                </h3>
              </div>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Upload from Picker */}
            <div className="flex items-center justify-between gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-xs font-mono text-slate-300">Foto belum ada di galeri?</span>
              <label className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider rounded cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                {icons.upload}
                <span>Upload Foto Sekarang</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleUploadInput(e, pickerTarget || 'showcase', (url) => handleSelectFromPicker(url))
                  }
                />
              </label>
            </div>

            {/* Grid of Cloudinary Photos */}
            {cloudinaryMedia.length === 0 ? (
              <div className="p-12 text-center text-slate-400 font-mono text-xs">
                Belum ada foto di Cloudinary. Silakan upload terlebih dahulu.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto pr-2">
                {cloudinaryMedia.map((m) => (
                  <div
                    key={m.public_id}
                    onClick={() => handleSelectFromPicker(m.secure_url)}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-emerald-400 cursor-pointer transition-all bg-black"
                  >
                    <img
                      src={m.secure_url}
                      alt={m.public_id}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 bg-black text-white font-mono text-[10px] font-bold uppercase rounded shadow-lg">
                        Gunakan Foto Ini
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPickerOpen(false)}
                className="px-6 py-2.5 bg-white/10 text-white font-mono text-xs uppercase font-bold rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
