/**
 * Procedural Melodic Audio Synthesizer for Afraa's Soundtrack
 * Handcrafted acoustic and chill harmonic generator using Web Audio API.
 * Ensures zero-dependency, 100% playable music even without physical audio files.
 */

class MusicSoundtrackSynthesizer {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.currentPreset = null;
    this.isPlaying = false;
    this.activeNodes = [];
    this.stepTimer = null;
    this.loopTimer = null;
    this.volume = 0.7;
    this.isMuted = false;
    this.trackDuration = 180;
    this.currentTime = 0;
    this.timeTicker = null;
    this.onTimeUpdate = null;
    this.onEnded = null;
  }

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master Compressor
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(14, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4.5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);
      this.compressor.connect(this.ctx.destination);

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.compressor);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.05);
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.08);
    }
  }

  playNote(freq, startTime, duration = 1.8, type = 'sine', gainVal = 0.15, filterCutoff = 2600) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterCutoff, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);

      this.activeNodes.push(osc);
      setTimeout(() => {
        const idx = this.activeNodes.indexOf(osc);
        if (idx !== -1) this.activeNodes.splice(idx, 1);
      }, (duration + 0.1) * 1000);
    } catch {
      // Fallback
    }
  }

  // Play a harmonic chime (Fundamental + Octave + Harmonic)
  playChime(freq, startTime, duration = 2.4, gain = 0.16) {
    this.playNote(freq, startTime, duration, 'sine', gain * 0.7, 2800);
    this.playNote(freq * 2, startTime, duration * 0.7, 'triangle', gain * 0.35, 3400);
    this.playNote(freq * 3.02, startTime, 0.08, 'sine', gain * 0.15, 4200); // metallic tine
  }

  // Play a warm acoustic guitar plucked chord note
  playPluck(freq, startTime, duration = 1.6, gain = 0.18) {
    this.playNote(freq, startTime, duration, 'triangle', gain * 0.75, 2200);
    this.playNote(freq * 2, startTime, duration * 0.4, 'sine', gain * 0.25, 2600);
  }

  // Play a soft rhodes electric piano note
  playRhodes(freq, startTime, duration = 2.2, gain = 0.16) {
    this.playNote(freq, startTime, duration, 'sine', gain * 0.8, 1800);
    this.playNote(freq * 2, startTime, duration * 0.8, 'sine', gain * 0.2, 2200);
    this.playNote(freq * 3, startTime, duration * 0.3, 'triangle', gain * 0.1, 2400);
  }

  startTrack(track, startFrom = 0) {
    this.stop();
    this.init();

    this.currentPreset = track.proceduralPreset || 'celestaWaltz';
    this.trackDuration = track.duration || 180;
    this.currentTime = Math.max(0, Math.min(this.trackDuration - 1, startFrom));
    this.isPlaying = true;

    // Start time ticker
    this.timeTicker = setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += 0.5;
      if (this.onTimeUpdate) {
        this.onTimeUpdate(this.currentTime, this.trackDuration);
      }
      if (this.currentTime >= this.trackDuration) {
        this.stop();
        if (this.onEnded) this.onEnded();
      }
    }, 500);

    this.runPatternLoop();
  }

  runPatternLoop() {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const p = this.currentPreset;

    if (p === 'celestaWaltz') {
      // 8-measure celesta waltz in G Major (Loop = 12s)
      const notes = [
        { f: 392.0, d: 0, dur: 2.5 },
        { f: 587.33, d: 0.4, dur: 2.0 },
        { f: 783.99, d: 0.8, dur: 2.2 },
        { f: 987.77, d: 1.4, dur: 2.5 },
        { f: 329.63, d: 2.0, dur: 2.5 },
        { f: 493.88, d: 2.4, dur: 2.0 },
        { f: 739.99, d: 2.8, dur: 2.2 },
        { f: 880.0, d: 3.4, dur: 2.5 },
        { f: 261.63, d: 4.0, dur: 2.5 },
        { f: 523.25, d: 4.5, dur: 2.0 },
        { f: 659.25, d: 5.0, dur: 2.2 },
        { f: 783.99, d: 5.6, dur: 2.5 },
        { f: 293.66, d: 6.2, dur: 2.5 },
        { f: 440.0, d: 6.7, dur: 2.0 },
        { f: 587.33, d: 7.2, dur: 2.2 },
        { f: 739.99, d: 7.8, dur: 2.5 },
        { f: 987.77, d: 8.5, dur: 2.6 },
        { f: 783.99, d: 9.8, dur: 3.0 },
      ];
      notes.forEach((n) => this.playChime(n.f, now + n.d, n.dur, 0.16));
      this.loopTimer = setTimeout(() => this.runPatternLoop(), 12000);
    } else if (p === 'acousticWarm' || p === 'upbeatAcoustic') {
      // Warm fingerpicked acoustic in D Major (Loop = 9.6s)
      const chords = [
        { root: 293.66, fifth: 440.0, high: 587.33, d: 0 },
        { root: 246.94, fifth: 369.99, high: 493.88, d: 2.4 },
        { root: 220.0, fifth: 329.63, high: 440.0, d: 4.8 },
        { root: 293.66, fifth: 440.0, high: 739.99, d: 7.2 },
      ];
      chords.forEach((c) => {
        this.playPluck(c.root, now + c.d, 2.2, 0.18);
        this.playPluck(c.fifth, now + c.d + 0.3, 1.8, 0.15);
        this.playPluck(c.high, now + c.d + 0.6, 1.6, 0.16);
        this.playPluck(c.fifth, now + c.d + 0.9, 1.4, 0.14);
        this.playPluck(c.high * 1.25, now + c.d + 1.2, 1.6, 0.17);
        this.playPluck(c.fifth, now + c.d + 1.5, 1.4, 0.14);
      });
      this.loopTimer = setTimeout(() => this.runPatternLoop(), 9600);
    } else if (p === 'indieChill' || p === 'lofiChill' || p === 'rhodesGuitar') {
      // Smooth Lofi Rhodes in C Major 9 / F Major 7 (Loop = 10s)
      const chords = [
        { notes: [261.63, 329.63, 392.0, 493.88, 587.33], d: 0 },
        { notes: [220.0, 261.63, 329.63, 392.0], d: 2.5 },
        { notes: [174.61, 261.63, 329.63, 392.0, 440.0], d: 5.0 },
        { notes: [196.0, 246.94, 293.66, 349.23, 440.0], d: 7.5 },
      ];
      chords.forEach((c) => {
        c.notes.forEach((f, idx) => {
          this.playRhodes(f, now + c.d + idx * 0.04, 2.4, 0.14);
        });
      });
      this.loopTimer = setTimeout(() => this.runPatternLoop(), 10000);
    } else {
      // Ambient Piano & Nocturne Harmonies (Loop = 11s)
      const pianoNotes = [
        { f: 220.0, d: 0, dur: 3.0 },
        { f: 440.0, d: 0.5, dur: 2.5 },
        { f: 659.25, d: 1.0, dur: 2.2 },
        { f: 783.99, d: 1.8, dur: 2.8 },
        { f: 261.63, d: 3.2, dur: 3.0 },
        { f: 523.25, d: 3.8, dur: 2.5 },
        { f: 659.25, d: 4.4, dur: 2.2 },
        { f: 880.0, d: 5.2, dur: 2.8 },
        { f: 196.0, d: 6.5, dur: 3.0 },
        { f: 392.0, d: 7.1, dur: 2.5 },
        { f: 587.33, d: 7.7, dur: 2.2 },
        { f: 739.99, d: 8.5, dur: 3.2 },
      ];
      pianoNotes.forEach((n) => this.playNote(n.f, now + n.d, n.dur, 'sine', 0.16, 2200));
      this.loopTimer = setTimeout(() => this.runPatternLoop(), 11000);
    }
  }

  seek(seconds) {
    this.currentTime = Math.max(0, Math.min(this.trackDuration - 1, seconds));
    if (this.onTimeUpdate) {
      this.onTimeUpdate(this.currentTime, this.trackDuration);
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.timeTicker) {
      clearInterval(this.timeTicker);
      this.timeTicker = null;
    }
  }

  resume() {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;
    this.timeTicker = setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += 0.5;
      if (this.onTimeUpdate) {
        this.onTimeUpdate(this.currentTime, this.trackDuration);
      }
      if (this.currentTime >= this.trackDuration) {
        this.stop();
        if (this.onEnded) this.onEnded();
      }
    }, 500);
    this.runPatternLoop();
  }

  stop() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.timeTicker) {
      clearInterval(this.timeTicker);
      this.timeTicker = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        node.stop();
      } catch {}
    });
    this.activeNodes = [];
  }
}

export const musicSynth = new MusicSoundtrackSynthesizer();
