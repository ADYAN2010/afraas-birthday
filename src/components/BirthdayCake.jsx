import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, RotateCcw, PartyPopper } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerCandleConfetti } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';

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
    soundCtrl.playMagicalSparkle();
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section
      id="cake-section"
      style={{
        position: 'relative',
        padding: '90px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 2,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '36px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(223, 182, 91, 0.12)',
            border: '1px solid rgba(223, 182, 91, 0.35)',
            color: '#dfb65b',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={14} />
          <span>A BIRTHDAY TRADITION</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            letterSpacing: '-0.02em',
            marginBottom: '14px',
          }}
          className="text-gold-gradient"
        >
          {cake.heading}
        </h2>

        {/* The Exact Subtitle Requested */}
        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.18rem, 2.8vw, 1.5rem)',
            color: '#d8c8ff',
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
          padding: 'clamp(36px, 5vw, 54px) 24px',
          maxWidth: '720px',
          margin: '0 auto',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(32, 16, 54, 0.7) 0%, rgba(18, 8, 32, 0.85) 100%)',
          border: '1px solid rgba(223, 182, 91, 0.3)',
        }}
      >
        {/* Soft Background Radial Aura */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '380px',
            height: '240px',
            background: candlesLit
              ? 'radial-gradient(circle, rgba(255, 209, 102, 0.22) 0%, rgba(224, 104, 140, 0.12) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(141, 98, 237, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            transition: 'background 0.8s ease',
          }}
        />

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
          }}
        >
          <svg
            width="340"
            height="330"
            viewBox="0 0 340 330"
            fill="none"
            style={{
              maxWidth: '100%',
              height: 'auto',
              filter: candlesLit ? 'drop-shadow(0 0 16px rgba(255, 209, 102, 0.35))' : 'none',
              transition: 'filter 0.5s ease',
            }}
          >
            <defs>
              <linearGradient id="standGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#faeed1" />
                <stop offset="50%" stopColor="#dfb65b" />
                <stop offset="100%" stopColor="#b8913b" />
              </linearGradient>

              <linearGradient id="tierBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d8c8ff" />
                <stop offset="100%" stopColor="#8d62ed" />
              </linearGradient>

              <linearGradient id="tierMiddle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbe6ee" />
                <stop offset="100%" stopColor="#e0688c" />
              </linearGradient>

              <linearGradient id="tierTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#faeed1" />
              </linearGradient>

              <linearGradient id="candleBody" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#faeed1" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#dfb65b" />
              </linearGradient>

              <radialGradient id="cakeFlame" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#ffd166" />
                <stop offset="80%" stopColor="#ff7675" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* 1. Cake Pedestal / Plate */}
            <ellipse cx="170" cy="305" rx="140" ry="16" fill="url(#standGrad)" />
            <path d="M145 305 L155 325 L185 325 L195 305 Z" fill="#b8913b" />
            <rect x="140" y="322" width="60" height="6" rx="3" fill="url(#standGrad)" />

            {/* 2. Bottom Tier (Lavender) */}
            <rect x="55" y="225" width="230" height="75" rx="14" fill="url(#tierBottom)" />
            <path
              d="M55 240 Q75 255 95 240 Q115 255 135 240 Q155 255 175 240 Q195 255 215 240 Q235 255 255 240 Q275 255 285 240"
              stroke="#faeed1"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            {[75, 115, 155, 195, 235, 275].map((x, i) => (
              <circle key={`pearl-${i}`} cx={x} cy="265" r="3" fill="#faeed1" />
            ))}

            {/* 3. Middle Tier (Blush Pink) */}
            <rect x="85" y="155" width="170" height="72" rx="12" fill="url(#tierMiddle)" />
            <path
              d="M85 165 C95 180, 105 180, 115 165 C125 188, 138 188, 148 165 C158 190, 172 190, 182 165 C192 185, 205 185, 215 165 C225 188, 240 188, 255 165"
              stroke="#ffffff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="120" cy="195" r="2.5" fill="#faeed1" />
            <circle cx="170" cy="200" r="3.5" fill="#faeed1" />
            <circle cx="220" cy="195" r="2.5" fill="#faeed1" />

            {/* 4. Top Tier (Ivory Cream) */}
            <rect x="115" y="95" width="110" height="62" rx="10" fill="url(#tierTop)" />
            <path
              d="M115 105 Q125 115 137 105 Q149 115 161 105 Q173 115 185 105 Q197 115 209 105 Q220 115 225 105"
              stroke="#dfb65b"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="170" cy="95" r="7" fill="#dfb65b" />
            <circle cx="158" cy="98" r="5" fill="#f4b4cb" />
            <circle cx="182" cy="98" r="5" fill="#f4b4cb" />

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
                    stroke="#4a3728"
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
                    stroke="#dfb65b"
                    strokeWidth="0.8"
                  />

                  {/* Gold Stripes */}
                  <line
                    x1={candle.cx - 3}
                    y1={candleTop + 8}
                    x2={candle.cx + 3}
                    y2={candleTop + 5}
                    stroke="#dfb65b"
                    strokeWidth="1"
                  />
                  <line
                    x1={candle.cx - 3}
                    y1={candleTop + 18}
                    x2={candle.cx + 3}
                    y2={candleTop + 15}
                    stroke="#dfb65b"
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
                        fill="#ffd166"
                      />
                      <ellipse cx={candle.cx} cy={flameY + 3} rx="2.5" ry="5" fill="#ffffff" />
                    </g>
                  )}

                  {/* Extinguished Smoke Puff */}
                  {!candlesLit && (
                    <g style={{ opacity: 0.6 }}>
                      <path
                        d={`M${candle.cx} ${candleTop - 5} Q${candle.cx - 6} ${candleTop - 18} ${candle.cx + 3} ${candleTop - 32} T${candle.cx - 2} ${candleTop - 48}`}
                        stroke="#c4b1fc"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="2 3"
                      />
                    </g>
                  )}
                </g>
              );
            })}

            {/* Celebratory SVG Confetti / Sparkle Shapes when wish is made */}
            {wishMade && (
              <g>
                <motion.polygon
                  points="170,20 173,30 183,33 173,36 170,46 167,36 157,33 167,30"
                  fill="#ffd166"
                  initial={{ y: 20, opacity: 0, scale: 0.5 }}
                  animate={{ y: -35, opacity: [0, 1, 0.9, 0], scale: 1.2 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="140"
                  cy="35"
                  r="3.5"
                  fill="#f4b4cb"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: -35, opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.polygon
                  points="198,30 200,36 206,38 200,40 198,46 196,40 190,38 196,36"
                  fill="#c4b1fc"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: -40, opacity: [0, 1, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }}
                />
                <motion.rect
                  x="125"
                  y="45"
                  width="4"
                  height="8"
                  rx="1"
                  fill="#dfb65b"
                  initial={{ y: 10, rotate: 0, opacity: 0 }}
                  animate={{ y: -30, rotate: 180, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.9, repeat: Infinity, delay: 0.2 }}
                />
                <motion.rect
                  x="210"
                  y="45"
                  width="4"
                  height="8"
                  rx="1"
                  fill="#ffd166"
                  initial={{ y: 10, rotate: 0, opacity: 0 }}
                  animate={{ y: -30, rotate: -180, opacity: [0, 1, 0] }}
                  transition={{ duration: 2.1, repeat: Infinity, delay: 0.5 }}
                />
              </g>
            )}
          </svg>
        </div>

        {/* Prompt */}
        <p
          style={{
            marginTop: '20px',
            fontSize: '0.88rem',
            color: '#bfaecf',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {candlesLit ? cake.promptLit : cake.promptExtinguished}
        </p>

        {/* Buttons / Wish Control */}
        <div
          style={{
            marginTop: '26px',
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
              className="btn-gold"
              style={{ padding: '14px 38px', fontSize: '1rem' }}
            >
              <Flame size={18} color="#1a0b27" fill="#1a0b27" />
              <span>{isBlowing ? 'Blowing out candles...' : cake.buttonBlow}</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRelight}
              className="btn-glass"
              style={{
                borderColor: 'rgba(223, 182, 91, 0.4)',
                color: '#faeed1',
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
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: '34px',
                padding: '24px 28px',
                borderRadius: '16px',
                background: 'rgba(223, 182, 91, 0.1)',
                border: '1px solid rgba(223, 182, 91, 0.45)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), var(--glow-gold)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#dfb65b',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  letterSpacing: '0.08em',
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
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
                className="text-gold-gradient"
              >
                {cake.wishGrantedTitle}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.08rem, 2.2vw, 1.25rem)',
                  color: '#faeed1',
                  maxWidth: '540px',
                  margin: '0 auto',
                  lineHeight: 1.5,
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
