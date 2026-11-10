import React from 'react';

export default function CardCornerFlourish({
  position = 'top-left',
  size = 36,
  isFinalHour = false,
  style = {},
}) {
  const isTopLeft = position === 'top-left';
  const isTopRight = position === 'top-right';
  const isBottomLeft = position === 'bottom-left';
  const isBottomRight = position === 'bottom-right';

  let rotation = 0;
  if (isTopRight) rotation = 90;
  if (isBottomRight) rotation = 180;
  if (isBottomLeft) rotation = 270;

  return (
    <div
      style={{
        position: 'absolute',
        top: isTopLeft || isTopRight ? '12px' : 'auto',
        bottom: isBottomLeft || isBottomRight ? '12px' : 'auto',
        left: isTopLeft || isBottomLeft ? '12px' : 'auto',
        right: isTopRight || isBottomRight ? '12px' : 'auto',
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'top left',
        animation: 'svgGentleSway 5s ease-in-out infinite',
        userSelect: 'none',
        pointerEvents: 'none',
        opacity: isFinalHour ? 0.95 : 0.8,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id={`flourishPetalGrad_${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="100%" stopColor={isFinalHour ? '#FFB347' : '#DDA6B0'} />
          </linearGradient>
        </defs>

        {/* Stem arch along corner */}
        <path
          d="M 6 36 C 8 20, 20 8, 36 6"
          stroke="#5C4D4D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="1 1.5"
        />

        {/* Leaf on left */}
        <path
          d="M 12 24 C 6 22, 5 16, 9 14 C 13 16, 14 21, 12 24 Z"
          fill="#BFD6BC"
          stroke="#493B3B"
          strokeWidth="0.8"
        />

        {/* Leaf on right */}
        <path
          d="M 24 12 C 22 6, 16 5, 14 9 C 16 13, 21 14, 24 12 Z"
          fill="#BFD6BC"
          stroke="#493B3B"
          strokeWidth="0.8"
        />

        {/* Center Corner Daisy */}
        <g transform="translate(18, 18)">
          <circle cx="0" cy="-4" r="3" fill={`url(#flourishPetalGrad_${position})`} stroke="#493B3B" strokeWidth="0.7" />
          <circle cx="4" cy="0" r="3" fill={`url(#flourishPetalGrad_${position})`} stroke="#493B3B" strokeWidth="0.7" />
          <circle cx="0" cy="4" r="3" fill={`url(#flourishPetalGrad_${position})`} stroke="#493B3B" strokeWidth="0.7" />
          <circle cx="-4" cy="0" r="3" fill={`url(#flourishPetalGrad_${position})`} stroke="#493B3B" strokeWidth="0.7" />
          {/* Daisy Eye */}
          <circle cx="0" cy="0" r="2.2" fill="#F7D6BD" stroke="#493B3B" strokeWidth="0.7" />
        </g>
      </svg>
    </div>
  );
}
