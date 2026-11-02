import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Sparkles } from 'lucide-react';
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
          overflow: 'hidden',
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
            fontSize: 'clamp(2rem, 4vw, 2.6rem)',
            color: '#A94B59',
            marginBottom: '26px',
            fontWeight: 700,
            letterSpacing: '0.01em',
            paddingTop: '6px',
          }}
        >
          {personalNote.salutation}
        </h3>

        {/* Note Messages */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '620px',
          }}
        >
          {personalNote.messages.map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '14px',
                background: '#FFFDF9',
                border: '1px solid #F5EAEB',
                boxShadow: '0 2px 8px rgba(73, 59, 59, 0.02)',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                backgroundColor: '#FDF7F8',
                borderColor: '#DDA6B0',
                x: 4,
              }}
            >
              <div
                style={{
                  color: '#A94B59',
                  marginTop: '3px',
                  flexShrink: 0,
                }}
              >
                <Sparkles size={16} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1rem, 2.2vw, 1.12rem)',
                  color: '#493B3B',
                  lineHeight: 1.65,
                  fontWeight: 450,
                }}
              >
                {message}
              </p>
            </motion.div>
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
