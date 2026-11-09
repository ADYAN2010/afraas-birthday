/**
 * Comprehensive Web Audio Engine & Sound Design Controller
 * Handcrafted specifically for Afraa's Birthday website.
 *
 * Features:
 * - Procedural Music-Box / Celesta harmonic synthesizer (rich acoustic modeling)
 * - Support for optional /music/birthday.mp3 with seamless procedural fallback
 * - Meticulously designed, non-clipping Web Audio sound effects
 * - Independent Music Volume, Music Mute, and SFX Mute controls
 * - Smooth exponential/linear gain ramping to eliminate clicks/pops
 * - Master Dynamics Compressor to guarantee pristine audio quality
 * - Persistent preferences via localStorage
 * - Autoplay restriction handling on mobile and modern browsers
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.compressor = null;

    // Preferences (loaded from localStorage if available)
    this.musicVolume = this.loadNumberPref('afraa_music_vol', 0.45);
    this.isMusicMuted = this.loadBoolPref('afraa_music_muted', false);

    // SFX User Preference: User explicitly enabling or disabling sound effects
    // Backwards compatible with legacy 'afraa_sfx_muted'
    const legacySfxMuted = this.loadBoolPref('afraa_sfx_muted', false);
    this.isSfxUserEnabled = this.loadBoolPref('afraa_sfx_user_enabled', !legacySfxMuted);

    // Runtime state tracking for Centralized Audio Priority
    this.isPlayingMusic = false; // Background music active
    this.isMusicPlayerActive = false; // Afraa's Soundtrack music active
    this.isMusicPlayerSwitching = false; // Guard during track transitions
    this.switchingTimer = null;

    this.melodyTimer = null;
    this.audioElement = null;
    this.usingCustomAudio = false;

    // Rate limiter for sound effects to prevent overlapping clutter
    this.lastSfxTime = {};

    // Subscribers for state changes (UI reactivity)
    this.listeners = new Set();
  }

  // Centralized Audio Priority State Getters
  get isBackgroundMusicActive() {
    return Boolean(this.isPlayingMusic);
  }

  get isMusicPriorityActive() {
    return Boolean(this.isPlayingMusic || this.isMusicPlayerActive || this.isMusicPlayerSwitching);
  }

  get isSfxSuppressed() {
    return this.isMusicPriorityActive;
  }

  get isSfxMuted() {
    // SFX is effectively muted either if user disabled it OR if music priority is active
    return !this.isSfxUserEnabled || this.isMusicPriorityActive;
  }

  loadNumberPref(key, defaultVal) {
    if (typeof window === 'undefined') return defaultVal;
    try {
      const val = localStorage.getItem(key);
      return val !== null ? Math.max(0, Math.min(1, parseFloat(val))) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  loadBoolPref(key, defaultVal) {
    if (typeof window === 'undefined') return defaultVal;
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val === 'true' : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  savePrefs() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('afraa_music_vol', this.musicVolume.toString());
      localStorage.setItem('afraa_music_muted', this.isMusicMuted.toString());
      localStorage.setItem('afraa_sfx_user_enabled', this.isSfxUserEnabled.toString());
      localStorage.setItem('afraa_sfx_muted', (!this.isSfxUserEnabled).toString());
    } catch {
      // Storage unavailable fallback
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => {
      try {
        cb(this.getState());
      } catch {
        // Safe dispatch
      }
    });
  }

  getState() {
    return {
      // 4 Centralized Audio States required:
      // 1. Background music playback
      isBackgroundMusicActive: this.isBackgroundMusicActive,
      isPlaying: this.isPlayingMusic, // alias for backwards compatibility

      // 2. Music-player playback
      isMusicPlayerActive: this.isMusicPlayerActive,
      isMusicPlayerSwitching: this.isMusicPlayerSwitching,

      // 3. Website sound effects enabled/disabled by user
      isSfxUserEnabled: this.isSfxUserEnabled,

      // 4. Music priority mode (suppression active)
      isMusicPriorityActive: this.isMusicPriorityActive,
      isSfxSuppressed: this.isSfxSuppressed,

      // Auxiliary states
      isSfxMuted: this.isSfxMuted,
      volume: this.musicVolume,
      isMusicMuted: this.isMusicMuted,
      usingCustomAudio: this.usingCustomAudio,
    };
  }

  // Smoothly ramps SFX gain node to eliminate clicks & enforce suppression
  updateSfxGain() {
    if (!this.sfxGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Target gain is 0 if user disabled SFX OR music priority is active; 0.42 when active & enabled
      const targetGain = (!this.isSfxUserEnabled || this.isMusicPriorityActive) ? 0 : 0.42;
      this.sfxGain.gain.cancelScheduledValues(now);
      this.sfxGain.gain.setValueAtTime(this.sfxGain.gain.value, now);
      this.sfxGain.gain.linearRampToValueAtTime(targetGain, now + 0.04);
    } catch {
      // Safe fallback
    }
  }

  // Music Player (Afraa's Soundtrack) Playback State Hook
  setMusicPlayerActive(isActive) {
    const nextState = Boolean(isActive);
    if (this.isMusicPlayerActive === nextState) return;
    this.isMusicPlayerActive = nextState;
    if (nextState && this.switchingTimer) {
      clearTimeout(this.switchingTimer);
      this.switchingTimer = null;
      this.isMusicPlayerSwitching = false;
    }
    this.updateSfxGain();
    this.notify();
  }

  // Smooth guard during track transitions to prevent click leaks
  setMusicPlayerSwitching(isSwitching, autoResetMs = 450) {
    if (this.switchingTimer) {
      clearTimeout(this.switchingTimer);
      this.switchingTimer = null;
    }

    this.isMusicPlayerSwitching = Boolean(isSwitching);
    this.updateSfxGain();
    this.notify();

    if (isSwitching && autoResetMs > 0) {
      this.switchingTimer = setTimeout(() => {
        this.isMusicPlayerSwitching = false;
        this.updateSfxGain();
        this.notify();
      }, autoResetMs);
    }
  }

  // Initialize Web Audio Context and audio graph
  initContext() {
    if (typeof window === 'undefined') return;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master Dynamics Compressor to prevent clipping & normalize audio
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);
      this.compressor.connect(this.ctx.destination);

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.compressor);

      // Music Gain Node
      this.musicGain = this.ctx.createGain();
      const initialMusicLevel = this.isMusicMuted ? 0 : this.musicVolume;
      this.musicGain.gain.setValueAtTime(initialMusicLevel, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      // SFX Gain Node (keeps sound effects softer than main background music)
      this.sfxGain = this.ctx.createGain();
      const initialSfxLevel = (!this.isSfxUserEnabled || this.isMusicPriorityActive) ? 0 : 0.42;
      this.sfxGain.gain.setValueAtTime(initialSfxLevel, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Smooth Volume Control
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.initContext();
    if (this.musicGain && this.ctx) {
      const target = this.isMusicMuted ? 0 : this.musicVolume;
      this.musicGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.08);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.isMusicMuted ? 0 : this.musicVolume;
    }
    this.savePrefs();
    this.notify();
  }

  // Toggle Mute for Background Music
  toggleMusicMute() {
    this.isMusicMuted = !this.isMusicMuted;
    this.initContext();
    if (this.musicGain && this.ctx) {
      const target = this.isMusicMuted ? 0 : this.musicVolume;
      this.musicGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.1);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.isMusicMuted ? 0 : this.musicVolume;
    }
    this.savePrefs();
    this.notify();
    return this.isMusicMuted;
  }

  // Toggle Sound Effects independently (User Preference)
  toggleSfxUserEnabled() {
    this.isSfxUserEnabled = !this.isSfxUserEnabled;
    this.initContext();
    this.updateSfxGain();
    this.savePrefs();
    this.notify();
    return this.isSfxUserEnabled;
  }

  // Backwards-compatible alias for toggleSfxUserEnabled
  toggleSfxMute() {
    return !this.toggleSfxUserEnabled();
  }

  // =========================================================================
  // MUSIC BOX & ACOUSTIC CELESTA SYNTHESIZER
  // =========================================================================

  /**
   * Synthesize an authentic acoustic music-box / celesta tine
   * Multi-harmonic model: Fundamental + Octave harmonic + Metallic tine strike
   */
  playMusicBoxTone(freq, time, duration = 2.2, gainFactor = 0.2) {
    if (!this.ctx || this.isMusicMuted) return;

    try {
      const now = time;

      // Filter: warm vintage analog roll-off at 2600 Hz
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, now);

      // Note Gain envelope
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(gainFactor, now + 0.008);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // 1. Fundamental Sine
      const oscFundamental = this.ctx.createOscillator();
      oscFundamental.type = 'sine';
      oscFundamental.frequency.setValueAtTime(freq, now);

      // 2. Soft 2nd Harmonic (Octave higher chime warmth)
      const oscHarmonic = this.ctx.createOscillator();
      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      const harmonicGain = this.ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.18, now);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.6);
      oscHarmonic.connect(harmonicGain);

      // 3. Metallic Tine Plink Transient (Short physical impact)
      const oscTine = this.ctx.createOscillator();
      oscTine.type = 'sine';
      oscTine.frequency.setValueAtTime(freq * 4.2, now);

      const tineGain = this.ctx.createGain();
      tineGain.gain.setValueAtTime(0.12, now);
      tineGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      oscTine.connect(tineGain);

      // Connect nodes
      oscFundamental.connect(noteGain);
      harmonicGain.connect(noteGain);
      tineGain.connect(noteGain);

      noteGain.connect(filter);
      filter.connect(this.musicGain);

      // Start & stop oscillators
      oscFundamental.start(now);
      oscHarmonic.start(now);
      oscTine.start(now);

      oscFundamental.stop(now + duration);
      oscHarmonic.stop(now + duration);
      oscTine.stop(now + duration);
    } catch {
      // Graceful fallback
    }
  }

  startAmbientMusic() {
    if (this.isPlayingMusic) return;
    this.initContext();
    this.isPlayingMusic = true;
    this.updateSfxGain();

    // Check for optional custom audio file in /music/birthday.mp3
    if (!this.audioElement && typeof Audio !== 'undefined') {
      try {
        const audio = new Audio('/music/birthday.mp3');
        audio.loop = true;
        audio.volume = this.isMusicMuted ? 0 : this.musicVolume;

        audio
          .play()
          .then(() => {
            this.audioElement = audio;
            this.usingCustomAudio = true;
            this.updateSfxGain();
            this.notify();
          })
          .catch(() => {
            // Audio file unavailable: use procedural music box
            this.startMusicBoxLoop();
            this.updateSfxGain();
          });
        this.updateSfxGain();
        this.notify();
        return;
      } catch {
        // Fall back to synth
      }
    } else if (this.audioElement && this.usingCustomAudio) {
      this.audioElement.play().catch(() => {});
      this.updateSfxGain();
      this.notify();
      return;
    }

    this.startMusicBoxLoop();
    this.updateSfxGain();
    this.notify();
  }

  startMusicBoxLoop() {
    // 8-Measure Gentle Romantic Birthday Lullaby in G Major / D Major
    // Handcrafted with left-hand gentle arpeggios & right-hand music-box bells
    const melodyPhrase = [
      // Measure 1: G maj7 (Warm & welcoming)
      { note: 392.0, delay: 0, dur: 2.2, vol: 0.16 }, // G4 bass
      { note: 587.33, delay: 350, dur: 1.8, vol: 0.12 }, // D5
      { note: 783.99, delay: 700, dur: 2.0, vol: 0.18 }, // G5 melody
      { note: 987.77, delay: 1200, dur: 2.2, vol: 0.22 }, // B5 melody

      // Measure 2: Em9 (Reflective & sweet)
      { note: 329.63, delay: 1800, dur: 2.2, vol: 0.16 }, // E4 bass
      { note: 493.88, delay: 2150, dur: 1.8, vol: 0.12 }, // B4
      { note: 739.99, delay: 2500, dur: 2.0, vol: 0.18 }, // F#5
      { note: 880.0, delay: 3000, dur: 2.2, vol: 0.22 }, // A5

      // Measure 3: C maj7 (Lyrical & bright)
      { note: 261.63, delay: 3600, dur: 2.2, vol: 0.16 }, // C4 bass
      { note: 392.0, delay: 3950, dur: 1.8, vol: 0.12 }, // G4
      { note: 659.25, delay: 4300, dur: 2.0, vol: 0.18 }, // E5
      { note: 783.99, delay: 4800, dur: 2.2, vol: 0.22 }, // G5

      // Measure 4: D9 sus4 (Gentle anticipation)
      { note: 293.66, delay: 5400, dur: 2.2, vol: 0.16 }, // D4 bass
      { note: 440.0, delay: 5750, dur: 1.8, vol: 0.12 }, // A4
      { note: 587.33, delay: 6100, dur: 2.0, vol: 0.18 }, // D5
      { note: 739.99, delay: 6600, dur: 2.2, vol: 0.22 }, // F#5

      // Measure 5: G maj7 / B (Playful climb)
      { note: 493.88, delay: 7200, dur: 2.2, vol: 0.16 }, // B4
      { note: 783.99, delay: 7550, dur: 1.8, vol: 0.18 }, // G5
      { note: 987.77, delay: 7900, dur: 2.2, vol: 0.22 }, // B5
      { note: 1174.66, delay: 8400, dur: 2.4, vol: 0.2 }, // D6 chime

      // Measure 6: Am7 (Cozy warmth)
      { note: 440.0, delay: 9000, dur: 2.2, vol: 0.16 }, // A4
      { note: 659.25, delay: 9350, dur: 1.8, vol: 0.14 }, // E5
      { note: 880.0, delay: 9700, dur: 2.0, vol: 0.18 }, // A5
      { note: 1046.5, delay: 10200, dur: 2.2, vol: 0.22 }, // C6

      // Measure 7: C add9 (Sweet resolving harmonic)
      { note: 523.25, delay: 10800, dur: 2.2, vol: 0.16 }, // C5
      { note: 587.33, delay: 11150, dur: 1.8, vol: 0.14 }, // D5
      { note: 783.99, delay: 11500, dur: 2.0, vol: 0.18 }, // G5
      { note: 987.77, delay: 12000, dur: 2.2, vol: 0.22 }, // B5

      // Measure 8: D add9 (Peaceful waltz turnaround)
      { note: 587.33, delay: 12600, dur: 2.2, vol: 0.16 }, // D5
      { note: 739.99, delay: 12950, dur: 1.8, vol: 0.14 }, // F#5
      { note: 880.0, delay: 13300, dur: 2.0, vol: 0.18 }, // A5
      { note: 783.99, delay: 13800, dur: 2.8, vol: 0.24 }, // G5 resolution
    ];

    const loopLength = 14800; // 14.8 seconds per cycle

    const playLoop = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const baseTime = this.ctx.currentTime;
      melodyPhrase.forEach((item) => {
        this.playMusicBoxTone(
          item.note,
          baseTime + item.delay / 1000,
          item.dur,
          item.vol
        );
      });
      this.melodyTimer = setTimeout(playLoop, loopLength);
    };

    playLoop();
  }

  stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.updateSfxGain();
    this.notify();
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  // =========================================================================
  // REFINED UI SOUND EFFECTS
  // =========================================================================

  isThrottled(type, minIntervalMs = 80) {
    if (!type || !this.lastSfxTime[type]) return false;
    return (Date.now() - this.lastSfxTime[type]) < minIntervalMs;
  }

  // Centralized Gate for All Sound Effects:
  // Strictly suppresses all sound effects whenever any music is playing
  // or user disabled sound effects.
  canPlaySfx(type, minIntervalMs = 80) {
    // 1. Strict Music Priority: if any music is active or switching, suppress all SFX
    if (this.isMusicPriorityActive) {
      return false;
    }

    // 2. User preference: if user explicitly disabled SFX, do not play
    if (!this.isSfxUserEnabled) {
      return false;
    }

    // 3. Rate limiting / throttling
    if (type && this.isThrottled(type, minIntervalMs)) {
      return false;
    }

    return true;
  }

  recordSfxPlay(type) {
    if (type) {
      this.lastSfxTime[type] = Date.now();
    }
  }

  // 1. Tactile UI Click / Button Tap
  playTap() {
    if (!this.canPlaySfx('tap', 70)) return;
    this.recordSfxPlay('tap');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;

      // Filtered wood-block / tactile pop
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(840, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Graceful fallback
    }
  }

  // 2. Soft Paper Envelope Opening Sound
  playEnvelopeOpen() {
    if (!this.canPlaySfx('envelope', 300)) return;
    this.recordSfxPlay('envelope');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;

      // Realistic paper rustle using filtered shaped noise
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.12);
      filter.Q.setValueAtTime(1.8, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(now);

      // Sweet ascending paper-slide chime (G5 -> C6)
      const chimeNotes = [783.99, 1046.5];
      chimeNotes.forEach((freq, idx) => {
        const chimeTime = now + 0.04 + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, chimeTime);

        gain.gain.setValueAtTime(0, chimeTime);
        gain.gain.linearRampToValueAtTime(0.07, chimeTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(chimeTime);
        osc.stop(chimeTime + 0.65);
      });
    } catch {
      // Graceful fallback
    }
  }

  // 3. Delicate Paper Unfolding (for hidden notes)
  playPaperUnfold() {
    this.playEnvelopeOpen();
  }

  // 4. Match Strike & Candle Lighting
  playCandleLight() {
    if (!this.canPlaySfx('candleLight', 250)) return;
    this.recordSfxPlay('candleLight');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;

      // Soft match strike noise
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2200, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);

      // Warm candle flame glow tone (F#5)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(739.99, now + 0.03);

      oscGain.gain.setValueAtTime(0, now + 0.03);
      oscGain.gain.linearRampToValueAtTime(0.06, now + 0.06);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(oscGain);
      oscGain.connect(this.sfxGain);

      osc.start(now + 0.03);
      osc.stop(now + 0.85);
    } catch {
      // Graceful fallback
    }
  }

  // 5. Candle Blow Puff & Wishing Stars Chime
  playCandleBlow() {
    if (!this.canPlaySfx('candleBlow', 400)) return;
    this.recordSfxPlay('candleBlow');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;

      // Soft breath puff noise buffer
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, now);
      filter.frequency.exponentialRampToValueAtTime(140, now + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);

      // Followed by gentle wishing stars chime cascade (E5, G#5, B5, E6)
      const starNotes = [659.25, 830.61, 987.77, 1318.51];
      starNotes.forEach((freq, i) => {
        const chimeTime = now + 0.24 + i * 0.09;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, chimeTime);

        oscGain.gain.setValueAtTime(0, chimeTime);
        oscGain.gain.linearRampToValueAtTime(0.08, chimeTime + 0.02);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 1.2);

        osc.connect(oscGain);
        oscGain.connect(this.sfxGain);

        osc.start(chimeTime);
        osc.stop(chimeTime + 1.25);
      });
    } catch {
      // Graceful fallback
    }
  }

  // 6. Sparkling Magical Chord Arpeggio (Surprises & Highlights)
  playMagicalSparkle() {
    if (!this.canPlaySfx('sparkle', 200)) return;
    this.recordSfxPlay('sparkle');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // F# pentatonic dreamy chime cascade
      const notes = [739.99, 830.61, 932.33, 1108.73, 1244.51, 1479.98];
      notes.forEach((freq, idx) => {
        const chimeTime = now + idx * 0.065;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, chimeTime);

        gain.gain.setValueAtTime(0, chimeTime);
        gain.gain.linearRampToValueAtTime(0.07, chimeTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 1.1);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(chimeTime);
        osc.stop(chimeTime + 1.15);
      });
    } catch {
      // Graceful fallback
    }
  }

  // 7. Cheerful Grand Finale Fanfare & Celebration Chimes
  playCelebrationFinale() {
    if (!this.canPlaySfx('finale', 500)) return;
    this.recordSfxPlay('finale');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Joyous G major fanfare arpeggio (G5, B5, D6, G6) + bell glockenspiel
      const fanfare = [
        { note: 783.99, delay: 0 },
        { note: 987.77, delay: 0.08 },
        { note: 1174.66, delay: 0.16 },
        { note: 1567.98, delay: 0.26 },
        { note: 1975.53, delay: 0.42 },
      ];

      fanfare.forEach((item) => {
        const noteTime = now + item.delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.note, noteTime);

        gain.gain.setValueAtTime(0, noteTime);
        gain.gain.linearRampToValueAtTime(0.09, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(noteTime);
        osc.stop(noteTime + 1.55);
      });
    } catch {
      // Graceful fallback
    }
  }

  // 8. Crisp Balloon Pop
  playBalloonPop() {
    if (!this.canPlaySfx('pop', 80)) return;
    this.recordSfxPlay('pop');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Graceful fallback
    }
  }

  // 9. Fortune Card Slide / Shuffle Tick
  playCardFlip() {
    if (!this.canPlaySfx('cardFlip', 120)) return;
    this.recordSfxPlay('cardFlip');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {
      // Graceful fallback
    }
  }

  // 10. Quiz Success Chime
  playSuccessChime() {
    if (!this.canPlaySfx('quizSuccess', 250)) return;
    this.recordSfxPlay('quizSuccess');
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const now = this.ctx.currentTime;
      // Cheerful double chime: E5 -> A5
      [659.25, 880.0].forEach((freq, idx) => {
        const chimeTime = now + idx * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, chimeTime);

        gain.gain.setValueAtTime(0, chimeTime);
        gain.gain.linearRampToValueAtTime(0.08, chimeTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 0.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(chimeTime);
        osc.stop(chimeTime + 0.85);
      });
    } catch {
      // Graceful fallback
    }
  }
}

export const soundCtrl = new SoundController();
