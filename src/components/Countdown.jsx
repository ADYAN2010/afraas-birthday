import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import WashiTape from './svg/WashiTape';

export default function Countdown() {
  const { countdown, recipient } = birthdayData;

  const calculateTimeLeft = () => {
    const target = new Date(recipient.birthDate).getTime();
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
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isArrived: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [recipient.birthDate]);

  const timeUnits = [
    { label: countdown.labels.days, value: timeLeft.days },
    { label: countdown.labels.hours, value: timeLeft.hours },
    { label: countdown.labels.minutes, value: timeLeft.minutes },
    { label: countdown.labels.seconds, value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown-section"
      style={{
        position: 'relative',
        padding: 'clamp(44px, 7vw, 68px) clamp(12px, 3vw, 20px)',
        maxWidth: '1060px',
        margin: '0 auto',
        zIndex: 2,
        width: '100%',
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: 'clamp(28px, 5vw, 52px) clamp(16px, 4vw, 44px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid #F3DDE2',
          background: 'rgba(255, 253, 248, 0.94)',
          borderRadius: '24px',
          boxShadow: '0 16px 40px rgba(73, 59, 59, 0.06), 0 2px 8px rgba(169, 75, 89, 0.04)',
        }}
      >
        {/* Washi Tape Strip at top left */}
        <div style={{ position: 'absolute', top: '-10px', left: '20px', zIndex: 10 }}>
          <WashiTape width={100} height={22} color="#F3DDE2" pattern="dots" rotate={-3} />
        </div>

        {/* Washi Tape Strip at top right */}
        <div style={{ position: 'absolute', top: '-10px', right: '20px', zIndex: 10 }}>
          <WashiTape width={100} height={22} color="#E9E2F5" pattern="stripes" rotate={3} />
        </div>

        {timeLeft.isArrived ? (
          /* Birthday Arrived State */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '9999px',
                background: '#FDF2F4',
                border: '1.5px solid #F3DDE2',
                color: '#A94B59',
                fontSize: '0.86rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              <Sparkles size={16} />
              THE SPECIAL DAY HAS ARRIVED
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
                marginBottom: '14px',
                color: '#493B3B',
                letterSpacing: '-0.02em',
              }}
            >
              {countdown.celebrationTitle}
            </h2>

            <CuteScrapbookDivider maxWidth={320} />

            <p
              style={{
                fontFamily: 'var(--font-handwritten)',
                fontSize: 'clamp(1.35rem, 3.2vw, 1.8rem)',
                color: '#A94B59',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.4,
              }}
            >
              “{countdown.celebrationSubtitle}”
            </p>
          </motion.div>
        ) : (
          /* Live Countdown State */
          <div style={{ position: 'relative', zIndex: 2 }}>
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
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              <Calendar size={13} />
              <span>{recipient.displayDate}</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
                marginBottom: '8px',
                color: '#493B3B',
                letterSpacing: '-0.01em',
              }}
            >
              {countdown.heading}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-handwritten)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
                color: '#A94B59',
                marginBottom: '10px',
              }}
            >
              Counting down every second until the birthday celebrations begin! 🌸
            </p>

            {/* Cute Hand-drawn Stitched Divider */}
            <CuteScrapbookDivider maxWidth={400} />

            {/* Countdown Grid - 2x2 on Mobile, 4-col on Tablet/Desktop */}
            <div className="countdown-grid">
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0.2, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "150px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #F3DDE2',
                    borderRadius: '18px',
                    padding: 'clamp(16px, 3vw, 24px) clamp(8px, 2vw, 16px)',
                    position: 'relative',
                    boxShadow: '0 6px 18px rgba(73, 59, 59, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Scalloped / Perforated Stamp Top Accent */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #F3DDE2 0%, #DDA6B0 100%)',
                    }}
                  />

                  {/* Number with smooth height/opacity tick */}
                  <div style={{ height: 'clamp(2.3rem, 5vw, 3.4rem)', overflow: 'hidden' }}>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={unit.value}
                        initial={{ y: -16, opacity: 0.3 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 16, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                          fontWeight: 700,
                          lineHeight: 1,
                          marginBottom: '4px',
                          color: '#493B3B',
                        }}
                      >
                        {String(unit.value).padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <span
                    style={{
                      fontSize: 'clamp(0.72rem, 1.8vw, 0.78rem)',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#A94B59',
                      fontWeight: 700,
                      marginTop: '6px',
                    }}
                  >
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Timezone Note */}
            <div
              style={{
                marginTop: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: '#857272',
              }}
            >
              <Clock size={13} color="#A94B59" />
              <span>{countdown.footerNote}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
