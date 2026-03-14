import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function OscilloscopeHero() {
    const containerRef = useRef(null);
    const [probeData, setProbeData] = useState(null);

    const width = 800;
    const height = 300;
    const amplitude = height * 0.3;
    const centerY = height / 2;
    const frequency = 3;

    const [phase, setPhase] = useState(0);

    useEffect(() => {
        let requestRef;
        const animate = () => {
            setPhase(prev => (prev + 0.08) % (Math.PI * 2));
            requestRef = requestAnimationFrame(animate);
        };
        requestRef = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef);
    }, []);

    // Generate sinusoidal wave path with phase shift
    const wavePath = (() => {
        let path = `M 0 ${centerY}`;
        for (let x = 0; x <= width; x += 5) {
            const y = centerY + amplitude * Math.sin((x / width) * frequency * Math.PI * 2 + phase);
            path += ` L ${x} ${y}`;
        }
        return path;
    })();

    const handleMouseMove = useCallback((e) => {
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const normX = mouseX / rect.width;
        const svgX = normX * width;
        const voltage = Math.sin(normX * frequency * Math.PI * 2 + phase);
        const svgY = centerY + amplitude * voltage;
        const time = (normX * 10).toFixed(1);
        setProbeData({ voltage: voltage.toFixed(2), time, x: svgX, y: svgY });
    }, [phase]);

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="osc-screen osc-grid crt-flicker relative w-[90%] max-w-5xl mx-auto p-8 md:p-12" style={{ minHeight: '70vh' }}>
                {/* Channel labels */}
                <div className="absolute top-4 left-4 flex gap-4" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.75rem' }}>
                    <span className="phosphor-text">CH1</span>
                    <span className="phosphor-text-dim">CH2</span>
                </div>

                <div className="absolute bottom-4 right-4 phosphor-text-dim" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.75rem' }}>
                    TIME/DIV: 1μs
                </div>

                {/* Waveform SVG */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <svg
                        ref={containerRef}
                        className="w-full h-64 md:h-80"
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="none"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setProbeData(null)}
                        style={{ cursor: 'crosshair' }}
                    >
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Animated waveform */}
                        <motion.path
                            d={wavePath}
                            fill="none"
                            stroke="#39ff14"
                            strokeWidth="2"
                            filter="url(#glow)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />

                        {/* Second wave (dimmer) */}
                        <motion.path
                            d={wavePath}
                            fill="none"
                            stroke="rgba(57,255,20,0.15)"
                            strokeWidth="1"
                            transform="translate(0, 8)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
                        />

                        {/* Probe */}
                        {probeData && (
                            <>
                                <circle cx={probeData.x} cy={probeData.y} r="6" fill="#39ff14" opacity="0.8">
                                    <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite" />
                                </circle>
                                <circle cx={probeData.x} cy={probeData.y} r="3" fill="#fff" />
                                <line x1={probeData.x} y1="0" x2={probeData.x} y2={height} stroke="rgba(57,255,20,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                            </>
                        )}
                    </svg>
                </div>

                {/* Probe readout tooltip */}
                {probeData && (
                    <div
                        className="absolute pointer-events-none px-3 py-1.5 rounded"
                        style={{
                            left: `calc(5% + ${(probeData.x / width) * 90}%)`,
                            top: '15%',
                            background: 'rgba(0,0,0,0.85)',
                            border: '1px solid rgba(57,255,20,0.3)',
                            fontFamily: "'Inconsolata', monospace",
                            fontSize: '0.8rem',
                            color: '#39ff14',
                            textShadow: '0 0 4px rgba(57,255,20,0.4)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        V = {probeData.voltage} | t = {probeData.time}μs
                    </div>
                )}

                {/* Hero text */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full" style={{ minHeight: '50vh' }}>
                    <motion.h1
                        className="text-center leading-none"
                        style={{
                            fontFamily: "'Wallpoet', monospace",
                            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                            color: '#39ff14',
                            textShadow: '0 0 10px #39ff14, 0 0 30px rgba(57,255,20,0.3), 0 0 60px rgba(57,255,20,0.1)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {'SHREYA_H_YAGAIN'.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.3 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        className="mt-4 text-center tracking-widest"
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
                            color: 'rgba(57,255,20,0.6)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        ECE // RVCE 2024-28 // SIGNAL: ACTIVE
                        <span className="blink ml-1">█</span>
                    </motion.p>

                    {/* Channel readouts */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mt-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                    >
                        {[
                            { label: 'MODE', value: 'ECE' },
                            { label: 'YEAR', value: '02' },
                            { label: 'SIGNAL', value: 'ACTIVE', dot: true },
                        ].map((readout, i) => (
                            <div
                                key={i}
                                className="px-4 py-2 rounded"
                                style={{
                                    background: 'rgba(57,255,20,0.03)',
                                    border: '1px solid rgba(57,255,20,0.15)',
                                    fontFamily: "'Inconsolata', monospace",
                                    fontSize: '0.8rem',
                                    color: 'rgba(57,255,20,0.5)',
                                }}
                            >
                                [{readout.label}: <span className="phosphor-text">{readout.value}</span>
                                {readout.dot && <span className="ml-1 inline-block w-2 h-2 rounded-full glow-pulse" style={{ background: '#39ff14', verticalAlign: 'middle' }} />}]
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
                    style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.75rem',
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
