import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import CountdownDivider from './svg/CountdownDivider';

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
        padding: '70px 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 48px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(223, 182, 91, 0.25)',
          background: 'linear-gradient(145deg, rgba(28, 14, 48, 0.7) 0%, rgba(18, 8, 32, 0.8) 100%)',
        }}
      >
        {/* Soft Radial Backlight */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '250px',
            background: 'radial-gradient(ellipse, rgba(223, 182, 91, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {timeLeft.isArrived ? (
          /* Birthday Arrived State */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '9999px',
                background: 'rgba(224, 104, 140, 0.15)',
                border: '1px solid rgba(224, 104, 140, 0.4)',
                color: '#f4b4cb',
                fontSize: '0.88rem',
                fontWeight: 600,
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
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
              className="text-gold-gradient"
            >
              {countdown.celebrationTitle}
            </h2>

            <CountdownDivider delay={0.2} maxWidth={320} />

            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                color: '#ece6ff',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              {countdown.celebrationSubtitle}
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
                padding: '6px 18px',
                borderRadius: '9999px',
                background: 'rgba(223, 182, 91, 0.1)',
                border: '1px solid rgba(223, 182, 91, 0.3)',
                color: '#dfb65b',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              <Calendar size={14} />
              <span>{recipient.displayDate}</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                marginBottom: '10px',
                letterSpacing: '-0.01em',
              }}
            >
              {countdown.heading}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#bfaecf',
                marginBottom: '10px',
              }}
            >
              Counting down every second until the birthday celebrations begin!
            </p>

            {/* Subtle Animated SVG Separator */}
            <CountdownDivider delay={0.2} maxWidth={420} />

            {/* Countdown Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '18px',
                maxWidth: '780px',
                margin: '0 auto',
              }}
            >
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  style={{
                    background: 'rgba(15, 6, 26, 0.75)',
                    border: '1px solid rgba(223, 182, 91, 0.25)',
                    borderRadius: '18px',
                    padding: '24px 16px',
                    position: 'relative',
                    boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 10px 24px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Number with smooth height/opacity tick */}
                  <div style={{ height: 'clamp(2.4rem, 5vw, 3.4rem)', overflow: 'hidden' }}>
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
                          fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                          fontWeight: 700,
                          lineHeight: 1,
                          marginBottom: '8px',
                        }}
                        className="text-gold-gradient"
                      >
                        {String(unit.value).padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-sans)',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#c4b1fc',
                      fontWeight: 600,
                      marginTop: '6px',
                    }}
                  >
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom Subtle Animated SVG Separator */}
            <CountdownDivider delay={0.4} maxWidth={260} />

            {/* Timezone Note */}
            <div
              style={{
                marginTop: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: '#8d7a9f',
              }}
            >
              <Clock size={13} />
              <span>{countdown.footerNote}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
