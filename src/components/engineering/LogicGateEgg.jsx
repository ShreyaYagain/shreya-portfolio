import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LogicGateEgg() {
    const [inputA, setInputA] = useState(false);
    const [inputB, setInputB] = useState(false);

    const andOutput = inputA && inputB;
    const finalOutput = andOutput;

    return (
        <section className="py-12 px-4 max-w-2xl mx-auto">
            <div className="osc-screen p-6 text-center">
                <div className="channel-label mb-2" style={{
                    color: '#39ff14',
                    textShadow: 'var(--osc-glow-sm)',
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                }}>
                    {'>'} EASTER_EGG: LOGIC_GATE_PLAYGROUND
                </div>

                <p className="mb-6" style={{
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: '0.85rem',
                    color: '#39ff14',
                    textShadow: '0 0 6px rgba(57, 255, 20, 0.4)',
                    letterSpacing: '0.05em',
                }}>
                    INPUT: CURIOSITY + HARDWARE → OUTPUT: SHREYA
                </p>

                <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto" style={{ maxHeight: '180px' }}>
                    {/* Input A */}
                    <g
                        role="button"
                        tabIndex={0}
                        aria-label={`Toggle Curiosity input, currently ${inputA ? '1' : '0'}`}
                        onClick={() => setInputA(!inputA)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setInputA(!inputA);
                            }
                        }}
                        className="cursor-pointer"
                        style={{ cursor: 'pointer' }}
                    >
                        {/* Expanded touch target rect */}
                        <rect x="5" y="25" width="80" height="65" fill="transparent" />
                        <rect x="20" y="40" width="50" height="30" rx="3"
                            fill={inputA ? 'rgba(57,255,20,0.15)' : 'rgba(57,255,20,0.03)'}
                            stroke={inputA ? '#39ff14' : 'rgba(57,255,20,0.2)'}
                            strokeWidth="1.5"
                        />
                        <text x="45" y="60" textAnchor="middle" fill={inputA ? '#39ff14' : 'rgba(57,255,20,0.6)'}
                            fontSize="14" fontFamily="'Orbitron', sans-serif" fontWeight="bold"
                            style={{ filter: inputA ? 'drop-shadow(0 0 6px #39ff14)' : 'none' }}>
                            {inputA ? '1' : '0'}
                        </text>
                        <text x="45" y="83" textAnchor="middle" fill="#39ff14"
                            fontSize="8" fontFamily="'Share Tech Mono', monospace" letterSpacing="0.08em"
                            style={{
                                filter: inputA ? 'drop-shadow(0 0 6px #39ff14)' : 'drop-shadow(0 0 3px rgba(57,255,20,0.6))',
                                textShadow: inputA ? '0 0 6px #39ff14' : '0 0 4px rgba(57,255,20,0.6)',
                                transition: 'all 0.3s ease',
                            }}>
                            CURIOSITY
                        </text>
                    </g>

                    {/* Input B */}
                    <g
                        role="button"
                        tabIndex={0}
                        aria-label={`Toggle Hardware input, currently ${inputB ? '1' : '0'}`}
                        onClick={() => setInputB(!inputB)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setInputB(!inputB);
                            }
                        }}
                        className="cursor-pointer"
                        style={{ cursor: 'pointer' }}
                    >
                        {/* Expanded touch target rect */}
                        <rect x="5" y="105" width="80" height="65" fill="transparent" />
                        <rect x="20" y="120" width="50" height="30" rx="3"
                            fill={inputB ? 'rgba(57,255,20,0.15)' : 'rgba(57,255,20,0.03)'}
                            stroke={inputB ? '#39ff14' : 'rgba(57,255,20,0.2)'}
                            strokeWidth="1.5"
                        />
                        <text x="45" y="140" textAnchor="middle" fill={inputB ? '#39ff14' : 'rgba(57,255,20,0.6)'}
                            fontSize="14" fontFamily="'Orbitron', sans-serif" fontWeight="bold"
                            style={{ filter: inputB ? 'drop-shadow(0 0 6px #39ff14)' : 'none' }}>
                            {inputB ? '1' : '0'}
                        </text>
                        <text x="45" y="163" textAnchor="middle" fill="#39ff14"
                            fontSize="8" fontFamily="'Share Tech Mono', monospace" letterSpacing="0.08em"
                            style={{
                                filter: inputB ? 'drop-shadow(0 0 6px #39ff14)' : 'drop-shadow(0 0 3px rgba(57,255,20,0.6))',
                                textShadow: inputB ? '0 0 6px #39ff14' : '0 0 4px rgba(57,255,20,0.6)',
                                transition: 'all 0.3s ease',
                            }}>
                            HARDWARE
                        </text>
                    </g>

                    {/* Wires to AND gate */}
                    <line x1="70" y1="55" x2="140" y2="75" stroke={inputA ? '#39ff14' : 'rgba(57,255,20,0.15)'} strokeWidth="1.5" />
                    <line x1="70" y1="135" x2="140" y2="105" stroke={inputB ? '#39ff14' : 'rgba(57,255,20,0.15)'} strokeWidth="1.5" />

                    {/* AND Gate */}
                    <path d="M 140 60 L 140 120 Q 195 120, 195 90 Q 195 60, 140 60 Z"
                        fill={andOutput ? 'rgba(57,255,20,0.1)' : 'rgba(57,255,20,0.02)'}
                        stroke={andOutput ? '#39ff14' : 'rgba(57,255,20,0.2)'}
                        strokeWidth="1.5"
                    />
                    <text x="162" y="94" textAnchor="middle" fill={andOutput ? '#39ff14' : 'rgba(57,255,20,0.3)'}
                        fontSize="10" fontFamily="'Share Tech Mono', monospace">
                        AND
                    </text>

                    {/* Wire from AND to output */}
                    <line x1="195" y1="90" x2="290" y2="90"
                        stroke={finalOutput ? '#39ff14' : 'rgba(57,255,20,0.15)'}
                        strokeWidth="1.5"
                    />

                    {/* Output */}
                    <g>
                        <rect x="290" y="70" width="80" height="40" rx="4"
                            fill={finalOutput ? 'rgba(57,255,20,0.15)' : 'rgba(57,255,20,0.03)'}
                            stroke={finalOutput ? '#39ff14' : 'rgba(57,255,20,0.2)'}
                            strokeWidth="1.5"
                            style={{
                                filter: finalOutput ? 'drop-shadow(0 0 8px rgba(57,255,20,0.5))' : 'none',
                                transition: 'all 0.3s ease',
                            }}
                        />
                        <text x="330" y="95" textAnchor="middle"
                            fill={finalOutput ? '#39ff14' : 'rgba(57,255,20,0.3)'}
                            fontSize="10" fontFamily="'Orbitron', sans-serif" fontWeight="bold">
                            {finalOutput ? '1' : '0'}
                        </text>
                    </g>
                </svg>

                {/* Output message */}
                <motion.div
                    className="mt-4"
                    animate={{ opacity: finalOutput ? 1 : 0.4 }}
                >
                    <span style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.9rem',
                        color: finalOutput ? '#39ff14' : 'rgba(57,255,20,0.3)',
                        textShadow: finalOutput ? 'var(--osc-glow-sm)' : 'none',
                    }}>
                        {finalOutput ? '✓ SYSTEM READY — OUTPUT: SHREYA' : '⟳ COMPILING...'}
                    </span>
                </motion.div>

                <p className="mt-3" style={{
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: '0.7rem',
                    color: 'rgba(57,255,20,0.25)',
                }}>
                    click inputs to toggle • (0 = off, 1 = on)
                </p>
            </div>
        </section>
    );
}
