import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import styles from '../art/ScrapbookHero.module.css';

const MotionP = motion.p;
const MotionH1 = motion.h1;
const MotionDiv = motion.div;
const MotionSpan = motion.span;

const DOODLE_SVGS = [
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="var(--sk-red)"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>', // Star
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sk-red)" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>', // Eye
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sk-red)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>', // Heart
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sk-red)" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>' // Plus
];

export default function HeroSection() {
    const shouldReduceMotion = useReducedMotion();
    const [easterEggActive, setEasterEggActive] = useState(false);
    const clickCountRef = useRef(0);
    const clickTimerRef = useRef(null);

    const triggerEasterEgg = (x, y) => {
        setEasterEggActive(true);

        // Spawn doodles
        for (let i = 0; i < 24; i++) {
            const doodleEl = document.createElement('div');
            doodleEl.innerHTML = DOODLE_SVGS[Math.floor(Math.random() * DOODLE_SVGS.length)];
            doodleEl.style.position = 'fixed';
            doodleEl.style.left = `${x}px`;
            doodleEl.style.top = `${y}px`;
            doodleEl.style.pointerEvents = 'none';
            doodleEl.style.zIndex = '999';
            document.body.appendChild(doodleEl);

            gsap.to(doodleEl, {
                x: (Math.random() - 0.5) * 400,
                y: Math.random() * -300 + 150,
                rotation: Math.random() * 360,
                opacity: 0,
                duration: 1.5 + Math.random() * 1.5,
                ease: 'power2.out',
                onComplete: () => doodleEl.remove()
            });
        }

        setTimeout(() => setEasterEggActive(false), 4000);
    };

    const handleNameClick = (e) => {
        clickCountRef.current += 1;
        if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

        clickTimerRef.current = setTimeout(() => {
            clickCountRef.current = 0;
        }, 600);

        if (clickCountRef.current >= 3) {
            clickCountRef.current = 0;
            triggerEasterEgg(e.clientX, e.clientY);
        }
    };

    return (
        <section id="hero" className={styles.hero}>
            {/* ── LEFT COLUMN ── */}
            <div className={styles.leftCol}>
                {/* Handwritten opener annotation — rotated +1deg for contrast */}
                <MotionP
                    className={styles.annotationOpener}
                    style={{ transform: 'rotate(1deg)' }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Hi. Since you're new here, let me be your guide.
                </MotionP>

                {/* Hero name — Permanent Marker, tilted -3deg leaning up to the left with settle-in */}
                <MotionH1
                    className={styles.heroName}
                    style={{ transformOrigin: 'left bottom' }}
                    initial={
                        shouldReduceMotion
                            ? { opacity: 1, x: 0, rotate: -3 }
                            : { opacity: 0, x: -30, rotate: 0 }
                    }
                    animate={{ opacity: 1, x: 0, rotate: -3 }}
                    transition={
                        shouldReduceMotion
                            ? { duration: 0 }
                            : { delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }
                    onClick={handleNameClick}
                >
                    <span className={styles.nameLine}>Shreya</span>
                    <span className={styles.nameLine}>Harish</span>
                    <span className={styles.nameLine}>Yagain</span>
                </MotionH1>

                {/* Subtitle */}
                <MotionP
                    className={styles.subtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                >
                    Electronics Engineer · Visual Artist
                </MotionP>

                {/* Floating annotation — left margin */}
                <span className={`${styles.floatNote} ${styles.floatNoteLeft}`}>
                    pen + insatiable curiosity →
                </span>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className={styles.rightCol}>
                <MotionDiv
                    className={styles.photoFrame}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                >
                    <img
                        src="/photos/shreya-bw.png"
                        alt="Shreya Harish Yagain"
                        className={styles.photo}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    {/* Fallback / Placeholder shown until real photo is added */}
                    <div className={styles.photoFallback} style={{
                        background: 'linear-gradient(135deg, var(--sk-paper-dark), var(--sk-paper))',
                        border: '3px solid var(--sk-paper-dark)',
                        minHeight: '350px',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '4px 6px 20px rgba(0,0,0,0.1)',
                    }}>
                        <p className={styles.photoCaption}>[ photo goes here ]</p>
                    </div>
                </MotionDiv>
            </div>

            {/* ── BOTTOM CORNER ANNOTATION ── */}
            <MotionSpan
                className={styles.eggAnnotation}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                ongoing experiment
            </MotionSpan>

            {/* Easter Egg Overlay Message */}
            <AnimatePresence>
                {easterEggActive && (
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontFamily: "'Caveat', cursive",
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            color: 'var(--sk-red)',
                            zIndex: 1000,
                            pointerEvents: 'none',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        you found the sketchbook ✦
                    </MotionDiv>
                )}
            </AnimatePresence>
        </section>
    );
}
