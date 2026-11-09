import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff, Sparkles, Clock, Calendar, Heart, Gift, AlertCircle, Loader2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst, triggerFinaleConfetti } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';
import WashiTape from './svg/WashiTape';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import CuteFlower from './svg/CuteFlower';

export default function LockScreen({ onUnlock }) {
  const { recipient } = birthdayData;
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // 15 November 2026, 12:00 AM Asia/Dhaka (UTC+6)
  const calculateTimeLeft = () => {
    const target = new Date("2026-11-15T00:00:00+06:00").getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isArrived: true,
      };
    }

    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
      isArrived: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');
    soundCtrl.playTap();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setIsUnlocked(true);
        if (typeof soundCtrl.playSuccessChime === 'function') {
          soundCtrl.playSuccessChime();
        }
        triggerSparkleBurst(0.5, 0.45);
        triggerFinaleConfetti();

        // Smooth aesthetic transition delay
        setTimeout(() => {
          onUnlock();
        }, 850);
      } else {
        soundCtrl.playErrorTone?.();
        setErrorMsg(data.error || "That doesn't look right. Try again!");
        setIsLoading(false);
      }
    } catch (err) {
      // Network or fetch fallback
      setErrorMsg("That doesn't look right. Try again!");
      setIsLoading(false);
    }
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(12px)',
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF8E9',
            backgroundImage:
              'radial-gradient(#E8D8C3 0.75px, transparent 0.75px), radial-gradient(#E8D8C3 0.75px, #FFF8E9 0.75px)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
            padding: 'clamp(16px, 4vw, 32px)',
            overflowY: 'auto',
          }}
        >
          {/* Soft Ambient Pastel Glows */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '15%',
              width: 'min(360px, 60vw)',
              height: 'min(360px, 60vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(243, 221, 226, 0.6) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(30px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12%',
              right: '12%',
              width: 'min(380px, 65vw)',
              height: 'min(380px, 65vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(233, 226, 245, 0.55) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(35px)',
            }}
          />

          {/* Central Scrapbook Lock Card */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#FFFDF8',
              borderRadius: '24px',
              border: '2px solid #F3DDE2',
              boxShadow: '0 20px 60px rgba(169, 75, 89, 0.12), 0 4px 16px rgba(0, 0, 0, 0.04)',
              padding: 'clamp(28px, 6vw, 44px) clamp(20px, 5vw, 36px)',
              textAlign: 'center',
              margin: 'auto',
            }}
          >
            {/* Washi Tape Accent on Top Edge */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              <WashiTape color="#DDA6B0" width={110} height={26} rotate={-1.5} pattern="dots" />
            </div>

            {/* Corner Decorative Flower Icons */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', opacity: 0.8 }}>
              <CuteFlower color="#DDA6B0" size={24} />
            </div>
            <div style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.8 }}>
              <CuteFlower color="#B8E986" size={22} />
            </div>

            {/* Small Animated SVG Birthday Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', marginTop: '6px' }}>
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, -1.5, 1.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FDF2F4 0%, #FFF8E9 100%)',
                  border: '2px solid #F3DDE2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(169, 75, 89, 0.12)',
                  position: 'relative',
                }}
              >
                {/* SVG Illustration: Cute Gift with Ribbon & Sparkle Flame */}
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Floating Starlets */}
                  <path d="M14 16L15.5 20L19.5 21.5L15.5 23L14 27L12.5 23L8.5 21.5L12.5 20L14 16Z" fill="#FFB347" opacity="0.8" />
                  <path d="M50 14L51 17L54 18L51 19L50 22L49 19L46 18L49 17L50 14Z" fill="#DDA6B0" opacity="0.9" />
                  
                  {/* Gift Box Base */}
                  <rect x="16" y="28" width="32" height="26" rx="4" fill="#F3DDE2" stroke="#A94B59" strokeWidth="2" />
                  
                  {/* Gift Lid */}
                  <rect x="13" y="24" width="38" height="8" rx="2.5" fill="#FFFDF8" stroke="#A94B59" strokeWidth="2" />
                  
                  {/* Ribbon Vertical */}
                  <rect x="29" y="24" width="6" height="30" fill="#A94B59" />
                  
                  {/* Ribbon Bow Left */}
                  <path d="M30 24 C23 20, 20 12, 28 17 C30 18.5, 31 22, 31 24 Z" fill="#DDA6B0" stroke="#A94B59" strokeWidth="1.5" />
                  
                  {/* Ribbon Bow Right */}
                  <path d="M34 24 C41 20, 44 12, 36 17 C34 18.5, 33 22, 33 24 Z" fill="#DDA6B0" stroke="#A94B59" strokeWidth="1.5" />
                  
                  {/* Center Knot */}
                  <circle cx="32" cy="23" r="3" fill="#A94B59" />
                  
                  {/* Floating Heart */}
                  <path
                    d="M32 10 C32 10, 28 6, 26 8 C24 10, 25 13, 32 17 C39 13, 40 10, 38 8 C36 6, 32 10, 32 10 Z"
                    fill="#A94B59"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Required Tagline & Header */}
            <span
              style={{
                fontFamily: 'var(--font-handwritten)',
                fontSize: 'clamp(1.2rem, 3.2vw, 1.45rem)',
                color: '#A94B59',
                display: 'block',
                marginBottom: '2px',
              }}
            >
              Something special is waiting...
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.9rem, 4.5vw, 2.7rem)',
                color: '#493B3B',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '6px',
              }}
            >
              Afraa's birthday surprise
            </h1>

            <p
              style={{
                fontSize: '0.88rem',
                color: '#857272',
                marginBottom: '20px',
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}
            >
              Only a little longer to go!
            </p>

            <CuteScrapbookDivider maxWidth={240} />

            {/* 2. Large Live Countdown (Asia/Dhaka UTC+6) */}
            <div style={{ marginTop: '20px', marginBottom: '26px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 12px',
                  borderRadius: '9999px',
                  background: '#FDF2F4',
                  border: '1px solid #F3DDE2',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: '#A94B59',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                <Clock size={12} />
                <span>15 November 2026 • 12:00 AM Dhaka</span>
              </div>

              {timeLeft.isArrived ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    background: 'linear-gradient(135deg, #F3DDE2 0%, #FFF8E9 100%)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    border: '2px dashed #A94B59',
                    color: '#A94B59',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  IT'S BIRTHDAY TIME! 🎂
                </motion.div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 'clamp(8px, 2vw, 14px)',
                  }}
                >
                  {timeUnits.map((unit, idx) => (
                    <div
                      key={unit.label}
                      style={{
                        background: '#FFFDF8',
                        border: '1.5px solid #F3DDE2',
                        borderRadius: '14px',
                        padding: '10px 6px',
                        boxShadow: '0 4px 12px rgba(169, 75, 89, 0.06)',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.5rem, 3.8vw, 2.1rem)',
                          fontWeight: 700,
                          color: '#A94B59',
                          lineHeight: 1.1,
                          display: 'block',
                        }}
                      >
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#857272',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          display: 'block',
                          marginTop: '2px',
                        }}
                      >
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Minimalist Password Input Form */}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter secret passkey..."
                  disabled={isLoading}
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 18px',
                    borderRadius: '12px',
                    border: errorMsg ? '1.5px solid #E0688C' : '1.5px solid #EACCD2',
                    background: '#FFFDF8',
                    color: '#493B3B',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    outline: 'none',
                    boxShadow: errorMsg
                      ? '0 0 0 3px rgba(224, 104, 140, 0.15)'
                      : 'inset 0 1px 3px rgba(0, 0, 0, 0.04)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    if (!errorMsg) {
                      e.currentTarget.style.borderColor = '#A94B59';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(169, 75, 89, 0.15)';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errorMsg) {
                      e.currentTarget.style.borderColor = '#EACCD2';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />

                {/* Show/Hide password toggle */}
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
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      color: '#C84B59',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      marginBottom: '14px',
                    }}
                  >
                    <AlertCircle size={15} />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Unlock Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '13px 24px',
                  borderRadius: '12px',
                  backgroundColor: '#A94B59',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  letterSpacing: '0.03em',
                  border: 'none',
                  cursor: isLoading ? 'wait' : 'pointer',
                  boxShadow: '0 8px 20px rgba(169, 75, 89, 0.28)',
                  transition: 'background-color 0.2s',
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="soundtrack-spinner" />
                    <span>Verifying Passkey...</span>
                  </>
                ) : (
                  <>
                    <Unlock size={17} />
                    <span>Unlock Surprise ✨</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Subtle Scrapbook Footnote */}
            <div style={{ marginTop: '22px' }}>
              <span
                style={{
                  fontSize: '0.76rem',
                  color: '#857272',
                  letterSpacing: '0.04em',
                }}
              >
                Curated with care — Adyan
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
