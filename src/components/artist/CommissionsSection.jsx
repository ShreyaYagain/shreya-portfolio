import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { commissionsData } from '../../data/commissions';
import SectionHeader from './SectionHeader';

const MotionDiv = motion.div;
const MotionA = motion.a;

export default function CommissionsSection() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const prefersReducedMotion = useReducedMotion();

    const {
        availability,
        whatIMake,
        delivery,
        steps,
        pricingNote,
        needFromYou,
        email,
        instagramUrl,
    } = commissionsData || {};

    const emailSubject = 'Lyric video commission';
    const emailBody = [
        "Hi Shreya, I'd like to commission a lyric video.",
        '',
        'Name of the song:',
        'Spotify or YouTube link:',
        'Timestamps (the part of the song for the video):',
        'Mood of the song:',
        'Who it is for / occasion:',
        'Where it will be used:',
        'Any other requirements:',
    ].join('\n');

    const mailtoUrl = email
        ? `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
        : '#contact';

    return (
        <section
            id="commissions"
            ref={ref}
            className="scrapbook-section max-w-5xl mx-auto py-16 md:py-24 px-4 overflow-x-hidden relative"
        >
            {/* Header + Availability Sticky Note Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10 relative">
                <SectionHeader title="commissions" className="mb-0" />

                {/* AVAILABILITY: Taped sticky note with hand-drawn circle around 'open' */}
                {availability && (
                    <MotionDiv
                        className="relative self-start sm:self-auto px-5 py-3 rounded-[2px] select-none"
                        style={{
                            background: '#faf6ee',
                            border: '1px solid rgba(121, 1, 13, 0.12)',
                            boxShadow: '2px 4px 14px rgba(0, 0, 0, 0.05)',
                            transform: 'rotate(2.5deg)',
                        }}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        {/* Washi tape at top */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-6px',
                                left: '50%',
                                transform: 'translateX(-50%) rotate(-1deg)',
                                width: '38px',
                                height: '12px',
                                background: 'var(--sk-tape)',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                                pointerEvents: 'none',
                            }}
                            aria-hidden="true"
                        />
                        <div className="text-center">
                            <span
                                style={{
                                    fontFamily: "'Caveat', cursive, sans-serif",
                                    fontSize: '1.05rem',
                                    color: 'var(--sk-ink-mid)',
                                    display: 'block',
                                    lineHeight: 1.1,
                                }}
                            >
                                availability
                            </span>
                            <div className="relative inline-block mt-0.5 px-2 py-0.5">
                                <span
                                    style={{
                                        fontFamily: "'Caveat', cursive, sans-serif",
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        color: 'var(--sk-red)',
                                        display: 'inline-block',
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {availability}
                                </span>
                                {/* Hand-drawn loop circle around 'open' */}
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                                    viewBox="0 0 60 30"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        d="M 5 15 C 5 6, 25 3, 52 7 C 58 10, 58 22, 48 26 C 25 30, 2 24, 7 13"
                                        stroke="var(--sk-red)"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                                        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                                        transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
                                    />
                                </svg>
                            </div>
                        </div>
                    </MotionDiv>
                )}
            </div>

            {/* TWO SMALL TAPED CARDS: 'what i make' & 'delivery' */}
            {(whatIMake || delivery) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14 items-stretch">
                    {/* Card 1: What I Make */}
                    {whatIMake && (
                        <MotionDiv
                            className="relative p-5 sm:p-6 rounded-[2px] flex flex-col justify-start select-none"
                            style={{
                                background: '#faf6ee',
                                border: '1px solid rgba(121, 1, 13, 0.09)',
                                boxShadow: '2px 4px 14px rgba(0, 0, 0, 0.05)',
                                transform: 'rotate(-1deg)',
                            }}
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {/* Tape strip */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-7px',
                                    left: '20px',
                                    width: '42px',
                                    height: '13px',
                                    background: 'var(--sk-tape)',
                                    transform: 'rotate(-2deg)',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                                    pointerEvents: 'none',
                                }}
                                aria-hidden="true"
                            />
                            <div className="flex items-center gap-2 mb-2">
                                {/* Film / play doodle */}
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="var(--sk-red)"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect x="3" y="4" width="18" height="16" rx="2" />
                                    <path d="M 8 4 L 8 20" strokeDasharray="2 2" />
                                    <path d="M 16 4 L 16 20" strokeDasharray="2 2" />
                                    <polygon points="11 10 14 12 11 14 11 10" fill="var(--sk-red)" />
                                </svg>
                                <h3
                                    style={{
                                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                        fontSize: '1.35rem',
                                        fontWeight: 700,
                                        color: 'var(--sk-red)',
                                        margin: 0,
                                    }}
                                >
                                    what i make
                                </h3>
                            </div>
                            <p
                                style={{
                                    fontFamily: "'EB Garamond', serif",
                                    fontStyle: 'italic',
                                    fontSize: '1.15rem',
                                    lineHeight: 1.6,
                                    color: 'var(--sk-ink)',
                                    margin: 0,
                                }}
                            >
                                {whatIMake}
                            </p>
                        </MotionDiv>
                    )}

                    {/* Card 2: Delivery */}
                    {delivery && (
                        <MotionDiv
                            className="relative p-5 sm:p-6 rounded-[2px] flex flex-col justify-start select-none"
                            style={{
                                background: '#faf6ee',
                                border: '1px solid rgba(121, 1, 13, 0.09)',
                                boxShadow: '2px 4px 14px rgba(0, 0, 0, 0.05)',
                                transform: 'rotate(1.2deg)',
                            }}
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.28 }}
                        >
                            {/* Tape strip */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-7px',
                                    right: '20px',
                                    width: '42px',
                                    height: '13px',
                                    background: 'var(--sk-tape)',
                                    transform: 'rotate(2deg)',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                                    pointerEvents: 'none',
                                }}
                                aria-hidden="true"
                            />
                            <div className="flex items-center gap-2 mb-2">
                                {/* Package / Screen doodle */}
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="var(--sk-red)"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect x="2" y="4" width="20" height="15" rx="2" />
                                    <path d="M 8 21 L 16 21" />
                                    <path d="M 12 19 L 12 21" />
                                    <circle cx="12" cy="11.5" r="2.5" fill="var(--sk-red)" />
                                </svg>
                                <h3
                                    style={{
                                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                        fontSize: '1.35rem',
                                        fontWeight: 700,
                                        color: 'var(--sk-red)',
                                        margin: 0,
                                    }}
                                >
                                    delivery
                                </h3>
                            </div>
                            <p
                                style={{
                                    fontFamily: "'EB Garamond', serif",
                                    fontStyle: 'italic',
                                    fontSize: '1.15rem',
                                    lineHeight: 1.6,
                                    color: 'var(--sk-ink)',
                                    margin: 0,
                                }}
                            >
                                {delivery}
                            </p>
                        </MotionDiv>
                    )}
                </div>
            )}

            {/* 'HOW IT WORKS': Winding path / dotted line with numbered doodle circles */}
            {steps && steps.length > 0 && (
                <MotionDiv
                    className="mb-16 select-none"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.35 }}
                >
                    {/* Section Label */}
                    <div className="flex items-center gap-2 mb-8">
                        <span style={{ color: 'var(--sk-red)', fontSize: '1.1rem' }}>✦</span>
                        <h3
                            style={{
                                fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: 'var(--sk-ink)',
                                margin: 0,
                            }}
                        >
                            how it works
                        </h3>
                        <svg width="40" height="12" viewBox="0 0 50 14" fill="none" className="text-red-800">
                            <path d="M 2 7 Q 14 1, 26 7 T 48 7" stroke="var(--sk-red)" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Desktop: Horizontal Winding Progression */}
                    <div className="hidden md:block relative pt-4 pb-2">
                        {/* Winding animated connecting path */}
                        <svg
                            className="absolute top-[32px] left-[5%] right-[5%] w-[90%] h-[36px] pointer-events-none -z-0 overflow-visible"
                            viewBox="0 0 800 40"
                            fill="none"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <motion.path
                                d="M 10 20 Q 100 5, 200 20 T 400 20 T 600 20 T 790 20"
                                stroke="var(--sk-red)"
                                strokeWidth="2.2"
                                strokeDasharray="5 6"
                                strokeLinecap="round"
                                initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{
                                    duration: prefersReducedMotion ? 0 : 1.3,
                                    delay: 0.45,
                                    ease: 'easeInOut',
                                }}
                            />
                        </svg>

                        <div className="grid grid-cols-5 gap-3 items-start relative z-10">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center px-1">
                                    {/* Numbered Doodle Circle */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-[#faf6ee] transition-transform duration-200 hover:scale-110"
                                        style={{
                                            border: '2px solid var(--sk-red)',
                                            boxShadow: '0 2px 8px rgba(121, 1, 13, 0.12)',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "'Caveat', cursive, sans-serif",
                                                fontSize: '1.3rem',
                                                fontWeight: 700,
                                                color: 'var(--sk-red)',
                                                lineHeight: 1,
                                            }}
                                        >
                                            {idx + 1}
                                        </span>
                                    </div>
                                    {/* Step Description */}
                                    <p
                                        style={{
                                            fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                            fontSize: '1.15rem',
                                            lineHeight: 1.3,
                                            color: 'var(--sk-ink)',
                                            margin: 0,
                                        }}
                                    >
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile: Vertical Timeline (No horizontal scroll, 16px safe) */}
                    <div className="md:hidden relative pl-6 space-y-6">
                        {/* Vertical dotted connecting line */}
                        <div
                            className="absolute top-3 bottom-3 left-[19px] w-[2px] pointer-events-none"
                            style={{
                                borderLeft: '2px dashed rgba(121, 1, 13, 0.4)',
                            }}
                            aria-hidden="true"
                        />

                        {steps.map((step, idx) => (
                            <div key={idx} className="relative flex items-start gap-4">
                                {/* Numbered Doodle Circle */}
                                <div
                                    className="relative z-10 w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-[#faf6ee]"
                                    style={{
                                        border: '2px solid var(--sk-red)',
                                        boxShadow: '0 2px 6px rgba(121, 1, 13, 0.12)',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "'Caveat', cursive, sans-serif",
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: 'var(--sk-red)',
                                            lineHeight: 1,
                                        }}
                                    >
                                        {idx + 1}
                                    </span>
                                </div>
                                {/* Step Text */}
                                <p
                                    className="pt-1"
                                    style={{
                                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                        fontSize: '1.2rem',
                                        lineHeight: 1.35,
                                        color: 'var(--sk-ink)',
                                        margin: 0,
                                    }}
                                >
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </MotionDiv>
            )}

            {/* TWO-COLUMN NOTE GRID: 'what i need from you' & 'pricing' */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                {/* 'WHAT I NEED FROM YOU' CHECKLIST CARD (7 cols on lg) */}
                {needFromYou && needFromYou.length > 0 && (
                    <MotionDiv
                        className="lg:col-span-7 relative p-6 sm:p-7 rounded-[2px] select-none"
                        style={{
                            background: '#faf6ee',
                            border: '1px solid rgba(121, 1, 13, 0.1)',
                            boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.06)',
                            transform: 'rotate(-0.8deg)',
                            backgroundImage:
                                'repeating-linear-gradient(transparent, transparent 27px, rgba(121, 1, 13, 0.04) 27px, rgba(121, 1, 13, 0.04) 28px)',
                        }}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.4 }}
                    >
                        {/* Washi tape strip at top center */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-7px',
                                left: '50%',
                                transform: 'translateX(-50%) rotate(1deg)',
                                width: '48px',
                                height: '14px',
                                background: 'var(--sk-tape)',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                                pointerEvents: 'none',
                            }}
                            aria-hidden="true"
                        />

                        {/* Heading */}
                        <div className="flex items-center gap-2 mb-4">
                            <span style={{ color: 'var(--sk-red)', fontSize: '1rem' }}>✦</span>
                            <h3
                                style={{
                                    fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                    fontSize: '1.45rem',
                                    fontWeight: 700,
                                    color: 'var(--sk-red)',
                                    margin: 0,
                                }}
                            >
                                what i need from you
                            </h3>
                        </div>

                        {/* Checklist items */}
                        <ul className="space-y-2.5 pl-0 list-none m-0">
                            {needFromYou.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                    {/* Hand-drawn checkbox bullet with star/checkmark */}
                                    <span
                                        className="flex-shrink-0 mt-1 flex items-center justify-center"
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '1.5px solid var(--sk-red)',
                                            borderRadius: '2px',
                                            color: 'var(--sk-red)',
                                            fontSize: '0.75rem',
                                            lineHeight: 1,
                                            fontWeight: 700,
                                        }}
                                        aria-hidden="true"
                                    >
                                        ✓
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                            fontSize: '1.25rem',
                                            lineHeight: 1.35,
                                            color: 'var(--sk-ink)',
                                        }}
                                    >
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </MotionDiv>
                )}

                {/* 'PRICING' CARD (5 cols on lg) */}
                {pricingNote && (
                    <MotionDiv
                        className="lg:col-span-5 relative p-6 sm:p-7 rounded-[2px] flex flex-col justify-start select-none"
                        style={{
                            background: '#faf6ee',
                            border: '1px solid rgba(121, 1, 13, 0.1)',
                            boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.06)',
                            transform: 'rotate(1.2deg)',
                        }}
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.48 }}
                    >
                        {/* Washi tape strip at top right */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-7px',
                                right: '28px',
                                width: '44px',
                                height: '14px',
                                background: 'var(--sk-tape)',
                                transform: 'rotate(-1.5deg)',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                                pointerEvents: 'none',
                            }}
                            aria-hidden="true"
                        />

                        {/* Heading */}
                        <div className="flex items-center gap-2 mb-3">
                            <span style={{ color: 'var(--sk-red)', fontSize: '1rem' }}>✦</span>
                            <h3
                                style={{
                                    fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                    fontSize: '1.45rem',
                                    fontWeight: 700,
                                    color: 'var(--sk-red)',
                                    margin: 0,
                                }}
                            >
                                pricing
                            </h3>
                        </div>

                        {/* Note text */}
                        <p
                            style={{
                                fontFamily: "'EB Garamond', serif",
                                fontStyle: 'italic',
                                fontSize: '1.15rem',
                                lineHeight: 1.7,
                                color: 'var(--sk-ink)',
                                margin: 0,
                            }}
                        >
                            {pricingNote}
                        </p>

                        {/* Handwritten footer note */}
                        <div className="mt-4 pt-3 border-t border-[rgba(121,1,13,0.08)] flex items-center gap-2">
                            <span
                                style={{
                                    fontFamily: "'Caveat', cursive, sans-serif",
                                    fontSize: '1.15rem',
                                    color: 'var(--sk-ink-mid)',
                                }}
                            >
                                ✦ clear quote upfront before any advance
                            </span>
                        </div>
                    </MotionDiv>
                )}
            </div>

            {/* ACTION BUTTONS: 'start a commission' & 'or message me on instagram' */}
            <MotionDiv
                className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-4 select-none"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
            >
                {/* Primary Taped Paper Tag Button: 'start a commission' */}
                <MotionA
                    href={mailtoUrl}
                    className="relative px-7 py-3.5 rounded-[2px] cursor-pointer inline-flex items-center gap-2"
                    style={{
                        background: '#faf6ee',
                        border: '1.5px solid var(--sk-red)',
                        boxShadow: '0 3px 10px rgba(121, 1, 13, 0.1)',
                        transform: 'rotate(-1.2deg)',
                        textDecoration: 'none',
                    }}
                    whileHover={
                        prefersReducedMotion
                            ? {}
                            : {
                                  y: -3,
                                  scale: 1.03,
                                  boxShadow: '0 8px 20px rgba(121, 1, 13, 0.18)',
                                  transition: { duration: 0.2 },
                              }
                    }
                >
                    {/* Washi tape on top edge */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-7px',
                            left: '50%',
                            transform: 'translateX(-50%) rotate(1deg)',
                            width: '42px',
                            height: '13px',
                            background: 'var(--sk-tape)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                            pointerEvents: 'none',
                        }}
                        aria-hidden="true"
                    />
                    <span
                        style={{
                            fontFamily: "'Caveat', cursive, sans-serif",
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--sk-ink)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <span>start a commission</span>
                        <span style={{ color: 'var(--sk-red)', fontSize: '1.25rem' }}>✉</span>
                    </span>
                </MotionA>

                {/* Secondary Link: 'or message me on instagram' */}
                {instagramUrl && (
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="red-underline inline-flex items-center gap-1.5 cursor-pointer"
                        style={{
                            fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                            fontSize: '1.35rem',
                            color: 'var(--sk-ink-mid)',
                            textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sk-red)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--sk-ink-mid)')}
                    >
                        <span>or message me on instagram</span>
                        <span style={{ color: 'var(--sk-red)', fontSize: '1.15rem' }}>↗</span>
                    </a>
                )}
            </MotionDiv>
        </section>
    );
}
