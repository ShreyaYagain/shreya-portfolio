import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../../data/engineeringData';

function MetricDisplay({ label, value }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    return (
        <div ref={ref} className="text-center">
            <motion.span
                className="metric-value block"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
            >
                {inView ? `${value}%` : '0%'}
            </motion.span>
            <span className="channel-label">{label}</span>
        </div>
    );
}

function ProjectCard({ project, index }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            className="osc-screen p-6 md:p-8 mb-8 relative overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
        >
            {/* Channel strip at top */}
            <div className="absolute top-0 left-0 right-0 h-1 waveform-scan" style={{
                background: 'linear-gradient(90deg, transparent, var(--osc-phosphor), transparent)',
                backgroundSize: '200% 100%',
            }} />

            {/* Channel label */}
            <div className="channel-label mb-4 flex items-center gap-3">
                <span className="phosphor-text">{project.channel}</span>
                <span className="text-green-900/30">│</span>
                <span>{project.year}</span>
            </div>

            {/* Project title */}
            <h3 style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                color: '#39ff14',
                textShadow: '0 0 6px rgba(57,255,20,0.3)',
                marginBottom: '1rem',
            }}>
                {project.title}
            </h3>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                ))}
            </div>

            {/* Bullet points */}
            <div className="space-y-3 mb-6">
                {project.bullets.map((bullet, i) => (
                    <p key={i} className="terminal-bullet" style={{
                        fontFamily: "'Inconsolata', monospace",
                        fontSize: '0.9rem',
                        color: 'rgba(57,255,20,0.6)',
                        lineHeight: 1.6,
                    }}>
                        {bullet}
                    </p>
                ))}
            </div>

            {/* Metrics */}
            {project.metrics && (
                <div className="flex gap-8 mt-6 pt-6 border-t border-green-900/20">
                    {project.metrics.bitTransitionReduction && (
                        <MetricDisplay label="BIT TRANSITION ↓" value={project.metrics.bitTransitionReduction} />
                    )}
                    {project.metrics.powerReduction && (
                        <MetricDisplay label="POWER ↓" value={project.metrics.powerReduction} />
                    )}
                </div>
            )}
        </motion.div>
    );
}

export default function ProjectsSection() {
    return (
        <section className="py-16 px-4 max-w-4xl mx-auto">
            <h2 className="text-center mb-2" style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: '#39ff14',
                textShadow: 'var(--osc-glow-sm)',
            }}>
                {'> PROJECTS.scan()'}
            </h2>
            <p className="text-center mb-12 phosphor-text-dim" style={{
                fontFamily: "'Inconsolata', monospace",
                fontSize: '0.85rem',
            }}>
                probing active channels...
            </p>

            {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
            ))}
        </section>
    );
}
