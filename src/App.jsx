import React, { useState, useEffect, useCallback } from 'react';
import LockScreen from './components/LockScreen';
import PrivacyBreachScreen from './components/PrivacyBreachScreen';
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
import AfraasSoundtrack from './music/components/AfraasSoundtrack';

export default function App() {
  const [isLockedDown, setIsLockedDown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [startMusic, setStartMusic] = useState(false);

  // Check device registration and server-side session cookie on initial load
  const checkAccessAndSession = useCallback(async () => {
    setIsCheckingAuth(true);
    try {
      // 1. Check device registration and global lockdown status
      const deviceRes = await fetch('/api/device/check', {
        method: 'POST',
        credentials: 'include',
      });

      if (deviceRes.ok) {
        const deviceData = await deviceRes.json();
        if (deviceData.lockdown) {
          setIsLockedDown(true);
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
          return;
        }
      }

      // 2. Check session authentication
      const sessionRes = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      });

      if (sessionRes.ok) {
        const sessionData = await sessionRes.json();
        if (sessionData.lockdown) {
          setIsLockedDown(true);
          setIsAuthenticated(false);
        } else if (sessionData.authenticated) {
          setIsAuthenticated(true);
        }
      }
    } catch (err) {
      // Fallback to lock screen if API unreachable or unauthenticated
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkAccessAndSession();
  }, [checkAccessAndSession]);

  const handleUnlock = () => {
    setIsAuthenticated(true);
    setStartMusic(true);
  };

  const handleLockdownTriggered = () => {
    setIsLockedDown(true);
    setIsAuthenticated(false);
  };

  const handleRecovered = () => {
    setIsLockedDown(false);
    checkAccessAndSession();
  };

  const scrollToSoundtrack = () => {
    const el = document.getElementById('soundtrack-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

  // Smooth loading state while verifying secure session cookie
  if (isCheckingAuth) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#FFF8E9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          fontFamily: 'var(--font-serif)',
          color: '#A94B59',
          fontSize: '1.2rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              border: '3px solid #F3DDE2',
              borderTopColor: '#A94B59',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 14px',
            }}
          />
          <span style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.4rem' }}>
            Preparing something special...
          </span>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Dedicated Privacy Breach Screen: Activated upon third unique device access
  if (isLockedDown) {
    return <PrivacyBreachScreen onRecovered={handleRecovered} />;
  }

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

      {/* 1. Website Lock Screen: Default Landing Page with Asia/Dhaka Countdown */}
      {!isAuthenticated && (
        <LockScreen onUnlock={handleUnlock} onLockdown={handleLockdownTriggered} />
      )}

      {/* 2. Main Birthday Experience: Protected until Server Authentication */}
      {isAuthenticated && (
        <main
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',
          }}
        >
          {/* Floating Birthday Soundtrack Widget (Liborio Conti Official Instrumental) */}
          <MusicPlayer autoStarted={startMusic} />

          {/* 1. Main Birthday Hero */}
          <BirthdayHero
            onWishClick={scrollToCake}
            onNoteClick={scrollToNote}
            onGalleryClick={scrollToGallery}
            onFunClick={scrollToFun}
            onSoundtrackClick={scrollToSoundtrack}
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
          <EditorialQuote quote="Some memories and moments stay with you forever." />

          {/* 7. AFRAA'S SOUNDTRACK: Dedicated Spotify-Inspired Music Space */}
          <AfraasSoundtrack />

          {/* 8. Interactive Birthday Cake & Candle Blow */}
          <BirthdayCake />

          {/* 9. Birthday Wishes: Six specific, tangible milestones */}
          <BirthdayWishes />

          {/* Editorial Pause: Witty transition into arcade */}
          <EditorialQuote quote="Here is to another year of happiness, laughter, and great memories." />

          {/* 10. Birthday Fun Zone: Playful arcade & humor */}
          <BirthdayFunZone />

          {/* 11. Grand Birthday Finale: Memorable closing celebration & fireworks */}
          <FinalSurprise />

          {/* 12. Friendly Footer */}
          <Footer />
        </main>
      )}
    </div>
  );
}
