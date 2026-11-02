import React from 'react';
import { motion } from 'framer-motion';

export default function CuteFlower({
  size = 32,
  petalColor = '#F3DDE2',
  centerColor = '#F7D6BD',
  rotate = 0,
  animate = true,
  style = {},
}) {
  return (
    <motion.div
      whileHover={animate ? { rotate: rotate + 25, scale: 1.15 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        userSelect: 'none',
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
        {/* 5 Soft Rounded Petals */}
        <circle cx="20" cy="11" r="6.5" fill={petalColor} stroke="#493B3B" strokeWidth="1" />
        <circle cx="28" cy="17" r="6.5" fill={petalColor} stroke="#493B3B" strokeWidth="1" />
        <circle cx="25" cy="27" r="6.5" fill={petalColor} stroke="#493B3B" strokeWidth="1" />
        <circle cx="15" cy="27" r="6.5" fill={petalColor} stroke="#493B3B" strokeWidth="1" />
        <circle cx="12" cy="17" r="6.5" fill={petalColor} stroke="#493B3B" strokeWidth="1" />

        {/* Center Pistil */}
        <circle cx="20" cy="20" r="5" fill={centerColor} stroke="#493B3B" strokeWidth="1.1" />
        <circle cx="18.5" cy="18.5" r="1.2" fill="#FFFFFF" opacity="0.8" />
      </svg>
    </motion.div>
  );
}
