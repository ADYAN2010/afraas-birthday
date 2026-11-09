import React, { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import FloatingParticles from './components/FloatingParticles';
import MusicPlayer from './components/MusicPlayer';
import BirthdayHero from './components/BirthdayHero';
import Countdown from './components/Countdown';
import PersonalNote from './components/PersonalNote';
import ThoughtfulNotes from './components/ThoughtfulNotes';
import PhotoGallery from './components/PhotoGallery';
import HiddenNotes from './components/HiddenNotes';
import EditorialQuote from './components/EditorialQuote';
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
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: 'var(--butter-cream)',
        color: 'var(--deep-brown)',
      }}
      className="journal-grid-pattern selection:bg-[#F3DDE2] selection:text-[#A94B59]"
    >
      {/* Background Soft Pastel Twinkling Starlets & Petals */}
      <FloatingParticles />

      {/* Opening Intro Gate with Cute Scrapbook Envelope */}
      {!isCelebrationOpen && <OpeningScreen onOpen={handleOpenCelebration} />}

      {/* Main Birthday Experience */}
      {isCelebrationOpen && (
        <main
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',
          }}
        >
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

          {/* 3. The Birthday Letter: Meaningful, original personal message from Adyan */}
          <PersonalNote />

          {/* 4. Thoughts for You: Distinct perspectives on timing, personality, and milestones */}
          <ThoughtfulNotes />

          {/* 5. Photo Corner: Photo-relevant creative memories */}
          <PhotoGallery />

          {/* 6. Hidden Notes: Playful, humorous interactive folded notes */}
          <HiddenNotes />

          {/* Editorial Pause: Artistic Reflection */}
          <EditorialQuote quote="Time moves fast, but the right moments stay anchored." />

          {/* 7. Interactive Birthday Cake & Candle Blow */}
          <BirthdayCake />

          {/* 8. Birthday Wishes: Six specific, tangible milestones */}
          <BirthdayWishes />

          {/* Editorial Pause: Witty transition into arcade */}
          <EditorialQuote quote="Growing older is inevitable. Being boring is completely optional." />

          {/* 9. Birthday Fun Zone: Playful arcade & humor */}
          <BirthdayFunZone />

          {/* 10. Grand Birthday Finale: Memorable closing celebration & fireworks */}
          <FinalSurprise />

          {/* 11. Friendly Footer */}
          <Footer />
        </main>
      )}
    </div>
  );
}
