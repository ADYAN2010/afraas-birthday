import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';
import CuteEnvelope from './svg/CuteEnvelope';
import WashiTape from './svg/WashiTape';
import CuteFlower from './svg/CuteFlower';

export default function OpeningScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const { openingScreen } = birthdayData;

  const handleTriggerOpen = () => {
    if (isOpening) return;
    setEnvelopeOpen(true);
    soundCtrl.playEnvelopeOpen();
    triggerSparkleBurst(0.5, 0.52);

    // Give time for envelope animation before transitioning
    setTimeout(() => {
      setIsOpening(true);
      setTimeout(() => {
        onOpen();
      }, 750);
    }, 650);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #FFFDF8 0%, #FFF8E9 65%, #F5ECDD 100%)',
            padding: 'clamp(14px, 4vw, 24px)',
            overflow: 'hidden',
          }}
          className="journal-grid-pattern"
        >
          {/* Soft Pastel Ambient Glows */}
          <div
            style={{
              position: 'absolute',
              width: 'min(480px, 85vw)',
              height: 'min(480px, 85vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(243, 221, 226, 0.6) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              transform: 'translate(-30%, -25%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: 'min(420px, 80vw)',
              height: 'min(420px, 80vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(233, 226, 245, 0.6) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              transform: 'translate(30%, 30%)',
            }}
          />

          {/* Floating Hand-Drawn Floral Accents */}
          <div style={{ position: 'absolute', top: '12%', left: '8%', pointerEvents: 'none', opacity: 0.85 }}>
            <CuteFlower size={36} color="#DDA6B0" />
          </div>
          <div style={{ position: 'absolute', bottom: '14%', right: '10%', pointerEvents: 'none', opacity: 0.85 }}>
            <CuteFlower size={42} color="#F7D6BD" centerColor="#A94B59" />
          </div>

          {/* Main Scrapbook Stationery Card Container */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              position: 'relative',
              maxWidth: '520px',
              width: '100%',
              background: 'rgba(255, 253, 248, 0.92)',
              border: '2px solid #F3DDE2',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              padding: 'clamp(32px, 6vw, 52px) clamp(18px, 5vw, 42px)',
              textAlign: 'center',
              boxShadow: '0 20px 48px rgba(73, 59, 59, 0.08), 0 4px 16px rgba(169, 75, 89, 0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Washi Tape across Top Center */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              <WashiTape width={120} height={26} color="#F3DDE2" pattern="dots" rotate={-2} />
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: 'clamp(0.72rem, 1.8vw, 0.78rem)',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#A94B59',
                background: '#FDF2F4',
                padding: '4px 14px',
                borderRadius: '9999px',
                border: '1px solid #F3DDE2',
                fontWeight: 700,
                marginBottom: '16px',
              }}
            >
              <Sparkles size={12} color="#A94B59" />
              <span>{openingScreen.badge}</span>
              <Sparkles size={12} color="#A94B59" />
            </motion.div>

            {/* Recipient Name in Graceful DM Serif Display */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 7vw, 3.6rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                color: '#493B3B',
                marginBottom: '8px',
                letterSpacing: '-0.02em',
              }}
            >
              {openingScreen.title}
            </motion.h1>

            {/* Handwritten Caveat Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-handwritten)',
                fontSize: 'clamp(1.25rem, 3.2vw, 1.65rem)',
                color: '#A94B59',
                lineHeight: 1.4,
                marginBottom: '20px',
              }}
            >
              “{openingScreen.subtitle}”
            </motion.p>

            {/* Interactive Cute Envelope Illustration */}
            <CuteEnvelope isOpen={envelopeOpen} onClick={handleTriggerOpen} />

            {/* Call-to-Action Pill Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleTriggerOpen}
              className="btn-cherry"
              style={{
                fontSize: 'clamp(0.96rem, 2.2vw, 1.05rem)',
                padding: '13px 34px',
                width: '100%',
                maxWidth: '280px',
                minHeight: '48px',
                cursor: 'pointer',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>{openingScreen.buttonText}</span>
            </motion.button>

            {/* Audio Hint */}
            <p
              style={{
                marginTop: '18px',
                fontSize: 'clamp(0.72rem, 1.8vw, 0.78rem)',
                color: '#857272',
                letterSpacing: '0.03em',
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
