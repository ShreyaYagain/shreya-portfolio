import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { activities } from '../../data/engineeringData';

export default function ActivitiesPanel() {
    const [activeChannel, setActiveChannel] = useState('A');
    const activeActivity = activities.find(a => a.channel === activeChannel);

    return (
        <section className="py-16 px-4 max-w-4xl mx-auto">
            <h2 className="text-center mb-2" style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: '#39ff14',
                textShadow: 'var(--osc-glow-sm)',
            }}>
                {'> ACTIVITIES.select_channel()'}
            </h2>
            <p className="text-center mb-10 phosphor-text-dim" style={{
                fontFamily: "'Inconsolata', monospace",
                fontSize: '0.85rem',
            }}>
                toggle between active channels
            </p>

            {/* Channel tabs */}
            <div className="flex justify-center gap-2 mb-8">
                {activities.map(a => (
                    <button
                        key={a.channel}
                        onClick={() => setActiveChannel(a.channel)}
                        className="px-6 py-2 rounded transition-all duration-300"
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.85rem',
                            background: activeChannel === a.channel ? 'rgba(57,255,20,0.08)' : 'transparent',
                            border: `1px solid ${activeChannel === a.channel ? 'rgba(57,255,20,0.4)' : 'rgba(57,255,20,0.1)'}`,
                            color: activeChannel === a.channel ? '#39ff14' : 'rgba(57,255,20,0.3)',
                            textShadow: activeChannel === a.channel ? 'var(--osc-glow-sm)' : 'none',
                            cursor: 'pointer',
                        }}
                    >
                        CH_{a.channel}: {a.org.split(' ')[0]}
                    </button>
                ))}
            </div>

            {/* Content panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeChannel}
                    className="osc-screen p-6 md:p-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="channel-label mb-3">
                        CHANNEL {activeActivity.channel} — ACTIVE
                    </div>

                    <h3 style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                        color: '#39ff14',
                        textShadow: '0 0 4px rgba(57,255,20,0.3)',
                        marginBottom: '0.5rem',
                    }}>
                        {activeActivity.org}
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4" style={{
                        fontFamily: "'Inconsolata', monospace",
                        fontSize: '0.85rem',
                    }}>
                        <span className="amber-text">{activeActivity.role}</span>
                        <span className="phosphor-text-dim">{activeActivity.period}</span>
                        <span className="phosphor-text-dim">{activeActivity.location}</span>
                    </div>

                    <div className="space-y-3 mt-4">
                        {activeActivity.bullets.map((bullet, i) => (
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
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
