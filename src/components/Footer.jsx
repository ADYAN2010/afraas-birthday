import React from 'react';
import { Sparkles, PartyPopper } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import CuteFlower from './svg/CuteFlower';

export default function Footer() {
  const { footer } = birthdayData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: 'clamp(44px, 6vw, 64px) clamp(16px, 4vw, 24px) clamp(32px, 5vw, 52px)',
        textAlign: 'center',
        borderTop: '2px dashed #F3DDE2',
        background: 'linear-gradient(180deg, transparent 0%, rgba(243, 221, 226, 0.25) 100%)',
        zIndex: 2,
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Back to top button */}
        <div
          onClick={scrollToTop}
          title="Back to top"
          role="button"
          tabIndex={0}
          aria-label="Back to top"
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '46px',
            height: '46px',
            minWidth: '46px',
            minHeight: '46px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1.5px solid #F3DDE2',
            color: '#A94B59',
            marginBottom: '18px',
            boxShadow: '0 4px 12px rgba(73, 59, 59, 0.06)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <Sparkles size={18} />
        </div>

        {/* Heading */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            color: '#493B3B',
            marginBottom: '6px',
          }}
        >
          {footer.heading}
        </p>

        {/* Closing Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: '1.35rem',
            color: '#A94B59',
            marginBottom: '18px',
          }}
        >
          “{footer.tagline}”
        </p>

        {/* Attribution / Date */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '0.86rem',
            color: '#6E5D5D',
            letterSpacing: '0.04em',
            fontWeight: 500,
          }}
        >
          <PartyPopper size={14} color="#A94B59" />
          <span>{footer.date}</span>
          <span>•</span>
          <span>Happy Birthday, Afraa! 🎂</span>
        </div>

        {footer.signatureNote && (
          <p
            style={{
              marginTop: '10px',
              fontSize: '0.8rem',
              color: '#857272',
              fontStyle: 'italic',
              letterSpacing: '0.03em',
            }}
          >
            {footer.signatureNote}
          </p>
        )}
      </div>
    </footer>
  );
}
