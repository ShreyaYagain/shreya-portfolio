import { useState } from 'react';
import BreadboardSVG from './BreadboardSVG';

const SKILLS = {
  'Hardware & Embedded': ['Arduino', 'Verilog HDL', 'Digital System Design', 'Embedded Basics'],
  'Programming Languages': ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
  'Databases': ['MySQL'],
  'Web Development': ['HTML', 'CSS', 'React.js', 'Node.js', 'Bootstrap'],
  'Tools & Platforms': ['Git', 'GitHub', 'VS Code', 'MS Excel', 'LaTeX', 'Figma'],
};

export default function InteractiveCircuit() {
  const [active, setActive] = useState(null);

  return (
    <div className="flex flex-col items-center py-16 px-4">
      {/* Container for the circuit section title */}
      <h2 className="text-center mb-2" style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
        color: '#39ff14',
      }}>
        {'> SKILLS_DISPLAY.probe()'}
      </h2>
      <p className="text-center mb-10" style={{
        fontFamily: "'Inconsolata', monospace",
        fontSize: '0.85rem',
        color: 'rgba(57,255,20,0.5)',
      }}>
        hover over components to probe skill categories
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>

        {/* ── LEFT BOX — circuit diagram ── */}
        {/* THIS BOX NEVER CHANGES. NO HOVER EFFECTS ON THIS DIV. */}
        <div style={{
          width: '520px',
          minWidth: '520px',
          maxWidth: '520px',
          height: '380px',
          minHeight: '380px',
          maxHeight: '380px',
          border: '1px solid rgba(57,255,20,0.2)',
          borderRadius: '4px',
          flexShrink: 0,
          flexGrow: 0,
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(10, 20, 10, 0.4)',
        }}>
          <BreadboardSVG onHover={setActive} onLeave={() => setActive(null)} />
        </div>

        {/* ── RIGHT BOX — skill info ── */}
        {/* THIS BOX NEVER CHANGES EITHER. ONLY THE TEXT INSIDE CHANGES. */}
        <div style={{
          width: '340px',
          minWidth: '340px',
          maxWidth: '340px',
          height: '380px',
          minHeight: '380px',
          maxHeight: '380px',
          border: '1px solid rgba(57,255,20,0.2)',
          borderRadius: '4px',
          flexShrink: 0,
          flexGrow: 0,
          padding: '24px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          fontFamily: "'Share Tech Mono', monospace",
          color: '#39ff14',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          backgroundColor: 'rgba(10, 20, 10, 0.4)',
        }}>

          {/* Default state — no component hovered */}
          {active === null && (
            <div>
              <p style={{ color: 'rgba(57,255,20,0.5)', marginBottom: '12px' }}>
                &gt; AWAITING_PROBE...
              </p>
              <p style={{ color: 'rgba(57,255,20,0.4)', fontSize: '0.8rem' }}>
                Hover over a component on the breadboard to view skill category details.
              </p>
            </div>
          )}

          {/* Active state — show skills for hovered component */}
          {active !== null && (
            <div>
              <p style={{ marginBottom: '12px', color: '#39ff14' }}>
                &gt; {active.toUpperCase()}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {SKILLS[active].map((skill) => (
                  <li key={skill} style={{ marginBottom: '6px', color: 'rgba(57,255,20,0.85)' }}>
                    — {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
