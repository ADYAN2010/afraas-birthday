import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';

export default function Footer() {
  const { footer, recipient } = birthdayData;

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

        {/* Closing Quote */}
        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            color: '#faeed1',
            marginBottom: '18px',
          }}
        >
          {footer.quote}
        </p>

        {/* Attribution */}
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
          <span>{footer.credit}</span>
          <span>•</span>
          <Heart size={13} color="#e0688c" fill="#e0688c" />
          <span>•</span>
          <span>{footer.year}</span>
        </div>
      </div>
    </footer>
  );
}
