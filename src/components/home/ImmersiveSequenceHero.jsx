import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 600;
const FRAMES_SET_1_COUNT = 300;

// Master continuous 600-frame array (numerically ordered)
const ALL_FRAMES = (() => {
  const list = [];
  // Set 1: frame.1 (001 -> 300)
  for (let i = 1; i <= FRAMES_SET_1_COUNT; i++) {
    const num = String(i).padStart(3, '0');
    list.push(`/frames/frame.1/ezgif-frame-${num}.jpg`);
  }
  // Set 2: frame.2 (001 -> 300) -> sequence 301..600 (indices 300..599)
  for (let i = 1; i <= 300; i++) {
    const num = String(i).padStart(3, '0');
    list.push(`/frames/frame.2/ezgif-frame-${num}.jpg`);
  }
  return list;
})();

// Storytelling chapters data synchronized across the 600-frame sequence
const CHAPTERS = [
  {
    id: 1,
    number: '01 / 09',
    startFrame: 0,
    endFrame: 60,
    startProgress: 0.00,
    endProgress: 0.10,
    heading: "WE DON'T JUST\nDESIGN SPACES.",
    supporting: "We shape how a space feels, functions and lives.",
    align: 'left',
  },
  {
    id: 2,
    number: '02 / 09',
    startFrame: 61,
    endFrame: 130,
    startProgress: 0.10,
    endProgress: 0.22,
    heading: "FROM IDEA\nTO FORM.",
    supporting: "Every project begins with an idea — refined through space, proportion and purpose.",
    align: 'left',
  },
  {
    id: 3,
    number: '03 / 09',
    startFrame: 131,
    endFrame: 200,
    startProgress: 0.22,
    endProgress: 0.33,
    heading: "MATERIAL.\nLIGHT. SPACE.",
    supporting: "Every line, material and detail works together to create a complete experience.",
    align: 'left',
  },
  {
    id: 4,
    number: '04 / 09',
    startFrame: 201,
    endFrame: 300,
    startProgress: 0.33,
    endProgress: 0.50,
    heading: "DESIGNED\nWITH INTENTION.",
    supporting: "We balance aesthetics, function and the character of every space.",
    align: 'left',
  },
  {
    id: 5,
    number: '05 / 09',
    startFrame: 301,
    endFrame: 370,
    startProgress: 0.50,
    endProgress: 0.62,
    heading: "ARCHITECTURE\nMEETS INTERIORS.",
    supporting: "From the structure to the smallest detail, every element belongs to one vision.",
    align: 'left',
  },
  {
    id: 6,
    number: '06 / 09',
    startFrame: 371,
    endFrame: 440,
    startProgress: 0.62,
    endProgress: 0.73,
    heading: "EVERY DETAIL\nHAS A PURPOSE.",
    supporting: "Thoughtful design transforms ordinary moments into meaningful experiences.",
    align: 'left',
  },
  {
    id: 7,
    number: '07 / 09',
    startFrame: 441,
    endFrame: 510,
    startProgress: 0.73,
    endProgress: 0.85,
    heading: "BUILT AROUND\nTHE WAY YOU LIVE.",
    supporting: "Spaces should not simply look beautiful. They should belong to the people who experience them.",
    align: 'left',
  },
  {
    id: 8,
    number: '08 / 09',
    startFrame: 511,
    endFrame: 570,
    startProgress: 0.85,
    endProgress: 0.94,
    heading: "TIMELESS\nBY DESIGN.",
    supporting: "Creating spaces with clarity, character and lasting relevance.",
    align: 'left',
  },
  {
    id: 9,
    number: '09 / 09',
    startFrame: 571,
    endFrame: 599,
    startProgress: 0.94,
    endProgress: 1.00,
    heading: "LET'S CREATE\nSOMETHING TIMELESS.",
    supporting: "Architecture and interiors shaped around your vision.",
    cta: true,
    align: 'left',
  },
];

