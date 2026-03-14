import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { tools } from '../../data/artData';

function ToolCard({ data, rotation }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <motion.div
            ref={ref}
            className="tape-strip relative p-6 flex-1 min-w-[250px]"
            style={{
                background: 'var(--sk-paper)',
                transform: `rotate(${rotation}deg)`,
                boxShadow: '2px 3px 12px rgba(0,0,0,0.08)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            {/* Heading */}
            <h3 style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.5rem',
                color: 'var(--sk-ink)',
                marginBottom: '1rem',
                fontWeight: 700,
            }}>
                {data.heading}
            </h3>

            {/* Tools list */}
            <ul className="mb-4 space-y-1.5">
                {data.tools.map(tool => (
                    <li key={tool} style={{
                        fontFamily: "'EB Garamond', serif",
                        fontSize: '1rem',
                        color: 'var(--sk-ink)',
                    }}>
                        ✦ {tool}
                    </li>
                ))}
            </ul>

            {/* Note */}
            <p style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: 'italic',
                fontSize: '1.2rem',
                fontWeight: 500,
                color: 'var(--sk-ink)',
                lineHeight: 1.5,
            }}>
                {data.note}
            </p>

            {/* Torn bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 torn-edge-bottom h-8" style={{ background: 'var(--sk-paper)' }} />
        </motion.div>
    );
}

function StickyNote({ text }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    return (
        <motion.div
            ref={ref}
            className="sticky-note inline-block mt-6 mx-auto"
            style={{ transform: 'rotate(2deg)', maxWidth: '280px', whiteSpace: 'nowrap' }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
            {text}
        </motion.div>
    );
}

export default function ToolsMediums() {
    return (
        <section className="scrapbook-section max-w-4xl mx-auto">
            <h2 className="mb-8" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: 'var(--sk-ink)',
                fontWeight: 600,
            }}>
                tools & mediums
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <ToolCard data={tools.digital} rotation={-1.5} />
                <ToolCard data={tools.traditional} rotation={1} />
            </div>

            {/* Sticky note */}
            {tools.digital.current && (
                <div className="text-center mt-6">
                    <StickyNote text={tools.digital.current} />
                </div>
            )}
        </section>
    );
}
