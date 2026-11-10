import React from 'react';
import BotanicalBranch from './BotanicalBranch';
import FloralArrangement from './FloralArrangement';
import ButterflyIllustration from './ButterflyIllustration';
import IllustratedGiftBox from './IllustratedGiftBox';
import DoodleSparkle from './DoodleSparkle';
import FloatingPetals from './FloatingPetals';

export default function OuterDecorations({
  countdown,
}) {
  const isFinalHour = countdown?.isFinalHour || false;
  const isFinal10Minutes = countdown?.isFinal10Minutes || false;
  const isArrived = countdown?.isArrived || false;

  return (
    <div
      id="outer-countdown-decorations"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {/* 1. Slow, Gentle Drifting Petals */}
      <FloatingPetals isFinal10Minutes={isFinal10Minutes} isArrived={isArrived} />

      {/* 2. TOP-LEFT: Botanical branch with swaying leaves */}
      <div
        className="deco-tablet-scale deco-mobile-scale"
        style={{
          position: 'absolute',
          top: 'clamp(14px, 3vh, 38px)',
          left: 'clamp(12px, 3vw, 42px)',
          pointerEvents: 'none',
          transition: 'all 0.5s ease',
        }}
      >
        <BotanicalBranch
          width={130}
          height={130}
          rotate={-8}
          swayDuration={isFinalHour ? 4.5 : 6}
        />
      </div>

      {/* Top-Left Sparkle Accent */}
      <div
        className="deco-mobile-hide"
        style={{
          position: 'absolute',
          top: 'clamp(80px, 12vh, 130px)',
          left: 'clamp(70px, 10vw, 150px)',
        }}
      >
        <DoodleSparkle size={18} twinkleDuration={3.2} delay={0.4} />
      </div>

      {/* 3. TOP-RIGHT: Delicate floral arrangement (nicely below the discreet lock button) */}
      <div
        className="deco-tablet-scale deco-mobile-scale"
        style={{
          position: 'absolute',
          top: 'clamp(62px, 9vh, 95px)',
          right: 'clamp(14px, 3vw, 44px)',
          pointerEvents: 'none',
          transition: 'all 0.5s ease',
        }}
      >
        <FloralArrangement
          width={125}
          height={125}
          rotate={12}
          swayDuration={isFinalHour ? 4.8 : 6.8}
        />
      </div>

      {/* Top-Right Sparkle Accent */}
      <div
        className="deco-mobile-hide"
        style={{
          position: 'absolute',
          top: 'clamp(35px, 6vh, 65px)',
          right: 'clamp(85px, 11vw, 150px)',
        }}
      >
        <DoodleSparkle size={16} color="#E9E2F5" accent="#A94B59" twinkleDuration={3.6} delay={1.1} />
      </div>

      {/* 4. BOTTOM-LEFT: Hand-drawn flowers & scattered petals */}
      <div
        className="deco-tablet-scale deco-mobile-scale"
        style={{
          position: 'absolute',
          bottom: 'clamp(14px, 3vh, 38px)',
          left: 'clamp(12px, 3vw, 42px)',
          pointerEvents: 'none',
          transition: 'all 0.5s ease',
        }}
      >
        <FloralArrangement
          width={135}
          height={135}
          flip={true}
          rotate={-10}
          swayDuration={isFinalHour ? 5 : 7}
        />
      </div>

      {/* Bottom-Left Sparkle Accent */}
      <div
        className="deco-mobile-hide"
        style={{
          position: 'absolute',
          bottom: 'clamp(90px, 14vh, 140px)',
          left: 'clamp(80px, 11vw, 160px)',
        }}
      >
        <DoodleSparkle size={20} color="#FFD1BA" accent="#DDA6B0" twinkleDuration={3} delay={1.8} />
      </div>

      {/* 5. BOTTOM-RIGHT: Birthday gift illustration with gentle ribbon & foliage */}
      <div
        className="deco-tablet-scale deco-mobile-scale"
        style={{
          position: 'absolute',
          bottom: 'clamp(16px, 3.5vh, 42px)',
          right: 'clamp(16px, 3.5vw, 48px)',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          pointerEvents: 'none',
          transition: 'all 0.5s ease',
        }}
      >
        <div style={{ transform: 'rotate(6deg)' }}>
          <IllustratedGiftBox
            size={52}
            isFinalHour={isFinalHour}
            isOpen={isArrived}
          />
        </div>
        <div style={{ marginBottom: '-6px', marginLeft: '-14px', opacity: 0.85 }}>
          <BotanicalBranch
            width={75}
            height={75}
            rotate={35}
            swayDuration={5.5}
          />
        </div>
      </div>

      {/* Bottom-Right Sparkle Accent */}
      <div
        className="deco-mobile-hide"
        style={{
          position: 'absolute',
          bottom: 'clamp(85px, 13vh, 135px)',
          right: 'clamp(80px, 11vw, 155px)',
        }}
      >
        <DoodleSparkle size={17} color="#F7D6BD" twinkleDuration={3.4} delay={0.8} />
      </div>

      {/* 6. SIDE FLANKS: Subtle floating butterflies (Hidden on mobile to keep gutters clean) */}
      <div
        className="deco-mobile-hide"
        style={{
          position: 'absolute',
          top: '48%',
          left: 'clamp(16px, 3.2vw, 48px)',
          transform: 'translateY(-50%)',
        }}
      >
        <ButterflyIllustration
          size={38}
          rotate={14}
          tint="#F3DDE2"
          accent="#DDA6B0"
          driftDuration={6.5}
        />
        <div style={{ marginTop: '12px', marginLeft: '8px' }}>
          <DoodleSparkle size={14} twinkleDuration={2.8} delay={1.5} />
        </div>
      </div>

      <div
        className="deco-mobile-hide"
        style={{
          position: 'absolute',
          top: '52%',
          right: 'clamp(16px, 3.2vw, 48px)',
          transform: 'translateY(-50%)',
        }}
      >
        <ButterflyIllustration
          size={36}
          rotate={-16}
          tint="#E9E2F5"
          accent="#C47B89"
          driftDuration={7.2}
        />
        <div style={{ marginTop: '10px', marginLeft: '-6px' }}>
          <DoodleSparkle size={15} color="#F3DDE2" twinkleDuration={3.1} delay={2.2} />
        </div>
      </div>
    </div>
  );
}
