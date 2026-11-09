import React from 'react';
import { X, Mic2, Music } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { soundCtrl } from '../../utils/audio';

export default function LyricsPanel() {
  const { currentTrack, currentTime, setIsLyricsOpen } = useMusic();

  const handleClose = () => {
    soundCtrl.playTap();
    setIsLyricsOpen(false);
  };

  if (!currentTrack) return null;

  const lyrics = currentTrack.lyrics;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(18, 18, 18, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(20px, 4vw, 36px)',
        overflowY: 'auto',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          borderBottom: '1px solid var(--soundtrack-border)',
          paddingBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Mic2 size={20} color="var(--soundtrack-green)" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              Lyrics — {currentTrack.title}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--soundtrack-text-secondary)' }}>
              {currentTrack.artist}
            </span>
          </div>
        </div>

        <button
          onClick={handleClose}
          aria-label="Close lyrics"
          style={{
            background: 'var(--soundtrack-elevated)',
            border: '1px solid var(--soundtrack-border)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--soundtrack-text-secondary)',
            cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Lyrics Content */}
      <div style={{ flex: 1, maxWidth: '680px', margin: '0 auto', width: '100%' }}>
        {lyrics ? (
          Array.isArray(lyrics) ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {lyrics.map((line, idx) => {
                // Determine if this line is currently active
                const isLineActive =
                  currentTime >= line.time &&
                  (idx === lyrics.length - 1 || currentTime < lyrics[idx + 1].time);

                return (
                  <p
                    key={idx}
                    style={{
                      fontSize: isLineActive ? '1.45rem' : '1.15rem',
                      fontWeight: isLineActive ? 800 : 600,
                      color: isLineActive ? 'var(--soundtrack-green)' : 'rgba(255, 255, 255, 0.45)',
                      lineHeight: 1.45,
                      margin: 0,
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                  >
                    {line.text}
                  </p>
                );
              })}
            </div>
          ) : (
            <p
              style={{
                fontSize: '1.15rem',
                color: '#FFFFFF',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}
            >
              {lyrics}
            </p>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--soundtrack-text-secondary)' }}>
            <Music size={42} color="var(--soundtrack-text-muted)" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '8px' }}>
              Instrumental Composition
            </h4>
            <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.5 }}>
              This acoustic track is purely melodic. Enjoy the soothing instruments and peaceful rhythm.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
