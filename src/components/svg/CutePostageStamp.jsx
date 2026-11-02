import React from 'react';

export default function CutePostageStamp({
  label = '15 NOV',
  sublabel = 'AFRAA',
  size = 64,
  bgColor = '#F3DDE2',
  style = {},
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: size,
        height: size * 1.2,
        userSelect: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 60 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 2px 5px rgba(73, 59, 59, 0.15))',
        }}
      >
        {/* Scalloped Perforated Edge Stamp Base */}
        <path
          d="
            M 6 4 
            A 3 3 0 0 1 12 4 A 3 3 0 0 1 18 4 A 3 3 0 0 1 24 4 A 3 3 0 0 1 30 4 A 3 3 0 0 1 36 4 A 3 3 0 0 1 42 4 A 3 3 0 0 1 48 4 A 3 3 0 0 1 54 4
            L 56 6
            A 3 3 0 0 1 56 12 A 3 3 0 0 1 56 18 A 3 3 0 0 1 56 24 A 3 3 0 0 1 56 30 A 3 3 0 0 1 56 36 A 3 3 0 0 1 56 42 A 3 3 0 0 1 56 48 A 3 3 0 0 1 56 54 A 3 3 0 0 1 56 60 A 3 3 0 0 1 56 66
            L 54 68
            A 3 3 0 0 1 48 68 A 3 3 0 0 1 42 68 A 3 3 0 0 1 36 68 A 3 3 0 0 1 30 68 A 3 3 0 0 1 24 68 A 3 3 0 0 1 18 68 A 3 3 0 0 1 12 68 A 3 3 0 0 1 6 68
            L 4 66
            A 3 3 0 0 1 4 60 A 3 3 0 0 1 4 54 A 3 3 0 0 1 4 48 A 3 3 0 0 1 4 42 A 3 3 0 0 1 4 36 A 3 3 0 0 1 4 30 A 3 3 0 0 1 4 24 A 3 3 0 0 1 4 18 A 3 3 0 0 1 4 12 A 3 3 0 0 1 4 6
            Z
          "
          fill="#FFFDF7"
          stroke="#DDA6B0"
          strokeWidth="0.8"
        />

        {/* Inner Stamp Inset */}
        <rect
          x="8"
          y="8"
          width="44"
          height="56"
          rx="2"
          fill={bgColor}
          stroke="#493B3B"
          strokeWidth="0.9"
        />

        {/* Mini Stamp Art: Daisy & Date */}
        <circle cx="30" cy="28" r="5" fill="#DDA6B0" />
        <circle cx="30" cy="28" r="2.5" fill="#FFF8E9" />
        {/* Tiny Petals */}
        <circle cx="30" cy="20" r="2.8" fill="#FFF8E9" stroke="#493B3B" strokeWidth="0.6" />
        <circle cx="37" cy="25" r="2.8" fill="#FFF8E9" stroke="#493B3B" strokeWidth="0.6" />
        <circle cx="35" cy="34" r="2.8" fill="#FFF8E9" stroke="#493B3B" strokeWidth="0.6" />
        <circle cx="25" cy="34" r="2.8" fill="#FFF8E9" stroke="#493B3B" strokeWidth="0.6" />
        <circle cx="23" cy="25" r="2.8" fill="#FFF8E9" stroke="#493B3B" strokeWidth="0.6" />

        {/* Stamp Label */}
        <text
          x="30"
          y="49"
          fill="#493B3B"
          fontSize="5.5"
          fontWeight="700"
          fontFamily="sans-serif"
          letterSpacing="0.8"
          textAnchor="middle"
        >
          {label}
        </text>
        <text
          x="30"
          y="57"
          fill="#A94B59"
          fontSize="4.8"
          fontWeight="600"
          fontFamily="sans-serif"
          letterSpacing="1"
          textAnchor="middle"
        >
          {sublabel}
        </text>

        {/* Postal Cancellation wavy lines */}
        <path
          d="M 2 24 Q 10 22 18 24 T 34 24"
          stroke="#493B3B"
          strokeWidth="0.7"
          opacity="0.35"
          fill="none"
        />
        <path
          d="M 2 28 Q 10 26 18 28 T 34 28"
          stroke="#493B3B"
          strokeWidth="0.7"
          opacity="0.35"
          fill="none"
        />
      </svg>
    </div>
  );
}
