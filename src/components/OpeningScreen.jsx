import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
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
            background: 'radial-gradient(ellipse at center, #1c0a32 0%, #0d0617 70%, #06020c 100%)',
            padding: '24px',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Radial Glows */}
          <div
            style={{
              position: 'absolute',
              width: '520px',
              height: '520px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(224, 104, 140, 0.22) 0%, transparent 70%)',
              filter: 'blur(75px)',
              pointerEvents: 'none',
              transform: 'translate(-25%, -30%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '460px',
              height: '460px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(223, 182, 91, 0.2) 0%, transparent 70%)',
              filter: 'blur(75px)',
              pointerEvents: 'none',
              transform: 'translate(30%, 30%)',
            }}
          />

          {/* Main Cinematic Card Container */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              position: 'relative',
              maxWidth: '560px',
              width: '100%',
              background: 'rgba(23, 11, 41, 0.65)',
              border: '1px solid rgba(223, 182, 91, 0.3)',
              borderRadius: '28px',
              padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 44px)',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(223, 182, 91, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Top Ornamental Star Accent */}
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(223, 182, 91, 0.12)',
                border: '1px solid rgba(223, 182, 91, 0.4)',
                marginBottom: '24px',
                boxShadow: '0 0 20px rgba(223, 182, 91, 0.25)',
              }}
            >
              <Sparkles size={24} color="#ffd166" />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#dfb65b',
                fontWeight: 600,
                marginBottom: '16px',
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
                fontSize: 'clamp(2.4rem, 6vw, 3.4rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                marginBottom: '18px',
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
                fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                color: '#d8c8ff',
                lineHeight: 1.5,
                marginBottom: '36px',
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
                marginBottom: '36px',
              }}
            >
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(223, 182, 91, 0.4))' }} />
              <Heart size={14} color="#f4b4cb" fill="#f4b4cb" style={{ opacity: 0.8 }} />
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(223, 182, 91, 0.4))' }} />
            </div>

            {/* Animated Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
              className="btn-gold"
              style={{
                fontSize: '1.05rem',
                padding: '16px 42px',
                cursor: 'pointer',
              }}
            >
              <span>{openingScreen.buttonText}</span>
            </motion.button>

            {/* Delicate Footer Note */}
            <p
              style={{
                marginTop: '28px',
                fontSize: '0.8rem',
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
