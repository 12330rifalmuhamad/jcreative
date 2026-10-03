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
  services: ServiceItem[];
  inquiries: Inquiry[];
  isLoading: boolean;
  refreshContent: () => Promise<void>;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  addShowcaseItem: (item: Omit<ShowcaseItem, 'id'>) => Promise<void>;
  updateShowcaseItem: (id: string, item: Partial<ShowcaseItem>) => Promise<void>;
  deleteShowcaseItem: (id: string) => Promise<void>;
  updateService: (id: string, service: Partial<ServiceItem>) => Promise<void>;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  resetToDefault: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TEAM: 'jcreative_team_members',
  SHOWCASE: 'jcreative_showcase_items',
  SERVICES: 'jcreative_services',
  INQUIRIES: 'jcreative_inquiries',
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>(DEFAULT_SHOWCASE_ITEMS);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch real content from server API
  const refreshContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.teamMembers) setTeamMembers(json.data.teamMembers);
          if (json.data.showcaseItems) setShowcaseItems(json.data.showcaseItems);
          if (json.data.services) setServices(json.data.services);
          if (json.data.inquiries) setInquiries(json.data.inquiries);

          // Update cache in localStorage as secondary backup
          try {
            localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(json.data.teamMembers));
            localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(json.data.showcaseItems));
            localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(json.data.services));
            localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(json.data.inquiries));
          } catch (_) {}
        }
      }
    } catch (e) {
      console.warn('Failed to fetch from /api/content, checking localStorage fallback...', e);
      try {
        const savedTeam = localStorage.getItem(STORAGE_KEYS.TEAM);
        const savedShowcase = localStorage.getItem(STORAGE_KEYS.SHOWCASE);
        const savedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
        const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);

        if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
        if (savedShowcase) setShowcaseItems(JSON.parse(savedShowcase));
        if (savedServices) setServices(JSON.parse(savedServices));
        if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
      } catch (localErr) {
        console.error('LocalStorage read error:', localErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  // Server sync helper
  const syncAction = async (action: string, payload?: any) => {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.teamMembers) setTeamMembers(json.data.teamMembers);
          if (json.data.showcaseItems) setShowcaseItems(json.data.showcaseItems);
          if (json.data.services) setServices(json.data.services);
          if (json.data.inquiries) setInquiries(json.data.inquiries);
        }
      }
    } catch (e) {
      console.error(`Sync action ${action} failed:`, e);
    }
  };

  const addTeamMember = async (member: Omit<TeamMember, 'id'>) => {
    const tempMember: TeamMember = { ...member, id: `member-${Date.now()}` };
    setTeamMembers((prev) => [tempMember, ...prev]);
    await syncAction('addTeamMember', member);
  };

  const updateTeamMember = async (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    await syncAction('updateTeamMember', { id, member: updated });
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers((prev) => prev.filter((item) => item.id !== id));
    await syncAction('deleteTeamMember', { id });
  };

  const addShowcaseItem = async (item: Omit<ShowcaseItem, 'id'>) => {
    const tempItem: ShowcaseItem = { ...item, id: `item-${Date.now()}` };
    setShowcaseItems((prev) => [tempItem, ...prev]);
    await syncAction('addShowcaseItem', item);
  };

  const updateShowcaseItem = async (id: string, updated: Partial<ShowcaseItem>) => {
    setShowcaseItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    await syncAction('updateShowcaseItem', { id, item: updated });
  };

  const deleteShowcaseItem = async (id: string) => {
    setShowcaseItems((prev) => prev.filter((item) => item.id !== id));
    await syncAction('deleteShowcaseItem', { id });
  };

  const updateService = async (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    await syncAction('updateService', { id, service: updated });
  };

  const addInquiry = async (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
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
    setInquiries((prev) => [tempInq, ...prev]);
    await syncAction('addInquiry', inquiry);
  };

  const deleteInquiry = async (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    await syncAction('deleteInquiry', { id });
  };

  const resetToDefault = async () => {
    setTeamMembers(DEFAULT_TEAM_MEMBERS);
    setShowcaseItems(DEFAULT_SHOWCASE_ITEMS);
    setServices(DEFAULT_SERVICES);
    setInquiries(DEFAULT_INQUIRIES);
    await syncAction('resetToDefault');
  };

  return (
    <ContentContext.Provider
      value={{
        teamMembers,
        showcaseItems,
        services,
        inquiries,
        isLoading,
        refreshContent,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addShowcaseItem,
        updateShowcaseItem,
        deleteShowcaseItem,
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
