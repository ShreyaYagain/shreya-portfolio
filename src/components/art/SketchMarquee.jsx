import { sketches } from '../../data/artData';

function SketchCard({ sketch, rotation }) {
    return (
        <div
            className="sketch-card tape-strip mx-3 flex-shrink-0 inline-block"
            style={{
                transform: `rotate(${rotation}deg)`,
                width: '200px',
                verticalAlign: 'top',
            }}
        >
            <div
                style={{
                    width: '188px',
                    height: '188px',
                    background: `linear-gradient(135deg, var(--sk-paper) 0%, var(--sk-paper-dark) 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={sketch.src}
                    alt={sketch.alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
              <span style="font-family: 'Caveat', cursive; color: var(--sk-ink-mid); opacity: 0.4; font-size: 0.9rem; text-align: center; padding: 1rem;">
                ${sketch.alt}
              </span>
            `;
                    }}
                />
            </div>
        </div>
    );
}

function TornPaperDivider() {
    return (
        <svg viewBox="0 0 1200 30" className="w-full my-4" preserveAspectRatio="none" style={{ height: '20px' }}>
            <path
                d="M0 15 Q30 5 60 15 Q90 25 120 15 Q150 5 180 15 Q210 25 240 15 Q270 5 300 15 Q330 25 360 15 Q390 5 420 15 Q450 25 480 15 Q510 5 540 15 Q570 25 600 15 Q630 5 660 15 Q690 25 720 15 Q750 5 780 15 Q810 25 840 15 Q870 5 900 15 Q930 25 960 15 Q990 5 1020 15 Q1050 25 1080 15 Q1110 5 1140 15 Q1170 25 1200 15"
                fill="none"
                stroke="var(--sk-paper-dark)"
                strokeWidth="2"
            />
        </svg>
    );
}

export default function SketchMarquee() {
    const rotations = [-2, 1.5, -1, 2, -1.5, 1];

    // Double the items for seamless looping
    const row1Items = [...sketches, ...sketches];
    const row2Items = [...[...sketches].reverse(), ...[...sketches].reverse()];

    return (
        <section className="scrapbook-section py-16 overflow-hidden">
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
                }
                .marquee-left {
                    animation: marqueeLeft 30s linear infinite;
                }
                .marquee-right {
                    animation: marqueeRight 30s linear infinite;
                }
                .marquee-container:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="max-w-4xl mx-auto px-4 mb-10">
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    color: 'var(--sk-ink)',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                }}>
                    my work
                </h2>
                <p style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: 'var(--sk-ink-mid)',
                    lineHeight: 1.6,
                }}>
                    A curated, growing selection of studies and emotional explorations from my sketchbook.
                </p>
            </div>

            {/* Row 1 — left direction */}
            <div className="relative w-full overflow-hidden py-4">
                <div className="marquee-container marquee-left">
                    {row1Items.map((sketch, i) => (
                        <SketchCard key={`r1-${sketch.id}-${i}`} sketch={sketch} rotation={rotations[i % rotations.length]} />
                    ))}
                </div>
            </div>

            <TornPaperDivider />

            {/* Row 2 — right direction */}
            <div className="relative w-full overflow-hidden py-4">
                <div className="marquee-container marquee-right">
                    {row2Items.map((sketch, i) => (
                        <SketchCard key={`r2-${sketch.id}-${i}`} sketch={sketch} rotation={rotations[(i + 3) % rotations.length]} />
                    ))}
                </div>
            </div>
        </section>
    );
}
