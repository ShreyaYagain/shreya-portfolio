import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { aboutData } from '../../data/aboutData';
import SectionHeader from './SectionHeader';

const MotionDiv = motion.div;
const MotionP = motion.p;

function MarkerHighlight({ children, inView, delay = 0, color = 'rgba(238, 204, 88, 0.36)' }) {
    return (
        <span className="relative inline-block">
            <motion.span
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background: color,
                    transformOrigin: 'left',
                    borderRadius: '2px 4px',
                    top: '18%',
                    bottom: '6%',
                    left: '-1px',
                    right: '-1px',
                }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                    duration: 0.6,
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                }}
            />
            <span className="relative z-10">{children}</span>
        </span>
    );
}

function CollagePolaroid({ item, index, inView, prefersReducedMotion }) {
    const [imgSrc, setImgSrc] = useState(item.src);
    const [isHovered, setIsHovered] = useState(false);

    const positions = [
        // Card 1: Top-left
        { top: '0px', left: '8%', zIndex: isHovered ? 40 : 10 },
        // Card 2: Top-right, slightly lower
        { top: '24px', right: '4%', zIndex: isHovered ? 40 : 15 },
        // Card 3: Bottom-center, overlapping both
        { top: '130px', left: '22%', zIndex: isHovered ? 40 : 20 },
    ];

    const pos = positions[index] || positions[0];

    return (
        <MotionDiv
            className="absolute cursor-pointer transition-shadow duration-300 select-none"
            style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                zIndex: pos.zIndex,
                width: '185px',
                background: '#ffffff',
                padding: '8px 8px 12px 8px',
                borderRadius: '2px',
                boxShadow: isHovered
                    ? '4px 12px 28px rgba(0,0,0,0.22)'
                    : '2px 5px 16px rgba(0,0,0,0.11)',
            }}
            initial={
                prefersReducedMotion
                    ? { opacity: 1, y: 0, scale: 1, rotate: item.rotation }
                    : { opacity: 0, y: -45, scale: 0.9, rotate: item.rotation }
            }
            animate={
                inView
                    ? {
                          opacity: 1,
                          y: isHovered ? -8 : 0,
                          scale: isHovered ? 1.06 : 1,
                          rotate: isHovered ? 0 : item.rotation,
                      }
                    : {}
            }
            transition={
                prefersReducedMotion
                    ? { duration: 0 }
                    : {
                          type: 'spring',
                          damping: 15,
                          stiffness: 110,
                          delay: 0.15 + index * 0.14,
                      }
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered((prev) => !prev)}
        >
            {/* Washi Tape on corner */}
            <div
                style={{
                    position: 'absolute',
                    top: '-6px',
                    left: item.tapeSide === 'left' ? '12px' : 'auto',
                    right: item.tapeSide === 'right' ? '12px' : 'auto',
                    width: '38px',
                    height: '14px',
                    background: 'rgba(215, 204, 185, 0.8)',
                    transform: item.tapeSide === 'left' ? 'rotate(-3deg)' : 'rotate(3deg)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    zIndex: 25,
                    pointerEvents: 'none',
                }}
            />

            {/* Photo Square Container */}
            <div
                style={{
                    width: '169px',
                    height: '169px',
                    overflow: 'hidden',
                    background: '#1a1612',
                    borderRadius: '1px',
                }}
            >
                <img
                    src={imgSrc}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    onError={() => {
                        if (item.fallbackSrc && imgSrc !== item.fallbackSrc) {
                            setImgSrc(item.fallbackSrc);
                        }
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </div>

            {/* Small handwritten caption beneath */}
            <p
                className="mt-2 text-center"
                style={{
                    fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: 'var(--sk-ink)',
                    lineHeight: 1.15,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {item.caption}
            </p>
        </MotionDiv>
    );
}

export default function AboutSection() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
    const prefersReducedMotion = useReducedMotion();

    const { pullQuote, paragraphs, collage, strip } = aboutData;

    return (
        <section
            id="about"
            ref={ref}
            className="scrapbook-section max-w-5xl mx-auto py-16 md:py-24 px-4 overflow-x-hidden relative"
        >
            <SectionHeader
                title="about my creative side"
            />

            {/* ═══════════════════════════════════════════ */}
            {/* TOP ROW: Pull-Quote + Para 1 & Collage       */}
            {/* ═══════════════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
                {/* LEFT COLUMN: Pull-Quote & First Paragraph (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-start">
                    {/* Pull-Quote with Hand-Drawn Underline and Star */}
                    <div className="mb-6 relative">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3
                                style={{
                                    fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                    fontSize: 'clamp(2rem, 3.6vw, 2.9rem)',
                                    fontWeight: 700,
                                    color: 'var(--sk-ink)',
                                    lineHeight: 1.15,
                                    letterSpacing: '0.01em',
                                    display: 'inline-block',
                                }}
                            >
                                “{pullQuote.text}”
                            </h3>

                            {/* Small Hand-Drawn Star */}
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="var(--sk-red)"
                                className="inline-block flex-shrink-0 animate-pulse"
                                style={{ transform: 'rotate(12deg)' }}
                            >
                                <path d="M12 2L14.4 8.6L21 9.2L16 13.8L17.5 20.4L12 17L6.5 20.4L8 13.8L3 9.2L9.6 8.6L12 2Z" />
                            </svg>
                        </div>

                        {/* Hand-Drawn Red Underline (drawn with stroke-dashoffset / pathLength) */}
                        <svg
                            viewBox="0 0 280 18"
                            className="w-full max-w-[280px] h-3.5 mt-1 overflow-visible"
                            fill="none"
                        >
                            <motion.path
                                d="M 3 11 Q 70 3, 140 10 T 277 7"
                                stroke="var(--sk-red)"
                                strokeWidth="3.2"
                                strokeLinecap="round"
                                initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{
                                    duration: prefersReducedMotion ? 0 : 0.7,
                                    delay: 0.2,
                                    ease: 'easeOut',
                                }}
                            />
                        </svg>
                    </div>

                    {/* Paragraph 1 with Red Drop Cap & Highlighted Phrase */}
                    <MotionP
                        className="drop-cap"
                        style={{
                            fontFamily: "'EB Garamond', serif",
                            fontSize: 'clamp(1.15rem, 2vw, 1.25rem)',
                            lineHeight: 1.95,
                            color: 'var(--sk-ink)',
                            letterSpacing: '0.01em',
                        }}
                        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        My artistic journey began with a simple pen and an <MarkerHighlight inView={inView} delay={0.4}>{paragraphs.journey.highlight}</MarkerHighlight>. From rudimentary after-school sketches to dedicated self-study, I have continuously explored various techniques and mediums.
                    </MotionP>

                    {/* Subtle margin doodle: Sketched arrow pointing toward collage on desktop */}
                    <div className="hidden lg:flex items-center gap-2 mt-6 select-none" style={{ color: 'var(--sk-red)' }}>
                        <span style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem' }}>
                            studies from the sketchbook
                        </span>
                        <svg width="45" height="24" viewBox="0 0 50 26" fill="none" stroke="var(--sk-red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M 4 18 Q 20 6, 44 14" />
                            <path d="M 36 8 L 44 14 L 38 21" />
                        </svg>
                    </div>
                </div>

                {/* RIGHT COLUMN: 3 Overlapping Tilted Polaroids Collage (5 cols) */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    {/* Polaroid Cluster Canvas */}
                    <div
                        className="relative w-full max-w-[340px] sm:max-w-[380px]"
                        style={{
                            height: '350px',
                        }}
                    >
                        {/* Margin Doodles around collage */}
                        {/* 1. Sparkle Top Left */}
                        <div className="absolute -top-3 left-0 pointer-events-none select-none z-30" style={{ color: 'var(--sk-red)' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--sk-red)">
                                <path d="M12 0L14 9L23 11L14 13L12 22L10 13L1 11L10 9L12 0Z" opacity="0.8" />
                            </svg>
                        </div>

                        {/* 2. Small Eye Sketch Top Right */}
                        <div className="absolute -top-6 right-2 pointer-events-none select-none z-30 opacity-75">
                            <svg width="36" height="22" viewBox="0 0 40 24" fill="none" stroke="var(--sk-ink-mid)" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M 3 12 Q 20 2, 37 12 Q 20 22, 3 12 Z" />
                                <circle cx="20" cy="12" r="4.5" fill="var(--sk-ink-mid)" />
                                <circle cx="21.5" cy="10.5" r="1.5" fill="#ffffff" />
                            </svg>
                        </div>

                        {/* 3 Polaroids */}
                        {collage.items.map((item, idx) => (
                            <CollagePolaroid
                                key={item.id}
                                item={item}
                                index={idx}
                                inView={inView}
                                prefersReducedMotion={prefersReducedMotion}
                            />
                        ))}
                    </div>

                    {/* Handwritten note under collage */}
                    <p
                        className="mt-4 text-center select-none"
                        style={{
                            fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                            fontSize: '1.25rem',
                            color: 'var(--sk-ink-mid)',
                            transform: 'rotate(-1deg)',
                        }}
                    >
                        ✦ {collage.note}
                    </p>
                </div>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* SECOND ROW: Two Side-by-Side Note Cards     */}
            {/* ═══════════════════════════════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                {/* Note Card 1: What Draws Me */}
                <MotionDiv
                    className="relative p-6 sm:p-7 rounded-[2px] transition-transform duration-300 flex flex-col justify-start"
                    style={{
                        background: '#faf6ee',
                        border: '1px solid rgba(121, 1, 13, 0.09)',
                        boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.06)',
                        transform: 'rotate(-1deg)',
                        backgroundImage:
                            'repeating-linear-gradient(transparent, transparent 27px, rgba(121, 1, 13, 0.04) 27px, rgba(121, 1, 13, 0.04) 28px)',
                    }}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.3 }}
                >
                    {/* Washi tape strip at top center */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(-1.5deg)',
                            width: '46px',
                            height: '15px',
                            background: 'rgba(215, 204, 185, 0.85)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            zIndex: 10,
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Tiny Handwritten Label Above Card */}
                    <div className="mb-2 flex items-center gap-1.5 select-none">
                        <span style={{ color: 'var(--sk-red)', fontSize: '0.9rem' }}>✦</span>
                        <span
                            style={{
                                fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                fontSize: '1.25rem',
                                color: 'var(--sk-red)',
                                fontWeight: 700,
                            }}
                        >
                            {paragraphs.drawsMe.label}
                        </span>
                    </div>

                    {/* Paragraph 2 Text with Highlights — no stray spaces */}
                    <p
                        style={{
                            fontFamily: "'EB Garamond', serif",
                            fontSize: 'clamp(1.1rem, 1.8vw, 1.2rem)',
                            lineHeight: 1.9,
                            color: 'var(--sk-ink)',
                            letterSpacing: '0.01em',
                        }}
                    >
                        I am profoundly drawn to capturing <MarkerHighlight inView={inView} delay={0.5}>{paragraphs.drawsMe.highlights[0]}</MarkerHighlight>, focusing particularly on nuanced gestures and the expressive depth found within <MarkerHighlight inView={inView} delay={0.65}>{paragraphs.drawsMe.highlights[1]}</MarkerHighlight>.
                    </p>
                </MotionDiv>

                {/* Note Card 2: Where I Am Now */}
                <MotionDiv
                    className="relative p-6 sm:p-7 rounded-[2px] transition-transform duration-300 flex flex-col justify-start"
                    style={{
                        background: '#faf6ee',
                        border: '1px solid rgba(121, 1, 13, 0.09)',
                        boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.06)',
                        transform: 'rotate(1.2deg)',
                        backgroundImage:
                            'repeating-linear-gradient(transparent, transparent 27px, rgba(121, 1, 13, 0.04) 27px, rgba(121, 1, 13, 0.04) 28px)',
                    }}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.45 }}
                >
                    {/* Washi tape strip at top center */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(2deg)',
                            width: '46px',
                            height: '15px',
                            background: 'rgba(215, 204, 185, 0.85)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            zIndex: 10,
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Tiny Handwritten Label Above Card */}
                    <div className="mb-2 flex items-center gap-1.5 select-none">
                        <span style={{ color: 'var(--sk-red)', fontSize: '0.9rem' }}>✦</span>
                        <span
                            style={{
                                fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                fontSize: '1.25rem',
                                color: 'var(--sk-red)',
                                fontWeight: 700,
                            }}
                        >
                            {paragraphs.whereIAm.label}
                        </span>
                    </div>

                    {/* Paragraph 3 Text with Highlights — em dash replaced with comma, no stray spaces */}
                    <p
                        style={{
                            fontFamily: "'EB Garamond', serif",
                            fontSize: 'clamp(1.1rem, 1.8vw, 1.2rem)',
                            lineHeight: 1.9,
                            color: 'var(--sk-ink)',
                            letterSpacing: '0.01em',
                        }}
                    >
                        For me, art is an <MarkerHighlight inView={inView} delay={0.6}>{paragraphs.whereIAm.highlights[0]}</MarkerHighlight>, a commitment to continuous learning without the fear of failure. Currently, my primary focus lies in cultivating my skills within the realm of <MarkerHighlight inView={inView} delay={0.75}>{paragraphs.whereIAm.highlights[1]}</MarkerHighlight>.
                    </p>
                </MotionDiv>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* BOTTOM STRIP: Thin Handwritten Strip        */}
            {/* ═══════════════════════════════════════════ */}
            <div className="mt-14 flex justify-center">
                <div
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-sm select-none"
                    style={{
                        background: 'rgba(232, 226, 212, 0.75)',
                        border: '1px dashed rgba(121, 1, 13, 0.2)',
                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                        fontSize: '1.25rem',
                        color: 'var(--sk-ink-mid)',
                        transform: 'rotate(-0.5deg)',
                        boxShadow: '1px 2px 6px rgba(0,0,0,0.03)',
                    }}
                >
                    <span style={{ color: 'var(--sk-red)' }}>✦</span>
                    <span>{strip}</span>
                    <span style={{ color: 'var(--sk-red)' }}>✦</span>
                </div>
            </div>
        </section>
    );
}
