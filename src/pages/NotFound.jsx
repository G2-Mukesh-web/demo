import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, LayoutGrid, Mail, Layers } from 'lucide-react';
import Button from '../components/primitives/Button';
import SEO from '../components/seo/SEO';

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 sm:py-24 bg-bg-primary overflow-x-hidden">
      <SEO
        title="404 — Void in Architectural Ledger"
        description="The requested elevation or project coordinate is not indexed in the Atelier Vauquelin archive."
      />

      <div className="editorial-container max-w-3xl text-center space-y-8">
        
        {/* Architectural Compass Icon Graphic */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 bg-bg-warm border border-border-warm shadow-subtle mx-auto">
          <Compass className="w-12 h-12 text-accent-brass animate-spin-slow" />
          <span className="absolute -top-3 -right-3 bg-ink-primary text-white font-sans font-semibold text-[10px] uppercase px-2 py-0.5">
            404
          </span>
        </div>

        {/* Header (Single H1) */}
        <div className="space-y-3">
          <span className="editorial-eyebrow block">Unmapped Coordinate</span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-ink-primary font-normal">
            Void in the Architectural Ledger
          </h1>
          <p className="text-ink-muted text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-lg mx-auto">
            The spatial elevation or monograph page you requested is not indexed within the studio archives.
          </p>
        </div>

        {/* Architectural Blueprint Graphic */}
        <div className="max-w-md mx-auto py-2 sm:py-4">
          <svg
            viewBox="0 0 400 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-border-medium"
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
          <p className="font-sans text-xs font-semibold text-ink-subtle uppercase tracking-widest mb-4">
            Navigation Shortcuts:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto font-sans text-xs">
            <Link
              to="/"
              className="p-3 bg-bg-surface border border-border-light hover:border-accent-brass hover:text-accent-brass transition-colors flex items-center justify-center gap-1.5 text-ink-primary min-h-[44px] font-medium"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Overview</span>
            </Link>

            <Link
              to="/projects"
              className="p-3 bg-bg-surface border border-border-light hover:border-accent-brass hover:text-accent-brass transition-colors flex items-center justify-center gap-1.5 text-ink-primary min-h-[44px] font-medium"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>

            <Link
              to="/services"
              className="p-3 bg-bg-surface border border-border-light hover:border-accent-brass hover:text-accent-brass transition-colors flex items-center justify-center gap-1.5 text-ink-primary min-h-[44px] font-medium"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Services</span>
            </Link>

            <Link
              to="/contact"
              className="p-3 bg-bg-surface border border-border-light hover:border-accent-brass hover:text-accent-brass transition-colors flex items-center justify-center gap-1.5 text-ink-primary min-h-[44px] font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </Link>
          </div>
        </div>

        <div className="pt-4 sm:pt-6">
          <Button to="/" variant="primary" size="lg" arrow>
            Return to Studio Overview
          </Button>
        </div>

      </div>
    </div>
  );
}

export default NotFound;
