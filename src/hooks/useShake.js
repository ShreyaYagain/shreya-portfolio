import { useEffect, useRef, useState } from 'react';

// Detects a shake gesture using the DeviceMotionEvent API
// Returns: isShaking (boolean) — true for SHAKE_DURATION ms after a shake
export default function useShake({
  threshold = 15,       // acceleration threshold to count as a shake (m/s²)
  shakeDuration = 3000, // how long isShaking stays true (ms)
} = {}) {
  const [isShaking, setIsShaking] = useState(false);
  const lastAcc = useRef({ x: 0, y: 0, z: 0 });
  const timeoutRef = useRef(null);
  const cooldownRef = useRef(false); // prevent re-triggering mid-shake

  useEffect(() => {
    // DeviceMotionEvent only exists on mobile browsers
    if (typeof window === 'undefined') return;
    if (!window.DeviceMotionEvent) return;

    // iOS 13+ requires permission
    const requestPermission = async () => {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission !== 'granted') return;
        } catch {
          return;
        }
      }
      window.addEventListener('devicemotion', handleMotion);
    };

    const handleMotion = (e) => {
      if (cooldownRef.current) return;

      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const delta =
        Math.abs(acc.x - lastAcc.current.x) +
        Math.abs(acc.y - lastAcc.current.y) +
        Math.abs(acc.z - lastAcc.current.z);

      lastAcc.current = { x: acc.x, y: acc.y, z: acc.z };

      if (delta > threshold) {
        cooldownRef.current = true;
        setIsShaking(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsShaking(false);
          cooldownRef.current = false;
        }, shakeDuration);
      }
    };

    const onFirstInteraction = () => {
      requestPermission();
      window.removeEventListener('touchstart', onFirstInteraction);
    };
    window.addEventListener('touchstart', onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
      window.removeEventListener('touchstart', onFirstInteraction);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [threshold, shakeDuration]);

  return isShaking;
}
