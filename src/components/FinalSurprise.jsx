import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, X } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerFinaleConfetti } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import CuteBow from './svg/CuteBow';
import WashiTape from './svg/WashiTape';

export default function FinalSurprise() {
  const [isOpen, setIsOpen] = useState(false);
  const { finalCelebration } = birthdayData;

  const handleOpenSurprise = () => {
    setIsOpen(true);
    soundCtrl.playCelebrationFinale();
    triggerFinaleConfetti();
  };

  const handleReplayConfetti = () => {
    soundCtrl.playCelebrationFinale();
    triggerFinaleConfetti();
  };

  return (
    <section
      id="final-celebration-section"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 10vw, 100px) clamp(14px, 3.5vw, 24px) clamp(60px, 10vw, 110px)',
        maxWidth: '880px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 2,
        width: '100%',
      }}
    >
      {/* Intro Teaser */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 18px',
            borderRadius: '9999px',
            background: '#FDF2F4',
            border: '1.5px solid #F3DDE2',
            color: '#A94B59',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          <Sparkles size={13} color="#A94B59" />
          <span>{finalCelebration.intro}</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: '#493B3B',
          }}
        >
          {finalCelebration.heading}
        </h2>

        {/* Cute Stitched Scrapbook Divider */}
        <CuteScrapbookDivider maxWidth={320} />

        {/* Narrative Message */}
        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.4rem, 3.2vw, 1.85rem)',
            color: '#A94B59',
            maxWidth: '680px',
            margin: '0 auto 34px',
            lineHeight: 1.5,
          }}
        >
          “{finalCelebration.closingMessage}”
        </p>

        {/* Surprise Celebration Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpenSurprise}
          className="btn-cherry"
          style={{
            padding: '16px clamp(28px, 5vw, 48px)',
            fontSize: 'clamp(1rem, 2.2vw, 1.12rem)',
            minHeight: '52px',
            boxShadow: '0 12px 30px rgba(169, 75, 89, 0.25)',
          }}
        >
          <PartyPopper size={20} />
          <span>{finalCelebration.buttonText}</span>
        </motion.button>
      </div>

      {/* Full-Screen Celebratory Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 110,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(73, 59, 59, 0.65)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: 'clamp(14px, 3vw, 24px)',
            }}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.88, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                maxWidth: '640px',
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                background: '#FFFDF9',
                border: '2px solid #F3DDE2',
                borderRadius: 'clamp(20px, 4vw, 28px)',
                padding: 'clamp(28px, 6vw, 54px) clamp(18px, 4vw, 44px)',
                textAlign: 'center',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Washi Tape Strip at top */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 5,
                }}
              >
                <WashiTape width={120} height={24} color="#F3DDE2" pattern="dots" rotate={-1} />
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundCtrl.playTap();
                  setIsOpen(false);
                }}
                aria-label="Close celebration"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#FDF2F4',
                  border: '1.5px solid #F3DDE2',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A94B59',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>

              {/* Cute Bow on Top */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px', marginTop: '6px' }}>
                <CuteBow size={64} color="#DDA6B0" />
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.18em',
                  color: '#A94B59',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                {finalCelebration.intro}
              </div>

              {/* Main Celebratory Reveal Heading */}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.1rem, 5.5vw, 3.2rem)',
                  lineHeight: 1.15,
                  marginBottom: '14px',
                  color: '#493B3B',
                  letterSpacing: '-0.02em',
                }}
              >
                {finalCelebration.heading}
              </h2>

              {/* Closing Message in Caveat */}
              <p
                style={{
                  fontFamily: 'var(--font-handwritten)',
                  fontSize: 'clamp(1.35rem, 3vw, 1.7rem)',
                  color: '#A94B59',
                  marginBottom: '20px',
                  lineHeight: 1.4,
                }}
              >
                “{finalCelebration.closingMessage}”
              </p>

              {/* Memorable Sign-Off Note */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.96rem, 2vw, 1.05rem)',
                  color: '#6E5D5D',
                  lineHeight: 1.7,
                  marginBottom: '10px',
                  maxWidth: '520px',
                  margin: '0 auto 10px',
                }}
              >
                {finalCelebration.modalNote}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-handwritten)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: '#A94B59',
                  marginBottom: '26px',
                }}
              >
                Adyan
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
                  className="btn-cherry"
                  style={{ padding: '13px 28px' }}
                >
                  <Sparkles size={16} />
                  <span>{finalCelebration.replayText}</span>
                </button>

                <button
                  onClick={() => {
                    soundCtrl.playTap();
                    setIsOpen(false);
                  }}
                  className="btn-glass"
                  style={{ padding: '13px 26px', color: '#493B3B', borderColor: '#F3DDE2' }}
                >
                  <span>{finalCelebration.closeText}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
