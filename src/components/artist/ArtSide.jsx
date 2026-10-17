import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import LyricVideosSection from './LyricVideosSection';
import SketchbookSection from './SketchbookSection';
import ProcessSection from './ProcessSection';
import ToolsSection from './ToolsSection';
import NowSection from './NowSection';
import CommissionsSection from './CommissionsSection';
import WrapSection from './WrapSection';
import FloatingAnnotations from '../art/FloatingAnnotations';
import useShake from '../../hooks/useShake';

export default function ArtSide({ isActive }) {
    const isShaking = useShake({ threshold: 15, shakeDuration: 3000 });

    return (
        <div className="art-side art-mode artist-theme artist-cursor overflow-hidden relative">
            <FloatingAnnotations isShaking={isShaking} />
            <HeroSection />
            <AboutSection />
            <LyricVideosSection />
            <SketchbookSection />
            <ProcessSection isActive={isActive} />
            <ToolsSection />
            <NowSection />
            <CommissionsSection />
            <WrapSection />

            {/* Shake message — mobile only, appears at bottom during shake */}
            {isShaking && (
                <div
                    style={{
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
                    }}
                >
                    careful, the sketchbook is fragile.
                </div>
            )}
        </div>
    );
}
