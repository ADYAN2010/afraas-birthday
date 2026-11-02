import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';

export default function OpeningScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const { openingScreen } = birthdayData;

  const handleOpen = () => {
    setIsOpening(true);
    soundCtrl.playMagicalSparkle();
    triggerSparkleBurst(0.5, 0.55);

    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(8px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #1d0935 0%, #0d0617 70%, #06020c 100%)',
            padding: 'clamp(14px, 4vw, 24px)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Glows */}
          <div
            style={{
              position: 'absolute',
              width: 'min(520px, 90vw)',
              height: 'min(520px, 90vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(196, 177, 252, 0.2) 0%, transparent 70%)',
              filter: 'blur(75px)',
              pointerEvents: 'none',
              transform: 'translate(-25%, -30%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 'min(460px, 85vw)',
              height: 'min(460px, 85vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(223, 182, 91, 0.2) 0%, transparent 70%)',
              filter: 'blur(75px)',
              pointerEvents: 'none',
              transform: 'translate(30%, 30%)',
            }}
          />

          {/* Main Card Container */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              position: 'relative',
              maxWidth: '560px',
              width: '100%',
              background: 'rgba(23, 11, 41, 0.72)',
              border: '1px solid rgba(223, 182, 91, 0.32)',
              borderRadius: 'clamp(20px, 5vw, 28px)',
              padding: 'clamp(28px, 6vw, 56px) clamp(16px, 5vw, 44px)',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(223, 182, 91, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Top Ornamental Party Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(223, 182, 91, 0.12)',
                border: '1px solid rgba(223, 182, 91, 0.4)',
                marginBottom: '20px',
                boxShadow: '0 0 20px rgba(223, 182, 91, 0.25)',
                color: '#ffd166',
              }}
            >
              <PartyPopper size={24} />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              style={{
                fontSize: 'clamp(0.72rem, 2vw, 0.8rem)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: 'clamp(0.12em, 2vw, 0.22em)',
                textTransform: 'uppercase',
                color: '#dfb65b',
                fontWeight: 600,
                marginBottom: '14px',
              }}
            >
              {openingScreen.badge}
            </motion.div>

            {/* Recipient Name in Luxury Editorial Serif */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 7vw, 3.4rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
              className="text-gold-gradient"
            >
              {openingScreen.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 3vw, 1.4rem)',
                color: '#d8c8ff',
                lineHeight: 1.5,
                marginBottom: '28px',
              }}
            >
              “{openingScreen.subtitle}”
            </motion.p>

            {/* Divider Flourish */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '28px',
              }}
            >
              <div style={{ height: '1px', width: 'clamp(40px, 12vw, 60px)', background: 'linear-gradient(to right, transparent, rgba(223, 182, 91, 0.4))' }} />
              <Star size={14} color="#ffd166" fill="#ffd166" style={{ opacity: 0.85 }} />
              <div style={{ height: '1px', width: 'clamp(40px, 12vw, 60px)', background: 'linear-gradient(to left, transparent, rgba(223, 182, 91, 0.4))' }} />
            </div>

            {/* Animated Celebration Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
              className="btn-gold"
              style={{
                fontSize: 'clamp(0.96rem, 2.5vw, 1.05rem)',
                padding: '14px 32px',
                width: '100%',
                maxWidth: '280px',
                minHeight: '48px',
                cursor: 'pointer',
              }}
            >
              <span>{openingScreen.buttonText}</span>
            </motion.button>

            {/* Audio Hint */}
            <p
              style={{
                marginTop: '22px',
                fontSize: 'clamp(0.74rem, 2vw, 0.8rem)',
                color: '#9e8fb8',
                letterSpacing: '0.04em',
              }}
            >
              {openingScreen.audioHint}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
