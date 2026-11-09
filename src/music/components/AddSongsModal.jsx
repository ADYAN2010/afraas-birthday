import React from 'react';
import { createPortal } from 'react-dom';
import { X, FolderPlus, FileMusic, Disc, Code } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { soundCtrl } from '../../utils/audio';

export default function AddSongsModal() {
  const { isAddSongsModalOpen, setIsAddSongsModalOpen } = useMusic();

  if (!isAddSongsModalOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleClose = () => {
    soundCtrl.playTap();
    setIsAddSongsModalOpen(false);
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          backgroundColor: '#181818',
          border: '1px solid var(--soundtrack-border-bright)',
          borderRadius: '16px',
          maxWidth: '580px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 4vw, 32px)',
          color: '#FFFFFF',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FolderPlus size={22} color="var(--soundtrack-green)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              How to Add Your Own Songs
            </h3>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              background: 'var(--soundtrack-elevated)',
              border: 'none',
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

        {/* Step 1: Local MP3 Files */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <FileMusic size={16} color="var(--soundtrack-green)" />
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: 0 }}>
              Method 1: Local Audio Files (MP3 / OGG)
            </h4>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--soundtrack-text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
            Drop any MP3 audio file into the <code>public/music/</code> folder in the project:
          </p>
          <pre
            style={{
              background: '#121212',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: 'var(--soundtrack-green)',
              overflowX: 'auto',
              border: '1px solid var(--soundtrack-border)',
            }}
          >
            public/music/birthday.mp3
          </pre>
        </div>

        {/* Step 2: Edit Catalog in musicLibrary.js */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Code size={16} color="var(--soundtrack-green)" />
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: 0 }}>
              Method 2: Edit Track Catalog (src/music/data/musicLibrary.js)
            </h4>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--soundtrack-text-secondary)', lineHeight: 1.5, marginBottom: '8px' }}>
            Add new entries with title, artist, audioUrl, and lyrics:
          </p>
          <pre
            style={{
              background: '#121212',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.76rem',
              color: '#F5F5F5',
              overflowX: 'auto',
              border: '1px solid var(--soundtrack-border)',
            }}
          >
{`{
  id: "custom-track-1",
  title: "Song Title",
  artist: "Artist Name",
  album: "Album Name",
  duration: 195,
  audioUrl: "/music/my-song.mp3",
  playlistIds: ["a-little-birthday-mix"]
}`}
          </pre>
        </div>

        {/* Step 3: Spotify Embeds */}
        <div style={{ marginBottom: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Disc size={16} color="var(--soundtrack-green)" />
            <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: 0 }}>
              Method 3: Official Spotify Playlist Embeds
            </h4>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--soundtrack-text-secondary)', lineHeight: 1.5 }}>
            To embed Afraa's favorite real Spotify playlists, paste any Spotify Embed URL into the playlist object in <code>musicLibrary.js</code>!
          </p>
        </div>

        <button
          onClick={handleClose}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '9999px',
            background: 'var(--soundtrack-green)',
            color: '#121212',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Got It!
        </button>
      </div>
    </div>,
    document.body
  );
}
