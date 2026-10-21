import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { certificates } from '../../data/certificates';

const MotionDiv = motion.div;

function CertificateCard({ cert, index, isSpan2 }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <MotionDiv
            ref={ref}
            className={`osc-screen p-4 sm:p-5 md:p-6 relative overflow-hidden flex flex-col justify-between w-full transition-all duration-300 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.08)] ${
                isSpan2 ? 'md:col-span-2' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: (index % 2) * 0.1 }}
        >
            {/* Top scanning accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-1 waveform-scan"
                style={{
                    background: 'linear-gradient(90deg, transparent, var(--osc-phosphor), transparent)',
                    backgroundSize: '200% 100%',
                }}
            />

            <div>
                {/* Header row: Issuer chip + Verified badge */}
                <div className="flex items-center justify-between gap-2.5 mb-3 flex-wrap">
                    <span className="tech-badge font-bold tracking-wider text-xs">
                        {cert.issuer.toUpperCase()}
                    </span>

                    <div
                        className="flex items-center gap-1.5"
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.75rem',
                            color: '#39ff14',
                            textShadow: '0 0 4px rgba(57,255,20,0.4)',
                            letterSpacing: '0.04em',
                        }}
                    >
                        <span>[VERIFIED ✓]</span>
                    </div>
                </div>

                {/* Certificate title */}
                <h3
                    style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                        color: '#39ff14',
                        textShadow: '0 0 4px rgba(57,255,20,0.3)',
                        lineHeight: 1.35,
                        marginBottom: '0.75rem',
                        wordBreak: 'break-word',
                    }}
                >
                    {cert.title}
                </h3>
            </div>

            {/* Bottom action row: view button and verification telemetry */}
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-green-900/20">
                <span
                    style={{
                        fontFamily: "'Inconsolata', monospace",
                        fontSize: '0.75rem',
                        color: 'rgba(57,255,20,0.4)',
                        letterSpacing: '0.03em',
                    }}
                >
                    AUTH_SIG: OK
                </span>

                {cert.link && (
                    <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terminal-btn min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3"
                    >
                        [VIEW ↗]
                    </a>
                )}
            </div>
        </MotionDiv>
    );
}

export default function CertificatesSection() {
    const { ref: sectionRef } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            id="certificates"
            ref={sectionRef}
            className="py-12 sm:py-16 px-3.5 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto w-full"
        >
            <h2
                className="text-center mb-2"
                style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    color: '#39ff14',
                    textShadow: 'var(--osc-glow-sm)',
                }}
            >
                {'> CERTIFICATES.verify()'}
            </h2>
            <p
                className="text-center mb-10 phosphor-text-dim"
                style={{
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: '0.85rem',
                }}
            >
                validating credentials...
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 items-stretch">
                {certificates.map((cert, i) => (
                    <CertificateCard
                        key={cert.id || cert.title}
                        cert={cert}
                        index={i}
                        isSpan2={i === certificates.length - 1 && certificates.length % 2 !== 0}
                    />
                ))}
            </div>
        </section>
    );
}
