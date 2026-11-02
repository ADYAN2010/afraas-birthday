import React from 'react';
import { motion } from 'framer-motion';

export default function CuteButterfly({ size = 34, color = '#E9E2F5', accent = '#DDA6B0', style = {} }) {
  return (
    <motion.div
      animate={{ y: [-3, 3, -3], rotate: [-4, 4, -4] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      style={{
        display: 'inline-block',
        width: size,
        height: size * 0.85,
        userSelect: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 42 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Antennae */}
        <path d="M 21 12 Q 17 6 13 8" stroke="#493B3B" strokeWidth="1" strokeLinecap="round" fill="none" />
        <circle cx="13" cy="8" r="1.2" fill="#493B3B" />
        <path d="M 21 12 Q 25 6 29 8" stroke="#493B3B" strokeWidth="1" strokeLinecap="round" fill="none" />
        <circle cx="29" cy="8" r="1.2" fill="#493B3B" />

        {/* Top-Left Wing */}
        <path
          d="M 20 16 C 14 6, 2 8, 3 17 C 4 23, 14 23, 20 19 Z"
          fill={color}
          stroke="#493B3B"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="15" r="2.5" fill={accent} opacity="0.75" />

        {/* Top-Right Wing */}
        <path
          d="M 22 16 C 28 6, 40 8, 39 17 C 38 23, 28 23, 22 19 Z"
          fill={color}
          stroke="#493B3B"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <circle cx="31" cy="15" r="2.5" fill={accent} opacity="0.75" />

        {/* Bottom-Left Wing */}
        <path
          d="M 20 19 C 14 21, 8 26, 11 31 C 14 34, 19 28, 20 22 Z"
          fill={accent}
          stroke="#493B3B"
          strokeWidth="1"
        />

        {/* Bottom-Right Wing */}
        <path
          d="M 22 19 C 28 21, 34 26, 31 31 C 28 34, 23 28, 22 22 Z"
          fill={accent}
          stroke="#493B3B"
          strokeWidth="1"
        />

        {/* Slender Body */}
        <ellipse cx="21" cy="19" rx="1.8" ry="6.5" fill="#493B3B" />
      </svg>
    </motion.div>
  );
}
