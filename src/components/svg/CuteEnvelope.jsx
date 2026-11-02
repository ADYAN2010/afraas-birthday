import React from 'react';
import { motion } from 'framer-motion';

export default function CuteEnvelope({ isOpen, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: 'min(280px, 75vw)',
        height: 'min(200px, 55vw)',
        margin: '0 auto 28px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      title="Click to open your birthday surprise!"
      role="button"
      tabIndex={0}
      aria-label="Open birthday envelope"
    >
      <svg
        viewBox="0 0 280 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
          filter: 'drop-shadow(0 14px 28px rgba(73, 59, 59, 0.16))',
        }}
      >
        <defs>
          <linearGradient id="envelopeBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E9" />
            <stop offset="100%" stopColor="#F3DDE2" />
          </linearGradient>

          <linearGradient id="envelopeFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F3DDE2" />
            <stop offset="100%" stopColor="#DDA6B0" />
          </linearGradient>

          <linearGradient id="letterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFDF7" />
          </linearGradient>
        </defs>

        {/* 1. Envelope Back Interior Pocket */}
        <rect
          x="10"
          y="40"
          width="260"
          height="150"
          rx="12"
          fill="#E9E2F5"
          stroke="#493B3B"
          strokeWidth="1.8"
        />

        {/* 2. Birthday Letter Card (Slides Upwards when isOpen is true) */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: isOpen ? -65 : 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect
            x="24"
            y="48"
            width="232"
            height="136"
            rx="8"
            fill="url(#letterGrad)"
            stroke="#DDA6B0"
            strokeWidth="1.4"
          />
          {/* Decorative stamp on letter */}
          <rect x="195" y="58" width="45" height="36" rx="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="1" />
          <circle cx="217" cy="76" r="6" fill="#A94B59" />
          <circle cx="217" cy="76" r="3" fill="#FFF8E9" />

          {/* Letter Text */}
          <text
            x="40"
            y="78"
            fill="#A94B59"
            fontSize="15"
            fontFamily="'DM Serif Display', Georgia, serif"
            fontStyle="italic"
          >
            Happy Birthday,
          </text>
          <text
            x="40"
            y="108"
            fill="#493B3B"
            fontSize="26"
            fontFamily="'Caveat', cursive"
            fontWeight="700"
          >
            Afraa ✨
          </text>

          {/* Dotted lines simulating handwritten note */}
          <line x1="40" y1="126" x2="180" y2="126" stroke="#DDA6B0" strokeWidth="1.2" strokeDasharray="3 4" />
          <line x1="40" y1="142" x2="150" y2="142" stroke="#DDA6B0" strokeWidth="1.2" strokeDasharray="3 4" />
          <line x1="40" y1="158" x2="190" y2="158" stroke="#DDA6B0" strokeWidth="1.2" strokeDasharray="3 4" />
        </motion.g>

        {/* 3. Envelope Left & Right Fold Overlays */}
        <path
          d="M 10 40 L 140 135 L 10 190 Z"
          fill="#FFF9EE"
          stroke="#493B3B"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M 270 40 L 140 135 L 270 190 Z"
          fill="#FFF5E5"
          stroke="#493B3B"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 4. Envelope Bottom Triangle */}
        <path
          d="M 10 190 L 140 115 L 270 190 Z"
          fill="url(#envelopeBodyGrad)"
          stroke="#493B3B"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* 5. Animated Top Flap (Flips Up when Opened) */}
        <motion.path
          d="M 10 40 L 140 118 L 270 40 Z"
          fill="url(#envelopeFlapGrad)"
          stroke="#493B3B"
          strokeWidth="1.8"
          strokeLinejoin="round"
          style={{ transformOrigin: '140px 40px' }}
          animate={{
            scaleY: isOpen ? -1 : 1,
            fill: isOpen ? '#E9E2F5' : '#F3DDE2',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* 6. Cute Cherry Wax Seal / Heart Button (disappears smoothly when opened) */}
        <motion.g
          animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <circle cx="140" cy="116" r="17" fill="#A94B59" stroke="#493B3B" strokeWidth="1.4" />
          <circle cx="140" cy="116" r="14" fill="#A94B59" stroke="#DDA6B0" strokeWidth="1" strokeDasharray="2 3" />
          {/* Sweet mini heart in center of seal */}
          <path
            d="M 140 112 
               C 138 109, 133 109, 133 113 
               C 133 116, 137 119, 140 122 
               C 143 119, 147 116, 147 113 
               C 147 109, 142 109, 140 112 Z"
            fill="#FFF8E9"
          />
        </motion.g>
      </svg>
    </div>
  );
}
