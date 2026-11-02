import React, { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import FloatingParticles from './components/FloatingParticles';
import MusicToggle from './components/MusicToggle';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import BirthdayCake from './components/BirthdayCake';
import BirthdayLetter from './components/BirthdayLetter';
import Wishes from './components/Wishes';
import FinalSurprise from './components/FinalSurprise';
import Footer from './components/Footer';

export default function App() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  const handleOpenSurprise = () => {
    setIsSurpriseOpen(true);
    setStartMusic(true);
  };

  const scrollToCake = () => {
    const el = document.getElementById('cake-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07030d] text-[#faf8f5]">
      {/* Background Starlight & Bokeh Particles */}
      <FloatingParticles />

      {/* Opening Screen Overlay */}
      {!isSurpriseOpen && <OpeningScreen onOpen={handleOpenSurprise} />}

      {/* Main Birthday Experience */}
      {isSurpriseOpen && (
        <main style={{ position: 'relative', zIndex: 2 }}>
          {/* Audio Floating Pill */}
          <MusicToggle autoStarted={startMusic} />

          {/* Main Hero Section */}
          <Hero onWishClick={scrollToCake} />

          {/* Live Countdown to 15 November 2026 (Asia/Dhaka) */}
          <Countdown />

          {/* Interactive Birthday Cake & Candle Blow */}
          <BirthdayCake />

          {/* Sincere Personal Birthday Letter */}
          <BirthdayLetter />

          {/* Reasons to Smile Cards */}
          <Wishes />

          {/* Grand Final Surprise Section */}
          <FinalSurprise />

          {/* Elegant Footer */}
          <Footer />
        </main>
      )}
    </div>
  );
}
