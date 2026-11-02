import React from 'react';
import { motion } from 'framer-motion';

export default function BotanicalFlourish({ delay = 0.2, maxWidth = 260 }) {
  return (
    <div
      style={{
        maxWidth,
        margin: '0 auto 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 260 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="flourishGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#faeed1" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#dfb65b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#faeed1" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Central Stem & Curved Branches */}
        <motion.path
          d="M 20 14 C 60 14, 85 8, 115 14 C 122 15, 126 14, 130 14 C 134 14, 138 15, 145 14 C 175 8, 200 14, 240 14"
          stroke="url(#flourishGold)"
          strokeWidth="1.1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Left Leaves */}
        <motion.path
          d="M 75 12 C 78 7, 86 6, 88 11"
          stroke="#dfb65b"
          strokeWidth="1"
          strokeLinecap="round"
          fill="rgba(244, 180, 203, 0.2)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
        <motion.path
          d="M 98 15 C 101 20, 109 19, 110 14"
          stroke="#dfb65b"
          strokeWidth="1"
          strokeLinecap="round"
          fill="rgba(223, 182, 91, 0.2)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
        />

        {/* Right Leaves */}
        <motion.path
          d="M 185 12 C 182 7, 174 6, 172 11"
          stroke="#dfb65b"
          strokeWidth="1"
          strokeLinecap="round"
          fill="rgba(244, 180, 203, 0.2)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
        <motion.path
          d="M 162 15 C 159 20, 151 19, 150 14"
          stroke="#dfb65b"
          strokeWidth="1"
          strokeLinecap="round"
          fill="rgba(223, 182, 91, 0.2)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
        />

        {/* Center Mini Lotus Bud / Star */}
        <circle cx="130" cy="14" r="2.8" fill="#ffd166" />
        <circle cx="130" cy="14" r="5" stroke="#faeed1" strokeWidth="0.8" opacity="0.6" />
      </svg>
    </div>
  );
}
