import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Sparkles, HelpCircle, Gift, Shuffle, CheckCircle, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst, triggerCandleConfetti } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';
import CountdownDivider from './svg/CountdownDivider';

export default function BirthdayFunZone() {
  const { interactiveFun } = birthdayData;

  // Balloons State
  const [poppedBalloons, setPoppedBalloons] = useState({});

  // Fortune State
  const [currentFortuneIndex, setCurrentFortuneIndex] = useState(0);

  // Quiz State
  const [selectedOption, setSelectedOption] = useState(null);

  // Mystery Box State
  const [boxUnwrapped, setBoxUnwrapped] = useState(false);

  // Handle Balloon Pop
  const handlePopBalloon = (id, e) => {
    if (poppedBalloons[id]) return;
    soundCtrl.playMagicalSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerSparkleBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    setPoppedBalloons((prev) => ({ ...prev, [id]: true }));
  };

  const handleResetBalloons = () => {
    soundCtrl.playMagicalSparkle();
    setPoppedBalloons({});
  };

  // Handle Fortune Draw
  const handleDrawFortune = (e) => {
    soundCtrl.playMagicalSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerSparkleBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * interactiveFun.fortunes.length);
    } while (nextIndex === currentFortuneIndex && interactiveFun.fortunes.length > 1);
    setCurrentFortuneIndex(nextIndex);
  };

  // Handle Unwrap Box
  const handleUnwrapBox = () => {
    if (boxUnwrapped) return;
    soundCtrl.playMagicalSparkle();
    triggerCandleConfetti();
    setBoxUnwrapped(true);
  };

  return (
    <section
      id="fun-section"
      style={{
        position: 'relative',
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3.5vw, 24px)',
        maxWidth: '1100px',
        margin: '0 auto',
        zIndex: 2,
        width: '100%',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
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
          <PartyPopper size={14} />
          <span>CELEBRATION ARCADE</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            letterSpacing: '-0.02em',
            marginBottom: '10px',
          }}
          className="text-gold-gradient"
        >
          {interactiveFun.heading}
        </h2>

        {/* Hand-drawn SVG Decorative Line */}
        <CountdownDivider delay={0.2} maxWidth={280} />

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.12rem, 2.5vw, 1.4rem)',
            color: '#d8c8ff',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          “{interactiveFun.subtitle}”
        </p>
      </motion.div>

      {/* Responsive Grid of 3 Fun Interactive Blocks */}
      <div className="arcade-grid">
        {/* Block 1: Interactive Click-to-Pop Balloons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel"
          style={{
            padding: 'clamp(22px, 4vw, 32px) clamp(16px, 3.5vw, 26px)',
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
                marginBottom: '18px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                🎈 Pop the Balloons
              </h3>
              <button
                onClick={handleResetBalloons}
                title="Reset balloons"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#dfb65b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                }}
              >
                <RefreshCw size={14} />
                <span>Reset</span>
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#c4b1fc', marginBottom: '22px' }}>
              Click on each balloon to pop it and reveal your birthday bonus perk!
            </p>

            {/* Balloon Popping Area */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                minHeight: '120px',
                alignItems: 'center',
              }}
            >
              {interactiveFun.balloons.map((balloon) => {
                const isPopped = !!poppedBalloons[balloon.id];

                return (
                  <motion.div
                    key={balloon.id}
                    whileHover={{ scale: isPopped ? 1 : 1.12, y: isPopped ? 0 : -6 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handlePopBalloon(balloon.id, e)}
                    style={{
                      cursor: isPopped ? 'default' : 'pointer',
                      textAlign: 'center',
                      userSelect: 'none',
                    }}
                  >
                    {!isPopped ? (
                      <div
                        style={{
                          width: '52px',
                          height: '66px',
                          borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                          background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${balloon.color} 70%)`,
                          boxShadow: `0 8px 18px ${balloon.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: '#1a0b27',
                            textTransform: 'uppercase',
                          }}
                        >
                          {balloon.label}
                        </span>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-6px',
                            width: '4px',
                            height: '6px',
                            background: balloon.color,
                          }}
                        />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: `1px solid ${balloon.color}`,
                          color: '#faeed1',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        {balloon.poppedText}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <p style={{ marginTop: '16px', fontSize: '0.8rem', color: '#8d7a9f', textAlign: 'center' }}>
            {Object.keys(poppedBalloons).length === interactiveFun.balloons.length
              ? '🎉 All balloons popped! Supercharged for the year!'
              : 'Tap any floating balloon to pop it!'}
          </p>
        </motion.div>

        {/* Block 2: Random Positive Fortune Generator */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-panel"
          style={{
            padding: 'clamp(22px, 4vw, 32px) clamp(16px, 3.5vw, 26px)',
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
                marginBottom: '18px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                🌟 Birthday Vibe Dispenser
              </h3>
              <Sparkles size={20} color="#ffd166" />
            </div>

            <p style={{ fontSize: '0.9rem', color: '#c4b1fc', marginBottom: '20px' }}>
              Tap below to draw a cheerful fortune and positive prediction for your new chapter:
            </p>

            {/* Current Fortune Card */}
            <div
              style={{
                minHeight: '80px',
                padding: '18px',
                borderRadius: '16px',
                background: 'rgba(15, 6, 26, 0.65)',
                border: '1px solid rgba(223, 182, 91, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFortuneIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '1.18rem',
                    color: '#faeed1',
                    lineHeight: 1.45,
                  }}
                >
                  {interactiveFun.fortunes[currentFortuneIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handleDrawFortune}
            className="btn-gold"
            style={{
              padding: '12px 24px',
              fontSize: '0.92rem',
              width: '100%',
            }}
          >
            <Shuffle size={16} />
            <span>Draw Another Fortune 🎲</span>
          </button>
        </motion.div>

        {/* Block 3: Lighthearted Birthday Mini-Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-panel arcade-quiz-card"
          style={{
            padding: 'clamp(22px, 4vw, 32px) clamp(16px, 3.5vw, 26px)',
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
                marginBottom: '18px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                🎯 Birthday Quick Quiz
              </h3>
              <HelpCircle size={20} color="#f4b4cb" />
            </div>

            <p
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#faf8f5',
                marginBottom: '16px',
              }}
            >
              {interactiveFun.quiz.question}
            </p>

            {/* Quiz Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {interactiveFun.quiz.options.map((option, idx) => {
                const isSelected = selectedOption === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedOption(idx);
                      soundCtrl.playMagicalSparkle();
                      if (option.isCorrect) triggerCandleConfetti();
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: isSelected
                        ? option.isCorrect
                          ? 'rgba(46, 204, 113, 0.2)'
                          : 'rgba(231, 76, 60, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: isSelected
                        ? option.isCorrect
                          ? '1px solid #2ecc71'
                          : '1px solid #e74c3c'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#faf8f5',
                      fontSize: '0.86rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedOption !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '16px',
                fontSize: '0.85rem',
                color: interactiveFun.quiz.options[selectedOption].isCorrect ? '#ffd166' : '#f4b4cb',
                fontWeight: 600,
              }}
            >
              {interactiveFun.quiz.options[selectedOption].response}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
