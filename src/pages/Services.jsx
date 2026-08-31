import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, Minus, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import SEO from '../components/seo/SEO';
import { services, processSteps, faqs } from '../data/studioData';
import { prefersReducedMotion, isTouchOrMobile, ANIM } from '../utils/animations';

export function Services() {
  const containerRef = useRef(null);
  const [openFaqId, setOpenFaqId] = useState(faqs[0]?.id || null);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

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
        title="Practice Disciplines & Capabilities"
        description="Comprehensive architecture, interior architecture, turnkey FF&E styling, and heritage conservation across Europe and abroad."
      />

      {/* 1. SERVICES HERO BANNER (#F1ECE3 Warm Alternate Section) */}
      <section className="bg-bg-warm py-20 lg:py-28 border-b border-border-warm/60">
        <div className="editorial-container">
          <div className="max-w-4xl">
            <span className="editorial-eyebrow mb-4 block">Practice Disciplines & Scope</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-ink-primary mb-6 sm:mb-8">
              End-to-end spatial direction from early geotechnical inquiry to turnkey handover.
            </h1>
            <p className="text-ink-muted text-base sm:text-lg md:text-xl font-light leading-relaxed">
              We bridge visionary architectural envelopes, tactile interior architecture, bespoke artisan joinery, and surgical heritage restoration under a unified aesthetic discipline.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SERVICE SECTIONS (Alternating #FAF9F5 and #FFFFFF) */}
      <div className="divide-y divide-border-light">
        {services.map((svc, index) => (
          <div key={svc.id} className="gsap-reveal-section">
            <Section
              id={svc.id}
              variant={index % 2 === 1 ? 'surface' : 'default'}
              spacing="loose"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                {/* Text & Deliverables Info */}
                <div className={`lg:col-span-6 space-y-6 gsap-reveal-item ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-editorial text-xl text-accent-brass font-normal">{svc.number}</span>
                    <span className="w-10 h-px bg-accent-brass" />
                    <span className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-subtle">
                      Core Studio Capability
                    </span>
                  </div>

                  <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-ink-primary leading-tight font-normal">
                    {svc.title}
                  </h2>

                  <p className="font-editorial text-lg sm:text-xl italic text-ink-muted leading-relaxed font-normal">
                    "{svc.tagline}"
                  </p>

                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
                    {svc.description}
                  </p>

                  {/* Scope Deliverables Schedule */}
                  <div className="pt-6 border-t border-border-light space-y-3">
                    <h3 className="font-sans text-xs uppercase tracking-widest text-ink-primary font-semibold">
                      Key Scope Deliverables
                    </h3>
                    <div className="space-y-2 pt-1">
                      {svc.deliverables.map((deliv, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-muted">
                          <Check className="w-4 h-4 text-accent-brass shrink-0 mt-0.5" />
                          <span className="font-light">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Button to="/contact" variant="primary" size="md" arrow>
                      Inquire About This Service
                    </Button>
                    <Button to="/projects" variant="outline" size="md">
                      View Related Works
                    </Button>
                  </div>
                </div>

                {/* Service High-Res Image Container */}
                <div className={`lg:col-span-6 gsap-reveal-item ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="img-zoom-wrapper aspect-[4/3] bg-bg-warm overflow-hidden border border-border-light shadow-card relative">
                    <img
                      src={svc.image}
                      alt={`${svc.title} — Atelier Vauquelin Capability Overview`}
                      loading="lazy"
                      className="w-full h-full object-cover max-w-full"
                    />
                    <div className="absolute bottom-4 left-4 bg-bg-surface/95 backdrop-blur-sm px-4 py-2 border border-border-light shadow-subtle">
                      <span className="font-sans text-xs font-semibold text-ink-primary uppercase tracking-wider">
                        Discipline 0{index + 1} • {svc.title.split('&')[0]}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </Section>
          </div>
        ))}
      </div>

      {/* 3. 5-STEP "HOW WE WORK" PROCESS VISUAL (#181816 Dark Premium Section) */}
      <div className="gsap-reveal-section">
        <Section
          variant="dark"
          spacing="loose"
          eyebrow="Studio Lifecycle"
          title="How We Work: From Brief to Handover"
          subtitle="A transparent, staged process ensuring design purity, cost predictability, and timeless execution."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={step.step}
                className="gsap-reveal-item bg-bg-dark-surface p-6 sm:p-7 border border-border-dark flex flex-col justify-between space-y-6 relative group hover:border-accent-brass transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between font-sans text-xs text-accent-brass mb-4">
                    <span className="text-xl font-editorial font-normal">{step.step}</span>
                    <span className="text-ink-subtle uppercase tracking-wider font-semibold text-[11px]">{step.duration}</span>
                  </div>

                  <h3 className="font-editorial text-2xl text-white mb-2 leading-snug font-normal">
                    {step.phase}
                  </h3>

                  <p className="text-xs text-accent-brass/90 font-sans font-semibold uppercase tracking-wider mb-3">
                    {step.summary}
                  </p>

                  <p className="text-xs text-ink-subtle leading-relaxed font-light">
                    {step.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-dark flex items-center justify-between text-[10px] font-sans font-semibold uppercase tracking-wider text-ink-subtle">
                  <span>Phase 0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-accent-brass" />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* 4. FUNCTIONAL FAQ ACCORDION (#FAF9F5 with #FFFFFF Accordion Cards) */}
      <div className="gsap-reveal-section">
        <Section
          variant="default"
          spacing="loose"
          eyebrow="Engagement Clarifications"
          title="Frequently Inquired Questions"
          subtitle="Detailed answers regarding international commissions, statutory planning, budgets, and listed building codes."
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`gsap-reveal-item border transition-all duration-300 bg-bg-surface ${
                    isOpen ? 'border-accent-brass shadow-subtle' : 'border-border-light hover:border-border-warm'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-8 flex items-center justify-between text-left gap-4 focus:outline-none min-h-[44px]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-editorial text-lg text-accent-brass font-normal pt-0.5">
                        0{idx + 1}
                      </span>
                      <h3 className="font-editorial text-xl sm:text-2xl text-ink-primary font-normal leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="shrink-0 w-8 h-8 rounded-none border border-border-light flex items-center justify-center text-ink-primary">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-accent-brass" />
                      ) : (
                        <Plus className="w-4 h-4 text-ink-muted" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-8 pb-8 pt-2 border-t border-border-light/60">
                      <div className="pl-6 sm:pl-9">
                        <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      {/* 5. CALL TO ACTION TO /CONTACT (#F1ECE3 Warm Section) */}
      <section className="bg-bg-warm py-16 sm:py-24 text-center border-t border-border-warm/60">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="editorial-eyebrow block">Commission Inquiry</span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-ink-primary font-normal">
            Ready to initiate your architectural brief?
          </h2>
          <p className="text-ink-muted text-sm sm:text-base lg:text-lg font-light leading-relaxed">
            Our principal architects will review your site location, typology, and timeline to prepare an initial feasibility consultation.
          </p>
          <div className="pt-4">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Submit Project Inquiry
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
