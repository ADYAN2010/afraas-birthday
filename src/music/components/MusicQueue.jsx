import React from 'react';
import { X, ListMusic, Trash2, Play } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import AlbumArt from './AlbumArt';
import { soundCtrl } from '../../utils/audio';

export default function MusicQueue() {
  const { currentTrack, queue, removeFromQueue, clearQueue, playTrack, setIsQueueOpen, formatTime } = useMusic();

  const handleClose = () => {
    soundCtrl.playTap();
    setIsQueueOpen(false);
  };

  const handlePlayFromQueue = (track, idx) => {
    soundCtrl.playTap();
    removeFromQueue(idx);
    playTrack(track);
  };

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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          borderBottom: '1px solid var(--soundtrack-border)',
          paddingBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ListMusic size={20} color="var(--soundtrack-green)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
            Listening Queue
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {queue.length > 0 && (
            <button
              onClick={() => {
                soundCtrl.playTap();
                clearQueue();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: '1px solid var(--soundtrack-border)',
                borderRadius: '6px',
                padding: '4px 10px',
                color: 'var(--soundtrack-text-secondary)',
                fontSize: '0.76rem',
                cursor: 'pointer',
              }}
            >
              <Trash2 size={12} />
              <span>Clear</span>
            </button>
          )}

          <button
            onClick={handleClose}
            aria-label="Close queue"
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
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
        {/* Now Playing section */}
        {currentTrack && (
          <div style={{ marginBottom: '28px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--soundtrack-green)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              NOW PLAYING
            </span>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--soundtrack-elevated)',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--soundtrack-border)',
              }}
            >
              <AlbumArt
                title={currentTrack.title}
                gradient={currentTrack.coverGradient}
                accentColor={currentTrack.accentColor}
                icon="Music"
                size={44}
                borderRadius={6}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: 'var(--soundtrack-green)', fontSize: '0.92rem' }}>
                  {currentTrack.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--soundtrack-text-secondary)' }}>
                  {currentTrack.artist}
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--soundtrack-text-muted)' }}>
                {formatTime(currentTrack.duration)}
              </span>
            </div>
          </div>
        )}

        {/* Up Next in Queue */}
        <div>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--soundtrack-text-secondary)',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            NEXT IN QUEUE ({queue.length})
          </span>

          {queue.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {queue.map((track, idx) => (
                <div
                  key={`${track.id}-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    background: 'var(--soundtrack-card)',
                    borderRadius: '8px',
                    border: '1px solid var(--soundtrack-border)',
                  }}
                >
                  <span style={{ width: '18px', fontSize: '0.8rem', color: 'var(--soundtrack-text-muted)' }}>
                    {idx + 1}
                  </span>
                  <AlbumArt
                    title={track.title}
                    gradient={track.coverGradient}
                    accentColor={track.accentColor}
                    icon="Music"
                    size={36}
                    borderRadius={4}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.86rem' }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)' }}>
                      {track.artist}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayFromQueue(track, idx)}
                    title="Play now"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--soundtrack-green)',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <Play size={16} fill="var(--soundtrack-green)" />
                  </button>

                  <button
                    onClick={() => {
                      soundCtrl.playTap();
                      removeFromQueue(idx);
                    }}
                    title="Remove from queue"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--soundtrack-text-muted)',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '30px 14px',
                textAlign: 'center',
                color: 'var(--soundtrack-text-muted)',
                background: 'var(--soundtrack-card)',
                borderRadius: '8px',
                border: '1px dashed var(--soundtrack-border)',
                fontSize: '0.86rem',
              }}
            >
              Queue is empty. Tracks from the active playlist will play sequentially!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
