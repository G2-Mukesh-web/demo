import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../../utils/animations';

export function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice || prefersReducedMotion()) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickTo for lag-free cursor trailing
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Interactive target detection (links, buttons, clickable cards)
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .img-zoom-wrapper, .cursor-pointer');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Do not render on touch or reduced motion
  if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || prefersReducedMotion())) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 hidden md:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Center Small Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-accent-brass pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      />

      {/* Trailing Outer Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full border border-accent-brass/60 pointer-events-none z-40 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-14 h-14 -ml-7 -mt-7 bg-accent-brass/10 border-accent-brass scale-110'
            : 'w-10 h-10'
        }`}
      />
    </div>
  );
}

export default CustomCursor;
