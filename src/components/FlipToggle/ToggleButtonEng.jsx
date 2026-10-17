import { motion } from 'framer-motion';

export default function ToggleButtonEng({ onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className="fixed z-[200] flex items-center gap-3 px-3.5 py-2 sm:px-4 rounded-md cursor-pointer select-none max-w-[calc(100vw-32px)]"
            style={{
                position: 'fixed',
                top: 'max(16px, env(safe-area-inset-top, 16px))',
                right: 'max(16px, env(safe-area-inset-right, 16px))',
                background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                border: '1px solid rgba(57,255,20,0.2)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                transformOrigin: 'right center',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Rocker switch body */}
            <div className="relative w-10 h-5 rounded-full shrink-0" style={{ background: '#0a0a0a', border: '1px solid #333' }}>
                {/* Green indicator light */}
                <motion.div
                    className="absolute top-1 left-1 w-3 h-3 rounded-full"
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
                className="text-xs tracking-wider truncate sm:whitespace-nowrap"
                style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: 'rgba(57,255,20,0.7)',
                }}
            >
                {'// SWITCH_MODE: [ART]'}
            </span>
        </motion.button>
    );
}
