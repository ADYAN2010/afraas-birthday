import confetti from 'canvas-confetti';

/**
 * Triggers a celebratory candle blow out confetti
 */
export const triggerCandleConfetti = () => {
  const count = 120;
  const defaults = {
    origin: { y: 0.65 },
    colors: ['#A94B59', '#DDA6B0', '#F3DDE2', '#F7D6BD', '#E9E2F5', '#FFF8E9'],
    disableForReducedMotion: true,
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.6),
    spread: 60,
    startVelocity: 35,
    scalar: 0.9,
    shapes: ['circle', 'star'],
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.4),
    spread: 100,
    startVelocity: 45,
    decay: 0.92,
    scalar: 1.1,
  });
};

/**
 * Triggers grand finale multi-stage fireworks
 */
export const triggerFinaleConfetti = () => {
  const duration = 3.5 * 1000;
  const end = Date.now() + duration;

  const colors = ['#A94B59', '#DDA6B0', '#F7D6BD', '#E9E2F5', '#FFF8E9', '#F3DDE2'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      disableForReducedMotion: true,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // Big star burst in center
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#ffd166', '#ffffff', '#c4b1fc', '#fbe6ee'],
      shapes: ['star', 'circle'],
      scalar: 1.2,
      disableForReducedMotion: true,
    });
  }, 400);

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.4 },
      colors: ['#e0688c', '#dfb65b', '#9f80f7'],
      disableForReducedMotion: true,
    });
  }, 1200);
};

/**
 * Gentle sparkle burst for button clicks
 */
export const triggerSparkleBurst = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 25,
    spread: 40,
    startVelocity: 20,
    origin: { x, y },
    colors: ['#A94B59', '#DDA6B0', '#F7D6BD', '#E9E2F5'],
    shapes: ['star', 'circle'],
    scalar: 0.7,
    disableForReducedMotion: true,
  });
};
