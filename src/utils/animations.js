import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Global plugin registration
gsap.registerPlugin(ScrollTrigger, Flip);

/**
 * Check if the user has requested reduced motion in their OS
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if the current device is a touch screen or mobile viewport
 */
export const isTouchOrMobile = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth < 1024
  );
};

/**
 * Global Animation Constants for sitewide consistency
 */
export const ANIM = {
  duration: {
    fast: 0.3,
    normal: 0.75,
    slow: 1.0,
    pageTransition: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0.35 : 0.55,
  },
  ease: {
    editorial: "power3.out",
    smooth: "power2.out",
    inOut: "power3.inOut",
    expo: "expo.out",
  },
};

/**
 * Helper to reveal elements on scroll within a container
 */
export const createScrollReveal = (container, selector = '.reveal-item', options = {}) => {
  if (!container || prefersReducedMotion()) return null;

  const elements = container.querySelectorAll(selector);
  if (!elements.length) return null;

  // Faster, simpler slide on mobile for smooth 60fps
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: isMobile ? 20 : (options.y || 35),
    },
    {
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.5 : (options.duration || ANIM.duration.normal),
      ease: options.ease || ANIM.ease.editorial,
      stagger: isMobile ? 0.06 : (options.stagger !== undefined ? options.stagger : 0.1),
      scrollTrigger: {
        trigger: options.trigger || container,
        start: isMobile ? "top 92%" : (options.start || "top 82%"),
        toggleActions: "play none none none",
        once: true,
      },
    }
  );
};

/**
 * Helper to create parallax scrub on an image
 * Automatically disabled on mobile/touch devices to protect battery & scroll responsiveness
 */
export const createParallax = (imageEl, wrapperEl, distance = 40) => {
  if (!imageEl || prefersReducedMotion() || isTouchOrMobile()) return null;

  return gsap.fromTo(
    imageEl,
    { y: -distance },
    {
      y: distance,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperEl || imageEl,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    }
  );
};
