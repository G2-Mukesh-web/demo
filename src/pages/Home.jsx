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
      tagline: 'Custom homes and buildings designed for their surroundings.',
      description: 'Full architectural services from site analysis and 3D concept designs to building approvals and on-site construction management.',
      link: '/services#architectural-design',
    },
    {
      number: '02',
      title: 'Interior Design',
      icon: Palette,
      tagline: 'Warm, practical interiors made with natural materials.',
      description: 'Custom cabinetry, natural wall finishes, premium hardware, and handpicked furniture for comfortable, peaceful living.',
      link: '/services#interior-architecture',
    },
    {
      number: '03',
      title: 'Turnkey Delivery',
      icon: ShieldCheck,
      tagline: 'Complete management from first sketch to final move-in.',
      description: 'We take care of everything: managing builders, coordinating artisans, tracking budgets, and supervising construction on site.',
      link: '/services#turnkey-management',
    },
    {
      number: '04',
      title: 'Consultation',
      icon: MessageSquare,
      tagline: 'Site advice, heritage permissions, and renovation planning.',
      description: 'Property evaluations before you buy, guidance for heritage and listed buildings, and advice on natural ventilation and energy savings.',
      link: '/services#heritage-restoration',
    },
  ];

  // 3 Provided Philosophy Pillars for Transforming Spaces
  const philosophyPillars = [
    {
      number: '01',
      title: 'Better Everyday Living',
      text: 'Making everyday living better with thoughtful and timeless interior design.',
    },
    {
      number: '02',
      title: 'Custom Design Solutions',
      text: 'Custom design solutions made to bring your ideas to life.',
    },
    {
      number: '03',
      title: 'Modern Style & Comfort',
      text: 'Creating beautiful homes that combine modern style with everyday comfort.',
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
      { '@type': 'Person', name: 'Rohan Mehta' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Turner Road, Bandra West',
      addressLocality: 'Mumbai',
      postalCode: '400050',
      addressCountry: 'IN',
    },
    telephone: '+912226401890',
  };

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden bg-[#303A35] text-[#F5F3ED]">
      <SEO
        title="Architecture & Interior Design Studio"
        description="Atelier Vauquelin designs custom homes, luxury villas, and warm interior spaces across Mumbai, Bengaluru, and Hyderabad."
        schema={homeSchema}
      />

      {/* -------------------------------------------------------------
          01. IMMERSIVE SCROLL HERO WITH STORY CHAPTERS (Deep Forest Black #1D211F)
          ------------------------------------------------------------- */}
      <ImmersiveSequenceHero />

      {/* -------------------------------------------------------------
          02. STUDIO INTRODUCTION (Warm Linen #EFEFEA)
          ------------------------------------------------------------- */}
      <section className="bg-[#EFEFEA] text-[#303A35] py-24 sm:py-32 border-b border-[rgba(48,58,53,0.12)]">
        <div className="editorial-container max-w-5xl">
          <div className="space-y-6">
            <span className="editorial-eyebrow text-[#C27D66] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              The Studio
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#303A35] font-normal leading-[1.08] tracking-tight">
              Designing Spaces with Purpose.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start border-t border-[rgba(48,58,53,0.12)]">
              <p className="md:col-span-8 text-[#5C6661] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
                Based in Mumbai, Bengaluru, and Hyderabad, Atelier Vauquelin designs custom homes and warm interiors built with honest materials, smart layouts, and plenty of natural light.
              </p>
              <div className="md:col-span-4 md:text-right pt-2">
                <Button to="/about" variant="outline" size="md" arrow>
                  Read Our Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          03. SELECTED PROJECTS — DEEP MUTED FOREST/SAGE (#303A35)
          ------------------------------------------------------------- */}
      <section className="bg-[#303A35] text-[#F5F3ED] py-24 sm:py-32 border-b border-[rgba(245,243,237,0.12)]">
        <div className="editorial-container">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[rgba(245,243,237,0.12)]">
            <div className="max-w-2xl space-y-3">
              <span className="editorial-eyebrow text-[#C27D66] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
                Selected Projects
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5F3ED] font-normal leading-tight">
                Featured Homes & Architecture
              </h2>
              <p className="text-[#A3ADA7] text-sm sm:text-base font-light">
                A selection of private residences, holiday retreats, and restored heritage properties.
              </p>
            </div>
            <div className="shrink-0">
              <Button to="/projects" variant="primary" size="sm" arrow>
                View All Projects ({projects.length})
              </Button>
            </div>
          </div>

          {/* Large Architectural Photography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {selectedProjects.map((project, idx) => (
              <div key={project.id} className="gsap-reveal-item">
                <article className="group block relative bg-[#242C28] border border-[rgba(245,243,237,0.12)] rounded-[2px] overflow-hidden transition-all duration-300 hover:border-[#C27D66]">
                  <Link to={`/projects/${project.slug}`} className="block">
                    
                    {/* Large Photography with subtle 1.03x scale */}
                    <div className="aspect-[16/10] bg-[#1D211F] relative overflow-hidden">
                      <img
                        src={project.heroImage || project.thumbnail}
                        alt={`${project.title} — ${project.location}`}
                        loading="lazy"
                        className="w-full h-full object-cover max-w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {/* Project Number / Category Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="inline-block bg-[#1D211F]/90 backdrop-blur-sm text-[#C27D66] font-sans text-[10px] font-semibold tracking-wider uppercase px-3 py-1 border border-[rgba(245,243,237,0.15)] rounded-[2px]">
                          0{idx + 1} • {project.category}
                        </span>
                        <span className="inline-block bg-[#303A35]/85 backdrop-blur-sm text-[#F5F3ED] font-sans text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-[2px]">
                          Completed
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#A3ADA7]">
                        <span>{project.location}</span>
                        <span className="text-[#C27D66] font-medium">{project.year}</span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors leading-snug font-normal">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#A3ADA7] line-clamp-2 leading-relaxed font-light">
                        {project.subtitle}
                      </p>

                      <div className="pt-4 border-t border-[rgba(245,243,237,0.12)] flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-wider text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors">
                        <span>View Project</span>
                        <ArrowUpRight className="w-4 h-4 text-[#C27D66] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                </article>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button to="/projects" variant="outlineLight" size="lg" arrow>
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          04. SERVICES SECTION — WARM LINEN (#EFEFEA)
          ------------------------------------------------------------- */}
      <section className="bg-[#EFEFEA] text-[#303A35] py-24 sm:py-32 border-b border-[rgba(48,58,53,0.12)]">
        <div className="editorial-container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[rgba(48,58,53,0.12)]">
            <div className="max-w-2xl space-y-3">
              <span className="editorial-eyebrow text-[#C27D66] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
                What We Do
              </span>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#303A35] font-normal leading-tight">
                Our Design Services
              </h2>
              <p className="text-[#5C6661] text-sm sm:text-base font-light">
                From initial concept sketches to complete construction management and interior styling.
              </p>
            </div>
            <div className="shrink-0">
              <Button to="/services" variant="outline" size="sm" arrow>
                Explore All Services
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.number}
                  className="gsap-reveal-item p-6 sm:p-8 bg-[#F5F5F0] border border-[rgba(48,58,53,0.12)] hover:border-[#C27D66] hover:bg-[#303A35] transition-all duration-300 rounded-[2px] flex flex-col justify-between group space-y-6 shadow-subtle"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-editorial text-2xl text-[#C27D66] font-normal">{svc.number}</span>
                      <Icon className="w-5 h-5 text-[#C27D66]" />
                    </div>

                    <h3 className="font-editorial text-2xl text-[#303A35] group-hover:text-[#F5F3ED] transition-colors font-normal">
                      {svc.title}
                    </h3>

                    <p className="font-editorial text-sm italic text-[#5C6661] group-hover:text-[#A3ADA7] transition-colors">
                      "{svc.tagline}"
                    </p>

                    <p className="text-xs text-[#5C6661] group-hover:text-[#A3ADA7] transition-colors leading-relaxed font-light pt-1">
                      {svc.description}
                    </p>
                  </div>

                  <Link
                    to={svc.link}
                    className="inline-flex items-center justify-between text-xs font-sans font-semibold uppercase tracking-wider text-[#303A35] group-hover:text-[#C27D66] transition-colors pt-4 border-t border-[rgba(48,58,53,0.12)] group-hover:border-[rgba(245,243,237,0.15)] min-h-[44px]"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C27D66] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button to="/services" variant="outline" size="md" arrow>
              Explore All Services →
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          05. "TRANSFORMING SPACES" / PHILOSOPHY — FOREST/SAGE (#303A35)
          ------------------------------------------------------------- */}
      <section className="bg-[#303A35] text-[#F5F3ED] py-24 sm:py-32 border-b border-[rgba(245,243,237,0.12)]">
        <div className="editorial-container max-w-5xl space-y-16">
          
          {/* Main Statement */}
          <div className="space-y-4 text-center sm:text-left gsap-reveal-item">
            <span className="editorial-eyebrow text-[#C27D66] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              Our Philosophy
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#F5F3ED] font-normal leading-[1.12] tracking-tight">
              We create beautiful spaces that match your lifestyle.
            </h2>
          </div>

          {/* 3 Numbered Supporting Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-[rgba(245,243,237,0.12)]">
            {philosophyPillars.map((pillar) => (
              <div
                key={pillar.number}
                className="gsap-reveal-item bg-[#242C28] p-6 sm:p-8 border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 rounded-[2px] shadow-subtle space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-editorial text-3xl text-[#C27D66] font-normal block">
                    {pillar.number}
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#F5F3ED] font-normal leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A3ADA7] leading-relaxed font-light">
                    {pillar.text}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(245,243,237,0.12)] font-sans text-[10px] uppercase tracking-widest text-[#C27D66] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Studio Principle</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          06. FINAL CTA — DEEP FOREST BLACK (#1D211F)
          ------------------------------------------------------------- */}
      <section className="bg-[#1D211F] text-[#F5F3ED] border-t border-[rgba(245,243,237,0.10)] py-24 sm:py-32 text-center relative overflow-hidden">
        <div className="editorial-container max-w-3xl space-y-6 relative z-10">
          <span className="editorial-eyebrow text-[#C27D66] font-sans text-xs font-semibold uppercase tracking-[0.2em]">
            Work With Us
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-[#F5F3ED]">
            Ready to Create Your Space?
          </h2>
          <p className="text-[#A3ADA7] font-sans text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Let's turn your ideas into a home that feels truly yours.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Get in Touch
            </Button>
            <Button to="/projects" variant="outlineLight" size="lg">
              Explore Projects
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          07. EXISTING FOOTER (Rendered by Layout Shell in Deep Forest Charcoal #2C3531)
          ------------------------------------------------------------- */}
    </div>
  );
}

export default Home;
