import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { soundCtrl } from '../../utils/audio';

export default function MusicControls({ size = 'medium', showShuffleRepeat = true }) {
  const {
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
  } = useMusic();

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    togglePlay();
  };

  const handleNext = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    nextTrack();
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    prevTrack();
  };

  const handleShuffle = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    toggleShuffle();
  };

  const handleRepeat = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    toggleRepeat();
  };

  const isLarge = size === 'large';
  const playBtnSize = isLarge ? 56 : 38;
  const iconSize = isLarge ? 22 : 16;
  const skipIconSize = isLarge ? 24 : 18;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: isLarge ? '20px' : '14px' }}>
      {/* Shuffle Button */}
      {showShuffleRepeat && (
        <button
          onClick={handleShuffle}
          title={isShuffle ? 'Disable shuffle' : 'Enable shuffle'}
          aria-label="Shuffle"
          style={{
            background: 'transparent',
            border: 'none',
            color: isShuffle ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'color 0.2s',
          }}
        >
          <Shuffle size={skipIconSize - 2} />
          {isShuffle && (
            <span
              style={{
                position: 'absolute',
                bottom: '1px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--soundtrack-green)',
              }}
            />
          )}
        </button>
      )}

      {/* Previous Track Button */}
      <button
        onClick={handlePrev}
        title="Previous"
        aria-label="Previous track"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--soundtrack-text-secondary)',
          cursor: 'pointer',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s, transform 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--soundtrack-text-primary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--soundtrack-text-secondary)')}
      >
        <SkipBack size={skipIconSize} />
      </button>

      {/* Main Play / Pause Button */}
      <button
        onClick={handleTogglePlay}
        title={isPlaying ? 'Pause' : 'Play'}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        style={{
          width: `${playBtnSize}px`,
          height: `${playBtnSize}px`,
          borderRadius: '50%',
          backgroundColor: isLarge ? 'var(--soundtrack-green)' : '#FFFFFF',
          color: '#121212',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isLarge ? '0 8px 24px var(--soundtrack-green-glow)' : '0 4px 12px rgba(0,0,0,0.4)',
          transition: 'transform 0.15s ease, background-color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isPlaying ? (
          <Pause size={iconSize} fill="#121212" />
        ) : (
          <Play size={iconSize} fill="#121212" style={{ marginLeft: isLarge ? '3px' : '2px' }} />
        )}
      </button>

      {/* Next Track Button */}
      <button
        onClick={handleNext}
        title="Next"
        aria-label="Next track"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--soundtrack-text-secondary)',
          cursor: 'pointer',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s, transform 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--soundtrack-text-primary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--soundtrack-text-secondary)')}
      >
        <SkipForward size={skipIconSize} />
      </button>

      {/* Repeat Button */}
      {showShuffleRepeat && (
        <button
          onClick={handleRepeat}
          title={`Repeat mode: ${repeatMode}`}
          aria-label="Repeat mode"
          style={{
            background: 'transparent',
            border: 'none',
            color: repeatMode !== 'off' ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'color 0.2s',
          }}
        >
          {repeatMode === 'one' ? <Repeat1 size={skipIconSize - 2} /> : <Repeat size={skipIconSize - 2} />}
          {repeatMode !== 'off' && (
            <span
              style={{
                position: 'absolute',
                bottom: '1px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--soundtrack-green)',
              }}
            />
          )}
        </button>
      )}
    </div>
  );
}
