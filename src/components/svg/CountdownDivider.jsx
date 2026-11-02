import React from 'react';
import { motion } from 'framer-motion';

export default function CountdownDivider({ width = '100%', maxWidth = 480, delay = 0.2 }) {
  return (
    <div
      style={{
        width,
        maxWidth: `min(100%, ${maxWidth}px)`,
        margin: '18px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 480 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <linearGradient id="dividerGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#faeed1" stopOpacity="0" />
            <stop offset="25%" stopColor="#dfb65b" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#ffd166" stopOpacity="1" />
            <stop offset="75%" stopColor="#dfb65b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#faeed1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left Curved Flourish */}
        <motion.path
          d="M 40 16 L 195 16 C 205 16, 212 11, 218 11 C 224 11, 228 16, 234 16"
          stroke="url(#dividerGold)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Right Curved Flourish */}
        <motion.path
          d="M 440 16 L 285 16 C 275 16, 268 11, 262 11 C 256 11, 252 16, 246 16"
          stroke="url(#dividerGold)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Central 8-Point Diamond Star */}
        <g className="animate-star-twinkle">
          <polygon
            points="240,7 243,14 250,16 243,18 240,25 237,18 230,16 237,14"
            fill="#ffd166"
          />
          <circle cx="240" cy="16" r="1.8" fill="#ffffff" />
        </g>

        {/* Subtle Satellite Diamond Accents */}
        <polygon points="175,16 177,14 179,16 177,18" fill="#dfb65b" opacity="0.75" />
        <polygon points="305,16 303,14 301,16 303,18" fill="#dfb65b" opacity="0.75" />
      </svg>
    </div>
  );
}
