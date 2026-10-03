import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'content.json');

interface ContentData {
  teamMembers: any[];
  showcaseItems: any[];
  services: any[];
  inquiries: any[];
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
    return JSON.parse(content);
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
  return NextResponse.json({
    success: true,
    data,
  });
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
            services: payload.services || current.services,
            inquiries: payload.inquiries || current.inquiries,
          };
          writeData(updated);
          return NextResponse.json({ success: true, data: updated });
        }
        break;
      }

      case 'addTeamMember': {
        const newMember = {
          ...payload,
          id: `member-${Date.now()}`,
        };
        current.teamMembers = [newMember, ...current.teamMembers];
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'updateTeamMember': {
        const { id, member } = payload;
        current.teamMembers = current.teamMembers.map((item) =>
          item.id === id ? { ...item, ...member } : item
        );
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
          id: `item-${Date.now()}`,
        };
        current.showcaseItems = [newItem, ...current.showcaseItems];
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'updateShowcaseItem': {
        const { id, item } = payload;
        current.showcaseItems = current.showcaseItems.map((s) =>
          s.id === id ? { ...s, ...item } : s
        );
        writeData(current);
        return NextResponse.json({ success: true, data: current });
      }

      case 'deleteShowcaseItem': {
        const { id } = payload;
        current.showcaseItems = current.showcaseItems.filter((s) => s.id !== id);
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
