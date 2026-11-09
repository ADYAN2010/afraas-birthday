import React from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayContent';
import WashiTape from './svg/WashiTape';
import CuteFlower from './svg/CuteFlower';

export default function FinalLittleMessage() {
  const { finalMessage } = birthdayData;

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(40px, 7vw, 70px) clamp(16px, 4vw, 24px) clamp(10px, 2vw, 20px)',
        maxWidth: '720px',
        margin: '0 auto',
        zIndex: 2,
        width: '100%',
        textAlign: 'center',
      }}
      aria-label="One last thought"
    >
      <motion.div
        initial={{ opacity: 0.1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '120px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          backgroundColor: '#FFFDF8',
          border: '1.5px solid #F3DDE2',
          borderRadius: '24px',
          padding: 'clamp(38px, 6vw, 54px) clamp(20px, 5vw, 42px) clamp(28px, 5vw, 38px)',
          boxShadow: '0 16px 40px rgba(73, 59, 59, 0.08), 0 2px 10px rgba(169, 75, 89, 0.04)',
          margin: '0 auto',
          maxWidth: '640px',
          overflow: 'visible',
        }}
      >
        {/* Washi Tape across Top Center */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <WashiTape width={110} height={24} color="#F3DDE2" pattern="dots" rotate={-1.5} />
        </div>

        {/* Little Illustrated Flower */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', marginTop: '6px' }}>
          <CuteFlower size={26} petalColor="#FDF5F7" centerColor="#A94B59" animate={false} />
        </div>

        {/* Small Handwritten Intro Heading */}
        <h3
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.4rem, 3.2vw, 1.85rem)',
            color: '#A94B59',
            fontWeight: 700,
            letterSpacing: '0.01em',
            marginBottom: '14px',
          }}
        >
          {finalMessage.title}
        </h3>

        {/* Thoughtful Subtle Message */}
        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.05rem)',
            lineHeight: 1.45,
            color: '#493B3B',
            fontWeight: 600,
            maxWidth: '520px',
            margin: '0 auto 22px',
          }}
        >
          “{finalMessage.quote}”
        </p>

        {/* Small Discreet Signature */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '18px',
            paddingTop: '16px',
            borderTop: '1px dashed #F3DDE2',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-handwritten)',
              fontSize: 'clamp(1.5rem, 3vw, 1.85rem)',
              fontWeight: 700,
              color: '#A94B59',
              letterSpacing: '0.02em',
            }}
          >
            {finalMessage.signature}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
