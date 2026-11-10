import React from 'react';

export default function FloralCelebrationRing({ size = 260, isArrived = false }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: '-20px',
        width: 'calc(100% + 40px)',
        height: 'calc(100% + 40px)',
        pointerEvents: 'none',
        userSelect: 'none',
        animation: 'svgGentleSway 8s ease-in-out infinite',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="wreathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDA6B0" />
            <stop offset="50%" stopColor="#9FB89A" />
            <stop offset="100%" stopColor="#FFB347" />
          </linearGradient>
        </defs>

        {/* Circular Vine */}
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke="url(#wreathGrad)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.75"
        />

        {/* Top Flower Accent */}
        <g transform="translate(100, 8)">
          <circle cx="-5" cy="0" r="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.6" />
          <circle cx="5" cy="0" r="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.6" />
          <circle cx="0" cy="-4" r="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.6" />
          <circle cx="0" cy="4" r="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="2" fill="#F7D6BD" stroke="#493B3B" strokeWidth="0.6" />
        </g>

        {/* Bottom Flower Accent */}
        <g transform="translate(100, 192)">
          <circle cx="-5" cy="0" r="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.6" />
          <circle cx="5" cy="0" r="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.6" />
          <circle cx="0" cy="-4" r="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.6" />
          <circle cx="0" cy="4" r="3" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="2" fill="#F7D6BD" stroke="#493B3B" strokeWidth="0.6" />
        </g>

        {/* Left Leaflet Accent */}
        <path
          d="M 8 100 C 4 92, 14 88, 16 94 C 18 100, 12 104, 8 100 Z"
          fill="#BFD6BC"
          stroke="#493B3B"
          strokeWidth="0.8"
        />

        {/* Right Leaflet Accent */}
        <path
          d="M 192 100 C 196 92, 186 88, 184 94 C 182 100, 188 104, 192 100 Z"
          fill="#BFD6BC"
          stroke="#493B3B"
          strokeWidth="0.8"
        />

        {/* Four Sparkle Stars */}
        <polygon points="36,36 37,39 40,40 37,41 36,44 35,41 32,40 35,39" fill="#FFB347" />
        <polygon points="164,36 165,39 168,40 165,41 164,44 163,41 160,40 163,39" fill="#FFB347" />
        <polygon points="36,164 37,167 40,168 37,169 36,172 35,169 32,168 35,167" fill="#FFB347" />
        <polygon points="164,164 165,167 168,168 165,169 164,172 163,169 160,168 163,167" fill="#FFB347" />
      </svg>
    </div>
  );
}
