import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../../data/projects';

const MotionSpan = motion.span;
const MotionDiv = motion.div;

function MetricDisplay({ label, value }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    const displayValue = typeof value === 'number' ? `${value}%` : value;

    return (
        <div ref={ref} className="text-center">
            <MotionSpan
                className="metric-value block"
                style={{ fontSize: 'clamp(1.35rem, 2vw, 1.85rem)', lineHeight: 1.1 }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
            >
                {inView ? displayValue : '0%'}
            </MotionSpan>
            <span className="channel-label block mt-1" style={{ fontSize: '0.65rem' }}>{label}</span>
        </div>
    );
}

function ProjectCard({ project, index, isSpan2 }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <MotionDiv
            ref={ref}
            className={`osc-screen p-5 md:p-6 relative overflow-hidden flex flex-col h-full ${
                isSpan2 ? 'md:col-span-2' : ''
            }`}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: (index % 2) * 0.12 }}
        >
            {/* Channel strip at top */}
            <div className="absolute top-0 left-0 right-0 h-1 waveform-scan" style={{
                background: 'linear-gradient(90deg, transparent, var(--osc-phosphor), transparent)',
                backgroundSize: '200% 100%',
            }} />

            {/* Channel label & GitHub link */}
            <div className="channel-label mb-3 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="phosphor-text font-bold">{project.channel}</span>
                    <span className="text-green-900/30">│</span>
                    <span>{project.year}</span>
                    {project.status === 'ongoing' && (
                        <span
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border border-[rgba(255,183,0,0.4)] bg-[rgba(255,183,0,0.06)] glow-pulse"
                            style={{
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: '0.68rem',
                                color: 'var(--osc-amber)',
                                textShadow: 'var(--osc-glow-amber)',
                                letterSpacing: '0.04em',
                                lineHeight: 1.2,
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full bg-[#39ff14] shadow-[0_0_6px_#39ff14] blink inline-block flex-shrink-0"
                            />
                            <span>[STATUS: ONGOING]</span>
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="terminal-btn"
                        >
                            [GITHUB ↗]
                        </a>
                    )}
                    {project.website && (
                        <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="terminal-btn"
                        >
                            [WEBSITE ↗]
                        </a>
                    )}
                </div>
            </div>

            {/* Project title */}
            <h3 style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)',
                color: '#39ff14',
                textShadow: '0 0 6px rgba(57,255,20,0.3)',
                marginBottom: '0.75rem',
                lineHeight: 1.3,
            }}>
                {project.title}
            </h3>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {(project.tags || project.tech || []).map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                ))}
            </div>

            {/* Bullet points */}
            <div className={`space-y-2 mb-4 flex-1 ${isSpan2 ? 'md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2 md:space-y-0' : ''}`}>
                {project.bullets.map((bullet, i) => (
                    <p key={i} className="terminal-bullet" style={{
                        fontFamily: "'Inconsolata', monospace",
                        fontSize: '0.84rem',
                        color: 'rgba(57,255,20,0.65)',
                        lineHeight: 1.55,
                    }}>
                        {bullet}
                    </p>
                ))}
            </div>

            {/* Metrics & Stats */}
            {(project.stats || project.metrics) && (
                <div className="flex gap-6 mt-auto pt-3 border-t border-green-900/20">
                    {project.stats ? (
                        project.stats.map((stat, i) => (
                            <MetricDisplay key={i} label={stat.label} value={stat.value} />
                        ))
                    ) : (
                        <>
                            {project.metrics?.bitTransitionReduction && (
                                <MetricDisplay label="BIT TRANSITION ↓" value={project.metrics.bitTransitionReduction} />
                            )}
                            {project.metrics?.powerReduction && (
                                <MetricDisplay label="POWER ↓" value={project.metrics.powerReduction} />
                            )}
                        </>
                    )}
                </div>
            )}
        </MotionDiv>
    );
}

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
            <h2 className="text-center mb-2" style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: '#39ff14',
                textShadow: 'var(--osc-glow-sm)',
            }}>
                {'> PROJECTS.scan()'}
            </h2>
            <p className="text-center mb-10 phosphor-text-dim" style={{
                fontFamily: "'Inconsolata', monospace",
                fontSize: '0.85rem',
            }}>
                probing active channels...
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-7 items-stretch">
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.id || project.channel}
                        project={project}
                        index={i}
                        isSpan2={i === projects.length - 1 && projects.length % 2 !== 0}
                    />
                ))}
            </div>
        </section>
    );
}
