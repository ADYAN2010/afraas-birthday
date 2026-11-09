import React from 'react';
import { Search, X, Music, Disc } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import TrackList from './TrackList';
import PlaylistCard from './PlaylistCard';
import { soundCtrl } from '../../utils/audio';

const BROWSE_GENRES = [
  { name: 'Acoustic & Celesta', color: 'linear-gradient(135deg, #FF7E5F, #FEB47B)', query: 'Acoustic' },
  { name: 'Lofi Chill', color: 'linear-gradient(135deg, #1A1E2E, #7077A1)', query: 'Lofi' },
  { name: 'Solo Piano', color: 'linear-gradient(135deg, #5C258D, #4389A2)', query: 'Piano' },
  { name: 'Traditional & Strings', color: 'linear-gradient(135deg, #8E0E00, #1F1C18)', query: 'Strings' },
  { name: 'Late Night Reverie', color: 'linear-gradient(135deg, #0F2027, #2C5364)', query: 'Midnight' },
  { name: 'Birthday Vibes', color: 'linear-gradient(135deg, #FA709A, #FEE140)', query: 'Birthday' },
];

export default function MusicSearch() {
  const { searchQuery, setSearchQuery, tracks, playlists } = useMusic();

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Filter tracks
  const matchedTracks = trimmedQuery
    ? tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(trimmedQuery) ||
          t.artist.toLowerCase().includes(trimmedQuery) ||
          t.album.toLowerCase().includes(trimmedQuery) ||
          (t.genre && t.genre.toLowerCase().includes(trimmedQuery))
      )
    : [];

  // Filter playlists
  const matchedPlaylists = trimmedQuery
    ? playlists.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmedQuery) ||
          p.description.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const handleClear = () => {
    soundCtrl.playTap();
    setSearchQuery('');
  };

  const handleGenreClick = (genreQuery) => {
    soundCtrl.playTap();
    setSearchQuery(genreQuery);
  };

  return (
    <div style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
      {/* Search Input Bar */}
      <div style={{ position: 'relative', maxWidth: '480px', marginBottom: '28px' }}>
        <div
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--soundtrack-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <Search size={18} />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search songs, artists, albums, or moods..."
          aria-label="Search library"
          style={{
            width: '100%',
            padding: '12px 42px 12px 42px',
            background: 'var(--soundtrack-elevated)',
            border: '1.5px solid var(--soundtrack-border-bright)',
            borderRadius: '9999px',
            color: '#FFFFFF',
            fontSize: '0.92rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--soundtrack-green)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--soundtrack-border-bright)')}
        />

        {searchQuery && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--soundtrack-text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* When Query is Active */}
      {trimmedQuery ? (
        <div>
          {matchedTracks.length > 0 || matchedPlaylists.length > 0 ? (
            <div>
              {/* Playlists found */}
              {matchedPlaylists.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
                    Playlists ({matchedPlaylists.length})
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 170px), 1fr))',
                      gap: '16px',
                    }}
                  >
                    {matchedPlaylists.map((pl) => (
                      <PlaylistCard key={pl.id} playlist={pl} />
                    ))}
                  </div>
                </div>
              )}

              {/* Tracks found */}
              {matchedTracks.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
                    Songs ({matchedTracks.length})
                  </h3>
                  <TrackList tracks={matchedTracks} showAlbum={true} />
                </div>
              )}
            </div>
          ) : (
            /* Clean Empty State */
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--soundtrack-text-secondary)',
              }}
            >
              <Music size={40} color="var(--soundtrack-text-muted)" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>
                No results found for “{searchQuery}”
              </h4>
              <p style={{ fontSize: '0.86rem', maxWidth: '420px', margin: '0 auto 18px', lineHeight: 1.45 }}>
                Please check the spelling or explore available genres like Celesta, Piano, Acoustic, or Birthday.
              </p>
              <button
                onClick={handleClear}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  background: 'var(--soundtrack-elevated)',
                  border: '1px solid var(--soundtrack-border-bright)',
                  color: 'var(--soundtrack-text-primary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      ) : (
        /* When search is empty: Browse Categories */
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
            Browse Categories
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
              gap: '14px',
            }}
          >
            {BROWSE_GENRES.map((genre) => (
              <div
                key={genre.name}
                onClick={() => handleGenreClick(genre.query)}
                style={{
                  height: '100px',
                  borderRadius: '10px',
                  background: genre.color,
                  padding: '14px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    display: 'block',
                    maxWidth: '85%',
                    textShadow: '0 2px 6px rgba(0,0,0,0.5)',
                  }}
                >
                  {genre.name}
                </span>
                <Disc
                  size={46}
                  color="rgba(255,255,255,0.22)"
                  style={{ position: 'absolute', bottom: '-8px', right: '-8px', transform: 'rotate(25deg)' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
