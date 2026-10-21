import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function OscilloscopeHero() {
    const canvasRef = useRef(null);
    const [probeData, setProbeData] = useState(null);
    const probePosRef = useRef(null);
    const phaseRef = useRef(0);
    const sizeRef = useRef({ width: 800, height: 300, dpr: 1 });

    const frequency = 3;
    const SPEED = 4.8; // radians per second, equivalent to 0.08 per 16.6ms frame (approx 0.76 cycles/sec scrolling left)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let rafId;
        let lastTime = performance.now();

        const updateSize = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(rect.width * dpr);
            canvas.height = Math.round(rect.height * dpr);
            sizeRef.current = { width: rect.width, height: rect.height, dpr };
        };

        updateSize();

        let resizeObserver;
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(() => {
                updateSize();
            });
            resizeObserver.observe(canvas);
        }

        const handleWindowResize = () => {
            updateSize();
        };
        window.addEventListener('resize', handleWindowResize);

        const ctx = canvas.getContext('2d');

        const render = (currentTime) => {
            // Clamp dt to [0, 0.05] so tab switching or slow frames never cause phase jumps
            const rawDt = (currentTime - lastTime) / 1000;
            const dt = Math.max(0, Math.min(rawDt, 0.05));
            lastTime = currentTime;

            phaseRef.current = (phaseRef.current + SPEED * dt) % (Math.PI * 2);
            const phase = phaseRef.current;

            const { width: w, height: h, dpr } = sizeRef.current;
            if (w > 0 && h > 0 && ctx) {
                ctx.save();
                ctx.scale(dpr, dpr);
                ctx.clearRect(0, 0, w, h);

                const centerY = h / 2;
                const amplitude = h * 0.22;
                const fadeWidth = Math.min(48, w * 0.08);

                // Helper to create fade gradient across the screen width for clean entry/exit
                const createFadeGradient = (alphaMax) => {
                    const grad = ctx.createLinearGradient(0, 0, w, 0);
                    grad.addColorStop(0, 'rgba(57, 255, 20, 0)');
                    grad.addColorStop(fadeWidth / w, `rgba(57, 255, 20, ${alphaMax})`);
                    grad.addColorStop(1 - fadeWidth / w, `rgba(57, 255, 20, ${alphaMax})`);
                    grad.addColorStop(1, 'rgba(57, 255, 20, 0)');
                    return grad;
                };

                // Primary wave with subtle phosphor glow (continuous open polyline)
                // Use larger step on mobile (<640px) to reduce sample count for high FPS
                const sampleStep = w < 640 ? 4 : 2;
                ctx.save();
                ctx.shadowColor = '#39ff14';
                ctx.shadowBlur = 4;
                ctx.beginPath();
                for (let x = 0; x <= w; x += sampleStep) {
                    const y = centerY + amplitude * Math.sin((x / w) * frequency * Math.PI * 2 + phase);
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.strokeStyle = createFadeGradient(0.4);
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.restore();

                // 3. Interactive probe visualization on canvas
                const probe = probePosRef.current;
                if (probe) {
                    const { mouseX, normX } = probe;
                    const waveY = centerY + amplitude * Math.sin(normX * frequency * Math.PI * 2 + phase);

                    // Vertical dashed measurement line
                    ctx.save();
                    ctx.beginPath();
                    ctx.setLineDash([4, 4]);
                    ctx.strokeStyle = 'rgba(57, 255, 20, 0.25)';
                    ctx.lineWidth = 1;
                    ctx.moveTo(mouseX, 0);
                    ctx.lineTo(mouseX, h);
                    ctx.stroke();
                    ctx.restore();

                    // Pulsing outer glow circle
                    const pulseRadius = 6 + 1.5 * Math.sin(currentTime * 0.008);
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(mouseX, waveY, pulseRadius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(57, 255, 20, 0.8)';
                    ctx.shadowColor = '#39ff14';
                    ctx.shadowBlur = 10;
                    ctx.fill();

                    // Center white needle dot
                    ctx.beginPath();
                    ctx.arc(mouseX, waveY, 3, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.fill();
                    ctx.restore();
                }

                ctx.restore();
            }

            rafId = requestAnimationFrame(render);
        };

        rafId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', handleWindowResize);
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, []);

    const handleMouseMove = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const normX = mouseX / rect.width;
        const currentPhase = phaseRef.current;
        const voltage = Math.sin(normX * frequency * Math.PI * 2 + currentPhase);
        const time = (normX * 10).toFixed(1);

        probePosRef.current = { mouseX, normX };
        setProbeData({
            voltage: voltage.toFixed(2),
            time,
            xPercent: normX * 100,
        });
    }, [frequency]);

    const handleMouseLeave = useCallback(() => {
        probePosRef.current = null;
        setProbeData(null);
    }, []);

    return (
        <section className="relative w-full min-h-screen min-h-[100dvh] h-auto py-10 sm:py-16 flex flex-col items-center justify-center overflow-hidden">
            <div className="osc-screen osc-grid crt-flicker relative w-[95%] sm:w-[90%] max-w-5xl mx-auto p-3.5 sm:p-8 md:p-12 rounded-[4px] flex flex-col justify-between" style={{ minHeight: 'min(78vh, 560px)' }}>
                {/* Channel labels */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-3 sm:gap-4 select-none pointer-events-none z-20 text-[0.7rem] sm:text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    <span className="phosphor-text">CH1</span>
                    <span className="phosphor-text-dim">CH2</span>
                </div>

                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 phosphor-text-dim select-none pointer-events-none z-20 text-[0.68rem] sm:text-xs" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    TIME/DIV: 1μs
                </div>

                {/* Waveform Canvas with soft edge dissolve and scope clipping — below text */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 overflow-hidden pointer-events-none md:pointer-events-auto z-0">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-36 sm:h-56 md:h-80 block"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            maskImage: 'linear-gradient(to right, transparent 0%, black 32px, black calc(100% - 32px), transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 32px, black calc(100% - 32px), transparent 100%)',
                        }}
                    />
                </div>

                {/* Probe readout tooltip */}
                {probeData && (
                    <div
                        className="absolute pointer-events-none px-2.5 py-1 sm:px-3 sm:py-1.5 rounded z-30"
                        style={{
                            left: `calc(5% + ${probeData.xPercent * 0.9}%)`,
                            top: '12%',
                            background: 'rgba(0,0,0,0.88)',
                            border: '1px solid rgba(57,255,20,0.3)',
                            fontFamily: "'Inconsolata', monospace",
                            fontSize: '0.75rem',
                            color: '#39ff14',
                            textShadow: '0 0 4px rgba(57,255,20,0.4)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        V = {probeData.voltage} | t = {probeData.time}μs
                    </div>
                )}

                {/* Hero text — stacked vertically, perfectly scalable inside the scope */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full my-auto pointer-events-none select-none py-6 sm:py-8" style={{ minHeight: '44vh' }}>
                    <motion.h1
                        className="w-full text-center leading-tight flex flex-col sm:flex-row justify-center items-center gap-0.5 sm:gap-3 px-1 sm:px-4"
                        style={{
                            fontFamily: "'Wallpoet', monospace",
                            fontSize: 'clamp(1.35rem, 5.8vw, 4.8rem)',
                            color: '#39ff14',
                            textShadow: '0 0 16px rgba(7, 12, 7, 0.95), 0 0 30px rgba(7, 12, 7, 0.9), 0 0 10px #39ff14, 0 0 25px rgba(57,255,20,0.25)',
                            letterSpacing: '0.04em',
                            maxWidth: '100%',
                        }}
                    >
                        <span className="inline-block whitespace-nowrap">
                            {'SHREYA_H_'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04, duration: 0.3 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                        <span className="inline-block whitespace-nowrap">
                            {'YAGAIN'.split('').map((char, i) => (
                                <motion.span
                                    key={i + 9}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (i + 9) * 0.04, duration: 0.3 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    <motion.p
                        className="mt-3 sm:mt-4 text-center tracking-wider sm:tracking-widest px-2 sm:px-4"
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: 'clamp(0.68rem, 2.2vw, 1rem)',
                            color: 'rgba(57,255,20,0.7)',
                            textShadow: '0 0 12px rgba(7, 16, 7, 0.95), 0 0 20px rgba(7, 16, 7, 0.9)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        ECE // RVCE 2024-28 // SIGNAL: ACTIVE
                        <span className="blink ml-1">█</span>
                    </motion.p>

                    {/* Channel readouts with [YEAR: 03] — readable, wrap gracefully */}
                    <motion.div
                        className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-5 sm:mt-8 pointer-events-auto z-20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                    >
                        {[
                            { label: 'MODE', value: 'ECE' },
                            { label: 'YEAR', value: '03' },
                            { label: 'SIGNAL', value: 'ACTIVE', dot: true },
                        ].map((readout, i) => (
                            <div
                                key={i}
                                className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded text-[0.72rem] sm:text-xs md:text-sm"
                                style={{
                                    background: 'rgba(7, 16, 7, 0.95)',
                                    backdropFilter: 'blur(4px)',
                                    border: '1px solid rgba(57, 255, 20, 0.25)',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
                                    fontFamily: "'Inconsolata', monospace",
                                    color: 'rgba(57,255,20,0.7)',
                                }}
                            >
                                [{readout.label}: <span className="phosphor-text font-bold">{readout.value}</span>
                                {readout.dot && <span className="ml-1 inline-block w-2 h-2 rounded-full glow-pulse" style={{ background: '#39ff14', verticalAlign: 'middle' }} />}]
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="relative text-center pointer-events-none select-none z-10 pt-2 pb-1"
                    style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.7rem',
                        color: 'rgba(57,255,20,0.4)',
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    ▼ SCROLL TO PROBE ▼
                </motion.div>
            </div>
        </section>
    );
}
