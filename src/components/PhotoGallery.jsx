import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, X, Maximize2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayContent';
import CuteScrapbookDivider from './svg/CuteScrapbookDivider';
import WashiTape from './svg/WashiTape';
import CuteFlower from './svg/CuteFlower';
import CuteBow from './svg/CuteBow';

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
      title: 'Garden Reverie 🌸',
      handwrittenNote: 'A beautiful golden hour in flowers',
      caption: 'A serene evening moment surrounded by blooming golden blossoms.',
      alt: 'Afraa sitting gracefully in a floral pink saree beside yellow flowers at dusk',
      aspectRatio: '1 / 1',
      tapeColor: '#F3DDE2',
      tapeAngle: -2,
    },
    {
      id: 2,
      type: 'collage',
      src: collageSareeStory,
      tag: 'SCRAPBOOK COLLAGE',
      title: 'Ammu’s Saree Story ✨',
      handwrittenNote: 'Crimson red drape & glass bangles',
      caption: 'Crimson red drape, glass bangles, and artistic calligraphy.',
      alt: 'Artistic photo collage of Afraa in an embroidered red saree with traditional bangles',
      aspectRatio: '490 / 760',
      tapeColor: '#E9E2F5',
      tapeAngle: 3,
    },
    {
      id: 3,
      type: 'collage',
      src: collageGhalibAesthetic,
      tag: 'SCRAPBOOK COLLAGE',
      title: 'Poetry & Candid Frames 📖',
      handwrittenNote: 'Timeless poetry & candid memories',
      caption: 'Mirror reflections, timeless poetry, and vibrant aesthetic details.',
      alt: 'Artistic photo collage of Afraa with Ghalib poetry and traditional accents',
      aspectRatio: '468 / 761',
      tapeColor: '#F7D6BD',
      tapeAngle: -3,
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
        initial={{ opacity: 0.1, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "150px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '38px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '9999px',
            background: '#FDF2F4',
            border: '1.5px solid #F3DDE2',
            color: '#A94B59',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <Camera size={13} color="#A94B59" />
          <span>MOMENTS & MEMORIES</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            color: '#493B3B',
          }}
        >
          A Little Photo Corner
        </h2>

        {/* Cute Stitched Scrapbook Divider */}
        <CuteScrapbookDivider maxWidth={260} />

        <p
          style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.35rem, 3.2vw, 1.75rem)',
            color: '#A94B59',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          “A collection of lovely pictures ✨”
        </p>
      </motion.div>

      {/* Editorial Scrapbook Responsive Grid */}
      <div className="gallery-grid">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.2, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.85, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`glass-panel ${item.type === 'featured' ? 'gallery-featured-item' : ''}`}
            style={{
              padding: 'clamp(14px, 2.5vw, 20px)',
              background: '#FFFFFF',
              border: '2px solid #F3DDE2',
              borderRadius: '22px',
              boxShadow: '0 16px 38px rgba(73, 59, 59, 0.08), 0 2px 8px rgba(169, 75, 89, 0.04)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Washi Tape Strip at Top of Polaroid */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}
            >
              <WashiTape
                width={110}
                height={24}
                color={item.tapeColor}
                pattern={idx % 2 === 0 ? 'dots' : 'stripes'}
                rotate={item.tapeAngle}
              />
            </div>

            {/* Polaroid Photo Frame */}
            <div
              onClick={() => setActiveImage(item)}
              title="Click to view full image"
              style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#FAF6EF',
                border: '1px solid #EFE4DC',
                marginTop: '12px',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: item.aspectRatio,
                  display: 'block',
                  objectFit: 'contain',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />

              {/* Hover Expand Pill Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem',
                  color: '#493B3B',
                  border: '1px solid #F3DDE2',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                  fontWeight: 600,
                }}
              >
                <Maximize2 size={12} color="#A94B59" />
                <span>Expand</span>
              </div>
            </div>

            {/* Scrapbook Polaroid Notes Underneath */}
            <div style={{ padding: '16px 6px 6px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  color: '#A94B59',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                <Sparkles size={12} />
                <span>{item.tag}</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  color: '#493B3B',
                  marginBottom: '4px',
                }}
              >
                {item.title}
              </h3>

              {/* Handwritten Note Accent */}
              <p
                style={{
                  fontFamily: 'var(--font-handwritten)',
                  fontSize: '1.25rem',
                  color: '#A94B59',
                  marginBottom: '6px',
                  lineHeight: 1.25,
                }}
              >
                ✍️ “{item.handwrittenNote}”
              </p>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#6E5D5D',
                  lineHeight: 1.55,
                }}
              >
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 110,
              backgroundColor: 'rgba(73, 59, 59, 0.65)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(14px, 3vw, 28px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '92vw',
                maxHeight: '90vh',
                background: '#FFFDF9',
                border: '2px solid #F3DDE2',
                borderRadius: '24px',
                padding: 'clamp(12px, 2.5vw, 20px)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                aria-label="Close photo view"
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '-14px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#A94B59',
                  border: '2px solid #FFFFFF',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  zIndex: 20,
                }}
              >
                <X size={18} />
              </button>

              {/* High-res Image */}
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  maxWidth: '100%',
                  maxHeight: '74vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '74vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '14px',
                    display: 'block',
                  }}
                />
              </div>

              {/* Caption Underneath */}
              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: '#493B3B',
                    marginBottom: '4px',
                  }}
                >
                  {activeImage.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: '1.2rem',
                    color: '#A94B59',
                  }}
                >
                  “{activeImage.handwrittenNote}”
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
