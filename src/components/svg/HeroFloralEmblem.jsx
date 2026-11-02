import React from 'react';
import { motion } from 'framer-motion';

export default function HeroFloralEmblem() {
  const drawTransition = {
    duration: 2.2,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        width: 'clamp(220px, 28vw, 300px)',
        height: 'clamp(220px, 28vw, 300px)',
        margin: '0 auto',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faeed1" />
            <stop offset="50%" stopColor="#dfb65b" />
            <stop offset="100%" stopColor="#b8913b" />
          </linearGradient>

          <linearGradient id="blushPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f4b4cb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c4b1fc" stopOpacity="0.1" />
          </linearGradient>

          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd166" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#dfb65b" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Center Glow */}
        <circle cx="160" cy="160" r="110" fill="url(#centerGlow)" />

        {/* 1. Slowly Rotating Outer Celestial Orbital Ring */}
        <g className="animate-slow-spin">
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="url(#goldLineGrad)"
            strokeWidth="0.9"
            strokeDasharray="4 8"
            opacity="0.65"
          />
          {/* Small orbital dots */}
          <circle cx="160" cy="20" r="2.5" fill="#ffd166" />
          <circle cx="160" cy="300" r="2" fill="#faeed1" />
          <circle cx="20" cy="160" r="2" fill="#faeed1" />
          <circle cx="300" cy="160" r="2.5" fill="#ffd166" />
        </g>

        {/* 2. Counter-Rotating Inner Dotted Geometry Ring */}
        <g className="animate-reverse-spin">
          <circle
            cx="160"
            cy="160"
            r="115"
            stroke="#c4b1fc"
            strokeWidth="0.8"
            strokeDasharray="2 6"
            opacity="0.5"
          />
          {/* Diamond points on inner orbit */}
          <polygon points="160,45 163,48 160,51 157,48" fill="#ffd166" />
          <polygon points="160,275 163,272 160,269 157,272" fill="#ffd166" />
          <polygon points="45,160 48,163 51,160 48,157" fill="#ffd166" />
          <polygon points="275,160 272,163 269,160 272,157" fill="#ffd166" />
        </g>

        {/* 3. Progressive Path-Drawn Blooming Petals (Framer Motion) */}
        <g>
          {/* Top Petal */}
          <motion.path
            d="M 160 160 C 140 110, 140 70, 160 45 C 180 70, 180 110, 160 160 Z"
            fill="url(#blushPetalGrad)"
            stroke="url(#goldLineGrad)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ ...drawTransition, delay: 0.2 }}
          />

          {/* Bottom Petal */}
          <motion.path
            d="M 160 160 C 140 210, 140 250, 160 275 C 180 250, 180 210, 160 160 Z"
            fill="url(#blushPetalGrad)"
            stroke="url(#goldLineGrad)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ ...drawTransition, delay: 0.3 }}
          />

          {/* Left Petal */}
          <motion.path
            d="M 160 160 C 110 140, 70 140, 45 160 C 70 180, 110 180, 160 160 Z"
            fill="url(#blushPetalGrad)"
            stroke="url(#goldLineGrad)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ ...drawTransition, delay: 0.4 }}
          />

          {/* Right Petal */}
          <motion.path
            d="M 160 160 C 210 140, 250 140, 275 160 C 250 180, 210 180, 160 160 Z"
            fill="url(#blushPetalGrad)"
            stroke="url(#goldLineGrad)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ ...drawTransition, delay: 0.5 }}
          />

          {/* Diagonal Petals */}
          <motion.path
            d="M 160 160 C 130 120, 95 95, 78 78 C 95 95, 120 130, 160 160 Z"
            fill="rgba(244, 180, 203, 0.15)"
            stroke="url(#goldLineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ ...drawTransition, delay: 0.6 }}
          />

          <motion.path
            d="M 160 160 C 190 120, 225 95, 242 78 C 225 95, 190 130, 160 160 Z"
            fill="rgba(244, 180, 203, 0.15)"
            stroke="url(#goldLineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ ...drawTransition, delay: 0.7 }}
          />

          <motion.path
            d="M 160 160 C 130 200, 95 225, 78 242 C 95 225, 120 190, 160 160 Z"
            fill="rgba(244, 180, 203, 0.15)"
            stroke="url(#goldLineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ ...drawTransition, delay: 0.8 }}
          />

          <motion.path
            d="M 160 160 C 190 200, 225 225, 242 242 C 225 225, 190 190, 160 160 Z"
            fill="rgba(244, 180, 203, 0.15)"
            stroke="url(#goldLineGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ ...drawTransition, delay: 0.9 }}
          />
        </g>

        {/* 4. Fine Hand-Drawn Flourish Spirals */}
        <motion.path
          d="M 160 115 C 150 115, 142 122, 142 132 C 142 144, 160 150, 160 160"
          stroke="#dfb65b"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1 }}
        />
        <motion.path
          d="M 160 205 C 170 205, 178 198, 178 188 C 178 176, 160 170, 160 160"
          stroke="#dfb65b"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1.1 }}
        />

        {/* 5. Center Eight-Pointed Golden Star */}
        <g className="animate-star-twinkle">
          <polygon
            points="160,138 165,155 182,160 165,165 160,182 155,165 138,160 155,155"
            fill="url(#goldLineGrad)"
          />
          <circle cx="160" cy="160" r="3.5" fill="#ffffff" />
        </g>

        {/* 6. Delicate Corner Starlight Accents */}
        <g className="animate-star-twinkle" style={{ animationDelay: '1.2s' }}>
          <circle cx="60" cy="60" r="1.8" fill="#ffd166" />
          <line x1="60" y1="54" x2="60" y2="66" stroke="#ffd166" strokeWidth="0.8" opacity="0.6" />
          <line x1="54" y1="60" x2="66" y2="60" stroke="#ffd166" strokeWidth="0.8" opacity="0.6" />
        </g>
        <g className="animate-star-twinkle" style={{ animationDelay: '2s' }}>
          <circle cx="260" cy="60" r="1.8" fill="#ffd166" />
          <line x1="260" y1="54" x2="260" y2="66" stroke="#ffd166" strokeWidth="0.8" opacity="0.6" />
          <line x1="254" y1="60" x2="266" y2="60" stroke="#ffd166" strokeWidth="0.8" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
