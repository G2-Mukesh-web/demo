import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Mail, MapPin, GraduationCap, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import SEO from '../components/seo/SEO';
import { team } from '../data/studioData';
import { prefersReducedMotion, isTouchOrMobile, ANIM } from '../utils/animations';

export function Team() {
  const containerRef = useRef(null);
  const [activeBioMember, setActiveBioMember] = useState(null);

  const leadership = team.slice(0, 2);
  const studioTeam = team.slice(2);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchOrMobile()) return;

    const ctx = gsap.context(() => {
      const sections = containerRef.current?.querySelectorAll('.gsap-reveal-section');
      sections?.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.gsap-reveal-item'),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: ANIM.duration.normal,
            stagger: 0.1,
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
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden">
      <SEO
        title="Leadership & Architects"
        description="Meet Camille Vauquelin, Édouard Laurent, and our European collective of architects, interior sculptors, and heritage specialists."
      />

      {/* 1. TEAM HERO BANNER (#F1ECE3 Warm Alternate Section) */}
      <section className="bg-bg-warm py-20 lg:py-28 border-b border-border-warm/60">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <span className="editorial-eyebrow mb-3 block">People & Practice</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ink-primary mb-6">
              Principals, Architects & Spatial Sculptors
            </h1>
            <p className="text-ink-muted text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              A tight-knit European collective of licensed architects, interior sculptors, stone conservators, and structural engineers united by a shared reverence for tectonic permanence and quiet light.
            </p>
          </div>
        </div>
      </section>

      {/* 2. EXPANDED LEADERSHIP PROFILES (#FAF9F5 with #FFFFFF Surface Cards) */}
      <div className="gsap-reveal-section">
        <Section
          variant="default"
          spacing="loose"
          eyebrow="Founding Partners"
          title="Studio Leadership & Direction"
          subtitle="Our founding principals guide the design philosophy and direct all international commissions."
        >
          <div className="space-y-12 sm:space-y-16">
            {leadership.map((leader, index) => (
              <div
                key={leader.id}
                className="gsap-reveal-item bg-bg-surface border border-border-light overflow-hidden shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Leader Portrait */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="img-zoom-wrapper aspect-[3/4] bg-bg-warm overflow-hidden relative">
                    <img
                      src={leader.image}
                      alt={`${leader.name} — ${leader.role} at Atelier Vauquelin`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 max-w-full"
                    />
                    <div className="absolute bottom-4 left-4 bg-bg-surface/95 backdrop-blur-md px-3 py-1.5 border border-border-light font-sans text-[10px] uppercase font-semibold tracking-wider text-ink-primary">
                      {leader.location} Atelier
                    </div>
                  </div>
                </div>

                {/* Leader Extended Bio */}
                <div className={`lg:col-span-7 p-6 sm:p-12 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-2 font-sans text-xs text-accent-brass uppercase tracking-wider font-semibold">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {leader.credentials}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-ink-subtle font-normal">
                        <MapPin className="w-3.5 h-3.5" />
                        {leader.location}
                      </span>
                    </div>

                    <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary font-normal">
                      {leader.name}
                    </h2>

                    <p className="font-sans text-xs uppercase tracking-widest text-ink-muted mt-1 font-semibold">
                      {leader.role}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
                    {leader.bio}
                  </p>

                  <p className="text-sm text-ink-muted leading-relaxed font-light">
                    {leader.id === 'camille-vauquelin'
                      ? "Camille oversees conceptual masterplanning and structural massing across Southern France, the Swiss Alps, and the UK, prioritizing zero-carbon stone assemblies and passive thermodynamic envelopes."
                      : "Édouard orchestrates the studio's interior materiality library, designing custom furniture pieces, researching historical lime-plaster formulations, and curating gallery-grade vintage design for private estates."}
                  </p>

                  <div className="pt-4 border-t border-border-light flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 font-sans text-xs font-semibold uppercase tracking-wider">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-ink-primary hover:text-accent-brass transition-colors min-h-[44px]"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4 text-accent-brass" />
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href={`mailto:${leader.id === 'camille-vauquelin' ? 'camille@ateliervauquelin.com' : 'edouard@ateliervauquelin.com'}`}
                        className="inline-flex items-center gap-1 text-ink-primary hover:text-accent-brass transition-colors min-h-[44px]"
                      >
                        <Mail className="w-4 h-4 text-accent-brass" />
                        <span>Direct Atelier Contact</span>
                      </a>
                    </div>

                    <Button
                      to="/contact"
                      variant="outline"
                      size="sm"
                      arrow
                      className="hidden sm:inline-flex"
                    >
                      Consult
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* 3. STUDIO TEAM GRID (#FFFFFF Surface Section with #FAF9F5 Cards) */}
      <div className="gsap-reveal-section">
        <Section
          variant="surface"
          spacing="loose"
          eyebrow="Core Atelier Members"
          title="Architects, Directors & Material Specialists"
          subtitle="Tap or click any team member card to view their extended credentials, project leadership, and background."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {studioTeam.map((member) => (
              <div
                key={member.id}
                onClick={() => setActiveBioMember(member)}
                className="gsap-reveal-item group cursor-pointer bg-bg-primary border border-border-light hover:border-accent-brass transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="img-zoom-wrapper aspect-[3/4] bg-bg-warm relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 max-w-full"
                  />
                  
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between font-sans text-[10px] text-accent-brass font-semibold uppercase tracking-wider">
                      <span>{member.credentials}</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/90 leading-relaxed line-clamp-4 font-light">
                        {member.bio}
                      </p>
                      <span className="inline-block mt-3 font-sans text-[10px] uppercase font-semibold tracking-wider text-accent-brass underline">
                        Click to Read Full Profile
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-sans text-ink-subtle uppercase tracking-wider">
                    <span className="text-accent-brass font-semibold">{member.credentials}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {member.location}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-ink-primary group-hover:text-accent-brass transition-colors font-normal">
                    {member.name}
                  </h3>

                  <p className="text-[11px] uppercase tracking-widest text-ink-muted font-medium font-sans">
                    {member.role}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* 4. INTERACTIVE BIO MODAL */}
      {activeBioMember && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveBioMember(null)}
        >
          <div
            className="bg-bg-surface border border-border-light max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveBioMember(null)}
              className="absolute top-6 right-6 w-11 h-11 border border-border-light flex items-center justify-center text-ink-primary hover:border-accent-brass hover:text-accent-brass"
              aria-label="Close bio modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none overflow-hidden bg-bg-warm border border-border-light shrink-0">
                <img
                  src={activeBioMember.image}
                  alt={activeBioMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="font-sans text-xs font-semibold text-accent-brass uppercase tracking-widest">
                  {activeBioMember.credentials} • {activeBioMember.location}
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-ink-primary mt-1 font-normal">
                  {activeBioMember.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-ink-muted font-medium font-sans">
                  {activeBioMember.role}
                </p>
              </div>
            </div>

            <div className="border-t border-border-light pt-4">
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
                {activeBioMember.bio}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-border-light font-sans text-xs font-semibold uppercase tracking-wider">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-brass hover:text-ink-primary transition-colors min-h-[44px]"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>

              <Button
                onClick={() => setActiveBioMember(null)}
                variant="outline"
                size="sm"
              >
                Close Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CAREERS CALLOUT (#181816 Dark Premium Section) */}
      <section className="bg-bg-dark text-white border-t border-border-dark py-16 sm:py-20">
        <div className="editorial-container flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="editorial-eyebrow text-accent-brass">Careers & Internships</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
              Join Our Multidisciplinary Atelier
            </h2>
            <p className="text-ink-subtle text-sm font-light leading-relaxed">
              We maintain active fellowships, open project architect roles, and physical model-making apprenticeships across Paris, London, and Geneva.
            </p>
          </div>

          <div className="shrink-0">
            <Button to="/careers" variant="primary" size="lg" arrow>
              Explore Open Positions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
