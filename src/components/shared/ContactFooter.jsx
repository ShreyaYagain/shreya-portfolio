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
            <footer className="py-12 sm:py-16 px-3.5 sm:px-4 max-w-3xl mx-auto w-full pb-[calc(4rem+env(safe-area-inset-bottom,0px))]">
                <div className="osc-screen p-4 sm:p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:border-green-400/50 hover:shadow-[0_0_25px_rgba(57,255,20,0.12)]">
                    {/* Top scanning accent line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1 waveform-scan"
                        style={{
                            background: 'linear-gradient(90deg, transparent, var(--osc-phosphor), transparent)',
                            backgroundSize: '200% 100%',
                        }}
                    />

                    <div className="mb-5 sm:mb-6 flex items-center justify-between flex-wrap gap-2">
                        <span
                            style={{
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
                                color: '#39ff14',
                                textShadow: 'var(--osc-glow-sm)',
                            }}
                        >
                            {'>'} CONTACT_INIT
                        </span>
                        <span className="channel-label text-[0.68rem] sm:text-[0.72rem]">
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
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-2 rounded transition-colors duration-200 hover:bg-[rgba(57,255,20,0.05)] border border-green-900/10 sm:border-transparent">
                            <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                                <span className="phosphor-text-dim">{'>'} EMAIL:</span>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="phosphor-text hover:underline break-all"
                                    style={{ textDecoration: 'none' }}
                                >
                                    {contact.email}
                                </a>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="terminal-btn min-h-[44px] min-w-[80px] px-3.5 inline-flex items-center justify-center self-start sm:self-auto text-xs"
                                style={copied ? { color: '#39ff14', borderColor: '#39ff14', textShadow: 'var(--osc-glow-sm)' } : {}}
                            >
                                {copied ? '[COPIED ✓]' : '[COPY]'}
                            </button>
                        </div>

                        {/* LINKEDIN */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-2 rounded transition-colors duration-200 hover:bg-[rgba(57,255,20,0.05)] border border-green-900/10 sm:border-transparent">
                            <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                                <span className="phosphor-text-dim">{'>'} LINKEDIN:</span>
                                <a
                                    href={contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="phosphor-text hover:underline break-all"
                                    style={{ textDecoration: 'none' }}
                                >
                                    /in/shreya-yagain...
                                </a>
                            </div>
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="terminal-btn min-h-[44px] min-w-[80px] px-3.5 inline-flex items-center justify-center self-start sm:self-auto text-xs"
                            >
                                [OPEN ↗]
                            </a>
                        </div>

                        {/* GITHUB */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-2 rounded transition-colors duration-200 hover:bg-[rgba(57,255,20,0.05)] border border-green-900/10 sm:border-transparent">
                            <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                                <span className="phosphor-text-dim">{'>'} GITHUB:</span>
                                <a
                                    href={contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="phosphor-text hover:underline break-all"
                                    style={{ textDecoration: 'none' }}
                                >
                                    /ShreyaYagain
                                </a>
                            </div>
                            <a
                                href={contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="terminal-btn min-h-[44px] min-w-[80px] px-3.5 inline-flex items-center justify-center self-start sm:self-auto text-xs"
                            >
                                [OPEN ↗]
                            </a>
                        </div>

                        {/* RESUME */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 sm:p-2 rounded transition-colors duration-200 hover:bg-[rgba(57,255,20,0.05)] border border-green-900/10 sm:border-transparent">
                            <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
                                <span className="phosphor-text-dim">{'>'} RESUME:</span>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="phosphor-text hover:underline break-all"
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
                                className="terminal-btn min-h-[44px] min-w-[80px] px-3.5 inline-flex items-center justify-center self-start sm:self-auto text-xs"
                                style={downloaded ? { color: '#39ff14', borderColor: '#39ff14', textShadow: 'var(--osc-glow-sm)' } : {}}
                            >
                                {downloaded ? '[DOWNLOADED ✓]' : '[DOWNLOAD ⤓]'}
                            </a>
                        </div>
                    </div>

                    <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t flex flex-wrap items-center justify-between gap-2 text-xs" style={{ borderColor: 'rgba(57,255,20,0.1)' }}>
                        <span
                            className="phosphor-text-dim text-[0.7rem] sm:text-xs"
                            style={{
                                fontFamily: "'Share Tech Mono', monospace",
                            }}
                        >
                            ── SIGNAL_END ──────────────────────
                        </span>
                        <span className="channel-label text-[0.68rem]">
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
                    className="red-underline inline-flex items-center justify-center py-2 px-3 min-h-[44px]"
                    style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem', color: 'var(--sk-ink-mid)', textDecoration: 'none' }}>
                    email me
                </a>
                <a href="https://instagram.com/shreyeahfied" target="_blank" rel="noopener noreferrer"
                    className="red-underline inline-flex items-center justify-center py-2 px-3 min-h-[44px]"
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
