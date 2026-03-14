import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ReelSection({ isActive }) {
    const videoRef = useRef(null);
    const { ref, inView } = useInView({
        threshold: 0.5, // trigger when 50% of the video is in view
    });

    useEffect(() => {
        if (videoRef.current) {
            if (inView && isActive) {
                // Play and unmute when in view AND side is active
                videoRef.current.muted = false;
                videoRef.current.play().catch(e => console.log('Autoplay prevented by browser:', e));
            } else {
                // Pause when out of view or flipped away
                videoRef.current.pause();
                videoRef.current.muted = true;
            }
        }
    }, [inView, isActive]);

    return (
        <section className="scrapbook-section max-w-4xl mx-auto py-16" ref={ref}>
            <div className="tape-strip p-4 mx-auto" style={{
                background: 'var(--sk-paper)',
                boxShadow: '2px 3px 12px rgba(0,0,0,0.08)',
                transform: 'rotate(-1deg)'
            }}>
                <div style={{ aspectRatio: '16/9', background: '#111', overflow: 'hidden', borderRadius: '2px' }}>
                    {/* Placeholder video source - replace 'src' with your actual video relative path in the public folder */}
                    <video
                        ref={videoRef}
                        src="/reel.mp4"
                        className="w-full h-full object-cover"
                        loop
                        playsInline
                        muted // initially muted to allow auto-play on load, unmutes on scroll
                    />
                </div>
            </div>
        </section>
    );
}
