import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Hammer } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import SEO from '../components/seo/SEO';
import { processSteps } from '../data/studioData';
import { prefersReducedMotion, isTouchOrMobile, ANIM } from '../utils/animations';

export function About() {
  const containerRef = useRef(null);
  const parallaxImg1Ref = useRef(null);
  const parallaxImg2Ref = useRef(null);

  const timelineAwards = [
    {
      year: '2024',
      award: 'Dezeen Awards — International Residential Project of the Year',
      project: 'Villa Madrone',
      location: 'London, UK',
      notes: 'Jury Citation: Recognized for its holistic integration into protected agricultural parkland and radical passive solar envelope.',
    },
    {
      year: '2023',
      award: 'ArchDaily Building of the Year — Heritage Conservation & Adaptive Reuse',
      project: 'Palazzo del Sale',
      location: 'Venice, Italy',
      notes: 'Jury Citation: A masterclass in surgical, reversible structural interventions touching 400-year-old masonry.',
    },
    {
      year: '2023',
      award: 'Equerre d’Argent Special Commendation — Cultural Architecture',
      project: 'The Tate Pavilion',
      location: 'Paris, France',
      notes: 'Jury Citation: Precision glass engineering harmonized with blasted grey granite monoliths in Oxfordshire.',
    },
    {
      year: '2022',
      award: 'Wallpaper* Design Awards — Best Alpine Wellness Sanctuary',
      project: 'AER Alpine Sanctuary',
      location: 'Milan, Italy',
      notes: 'Jury Citation: Hydrothermal baths carved into native Swiss gneiss bedrock with transcendent acoustic stillness.',
    },
    {
      year: '2021',
      award: 'RIBA International Award for Excellence',
      project: 'Maison de Calcaire',
      location: 'London, UK',
      notes: 'Jury Citation: Demonstrating the enduring thermal and aesthetic power of unprocessed French limestone.',
    },
    {
      year: '2019',
      award: 'Prix de l’Académie des Beaux-Arts in Architecture',
      project: 'Atelier Vauquelin Studio Monograph',
      location: 'Paris, France',
      notes: 'Awarded to founding partners Camille Vauquelin and Édouard Laurent for contributions to slow tectonic design.',
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion() || isTouchOrMobile()) return;

    const ctx = gsap.context(() => {
      if (parallaxImg1Ref.current) {
        gsap.fromTo(
          parallaxImg1Ref.current,
          { y: -30, scale: 1.05 },
          {
            y: 30,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxImg1Ref.current.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      if (parallaxImg2Ref.current) {
        gsap.fromTo(
          parallaxImg2Ref.current,
          { y: -25, scale: 1.05 },
          {
            y: 25,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: parallaxImg2Ref.current.parentElement,
              start: "top bottom",
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
          { opacity: 0, y: 35 },
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
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden">
      <SEO
        title="Studio Story & Philosophy"
        description="Founded in 2014 by Camille Vauquelin and Édouard Laurent, Atelier Vauquelin sculpts enduring architecture rooted in stone provenance, tactile craft, and quiet light."
      />

      {/* 1. EDITORIAL STUDIO HERO BANNER (#F1ECE3 Warm Alternate Section) */}
      <section className="bg-bg-warm py-20 lg:py-28 border-b border-border-warm/60">
        <div className="editorial-container">
          <div className="max-w-4xl">
            <span className="editorial-eyebrow mb-4 block">Studio Story & Ethos</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-ink-primary mb-6 sm:mb-8">
              A spatial practice dedicated to silent monuments, raw geological memory, and tectonic calm.
            </h1>
            <p className="text-ink-muted text-base sm:text-lg md:text-xl font-light leading-relaxed">
              Founded in Paris in 2014 by Camille Vauquelin and Édouard Laurent, Atelier Vauquelin operates across Paris, London, and Geneva, orchestrating bespoke architecture and sensory interior spaces for discerning patrons worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FOUNDING NARRATIVE & QUARRY PHILOSOPHY (#FAF9F5 Primary Background with #FFFFFF Tiles) */}
      <Section variant="default" spacing="loose">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Long-form Narrative */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span className="editorial-eyebrow mb-3 block">Origins & Manifesto</span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-ink-primary leading-tight mb-4 font-normal">
                Architecture as an enduring dialogue with the earth.
              </h2>
            </div>

            <p className="text-ink-muted text-sm sm:text-base lg:text-lg leading-relaxed font-light">
              We founded Atelier Vauquelin out of a mutual frustration with the disposable, transient nature of contemporary building. In an era dominated by synthetic composites and fast-paced commercial trends, we turned our focus backward to ancient geological permanence and forward to parametric structural precision.
            </p>

            <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-light">
              Every commission begins not on a digital canvas, but at the quarry, the clay pit, and the timber reserve. We believe that when stone is extracted from the immediate regional bedrock of a site, the resulting structure possesses an inherent gravity—a sense of belonging that cannot be synthesized.
            </p>

            <div className="p-6 sm:p-8 bg-bg-surface border-l-2 border-accent-brass space-y-3 shadow-subtle border border-border-light">
              <p className="font-editorial text-lg sm:text-xl text-ink-primary italic leading-relaxed font-normal">
                "A building reaches its fullest aesthetic resonance not on the day of handover, but thirty years later when rain, sunlight, and human touch have burnished its surfaces."
              </p>
              <p className="font-sans text-xs font-semibold text-accent-brass uppercase tracking-widest">
                — Camille Vauquelin, Founding Partner
              </p>
            </div>

            <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-light">
              Our studio unites architects, interior architects, acoustic engineers, and master stone conservators under one roof. By controlling every variable from early geotechnical feasibility to the hand-applied wax on unlacquered bronze hardware, we ensure no detail is left to compromise.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button to="/team" variant="primary" size="md" arrow>
                Meet Our Leadership Team
              </Button>
              <Button to="/services" variant="outline" size="md">
                Explore Studio Disciplines
              </Button>
            </div>

            {/* Material Provenance & Craft Ledger (Fills left column space opposite 2nd photo) */}
            <div className="mt-8 pt-8 border-t border-[#EAE6DF] space-y-6">
              <div className="bg-[#FFFFFF] p-6 sm:p-8 border border-[#EAE6DF] hover:border-[#D4AF37] transition-colors duration-300 rounded-[2px] shadow-subtle space-y-5">
                <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-4">
                  <span className="font-sans text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    Material Provenance & Craft Ledger
                  </span>
                  <span className="font-editorial text-sm italic text-[#5F6470]">
                    Studio Standards
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5F6470] leading-relaxed font-light">
                  We treat every architectural structure as a permanent geological artefact. Materials are selected for their thermal mass, tectonic weight, and capacity to patina with dignity over half a century.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-[#FDFBF7] border border-[#EAE6DF] hover:border-[#D4AF37] transition-colors duration-300 rounded-[2px] space-y-1">
                    <span className="font-editorial text-lg text-[#1B2A47] font-normal block">Mineral Stone</span>
                    <span className="font-sans text-[11px] text-[#5F6470] font-light block leading-tight">Quarried in Burgundy & Vals</span>
                  </div>
                  <div className="p-3.5 bg-[#FDFBF7] border border-[#EAE6DF] hover:border-[#D4AF37] transition-colors duration-300 rounded-[2px] space-y-1">
                    <span className="font-editorial text-lg text-[#1B2A47] font-normal block">Smoked French Oak</span>
                    <span className="font-sans text-[11px] text-[#5F6470] font-light block leading-tight">Aged with natural beeswax</span>
                  </div>
                  <div className="p-3.5 bg-[#FDFBF7] border border-[#EAE6DF] hover:border-[#D4AF37] transition-colors duration-300 rounded-[2px] space-y-1">
                    <span className="font-editorial text-lg text-[#1B2A47] font-normal block">Unlacquered Bronze</span>
                    <span className="font-sans text-[11px] text-[#5F6470] font-light block leading-tight">Custom foundry castings</span>
                  </div>
                  <div className="p-3.5 bg-[#FDFBF7] border border-[#EAE6DF] hover:border-[#D4AF37] transition-colors duration-300 rounded-[2px] space-y-1">
                    <span className="font-editorial text-lg text-[#1B2A47] font-normal block">Slaked Lime Plaster</span>
                    <span className="font-sans text-[11px] text-[#5F6470] font-light block leading-tight">Breathable acoustic stillness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Photography with Parallax */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="aspect-[4/3] bg-bg-warm overflow-hidden border border-border-light shadow-card relative">
              <img
                ref={parallaxImg1Ref}
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
                alt="Atelier Vauquelin Studio Practice and Plaster Casts"
                className="w-full h-full object-cover will-change-transform max-w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-bg-surface p-6 sm:p-8 border border-border-light shadow-subtle">
              <div>
                <span className="font-sans text-xs font-semibold text-accent-brass uppercase tracking-wider block mb-2">
                  01 / Geographic Immersion
                </span>
                <p className="text-xs text-ink-muted leading-relaxed font-light">
                  Direct quarry selection in Provence, Burgundy, Istria, and Vals to source unique mineral slabs.
                </p>
              </div>

              <div>
                <span className="font-sans text-xs font-semibold text-accent-brass uppercase tracking-wider block mb-2">
                  02 / Acoustic Serenity
                </span>
                <p className="text-xs text-ink-muted leading-relaxed font-light">
                  Calibrated domestic acoustics using lime-washed acoustic plaster and sound-dampening fibrous partitions.
                </p>
              </div>

              <div className="pt-4 border-t border-border-light sm:col-span-2">
                <span className="font-sans text-xs font-semibold text-accent-brass uppercase tracking-wider block mb-2">
                  03 / Reversible Stewardship
                </span>
                <p className="text-xs text-ink-muted leading-relaxed font-light">
                  Strict conservation methodology for listed European heritage buildings ensuring surgical, non-destructive modern integration.
                </p>
              </div>
            </div>

            <div className="aspect-[16/9] bg-bg-warm overflow-hidden border border-border-light relative">
              <img
                ref={parallaxImg2Ref}
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
                alt="Rammed Earth and Stone Details"
                className="w-full h-full object-cover will-change-transform max-w-full"
              />
            </div>
          </div>

        </div>
      </Section>

      {/* 3. DESIGN PHILOSOPHY / METHODOLOGY (#FFFFFF Surface Section with #FAF9F5 Cards) */}
      <div className="gsap-reveal-section">
        <Section
          variant="surface"
          spacing="loose"
          eyebrow="Our Methodology"
          title="The Studio Design Process"
          subtitle="A slow, sensory, and rigorous 5-step methodology that guides every commission from concept to post-occupancy orientation."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="gsap-reveal-item p-6 sm:p-8 bg-bg-primary border border-border-light hover:border-accent-brass transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between font-sans text-xs text-accent-brass mb-4">
                    <span className="font-editorial text-2xl text-accent-brass font-normal">{step.step}</span>
                    <span className="text-ink-subtle uppercase tracking-wider font-semibold text-[11px]">{step.duration}</span>
                  </div>

                  <h3 className="font-editorial text-2xl text-ink-primary mb-3 font-normal">
                    {step.phase}
                  </h3>

                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-primary mb-2">
                    {step.summary}
                  </p>

                  <p className="text-xs text-ink-muted leading-relaxed font-light">
                    {step.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-light flex items-center gap-2 font-sans text-[11px] uppercase tracking-wider text-accent-brass font-semibold">
                  <span className="w-1.5 h-1.5 bg-accent-brass rounded-full" />
                  <span>Stage Milestone Verified</span>
                </div>
              </div>
            ))}

            {/* Practice Standards Card (#181816 Dark) */}
            <div className="gsap-reveal-item p-6 sm:p-8 bg-bg-dark text-white border border-border-dark flex flex-col justify-between space-y-6">
              <div>
                <span className="font-sans text-xs font-semibold text-accent-brass mb-4 block uppercase tracking-wider">Quality Assurance</span>
                <h3 className="font-editorial text-2xl text-white mb-3 font-normal">Fixed Stage Deliverables</h3>
                <p className="text-xs text-ink-subtle leading-relaxed font-light">
                  Every stage requires formal client sign-off on cost schedules, 3D renderings, material boards, and statutory documents before proceeding to site tenders.
                </p>
              </div>

              <Button to="/services" variant="primary" size="sm" arrow>
                Learn More in Services
              </Button>
            </div>
          </div>
        </Section>
      </div>

      {/* 4. AWARDS & PRESS TIMELINE (#FAF9F5 Primary Background) */}
      <div className="gsap-reveal-section">
        <Section
          variant="default"
          spacing="loose"
          eyebrow="Recognition Archive"
          title="Awards, Juries & Honors"
          subtitle="A chronological timeline of international recognitions awarded to our architecture, heritage conservation, and spatial research."
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="divide-y divide-border-light border-y border-border-light">
              {timelineAwards.map((item, idx) => (
                <div key={idx} className="gsap-reveal-item py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
                  
                  {/* Year */}
                  <div className="md:col-span-2 font-editorial text-2xl text-accent-brass font-normal">
                    {item.year}
                  </div>

                  {/* Award Title & Project */}
                  <div className="md:col-span-6 space-y-1">
                    <h3 className="font-editorial text-xl sm:text-2xl text-ink-primary font-normal">
                      {item.award}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wider text-accent-brass font-semibold">
                      Project: {item.project} • {item.location}
                    </p>
                    <p className="text-xs text-ink-muted leading-relaxed font-light pt-2">
                      {item.notes}
                    </p>
                  </div>

                  {/* Location Badge */}
                  <div className="md:col-span-4 flex md:justify-end items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-surface border border-border-light font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-muted shadow-subtle">
                      <Award className="w-3.5 h-3.5 text-accent-brass" />
                      Verified Citation
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* 5. CTA LINKING TO /TEAM AND /CAREERS (#F1ECE3 Warm Section with #FFFFFF Cards) */}
      <section className="bg-bg-warm border-t border-border-warm/60 py-16 sm:py-24">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Team Callout Card */}
            <div className="p-6 sm:p-12 bg-bg-surface border border-border-light space-y-6 shadow-subtle flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent-brass font-sans text-xs font-semibold uppercase tracking-widest">
                  <Users className="w-4 h-4" />
                  <span>The Collective</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-4xl text-ink-primary font-normal">
                  Meet the Architects & Directors Behind Our Works
                </h3>
                <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-light">
                  Get to know Camille Vauquelin, Édouard Laurent, Helena Lindqvist, and our multidisciplinary teams in Paris, London, and Geneva.
                </p>
              </div>
              <div className="pt-4">
                <Button to="/team" variant="primary" size="md" arrow>
                  View Full Team Profiles
                </Button>
              </div>
            </div>

            {/* Careers Callout Card */}
            <div className="p-6 sm:p-12 bg-bg-surface border border-border-light space-y-6 shadow-subtle flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent-brass font-sans text-xs font-semibold uppercase tracking-widest">
                  <Hammer className="w-4 h-4" />
                  <span>Studio Culture</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-4xl text-ink-primary font-normal">
                  Join Our Atelier Fellowship & Open Positions
                </h3>
                <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-light">
                  We are actively welcoming curious project architects, interior designers, 3D visualizers, and model-making interns.
                </p>
              </div>
              <div className="pt-4">
                <Button to="/careers" variant="outline" size="md" arrow>
                  Explore Career Opportunities
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
