import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BreadboardSVG from './BreadboardSVG';
import { skills } from '../../data/skills';

const MotionDiv = motion.div;

const CATEGORY_KEYS = [
  { key: 'Hardware & Embedded', short: 'HARDWARE', comp: 'µCTRL' },
  { key: 'Programming Languages', short: 'LANGUAGES', comp: 'RESISTOR' },
  { key: 'Databases', short: 'DATABASES', comp: 'CAPACITOR' },
  { key: 'Web Development', short: 'WEB_DEV', comp: 'LED ARRAY' },
  { key: 'Tools & Platforms', short: 'TOOLS', comp: 'CRYSTAL' },
];

export default function InteractiveCircuit() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const leaveTimerRef = useRef(null);

  const active = selectedCategory || hoveredCategory;

  const handleHover = (category) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredCategory(category);
  };

  const handleLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    leaveTimerRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 120);
  };

  const handleSelect = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <section id="skills" className="flex flex-col items-center py-12 sm:py-16 px-3.5 sm:px-6 w-full max-w-[1400px] mx-auto overflow-hidden">
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
        className="text-center mb-6 sm:mb-8 text-xs sm:text-sm px-2"
        style={{
          fontFamily: "'Inconsolata', monospace",
          color: 'rgba(57,255,20,0.6)',
        }}
      >
        tap or hover schematic components to probe skill registers
      </p>

      {/* Quick category filter pills — especially convenient on mobile touch */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 max-w-2xl px-1">
        {CATEGORY_KEYS.map((cat) => {
          const isSelected = active === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleSelect(cat.key)}
              className="terminal-btn text-[0.72rem] sm:text-xs min-h-[38px] sm:min-h-[44px] px-2.5 sm:px-3 py-1 flex items-center gap-1.5 transition-all"
              style={{
                borderColor: isSelected ? 'var(--osc-phosphor)' : 'var(--osc-border)',
                background: isSelected ? 'rgba(57, 255, 20, 0.15)' : 'rgba(57, 255, 20, 0.04)',
                color: isSelected ? '#39ff14' : 'var(--osc-phosphor-dim)',
                textShadow: isSelected ? 'var(--osc-glow-sm)' : 'none',
              }}
            >
              <span>[{cat.comp}]</span>
              <span className="font-bold">{cat.short}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center w-full max-w-[960px] mx-auto">
        {/* ── LEFT BOX — circuit diagram with responsive aspect ratio ── */}
        <div
          className="w-full lg:w-[560px] aspect-[540/360] sm:aspect-auto sm:h-[380px] border border-[rgba(57,255,20,0.25)] rounded bg-[rgba(10,20,10,0.55)] relative overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner"
          style={{ boxSizing: 'border-box' }}
        >
          <BreadboardSVG
            onHover={handleHover}
            onLeave={handleLeave}
            activeCategory={active}
            onSelect={handleSelect}
          />
        </div>

        {/* ── RIGHT BOX — skill info (desktop layout) ── */}
        <div
          className="hidden lg:flex w-[360px] min-h-[380px] border border-[rgba(57,255,20,0.25)] rounded p-6 overflow-hidden flex-shrink-0 relative bg-[rgba(10,20,10,0.55)] flex-col justify-between"
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
                    Hover over or click a component on the circuit schematic to probe its skill category.
                  </p>

                  <div
                    className="pt-4"
                    style={{ borderTop: '1px dashed rgba(57,255,20,0.15)' }}
                  >
                    <p
                      style={{
                        fontSize: '0.72rem',
                        color: 'rgba(57,255,20,0.35)',
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
                  <div className="flex items-center justify-between mb-3.5">
                    <p
                      style={{
                        color: '#39ff14',
                        textShadow: '0 0 6px rgba(57, 255, 20, 0.5)',
                        letterSpacing: '0.08em',
                        fontSize: '0.95rem',
                      }}
                    >
                      &gt; {active.toUpperCase()}
                    </p>
                    {selectedCategory && (
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className="text-xs text-[rgba(57,255,20,0.6)] hover:text-[#39ff14]"
                      >
                        [RESET]
                      </button>
                    )}
                  </div>
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

      {/* ── MOBILE / TABLET BOTTOM SHEET DRAWER (< 1024px) ── */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="lg:hidden fixed inset-0 z-[150] flex flex-col justify-end">
            {/* Backdrop — tapping dismisses */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedCategory(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Dismiss skills panel"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative z-[151] osc-screen border-t-2 border-[var(--osc-phosphor)] bg-[#070c07] p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] rounded-t-xl shadow-[0_-10px_30px_rgba(0,0,0,0.85)] max-h-[75dvh] overflow-y-auto"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              {/* Header with Title and Big Tap-to-Dismiss button */}
              <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-green-900/30">
                <div>
                  <span className="text-[0.68rem] text-[rgba(57,255,20,0.5)] block tracking-widest">
                    PROBED COMPONENT REGISTERS
                  </span>
                  <h3
                    className="text-base sm:text-lg font-bold text-[#39ff14] phosphor-text"
                    style={{ textShadow: 'var(--osc-glow-sm)' }}
                  >
                    &gt; {selectedCategory.toUpperCase()}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  aria-label="Close skills drawer"
                  className="terminal-btn min-h-[44px] min-w-[44px] px-3.5 flex items-center justify-center text-xs"
                >
                  [✕ CLOSE]
                </button>
              </div>

              {/* Skills Chip Grid */}
              <div className="flex flex-wrap gap-2 py-2">
                {skills[selectedCategory]?.map((skill) => (
                  <span
                    key={skill}
                    className="tech-badge text-xs px-3 py-1.5 rounded-sm border border-[rgba(57,255,20,0.3)] bg-[rgba(57,255,20,0.08)] text-[#39ff14]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-green-900/20 flex justify-between text-[0.68rem] text-[rgba(57,255,20,0.4)]">
                <span>REGISTER: LOADED</span>
                <span>TAP OUTSIDE OR CLOSE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
