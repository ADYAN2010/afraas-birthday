import React from 'react';
import { Heart, Volume2, VolumeX, Volume1, Maximize2, Mic2, ListMusic, Play, Pause, AlertCircle, Video, Loader2 } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import MusicControls from './MusicControls';
import AlbumArt from './AlbumArt';
import { soundCtrl } from '../../utils/audio';

export default function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    playbackError,
    retryPlayback,
    togglePlay,
    nextTrack,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    likedTrackIds,
    toggleLike,
    isLyricsOpen,
    setIsLyricsOpen,
    isQueueOpen,
    setIsQueueOpen,
    setIsExpandedPlayerOpen,
    showVideoScreen,
    toggleShowVideo,
    formatTime,
  } = useMusic();

  if (!currentTrack) return null;

  const isLiked = likedTrackIds.includes(currentTrack.id);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVol = isMuted ? 0 : volume;

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    seekTo(val);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  const handleOpenExpand = () => {
    soundCtrl.playTap();
    setIsExpandedPlayerOpen(true);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    toggleLike(currentTrack.id);
  };

  const handleLyricsToggle = () => {
    soundCtrl.playTap();
    setIsLyricsOpen(!isLyricsOpen);
    if (isQueueOpen) setIsQueueOpen(false);
  };

  const handleQueueToggle = () => {
    soundCtrl.playTap();
    setIsQueueOpen(!isQueueOpen);
    if (isLyricsOpen) setIsLyricsOpen(false);
  };

  const handleMute = () => {
    soundCtrl.playTap();
    toggleMute();
  };

  return (
    <footer className="soundtrack-mini-player">
      {/* Playback Error Notification Banner */}
      {playbackError && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            right: 0,
            background: 'linear-gradient(90deg, #d32f2f, #c62828)',
            color: '#FFFFFF',
            padding: '7px 16px',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            zIndex: 100,
            boxShadow: '0 -4px 14px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {playbackError}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                retryPlayback();
              }}
              style={{
                background: 'rgba(255,255,255,0.25)',
                border: 'none',
                color: '#fff',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Retry
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextTrack();
              }}
              style={{
                background: 'rgba(255,255,255,0.25)',
                border: 'none',
                color: '#fff',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Top Hairline Progress Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(255, 255, 255, 0.12)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'var(--soundtrack-green)',
            transition: 'width 0.25s linear',
          }}
        />
      </div>

      {/* Left: Thumbnail & Track Details */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: 'clamp(180px, 28%, 280px)',
          minWidth: 0,
        }}
      >
        <div
          onClick={handleOpenExpand}
          style={{ cursor: 'pointer', flexShrink: 0 }}
          title="Click to expand player"
        >
          <AlbumArt
            title={currentTrack.title}
            gradient={currentTrack.coverGradient}
            accentColor={currentTrack.accentColor}
            icon="Music"
            size={48}
            borderRadius={6}
          />
        </div>

        <div
          onClick={handleOpenExpand}
          style={{ minWidth: 0, overflow: 'hidden', cursor: 'pointer', flex: 1 }}
          title="Click to expand player"
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: '0.86rem',
              color: 'var(--soundtrack-text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentTrack.title}
          </div>
          <div
            style={{
              fontSize: '0.74rem',
              color: 'var(--soundtrack-text-secondary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '1px',
            }}
          >
            {currentTrack.artist}
          </div>
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
            flexShrink: 0,
          }}
        >
          <Heart size={18} fill={isLiked ? 'var(--soundtrack-green)' : 'none'} />
        </button>
      </div>

      {/* Center: Desktop Controls & Scrubbable Seekbar */}
      <div className="mini-player-desktop-center">
        <MusicControls size="medium" showShuffleRepeat={true} />

        {/* Progress Timeline Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            fontSize: '0.72rem',
            color: 'var(--soundtrack-text-muted)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span style={{ minWidth: '32px', textAlign: 'right' }}>{formatTime(currentTime)}</span>

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
              flex: 1,
              background: `linear-gradient(to right, var(--soundtrack-green) 0%, var(--soundtrack-green) ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />

          <span style={{ minWidth: '32px', textAlign: 'left' }}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Desktop Lyrics, Queue, Volume, Fullscreen Expand */}
      <div className="mini-player-desktop-right">
        {/* Lyrics Button */}
        <button
          onClick={handleLyricsToggle}
          title="Lyrics"
          aria-label="Lyrics"
          style={{
            background: 'transparent',
            border: 'none',
            color: isLyricsOpen ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Mic2 size={16} />
        </button>

        {/* Queue Button */}
        <button
          onClick={handleQueueToggle}
          title="Queue"
          aria-label="Queue"
          style={{
            background: 'transparent',
            border: 'none',
            color: isQueueOpen ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListMusic size={16} />
        </button>

        {/* Volume Mute & Slider (Hidden on small mobile) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="soundtrack-volume-wrap">
          <button
            onClick={handleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            style={{
              background: 'transparent',
              border: 'none',
              color: isMuted ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isMuted || currentVol === 0 ? <VolumeX size={16} /> : currentVol < 0.5 ? <Volume1 size={16} /> : <Volume2 size={16} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={currentVol}
            onChange={handleVolume}
            aria-label="Soundtrack volume"
            className="soundtrack-slider"
            style={{
              width: '68px',
              background: `linear-gradient(to right, var(--soundtrack-green) 0%, var(--soundtrack-green) ${currentVol * 100}%, rgba(255,255,255,0.2) ${currentVol * 100}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
        </div>

        {/* Video Mode Toggle (YouTube tracks) */}
        {currentTrack.sourceType === 'youtube' && (
          <button
            onClick={() => {
              soundCtrl.playTap();
              toggleShowVideo();
            }}
            title={showVideoScreen ? 'Hide video dock' : 'Watch music video'}
            aria-label="Toggle video"
            style={{
              background: showVideoScreen ? 'rgba(184, 233, 134, 0.15)' : 'transparent',
              border: showVideoScreen ? '1px solid var(--soundtrack-green)' : 'none',
              borderRadius: '6px',
              color: showVideoScreen ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
              cursor: 'pointer',
              padding: '4px 6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.74rem',
              fontWeight: 600,
            }}
          >
            <Video size={15} />
            <span className="desktop-only-text">{showVideoScreen ? 'Hide Video' : 'Video'}</span>
          </button>
        )}

        {/* Expand Player Button */}
        <button
          onClick={handleOpenExpand}
          title="Full screen player"
          aria-label="Expand player"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--soundtrack-text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--soundtrack-text-secondary)')}
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Mobile Streamlined Controls: Like + Circular Play/Pause */}
      <div className="mini-player-mobile-controls">
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
          <Heart size={20} fill={isLiked ? 'var(--soundtrack-green)' : 'none'} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            soundCtrl.playTap();
            togglePlay();
          }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: '#121212',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {isLoading ? (
            <Loader2 size={16} className="soundtrack-spinner" color="#121212" />
          ) : isPlaying ? (
            <Pause size={16} fill="#121212" />
          ) : (
            <Play size={16} fill="#121212" style={{ marginLeft: '2px' }} />
          )}
        </button>
      </div>
    </footer>
  );
}
