import React from 'react';

export default function FloralArrangement({
  width = 135,
  height = 135,
  rotate = 0,
  flip = false,
  swayDuration = 6.5,
  style = {},
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        width,
        height,
        transform: `rotate(${rotate}deg) ${flip ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'bottom right',
        animation: `svgGentleSway ${swayDuration}s ease-in-out infinite`,
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="rosePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2F5" />
            <stop offset="60%" stopColor="#F3DDE2" />
            <stop offset="100%" stopColor="#DDA6B0" />
          </linearGradient>
          <linearGradient id="roseAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3DDE2" />
            <stop offset="100%" stopColor="#C47B89" />
          </linearGradient>
          <linearGradient id="sageLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CDE0CA" />
            <stop offset="100%" stopColor="#9FB89A" />
          </linearGradient>
        </defs>

        {/* Stem 1 & Leaves */}
        <path
          d="M 68 100 C 65 80, 58 65, 45 45"
          stroke="#5C4D4D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Outer Background Leaves */}
        <path
          d="M 38 48 C 22 42, 14 28, 18 20 C 28 22, 36 34, 38 48 Z"
          fill="url(#sageLeafGrad)"
          stroke="#493B3B"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M 19 22 C 26 30, 32 39, 38 48" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />

        <path
          d="M 52 50 C 58 35, 70 24, 78 26 C 76 36, 66 46, 52 50 Z"
          fill="url(#sageLeafGrad)"
          stroke="#493B3B"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M 76 27 C 69 34, 60 42, 52 50" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />

        {/* Secondary Daisy Blossom (Top Left) */}
        <g transform="translate(24, 28)">
          <circle cx="10" cy="5" r="4.5" fill="#FFFDF8" stroke="#493B3B" strokeWidth="0.8" />
          <circle cx="15" cy="8" r="4.5" fill="#FFFDF8" stroke="#493B3B" strokeWidth="0.8" />
          <circle cx="14" cy="14" r="4.5" fill="#FFFDF8" stroke="#493B3B" strokeWidth="0.8" />
          <circle cx="8" cy="14" r="4.5" fill="#FFFDF8" stroke="#493B3B" strokeWidth="0.8" />
          <circle cx="5" cy="9" r="4.5" fill="#FFFDF8" stroke="#493B3B" strokeWidth="0.8" />
          {/* Daisy Center */}
          <circle cx="10" cy="10" r="3.2" fill="#F7D6BD" stroke="#493B3B" strokeWidth="0.8" />
        </g>

        {/* Main Central Vintage Rose (Center Right) */}
        <g transform="translate(46, 42)">
          {/* Outer Layer Petals */}
          <ellipse cx="20" cy="8" rx="8" ry="6.5" fill="url(#rosePetalGrad)" stroke="#493B3B" strokeWidth="1" />
          <ellipse cx="30" cy="15" rx="7.5" ry="7" fill="url(#rosePetalGrad)" stroke="#493B3B" strokeWidth="1" />
          <ellipse cx="28" cy="27" rx="8" ry="6.5" fill="url(#rosePetalGrad)" stroke="#493B3B" strokeWidth="1" />
          <ellipse cx="14" cy="28" rx="8" ry="6.5" fill="url(#rosePetalGrad)" stroke="#493B3B" strokeWidth="1" />
          <ellipse cx="8" cy="17" rx="7.5" ry="7" fill="url(#rosePetalGrad)" stroke="#493B3B" strokeWidth="1" />

          {/* Inner Cup Petals */}
          <circle cx="20" cy="18" r="9" fill="url(#roseAccentGrad)" stroke="#493B3B" strokeWidth="1" />
          <path
            d="M 15 15 C 16 12, 24 12, 25 15 C 24 19, 16 19, 15 15 Z"
            fill="#FFF2F5"
            stroke="#493B3B"
            strokeWidth="0.8"
          />
          <path d="M 18 16 C 19 14, 21 14, 22 16" stroke="#A94B59" strokeWidth="0.7" strokeLinecap="round" />
        </g>

        {/* Sweet Little Lavender Sprig on Right */}
        <g transform="translate(74, 58)">
          <path d="M 2 24 C 6 16, 12 8, 16 0" stroke="#5C4D4D" strokeWidth="1.1" strokeLinecap="round" />
          <ellipse cx="14" cy="2" rx="2.5" ry="3.5" fill="#E9E2F5" stroke="#493B3B" strokeWidth="0.7" />
          <ellipse cx="10" cy="7" rx="2.5" ry="3.2" fill="#E9E2F5" stroke="#493B3B" strokeWidth="0.7" />
          <ellipse cx="15" cy="11" rx="2.4" ry="3.2" fill="#E9E2F5" stroke="#493B3B" strokeWidth="0.7" />
          <ellipse cx="7" cy="15" rx="2.2" ry="3" fill="#E9E2F5" stroke="#493B3B" strokeWidth="0.7" />
        </g>

        {/* Scattered Tiny Floating Petal */}
        <path
          d="M 30 76 C 24 72, 22 80, 26 84 C 30 84, 32 78, 30 76 Z"
          fill="#F3DDE2"
          stroke="#493B3B"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
