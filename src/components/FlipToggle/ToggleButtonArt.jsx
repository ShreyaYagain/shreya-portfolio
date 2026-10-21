import { motion } from 'framer-motion';

export default function ToggleButtonArt({ onClick }) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            aria-label="Switch to Engineering portfolio"
            className="fixed z-[200] px-3.5 py-2.5 sm:px-5 sm:py-3 cursor-pointer select-none artist-theme artist-cursor min-h-[44px] flex items-center justify-center"
            style={{
                position: 'fixed',
                top: 'max(12px, env(safe-area-inset-top, 12px))',
                right: 'max(12px, env(safe-area-inset-right, 12px))',
                background: '#f2ede3',
                border: 'none',
                boxShadow: '2px 3px 8px rgba(0,0,0,0.12)',
                transform: 'rotate(-1deg)',
            }}
            whileHover={{ rotate: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Red tape strip at top */}
            <div
                className="absolute -top-1.5 left-2 right-2 sm:left-3 sm:right-3 h-3"
                style={{
                    background: 'rgba(121,1,13,0.7)',
                    transform: 'rotate(-1deg)',
                }}
            />
            <span
                style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                    color: '#4a3f2f',
                    fontWeight: 600,
                    lineHeight: 1,
                }}
            >
                <span className="hidden sm:inline">flip to engineering →</span>
                <span className="inline sm:hidden">engineering →</span>
            </span>
        </motion.button>
    );
}
