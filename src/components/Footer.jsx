import React from 'react';
import { Sparkles, PartyPopper } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';

export default function Footer() {
  const { footer } = birthdayData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '60px 24px 50px',
        textAlign: 'center',
        borderTop: '1px solid rgba(223, 182, 91, 0.18)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(13, 6, 23, 0.8) 100%)',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Back to top star button */}
        <div
          onClick={scrollToTop}
          title="Back to top"
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(223, 182, 91, 0.1)',
            border: '1px solid rgba(223, 182, 91, 0.3)',
            color: '#dfb65b',
            marginBottom: '20px',
            transition: 'transform 0.3s ease',
          }}
        >
          <Sparkles size={18} />
        </div>

        {/* Heading */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            color: '#faeed1',
            marginBottom: '10px',
          }}
        >
          {footer.heading}
        </p>

        {/* Closing Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: '1.15rem',
            color: '#c4b1fc',
            marginBottom: '20px',
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
            fontSize: '0.84rem',
            color: '#8d7a9f',
            letterSpacing: '0.04em',
          }}
        >
          <PartyPopper size={14} color="#dfb65b" />
          <span>{footer.date}</span>
          <span>•</span>
          <span>Happy Birthday, Afraa! 🎂</span>
        </div>

        {footer.signatureNote && (
          <p
            style={{
              marginTop: '12px',
              fontSize: '0.78rem',
              color: '#7b6890',
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
