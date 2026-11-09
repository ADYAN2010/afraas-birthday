import React from 'react';
import { Play, Pause, ArrowLeft, Disc } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import AlbumArt from './AlbumArt';
import TrackList from './TrackList';
import { soundCtrl } from '../../utils/audio';

export default function PlaylistView() {
  const {
    currentPlaylist,
    tracks,
    playTrack,
    pauseTrack,
    resumeTrack,
    currentTrack,
    isPlaying,
    setActiveTab,
    isSpotifyEmbedActive,
    setIsSpotifyEmbedActive,
  } = useMusic();

  if (!currentPlaylist) return null;

  const playlistTracks = tracks.filter(
    (t) => currentPlaylist.trackIds.includes(t.id) || (t.playlistIds && t.playlistIds.includes(currentPlaylist.id))
  );
  const isThisPlaylistPlaying =
    isPlaying && playlistTracks.some((t) => t.id === currentTrack?.id);

  const totalSeconds = playlistTracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  const handlePlayAll = () => {
    soundCtrl.playTap();
    if (isThisPlaylistPlaying) {
      pauseTrack();
    } else {
      if (currentPlaylist.trackIds.includes(currentTrack?.id)) {
        resumeTrack();
      } else if (playlistTracks.length > 0) {
        playTrack(playlistTracks[0], currentPlaylist);
      }
    }
  };

  const handleBackToHome = () => {
    soundCtrl.playTap();
    setActiveTab('home');
  };

  const handleToggleSpotifyEmbed = () => {
    soundCtrl.playTap();
    setIsSpotifyEmbedActive(!isSpotifyEmbedActive);
  };

  return (
    <div style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
      {/* Back button */}
      <button
        onClick={handleBackToHome}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid var(--soundtrack-border)',
          borderRadius: '9999px',
          padding: '6px 14px',
          color: 'var(--soundtrack-text-secondary)',
          fontSize: '0.82rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '20px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--soundtrack-text-secondary)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        }}
      >
        <ArrowLeft size={14} />
        <span>Back to Home</span>
      </button>

      {/* Playlist Hero Header Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 'clamp(16px, 3vw, 28px)',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}
      >
        {/* Large Cover Artwork */}
        <AlbumArt
          title={currentPlaylist.title}
          gradient={currentPlaylist.coverColor}
          accentColor={currentPlaylist.accentColor}
          icon={currentPlaylist.icon}
          size={180}
          borderRadius={12}
        />

        {/* Playlist Information */}
        <div style={{ flex: 1, minWidth: '220px' }}>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--soundtrack-green)',
              display: 'inline-block',
              marginBottom: '6px',
            }}
          >
            PLAYLIST • {currentPlaylist.tag || 'CURATED'}
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <span>{currentPlaylist.title}</span>
            {currentPlaylist.bengaliTitle && (
              <span
                style={{
                  fontSize: 'clamp(1.2rem, 2.6vw, 1.8rem)',
                  color: 'var(--soundtrack-green)',
                  fontFamily: 'var(--font-bengali, "Hind Siliguri", sans-serif)',
                  fontWeight: 600,
                }}
              >
                ({currentPlaylist.bengaliTitle})
              </span>
            )}
          </h2>

          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--soundtrack-text-secondary)',
              lineHeight: 1.45,
              marginBottom: '12px',
              maxWidth: '600px',
            }}
          >
            {currentPlaylist.description}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: 'var(--soundtrack-text-muted)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontWeight: 700, color: 'var(--soundtrack-text-primary)' }}>
              Curated by Adyan
            </span>
            <span>•</span>
            <span>{playlistTracks.length} tracks</span>
            <span>•</span>
            <span>about {totalMinutes} min</span>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        {/* Big Green Play Button */}
        <button
          onClick={handlePlayAll}
          aria-label={isThisPlaylistPlaying ? 'Pause playlist' : 'Play playlist'}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: 'var(--soundtrack-green)',
            color: '#121212',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px var(--soundtrack-green-glow)',
            transition: 'transform 0.15s ease, background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {isThisPlaylistPlaying ? (
            <Pause size={22} fill="#121212" />
          ) : (
            <Play size={22} fill="#121212" style={{ marginLeft: '2px' }} />
          )}
        </button>

        {/* Toggle Official Spotify Embed Option (Option A) */}
        {currentPlaylist.spotifyEmbedUrl && (
          <button
            onClick={handleToggleSpotifyEmbed}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9999px',
              background: isSpotifyEmbedActive ? 'var(--soundtrack-elevated)' : 'transparent',
              border: '1px solid var(--soundtrack-border-bright)',
              color: isSpotifyEmbedActive ? 'var(--soundtrack-green)' : 'var(--soundtrack-text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Disc size={15} />
            <span>{isSpotifyEmbedActive ? 'Hide Spotify Player' : 'Open Spotify Embed Player'}</span>
          </button>
        )}
      </div>

      {/* Official Spotify Embed Iframe (Option A Support) */}
      {isSpotifyEmbedActive && currentPlaylist.spotifyEmbedUrl && (
        <div
          style={{
            marginBottom: '28px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--soundtrack-border-bright)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          }}
        >
          <iframe
            style={{ borderRadius: '12px' }}
            src={currentPlaylist.spotifyEmbedUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Embed Player"
          />
        </div>
      )}

      {/* Track List */}
      <TrackList tracks={playlistTracks} playlist={currentPlaylist} showAlbum={true} />
    </div>
  );
}