export function ImmersiveSequenceHero() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const canvasRef = useRef(null);
  const initialImgRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const chapterBadgeRef = useRef(null);
  const progressBarRef = useRef(null);
  const chapterElementsRef = useRef([]);

  // In-memory caching & state
  const imagesCacheRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameIndexRef = useRef(0);
  const lastDrawnImageRef = useRef(null);
  const isComponentActiveRef = useRef(true);

  // Render a specific frame onto canvas with object-fit: cover
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let imgToDraw = null;
    const target = imagesCacheRef.current[frameIndex];

    if (target && target.complete && target.naturalWidth > 0) {
      imgToDraw = target;
    } else {
      // Find nearest loaded frame backward, then forward
      for (let offset = 1; offset < 40; offset++) {
        const back = frameIndex - offset;
        const fwd = frameIndex + offset;
        if (back >= 0 && imagesCacheRef.current[back]?.complete && imagesCacheRef.current[back]?.naturalWidth > 0) {
          imgToDraw = imagesCacheRef.current[back];
          break;
        }
        if (fwd < TOTAL_FRAMES && imagesCacheRef.current[fwd]?.complete && imagesCacheRef.current[fwd]?.naturalWidth > 0) {
          imgToDraw = imagesCacheRef.current[fwd];
          break;
        }
      }
      if (!imgToDraw) {
        imgToDraw = lastDrawnImageRef.current || imagesCacheRef.current[0];
      }
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;

    const canvasAspect = width / height;
    const imgAspect = imgWidth / imgHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawWidth = width;
      drawHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgAspect;
      offsetY = 0;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnImageRef.current = imgToDraw;

    // Fade out initial fallback image once canvas has rendered
    if (initialImgRef.current && initialImgRef.current.style.opacity !== '0') {
      initialImgRef.current.style.opacity = '0';
    }
  };

  // Update storytelling overlays based on scroll progress (without triggering React re-renders)
  const updateStory = (progress) => {
    // 1. Scroll Indicator (fades out in first 4% of scrolling)
    if (scrollIndicatorRef.current) {
      const scrollOpacity = Math.max(0, 1 - progress * 25);
      scrollIndicatorRef.current.style.opacity = scrollOpacity;
      scrollIndicatorRef.current.style.transform = `translateY(${-progress * 30}px)`;
      scrollIndicatorRef.current.style.pointerEvents = scrollOpacity <= 0.05 ? 'none' : 'auto';
    }

    // 2. Progress Bar
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
    }

    // 3. Current active chapter badge
    let activeChapterNum = '01 / 09';

    // 4. Update each of the 9 chapters
    CHAPTERS.forEach((chapter, index) => {
      const el = chapterElementsRef.current[index];
      if (!el) return;

      const { startProgress, endProgress } = chapter;
      const isFinalChapter = index === CHAPTERS.length - 1;

      // Calculate opacity and translation curves
      let opacity = 0;
      let translateY = 25;

      if (progress >= startProgress && progress <= endProgress) {
        activeChapterNum = chapter.number;
        const chapterSpan = endProgress - startProgress;
        const localProgress = (progress - startProgress) / chapterSpan;

        if (isFinalChapter) {
          // Final chapter fades in and remains pinned and stable until release
          opacity = Math.min(1, localProgress / 0.25);
          translateY = (1 - opacity) * 20;
        } else {
          // Standard chapter: Ease in (0..0.25), hold (0.25..0.75), ease out (0.75..1.0)
          if (localProgress < 0.25) {
            opacity = localProgress / 0.25;
            translateY = (1 - opacity) * 25;
          } else if (localProgress <= 0.75) {
            opacity = 1;
            translateY = 0;
          } else {
            const exitProgress = (localProgress - 0.75) / 0.25;
            opacity = 1 - exitProgress;
            translateY = -exitProgress * 20;
          }
        }
      } else if (progress > endProgress && isFinalChapter) {
        // Hold final chapter at 100% when at or past progress 1.0
        opacity = 1;
        translateY = 0;
      }

      el.style.opacity = opacity;
      el.style.transform = `translateY(${translateY}px)`;
      el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
    });

    if (chapterBadgeRef.current) {
      chapterBadgeRef.current.textContent = activeChapterNum;
    }
  };

  // Canvas resize handler (DPR-aware)
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    renderFrame(currentFrameIndexRef.current);
  };

  useEffect(() => {
    isComponentActiveRef.current = true;

    // 1. Initial Canvas Buffer Sizing
    resizeCanvas();

    // 2. Preload Helper
    const preloadImage = (index) => {
      return new Promise((resolve) => {
        if (!isComponentActiveRef.current || imagesCacheRef.current[index]) return resolve();

        const img = new Image();
        img.src = ALL_FRAMES[index];
        img.decoding = 'async';

        img.onload = () => {
          if (!isComponentActiveRef.current) return resolve();
          imagesCacheRef.current[index] = img;

          if (index === 0) {
            lastDrawnImageRef.current = img;
            renderFrame(0);
          }

          if (currentFrameIndexRef.current === index) {
            renderFrame(index);
          }
          resolve();
        };

        img.onerror = () => resolve();
      });
    };

    // 3. Immediately load Frame 001
    preloadImage(0);

    // 4. Preload Priority Early Batch (Frames 1 to 45)
    const priorityPromises = [];
    for (let i = 1; i <= 45 && i < TOTAL_FRAMES; i++) {
      priorityPromises.push(preloadImage(i));
    }

    Promise.all(priorityPromises).then(() => {
      if (!isComponentActiveRef.current) return;

      // 5. Progressive Non-blocking Background Queue for Remaining Frames (46 to 599)
      let nextFrame = 46;
      const batchSize = 25;

      const loadNextBatch = () => {
        if (!isComponentActiveRef.current || nextFrame >= TOTAL_FRAMES) return;

        const batch = [];
        for (let i = 0; i < batchSize && nextFrame < TOTAL_FRAMES; i++, nextFrame++) {
          batch.push(preloadImage(nextFrame));
        }

        Promise.all(batch).then(() => {
          if (!isComponentActiveRef.current || nextFrame >= TOTAL_FRAMES) return;

          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => loadNextBatch(), { timeout: 100 });
          } else {
            setTimeout(loadNextBatch, 20);
          }
        });
      };

      loadNextBatch();
    });

    // 6. Master GSAP ScrollTrigger Pinned Sequence
    let triggerInstance = null;

    if (!prefersReducedMotion()) {
      const section = sectionRef.current;
      const pinEl = pinRef.current;

      if (section && pinEl) {
        triggerInstance = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=6500', // Pinned cinematic scroll distance
          pin: pinEl,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * TOTAL_FRAMES)));

            currentFrameIndexRef.current = frameIndex;
            renderFrame(frameIndex);
            updateStory(progress);
          },
          onRefresh: () => {
            renderFrame(currentFrameIndexRef.current);
          },
        });
      }
    }

    // 7. Window Resize Listener
    const handleResize = () => {
      resizeCanvas();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isComponentActiveRef.current = false;
      window.removeEventListener('resize', handleResize);
      if (triggerInstance) triggerInstance.kill();
    };
  }, []);

  // Reduced motion alternative: static visual
  if (prefersReducedMotion()) {
    return (
      <section className="relative w-full h-screen bg-bg-dark overflow-hidden flex items-center justify-center">
        <img
          src={ALL_FRAMES[0]}
          alt="Atelier Vauquelin Architectural Monograph"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-black/40 to-transparent flex items-center justify-center p-6 text-center text-white">
          <div className="max-w-3xl space-y-6">
            <span className="editorial-eyebrow text-accent-brass">Atelier Vauquelin</span>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-tight">
              WE DON'T JUST<br />DESIGN SPACES.
            </h1>
            <p className="text-white/80 font-sans text-sm sm:text-base font-light max-w-xl mx-auto">
              We shape how a space feels, functions and lives.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-brass hover:bg-accent-brass-hover text-white font-sans text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-bg-dark overflow-hidden"
    >
      {/* Pinned 100vh Viewport Wrapper */}
      <div
        ref={pinRef}
        className="relative w-full h-[100vh] h-[100svh] overflow-hidden bg-bg-dark select-none"
      >
        {/* Instant Fallback Image (guarantees Frame 1 is visible on initial zero-scroll) */}
        <img
          ref={initialImgRef}
          src={ALL_FRAMES[0]}
          alt="Atelier Vauquelin Frame 001"
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 pointer-events-none"
        />

        {/* Master Rendering Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover z-10"
        />

        {/* Cinematic Vignette Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none z-20" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-20" />

        {/* Top-Right Chapter Indicator */}
        <div className="absolute top-24 sm:top-28 right-6 sm:right-12 z-30 pointer-events-none">
          <div className="px-3.5 py-1.5 bg-[#1B2A47]/70 backdrop-blur-md border border-[#35435B] text-[#D4AF37] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold">
            <span ref={chapterBadgeRef}>01 / 09</span>
          </div>
        </div>

        {/* Initial Scroll Prompt (Fades out when scrolling begins) */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 z-30 flex items-center gap-2 text-[#D9DCE2] transition-opacity duration-150"
        >
          <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
        </div>

        {/* ---------------- 9 STORYTELLING CHAPTERS ---------------- */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {CHAPTERS.map((chap, idx) => (
            <div
              key={chap.id}
              ref={(el) => (chapterElementsRef.current[idx] = el)}
              className="absolute left-6 sm:left-14 lg:left-24 bottom-16 sm:bottom-24 lg:bottom-28 max-w-2xl text-left pointer-events-none transition-transform duration-100 ease-out"
              style={{
                opacity: idx === 0 ? 1 : 0,
                transform: idx === 0 ? 'translateY(0px)' : 'translateY(25px)',
              }}
            >
              {/* Studio Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3 text-[#D4AF37] font-sans text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold">
                <span className="w-2 h-px bg-[#D4AF37]" />
                <span>Atelier Vauquelin • Chapter {chap.number}</span>
              </div>

              {/* Large Display Heading in Cormorant Garamond */}
              <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#FDFBF7] font-normal leading-[1.04] tracking-tight whitespace-pre-line mb-4">
                {chap.heading}
              </h2>

              {/* Supporting Text in Plus Jakarta Sans */}
              <p className="font-sans text-xs sm:text-base lg:text-lg text-[#D9DCE2] max-w-xl font-light leading-relaxed mb-6">
                {chap.supporting}
              </p>

              {/* Chapter 09 Interactive Call to Action Button */}
              {chap.cta && (
                <div className="pt-2 pointer-events-auto">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FDFBF7] hover:bg-[#D4AF37] text-[#1B2A47] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lift group"
                  >
                    <span>Start a Conversation</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Subtle Brass Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-[#D4AF37] transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>

      </div>
    </div>
  );
}

export default ImmersiveSequenceHero;
