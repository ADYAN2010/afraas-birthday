import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Sparkles, HelpCircle, Gift, Shuffle, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst, triggerCandleConfetti } from '../utils/confetti';
import { soundCtrl } from '../utils/audio';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import WashiTape from './svg/WashiTape';
import CuteBow from './svg/CuteBow';

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
        initial={{ opacity: 0.1, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "150px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '38px' }}
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
          <PartyPopper size={13} color="#A94B59" />
          <span>CELEBRATION ARCADE</span>
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
          {interactiveFun.heading}
        </h2>

        {/* Cute Stitched Scrapbook Divider */}
        <CuteScrapbookDivider maxWidth={260} />

        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.35rem, 3.2vw, 1.75rem)',
            color: '#A94B59',
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
          initial={{ opacity: 0.2, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.7 }}
          className="glass-panel"
          style={{
            padding: 'clamp(24px, 4vw, 32px) clamp(18px, 3.5vw, 26px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            border: '2px solid #F3DDE2',
            borderRadius: '22px',
            boxShadow: '0 12px 30px rgba(73, 59, 59, 0.05)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: '-10px', left: '20px', zIndex: 5 }}>
            <WashiTape width={80} height={20} color="#F3DDE2" pattern="dots" rotate={-2} />
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                marginTop: '6px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#493B3B' }}>
                🎈 Pop the Balloons
              </h3>
              <button
                onClick={handleResetBalloons}
                title="Reset balloons"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#A94B59',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                <RefreshCw size={14} />
                <span>Reset</span>
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#6E5D5D', marginBottom: '20px' }}>
              Click on each pastel balloon to pop it and reveal your birthday perk!
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
                          background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${balloon.color} 75%)`,
                          boxShadow: '0 6px 14px rgba(73, 59, 59, 0.1)',
                          border: '1px solid rgba(73, 59, 59, 0.1)',
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
                            color: '#493B3B',
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
                            background: '#DDA6B0',
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
                          background: '#FDF2F4',
                          border: '1.5px solid #F3DDE2',
                          color: '#A94B59',
                          fontSize: '0.78rem',
                          fontWeight: 700,
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

          <p style={{ marginTop: '16px', fontSize: '0.8rem', color: '#857272', textAlign: 'center' }}>
            {Object.keys(poppedBalloons).length === interactiveFun.balloons.length
              ? '🎉 All balloons popped! Fully recharged for the year!'
              : 'Tap any floating balloon to pop it!'}
          </p>
        </motion.div>

        {/* Block 2: Cheerful Birthday Fortune Dispenser */}
        <motion.div
          initial={{ opacity: 0.2, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-panel"
          style={{
            padding: 'clamp(24px, 4vw, 32px) clamp(18px, 3.5vw, 26px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            border: '2px solid #F3DDE2',
            borderRadius: '22px',
            boxShadow: '0 12px 30px rgba(73, 59, 59, 0.05)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: '-10px', right: '20px', zIndex: 5 }}>
            <WashiTape width={80} height={20} color="#E9E2F5" pattern="stripes" rotate={2} />
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                marginTop: '6px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#493B3B' }}>
                🌟 Birthday Vibe Dispenser
              </h3>
              <Sparkles size={18} color="#A94B59" />
            </div>

            <p style={{ fontSize: '0.9rem', color: '#6E5D5D', marginBottom: '18px' }}>
              Tap below to draw a cheerful prediction for your upcoming chapter:
            </p>

            {/* Current Fortune Card */}
            <div
              style={{
                minHeight: '84px',
                padding: '16px 18px',
                borderRadius: '16px',
                background: '#FFF8E9',
                border: '1.5px dashed #DDA6B0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                marginBottom: '18px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentFortuneIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: '1.35rem',
                    color: '#A94B59',
                    lineHeight: 1.4,
                  }}
                >
                  “{interactiveFun.fortunes[currentFortuneIndex]}”
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handleDrawFortune}
            className="btn-cherry"
            style={{
              padding: '12px 24px',
              fontSize: '0.92rem',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Shuffle size={16} />
            <span>Draw Another Fortune 🎲</span>
          </button>
        </motion.div>

        {/* Block 3: Lighthearted Birthday Mini-Quiz */}
        <motion.div
          initial={{ opacity: 0.2, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-panel arcade-quiz-card"
          style={{
            padding: 'clamp(24px, 4vw, 32px) clamp(18px, 3.5vw, 26px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            border: '2px solid #F3DDE2',
            borderRadius: '22px',
            boxShadow: '0 12px 30px rgba(73, 59, 59, 0.05)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: '-10px', left: '20px', zIndex: 5 }}>
            <WashiTape width={80} height={20} color="#F7D6BD" pattern="dots" rotate={-3} />
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                marginTop: '6px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#493B3B' }}>
                🎯 Birthday Quick Quiz
              </h3>
              <HelpCircle size={18} color="#A94B59" />
            </div>

            <p
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#493B3B',
                marginBottom: '14px',
              }}
            >
              {interactiveFun.quiz.question}
            </p>

            {/* Quiz Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                      padding: '11px 14px',
                      borderRadius: '12px',
                      background: isSelected
                        ? option.isCorrect
                          ? '#E8F8F0'
                          : '#FDF0F3'
                        : '#FFFDF9',
                      border: isSelected
                        ? option.isCorrect
                          ? '1.5px solid #2ECC71'
                          : '1.5px solid #E74C3C'
                        : '1px solid #F3DDE2',
                      color: '#493B3B',
                      fontSize: '0.86rem',
                      fontWeight: isSelected ? 600 : 450,
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '14px',
                fontSize: '0.85rem',
                color: interactiveFun.quiz.options[selectedOption].isCorrect ? '#27AE60' : '#A94B59',
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
