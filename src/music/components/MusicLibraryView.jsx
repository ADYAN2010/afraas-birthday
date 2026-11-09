import React, { useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import PlaylistCard from './PlaylistCard';
import TrackList from './TrackList';
import { soundCtrl } from '../../utils/audio';

export default function MusicLibraryView() {
  const [filter, setFilter] = useState('all'); // 'all' | 'liked' | 'playlists'
  const { playlists, tracks, likedTrackIds, playTrack } = useMusic();

  const likedTracks = tracks.filter((t) => likedTrackIds.includes(t.id));

  const handlePlayLiked = () => {
    soundCtrl.playTap();
    if (likedTracks.length > 0) {
      playTrack(likedTracks[0]);
    }
  };

  return (
    <div style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
          Your Library
        </h2>
        <span style={{ fontSize: '0.84rem', color: 'var(--soundtrack-text-secondary)' }}>
          Your saved music, favourite mixes, and customized collections
        </span>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '26px' }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'playlists', label: 'Playlists' },
          { key: 'liked', label: `Liked Songs (${likedTrackIds.length})` },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => {
              soundCtrl.playTap();
              setFilter(f.key);
            }}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              background: filter === f.key ? '#FFFFFF' : 'var(--soundtrack-elevated)',
              color: filter === f.key ? '#121212' : 'var(--soundtrack-text-primary)',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liked Songs Featured Banner (shown on 'all' or 'liked') */}
      {(filter === 'all' || filter === 'liked') && (
        <div style={{ marginBottom: '32px' }}>
          <div
            onClick={handlePlayLiked}
            style={{
              background: 'linear-gradient(135deg, #450af5 0%, #8e8ee5 50%, #c4efd9 100%)',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(69, 10, 245, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginBottom: '12px' }}>
                <Heart size={28} fill="#FFFFFF" color="#FFFFFF" />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                Favourite Songs
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.85)' }}>
                {likedTracks.length} tracks curated & saved by Afraa
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayLiked();
              }}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--soundtrack-green)',
                color: '#121212',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              }}
            >
              <Play size={20} fill="#121212" style={{ marginLeft: '2px' }} />
            </button>
          </div>

          {filter === 'liked' && (
            <TrackList tracks={likedTracks} showAlbum={true} />
          )}
        </div>
      )}

      {/* Playlists Grid (shown on 'all' or 'playlists') */}
      {(filter === 'all' || filter === 'playlists') && (
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
            Playlists
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 170px), 1fr))',
              gap: '16px',
            }}
          >
            {playlists.map((pl) => (
              <PlaylistCard key={pl.id} playlist={pl} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
