import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../primitives/Button';
import { studioInfo } from '../../data/studioData';
import { prefersReducedMotion } from '../../utils/animations';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  // Navbar Links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Team', path: '/team' },
    { name: 'Journal', path: '/journal' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  // Nav show/hide on scroll via ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const header = headerRef.current;
    if (!header) return;

    let showAnim;

    const ctx = gsap.context(() => {
      showAnim = gsap.from(header, {
        yPercent: -100,
        paused: true,
        duration: 0.35,
        ease: 'power2.out',
      }).progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === -1) {
            showAnim.play();
          } else if (self.direction === 1 && self.scroll() > 100) {
            showAnim.reverse();
          }
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || prefersReducedMotion()) return;

    const menu = mobileMenuRef.current;
    const links = mobileLinksRef.current.filter(Boolean);

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.fromTo(
        menu,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      ).fromTo(
        links,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.35, ease: 'power3.out' },
        '-=0.15'
      );
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E5E0D6] z-40 transition-shadow duration-300"
    >
      <div className="editorial-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Studio Brand Logo -> Links to Home */}
          <Link to="/" className="group flex flex-col">
            <span className="font-editorial text-2xl md:text-3xl tracking-[-0.02em] font-normal text-[#1B2A47] group-hover:text-[#D4AF37] transition-colors">
              {studioInfo.name}
            </span>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5F6470] hidden sm:inline-block">
              Architecture & Spatial Interiors
            </span>
          </Link>

          {/* Desktop Navigation (Plus Jakarta Sans) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.14em] font-sans transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#1B2A47] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D4AF37]'
                      : 'text-[#5F6470] hover:text-[#D4AF37]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Header Action & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              to="/contact"
              variant="primary"
              size="sm"
              arrow
              className="hidden sm:inline-flex"
            >
              Enquire
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1B2A47] hover:text-[#D4AF37] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 top-20 bg-[#FDFBF7] z-50 lg:hidden flex flex-col justify-between px-6 py-8 border-t border-[#E5E0D6] overflow-y-auto"
        >
          <div className="space-y-6">
            <p className="editorial-eyebrow text-[#D4AF37]">Index Navigation</p>
            <nav className="flex flex-col space-y-3.5">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.path}
                  ref={(el) => (mobileLinksRef.current[idx] = el)}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `font-editorial text-3xl transition-colors ${
                      isActive ? 'text-[#D4AF37] italic pl-2' : 'text-[#1B2A47] hover:text-[#D4AF37]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#E5E0D6] space-y-6">
            <div>
              <p className="font-sans text-xs font-semibold text-[#5F6470] uppercase tracking-wider mb-2">Direct Inquiry</p>
              <a href="mailto:paris@ateliervauquelin.com" className="text-sm text-[#1B2A47] hover:text-[#D4AF37] transition-colors">
                paris@ateliervauquelin.com
              </a>
            </div>

            <Button
              to="/contact"
              variant="primary"
              size="md"
              arrow
              className="w-full justify-center"
            >
              Start a Project Brief
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
