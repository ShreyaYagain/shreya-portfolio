import { useState } from 'react';

// BreadboardSVG.jsx
// Realistic PCB / Schematic Interactive Circuit Diagram
// Props: onHover(categoryName), onLeave()

export default function BreadboardSVG({ onHover, onLeave }) {
  const [hovered, setHovered] = useState(null);

  const handleEnter = (category) => {
    setHovered(category);
    if (onHover) onHover(category);
  };

  const handleLeave = () => {
    setHovered(null);
    if (onLeave) onLeave();
  };

  const handleClick = (category) => {
    if (hovered === category) {
      handleLeave();
    } else {
      handleEnter(category);
    }
  };

  const isHov = (cat) => hovered === cat;

  const glowFilter = (cat) =>
    isHov(cat) ? 'drop-shadow(0 0 6px #39ff14) drop-shadow(0 0 12px rgba(57,255,20,0.6))' : 'none';

  const strokeColor = (cat, defaultColor = 'rgba(57,255,20,0.45)') =>
    isHov(cat) ? '#39ff14' : defaultColor;

  const fillColor = (cat, defaultFill = 'rgba(57,255,20,0.06)') =>
    isHov(cat) ? 'rgba(57,255,20,0.18)' : defaultFill;

  return (
    <svg
      viewBox="0 0 540 360"
      width="100%"
      height="100%"
      style={{ display: 'block', userSelect: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Dot grid */}
        <pattern id="pcbGrid" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="0.9" fill="rgba(57,255,20,0.1)" />
        </pattern>

        {/* CSS Keyframes for pulse animations */}
        <style>{`
          @keyframes tracePulseAnim {
            0% {
              stroke-dashoffset: 48;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          .trace-pulse {
            stroke-dasharray: 8 16;
            animation: tracePulseAnim 0.85s linear infinite;
          }
          .trace-pulse-rev {
            stroke-dasharray: 8 16;
            animation: tracePulseAnim 0.85s linear infinite reverse;
          }
          .component-group {
            cursor: url("/cursors/tech-probe.svg") 16 16, pointer;
            transition: all 0.25s ease;
          }
          .component-group:hover {
            filter: drop-shadow(0 0 8px #39ff14);
          }
        `}</style>
      </defs>

      {/* PCB Base Layer */}
      <rect width="540" height="360" fill="rgba(8,18,10,0.92)" />
      <rect width="540" height="360" fill="url(#pcbGrid)" />

      {/* Faint PCB Outline and Corner Silkscreen */}
      <rect
        x="10"
        y="10"
        width="520"
        height="340"
        rx="6"
        fill="none"
        stroke="rgba(57,255,20,0.22)"
        strokeWidth="1.5"
      />
      {/* Corner alignment marks */}
      <path d="M 16 26 L 16 16 L 26 16" fill="none" stroke="rgba(57,255,20,0.35)" strokeWidth="1" />
      <path d="M 524 26 L 524 16 L 514 16" fill="none" stroke="rgba(57,255,20,0.35)" strokeWidth="1" />
      <path d="M 16 334 L 16 344 L 26 344" fill="none" stroke="rgba(57,255,20,0.35)" strokeWidth="1" />
      <path d="M 524 334 L 524 344 L 514 344" fill="none" stroke="rgba(57,255,20,0.35)" strokeWidth="1" />

      {/* Corner mounting holes */}
      {[
        [22, 22],
        [518, 22],
        [22, 338],
        [518, 338],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="4.5" fill="none" stroke="rgba(57,255,20,0.35)" strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="2.2" fill="rgba(5,12,7,0.9)" stroke="rgba(57,255,20,0.5)" strokeWidth="0.8" />
        </g>
      ))}

      {/* Silkscreen Board Info */}
      <text
        x="506"
        y="25"
        textAnchor="end"
        fill="rgba(57,255,20,0.35)"
        fontSize="7"
        fontFamily="'Share Tech Mono', monospace"
        letterSpacing="0.08em"
      >
        PCB // REV 2.4 // SHREYA-CORE
      </text>

      {/* Power Header J1 */}
      <g>
        <rect
          x="26"
          y="28"
          width="16"
          height="36"
          rx="2"
          fill="rgba(12,25,14,0.9)"
          stroke="rgba(57,255,20,0.4)"
          strokeWidth="1"
        />
        <circle cx="34" cy="38" r="3" fill="none" stroke="#ff4d4d" strokeWidth="1.2" />
        <circle cx="34" cy="38" r="1.2" fill="#ff4d4d" />
        <circle cx="34" cy="54" r="3" fill="none" stroke="rgba(57,255,20,0.6)" strokeWidth="1.2" />
        <circle cx="34" cy="54" r="1.2" fill="rgba(57,255,20,0.6)" />
        <text
          x="20"
          y="74"
          fill="rgba(57,255,20,0.45)"
          fontSize="6.5"
          fontFamily="'Share Tech Mono', monospace"
        >
          J1 PWR
        </text>
      </g>

      {/* VCC (+3.3V) Rail across top */}
      <g>
        <line
          x1="35"
          y1="38"
          x2="505"
          y2="38"
          stroke="rgba(255,60,60,0.75)"
          strokeWidth="2.2"
        />
        <text
          x="48"
          y="31"
          fill="rgba(255,80,80,0.85)"
          fontSize="8"
          fontFamily="'Share Tech Mono', monospace"
          fontWeight="bold"
          letterSpacing="0.06em"
        >
          VCC [+3.3V]
        </text>
        {/* Test Point 1 on VCC */}
        <circle cx="390" cy="38" r="4.5" fill="none" stroke="#ff4d4d" strokeWidth="1" />
        <circle cx="390" cy="38" r="2" fill="#ff4d4d" />
        <text x="390" y="29" textAnchor="middle" fill="rgba(255,80,80,0.7)" fontSize="6" fontFamily="'Share Tech Mono', monospace">TP1</text>
      </g>

      {/* GND (0V) Rail across bottom */}
      <g>
        <line
          x1="35"
          y1="328"
          x2="505"
          y2="328"
          stroke="rgba(57,255,20,0.6)"
          strokeWidth="2.2"
        />
        <text
          x="48"
          y="343"
          fill="rgba(57,255,20,0.7)"
          fontSize="8"
          fontFamily="'Share Tech Mono', monospace"
          fontWeight="bold"
          letterSpacing="0.06em"
        >
          GND [0.0V]
        </text>
        {/* Ground Symbols */}
        {[35, 270, 505].map((gx) => (
          <g key={gx}>
            <line x1={gx - 7} y1="332" x2={gx + 7} y2="332" stroke="rgba(57,255,20,0.6)" strokeWidth="1.2" />
            <line x1={gx - 4} y1="335" x2={gx + 4} y2="335" stroke="rgba(57,255,20,0.6)" strokeWidth="1.2" />
            <line x1={gx - 2} y1="338" x2={gx + 2} y2="338" stroke="rgba(57,255,20,0.6)" strokeWidth="1.2" />
          </g>
        ))}
        {/* Test Point 2 on GND */}
        <circle cx="390" cy="328" r="4.5" fill="none" stroke="rgba(57,255,20,0.6)" strokeWidth="1" />
        <circle cx="390" cy="328" r="2" fill="#39ff14" />
        <text x="390" y="343" textAnchor="middle" fill="rgba(57,255,20,0.6)" fontSize="6" fontFamily="'Share Tech Mono', monospace">TP2</text>
      </g>

      {/* Vias with annular copper rings */}
      {[
        [150, 80, 'VIA 01'],
        [325, 80, 'VIA 02'],
        [460, 80, 'VIA 03'],
        [150, 285, 'VIA 04'],
        [325, 285, 'VIA 05'],
      ].map(([vx, vy, label]) => (
        <g key={label}>
          <circle cx={vx} cy={vy} r="3.5" fill="none" stroke="rgba(57,255,20,0.4)" strokeWidth="1" />
          <circle cx={vx} cy={vy} r="1.5" fill="rgba(5,12,7,0.95)" stroke="rgba(57,255,20,0.6)" strokeWidth="0.8" />
          <text
            x={vx}
            y={vy - 6}
            textAnchor="middle"
            fill="rgba(57,255,20,0.3)"
            fontSize="5.5"
            fontFamily="'Share Tech Mono', monospace"
          >
            {label}
          </text>
        </g>
      ))}

      {/* ─────────────────────────────────────────────────────────────
          STATIC / CONNECTED TRACES (Orthogonal wires linking all components)
          ───────────────────────────────────────────────────────────── */}

      {/* 1. Capacitor Traces: VCC tap (80,38) -> C1 (80,105) and C1 (80,119) -> GND (80,328) */}
      <g>
        <line
          x1="80"
          y1="38"
          x2="80"
          y2="105"
          stroke={strokeColor('Databases', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Databases') ? '2' : '1.4'}
        />
        <line
          x1="80"
          y1="119"
          x2="80"
          y2="328"
          stroke={strokeColor('Databases', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Databases') ? '2' : '1.4'}
        />
        {/* Junction dots */}
        <circle cx="80" cy="38" r="2.5" fill="#ff4d4d" />
        <circle cx="80" cy="328" r="2.5" fill="#39ff14" />
        {/* Animated pulse overlay when Capacitor is hovered */}
        {isHov('Databases') && (
          <>
            <line x1="80" y1="38" x2="80" y2="105" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
            <line x1="80" y1="119" x2="80" y2="328" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
          </>
        )}
      </g>

      {/* 2. Crystal Oscillator Traces: MCU pins (185,210) & (185,235) -> Crystal (80,210) & (80,235), plus load caps to GND */}
      <g>
        {/* CLK_IN trace */}
        <path
          d="M 185 210 L 80 210"
          fill="none"
          stroke={strokeColor('Tools & Platforms', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Tools & Platforms') ? '2' : '1.4'}
        />
        {/* CLK_OUT trace */}
        <path
          d="M 185 235 L 80 235"
          fill="none"
          stroke={strokeColor('Tools & Platforms', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Tools & Platforms') ? '2' : '1.4'}
        />
        {/* Load Cap C2 trace: (60, 210) -> (60, 328) */}
        <line
          x1="60"
          y1="210"
          x2="60"
          y2="328"
          stroke={strokeColor('Tools & Platforms', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Tools & Platforms') ? '2' : '1.4'}
        />
        {/* Load Cap C3 trace: (100, 235) -> (100, 328) */}
        <line
          x1="100"
          y1="235"
          x2="100"
          y2="328"
          stroke={strokeColor('Tools & Platforms', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Tools & Platforms') ? '2' : '1.4'}
        />
        {/* Junction dots */}
        <circle cx="60" cy="210" r="2.2" fill={strokeColor('Tools & Platforms', '#39ff14')} />
        <circle cx="100" cy="235" r="2.2" fill={strokeColor('Tools & Platforms', '#39ff14')} />
        <circle cx="60" cy="328" r="2.5" fill="#39ff14" />
        <circle cx="100" cy="328" r="2.5" fill="#39ff14" />
        {/* Net labels */}
        <text x="145" y="206" fill="rgba(57,255,20,0.4)" fontSize="6" fontFamily="'Share Tech Mono', monospace">CLK_IN</text>
        <text x="145" y="231" fill="rgba(57,255,20,0.4)" fontSize="6" fontFamily="'Share Tech Mono', monospace">CLK_OUT</text>
        {/* Animated pulse overlay when Crystal is hovered */}
        {isHov('Tools & Platforms') && (
          <>
            <path d="M 80 210 L 185 210" fill="none" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
            <path d="M 185 235 L 80 235" fill="none" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse-rev" />
            <line x1="60" y1="210" x2="60" y2="328" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
            <line x1="100" y1="235" x2="100" y2="328" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
          </>
        )}
      </g>

      {/* 3. MCU Power Traces: VCC (235,38) -> (235,120) and GND (235,250) -> (235,328) */}
      <g>
        <line
          x1="235"
          y1="38"
          x2="235"
          y2="120"
          stroke={strokeColor('Hardware & Embedded', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Hardware & Embedded') ? '2' : '1.4'}
        />
        <circle cx="235" cy="38" r="2.5" fill="#ff4d4d" />
        <text x="240" y="115" fill="rgba(57,255,20,0.45)" fontSize="6" fontFamily="'Share Tech Mono', monospace">3V3</text>

        <line
          x1="235"
          y1="250"
          x2="235"
          y2="328"
          stroke={strokeColor('Hardware & Embedded', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Hardware & Embedded') ? '2' : '1.4'}
        />
        <circle cx="235" cy="328" r="2.5" fill="#39ff14" />
        <text x="240" y="260" fill="rgba(57,255,20,0.45)" fontSize="6" fontFamily="'Share Tech Mono', monospace">GND</text>

        {isHov('Hardware & Embedded') && (
          <>
            <line x1="235" y1="38" x2="235" y2="120" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
            <line x1="235" y1="250" x2="235" y2="328" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
          </>
        )}
      </g>

      {/* 4. MCU GPIO -> Resistors Traces: (310, y) -> (345, y) */}
      <g>
        {[
          [150, 'D0'],
          [175, 'D1'],
          [205, 'D2'],
        ].map(([y, net]) => {
          const cat = 'Programming Languages';
          return (
            <g key={net}>
              <line
                x1="310"
                y1={y}
                x2="345"
                y2={y}
                stroke={isHov(cat) || isHov('Hardware & Embedded') ? '#39ff14' : 'rgba(57,255,20,0.35)'}
                strokeWidth={isHov(cat) || isHov('Hardware & Embedded') ? '2' : '1.4'}
              />
              <text x="316" y={y - 4} fill="rgba(57,255,20,0.4)" fontSize="5.5" fontFamily="'Share Tech Mono', monospace">{net}</text>
              {(isHov(cat) || isHov('Hardware & Embedded')) && (
                <line x1="310" y1={y} x2="345" y2={y} stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
              )}
            </g>
          );
        })}
      </g>

      {/* 5. Resistors -> LEDs Traces: (395, y) -> (440, y) */}
      <g>
        {[150, 175, 205].map((y, idx) => {
          const isGlowing = isHov('Programming Languages') || isHov('Web Development');
          return (
            <g key={idx}>
              <line
                x1="395"
                y1={y}
                x2="440"
                y2={y}
                stroke={isGlowing ? '#39ff14' : 'rgba(57,255,20,0.35)'}
                strokeWidth={isGlowing ? '2' : '1.4'}
              />
              {isGlowing && (
                <line x1="395" y1={y} x2="440" y2={y} stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
              )}
            </g>
          );
        })}
      </g>

      {/* 6. LEDs Cathodes -> Common Ground Bus -> GND Rail (480, 150..205) -> (480, 328) */}
      <g>
        {[150, 175, 205].map((y, idx) => {
          const isGlowing = isHov('Web Development');
          return (
            <g key={idx}>
              <line
                x1="452"
                y1={y}
                x2="480"
                y2={y}
                stroke={isGlowing ? '#39ff14' : 'rgba(57,255,20,0.35)'}
                strokeWidth={isGlowing ? '2' : '1.4'}
              />
              <circle cx="480" cy={y} r="2.2" fill={strokeColor('Web Development', '#39ff14')} />
            </g>
          );
        })}
        {/* Vertical return bus */}
        <line
          x1="480"
          y1="150"
          x2="480"
          y2="328"
          stroke={strokeColor('Web Development', 'rgba(57,255,20,0.35)')}
          strokeWidth={isHov('Web Development') ? '2' : '1.4'}
        />
        <circle cx="480" cy="328" r="2.5" fill="#39ff14" />
        {isHov('Web Development') && (
          <>
            {[150, 175, 205].map((y, idx) => (
              <line key={idx} x1="452" y1={y} x2="480" y2={y} stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
            ))}
            <line x1="480" y1="150" x2="480" y2="328" stroke="#a3ff85" strokeWidth="2.2" className="trace-pulse" />
          </>
        )}
      </g>


      {/* ─────────────────────────────────────────────────────────────
          COMPONENT 1: CAPACITOR C1 (Databases)
          ───────────────────────────────────────────────────────────── */}
      <g
        className="component-group"
        onMouseEnter={() => handleEnter('Databases')}
        onMouseLeave={handleLeave}
        onClick={() => handleClick('Databases')}
        style={{ filter: glowFilter('Databases') }}
      >
        {/* Generous Hit Box */}
        <rect x="52" y="70" width="56" height="90" fill="transparent" />

        {/* Capacitor plates */}
        {/* Top Plate */}
        <line
          x1="66"
          y1="105"
          x2="94"
          y2="105"
          stroke={strokeColor('Databases')}
          strokeWidth="2.5"
        />
        {/* Bottom Plate */}
        <line
          x1="66"
          y1="117"
          x2="94"
          y2="117"
          stroke={strokeColor('Databases')}
          strokeWidth="2.5"
        />

        {/* Terminal solder pads */}
        <circle cx="80" cy="105" r="2.2" fill={strokeColor('Databases')} />
        <circle cx="80" cy="117" r="2.2" fill={strokeColor('Databases')} />

        {/* Dielectric highlight */}
        <rect
          x="69"
          y="107"
          width="22"
          height="8"
          fill={fillColor('Databases')}
        />

        {/* Labels */}
        <text
          x="80"
          y="95"
          textAnchor="middle"
          fill={strokeColor('Databases', 'rgba(57,255,20,0.7)')}
          fontSize="7.5"
          fontFamily="'Share Tech Mono', monospace"
          fontWeight="bold"
        >
          C1 100nF
        </text>
        <text
          x="80"
          y="134"
          textAnchor="middle"
          fill={strokeColor('Databases', 'rgba(57,255,20,0.45)')}
          fontSize="6.5"
          fontFamily="'Share Tech Mono', monospace"
        >
          DECOUPLING
        </text>
      </g>


      {/* ─────────────────────────────────────────────────────────────
          COMPONENT 2: CRYSTAL OSCILLATOR Y1 (Tools & Platforms)
          ───────────────────────────────────────────────────────────── */}
      <g
        className="component-group"
        onMouseEnter={() => handleEnter('Tools & Platforms')}
        onMouseLeave={handleLeave}
        onClick={() => handleClick('Tools & Platforms')}
        style={{ filter: glowFilter('Tools & Platforms') }}
      >
        {/* Generous Hit Box */}
        <rect x="44" y="185" width="84" height="110" fill="transparent" />

        {/* Quartz Crystal Can Body */}
        <rect
          x="68"
          y="204"
          width="24"
          height="36"
          rx="5"
          fill="rgba(10,24,14,0.92)"
          stroke={strokeColor('Tools & Platforms')}
          strokeWidth="1.5"
        />

        {/* Internal schematic symbol: quartz plate between electrodes */}
        <line x1="72" y1="214" x2="88" y2="214" stroke={strokeColor('Tools & Platforms')} strokeWidth="1.5" />
        <rect
          x="74"
          y="218"
          width="12"
          height="8"
          rx="1"
          fill={fillColor('Tools & Platforms')}
          stroke={strokeColor('Tools & Platforms')}
          strokeWidth="1"
        />
        <line x1="72" y1="230" x2="88" y2="230" stroke={strokeColor('Tools & Platforms')} strokeWidth="1.5" />

        {/* Lead solder pads */}
        <circle cx="80" cy="210" r="2.2" fill={strokeColor('Tools & Platforms')} />
        <circle cx="80" cy="235" r="2.2" fill={strokeColor('Tools & Platforms')} />

        {/* Load Capacitors C2 and C3 symbols */}
        {/* C2 at x=60, y=260 */}
        <line x1="52" y1="258" x2="68" y2="258" stroke={strokeColor('Tools & Platforms')} strokeWidth="1.8" />
        <line x1="52" y1="264" x2="68" y2="264" stroke={strokeColor('Tools & Platforms')} strokeWidth="1.8" />
        {/* C3 at x=100, y=260 */}
        <line x1="92" y1="258" x2="108" y2="258" stroke={strokeColor('Tools & Platforms')} strokeWidth="1.8" />
        <line x1="92" y1="264" x2="108" y2="264" stroke={strokeColor('Tools & Platforms')} strokeWidth="1.8" />

        {/* Labels */}
        <text
          x="80"
          y="198"
          textAnchor="middle"
          fill={strokeColor('Tools & Platforms', 'rgba(57,255,20,0.7)')}
          fontSize="7.5"
          fontFamily="'Share Tech Mono', monospace"
          fontWeight="bold"
        >
          Y1 16.0MHz
        </text>
        <text
          x="80"
          y="250"
          textAnchor="middle"
          fill={strokeColor('Tools & Platforms', 'rgba(57,255,20,0.45)')}
          fontSize="6.5"
          fontFamily="'Share Tech Mono', monospace"
        >
          XTAL OSC
        </text>
        <text
          x="80"
          y="280"
          textAnchor="middle"
          fill={strokeColor('Tools & Platforms', 'rgba(57,255,20,0.4)')}
          fontSize="5.5"
          fontFamily="'Share Tech Mono', monospace"
        >
          2x 22pF LOAD
        </text>
      </g>


      {/* ─────────────────────────────────────────────────────────────
          COMPONENT 3: MICROCONTROLLER µCTRL (Hardware & Embedded)
          ───────────────────────────────────────────────────────────── */}
      <g
        className="component-group"
        onMouseEnter={() => handleEnter('Hardware & Embedded')}
        onMouseLeave={handleLeave}
        onClick={() => handleClick('Hardware & Embedded')}
        style={{ filter: glowFilter('Hardware & Embedded') }}
      >
        {/* Generous Hit Box */}
        <rect x="175" y="110" width="145" height="150" fill="transparent" />

        {/* IC Body */}
        <rect
          x="195"
          y="130"
          width="105"
          height="110"
          rx="3"
          fill="rgba(7,18,10,0.96)"
          stroke={strokeColor('Hardware & Embedded')}
          strokeWidth="1.6"
        />

        {/* Top notch */}
        <path
          d="M 241 130 Q 247 137 253 130"
          fill="none"
          stroke={strokeColor('Hardware & Embedded')}
          strokeWidth="1.4"
        />

        {/* Pin 1 orientation dot */}
        <circle
          cx="206"
          cy="142"
          r="2.5"
          fill={strokeColor('Hardware & Embedded', '#39ff14')}
        />

        {/* IC Pins: Left, Right, Top, Bottom */}
        {/* Left pins */}
        {[150, 175, 210, 235].map((py, idx) => (
          <g key={`pl-${idx}`}>
            <line x1="185" y1={py} x2="195" y2={py} stroke={strokeColor('Hardware & Embedded')} strokeWidth="1.2" />
            <circle cx="185" cy={py} r="1.8" fill={strokeColor('Hardware & Embedded')} />
          </g>
        ))}
        {/* Right pins */}
        {[150, 175, 205, 225].map((py, idx) => (
          <g key={`pr-${idx}`}>
            <line x1="300" y1={py} x2="310" y2={py} stroke={strokeColor('Hardware & Embedded')} strokeWidth="1.2" />
            <circle cx="310" cy={py} r="1.8" fill={strokeColor('Hardware & Embedded')} />
          </g>
        ))}
        {/* Top pins */}
        {[215, 235, 255, 275].map((px, idx) => (
          <g key={`pt-${idx}`}>
            <line x1={px} y1="120" x2={px} y2="130" stroke={strokeColor('Hardware & Embedded')} strokeWidth="1.2" />
            <circle cx={px} cy="120" r="1.8" fill={strokeColor('Hardware & Embedded')} />
          </g>
        ))}
        {/* Bottom pins */}
        {[215, 235, 255, 275].map((px, idx) => (
          <g key={`pb-${idx}`}>
            <line x1={px} y1="240" x2={px} y2="250" stroke={strokeColor('Hardware & Embedded')} strokeWidth="1.2" />
            <circle cx={px} cy="250" r="1.8" fill={strokeColor('Hardware & Embedded')} />
          </g>
        ))}

        {/* Center Labels */}
        <text
          x="247"
          y="176"
          textAnchor="middle"
          fill={strokeColor('Hardware & Embedded', '#39ff14')}
          fontSize="13"
          fontFamily="'Share Tech Mono', monospace"
          fontWeight="bold"
          letterSpacing="0.08em"
        >
          µCTRL
        </text>
        <text
          x="247"
          y="192"
          textAnchor="middle"
          fill={strokeColor('Hardware & Embedded', 'rgba(57,255,20,0.65)')}
          fontSize="7.5"
          fontFamily="'Share Tech Mono', monospace"
          letterSpacing="0.05em"
        >
          ATMEGA328P
        </text>
        <text
          x="247"
          y="207"
          textAnchor="middle"
          fill="rgba(57,255,20,0.4)"
          fontSize="6.5"
          fontFamily="'Share Tech Mono', monospace"
        >
          QFP-32 SOC
        </text>
      </g>


      {/* ─────────────────────────────────────────────────────────────
          COMPONENT 4: RESISTOR ARRAY R1..R3 (Programming Languages)
          ───────────────────────────────────────────────────────────── */}
      <g
        className="component-group"
        onMouseEnter={() => handleEnter('Programming Languages')}
        onMouseLeave={handleLeave}
        onClick={() => handleClick('Programming Languages')}
        style={{ filter: glowFilter('Programming Languages') }}
      >
        {/* Generous Hit Box */}
        <rect x="335" y="130" width="80" height="95" fill="transparent" />

        {/* Three In-Series Schematic Resistors (R1, R2, R3) */}
        {[
          [150, 'R1'],
          [175, 'R2'],
          [205, 'R3'],
        ].map(([y, rId]) => (
          <g key={rId}>
            {/* Lead pads */}
            <circle cx="345" cy={y} r="2" fill={strokeColor('Programming Languages')} />
            <circle cx="395" cy={y} r="2" fill={strokeColor('Programming Languages')} />

            {/* Schematic Zig-Zag Path */}
            <path
              d={`M 345 ${y} L 350 ${y} L 354 ${y - 6} L 361 ${y + 6} L 368 ${y - 6} L 375 ${y + 6} L 382 ${y - 6} L 389 ${y + 6} L 392 ${y} L 395 ${y}`}
              fill="none"
              stroke={strokeColor('Programming Languages')}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            {/* Tiny resistor tag */}
            <text
              x="370"
              y={y - 8}
              textAnchor="middle"
              fill={strokeColor('Programming Languages', 'rgba(57,255,20,0.6)')}
              fontSize="6"
              fontFamily="'Share Tech Mono', monospace"
            >
              {rId} 330Ω
            </text>
          </g>
        ))}

        {/* Group Header & Subtitle */}
        <text
          x="370"
          y="136"
          textAnchor="middle"
          fill={strokeColor('Programming Languages', 'rgba(57,255,20,0.75)')}
          fontSize="7.5"
          fontFamily="'Share Tech Mono', monospace"
          fontWeight="bold"
        >
          RESISTOR ARRAY
        </text>
        <text
          x="370"
          y="222"
          textAnchor="middle"
          fill={strokeColor('Programming Languages', 'rgba(57,255,20,0.45)')}
          fontSize="6.5"
          fontFamily="'Share Tech Mono', monospace"
        >
          CURRENT LIMITING
        </text>
      </g>


      {/* ─────────────────────────────────────────────────────────────
          COMPONENT 5: LED ARRAY D1..D3 (Web Development)
          ───────────────────────────────────────────────────────────── */}
      <g
        className="component-group"
        onMouseEnter={() => handleEnter('Web Development')}
        onMouseLeave={handleLeave}
        onClick={() => handleClick('Web Development')}
        style={{ filter: glowFilter('Web Development') }}
      >
        {/* Generous Hit Box */}
        <rect x="425" y="125" width="85" height="105" fill="transparent" />

        {/* Three Diode LEDs (D1, D2, D3) */}
        {[
          [150, 'D1'],
          [175, 'D2'],
          [205, 'D3'],
        ].map(([y, dId]) => (
          <g key={dId}>
            {/* Anode solder pad */}
            <circle cx="440" cy={y} r="2" fill={strokeColor('Web Development')} />

            {/* Diode Triangle (Anode -> Cathode) */}
            <path
              d={`M 440 ${y - 6} L 440 ${y + 6} L 451 ${y} Z`}
              fill={fillColor('Web Development', 'rgba(57,255,20,0.12)')}
              stroke={strokeColor('Web Development')}
              strokeWidth="1.5"
            />
            {/* Cathode Bar */}
            <line
              x1="451"
              y1={y - 6}
              x2="451"
              y2={y + 6}
              stroke={strokeColor('Web Development')}
              strokeWidth="1.6"
            />

            {/* Cathode solder pad */}
            <circle cx="452" cy={y} r="1.8" fill={strokeColor('Web Development')} />

            {/* Radiating Light Arrows (↗ ↗) */}
            <g stroke={strokeColor('Web Development')} strokeWidth="1" fill="none">
              <line x1="446" y1={y - 7} x2="452" y2={y - 13} />
              <path d={`M 449 ${y - 13} L 452 ${y - 13} L 452 ${y - 10}`} />
              <line x1="450" y1={y - 5} x2="456" y2={y - 11} />
              <path d={`M 453 ${y - 11} L 456 ${y - 11} L 456 ${y - 8}`} />
            </g>

            {/* Label */}
            <text
              x="462"
              y={y + 3}
              fill={strokeColor('Web Development', 'rgba(57,255,20,0.65)')}
              fontSize="6.5"
              fontFamily="'Share Tech Mono', monospace"
            >
              {dId}
            </text>
          </g>
        ))}

        {/* Labels */}
        <text
          x="462"
          y="136"
          textAnchor="middle"
          fill={strokeColor('Web Development', 'rgba(57,255,20,0.75)')}
          fontSize="7.5"
          fontFamily="'Share Tech Mono', monospace"
          fontWeight="bold"
        >
          LED ARRAY
        </text>
        <text
          x="462"
          y="222"
          textAnchor="middle"
          fill={strokeColor('Web Development', 'rgba(57,255,20,0.45)')}
          fontSize="6.5"
          fontFamily="'Share Tech Mono', monospace"
        >
          STATUS LEDS
        </text>
      </g>
    </svg>
  );
}
