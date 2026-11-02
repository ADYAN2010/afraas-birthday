import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Star, X, RotateCcw } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerFinaleConfetti } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';

export default function FinalSurprise() {
  const [isOpen, setIsOpen] = useState(false);
  const { finalSurprise, recipient } = birthdayData;

  const handleOpenSurprise = () => {
    setIsOpen(true);
    soundCtrl.playMagicalSparkle();
    triggerFinaleConfetti();
  };

  const handleReplayConfetti = () => {
    soundCtrl.playMagicalSparkle();
    triggerFinaleConfetti();
  };

  return (
    <section
      id="final-surprise-section"
      style={{
        position: 'relative',
        padding: '110px 24px 130px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 2,
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(224, 104, 140, 0.18) 0%, rgba(223, 182, 91, 0.12) 50%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Intro Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 20px',
            borderRadius: '9999px',
            background: 'rgba(223, 182, 91, 0.1)',
            border: '1px solid rgba(223, 182, 91, 0.3)',
            color: '#dfb65b',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} />
          <span>A CLOSING BLESSING</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
          className="text-gold-gradient"
        >
          {finalSurprise.heading}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: '#d8c8ff',
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Before you conclude your visit, there is one last heartfelt sentiment crafted especially for you.
        </p>

        {/* Surprise Box Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpenSurprise}
          className="btn-gold"
          style={{
            padding: '18px 46px',
            fontSize: '1.1rem',
            boxShadow: '0 12px 35px rgba(223, 182, 91, 0.4), 0 0 30px rgba(224, 104, 140, 0.3)',
          }}
        >
          <Gift size={22} />
          <span>{finalSurprise.buttonText}</span>
        </motion.button>
      </motion.div>

      {/* Full-Screen Celebratory Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 110,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(7, 3, 13, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '24px',
            }}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                maxWidth: '680px',
                width: '100%',
                background: 'linear-gradient(145deg, #1f0c38 0%, #120622 60%, #0d0417 100%)',
                border: '1px solid rgba(223, 182, 91, 0.45)',
                borderRadius: '30px',
                padding: 'clamp(36px, 6vw, 60px) clamp(24px, 5vw, 48px)',
                textAlign: 'center',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(223, 182, 91, 0.25)',
                overflow: 'hidden',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close surprise"
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#faeed1',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <X size={18} />
              </button>

              {/* Glowing Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 18px',
                  borderRadius: '9999px',
                  background: 'rgba(224, 104, 140, 0.15)',
                  border: '1px solid rgba(224, 104, 140, 0.4)',
                  color: '#f4b4cb',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  marginBottom: '22px',
                }}
              >
                <Heart size={14} fill="#f4b4cb" />
                <span>{finalSurprise.modalBadge}</span>
                <Heart size={14} fill="#f4b4cb" />
              </div>

              {/* Main Heading */}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.1rem, 5.5vw, 3.2rem)',
                  lineHeight: 1.15,
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                }}
                className="text-gold-gradient"
              >
                {finalSurprise.modalHeading}
              </h2>

              {/* Special Celebratory Quote */}
              <p
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
                  color: '#faeed1',
                  marginBottom: '24px',
                  lineHeight: 1.45,
                }}
              >
                {finalSurprise.quote}
              </p>

              {/* Warm Message */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.96rem, 2vw, 1.08rem)',
                  color: '#c4b1fc',
                  lineHeight: 1.75,
                  marginBottom: '36px',
                  maxWidth: '540px',
                  margin: '0 auto 36px',
                }}
              >
                {finalSurprise.message}
              </p>

              {/* Actions: Replay Confetti & Close */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={handleReplayConfetti}
                  className="btn-gold"
                  style={{ padding: '14px 30px' }}
                >
                  <Sparkles size={18} />
                  <span>More Confetti! 🎉</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-glass"
                  style={{ padding: '14px 28px' }}
                >
                  <span>{finalSurprise.closeText}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
