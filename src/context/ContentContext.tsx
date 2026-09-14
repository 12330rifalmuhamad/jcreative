'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    motto: 'Abadikan emosi murni, sajikan cerita sinematik yang abadi di setiap detik karya.',
    bio: 'Pengarah liputan konser & festival musik skala besar dengan pengalaman 10+ tahun mengabadikan momen panggung utama.',
    highlights: '150+ Major Events Covered',
  },
  {
    id: 'member-2',
    name: 'Reza V.',
    role: 'Lead Event Videographer & Multicam Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    motto: 'Presisi dalam pergerakan kamera, kesempurnaan visual di setiap bingkai 8K.',
    bio: 'Pakar pengambilan gambar multi-kamera 8K & drone sinematik untuk konser, stadium tour, dan summit internasional.',
    highlights: 'Multicam & Drone Master',
  },
  {
    id: 'member-3',
    name: 'Siti N.',
    role: 'Lead Event Photographer & Photo Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    motto: 'Satu ketukan shutter mampu membekukan keajaiban panggung menjadi sejarah abadi.',
    bio: 'Fotografer event senior berpengalaman menangkap momen candid penonton, aksi panggung utama, dan corporate VIP.',
    highlights: '500k+ Event Shots Captured',
  },
  {
    id: 'member-4',
    name: 'Dimas A.',
    role: 'Express Event Editor & Colorist',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
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
    image: '/images/DSC03485.jpg',
    category: 'Brand Slogan & Vision',
  },
  {
    id: 'item-2',
    title: 'Outdoor Festival Experience',
    subtitle: 'Global Music Festival Series',
    image: '/images/DSC02059.jpg',
    category: 'Festival Film',
  },
  {
    id: 'item-3',
    title: 'Soloist Arena World Tour',
    subtitle: 'Live Spotlight Performance',
    image: '/images/DSC02163.jpg',
    category: 'Arena Tour',
  },
  {
    id: 'item-4',
    title: 'Showreel Concert 2026',
    subtitle: 'J Creative Live Master Reel',
    image: '/images/DSC03638.jpg',
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
    createdAt: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
  },
];

interface ContentContextType {
  teamMembers: TeamMember[];
  showcaseItems: ShowcaseItem[];
  services: ServiceItem[];
  inquiries: Inquiry[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addShowcaseItem: (item: Omit<ShowcaseItem, 'id'>) => void;
  updateShowcaseItem: (id: string, item: Partial<ShowcaseItem>) => void;
  deleteShowcaseItem: (id: string) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => void;
  deleteInquiry: (id: string) => void;
  resetToDefault: () => void;
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedTeam = localStorage.getItem(STORAGE_KEYS.TEAM);
      const savedShowcase = localStorage.getItem(STORAGE_KEYS.SHOWCASE);
      const savedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
      const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);

      if (savedTeam) setTeamMembers(JSON.parse(savedTeam));
      if (savedShowcase) setShowcaseItems(JSON.parse(savedShowcase));
      if (savedServices) setServices(JSON.parse(savedServices));
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
    } catch (e) {
      console.error('Failed to load content from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(teamMembers));
      localStorage.setItem(STORAGE_KEYS.SHOWCASE, JSON.stringify(showcaseItems));
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save content to localStorage', e);
    }
  }, [teamMembers, showcaseItems, services, inquiries, isLoaded]);

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `member-${Date.now()}`,
    };
    setTeamMembers((prev) => [newMember, ...prev]);
  };

  const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
    setTeamMembers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((item) => item.id !== id));
  };

  const addShowcaseItem = (item: Omit<ShowcaseItem, 'id'>) => {
    const newItem: ShowcaseItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setShowcaseItems((prev) => [newItem, ...prev]);
  };

  const updateShowcaseItem = (id: string, updated: Partial<ShowcaseItem>) => {
    setShowcaseItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteShowcaseItem = (id: string) => {
    setShowcaseItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const newInquiry: Inquiry = {
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
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    setTeamMembers(DEFAULT_TEAM_MEMBERS);
    setShowcaseItems(DEFAULT_SHOWCASE_ITEMS);
    setServices(DEFAULT_SERVICES);
    setInquiries(DEFAULT_INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.SHOWCASE);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  };

  return (
    <ContentContext.Provider
      value={{
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
