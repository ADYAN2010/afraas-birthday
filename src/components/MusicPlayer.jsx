import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1, Play, Pause, Bell, BellOff, ChevronDown, Sliders } from 'lucide-react';
import { soundCtrl } from '../utils/audio';

export default function MusicPlayer({ autoStarted = false }) {
  const [audioState, setAudioState] = useState(soundCtrl.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Subscribe to soundCtrl updates
    const unsubscribe = soundCtrl.subscribe((state) => {
      setAudioState(state);
    });

    // Start music only after explicit user gate interaction
    if (autoStarted && !soundCtrl.isPlayingMusic) {
      soundCtrl.startAmbientMusic();
    }

    return () => unsubscribe();
  }, [autoStarted]);

  // Click outside to collapse detailed panel
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    soundCtrl.toggleMusic();
  };

  const handleToggleMusicMute = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    soundCtrl.toggleMusicMute();
  };

  const handleToggleSfx = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    soundCtrl.toggleSfxUserEnabled();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    soundCtrl.setMusicVolume(val);
  };

  const isPlaying = audioState.isPlaying && !audioState.isMusicMuted;
  const currentVolume = audioState.isMusicMuted ? 0 : audioState.volume;

  const getVolumeIcon = () => {
    if (audioState.isMusicMuted || currentVolume === 0) return <VolumeX size={16} />;
    if (currentVolume < 0.4) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 'clamp(12px, 2.5vh, 20px)',
        right: 'clamp(12px, 2.5vw, 22px)',
        zIndex: 90,
      }}
      aria-label="Audio & Music Controls"
    >
      {/* Main Floating Pill Trigger */}
      <motion.div
        id="music-player-widget"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '7px 14px',
          minHeight: '42px',
          borderRadius: '9999px',
          background: 'rgba(255, 253, 248, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid #F3DDE2',
          boxShadow: isPlaying
            ? '0 6px 20px rgba(169, 75, 89, 0.16)'
            : '0 4px 12px rgba(73, 59, 59, 0.08)',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 0.3s ease',
        }}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {/* Play / Pause Quick Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={audioState.isPlaying ? 'Pause music' : 'Play music'}
          style={{
            background: isPlaying ? '#FDF2F4' : '#FFF8E9',
            border: '1px solid #F3DDE2',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#A94B59',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          {audioState.isPlaying ? <Pause size={13} fill="#A94B59" /> : <Play size={13} fill="#A94B59" style={{ marginLeft: '1px' }} />}
        </button>

        {/* Animated Equalizer Bars */}
        {isPlaying ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '14px' }}>
            <span className="equalizer-bar bar-1" />
            <span className="equalizer-bar bar-2" />
            <span className="equalizer-bar bar-3" />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '14px', opacity: 0.4 }}>
            <span style={{ width: '2.5px', height: '4px', background: '#857272', borderRadius: '1px' }} />
            <span style={{ width: '2.5px', height: '6px', background: '#857272', borderRadius: '1px' }} />
            <span style={{ width: '2.5px', height: '4px', background: '#857272', borderRadius: '1px' }} />
          </div>
        )}

        {/* Status Text */}
        <span
          style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            color: isPlaying ? '#A94B59' : '#857272',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {isPlaying ? 'Melody Playing' : audioState.isMusicMuted ? 'Muted' : 'Music Paused'}
        </span>

        {/* Expand / Details Toggle Chevron */}
        <div
          style={{
            color: '#A94B59',
            display: 'flex',
            alignItems: 'center',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <ChevronDown size={14} />
        </div>
      </motion.div>

      {/* Expanded Audio Settings Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="music-settings-panel"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: 'min(300px, 86vw)',
              background: '#FFFDF9',
              border: '1.5px solid #F3DDE2',
              borderRadius: '20px',
              padding: '18px 20px',
              boxShadow: '0 16px 36px rgba(73, 59, 59, 0.12), 0 2px 8px rgba(169, 75, 89, 0.05)',
              zIndex: 95,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                paddingBottom: '8px',
                borderBottom: '1px dashed #F3DDE2',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} color="#A94B59" />
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#A94B59',
                  }}
                >
                  Sound Settings
                </span>
              </div>

              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-handwritten)',
                  color: '#857272',
                }}
              >
                handcrafted tunes 🎵
              </span>
            </div>

            {/* Music Controls Row: Play/Pause + Mute */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#493B3B', fontWeight: 600 }}>
                Background Music
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handleTogglePlay}
                  style={{
                    background: audioState.isPlaying ? '#FDF2F4' : '#FFF8E9',
                    border: '1px solid #F3DDE2',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#A94B59',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {audioState.isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  <span>{audioState.isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={handleToggleMusicMute}
                  aria-label={audioState.isMusicMuted ? 'Unmute music' : 'Mute music'}
                  style={{
                    background: audioState.isMusicMuted ? '#FDF2F4' : '#FFFDF8',
                    border: '1px solid #F3DDE2',
                    borderRadius: '8px',
                    padding: '5px 8px',
                    color: audioState.isMusicMuted ? '#A94B59' : '#493B3B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getVolumeIcon()}
                </button>
              </div>
            </div>

            {/* Volume Slider Control */}
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                  fontSize: '0.76rem',
                  color: '#857272',
                }}
              >
                <span>Volume</span>
                <span style={{ fontWeight: 700, color: '#A94B59' }}>
                  {Math.round(currentVolume * 100)}%
                </span>
              </div>

              <input
                id="music-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={currentVolume}
                onChange={handleVolumeChange}
                aria-label="Music volume slider"
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: `linear-gradient(to right, #A94B59 0%, #A94B59 ${currentVolume * 100}%, #F3DDE2 ${currentVolume * 100}%, #F3DDE2 100%)`,
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Sound Effects (SFX) Independent Toggle */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                paddingTop: '10px',
                borderTop: '1px dashed #F3DDE2',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {!audioState.isSfxUserEnabled ? (
                    <BellOff size={14} color="#857272" />
                  ) : audioState.isMusicPriorityActive ? (
                    <BellOff size={14} color="#A94B59" />
                  ) : (
                    <Bell size={14} color="#A94B59" />
                  )}
                  <span style={{ fontSize: '0.82rem', color: '#493B3B', fontWeight: 600 }}>
                    Sound Effects
                  </span>
                </div>

                <button
                  onClick={handleToggleSfx}
                  title={
                    !audioState.isSfxUserEnabled
                      ? 'Sound effects disabled'
                      : audioState.isMusicPriorityActive
                      ? 'Temporarily suppressed while music is playing'
                      : 'Sound effects enabled'
                  }
                  style={{
                    background: !audioState.isSfxUserEnabled
                      ? '#FFF8E9'
                      : audioState.isMusicPriorityActive
                      ? '#FFF4ED'
                      : '#FDF2F4',
                    border: `1px solid ${
                      !audioState.isSfxUserEnabled
                        ? '#F3DDE2'
                        : audioState.isMusicPriorityActive
                        ? '#FCD5B5'
                        : '#DDA6B0'
                    }`,
                    borderRadius: '9999px',
                    padding: '3px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: !audioState.isSfxUserEnabled
                      ? '#857272'
                      : audioState.isMusicPriorityActive
                      ? '#B25E1A'
                      : '#A94B59',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {!audioState.isSfxUserEnabled
                    ? 'SFX: OFF'
                    : audioState.isMusicPriorityActive
                    ? 'MUTED (MUSIC ACTIVE)'
                    : 'SFX: ON'}
                </button>
              </div>

              {/* Informative helper note explaining priority mode */}
              <div
                style={{
                  fontSize: '0.68rem',
                  color: audioState.isMusicPriorityActive && audioState.isSfxUserEnabled ? '#B25E1A' : '#857272',
                  lineHeight: 1.3,
                  fontFamily: 'var(--font-sans)',
                  paddingLeft: '20px',
                }}
              >
                {!audioState.isSfxUserEnabled
                  ? 'Disabled by user preference.'
                  : audioState.isMusicPriorityActive
                  ? 'Auto-muted to protect music — restores automatically when paused.'
                  : 'Active & will play with taps, candles, and cards.'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .equalizer-bar {
          display: inline-block;
          width: 2.5px;
          background: #A94B59;
          border-radius: 2px;
          animation: eqBounce 1.2s ease-in-out infinite alternate;
        }
        .bar-1 { height: 6px; animation-delay: 0.1s; }
        .bar-2 { height: 13px; animation-delay: 0.3s; }
        .bar-3 { height: 9px; animation-delay: 0.2s; }

        @keyframes eqBounce {
          0% { height: 3px; }
          100% { height: 13px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .equalizer-bar {
            animation: none !important;
            height: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
