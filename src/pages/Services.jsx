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
    <div ref={containerRef} className="w-full overflow-x-hidden bg-[#EFEFEA] text-[#303A35]">
      <SEO
        title="Our Services & Capabilities"
        description="Comprehensive architecture, interior design, turnkey project management, and heritage bungalow renovation across India."
      />

      {/* 1. SERVICES HERO BANNER (Warm Linen #EFEFEA) */}
      <section className="bg-[#EFEFEA] py-20 lg:py-28 border-b border-[rgba(48,58,53,0.12)]">
        <div className="editorial-container">
          <div className="max-w-4xl">
            <span className="editorial-eyebrow mb-4 block text-[#C27D66]">What We Do</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#303A35] mb-6 sm:mb-8">
              Complete architecture and interior design services, from first sketch to final move-in.
            </h1>
            <p className="text-[#5C6661] text-base sm:text-lg md:text-xl font-light leading-relaxed">
              We combine smart architectural planning, warm interior design, custom woodwork, and careful building renovation under one unified team.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SERVICE SECTIONS (Alternating between #EFEFEA and #303A35) */}
      <div className="divide-y divide-[rgba(48,58,53,0.12)]">
        {services.map((svc, index) => {
          const isForest = index % 2 === 1;
          return (
            <div key={svc.id} className={`gsap-reveal-section ${isForest ? 'bg-[#303A35] text-[#F5F3ED]' : 'bg-[#EFEFEA] text-[#303A35]'}`}>
              <div className="editorial-container py-20 md:py-28 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  
                  {/* Text & Deliverables Info */}
                  <div className={`lg:col-span-6 space-y-6 gsap-reveal-item ${isForest ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-editorial text-xl text-[#C27D66] font-normal">{svc.number}</span>
                      <span className="w-10 h-px bg-[#C27D66]" />
                      <span className={`font-sans text-xs font-semibold uppercase tracking-widest ${isForest ? 'text-[#A3ADA7]' : 'text-[#75807B]'}`}>
                        Core Service
                      </span>
                    </div>

                    <h2 className={`font-editorial text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal ${isForest ? 'text-[#F5F3ED]' : 'text-[#303A35]'}`}>
                      {svc.title}
                    </h2>

                    <p className={`font-editorial text-lg sm:text-xl italic leading-relaxed font-normal ${isForest ? 'text-[#A3ADA7]' : 'text-[#5C6661]'}`}>
                      "{svc.tagline}"
                    </p>

                    <p className={`text-sm sm:text-base leading-relaxed font-light ${isForest ? 'text-[#A3ADA7]' : 'text-[#5C6661]'}`}>
                      {svc.description}
                    </p>

                    {/* Scope Deliverables Schedule */}
                    <div className={`pt-6 border-t ${isForest ? 'border-[rgba(245,243,237,0.12)]' : 'border-[rgba(48,58,53,0.12)]'} space-y-3`}>
                      <h3 className={`font-sans text-xs uppercase tracking-widest font-semibold ${isForest ? 'text-[#F5F3ED]' : 'text-[#303A35]'}`}>
                        What We Deliver
                      </h3>
                      <div className="space-y-2 pt-1">
                        {svc.deliverables.map((deliv, idx) => (
                          <div key={idx} className={`flex items-start gap-3 text-xs sm:text-sm ${isForest ? 'text-[#A3ADA7]' : 'text-[#5C6661]'}`}>
                            <Check className="w-4 h-4 text-[#C27D66] shrink-0 mt-0.5" />
                            <span className="font-light">{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Button to="/contact" variant="primary" size="md" arrow>
                        Ask About This Service
                      </Button>
                      <Button to="/projects" variant={isForest ? 'outlineLight' : 'outline'} size="md">
                        View Related Projects
                      </Button>
                    </div>
                  </div>

                  {/* Service High-Res Image Container */}
                  <div className={`lg:col-span-6 gsap-reveal-item ${isForest ? 'lg:order-1' : ''}`}>
                    <div className={`img-zoom-wrapper aspect-[4/3] bg-[#242C28] overflow-hidden border ${isForest ? 'border-[rgba(245,243,237,0.12)]' : 'border-[rgba(48,58,53,0.12)]'} shadow-card relative rounded-[2px]`}>
                      <img
                        src={svc.image}
                        alt={`${svc.title} — Atelier Vauquelin Overview`}
                        loading="lazy"
                        className="w-full h-full object-cover max-w-full"
                      />
                      <div className="absolute bottom-4 left-4 bg-[#1D211F]/95 backdrop-blur-sm px-4 py-2 border border-[rgba(245,243,237,0.15)] shadow-subtle rounded-[2px]">
                        <span className="font-sans text-xs font-semibold text-[#F5F3ED] uppercase tracking-wider">
                          Service 0{index + 1} • {svc.title.split('&')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. 5-STEP "HOW WE WORK" PROCESS VISUAL (Deep Muted Forest #303A35) */}
      <div className="gsap-reveal-section bg-[#303A35] text-[#F5F3ED] py-20 md:py-28 lg:py-32 border-t border-[rgba(245,243,237,0.12)]">
        <div className="editorial-container">
          <div className="mb-12 md:mb-16">
            <span className="editorial-eyebrow text-[#C27D66] block mb-2">Our Process</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-normal">
              How We Work: From Ideas to Moving Day
            </h2>
            <p className="text-[#A3ADA7] text-sm sm:text-base mt-2 font-light">
              A simple, step-by-step process ensuring clear communication, cost control, and high quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={step.step}
                className="gsap-reveal-item bg-[#242C28] p-6 sm:p-7 border border-[rgba(245,243,237,0.12)] flex flex-col justify-between space-y-6 relative group hover:border-[#C27D66] transition-all duration-300 rounded-[2px]"
              >
                <div>
                  <div className="flex items-center justify-between font-sans text-xs text-[#C27D66] mb-4">
                    <span className="text-xl font-editorial font-normal">{step.step}</span>
                    <span className="text-[#A3ADA7] uppercase tracking-wider font-semibold text-[11px]">{step.duration}</span>
                  </div>

                  <h3 className="font-editorial text-2xl text-[#F5F3ED] mb-2 leading-snug font-normal">
                    {step.phase}
                  </h3>

                  <p className="text-xs text-[#C27D66] font-sans font-semibold uppercase tracking-wider mb-3">
                    {step.summary}
                  </p>

                  <p className="text-xs text-[#A3ADA7] leading-relaxed font-light">
                    {step.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(245,243,237,0.12)] flex items-center justify-between text-[10px] font-sans font-semibold uppercase tracking-wider text-[#A3ADA7]">
                  <span>Step 0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-[#C27D66]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. FUNCTIONAL FAQ ACCORDION (Warm Linen #EFEFEA) */}
      <div className="gsap-reveal-section bg-[#EFEFEA] text-[#303A35] py-20 md:py-28 lg:py-32 border-t border-[rgba(48,58,53,0.12)]">
        <div className="editorial-container">
          <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
            <span className="editorial-eyebrow text-[#C27D66] block mb-2">Common Questions</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#303A35] font-normal">
              Frequently Asked Questions
            </h2>
            <p className="text-[#5C6661] text-sm sm:text-base mt-2 font-light">
              Clear answers about how we work, project timelines, budgets, and services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`gsap-reveal-item border transition-all duration-300 bg-[#F5F5F0] rounded-[2px] ${
                    isOpen ? 'border-[#C27D66] shadow-subtle' : 'border-[rgba(48,58,53,0.12)] hover:border-[rgba(48,58,53,0.25)]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-8 flex items-center justify-between text-left gap-4 focus:outline-none min-h-[44px]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-editorial text-lg text-[#C27D66] font-normal pt-0.5">
                        0{idx + 1}
                      </span>
                      <h3 className="font-editorial text-xl sm:text-2xl text-[#303A35] font-normal leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="shrink-0 w-8 h-8 rounded-[2px] border border-[rgba(48,58,53,0.15)] flex items-center justify-center text-[#303A35]">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#C27D66]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#5C6661]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-8 pb-8 pt-2 border-t border-[rgba(48,58,53,0.10)]">
                      <div className="pl-6 sm:pl-9">
                        <p className="text-sm sm:text-base text-[#5C6661] leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. CALL TO ACTION (Deep Forest Black #1D211F) */}
      <section className="bg-[#1D211F] text-[#F5F3ED] py-16 sm:py-24 text-center border-t border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="editorial-eyebrow text-[#C27D66] block">Start Your Project</span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#F5F3ED] font-normal">
            Ready to discuss your project?
          </h2>
          <p className="text-[#A3ADA7] text-sm sm:text-base lg:text-lg font-light leading-relaxed">
            Our team will review your project requirements, location, and timeline to plan an initial consultation.
          </p>
          <div className="pt-4">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
