import { motion } from 'framer-motion';

export default function ToggleButtonArt({ onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className="fixed top-6 right-6 z-[200] px-5 py-3 cursor-pointer"
            style={{
                background: '#f2ede3',
                border: 'none',
                boxShadow: '2px 3px 8px rgba(0,0,0,0.12)',
                position: 'fixed',
                transform: 'rotate(-1deg)',
            }}
            whileHover={{ rotate: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Red tape strip at top */}
            <div
                className="absolute -top-1.5 left-3 right-3 h-3"
                style={{
                    background: 'rgba(121,1,13,0.7)',
                    transform: 'rotate(-1deg)',
                }}
            />
            <span
                style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '1.1rem',
                    color: '#4a3f2f',
                    fontWeight: 600,
                }}
            >
                flip to engineering →
            </span>
        </motion.button>
    );
}
