import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EngineeringSide from '../engineering/EngineeringSide';
import ArtSide from '../art/ArtSide';
import ToggleButtonEng from './ToggleButtonEng';
import ToggleButtonArt from './ToggleButtonArt';
import styles from './FlipToggle.module.css';

export default function FlipToggle() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (isFlipped) {
            document.body.classList.add('art-mode');
        } else {
            document.body.classList.remove('art-mode');
        }
    }, [isFlipped]);

    const handleFlip = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 600);
        setIsFlipped(prev => !prev);
    };

    return (
        <div className={styles.perspective}>
            {/* Flash overlay at 90° */}
            <AnimatePresence>
                {showFlash && (
                    <motion.div
                        key="flash"
                        className={styles.flash}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0] }}
                        transition={{ duration: 0.6, times: [0, 0.5, 1] }}
                    />
                )}
            </AnimatePresence>

            {/* Toggle buttons */}
            {!isFlipped && <ToggleButtonEng onClick={handleFlip} />}
            {isFlipped && <ToggleButtonArt onClick={handleFlip} />}

            <motion.div
                className={styles.card}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 55,
                    damping: 14,
                    mass: 1.2,
                }}
                onAnimationComplete={() => setIsAnimating(false)}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front — Engineering */}
                <div
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        width: '100%',
                        minHeight: '100vh',
                    }}
                >
                    <EngineeringSide />
                </div>

                {/* Back — Art */}
                <div
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        minHeight: '100vh',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <ArtSide isActive={isFlipped} />
                </div>
            </motion.div>
        </div>
    );
}
