import React from 'react';
import { Play, PlusCircle } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import PlaylistCard from './PlaylistCard';
import AlbumArt from './AlbumArt';
import TrackList from './TrackList';
import { soundCtrl } from '../../utils/audio';

export default function MusicHome() {
  const {
    playlists,
    tracks,
    selectPlaylist,
    playTrack,
    setIsAddSongsModalOpen,
  } = useMusic();

  const featuredPlaylist = playlists.find((p) => p.id === 'hindi-romance') || playlists[0];
  const quickPickTracks = tracks.filter((t) =>
    ['track-hindi-1', 'track-hindi-13', 'track-bangla-12', 'track-hindi-12', 'track-hindi-11', 'track-hindi-10', 'track-bangla-10'].includes(t.id)
  );

  const handleFeaturedPlay = () => {
    soundCtrl.playTap();
    const first = tracks.find((t) => featuredPlaylist.trackIds.includes(t.id));
    if (first) playTrack(first, featuredPlaylist);
  };

  return (
    <div style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
      {/* Top Welcome Tagline */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '22px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--soundtrack-green)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            AFRAA'S SOUNDTRACK
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Good music, good mood.
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--soundtrack-text-secondary)', marginTop: '4px' }}>
            A little space for the music you love. Curated with care — Adyan
          </p>
        </div>

        {/* Add Songs / Customization Guide Button */}
        <button
          onClick={() => {
            soundCtrl.playTap();
            setIsAddSongsModalOpen(true);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            background: 'var(--soundtrack-elevated)',
            border: '1px solid var(--soundtrack-border-bright)',
            color: 'var(--soundtrack-text-primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--soundtrack-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--soundtrack-elevated)')}
        >
          <PlusCircle size={15} color="var(--soundtrack-green)" />
          <span>How to Add Songs</span>
        </button>
      </div>

      {/* Featured Playlist Area */}
      {featuredPlaylist && (
        <div
          onClick={() => {
            soundCtrl.playTap();
            selectPlaylist(featuredPlaylist.id);
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 126, 95, 0.22) 0%, rgba(184, 233, 134, 0.12) 100%)',
            border: '1px solid var(--soundtrack-border-bright)',
            borderRadius: '16px',
            padding: 'clamp(18px, 3.5vw, 28px)',
            marginBottom: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(16px, 3vw, 28px)',
            flexWrap: 'wrap',
            transition: 'border-color 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--soundtrack-green)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--soundtrack-border-bright)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <AlbumArt
            title={featuredPlaylist.title}
            gradient={featuredPlaylist.coverColor}
            accentColor={featuredPlaylist.accentColor}
            icon={featuredPlaylist.icon}
            size={130}
            borderRadius={10}
          />

          <div style={{ flex: 1, minWidth: '220px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--soundtrack-green)',
                display: 'inline-block',
                marginBottom: '4px',
              }}
            >
              FEATURED PLAYLIST • AFRAA'S TASTE
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '6px',
              }}
            >
              {featuredPlaylist.title}
            </h3>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'var(--soundtrack-text-secondary)',
                lineHeight: 1.4,
                marginBottom: '16px',
                maxWidth: '520px',
              }}
            >
              {featuredPlaylist.description}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFeaturedPlay();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '9999px',
                backgroundColor: 'var(--soundtrack-green)',
                color: '#121212',
                fontWeight: 700,
                fontSize: '0.86rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 18px var(--soundtrack-green-glow)',
              }}
            >
              <Play size={16} fill="#121212" />
              <span>PLAY ALBUM</span>
            </button>
          </div>
        </div>
      )}

      {/* Section: Made for Afraa */}
      <div style={{ marginBottom: '34px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
              Made for Afraa
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--soundtrack-text-secondary)' }}>
              Curated collections matching every mood of your day
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 170px), 1fr))',
            gap: '16px',
          }}
        >
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>

      {/* Section: Afraa's Heavy Rotation (Quick Picks) */}
      <div style={{ marginBottom: '34px' }}>
        <div style={{ marginBottom: '14px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
            Afraa's Heavy Rotation
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--soundtrack-text-secondary)' }}>
            Melodious Hindi favorites & contemporary Bangla anthems
          </span>
        </div>

        <TrackList tracks={quickPickTracks} playlist={featuredPlaylist} showAlbum={false} />
      </div>
    </div>
  );
}
