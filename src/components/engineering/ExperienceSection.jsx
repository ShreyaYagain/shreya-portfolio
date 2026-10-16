import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experiences } from '../../data/experience';

const MotionDiv = motion.div;

function ExperienceNode({ entry, index, total }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <MotionDiv
            ref={ref}
            className="relative pl-8 sm:pl-12 md:pl-16 pb-12 last:pb-2"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: index * 0.12 }}
        >
            {/* Timeline node pad / probe point */}
            <div
                className="absolute left-0 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-500 z-10"
                style={{
                    borderColor: inView ? '#39ff14' : 'rgba(57,255,20,0.25)',
                    backgroundColor: '#070c07',
                    boxShadow: inView ? '0 0 10px rgba(57,255,20,0.3)' : 'none',
                }}
            >
                <div
                    className="w-2 h-2 rounded-full transition-all duration-500"
                    style={{
                        backgroundColor: inView ? '#39ff14' : 'rgba(57,255,20,0.3)',
                        boxShadow: inView ? '0 0 8px #39ff14' : 'none',
                    }}
                />
            </div>

            {/* Horizontal trace connector from vertical rail into card */}
            <div
                className="absolute left-5 top-[33px] h-[1.5px] transition-all duration-500 hidden sm:block"
                style={{
                    width: 'calc(2rem - 6px)',
                    background: inView
                        ? 'linear-gradient(90deg, #39ff14, rgba(57,255,20,0.3))'
                        : 'rgba(57,255,20,0.15)',
                }}
            />

            {/* Experience Card */}
            <div className="osc-screen p-5 sm:p-6 md:p-8 relative overflow-hidden flex flex-col transition-all duration-300 hover:border-green-400/40 hover:shadow-[0_0_20px_rgba(57,255,20,0.06)]">
                {/* Top scan accent line */}
                <div
                    className="absolute top-0 left-0 right-0 h-1 waveform-scan"
                    style={{
                        background: 'linear-gradient(90deg, transparent, var(--osc-phosphor), transparent)',
                        backgroundSize: '200% 100%',
                    }}
                />

                {/* Header row: role title + log badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                            color: '#39ff14',
                            textShadow: '0 0 4px rgba(57,255,20,0.35)',
                            lineHeight: 1.3,
                        }}
                    >
                        {entry.role}
                    </h3>
                    <div className="channel-label self-start sm:self-auto flex items-center gap-2">
                        <span className="phosphor-text font-bold">LOG_0{index + 1}</span>
                        <span className="text-green-900/40">/</span>
                        <span>0{total}</span>
                    </div>
                </div>

                {/* Company, dates, and location */}
                <div
                    className="flex flex-wrap items-center gap-2 mb-4"
                    style={{
                        fontFamily: "'Inconsolata', monospace",
                        fontSize: '0.86rem',
                        color: 'rgba(57,255,20,0.65)',
                    }}
                >
                    <span className="font-bold text-[#39ff14]/90 tracking-wide">{entry.company}</span>
                    <span className="text-green-900/40">│</span>
                    <span className="text-[var(--osc-amber)]" style={{ textShadow: '0 0 4px rgba(255,183,0,0.25)' }}>
                        {entry.startDate} – {entry.endDate}
                    </span>
                    {entry.location && (
                        <>
                            <span className="text-green-900/40">│</span>
                            <span className="text-green-400/50">📍 {entry.location}</span>
                        </>
                    )}
                </div>

                {/* Tech tag chips */}
                {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {entry.tags.map((tag) => (
                            <span key={tag} className="tech-badge">{tag}</span>
                        ))}
                    </div>
                )}

                {/* Bullet points with terminal '>_' prefix */}
                <div className="space-y-2.5 mb-4">
                    {entry.bullets.map((bullet, i) => (
                        <p
                            key={i}
                            className="terminal-bullet"
                            style={{
                                fontFamily: "'Inconsolata', monospace",
                                fontSize: '0.86rem',
                                color: 'rgba(57,255,20,0.7)',
                                lineHeight: 1.6,
                            }}
                        >
                            {bullet}
                        </p>
                    ))}
                </div>

                {/* Bottom telemetry line */}
                <div
                    className="flex items-center justify-between pt-3 mt-2 border-t border-green-900/20"
                    style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.7rem',
                        color: 'rgba(57,255,20,0.35)',
                        letterSpacing: '0.05em',
                    }}
                >
                    <span>DOMAIN: RF & HIGH-SPEED PCB</span>
                    <span>LOG_STATUS: VERIFIED</span>
                </div>
            </div>
        </MotionDiv>
    );
}

export default function ExperienceSection() {
    const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="py-16 px-4 sm:px-6 md:px-8 max-w-[1100px] mx-auto"
        >
            <h2
                className="text-center mb-2"
                style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    color: '#39ff14',
                    textShadow: 'var(--osc-glow-sm)',
                }}
            >
                {'> EXPERIENCE.log()'}
            </h2>
            <p
                className="text-center mb-12 phosphor-text-dim"
                style={{
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: '0.85rem',
                }}
            >
                reading system logs...
            </p>

            <div className="relative">
                {/* Vertical glowing trace rail */}
                <div className="absolute left-[9px] top-6 bottom-6 w-[2px]">
                    <MotionDiv
                        className="w-full h-full bg-gradient-to-b from-[#39ff14]/70 via-[#39ff14]/30 to-green-950/20"
                        style={{ originY: 0 }}
                        initial={{ scaleY: 0 }}
                        animate={sectionInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.0, ease: 'easeOut' }}
                    />
                </div>

                {/* Render stacked timeline experience entries */}
                {experiences.map((entry, index) => (
                    <ExperienceNode
                        key={entry.id || entry.company}
                        entry={entry}
                        index={index}
                        total={experiences.length}
                    />
                ))}
            </div>
        </section>
    );
}
