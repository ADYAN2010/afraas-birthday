import React from 'react';
import { Home, Search, Library, Heart, Maximize2, Minimize2, Plus } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { soundCtrl } from '../../utils/audio';

export default function MusicSidebar() {
  const {
    activeTab,
    setActiveTab,
    selectPlaylist,
    selectedPlaylistId,
    likedTrackIds,
    playlists,
    isSoundtrackFullscreen,
    setIsSoundtrackFullscreen,
    setIsAddSongsModalOpen,
  } = useMusic();

  const handleNav = (tab) => {
    soundCtrl.playTap();
    setActiveTab(tab);
  };

  const handlePlaylistClick = (id) => {
    soundCtrl.playTap();
    selectPlaylist(id);
  };

  const handleToggleFullscreen = () => {
    soundCtrl.playTap();
    setIsSoundtrackFullscreen(!isSoundtrackFullscreen);
  };

  return (
    <aside className="soundtrack-sidebar">
      {/* Top Brand & Navigation Panel */}
      <div className="soundtrack-sidebar-panel">
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', padding: '0 6px' }}>
          {/* Original Animated Wave Emblem */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #242424 0%, #121212 100%)',
              border: '1.5px solid var(--soundtrack-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px var(--soundtrack-green-glow)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '14px' }}>
              <span style={{ width: '2px', height: '8px', background: 'var(--soundtrack-green)', borderRadius: '1px' }} />
              <span style={{ width: '2px', height: '14px', background: 'var(--soundtrack-green)', borderRadius: '1px' }} />
              <span style={{ width: '2px', height: '10px', background: 'var(--soundtrack-green)', borderRadius: '1px' }} />
              <span style={{ width: '2px', height: '6px', background: 'var(--soundtrack-green)', borderRadius: '1px' }} />
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: '0.86rem',
                letterSpacing: '0.04em',
                color: '#FFFFFF',
                lineHeight: 1.1,
              }}
            >
              AFRAA'S SOUNDTRACK
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--soundtrack-text-muted)', marginTop: '2px' }}>
              Music space for Afraa
            </div>
          </div>
        </div>

        {/* Primary Navigation Buttons */}
        <button
          onClick={() => handleNav('home')}
          className={`soundtrack-nav-link ${activeTab === 'home' ? 'active' : ''}`}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav('search')}
          className={`soundtrack-nav-link ${activeTab === 'search' ? 'active' : ''}`}
        >
          <Search size={20} />
          <span>Search</span>
        </button>

        <button
          onClick={() => handleNav('library')}
          className={`soundtrack-nav-link ${activeTab === 'library' ? 'active' : ''}`}
        >
          <Library size={20} />
          <span>Your Library</span>
        </button>
      </div>

      {/* Playlists & Collections Panel */}
      <div className="soundtrack-sidebar-panel" style={{ flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '0 8px',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--soundtrack-text-muted)',
            }}
          >
            PLAYLISTS
          </span>

          <button
            onClick={() => {
              soundCtrl.playTap();
              setIsAddSongsModalOpen(true);
            }}
            title="How to add custom songs & playlists"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--soundtrack-text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
            }}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Liked / Favourite Songs Quick Link */}
        <button
          onClick={() => handleNav('library')}
          className={`soundtrack-nav-link ${activeTab === 'library' ? 'active' : ''}`}
          style={{ marginBottom: '4px' }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #450af5, #c4efd9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Heart size={13} fill="#FFFFFF" color="#FFFFFF" />
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Favourite Songs</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--soundtrack-text-muted)' }}>
              {likedTrackIds.length}
            </span>
          </div>
        </button>

        {/* Curated Playlists List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px' }}>
          {playlists.map((pl) => {
            const isActive = activeTab === 'playlist' && selectedPlaylistId === pl.id;
            return (
              <button
                key={pl.id}
                onClick={() => handlePlaylistClick(pl.id)}
                className={`soundtrack-nav-link ${isActive ? 'active' : ''}`}
                style={{
                  padding: '7px 10px',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: pl.accentColor,
                    flexShrink: 0,
                  }}
                />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pl.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Creator Credit & Fullscreen Control at Bottom */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid var(--soundtrack-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <button
            onClick={handleToggleFullscreen}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'var(--soundtrack-elevated)',
              border: '1px solid var(--soundtrack-border)',
              color: 'var(--soundtrack-text-secondary)',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'var(--soundtrack-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--soundtrack-text-secondary)';
              e.currentTarget.style.backgroundColor = 'var(--soundtrack-elevated)';
            }}
          >
            {isSoundtrackFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{isSoundtrackFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}</span>
          </button>

          <div
            style={{
              fontSize: '0.72rem',
              color: 'var(--soundtrack-text-muted)',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            Curated with care — Adyan
          </div>
        </div>
      </div>
    </aside>
  );
}
