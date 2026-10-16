import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { activities } from '../../data/activities';

const MotionDiv = motion.div;

function ActivityCard({ entry, index, isSpan2 }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <MotionDiv
            ref={ref}
            className={`osc-screen p-5 md:p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.08)] ${
                isSpan2 ? 'md:col-span-2' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: (index % 2) * 0.12 }}
        >
            {/* Top scanning accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-1 waveform-scan"
                style={{
                    background: 'linear-gradient(90deg, transparent, var(--osc-phosphor), transparent)',
                    backgroundSize: '200% 100%',
                }}
            />

            <div>
                {/* Header channel tag */}
                <div className="channel-label mb-2 flex items-center justify-between">
                    <span className="phosphor-text font-bold">ACT_MOD_0{index + 1}</span>
                    <span className="text-green-900/40">STATUS: LOGGED</span>
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
                        color: '#39ff14',
                        textShadow: '0 0 4px rgba(57,255,20,0.3)',
                        lineHeight: 1.3,
                        marginBottom: '0.35rem',
                    }}
                >
                    {entry.title}
                </h3>

                {/* Organization and Dates line */}
                <div
                    className="flex flex-wrap items-center gap-2 mb-4"
                    style={{
                        fontFamily: "'Inconsolata', monospace",
                        fontSize: '0.85rem',
                        color: 'rgba(57,255,20,0.65)',
                    }}
                >
                    <span className="font-bold text-[#39ff14]/85">{entry.organization}</span>
                    {entry.dates && (
                        <>
                            <span className="text-green-900/40">│</span>
                            <span
                                className="text-[var(--osc-amber)]"
                                style={{ textShadow: '0 0 4px rgba(255,183,0,0.25)' }}
                            >
                                {entry.dates}
                            </span>
                        </>
                    )}
                </div>

                {/* Bullets with terminal '>_' prefix */}
                <div className="space-y-2 mb-4">
                    {entry.bullets.map((bullet, i) => (
                        <p
                            key={i}
                            className="terminal-bullet"
                            style={{
                                fontFamily: "'Inconsolata', monospace",
                                fontSize: '0.86rem',
                                color: 'rgba(57,255,20,0.72)',
                                lineHeight: 1.6,
                            }}
                        >
                            {bullet}
                        </p>
                    ))}
                </div>
            </div>

            {/* Optional amber glowing stat chips (for volunteering) */}
            {entry.statChips && entry.statChips.length > 0 && (
                <div className="flex flex-wrap gap-2.5 pt-3 mt-2 border-t border-green-900/20">
                    {entry.statChips.map((chip) => (
                        <span
                            key={chip}
                            className="px-2.5 py-1 rounded-sm border border-[rgba(255,183,0,0.35)] bg-[rgba(255,183,0,0.06)]"
                            style={{
                                fontFamily: "'Orbitron', 'Share Tech Mono', monospace",
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                color: 'var(--osc-amber)',
                                textShadow: 'var(--osc-glow-amber)',
                                letterSpacing: '0.06em',
                            }}
                        >
                            ⚡ {chip}
                        </span>
                    ))}
                </div>
            )}
        </MotionDiv>
    );
}

export default function ActivitiesSection() {
    const { ref: sectionRef } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            id="activities"
            ref={sectionRef}
            className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto"
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
                {'> ACTIVITIES.log()'}
            </h2>
            <p
                className="text-center mb-10 phosphor-text-dim"
                style={{
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: '0.85rem',
                }}
            >
                loading extracurricular modules...
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-7 items-stretch">
                {activities.map((entry, i) => (
                    <ActivityCard
                        key={entry.id || entry.title}
                        entry={entry}
                        index={i}
                        isSpan2={i === activities.length - 1 && activities.length % 2 !== 0}
                    />
                ))}
            </div>
        </section>
    );
}
