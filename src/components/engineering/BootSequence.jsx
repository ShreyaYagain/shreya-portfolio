import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div;

const STORAGE_KEY = 'shreya_tech_booted_session';

const BOOT_LINES = [
    { text: '> INITIALIZING SIGNAL...', delay: 100 },
    { text: '> LOADING CHANNELS... [OK]', delay: 650 },
    { text: '> CALIBRATING OSCILLOSCOPE... [OK]', delay: 1200 },
    { text: '> SIGNAL: ACTIVE', delay: 1750 },
];

export default function BootSequence() {
    // Check session storage and prefers-reduced-motion safely
    const [isVisible, setIsVisible] = useState(() => {
        try {
            if (typeof window === 'undefined') return false;
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return false;
            }
            return sessionStorage.getItem(STORAGE_KEY) !== 'true';
        } catch {
            return false;
        }
    });

    const [visibleLineCount, setVisibleLineCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const timersRef = useRef([]);

    const handleSkip = useCallback(() => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        try {
            sessionStorage.setItem(STORAGE_KEY, 'true');
        } catch {
            // Ignore sessionStorage failure
        }
        setIsVisible(false);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        // Schedule lines reveal
        BOOT_LINES.forEach((line, index) => {
            const timer = setTimeout(() => {
                setVisibleLineCount(index + 1);
            }, line.delay);
            timersRef.current.push(timer);
        });

        // Smooth progress bar fill
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2.5; // reaches 100% in ~2000ms
            });
        }, 50);

        // Auto fade-out after full sequence (2200ms)
        const endTimer = setTimeout(() => {
            clearInterval(progressInterval);
            handleSkip();
        }, 2200);
        timersRef.current.push(endTimer);

        // Keydown listener to skip on any key
        const handleKeyDown = (e) => {
            e.preventDefault();
            handleSkip();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            timersRef.current.forEach(clearTimeout);
            timersRef.current = [];
            clearInterval(progressInterval);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible, handleSkip]);

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionDiv
                    className="fixed inset-0 z-[9999] bg-[#070c07] flex flex-col items-center justify-center p-4 sm:p-6 cursor-pointer select-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    onClick={handleSkip}
                >
                    {/* Corner Skip Button */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSkip();
                        }}
                        className="terminal-btn absolute top-6 right-6"
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            padding: '0.35rem 0.75rem',
                        }}
                    >
                        [SKIP]
                    </button>

                    {/* Terminal Window Box */}
                    <div
                        className="w-full max-w-lg p-6 sm:p-8 rounded border border-[rgba(57,255,20,0.3)] bg-[rgba(11,24,11,0.92)] shadow-[0_0_35px_rgba(57,255,20,0.08)] relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Terminal Header Bar */}
                        <div className="flex items-center justify-between pb-3 mb-5 border-b border-green-900/30">
                            <span
                                style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.72rem',
                                    color: 'rgba(57,255,20,0.5)',
                                    letterSpacing: '0.08em',
                                }}
                            >
                                SYSTEM_BOOT // CRT-60HZ
                            </span>
                            <span
                                style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.72rem',
                                    color: '#39ff14',
                                }}
                            >
                                CH1: ARMED
                            </span>
                        </div>

                        {/* Sequenced Text Lines */}
                        <div
                            className="space-y-3 min-h-[120px]"
                            style={{
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: 'clamp(0.85rem, 2vw, 0.98rem)',
                                color: '#39ff14',
                                letterSpacing: '0.04em',
                            }}
                        >
                            {BOOT_LINES.slice(0, visibleLineCount).map((line, idx) => (
                                <p
                                    key={idx}
                                    style={{
                                        textShadow: idx === visibleLineCount - 1
                                            ? 'var(--osc-glow-sm)'
                                            : '0 0 4px rgba(57,255,20,0.4)',
                                    }}
                                >
                                    {line.text}
                                    {idx === visibleLineCount - 1 && (
                                        <span className="blink ml-1">█</span>
                                    )}
                                </p>
                            ))}
                        </div>

                        {/* Thin Progress Bar */}
                        <div className="mt-6">
                            <div className="h-[2px] w-full bg-[rgba(57,255,20,0.15)] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#39ff14] shadow-[0_0_8px_#39ff14] transition-all duration-75 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2 text-[0.68rem] text-green-900/50 font-mono">
                                <span className="text-[rgba(57,255,20,0.4)]">
                                    PRESS ANY KEY OR CLICK TO SKIP
                                </span>
                                <span className="text-[#39ff14]">
                                    {Math.min(100, Math.round(progress))}%
                                </span>
                            </div>
                        </div>
                    </div>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}
