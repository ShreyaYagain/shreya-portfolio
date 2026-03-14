import { useState } from 'react';

// BreadboardSVG.jsx
// Props: onHover(categoryName), onLeave()
// Each component group calls onHover with its category on mouseEnter
// and onLeave on mouseLeave
// THE SVG ITSELF HAS NO ANIMATIONS, NO TRANSFORMS, NO TRANSITIONS
// ONLY fill/stroke color changes on the hovered <g> element

export default function BreadboardSVG({ onHover, onLeave }) {
  const [hovered, setHovered] = useState(null);

  const handleEnter = (category) => {
    setHovered(category);
    onHover(category);
  };

  const handleLeave = () => {
    setHovered(null);
    onLeave();
  };

  // Glow color when a component is active
  const glow = (category) =>
    hovered === category
      ? '0 0 8px #39ff14, 0 0 16px rgba(57,255,20,0.4)'
      : 'none';

  const strokeColor = (category) =>
    hovered === category ? '#39ff14' : 'rgba(57,255,20,0.45)';

  return (
    <svg
      viewBox="0 0 500 360"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid background dots */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="rgba(57,255,20,0.12)" />
        </pattern>
      </defs>
      <rect width="500" height="360" fill="url(#grid)" />

      {/* VCC rail */}
      <line x1="20" y1="40" x2="480" y2="40"
        stroke="rgba(255,50,50,0.5)" strokeWidth="1.5" />
      <text x="24" y="35" fill="rgba(255,50,50,0.6)"
        fontSize="9" fontFamily="Share Tech Mono">VCC</text>

      {/* GND rail */}
      <line x1="20" y1="320" x2="480" y2="320"
        stroke="rgba(57,255,20,0.3)" strokeWidth="1.5" />
      <text x="24" y="335" fill="rgba(57,255,20,0.4)"
        fontSize="9" fontFamily="Share Tech Mono">GND</text>

      {/* ── IC CHIP — Hardware & Embedded ── */}
      <g
        onMouseEnter={() => handleEnter('Hardware & Embedded')}
        onMouseLeave={handleLeave}
        style={{ cursor: 'pointer' }}
      >
        <rect x="60" y="100" width="80" height="100"
          fill="rgba(10,20,10,0.9)"
          stroke={strokeColor('Hardware & Embedded')}
          strokeWidth="1.5"
          style={{ filter: glow('Hardware & Embedded') }}
        />
        {/* Pins left */}
        {[0,1,2,3].map(i => (
          <line key={i} x1="44" y1={116 + i * 22} x2="60" y2={116 + i * 22}
            stroke={strokeColor('Hardware & Embedded')} strokeWidth="1" />
        ))}
        {/* Pins right */}
        {[0,1,2,3].map(i => (
          <line key={i} x1="140" y1={116 + i * 22} x2="156" y2={116 + i * 22}
            stroke={strokeColor('Hardware & Embedded')} strokeWidth="1" />
        ))}
        {/* Notch */}
        <path d="M 90 100 Q 100 92 110 100"
          fill="none" stroke={strokeColor('Hardware & Embedded')} strokeWidth="1" />
        <text x="72" y="155" fill={strokeColor('Hardware & Embedded')}
          fontSize="8" fontFamily="Share Tech Mono">μCTRL</text>
        <text x="68" y="215" fill="rgba(57,255,20,0.4)"
          fontSize="8" fontFamily="Share Tech Mono">IC Chip</text>
      </g>

      {/* ── RESISTOR — Programming Languages ── */}
      <g
        onMouseEnter={() => handleEnter('Programming Languages')}
        onMouseLeave={handleLeave}
        style={{ cursor: 'pointer' }}
      >
        {/* Wire left */}
        <line x1="156" y1="150" x2="196" y2="150"
          stroke={strokeColor('Programming Languages')} strokeWidth="1" />
        {/* Body */}
        <rect x="196" y="140" width="60" height="20"
          fill="rgba(10,20,10,0.9)"
          stroke={strokeColor('Programming Languages')}
          strokeWidth="1.5"
          style={{ filter: glow('Programming Languages') }}
        />
        {/* Color bands */}
        {['rgba(255,165,0,0.8)','rgba(57,255,20,0.8)','rgba(255,50,50,0.8)'].map((c,i) => (
          <line key={i} x1={208 + i * 14} y1="140" x2={208 + i * 14} y2="160"
            stroke={c} strokeWidth="3" />
        ))}
        {/* Wire right */}
        <line x1="256" y1="150" x2="296" y2="150"
          stroke={strokeColor('Programming Languages')} strokeWidth="1" />
        <text x="196" y="175" fill="rgba(57,255,20,0.4)"
          fontSize="8" fontFamily="Share Tech Mono">Resistor</text>
      </g>

      {/* ── CAPACITOR — Databases ── */}
      <g
        onMouseEnter={() => handleEnter('Databases')}
        onMouseLeave={handleLeave}
        style={{ cursor: 'pointer' }}
      >
        {/* INVISIBLE HIT AREA — covers the whole capacitor zone */}
        {/* This must be the FIRST child so it sits behind the visual elements */}
        <rect
          x="262"
          y="110"
          width="68"
          height="90"
          fill="transparent"
          stroke="none"
        />

        <line x1="296" y1="120" x2="296" y2="138"
          stroke={strokeColor('Databases')} strokeWidth="1" />
        <rect x="278" y="138" width="36" height="8"
          fill="none"
          stroke={strokeColor('Databases')}
          strokeWidth="1.5"
          style={{ filter: glow('Databases') }}
        />
        <rect x="278" y="150" width="36" height="8"
          fill="none"
          stroke={strokeColor('Databases')}
          strokeWidth="1.5"
          style={{ filter: glow('Databases') }}
        />
        <line x1="296" y1="158" x2="296" y2="176"
          stroke={strokeColor('Databases')} strokeWidth="1" />
        <text x="270" y="192" fill="rgba(57,255,20,0.4)"
          fontSize="8" fontFamily="Share Tech Mono">Capacitor</text>
      </g>

      {/* ── LED ARRAY — Web Development ── */}
      <g
        onMouseEnter={() => handleEnter('Web Development')}
        onMouseLeave={handleLeave}
        style={{ cursor: 'pointer' }}
      >
        {[0,1,2].map(i => (
          <g key={i}>
            <circle cx={80 + i * 28} cy={270} r={10}
              fill="rgba(10,20,10,0.9)"
              stroke={strokeColor('Web Development')}
              strokeWidth="1.5"
              style={{ filter: glow('Web Development') }}
            />
            <line x1={80 + i * 28} y1="280" x2={80 + i * 28} y2="320"
              stroke={strokeColor('Web Development')} strokeWidth="1" />
          </g>
        ))}
        <text x="68" y="300" fill="rgba(57,255,20,0.4)"
          fontSize="8" fontFamily="Share Tech Mono">LED Array</text>
      </g>

      {/* ── CRYSTAL OSC — Tools & Platforms ── */}
      <g
        onMouseEnter={() => handleEnter('Tools & Platforms')}
        onMouseLeave={handleLeave}
        style={{ cursor: 'pointer' }}
      >
        <rect x="370" y="240" width="50" height="70"
          rx="8" ry="8"
          fill="rgba(10,20,10,0.9)"
          stroke={strokeColor('Tools & Platforms')}
          strokeWidth="1.5"
          style={{ filter: glow('Tools & Platforms') }}
        />
        <line x1="395" y1="240" x2="395" y2="224"
          stroke={strokeColor('Tools & Platforms')} strokeWidth="1" />
        <line x1="395" y1="310" x2="395" y2="320"
          stroke={strokeColor('Tools & Platforms')} strokeWidth="1" />
        <text x="374" y="280" fill={strokeColor('Tools & Platforms')}
          fontSize="8" fontFamily="Share Tech Mono">XTAL</text>
        <text x="362" y="325" fill="rgba(57,255,20,0.4)"
          fontSize="8" fontFamily="Share Tech Mono">Crystal Osc</text>
      </g>

      {/* Connecting traces */}
      <line x1="100" y1="40" x2="100" y2="100"
        stroke="rgba(57,255,20,0.2)" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="226" y1="40" x2="226" y2="140"
        stroke="rgba(57,255,20,0.2)" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="395" y1="40" x2="395" y2="240"
        stroke="rgba(57,255,20,0.2)" strokeWidth="1" strokeDasharray="4,3" />
    </svg>
  );
}
