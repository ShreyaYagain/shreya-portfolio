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
                <div className="channel-label mb-4">
                    {'>'} EASTER_EGG: logic_gate_playground
                </div>

                <p className="mb-6" style={{
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: '0.8rem',
                    color: 'rgba(57,255,20,0.4)',
                }}>
                    INPUT: CURIOSITY + HARDWARE → OUTPUT: SHREYA
                </p>

                <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto" style={{ maxHeight: '180px' }}>
                    {/* Input A */}
                    <g
                        onClick={() => setInputA(!inputA)}
                        style={{ cursor: 'pointer' }}
                    >
                        <rect x="20" y="40" width="50" height="30" rx="3"
                            fill={inputA ? 'rgba(57,255,20,0.15)' : 'rgba(57,255,20,0.03)'}
                            stroke={inputA ? '#39ff14' : 'rgba(57,255,20,0.2)'}
                            strokeWidth="1.5"
                        />
                        <text x="45" y="60" textAnchor="middle" fill={inputA ? '#39ff14' : 'rgba(57,255,20,0.4)'}
                            fontSize="14" fontFamily="'Orbitron', sans-serif" fontWeight="bold">
                            {inputA ? '1' : '0'}
                        </text>
                        <text x="45" y="82" textAnchor="middle" fill="rgba(57,255,20,0.3)"
                            fontSize="7" fontFamily="'Share Tech Mono', monospace">
                            CURIOSITY
                        </text>
                    </g>

                    {/* Input B */}
                    <g
                        onClick={() => setInputB(!inputB)}
                        style={{ cursor: 'pointer' }}
                    >
                        <rect x="20" y="120" width="50" height="30" rx="3"
                            fill={inputB ? 'rgba(57,255,20,0.15)' : 'rgba(57,255,20,0.03)'}
                            stroke={inputB ? '#39ff14' : 'rgba(57,255,20,0.2)'}
                            strokeWidth="1.5"
                        />
                        <text x="45" y="140" textAnchor="middle" fill={inputB ? '#39ff14' : 'rgba(57,255,20,0.4)'}
                            fontSize="14" fontFamily="'Orbitron', sans-serif" fontWeight="bold">
                            {inputB ? '1' : '0'}
                        </text>
                        <text x="45" y="162" textAnchor="middle" fill="rgba(57,255,20,0.3)"
                            fontSize="7" fontFamily="'Share Tech Mono', monospace">
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
