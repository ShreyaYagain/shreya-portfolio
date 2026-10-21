import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { instagram, digitalContentCopy } from '../../data/artData';
import { contact } from '../../data/engineeringData';

const MotionH2 = motion.h2;
const MotionH3 = motion.h3;
const MotionDiv = motion.div;
const MotionA = motion.a;
const MotionPath = motion.path;

export default function WrapSection() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            id="contact"
            ref={ref}
            className="scrapbook-section max-w-4xl mx-auto pt-16 pb-28 sm:pb-36 px-4 text-center overflow-visible"
        >
            {/* ═══════════════════════════════════════════ */}
            {/* 1. HERO BOOKEND: "and that's a wrap."       */}
            {/* ═══════════════════════════════════════════ */}
            <div className="mb-10 sm:mb-12 inline-block text-center relative select-none">
                <MotionH2
                    style={{
                        fontFamily: "'Permanent Marker', cursive",
                        fontWeight: 400,
                        fontSize: 'clamp(2.1rem, 6.5vw, 4.2rem)',
                        color: 'var(--sk-red)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.01em',
                        transform: 'rotate(-1.5deg)',
                        transformOrigin: 'center center',
                    }}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    and that's a wrap.
                </MotionH2>

                {/* Hand-drawn scribble underline that draws itself */}
                <svg
                    viewBox="0 0 280 20"
                    className="w-full max-w-[260px] sm:max-w-[320px] h-4 mt-2 mx-auto overflow-visible"
                    fill="none"
                    stroke="var(--sk-red)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    <MotionPath
                        d="M 4 12 Q 75 3, 145 11 T 276 8"
                        initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                </svg>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* 2. "follow the process" + CURVED ARROW      */}
            {/* ═══════════════════════════════════════════ */}
            <MotionDiv
                className="flex flex-col items-center justify-center mb-6 select-none"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <span
                    style={{
                        fontFamily: "'Caveat', cursive, sans-serif",
                        fontSize: '1.45rem',
                        fontWeight: 500,
                        color: 'var(--sk-red)',
                        transform: 'rotate(-1.5deg)',
                        display: 'inline-block',
                    }}
                >
                    follow the process
                </span>

                {/* Hand-drawn curved arrow pointing down toward the card */}
                <svg
                    width="32"
                    height="36"
                    viewBox="0 0 32 36"
                    fill="none"
                    stroke="var(--sk-red)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1"
                    aria-hidden="true"
                >
                    <MotionPath
                        d="M16 2 C16 12, 18 18, 14 28"
                        initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.35 }}
                    />
                    <MotionPath
                        d="M9 23 L14 29 L20 23"
                        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.55 }}
                    />
                </svg>
            </MotionDiv>

            {/* ═══════════════════════════════════════════ */}
            {/* 3. RULED-PAPER NOTE CARD                    */}
            {/* ═══════════════════════════════════════════ */}
            <MotionDiv
                className="relative max-w-2xl mx-auto p-5 sm:p-8 rounded-[2px] mb-8 text-left"
                style={{
                    background: '#faf6ee',
                    backgroundImage:
                        'repeating-linear-gradient(transparent, transparent 27px, rgba(121, 1, 13, 0.04) 27px, rgba(121, 1, 13, 0.04) 28px)',
                    border: '1px solid rgba(121, 1, 13, 0.1)',
                    boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.06)',
                    transform: 'rotate(-0.8deg)',
                    overflow: 'visible',
                }}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 }}
            >
                {/* Washi tape strip at top center */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%) rotate(1.5deg)',
                        width: '52px',
                        height: '16px',
                        background: 'var(--sk-tape)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                        zIndex: 10,
                        pointerEvents: 'none',
                    }}
                    aria-hidden="true"
                />

                {/* Paragraph copy preserved word-for-word */}
                <p
                    style={{
                        fontFamily: "'EB Garamond', serif",
                        fontSize: '1.15rem',
                        lineHeight: 1.85,
                        color: 'var(--sk-ink)',
                        margin: 0,
                    }}
                >
                    {digitalContentCopy}
                </p>
            </MotionDiv>

            {/* ═══════════════════════════════════════════ */}
            {/* 4. @shreyeahfied POLAROID-STYLE STICKER TAG */}
            {/* ═══════════════════════════════════════════ */}
            <div className="mb-12">
                <MotionA
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] cursor-pointer select-none transition-shadow"
                    style={{
                        background: '#fffdfa',
                        border: '1px solid rgba(121, 1, 13, 0.16)',
                        boxShadow: '0 3px 10px rgba(26, 18, 8, 0.07), 0 1px 2px rgba(26, 18, 8, 0.04)',
                        transform: 'rotate(1.5deg)',
                        textDecoration: 'none',
                    }}
                    whileHover={
                        shouldReduceMotion
                            ? {}
                            : {
                                  rotate: [1.5, -2, 2, -1, 1.5],
                                  scale: 1.05,
                                  boxShadow: '0 6px 18px rgba(121, 1, 13, 0.15)',
                                  transition: { duration: 0.35 },
                              }
                    }
                >
                    {/* Tiny hand-drawn camera icon */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="var(--sk-red)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <rect x="2.5" y="5.5" width="15" height="11" rx="1.5" />
                        <circle cx="10" cy="11" r="3.2" />
                        <path d="M6.5 5.5L7.8 3.5H12.2L13.5 5.5" />
                    </svg>

                    <span
                        style={{
                            fontFamily: "'Caveat', cursive, sans-serif",
                            fontSize: '1.35rem',
                            fontWeight: 600,
                            color: 'var(--sk-red)',
                            lineHeight: 1,
                        }}
                    >
                        {instagram.handle}
                    </span>
                </MotionA>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* 5. HAND-DRAWN SQUIGGLE DIVIDER              */}
            {/* ═══════════════════════════════════════════ */}
            <div className="my-12 sm:my-14 flex justify-center select-none pointer-events-none" aria-hidden="true">
                <svg
                    viewBox="0 0 180 14"
                    className="w-44 sm:w-56 h-3.5 text-[var(--sk-red)] stroke-current fill-none opacity-45 overflow-visible"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                >
                    <MotionPath
                        d="M 2 7 Q 22 1, 45 7 T 90 7 T 135 7 T 178 7"
                        initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.4 }}
                    />
                </svg>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* 6. "let's make something." + COMPANION TAG */}
            {/* ═══════════════════════════════════════════ */}
            <div className="mb-8 relative inline-flex flex-col items-center">
                {/* Tilted "~ still learning ~" companion tag (moved from margin) */}
                <span
                    className="inline-block px-2.5 py-0.5 rounded-[2px] select-none mb-2"
                    style={{
                        fontFamily: "'Caveat', cursive, sans-serif",
                        fontSize: '1.15rem',
                        fontWeight: 400,
                        color: 'var(--sk-ink-mid)',
                        background: 'rgba(215, 204, 185, 0.5)',
                        border: '1px solid rgba(121, 1, 13, 0.1)',
                        transform: 'rotate(-2.5deg)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                >
                    ~ still learning ~
                </span>

                <div className="flex items-center justify-center gap-3">
                    {/* Small hand-drawn star left */}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--sk-red)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="opacity-60 select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
                    </svg>

                    <MotionH3
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: 'italic',
                            fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
                            color: 'var(--sk-ink)',
                            fontWeight: 600,
                            lineHeight: 1.2,
                        }}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        let's make something.
                    </MotionH3>

                    {/* Small pencil doodle right */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--sk-red)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-60 select-none pointer-events-none"
                        aria-hidden="true"
                    >
                        <path d="M18 4L20 6L9 17L5 19L7 15L18 4Z" />
                        <path d="M15 7L17 9" />
                    </svg>
                </div>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* 7. TWO TAPED PAPER TAGS (EMAIL & INSTAGRAM) */}
            {/* ═══════════════════════════════════════════ */}
            <MotionDiv
                className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 select-none"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.5 }}
            >
                {/* "email me" Taped Tag */}
                <MotionA
                    href={`mailto:${contact.email}`}
                    className="relative px-6 py-3 rounded-[2px] cursor-pointer inline-flex items-center justify-center min-h-[44px]"
                    style={{
                        background: '#faf6ee',
                        border: '1px solid rgba(121, 1, 13, 0.15)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        transform: 'rotate(-1deg)',
                        textDecoration: 'none',
                        touchAction: 'manipulation',
                    }}
                    whileHover={
                        shouldReduceMotion
                            ? {}
                            : {
                                  y: -4,
                                  scale: 1.04,
                                  boxShadow: '0 8px 18px rgba(121, 1, 13, 0.12)',
                                  transition: { duration: 0.2 },
                              }
                    }
                    whileTap={{ scale: 0.96 }}
                >
                    {/* Washi tape on top edge */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-6px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(1deg)',
                            width: '36px',
                            height: '12px',
                            background: 'var(--sk-tape)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                            pointerEvents: 'none',
                        }}
                        aria-hidden="true"
                    />
                    <span
                        style={{
                            fontFamily: "'Caveat', cursive, sans-serif",
                            fontSize: '1.45rem',
                            fontWeight: 500,
                            color: 'var(--sk-ink)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <span>email me</span>
                        <span style={{ color: 'var(--sk-red)', fontSize: '1.15rem' }}>✉</span>
                    </span>
                </MotionA>

                {/* "commissions" Taped Tag */}
                <MotionA
                    href="#commissions"
                    onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('commissions');
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="relative px-6 py-3 rounded-[2px] cursor-pointer inline-flex items-center justify-center min-h-[44px]"
                    style={{
                        background: '#faf6ee',
                        border: '1px solid rgba(121, 1, 13, 0.15)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        transform: 'rotate(-0.5deg)',
                        textDecoration: 'none',
                        touchAction: 'manipulation',
                    }}
                    whileHover={
                        shouldReduceMotion
                            ? {}
                            : {
                                  y: -4,
                                  scale: 1.04,
                                  boxShadow: '0 8px 18px rgba(121, 1, 13, 0.12)',
                                  transition: { duration: 0.2 },
                              }
                    }
                    whileTap={{ scale: 0.96 }}
                >
                    {/* Washi tape on top edge */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-6px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(1.5deg)',
                            width: '36px',
                            height: '12px',
                            background: 'var(--sk-tape)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                            pointerEvents: 'none',
                        }}
                        aria-hidden="true"
                    />
                    <span
                        style={{
                            fontFamily: "'Caveat', cursive, sans-serif",
                            fontSize: '1.45rem',
                            fontWeight: 500,
                            color: 'var(--sk-ink)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <span>commissions</span>
                        <span style={{ color: 'var(--sk-red)', fontSize: '1.15rem' }}>✦</span>
                    </span>
                </MotionA>

                {/* "@shreyeahfied" Taped Tag */}
                <MotionA
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-6 py-3 rounded-[2px] cursor-pointer inline-flex items-center justify-center min-h-[44px]"
                    style={{
                        background: '#faf6ee',
                        border: '1px solid rgba(121, 1, 13, 0.15)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                        transform: 'rotate(1deg)',
                        textDecoration: 'none',
                        touchAction: 'manipulation',
                    }}
                    whileHover={
                        shouldReduceMotion
                            ? {}
                            : {
                                  y: -4,
                                  scale: 1.04,
                                  boxShadow: '0 8px 18px rgba(121, 1, 13, 0.12)',
                                  transition: { duration: 0.2 },
                              }
                    }
                    whileTap={{ scale: 0.96 }}
                >
                    {/* Washi tape on top edge */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-6px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(-1deg)',
                            width: '36px',
                            height: '12px',
                            background: 'var(--sk-tape)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                            pointerEvents: 'none',
                        }}
                        aria-hidden="true"
                    />
                    <span
                        style={{
                            fontFamily: "'Caveat', cursive, sans-serif",
                            fontSize: '1.45rem',
                            fontWeight: 500,
                            color: 'var(--sk-ink)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <span>{instagram.handle}</span>
                        <span style={{ color: 'var(--sk-red)', fontSize: '1.15rem' }}>↗</span>
                    </span>
                </MotionA>
            </MotionDiv>

            {/* ═══════════════════════════════════════════ */}
            {/* 8. HAND-DRAWN SIGNATURE "shreya ♡"         */}
            {/* ═══════════════════════════════════════════ */}
            <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center select-none">
                <span
                    style={{
                        fontFamily: "'Caveat', cursive, sans-serif",
                        fontSize: '1.65rem',
                        fontWeight: 400,
                        color: 'var(--sk-red)',
                        transform: 'rotate(-2deg)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}
                >
                    shreya
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="var(--sk-red)"
                        stroke="var(--sk-red)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block"
                        aria-hidden="true"
                    >
                        <path d="M10 17C10 17 3 12.5 3 7C3 4.5 5 2.5 7.5 2.5C9 2.5 10 3.5 10 3.5C10 3.5 11 2.5 12.5 2.5C15 2.5 17 4.5 17 7C17 12.5 10 17 10 17Z" />
                    </svg>
                </span>
            </div>
        </section>
    );
}
