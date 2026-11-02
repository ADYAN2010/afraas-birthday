import React, { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import FloatingParticles from './components/FloatingParticles';
import MusicPlayer from './components/MusicPlayer';
import BirthdayHero from './components/BirthdayHero';
import Countdown from './components/Countdown';
import PersonalNote from './components/PersonalNote';
import PhotoGallery from './components/PhotoGallery';
import BirthdayCake from './components/BirthdayCake';
import BirthdayWishes from './components/BirthdayWishes';
import BirthdayFunZone from './components/BirthdayFunZone';
import FinalSurprise from './components/FinalSurprise';
import Footer from './components/Footer';

export default function App() {
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  const handleOpenCelebration = () => {
    setIsCelebrationOpen(true);
    setStartMusic(true);
  };

  const scrollToCake = () => {
    const el = document.getElementById('cake-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNote = () => {
    const el = document.getElementById('note-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFun = () => {
    const el = document.getElementById('fun-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07030d] text-[#faf8f5]">
      {/* Background Twinkling Starlight & Subtle Bokeh Particles */}
      <FloatingParticles />

      {/* Opening Intro Gate */}
      {!isCelebrationOpen && <OpeningScreen onOpen={handleOpenCelebration} />}

      {/* Main Birthday Experience */}
      {isCelebrationOpen && (
        <main style={{ position: 'relative', zIndex: 2 }}>
          {/* Floating Music Player Toggle */}
          <MusicPlayer autoStarted={startMusic} />

          {/* 1. Main Birthday Hero */}
          <BirthdayHero
            onWishClick={scrollToCake}
            onNoteClick={scrollToNote}
            onGalleryClick={scrollToGallery}
            onFunClick={scrollToFun}
          />

          {/* 2. Live Countdown to 15 November 2026 (Asia/Dhaka) */}
          <Countdown />

          {/* 3. A Little Note For You (From Adyan to Afraa) */}
          <PersonalNote />

          {/* 4. A Little Photo Corner (Afraa's Portrait & Scrapbook Collages) */}
          <PhotoGallery />

          {/* 5. Interactive Birthday Cake & Candle Blow */}
          <BirthdayCake />

          {/* 6. Birthday Wishes ("Here's To Your New Chapter!") */}
          <BirthdayWishes />

          {/* 7. Birthday Fun Zone (Pop Balloons, Fortune Dispenser, Quick Quiz) */}
          <BirthdayFunZone />

          {/* 8. Grand Birthday Finale */}
          <FinalSurprise />

          {/* 9. Friendly Footer */}
          <Footer />
        </main>
      )}
    </div>
  );
}
