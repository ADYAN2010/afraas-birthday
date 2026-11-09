import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, RotateCcw, PartyPopper } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerCandleConfetti } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import WashiTape from './svg/WashiTape';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const { cake } = birthdayData;

  const handleBlowCandles = () => {
    if (!candlesLit || isBlowing) return;
    setIsBlowing(true);
    soundCtrl.playCandleBlow();

    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      setWishMade(true);
      triggerCandleConfetti();
    }, 400);
  };

  const handleRelight = () => {
    soundCtrl.playCandleLight();
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section
      id="cake-section"
      style={{
        position: 'relative',
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3.5vw, 24px)',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 2,
        width: '100%',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '32px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: '#FDF2F4',
            border: '1.5px solid #F3DDE2',
            color: '#A94B59',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <Sparkles size={13} color="#A94B59" />
          <span>A BIRTHDAY TRADITION</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            color: '#493B3B',
          }}
        >
          {cake.heading}
        </h2>

        {/* Cute Stitched Scrapbook Divider */}
        <CuteScrapbookDivider maxWidth={260} />

        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.35rem, 3.2vw, 1.75rem)',
            color: '#A94B59',
            maxWidth: '650px',
            margin: '0 auto',
          }}
        >
          “{cake.subtitle}”
        </p>
      </motion.div>

      {/* Cake Stage Card */}
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          padding: 'clamp(28px, 5vw, 54px) clamp(14px, 3vw, 28px)',
          maxWidth: '720px',
          margin: '0 auto',
          overflow: 'hidden',
          background: 'rgba(255, 253, 248, 0.96)',
          border: '2px solid #F3DDE2',
          borderRadius: '24px',
          boxShadow: '0 18px 45px rgba(73, 59, 59, 0.08), 0 2px 8px rgba(169, 75, 89, 0.04)',
        }}
      >
        {/* Washi Tape Strip at Top Center */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <WashiTape width={120} height={24} color="#F3DDE2" pattern="dots" rotate={-1} />
        </div>

        {/* Illustrated Cake Canvas / SVG */}
        <div
          onClick={handleBlowCandles}
          title={candlesLit ? 'Click candles to blow them out!' : 'Candles are blown out!'}
          style={{
            cursor: candlesLit ? 'pointer' : 'default',
            display: 'inline-block',
            margin: '0 auto',
            position: 'relative',
            userSelect: 'none',
            maxWidth: '100%',
          }}
        >
          <svg
            width="340"
            height="330"
            viewBox="0 0 340 330"
            fill="none"
            style={{
              maxWidth: 'min(340px, 85vw)',
              height: 'auto',
              filter: candlesLit ? 'drop-shadow(0 4px 18px rgba(247, 214, 189, 0.7))' : 'none',
              transition: 'filter 0.5s ease',
            }}
          >
            <defs>
              <linearGradient id="standGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FFF8E9" />
                <stop offset="100%" stopColor="#F3DDE2" />
              </linearGradient>

              <linearGradient id="tierBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0E8F9" />
                <stop offset="100%" stopColor="#E0D5F2" />
              </linearGradient>

              <linearGradient id="tierMiddle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF0F3" />
                <stop offset="100%" stopColor="#F5D8E0" />
              </linearGradient>

              <linearGradient id="tierTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FFF3E0" />
              </linearGradient>

              <linearGradient id="candleBody" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFF8E9" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F3DDE2" />
              </linearGradient>

              <radialGradient id="cakeFlame" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#FFD166" />
                <stop offset="80%" stopColor="#F48FB1" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* 1. Cake Pedestal / Plate */}
            <ellipse cx="170" cy="305" rx="140" ry="16" fill="url(#standGrad)" stroke="#DDA6B0" strokeWidth="1.2" />
            <path d="M145 305 L155 325 L185 325 L195 305 Z" fill="#F3DDE2" stroke="#DDA6B0" strokeWidth="1" />
            <rect x="138" y="322" width="64" height="6" rx="3" fill="#FFF8E9" stroke="#DDA6B0" strokeWidth="1" />

            {/* 2. Bottom Tier (Soft Lavender Cream) */}
            <rect x="55" y="225" width="230" height="75" rx="14" fill="url(#tierBottom)" stroke="#DDA6B0" strokeWidth="1" />
            {/* Scalloped Frosting */}
            <path
              d="M55 240 Q75 255 95 240 Q115 255 135 240 Q155 255 175 240 Q195 255 215 240 Q235 255 255 240 Q275 255 285 240"
              stroke="#FFFFFF"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {[75, 115, 155, 195, 235, 275].map((x, i) => (
              <circle key={`pearl-${i}`} cx={x} cy="265" r="3.5" fill="#FFF8E9" stroke="#DDA6B0" strokeWidth="0.8" />
            ))}

            {/* 3. Middle Tier (Strawberry Pastel Cream) */}
            <rect x="85" y="155" width="170" height="72" rx="12" fill="url(#tierMiddle)" stroke="#DDA6B0" strokeWidth="1" />
            {/* Drips */}
            <path
              d="M85 165 C95 180, 105 180, 115 165 C125 188, 138 188, 148 165 C158 190, 172 190, 182 165 C192 185, 205 185, 215 165 C225 188, 240 188, 255 165"
              stroke="#FFFFFF"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="120" cy="195" r="3" fill="#A94B59" />
            <circle cx="170" cy="200" r="4" fill="#A94B59" />
            <circle cx="220" cy="195" r="3" fill="#A94B59" />

            {/* 4. Top Tier (Vanilla Butter Cream) */}
            <rect x="115" y="95" width="110" height="62" rx="10" fill="url(#tierTop)" stroke="#DDA6B0" strokeWidth="1" />
            <path
              d="M115 105 Q125 115 137 105 Q149 115 161 105 Q173 115 185 105 Q197 115 209 105 Q220 115 225 105"
              stroke="#F3DDE2"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Top Strawberries/Cherries */}
            <circle cx="170" cy="95" r="8" fill="#A94B59" />
            <circle cx="156" cy="98" r="6" fill="#A94B59" />
            <circle cx="184" cy="98" r="6" fill="#A94B59" />

            {/* 5. Five Glowing Candles */}
            {[
              { id: 1, cx: 135, cy: 55, height: 40 },
              { id: 2, cx: 152, cy: 45, height: 50 },
              { id: 3, cx: 170, cy: 38, height: 57 },
              { id: 4, cx: 188, cy: 45, height: 50 },
              { id: 5, cx: 205, cy: 55, height: 40 },
            ].map((candle) => {
              const candleTop = 95 - candle.height;
              const flameY = candleTop - 12;

              return (
                <g key={candle.id}>
                  {/* Wick */}
                  <line
                    x1={candle.cx}
                    y1={candleTop}
                    x2={candle.cx}
                    y2={candleTop - 5}
                    stroke="#493B3B"
                    strokeWidth="1.5"
                  />

                  {/* Candle Body */}
                  <rect
                    x={candle.cx - 3.5}
                    y={candleTop}
                    width="7"
                    height={candle.height}
                    rx="2"
                    fill="url(#candleBody)"
                    stroke="#DDA6B0"
                    strokeWidth="0.8"
                  />

                  {/* Rose Stripes */}
                  <line
                    x1={candle.cx - 3}
                    y1={candleTop + 8}
                    x2={candle.cx + 3}
                    y2={candleTop + 5}
                    stroke="#DDA6B0"
                    strokeWidth="1"
                  />
                  <line
                    x1={candle.cx - 3}
                    y1={candleTop + 18}
                    x2={candle.cx + 3}
                    y2={candleTop + 15}
                    stroke="#DDA6B0"
                    strokeWidth="1"
                  />

                  {/* Animated Flame */}
                  {candlesLit && (
                    <g
                      style={{
                        transformOrigin: `${candle.cx}px ${flameY + 5}px`,
                        animation: `flameFlicker ${1.8 + (candle.id % 3) * 0.4}s ease-in-out infinite`,
                      }}
                    >
                      <circle cx={candle.cx} cy={flameY + 3} r="14" fill="url(#cakeFlame)" opacity="0.85" />
                      <path
                        d={`M${candle.cx} ${flameY - 14} C${candle.cx - 6} ${flameY - 3}, ${candle.cx - 5} ${flameY + 6}, ${candle.cx} ${flameY + 7} C${candle.cx + 5} ${flameY + 6}, ${candle.cx + 6} ${flameY - 3}, ${candle.cx} ${flameY - 14} Z`}
                        fill="#FFD166"
                      />
                      <ellipse cx={candle.cx} cy={flameY + 3} rx="2.5" ry="5" fill="#FFFFFF" />
                    </g>
                  )}

                  {/* Extinguished Smoke Puff */}
                  {!candlesLit && (
                    <g style={{ opacity: 0.6 }}>
                      <path
                        d={`M${candle.cx} ${candleTop - 5} Q${candle.cx - 6} ${candleTop - 18} ${candle.cx + 3} ${candleTop - 32} T${candle.cx - 2} ${candleTop - 48}`}
                        stroke="#A94B59"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="2 3"
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Prompt */}
        <p
          style={{
            marginTop: '16px',
            fontSize: '0.9rem',
            color: '#6E5D5D',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {candlesLit ? cake.promptLit : cake.promptExtinguished}
        </p>

        {/* Buttons / Wish Control */}
        <div
          style={{
            marginTop: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          {candlesLit ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBlowCandles}
              disabled={isBlowing}
              className="btn-cherry"
              style={{
                padding: '13px clamp(20px, 4vw, 36px)',
                fontSize: 'clamp(0.92rem, 2vw, 1rem)',
                minHeight: '48px',
                maxWidth: '100%',
              }}
            >
              <Flame size={18} />
              <span>{isBlowing ? 'Blowing out candles...' : cake.buttonBlow}</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRelight}
              className="btn-glass"
              style={{
                padding: '13px clamp(20px, 4vw, 34px)',
                fontSize: 'clamp(0.92rem, 2vw, 1rem)',
                color: '#A94B59',
                borderColor: '#DDA6B0',
                minHeight: '48px',
                maxWidth: '100%',
              }}
            >
              <RotateCcw size={16} />
              <span>{cake.buttonRelight}</span>
            </motion.button>
          )}
        </div>

        {/* Wish Granted Notification */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: '30px',
                padding: '22px 24px',
                borderRadius: '18px',
                background: '#FDF7F8',
                border: '2px dashed #DDA6B0',
                boxShadow: '0 8px 24px rgba(169, 75, 89, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#A94B59',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                <PartyPopper size={16} />
                <span>WISH SEALED WITH MAGIC</span>
                <PartyPopper size={16} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
                  marginBottom: '8px',
                  color: '#493B3B',
                  letterSpacing: '-0.01em',
                }}
              >
                {cake.wishGrantedTitle}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-handwritten)',
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                  color: '#A94B59',
                  maxWidth: '540px',
                  margin: '0 auto',
                  lineHeight: 1.4,
                }}
              >
                “{cake.wishGrantedSub}”
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
