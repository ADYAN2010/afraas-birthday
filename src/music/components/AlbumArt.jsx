import React from 'react';
import { Music, Sparkles, Heart, Moon, Coffee, Cake, Sun, Repeat } from 'lucide-react';

const iconComponents = {
  Cake: Cake,
  Moon: Moon,
  Coffee: Coffee,
  Repeat: Repeat,
  Sun: Sun,
  Sparkles: Sparkles,
  Music: Music,
  Heart: Heart,
};

export default function AlbumArt({
  title = '',
  gradient = 'linear-gradient(135deg, #242424, #121212)',
  accentColor = '#B8E986',
  icon = 'Music',
  size = 140,
  borderRadius = 8,
  className = '',
}) {
  const IconComp = iconComponents[icon] || Music;

  return (
    <div
      className={className}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        aspectRatio: '1 / 1',
        borderRadius: `${borderRadius}px`,
        background: gradient,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {/* Subtle Vinyl Grooves Radial Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.15) 36%, transparent 38%, rgba(255,255,255,0.06) 55%, transparent 58%, rgba(0,0,0,0.2) 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Left Subtle Accent Chip */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          padding: '2px 6px',
          borderRadius: '4px',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          fontSize: '0.62rem',
          fontWeight: 700,
          color: accentColor,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        AFRAA
      </div>

      {/* Center Icon Graphic */}
      <div
        style={{
          width: '42%',
          height: '42%',
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 2,
        }}
      >
        <IconComp size={Math.max(16, typeof size === 'number' ? size * 0.22 : 28)} color={accentColor} />
      </div>

      {/* Bottom Title Preview for Large Artworks */}
      {typeof size === 'number' && size >= 130 && (
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            right: '8px',
            textAlign: 'center',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#FFFFFF',
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            zIndex: 2,
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
}
