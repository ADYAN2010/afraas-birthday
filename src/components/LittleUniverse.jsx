import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Clock, MessageSquare, Sparkles, AlertCircle, ShieldAlert, Check } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { soundCtrl } from '../utils/audio';
import { triggerSparkleBurst } from '../utils/confetti';

export default function LittleUniverse() {
  const { littleUniverse } = birthdayData;
  const [isBeyadobRevealed, setIsBeyadobRevealed] = useState(false);
  const [clockSpeedFast, setClockSpeedFast] = useState(false);

  const handleRevealBeyadob = (e) => {
    soundCtrl.playMagicalSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerSparkleBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    setIsBeyadobRevealed(true);
  };

  return (
    <section
      id="universe-section"
      style={{
        position: 'relative',
        padding: '90px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(224, 104, 140, 0.12)',
            border: '1px solid rgba(224, 104, 140, 0.35)',
            color: '#f4b4cb',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={14} />
          <span>OUR LITTLE UNIVERSE</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}
          className="text-gold-gradient"
        >
          {littleUniverse.heading}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
            color: '#d8c8ff',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          “{littleUniverse.subtitle}”
        </p>
      </motion.div>

      {/* Grid of Interactive Moments */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Moment 1: The Gaming Era */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -5 }}
          className="glass-panel"
          style={{
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(145deg, rgba(32, 14, 52, 0.65) 0%, rgba(18, 8, 32, 0.8) 100%)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(196, 177, 252, 0.14)',
                  border: '1px solid rgba(196, 177, 252, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c4b1fc',
                }}
              >
                <Gamepad2 size={24} />
              </div>

              <span
                style={{
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-sans)',
                  color: '#dfb65b',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  background: 'rgba(223, 182, 91, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(223, 182, 91, 0.25)',
                }}
              >
                DECEMBER 2025
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                marginBottom: '10px',
                color: '#faf8f5',
              }}
            >
              The Gaming Era
            </h3>

            <p
              style={{
                fontSize: '0.88rem',
                color: '#f4b4cb',
                fontWeight: 500,
                marginBottom: '14px',
              }}
            >
              Roblox lobbies & Among Us emergency meetings
            </p>

            <p
              style={{
                fontSize: '0.94rem',
                color: '#c4b1fc',
                lineHeight: 1.65,
              }}
            >
              Back when we first crossed paths through mutual friends. Running around in chaotic Roblox obbies and trying not to get voted out as imposter. Who would've thought those random game sessions were just the prologue?
            </p>
          </div>

          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#faeed1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              🎮 Roblox
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#faeed1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              🚀 Among Us
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#faeed1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              ✨ Mutual Friends
            </span>
          </div>
        </motion.div>

        {/* Moment 2: The 3-Hour Problem (Interactive Clock) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="glass-panel"
          style={{
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(145deg, rgba(32, 14, 52, 0.65) 0%, rgba(18, 8, 32, 0.8) 100%)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(223, 182, 91, 0.14)',
                  border: '1px solid rgba(223, 182, 91, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dfb65b',
                }}
              >
                <Clock size={24} />
              </div>

              <span
                style={{
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-sans)',
                  color: '#f4b4cb',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  background: 'rgba(224, 104, 140, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(224, 104, 140, 0.25)',
                }}
              >
                LATE NIGHTS
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                marginBottom: '10px',
                color: '#faf8f5',
              }}
            >
              The 3-Hour Problem
            </h3>

            {/* Interactive Clock & Quotes */}
            <div
              onClick={() => setClockSpeedFast(!clockSpeedFast)}
              title="Click clock to speed up time!"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'rgba(15, 6, 26, 0.6)',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid rgba(223, 182, 91, 0.2)',
                marginBottom: '16px',
              }}
            >
              {/* SVG Animated Clock */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="26" stroke="#dfb65b" strokeWidth="2" fill="rgba(28, 14, 48, 0.8)" />
                <circle cx="28" cy="28" r="3" fill="#dfb65b" />
                {/* Minute hand */}
                <line
                  x1="28"
                  y1="28"
                  x2="28"
                  y2="10"
                  stroke="#faeed1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '28px 28px',
                    animation: `spinHand ${clockSpeedFast ? '1.5s' : '5s'} linear infinite`,
                  }}
                />
                {/* Hour hand */}
                <line
                  x1="28"
                  y1="28"
                  x2="38"
                  y2="28"
                  stroke="#dfb65b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '28px 28px',
                    animation: `spinHand ${clockSpeedFast ? '12s' : '35s'} linear infinite`,
                  }}
                />
              </svg>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: '#faeed1',
                    lineHeight: 1.3,
                  }}
                >
                  “Just a quick conversation...”
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: '#f4b4cb',
                    lineHeight: 1.3,
                  }}
                >
                  “...and suddenly, where did the last 3 hours go?”
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.94rem',
                color: '#c4b1fc',
                lineHeight: 1.65,
              }}
            >
              Studies, random debates, jokes, and topics that make zero sense at 2 AM. Time apparently forgets how to function whenever we start talking.
            </p>
          </div>

          <p
            style={{
              marginTop: '16px',
              fontSize: '0.78rem',
              color: '#8d7a9f',
              fontStyle: 'italic',
            }}
          >
            {clockSpeedFast ? '⚡ Time dilation active!' : '💡 Click the clock to test time dilation'}
          </p>
        </motion.div>

        {/* Moment 3: The Beyadob Incident (Interactive Reveal) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="glass-panel"
          style={{
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: isBeyadobRevealed
              ? 'linear-gradient(145deg, rgba(46, 18, 64, 0.85) 0%, rgba(24, 10, 42, 0.95) 100%)'
              : 'linear-gradient(145deg, rgba(32, 14, 52, 0.65) 0%, rgba(18, 8, 32, 0.8) 100%)',
            border: isBeyadobRevealed
              ? '1px solid rgba(224, 104, 140, 0.6)'
              : '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(224, 104, 140, 0.14)',
                  border: '1px solid rgba(224, 104, 140, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f4b4cb',
                }}
              >
                <ShieldAlert size={24} />
              </div>

              <span
                style={{
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-sans)',
                  color: '#faeed1',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}
              >
                CLASSIFIED DOSSIER
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                marginBottom: '10px',
                color: '#faf8f5',
              }}
            >
              The Beyadob Incident
            </h3>

            <p
              style={{
                fontSize: '0.94rem',
                color: '#c4b1fc',
                lineHeight: 1.65,
                marginBottom: '20px',
              }}
            >
              Some people have an extraordinary talent for cross-examining others until a full confession is secured...
            </p>

            {/* Reveal / Conceal Box */}
            <AnimatePresence mode="wait">
              {!isBeyadobRevealed ? (
                <motion.div
                  key="hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: 'rgba(15, 6, 26, 0.6)',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px dashed rgba(224, 104, 140, 0.35)',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#a69bb8',
                      marginBottom: '14px',
                    }}
                  >
                    Evidence requires clearance to view.
                  </p>
                  <button
                    onClick={handleRevealBeyadob}
                    className="btn-gold"
                    style={{
                      padding: '10px 22px',
                      fontSize: '0.88rem',
                    }}
                  >
                    <span>Reveal the incident 🕵️</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: 'rgba(224, 104, 140, 0.12)',
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid rgba(224, 104, 140, 0.45)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: '#ffd166',
                      marginBottom: '6px',
                    }}
                  >
                    “BOLO KE BEYADOB? 😭”
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontStyle: 'italic',
                      fontSize: '1.2rem',
                      color: '#faf8f5',
                      marginBottom: '10px',
                    }}
                  >
                    “Fine, I AM.”
                  </div>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#faeed1',
                      lineHeight: 1.5,
                    }}
                  >
                    Your persistence was 100% undefeated. I literally had zero legal defense against that interrogation.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ marginTop: '20px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                color: isBeyadobRevealed ? '#f4b4cb' : '#8d7a9f',
              }}
            >
              {isBeyadobRevealed ? 'Verdict: Case closed, guilty of being cute.' : 'Click to inspect the record'}
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spinHand {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
