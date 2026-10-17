import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { exploringNotes } from '../../data/now';
import SectionHeader from './SectionHeader';

const MotionDiv = motion.div;

function NoteDoodle({ doodle }) {
    switch (doodle) {
        case 'star':
            return (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="select-none pointer-events-none"
                >
                    <path
                        d="M12 2L14.2 8.8L21 9.5L16 14.2L17.5 21L12 17.5L6.5 21L8 14.2L3 9.5L9.8 8.8L12 2Z"
                        fill="currentColor"
                        fillOpacity="0.12"
                    />
                </svg>
            );
        case 'yarn':
            return (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="select-none pointer-events-none"
                >
                    <circle cx="11" cy="11" r="7.5" fill="currentColor" fillOpacity="0.1" />
                    <path d="M5.5 14C7.5 12 10.5 9 14.5 7.5" />
                    <path d="M8 17.5C10 14 13.5 11 18 9.5" />
                    <path d="M4 10C7 8 11 7 17 13" />
                    <path d="M15 16.5C17 18.5 19 19 22 17.5" />
                </svg>
            );
        case 'heart':
            return (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="select-none pointer-events-none"
                >
                    <path
                        d="M12 21C12 21 3.5 15.5 3.5 8.5C3.5 5.5 6 3.5 9 3.5C10.8 3.5 12 4.5 12 4.5C12 4.5 13.2 3.5 15 3.5C18 3.5 20.5 5.5 20.5 8.5C20.5 15.5 12 21 12 21Z"
                        fill="currentColor"
                        fillOpacity="0.12"
                    />
                </svg>
            );
        case 'quill':
            return (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="select-none pointer-events-none"
                >
                    <path
                        d="M20 3C17 5 11 9 8 16L4 20L8 16C15 13 19 7 20 3Z"
                        fill="currentColor"
                        fillOpacity="0.1"
                    />
                    <path d="M14 9L9 14" />
                    <path d="M4 20C4 20 3 22 1.5 22.5" />
                </svg>
            );
        case 'marker':
            return (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="select-none pointer-events-none"
                >
                    <path
                        d="M14 3L21 10L12 19L5 19L5 12L14 3Z"
                        fill="currentColor"
                        fillOpacity="0.1"
                    />
                    <line x1="11" y1="6" x2="18" y2="13" />
                    <path d="M5 19L2 22" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        default:
            return null;
    }
}

// Dusty-rose washi tape strip used on every note with individual angle
function DustyRoseWashiTape({ angle = -1 }) {
    return (
        <div
            style={{
                position: 'absolute',
                top: '-7px',
                left: '50%',
                transform: `translateX(-50%) rotate(${angle}deg)`,
                width: '44px',
                height: '14px',
                background: 'var(--sk-tape)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                zIndex: 10,
                pointerEvents: 'none',
            }}
            aria-hidden="true"
        />
    );
}

function StickyNoteCard({ item, index, inView, shouldReduceMotion }) {
    return (
        <MotionDiv
            className={`relative p-5 sm:p-5 rounded-[2px] flex flex-col items-center justify-between min-h-[150px] sm:min-h-[165px] transition-shadow duration-300 cursor-default select-none ${
                index === 4 ? 'col-span-2 sm:col-span-1 max-w-[210px] sm:max-w-none mx-auto w-full' : ''
            }`}
            style={{
                background: item.bg,
                border: `1px solid ${item.border}`,
                boxShadow: '0 2px 8px rgba(26, 18, 8, 0.05), 0 1px 2px rgba(26, 18, 8, 0.03)',
                transform: `rotate(${item.tilt}deg)`,
                overflow: 'visible',
            }}
            initial={
                shouldReduceMotion
                    ? { opacity: 1, y: 0, rotate: item.tilt }
                    : { opacity: 0, y: -26, rotate: item.tilt * 1.3 }
            }
            animate={inView ? { opacity: 1, y: 0, rotate: item.tilt } : {}}
            transition={{
                type: 'spring',
                stiffness: 220,
                damping: 18,
                delay: shouldReduceMotion ? 0 : index * 0.09,
            }}
            whileHover={
                shouldReduceMotion
                    ? {}
                    : {
                          y: -8,
                          rotate: 0,
                          scale: 1.03,
                          boxShadow: '0 12px 24px rgba(26, 18, 8, 0.1), 0 3px 6px rgba(26, 18, 8, 0.04)',
                          transition: { duration: 0.22, ease: 'easeOut' },
                      }
            }
        >
            <DustyRoseWashiTape angle={item.tapeAngle} />

            {/* Doodle Header */}
            <div className="pt-2 text-[var(--sk-red)] flex items-center justify-center">
                <NoteDoodle doodle={item.doodle} />
            </div>

            {/* Note Content Text with handwritten font matching margin notes (not bolder), never clipped */}
            <div className="my-auto py-2 w-full text-center" style={{ overflow: 'visible' }}>
                <p
                    style={{
                        fontFamily: "'Caveat', cursive, sans-serif",
                        fontSize: 'clamp(1.25rem, 2.3vw, 1.45rem)',
                        fontWeight: 400,
                        color: 'var(--sk-ink)',
                        lineHeight: 1.4,
                        margin: 0,
                        wordBreak: 'break-word',
                    }}
                >
                    {item.text}
                </p>
            </div>

            {/* Subtle bottom detail dot */}
            <div className="text-[10px] opacity-25 text-[var(--sk-ink-mid)] select-none">
                ✦
            </div>
        </MotionDiv>
    );
}

export default function NowSection() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="now" ref={ref} className="scrapbook-section max-w-5xl mx-auto py-16 md:py-20 px-4">
            <SectionHeader
                title="currently exploring"
                subtitle="what is on my desk and sketchbook right now."
            />

            {/* Relaxed wrapping grid of 5 sticky notes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 items-stretch justify-center pt-4 pb-2">
                {exploringNotes.map((item, index) => (
                    <StickyNoteCard
                        key={item.id}
                        item={item}
                        index={index}
                        inView={inView}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                ))}
            </div>
        </section>
    );
}
