import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function SketchbookAnimation() {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const animationRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    if (animationRef.current) {
      animationRef.current.classList.add('drawing');
    }
  }, [inView]);

  return (
    <div ref={ref} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    }}>

      <svg
        ref={animationRef}
        viewBox="0 0 260 300"
        width="260"
        height="300"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <style>{`
          /* All drawn strokes start invisible */
          .draw {
            fill: none;
            stroke: #1a1208;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }

          .book-outline {
            stroke-width: 2.5;
            stroke-dasharray: 900;
            stroke-dashoffset: 900;
          }
          .spine {
            stroke-width: 2;
            stroke-dasharray: 280;
            stroke-dashoffset: 280;
          }
          .spiral {
            stroke-width: 2;
            stroke-dasharray: 60;
            stroke-dashoffset: 60;
          }
          .face-circle {
            stroke-width: 2;
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
          }
          .eye {
            stroke-width: 2.5;
            stroke-dasharray: 40;
            stroke-dashoffset: 40;
          }
          .smile {
            stroke-width: 2.5;
            stroke-dasharray: 120;
            stroke-dashoffset: 120;
          }
          .pencil {
            stroke-width: 1.5;
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          }

          /* Triggered by .drawing class added on scroll */
          .drawing .book-outline {
            animation: draw-stroke 0.8s ease forwards 0.1s;
          }
          .drawing .spine {
            animation: draw-stroke 0.4s ease forwards 0.7s;
          }
          .drawing .spiral-1 { animation: draw-stroke 0.2s ease forwards 1.0s; }
          .drawing .spiral-2 { animation: draw-stroke 0.2s ease forwards 1.15s; }
          .drawing .spiral-3 { animation: draw-stroke 0.2s ease forwards 1.3s; }
          .drawing .spiral-4 { animation: draw-stroke 0.2s ease forwards 1.45s; }
          .drawing .spiral-5 { animation: draw-stroke 0.2s ease forwards 1.6s; }
          .drawing .face-circle {
            animation: draw-stroke 0.7s ease forwards 1.8s;
          }
          .drawing .eye-left {
            animation: draw-stroke 0.25s ease forwards 2.5s;
          }
          .drawing .eye-right {
            animation: draw-stroke 0.25s ease forwards 2.75s;
          }
          .drawing .smile {
            animation: draw-stroke 0.5s ease forwards 3.0s;
          }
          .drawing .pencil {
            animation: draw-stroke 0.5s ease forwards 0.2s;
          }
          .drawing .pencil-group {
            animation: pencil-move 2.5s ease forwards 1.8s;
          }

          @keyframes draw-stroke {
            to { stroke-dashoffset: 0; }
          }
          @keyframes pencil-move {
            0%   { transform: translate(0px,   0px)  rotate(-35deg); }
            30%  { transform: translate(-20px, 10px) rotate(-35deg); }
            60%  { transform: translate(20px,  -5px) rotate(-35deg); }
            100% { transform: translate(30px,  20px) rotate(-35deg); }
          }
        `}</style>

        {/* Book shadow */}
        <rect x="28" y="32" width="210" height="255" rx="4"
          fill="rgba(28,20,16,0.06)" />

        {/* Book page fill */}
        <rect x="24" y="28" width="210" height="255" rx="4"
          fill="#ede8da" />

        {/* Ruled lines */}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i}
            x1="52" y1={100 + i * 24}
            x2="218" y2={100 + i * 24}
            stroke="rgba(28,20,16,0.08)" strokeWidth="1" />
        ))}

        {/* Book outline */}
        <rect className="draw book-outline"
          x="24" y="28" width="210" height="255" rx="4" />

        {/* Spine */}
        <line className="draw spine" x1="52" y1="28" x2="52" y2="283" />

        {/* Spiral binding — individual class names for stagger */}
        <ellipse className="draw spiral spiral-1" cx="52" cy="55"  rx="10" ry="8" />
        <ellipse className="draw spiral spiral-2" cx="52" cy="99"  rx="10" ry="8" />
        <ellipse className="draw spiral spiral-3" cx="52" cy="143" rx="10" ry="8" />
        <ellipse className="draw spiral spiral-4" cx="52" cy="187" rx="10" ry="8" />
        <ellipse className="draw spiral spiral-5" cx="52" cy="231" rx="10" ry="8" />

        {/* Face circle — red outline */}
        <circle className="draw face-circle"
          cx="135" cy="165" r="55"
          stroke="#79010d" strokeWidth="2" />

        {/* Left eye */}
        <circle className="draw eye eye-left"
          cx="116" cy="150" r="6" />

        {/* Right eye */}
        <circle className="draw eye eye-right"
          cx="154" cy="150" r="6" />

        {/* Smile */}
        <path className="draw smile"
          d="M 108 180 Q 135 210 162 180" />

        {/* Pencil group — moves while face draws */}
        <g className="pencil-group" style={{
          transformOrigin: '200px 80px',
          transform: 'rotate(-35deg)',
        }}>
          <rect className="draw pencil" x="192" y="60" width="12" height="55" rx="2" />
          <path className="draw pencil" d="M 192 115 L 198 128 L 204 115" />
          <rect className="draw pencil"
            x="192" y="56" width="12" height="6" rx="1"
            stroke="#79010d" />
        </g>

      </svg>

      {/* Caption */}
      <p style={{
        fontFamily: "'Caveat', cursive",
        fontSize: '0.95rem',
        color: '#4a3f2f',
        transform: 'rotate(-1deg)',
        marginTop: '4px',
        opacity: 0.7,
      }}>
        every face tells a story.
      </p>

    </div>
  );
}
