import React, { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = prefersReducedMotion ? 25 : Math.min(Math.floor((width * height) / 14000), 75);

    // Pastel Cute Palette: powder pink, dusty rose, lavender, peach, soft cherry
    const colors = [
      { r: 243, g: 221, b: 226 }, // Powder Pink
      { r: 221, g: 166, b: 176 }, // Dusty Rose
      { r: 233, g: 226, b: 245 }, // Soft Lavender
      { r: 247, g: 214, b: 189 }, // Warm Peach
      { r: 169, g: 75, b: 89 },   // Muted Cherry
    ];

    // Star particles
    const stars = Array.from({ length: particleCount }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.5,
        baseAlpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.2 - 0.05,
        color: `rgba(${color.r}, ${color.g}, ${color.b}`,
      };
    });

    // Ambient floating bokeh orbs
    const orbCount = prefersReducedMotion ? 4 : 8;
    const orbs = Array.from({ length: orbCount }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 80 + 50,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.05 + 0.03,
        color: `rgba(${color.r}, ${color.g}, ${color.b}`,
      };
    });

    // Shooting star state
    let shootingStar = null;
    let nextShootingStarTime = Date.now() + Math.random() * 6000 + 4000;

    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * (width * 0.7),
        y: Math.random() * (height * 0.4),
        length: Math.random() * 90 + 70,
        speed: Math.random() * 10 + 12,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
        decay: 0.02,
      };
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing bokeh orbs
      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `${orb.color}, ${orb.alpha})`);
        grad.addColorStop(1, `${orb.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw twinkling stars
      stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.05, star.baseAlpha + Math.sin(star.twinklePhase) * 0.35);

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.fillStyle = `${star.color}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra delicate cross sparkle for larger stars
        if (star.radius > 1.4 && currentAlpha > 0.6) {
          ctx.strokeStyle = `${star.color}, ${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2.5, star.y);
          ctx.lineTo(star.x + star.radius * 2.5, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2.5);
          ctx.lineTo(star.x, star.y + star.radius * 2.5);
          ctx.stroke();
        }
      });

      // 3. Draw shooting star
      const now = Date.now();
      if (!shootingStar && now > nextShootingStarTime && !prefersReducedMotion) {
        spawnShootingStar();
      }

      if (shootingStar) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= shootingStar.decay;

        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, `rgba(255, 238, 209, ${Math.max(0, shootingStar.opacity)})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();

        if (shootingStar.opacity <= 0) {
          shootingStar = null;
          nextShootingStarTime = now + Math.random() * 9000 + 7000;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
