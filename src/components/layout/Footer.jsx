import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight, Check } from 'lucide-react';
import { studioInfo } from '../../data/studioData';
import Button from '../primitives/Button';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    console.log('[Newsletter Subscription Payload]:', {
      email: newsletterEmail,
      timestamp: new Date().toISOString(),
      source: 'Global Footer Form',
    });

    setSubscribed(true);
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const sitemapLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Our Story', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Team', path: '/team' },
    { label: 'Journal & News', path: '/journal' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-[#1D211F] text-[#F5F3ED] border-t border-[rgba(245,243,237,0.10)] pt-16 sm:pt-20 pb-12 mt-auto overflow-x-hidden">
      <div className="editorial-container">
        
        {/* Top Tier: Studio Hero Callout & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-[rgba(245,243,237,0.10)]">
          <div className="lg:col-span-6 space-y-6">
            <span className="editorial-eyebrow text-[#C27D66]">Architecture & Interior Design</span>
            <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-normal leading-tight">
              Creating beautiful homes, luxury villas, and timeless spaces across India.
            </h2>
            <div className="pt-2">
              <Button to="/contact" variant="primary" size="md" arrow>
                Start Your Project
              </Button>
            </div>
          </div>

          {/* Newsletter / Monograph Dispatch */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-between">
            <div>
              <p className="font-sans text-xs font-semibold text-[#C27D66] uppercase tracking-widest mb-3">
                Newsletter & Studio Updates
              </p>
              <p className="text-xs sm:text-sm text-[#A3ADA7] leading-relaxed mb-6 font-light">
                Get our latest articles on design ideas, craftsmanship, and completed projects. No spam, only good design stories.
              </p>

              {subscribed ? (
                <div className="bg-[#242927] border border-[#C27D66]/40 p-4 flex items-center gap-3 text-white text-xs font-sans rounded-[2px]">
                  <Check className="w-4 h-4 text-[#C27D66] shrink-0" />
                  <span>Thank you. You have been added to our newsletter list.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex border-b border-[rgba(245,243,237,0.15)] focus-within:border-[#C27D66] transition-colors">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full bg-transparent py-3 px-1 text-xs sm:text-sm text-[#F5F3ED] placeholder-[#A3ADA7]/60 focus:outline-none font-sans min-h-[44px]"
                    />
                    <button
                      type="submit"
                      className="px-4 text-[#C27D66] hover:text-[#F5F3ED] transition-colors uppercase font-sans font-semibold text-xs tracking-wider flex items-center gap-1 min-h-[44px]"
                      aria-label="Subscribe to newsletter"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="text-[#C27D66] text-xs font-sans">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Tier: Studio Ateliers & Sitemap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-12 sm:py-16 border-b border-[rgba(245,243,237,0.10)] text-xs font-light">
          
          {/* Atelier Locations */}
          {studioInfo.locations.map((loc) => (
            <div key={loc.city} className="lg:col-span-3 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 bg-[#C27D66] rounded-full" />
                <h4 className="font-sans text-xs uppercase tracking-widest text-[#F5F3ED] font-semibold">
                  {loc.city} Studio
                </h4>
              </div>
              <p className="text-[#A3ADA7]">{loc.address}</p>
              <p>
                <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} className="text-[#A3ADA7] hover:text-[#C27D66] transition-colors inline-block py-1">
                  {loc.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${loc.email}`} className="text-[#C27D66] hover:underline inline-block py-1">
                  {loc.email}
                </a>
              </p>
              <p className="text-[11px] text-[#A3ADA7]/80 pt-1 font-sans uppercase tracking-wider">{loc.hours}</p>
            </div>
          ))}

          {/* Quick Sitemap Links */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#F5F3ED] font-semibold mb-3">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {sitemapLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-[#A3ADA7] hover:text-[#C27D66] transition-colors inline-block py-1 min-h-[36px] flex items-center">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Socials, Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-sans text-[#A3ADA7]">
          
          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {studioInfo.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C27D66] transition-colors uppercase tracking-wider text-[11px] min-h-[44px] flex items-center"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright Statement */}
          <div className="text-center md:text-left">
            <span>© {new Date().getFullYear()} {studioInfo.name}. All rights reserved.</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#A3ADA7] hover:text-[#F5F3ED] transition-colors uppercase tracking-widest text-[11px] group min-h-[44px]"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-[2px] border border-[rgba(245,243,237,0.15)] flex items-center justify-center group-hover:border-[#C27D66] group-hover:bg-[#C27D66] group-hover:text-[#1D211F] transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
