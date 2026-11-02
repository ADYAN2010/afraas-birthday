import React, { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import FloatingParticles from './components/FloatingParticles';
import MusicPlayer from './components/MusicPlayer';
import BirthdayHero from './components/BirthdayHero';
import Countdown from './components/Countdown';
import PersonalLetter from './components/PersonalLetter';
import LittleUniverse from './components/LittleUniverse';
import BirthdayWishes from './components/BirthdayWishes';
import BirthdayCake from './components/BirthdayCake';
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

  const scrollToLetter = () => {
    const el = document.getElementById('letter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07030d] text-[#faf8f5]">
      {/* Background Twinkling Starlight & Bokeh Particles */}
      <FloatingParticles />

      {/* Cinematic Opening Gate */}
      {!isSurpriseOpen && <OpeningScreen onOpen={handleOpenSurprise} />}

      {/* Main Birthday Journey */}
      {isSurpriseOpen && (
        <main style={{ position: 'relative', zIndex: 2 }}>
          {/* Floating Audio Controller */}
          <MusicPlayer autoStarted={startMusic} />

          {/* 1. Main Birthday Hero */}
          <BirthdayHero onWishClick={scrollToCake} onLetterClick={scrollToLetter} />

          {/* 2. Live Countdown to 15 November 2026 (Asia/Dhaka) */}
          <Countdown />

          {/* 3. A Little Something From Me (Personal Letter) */}
          <PersonalLetter />

          {/* 4. Our Little Universe (Roblox/Among Us, 3-Hour Problem, Beyadob Incident) */}
          <LittleUniverse />

          {/* 5. Interactive Birthday Cake & Candle Blow */}
          <BirthdayCake />

          {/* 6. Birthday Wishes (Six Heartfelt Wishes) */}
          <BirthdayWishes />

          {/* 7. Grand Final Surprise */}
          <FinalSurprise />

          {/* 8. Editorial Footer */}
          <Footer />
        </main>
      )}
    </div>
  );
}
