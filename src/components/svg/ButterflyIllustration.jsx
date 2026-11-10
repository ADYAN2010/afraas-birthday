import React from 'react';

export default function ButterflyIllustration({
  size = 38,
  rotate = 12,
  tint = '#F3DDE2',
  accent = '#DDA6B0',
  driftDuration = 5.5,
  style = {},
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        animation: `svgButterflyDrift ${driftDuration}s ease-in-out infinite`,
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id={`bfGrad_${tint}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="60%" stopColor={tint} />
            <stop offset="100%" stopColor={accent} />
          </linearGradient>
        </defs>

        {/* Left Forewing & Hindwing */}
        <g
          id="left-wing"
          style={{
            transformOrigin: '25px 26px',
            animation: 'svgButterflyWingLeft 2s ease-in-out infinite',
          }}
        >
          {/* Upper forewing */}
          <path
            d="M 25 24 C 20 14, 8 10, 6 18 C 4 25, 15 28, 24 26 Z"
            fill={`url(#bfGrad_${tint})`}
            stroke="#493B3B"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Inner wing veins */}
          <path d="M 12 18 C 16 19, 20 22, 23 24" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />
          <circle cx="11" cy="17" r="1.5" fill="#FFFDF8" opacity="0.9" />

          {/* Lower hindwing */}
          <path
            d="M 25 27 C 18 28, 10 33, 12 39 C 14 43, 22 38, 25 32 Z"
            fill={`url(#bfGrad_${tint})`}
            stroke="#493B3B"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <path d="M 15 36 C 18 34, 22 33, 24 30" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />
        </g>

        {/* Right Forewing & Hindwing */}
        <g
          id="right-wing"
          style={{
            transformOrigin: '25px 26px',
            animation: 'svgButterflyWingRight 2s ease-in-out infinite',
          }}
        >
          {/* Upper forewing */}
          <path
            d="M 25 24 C 30 14, 42 10, 44 18 C 46 25, 35 28, 26 26 Z"
            fill={`url(#bfGrad_${tint})`}
            stroke="#493B3B"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Inner wing veins */}
          <path d="M 38 18 C 34 19, 30 22, 27 24" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />
          <circle cx="39" cy="17" r="1.5" fill="#FFFDF8" opacity="0.9" />

          {/* Lower hindwing */}
          <path
            d="M 25 27 C 32 28, 40 33, 38 39 C 36 43, 28 38, 25 32 Z"
            fill={`url(#bfGrad_${tint})`}
            stroke="#493B3B"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <path d="M 35 36 C 32 34, 28 33, 26 30" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />
        </g>

        {/* Slender Body & Antennae */}
        <g id="body">
          {/* Antennae */}
          <path d="M 24 22 C 22 17, 18 14, 16 15" stroke="#493B3B" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="16" cy="15" r="0.8" fill="#493B3B" />
          <path d="M 26 22 C 28 17, 32 14, 34 15" stroke="#493B3B" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="34" cy="15" r="0.8" fill="#493B3B" />

          {/* Torso & Abdomen */}
          <ellipse cx="25" cy="28" rx="1.6" ry="7" fill="#493B3B" />
          <circle cx="25" cy="22" r="1.8" fill="#493B3B" />
        </g>
      </svg>
    </div>
  );
}
