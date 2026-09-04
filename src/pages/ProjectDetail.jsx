import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Sparkles, Layers, Maximize2, X, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
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
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroImageRef = useRef(null);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  const galleryItems = project?.gallery || [];

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextLightboxImage = useCallback(() => {
    if (galleryItems.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const prevLightboxImage = useCallback(() => {
    if (galleryItems.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
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
        <SEO title="Project Not Found" description="The requested project is not in our portfolio." />
        <h1 className="font-editorial text-4xl text-ink-primary mb-4">Project Not Found</h1>
        <p className="text-ink-muted mb-8">The project you requested is not currently available.</p>
        <Button to="/projects" variant="primary">View All Projects</Button>
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
    <div ref={containerRef} className="w-full overflow-x-hidden bg-[#303A35] text-[#F5F3ED]">
      <SEO
        title={`${project.title} — ${project.location}`}
        description={`${project.subtitle} Designed by Atelier Vauquelin (${project.year}). Built area: ${project.area}.`}
        image={project.heroImage}
        type="article"
        schema={projectSchema}
      />

      {/* 1. TOP BREADCRUMB STRIP */}
      <div className="bg-[#1D211F] border-b border-[rgba(245,243,237,0.10)] py-3.5">
        <div className="editorial-container flex flex-wrap items-center justify-between gap-2 font-sans text-xs">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[#A3ADA7] hover:text-[#F5F3ED] transition-colors min-h-[44px] font-semibold uppercase tracking-wider text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C27D66]" />
            <span>All Projects</span>
          </Link>
          <div className="flex items-center gap-3 font-medium uppercase tracking-wider text-[11px]">
            <span className="text-[#C27D66] font-semibold">{project.category}</span>
            <span className="text-[#A3ADA7]">•</span>
            <span className="text-[#A3ADA7]">{project.year}</span>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH HERO IMAGE (Deep Forest Black #1D211F) */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] flex items-end bg-[#1D211F] overflow-hidden border-b border-[rgba(245,243,237,0.10)]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={heroImageRef}
            src={project.heroImage || project.thumbnail}
            alt={`${project.title} in ${project.location}`}
            className="w-full h-full object-cover object-center will-change-transform max-w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D211F]/95 via-[#1D211F]/50 to-[#1D211F]/20" />
        </div>

        <div className="editorial-container relative z-10 py-12 sm:py-16 lg:py-24 text-white">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-sans text-xs uppercase tracking-widest text-[#C27D66]">
              <span className="bg-[#1D211F]/80 backdrop-blur-md px-3 py-1 border border-[#C27D66]/40 text-[#F5F3ED] font-semibold text-[11px] rounded-[2px]">
                {project.category}
              </span>
              <span>•</span>
              <span className="text-[#F5F3ED]/90">{project.location}</span>
              <span>•</span>
              <span className="text-[#F5F3ED]/90">Area: {project.area}</span>
              <span>•</span>
              <span className="text-[#F5F3ED]/90">{project.year}</span>
            </div>

            {/* Main Page Heading */}
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.06] tracking-tight text-[#F5F3ED]">
              {project.title}
            </h1>

            <p className="text-[#F5F3ED]/90 text-base sm:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 3. PROJECT SPECS & NARRATIVE BLOCKS */}
      <div className="gsap-reveal-section bg-[#303A35] text-[#F5F3ED]">
        <section className="py-20 md:py-28 lg:py-32">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Left Column: Technical Specs Box */}
              <div className="lg:col-span-4 space-y-8 gsap-reveal-item">
                <div className="bg-[#242C28] p-6 sm:p-8 border border-[rgba(245,243,237,0.12)] shadow-subtle space-y-6 rounded-[2px]">
                  <h2 className="font-sans text-xs uppercase tracking-widest text-[#C27D66] border-b border-[rgba(245,243,237,0.12)] pb-3 font-semibold">
                    Project Details
                  </h2>

                  <div className="space-y-4 text-xs font-sans">
                    <div className="flex justify-between border-b border-[rgba(245,243,237,0.12)] pb-2">
                      <span className="text-[#A3ADA7] uppercase tracking-wider text-[11px]">Location</span>
                      <span className="text-[#F5F3ED] font-medium">{project.location}</span>
                    </div>
                    <div className="flex justify-between border-b border-[rgba(245,243,237,0.12)] pb-2">
                      <span className="text-[#A3ADA7] uppercase tracking-wider text-[11px]">Completed</span>
                      <span className="text-[#F5F3ED] font-medium">{project.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-[rgba(245,243,237,0.12)] pb-2">
                      <span className="text-[#A3ADA7] uppercase tracking-wider text-[11px]">Project Type</span>
                      <span className="text-[#F5F3ED] font-medium">{project.category}</span>
                    </div>
                    <div className="flex justify-between border-b border-[rgba(245,243,237,0.12)] pb-2">
                      <span className="text-[#A3ADA7] uppercase tracking-wider text-[11px]">Total Area</span>
                      <span className="text-[#F5F3ED] font-medium">{project.area}</span>
                    </div>
                    <div className="flex justify-between border-b border-[rgba(245,243,237,0.12)] pb-2">
                      <span className="text-[#A3ADA7] uppercase tracking-wider text-[11px]">Client</span>
                      <span className="text-[#F5F3ED] font-medium">{project.client}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-[#A3ADA7] uppercase tracking-wider text-[11px] block mb-1">Services Provided</span>
                      <p className="text-[#F5F3ED] font-sans text-xs leading-relaxed font-light">{project.scope}</p>
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
                      Discuss a Similar Project
                    </Button>
                  </div>
                </div>

                {/* Credits Block */}
                {project.credits && (
                  <div className="bg-[#1D211F] p-6 sm:p-8 border border-[rgba(245,243,237,0.10)] space-y-4 rounded-[2px]">
                    <h3 className="font-sans text-xs uppercase tracking-widest text-[#F5F3ED] font-semibold">
                      Project Credits
                    </h3>
                    <div className="space-y-3 text-xs font-sans">
                      <div>
                        <span className="text-[#A3ADA7] uppercase tracking-wider text-[10px] block">Lead Architect:</span>
                        <span className="text-[#F5F3ED] font-medium">{project.credits.leadArchitect}</span>
                      </div>
                      <div>
                        <span className="text-[#A3ADA7] uppercase tracking-wider text-[10px] block">Interior Director:</span>
                        <span className="text-[#F5F3ED] font-medium">{project.credits.interiorDirector}</span>
                      </div>
                      <div>
                        <span className="text-[#A3ADA7] uppercase tracking-wider text-[10px] block">Builder / Contractor:</span>
                        <span className="text-[#F5F3ED] font-medium">{project.credits.contractor || project.credits.structuralEngineers || 'Atelier Engineering Group'}</span>
                      </div>
                      <div>
                        <span className="text-[#A3ADA7] uppercase tracking-wider text-[10px] block">Photography:</span>
                        <span className="text-[#F5F3ED] font-medium">{project.credits.photographer || project.credits.photography}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: 3 Structured Narrative Blocks */}
              <div className="lg:col-span-8 space-y-10 sm:space-y-12">
                
                {/* Executive Summary */}
                <div className="space-y-4 gsap-reveal-item">
                  <span className="editorial-eyebrow text-[#C27D66]">Project Overview</span>
                  <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-normal leading-tight">
                    Design Story & Execution
                  </h2>
                  <p className="text-[#A3ADA7] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* 3 Structured Narrative Blocks */}
                <div className="grid grid-cols-1 gap-6 sm:gap-8 pt-2">
                  
                  {/* 1. The Challenge */}
                  <div className="p-6 sm:p-8 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 shadow-subtle space-y-3 rounded-[2px]">
                    <div className="flex items-center gap-2 font-sans text-xs text-[#C27D66] uppercase tracking-widest font-semibold">
                      <Compass className="w-4 h-4" />
                      <span>01 / The Challenge</span>
                    </div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#F5F3ED] font-normal">
                      Site & Client Needs
                    </h3>
                    <p className="text-[#A3ADA7] text-sm sm:text-base leading-relaxed font-light">
                      {project.narrative?.challenge || "Balancing the site location and climate with the client's desire for comfort, quiet living, and natural light."}
                    </p>
                  </div>

                  {/* 2. The Concept */}
                  <div className="p-6 sm:p-8 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 shadow-subtle space-y-3 rounded-[2px]">
                    <div className="flex items-center gap-2 font-sans text-xs text-[#C27D66] uppercase tracking-widest font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>02 / The Concept</span>
                    </div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#F5F3ED] font-normal">
                      Design Idea & Materials
                    </h3>
                    <p className="text-[#A3ADA7] text-sm sm:text-base leading-relaxed font-light">
                      {project.narrative?.concept || project.concept || "A design that fits the natural landscape, using quality local stone, natural wood, and warm metals to create a welcoming atmosphere."}
                    </p>
                  </div>

                  {/* 3. The Solution */}
                  <div className="p-6 sm:p-8 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 shadow-subtle space-y-3 rounded-[2px]">
                    <div className="flex items-center gap-2 font-sans text-xs text-[#C27D66] uppercase tracking-widest font-semibold">
                      <Layers className="w-4 h-4" />
                      <span>03 / The Solution</span>
                    </div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#F5F3ED] font-normal">
                      Execution & Daily Comfort
                    </h3>
                    <p className="text-[#A3ADA7] text-sm sm:text-base leading-relaxed font-light">
                      {project.narrative?.solution || "Using thick natural walls, smart window shading, and custom woodwork to create a home that is energy-efficient, durable, and comfortable to live in."}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. IMAGE GALLERY GRID */}
      <div className="gsap-reveal-section bg-[#1D211F] text-[#F5F3ED] py-20 md:py-28 lg:py-32 border-t border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container">
          <div className="mb-12 md:mb-16">
            <span className="editorial-eyebrow text-[#C27D66] block mb-2">Photo Gallery</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-normal">
              Project Photos & Material Details
            </h2>
            <p className="text-[#A3ADA7] text-sm sm:text-base mt-2 font-light">
              Click or tap any photo to open full screen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="gsap-reveal-item group relative cursor-pointer overflow-hidden border border-[rgba(245,243,237,0.12)] bg-[#242C28] active:scale-[0.99] transition-transform shadow-subtle rounded-[2px]"
              >
                <div className="img-zoom-wrapper aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.url}
                    alt={`${project.title} — Photo 0${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover max-w-full"
                  />
                </div>

                <div className="absolute inset-0 bg-[#1D211F]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                  <div className="flex items-center justify-between font-sans text-[11px] text-[#C27D66] uppercase tracking-wider font-semibold">
                    <span>Photo 0{idx + 1}</span>
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-white/90 font-light">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#1D211F]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
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
              <span className="text-[#C27D66] uppercase font-semibold">{project.title}</span> •{' '}
              <span className="text-[#A3ADA7]">
                0{lightboxIndex + 1} / 0{galleryItems.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="w-11 h-11 border border-white/20 hover:border-[#C27D66] hover:bg-[#C27D66] hover:text-[#1D211F] flex items-center justify-center text-white transition-colors rounded-[2px]"
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
            className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 bg-black/50 hover:border-[#C27D66] hover:bg-[#C27D66] hover:text-[#1D211F] text-white items-center justify-center transition-colors z-50 rounded-[2px]"
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
            className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 bg-black/50 hover:border-[#C27D66] hover:bg-[#C27D66] hover:text-[#1D211F] text-white items-center justify-center transition-colors z-50 rounded-[2px]"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* 6. NEXT / PREVIOUS NAVIGATION BAR */}
      <section className="border-y border-[rgba(245,243,237,0.10)] bg-[#1D211F] py-8 sm:py-10 text-[#F5F3ED]">
        <div className="editorial-container grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[rgba(245,243,237,0.10)]">
          
          <Link
            to={`/projects/${prevProject.slug}`}
            className="group flex flex-col text-left pb-4 md:pb-0 md:pr-8 min-h-[44px]"
          >
            <span className="font-sans text-xs font-semibold text-[#A3ADA7] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#C27D66]" />
              Previous Project
            </span>
            <span className="font-editorial text-xl sm:text-2xl lg:text-3xl text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors leading-tight font-normal">
              {prevProject.title}
            </span>
            <span className="font-sans text-[11px] text-[#A3ADA7] mt-1 uppercase tracking-wider">
              {prevProject.location} • {prevProject.category}
            </span>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex flex-col text-left md:text-right pt-4 md:pt-0 md:pl-8 min-h-[44px]"
          >
            <span className="font-sans text-xs font-semibold text-[#A3ADA7] uppercase tracking-widest mb-1.5 flex items-center md:justify-end gap-1.5">
              Next Project
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#C27D66]" />
            </span>
            <span className="font-editorial text-xl sm:text-2xl lg:text-3xl text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors leading-tight font-normal">
              {nextProject.title}
            </span>
            <span className="font-sans text-[11px] text-[#A3ADA7] mt-1 uppercase tracking-wider">
              {nextProject.location} • {nextProject.category}
            </span>
          </Link>

        </div>
      </section>

      {/* 7. RELATED PROJECTS MODULE */}
      <div className="gsap-reveal-section bg-[#303A35] text-[#F5F3ED] py-20 md:py-28">
        <div className="editorial-container">
          <div className="mb-12">
            <span className="editorial-eyebrow text-[#C27D66] block mb-2">Related Projects</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F3ED] font-normal">More Similar Projects</h2>
            <p className="text-[#A3ADA7] text-sm mt-1 font-light">Explore similar {project.category.toLowerCase()} architecture and interior projects.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedProjects.map((p) => (
              <div key={p.id} className="gsap-reveal-item">
                <ProjectCard project={p} aspectRatio="aspect-[4/3]" showSummary />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. ENQUIRE ABOUT A SIMILAR PROJECT CTA */}
      <section className="bg-[#1D211F] text-[#F5F3ED] border-t border-[rgba(245,243,237,0.10)] py-20 sm:py-24 text-center">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="editorial-eyebrow text-[#C27D66]">Start Your Project</span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#F5F3ED] font-normal leading-tight">
            Interested in a project like {project.title}?
          </h2>
          <p className="text-[#A3ADA7] text-sm sm:text-base lg:text-lg font-light leading-relaxed">
            Our team is ready to discuss your property, design ideas, and budget to create a space that fits your lifestyle.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Get in Touch
            </Button>
            <Button to="/projects" variant="outlineLight" size="lg">
              View All Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetail;
