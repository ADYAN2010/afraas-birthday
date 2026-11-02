import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, X, Maximize2, Image as ImageIcon } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import BotanicalFlourish from './svg/BotanicalFlourish';

// Import images directly from assets for optimal Vite bundling & Vercel deployment
import featuredPhoto from '../assets/images/afraa-featured-floral.png';
import collageSareeStory from '../assets/images/afraa-collage-saree-story.png';
import collageGhalibAesthetic from '../assets/images/afraa-collage-ghalib-aesthetic.png';

export default function PhotoGallery() {
  const [activeImage, setActiveImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      type: 'featured',
      src: featuredPhoto,
      tag: 'FEATURED PORTRAIT',
      title: 'Garden Reverie',
      caption: 'A serene evening moment surrounded by blooming golden blossoms.',
      alt: 'Afraa sitting gracefully in a floral pink saree beside yellow flowers at dusk',
      aspectRatio: '1 / 1',
    },
    {
      id: 2,
      type: 'collage',
      src: collageSareeStory,
      tag: 'SCRAPBOOK COLLAGE',
      title: 'Ammu’s Saree Story',
      caption: 'Crimson red drape, glass bangles, and artistic calligraphy.',
      alt: 'Artistic photo collage of Afraa in an embroidered red saree with traditional bangles',
      aspectRatio: '490 / 760',
    },
    {
      id: 3,
      type: 'collage',
      src: collageGhalibAesthetic,
      tag: 'SCRAPBOOK COLLAGE',
      title: 'Poetry & Candid Frames',
      caption: 'Mirror reflections, timeless poetry, and vibrant aesthetic details.',
      alt: 'Artistic photo collage of Afraa with Ghalib poetry and traditional accents',
      aspectRatio: '468 / 761',
    },
  ];

  return (
    <section
      id="gallery-section"
      style={{
        position: 'relative',
        padding: 'clamp(50px, 8vw, 90px) clamp(14px, 3vw, 24px)',
        maxWidth: '1200px',
        margin: '0 auto',
        zIndex: 2,
        width: '100%',
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(223, 182, 91, 0.12)',
            border: '1px solid rgba(223, 182, 91, 0.35)',
            color: '#dfb65b',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Camera size={14} />
          <span>MOMENTS & MEMORIES</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            letterSpacing: '-0.02em',
            marginBottom: '10px',
          }}
          className="text-gold-gradient"
        >
          A Little Photo Corner
        </h2>

        {/* Hand-drawn Botanical SVG Flourish */}
        <BotanicalFlourish delay={0.2} maxWidth={260} />

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 2.6vw, 1.45rem)',
            color: '#d8c8ff',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          “A collection of lovely pictures ✨”
        </p>
      </motion.div>

      {/* Editorial Responsive Grid Layout: Clean Single Stack on Mobile, 3-col on Desktop */}
      <div className="gallery-grid">
        {/* 1. Featured Square Portrait (Prominent Showcase) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{
            padding: '18px',
            background: 'linear-gradient(145deg, rgba(32, 16, 54, 0.75) 0%, rgba(18, 8, 32, 0.9) 100%)',
            border: '1px solid rgba(223, 182, 91, 0.38)',
            borderRadius: '20px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(223, 182, 91, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Matting Frame */}
          <div
            onClick={() => setActiveImage(galleryItems[0])}
            title="Click to view full screen"
            style={{
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#0d0617',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src={galleryItems[0].src}
              alt={galleryItems[0].alt}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: galleryItems[0].aspectRatio,
                display: 'block',
                objectFit: 'contain',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />

            {/* Hover Expand Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(15, 6, 26, 0.75)',
                backdropFilter: 'blur(10px)',
                padding: '6px 12px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#faeed1',
                border: '1px solid rgba(223, 182, 91, 0.3)',
              }}
            >
              <Maximize2 size={12} color="#dfb65b" />
              <span>Expand</span>
            </div>
          </div>

          {/* Editorial Caption Underneath */}
          <div style={{ padding: '18px 8px 8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: '#dfb65b',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              <Sparkles size={12} />
              <span>{galleryItems[0].tag}</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: '#faf8f5',
                marginBottom: '6px',
              }}
            >
              {galleryItems[0].title}
            </h3>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#c4b1fc',
                lineHeight: 1.55,
              }}
            >
              {galleryItems[0].caption}
            </p>
          </div>
        </motion.div>

        {/* 2. Photo Collage 1 (Ammu's Engagement Saree) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{
            padding: '18px',
            background: 'linear-gradient(145deg, rgba(32, 16, 54, 0.75) 0%, rgba(18, 8, 32, 0.9) 100%)',
            border: '1px solid rgba(223, 182, 91, 0.38)',
            borderRadius: '20px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(223, 182, 91, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Matting Frame */}
          <div
            onClick={() => setActiveImage(galleryItems[1])}
            title="Click to view full screen"
            style={{
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#0d0617',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src={galleryItems[1].src}
              alt={galleryItems[1].alt}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: galleryItems[1].aspectRatio,
                display: 'block',
                objectFit: 'contain',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.025)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />

            {/* Hover Expand Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(15, 6, 26, 0.75)',
                backdropFilter: 'blur(10px)',
                padding: '6px 12px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#faeed1',
                border: '1px solid rgba(223, 182, 91, 0.3)',
              }}
            >
              <Maximize2 size={12} color="#dfb65b" />
              <span>Full View</span>
            </div>
          </div>

          {/* Editorial Caption Underneath */}
          <div style={{ padding: '18px 8px 8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: '#f4b4cb',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              <Sparkles size={12} />
              <span>{galleryItems[1].tag}</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: '#faf8f5',
                marginBottom: '6px',
              }}
            >
              {galleryItems[1].title}
            </h3>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#c4b1fc',
                lineHeight: 1.55,
              }}
            >
              {galleryItems[1].caption}
            </p>
          </div>
        </motion.div>

        {/* 3. Photo Collage 2 (Ghalib Poetry & Aesthetic) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{
            padding: '18px',
            background: 'linear-gradient(145deg, rgba(32, 16, 54, 0.75) 0%, rgba(18, 8, 32, 0.9) 100%)',
            border: '1px solid rgba(223, 182, 91, 0.38)',
            borderRadius: '20px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(223, 182, 91, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Matting Frame */}
          <div
            onClick={() => setActiveImage(galleryItems[2])}
            title="Click to view full screen"
            style={{
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
              background: '#0d0617',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src={galleryItems[2].src}
              alt={galleryItems[2].alt}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: galleryItems[2].aspectRatio,
                display: 'block',
                objectFit: 'contain',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.025)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />

            {/* Hover Expand Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(15, 6, 26, 0.75)',
                backdropFilter: 'blur(10px)',
                padding: '6px 12px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#faeed1',
                border: '1px solid rgba(223, 182, 91, 0.3)',
              }}
            >
              <Maximize2 size={12} color="#dfb65b" />
              <span>Full View</span>
            </div>
          </div>

          {/* Editorial Caption Underneath */}
          <div style={{ padding: '18px 8px 8px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: '#faeed1',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              <Sparkles size={12} />
              <span>{galleryItems[2].tag}</span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: '#faf8f5',
                marginBottom: '6px',
              }}
            >
              {galleryItems[2].title}
            </h3>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#c4b1fc',
                lineHeight: 1.55,
              }}
            >
              {galleryItems[2].caption}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal (High-Resolution Zoom View) */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(7, 3, 13, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: 'clamp(14px, 3vw, 24px)',
              cursor: 'zoom-out',
            }}
          >
            {/* Fixed Accessible Close Button for All Screen Sizes */}
            <button
              onClick={() => setActiveImage(null)}
              aria-label="Close photo view"
              style={{
                position: 'fixed',
                top: 'clamp(16px, 3vh, 24px)',
                right: 'clamp(16px, 3vw, 24px)',
                zIndex: 130,
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#faeed1',
                cursor: 'pointer',
                transition: 'background 0.2s',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              }}
            >
              <X size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxHeight: '92vh',
                maxWidth: '92vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'default',
              }}
            >
              {/* Full Image */}
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                style={{
                  maxHeight: '70vh',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(223, 182, 91, 0.2)',
                  border: '1px solid rgba(223, 182, 91, 0.4)',
                }}
              />

              {/* Lightbox Caption */}
              <div style={{ textAlign: 'center', marginTop: '14px', maxWidth: '480px' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
                    color: '#faeed1',
                    marginBottom: '4px',
                  }}
                >
                  {activeImage.title}
                </h4>
                <p style={{ fontSize: 'clamp(0.82rem, 2vw, 0.9rem)', color: '#c4b1fc' }}>
                  {activeImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
