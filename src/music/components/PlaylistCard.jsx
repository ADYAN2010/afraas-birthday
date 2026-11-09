import React from 'react';
import { Play } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import AlbumArt from './AlbumArt';
import { soundCtrl } from '../../utils/audio';

export default function PlaylistCard({ playlist }) {
  const { selectPlaylist, playTrack, tracks, currentPlaylist, isPlaying } = useMusic();

  const handleCardClick = () => {
    soundCtrl.playTap();
    selectPlaylist(playlist.id);
  };

  const handleQuickPlay = (e) => {
    e.stopPropagation();
    soundCtrl.playTap();
    const firstTrack = tracks.find((t) => playlist.trackIds.includes(t.id));
    if (firstTrack) {
      playTrack(firstTrack, playlist);
    }
  };

  const isCurrentActive = currentPlaylist?.id === playlist.id && isPlaying;

  return (
    <div
      onClick={handleCardClick}
      className="soundtrack-playlist-card"
      style={{
        width: '100%',
        minWidth: '150px',
      }}
    >
      {/* Cover Artwork Container */}
      <div style={{ position: 'relative', width: '100%', marginBottom: '12px' }}>
        <AlbumArt
          title={playlist.title}
          gradient={playlist.coverColor}
          accentColor={playlist.accentColor}
          icon={playlist.icon}
          size="100%"
          borderRadius={8}
        />

        {/* Hover / Active Spotify-style Play Badge */}
        <button
          onClick={handleQuickPlay}
          aria-label={`Play ${playlist.title}`}
          className="soundtrack-play-badge"
          style={{
            opacity: isCurrentActive ? 1 : undefined,
            transform: isCurrentActive ? 'translateY(0)' : undefined,
          }}
        >
          <Play size={18} fill="#121212" style={{ marginLeft: '2px' }} />
        </button>
      </div>

      {/* Title */}
      <h4
        style={{
          fontSize: '0.94rem',
          fontWeight: 700,
          color: 'var(--soundtrack-text-primary)',
          marginBottom: '4px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {playlist.title}
      </h4>

      {/* Description */}
      <p
        style={{
          fontSize: '0.78rem',
          color: 'var(--soundtrack-text-secondary)',
          lineHeight: 1.35,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '8px',
        }}
      >
        {playlist.description}
      </p>

      {/* Track count badge */}
      <span
        style={{
          fontSize: '0.72rem',
          color: 'var(--soundtrack-text-muted)',
          fontWeight: 600,
        }}
      >
        {playlist.trackIds.length} tracks
      </span>
    </div>
  );
}
