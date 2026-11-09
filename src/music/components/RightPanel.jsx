import React from 'react';
import { Heart, Mic2, Maximize2, Music, ListMusic } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import AlbumArt from './AlbumArt';
import { soundCtrl } from '../../utils/audio';

export default function RightPanel() {
  const {
    currentTrack,
    currentPlaylist,
    likedTrackIds,
    toggleLike,
    isLyricsOpen,
    setIsLyricsOpen,
    isQueueOpen,
    setIsQueueOpen,
    setIsExpandedPlayerOpen,
  } = useMusic();

  if (!currentTrack) {
    return (
      <aside className="soundtrack-right-panel" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <Music size={36} color="var(--soundtrack-text-muted)" style={{ margin: '0 auto 12px' }} />
        <p style={{ fontSize: '0.86rem', color: 'var(--soundtrack-text-secondary)' }}>
          Select a song to start listening.
        </p>
      </aside>
    );
  }

  const isLiked = likedTrackIds.includes(currentTrack.id);

  const handleLike = () => {
    soundCtrl.playTap();
    toggleLike(currentTrack.id);
  };

  const handleOpenLyrics = () => {
    soundCtrl.playTap();
    setIsLyricsOpen(!isLyricsOpen);
    if (isQueueOpen) setIsQueueOpen(false);
  };

  const handleOpenQueue = () => {
    soundCtrl.playTap();
    setIsQueueOpen(!isQueueOpen);
    if (isLyricsOpen) setIsLyricsOpen(false);
  };

  const handleExpand = () => {
    soundCtrl.playTap();
    setIsExpandedPlayerOpen(true);
  };

  return (
    <aside className="soundtrack-right-panel">
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            fontSize: '0.84rem',
            fontWeight: 700,
            color: 'var(--soundtrack-text-primary)',
          }}
        >
          {currentPlaylist?.title || 'Now Playing'}
        </span>

        <button
          onClick={handleExpand}
          title="Expand listening view"
          aria-label="Expand player"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--soundtrack-text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--soundtrack-text-secondary)')}
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Large Cover Art with Ambient Shadow */}
      <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
        <AlbumArt
          title={currentTrack.title}
          gradient={currentTrack.coverGradient}
          accentColor={currentTrack.accentColor}
          icon="Music"
          size="100%"
          borderRadius={12}
        />
      </div>

      {/* Track Title, Artist, & Like Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '14px',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '3px',
            }}
          >
            {currentTrack.title}
          </h3>
          <p
            style={{
              fontSize: '0.84rem',
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
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Heart size={20} fill={isLiked ? 'var(--soundtrack-green)' : 'none'} />
        </button>
      </div>

      {/* Track Details Card */}
      <div
        style={{
          background: 'var(--soundtrack-card)',
          borderRadius: '10px',
          padding: '12px 14px',
          fontSize: '0.8rem',
          color: 'var(--soundtrack-text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '16px',
          border: '1px solid var(--soundtrack-border)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Album</span>
          <span style={{ color: 'var(--soundtrack-text-primary)', fontWeight: 600 }}>{currentTrack.album}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Genre</span>
          <span style={{ color: 'var(--soundtrack-green)', fontWeight: 600 }}>{currentTrack.genre || 'Acoustic'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Year</span>
          <span style={{ color: 'var(--soundtrack-text-primary)' }}>{currentTrack.year || 2026}</span>
        </div>
      </div>

      {/* Lyrics / Queue Quick Toggle Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button
          onClick={handleOpenLyrics}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: isLyricsOpen ? 'var(--soundtrack-elevated)' : 'transparent',
            border: '1px solid var(--soundtrack-border)',
            color: isLyricsOpen ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Mic2 size={14} />
          <span>Lyrics</span>
        </button>

        <button
          onClick={handleOpenQueue}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: isQueueOpen ? 'var(--soundtrack-elevated)' : 'transparent',
            border: '1px solid var(--soundtrack-border)',
            color: isQueueOpen ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <ListMusic size={14} />
          <span>Queue</span>
        </button>
      </div>
    </aside>
  );
}
