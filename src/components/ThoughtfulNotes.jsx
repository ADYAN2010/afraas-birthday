import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import WashiTape from './svg/WashiTape';
import CuteFlower from './svg/CuteFlower';

export default function ThoughtfulNotes() {
  const thoughts = birthdayData.thoughtfulNotes || birthdayData.randomThoughts;

  return (
    <section
      id="thoughts-section"
      style={{
        position: 'relative',
        padding: 'clamp(55px, 9vw, 95px) clamp(14px, 3.5vw, 24px)',
        maxWidth: '1200px',
        margin: '0 auto',
        zIndex: 2,
        width: '100%',
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0.1, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '150px' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '44px' }}
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
          <Feather size={13} color="#A94B59" />
          <span>{thoughts.badge}</span>
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
          {thoughts.heading}
        </h2>

        {/* Cute Stitched Scrapbook Divider */}
        <CuteScrapbookDivider maxWidth={260} />

        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.35rem, 3.2vw, 1.75rem)',
            color: '#A94B59',
            maxWidth: '580px',
            margin: '0 auto',
          }}
        >
          “{thoughts.subtitle}”
        </p>
      </motion.div>

      {/* Grid of Handwritten Journal Notes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(24px, 4vw, 36px)',
          alignItems: 'stretch',
        }}
      >
        {thoughts.notes.map((note, idx) => {
          const isLast = idx === thoughts.notes.length - 1;

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20, rotate: note.rotation }}
              whileInView={{ opacity: 1, y: 0, rotate: note.rotation }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.75,
                delay: (idx % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                rotate: 0,
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              style={{
                position: 'relative',
                backgroundColor: note.paperColor,
                border: `1.5px solid ${note.borderColor}`,
                borderRadius: '20px',
                padding: 'clamp(32px, 5vw, 40px) clamp(20px, 4vw, 28px) clamp(22px, 4vw, 28px)',
                boxShadow: '0 12px 30px rgba(73, 59, 59, 0.07), 0 2px 8px rgba(169, 75, 89, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '210px',
                cursor: 'default',
                userSelect: 'none',
                transformOrigin: 'center center',
                gridColumn: isLast ? '1 / -1' : 'auto',
                maxWidth: isLast ? '520px' : 'none',
                margin: isLast ? '0 auto' : '0',
                width: isLast ? '100%' : 'auto',
                overflow: 'visible',
              }}
            >
              {/* Washi Tape Strip at Top Center */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                }}
              >
                <WashiTape
                  width={95}
                  height={24}
                  color={note.tapeColor}
                  pattern={idx % 2 === 0 ? 'dots' : 'stripes'}
                  rotate={note.tapeAngle}
                />
              </div>

              {/* Note Tag / Index Badge */}
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
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    color: '#A94B59',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Sparkles size={11} />
                  <span>Note #{note.id}</span>
                </span>

                {/* Little illustrated flower doodle */}
                <CuteFlower size={20} petalColor={note.tapeColor} centerColor="#FFF8E9" animate={false} />
              </div>

              {/* Handwritten Note Body */}
              <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: 'clamp(1.4rem, 2.7vw, 1.7rem)',
                    lineHeight: 1.4,
                    color: '#493B3B',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    margin: 0,
                  }}
                >
                  “{note.quote}”
                </p>
              </div>

              {/* Faint Journal Ruled Line Accent at Bottom */}
              <div
                style={{
                  marginTop: '18px',
                  paddingTop: '10px',
                  borderTop: '1px dashed #E8D5D8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: '0.95rem',
                    color: '#B59F9F',
                  }}
                >
                  with care 🌸
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
