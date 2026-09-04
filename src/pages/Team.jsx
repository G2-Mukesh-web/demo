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
        title="Our Team & Leadership"
        description="Meet Camille Vauquelin, Rohan Mehta, and our team of architects, interior designers, and project managers in Mumbai, Bengaluru, and Hyderabad."
      />

      {/* 1. TEAM HERO BANNER (Deep Muted Forest #303A35) */}
      <section className="bg-[#303A35] text-[#F5F3ED] py-20 lg:py-28 border-b border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-3 block">Our Team</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F5F3ED] mb-6">
              Our Architects & Designers
            </h1>
            <p className="text-[#A3ADA7] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              A close-knit team of architects, interior designers, engineers, and craft specialists working together to create beautiful, lasting homes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. LEADERSHIP PROFILES (Warm Linen #EFEFEA) */}
      <div className="gsap-reveal-section bg-[#EFEFEA] text-[#303A35] py-20 lg:py-28">
        <div className="editorial-container">
          <div className="mb-12 sm:mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-2 block">Leadership</span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#303A35] font-normal mb-4">Studio Founders & Directors</h2>
            <p className="text-[#5C6661] text-base sm:text-lg font-light max-w-2xl">Our founding partners lead the design vision and guide every project.</p>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {leadership.map((leader, index) => (
              <div
                key={leader.id}
                className="gsap-reveal-item bg-[#F5F5F0] border border-[rgba(48,58,53,0.12)] hover:border-[#C27D66] transition-colors duration-300 overflow-hidden shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-[2px]"
              >
                {/* Leader Portrait */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="img-zoom-wrapper aspect-[3/4] bg-[#EAE8E1] overflow-hidden relative">
                    <img
                      src={leader.image}
                      alt={`${leader.name} — ${leader.role} at Atelier Vauquelin`}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 max-w-full"
                    />
                    <div className="absolute bottom-4 left-4 bg-[#1D211F]/90 backdrop-blur-md px-3 py-1.5 border border-[rgba(245,243,237,0.12)] font-sans text-[10px] uppercase font-semibold tracking-wider text-[#F5F3ED] rounded-[2px]">
                      {leader.location} Studio
                    </div>
                  </div>
                </div>

                {/* Leader Extended Bio */}
                <div className={`lg:col-span-7 p-6 sm:p-12 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-2 font-sans text-xs text-[#C27D66] uppercase tracking-wider font-semibold">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {leader.credentials}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#5C6661] font-normal">
                        <MapPin className="w-3.5 h-3.5" />
                        {leader.location}
                      </span>
                    </div>

                    <h2 className="font-editorial text-3xl sm:text-4xl text-[#303A35] font-normal">
                      {leader.name}
                    </h2>

                    <p className="font-sans text-xs uppercase tracking-widest text-[#5C6661] mt-1 font-semibold">
                      {leader.role}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#5C6661] leading-relaxed font-light">
                    {leader.bio}
                  </p>

                  <p className="text-sm text-[#5C6661] leading-relaxed font-light">
                    {leader.id === 'camille-vauquelin'
                      ? "Camille leads architectural design and masterplanning across India, focusing on climate-responsive stone construction, passive cooling, and energy-efficient homes."
                      : "Rohan leads the interior design team, creating bespoke teakwood joinery, selecting authentic Indian marbles and textiles, and designing comfortable, light-filled rooms."}
                  </p>

                  <div className="pt-4 border-t border-[rgba(48,58,53,0.12)] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 font-sans text-xs font-semibold uppercase tracking-wider">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#303A35] hover:text-[#C27D66] transition-colors min-h-[44px]"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4 text-[#C27D66]" />
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href={`mailto:${leader.id === 'camille-vauquelin' ? 'camille@ateliervauquelin.com' : 'rohan@ateliervauquelin.com'}`}
                        className="inline-flex items-center gap-1 text-[#303A35] hover:text-[#C27D66] transition-colors min-h-[44px]"
                      >
                        <Mail className="w-4 h-4 text-[#C27D66]" />
                        <span>Email Directly</span>
                      </a>
                    </div>

                    <Button
                      to="/contact"
                      variant="outline"
                      size="sm"
                      arrow
                      className="hidden sm:inline-flex"
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. STUDIO TEAM GRID (Deep Muted Forest #303A35) */}
      <div className="gsap-reveal-section bg-[#303A35] text-[#F5F3ED] py-20 lg:py-28 border-t border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container">
          <div className="mb-12 sm:mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-2 block">Our Specialists</span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F5F3ED] font-normal mb-4">Architects & Material Specialists</h2>
            <p className="text-[#A3ADA7] text-base sm:text-lg font-light max-w-2xl">Click any team member to view their background and project experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {studioTeam.map((member) => (
              <div
                key={member.id}
                onClick={() => setActiveBioMember(member)}
                className="gsap-reveal-item group cursor-pointer bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-all duration-300 overflow-hidden flex flex-col justify-between rounded-[2px]"
              >
                <div className="img-zoom-wrapper aspect-[3/4] bg-[#1D211F] relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 max-w-full"
                  />
                  
                  <div className="absolute inset-0 bg-[#1D211F]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-[#F5F3ED]">
                    <div className="flex items-center justify-between font-sans text-[10px] text-[#C27D66] font-semibold uppercase tracking-wider">
                      <span>{member.credentials}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#F5F3ED]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#F5F3ED]/90 leading-relaxed line-clamp-4 font-light">
                        {member.bio}
                      </p>
                      <span className="inline-block mt-3 font-sans text-[10px] uppercase font-semibold tracking-wider text-[#C27D66] underline">
                        Click to Read Profile
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-sans text-[#A3ADA7] uppercase tracking-wider">
                    <span className="text-[#C27D66] font-semibold">{member.credentials}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {member.location}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors font-normal">
                    {member.name}
                  </h3>

                  <p className="text-[11px] uppercase tracking-widest text-[#A3ADA7] font-medium font-sans">
                    {member.role}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE BIO MODAL */}
      {activeBioMember && (
        <div
          className="fixed inset-0 z-50 bg-[#1D211F]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveBioMember(null)}
        >
          <div
            className="bg-[#242C28] border border-[rgba(245,243,237,0.15)] max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative space-y-6 rounded-[2px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveBioMember(null)}
              className="absolute top-6 right-6 w-11 h-11 border border-[rgba(245,243,237,0.15)] flex items-center justify-center text-[#F5F3ED] hover:border-[#C27D66] hover:text-[#C27D66] transition-colors rounded-[2px]"
              aria-label="Close bio modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2px] overflow-hidden bg-[#1D211F] border border-[rgba(245,243,237,0.15)] shrink-0">
                <img
                  src={activeBioMember.image}
                  alt={activeBioMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="font-sans text-xs font-semibold text-[#C27D66] uppercase tracking-widest">
                  {activeBioMember.credentials} • {activeBioMember.location}
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5F3ED] mt-1 font-normal">
                  {activeBioMember.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#A3ADA7] font-medium font-sans">
                  {activeBioMember.role}
                </p>
              </div>
            </div>

            <div className="border-t border-[rgba(245,243,237,0.12)] pt-4">
              <p className="text-sm sm:text-base text-[#A3ADA7] leading-relaxed font-light">
                {activeBioMember.bio}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[rgba(245,243,237,0.12)] font-sans text-xs font-semibold uppercase tracking-wider">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#C27D66] hover:text-[#F5F3ED] transition-colors min-h-[44px]"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>

              <Button
                onClick={() => setActiveBioMember(null)}
                variant="outlineLight"
                size="sm"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CAREERS CALLOUT (Deep Forest Black #1D211F) */}
      <section className="bg-[#1D211F] text-[#F5F3ED] border-t border-[rgba(245,243,237,0.10)] py-16 sm:py-20">
        <div className="editorial-container flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold block">Careers</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F3ED] font-normal">
              Join Our Architecture Studio
            </h2>
            <p className="text-[#A3ADA7] text-sm font-light leading-relaxed">
              We offer full-time positions and internships across our studios in Mumbai, Bengaluru, and Hyderabad.
            </p>
          </div>

          <div className="shrink-0">
            <Button to="/careers" variant="primary" size="lg" arrow>
              View Open Positions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
