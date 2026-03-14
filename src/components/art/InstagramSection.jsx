import { motion } from 'framer-motion';
import { instagram, digitalContentCopy } from '../../data/artData';

export default function InstagramSection() {
    return (
        <section className="scrapbook-section max-w-4xl mx-auto text-center">
            {/* Big closing statement */}
            <motion.h2
                style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 6vw, 4rem)',
                    color: 'var(--sk-ink)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                and that's a wrap.
            </motion.h2>

            {/* CTA */}
            <motion.p
                style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    color: 'var(--sk-ink-mid)',
                    marginBottom: '1.5rem',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {instagram.cta}
            </motion.p>

            {/* Body copy */}
            <motion.p
                className="max-w-2xl mx-auto mb-8"
                style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: 'var(--sk-ink)',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {digitalContentCopy}
            </motion.p>

            {/* Instagram handle */}
            <motion.a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '1.4rem',
                    color: 'var(--sk-red)',
                    textDecoration: 'none',
                    transform: 'rotate(-1deg)',
                    borderBottom: '2px solid var(--sk-red)',
                    paddingBottom: '2px',
                }}
                whileHover={{ scale: 1.05, rotate: 0 }}
            >
                {instagram.handle}
            </motion.a>

            {/* Decorative tape strip */}
            <div className="mt-12 flex justify-center">
                <div style={{
                    width: '200px',
                    height: '6px',
                    background: 'var(--sk-red)',
                    opacity: 0.5,
                    transform: 'rotate(-1deg)',
                }} />
            </div>
        </section>
    );
}
