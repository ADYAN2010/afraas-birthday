import React from 'react';

export default function WashiTape({
  color = '#F3DDE2', // Powder pink default
  pattern = 'dots',
  width = 110,
  height = 28,
  rotate = -3,
  style = {},
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 2px 4px rgba(73, 59, 59, 0.12))',
        }}
      >
        <defs>
          <linearGradient id="tapeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.82" />
            <stop offset="50%" stopColor={color} stopOpacity="0.92" />
            <stop offset="100%" stopColor={color} stopOpacity="0.85" />
          </linearGradient>
          <pattern id="washiDots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1" fill="#FFFFFF" opacity="0.65" />
          </pattern>
        </defs>

        {/* Torn jagged edges on left and right */}
        <path
          d="M 4 2 
             L 116 2 
             L 118 7 L 115 12 L 118 17 L 115 22 L 118 28
             L 4 28
             L 2 23 L 5 18 L 2 13 L 5 8 Z"
          fill="url(#tapeGrad)"
        />

        {/* Semi-transparent pattern overlay */}
        <path
          d="M 4 2 
             L 116 2 
             L 118 7 L 115 12 L 118 17 L 115 22 L 118 28
             L 4 28
             L 2 23 L 5 18 L 2 13 L 5 8 Z"
          fill="url(#washiDots)"
        />

        {/* Soft highlight line */}
        <line x1="5" y1="4" x2="115" y2="4" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
      </svg>
    </div>
  );
}
