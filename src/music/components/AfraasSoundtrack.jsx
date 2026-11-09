import React, { useEffect } from 'react';
import { MusicProvider, useMusic } from '../context/MusicContext';
import MusicSidebar from './MusicSidebar';
import MusicHome from './MusicHome';
import MusicSearch from './MusicSearch';
import MusicLibraryView from './MusicLibraryView';
import PlaylistView from './PlaylistView';
import RightPanel from './RightPanel';
import MiniPlayer from './MiniPlayer';
import ExpandedPlayer from './ExpandedPlayer';
import LyricsPanel from './LyricsPanel';
import MusicQueue from './MusicQueue';
import AddSongsModal from './AddSongsModal';
import { Home, Search, Library, Mic2, Disc, X } from 'lucide-react';
import { soundCtrl } from '../../utils/audio';
import CuteScrapbookDivider from '../../components/svg/CuteScrapbookDivider';
import '../styles/music.css';

function SoundtrackApp() {
  const {
    activeTab,
    setActiveTab,
    isLyricsOpen,
    setIsLyricsOpen,
    isQueueOpen,
    isSoundtrackFullscreen,
    showVideoScreen,
    setShowVideoScreen,
    initYouTubePlayer,
  } = useMusic();

  useEffect(() => {
    initYouTubePlayer();
  }, [initYouTubePlayer]);

  const handleMobileNav = (tab) => {
    soundCtrl.playTap();
    setActiveTab(tab);
  };

  return (
    <div className={`soundtrack-app-wrapper ${isSoundtrackFullscreen ? 'fullscreen-mode' : ''}`}>
      {/* 3-Part Desktop & Tablet Layout Grid */}
      <div className="soundtrack-body-grid">
        {/* 1. Left Sidebar */}
        <MusicSidebar />

        {/* 2. Main Content Viewport */}
        <main className="soundtrack-main-content">
          {activeTab === 'home' && <MusicHome />}
          {activeTab === 'search' && <MusicSearch />}
          {activeTab === 'library' && <MusicLibraryView />}
          {activeTab === 'playlist' && <PlaylistView />}

          {/* Overlays inside main viewport */}
          {isLyricsOpen && <LyricsPanel />}
          {isQueueOpen && <MusicQueue />}
        </main>

        {/* 3. Right Side Panel (Now Playing / Track details) */}
        <RightPanel />
      </div>

      {/* Persistent Bottom MiniPlayer */}
      <MiniPlayer />

      {/* Persistent Docked Media Player (YouTube Mount) */}
      <div
        id="soundtrack-media-dock"
        className={`soundtrack-media-dock ${showVideoScreen ? 'visible' : 'docked-minimized'}`}
        aria-hidden={!showVideoScreen}
      >
        {showVideoScreen && (
          <div
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              zIndex: 10,
              display: 'flex',
              gap: '4px',
            }}
          >
            <button
              onClick={() => {
                soundCtrl.playTap();
                setShowVideoScreen(false);
              }}
              title="Minimize video to audio background"
              aria-label="Minimize video"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
        <div id="soundtrack-youtube-player-mount" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <nav className="soundtrack-mobile-bottom-nav">
        <button
          onClick={() => handleMobileNav('home')}
          className={`soundtrack-nav-link ${activeTab === 'home' ? 'active' : ''}`}
          style={{ justifyContent: 'center', flexDirection: 'column', gap: '3px', padding: '6px' }}
        >
          <Home size={18} />
          <span style={{ fontSize: '0.68rem' }}>Home</span>
        </button>

        <button
          onClick={() => handleMobileNav('search')}
          className={`soundtrack-nav-link ${activeTab === 'search' ? 'active' : ''}`}
          style={{ justifyContent: 'center', flexDirection: 'column', gap: '3px', padding: '6px' }}
        >
          <Search size={18} />
          <span style={{ fontSize: '0.68rem' }}>Search</span>
        </button>

        <button
          onClick={() => handleMobileNav('library')}
          className={`soundtrack-nav-link ${activeTab === 'library' ? 'active' : ''}`}
          style={{ justifyContent: 'center', flexDirection: 'column', gap: '3px', padding: '6px' }}
        >
          <Library size={18} />
          <span style={{ fontSize: '0.68rem' }}>Library</span>
        </button>

        <button
          onClick={() => {
            soundCtrl.playTap();
            setIsLyricsOpen(!isLyricsOpen);
          }}
          className={`soundtrack-nav-link ${isLyricsOpen ? 'active' : ''}`}
          style={{ justifyContent: 'center', flexDirection: 'column', gap: '3px', padding: '6px' }}
        >
          <Mic2 size={18} />
          <span style={{ fontSize: '0.68rem' }}>Lyrics</span>
        </button>
      </nav>

      {/* Full-Screen Now Playing Modal */}
      <ExpandedPlayer />

      {/* How to Add Songs Guide Modal */}
      <AddSongsModal />
    </div>
  );
}

export default function AfraasSoundtrack() {
  return (
    <section
      id="soundtrack-section"
      style={{
        position: 'relative',
        padding: 'clamp(60px, 9vw, 100px) clamp(12px, 3vw, 24px)',
        width: '100%',
        maxWidth: '1360px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* Section Transition Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 18px',
            borderRadius: '9999px',
            background: '#FDF2F4',
            border: '1.5px solid #F3DDE2',
            color: '#A94B59',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <Disc size={13} color="#A94B59" />
          <span>AFRAA'S SOUNDTRACK</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            color: '#493B3B',
          }}
        >
          A Little Space for the Music You Love
        </h2>

        {/* Cute Stitched Scrapbook Divider */}
        <CuteScrapbookDivider maxWidth={280} />

        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.35rem, 3.2vw, 1.8rem)',
            color: '#A94B59',
            maxWidth: '620px',
            margin: '0 auto 12px',
          }}
        >
          “Good music, good mood. Handcrafted and curated with care.”
        </p>

        <span
          style={{
            fontSize: '0.84rem',
            color: '#857272',
            fontWeight: 600,
            letterSpacing: '0.04em',
          }}
        >
          Curated with care — Adyan
        </span>
      </div>

      {/* Main Spotify-Inspired Music Application Experience */}
      <MusicProvider>
        <SoundtrackApp />
      </MusicProvider>
    </section>
  );
}
