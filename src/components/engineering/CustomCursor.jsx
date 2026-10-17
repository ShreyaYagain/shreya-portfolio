import { useState, useEffect, useRef, Component } from 'react';

// Error boundary to ensure native cursor is restored if custom cursor throws
class CursorErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.error('CustomCursor error:', error);
        if (typeof document !== 'undefined') {
            document.documentElement.classList.remove('tech-cursor-active');
        }
    }

    componentWillUnmount() {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.remove('tech-cursor-active');
        }
    }

    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

function CustomCursorInner() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const hasMovedRef = useRef(false);

    // Check for touch-only device (pointer: coarse and not pointer: fine)
    const isTouchDevice = () => {
        if (typeof window === 'undefined' || !window.matchMedia) return false;
        return window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    };

    useEffect(() => {
        // If on a touch device or already in art-mode, ensure native cursor remains
        if (isTouchDevice() || document.body.classList.contains('art-mode')) {
            document.documentElement.classList.remove('tech-cursor-active');
            return;
        }

        const showCursor = (x, y) => {
            if (document.body.classList.contains('art-mode') || isTouchDevice()) {
                hideCursor();
                return;
            }
            setPos({ x, y });
            setIsVisible(true);
            document.documentElement.classList.add('tech-cursor-active');
        };

        const hideCursor = () => {
            setIsVisible(false);
            document.documentElement.classList.remove('tech-cursor-active');
        };

        const handleMouseMove = (e) => {
            try {
                if (document.body.classList.contains('art-mode') || isTouchDevice()) {
                    hideCursor();
                    return;
                }
                hasMovedRef.current = true;
                showCursor(e.clientX, e.clientY);
            } catch {
                hideCursor();
            }
        };

        const handleMouseLeave = () => {
            hideCursor();
        };

        const handleMouseOut = (e) => {
            // When mouse leaves the window entirely
            if (!e.relatedTarget && !e.toElement) {
                hideCursor();
            }
        };

        const handleMouseEnter = (e) => {
            try {
                if (document.body.classList.contains('art-mode') || isTouchDevice()) {
                    hideCursor();
                    return;
                }
                if (hasMovedRef.current) {
                    showCursor(e.clientX, e.clientY);
                }
            } catch {
                hideCursor();
            }
        };

        const handleBlur = () => {
            hideCursor();
        };

        // Window & document listeners
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('blur', handleBlur);

        // Watch for flip to artist mode on body class
        const observer = new MutationObserver(() => {
            if (document.body.classList.contains('art-mode')) {
                hideCursor();
            }
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        // Watch for pointer capability changes (e.g. tablet dock/undock)
        const mqlCoarse = window.matchMedia('(pointer: coarse)');
        const handleMediaChange = () => {
            if (isTouchDevice()) {
                hideCursor();
            }
        };
        if (mqlCoarse.addEventListener) {
            mqlCoarse.addEventListener('change', handleMediaChange);
        } else if (mqlCoarse.addListener) {
            mqlCoarse.addListener(handleMediaChange);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('blur', handleBlur);
            observer.disconnect();
            if (mqlCoarse.removeEventListener) {
                mqlCoarse.removeEventListener('change', handleMediaChange);
            } else if (mqlCoarse.addListener) {
                mqlCoarse.removeListener(handleMediaChange);
            }
            hideCursor();
        };
    }, []);

    if (isTouchDevice() || !isVisible) {
        return null;
    }

    return (
        <div
            className="fixed top-0 left-0 pointer-events-none z-[10000]"
            style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                willChange: 'transform',
            }}
            aria-hidden="true"
        >
            {/* Center green phosphor dot */}
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    width: '5px',
                    height: '5px',
                    backgroundColor: '#39ff14',
                    boxShadow: '0 0 6px #39ff14, 0 0 12px rgba(57, 255, 20, 0.7)',
                }}
            />

            {/* Outer green phosphor ring */}
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    width: '26px',
                    height: '26px',
                    border: '1.5px solid rgba(57, 255, 20, 0.65)',
                    boxShadow: '0 0 8px rgba(57, 255, 20, 0.4), inset 0 0 4px rgba(57, 255, 20, 0.2)',
                }}
            />
        </div>
    );
}

export default function CustomCursor() {
    return (
        <CursorErrorBoundary>
            <CustomCursorInner />
        </CursorErrorBoundary>
    );
}
