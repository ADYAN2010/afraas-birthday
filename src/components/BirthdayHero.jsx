import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cake, Feather, PartyPopper, ChevronDown, Camera, Disc } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';
import CuteButterfly from './svg/CuteButterfly';
import CuteFlower from './svg/CuteFlower';
import CuteBow from './svg/CuteBow';

export default function BirthdayHero({ onWishClick, onNoteClick, onGalleryClick, onFunClick, onSoundtrackClick }) {
  const { hero } = birthdayData;

  const handleSoundtrack = () => {
    soundCtrl.playTap();
    if (onSoundtrackClick) {
      onSoundtrackClick();
    } else {
      const el = document.getElementById('soundtrack-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWish = (e) => {
    soundCtrl.playTap();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerSparkleBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    if (onWishClick) {
      onWishClick();
    } else {
      const el = document.getElementById('cake-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNote = () => {
    soundCtrl.playTap();
    if (onNoteClick) {
      onNoteClick();
    } else {
      const el = document.getElementById('note-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGallery = () => {
    soundCtrl.playTap();
    if (onGalleryClick) {
      onGalleryClick();
    } else {
      const el = document.getElementById('gallery-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFun = () => {
    soundCtrl.playTap();
    if (onFunClick) {
      onFunClick();
    } else {
      const el = document.getElementById('fun-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(70px, 11vh, 110px) clamp(16px, 4vw, 24px) clamp(40px, 7vh, 60px)',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: 2,
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      {/* Soft Ambient Radial Pastel Glows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <div className="ambient-glow-pink" style={{ top: '8%', left: '12%' }} />
        <div className="ambient-glow-lavender" style={{ top: '22%', right: '10%' }} />
        <div className="ambient-glow-peach" style={{ bottom: '12%', left: '35%' }} />
      </div>

      {/* Floating Cute Butterfly - Top Left */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: 'clamp(12px, 7vw, 100px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <CuteButterfly size={46} color="#E9E2F5" wingColor="#DDA6B0" />
      </div>

      {/* Floating Cute Flower - Top Right */}
      <div
        style={{
          position: 'absolute',
          top: '16%',
          right: 'clamp(14px, 7vw, 110px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <CuteFlower size={42} color="#F3DDE2" centerColor="#A94B59" />
      </div>

      {/* Hero Content Container */}
      <div style={{ maxWidth: '860px', width: '100%', position: 'relative', zIndex: 3 }}>
        {/* Cute Bow Icon on Top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}
        >
          <CuteBow size={56} color="#DDA6B0" />
        </motion.div>

        {/* Date Tagline Badge with Washi Tape Look */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: 'clamp(6px, 1.5vw, 8px) clamp(16px, 3vw, 24px)',
            borderRadius: '9999px',
            background: '#FDF2F4',
            border: '1.5px solid #F3DDE2',
            color: '#A94B59',
            fontSize: 'clamp(0.74rem, 1.8vw, 0.82rem)',
            fontWeight: 700,
            letterSpacing: 'clamp(0.12em, 2vw, 0.2em)',
            textTransform: 'uppercase',
            marginBottom: '20px',
            boxShadow: '0 4px 14px rgba(169, 75, 89, 0.08)',
          }}
        >
          <Sparkles size={13} color="#A94B59" />
          <span>{hero.badge}</span>
          <Sparkles size={13} color="#A94B59" />
        </motion.div>

        {/* Small "HAPPY BIRTHDAY" over-heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.92rem, 2.3vw, 1.35rem)',
            fontWeight: 700,
            letterSpacing: 'clamp(0.16em, 2.5vw, 0.32em)',
            color: '#A94B59',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          {hero.headingMain}
        </motion.h2>

        {/* Recipient Display Name: Strictly Afraa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 10vw, 5.8rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#493B3B',
              marginBottom: '14px',
            }}
          >
            {hero.name}
          </h1>

          {/* Cute Handwritten Caveat Annotation Beside Name */}
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -4, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-40px',
              fontFamily: 'var(--font-handwritten)',
              fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
              color: '#A94B59',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transform: 'rotate(-4deg)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span>it's your day! 🌸</span>
          </motion.div>
        </motion.div>

        {/* Subtitle in Handwritten Caveat Style */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45 }}
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.35rem, 3.8vw, 2.1rem)',
            color: '#A94B59',
            lineHeight: 1.35,
            marginBottom: '16px',
            fontWeight: 600,
          }}
        >
          “{hero.subtitle}”
        </motion.p>

        {/* Cheerful Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: '#6E5D5D',
            maxWidth: '620px',
            margin: '0 auto 34px',
            lineHeight: 1.7,
            fontWeight: 400,
            padding: '0 8px',
          }}
        >
          {hero.description}
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.75 }}
          className="hero-cta-container"
        >
          <button
            onClick={handleWish}
            className="hero-btn btn-cherry"
            style={{
              padding: 'clamp(12px, 2.5vw, 15px) clamp(20px, 3.5vw, 32px)',
              fontSize: 'clamp(0.92rem, 2vw, 1rem)',
            }}
          >
            <Cake size={18} />
            <span>{hero.ctaWish}</span>
          </button>

          <button
            onClick={handleNote}
            className="hero-btn btn-glass"
            style={{
              padding: 'clamp(12px, 2.5vw, 15px) clamp(18px, 3vw, 28px)',
              fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
            }}
          >
            <Feather size={17} color="#A94B59" />
            <span>{hero.ctaNote}</span>
          </button>

          <button
            onClick={handleGallery}
            className="hero-btn btn-glass"
            style={{
              padding: 'clamp(12px, 2.5vw, 15px) clamp(18px, 3vw, 28px)',
              fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
            }}
          >
            <Camera size={17} color="#A94B59" />
            <span>Photo Corner 📸</span>
          </button>

          <button
            onClick={handleSoundtrack}
            className="hero-btn btn-glass"
            style={{
              padding: 'clamp(12px, 2.5vw, 15px) clamp(18px, 3vw, 28px)',
              fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
            }}
          >
            <Disc size={17} color="#A94B59" />
            <span>Soundtrack 🎵</span>
          </button>

          <button
            onClick={handleFun}
            className="hero-btn btn-glass"
            style={{
              padding: 'clamp(12px, 2.5vw, 15px) clamp(18px, 3vw, 28px)',
              fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
            }}
          >
            <PartyPopper size={17} color="#A94B59" />
            <span>{hero.ctaExplore}</span>
          </button>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{
          marginTop: 'clamp(36px, 7vh, 56px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: '#857272',
          fontSize: '0.8rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          zIndex: 3,
        }}
        onClick={() => {
          const countEl = document.getElementById('countdown-section');
          if (countEl) countEl.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>{hero.scrollHint}</span>
        <ChevronDown size={18} color="#A94B59" />
      </motion.div>
    </section>
  );
}
