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
      project: 'The Courtyard Villa',
      location: 'Hyderabad, India',
      notes: 'Jury Citation: Recognized for climate-responsive courtyard planning and modern stone craftsmanship.',
    },
    {
      year: '2023',
      award: 'Architectural Digest India Design Excellence Award',
      project: 'Assagao Heritage Villa',
      location: 'Goa, India',
      notes: 'Jury Citation: Exceptional restoration of a 150-year-old historic laterite and teakwood villa.',
    },
    {
      year: '2023',
      award: 'Elle Decor India — Best Weekend Home Architecture',
      project: 'The Alibaug Coastal Residence',
      location: 'Alibaug, Maharashtra',
      notes: 'Jury Citation: Seamless indoor-outdoor coastal pavilion built with native basalt stone and glass.',
    },
    {
      year: '2022',
      award: 'Wallpaper* Design Awards — Best Hill Retreat Design',
      project: 'AER Mountain Sanctuary',
      location: 'Kasauli, Himachal Pradesh',
      notes: 'Jury Citation: Stepped local quartzite architecture with valley-facing wellness suites.',
    },
    {
      year: '2021',
      award: 'Domus India Architectural Excellence Citation',
      project: 'Jubilee Hills Private Residence',
      location: 'Hyderabad, India',
      notes: 'Jury Citation: Highlighting the natural beauty, cooling, and durability of Kota and Jaisalmer stone.',
    },
    {
      year: '2019',
      award: 'Indian Institute of Interior Designers (IIID) Studio Award',
      project: 'Atelier Vauquelin Studio',
      location: 'Mumbai, India',
      notes: 'Awarded to studio partners Camille Vauquelin and Rohan Mehta for dedication to lasting Indian craft and materials.',
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
    <div ref={containerRef} className="w-full overflow-x-hidden bg-[#EFEFEA] text-[#303A35]">
      <SEO
        title="Our Story & Philosophy"
        description="Founded in 2014 by Camille Vauquelin and Rohan Mehta, Atelier Vauquelin creates timeless architecture rooted in natural materials, quality craft, and warm light."
      />

      {/* 1. EDITORIAL STUDIO HERO BANNER (Warm Linen #EFEFEA) */}
      <section className="bg-[#EFEFEA] py-20 lg:py-28 border-b border-[rgba(48,58,53,0.12)]">
        <div className="editorial-container">
          <div className="max-w-4xl">
            <span className="editorial-eyebrow mb-4 block text-[#C27D66]">Our Story & Approach</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#303A35] mb-6 sm:mb-8">
              We design beautiful, lasting architecture and warm, comfortable interiors.
            </h1>
            <p className="text-[#5C6661] text-base sm:text-lg md:text-xl font-light leading-relaxed">
              Founded in 2014 by Camille Vauquelin and Rohan Mehta, Atelier Vauquelin works across Mumbai, Bengaluru, and Hyderabad, designing custom homes and welcoming interiors for clients across India.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FOUNDING NARRATIVE & PHILOSOPHY */}
      <section className="py-20 md:py-28 lg:py-32 bg-[#EFEFEA]">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Long-form Narrative */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div>
                <span className="editorial-eyebrow mb-3 block text-[#C27D66]">Our Mission</span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#303A35] leading-tight mb-4 font-normal">
                  Building homes that stand the test of time.
                </h2>
              </div>

              <p className="text-[#5C6661] text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                We started Atelier Vauquelin to build homes of lasting quality. While much of modern construction relies on temporary trends and synthetic materials, we focus on durable natural materials, smart engineering, and timeless design.
              </p>

              <p className="text-[#5C6661] text-sm sm:text-base leading-relaxed font-light">
                Every project starts by understanding your land, natural light, and surroundings. We select natural stone, quality timber, and durable finishes that look great on day one and age gracefully over the years.
              </p>

              <div className="p-6 sm:p-8 bg-[#F5F5F0] border-l-2 border-[#C27D66] space-y-3 shadow-subtle border border-[rgba(48,58,53,0.12)] rounded-[2px]">
                <p className="font-editorial text-lg sm:text-xl text-[#303A35] italic leading-relaxed font-normal">
                  "A great home gets even better with time, as natural materials gain character and warmth with everyday living."
                </p>
                <p className="font-sans text-xs font-semibold text-[#C27D66] uppercase tracking-widest">
                  — Camille Vauquelin, Founding Partner
                </p>
              </div>

              <p className="text-[#5C6661] text-sm sm:text-base leading-relaxed font-light">
                Our studio brings together architects, interior designers, and skilled craftspeople under one roof. From early site planning to custom woodwork and final styling, we take care of every detail.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button to="/team" variant="primary" size="md" arrow>
                  Meet Our Team
                </Button>
                <Button to="/services" variant="outline" size="md">
                  View Our Services
                </Button>
              </div>

              {/* Material Provenance & Craft Ledger */}
              <div className="mt-8 pt-8 border-t border-[rgba(48,58,53,0.12)] space-y-6">
                <div className="bg-[#303A35] text-[#F5F3ED] p-6 sm:p-8 border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 rounded-[2px] shadow-subtle space-y-5">
                  <div className="flex items-center justify-between border-b border-[rgba(245,243,237,0.12)] pb-4">
                    <span className="font-sans text-xs font-semibold text-[#C27D66] uppercase tracking-[0.2em] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C27D66]" />
                      Quality Materials & Craftsmanship
                    </span>
                    <span className="font-editorial text-sm italic text-[#A3ADA7]">
                      Our Standard
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A3ADA7] leading-relaxed font-light">
                    We choose honest, durable materials that are built to last. Every material is selected for its strength, natural beauty, and everyday comfort.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 rounded-[2px] space-y-1">
                      <span className="font-editorial text-lg text-[#F5F3ED] font-normal block">Natural Stone</span>
                      <span className="font-sans text-[11px] text-[#A3ADA7] font-light block leading-tight">Sourced from quality regional quarries</span>
                    </div>
                    <div className="p-3.5 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 rounded-[2px] space-y-1">
                      <span className="font-editorial text-lg text-[#F5F3ED] font-normal block">Solid Oak Wood</span>
                      <span className="font-sans text-[11px] text-[#A3ADA7] font-light block leading-tight">Treated with natural beeswax</span>
                    </div>
                    <div className="p-3.5 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 rounded-[2px] space-y-1">
                      <span className="font-editorial text-lg text-[#F5F3ED] font-normal block">Custom Bronze</span>
                      <span className="font-sans text-[11px] text-[#A3ADA7] font-light block leading-tight">Durable metal fittings made to last</span>
                    </div>
                    <div className="p-3.5 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 rounded-[2px] space-y-1">
                      <span className="font-editorial text-lg text-[#F5F3ED] font-normal block">Lime Plaster</span>
                      <span className="font-sans text-[11px] text-[#A3ADA7] font-light block leading-tight">Breathable walls with acoustic calm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Photography with Parallax */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="aspect-[4/3] bg-[#F5F5F0] overflow-hidden border border-[rgba(48,58,53,0.12)] shadow-card relative rounded-[2px]">
                <img
                  ref={parallaxImg1Ref}
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
                  alt="Atelier Vauquelin Studio Practice"
                  className="w-full h-full object-cover will-change-transform max-w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-[#F5F5F0] p-6 sm:p-8 border border-[rgba(48,58,53,0.12)] shadow-subtle rounded-[2px]">
                <div>
                  <span className="font-sans text-xs font-semibold text-[#C27D66] uppercase tracking-wider block mb-2">
                    01 / Natural Light & Comfort
                  </span>
                  <p className="text-xs text-[#5C6661] leading-relaxed font-light">
                    We design rooms around daylight and natural breezes, creating homes that are bright, comfortable, and energy-efficient.
                  </p>
                </div>

                <div>
                  <span className="font-sans text-xs font-semibold text-[#C27D66] uppercase tracking-wider block mb-2">
                    02 / Honest, Durable Materials
                  </span>
                  <p className="text-xs text-[#5C6661] leading-relaxed font-light">
                    We work with real stone, solid wood, and genuine metal—materials that feel authentic, durable, and warm to the touch.
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(48,58,53,0.12)] sm:col-span-2">
                  <span className="font-sans text-xs font-semibold text-[#C27D66] uppercase tracking-wider block mb-2">
                    03 / Careful Craftsmanship
                  </span>
                  <p className="text-xs text-[#5C6661] leading-relaxed font-light">
                    We work closely with trusted builders and master artisans to ensure every corner and joinery detail is built to perfection.
                  </p>
                </div>
              </div>

              <div className="aspect-[16/9] bg-[#F5F5F0] overflow-hidden border border-[rgba(48,58,53,0.12)] relative rounded-[2px]">
                <img
                  ref={parallaxImg2Ref}
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
                  alt="Natural materials and architecture details"
                  className="w-full h-full object-cover will-change-transform max-w-full"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DESIGN PROCESS (Deep Muted Forest #303A35) */}
      <div className="gsap-reveal-section bg-[#303A35] text-[#F5F3ED] py-20 md:py-28 lg:py-32 border-t border-[rgba(245,243,237,0.12)]">
        <div className="editorial-container">
          <div className="mb-12 md:mb-16">
            <span className="editorial-eyebrow text-[#C27D66] block mb-2">Our Process</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-normal">
              How We Work
            </h2>
            <p className="text-[#A3ADA7] text-sm sm:text-base mt-2 font-light">
              A clear, transparent 5-step process that guides every project from first ideas to moving day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="gsap-reveal-item p-6 sm:p-8 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-all duration-300 flex flex-col justify-between space-y-6 rounded-[2px]"
              >
                <div>
                  <div className="flex items-center justify-between font-sans text-xs text-[#C27D66] mb-4">
                    <span className="font-editorial text-2xl text-[#C27D66] font-normal">{step.step}</span>
                    <span className="text-[#A3ADA7] uppercase tracking-wider font-semibold text-[11px]">{step.duration}</span>
                  </div>

                  <h3 className="font-editorial text-2xl text-[#F5F3ED] mb-3 font-normal">
                    {step.phase}
                  </h3>

                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F5F3ED] mb-2">
                    {step.summary}
                  </p>

                  <p className="text-xs text-[#A3ADA7] leading-relaxed font-light">
                    {step.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(245,243,237,0.12)] flex items-center gap-2 font-sans text-[11px] uppercase tracking-wider text-[#C27D66] font-semibold">
                  <span className="w-1.5 h-1.5 bg-[#C27D66] rounded-full" />
                  <span>Verified Milestone</span>
                </div>
              </div>
            ))}

            {/* Practice Standards Card */}
            <div className="gsap-reveal-item p-6 sm:p-8 bg-[#1D211F] text-white border border-[rgba(245,243,237,0.10)] flex flex-col justify-between space-y-6 rounded-[2px]">
              <div>
                <span className="font-sans text-xs font-semibold text-[#C27D66] mb-4 block uppercase tracking-wider">Quality Assurance</span>
                <h3 className="font-editorial text-2xl text-white mb-3 font-normal">Clear Stage Deliverables</h3>
                <p className="text-xs text-[#A3ADA7] leading-relaxed font-light">
                  Every stage includes clear drawings, 3D views, material samples, and cost breakdowns so you always know what to expect before moving forward.
                </p>
              </div>

              <Button to="/services" variant="primary" size="sm" arrow>
                Explore All Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AWARDS & PRESS TIMELINE (Warm Linen #EFEFEA) */}
      <div className="gsap-reveal-section bg-[#EFEFEA] text-[#303A35] py-20 md:py-28 lg:py-32 border-t border-[rgba(48,58,53,0.12)]">
        <div className="editorial-container">
          <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
            <span className="editorial-eyebrow text-[#C27D66] block mb-2">Recognition</span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#303A35] font-normal">
              Awards & Industry Honors
            </h2>
            <p className="text-[#5C6661] text-sm sm:text-base mt-2 font-light">
              A timeline of international design awards received for our residential homes, heritage restorations, and architecture.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="divide-y divide-[rgba(48,58,53,0.12)] border-y border-[rgba(48,58,53,0.12)]">
              {timelineAwards.map((item, idx) => (
                <div key={idx} className="gsap-reveal-item py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
                  
                  {/* Year */}
                  <div className="md:col-span-2 font-editorial text-2xl text-[#C27D66] font-normal">
                    {item.year}
                  </div>

                  {/* Award Title & Project */}
                  <div className="md:col-span-6 space-y-1">
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#303A35] font-normal">
                      {item.award}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wider text-[#C27D66] font-semibold">
                      Project: {item.project} • {item.location}
                    </p>
                    <p className="text-xs text-[#5C6661] leading-relaxed font-light pt-2">
                      {item.notes}
                    </p>
                  </div>

                  {/* Location Badge */}
                  <div className="md:col-span-4 flex md:justify-end items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F5F0] border border-[rgba(48,58,53,0.12)] font-sans text-[11px] font-semibold uppercase tracking-wider text-[#5C6661] shadow-subtle rounded-[2px]">
                      <Award className="w-3.5 h-3.5 text-[#C27D66]" />
                      Awarded Project
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. CTA LINKING TO /TEAM AND /CAREERS (Deep Forest Black #1D211F) */}
      <section className="bg-[#1D211F] text-[#F5F3ED] border-t border-[rgba(245,243,237,0.10)] py-16 sm:py-24">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Team Callout Card */}
            <div className="p-6 sm:p-12 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 space-y-6 shadow-subtle flex flex-col justify-between rounded-[2px]">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#C27D66] font-sans text-xs font-semibold uppercase tracking-widest">
                  <Users className="w-4 h-4" />
                  <span>Our Team</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-4xl text-[#F5F3ED] font-normal">
                  Meet the Architects & Designers Behind Our Work
                </h3>
                <p className="text-[#A3ADA7] text-sm sm:text-base leading-relaxed font-light">
                  Get to know Camille Vauquelin, Rohan Mehta, Priya Sundaram, and our experienced teams in Mumbai, Bengaluru, and Hyderabad.
                </p>
              </div>
              <div className="pt-4">
                <Button to="/team" variant="primary" size="md" arrow>
                  Meet Our Full Team
                </Button>
              </div>
            </div>

            {/* Careers Callout Card */}
            <div className="p-6 sm:p-12 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 space-y-6 shadow-subtle flex flex-col justify-between rounded-[2px]">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#C27D66] font-sans text-xs font-semibold uppercase tracking-widest">
                  <Hammer className="w-4 h-4" />
                  <span>Careers</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-4xl text-[#F5F3ED] font-normal">
                  Join Our Architecture & Design Studio
                </h3>
                <p className="text-[#A3ADA7] text-sm sm:text-base leading-relaxed font-light">
                  We are always happy to connect with talented project architects, interior designers, and 3D visualizers.
                </p>
              </div>
              <div className="pt-4">
                <Button to="/careers" variant="outlineLight" size="md" arrow>
                  View Open Positions
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

