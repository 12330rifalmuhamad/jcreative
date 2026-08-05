'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import ShowcaseGrid from '@/components/ShowcaseGrid';
import Creatives from '@/components/Creatives';
import StoriesBanner from '@/components/StoriesBanner';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ShowreelModal from '@/components/ShowreelModal';

export default function Home() {
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Header Navigation */}
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Fullscreen Hero Slider */}
      <Hero onOpenReel={() => setIsReelOpen(true)} />

      {/* Motion & Stills Production Statement */}
      <Statement />

      {/* 2x2 Full Bleed Featured Works Grid */}
      <ShowcaseGrid />

      {/* World Class Creatives Representation */}
      <Creatives />

      {/* J Creative Stories Banner */}
      <StoriesBanner onOpenReel={() => setIsReelOpen(true)} />

      {/* Contact Section */}
      <ContactSection />

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
