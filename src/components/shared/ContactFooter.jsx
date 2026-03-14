import { contact } from '../../data/engineeringData';

export default function ContactFooter({ mode }) {
    if (mode === 'engineering') {
        return (
            <footer className="py-16 px-4 max-w-3xl mx-auto">
                <div className="osc-screen p-6 md:p-8">
                    <div className="mb-6" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '1.5rem', color: '#39ff14', textShadow: 'var(--osc-glow-sm)' }}>{'>'} CONTACT_INIT</div>

                    <div className="space-y-3" style={{
                        fontFamily: "'Inconsolata', monospace",
                        fontSize: '0.9rem',
                    }}>
                        <div className="flex items-center gap-3">
                            <span className="phosphor-text-dim">{'>'} EMAIL:</span>
                            <a href={`mailto:${contact.email}`} className="phosphor-text hover:underline" style={{ textDecoration: 'none' }}>
                                {contact.email}
                            </a>
                            <button
                                onClick={() => navigator.clipboard.writeText(contact.email)}
                                className="px-2 py-0.5 text-xs rounded cursor-pointer"
                                style={{
                                    border: '1px solid rgba(57,255,20,0.2)',
                                    background: 'rgba(57,255,20,0.05)',
                                    color: 'rgba(57,255,20,0.5)',
                                    fontFamily: "'Share Tech Mono', monospace",
                                }}
                            >
                                [COPY]
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="phosphor-text-dim">{'>'} LINKEDIN:</span>
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                                className="phosphor-text hover:underline" style={{ textDecoration: 'none' }}>
                                /in/shreya-yagain...
                            </a>
                            <span className="text-xs" style={{ color: 'rgba(57,255,20,0.3)', fontFamily: "'Share Tech Mono', monospace" }}>[OPEN]</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="phosphor-text-dim">{'>'} GITHUB:</span>
                            <a href={contact.github} target="_blank" rel="noopener noreferrer"
                                className="phosphor-text hover:underline" style={{ textDecoration: 'none' }}>
                                /ShreyaYagain
                            </a>
                            <span className="text-xs" style={{ color: 'rgba(57,255,20,0.3)', fontFamily: "'Share Tech Mono', monospace" }}>[OPEN]</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="phosphor-text-dim">{'>'} RESUME:</span>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                                className="phosphor-text hover:underline" style={{ textDecoration: 'none' }}>
                                /sys/shreya_resume.pdf
                            </a>
                            <span className="text-xs" style={{ color: 'rgba(57,255,20,0.3)', fontFamily: "'Share Tech Mono', monospace" }}>[DOWNLOAD]</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(57,255,20,0.1)' }}>
                        <span className="phosphor-text-dim" style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.75rem',
                        }}>
                            ── SIGNAL_END ──────────────────────
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
