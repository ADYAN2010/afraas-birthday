import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { musicLibrary } from '../data/musicLibrary';
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
  const [showVideoScreen, setShowVideoScreen] = useState(false);

  // Dynamic Custom Tracks
  const [customTracks, setCustomTracks] = useState(() => {
    try {
      const stored = localStorage.getItem('afraa_custom_tracks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Combined Catalog
  const tracks = useMemo(() => {
    return [...musicLibrary.tracks, ...customTracks];
  }, [customTracks]);

  // Playback State
  const [currentTrack, setCurrentTrack] = useState(musicLibrary.tracks[0]);
  const [currentPlaylist, setCurrentPlaylist] = useState(musicLibrary.playlists[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackError, setPlaybackError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(musicLibrary.tracks[0]?.duration || 295);

  const [volume, setVolumeState] = useState(() => {
    try {
      const stored = localStorage.getItem('afraa_soundtrack_volume');
      return stored ? parseFloat(stored) : 0.8;
    } catch {
      return 0.8;
    }
  });

  const [isMuted, setIsMutedState] = useState(() => {
    try {
      const stored = localStorage.getItem('afraa_soundtrack_muted');
      return stored ? stored === 'true' : false;
    } catch {
      return false;
    }
  });

  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off' | 'all' | 'one'

  // Queue & Likes
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

  // Instances & Refs
  const audioElementRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const isYtReadyRef = useRef(false);
  const [isYtReady, setIsYtReady] = useState(false);
  const pendingTrackRef = useRef(null);
  const ytTickerRef = useRef(null);
  const handleTrackEndedRef = useRef(null);
  const loadAndPlayYtRef = useRef(null);
  const initYouTubePlayerRef = useRef(null);

  // Live state reference to prevent stale closures
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

  // Load YouTube IFrame API Script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const previousOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousOnReady === 'function') previousOnReady();
      if (initYouTubePlayerRef.current) initYouTubePlayerRef.current();
    };

    if (window.YT && window.YT.Player) {
      if (initYouTubePlayerRef.current) initYouTubePlayerRef.current();
    }

    return () => {
      if (ytTickerRef.current) {
        clearInterval(ytTickerRef.current);
        ytTickerRef.current = null;
      }
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current = null;
      }
    };
  }, []);

  // Initialize YouTube Player
  const initYouTubePlayer = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (ytPlayerRef.current) return;
    if (!window.YT || !window.YT.Player) return;

    const mount = document.getElementById('soundtrack-youtube-player-mount');
    if (!mount) return;

    try {
      ytPlayerRef.current = new window.YT.Player('soundtrack-youtube-player-mount', {
        height: '100%',
        width: '100%',
        videoId: currentTrack?.youtubeId || 'HJIRktKAahU',
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            isYtReadyRef.current = true;
            setIsYtReady(true);
            const s = liveStateRef.current;
            event.target.setVolume(s.isMuted ? 0 : Math.round(s.volume * 100));

            if (pendingTrackRef.current) {
              const pTrack = pendingTrackRef.current;
              pendingTrackRef.current = null;
              if (loadAndPlayYtRef.current) {
                loadAndPlayYtRef.current(pTrack);
              }
            }
          },
          onStateChange: (event) => {
            const data = event.data;
            if (data === 1) { // PLAYING
              setIsPlaying(true);
              setIsLoading(false);
              setPlaybackError(null);
              soundCtrl.stopAmbientMusic();
              soundCtrl.setMusicPlayerActive(true);

              // Start real-time progress ticker
              if (ytTickerRef.current) clearInterval(ytTickerRef.current);
              ytTickerRef.current = setInterval(() => {
                if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
                  const cur = ytPlayerRef.current.getCurrentTime();
                  const dur = ytPlayerRef.current.getDuration();
                  setCurrentTime(cur);
                  if (dur && dur > 0) setDuration(dur);
                }
              }, 250);
            } else if (data === 2) { // PAUSED
              setIsPlaying(false);
              setIsLoading(false);
              if (ytTickerRef.current) {
                clearInterval(ytTickerRef.current);
                ytTickerRef.current = null;
              }
              soundCtrl.setMusicPlayerActive(false);
            } else if (data === 3) { // BUFFERING
              setIsLoading(true);
            } else if (data === 0) { // ENDED
              setIsPlaying(false);
              setIsLoading(false);
              if (ytTickerRef.current) {
                clearInterval(ytTickerRef.current);
                ytTickerRef.current = null;
              }
              soundCtrl.setMusicPlayerActive(false);

              if (handleTrackEndedRef.current) {
                handleTrackEndedRef.current();
              }
            }
          },
          onError: (event) => {
            setIsPlaying(false);
            setIsLoading(false);
            if (ytTickerRef.current) {
              clearInterval(ytTickerRef.current);
              ytTickerRef.current = null;
            }
            soundCtrl.setMusicPlayerActive(false);

            const code = event.data;
            if (code === 101 || code === 150) {
              setPlaybackError('Embedding restricted for this track by copyright holder. Tap external links to listen.');
            } else if (code === 100) {
              setPlaybackError('This video was not found or has been removed.');
            } else {
              setPlaybackError('Playback error occurred with this track.');
            }
          },
        },
      });
    } catch (err) {
      console.warn('YouTube Player initialization postponed:', err);
    }
  }, [currentTrack]);

  useEffect(() => {
    initYouTubePlayerRef.current = initYouTubePlayer;
  }, [initYouTubePlayer]);

  // Execute YouTube Video Playback
  const loadAndPlayYt = useCallback((track) => {
    if (!track.youtubeId) {
      setIsPlaying(false);
      setIsLoading(false);
      setPlaybackError('No YouTube video ID found for this track.');
      return;
    }

    if (!ytPlayerRef.current || !isYtReadyRef.current) {
      pendingTrackRef.current = track;
      setIsLoading(true);
      setPlaybackError(null);
      // Attempt init if mount is ready
      if (initYouTubePlayerRef.current) initYouTubePlayerRef.current();
      return;
    }

    try {
      setIsLoading(true);
      setPlaybackError(null);
      const s = liveStateRef.current;
      ytPlayerRef.current.setVolume(s.isMuted ? 0 : Math.round(s.volume * 100));
      ytPlayerRef.current.loadVideoById({
        videoId: track.youtubeId,
        startSeconds: 0,
      });
    } catch (err) {
      setIsLoading(false);
      setIsPlaying(false);
      setPlaybackError('Failed to load YouTube stream: ' + err.message);
    }
  }, []);

  useEffect(() => {
    loadAndPlayYtRef.current = loadAndPlayYt;
  }, [loadAndPlayYt]);

  // Execute HTML5 Audio Playback
  const loadAndPlayAudio = useCallback((track) => {
    if (ytPlayerRef.current && isYtReadyRef.current) {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch {}
    }
    if (ytTickerRef.current) {
      clearInterval(ytTickerRef.current);
      ytTickerRef.current = null;
    }

    let audio = audioElementRef.current;
    if (!audio) {
      audio = new Audio();
      audioElementRef.current = audio;

      audio.addEventListener('loadedmetadata', () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      });

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener('playing', () => {
        setIsPlaying(true);
        setIsLoading(false);
        setPlaybackError(null);
        soundCtrl.stopAmbientMusic();
        soundCtrl.setMusicPlayerActive(true);
      });

      audio.addEventListener('pause', () => {
        setIsPlaying(false);
        soundCtrl.setMusicPlayerActive(false);
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        soundCtrl.setMusicPlayerActive(false);
        if (handleTrackEndedRef.current) {
          handleTrackEndedRef.current();
        }
      });

      audio.addEventListener('error', () => {
        setIsPlaying(false);
        setIsLoading(false);
        setPlaybackError('Failed to load local audio file: ' + track.audioUrl);
        soundCtrl.setMusicPlayerActive(false);
      });
    }

    const s = liveStateRef.current;
    audio.src = track.audioUrl;
    audio.volume = s.isMuted ? 0 : s.volume;
    setIsLoading(true);
    setPlaybackError(null);
    audio.load();

    audio.play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
        soundCtrl.stopAmbientMusic();
        soundCtrl.setMusicPlayerActive(true);
      })
      .catch((_err) => {
        setIsLoading(false);
        setIsPlaying(false);
        setPlaybackError('Audio playback was blocked or file could not be loaded.');
      });
  }, []);

  // Primary Action: Play Selected Track
  const playTrack = useCallback((track, playlist = null) => {
    if (!track) return;

    // Immediately stop background ambient music
    soundCtrl.stopAmbientMusic();
    soundCtrl.setMusicPlayerActive(true);

    setCurrentTrack(track);
    if (playlist) setCurrentPlaylist(playlist);
    setDuration(track.duration || 215);
    setCurrentTime(0);
    setPlaybackError(null);

    if (track.sourceType === 'audio' || track.audioUrl) {
      loadAndPlayAudio(track);
    } else if (track.sourceType === 'youtube' || track.youtubeId) {
      loadAndPlayYt(track);
    } else {
      setIsPlaying(false);
      setIsLoading(false);
      setPlaybackError('No direct audio or video source available for this track.');
    }
  }, [loadAndPlayAudio, loadAndPlayYt]);

  // Pause Track
  const pauseTrack = useCallback(() => {
    setIsPlaying(false);
    setIsLoading(false);
    soundCtrl.setMusicPlayerActive(false);

    const s = liveStateRef.current;
    if (s.currentTrack?.sourceType === 'audio' || s.currentTrack?.audioUrl) {
      if (audioElementRef.current) audioElementRef.current.pause();
    } else {
      if (ytPlayerRef.current && isYtReadyRef.current) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {}
      }
    }
  }, []);

  // Resume Track
  const resumeTrack = useCallback(() => {
    const s = liveStateRef.current;
    if (!s.currentTrack) return;

    soundCtrl.stopAmbientMusic();
    soundCtrl.setMusicPlayerActive(true);
    setPlaybackError(null);

    if (s.currentTrack?.sourceType === 'audio' || s.currentTrack?.audioUrl) {
      if (audioElementRef.current) {
        audioElementRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
            setPlaybackError('Playback was blocked. Please tap play again.');
          });
      }
    } else {
      if (ytPlayerRef.current && isYtReadyRef.current) {
        try {
          ytPlayerRef.current.playVideo();
        } catch {
          setPlaybackError('Failed to resume video player.');
        }
      }
    }
  }, []);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  }, [isPlaying, pauseTrack, resumeTrack]);

  // Seek
  const seekTo = useCallback((seconds) => {
    const s = liveStateRef.current;
    setCurrentTime(seconds);

    if (s.currentTrack?.sourceType === 'audio' || s.currentTrack?.audioUrl) {
      if (audioElementRef.current) {
        audioElementRef.current.currentTime = seconds;
      }
    } else {
      if (ytPlayerRef.current && isYtReadyRef.current) {
        try {
          ytPlayerRef.current.seekTo(seconds, true);
        } catch {}
      }
    }
  }, []);

  // Volume Control
  const setVolume = useCallback((newVol) => {
    const val = Math.max(0, Math.min(1, newVol));
    setVolumeState(val);
    try {
      localStorage.setItem('afraa_soundtrack_volume', val.toString());
    } catch {}

    const s = liveStateRef.current;
    const effectiveVol = s.isMuted ? 0 : val;

    if (audioElementRef.current) {
      audioElementRef.current.volume = effectiveVol;
    }
    if (ytPlayerRef.current && isYtReadyRef.current) {
      try {
        ytPlayerRef.current.setVolume(Math.round(effectiveVol * 100));
      } catch {}
    }
  }, []);

  // Mute Toggle
  const toggleMute = useCallback(() => {
    setIsMutedState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('afraa_soundtrack_muted', next.toString());
      } catch {}

      const s = liveStateRef.current;
      const effectiveVol = next ? 0 : s.volume;

      if (audioElementRef.current) {
        audioElementRef.current.volume = effectiveVol;
      }
      if (ytPlayerRef.current && isYtReadyRef.current) {
        try {
          if (next) {
            ytPlayerRef.current.mute();
          } else {
            ytPlayerRef.current.unMute();
            ytPlayerRef.current.setVolume(Math.round(effectiveVol * 100));
          }
        } catch {}
      }
      return next;
    });
  }, []);

  // Retry failed playback
  const retryPlayback = useCallback(() => {
    const s = liveStateRef.current;
    if (s.currentTrack) {
      playTrack(s.currentTrack, s.currentPlaylist);
    }
  }, [playTrack]);

  // Next Track
  const nextTrack = useCallback(() => {
    const s = liveStateRef.current;

    // 1. From Queue if available
    if (s.queue.length > 0) {
      const next = s.queue[0];
      setQueue((prev) => prev.slice(1));
      playTrack(next);
      return;
    }

    // 2. From Current Playlist
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
  }, [pauseTrack, playTrack, seekTo]);

  // Previous Track
  const prevTrack = useCallback(() => {
    const s = liveStateRef.current;

    // If more than 3 seconds in, restart current track
    if (s.currentTime > 3) {
      seekTo(0);
      return;
    }

    const all = s.tracks || musicLibrary.tracks;
    const trackList = s.currentPlaylist
      ? all.filter((t) => s.currentPlaylist.trackIds.includes(t.id) || (t.playlistIds && t.playlistIds.includes(s.currentPlaylist.id)))
      : all;

    if (!trackList.length) return;

    const currentIndex = trackList.findIndex((t) => t.id === s.currentTrack?.id);
    if (currentIndex > 0) {
      playTrack(trackList[currentIndex - 1], s.currentPlaylist);
    } else {
      playTrack(trackList[trackList.length - 1], s.currentPlaylist);
    }
  }, [playTrack, seekTo]);

  // Track Ended Handler
  const handleTrackEnded = useCallback(() => {
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

  // Playback Mode Toggles
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

  // Custom Track Management
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
      sourceType: trackData.youtubeId ? 'youtube' : trackData.audioUrl ? 'audio' : 'external',
      youtubeId: trackData.youtubeId?.trim() || '',
      audioUrl: trackData.audioUrl?.trim() || '',
      isAvailable: Boolean(trackData.youtubeId || trackData.audioUrl),
      coverGradient: trackData.coverGradient || 'linear-gradient(135deg, #FF416C, #FF4B2B)',
      accentColor: trackData.accentColor || '#FF4B2B',
      spotifyUrl: trackData.spotifyUrl?.trim() || `https://open.spotify.com/search/${encodeURIComponent(trackData.title || '')}`,
      youtubeUrl: trackData.youtubeUrl?.trim() || `https://music.youtube.com/search?q=${encodeURIComponent(trackData.title || '')}`,
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
    isLoading,
    playbackError,
    retryPlayback,
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
    showVideoScreen,
    setShowVideoScreen,
    toggleShowVideo: () => setShowVideoScreen((prev) => !prev),
    initYouTubePlayer,
    isYtReady,
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
