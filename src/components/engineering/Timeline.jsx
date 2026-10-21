import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { education } from '../../data/engineeringData';

function TimelineNode({ entry, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            className="relative pl-7 sm:pl-12 md:pl-16 pb-10 sm:pb-12 last:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 }}
        >
            {/* Probe point aligned with left edge trace */}
            <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                style={{
                    borderColor: inView ? '#39ff14' : 'rgba(57,255,20,0.25)',
                    backgroundColor: '#070c07',
                    transition: 'border-color 0.5s',
                }}
            >
                <div className="w-1.5 h-1.5 rounded-full"
                    style={{
                        background: inView ? '#39ff14' : 'transparent',
                        boxShadow: inView ? '0 0 6px #39ff14' : 'none',
                        transition: 'all 0.5s',
                    }}
                />
            </div>

            {/* Period badge */}
            <div className="mb-1.5" style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.68rem',
                color: 'var(--osc-amber)',
                textShadow: '0 0 4px rgba(255,183,0,0.3)',
                letterSpacing: '0.08em',
            }}>
                {entry.period}
            </div>

            {/* Institution */}
            <h3 style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
                color: '#39ff14',
                textShadow: '0 0 4px rgba(57,255,20,0.3)',
                marginBottom: '0.25rem',
                wordBreak: 'break-word',
            }}>
                {entry.institution}
            </h3>

            {/* Degree */}
            <p style={{
                fontFamily: "'Inconsolata', monospace",
                fontSize: '0.85rem',
                color: 'rgba(57,255,20,0.6)',
                marginBottom: '0.25rem',
                wordBreak: 'break-word',
            }}>
                {entry.degree}
            </p>

            {/* Location */}
            <p style={{
                fontFamily: "'Inconsolata', monospace",
                fontSize: '0.75rem',
                color: 'rgba(57,255,20,0.35)',
            }}>
                📍 {entry.location}
            </p>
        </motion.div>
    );
}

export default function Timeline() {
    const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="education" ref={sectionRef} className="py-12 sm:py-16 px-3.5 sm:px-6 max-w-3xl mx-auto w-full">
            <h2 className="text-center mb-2" style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: '#39ff14',
                textShadow: 'var(--osc-glow-sm)',
            }}>
                {'> EDUCATION.trace()'}
            </h2>
            <p className="text-center mb-10 phosphor-text-dim text-xs sm:text-sm" style={{
                fontFamily: "'Inconsolata', monospace",
            }}>
                signal trace — academic path
            </p>

            <div className="relative">
                {/* Vertical trace line near left edge */}
                <div className="absolute left-[6px] top-0 bottom-0 w-[1.5px]">
                    <motion.div
                        className="w-full bg-gradient-to-b from-green-400/50 to-green-900/20"
                        style={{ originY: 0 }}
                        initial={{ scaleY: 0, height: '100%' }}
                        animate={sectionInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                </div>

                {education.map((entry, i) => (
                    <TimelineNode key={entry.id} entry={entry} index={i} />
                ))}
            </div>
        </section>
    );
}
