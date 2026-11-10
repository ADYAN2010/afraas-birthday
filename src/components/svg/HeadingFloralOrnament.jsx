import React from 'react';

export default function HeadingFloralOrnament({ maxWidth = 180, isFinalHour = false }) {
  return (
    <div
      style={{
        maxWidth,
        margin: '2px auto 6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        opacity: isFinalHour ? 0.95 : 0.85,
        animation: 'svgGentleSway 6s ease-in-out infinite',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <linearGradient id="headingFlourishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DDA6B0" stopOpacity="0.2" />
            <stop offset="50%" stopColor={isFinalHour ? '#FFB347' : '#A94B59'} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DDA6B0" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Stem Curving Outwards */}
        <path
          d="M 15 10 Q 50 4 75 10 T 145 10"
          stroke="url(#headingFlourishGrad)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Left Leaflets */}
        <path d="M 45 8 C 42 4, 36 5, 38 9" stroke="#9FB89A" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 60 11 C 62 15, 68 14, 66 10" stroke="#9FB89A" strokeWidth="0.9" strokeLinecap="round" />

        {/* Right Leaflets */}
        <path d="M 115 8 C 118 4, 124 5, 122 9" stroke="#9FB89A" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 100 11 C 98 15, 92 14, 94 10" stroke="#9FB89A" strokeWidth="0.9" strokeLinecap="round" />

        {/* Center Floral Rosette */}
        <circle cx="80" cy="10" r="3.2" fill={isFinalHour ? '#FFB347' : '#F3DDE2'} stroke="#493B3B" strokeWidth="0.8" />
        <circle cx="80" cy="10" r="1.5" fill="#F7D6BD" />

        {/* Flanking Blossom Dots */}
        <circle cx="72" cy="10" r="1.4" fill="#DDA6B0" />
        <circle cx="88" cy="10" r="1.4" fill="#DDA6B0" />
      </svg>
    </div>
  );
}
