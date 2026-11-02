import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cake, Feather, PartyPopper, ChevronDown } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst } from '../utils/confetti';

export default function BirthdayHero({ onWishClick, onNoteClick, onFunClick }) {
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
        padding: '120px 24px 60px',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Soft Ambient Radial Glows */}
      <div className="ambient-glow-pink" style={{ top: '10%', left: '15%' }} />
      <div className="ambient-glow-lavender" style={{ top: '25%', right: '10%' }} />
      <div className="ambient-glow-gold" style={{ bottom: '10%', left: '40%' }} />

      {/* Floating Pastel Balloon (SVG) */}
      <motion.div
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

      {/* Floating Gold Balloon (SVG) */}
      <motion.div
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
      <div style={{ maxWidth: '880px', position: 'relative', zIndex: 3 }}>
        {/* Date Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 24px',
            borderRadius: '9999px',
            background: 'rgba(223, 182, 91, 0.08)',
            border: '1px solid rgba(223, 182, 91, 0.3)',
            color: '#dfb65b',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '26px',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
          }}
        >
          <Sparkles size={14} color="#ffd166" />
          <span>{hero.badge}</span>
          <Sparkles size={14} color="#ffd166" />
        </motion.div>

        {/* Small "HAPPY BIRTHDAY" over-heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            fontWeight: 600,
            letterSpacing: '0.35em',
            color: '#f4b4cb',
            textTransform: 'uppercase',
            marginBottom: '12px',
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
            fontSize: 'clamp(3rem, 8vw, 5.8rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '22px',
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
            fontSize: 'clamp(1.35rem, 3.2vw, 1.85rem)',
            color: '#ece6ff',
            lineHeight: 1.4,
            marginBottom: '18px',
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
            fontSize: 'clamp(0.98rem, 2vw, 1.12rem)',
            color: '#a69bb8',
            maxWidth: '620px',
            margin: '0 auto 40px',
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {hero.description}
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleWish}
            className="btn-gold"
            style={{
              padding: '15px 34px',
              fontSize: '1rem',
            }}
          >
            <Cake size={18} />
            <span>{hero.ctaWish}</span>
          </button>

          <button
            onClick={handleNote}
            className="btn-glass"
            style={{
              padding: '15px 30px',
              fontSize: '0.98rem',
            }}
          >
            <Feather size={17} color="#dfb65b" />
            <span>{hero.ctaNote}</span>
          </button>

          <button
            onClick={handleFun}
            className="btn-glass"
            style={{
              padding: '15px 30px',
              fontSize: '0.98rem',
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
          marginTop: '60px',
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
