import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, Volume2, VolumeX, Mic2, ListMusic, ExternalLink, Disc, Radio, AlertCircle, Video } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import MusicControls from './MusicControls';
import AlbumArt from './AlbumArt';
import { soundCtrl } from '../../utils/audio';

export default function ExpandedPlayer() {
  const {
    currentTrack,
    currentPlaylist,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    likedTrackIds,
    toggleLike,
    isExpandedPlayerOpen,
    setIsExpandedPlayerOpen,
    isLyricsOpen,
    setIsLyricsOpen,
    isQueueOpen,
    setIsQueueOpen,
    playbackError,
    retryPlayback,
    nextTrack,
    showVideoScreen,
    toggleShowVideo,
    formatTime,
  } = useMusic();

  if (!isExpandedPlayerOpen || !currentTrack) return null;
  if (typeof document === 'undefined') return null;

  const isLiked = likedTrackIds.includes(currentTrack.id);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVol = isMuted ? 0 : volume;

  const handleClose = () => {
    soundCtrl.playTap();
    setIsExpandedPlayerOpen(false);
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    seekTo(val);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  const handleLike = () => {
    soundCtrl.playTap();
    toggleLike(currentTrack.id);
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          backgroundColor: '#121212',
          backgroundImage: `radial-gradient(ellipse at 50% 25%, ${currentTrack.accentColor}33 0%, #121212 70%)`,
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(16px, 4vw, 36px)',
          overflowY: 'auto',
          color: '#FFFFFF',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '680px',
            width: '100%',
            margin: '0 auto 20px',
          }}
        >
          <button
            onClick={handleClose}
            aria-label="Minimize player"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <ChevronDown size={22} />
          </button>

          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--soundtrack-text-secondary)',
              }}
            >
              PLAYING FROM PLAYLIST
            </span>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF' }}>
              {currentPlaylist?.title || "Afraa's Soundtrack"}
            </div>
          </div>

          <div style={{ width: '40px' }} />
        </div>

        {/* Playback Error Alert in Expanded View */}
        {playbackError && (
          <div
            style={{
              maxWidth: '460px',
              width: '100%',
              margin: '0 auto 16px',
              background: 'rgba(211, 47, 47, 0.9)',
              color: '#FFFFFF',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{playbackError}</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              <button
                onClick={retryPlayback}
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  border: 'none',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Retry
              </button>
              <button
                onClick={nextTrack}
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  border: 'none',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {/* Central Content Box */}
        <div
          style={{
            maxWidth: '460px',
            width: '100%',
            margin: 'auto auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Huge Animated Album Artwork */}
          <motion.div
            key={currentTrack.id}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              maxWidth: '360px',
              aspectRatio: '1 / 1',
              marginBottom: currentTrack.sourceType === 'youtube' ? '12px' : '28px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: `0 24px 60px ${currentTrack.accentColor}33, 0 12px 24px rgba(0,0,0,0.6)`,
            }}
          >
            <AlbumArt
              title={currentTrack.title}
              gradient={currentTrack.coverGradient}
              accentColor={currentTrack.accentColor}
              icon="Music"
              size="100%"
              borderRadius={16}
            />
          </motion.div>

          {/* Video Mode Toggle for YouTube Tracks */}
          {currentTrack.sourceType === 'youtube' && (
            <button
              onClick={() => {
                soundCtrl.playTap();
                toggleShowVideo();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: showVideoScreen ? 'var(--soundtrack-green)' : 'rgba(255, 255, 255, 0.1)',
                color: showVideoScreen ? '#121212' : '#FFFFFF',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '20px',
                transition: 'all 0.2s',
              }}
            >
              <Video size={14} />
              <span>{showVideoScreen ? 'Hide Video Dock' : 'Watch Official Music Video'}</span>
            </button>
          )}

          {/* Title, Artist, & Like */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '20px',
            }}
          >
            <div style={{ flex: 1, minWidth: 0, paddingRight: '12px' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '4px',
                }}
              >
                {currentTrack.title}
              </h2>
              {currentTrack.bengaliTitle && (
                <div
                  className="bengali-text"
                  style={{
                    fontSize: '1rem',
                    color: 'var(--soundtrack-green)',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                >
                  {currentTrack.bengaliTitle}
                </div>
              )}
              <p
                style={{
                  fontSize: '0.96rem',
                  color: 'var(--soundtrack-text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentTrack.artist}
              </p>
            </div>

            <button
              onClick={handleLike}
              aria-label="Like song"
              style={{
                background: 'transparent',
                border: 'none',
                color: isLiked ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-muted)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Heart size={26} fill={isLiked ? 'var(--soundtrack-green)' : 'none'} />
            </button>
          </div>

          {/* External Streaming Quick Links */}
          {(currentTrack.spotifyUrl || currentTrack.youtubeUrl) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--soundtrack-text-muted)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Studio:
              </span>
              {currentTrack.spotifyUrl && (
                <a
                  href={currentTrack.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soundtrack-stream-btn spotify"
                  title="Open original master in Spotify"
                >
                  <Disc size={13} />
                  <span>Spotify</span>
                  <ExternalLink size={10} />
                </a>
              )}
              {currentTrack.youtubeUrl && (
                <a
                  href={currentTrack.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soundtrack-stream-btn youtube"
                  title="Open original master in YouTube Music"
                >
                  <Radio size={13} />
                  <span>YouTube Music</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
          )}

          {/* Scrubbable Seekbar Timeline */}
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <input
              type="range"
              min="0"
              max={duration || 188}
              step="0.5"
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek progress"
              className="soundtrack-slider"
              style={{
                width: '100%',
                background: `linear-gradient(to right, var(--soundtrack-green) 0%, var(--soundtrack-green) ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%, rgba(255,255,255,0.2) 100%)`,
                marginBottom: '8px',
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: 'var(--soundtrack-text-muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Large Primary Playback Controls */}
          <div style={{ marginBottom: '28px' }}>
            <MusicControls size="large" showShuffleRepeat={true} />
          </div>

          {/* Bottom Bar: Lyrics & Queue Toggles + Volume */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <button
              onClick={() => {
                soundCtrl.playTap();
                setIsLyricsOpen(true);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--soundtrack-border)',
                borderRadius: '9999px',
                padding: '6px 14px',
                color: isLyricsOpen ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Mic2 size={15} />
              <span>Lyrics</span>
            </button>

            <button
              onClick={() => {
                soundCtrl.playTap();
                setIsQueueOpen(true);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--soundtrack-border)',
                borderRadius: '9999px',
                padding: '6px 14px',
                color: isQueueOpen ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ListMusic size={15} />
              <span>Queue</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => {
                  soundCtrl.playTap();
                  toggleMute();
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isMuted ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                {isMuted || currentVol === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={currentVol}
                onChange={handleVolume}
                aria-label="Expanded volume"
                className="soundtrack-slider"
                style={{
                  width: '74px',
                  background: `linear-gradient(to right, var(--soundtrack-green) 0%, var(--soundtrack-green) ${currentVol * 100}%, rgba(255,255,255,0.2) ${currentVol * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
