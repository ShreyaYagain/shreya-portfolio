import ScrapbookHero from './ScrapbookHero';
import FloatingAnnotations from './FloatingAnnotations';
import AboutSection from './AboutSection';
import SketchMarquee from './SketchMarquee';
import ToolsMediums from './ToolsMediums';
import ReelSection from './ReelSection';
import InstagramSection from './InstagramSection';
import ContactFooter from '../shared/ContactFooter';
import useShake from '../../hooks/useShake';

export default function ArtSide({ isActive }) {
    const isShaking = useShake({ threshold: 15, shakeDuration: 3000 });

    return (
        <div className="art-side art-mode overflow-hidden relative">
            <FloatingAnnotations isShaking={isShaking} />
            <ScrapbookHero />
            <AboutSection />
            <SketchMarquee />
            <ToolsMediums />
            <ReelSection isActive={isActive} />
            <InstagramSection />
            <ContactFooter mode="art" />

            {/* Shake message — mobile only, appears at bottom during shake */}
            {isShaking && (
                <div style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: "'Caveat', cursive",
                    fontSize: '1.2rem',
                    color: '#79010d',
                    zIndex: 1000,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    animation: 'fadeInOut 3s ease forwards',
                }}>
                    careful, the sketchbook is fragile.
                </div>
            )}
        </div>
    );
}
