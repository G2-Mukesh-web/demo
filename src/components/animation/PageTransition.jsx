import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { prefersReducedMotion, ANIM } from '../../utils/animations';

export function PageTransition() {
  const { pathname } = useLocation();
  const curtainRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on very first mount so initial hero intro can play cleanly
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prefersReducedMotion()) return;

    const curtain = curtainRef.current;
    if (!curtain) return;

    const tl = gsap.timeline({
      defaults: { ease: ANIM.ease.editorial },
    });

    // Elegant curtain reveal under 550ms
    tl.set(curtain, { display: 'block', scaleY: 1, transformOrigin: 'top' })
      .to(curtain, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: ANIM.duration.pageTransition,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(curtain, { display: 'none' });
        },
      });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[999] bg-bg-dark pointer-events-none hidden"
      style={{ transformOrigin: 'bottom' }}
    />
  );
}

export default PageTransition;
