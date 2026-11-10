import React from 'react';

const PETAL_ITEMS = [
  { id: 1, left: '8%', size: 16, delay: 0, duration: 14, color: '#F3DDE2', rotate: 20 },
  { id: 2, left: '22%', size: 13, delay: 4.5, duration: 16, color: '#FFF2F5', rotate: -15 },
  { id: 3, left: '38%', size: 15, delay: 8, duration: 15, color: '#F7D6BD', rotate: 35 },
  { id: 4, left: '62%', size: 14, delay: 2, duration: 17, color: '#F3DDE2', rotate: -25 },
  { id: 5, left: '78%', size: 17, delay: 6.5, duration: 13, color: '#DDA6B0', rotate: 10 },
  { id: 6, left: '92%', size: 12, delay: 10, duration: 18, color: '#E9E2F5', rotate: -40 },
  // Extra petals for last 10 minutes / arrived
  { id: 7, left: '15%', size: 14, delay: 1.5, duration: 12, color: '#FCEAE6', rotate: 45, extra: true },
  { id: 8, left: '50%', size: 13, delay: 5.5, duration: 13, color: '#F3DDE2', rotate: -30, extra: true },
  { id: 9, left: '85%', size: 15, delay: 3.2, duration: 11, color: '#FFD1BA', rotate: 25, extra: true },
  { id: 10, left: '30%', size: 12, delay: 7.2, duration: 14, color: '#FDF2F4', rotate: -10, extra: true },
];

export default function FloatingPetals({ isFinal10Minutes = false, isArrived = false }) {
  const activePetals = isFinal10Minutes || isArrived
    ? PETAL_ITEMS
    : PETAL_ITEMS.filter((p) => !p.extra);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 5,
      }}
      aria-hidden="true"
    >
      {activePetals.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            top: '-30px',
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.3,
            animation: `svgPetalDriftDown ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: 0,
            transform: `rotate(${petal.rotate}deg)`,
          }}
        >
          <svg
            viewBox="0 0 20 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Elegant curved petal shape */}
            <path
              d="M 10 2 C 16 7, 19 16, 10 24 C 1 16, 4 7, 10 2 Z"
              fill={petal.color}
              stroke="#493B3B"
              strokeWidth="0.6"
              strokeOpacity="0.4"
            />
            {/* Soft inner crease line */}
            <path
              d="M 10 6 C 11 12, 10 18, 10 22"
              stroke="#DDA6B0"
              strokeWidth="0.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
