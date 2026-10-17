import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { lyricVideos } from '../../data/lyricVideos';
import SectionHeader from './SectionHeader';

function HandDrawnPlayButton() {
    return (
        <div
            className="transition-transform duration-300 group-hover:scale-110 flex items-center justify-center shadow-lg"
            style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(247, 244, 237, 0.92)',
                border: '2px solid var(--sk-red)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            }}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginLeft: '3px' }}
            >
                <path
                    d="M6 4.5 L20 12 L6 19.5 Z"
                    fill="var(--sk-red)"
                    stroke="var(--sk-red)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

function LyricVideoCard({ video, index, onOpen }) {
    const defaultThumb = video.thumbnail || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
    const [thumbSrc, setThumbSrc] = useState(defaultThumb);
    const [fallbackStep, setFallbackStep] = useState(0);

    const handleImgError = () => {
        if (fallbackStep === 0) {
            // First fallback to YouTube hqdefault (native 4:3)
            setFallbackStep(1);
            setThumbSrc(`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`);
        } else if (fallbackStep === 1) {
            // Second fallback to YouTube maxresdefault
            setFallbackStep(2);
            setThumbSrc(`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`);
        }
    };

    const rotations = [-1.5, 1, -1.2];
    const rotation = rotations[index % rotations.length];

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`Watch ${video.title}`}
            onClick={onOpen}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpen();
                }
            }}
            className="group relative cursor-pointer text-left transition-all duration-300 h-full flex flex-col justify-start"
            style={{
                background: '#ffffff',
                padding: '10px 10px 16px 10px',
                borderRadius: '2px',
                boxShadow: '2px 4px 14px rgba(0,0,0,0.08)',
                transform: `rotate(${rotation}deg)`,
                border: '1px solid rgba(0,0,0,0.04)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02) rotate(0deg)';
                e.currentTarget.style.boxShadow = '4px 8px 24px rgba(0,0,0,0.12)';
                e.currentTarget.style.zIndex = '10';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${rotation}deg)`;
                e.currentTarget.style.boxShadow = '2px 4px 14px rgba(0,0,0,0.08)';
                e.currentTarget.style.zIndex = '1';
            }}
        >
            {/* Washi tape strip on top corner */}
            <div
                style={{
                    position: 'absolute',
                    top: '-7px',
                    left: index % 2 === 0 ? '18px' : 'auto',
                    right: index % 2 === 0 ? 'auto' : '18px',
                    width: '42px',
                    height: '14px',
                    background: 'rgba(215, 204, 185, 0.75)',
                    transform: index % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    zIndex: 10,
                    pointerEvents: 'none',
                }}
            />

            {/* Thumbnail Box — container aspect-ratio 4/3 with object-fit: cover cropping pillarbox bars */}
            <div
                className="relative w-full overflow-hidden rounded-[2px] bg-neutral-900"
                style={{
                    aspectRatio: video.aspectRatio || '4/3',
                }}
            >
                <img
                    src={thumbSrc}
                    alt={`Thumbnail for ${video.title}`}
                    loading="lazy"
                    decoding="async"
                    onError={handleImgError}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />

                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 pointer-events-none" />

                {/* Hand-drawn Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <HandDrawnPlayButton />
                </div>
            </div>

            {/* Caption Strip — top-aligned with fixed min-height fitting 2 lines */}
            <div
                className="mt-3.5 px-1 text-center select-none flex flex-col justify-start"
                style={{
                    minHeight: '3.6rem',
                    overflow: 'visible',
                }}
            >
                <h3
                    style={{
                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: 'var(--sk-ink)',
                        lineHeight: 1.25,
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        margin: 0,
                    }}
                >
                    {video.title}
                </h3>
                {video.caption && (
                    <p
                        className="mt-1"
                        style={{
                            fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                            fontSize: '1.15rem',
                            color: 'var(--sk-red)',
                            lineHeight: 1.25,
                            wordBreak: 'break-word',
                        }}
                    >
                        {video.caption}
                    </p>
                )}
                {video.song && (
                    <p
                        className="mt-0.5"
                        style={{
                            fontFamily: "'EB Garamond', serif",
                            fontStyle: 'italic',
                            fontSize: '0.95rem',
                            color: 'var(--sk-ink-mid)',
                        }}
                    >
                        {video.song}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function LyricVideosSection() {
    const [activeVideo, setActiveVideo] = useState(null);
    const [activeDot, setActiveDot] = useState(0);
    const scrollContainerRef = useRef(null);
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    // Track scroll position in mobile snap row to update active dot
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, clientWidth } = scrollContainerRef.current;
        if (clientWidth === 0) return;
        const index = Math.round(scrollLeft / (clientWidth * 0.78));
        setActiveDot(Math.min(Math.max(index, 0), lyricVideos.length - 1));
    };

    const scrollToCard = (index) => {
        if (!scrollContainerRef.current) return;
        const cardWidth = scrollContainerRef.current.clientWidth * 0.78;
        scrollContainerRef.current.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth',
        });
    };

    // Modal keyboard handling (Escape to close, Focus trapping), Marquee pause & Scroll lock
    useEffect(() => {
        if (!activeVideo) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');

        // Focus close button on open
        if (closeButtonRef.current) {
            closeButtonRef.current.focus();
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveVideo(null);
                return;
            }

            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = [
                    closeButtonRef.current,
                    modalRef.current.querySelector('iframe'),
                ].filter(Boolean);

                if (focusableElements.length === 0) return;
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.classList.remove('modal-open');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeVideo]);


    return (
        <section id="lyric-videos" className="scrapbook-section max-w-5xl mx-auto py-16 md:py-20 px-4">
            <SectionHeader
                title="lyric videos & animation"
                subtitle="hand-drawn frame-by-frame sequences synced to sound."
            />

            {/* Handwritten intro line above */}
            <p
                className="mb-8 text-left"
                style={{
                    fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                    fontSize: '1.35rem',
                    color: 'var(--sk-red)',
                    transform: 'rotate(-0.5deg)',
                }}
            >
                ✦ digital lyric videos, made to order
            </p>

            {/* Desktop: 3 videos side by side in one row */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {lyricVideos.map((video, idx) => (
                    <LyricVideoCard
                        key={video.id}
                        video={video}
                        index={idx}
                        onOpen={() => setActiveVideo(video)}
                    />
                ))}
            </div>

            {/* Tablet & Mobile: Horizontal scroll-snap row with peeking next card */}
            <div className="md:hidden">
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 px-2 -mx-2"
                    style={{
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                    }}
                >
                    {lyricVideos.map((video, idx) => (
                        <div
                            key={video.id}
                            className="snap-center flex-shrink-0 w-[80vw] sm:w-[62vw]"
                        >
                            <LyricVideoCard
                                video={video}
                                index={idx}
                                onOpen={() => setActiveVideo(video)}
                            />
                        </div>
                    ))}
                </div>

                {/* Dot indicators */}
                <div
                    className="flex justify-center items-center gap-2.5 mt-3 select-none"
                    aria-label="Lyric video slide navigation"
                >
                    {lyricVideos.map((video, idx) => (
                        <button
                            key={video.id}
                            type="button"
                            onClick={() => scrollToCard(idx)}
                            aria-label={`Go to video ${idx + 1}`}
                            className="cursor-pointer p-1"
                            style={{
                                background: 'transparent',
                                border: 'none',
                            }}
                        >
                            <span
                                className="block rounded-full transition-all duration-300"
                                style={{
                                    width: activeDot === idx ? '22px' : '8px',
                                    height: '8px',
                                    backgroundColor: activeDot === idx ? 'var(--sk-red)' : 'rgba(121, 1, 13, 0.25)',
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Handwritten line linking to #commissions */}
            <div className="mt-12 text-center">
                <a
                    href="#commissions"
                    onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('commissions');
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="red-underline inline-flex items-center gap-2 select-none cursor-pointer group"
                    style={{
                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                        fontSize: '1.45rem',
                        color: 'var(--sk-ink-mid)',
                        textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sk-red)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--sk-ink-mid)')}
                >
                    <span>commissions open, see details</span>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--sk-red)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block transition-transform duration-200 group-hover:translate-y-1"
                        aria-hidden="true"
                    >
                        <path d="M12 4 L12 18" />
                        <path d="M6 13 L12 19 L18 13" />
                    </svg>
                </a>
            </div>

            {/* Modal Player Embed — Rendered via React Portal directly into document.body */}
            {activeVideo &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={activeVideo.title}
                        className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 artist-theme artist-cursor"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100dvh',
                            zIndex: 99999,
                            background: 'rgba(10, 8, 6, 0.9)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                        }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setActiveVideo(null);
                            }
                        }}
                    >
                        {/* Close button at top right of overlay */}
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={() => setActiveVideo(null)}
                            aria-label="Close video player"
                            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100000] flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xl"
                            style={{
                                width: '44px',
                                height: '44px',
                                background: '#f7f4ed',
                                border: '2px solid var(--sk-red)',
                                color: 'var(--sk-red)',
                                fontFamily: "'Caveat', cursive",
                                fontSize: '1.6rem',
                                lineHeight: 1,
                            }}
                        >
                            ✕
                        </button>

                        {/* Modal Dialog Content Container */}
                        <div
                            className="relative flex flex-col items-center w-full"
                            style={{
                                width: 'min(92vw, 900px, calc(88dvh * 4 / 3))',
                                maxWidth: '100%',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Player Container — 4:3 Aspect Ratio Sized to Fit Viewport with zero black bars */}
                            <div
                                ref={modalRef}
                                className="relative w-full flex items-center justify-center bg-black rounded-[6px] overflow-hidden"
                                style={{
                                    aspectRatio: activeVideo.aspectRatio || '4/3',
                                    maxHeight: '88dvh',
                                    boxShadow:
                                        '0 25px 65px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)',
                                }}
                            >
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                                    title={activeVideo.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 0,
                                        display: 'block',
                                    }}
                                />
                            </div>

                            {/* Caption Strip in Modal */}
                            <div className="mt-3 text-center px-4 max-w-xl select-none">
                                <h3
                                    style={{
                                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                        fontSize: '1.45rem',
                                        fontWeight: 700,
                                        color: '#f7f4ed',
                                        lineHeight: 1.2,
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {activeVideo.title}
                                </h3>
                                {activeVideo.caption && (
                                    <p
                                        className="mt-1"
                                        style={{
                                            fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                                            fontSize: '1.2rem',
                                            color: '#e5d9c5',
                                            lineHeight: 1.25,
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {activeVideo.caption}
                                    </p>
                                )}
                                {activeVideo.song && (
                                    <p
                                        className="mt-0.5"
                                        style={{
                                            fontFamily: "'EB Garamond', serif",
                                            fontStyle: 'italic',
                                            fontSize: '0.95rem',
                                            color: 'rgba(247, 244, 237, 0.7)',
                                        }}
                                    >
                                        {activeVideo.song}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </section>
    );
}
