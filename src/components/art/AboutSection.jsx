import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { aboutParagraphs } from '../../data/artData';
import SketchbookAnimation from './AboutSection/SketchbookAnimation';

export default function AboutSection() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section ref={ref} className="scrapbook-section max-w-4xl mx-auto">
            <motion.h2
                className="mb-8 relative inline-block"
                style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    color: 'var(--sk-ink)',
                    fontWeight: 600,
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
            >
                about my creative side
                {/* Ink underline */}
                <motion.span
                    style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '100%',
                        height: '3px',
                        background: 'var(--sk-red)',
                        transformOrigin: 'left',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.h2>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Left — text with drop cap */}
                <div className="flex-1">
                    {aboutParagraphs.map((para, i) => (
                        <motion.p
                            key={i}
                            className={i === 0 ? 'drop-cap' : ''}
                            style={{
                                fontFamily: "'EB Garamond', serif",
                                fontSize: '1.25rem',
                                lineHeight: 2,
                                color: 'var(--sk-ink)',
                                marginBottom: '2rem',
                                letterSpacing: '0.01em',
                            }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                        >
                            {para}
                        </motion.p>
                    ))}
                </div>

                {/* Right — Animated Sketchbook */}
                <motion.div
                    className="w-full md:w-64 flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SketchbookAnimation />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
