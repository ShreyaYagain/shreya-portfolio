import { useState, useRef, useEffect } from 'react';
import { contact } from '../../data/engineeringData';

export default function ContactFooter({ mode }) {
    const [copied, setCopied] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
    const copyTimerRef = useRef(null);
    const downloadTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
            if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
        };
    }, []);

    const handleCopy = () => {
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        navigator.clipboard.writeText(contact.email);
        setCopied(true);
        copyTimerRef.current = setTimeout(() => {
            setCopied(false);
        }, 2500);
    };

    const handleDownload = () => {
        if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
        setDownloaded(true);
        downloadTimerRef.current = setTimeout(() => {
            setDownloaded(false);
        }, 2500);
    };

    if (mode === 'engineering') {
        return (
            <footer className="py-16 px-4 max-w-3xl mx-auto">
                <div className="osc-screen p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-green-400/50 hover:shadow-[0_0_25px_rgba(57,255,20,0.12)]">
                    {/* Top scanning accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1 waveform-scan"
                        style={{
                            background: 'linear-gradient(90deg, transparent, var(--osc-phosphor), transparent)',
                            backgroundSize: '200% 100%',
                        }}
                    />

                    <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
                        <span
                            style={{
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: '1.5rem',
                                color: '#39ff14',
                                textShadow: 'var(--osc-glow-sm)',
                            }}
                        >
                            {'>'} CONTACT_INIT
                        </span>
                        <span className="channel-label" style={{ fontSize: '0.7rem' }}>
                            TERMINAL: CH_COMMS
                        </span>
                    </div>

                    <div
                        className="space-y-3"
                        style={{
                            fontFamily: "'Inconsolata', monospace",
                            fontSize: '0.9rem',
                        }}
                    >
                        {/* EMAIL */}
                        <div className="flex items-center justify-between gap-3 p-2 rounded transition-colors duration-200 hover:bg-[rgba(57,255,20,0.05)]">
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="phosphor-text-dim">{'>'} EMAIL:</span>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="phosphor-text hover:underline"
                                    style={{ textDecoration: 'none' }}
                                >
                                    {contact.email}
                                </a>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="terminal-btn flex-shrink-0"
                                style={copied ? { color: '#39ff14', borderColor: '#39ff14', textShadow: 'var(--osc-glow-sm)' } : {}}
                            >
                                {copied ? '[COPIED ✓]' : '[COPY]'}
                            </button>
                        </div>

                        {/* LINKEDIN */}
                        <div className="flex items-center justify-between gap-3 p-2 rounded transition-colors duration-200 hover:bg-[rgba(57,255,20,0.05)]">
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="phosphor-text-dim">{'>'} LINKEDIN:</span>
                                <a
                                    href={contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="phosphor-text hover:underline"
                                    style={{ textDecoration: 'none' }}
                                >
                                    /in/shreya-yagain...
                                </a>
                            </div>
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="terminal-btn flex-shrink-0"
                            >
                                [OPEN ↗]
                            </a>
                        </div>

                        {/* GITHUB */}
                        <div className="flex items-center justify-between gap-3 p-2 rounded transition-colors duration-200 hover:bg-[rgba(57,255,20,0.05)]">
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="phosphor-text-dim">{'>'} GITHUB:</span>
                                <a
                                    href={contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="phosphor-text hover:underline"
                                    style={{ textDecoration: 'none' }}
                                >
                                    /ShreyaYagain
                                </a>
                            </div>
                            <a
                                href={contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="terminal-btn flex-shrink-0"
                            >
                                [OPEN ↗]
                            </a>
                        </div>

                        {/* RESUME */}
                        <div className="flex items-center justify-between gap-3 p-2 rounded transition-colors duration-200 hover:bg-[rgba(57,255,20,0.05)]">
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="phosphor-text-dim">{'>'} RESUME:</span>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="phosphor-text hover:underline"
                                    style={{ textDecoration: 'none' }}
                                >
                                    /sys/shreya_resume.pdf
                                </a>
                            </div>
                            <a
                                href="/resume.pdf"
                                download="shreya_resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleDownload}
                                className="terminal-btn flex-shrink-0"
                                style={downloaded ? { color: '#39ff14', borderColor: '#39ff14', textShadow: 'var(--osc-glow-sm)' } : {}}
                            >
                                {downloaded ? '[DOWNLOADED ✓]' : '[DOWNLOAD ⤓]'}
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'rgba(57,255,20,0.1)' }}>
                        <span
                            className="phosphor-text-dim"
                            style={{
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: '0.75rem',
                            }}
                        >
                            ── SIGNAL_END ──────────────────────
                        </span>
                        <span className="channel-label" style={{ fontSize: '0.68rem' }}>
                            STATUS: READY
                        </span>
                    </div>
                </div>
            </footer>
        );
    }

    // Art mode footer
    return (
        <footer className="scrapbook-section py-16 px-4 max-w-3xl mx-auto text-center">
            <h3 className="mb-6" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                color: 'var(--sk-ink)',
                fontWeight: 400,
            }}>
                let's make something.
            </h3>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
                <a href={`mailto:${contact.email}`}
                    className="red-underline"
                    style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem', color: 'var(--sk-ink-mid)', textDecoration: 'none' }}>
                    email me
                </a>
                <a href="https://instagram.com/shreyeahfied" target="_blank" rel="noopener noreferrer"
                    className="red-underline"
                    style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem', color: 'var(--sk-ink-mid)', textDecoration: 'none' }}>
                    @shreyeahfied
                </a>
            </div>

            {/* Decorative tape strip */}
            <div className="relative inline-block">
                <div style={{
                    width: '120px',
                    height: '4px',
                    background: 'var(--sk-red)',
                    margin: '0 auto',
                    opacity: 0.6,
                }} />
            </div>
        </footer>
    );
}
