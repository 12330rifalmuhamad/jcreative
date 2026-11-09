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

export interface PageSettings {
  branding: {
    siteTitle: string;
    logoUrl: string;
    tagline: string;
  };
  sectionVisibility: {
    hero: boolean;
    statement: boolean;
    showcase: boolean;
    services: boolean;
    logoMarquee: boolean;
    creatives: boolean;
    team: boolean;
    storiesBanner: boolean;
    contact: boolean;
  };
  statement: {
    badge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
  };
  creatives: {
    badge: string;
    title: string;
    description: string;
    highlightRoles: string[];
    locationNote: string;
  };
  storiesBanner: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    backgroundImage: string;
  };
  showreel: {
    badge: string;
    title: string;
    videoUrl: string;
    previewImage: string;
    specsBadge: string;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    instagram: string;
    instagramUrl: string;
    email: string;
    whatsapp: string;
    whatsappNumber: string;
    location: string;
    successTitle: string;
    successMessage: string;
  };
  footer: {
    copyright: string;
    socials: {
      instagram: string;
      vimeo: string;
      youtube: string;
      linkedin: string;
    };
  };
}

export const DEFAULT_PAGE_SETTINGS: PageSettings = {
  branding: {
    siteTitle: 'J Creative Division',
    logoUrl: '/logo.jpg',
    tagline: 'Specialist Event Documentation & Media Production',
  },
  sectionVisibility: {
    hero: true,
    statement: true,
    showcase: true,
    services: false,
    logoMarquee: false,
    creatives: true,
    team: true,
    storiesBanner: true,
    contact: true,
  },
  statement: {
    badge: 'ABOUT OUR PRODUCTION',
    title: 'Specialist Event Documentation & Media Production',
    paragraph1: 'Di dunia dokumentasi event, kami berdedikasi menangkap setiap momen berharga, antusiasme penonton, dan atmosfer magis dari setiap acara—mulai dari konser musik skala besar, festival, hingga corporate gathering dan konferensi nasional.',
    paragraph2: 'Sebagai rumah produksi spesialis dokumentasi event profesional, kami mendokumentasikan setiap detail acara dengan standar visual sinematik tinggi, sistem multi-kamera 8K, dan drone aerial coverage.',
    paragraph3: 'Tim videografer dan fotografer kami berpengalaman mengabadikan sorotan penting secara real-time, menyajikan video recap, same-day edit highlight, dan aftermovie berkelas yang siap tayang untuk kebutuhan media sosial & publikasi brand.',
    paragraph4: 'Dengan pengalaman bertahun-tahun dalam dokumentasi acara berskala besar, kami menjamin eksekusi liputan yang cepat, presisi, dan mampu mengabadikan momen emosional yang berkesan bagi setiap klien.',
  },
  creatives: {
    badge: 'WORLD CLASS CREW',
    title: 'World Class Event Videographers & Crew',
    description: 'J Creative didukung oleh tim spesialis liputan event profesional yang siap mengabadikan momen luar biasa di berbagai festival besar, konser, dan konferensi skala internasional.',
    highlightRoles: [
      'Event Directors',
      'Multicam Operators',
      'Event Photographers',
      'Drone Pilots',
    ],
    locationNote: 'Berbasis di Indonesia dan siap diterjunkan ke lokasi event Anda di mana saja dengan kesiapan peralatan dan tim yang responsif.',
  },
  storiesBanner: {
    badge: 'STORIES & HIGHLIGHTS',
    title: 'J Creative Event Stories',
    description: 'Divisi liputan sinematik J Creative khusus mengabadikan kemeriahan, energi, dan emosi autentik dari setiap acara. Kami percaya setiap event memiliki cerita unik yang patut diabadikan dalam bentuk video aftermovie dan foto recap berkelas sinema.',
    buttonText: 'WATCH EVENT AFTERMOVIE',
    backgroundImage: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790997521/jcreative/showcase/dsc03481.jpg',
  },
  showreel: {
    badge: 'MASTER CINEMATIC REEL // 2026',
    title: 'Showreel Concert 2026',
    videoUrl: '',
    previewImage: 'https://res.cloudinary.com/dn4bhcsuh/image/upload/v1790953351/jcreative/showcase/dsc03485.jpg',
    specsBadge: '24fps 48kHz 8K HDR',
  },
  contact: {
    badge: 'GET IN TOUCH',
    title: "Let's Create Together",
    description: 'Ready to bring your commercial, music video, or brand documentary vision to life? Connect with our executive producers.',
    instagram: '@j.creative.official',
    instagramUrl: 'https://www.instagram.com/j.creative.official/',
    email: 'contact@jcreative.id',
    whatsapp: '+62 812-3456-7890',
    whatsappNumber: '6281234567890',
    location: 'Jakarta & Bali, Indonesia',
    successTitle: 'Brief Received',
    successMessage: 'Our producers at J Creative Division will contact you within 24 hours.',
  },
  footer: {
    copyright: '© 2026 J CREATIVE DIVISION. ALL RIGHTS RESERVED.',
    socials: {
      instagram: 'https://www.instagram.com/j.creative.official/',
      vimeo: 'https://vimeo.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
    },
  },
};

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
  pageSettings: PageSettings;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
  updatePageSettings: (settings: Partial<PageSettings>) => Promise<boolean>;
  updateSectionVisibility: (visibility: Partial<PageSettings['sectionVisibility']>) => Promise<boolean>;
  updateBranding: (branding: Partial<PageSettings['branding']>) => Promise<boolean>;
  updateStatement: (statement: Partial<PageSettings['statement']>) => Promise<boolean>;
  updateCreatives: (creatives: Partial<PageSettings['creatives']>) => Promise<boolean>;
  updateStoriesBanner: (banner: Partial<PageSettings['storiesBanner']>) => Promise<boolean>;
  updateShowreel: (showreel: Partial<PageSettings['showreel']>) => Promise<boolean>;
  updateContactSettings: (contact: Partial<PageSettings['contact']>) => Promise<boolean>;
  updateFooterSettings: (footer: Partial<PageSettings['footer']>) => Promise<boolean>;
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
  PAGE_SETTINGS: 'jcreative_page_settings',
  SYNC_TIMESTAMP: 'jcreative_last_sync_timestamp',
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>(DEFAULT_SHOWCASE_ITEMS);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [pageSettings, setPageSettings] = useState<PageSettings>(DEFAULT_PAGE_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to persist to localStorage
  const saveToLocalStorage = useCallback((data: {
    teamMembers?: TeamMember[];
    showcaseItems?: ShowcaseItem[];
    heroSlides?: HeroSlide[];
    services?: ServiceItem[];
    inquiries?: Inquiry[];
    pageSettings?: PageSettings;
  }) => {
    try {
      if (typeof window === 'undefined') return;
      if (data.teamMembers) localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(data.teamMembers));
      if (data.showcaseItems) localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(data.showcaseItems));
      if (data.heroSlides) localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(data.heroSlides));
      if (data.services) localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(data.services));
      if (data.inquiries) localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(data.inquiries));
      if (data.pageSettings) localStorage.setItem(STORAGE_KEYS.PAGE_SETTINGS, JSON.stringify(data.pageSettings));
      localStorage.setItem(STORAGE_KEYS.SYNC_TIMESTAMP, Date.now().toString());
    } catch (_) {}
  }, []);

  const mergePageSettings = (remoteSettings?: any): PageSettings => {
    if (!remoteSettings) return DEFAULT_PAGE_SETTINGS;
    return {
      branding: { ...DEFAULT_PAGE_SETTINGS.branding, ...(remoteSettings.branding || {}) },
      sectionVisibility: { ...DEFAULT_PAGE_SETTINGS.sectionVisibility, ...(remoteSettings.sectionVisibility || {}) },
      statement: { ...DEFAULT_PAGE_SETTINGS.statement, ...(remoteSettings.statement || {}) },
      creatives: { ...DEFAULT_PAGE_SETTINGS.creatives, ...(remoteSettings.creatives || {}) },
      storiesBanner: { ...DEFAULT_PAGE_SETTINGS.storiesBanner, ...(remoteSettings.storiesBanner || {}) },
      showreel: { ...DEFAULT_PAGE_SETTINGS.showreel, ...(remoteSettings.showreel || {}) },
      contact: { ...DEFAULT_PAGE_SETTINGS.contact, ...(remoteSettings.contact || {}) },
      footer: {
        ...DEFAULT_PAGE_SETTINGS.footer,
        ...(remoteSettings.footer || {}),
        socials: { ...DEFAULT_PAGE_SETTINGS.footer.socials, ...(remoteSettings?.footer?.socials || {}) },
      },
    };
  };

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
          if (json.data.pageSettings) {
            setPageSettings(mergePageSettings(json.data.pageSettings));
          }

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
        const savedSettings = localStorage.getItem(STORAGE_KEYS.PAGE_SETTINGS);

        if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
        if (savedShowcase) setShowcaseItems(JSON.parse(savedShowcase));
        if (savedHero) setHeroSlides(JSON.parse(savedHero));
        if (savedServices) setServices(JSON.parse(savedServices));
        if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
        if (savedSettings) setPageSettings(mergePageSettings(JSON.parse(savedSettings)));
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
          if (json.data.pageSettings) setPageSettings(mergePageSettings(json.data.pageSettings));

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

  const updatePageSettings = async (partial: Partial<PageSettings>): Promise<boolean> => {
    const updated: PageSettings = {
      branding: { ...pageSettings.branding, ...(partial.branding || {}) },
      sectionVisibility: { ...pageSettings.sectionVisibility, ...(partial.sectionVisibility || {}) },
      statement: { ...pageSettings.statement, ...(partial.statement || {}) },
      creatives: { ...pageSettings.creatives, ...(partial.creatives || {}) },
      storiesBanner: { ...pageSettings.storiesBanner, ...(partial.storiesBanner || {}) },
      showreel: { ...pageSettings.showreel, ...(partial.showreel || {}) },
      contact: { ...pageSettings.contact, ...(partial.contact || {}) },
      footer: {
        ...pageSettings.footer,
        ...(partial.footer || {}),
        socials: { ...pageSettings.footer.socials, ...(partial.footer?.socials || {}) },
      },
    };
    setPageSettings(updated);
    saveToLocalStorage({ pageSettings: updated });
    return await syncAction('updatePageSettings', updated);
  };

  const updateSectionVisibility = async (visibility: Partial<PageSettings['sectionVisibility']>): Promise<boolean> => {
    return await updatePageSettings({ sectionVisibility: { ...pageSettings.sectionVisibility, ...visibility } });
  };

  const updateBranding = async (branding: Partial<PageSettings['branding']>): Promise<boolean> => {
    return await updatePageSettings({ branding: { ...pageSettings.branding, ...branding } });
  };

  const updateStatement = async (statement: Partial<PageSettings['statement']>): Promise<boolean> => {
    return await updatePageSettings({ statement: { ...pageSettings.statement, ...statement } });
  };

  const updateCreatives = async (creatives: Partial<PageSettings['creatives']>): Promise<boolean> => {
    return await updatePageSettings({ creatives: { ...pageSettings.creatives, ...creatives } });
  };

  const updateStoriesBanner = async (banner: Partial<PageSettings['storiesBanner']>): Promise<boolean> => {
    return await updatePageSettings({ storiesBanner: { ...pageSettings.storiesBanner, ...banner } });
  };

  const updateShowreel = async (showreel: Partial<PageSettings['showreel']>): Promise<boolean> => {
    return await updatePageSettings({ showreel: { ...pageSettings.showreel, ...showreel } });
  };

  const updateContactSettings = async (contact: Partial<PageSettings['contact']>): Promise<boolean> => {
    return await updatePageSettings({ contact: { ...pageSettings.contact, ...contact } });
  };

  const updateFooterSettings = async (footer: Partial<PageSettings['footer']>): Promise<boolean> => {
    return await updatePageSettings({ footer: { ...pageSettings.footer, ...footer } });
  };

  const resetToDefault = async (): Promise<boolean> => {
    setTeamMembers(DEFAULT_TEAM_MEMBERS);
    setShowcaseItems(DEFAULT_SHOWCASE_ITEMS);
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setServices(DEFAULT_SERVICES);
    setInquiries(DEFAULT_INQUIRIES);
    setPageSettings(DEFAULT_PAGE_SETTINGS);
    saveToLocalStorage({
      teamMembers: DEFAULT_TEAM_MEMBERS,
      showcaseItems: DEFAULT_SHOWCASE_ITEMS,
      heroSlides: DEFAULT_HERO_SLIDES,
      services: DEFAULT_SERVICES,
      inquiries: DEFAULT_INQUIRIES,
      pageSettings: DEFAULT_PAGE_SETTINGS,
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
        pageSettings,
        isLoading,
        refreshContent,
        updatePageSettings,
        updateSectionVisibility,
        updateBranding,
        updateStatement,
        updateCreatives,
        updateStoriesBanner,
        updateShowreel,
        updateContactSettings,
        updateFooterSettings,
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
