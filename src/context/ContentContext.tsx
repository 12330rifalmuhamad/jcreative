'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  motto: string;
  bio: string;
  highlights: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  eventDate?: string;
  service: string;
  budget?: string;
  message: string;
  createdAt: string;
}

const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'M. Rifaldi',
    role: 'Head of Event Documentation & Director',
    avatar: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997522/jcreative/team/rifaldi.jpg',
    motto: 'Abadikan emosi murni, sajikan cerita sinematik yang abadi di setiap detik karya.',
    bio: 'Pengarah liputan konser & festival musik skala besar dengan pengalaman 10+ tahun mengabadikan momen panggung utama.',
    highlights: '150+ Major Events Covered',
  },
  {
    id: 'member-2',
    name: 'Reza V.',
    role: 'Lead Event Videographer & Multicam Specialist',
    avatar: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997522/jcreative/team/reza.jpg',
    motto: 'Presisi dalam pergerakan kamera, kesempurnaan visual di setiap bingkai 8K.',
    bio: 'Pakar pengambilan gambar multi-kamera 8K & drone sinematik untuk konser, stadium tour, dan summit internasional.',
    highlights: 'Multicam & Drone Master',
  },
  {
    id: 'member-3',
    name: 'Siti N.',
    role: 'Lead Event Photographer & Photo Director',
    avatar: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997523/jcreative/team/siti.jpg',
    motto: 'Satu ketukan shutter mampu membekukan keajaiban panggung menjadi sejarah abadi.',
    bio: 'Fotografer event senior berpengalaman menangkap momen candid penonton, aksi panggung utama, dan corporate VIP.',
    highlights: '500k+ Event Shots Captured',
  },
  {
    id: 'member-4',
    name: 'Dimas A.',
    role: 'Express Event Editor & Colorist',
    avatar: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997524/jcreative/team/dimas.jpg',
    motto: 'Ritme potongan gambar dan kedalaman warna adalah jiwa dari sebuah Aftermovie.',
    bio: 'Editor senior penyaji video aftermovie sinematik express (24-Hour Turnaround) & finishing colorist DaVinci Resolve.',
    highlights: 'DaVinci Color Specialist',
  },
];

const DEFAULT_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'item-1',
    title: 'Cinematic Stage & Concert Production',
    subtitle: 'Unforgettable Live Music Experiences',
    image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790953351/jcreative/showcase/dsc03485.jpg',
    category: 'Brand Slogan & Vision',
  },
  {
    id: 'item-2',
    title: 'Outdoor Festival Experience',
    subtitle: 'Global Music Festival Series',
    image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997517/jcreative/showcase/dsc02059.jpg',
    category: 'Festival Film',
  },
  {
    id: 'item-3',
    title: 'Soloist Arena World Tour',
    subtitle: 'Live Spotlight Performance',
    image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997518/jcreative/showcase/dsc02163.jpg',
    category: 'Arena Tour',
  },
  {
    id: 'item-4',
    title: 'Showreel Concert 2026',
    subtitle: 'J Creative Live Master Reel',
    image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997519/jcreative/showcase/dsc03638.jpg',
    category: 'Official Reel',
  },
];

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'CRAFTING UNFORGETTABLE EXPERIENCES',
    category: 'Premier Visual Storytelling & Production Studio',
    image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790953351/jcreative/showcase/dsc03485.jpg',
  },
  {
    id: 'hero-2',
    title: 'ELEVATE YOUR VISUAL IDENTITY',
    category: 'World-Class Cinematography & Media Excellence',
    image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997521/jcreative/showcase/dsc03481.jpg',
  },
  {
    id: 'hero-3',
    title: 'WHERE PASSION MEETS PRECISION',
    category: 'End-to-End Creative Film & Media Production',
    image: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997587/jcreative/hero/dsc02194.jpg',
  },
];

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: '01',
    title: 'Concert & Festival Coverage',
    desc: 'Liputan konser musik dan festival dengan sistem multi-kamera 8K, live switching, dan rekaman audio stereo master.',
  },
  {
    id: '02',
    title: 'Corporate Event & Gathering',
    desc: 'Dokumentasi konferensi, summit, corporate gathering, gala dinner, dan peluncuran produk secara profesional.',
  },
  {
    id: '03',
    title: 'Cinema Event Aftermovie',
    desc: 'Pembuatan video recap dan teaser sinematik dengan ritme editing cepat (Express 24-Hour Turnaround).',
  },
  {
    id: '04',
    title: 'On-Site Photography & Drone',
    desc: 'Dokumentasi foto event resolusi tinggi, cetak cepat on-site, serta liputan udara (aerial drone coverage).',
  },
];

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Budi Santoso',
    email: 'budi@festivallive.id',
    phone: '+6281234567890',
    eventDate: '2026-09-15',
    service: 'Concert & Festival Coverage',
    budget: 'Rp 50M - 100M',
    message: 'Kami ingin mengajukan liputan festival musik outdoor 3 hari di Bali dengan konsep 4K multicam & drone aftermovie.',
    createdAt: '1 Okt 2026, 14.30',
  },
];

