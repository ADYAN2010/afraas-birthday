import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { musicLibrary } from '../data/musicLibrary';
import { musicSynth } from '../data/musicSynth';
import { soundCtrl } from '../../utils/audio';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'search' | 'library' | 'playlist'
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('hindi-romance');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpandedPlayerOpen, setIsExpandedPlayerOpen] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isAddSongsModalOpen, setIsAddSongsModalOpen] = useState(false);
  const [isSoundtrackFullscreen, setIsSoundtrackFullscreen] = useState(false);
  const [isSpotifyEmbedActive, setIsSpotifyEmbedActive] = useState(false);

  // Dynamic Custom Tracks (Supports user editing & persistence in localStorage)
  const [customTracks, setCustomTracks] = useState(() => {
    try {
      const stored = localStorage.getItem('afraa_custom_tracks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Combined Catalog: Curated Library + User-Added Custom Tracks
  const tracks = useMemo(() => {
    return [...musicLibrary.tracks, ...customTracks];
  }, [customTracks]);

  // Playback State
  const [currentTrack, setCurrentTrack] = useState(musicLibrary.tracks[0]);
  const [currentPlaylist, setCurrentPlaylist] = useState(musicLibrary.playlists[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(musicLibrary.tracks[0]?.duration || 295);
  const [volume, setVolumeState] = useState(0.75);
  const [isMuted, setIsMutedState] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'

  // Queue & History
  const [queue, setQueue] = useState([]);
  const [likedTrackIds, setLikedTrackIds] = useState(() => {
    try {
      const stored = localStorage.getItem('afraa_soundtrack_likes');
      return stored
        ? JSON.parse(stored)
        : ['track-hindi-1', 'track-hindi-2', 'track-hindi-3', 'track-bangla-1', 'track-bangla-2'];
    } catch {
      return ['track-hindi-1', 'track-hindi-2', 'track-hindi-3', 'track-bangla-1', 'track-bangla-2'];
    }
  });

  const audioElementRef = useRef(null);
  const isUsingAudioElementRef = useRef(false);
  const handleTrackEndedRef = useRef(null);

  // Live state reference to prevent circular closures
  const liveStateRef = useRef({
    currentTrack,
    currentPlaylist,
    tracks,
    queue,
    isShuffle,
    repeatMode,
    currentTime,
    duration,
    volume,
    isMuted,
    isPlaying,
  });

  useEffect(() => {
    liveStateRef.current = {
      currentTrack,
      currentPlaylist,
      tracks,
      queue,
      isShuffle,
      repeatMode,
      currentTime,
      duration,
      volume,
      isMuted,
      isPlaying,
    };
  }, [currentTrack, currentPlaylist, tracks, queue, isShuffle, repeatMode, currentTime, duration, volume, isMuted, isPlaying]);

  // Sync likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('afraa_soundtrack_likes', JSON.stringify(likedTrackIds));
    } catch {}
  }, [likedTrackIds]);

  // Core Playback Functions
  const pauseTrack = useCallback(() => {
    setIsPlaying(false);
    soundCtrl.setMusicPlayerActive(false);
    soundCtrl.setMusicPlayerSwitching(false);
    if (isUsingAudioElementRef.current && audioElementRef.current) {
      audioElementRef.current.pause();
    } else {
      musicSynth.pause();
    }
  }, []);

  const seekTo = useCallback((seconds) => {
    setCurrentTime(seconds);
    if (isUsingAudioElementRef.current && audioElementRef.current) {
      audioElementRef.current.currentTime = seconds;
    } else {
      musicSynth.seek(seconds);
    }
  }, []);

  const resumeTrack = useCallback(() => {
    if (soundCtrl && soundCtrl.isPlayingMusic) {
      soundCtrl.stopAmbientMusic();
    }

    soundCtrl.setMusicPlayerActive(true);
    setIsPlaying(true);
    if (isUsingAudioElementRef.current && audioElementRef.current) {
      audioElementRef.current.play().catch(() => {});
    } else {
      musicSynth.resume();
    }
  }, []);

  const playTrack = useCallback((track, playlist = null) => {
    if (!track) return;

    if (soundCtrl && soundCtrl.isPlayingMusic) {
      soundCtrl.stopAmbientMusic();
    }

    // Suppress SFX immediately during track loading / transition
    soundCtrl.setMusicPlayerSwitching(true, 500);
    soundCtrl.setMusicPlayerActive(true);

    setCurrentTrack(track);
    if (playlist) setCurrentPlaylist(playlist);
    setDuration(track.duration || 188);
    setCurrentTime(0);
    setIsPlaying(true);

    if (track.audioUrl) {
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio();
        audioElementRef.current.addEventListener('timeupdate', () => {
          if (audioElementRef.current) {
            setCurrentTime(audioElementRef.current.currentTime);
            setDuration(audioElementRef.current.duration || 188);
          }
        });
        audioElementRef.current.addEventListener('ended', () => {
          if (handleTrackEndedRef.current) {
            handleTrackEndedRef.current();
          }
        });
      }

      const audio = audioElementRef.current;
      audio.src = track.audioUrl;
      audio.volume = liveStateRef.current.isMuted ? 0 : liveStateRef.current.volume;

      audio
        .play()
        .then(() => {
          isUsingAudioElementRef.current = true;
          musicSynth.stop();
          soundCtrl.setMusicPlayerActive(true);
          soundCtrl.setMusicPlayerSwitching(false);
        })
        .catch(() => {
          isUsingAudioElementRef.current = false;
          musicSynth.startTrack(track, 0);
          soundCtrl.setMusicPlayerActive(true);
          soundCtrl.setMusicPlayerSwitching(false);
        });
    } else {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      isUsingAudioElementRef.current = false;
      musicSynth.startTrack(track, 0);
      soundCtrl.setMusicPlayerActive(true);
      soundCtrl.setMusicPlayerSwitching(false);
    }
  }, []);

  const nextTrack = useCallback(() => {
    // Keep SFX suppressed during track switch
    soundCtrl.setMusicPlayerSwitching(true, 500);
    const s = liveStateRef.current;

    // 1. From Queue if available
    if (s.queue.length > 0) {
      const next = s.queue[0];
      setQueue((prev) => prev.slice(1));
      playTrack(next);
      return;
    }

    // 2. From Current Playlist (supports both library & custom tracks)
    const all = s.tracks || musicLibrary.tracks;
    const trackList = s.currentPlaylist
      ? all.filter((t) => s.currentPlaylist.trackIds.includes(t.id) || (t.playlistIds && t.playlistIds.includes(s.currentPlaylist.id)))
      : all;

    if (!trackList.length) return;

    if (s.isShuffle) {
      let randIdx = Math.floor(Math.random() * trackList.length);
      if (trackList.length > 1 && trackList[randIdx].id === s.currentTrack?.id) {
        randIdx = (randIdx + 1) % trackList.length;
      }
      playTrack(trackList[randIdx], s.currentPlaylist);
      return;
    }

    const currentIndex = trackList.findIndex((t) => t.id === s.currentTrack?.id);
    if (currentIndex === -1 || currentIndex === trackList.length - 1) {
      if (s.repeatMode === 'all') {
        playTrack(trackList[0], s.currentPlaylist);
      } else {
        pauseTrack();
        seekTo(0);
      }
    } else {
      playTrack(trackList[currentIndex + 1], s.currentPlaylist);
    }
  }, [playTrack, pauseTrack, seekTo]);

  const prevTrack = useCallback(() => {
    // Keep SFX suppressed during track switch
    soundCtrl.setMusicPlayerSwitching(true, 500);
    const s = liveStateRef.current;
    if (s.currentTime > 4) {
      seekTo(0);
      return;
    }

    const all = s.tracks || musicLibrary.tracks;
    const trackList = s.currentPlaylist
      ? all.filter((t) => s.currentPlaylist.trackIds.includes(t.id) || (t.playlistIds && t.playlistIds.includes(s.currentPlaylist.id)))
      : all;

    if (!trackList.length) return;

    const currentIndex = trackList.findIndex((t) => t.id === s.currentTrack?.id);
    if (currentIndex <= 0) {
      playTrack(trackList[trackList.length - 1], s.currentPlaylist);
    } else {
      playTrack(trackList[currentIndex - 1], s.currentPlaylist);
    }
  }, [playTrack, seekTo]);

  // Dynamic Custom Track Management (Library Editing)
  const addCustomTrack = useCallback((trackData) => {
    const newTrack = {
      id: `custom-${Date.now()}`,
      title: trackData.title?.trim() || 'Untitled Track',
      bengaliTitle: trackData.bengaliTitle?.trim() || '',
      artist: trackData.artist?.trim() || 'Custom Artist',
      album: trackData.album?.trim() || "Afraa's Collection",
      duration: parseInt(trackData.duration, 10) || 215,
      genre: trackData.genre?.trim() || 'Romantic',
      language: trackData.language || 'hindi',
      year: parseInt(trackData.year, 10) || 2026,
      proceduralPreset: trackData.proceduralPreset || 'acousticWarm',
      coverGradient: trackData.coverGradient || 'linear-gradient(135deg, #FF416C, #FF4B2B)',
      accentColor: trackData.accentColor || '#FF4B2B',
      spotifyUrl: trackData.spotifyUrl?.trim() || `https://open.spotify.com/search/${encodeURIComponent(trackData.title || '')}`,
      youtubeUrl: trackData.youtubeUrl?.trim() || `https://music.youtube.com/search?q=${encodeURIComponent(trackData.title || '')}`,
      audioUrl: trackData.audioUrl?.trim() || '',
      lyrics: trackData.lyrics || null,
      playlistIds: trackData.playlistIds && trackData.playlistIds.length ? trackData.playlistIds : ['hindi-romance'],
      isCustom: true,
    };

    setCustomTracks((prev) => {
      const updated = [newTrack, ...prev];
      try {
        localStorage.setItem('afraa_custom_tracks', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    return newTrack;
  }, []);

  const removeCustomTrack = useCallback((trackId) => {
    setCustomTracks((prev) => {
      const updated = prev.filter((t) => t.id !== trackId);
      try {
        localStorage.setItem('afraa_custom_tracks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Track Ended handler
  const handleTrackEnded = useCallback(() => {
    soundCtrl.setMusicPlayerSwitching(true, 500);
    const s = liveStateRef.current;
    if (s.repeatMode === 'one') {
      seekTo(0);
      resumeTrack();
      return;
    }
    nextTrack();
  }, [nextTrack, resumeTrack, seekTo]);

  useEffect(() => {
    handleTrackEndedRef.current = handleTrackEnded;
  }, [handleTrackEnded]);

  // Connect Synth events
  useEffect(() => {
    musicSynth.onTimeUpdate = (time, total) => {
      setCurrentTime(time);
      setDuration(total);
    };

    musicSynth.onEnded = () => {
      if (handleTrackEndedRef.current) {
        handleTrackEndedRef.current();
      }
    };

    return () => {
      musicSynth.onTimeUpdate = null;
      musicSynth.onEnded = null;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundCtrl.setMusicPlayerActive(false);
      soundCtrl.setMusicPlayerSwitching(false);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const s = liveStateRef.current;
    if (s.isPlaying) {
      pauseTrack();
    } else {
      if (!s.currentTrack) {
        playTrack(musicLibrary.tracks[0], musicLibrary.playlists[0]);
      } else {
        resumeTrack();
      }
    }
  }, [pauseTrack, resumeTrack, playTrack]);

  const setVolume = useCallback((val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioElementRef.current) {
      audioElementRef.current.volume = liveStateRef.current.isMuted ? 0 : clamped;
    }
    musicSynth.setVolume(clamped);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMutedState((prev) => {
      const next = !prev;
      if (audioElementRef.current) {
        audioElementRef.current.volume = next ? 0 : liveStateRef.current.volume;
      }
      musicSynth.setMuted(next);
      return next;
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const toggleLike = useCallback((trackId) => {
    setLikedTrackIds((prev) => {
      if (prev.includes(trackId)) {
        return prev.filter((id) => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  }, []);

  const addToQueue = useCallback((track) => {
    setQueue((prev) => [...prev, track]);
  }, []);

  const removeFromQueue = useCallback((index) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const selectPlaylist = useCallback((playlistId) => {
    setSelectedPlaylistId(playlistId);
    setActiveTab('playlist');
    const pl = musicLibrary.playlists.find((p) => p.id === playlistId);
    if (pl) setCurrentPlaylist(pl);
  }, []);

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const value = {
    branding: musicLibrary.branding,
    playlists: musicLibrary.playlists,
    tracks,
    customTracks,
    addCustomTrack,
    removeCustomTrack,
    currentTrack,
    currentPlaylist,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    queue,
    likedTrackIds,
    formatTime,
    playTrack,
    pauseTrack,
    resumeTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    addToQueue,
    removeFromQueue,
    clearQueue,
    activeTab,
    setActiveTab,
    selectedPlaylistId,
    selectPlaylist,
    searchQuery,
    setSearchQuery,
    isExpandedPlayerOpen,
    setIsExpandedPlayerOpen,
    isLyricsOpen,
    setIsLyricsOpen,
    isQueueOpen,
    setIsQueueOpen,
    isAddSongsModalOpen,
    setIsAddSongsModalOpen,
    isSoundtrackFullscreen,
    setIsSoundtrackFullscreen,
    isSpotifyEmbedActive,
    setIsSpotifyEmbedActive,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
