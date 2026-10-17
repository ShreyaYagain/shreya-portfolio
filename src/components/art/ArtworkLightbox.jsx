import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

export default function ArtworkLightbox({ artworks, currentIndex, isOpen, onClose, onNavigate }) {
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const currentArtwork = artworks[currentIndex];

    const handlePrev = useCallback(() => {
        if (!artworks || artworks.length === 0) return;
        onNavigate((currentIndex - 1 + artworks.length) % artworks.length);
    }, [artworks, currentIndex, onNavigate]);

    const handleNext = useCallback(() => {
        if (!artworks || artworks.length === 0) return;
        onNavigate((currentIndex + 1) % artworks.length);
    }, [artworks, currentIndex, onNavigate]);

    // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, handlePrev, handleNext]);

    // Lock body scroll while open
    useEffect(() => {
        if (!isOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    // Touch swipe handling
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const deltaX = touchStartX.current - touchEndX.current;
        const threshold = 45;
        if (deltaX > threshold) {
            handleNext();
        } else if (deltaX < -threshold) {
            handlePrev();
        }
    };

    if (!isOpen || !currentArtwork) {
        return null;
    }

    const lightboxContent = (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${currentArtwork.title}, ${currentArtwork.medium}`}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm transition-all duration-300 artist-theme artist-cursor"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Top Close Button */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-[#f2ede3] text-[#1a1208] hover:bg-[#79010d] hover:text-[#f2ede3] transition-colors shadow-lg cursor-pointer"
                style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '1.25rem',
                }}
            >
                ✕
            </button>

            {/* Left Nav Arrow */}
            <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous artwork"
                className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-[#f2ede3]/90 text-[#1a1208] hover:bg-[#79010d] hover:text-[#f2ede3] transition-all shadow-md cursor-pointer hover:scale-105"
                style={{
                    fontSize: '1.5rem',
                    lineHeight: 1,
                }}
            >
                ‹
            </button>

            {/* Right Nav Arrow */}
            <button
                type="button"
                onClick={handleNext}
                aria-label="Next artwork"
                className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center rounded-full bg-[#f2ede3]/90 text-[#1a1208] hover:bg-[#79010d] hover:text-[#f2ede3] transition-all shadow-md cursor-pointer hover:scale-105"
                style={{
                    fontSize: '1.5rem',
                    lineHeight: 1,
                }}
            >
                ›
            </button>

            {/* Polaroid Modal Card */}
            <div
                className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center bg-[#faf7f2] p-4 sm:p-6 rounded shadow-2xl overflow-hidden border border-[#e8e2d4]"
                style={{
                    transform: 'rotate(-0.5deg)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Red Tape Corner */}
                <div
                    className="absolute -top-2 left-6 w-14 h-4 z-10 pointer-events-none"
                    style={{
                        background: 'rgba(121, 1, 13, 0.75)',
                        transform: 'rotate(-3deg)',
                    }}
                />

                {/* Main Artwork Image */}
                <div className="w-full flex items-center justify-center overflow-hidden bg-[#e8e2d4]/50 rounded-sm p-1">
                    <img
                        key={currentArtwork.id}
                        src={currentArtwork.src}
                        alt={currentArtwork.alt}
                        decoding="async"
                        className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain mx-auto transition-opacity duration-200"
                        style={{
                            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                        }}
                    />
                </div>

                {/* Caption Footer */}
                <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-center sm:text-left">
                    <div className="flex flex-col">
                        <h3
                            style={{
                                fontFamily: "'Cormorant Garamond', 'EB Garamond', serif",
                                fontStyle: 'italic',
                                fontSize: 'clamp(1.3rem, 2.8vw, 1.75rem)',
                                color: '#1a1208',
                                lineHeight: 1.2,
                                fontWeight: 700,
                            }}
                        >
                            {currentArtwork.title}
                        </h3>
                        <p
                            style={{
                                fontFamily: "'Caveat', cursive, 'EB Garamond', serif, sans-serif",
                                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                                color: '#79010d',
                                lineHeight: 1.2,
                            }}
                        >
                            {currentArtwork.medium}
                        </p>
                    </div>

                    <div
                        className="flex-shrink-0 text-xs px-2.5 py-1 rounded bg-[#e8e2d4] text-[#4a3f2f]"
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            letterSpacing: '0.05em',
                        }}
                    >
                        {String(currentIndex + 1).padStart(2, '0')} / {String(artworks.length).padStart(2, '0')}
                    </div>
                </div>
            </div>
        </div>
    );

    return typeof document !== 'undefined' ? createPortal(lightboxContent, document.body) : lightboxContent;
}

