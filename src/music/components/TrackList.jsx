import React from 'react';
import { Heart, Clock } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import AlbumArt from './AlbumArt';
import { soundCtrl } from '../../utils/audio';

export default function TrackList({ tracks = [], playlist = null, showAlbum = true }) {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    resumeTrack,
    likedTrackIds,
    toggleLike,
    formatTime,
  } = useMusic();

  const handleRowClick = (track) => {
    soundCtrl.playTap();
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        pauseTrack();
      } else {
        resumeTrack();
      }
    } else {
      playTrack(track, playlist);
    }
  };

  const handleLikeClick = (e, trackId) => {
    e.stopPropagation();
    soundCtrl.playTap();
    toggleLike(trackId);
  };

  if (!tracks.length) {
    return (
      <div style={{ padding: '36px 16px', textAlign: 'center', color: 'var(--soundtrack-text-muted)' }}>
        No tracks in this collection yet.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', paddingBottom: '16px' }}>
      {/* Table Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: showAlbum ? '36px 1fr 140px 70px 40px' : '36px 1fr 70px 40px',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 12px',
          borderBottom: '1px solid var(--soundtrack-border)',
          fontSize: '0.74rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--soundtrack-text-muted)',
          marginBottom: '6px',
        }}
      >
        <span>#</span>
        <span>Title</span>
        {showAlbum && <span className="track-album-cell">Album</span>}
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} />
        </span>
        <span style={{ textAlign: 'center' }}>Like</span>
      </div>

      {/* Track Rows */}
      {tracks.map((track, idx) => {
        const isCurrent = currentTrack?.id === track.id;
        const isCurrentPlaying = isCurrent && isPlaying;
        const isLiked = likedTrackIds.includes(track.id);

        return (
          <div
            key={track.id}
            onClick={() => handleRowClick(track)}
            className={`soundtrack-track-row ${isCurrent ? 'active' : ''}`}
            style={{
              gridTemplateColumns: showAlbum ? '36px 1fr 140px 70px 40px' : '36px 1fr 70px 40px',
            }}
          >
            {/* Column 1: Index / Play Icon / Equalizer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
              }}
            >
              {isCurrentPlaying ? (
                <div className="spotify-equalizer-bars">
                  <span />
                  <span />
                  <span />
                </div>
              ) : (
                <span
                  style={{
                    fontSize: '0.84rem',
                    color: isCurrent ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-muted)',
                    fontWeight: 600,
                  }}
                >
                  {idx + 1}
                </span>
              )}
            </div>

            {/* Column 2: Title, Artist, Thumbnail */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <AlbumArt
                title={track.title}
                gradient={track.coverGradient}
                accentColor={track.accentColor}
                icon="Music"
                size={40}
                borderRadius={4}
              />
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div
                  className="track-title-text"
                  style={{
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: isCurrent ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {track.title}
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--soundtrack-text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {track.artist}
                </div>
              </div>
            </div>

            {/* Column 3: Album (Hidden on narrow screens) */}
            {showAlbum && (
              <div
                className="track-album-cell"
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--soundtrack-text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {track.album}
              </div>
            )}

            {/* Column 4: Duration */}
            <div
              style={{
                fontSize: '0.82rem',
                color: isCurrent ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
              }}
            >
              {formatTime(track.duration)}
            </div>

            {/* Column 5: Heart Like Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={(e) => handleLikeClick(e, track.id)}
                title={isLiked ? 'Remove from your liked songs' : 'Save to your liked songs'}
                aria-label="Like song"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isLiked ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.15s ease, color 0.2s',
                }}
              >
                <Heart size={16} fill={isLiked ? 'var(--soundtrack-green)' : 'none'} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
