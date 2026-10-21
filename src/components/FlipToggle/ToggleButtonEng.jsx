import { motion } from 'framer-motion';

export default function ToggleButtonEng({ onClick }) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            aria-label="Switch to Art portfolio"
            className="fixed z-[200] flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md cursor-pointer select-none max-w-[calc(100vw-24px)] min-h-[44px] tech-cursor"
            style={{
                position: 'fixed',
                top: 'max(12px, env(safe-area-inset-top, 12px))',
                right: 'max(12px, env(safe-area-inset-right, 12px))',
                background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                border: '1px solid rgba(57,255,20,0.25)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                transformOrigin: 'right center',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Rocker switch body */}
            <div className="relative w-7 sm:w-10 h-4 sm:h-5 rounded-full shrink-0" style={{ background: '#0a0a0a', border: '1px solid #333' }}>
                {/* Green indicator light */}
                <motion.div
                    className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full"
                    style={{
                        background: '#39ff14',
                        boxShadow: '0 0 6px #39ff14, 0 0 12px rgba(57,255,20,0.4)',
                    }}
                    animate={{
                        boxShadow: [
                            '0 0 6px #39ff14, 0 0 12px rgba(57,255,20,0.4)',
                            '0 0 10px #39ff14, 0 0 20px rgba(57,255,20,0.6)',
                            '0 0 6px #39ff14, 0 0 12px rgba(57,255,20,0.4)',
                        ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
            <span
                className="text-[0.72rem] sm:text-xs tracking-wider truncate font-bold sm:font-normal"
                style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: 'rgba(57,255,20,0.9)',
                }}
            >
                <span className="hidden sm:inline">{'// SWITCH_MODE: [ART]'}</span>
                <span className="inline sm:hidden">{'// [ART]'}</span>
            </span>
        </motion.button>
    );
}
