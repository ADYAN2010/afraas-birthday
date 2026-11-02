import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Crown, HeartHandshake, Heart, Gift, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import { triggerSparkleBurst } from '../utils/confetti';

const iconMap = {
  Sparkles: Sparkles,
  Star: Star,
  Crown: Crown,
  HeartHandshake: HeartHandshake,
  Heart: Heart,
  Gift: Gift,
};

export default function Wishes() {
  const { reasonsToSmile } = birthdayData;
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
        padding: '90px 24px',
        maxWidth: '1180px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* Header */}
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
            background: 'rgba(196, 177, 252, 0.12)',
            border: '1px solid rgba(196, 177, 252, 0.35)',
            color: '#c4b1fc',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={14} />
          <span>REASONS TO SMILE</span>
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
          {reasonsToSmile.heading}
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
          “{reasonsToSmile.subtitle}”
        </p>
      </motion.div>

      {/* Grid of Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {reasonsToSmile.items.map((item, index) => {
          const IconComponent = iconMap[item.icon] || Sparkles;
          const isExpanded = activeCard === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              whileHover={{ y: -6 }}
              onClick={(e) => toggleCard(item.id, e)}
              className="glass-panel"
              style={{
                cursor: 'pointer',
                padding: '30px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                border: isExpanded
                  ? '1px solid rgba(223, 182, 91, 0.6)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                background: isExpanded
                  ? 'linear-gradient(145deg, rgba(38, 20, 64, 0.9) 0%, rgba(20, 9, 36, 0.95) 100%)'
                  : 'linear-gradient(145deg, rgba(28, 14, 48, 0.6) 0%, rgba(15, 6, 26, 0.75) 100%)',
                boxShadow: isExpanded
                  ? '0 18px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(223, 182, 91, 0.25)'
                  : '0 10px 25px rgba(0, 0, 0, 0.35)',
              }}
            >
              {/* Top Accent Icon & Badge */}
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: 'rgba(223, 182, 91, 0.12)',
                      border: '1px solid rgba(223, 182, 91, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffd166',
                    }}
                  >
                    <IconComponent size={22} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-sans)',
                      color: '#9e8fb8',
                      letterSpacing: '0.1em',
                    }}
                  >
                    0{item.id}
                  </span>
                </div>

                {/* Card Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    marginBottom: '10px',
                    color: '#faf8f5',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>

                {/* Short or Full Description */}
                <p
                  style={{
                    fontSize: '0.94rem',
                    color: isExpanded ? '#faeed1' : '#c4b1fc',
                    lineHeight: 1.65,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {isExpanded ? item.fullNote : item.shortDesc}
                </p>
              </div>

              {/* Bottom Expand Toggle Link */}
              <div
                style={{
                  marginTop: '22px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#dfb65b',
                }}
              >
                <span>{isExpanded ? 'Close message' : 'Tap to read note'}</span>
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
