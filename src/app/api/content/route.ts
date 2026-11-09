import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'content.json');

export interface HeroSlide {
  id: string;
  title: string;
  category: string;
  image: string;
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

interface ContentData {
  teamMembers: any[];
  showcaseItems: any[];
  heroSlides: HeroSlide[];
  services: any[];
  inquiries: any[];
  pageSettings: PageSettings;
}

const DEFAULT_DATA: ContentData = {
  teamMembers: [
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
  ],
  showcaseItems: [
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
  ],
  heroSlides: [
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
  ],
  services: [
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
  ],
  inquiries: [
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
  ],
  pageSettings: DEFAULT_PAGE_SETTINGS,
};

function readData(): ContentData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      return DEFAULT_DATA;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    if (!parsed.heroSlides || !Array.isArray(parsed.heroSlides) || parsed.heroSlides.length === 0) {
      parsed.heroSlides = DEFAULT_DATA.heroSlides;
    }
    if (!parsed.teamMembers || !Array.isArray(parsed.teamMembers) || parsed.teamMembers.length === 0) {
      parsed.teamMembers = DEFAULT_DATA.teamMembers;
    }
    if (!parsed.showcaseItems || !Array.isArray(parsed.showcaseItems) || parsed.showcaseItems.length === 0) {
      parsed.showcaseItems = DEFAULT_DATA.showcaseItems;
    }
    if (!parsed.pageSettings) {
      parsed.pageSettings = DEFAULT_PAGE_SETTINGS;
    } else {
      parsed.pageSettings = {
        branding: { ...DEFAULT_PAGE_SETTINGS.branding, ...(parsed.pageSettings.branding || {}) },
        sectionVisibility: { ...DEFAULT_PAGE_SETTINGS.sectionVisibility, ...(parsed.pageSettings.sectionVisibility || {}) },
        statement: { ...DEFAULT_PAGE_SETTINGS.statement, ...(parsed.pageSettings.statement || {}) },
        creatives: { ...DEFAULT_PAGE_SETTINGS.creatives, ...(parsed.pageSettings.creatives || {}) },
        storiesBanner: { ...DEFAULT_PAGE_SETTINGS.storiesBanner, ...(parsed.pageSettings.storiesBanner || {}) },
        showreel: { ...DEFAULT_PAGE_SETTINGS.showreel, ...(parsed.pageSettings.showreel || {}) },
        contact: { ...DEFAULT_PAGE_SETTINGS.contact, ...(parsed.pageSettings.contact || {}) },
        footer: {
          ...DEFAULT_PAGE_SETTINGS.footer,
          ...(parsed.pageSettings.footer || {}),
          socials: { ...DEFAULT_PAGE_SETTINGS.footer.socials, ...(parsed.pageSettings?.footer?.socials || {}) },
        },
      };
    }
    return parsed;
  } catch (error) {
    console.error('Error reading content.json:', error);
    return DEFAULT_DATA;
  }
}

function writeData(data: ContentData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing content.json:', error);
    return false;
  }
}

export async function GET() {
  const data = readData();
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    const current = readData();

    switch (action) {
      case 'saveAll': {
        if (payload) {
          const updated = {
            teamMembers: payload.teamMembers || current.teamMembers,
            showcaseItems: payload.showcaseItems || current.showcaseItems,
            heroSlides: payload.heroSlides || current.heroSlides,
            services: payload.services || current.services,
            inquiries: payload.inquiries || current.inquiries,
            pageSettings: payload.pageSettings || current.pageSettings,
          };
          writeData(updated);
          return NextResponse.json({ success: true, data: updated });
        }
        break;
      }

      case 'updatePageSettings': {
        const settings = payload || {};
        current.pageSettings = {
          branding: { ...current.pageSettings.branding, ...(settings.branding || {}) },
          sectionVisibility: { ...current.pageSettings.sectionVisibility, ...(settings.sectionVisibility || {}) },
          statement: { ...current.pageSettings.statement, ...(settings.statement || {}) },
          creatives: { ...current.pageSettings.creatives, ...(settings.creatives || {}) },
          storiesBanner: { ...current.pageSettings.storiesBanner, ...(settings.storiesBanner || {}) },
          showreel: { ...current.pageSettings.showreel, ...(settings.showreel || {}) },
          contact: { ...current.pageSettings.contact, ...(settings.contact || {}) },
          footer: {
            ...current.pageSettings.footer,
            ...(settings.footer || {}),
            socials: { ...current.pageSettings.footer.socials, ...(settings.footer?.socials || {}) },
          },
        };
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'addTeamMember': {
        const newMember = {
          ...payload,
          id: payload.id || `member-${Date.now()}`,
        };
        current.teamMembers = [newMember, ...current.teamMembers];
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'updateTeamMember': {
        const { id, member } = payload;
        const index = current.teamMembers.findIndex((item) => item.id === id);
        if (index !== -1) {
          current.teamMembers[index] = { ...current.teamMembers[index], ...member };
        } else {
          current.teamMembers.push({ id, ...member });
        }
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'deleteTeamMember': {
        const { id } = payload;
        current.teamMembers = current.teamMembers.filter((item) => item.id !== id);
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'addShowcaseItem': {
        const newItem = {
          ...payload,
          id: payload.id || `item-${Date.now()}`,
        };
        current.showcaseItems = [newItem, ...current.showcaseItems];
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'updateShowcaseItem': {
        const { id, item } = payload;
        const index = current.showcaseItems.findIndex((s) => s.id === id);
        if (index !== -1) {
          current.showcaseItems[index] = { ...current.showcaseItems[index], ...item };
        } else {
          current.showcaseItems.push({ id, ...item });
        }
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'deleteShowcaseItem': {
        const { id } = payload;
        current.showcaseItems = current.showcaseItems.filter((s) => s.id !== id);
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'addHeroSlide': {
        const newSlide = {
          ...payload,
          id: payload.id || `hero-${Date.now()}`,
        };
        current.heroSlides = [...(current.heroSlides || []), newSlide];
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'updateHeroSlide': {
        const { id, slide } = payload;
        current.heroSlides = current.heroSlides || [];
        const index = current.heroSlides.findIndex((s) => s.id === id);
        if (index !== -1) {
          current.heroSlides[index] = { ...current.heroSlides[index], ...slide };
        } else {
          current.heroSlides.push({ id, ...slide });
        }
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'deleteHeroSlide': {
        const { id } = payload;
        current.heroSlides = (current.heroSlides || []).filter((s) => s.id !== id);
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'updateService': {
        const { id, service } = payload;
        current.services = current.services.map((s) =>
          s.id === id ? { ...s, ...service } : s
        );
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'addInquiry': {
        const newInquiry = {
          ...payload,
          id: `inq-${Date.now()}`,
          createdAt: new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        current.inquiries = [newInquiry, ...current.inquiries];
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'deleteInquiry': {
        const { id } = payload;
        current.inquiries = current.inquiries.filter((inq) => inq.id !== id);
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'resetToDefault': {
        writeData(DEFAULT_DATA);
        return NextResponse.json({ success: true, data: DEFAULT_DATA });
      }

      default:
        return NextResponse.json(
          { error: `Aksi tidak dikenal: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data: current });
  } catch (error: any) {
    console.error('API /api/content error:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal memproses data konten' },
      { status: 500 }
    );
  }
}
