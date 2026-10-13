import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { LiquidMetal } from '@paper-design/shaders-react';

// Une palette par risque : mer (submersion), eau limoneuse (inondation), braise (incendie).
const PALETTES = {
  submersion: { color1: '#0d3f5c', color2: '#2a8fae', color3: '#06182a', tint: '#9fe0e8' },
  inondation: { color1: '#34503d', color2: '#7d7350', color3: '#0b1a22', tint: '#d9c99a' },
  incendie: { color1: '#6e2414', color2: '#b04a22', color3: '#1e0a06', tint: '#ffb070' },
};

function useRisk(initial) {
  const [risk, setRisk] = useState(initial);
  useEffect(() => {
    const on = (e) => setRisk(e.detail);
    window.addEventListener('littoreau:risk', on);
    return () => window.removeEventListener('littoreau:risk', on);
  }, []);
  return risk;
}

function Background({ initial }) {
  const p = PALETTES[useRisk(initial)];
  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0 }}
      pixelDensity={1}
      fov={45}
      pointerEvents="none"
      lazyLoad={false}
    >
      <ShaderGradient
        control="props"
        type="waterPlane"
        animate="on"
        uSpeed={0.12}
        uStrength={2.2}
        uDensity={1.4}
        uFrequency={4}
        uAmplitude={0}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={50}
        rotationY={0}
        rotationZ={-60}
        cAzimuthAngle={180}
        cPolarAngle={80}
        cDistance={2.6}
        cameraZoom={9}
        color1={p.color1}
        color2={p.color2}
        color3={p.color3}
        reflection={0.1}
        lightType="3d"
        brightness={1.05}
        grain="on"
        grainBlending={0.15}
        enableTransition
        smoothTime={0.6}
      />
    </ShaderGradientCanvas>
  );
}

function Mark({ initial }) {
  const p = PALETTES[useRisk(initial)];
  return (
    <LiquidMetal
      image="images/logo-mark.png"
      colorBack="#00000000"
      colorTint={p.tint}
      repetition={2.2}
      softness={0.15}
      shiftRed={0.3}
      shiftBlue={0.3}
      distortion={0.07}
      contour={0.4}
      angle={70}
      shape="none"
      speed={0.6}
      fit="contain"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export function mount(initial) {
  const bg = document.getElementById('hero-fx');
  const mark = document.getElementById('hero-mark');
  if (bg) {
    createRoot(bg).render(<Background initial={initial} />);
    requestAnimationFrame(() => bg.classList.add('is-live'));
  }
  if (mark) {
    createRoot(mark).render(<Mark initial={initial} />);
    setTimeout(() => mark.classList.add('is-live'), 2500);
  }
}
