import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, ChevronDown } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { soundCtrl } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import WashiTape from './svg/WashiTape';
import CuteFlower from './svg/CuteFlower';

export default function HiddenNotes() {
  const { hiddenNotes } = birthdayData;
  const [openedNotes, setOpenedNotes] = useState({});

  const toggleNote = (id, e) => {
    const isNowOpen = !openedNotes[id];
    setOpenedNotes((prev) => ({ ...prev, [id]: isNowOpen }));

    if (isNowOpen) {
      soundCtrl.playPaperUnfold();
      const rect = e.currentTarget.getBoundingClientRect();
      triggerSparkleBurst(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
    } else {
      soundCtrl.playTap();
    }
  };

  return (
    <section
      id="hidden-notes-section"
      style={{
        position: 'relative',
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3.5vw, 24px)',
        maxWidth: '1180px',
        margin: '0 auto',
        zIndex: 2,
        width: '100%',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0.1, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '150px' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: '#FDF2F4',
            border: '1.5px solid #F3DDE2',
            color: '#A94B59',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <Mail size={13} color="#A94B59" />
          <span>{hiddenNotes.badge}</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            color: '#493B3B',
          }}
        >
          {hiddenNotes.heading}
        </h2>

        {/* Cute Stitched Scrapbook Divider */}
        <CuteScrapbookDivider maxWidth={260} />

        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.35rem, 3.2vw, 1.75rem)',
            color: '#A94B59',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          “{hiddenNotes.subtitle}”
        </p>
      </motion.div>

      {/* Grid of Folded Envelopes / Paper Notes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(18px, 3vw, 26px)',
          alignItems: 'start',
        }}
      >
        {hiddenNotes.items.map((item, idx) => {
          const isOpen = !!openedNotes[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '150px' }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              onClick={(e) => toggleNote(item.id, e)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleNote(item.id, e);
                }
              }}
              aria-expanded={isOpen}
              aria-label={`Folded note: ${item.label}`}
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  position: 'relative',
                  backgroundColor: isOpen ? '#FFFDF9' : item.paperColor,
                  border: isOpen ? `2px solid ${item.accentColor}` : '1.5px solid #F3DDE2',
                  borderRadius: '22px',
                  padding: 'clamp(28px, 4vw, 34px) clamp(18px, 3vw, 24px) clamp(16px, 3vw, 22px)',
                  boxShadow: isOpen
                    ? '0 16px 36px rgba(169, 75, 89, 0.14), 0 2px 8px rgba(73, 59, 59, 0.05)'
                    : '0 8px 24px rgba(73, 59, 59, 0.06)',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
                  overflow: 'visible',
                  minHeight: '190px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Washi Tape Strip at top */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '20px',
                    zIndex: 10,
                  }}
                >
                  <WashiTape
                    width={80}
                    height={22}
                    color={item.tapeColor}
                    pattern={idx % 2 === 0 ? 'dots' : 'stripes'}
                    rotate={item.rotation}
                  />
                </div>

                {/* Top Section: Label & Folded Seal */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                      marginTop: '4px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        color: item.accentColor,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Sparkles size={12} />
                      <span>{item.label}</span>
                    </span>

                    {/* Cute Mini Wax Seal / Flower */}
                    <div
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? '#FDF2F4' : '#F3DDE2',
                        border: '1px solid #DDA6B0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.accentColor,
                        transition: 'transform 0.4s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <Heart size={12} fill={isOpen ? item.accentColor : 'none'} />
                    </div>
                  </div>

                  {/* Folded Paper Graphic Indicator */}
                  {!isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        padding: '14px 10px',
                        borderRadius: '12px',
                        background: 'rgba(243, 221, 226, 0.25)',
                        border: '1px dashed #DDA6B0',
                        textAlign: 'center',
                        margin: '10px 0',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#A94B59',
                          fontSize: '0.86rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                        }}
                      >
                        <Mail size={14} />
                        <span>Tap to unfold note 💌</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Unfolded Message Reveal */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden', padding: '6px 0 10px' }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-handwritten)',
                          fontSize: 'clamp(1.4rem, 2.6vw, 1.65rem)',
                          color: '#493B3B',
                          lineHeight: 1.4,
                          fontWeight: 600,
                          margin: '8px 0',
                          padding: '0 4px',
                        }}
                      >
                        “{item.message}”
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginTop: '12px',
                        }}
                      >
                        <CuteFlower size={16} petalColor="#F3DDE2" centerColor="#A94B59" animate={false} />
                        <span
                          style={{
                            fontFamily: 'var(--font-handwritten)',
                            fontSize: '0.95rem',
                            color: '#A94B59',
                          }}
                        >
                          {item.tag || 'note ✨'}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Toggle Prompt */}
                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '8px',
                    borderTop: '1px dashed #F3DDE2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: '#857272',
                    fontWeight: 600,
                  }}
                >
                  <span>{isOpen ? 'Tap to fold back' : 'Hidden message'}</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: item.accentColor,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
