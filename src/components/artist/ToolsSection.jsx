import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { toolsData } from '../../data/tools';
import SectionHeader from './SectionHeader';

const MotionDiv = motion.div;

// Hand-drawn tool icons for sticker chips
function ToolIcon({ type }) {
    switch (type) {
        case 'tablet':
            return (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flex-shrink-0"
                >
                    <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" />
                    <line x1="6.5" y1="12" x2="9.5" y2="12" />
                </svg>
            );
        case 'stylus':
            return (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flex-shrink-0"
                >
                    <path d="M12.5 2.5L13.5 3.5L5 12L2 14L4 11L12.5 2.5Z" />
                    <circle cx="9.5" cy="5.5" r="0.6" fill="currentColor" />
                </svg>
            );
        case 'pencil':
            return (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flex-shrink-0"
                >
                    <path d="M11 2L14 5L5 14L2 14L2 11L11 2Z" />
                    <path d="M2 14L4 12L4 14Z" fill="currentColor" />
                </svg>
            );
        case 'sketch':
            return (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flex-shrink-0"
                >
                    <path d="M12 2.5L13.5 4L5 12.5L2.5 13.5L3.5 11L12 2.5Z" />
                    <line x1="10" y1="4.5" x2="11.5" y2="6" />
                </svg>
            );
        case 'fineliner':
            return (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flex-shrink-0"
                >
                    <path d="M3 13L4.5 9L11.5 2L14 4.5L7 11.5L3 13Z" />
                    <path d="M2 14L3 13" strokeWidth="1.8" />
                    <line x1="6.5" y1="7" x2="9" y2="9.5" />
                </svg>
            );
        case 'charcoal':
            return (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flex-shrink-0"
                >
                    <rect x="2.5" y="4.5" width="10.5" height="4" rx="1" transform="rotate(-15 8 6)" />
                    <circle cx="12.5" cy="11.5" r="0.9" fill="currentColor" />
                    <circle cx="14" cy="9.5" r="0.6" fill="currentColor" />
                </svg>
            );
        case 'marker':
            return (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flex-shrink-0"
                >
                    <rect x="4" y="5.5" width="8" height="8.5" rx="1" />
                    <path d="M6 5.5L7 2.5L9 2.5L10 5.5" fill="none" />
                    <line x1="4" y1="8.5" x2="12" y2="8.5" />
                </svg>
            );
        default:
            return null;
    }
}

// Hand-drawn squiggle underline for card titles
function SquiggleUnderline() {
    return (
        <svg
            viewBox="0 0 100 12"
            className="w-20 sm:w-24 h-2.5 mt-0.5 text-[var(--sk-red)] stroke-current fill-none overflow-visible select-none pointer-events-none"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <path d="M 2 6 Q 16 1, 32 6 T 64 6 T 98 6" />
        </svg>
    );
}

// Sticker-style chip for each individual tool
function ToolChip({ tool, shouldReduceMotion }) {
    return (
        <MotionDiv
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full cursor-default select-none transition-shadow"
            style={{
                background: '#fffdf9',
                border: '1px solid rgba(121, 1, 13, 0.14)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
                transform: `rotate(${tool.tilt}deg)`,
                color: 'var(--sk-ink)',
            }}
            whileHover={
                shouldReduceMotion
                    ? {}
                    : {
                          scale: 1.08,
                          rotate: [tool.tilt, tool.tilt - 3, tool.tilt + 3, tool.tilt - 1.5, tool.tilt],
                          boxShadow: '0 4px 12px rgba(121, 1, 13, 0.14), 0 1px 3px rgba(0, 0, 0, 0.06)',
                          transition: { duration: 0.35 },
                      }
            }
        >
            <span style={{ color: 'var(--sk-red)' }}>
                <ToolIcon type={tool.icon} />
            </span>
            <span
                style={{
                    fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    lineHeight: 1.1,
                }}
            >
                {tool.name}
            </span>
        </MotionDiv>
    );
}

