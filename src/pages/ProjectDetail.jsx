import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2, Compass, Layers, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import ProjectCard from '../components/cards/ProjectCard';
import SEO from '../components/seo/SEO';
import { projects } from '../data/studioData';
import { prefersReducedMotion, isTouchOrMobile, ANIM } from '../utils/animations';

export function ProjectDetail() {
  const { slug } = useParams();
  const containerRef = useRef(null);
  const heroImageRef = useRef(null);

  const projectIndex = projects.findIndex((p) => p.slug === slug || p.id === slug);
  const project = projects[projectIndex !== -1 ? projectIndex : 0];

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const galleryItems = project?.gallery?.map((item) => {
    if (typeof item === 'string') {
      return { url: item, caption: `${project.title} Architectural Detail` };
    }
    return item;
  }) || [];

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextLightboxImage = useCallback(() => {
    if (lightboxIndex !== null && galleryItems.length > 0) {
      setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
    }
  }, [lightboxIndex, galleryItems.length]);

  const prevLightboxImage = useCallback(() => {
    if (lightboxIndex !== null && galleryItems.length > 0) {
      setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    }
  }, [lightboxIndex, galleryItems.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) {
      nextLightboxImage();
    } else if (deltaX < -50) {
      prevLightboxImage();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextLightboxImage, prevLightboxImage]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchOrMobile() || !project) return;

    const ctx = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { y: 0, scale: 1.05 },
          {
            y: 80,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: heroImageRef.current.parentElement,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      const sections = containerRef.current?.querySelectorAll('.gsap-reveal-section');
      sections?.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.gsap-reveal-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: ANIM.duration.normal,
            stagger: 0.08,
            ease: ANIM.ease.editorial,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="editorial-container py-32 text-center">
        <SEO title="Project Not Found" description="The requested project is not in our portfolio ledger." />
        <h1 className="font-editorial text-4xl text-ink-primary mb-4">Project Not Found</h1>
        <p className="text-ink-muted mb-8">The project you requested is not currently active in our portfolio ledger.</p>
        <Button to="/projects" variant="primary">Return to Archive</Button>
      </div>
    );
  }

  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const sameCategoryProjects = projects.filter((p) => p.id !== project.id && p.category === project.category);
  const otherProjects = projects.filter((p) => p.id !== project.id && p.category !== project.category);
  const relatedProjects = [...sameCategoryProjects, ...otherProjects].slice(0, 3);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": project.title,
    "description": project.subtitle,
    "image": project.heroImage,
    "creator": {
      "@type": "Organization",
      "name": "Atelier Vauquelin"
    },
    "locationCreated": {
      "@type": "Place",
      "name": project.location
    },
    "dateCreated": project.year
  };

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden">
      <SEO
        title={`${project.title} — ${project.location}`}
        description={`${project.subtitle} Designed by Atelier Vauquelin (${project.year}). Built area: ${project.area}.`}
        image={project.heroImage}
        type="article"
        schema={projectSchema}
      />

      {/* 1. TOP BREADCRUMB STRIP (#F1ECE3 Warm Section) */}
      <div className="bg-bg-warm border-b border-border-warm/60 py-3.5">
        <div className="editorial-container flex flex-wrap items-center justify-between gap-2 font-sans text-xs">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-ink-muted hover:text-ink-primary transition-colors min-h-[44px] font-semibold uppercase tracking-wider text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio Archive</span>
          </Link>
          <div className="flex items-center gap-3 font-medium uppercase tracking-wider text-[11px]">
            <span className="text-accent-brass font-semibold">{project.category}</span>
            <span className="text-ink-subtle">•</span>
            <span className="text-ink-subtle">{project.year}</span>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH HERO IMAGE (#181816 Dark) */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] flex items-end bg-bg-dark overflow-hidden border-b border-border-dark">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={heroImageRef}
            src={project.heroImage || project.thumbnail}
            alt={`${project.title} Architectural Masterpiece in ${project.location}`}
            className="w-full h-full object-cover object-center will-change-transform max-w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
        </div>

        <div className="editorial-container relative z-10 py-12 sm:py-16 lg:py-24 text-white">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-sans text-xs uppercase tracking-widest text-accent-brass">
              <span className="bg-accent-brass/20 backdrop-blur-md px-3 py-1 border border-accent-brass/40 text-white font-semibold text-[11px]">
                {project.category}
              </span>
              <span>•</span>
              <span className="text-white/80">{project.location}</span>
              <span>•</span>
              <span className="text-white/80">Area: {project.area}</span>
              <span>•</span>
              <span className="text-white/80">{project.year}</span>
            </div>

            {/* Main Page Heading (Single H1) */}
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.06] tracking-tight text-white">
              {project.title}
            </h1>

            <p className="text-white/85 text-base sm:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 3. PROJECT LEDGER SPECS & NARRATIVE BLOCKS (#FAF9F5 with #FFFFFF Spec Cards) */}
      <div className="gsap-reveal-section">
        <Section variant="default" spacing="loose">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left Column: Technical Ledger Specs (#FFFFFF Surface Box) */}
            <div className="lg:col-span-4 space-y-8 gsap-reveal-item">
              <div className="bg-bg-surface p-6 sm:p-8 border border-border-light shadow-subtle space-y-6">
                <h2 className="font-sans text-xs uppercase tracking-widest text-accent-brass border-b border-border-light pb-3 font-semibold">
                  Project Ledger & Coordinates
                </h2>

                <div className="space-y-4 text-xs font-sans">
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <span className="text-ink-subtle uppercase tracking-wider text-[11px]">Location</span>
                    <span className="text-ink-primary font-medium">{project.location}</span>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <span className="text-ink-subtle uppercase tracking-wider text-[11px]">Completion</span>
                    <span className="text-ink-primary font-medium">{project.year}</span>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <span className="text-ink-subtle uppercase tracking-wider text-[11px]">Typology</span>
                    <span className="text-ink-primary font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <span className="text-ink-subtle uppercase tracking-wider text-[11px]">Gross Area</span>
                    <span className="text-ink-primary font-medium">{project.area}</span>
                  </div>
                  <div className="flex justify-between border-b border-border-light pb-2">
                    <span className="text-ink-subtle uppercase tracking-wider text-[11px]">Commission</span>
                    <span className="text-ink-primary font-medium">{project.client}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-ink-subtle uppercase tracking-wider text-[11px] block mb-1">Studio Scope</span>
                    <p className="text-ink-primary font-sans text-xs leading-relaxed font-light">{project.scope}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    to="/contact"
                    variant="primary"
                    size="sm"
                    arrow
                    className="w-full justify-center"
                  >
                    Enquire About Similar Work
                  </Button>
                </div>
              </div>

              {/* Credits Block (#F1ECE3 Warm Box) */}
              {project.credits && (
                <div className="bg-bg-warm p-6 sm:p-8 border border-border-warm/60 space-y-4">
                  <h3 className="font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                    Collaboration Credits
                  </h3>
                  <div className="space-y-3 text-xs font-sans">
                    <div>
                      <span className="text-ink-subtle uppercase tracking-wider text-[10px] block">Lead Architect:</span>
                      <span className="text-ink-primary font-medium">{project.credits.leadArchitect}</span>
                    </div>
                    <div>
                      <span className="text-ink-subtle uppercase tracking-wider text-[10px] block">Interior Director:</span>
                      <span className="text-ink-primary font-medium">{project.credits.interiorDirector}</span>
                    </div>
                    <div>
                      <span className="text-ink-subtle uppercase tracking-wider text-[10px] block">Executive Contractor:</span>
                      <span className="text-ink-primary font-medium">{project.credits.contractor || project.credits.structuralEngineers || 'Atelier Engineering Group'}</span>
                    </div>
                    <div>
                      <span className="text-ink-subtle uppercase tracking-wider text-[10px] block">Photography:</span>
                      <span className="text-ink-primary font-medium">{project.credits.photographer || project.credits.photography}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: 3 Structured Narrative Blocks */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              
              {/* Executive Summary */}
              <div className="space-y-4 gsap-reveal-item">
                <span className="editorial-eyebrow">Case Study Overview</span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-ink-primary font-normal leading-tight">
                  Architectural Intent & Tectonic Resolution
                </h2>
                <p className="text-ink-muted text-base sm:text-lg lg:text-xl font-light leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* 3 Structured Narrative Blocks (#FFFFFF Surface Tiles) */}
              <div className="grid grid-cols-1 gap-6 sm:gap-8 pt-2">
                
                {/* 1. The Challenge */}
                <div className="p-6 sm:p-8 bg-bg-surface border border-border-light shadow-subtle space-y-3">
                  <div className="flex items-center gap-2 font-sans text-xs text-accent-brass uppercase tracking-widest font-semibold">
                    <Compass className="w-4 h-4" />
                    <span>01 / The Challenge</span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-ink-primary font-normal">
                    Site Constraints, Climate & Programmatic Ambition
                  </h3>
                  <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-light">
                    {project.narrative?.challenge || "Balancing the demanding climatic exposure of the local terrain with the client's aspiration for acoustic calm, low-embodied carbon, and timeless spatial flow."}
                  </p>
                </div>

                {/* 2. The Concept */}
                <div className="p-6 sm:p-8 bg-bg-surface border border-border-light shadow-subtle space-y-3">
                  <div className="flex items-center gap-2 font-sans text-xs text-accent-brass uppercase tracking-widest font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>02 / The Concept</span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-ink-primary font-normal">
                    Geological Topography & Material Stratification
                  </h3>
                  <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-light">
                    {project.narrative?.concept || project.concept || "A horizontal composition yielding to the surrounding natural contours, utilizing raw mineral textures and unlacquered metals to establish an enduring dialogue with the landscape."}
                  </p>
                </div>

                {/* 3. The Solution */}
                <div className="p-6 sm:p-8 bg-bg-surface border border-border-light shadow-subtle space-y-3">
                  <div className="flex items-center gap-2 font-sans text-xs text-accent-brass uppercase tracking-widest font-semibold">
                    <Layers className="w-4 h-4" />
                    <span>03 / The Solution</span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-ink-primary font-normal">
                    Passive Thermal Comfort, Bespoke Joinery & Execution
                  </h3>
                  <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-light">
                    {project.narrative?.solution || "Integrating high thermal mass stone construction with deep shaded loggias, custom French walnut joinery, and concealed radiant infrastructure to ensure optimal modern performance."}
                  </p>
                </div>

              </div>

            </div>
          </div>
        </Section>
      </div>

      {/* 4. IMAGE GALLERY GRID (#FFFFFF Surface Section) */}
      <div className="gsap-reveal-section">
        <Section
          variant="surface"
          spacing="loose"
          eyebrow="Visual Documentation"
          title="Spatial Photography & Material Details"
          subtitle="Tap or click any photograph to enter the full-screen interactive lightbox viewer."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="gsap-reveal-item group relative cursor-pointer overflow-hidden border border-border-light bg-bg-warm active:scale-[0.99] transition-transform shadow-subtle"
              >
                <div className="img-zoom-wrapper aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.url}
                    alt={`${project.title} — Detail Plate 0${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover max-w-full"
                  />
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                  <div className="flex items-center justify-between font-sans text-[11px] text-accent-brass uppercase tracking-wider font-semibold">
                    <span>Plate 0{idx + 1}</span>
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-white/90 font-light">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* 5. LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-50 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-sans text-xs tracking-wider">
              <span className="text-accent-brass uppercase font-semibold">{project.title}</span> •{' '}
              <span className="text-white/60">
                0{lightboxIndex + 1} / 0{galleryItems.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="w-11 h-11 border border-white/20 hover:border-accent-brass hover:bg-accent-brass flex items-center justify-center text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 bg-black/50 hover:border-accent-brass hover:bg-accent-brass text-white items-center justify-center transition-colors z-50"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-6xl max-h-[80vh] flex flex-col items-center justify-center px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[lightboxIndex]?.url}
              alt={`${project.title} Gallery Enlargement 0${lightboxIndex + 1}`}
              className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain shadow-2xl border border-white/10"
            />
            {galleryItems[lightboxIndex]?.caption && (
              <p className="mt-4 text-center font-sans text-xs sm:text-sm text-white/80 max-w-2xl font-light">
                {galleryItems[lightboxIndex]?.caption}
              </p>
            )}
            <p className="sm:hidden font-sans text-[10px] uppercase tracking-wider text-white/40 mt-2">
              ← Swipe left or right to browse →
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 bg-black/50 hover:border-accent-brass hover:bg-accent-brass text-white items-center justify-center transition-colors z-50"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* 6. DYNAMIC NEXT / PREVIOUS NAVIGATION BAR (#F1ECE3 Warm Section) */}
      <section className="border-y border-border-warm/60 bg-bg-warm py-8 sm:py-10">
        <div className="editorial-container grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-border-warm/60">
          
          <Link
            to={`/projects/${prevProject.slug}`}
            className="group flex flex-col text-left pb-4 md:pb-0 md:pr-8 min-h-[44px]"
          >
            <span className="font-sans text-xs font-semibold text-ink-subtle uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-accent-brass" />
              Previous Case Study
            </span>
            <span className="font-editorial text-xl sm:text-2xl lg:text-3xl text-ink-primary group-hover:text-accent-brass transition-colors leading-tight font-normal">
              {prevProject.title}
            </span>
            <span className="font-sans text-[11px] text-ink-subtle mt-1 uppercase tracking-wider">
              {prevProject.location} • {prevProject.category}
            </span>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex flex-col text-left md:text-right pt-4 md:pt-0 md:pl-8 min-h-[44px]"
          >
            <span className="font-sans text-xs font-semibold text-ink-subtle uppercase tracking-widest mb-1.5 flex items-center md:justify-end gap-1.5">
              Next Case Study
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-accent-brass" />
            </span>
            <span className="font-editorial text-xl sm:text-2xl lg:text-3xl text-ink-primary group-hover:text-accent-brass transition-colors leading-tight font-normal">
              {nextProject.title}
            </span>
            <span className="font-sans text-[11px] text-ink-subtle mt-1 uppercase tracking-wider">
              {nextProject.location} • {nextProject.category}
            </span>
          </Link>

        </div>
      </section>

      {/* 7. RELATED PROJECTS MODULE (#FAF9F5 with #FFFFFF Cards) */}
      <div className="gsap-reveal-section">
        <Section
          variant="default"
          eyebrow="Related Commissions"
          title="Further Works in this Typology"
          subtitle={`Explore similar ${project.category.toLowerCase()} architecture and interior spatial executions.`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedProjects.map((p) => (
              <div key={p.id} className="gsap-reveal-item">
                <ProjectCard project={p} aspectRatio="aspect-[4/3]" showSummary />
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* 8. ENQUIRE ABOUT A SIMILAR PROJECT CTA (#181816 Dark Premium Section) */}
      <section className="bg-bg-dark text-white border-t border-border-dark py-20 sm:py-24 text-center">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="editorial-eyebrow text-accent-brass">Start a Project Brief</span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight">
            Enquire about a commission like {project.title}.
          </h2>
          <p className="text-ink-subtle text-sm sm:text-base lg:text-lg font-light leading-relaxed">
            Our principal architects will discuss site feasibility, planning regulations, and bespoke material palettes for your private residence or cultural space.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Initiate Project Brief
            </Button>
            <Button to="/projects" variant="outline" size="lg" className="border-border-dark text-white hover:bg-white hover:text-ink-primary">
              Return to Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetail;
