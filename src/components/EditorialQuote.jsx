import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialQuote({
  quote,
  author = null,
  maxWidth = '880px',
}) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(50px, 9vw, 95px) clamp(16px, 4vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 2,
        overflow: 'hidden',
      }}
      aria-label="Editorial Quote"
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 90vw)',
          height: '240px',
          background: 'radial-gradient(ellipse at center, rgba(243, 221, 226, 0.45) 0%, rgba(255, 248, 233, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div
        style={{
          position: 'relative',
          maxWidth,
          width: '100%',
          margin: '0 auto',
          zIndex: 1,
        }}
      >
        {/* Minimal SVG Top Floral Sprig */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '100px' }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '20px',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          {/* Left Decorative Line */}
          <div
            style={{
              width: 'clamp(40px, 8vw, 80px)',
              height: '1px',
              background: 'linear-gradient(to left, #DDA6B0, transparent)',
            }}
          />

          {/* Minimal Hand-Drawn Floral Blossom SVG */}
          <svg
            width="36"
            height="24"
            viewBox="0 0 36 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.85 }}
          >
            {/* Left Leaflet */}
            <path
              d="M 12 12 C 7 10, 5 6, 8 3 C 11 5, 12 8, 12 12 Z"
              fill="#F3DDE2"
              stroke="#A94B59"
              strokeWidth="0.8"
            />
            {/* Right Leaflet */}
            <path
              d="M 24 12 C 29 10, 31 6, 28 3 C 25 5, 24 8, 24 12 Z"
              fill="#F3DDE2"
              stroke="#A94B59"
              strokeWidth="0.8"
            />
            {/* Center Bud */}
            <circle cx="18" cy="12" r="5" fill="#FFFDF8" stroke="#A94B59" strokeWidth="1" />
            <circle cx="18" cy="12" r="2.5" fill="#DDA6B0" />
            {/* Center pistil dot */}
            <circle cx="18" cy="12" r="1" fill="#493B3B" />
          </svg>

          {/* Right Decorative Line */}
          <div
            style={{
              width: 'clamp(40px, 8vw, 80px)',
              height: '1px',
              background: 'linear-gradient(to right, #DDA6B0, transparent)',
            }}
          />
        </motion.div>

        {/* Editorial Quote Text */}
        <motion.blockquote
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            margin: 0,
            padding: '0 clamp(8px, 3vw, 24px)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.5rem, 3.8vw, 2.35rem)',
              lineHeight: 1.45,
              color: '#493B3B',
              letterSpacing: '-0.01em',
              fontWeight: 400,
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.25em',
                color: '#DDA6B0',
                marginRight: '4px',
                lineHeight: 0,
                verticalAlign: '-0.1em',
              }}
            >
              “
            </span>
            {quote}
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.25em',
                color: '#DDA6B0',
                marginLeft: '4px',
                lineHeight: 0,
                verticalAlign: '-0.1em',
              }}
            >
              ”
            </span>
          </p>

          {author && (
            <p
              style={{
                marginTop: '16px',
                fontFamily: 'var(--font-handwritten)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.45rem)',
                color: '#A94B59',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              {author}
            </p>
          )}
        </motion.blockquote>

        {/* Subtle Bottom Dot Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '22px',
          }}
          aria-hidden="true"
        >
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#DDA6B0' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A94B59' }} />
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#DDA6B0' }} />
        </motion.div>
      </div>
    </section>
  );
}