// Taped Paper Card
function ToolCard({ category, rotation, isRight, inView, shouldReduceMotion }) {
    const isDigital = category.id === 'digital';

    return (
        <MotionDiv
            className="relative flex-1 p-6 sm:p-7 md:p-8 rounded-[2px] flex flex-col justify-between"
            style={{
                background: isDigital ? '#faf6ee' : '#f8f4ea',
                backgroundImage: isDigital
                    ? 'repeating-linear-gradient(transparent, transparent 27px, rgba(121, 1, 13, 0.04) 27px, rgba(121, 1, 13, 0.04) 28px)'
                    : 'repeating-linear-gradient(transparent, transparent 27px, rgba(74, 63, 47, 0.04) 27px, rgba(74, 63, 47, 0.04) 28px)',
                border: isDigital ? '1px solid rgba(121, 1, 13, 0.09)' : '1px solid rgba(74, 63, 47, 0.1)',
                boxShadow: '2px 6px 20px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.04)',
                transform: `rotate(${rotation}deg)`,
                height: 'auto',
                overflow: 'visible',
            }}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: isRight ? 0.2 : 0.1 }}
        >
            {/* Washi tape strip at top center */}
            <div
                style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: isRight ? 'translateX(-50%) rotate(1.5deg)' : 'translateX(-50%) rotate(-1.5deg)',
                    width: '52px',
                    height: '16px',
                    background: 'rgba(215, 204, 185, 0.85)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    zIndex: 10,
                    pointerEvents: 'none',
                }}
            />

            {/* Subtle margin doodle in top-right corner, never overlapping text */}
            <div
                className="absolute top-4 right-4 pointer-events-none select-none opacity-40 text-[var(--sk-red)]"
                aria-hidden="true"
            >
                {isDigital ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M18 4L20 6L9 17L5 19L7 15L18 4Z" />
                        <path d="M15 7L17 9" />
                    </svg>
                )}
            </div>

            {/* Card Content Top: Title and Squiggle */}
            <div className="mb-6">
                <div className="inline-block">
                    <h3
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                            fontWeight: 600,
                            color: 'var(--sk-ink)',
                            lineHeight: 1.15,
                        }}
                    >
                        {category.title}
                    </h3>
                    <SquiggleUnderline />
                </div>
            </div>

            {/* Sticker-style Chips */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center mb-8">
                {category.tools.map((tool) => (
                    <ToolChip
                        key={tool.id}
                        tool={tool}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                ))}
            </div>

            {/* Card Bottom: Handwritten Tagline with Generous Height & Line-Height (No Clipped Descenders) */}
            <div
                className="mt-auto pt-3 pb-2 select-none"
                style={{
                    height: 'auto',
                    overflow: 'visible',
                }}
            >
                <p
                    style={{
                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--sk-ink-mid)',
                        lineHeight: 1.55,
                        margin: 0,
                        paddingBottom: '4px',
                    }}
                >
                    ✦ {category.tagline}
                </p>
            </div>
        </MotionDiv>
    );
}

export default function ToolsSection() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="tools" ref={ref} className="scrapbook-section max-w-4xl mx-auto py-16 md:py-20 px-4">
            <SectionHeader
                title="tools & mediums"
                subtitle="the physical instruments and digital setups I rely on every day."
            />

            <div className="flex flex-col md:flex-row gap-8 lg:gap-10 items-stretch">
                <ToolCard
                    category={toolsData.digital}
                    rotation={-1.5}
                    isRight={false}
                    inView={inView}
                    shouldReduceMotion={shouldReduceMotion}
                />
                <ToolCard
                    category={toolsData.traditional}
                    rotation={1.5}
                    isRight={true}
                    inView={inView}
                    shouldReduceMotion={shouldReduceMotion}
                />
            </div>
        </section>
    );
}
