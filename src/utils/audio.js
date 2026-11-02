/**
 * Elegant Web Audio synthesizer for background melody and sound effects.
 * 100% self-contained, no external CDN dependencies, graceful fallbacks.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.melodyTimer = null;
    this.audioElement = null;
    this.usingCustomAudio = false;
    this.volume = 0.4;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play a soft bell/chime note
  playChimeTone(freq, time, duration = 1.2, gainValue = 0.15) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine + soft triangle warmth
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(gainValue * this.volume, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Audio fallback silent handling
    }
  }

  // Sparkling magical chord arpeggio for surprise reveal
  playMagicalSparkle() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    // F# pentatonic / dreamy celestial notes (F#5, G#5, A#5, C#6, D#6, F#6)
    const notes = [739.99, 830.61, 932.33, 1108.73, 1244.51, 1479.98];
    notes.forEach((freq, idx) => {
      this.playChimeTone(freq, now + idx * 0.08, 1.4, 0.12);
    });
  }

  // Candle blow puff and wishing chime
  playCandleBlow() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Soft breath / puff noise buffer
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25 * this.volume, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);

      // Followed by gentle wishing stars chime
      setTimeout(() => {
        if (!this.ctx) return;
        const chimeNow = this.ctx.currentTime;
        [880, 1046.5, 1318.5, 1760].forEach((freq, i) => {
          this.playChimeTone(freq, chimeNow + i * 0.1, 1.8, 0.1);
        });
      }, 250);
    } catch {
      // Graceful fallback
    }
  }

  // Soft envelope unfold sound
  playEnvelopeOpen() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      this.playChimeTone(freq, now + idx * 0.09, 1.2, 0.09);
    });
  }

  // Ambient gentle music box / lullaby progression
  // Gently plays a relaxing romantic chord loop
  startAmbientMusic() {
    if (this.isPlayingMusic) return;
    this.initContext();
    this.isPlayingMusic = true;

    // First try loading optional local audio file from /music/birthday.mp3
    if (!this.audioElement && typeof Audio !== 'undefined') {
      try {
        const audio = new Audio('/music/birthday.mp3');
        audio.loop = true;
        audio.volume = this.volume * 0.6;
        
        audio.play().then(() => {
          this.audioElement = audio;
          this.usingCustomAudio = true;
        }).catch(() => {
          // If custom file does not exist, fall back to our beautiful synthesized music box
          this.startMusicBoxLoop();
        });
        return;
      } catch {
        // Fall back to synth
      }
    }

    this.startMusicBoxLoop();
  }

  startMusicBoxLoop() {
    // Dreamy celestial melody notes (frequencies in Hz)
    // Progression: D maj7 -> Bm7 -> G maj7 -> A add9
    const phrase = [
      // Measure 1: D maj7
      { note: 587.33, delay: 0 },    // D5
      { note: 739.99, delay: 500 },  // F#5
      { note: 880.00, delay: 1000 }, // A5
      { note: 1108.73, delay: 1500 },// C#6
      // Measure 2: Bm7
      { note: 493.88, delay: 2200 }, // B4
      { note: 739.99, delay: 2700 }, // F#5
      { note: 880.00, delay: 3200 }, // A5
      { note: 987.77, delay: 3700 }, // B5
      // Measure 3: G maj7
      { note: 392.00, delay: 4400 }, // G4
      { note: 587.33, delay: 4900 }, // D5
      { note: 739.99, delay: 5400 }, // F#5
      { note: 880.00, delay: 5900 }, // A5
      // Measure 4: A add9
      { note: 440.00, delay: 6600 }, // A4
      { note: 659.25, delay: 7100 }, // E5
      { note: 880.00, delay: 7600 }, // A5
      { note: 1108.73, delay: 8100 },// C#6
    ];

    const loopLength = 9000;

    const playLoop = () => {
      if (!this.isPlayingMusic || this.isMuted || !this.ctx) return;
      const baseTime = this.ctx.currentTime;
      phrase.forEach(item => {
        this.playChimeTone(item.note, baseTime + item.delay / 1000, 1.8, 0.08);
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
}

export const soundCtrl = new SoundController();
