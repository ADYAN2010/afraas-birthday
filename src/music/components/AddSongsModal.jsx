import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, FolderPlus, FileMusic, Disc, Code, Plus, Trash2, CheckCircle2, Music } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { soundCtrl } from '../../utils/audio';

export default function AddSongsModal() {
  const {
    isAddSongsModalOpen,
    setIsAddSongsModalOpen,
    playlists,
    customTracks,
    addCustomTrack,
    removeCustomTrack,
  } = useMusic();

  const [activeTab, setActiveTab] = useState('add'); // 'add' | 'custom' | 'guide'
  const [title, setTitle] = useState('');
  const [bengaliTitle, setBengaliTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [language, setLanguage] = useState('hindi');
  const [selectedPlaylists, setSelectedPlaylists] = useState(['hindi-romance']);
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isAddSongsModalOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleClose = () => {
    soundCtrl.playTap();
    setIsAddSongsModalOpen(false);
    setShowSuccess(false);
  };

  const togglePlaylistSelection = (id) => {
    soundCtrl.playTap();
    setSelectedPlaylists((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((p) => p !== id) : prev) : [...prev, id]
    );
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;

    soundCtrl.playTap();

    addCustomTrack({
      title: title.trim(),
      bengaliTitle: bengaliTitle.trim(),
      artist: artist.trim(),
      album: album.trim() || "Afraa's Collection",
      language,
      genre: language === 'bangla' ? 'Contemporary Bangla' : 'Hindi Romantic',
      playlistIds: selectedPlaylists,
      spotifyUrl: spotifyUrl.trim() || `https://open.spotify.com/search/${encodeURIComponent(title.trim())}`,
      youtubeUrl: youtubeUrl.trim() || `https://music.youtube.com/search?q=${encodeURIComponent(title.trim() + ' ' + artist.trim())}`,
      audioUrl: audioUrl.trim(),
      proceduralPreset: language === 'bangla' ? 'rainPiano' : 'acousticWarm',
      coverGradient:
        language === 'bangla'
          ? 'linear-gradient(135deg, #0575E6, #00F260)'
          : 'linear-gradient(135deg, #FF416C, #FF4B2B)',
      accentColor: language === 'bangla' ? '#00F260' : '#FF4B2B',
    });

    // Reset form & show toast
    setTitle('');
    setBengaliTitle('');
    setArtist('');
    setAlbum('');
    setSpotifyUrl('');
    setYoutubeUrl('');
    setAudioUrl('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
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
          maxWidth: '620px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 4vw, 32px)',
          color: '#FFFFFF',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FolderPlus size={22} color="var(--soundtrack-green)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              Edit Soundtrack Library
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

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--soundtrack-border)', paddingBottom: '12px' }}>
          <button
            onClick={() => {
              soundCtrl.playTap();
              setActiveTab('add');
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              background: activeTab === 'add' ? 'var(--soundtrack-green)' : 'var(--soundtrack-elevated)',
              color: activeTab === 'add' ? '#121212' : 'var(--soundtrack-text-secondary)',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={14} />
            <span>Add a Track</span>
          </button>

          <button
            onClick={() => {
              soundCtrl.playTap();
              setActiveTab('custom');
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              background: activeTab === 'custom' ? 'var(--soundtrack-green)' : 'var(--soundtrack-elevated)',
              color: activeTab === 'custom' ? '#121212' : 'var(--soundtrack-text-secondary)',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Music size={14} />
            <span>Your Added Tracks ({customTracks.length})</span>
          </button>

          <button
            onClick={() => {
              soundCtrl.playTap();
              setActiveTab('guide');
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              background: activeTab === 'guide' ? 'var(--soundtrack-green)' : 'var(--soundtrack-elevated)',
              color: activeTab === 'guide' ? '#121212' : 'var(--soundtrack-text-secondary)',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Code size={14} />
            <span>Developer Guide</span>
          </button>
        </div>

        {/* Tab 1: Interactive Add Track Form */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddSubmit}>
            {showSuccess && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(184, 233, 134, 0.15)',
                  border: '1px solid var(--soundtrack-green)',
                  color: 'var(--soundtrack-green)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                <CheckCircle2 size={16} />
                <span>Track added successfully! Saved to your library.</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '4px' }}>
                  Song Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. O Maahi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#121212',
                    border: '1px solid var(--soundtrack-border-bright)',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '4px' }}>
                  Bengali Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ইচ্ছে মানুষ"
                  value={bengaliTitle}
                  onChange={(e) => setBengaliTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#121212',
                    border: '1px solid var(--soundtrack-border-bright)',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                    fontFamily: 'var(--font-bengali, "Hind Siliguri", sans-serif)',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '4px' }}>
                  Artist Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arijit Singh / Shawon Gaanwala"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#121212',
                    border: '1px solid var(--soundtrack-border-bright)',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '4px' }}>
                  Album (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dunki / Single"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#121212',
                    border: '1px solid var(--soundtrack-border-bright)',
                    color: '#FFFFFF',
                    fontSize: '0.86rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '6px' }}>
                Language / Collection
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="language"
                    value="hindi"
                    checked={language === 'hindi'}
                    onChange={() => setLanguage('hindi')}
                  />
                  <span>Hindi Romantic</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="language"
                    value="bangla"
                    checked={language === 'bangla'}
                    onChange={() => setLanguage('bangla')}
                  />
                  <span>Bangla Romantic</span>
                </label>
              </div>
            </div>

            {/* Playlists Selection */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '6px' }}>
                Add to Playlists:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {playlists.map((pl) => {
                  const isChecked = selectedPlaylists.includes(pl.id);
                  return (
                    <button
                      key={pl.id}
                      type="button"
                      onClick={() => togglePlaylistSelection(pl.id)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        background: isChecked ? 'var(--soundtrack-green)' : '#121212',
                        color: isChecked ? '#121212' : 'var(--soundtrack-text-secondary)',
                        border: `1px solid ${isChecked ? 'var(--soundtrack-green)' : 'var(--soundtrack-border)'}`,
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {pl.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* External Links */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '4px' }}>
                  Spotify Web / Track URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://open.spotify.com/track/..."
                  value={spotifyUrl}
                  onChange={(e) => setSpotifyUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#121212',
                    border: '1px solid var(--soundtrack-border)',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '4px' }}>
                  YouTube Music URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://music.youtube.com/..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#121212',
                    border: '1px solid var(--soundtrack-border)',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '4px' }}>
                Local Audio Path (Optional, e.g. /music/my-song.mp3)
              </label>
              <input
                type="text"
                placeholder="/music/my-song.mp3 (Leave empty for automated synthesizer audio)"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: '#121212',
                  border: '1px solid var(--soundtrack-border)',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '9999px',
                background: 'var(--soundtrack-green)',
                color: '#121212',
                fontWeight: 700,
                fontSize: '0.88rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Plus size={16} />
              <span>Add to Afraa's Soundtrack</span>
            </button>
          </form>
        )}

        {/* Tab 2: Manage Custom Tracks */}
        {activeTab === 'custom' && (
          <div>
            <p style={{ fontSize: '0.82rem', color: 'var(--soundtrack-text-secondary)', marginBottom: '16px' }}>
              Tracks added by you on this device. These are saved in your browser and automatically integrated into playlists:
            </p>

            {customTracks.length === 0 ? (
              <div style={{ padding: '30px 16px', textAlign: 'center', color: 'var(--soundtrack-text-muted)' }}>
                No custom tracks added yet. Use the "Add a Track" tab above to add any of Afraa's favourite songs!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {customTracks.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: '#121212',
                      border: '1px solid var(--soundtrack-border)',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#FFFFFF' }}>
                        {t.title} {t.bengaliTitle && `(${t.bengaliTitle})`}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--soundtrack-text-secondary)' }}>
                        {t.artist} • {t.language === 'bangla' ? 'Bangla' : 'Hindi'}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundCtrl.playTap();
                        removeCustomTrack(t.id);
                      }}
                      title="Remove track"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#FF6B6B',
                        cursor: 'pointer',
                        padding: '6px',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Developer & Static Guide */}
        {activeTab === 'guide' && (
          <div>
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <FileMusic size={15} color="var(--soundtrack-green)" />
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                  Method 1: Local Audio Files
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--soundtrack-text-secondary)', lineHeight: 1.45, margin: 0 }}>
                Drop local audio files into <code>public/music/</code> and reference them in track objects via <code>audioUrl: "/music/song.mp3"</code>.
              </p>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Code size={15} color="var(--soundtrack-green)" />
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                  Method 2: Static Catalog in Code
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--soundtrack-text-secondary)', lineHeight: 1.45, margin: 0 }}>
                Edit <code>src/music/data/musicLibrary.js</code> to add permanent tracks that deploy directly to the live website.
              </p>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Disc size={15} color="var(--soundtrack-green)" />
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
                  Method 3: Official Spotify Embeds
                </h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--soundtrack-text-secondary)', lineHeight: 1.45, margin: 0 }}>
                Each playlist includes an official Spotify playlist embed link that can be toggled directly on the playlist view.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
