'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import ShowcaseGrid from '@/components/ShowcaseGrid';
import Services from '@/components/Services';
import LogoMarquee from '@/components/LogoMarquee';
import Creatives from '@/components/Creatives';
import Team from '@/components/Team';
import StoriesBanner from '@/components/StoriesBanner';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ShowreelModal from '@/components/ShowreelModal';
import { useContent } from '@/context/ContentContext';

export default function Home() {
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { pageSettings } = useContent();
  const visibility = pageSettings?.sectionVisibility;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Header Navigation */}
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Fullscreen Hero Slider */}
      {visibility?.hero !== false && (
        <Hero onOpenReel={() => setIsReelOpen(true)} />
      )}

      {/* Motion & Stills Production Statement */}
      {visibility?.statement !== false && <Statement />}

      {/* 2x2 Full Bleed Featured Works Grid */}
      {visibility?.showcase !== false && <ShowcaseGrid />}

      {/* Optional Creative Capabilities / Services */}
      {visibility?.services && <Services />}

      {/* Optional Client Brands Marquee */}
      {visibility?.logoMarquee && <LogoMarquee />}

      {/* World Class Creatives Representation */}
      {visibility?.creatives !== false && <Creatives />}

      {/* Core Team & Member Cards */}
      {visibility?.team !== false && <Team />}

      {/* J Creative Stories Banner */}
      {visibility?.storiesBanner !== false && (
        <StoriesBanner onOpenReel={() => setIsReelOpen(true)} />
      )}

      {/* Contact Section */}
      {visibility?.contact !== false && <ContactSection />}

      {/* Minimal Footer */}
      <Footer />

      {/* Lightbox Showreel Modal */}
      <ShowreelModal isOpen={isReelOpen} onClose={() => setIsReelOpen(false)} />

      {/* Contact Modal */}
      {isContactModalOpen && (
        <ContactSection
          isModal={true}
          onCloseModal={() => setIsContactModalOpen(false)}
        />
      )}
    </main>
  );
}
