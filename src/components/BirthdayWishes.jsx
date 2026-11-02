import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Smile, Trophy, Camera, Compass, Sun, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst } from '../utils/confetti';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import WashiTape from './svg/WashiTape';

const iconMap = {
  Smile: Smile,
  Trophy: Trophy,
  Camera: Camera,
  Compass: Compass,
  Sun: Sun,
  Sparkles: Sparkles,
};

const cardTapeStyles = [
  { color: '#F3DDE2', angle: -2, pattern: 'dots' },
  { color: '#E9E2F5', angle: 3, pattern: 'stripes' },
  { color: '#F7D6BD', angle: -3, pattern: 'dots' },
  { color: '#DDA6B0', angle: 2, pattern: 'stripes' },
  { color: '#E9E2F5', angle: -2, pattern: 'dots' },
  { color: '#F3DDE2', angle: 3, pattern: 'stripes' },
];

export default function BirthdayWishes() {
  const { wishes } = birthdayData;
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (id, e) => {
    if (activeCard !== id) {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerSparkleBurst(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
      setActiveCard(id);
    } else {
      setActiveCard(null);
    }
  };

  return (
    <section
      id="wishes-section"
      style={{
        position: 'relative',
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3.5vw, 24px)',
        maxWidth: '1180px',
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
          <Sparkles size={13} color="#A94B59" />
          <span>INSPIRING WISHES</span>
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
          {wishes.heading}
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
          “{wishes.subtitle}”
        </p>
      </motion.div>

      {/* Responsive Grid of Scrapbook Note Cards */}
      <div className="wishes-grid">
        {wishes.items.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Sparkles;
          const isExpanded = activeCard === item.id;
          const tapeStyle = cardTapeStyles[index % cardTapeStyles.length];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0.2, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ delay: index * 0.08, duration: 0.7 }}
              whileHover={{ y: -5 }}
              onClick={(e) => toggleCard(item.id, e)}
              className="glass-panel"
              style={{
                cursor: 'pointer',
                padding: 'clamp(24px, 4vw, 32px) clamp(18px, 3.5vw, 26px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '230px',
                borderRadius: '22px',
                border: isExpanded ? '2px solid #A94B59' : '1.5px solid #F3DDE2',
                background: isExpanded ? '#FFF9FA' : '#FFFFFF',
                boxShadow: isExpanded
                  ? '0 16px 36px rgba(169, 75, 89, 0.12), 0 2px 8px rgba(73, 59, 59, 0.04)'
                  : '0 8px 24px rgba(73, 59, 59, 0.05)',
                transition: 'all 0.35s ease',
              }}
            >
              {/* Washi Tape Strip at top */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: index % 2 === 0 ? '20px' : 'auto',
                  right: index % 2 === 0 ? 'auto' : '20px',
                  zIndex: 5,
                }}
              >
                <WashiTape
                  width={80}
                  height={20}
                  color={tapeStyle.color}
                  pattern={tapeStyle.pattern}
                  rotate={tapeStyle.angle}
                />
              </div>

              {/* Top Accent Icon & Badge */}
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
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: isExpanded ? '#FDF2F4' : '#FFF8E9',
                      border: '1.5px solid #F3DDE2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#A94B59',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconComponent size={22} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-handwritten)',
                      color: '#A94B59',
                      fontWeight: 700,
                    }}
                  >
                    Wish #{item.id}
                  </span>
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    marginBottom: '8px',
                    color: '#493B3B',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>

                {/* Detail */}
                <p
                  style={{
                    fontSize: '0.94rem',
                    color: '#6E5D5D',
                    lineHeight: 1.65,
                  }}
                >
                  {item.detail}
                </p>
              </div>

              {/* Bottom Expand Toggle Link */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '14px',
                  borderTop: '1px dashed #F3DDE2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#A94B59',
                }}
              >
                <span>{isExpanded ? 'Wish active ✨' : 'Click to highlight'}</span>
                <ChevronRight
                  size={16}
                  style={{
                    transform: isExpanded ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
