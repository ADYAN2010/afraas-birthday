import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { soundCtrl } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

export default function PersonalLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const { personalLetter, recipient } = birthdayData;

  const handleToggleLetter = () => {
    if (!isOpen) {
      soundCtrl.playEnvelopeOpen();
      triggerSparkleBurst(0.5, 0.4);
    }
    setIsOpen(!isOpen);
  };

  return (
    <section
      id="letter-section"
      style={{
        position: 'relative',
        padding: '90px 24px',
        maxWidth: '880px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(223, 182, 91, 0.1)',
            border: '1px solid rgba(223, 182, 91, 0.3)',
            color: '#dfb65b',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Feather size={14} />
          <span>A LITTLE SOMETHING FROM ME</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}
          className="text-gold-gradient"
        >
          {personalLetter.heading}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
            color: '#d8c8ff',
          }}
        >
          {personalLetter.subheading}
        </p>
      </motion.div>

      {/* Envelope & Letter Container */}
      <div style={{ position: 'relative', minHeight: '380px' }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Wax-Stamp Envelope */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6 }}
              onClick={handleToggleLetter}
              className="glass-panel"
              style={{
                cursor: 'pointer',
                padding: 'clamp(40px, 6vw, 64px) 24px',
                textAlign: 'center',
                maxWidth: '620px',
                margin: '0 auto',
                background: 'linear-gradient(135deg, rgba(28, 14, 48, 0.8) 0%, rgba(18, 8, 32, 0.95) 100%)',
                border: '1px solid rgba(223, 182, 91, 0.35)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Envelope Flap Accent Lines */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '80px',
                  background: 'linear-gradient(180deg, rgba(223, 182, 91, 0.08) 0%, transparent 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Monogram Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  margin: '0 auto 24px',
                  background: 'radial-gradient(circle at 35% 35%, #e0688c 0%, #b3395b 60%, #751833 100%)',
                  border: '2px solid rgba(250, 238, 209, 0.6)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(224, 104, 140, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#faeed1',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  userSelect: 'none',
                }}
              >
                Z
              </motion.div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                  marginBottom: '8px',
                }}
              >
                For {recipient.fullName}
              </h3>

              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#dfb65b',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={16} />
                <span>{personalLetter.envelopePrompt}</span>
                <Sparkles size={16} />
              </p>
            </motion.div>
          ) : (
            /* Unfolded Vintage Editorial Letter Paper */
            <motion.div
              key="letter-content"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="letter-paper"
              style={{
                padding: 'clamp(36px, 6vw, 64px) clamp(28px, 6vw, 56px)',
                maxWidth: '720px',
                margin: '0 auto',
                position: 'relative',
              }}
            >
              {/* Fold Button */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <button
                  onClick={handleToggleLetter}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(184, 145, 59, 0.35)',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    color: '#7a5a23',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  title="Fold letter back into envelope"
                >
                  {personalLetter.envelopeReturn}
                </button>
              </div>

              {/* Salutation */}
              <h3
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(1.7rem, 4vw, 2.3rem)',
                  color: '#2b1a38',
                  marginBottom: '26px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                {personalLetter.salutation}
              </h3>

              {/* Genuine, Conversational Paragraphs */}
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1rem, 2vw, 1.12rem)',
                  lineHeight: 1.85,
                  color: '#382b42',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {personalLetter.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Playful & Warm Closing */}
              <div
                style={{
                  marginTop: '36px',
                  paddingTop: '24px',
                  borderTop: '1px dashed rgba(184, 145, 59, 0.35)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.18rem',
                    color: '#493557',
                    marginBottom: '12px',
                    fontWeight: 500,
                  }}
                >
                  {personalLetter.closing}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)',
                    color: '#9e2d53',
                    lineHeight: 1.2,
                  }}
                >
                  {personalLetter.signature}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
