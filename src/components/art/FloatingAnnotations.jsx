import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const annotations = [
    { text: 'iPad + IbisPaintX', top: '35%', left: '3%', rotate: -1, color: 'var(--sk-red)', font: '0.95rem' },
    { text: 'graphite is forever', top: '55%', left: '42%', rotate: 2, color: 'var(--sk-ink-mid)', font: '1rem' },
    { text: 'eyes are everything', top: '70%', left: '6%', rotate: -1.5, color: 'var(--sk-red)', font: '1.05rem' },
    { text: 'ongoing experiment', top: '40%', left: '5%', rotate: -1, color: 'var(--sk-red)', font: '1rem' }
];

export default function FloatingAnnotations({ isShaking }) {
    const containerRef = useRef(null);
    const refs = useRef([]);

    // Normal gentle float — always running
    useEffect(() => {
        refs.current.forEach((el, i) => {
            if (!el) return;

            // Continuous floating
            gsap.to(el, {
                y: '-=10',
                duration: 4 + i * 0.7,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.4,
            });
        });
    }, []);

    // Shake chaos — triggers when isShaking becomes true
    useEffect(() => {
        if (!isShaking) return;

        const notes = refs.current.filter(Boolean);
        if (notes.length === 0) return;

        // Kill existing gentle float animations
        gsap.killTweensOf(notes);

        // Scatter chaotically
        notes.forEach((note) => {
            gsap.to(note, {
                x: (Math.random() - 0.5) * 120,
                y: (Math.random() - 0.5) * 120,
                rotation: (Math.random() - 0.5) * 60,
                duration: 0.3,
                ease: 'power3.out',
            });
        });

        // After 3s, snap back to original positions and resume gentle float
        const resetTimer = setTimeout(() => {
            notes.forEach((note, i) => {
                const baseRotation = parseFloat(note.dataset.baseRotation) || 0;
                gsap.to(note, {
                    x: 0,
                    y: 0,
                    rotation: baseRotation,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)',
                    onComplete: () => {
                        // Resume normal gentle float after snap-back
                        gsap.to(note, {
                            y: '-=10',
                            duration: 4 + i * 0.7,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut',
                        });
                    },
                });
            });
        }, 3000);

        return () => clearTimeout(resetTimer);
    }, [isShaking]);

    return (
        <div ref={containerRef} className="hidden md:block" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {annotations.map((ann, i) => (
                <span
                    key={i}
                    ref={el => refs.current[i] = el}
                    className="fixed pointer-events-none select-none annotation"
                    data-base-rotation={ann.rotate}
                    style={{
                        top: ann.top,
                        left: ann.left,
                        fontFamily: "'Caveat', cursive",
                        fontSize: ann.font,
                        color: ann.color,
                        transform: `rotate(${ann.rotate}deg)`,
                        zIndex: 20,
                        textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    }}
                >
                    {ann.text}
                </span>
            ))}
        </div>
    );
}
