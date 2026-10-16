import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BreadboardSVG from './BreadboardSVG';
import { skills } from '../../data/skills';

const MotionDiv = motion.div;

export default function InteractiveCircuit() {
  const [active, setActive] = useState(null);
  const leaveTimerRef = useRef(null);

  const handleHover = (category) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setActive(category);
  };

  const handleLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    // Small debounce to avoid flickering when gliding across components
    leaveTimerRef.current = setTimeout(() => {
      setActive(null);
    }, 120);
  };

  return (
    <div className="flex flex-col items-center py-16 px-4">
      {/* Container for the circuit section title */}
      <h2
        className="text-center mb-2"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          color: '#39ff14',
          textShadow: 'var(--osc-glow-sm)',
        }}
      >
        {'> SKILLS_DISPLAY.probe()'}
      </h2>
      <p
        className="text-center mb-10"
        style={{
          fontFamily: "'Inconsolata', monospace",
          fontSize: '0.85rem',
          color: 'rgba(57,255,20,0.5)',
        }}
      >
        hover or tap components to probe skill categories
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center w-full max-w-[960px] mx-auto px-2">
        {/* ── LEFT BOX — circuit diagram ── */}
        <div
          className="w-full lg:w-[560px] h-[360px] sm:h-[380px] border border-[rgba(57,255,20,0.2)] rounded bg-[rgba(10,20,10,0.5)] relative overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner"
          style={{ boxSizing: 'border-box' }}
        >
          <BreadboardSVG onHover={handleHover} onLeave={handleLeave} />
        </div>

        {/* ── RIGHT BOX — skill info ── */}
        <div
          className="w-full lg:w-[360px] min-h-[360px] sm:min-h-[380px] border border-[rgba(57,255,20,0.2)] rounded p-6 overflow-hidden flex-shrink-0 relative bg-[rgba(10,20,10,0.5)] flex flex-col justify-between"
          style={{
            boxSizing: 'border-box',
            fontFamily: "'Share Tech Mono', monospace",
            color: '#39ff14',
            fontSize: '0.85rem',
            lineHeight: '1.6',
          }}
        >
          <div>
            <AnimatePresence mode="wait">
              {active === null ? (
                <MotionDiv
                  key="awaiting"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <p
                    style={{
                      color: 'rgba(57,255,20,0.5)',
                      marginBottom: '14px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    &gt; AWAITING_PROBE...
                  </p>
                  <p
                    style={{
                      color: 'rgba(57,255,20,0.4)',
                      fontSize: '0.8rem',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                    }}
                  >
                    Hover over or tap a component on the circuit schematic to probe its skill category.
                  </p>

                  <div
                    className="pt-4"
                    style={{ borderTop: '1px dashed rgba(57,255,20,0.15)' }}
                  >
                    <p
                      style={{
                        fontSize: '0.72rem',
                        color: 'rgba(57,255,20,0.3)',
                        lineHeight: '1.8',
                      }}
                    >
                      // SCHEMATIC NET MAP:<br />
                      • µCTRL ── Hardware & Embedded<br />
                      • RESISTOR ── Programming Languages<br />
                      • CAPACITOR ── Databases<br />
                      • LED ARRAY ── Web Development<br />
                      • CRYSTAL ── Tools & Platforms
                    </p>
                  </div>
                </MotionDiv>
              ) : (
                <MotionDiv
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <p
                    style={{
                      marginBottom: '14px',
                      color: '#39ff14',
                      textShadow: '0 0 4px rgba(57, 255, 20, 0.45)',
                      letterSpacing: '0.08em',
                      fontSize: '0.95rem',
                      fontWeight: 'normal',
                    }}
                  >
                    &gt; {active.toUpperCase()}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {skills[active]?.map((skill) => (
                      <li
                        key={skill}
                        style={{
                          marginBottom: '6px',
                          color: 'rgba(57,255,20,0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span style={{ color: '#39ff14', opacity: 0.7 }}>—</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

          <div
            className="pt-3 mt-4"
            style={{
              borderTop: '1px solid rgba(57,255,20,0.1)',
              fontSize: '0.68rem',
              color: 'rgba(57,255,20,0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              letterSpacing: '0.05em',
            }}
          >
            <span>STATUS: 3.3V ACTIVE</span>
            <span>CH_PROBE: OK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
