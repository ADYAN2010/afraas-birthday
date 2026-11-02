import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cake, Feather, PartyPopper, ChevronDown, Camera } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst } from '../utils/confetti';
import HeroFloralEmblem from './svg/HeroFloralEmblem';

export default function BirthdayHero({ onWishClick, onNoteClick, onGalleryClick, onFunClick }) {
  const { hero } = birthdayData;

  const handleWish = (e) => {
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
    if (onNoteClick) {
      onNoteClick();
    } else {
      const el = document.getElementById('note-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGallery = () => {
    if (onGalleryClick) {
      onGalleryClick();
    } else {
      const el = document.getElementById('gallery-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFun = () => {
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
        padding: 'clamp(80px, 12vh, 120px) clamp(16px, 4vw, 24px) clamp(40px, 8vh, 60px)',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: 2,
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      {/* Soft Ambient Radial Glows - Safely Clipped */}
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
        <div className="ambient-glow-pink" style={{ top: '10%', left: '15%' }} />
        <div className="ambient-glow-lavender" style={{ top: '25%', right: '10%' }} />
        <div className="ambient-glow-gold" style={{ bottom: '10%', left: '40%' }} />
      </div>

      {/* Floating Pastel Balloon (SVG) - Hidden on phones <= 480px */}
      <motion.div
        className="hero-floating-balloon"
        animate={{ y: [-15, 15, -15], rotate: [-2, 3, -2] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: 'clamp(10px, 6vw, 100px)',
          pointerEvents: 'none',
          opacity: 0.8,
          zIndex: 1,
        }}
      >
        <svg width="60" height="90" viewBox="0 0 60 90" fill="none">
          <ellipse cx="30" cy="35" rx="26" ry="32" fill="url(#heroBalloonPink)" />
          <path d="M28 67 L32 67 L30 71 Z" fill="#e0688c" />
          <path d="M30 71 Q35 78 28 85 T32 90" stroke="#f4b4cb" strokeWidth="1" fill="none" opacity="0.6" />
          <ellipse cx="22" cy="22" rx="6" ry="10" fill="white" opacity="0.35" transform="rotate(-20 22 22)" />
          <defs>
            <linearGradient id="heroBalloonPink" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbe6ee" />
              <stop offset="60%" stopColor="#f4b4cb" />
              <stop offset="100%" stopColor="#e0688c" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating Gold Balloon (SVG) - Hidden on phones <= 480px */}
      <motion.div
        className="hero-floating-balloon"
        animate={{ y: [12, -18, 12], rotate: [2, -3, 2] }}
        transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          top: '20%',
          right: 'clamp(10px, 6vw, 110px)',
          pointerEvents: 'none',
          opacity: 0.75,
          zIndex: 1,
        }}
      >
        <svg width="64" height="95" viewBox="0 0 64 95" fill="none">
          <ellipse cx="32" cy="38" rx="28" ry="34" fill="url(#heroBalloonGold)" />
          <path d="M30 72 L34 72 L32 76 Z" fill="#dfb65b" />
          <path d="M32 76 Q27 82 34 89 T30 95" stroke="#faeed1" strokeWidth="1" fill="none" opacity="0.6" />
          <ellipse cx="24" cy="24" rx="7" ry="11" fill="white" opacity="0.4" transform="rotate(-20 24 24)" />
          <defs>
            <linearGradient id="heroBalloonGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#faeed1" />
              <stop offset="60%" stopColor="#dfb65b" />
              <stop offset="100%" stopColor="#b8913b" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Hero Content Container */}
      <div style={{ maxWidth: '880px', width: '100%', position: 'relative', zIndex: 3 }}>
        {/* Custom SVG Line-Art Floral & Celestial Drawing Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '12px' }}
        >
          <HeroFloralEmblem />
        </motion.div>

        {/* Date Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: 'clamp(6px, 1.5vw, 8px) clamp(14px, 3vw, 24px)',
            borderRadius: '9999px',
            background: 'rgba(223, 182, 91, 0.08)',
            border: '1px solid rgba(223, 182, 91, 0.3)',
            color: '#dfb65b',
            fontSize: 'clamp(0.72rem, 1.8vw, 0.8rem)',
            fontWeight: 600,
            letterSpacing: 'clamp(0.12em, 2vw, 0.22em)',
            textTransform: 'uppercase',
            marginBottom: '22px',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Sparkles size={13} color="#ffd166" />
          <span>{hero.badge}</span>
          <Sparkles size={13} color="#ffd166" />
        </motion.div>

        {/* Small "HAPPY BIRTHDAY" over-heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.45rem)',
            fontWeight: 600,
            letterSpacing: 'clamp(0.18em, 2.5vw, 0.35em)',
            color: '#f4b4cb',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}
        >
          {hero.headingMain}
        </motion.h2>

        {/* Recipient Full Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.6rem, 9vw, 5.8rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '18px',
          }}
          className="text-gold-gradient"
        >
          {hero.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 3.2vw, 1.85rem)',
            color: '#ece6ff',
            lineHeight: 1.4,
            marginBottom: '16px',
          }}
        >
          “{hero.subtitle}”
        </motion.p>

        {/* Cheerful Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.92rem, 2vw, 1.12rem)',
            color: '#a69bb8',
            maxWidth: '620px',
            margin: '0 auto 36px',
            lineHeight: 1.7,
            fontWeight: 400,
            padding: '0 8px',
          }}
        >
          {hero.description}
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="hero-cta-container"
        >
          <button
            onClick={handleWish}
            className="hero-btn btn-gold"
            style={{
              padding: 'clamp(12px, 2.5vw, 15px) clamp(20px, 3.5vw, 34px)',
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
              padding: 'clamp(12px, 2.5vw, 15px) clamp(18px, 3vw, 30px)',
              fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
            }}
          >
            <Feather size={17} color="#dfb65b" />
            <span>{hero.ctaNote}</span>
          </button>

          <button
            onClick={handleGallery}
            className="hero-btn btn-glass"
            style={{
              padding: 'clamp(12px, 2.5vw, 15px) clamp(18px, 3vw, 30px)',
              fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
            }}
          >
            <Camera size={17} color="#dfb65b" />
            <span>Photo Corner 📸</span>
          </button>

          <button
            onClick={handleFun}
            className="hero-btn btn-glass"
            style={{
              padding: 'clamp(12px, 2.5vw, 15px) clamp(18px, 3vw, 30px)',
              fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
            }}
          >
            <PartyPopper size={17} />
            <span>{hero.ctaExplore}</span>
          </button>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{
          marginTop: 'clamp(36px, 8vh, 60px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: '#8d7a9f',
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
        <ChevronDown size={18} color="#dfb65b" />
      </motion.div>
    </section>
  );
}
