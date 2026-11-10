import React from 'react';

export default function DateFlourish({ side = 'left', size = 32, style = {} }) {
  const isLeft = side === 'left';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: size,
        height: size * 0.5,
        transform: isLeft ? 'none' : 'scaleX(-1)',
        userSelect: 'none',
        pointerEvents: 'none',
        opacity: 0.85,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Curving stem toward pill */}
        <path
          d="M 2 16 C 14 16, 22 8, 38 10"
          stroke="#A94B59"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeDasharray="2 1.5"
        />

        {/* Leaf */}
        <path
          d="M 16 11 C 12 6, 6 6, 8 10 C 10 13, 14 13, 16 11 Z"
          fill="#BFD6BC"
          stroke="#493B3B"
          strokeWidth="0.7"
        />

        {/* Small Petal Bud */}
        <ellipse cx="26" cy="8" rx="2.5" ry="2" fill="#DDA6B0" stroke="#493B3B" strokeWidth="0.7" />

        {/* Tiny Bud Tip */}
        <circle cx="37" cy="10" r="1.5" fill="#F7D6BD" stroke="#493B3B" strokeWidth="0.6" />
      </svg>
    </div>
  );
}
