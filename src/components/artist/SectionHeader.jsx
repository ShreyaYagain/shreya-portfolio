import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionH2 = motion.h2;
const MotionSpan = motion.span;

export default function SectionHeader({ title, subtitle, className = '' }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <div ref={ref} className={`mb-8 md:mb-10 text-left ${className}`}>

            {/* Serif italic title with red ink underline */}
            <div className="relative inline-block">
                <MotionH2
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                        color: 'var(--sk-ink)',
                        fontWeight: 600,
                        lineHeight: 1.2,
                    }}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </MotionH2>

                {/* Animated ink underline */}
                <MotionSpan
                    style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '100%',
                        height: '3px',
                        background: 'var(--sk-red)',
                        transformOrigin: 'left',
                        display: 'block',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>

            {/* Optional subtitle */}
            {subtitle && (
                <p
                    className="mt-3 max-w-2xl"
                    style={{
                        fontFamily: "'EB Garamond', serif",
                        fontStyle: 'italic',
                        fontSize: '1.05rem',
                        color: 'var(--sk-ink-mid)',
                        lineHeight: 1.6,
                    }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
