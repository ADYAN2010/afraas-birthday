import React from 'react';
import { motion } from 'framer-motion';

export default function CelebrationEmblem() {
  const drawTransition = {
    duration: 1.8,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        width: 'clamp(180px, 24vw, 220px)',
        height: 'clamp(180px, 24vw, 220px)',
        margin: '0 auto 20px',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="emblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faeed1" />
            <stop offset="50%" stopColor="#dfb65b" />
            <stop offset="100%" stopColor="#b8913b" />
          </linearGradient>

          <linearGradient id="emblemBlush" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f4b4cb" stopOpacity="0.1" />
          </linearGradient>

          <radialGradient id="emblemRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd166" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#dfb65b" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Center Glow */}
        <circle cx="120" cy="120" r="95" fill="url(#emblemRadial)" />

        {/* 1. Rotating Outer Starburst Orbital Rays */}
        <g className="animate-slow-spin">
          <circle
            cx="120"
            cy="120"
            r="105"
            stroke="url(#emblemGold)"
            strokeWidth="0.8"
            strokeDasharray="3 6"
            opacity="0.6"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 120 + Math.cos(rad) * 98;
            const y1 = 120 + Math.sin(rad) * 98;
            const x2 = 120 + Math.cos(rad) * 110;
            const y2 = 120 + Math.sin(rad) * 110;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ffd166"
                strokeWidth="1"
                opacity="0.7"
              />
            );
          })}
        </g>

        {/* 2. Hand-Drawn Progressive Paths for the Birthday Gift / Ribbon */}
        {/* Gift Box Base */}
        <motion.rect
          x="75"
          y="110"
          width="90"
          height="80"
          rx="10"
          fill="url(#emblemBlush)"
          stroke="url(#emblemGold)"
          strokeWidth="1.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 0.1 }}
        />

        {/* Gift Box Lid */}
        <motion.rect
          x="68"
          y="96"
          width="104"
          height="18"
          rx="5"
          fill="rgba(38, 18, 64, 0.9)"
          stroke="url(#emblemGold)"
          strokeWidth="1.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 0.25 }}
        />

        {/* Vertical Ribbon */}
        <motion.line
          x1="120"
          y1="96"
          x2="120"
          y2="190"
          stroke="#ffd166"
          strokeWidth="2.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.4 }}
        />

        {/* Horizontal Ribbon */}
        <motion.line
          x1="75"
          y1="145"
          x2="165"
          y2="145"
          stroke="#ffd166"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.45 }}
        />

        {/* Left Ribbon Bow Loop */}
        <motion.path
          d="M 120 96 C 100 80, 80 75, 82 88 C 84 98, 108 96, 120 96 Z"
          fill="rgba(244, 180, 203, 0.25)"
          stroke="#dfb65b"
          strokeWidth="1.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 0.55 }}
        />

        {/* Right Ribbon Bow Loop */}
        <motion.path
          d="M 120 96 C 140 80, 160 75, 158 88 C 156 98, 132 96, 120 96 Z"
          fill="rgba(244, 180, 203, 0.25)"
          stroke="#dfb65b"
          strokeWidth="1.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ ...drawTransition, delay: 0.65 }}
        />

        {/* Center Ribbon Knot */}
        <circle cx="120" cy="96" r="4.5" fill="#ffd166" />

        {/* 3. Floating Celebration SVG Confetti & Stars */}
        <g className="animate-star-twinkle">
          {/* Top Diamond Star */}
          <polygon
            points="120,40 123,50 133,53 123,56 120,66 117,56 107,53 117,50"
            fill="#ffd166"
          />
        </g>

        <g className="animate-star-twinkle" style={{ animationDelay: '1s' }}>
          <polygon
            points="48,85 50,91 56,93 50,95 48,101 46,95 40,93 46,91"
            fill="#c4b1fc"
          />
        </g>

        <g className="animate-star-twinkle" style={{ animationDelay: '1.8s' }}>
          <polygon
            points="192,85 194,91 200,93 194,95 192,101 190,95 184,93 190,91"
            fill="#f4b4cb"
          />
        </g>

        {/* Floating Confetti Shapes */}
        <rect
          x="55"
          y="150"
          width="6"
          height="10"
          rx="2"
          fill="#ffd166"
          opacity="0.85"
          transform="rotate(25 55 150)"
        />
        <circle cx="185" cy="160" r="3.5" fill="#f4b4cb" opacity="0.8" />
        <rect
          x="175"
          y="120"
          width="5"
          height="8"
          rx="1.5"
          fill="#c4b1fc"
          opacity="0.8"
          transform="rotate(-30 175 120)"
        />
      </svg>
    </div>
  );
}
