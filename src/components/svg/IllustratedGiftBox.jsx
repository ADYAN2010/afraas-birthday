import React from 'react';
import { motion } from 'framer-motion';

export default function IllustratedGiftBox({
  size = 46,
  isOpen = false,
  isFinalHour = false,
  style = {},
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="giftBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="100%" stopColor="#FDF2F4" />
          </linearGradient>
          <linearGradient id="giftRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDA6B0" />
            <stop offset="100%" stopColor="#A94B59" />
          </linearGradient>
          <filter id="softGiftShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#493B3B" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Confetti & Sparkles bursting out when open */}
        {isOpen && (
          <g>
            <motion.circle
              cx="22"
              cy="16"
              r="2.5"
              fill="#FFB347"
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8], y: -12, x: -8 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.circle
              cx="42"
              cy="14"
              r="2"
              fill="#DDA6B0"
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8], y: -14, x: 8 }}
              transition={{ duration: 0.9, delay: 0.1, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.path
              d="M 32 8 L 33.5 12 L 37.5 12 L 34.5 14.5 L 35.5 18.5 L 32 16 L 28.5 18.5 L 29.5 14.5 L 26.5 12 L 30.5 12 Z"
              fill="#F7D6BD"
              stroke="#A94B59"
              strokeWidth="0.5"
              initial={{ scale: 0, y: 5 }}
              animate={{ scale: [0.8, 1.1, 0.9], y: [-4, -8, -4], rotate: [0, 15, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 18 10 C 18 8, 15 6, 13 8 C 11 10, 14 13, 18 15 C 22 13, 25 10, 23 8 C 21 6, 18 8, 18 10 Z"
              fill="#E9E2F5"
              stroke="#A94B59"
              strokeWidth="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: [0.7, 1, 0.8], y: [-2, -6, -2] }}
              transition={{ duration: 2.2, delay: 0.2, repeat: Infinity }}
            />
          </g>
        )}

        {/* Box Base */}
        <g id="box-base" filter="url(#softGiftShadow)">
          {/* Main Box Body */}
          <rect
            x="14"
            y="28"
            width="36"
            height="26"
            rx="4"
            fill="url(#giftBodyGrad)"
            stroke="#493B3B"
            strokeWidth="1.2"
          />

          {/* Dotted pattern on wrapping */}
          <circle cx="20" cy="35" r="0.8" fill="#DDA6B0" opacity="0.6" />
          <circle cx="28" cy="35" r="0.8" fill="#DDA6B0" opacity="0.6" />
          <circle cx="24" cy="42" r="0.8" fill="#DDA6B0" opacity="0.6" />
          <circle cx="20" cy="48" r="0.8" fill="#DDA6B0" opacity="0.6" />
          <circle cx="44" cy="35" r="0.8" fill="#DDA6B0" opacity="0.6" />
          <circle cx="36" cy="35" r="0.8" fill="#DDA6B0" opacity="0.6" />
          <circle cx="40" cy="42" r="0.8" fill="#DDA6B0" opacity="0.6" />
          <circle cx="44" cy="48" r="0.8" fill="#DDA6B0" opacity="0.6" />

          {/* Vertical Center Ribbon */}
          <rect
            x="29"
            y="28"
            width="6"
            height="26"
            fill="url(#giftRibbonGrad)"
            stroke="#493B3B"
            strokeWidth="0.8"
          />

          {/* Horizontal Center Ribbon */}
          <rect
            x="14"
            y="39"
            width="36"
            height="5"
            fill="url(#giftRibbonGrad)"
            stroke="#493B3B"
            strokeWidth="0.8"
          />
        </g>

        {/* Box Lid & Bow (Animated when open or fluttering) */}
        <motion.g
          id="box-lid-and-bow"
          animate={
            isOpen
              ? { y: -16, x: -3, rotate: -14 }
              : isFinalHour
              ? { y: [0, -2, 0] }
              : { y: 0 }
          }
          transition={{
            duration: isOpen ? 0.7 : 3,
            repeat: isOpen ? 0 : Infinity,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: '20px 24px' }}
        >
          {/* Lid Rectangle */}
          <rect
            x="11"
            y="22"
            width="42"
            height="7"
            rx="2.5"
            fill="url(#giftBodyGrad)"
            stroke="#493B3B"
            strokeWidth="1.2"
          />
          {/* Lid Ribbon Band */}
          <rect
            x="29"
            y="22"
            width="6"
            height="7"
            fill="url(#giftRibbonGrad)"
            stroke="#493B3B"
            strokeWidth="0.8"
          />

          {/* Left Ribbon Loop */}
          <path
            d="M 32 21 C 26 14, 15 13, 14 18 C 13 22, 23 23, 31 22 Z"
            fill="url(#giftRibbonGrad)"
            stroke="#493B3B"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* Left Loop Crease */}
          <path d="M 27 20 C 22 17, 18 18, 17 20" stroke="#FFFDF8" strokeWidth="0.6" strokeLinecap="round" />

          {/* Right Ribbon Loop */}
          <path
            d="M 32 21 C 38 14, 49 13, 50 18 C 51 22, 41 23, 33 22 Z"
            fill="url(#giftRibbonGrad)"
            stroke="#493B3B"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* Right Loop Crease */}
          <path d="M 37 20 C 42 17, 46 18, 47 20" stroke="#FFFDF8" strokeWidth="0.6" strokeLinecap="round" />

          {/* Left Ribbon Tail (Waving) */}
          <path
            d="M 30 23 C 26 27, 21 31, 17 34 L 21 32 L 23 35 C 26 31, 29 26, 30 23 Z"
            fill="url(#giftRibbonGrad)"
            stroke="#493B3B"
            strokeWidth="0.9"
            style={{
              transformOrigin: '30px 23px',
              animation: 'svgRibbonWave 3.5s ease-in-out infinite',
            }}
          />

          {/* Right Ribbon Tail (Waving) */}
          <path
            d="M 34 23 C 38 27, 43 31, 47 34 L 43 32 L 41 35 C 38 31, 35 26, 34 23 Z"
            fill="url(#giftRibbonGrad)"
            stroke="#493B3B"
            strokeWidth="0.9"
            style={{
              transformOrigin: '34px 23px',
              animation: 'svgRibbonWave 3.5s ease-in-out infinite 0.4s',
            }}
          />

          {/* Center Bow Knot */}
          <ellipse
            cx="32"
            cy="21.5"
            rx="3.5"
            ry="3"
            fill="#DDA6B0"
            stroke="#493B3B"
            strokeWidth="1"
          />
          <circle cx="31" cy="20.5" r="0.8" fill="#FFFFFF" opacity="0.8" />
        </motion.g>
      </svg>
    </div>
  );
}
