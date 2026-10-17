import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SectionHeader from './SectionHeader';

export default function ProcessSection({ isActive }) {
    const videoRef = useRef(null);
    const { ref, inView } = useInView({
        threshold: 0.4, // trigger when 40% of the section is in view
    });

    useEffect(() => {
        if (videoRef.current) {
            if (inView && isActive) {
                // Play and unmute when in view AND side is active
                videoRef.current.muted = false;
                videoRef.current.play().catch((e) => console.log('Autoplay prevented by browser:', e));
            } else {
                // Pause when out of view or flipped away
                videoRef.current.pause();
                videoRef.current.muted = true;
            }
        }
    }, [inView, isActive]);

    return (
        <section id="process" ref={ref} className="scrapbook-section max-w-4xl mx-auto py-16 md:py-20 px-4">
            <SectionHeader
                title="eyes are everything"
                subtitle="a short reel exploring emotion, expression, and line."
            />

            <div
                className="tape-strip p-4 mx-auto"
                style={{
                    background: 'var(--sk-paper)',
                    boxShadow: '2px 3px 12px rgba(0,0,0,0.08)',
                    transform: 'rotate(-1deg)',
                }}
            >
                <div style={{ aspectRatio: '16/9', background: '#111', overflow: 'hidden', borderRadius: '2px' }}>
                    <video
                        ref={videoRef}
                        src="/reel.mp4"
                        className="w-full h-full object-cover"
                        loop
                        playsInline
                        muted
                    />
                </div>
            </div>
        </section>
    );
}
