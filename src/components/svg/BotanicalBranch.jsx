import React from 'react';

export default function BotanicalBranch({
  width = 140,
  height = 140,
  rotate = 0,
  flip = false,
  swayDuration = 6,
  style = {},
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        width,
        height,
        transform: `rotate(${rotate}deg) ${flip ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'bottom left',
        animation: `svgGentleSway ${swayDuration}s ease-in-out infinite`,
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="leafGradSage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BFD6BC" />
            <stop offset="100%" stopColor="#9FB89A" />
          </linearGradient>
          <linearGradient id="rosebudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E2E6" />
            <stop offset="100%" stopColor="#DDA6B0" />
          </linearGradient>
        </defs>

        {/* Main Curving Stem */}
        <path
          d="M 15 110 C 25 85, 38 60, 65 42 C 82 30, 95 24, 108 16"
          stroke="#5C4D4D"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Leaf 1 (Low left) */}
        <path
          d="M 30 82 C 16 80, 10 70, 12 65 C 22 66, 31 75, 30 82 Z"
          fill="url(#leafGradSage)"
          stroke="#493B3B"
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transformOrigin: '30px 82px', animation: 'svgLeafFlutter 4s ease-in-out infinite' }}
        />
        <path d="M 13 67 C 20 72, 26 77, 30 82" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />

        {/* Leaf 2 (Mid right) */}
        <path
          d="M 45 66 C 58 60, 68 64, 70 70 C 60 74, 49 71, 45 66 Z"
          fill="url(#leafGradSage)"
          stroke="#493B3B"
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transformOrigin: '45px 66px', animation: 'svgLeafFlutter 4.5s ease-in-out infinite 0.5s' }}
        />
        <path d="M 46 67 C 54 68, 62 69, 69 70" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />

        {/* Leaf 3 (Upper left) */}
        <path
          d="M 60 46 C 50 36, 46 25, 52 22 C 60 28, 62 38, 60 46 Z"
          fill="url(#leafGradSage)"
          stroke="#493B3B"
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transformOrigin: '60px 46px', animation: 'svgLeafFlutter 5s ease-in-out infinite 1s' }}
        />
        <path d="M 53 24 C 55 31, 57 38, 60 46" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />

        {/* Leaf 4 (Upper right) */}
        <path
          d="M 76 34 C 88 28, 98 33, 99 38 C 90 42, 80 39, 76 34 Z"
          fill="url(#leafGradSage)"
          stroke="#493B3B"
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transformOrigin: '76px 34px', animation: 'svgLeafFlutter 4.2s ease-in-out infinite 0.8s' }}
        />
        <path d="M 77 35 C 84 36, 91 37, 98 38" stroke="#493B3B" strokeWidth="0.6" strokeLinecap="round" />

        {/* Petite Rosebud at Stem Tip */}
        <g transform="translate(102, 12)">
          {/* Calyx leaves */}
          <path d="M 2 8 C 0 11, -3 10, -2 7 C -1 4, 1 6, 2 8 Z" fill="#9FB89A" stroke="#493B3B" strokeWidth="0.7" />
          <path d="M 4 8 C 6 11, 9 10, 8 7 C 7 4, 5 6, 4 8 Z" fill="#9FB89A" stroke="#493B3B" strokeWidth="0.7" />
          {/* Petal bud */}
          <path
            d="M 3 2 C -1 2, -2 7, 3 9 C 8 7, 7 2, 3 2 Z"
            fill="url(#rosebudGrad)"
            stroke="#493B3B"
            strokeWidth="0.9"
          />
          <path d="M 1 4 C 3 3, 5 4, 4 6" stroke="#A94B59" strokeWidth="0.6" strokeLinecap="round" />
        </g>

        {/* Small Blossoming Floret branch */}
        <path d="M 38 72 C 32 68, 26 67, 24 66" stroke="#5C4D4D" strokeWidth="1" strokeLinecap="round" />
        <circle cx="23" cy="65" r="3" fill="#FDF2F4" stroke="#493B3B" strokeWidth="0.8" />
        <circle cx="23" cy="65" r="1.2" fill="#F7D6BD" />

        {/* Tiny Star Doodles */}
        <polygon points="98,18 99,20 102,21 99,22 98,24 97,22 94,21 97,20" fill="#F7D6BD" opacity="0.8" />
      </svg>
    </div>
  );
}
