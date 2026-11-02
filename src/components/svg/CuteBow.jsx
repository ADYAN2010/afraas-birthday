import React from 'react';

export default function CuteBow({ size = 38, color = '#A94B59', style = {} }) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: size,
        height: size * 0.75,
        userSelect: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDA6B0" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* Left Loop */}
        <path
          d="M 24 16 C 18 10, 6 8, 4 14 C 2 20, 14 22, 24 18 Z"
          fill="url(#bowGrad)"
          stroke="#493B3B"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Left Inner Fold */}
        <path
          d="M 19 16 C 14 13, 10 13, 8 16"
          stroke="#493B3B"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Right Loop */}
        <path
          d="M 24 16 C 30 10, 42 8, 44 14 C 46 20, 34 22, 24 18 Z"
          fill="url(#bowGrad)"
          stroke="#493B3B"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Right Inner Fold */}
        <path
          d="M 29 16 C 34 13, 38 13, 40 16"
          stroke="#493B3B"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Left Ribbon Tail */}
        <path
          d="M 22 19 C 18 24, 12 28, 8 32 L 14 31 L 18 34 C 20 28, 22 22, 22 19 Z"
          fill="url(#bowGrad)"
          stroke="#493B3B"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Right Ribbon Tail */}
        <path
          d="M 26 19 C 30 24, 36 28, 40 32 L 34 31 L 30 34 C 28 28, 26 22, 26 19 Z"
          fill="url(#bowGrad)"
          stroke="#493B3B"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Center Knot */}
        <ellipse
          cx="24"
          cy="17"
          rx="4"
          ry="3.5"
          fill="#DDA6B0"
          stroke="#493B3B"
          strokeWidth="1.2"
        />
        <circle cx="23" cy="16" r="1" fill="#FFFFFF" opacity="0.6" />
      </svg>
    </div>
  );
}
