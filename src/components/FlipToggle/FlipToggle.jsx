import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EngineeringSide from '../engineering/EngineeringSide';
import ArtSide from '../artist/ArtSide';
import ToggleButtonEng from './ToggleButtonEng';
import ToggleButtonArt from './ToggleButtonArt';
import styles from './FlipToggle.module.css';

const MotionDiv = motion.div;

export default function FlipToggle() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [renderedSide, setRenderedSide] = useState('tech');
    const [isAnimating, setIsAnimating] = useState(false);
    const [showFlash, setShowFlash] = useState(false);
    const [isTechOverlayActive, setIsTechOverlayActive] = useState(true);
    const midpointTimeoutRef = useRef(null);

    // Synchronize body class whenever isFlipped changes
    useEffect(() => {
        document.body.classList.toggle('art-mode', isFlipped);
    }, [isFlipped]);

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            if (midpointTimeoutRef.current) {
                clearTimeout(midpointTimeoutRef.current);
            }
        };
    }, []);

    const handleFlip = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setShowFlash(true);

        if (midpointTimeoutRef.current) {
            clearTimeout(midpointTimeoutRef.current);
        }

        const nextFlipped = !isFlipped;
        const targetSide = nextFlipped ? 'art' : 'tech';

        // Check prefers-reduced-motion
        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            setIsFlipped(nextFlipped);
            setRenderedSide(targetSide);
            document.body.classList.toggle('art-mode', nextFlipped);
            setIsTechOverlayActive(!nextFlipped);
            setIsAnimating(false);
            setShowFlash(false);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            return;
        }

        // Start 3D rotation
        setIsFlipped(nextFlipped);

        // At midpoint (300ms, card at 90° edge-on, flash at peak):
        // 1. Swap the conditionally rendered component tree
        // 2. Reset scroll position cleanly under the white flash
        // 3. Switch body theme class
        midpointTimeoutRef.current = setTimeout(() => {
            setRenderedSide(targetSide);
            document.body.classList.toggle('art-mode', nextFlipped);
            setIsTechOverlayActive(!nextFlipped);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 300);

        setTimeout(() => {
            setShowFlash(false);
        }, 600);
    };

    return (
        <>
            {/* Toggle buttons — fixed to viewport, outside perspective container */}
            {!isFlipped && <ToggleButtonEng onClick={handleFlip} />}
            {isFlipped && <ToggleButtonArt onClick={handleFlip} />}

            <div className={styles.perspective}>
                {/* Flash overlay at 90° */}
                <AnimatePresence>
                    {showFlash && (
                        <MotionDiv
                            key="flash"
                            className={styles.flash}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.7, 0] }}
                            transition={{ duration: 0.6, times: [0, 0.5, 1] }}
                        />
                    )}
                </AnimatePresence>

            <MotionDiv
                className={styles.card}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 55,
                    damping: 14,
                    mass: 1.2,
                }}
                onAnimationComplete={() => {
                    setIsAnimating(false);
                    setShowFlash(false);
                    const finalSide = isFlipped ? 'art' : 'tech';
                    setRenderedSide(finalSide);
                    document.body.classList.toggle('art-mode', isFlipped);
                    setIsTechOverlayActive(!isFlipped);
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front — Engineering (mounted ONLY when in tech mode) */}
                {renderedSide === 'tech' && (
                    <div
                        key="tech-front"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            width: '100%',
                            minHeight: '100vh',
                            position: 'relative',
                        }}
                    >
                        <EngineeringSide isActive={isTechOverlayActive} />
                    </div>
                )}

                {/* Back — Art (mounted ONLY when in art mode) */}
                {renderedSide === 'art' && (
                    <div
                        key="art-back"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            width: '100%',
                            minHeight: '100vh',
                            position: 'relative',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <ArtSide isActive={true} />
                    </div>
                )}
            </MotionDiv>
        </div>
        </>
    );
}
