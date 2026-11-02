import React from 'react';

export default function CuteScrapbookDivider({ maxWidth = 340, style = {} }) {
  return (
    <div
      style={{
        maxWidth,
        margin: '16px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 340 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* Left Wavy Stitched Line */}
        <path
          d="M 20 14 Q 50 8 80 14 T 140 14"
          stroke="#DDA6B0"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Center Daisy Blossom */}
        <g>
          {/* Petals */}
          <circle cx="170" cy="8" r="4" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.8" />
          <circle cx="176" cy="12" r="4" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.8" />
          <circle cx="174" cy="19" r="4" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.8" />
          <circle cx="166" cy="19" r="4" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.8" />
          <circle cx="164" cy="12" r="4" fill="#F3DDE2" stroke="#493B3B" strokeWidth="0.8" />
          {/* Center */}
          <circle cx="170" cy="14" r="3.2" fill="#F7D6BD" stroke="#493B3B" strokeWidth="0.9" />
        </g>

        {/* Right Wavy Stitched Line */}
        <path
          d="M 200 14 Q 230 8 260 14 T 320 14"
          stroke="#DDA6B0"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tiny Doodled Stars */}
        <polygon points="60,6 61,9 64,10 61,11 60,14 59,11 56,10 59,9" fill="#F7D6BD" />
        <polygon points="280,6 281,9 284,10 281,11 280,14 279,11 276,10 279,9" fill="#F7D6BD" />
      </svg>
    </div>
  );
}
