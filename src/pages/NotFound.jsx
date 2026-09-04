import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, LayoutGrid, Mail, Layers } from 'lucide-react';
import Button from '../components/primitives/Button';
import SEO from '../components/seo/SEO';

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 sm:py-24 bg-[#303A35] text-[#F5F3ED] overflow-x-hidden">
      <SEO
        title="404 — Page Not Found"
        description="The requested page could not be found."
      />

      <div className="editorial-container max-w-3xl text-center space-y-8">
        
        {/* Architectural Compass Icon Graphic */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 bg-[#242C28] border border-[rgba(245,243,237,0.12)] shadow-subtle mx-auto rounded-[2px]">
          <Compass className="w-12 h-12 text-[#C27D66] animate-spin-slow" />
          <span className="absolute -top-3 -right-3 bg-[#1D211F] text-[#F5F3ED] border border-[rgba(245,243,237,0.15)] font-sans font-semibold text-[10px] uppercase px-2 py-0.5 rounded-[2px]">
            404
          </span>
        </div>

        {/* Header */}
        <div className="space-y-3">
          <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold block">Error 404</span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#F5F3ED] font-normal">
            Page Not Found
          </h1>
          <p className="text-[#A3ADA7] text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-lg mx-auto">
            The page you are looking for does not exist or may have been moved.
          </p>
        </div>

        {/* Blueprint Graphic */}
        <div className="max-w-md mx-auto py-2 sm:py-4">
          <svg
            viewBox="0 0 400 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-[rgba(245,243,237,0.2)]"
          >
            <line x1="0" y1="30" x2="400" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="30" r="15" stroke="currentColor" strokeWidth="1" />
            <circle cx="200" cy="30" r="3" fill="currentColor" />
            <line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="1" />
            <line x1="350" y1="10" x2="350" y2="50" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Quick Navigation Shortcuts */}
        <div className="pt-2">
          <p className="font-sans text-xs font-semibold text-[#A3ADA7] uppercase tracking-widest mb-4">
            Helpful Links:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto font-sans text-xs">
            <Link
              to="/"
              className="p-3 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] hover:text-[#C27D66] transition-colors flex items-center justify-center gap-1.5 text-[#F5F3ED] min-h-[44px] font-medium rounded-[2px]"
            >
              <Home className="w-3.5 h-3.5 text-[#C27D66]" />
              <span>Home</span>
            </Link>

            <Link
              to="/projects"
              className="p-3 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] hover:text-[#C27D66] transition-colors flex items-center justify-center gap-1.5 text-[#F5F3ED] min-h-[44px] font-medium rounded-[2px]"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#C27D66]" />
              <span>Projects</span>
            </Link>

            <Link
              to="/services"
              className="p-3 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] hover:text-[#C27D66] transition-colors flex items-center justify-center gap-1.5 text-[#F5F3ED] min-h-[44px] font-medium rounded-[2px]"
            >
              <Layers className="w-3.5 h-3.5 text-[#C27D66]" />
              <span>Services</span>
            </Link>

            <Link
              to="/contact"
              className="p-3 bg-[#242C28] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] hover:text-[#C27D66] transition-colors flex items-center justify-center gap-1.5 text-[#F5F3ED] min-h-[44px] font-medium rounded-[2px]"
            >
              <Mail className="w-3.5 h-3.5 text-[#C27D66]" />
              <span>Contact</span>
            </Link>
          </div>
        </div>

        <div className="pt-4 sm:pt-6">
          <Button to="/" variant="primary" size="lg" arrow>
            Return to Homepage
          </Button>
        </div>

      </div>
    </div>
  );
}

export default NotFound;
