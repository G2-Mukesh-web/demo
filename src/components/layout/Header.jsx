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
  const mobileMenuOpenRef = useRef(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  // Sync ref with state for event handlers & ScrollTrigger
  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  // Navbar Links (8 core routes)
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
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
          // If mobile menu is open, never hide header
          if (mobileMenuOpenRef.current) {
            showAnim.play();
            return;
          }

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

  // Ensure header is fully visible whenever mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen && headerRef.current) {
      gsap.to(headerRef.current, { yPercent: 0, duration: 0.2, ease: 'power2.out' });
    }
  }, [mobileMenuOpen]);

  // Mobile menu animation and body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      if (mobileMenuRef.current && !prefersReducedMotion()) {
        const menu = mobileMenuRef.current;
        const links = mobileLinksRef.current.filter(Boolean);

        const tl = gsap.timeline();
        tl.fromTo(
          menu,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.28, ease: 'power3.out' }
        ).fromTo(
          links,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.03, duration: 0.25, ease: 'power3.out' },
          '-=0.12'
        );
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 w-full bg-[#1D211F]/95 backdrop-blur-md border-b border-[rgba(245,243,237,0.10)] z-50 transition-shadow duration-300"
    >
      <div className="editorial-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Studio Brand Logo -> Links to Home */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex flex-col focus:outline-none"
          >
            <span className="font-editorial text-2xl md:text-3xl tracking-[-0.02em] font-normal text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors">
              {studioInfo.name}
            </span>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A3ADA7] hidden sm:inline-block">
              Architecture & Interior Design Studio
            </span>
          </Link>

          {/* Desktop Navigation (Visible on lg: screens and above) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.14em] font-sans transition-colors relative py-1 font-medium ${
                    isActive
                      ? 'text-[#F5F3ED] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C27D66]'
                      : 'text-[#A3ADA7] hover:text-[#C27D66]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Header Action & Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Button
              to="/contact"
              variant="primary"
              size="sm"
              arrow
              className="hidden sm:inline-flex"
            >
              Get in Touch
            </Button>

            {/* Mobile Hamburger / Close Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#F5F3ED] hover:text-[#C27D66] transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[2px]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={mobileMenuRef}
          className="fixed top-20 md:top-24 left-0 right-0 bottom-0 w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-6rem)] bg-[#1D211F] z-50 lg:hidden flex flex-col justify-between px-6 py-8 border-t border-[rgba(245,243,237,0.10)] overflow-y-auto"
        >
          <div className="space-y-6">
            <span className="editorial-eyebrow text-[#C27D66] block font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              Navigation Menu
            </span>
            <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.path}
                  ref={(el) => (mobileLinksRef.current[idx] = el)}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `font-editorial text-2xl sm:text-3xl transition-colors py-2 flex items-center min-h-[44px] ${
                      isActive ? 'text-[#C27D66] italic pl-2 font-medium' : 'text-[#F5F3ED] hover:text-[#C27D66]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[rgba(245,243,237,0.10)] space-y-6">
            <div>
              <p className="font-sans text-xs font-semibold text-[#A3ADA7] uppercase tracking-wider mb-2">
                Email Us Directly
              </p>
              <a
                href="mailto:mumbai@ateliervauquelin.com"
                className="text-sm text-[#F5F3ED] hover:text-[#C27D66] transition-colors inline-block py-1 min-h-[44px]"
              >
                mumbai@ateliervauquelin.com
              </a>
            </div>

            <Button
              to="/contact"
              variant="primary"
              size="md"
              arrow
              onClick={closeMenu}
              className="w-full justify-center"
            >
              Start Your Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
