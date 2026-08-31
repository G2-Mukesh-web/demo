import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Building, Palette, ShieldCheck, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import ImmersiveSequenceHero from '../components/home/ImmersiveSequenceHero';
import SEO from '../components/seo/SEO';
import { studioInfo, projects } from '../data/studioData';
import { prefersReducedMotion, isTouchOrMobile, ANIM } from '../utils/animations';

export function Home() {
  const containerRef = useRef(null);

  // Selected 4 curated architectural works for the Deep Navy section
  const selectedProjects = projects.slice(0, 4);

  // 4 Core Studio Services
  const coreServices = [
    {
      number: '01',
      title: 'Architecture',
      icon: Building,
      tagline: 'Site-responsive monoliths and spatial envelopes.',
      description: 'End-to-end architectural direction from site topography and geotechnical studies to structural massing, planning permissions, and precision execution.',
      link: '/services#architecture',
    },
    {
      number: '02',
      title: 'Interior Design',
      icon: Palette,
      tagline: 'Tactile material curation and custom millwork.',
      description: 'Custom joinery packages, artisanal plaster finishes, unlacquered bronze hardware, and gallery-grade furniture curation for serene living environments.',
      link: '/services#interior-architecture',
    },
    {
      number: '03',
      title: 'Turnkey / Design-Build',
      icon: ShieldCheck,
      tagline: 'Seamless coordination from concept to key handover.',
      description: 'Comprehensive project stewardship managing architectural engineering, contractor tenders, artisan coordination, and on-site construction oversight.',
      link: '/services#turnkey-direction',
    },
    {
      number: '04',
      title: 'Consultation',
      icon: MessageSquare,
      tagline: 'Feasibility, heritage preservation and masterplanning.',
      description: 'Pre-acquisition site assessments, historic listed-building restoration advisory, and acoustic/thermal optimization consultations.',
      link: '/services#heritage-conservation',
    },
  ];

  // 3 Provided Philosophy Pillars for Transforming Spaces
  const philosophyPillars = [
    {
      number: '01',
      title: 'Elevating Everyday Living',
      text: 'Elevating everyday living through thoughtful and timeless interior design.',
    },
    {
      number: '02',
      title: 'Bespoke Design Solutions',
      text: 'Bespoke design solutions crafted to bring your vision to life.',
    },
    {
      number: '03',
      title: 'Balancing Aesthetics & Comfort',
      text: 'Creating beautiful homes that balance modern aesthetics with everyday comfort.',
    },
  ];

  // GSAP ScrollTrigger reveals for content sections
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const revealSections = containerRef.current?.querySelectorAll('.gsap-reveal-section');
      revealSections?.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.gsap-reveal-item'),
          { opacity: 0, y: isTouchOrMobile() ? 20 : 35 },
          {
            opacity: 1,
            y: 0,
            duration: isTouchOrMobile() ? 0.5 : ANIM.duration.normal,
            stagger: 0.08,
            ease: ANIM.ease.editorial,
            scrollTrigger: {
              trigger: section,
              start: isTouchOrMobile() ? 'top 92%' : 'top 82%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Organization Schema (JSON-LD)
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'ArchitecturalFirm',
    name: studioInfo.name,
    description: studioInfo.heroStatement,
    url: 'https://ateliervauquelin.com',
    logo: 'https://ateliervauquelin.com/logo.png',
    founder: [
      { '@type': 'Person', name: 'Camille Vauquelin' },
      { '@type': 'Person', name: 'Édouard Laurent' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: "18 Rue de l'Odéon",
      addressLocality: 'Paris',
      postalCode: '75006',
      addressCountry: 'FR',
    },
    telephone: '+33142689010',
  };

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden bg-[#FDFBF7] text-[#1B2A47]">
      <SEO
        title="Architecture & Interior Design Studio"
        description="Atelier Vauquelin authors silent residential monuments, bespoke interior sanctuaries, and timeless architecture across Paris, London, and Geneva."
        schema={homeSchema}
      />

      {/* -------------------------------------------------------------
          01. IMMERSIVE 600-FRAME SCROLL HERO WITH 9 STORY CHAPTERS
          ------------------------------------------------------------- */}
      <ImmersiveSequenceHero />

      {/* -------------------------------------------------------------
          02. STUDIO INTRODUCTION (Ivory #FDFBF7)
          ------------------------------------------------------------- */}
      <section className="bg-[#FDFBF7] py-24 sm:py-32 border-b border-[#E5E0D6]">
        <div className="editorial-container max-w-5xl">
          <div className="space-y-6">
            <span className="editorial-eyebrow text-[#D4AF37] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              The Studio
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#1B2A47] font-normal leading-[1.08] tracking-tight">
              Designing Spaces with Purpose.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start border-t border-[#E5E0D6]">
              <p className="md:col-span-8 text-[#5F6470] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
                Operating across Paris, London, and Geneva, Atelier Vauquelin shapes bespoke residential architecture and interior environments grounded in material honesty, structural clarity, and quiet natural light.
              </p>
              <div className="md:col-span-4 md:text-right pt-2">
                <Button to="/about" variant="outline" size="md" arrow>
                  Read Studio Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          03. SELECTED PROJECTS — SIGNATURE DEEP NAVY (#1B2A47)
          ------------------------------------------------------------- */}
      <section className="bg-[#1B2A47] text-[#FDFBF7] py-24 sm:py-32 border-b border-[#35435B]">
        <div className="editorial-container">
          
          {/* Deep Navy Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#35435B]">
            <div className="max-w-2xl space-y-3">
              <span className="editorial-eyebrow text-[#D4AF37] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
                Selected Portfolio
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#FDFBF7] font-normal leading-tight">
                Curated Built Works & Spatial Concepts
              </h2>
              <p className="text-[#D9DCE2] text-sm sm:text-base font-light">
                A selection of private residences, alpine wellness sanctuaries, and heritage restorations.
              </p>
            </div>
            <div className="shrink-0">
              <Button to="/projects" variant="white" size="sm" arrow>
                View All Projects ({projects.length})
              </Button>
            </div>
          </div>

          {/* Large Architectural Photography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {selectedProjects.map((project, idx) => (
              <div key={project.id} className="gsap-reveal-item">
                <article className="group block relative bg-[#233352] border border-[#35435B] overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/60">
                  <Link to={`/projects/${project.slug}`} className="block">
                    
                    {/* Large Photography with subtle 1.03x scale */}
                    <div className="aspect-[16/10] bg-[#121E33] relative overflow-hidden">
                      <img
                        src={project.heroImage || project.thumbnail}
                        alt={`${project.title} — ${project.location}`}
                        loading="lazy"
                        className="w-full h-full object-cover max-w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {/* Project Number / Category Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="inline-block bg-[#1B2A47]/90 backdrop-blur-sm text-[#D4AF37] font-sans text-[10px] font-semibold tracking-wider uppercase px-3 py-1 border border-[#35435B]">
                          0{idx + 1} • {project.category}
                        </span>
                        <span className="inline-block bg-black/40 backdrop-blur-sm text-[#FDFBF7] font-sans text-[9px] uppercase tracking-widest px-2.5 py-1">
                          Concept Visual
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#D9DCE2]">
                        <span>{project.location}</span>
                        <span className="text-[#D4AF37] font-medium">{project.year}</span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors leading-snug font-normal">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#D9DCE2] line-clamp-2 leading-relaxed font-light">
                        {project.subtitle}
                      </p>

                      <div className="pt-4 border-t border-[#35435B] flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-wider text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors">
                        <span>Explore Case Study</span>
                        <ArrowUpRight className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                </article>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button to="/projects" variant="white" size="lg" arrow>
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          04. SERVICES SECTION — IVORY (#FDFBF7)
          ------------------------------------------------------------- */}
      <section className="bg-[#FDFBF7] py-24 sm:py-32 border-b border-[#E5E0D6]">
        <div className="editorial-container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#E5E0D6]">
            <div className="max-w-2xl space-y-3">
              <span className="editorial-eyebrow text-[#D4AF37] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
                Practice Scope
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1B2A47] font-normal leading-tight">
                Comprehensive Spatial Services
              </h2>
              <p className="text-[#5F6470] text-sm sm:text-base font-light">
                From early concept sketches to turnkey construction oversight and interior curation.
              </p>
            </div>
            <div className="shrink-0">
              <Button to="/services" variant="outline" size="sm" arrow>
                Explore Services Overview
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.number}
                  className="gsap-reveal-item p-6 sm:p-8 bg-[#FFFFFF] border border-[#E5E0D6] hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group space-y-6 shadow-subtle"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-editorial text-2xl text-[#D4AF37] font-normal">{svc.number}</span>
                      <Icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>

                    <h3 className="font-editorial text-2xl text-[#1B2A47] group-hover:text-[#D4AF37] transition-colors font-normal">
                      {svc.title}
                    </h3>

                    <p className="font-editorial text-sm italic text-[#5F6470]">
                      "{svc.tagline}"
                    </p>

                    <p className="text-xs text-[#5F6470] leading-relaxed font-light pt-1">
                      {svc.description}
                    </p>
                  </div>

                  <Link
                    to={svc.link}
                    className="inline-flex items-center justify-between text-xs font-sans font-semibold uppercase tracking-wider text-[#1B2A47] group-hover:text-[#D4AF37] transition-colors pt-4 border-t border-[#E5E0D6] min-h-[44px]"
                  >
                    <span>View Discipline</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button to="/services" variant="outline" size="md" arrow>
              Explore Services →
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          05. "TRANSFORMING SPACES" — SIGNATURE DEEP NAVY (#1B2A47)
          ------------------------------------------------------------- */}
      <section className="bg-[#1B2A47] text-[#FDFBF7] py-24 sm:py-32 border-b border-[#35435B]">
        <div className="editorial-container max-w-5xl space-y-16">
          
          {/* Main Statement */}
          <div className="space-y-4 text-center sm:text-left gsap-reveal-item">
            <span className="editorial-eyebrow text-[#D4AF37] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              Transforming Spaces
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#FDFBF7] font-normal leading-[1.12] tracking-tight">
              Transforming spaces into personalized sanctuaries that fit your lifestyle.
            </h2>
          </div>

          {/* 3 Numbered Supporting Points with Warm Brass Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-[#35435B]">
            {philosophyPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="gsap-reveal-item bg-[#233352] p-6 sm:p-8 border border-[#35435B] shadow-subtle space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-editorial text-3xl text-[#D4AF37] font-normal block">
                    {pillar.number}
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#FDFBF7] font-normal leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D9DCE2] leading-relaxed font-light">
                    {pillar.text}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#35435B] font-sans text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Studio Principle</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          06. FINAL CTA — IVORY (#FDFBF7) WITH DEEP NAVY BUTTON
          ------------------------------------------------------------- */}
      <section className="bg-[#FDFBF7] text-[#1B2A47] border-t border-[#E5E0D6] py-24 sm:py-32 text-center relative overflow-hidden">
        <div className="editorial-container max-w-3xl space-y-6 relative z-10">
          <span className="editorial-eyebrow text-[#D4AF37] font-sans text-xs font-semibold uppercase tracking-[0.2em]">
            Initiate a Commission
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-[#1B2A47]">
            Ready to Create Your Space?
          </h2>
          <p className="text-[#5F6470] font-sans text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Let's turn your vision into a space that feels distinctly yours.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Start a Conversation
            </Button>
            <Button to="/projects" variant="outline" size="lg">
              Browse Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          07. EXISTING FOOTER (Rendered by Layout Shell in Deep Navy #1B2A47)
          ------------------------------------------------------------- */}
    </div>
  );
}

export default Home;
