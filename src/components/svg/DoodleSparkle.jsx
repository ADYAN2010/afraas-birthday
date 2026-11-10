import React from 'react';

export default function DoodleSparkle({
  size = 20,
  color = '#F7D6BD',
  accent = '#DDA6B0',
  twinkleDuration = 3,
  delay = 0,
  style = {},
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        animation: `svgSparkleTwinkle ${twinkleDuration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 4-point doodle star */}
        <path
          d="M 15 2 C 15 10, 11 14, 2 15 C 11 16, 15 20, 15 28 C 15 20, 19 16, 28 15 C 19 14, 15 10, 15 2 Z"
          fill={color}
          stroke="#493B3B"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Tiny center core */}
        <circle cx="15" cy="15" r="1.5" fill={accent} />
        {/* Mini satellite sparkles */}
        <circle cx="6" cy="6" r="0.9" fill={accent} />
        <circle cx="24" cy="24" r="0.8" fill={accent} />
      </svg>
    </div>
  );
}
