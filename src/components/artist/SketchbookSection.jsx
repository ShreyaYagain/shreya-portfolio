import { useState } from 'react';
import { artworks } from '../../data/artworks';
import ArtworkLightbox from '../art/ArtworkLightbox';
import SectionHeader from './SectionHeader';

function SketchCard({ artwork, rotation, onOpenLightbox, isDuplicate = false }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            tabIndex={isDuplicate ? -1 : 0}
            role="button"
            aria-label={`View ${artwork.title}, ${artwork.medium}`}
            aria-hidden={isDuplicate ? 'true' : undefined}
            className="sketch-card tape-strip mx-3.5 flex-shrink-0 inline-block text-left"
            style={{
                transform: `rotate(${rotation}deg)`,
                width: '206px',
                verticalAlign: 'top',
                cursor: 'zoom-in',
                padding: '8px 8px 10px 8px',
                borderRadius: '2px',
                background: '#ffffff',
                boxShadow: '2px 4px 14px rgba(0,0,0,0.09)',
            }}
            onClick={onOpenLightbox}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenLightbox();
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
        >
            {/* Polaroid Photo Square Container */}
            <div
                style={{
                    width: '190px',
                    height: '190px',
                    background: 'linear-gradient(135deg, var(--sk-paper) 0%, var(--sk-paper-dark) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={artwork.src}
                    alt={artwork.alt}
                    width="190"
                    height="190"
                    loading="lazy"
                    decoding="async"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                            <span style="font-family: 'Caveat', cursive, 'EB Garamond', sans-serif; color: var(--sk-ink-mid); opacity: 0.6; font-size: 0.95rem; text-align: center; padding: 1rem;">
                                ${artwork.title}
                            </span>
                        `;
                    }}
                />
            </div>

            {/* Bottom Polaroid Strip with Handwritten-style Caption */}
            <div
                className="mt-2 px-1 flex flex-col justify-center items-center text-center transition-opacity duration-300 select-none"
                style={{
                    minHeight: '40px',
                    opacity: isHovered ? 1 : 0,
                }}
            >
                <div
                    style={{
                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: 'var(--sk-ink)',
                        lineHeight: 1.15,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '180px',
                    }}
                >
                    {artwork.title}
                </div>
                <div
                    style={{
                        fontFamily: "'Caveat', cursive, 'EB Garamond', sans-serif",
                        fontSize: '0.8rem',
                        color: 'var(--sk-ink-mid)',
                        lineHeight: 1.1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '180px',
                    }}
                >
                    {artwork.medium}
                </div>
            </div>
        </div>
    );
}

function TornPaperDivider() {
    return (
        <svg viewBox="0 0 1200 30" className="w-full my-6" preserveAspectRatio="none" style={{ height: '22px' }}>
            <path
                d="M0 15 Q30 5 60 15 Q90 25 120 15 Q150 5 180 15 Q210 25 240 15 Q270 5 300 15 Q330 25 360 15 Q390 5 420 15 Q450 25 480 15 Q510 5 540 15 Q570 25 600 15 Q630 5 660 15 Q690 25 720 15 Q750 5 780 15 Q810 25 840 15 Q870 5 900 15 Q930 25 960 15 Q990 5 1020 15 Q1050 25 1080 15 Q1110 5 1140 15 Q1170 25 1200 15"
                fill="none"
                stroke="var(--sk-paper-dark)"
                strokeWidth="2"
            />
        </svg>
    );
}

export default function SketchbookSection() {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const isLightboxOpen = lightboxIndex !== null;

    const rotations = [-2, 1.5, -1, 2, -1.5, 1];

    // Row 1: Pieces 01 to 11 (index 0 to 10)
    const row1Artworks = artworks.slice(0, 11);
    // Row 2: Pieces 12 to 22 (index 11 to 21)
    const row2Artworks = artworks.slice(11, 22);

    return (
        <section id="sketchbook" className="scrapbook-section py-16 md:py-20 overflow-hidden">
            <style>{`
                @keyframes marqueeLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .marquee-container {
                    white-space: nowrap;
                    will-change: transform;
                    display: inline-block;
                }
                .marquee-left {
                    animation: marqueeLeft 34s linear infinite;
                }
                .marquee-right {
                    animation: marqueeRight 34s linear infinite;
                }
                body.modal-open .marquee-container,
                body.modal-open .marquee-left,
                body.modal-open .marquee-right,
                .marquee-container:hover,
                .marquee-paused {
                    animation-play-state: paused !important;
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee-left,
                    .marquee-right {
                        animation: none !important;
                    }
                    .marquee-container {
                        overflow-x: auto !important;
                        white-space: nowrap !important;
                        display: flex !important;
                        scroll-behavior: smooth;
                        -webkit-overflow-scrolling: touch;
                        padding-bottom: 12px;
                    }
                }
            `}</style>

            <div className="max-w-4xl mx-auto px-4 mb-4">
                <SectionHeader
                    title="my work"
                    subtitle="A curated, growing selection of studies and emotional explorations from my sketchbook."
                />
            </div>

            {/* Row 1 — left direction: Pieces 01 to 11 */}
            <div className="relative w-full overflow-hidden py-4">
                <div className={`marquee-container marquee-left ${isLightboxOpen ? 'marquee-paused' : ''}`}>
                    {/* Primary set (pieces 01 to 11) */}
                    {row1Artworks.map((artwork, i) => (
                        <SketchCard
                            key={`r1-primary-${artwork.id}`}
                            artwork={artwork}
                            rotation={rotations[i % rotations.length]}
                            onOpenLightbox={() => setLightboxIndex(i)}
                        />
                    ))}

                    {/* Seamless infinite loop duplicate (marked aria-hidden) */}
                    <span aria-hidden="true" className="inline-block">
                        {row1Artworks.map((artwork, i) => (
                            <SketchCard
                                key={`r1-dup-${artwork.id}`}
                                artwork={artwork}
                                rotation={rotations[i % rotations.length]}
                                onOpenLightbox={() => setLightboxIndex(i)}
                                isDuplicate={true}
                            />
                        ))}
                    </span>
                </div>
            </div>

            <TornPaperDivider />

            {/* Row 2 — right direction: Pieces 12 to 22 */}
            <div className="relative w-full overflow-hidden py-4">
                <div className={`marquee-container marquee-right ${isLightboxOpen ? 'marquee-paused' : ''}`}>
                    {/* Primary set (pieces 12 to 22) */}
                    {row2Artworks.map((artwork, i) => (
                        <SketchCard
                            key={`r2-primary-${artwork.id}`}
                            artwork={artwork}
                            rotation={rotations[(i + 3) % rotations.length]}
                            onOpenLightbox={() => setLightboxIndex(i + 11)}
                        />
                    ))}

                    {/* Seamless infinite loop duplicate (marked aria-hidden) */}
                    <span aria-hidden="true" className="inline-block">
                        {row2Artworks.map((artwork, i) => (
                            <SketchCard
                                key={`r2-dup-${artwork.id}`}
                                artwork={artwork}
                                rotation={rotations[(i + 3) % rotations.length]}
                                onOpenLightbox={() => setLightboxIndex(i + 11)}
                                isDuplicate={true}
                            />
                        ))}
                    </span>
                </div>
            </div>

            {/* Lightbox Modal */}
            <ArtworkLightbox
                artworks={artworks}
                currentIndex={lightboxIndex ?? 0}
                isOpen={isLightboxOpen}
                onClose={() => setLightboxIndex(null)}
                onNavigate={(newIndex) => setLightboxIndex(newIndex)}
            />
        </section>
    );
}
