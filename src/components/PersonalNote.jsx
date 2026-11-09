import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import CutePostageStamp from './svg/CutePostageStamp';
import WashiTape from './svg/WashiTape';

export default function PersonalNote() {
  const { personalNote } = birthdayData;

  return (
    <section
      id="note-section"
      style={{
        position: 'relative',
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3.5vw, 24px)',
        maxWidth: '860px',
        margin: '0 auto',
        zIndex: 2,
        width: '100%',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0.1, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "150px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '36px' }}
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
          <span>FROM ADYAN</span>
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
          {personalNote.heading}
        </h2>

        {/* Cute Stitched Scrapbook Divider */}
        <CuteScrapbookDivider maxWidth={240} />

        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.3rem, 3vw, 1.65rem)',
            color: '#A94B59',
          }}
        >
          “{personalNote.subtitle}”
        </p>
      </motion.div>

      {/* Elegant Letter / Note Card Styled Like Korean Stationery */}
      <motion.div
        initial={{ opacity: 0.2, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "150px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel"
        style={{
          padding: 'clamp(28px, 6vw, 56px) clamp(18px, 5vw, 48px)',
          background: 'rgba(255, 253, 248, 0.96)',
          border: '2px solid #F3DDE2',
          borderRadius: '24px',
          boxShadow: '0 18px 45px rgba(73, 59, 59, 0.08), 0 2px 10px rgba(169, 75, 89, 0.05)',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Washi Tape across Top Left */}
        <div style={{ position: 'absolute', top: '-10px', left: '24px', zIndex: 10 }}>
          <WashiTape width={110} height={24} color="#F3DDE2" pattern="dots" rotate={-3} />
        </div>

        {/* Cute Postage Stamp in Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            zIndex: 10,
            transform: 'rotate(4deg)',
          }}
        >
          <CutePostageStamp dateText="15 NOV" nameText="AFRAA" />
        </div>

        {/* Salutation */}
        <h3
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(2.1rem, 4.5vw, 2.8rem)',
            color: '#A94B59',
            marginBottom: '20px',
            fontWeight: 700,
            letterSpacing: '0.01em',
            paddingTop: '6px',
          }}
        >
          {personalNote.salutation}
        </h3>

        {/* Cohesive Letter Body */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: '680px',
          }}
        >
          {personalNote.letterParagraphs?.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              style={{
                fontFamily: idx === 1 ? 'var(--font-handwritten)' : 'var(--font-sans)',
                fontSize: idx === 1 ? 'clamp(1.4rem, 2.8vw, 1.75rem)' : 'clamp(1.02rem, 2.2vw, 1.15rem)',
                color: idx === 1 ? '#A94B59' : '#493B3B',
                lineHeight: idx === 1 ? 1.5 : 1.75,
                fontWeight: idx === 1 ? 600 : 450,
                margin: 0,
                padding: idx === 1 ? '10px 16px' : '0',
                background: idx === 1 ? 'rgba(243, 221, 226, 0.28)' : 'transparent',
                borderRadius: idx === 1 ? '14px' : '0',
                borderLeft: idx === 1 ? '3px solid #DDA6B0' : 'none',
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Understated, Warm Signature */}
        <div
          style={{
            marginTop: '34px',
            paddingTop: '22px',
            borderTop: '1.5px dashed #F3DDE2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-handwritten)',
              fontSize: '1.35rem',
              color: '#857272',
              marginBottom: '2px',
            }}
          >
            {personalNote.closing}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-handwritten)',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#A94B59',
              letterSpacing: '0.02em',
              transform: 'rotate(-2deg)',
            }}
          >
            {personalNote.signature}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
