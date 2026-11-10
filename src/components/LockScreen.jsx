import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Sparkles, Clock, Calendar, Heart, Gift, AlertCircle, Loader2, X } from 'lucide-react';
import { triggerSparkleBurst, triggerFinaleConfetti } from '../utils/confetti';
import WashiTape from './svg/WashiTape';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import CuteFlower from './svg/CuteFlower';
import CuteBow from './svg/CuteBow';
import CuteButterfly from './svg/CuteButterfly';
import OuterDecorations from './svg/OuterDecorations';
import IllustratedGiftBox from './svg/IllustratedGiftBox';
import CardCornerFlourish from './svg/CardCornerFlourish';
import HeadingFloralOrnament from './svg/HeadingFloralOrnament';
import DateFlourish from './svg/DateFlourish';
import FloralCelebrationRing from './svg/FloralCelebrationRing';

// Target: 15 November 2026, 12:00 AM Asia/Dhaka (UTC+6)
const TARGET_DATE_STRING = '2026-11-15T00:00:00+06:00';
const TARGET_TIMESTAMP = new Date(TARGET_DATE_STRING).getTime();

export default function LockScreen({ onUnlock, onLockdown }) {
  // Password Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Parse optional simulation query parameter for testing countdown phases:
  // ?sim=1h (55 mins), ?sim=10m (8 mins), ?sim=60s (45 secs), ?sim=0 (arrived)
  const [simulatedOffset, setSimulatedOffset] = useState(() => {
    if (typeof window === 'undefined') return 0;
    try {
      const params = new URLSearchParams(window.location.search);
      const sim = params.get('sim');
      if (!sim) return 0;
      const now = Date.now();
      if (sim === '1h') return TARGET_TIMESTAMP - now - 55 * 60 * 1000;
      if (sim === '10m') return TARGET_TIMESTAMP - now - 8 * 60 * 1000;
      if (sim === '60s') return TARGET_TIMESTAMP - now - 45 * 1000;
      if (sim === '0') return TARGET_TIMESTAMP - now;
      const num = parseInt(sim, 10);
      if (!isNaN(num)) return num;
    } catch (e) {}
    return 0;
  });

  // Calculate live countdown state
  const calculateCountdown = () => {
    const now = Date.now() + simulatedOffset;
    const diff = Math.max(0, TARGET_TIMESTAMP - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const totalSeconds = Math.floor(diff / 1000);

    const isArrived = diff <= 0;
    const isFinal60Seconds = !isArrived && diff <= 60 * 1000;
    const isFinal10Minutes = !isArrived && diff <= 10 * 60 * 1000;
    const isFinalHour = !isArrived && diff <= 60 * 60 * 1000;

    return {
      diff,
      days,
      hours,
      minutes,
      seconds,
      totalSeconds,
      isArrived,
      isFinal60Seconds,
      isFinal10Minutes,
      isFinalHour,
    };
  };

  const [countdown, setCountdown] = useState(calculateCountdown);
  const celebrationFiredRef = useRef(false);

  // Interval timer for 1-second updates
  useEffect(() => {
    const timer = setInterval(() => {
      const current = calculateCountdown();
      setCountdown(current);

      // Trigger automatic celebration when countdown hits zero
      if (current.isArrived && !celebrationFiredRef.current) {
        celebrationFiredRef.current = true;
        try {
          triggerFinaleConfetti();
          triggerSparkleBurst(0.5, 0.4);
        } catch (e) {}
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [simulatedOffset]);

  // Initial celebration if already arrived on load
  useEffect(() => {
    if (countdown.isArrived && !celebrationFiredRef.current) {
      celebrationFiredRef.current = true;
      try {
        triggerFinaleConfetti();
        triggerSparkleBurst(0.5, 0.4);
      } catch (e) {}
    }
  }, [countdown.isArrived]);

  // Password Modal Keyboard Accessibility (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Password Submission Handler (Completely Silent)
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.status === 423 || data.lockdown) {
        setIsLoading(false);
        setIsModalOpen(false);
        if (onLockdown) {
          onLockdown();
        }
        return;
      }

      if (res.ok && data.ok) {
        setIsUnlocked(true);
        setIsModalOpen(false);
        try {
          triggerSparkleBurst(0.5, 0.45);
          triggerFinaleConfetti();
        } catch (e) {}

        // Smooth aesthetic exit delay
        setTimeout(() => {
          onUnlock();
        }, 850);
      } else {
        setErrorMsg(data.error || "That doesn't look right. Try again!");
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg("That doesn't look right. Try again!");
      setIsLoading(false);
    }
  };

  const timeUnits = [
    { label: 'DAYS', value: String(countdown.days).padStart(2, '0') },
    { label: 'HOURS', value: String(countdown.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(countdown.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(countdown.seconds).padStart(2, '0') },
  ];

  // Circular progress calculation for final hour / 60 seconds
  const hourProgress = countdown.isFinalHour ? Math.max(0, Math.min(1, 1 - (countdown.diff / (60 * 60 * 1000)))) : 0;
  const sixtySecProgress = countdown.isFinal60Seconds ? Math.max(0, Math.min(1, countdown.seconds / 60)) : 0;

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          id="countdown-landing-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(10px)',
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF8E9',
            backgroundImage:
              'radial-gradient(#E8D8C3 0.75px, transparent 0.75px), radial-gradient(#E8D8C3 0.75px, #FFF8E9 0.75px)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
            padding: 'clamp(16px, 3.5vw, 32px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            transition: 'background-color 1s ease',
          }}
        >
          {/* Custom Animated Background & Outer SVG Decorations */}
          <OuterDecorations countdown={countdown} />

          {/* Subtle Ambient Celebration Glows */}
          <div
            style={{
              position: 'absolute',
              top: '8%',
              left: '12%',
              width: 'min(420px, 70vw)',
              height: 'min(420px, 70vw)',
              borderRadius: '50%',
              background: countdown.isFinalHour
                ? 'radial-gradient(circle, rgba(255, 179, 71, 0.28) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(243, 221, 226, 0.65) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(40px)',
              transition: 'all 1s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              width: 'min(440px, 75vw)',
              height: 'min(440px, 75vw)',
              borderRadius: '50%',
              background: countdown.isFinalHour
                ? 'radial-gradient(circle, rgba(221, 166, 176, 0.45) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(233, 226, 245, 0.6) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(45px)',
              transition: 'all 1s ease',
            }}
          />

          {/* 1. DISCREET CORNER LOCK ICON BUTTON (Top-Right) */}
          <div
            style={{
              position: 'fixed',
              top: 'clamp(14px, 2.8vh, 26px)',
              right: 'clamp(14px, 2.8vw, 26px)',
              zIndex: 100,
            }}
          >
            <motion.button
              id="discreet-lock-btn"
              onClick={() => {
                setErrorMsg('');
                setIsModalOpen(true);
              }}
              whileHover={{ scale: 1.12, opacity: 1 }}
              whileTap={{ scale: 0.94 }}
              title="Discreet passkey access"
              aria-label="Unlock Website"
              style={{
                background: 'transparent',
                border: '1px solid rgba(169, 75, 89, 0.22)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(169, 75, 89, 0.55)',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#A94B59';
                e.currentTarget.style.borderColor = '#A94B59';
                e.currentTarget.style.backgroundColor = 'rgba(255, 253, 248, 0.85)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(169, 75, 89, 0.55)';
                e.currentTarget.style.borderColor = 'rgba(169, 75, 89, 0.22)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Lock size={15} strokeWidth={1.8} />
            </motion.button>
          </div>

          {/* 2. THE HERO COUNTDOWN CONTAINER */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: countdown.isFinal60Seconds ? '580px' : '680px',
              backgroundColor: '#FFFDF8',
              borderRadius: '28px',
              border: countdown.isFinalHour
                ? '2px solid rgba(221, 166, 176, 0.85)'
                : '2px solid #F3DDE2',
              boxShadow: countdown.isFinalHour
                ? '0 24px 70px rgba(169, 75, 89, 0.18), 0 0 25px rgba(255, 179, 71, 0.15)'
                : '0 20px 60px rgba(169, 75, 89, 0.1), 0 4px 16px rgba(0, 0, 0, 0.03)',
              animation: countdown.isFinal10Minutes ? 'svgCelebrationGlow 4s ease-in-out infinite' : undefined,
              padding: 'clamp(28px, 5.5vw, 48px) clamp(18px, 4.5vw, 38px)',
              textAlign: 'center',
              margin: 'auto',
              transition: 'all 0.5s ease',
              zIndex: 10,
            }}
          >
            {/* Scrapbook Washi Tape Header Accent */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 15,
              }}
            >
              <WashiTape
                color={countdown.isFinalHour ? '#A94B59' : '#DDA6B0'}
                width={120}
                height={26}
                rotate={-1.5}
                pattern="dots"
              />
            </div>

            {/* Delicate Corner Floral Accents (All 4 Corners) */}
            <CardCornerFlourish position="top-left" isFinalHour={countdown.isFinalHour} />
            <CardCornerFlourish position="top-right" isFinalHour={countdown.isFinalHour} />
            <CardCornerFlourish position="bottom-left" isFinalHour={countdown.isFinalHour} />
            <CardCornerFlourish position="bottom-right" isFinalHour={countdown.isFinalHour} />

            {/* Top Scrapbook Icon Emblem with Illustrated Gift Box */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px', marginTop: '4px' }}>
              <motion.div
                animate={{
                  y: countdown.isFinalHour ? [0, -5, 0] : [0, -3, 0],
                  rotate: countdown.isFinalHour ? [0, -2, 2, 0] : [0, -1, 1, 0],
                }}
                transition={{
                  duration: countdown.isFinalHour ? 2.5 : 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FDF2F4 0%, #FFF8E9 100%)',
                  border: countdown.isFinalHour ? '2px solid #DDA6B0' : '2px solid #F3DDE2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: countdown.isFinalHour
                    ? '0 6px 20px rgba(169, 75, 89, 0.16)'
                    : '0 6px 18px rgba(169, 75, 89, 0.1)',
                  position: 'relative',
                }}
              >
                <IllustratedGiftBox
                  size={46}
                  isOpen={countdown.isArrived}
                  isFinalHour={countdown.isFinalHour}
                />
              </motion.div>
            </div>

            {/* DYNAMIC COUNTDOWN HEADINGS & STATUS */}

            {/* STATE A: COUNTDOWN REACHED ZERO (BIRTHDAY TIME) */}
            {countdown.isArrived ? (
              <div style={{ marginBottom: '24px' }}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 16px',
                    borderRadius: '9999px',
                    background: '#FDF2F4',
                    border: '1.5px solid #F3DDE2',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#A94B59',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}
                >
                  <Sparkles size={14} />
                  <span>THE WAIT IS OVER!</span>
                </motion.div>

                {/* Celebratory Floral Flourish */}
                <HeadingFloralOrnament maxWidth={220} isFinalHour={true} />

                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.3rem, 6vw, 3.6rem)',
                    color: '#493B3B',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginBottom: '8px',
                  }}
                >
                  HAPPY BIRTHDAY, AFRAA! 🎂
                </h1>

                <p
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: 'clamp(1.25rem, 3.2vw, 1.6rem)',
                    color: '#A94B59',
                    marginBottom: '20px',
                  }}
                >
                  “Today is officially your day. Something truly special is waiting for you!”
                </p>

                <CuteScrapbookDivider maxWidth={280} />

                {/* THE EXCLUSIVE UNLOCK BUTTON (Only reveals when countdown reaches zero) */}
                <div style={{ marginTop: '28px', marginBottom: '8px' }}>
                  <motion.button
                    id="birthday-arrived-unlock-btn"
                    onClick={() => {
                      setErrorMsg('');
                      setIsModalOpen(true);
                    }}
                    whileHover={{ scale: 1.04, boxShadow: '0 12px 28px rgba(169, 75, 89, 0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'linear-gradient(135deg, #BD5766 0%, #A94B59 55%, #923C4A 100%)',
                      color: '#FFFDF8',
                      border: '1.5px solid #F3DDE2',
                      borderRadius: '9999px',
                      padding: '16px 36px',
                      fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 8px 24px rgba(169, 75, 89, 0.28)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    <Sparkles size={18} />
                    <span>UNLOCK YOUR SURPRISE ✨</span>
                  </motion.button>
                </div>
              </div>
            ) : countdown.isFinal60Seconds ? (
              /* STATE B: SPECIAL FINAL 60 SECONDS CINEMATIC COUNTDOWN */
              <div style={{ marginBottom: '24px' }}>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 16px',
                    borderRadius: '9999px',
                    background: '#FDF2F4',
                    border: '1.5px solid #A94B59',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#A94B59',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}
                >
                  <Sparkles size={14} />
                  <span>THE FINAL COUNTDOWN</span>
                </motion.div>

                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 4.8vw, 2.6rem)',
                    color: '#493B3B',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: '6px',
                  }}
                >
                  SECONDS AWAY FROM AFRAA'S BIRTHDAY!
                </h1>

                <p
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: 'clamp(1.15rem, 2.8vw, 1.45rem)',
                    color: '#A94B59',
                    marginBottom: '18px',
                  }}
                >
                  Hold your breath... almost there!
                </p>

                {/* Big Cinematic Single-Number Countdown */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '18px auto',
                    position: 'relative',
                    width: 'clamp(180px, 45vw, 220px)',
                    height: 'clamp(180px, 45vw, 220px)',
                  }}
                >
                  {/* Decorative SVG Floral Wreath framing the 60s Ring */}
                  <FloralCelebrationRing size={240} />

                  {/* Circular SVG Gauge for 60 Seconds */}
                  <svg
                    viewBox="0 0 120 120"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      transform: 'rotate(-90deg)',
                    }}
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#F3DDE2"
                      strokeWidth="5"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#A94B59"
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - sixtySecProgress)}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.8s linear' }}
                    />
                  </svg>

                  {/* Pulsing Cinematic Number */}
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={countdown.seconds}
                      initial={{ opacity: 0.3, scale: 1.25 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(4.2rem, 13vw, 6.2rem)',
                        fontWeight: 700,
                        color: '#A94B59',
                        lineHeight: 1,
                        display: 'block',
                        textShadow: '0 4px 16px rgba(169, 75, 89, 0.25)',
                      }}
                    >
                      {countdown.seconds}
                    </motion.span>
                  </AnimatePresence>

                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: '#857272',
                      textTransform: 'uppercase',
                      marginTop: '4px',
                    }}
                  >
                    SECONDS
                  </span>
                </div>
              </div>
            ) : (
              /* STATE C: NORMAL MODE (> 1 Hour) OR FINAL-HOUR MODE (<= 60 Mins) */
              <div>
                {/* Mode-specific Top Eyebrow */}
                {countdown.isFinal10Minutes ? (
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 14px',
                      borderRadius: '9999px',
                      background: '#FDF2F4',
                      border: '1.5px solid #A94B59',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#A94B59',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    <Sparkles size={13} />
                    <span>IT'S ALMOST TIME!</span>
                  </motion.div>
                ) : countdown.isFinalHour ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 14px',
                      borderRadius: '9999px',
                      background: '#FDF2F4',
                      border: '1.5px solid #DDA6B0',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#A94B59',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    <Sparkles size={13} />
                    <span>THE WAIT IS ALMOST OVER!</span>
                  </div>
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-handwritten)',
                      fontSize: 'clamp(1.18rem, 3vw, 1.45rem)',
                      color: '#A94B59',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Something wonderful is getting closer...
                  </span>
                )}

                {/* Subtle Animated Floral Ornament Above Heading */}
                <HeadingFloralOrnament maxWidth={180} isFinalHour={countdown.isFinalHour} />

                {/* Primary Hero Heading */}
                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.1rem, 5.2vw, 3.4rem)',
                    color: '#493B3B',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.18,
                    marginBottom: '6px',
                  }}
                >
                  {countdown.isFinalHour ? 'ONE HOUR TO GO, AFRAA!' : "AFRAA'S BIRTHDAY"}
                </h1>

                {/* Target Date Pill Flanked by Decorative SVG Flourishes */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginBottom: '18px',
                  }}
                >
                  <DateFlourish side="left" size={26} />
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 12px',
                      borderRadius: '9999px',
                      background: '#FFF8E9',
                      border: '1px solid #F3DDE2',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#857272',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Clock size={12} color="#A94B59" />
                    <span>15 November 2026 • 12:00 AM Dhaka</span>
                  </div>
                  <DateFlourish side="right" size={26} />
                </div>

                <CuteScrapbookDivider maxWidth={240} />

                {/* Final Hour Progress Ring Indicator */}
                {countdown.isFinalHour && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      margin: '14px 0 6px',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '32px',
                        height: '32px',
                      }}
                    >
                      <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#F3DDE2"
                          strokeWidth="3.5"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#A94B59"
                          strokeWidth="3.5"
                          strokeDasharray="100, 100"
                          strokeDashoffset={100 * (1 - hourProgress)}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#A94B59',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Final Hour Super Countdown Active
                    </span>
                  </div>
                )}

                {/* THE MAIN 4-UNIT COUNTDOWN DISPLAY */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 'clamp(8px, 2vw, 16px)',
                    marginTop: '22px',
                    marginBottom: '10px',
                  }}
                >
                  {timeUnits.map((unit) => (
                    <div
                      key={unit.label}
                      style={{
                        background: '#FFFDF8',
                        border: countdown.isFinalHour ? '1.5px solid #DDA6B0' : '1.5px solid #F3DDE2',
                        borderRadius: '16px',
                        padding: 'clamp(14px, 2.8vw, 22px) clamp(4px, 1.5vw, 12px)',
                        boxShadow: countdown.isFinalHour
                          ? '0 6px 18px rgba(169, 75, 89, 0.12)'
                          : '0 4px 14px rgba(169, 75, 89, 0.05)',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.9rem, 4.8vw, 3.2rem)',
                          fontWeight: 700,
                          color: '#A94B59',
                          lineHeight: 1.05,
                          display: 'block',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {unit.value}
                      </span>
                      <span
                        style={{
                          fontSize: 'clamp(0.64rem, 1.4vw, 0.74rem)',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          color: '#857272',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginTop: '6px',
                        }}
                      >
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subtle Signature Note at Bottom of Card */}
            <div
              style={{
                marginTop: '22px',
                fontSize: '0.76rem',
                fontFamily: 'var(--font-handwritten)',
                color: '#857272',
              }}
            >
              Made with care by Adyan
            </div>
          </motion.div>

          {/* 3. MINIMAL PASSWORD-ENTRY MODAL (Discreet Access) */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                id="password-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  if (e.target.id === 'password-modal-backdrop') {
                    setIsModalOpen(false);
                  }
                }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(73, 59, 59, 0.45)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                }}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 16 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '420px',
                    backgroundColor: '#FFFDF8',
                    borderRadius: '24px',
                    border: '1.5px solid #F3DDE2',
                    boxShadow: '0 24px 60px rgba(73, 59, 59, 0.2), 0 4px 16px rgba(169, 75, 89, 0.08)',
                    padding: '28px 24px',
                    textAlign: 'center',
                  }}
                >
                  {/* Close (X) Button */}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close modal"
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#857272',
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <X size={18} />
                  </button>

                  {/* Modal Lock Icon */}
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: '#FDF2F4',
                      border: '1px solid #F3DDE2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      color: '#A94B59',
                    }}
                  >
                    <Lock size={20} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      color: '#493B3B',
                      marginBottom: '4px',
                    }}
                  >
                    Enter the password
                  </h3>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#857272',
                      marginBottom: '18px',
                    }}
                  >
                    Please enter the secret passkey to access Afraa's birthday celebration.
                  </p>

                  <form onSubmit={handlePasswordSubmit}>
                    <div style={{ position: 'relative', marginBottom: '14px' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="Enter password..."
                        autoFocus
                        disabled={isLoading}
                        aria-label="Site password"
                        style={{
                          width: '100%',
                          padding: '12px 42px 12px 14px',
                          borderRadius: '12px',
                          border: errorMsg ? '1.5px solid #C53030' : '1.5px solid #F3DDE2',
                          background: '#FFF8E9',
                          fontSize: '0.92rem',
                          color: '#493B3B',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.2s',
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          color: '#857272',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Subtle Error Message */}
                    {errorMsg && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          color: '#C53030',
                          fontSize: '0.78rem',
                          marginBottom: '14px',
                          fontWeight: 600,
                        }}
                      >
                        <AlertCircle size={14} />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading || !password.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        borderRadius: '12px',
                        background:
                          isLoading || !password.trim()
                            ? '#DDA6B0'
                            : 'linear-gradient(135deg, #BD5766 0%, #A94B59 55%, #923C4A 100%)',
                        color: '#FFFDF8',
                        border: 'none',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        cursor: isLoading || !password.trim() ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(169, 75, 89, 0.2)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="soundtrack-spinner" />
                          <span>Checking...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={15} />
                          <span>Unlock Website ✨</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
