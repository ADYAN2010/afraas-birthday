import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Volume1,
  Play,
  Pause,
  Bell,
  BellOff,
  ChevronDown,
  Sliders,
  ExternalLink,
  Music2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { soundCtrl } from '../utils/audio';

const YOUTUBE_VIDEO_ID = 'zcWrDar0Mkk';
const TRACK_TITLE = 'Happy Birthday Background Music';
const TRACK_ARTIST = 'Liborio Conti';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=zcWrDar0Mkk';

export default function MusicPlayer({ autoStarted = false }) {
  const [audioState, setAudioState] = useState(soundCtrl.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const containerRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const autoStartedRef = useRef(autoStarted);

  useEffect(() => {
    autoStartedRef.current = autoStarted;
  }, [autoStarted]);

  // Subscribe to central soundCtrl state updates
  useEffect(() => {
    const unsubscribe = soundCtrl.subscribe((state) => {
      setAudioState(state);

      // Auto-pause background YouTube player whenever dedicated music library track plays
      if (state.isMusicPlayerActive && ytPlayerRef.current) {
        try {
          if (typeof ytPlayerRef.current.pauseVideo === 'function') {
            ytPlayerRef.current.pauseVideo();
          }
        } catch (e) {
          // Ignore pause errors
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Initialize YouTube IFrame Player API
  useEffect(() => {
    let isCancelled = false;

    const setupPlayer = () => {
      if (isCancelled) return;
      if (!window.YT || !window.YT.Player) return;

      const mount = document.getElementById('bg-youtube-player-mount');
      if (!mount) return;

      try {
        ytPlayerRef.current = new window.YT.Player('bg-youtube-player-mount', {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            playsinline: 1,
            modestbranding: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
          },
          events: {
            onReady: (event) => {
              if (isCancelled) return;
              setIsPlayerReady(true);
              soundCtrl.registerBgYouTubePlayer(event.target);

              // Apply saved volume and mute preferences
              const initialVol = Math.round(soundCtrl.musicVolume * 100);
              event.target.setVolume(initialVol);
              if (soundCtrl.isMusicMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }

              // If triggered after explicit unlock button interaction
              if (autoStartedRef.current && !soundCtrl.isMusicPlayerActive) {
                try {
                  event.target.playVideo();
                } catch (e) {
                  // User interaction restrictions handled gracefully
                }
              }
            },
            onStateChange: (event) => {
              if (isCancelled) return;
              // 1: PLAYING, 2: PAUSED, 0: ENDED, 3: BUFFERING
              if (event.data === 1) {
                setIsPlaying(true);
                setIsBuffering(false);
                soundCtrl.isPlayingMusic = true;
                soundCtrl.updateSfxGain();
                soundCtrl.notify();
              } else if (event.data === 2) {
                setIsPlaying(false);
                setIsBuffering(false);
                soundCtrl.isPlayingMusic = false;
                soundCtrl.updateSfxGain();
                soundCtrl.notify();
              } else if (event.data === 0) {
                // Loop continuous background playback
                event.target.playVideo();
              } else if (event.data === 3) {
                setIsBuffering(true);
              }
            },
            onError: (event) => {
              if (isCancelled) return;
              console.warn('YouTube Background Player Error code:', event.data);
              setHasError(true);
              setErrorMessage('Playback restricted or unavailable. Tap link to listen on YouTube.');
            },
          },
        });
      } catch (err) {
        console.warn('Failed to initialize YouTube IFrame Player:', err);
      }
    };

    // Load YouTube API script if not present
    if (typeof window !== 'undefined') {
      if (window.YT && window.YT.Player) {
        setupPlayer();
      } else {
        const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
        if (!existingScript) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          document.head.appendChild(tag);
        }

        const prevReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (prevReady) prevReady();
          setupPlayer();
        };
      }
    }

    return () => {
      isCancelled = true;
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  // Handle autoStarted trigger from explicit unlock click
  useEffect(() => {
    if (autoStarted && isPlayerReady && ytPlayerRef.current && !soundCtrl.isMusicPlayerActive) {
      try {
        ytPlayerRef.current.playVideo();
      } catch (e) {
        // Handled
      }
    }
  }, [autoStarted, isPlayerReady]);

  // Click outside listener to collapse settings panel
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Controls Handlers
  const handleTogglePlay = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();

    if (!ytPlayerRef.current || !isPlayerReady) return;

    try {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        // When starting background music, pause dedicated music player if active
        ytPlayerRef.current.playVideo();
      }
    } catch (err) {
      console.warn('Play/pause error:', err);
    }
  };

  const handleToggleMusicMute = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    const newMuted = soundCtrl.toggleMusicMute();
    if (ytPlayerRef.current) {
      try {
        if (newMuted) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(Math.round(soundCtrl.musicVolume * 100));
        }
      } catch (err) {}
    }
  };

  const handleToggleSfx = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    soundCtrl.toggleSfxUserEnabled();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    soundCtrl.setMusicVolume(val);
    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(Math.round(val * 100));
        if (soundCtrl.isMusicMuted && val > 0) {
          soundCtrl.toggleMusicMute();
          ytPlayerRef.current.unMute();
        }
      } catch (err) {}
    }
  };

  const currentVolume = audioState.isMusicMuted ? 0 : audioState.volume;

  const getVolumeIcon = () => {
    if (audioState.isMusicMuted || currentVolume === 0) return <VolumeX size={15} />;
    if (currentVolume < 0.4) return <Volume1 size={15} />;
    return <Volume2 size={15} />;
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
      aria-label="Birthday Soundtrack Controls"
    >
      {/* Floating Pill Trigger */}
      <motion.div
        id="music-player-widget"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          minHeight: '42px',
          borderRadius: '9999px',
          background: 'rgba(255, 253, 248, 0.96)',
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
        {/* Play / Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
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
          {isPlaying ? <Pause size={13} fill="#A94B59" /> : <Play size={13} fill="#A94B59" style={{ marginLeft: '1px' }} />}
        </button>

        {/* Animated Equalizer Bars */}
        {isPlaying ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '14px' }}>
            <span className="bg-eq-bar bar-1" />
            <span className="bg-eq-bar bar-2" />
            <span className="bg-eq-bar bar-3" />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '14px', opacity: 0.4 }}>
            <span style={{ width: '2.5px', height: '4px', background: '#857272', borderRadius: '1px' }} />
            <span style={{ width: '2.5px', height: '6px', background: '#857272', borderRadius: '1px' }} />
            <span style={{ width: '2.5px', height: '4px', background: '#857272', borderRadius: '1px' }} />
          </div>
        )}

        {/* Track Label */}
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: 0 }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              color: isPlaying ? '#A94B59' : '#493B3B',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '150px',
            }}
          >
            {isPlaying ? 'Birthday Soundtrack' : audioState.isMusicMuted ? 'Muted' : 'Soundtrack Paused'}
          </span>
          <span
            style={{
              fontSize: '0.66rem',
              color: '#857272',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Liborio Conti
          </span>
        </div>

        {/* Expand / Collapse Chevron */}
        <div
          style={{
            color: '#A94B59',
            display: 'flex',
            alignItems: 'center',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            marginLeft: '2px',
          }}
        >
          <ChevronDown size={14} />
        </div>
      </motion.div>

      {/* Expanded Visible Player & Controls Panel */}
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
              width: 'min(310px, 90vw)',
              background: '#FFFDF8',
              border: '1.5px solid #F3DDE2',
              borderRadius: '20px',
              padding: '16px 18px',
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
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px dashed #F3DDE2',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Music2 size={15} color="#A94B59" />
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#A94B59',
                  }}
                >
                  Birthday Music
                </span>
              </div>

              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-handwritten)',
                  color: '#857272',
                }}
              >
                Official Instrumental ✨
              </span>
            </div>

            {/* Official Visible YouTube IFrame Player Container */}
            <div
              style={{
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#000000',
                aspectRatio: '16 / 9',
                marginBottom: '12px',
                border: '1px solid #F3DDE2',
                position: 'relative',
              }}
            >
              <div id="bg-youtube-player-mount" style={{ width: '100%', height: '100%' }} />
              {isBuffering && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.4)',
                    color: '#FFF',
                    fontSize: '0.75rem',
                    pointerEvents: 'none',
                  }}
                >
                  Buffering...
                </div>
              )}
            </div>

            {/* Track Info & Official YouTube Link */}
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: '#493B3B',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={TRACK_TITLE}
              >
                {TRACK_TITLE}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '2px',
                }}
              >
                <span style={{ fontSize: '0.74rem', color: '#857272' }}>{TRACK_ARTIST}</span>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.7rem',
                    color: '#A94B59',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontWeight: 600,
                  }}
                  title="Open video on YouTube"
                >
                  <span>YouTube</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Error Message Notice if any */}
            {hasError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: '#FFF5F5',
                  border: '1px solid #FFD1D1',
                  color: '#C53030',
                  fontSize: '0.72rem',
                  marginBottom: '12px',
                }}
              >
                <AlertCircle size={13} flexShrink={0} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Play/Pause & Mute Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '0.82rem', color: '#493B3B', fontWeight: 600 }}>Playback</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handleTogglePlay}
                  style={{
                    background: isPlaying ? '#FDF2F4' : '#FFF8E9',
                    border: '1px solid #F3DDE2',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: '#A94B59',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={handleToggleMusicMute}
                  aria-label={audioState.isMusicMuted ? 'Unmute' : 'Mute'}
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
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                  fontSize: '0.74rem',
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
                aria-label="Volume slider"
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

            {/* Sound Effects Toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px dashed #F3DDE2',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {!audioState.isSfxUserEnabled ? (
                  <BellOff size={13} color="#857272" />
                ) : (
                  <Bell size={13} color="#A94B59" />
                )}
                <span style={{ fontSize: '0.8rem', color: '#493B3B', fontWeight: 600 }}>
                  Sound Effects
                </span>
              </div>

              <button
                onClick={handleToggleSfx}
                style={{
                  background: !audioState.isSfxUserEnabled ? '#FFF8E9' : '#FDF2F4',
                  border: `1px solid ${!audioState.isSfxUserEnabled ? '#F3DDE2' : '#DDA6B0'}`,
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: !audioState.isSfxUserEnabled ? '#857272' : '#A94B59',
                  cursor: 'pointer',
                }}
              >
                {!audioState.isSfxUserEnabled ? 'SFX: OFF' : 'SFX: ON'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .bg-eq-bar {
          display: inline-block;
          width: 2.5px;
          background: #A94B59;
          border-radius: 2px;
          animation: bgEqBounce 1.2s ease-in-out infinite alternate;
        }
        .bar-1 { height: 6px; animation-delay: 0.1s; }
        .bar-2 { height: 13px; animation-delay: 0.3s; }
        .bar-3 { height: 9px; animation-delay: 0.2s; }

        @keyframes bgEqBounce {
          0% { height: 3px; }
          100% { height: 13px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-eq-bar {
            animation: none !important;
            height: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