interface ContentContextType {
  teamMembers: TeamMember[];
  showcaseItems: ShowcaseItem[];
  heroSlides: HeroSlide[];
  services: ServiceItem[];
  inquiries: Inquiry[];
  isLoading: boolean;
  refreshContent: () => Promise<void>;
  addTeamMember: (member: Omit<TeamMember, 'id'> & { id?: string }) => Promise<boolean>;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => Promise<boolean>;
  deleteTeamMember: (id: string) => Promise<boolean>;
  changeTeamMemberAvatar: (id: string, avatarUrl: string) => Promise<boolean>;
  addShowcaseItem: (item: Omit<ShowcaseItem, 'id'> & { id?: string }) => Promise<boolean>;
  updateShowcaseItem: (id: string, item: Partial<ShowcaseItem>) => Promise<boolean>;
  deleteShowcaseItem: (id: string) => Promise<boolean>;
  changeShowcaseItemImage: (id: string, imageUrl: string) => Promise<boolean>;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'> & { id?: string }) => Promise<boolean>;
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => Promise<boolean>;
  deleteHeroSlide: (id: string) => Promise<boolean>;
  changeHeroSlideImage: (id: string, imageUrl: string) => Promise<boolean>;
  updateService: (id: string, service: Partial<ServiceItem>) => Promise<boolean>;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => Promise<boolean>;
  deleteInquiry: (id: string) => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TEAM: 'jcreative_team_members',
  SHOWCASE: 'jcreative_showcase_items',
  HERO: 'jcreative_hero_slides',
  SERVICES: 'jcreative_services',
  INQUIRIES: 'jcreative_inquiries',
  SYNC_TIMESTAMP: 'jcreative_last_sync_timestamp',
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>(DEFAULT_SHOWCASE_ITEMS);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to persist to localStorage
  const saveToLocalStorage = useCallback((data: {
    teamMembers?: TeamMember[];
    showcaseItems?: ShowcaseItem[];
    heroSlides?: HeroSlide[];
    services?: ServiceItem[];
    inquiries?: Inquiry[];
  }) => {
    try {
      if (typeof window === 'undefined') return;
      if (data.teamMembers) localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(data.teamMembers));
      if (data.showcaseItems) localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(data.showcaseItems));
      if (data.heroSlides) localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(data.heroSlides));
      if (data.services) localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(data.services));
      if (data.inquiries) localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(data.inquiries));
      localStorage.setItem(STORAGE_KEYS.SYNC_TIMESTAMP, Date.now().toString());
    } catch (_) {}
  }, []);

  // Fetch real content from server API with cache busting
  const refreshContent = useCallback(async () => {
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.teamMembers) setTeamMembers(json.data.teamMembers);
          if (json.data.showcaseItems) setShowcaseItems(json.data.showcaseItems);
          if (json.data.heroSlides && Array.isArray(json.data.heroSlides) && json.data.heroSlides.length > 0) {
            setHeroSlides(json.data.heroSlides);
          }
          if (json.data.services) setServices(json.data.services);
          if (json.data.inquiries) setInquiries(json.data.inquiries);

          saveToLocalStorage(json.data);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch from /api/content, checking localStorage fallback...', e);
    }

    // Local storage fallback
    try {
      if (typeof window !== 'undefined') {
        const savedTeam = localStorage.getItem(STORAGE_KEYS.TEAM);
        const savedShowcase = localStorage.getItem(STORAGE_KEYS.SHOWCASE);
        const savedHero = localStorage.getItem(STORAGE_KEYS.HERO);
        const savedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
        const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);

        if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
        if (savedShowcase) setShowcaseItems(JSON.parse(savedShowcase));
        if (savedHero) setHeroSlides(JSON.parse(savedHero));
        if (savedServices) setServices(JSON.parse(savedServices));
        if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
      }
    } catch (localErr) {
      console.error('LocalStorage read error:', localErr);
    } finally {
      setIsLoading(false);
    }
  }, [saveToLocalStorage]);

  // Initial load on mount
  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  // Server sync helper
  const syncAction = async (action: string, payload?: any): Promise<boolean> => {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({ action, payload }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.teamMembers) setTeamMembers(json.data.teamMembers);
          if (json.data.showcaseItems) setShowcaseItems(json.data.showcaseItems);
          if (json.data.heroSlides && Array.isArray(json.data.heroSlides) && json.data.heroSlides.length > 0) {
            setHeroSlides(json.data.heroSlides);
          }
          if (json.data.services) setServices(json.data.services);
          if (json.data.inquiries) setInquiries(json.data.inquiries);

          saveToLocalStorage(json.data);
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error(`Sync action ${action} failed:`, e);
      return false;
    }
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'> & { id?: string }): Promise<boolean> => {
    const newId = member.id || `member-${Date.now()}`;
    const newMember: TeamMember = { ...member, id: newId };
    const updated = [newMember, ...teamMembers.filter((m) => m.id !== newId)];
    setTeamMembers(updated);
    saveToLocalStorage({ teamMembers: updated });
    return await syncAction('addTeamMember', newMember);
  };

  const updateTeamMember = async (id: string, updated: Partial<TeamMember>): Promise<boolean> => {
    const updatedMembers = teamMembers.map((item) => (item.id === id ? { ...item, ...updated } : item));
    setTeamMembers(updatedMembers);
    saveToLocalStorage({ teamMembers: updatedMembers });
    return await syncAction('updateTeamMember', { id, member: updated });
  };

  const deleteTeamMember = async (id: string): Promise<boolean> => {
    const updated = teamMembers.filter((item) => item.id !== id);
    setTeamMembers(updated);
    saveToLocalStorage({ teamMembers: updated });
    return await syncAction('deleteTeamMember', { id });
  };

  const changeTeamMemberAvatar = async (id: string, avatarUrl: string): Promise<boolean> => {
    return await updateTeamMember(id, { avatar: avatarUrl });
  };

  const addShowcaseItem = async (item: Omit<ShowcaseItem, 'id'> & { id?: string }): Promise<boolean> => {
    const newId = item.id || `item-${Date.now()}`;
    const newItem: ShowcaseItem = { ...item, id: newId };
    const updated = [newItem, ...showcaseItems.filter((i) => i.id !== newId)];
    setShowcaseItems(updated);
    saveToLocalStorage({ showcaseItems: updated });
    return await syncAction('addShowcaseItem', newItem);
  };

  const updateShowcaseItem = async (id: string, updated: Partial<ShowcaseItem>): Promise<boolean> => {
    const updatedItems = showcaseItems.map((item) => (item.id === id ? { ...item, ...updated } : item));
    setShowcaseItems(updatedItems);
    saveToLocalStorage({ showcaseItems: updatedItems });
    return await syncAction('updateShowcaseItem', { id, item: updated });
  };

  const deleteShowcaseItem = async (id: string): Promise<boolean> => {
    const updated = showcaseItems.filter((item) => item.id !== id);
    setShowcaseItems(updated);
    saveToLocalStorage({ showcaseItems: updated });
    return await syncAction('deleteShowcaseItem', { id });
  };

  const changeShowcaseItemImage = async (id: string, imageUrl: string): Promise<boolean> => {
    return await updateShowcaseItem(id, { image: imageUrl });
  };

  const addHeroSlide = async (slide: Omit<HeroSlide, 'id'> & { id?: string }): Promise<boolean> => {
    const newId = slide.id || `hero-${Date.now()}`;
    const newSlide: HeroSlide = { ...slide, id: newId };
    const updated = [...heroSlides.filter((s) => s.id !== newId), newSlide];
    setHeroSlides(updated);
    saveToLocalStorage({ heroSlides: updated });
    return await syncAction('addHeroSlide', newSlide);
  };

  const updateHeroSlide = async (id: string, updated: Partial<HeroSlide>): Promise<boolean> => {
    const updatedSlides = heroSlides.map((slide) => (slide.id === id ? { ...slide, ...updated } : slide));
    setHeroSlides(updatedSlides);
    saveToLocalStorage({ heroSlides: updatedSlides });
    return await syncAction('updateHeroSlide', { id, slide: updated });
  };

  const deleteHeroSlide = async (id: string): Promise<boolean> => {
    const updated = heroSlides.filter((slide) => slide.id !== id);
    setHeroSlides(updated);
    saveToLocalStorage({ heroSlides: updated });
    return await syncAction('deleteHeroSlide', { id });
  };

  const changeHeroSlideImage = async (id: string, imageUrl: string): Promise<boolean> => {
    return await updateHeroSlide(id, { image: imageUrl });
  };

  const updateService = async (id: string, updated: Partial<ServiceItem>): Promise<boolean> => {
    const updatedServices = services.map((item) => (item.id === id ? { ...item, ...updated } : item));
    setServices(updatedServices);
    saveToLocalStorage({ services: updatedServices });
    return await syncAction('updateService', { id, service: updated });
  };

  const addInquiry = async (inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<boolean> => {
    const tempInq: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const updated = [tempInq, ...inquiries];
    setInquiries(updated);
    saveToLocalStorage({ inquiries: updated });
    return await syncAction('addInquiry', inquiry);
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    saveToLocalStorage({ inquiries: updated });
    return await syncAction('deleteInquiry', { id });
  };

  const resetToDefault = async (): Promise<boolean> => {
    setTeamMembers(DEFAULT_TEAM_MEMBERS);
    setShowcaseItems(DEFAULT_SHOWCASE_ITEMS);
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setServices(DEFAULT_SERVICES);
    setInquiries(DEFAULT_INQUIRIES);
    saveToLocalStorage({
      teamMembers: DEFAULT_TEAM_MEMBERS,
      showcaseItems: DEFAULT_SHOWCASE_ITEMS,
      heroSlides: DEFAULT_HERO_SLIDES,
      services: DEFAULT_SERVICES,
      inquiries: DEFAULT_INQUIRIES,
    });
    return await syncAction('resetToDefault');
  };

  return (
    <ContentContext.Provider
      value={{
        teamMembers,
        showcaseItems,
        heroSlides,
        services,
        inquiries,
        isLoading,
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
        addInquiry,
        deleteInquiry,
        resetToDefault,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
