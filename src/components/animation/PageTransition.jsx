import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { prefersReducedMotion, ANIM } from '../../utils/animations';

export function PageTransition() {
  const { pathname } = useLocation();
  const curtainRef = useRef(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Only animate when navigating between different routes
    if (prevPathRef.current === pathname) {
      return;
    }
    prevPathRef.current = pathname;

    if (prefersReducedMotion()) return;

    const curtain = curtainRef.current;
    if (!curtain) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: ANIM.ease.editorial },
      });

      tl.set(curtain, { display: 'block', scaleY: 1, transformOrigin: 'top' })
        .to(curtain, {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: ANIM.duration.pageTransition || 0.4,
          ease: 'power3.inOut',
          onComplete: () => {
            if (curtain) curtain.style.display = 'none';
          },
        });
    });

    return () => {
      ctx.revert();
      if (curtain) {
        curtain.style.display = 'none';
      }
    };
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[999] bg-[#1D211F] pointer-events-none hidden"
      style={{ transformOrigin: 'bottom' }}
    />
  );
}

export default PageTransition;
