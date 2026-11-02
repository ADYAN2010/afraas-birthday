import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundCtrl } from '../utils/audio';

export default function MusicPlayer({ autoStarted = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (autoStarted && !isPlaying) {
      soundCtrl.startAmbientMusic();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  }, [autoStarted]);

  const handleToggle = () => {
    setHasInteracted(true);
    const active = soundCtrl.toggleMusic();
    setIsPlaying(active);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 90,
      }}
    >
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause ambient melody' : 'Play ambient melody'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 18px',
          borderRadius: '9999px',
          background: 'rgba(26, 11, 46, 0.78)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(223, 182, 91, 0.35)',
          boxShadow: isPlaying
            ? '0 6px 20px rgba(223, 182, 91, 0.25), 0 0 12px rgba(223, 182, 91, 0.2)'
            : '0 4px 14px rgba(0, 0, 0, 0.4)',
          color: isPlaying ? '#faeed1' : '#d8c8ff',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        {isPlaying ? (
          <>
            {/* Animated Audio Equalizer Bars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '14px' }}>
              <span className="equalizer-bar bar-1" />
              <span className="equalizer-bar bar-2" />
              <span className="equalizer-bar bar-3" />
            </div>
            <Volume2 size={16} color="#dfb65b" />
            <span style={{ fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.03em' }}>
              Melody Playing
            </span>
          </>
        ) : (
          <>
            <Music size={16} color="#a69bb8" />
            <VolumeX size={16} color="#a69bb8" />
            <span style={{ fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.03em', color: '#a69bb8' }}>
              {hasInteracted ? 'Music Muted' : 'Play Music'}
            </span>
          </>
        )}
      </button>

      <style>{`
        .equalizer-bar {
          display: inline-block;
          width: 3px;
          background: #dfb65b;
          border-radius: 2px;
          animation: eqBounce 1.2s ease-in-out infinite alternate;
        }
        .bar-1 { height: 8px; animation-delay: 0.1s; }
        .bar-2 { height: 14px; animation-delay: 0.3s; }
        .bar-3 { height: 10px; animation-delay: 0.2s; }

        @keyframes eqBounce {
          0% { height: 4px; }
          100% { height: 14px; }
        }
      `}</style>
    </div>
  );
}
