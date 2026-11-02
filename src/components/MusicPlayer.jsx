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
        top: 'clamp(12px, 2.5vh, 22px)',
        right: 'clamp(12px, 2.5vw, 22px)',
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
          gap: '8px',
          padding: 'clamp(8px, 1.5vh, 10px) clamp(14px, 2.5vw, 18px)',
          minHeight: '44px',
          borderRadius: '9999px',
          background: 'rgba(255, 253, 248, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid #F3DDE2',
          boxShadow: isPlaying
            ? '0 6px 18px rgba(169, 75, 89, 0.15)'
            : '0 4px 12px rgba(73, 59, 59, 0.08)',
          color: isPlaying ? '#A94B59' : '#6E5D5D',
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
            <Volume2 size={16} color="#A94B59" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.02em' }}>
              Melody Playing 🎵
            </span>
          </>
        ) : (
          <>
            <Music size={16} color="#857272" />
            <VolumeX size={16} color="#857272" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.02em', color: '#857272' }}>
              {hasInteracted ? 'Music Muted' : 'Play Music'}
            </span>
          </>
        )}
      </button>

      <style>{`
        .equalizer-bar {
          display: inline-block;
          width: 3px;
          background: #A94B59;
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
