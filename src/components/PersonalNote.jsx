import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Sparkles, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';

export default function PersonalNote() {
  const { personalNote } = birthdayData;

  return (
    <section
      id="note-section"
      style={{
        position: 'relative',
        padding: '90px 24px',
        maxWidth: '860px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* Header */}
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
          <span>FROM ADYAN</span>
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
          {personalNote.heading}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
            color: '#d8c8ff',
          }}
        >
          “{personalNote.subtitle}”
        </p>
      </motion.div>

      {/* Elegant Letter / Note Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel"
        style={{
          padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 48px)',
          background: 'linear-gradient(145deg, rgba(32, 15, 54, 0.75) 0%, rgba(18, 8, 32, 0.9) 100%)',
          border: '1px solid rgba(223, 182, 91, 0.35)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(223, 182, 91, 0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(223, 182, 91, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Salutation */}
        <h3
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.1rem)',
            color: '#faeed1',
            marginBottom: '28px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {personalNote.salutation}
        </h3>

        {/* Note Messages */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
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
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}
              whileHover={{
                backgroundColor: 'rgba(223, 182, 91, 0.06)',
                borderColor: 'rgba(223, 182, 91, 0.25)',
              }}
            >
              <div
                style={{
                  color: '#dfb65b',
                  marginTop: '4px',
                  flexShrink: 0,
                }}
              >
                <Sparkles size={16} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                  color: '#faf8f5',
                  lineHeight: 1.65,
                  fontWeight: 400,
                }}
              >
                {message}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Elegant, Understated Signature */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(223, 182, 91, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontStyle: 'italic',
              fontSize: '1.18rem',
              color: '#d8c8ff',
              marginBottom: '6px',
            }}
          >
            {personalNote.closing}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 1.85rem)',
              fontWeight: 600,
              color: '#faeed1',
              letterSpacing: '0.04em',
            }}
            className="text-gold-gradient"
          >
            {personalNote.signature}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
