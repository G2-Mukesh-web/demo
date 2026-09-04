import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Grid3X3, LayoutGrid, List, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import Section from '../components/primitives/Section';
import Tag from '../components/primitives/Tag';
import Button from '../components/primitives/Button';
import SEO from '../components/seo/SEO';
import { projects } from '../data/studioData';
import { prefersReducedMotion } from '../utils/animations';

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  
  const gridContainerRef = useRef(null);
  const flipStateRef = useRef(null);

  const categories = ['All', 'Residential', 'Restoration', 'Cultural', 'Hospitality', 'Commercial', 'Interior Design'];

  const filteredAndSortedProjects = useMemo(() => {
    let list = selectedCategory === 'All'
      ? [...projects]
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

    list.sort((a, b) => {
      const yearA = parseInt(a.year, 10) || 0;
      const yearB = parseInt(b.year, 10) || 0;
      return sortOrder === 'newest' ? yearB - yearA : yearA - yearB;
    });

    return list;
  }, [selectedCategory, sortOrder]);

  const handleCategoryChange = (cat) => {
    if (gridContainerRef.current && !prefersReducedMotion()) {
      const items = gridContainerRef.current.querySelectorAll('.project-grid-item');
      flipStateRef.current = Flip.getState(items);
    }
    setSelectedCategory(cat);
  };

  const handleSortChange = () => {
    if (gridContainerRef.current && !prefersReducedMotion()) {
      const items = gridContainerRef.current.querySelectorAll('.project-grid-item');
      flipStateRef.current = Flip.getState(items);
    }
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  useLayoutEffect(() => {
    if (!flipStateRef.current || !gridContainerRef.current || prefersReducedMotion()) return;

    const items = gridContainerRef.current.querySelectorAll('.project-grid-item');
    if (items.length > 0) {
      Flip.from(flipStateRef.current, {
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.03,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
          ),
        onLeave: (elements) =>
          gsap.to(elements, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
          }),
      });
    }

    flipStateRef.current = null;
  }, [filteredAndSortedProjects]);

  return (
    <div className="w-full overflow-x-hidden bg-[#303A35] text-[#F5F3ED]">
      <SEO
        title="Our Projects & Portfolio"
        description="Explore our portfolio of private homes, holiday retreats, cultural spaces, and historic restorations across India."
      />

      {/* 1. PORTFOLIO HERO BANNER (Deep Muted Forest/Sage #303A35) */}
      <section className="bg-[#303A35] py-20 lg:py-28 border-b border-[rgba(245,243,237,0.12)] text-[#F5F3ED]">
        <div className="editorial-container">
          <div className="max-w-4xl">
            <span className="editorial-eyebrow mb-3 block text-[#C27D66]">Our Portfolio</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F5F3ED] mb-6">
              Featured Homes, Restorations & Spaces
            </h1>
            <p className="text-[#A3ADA7] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              Explore our collection of private homes, cultural spaces, wellness retreats, and heritage renovations across Mumbai, Bengaluru, Hyderabad, Goa, and across India.
            </p>
          </div>

          {/* 2. FILTER & SORT CONTROLS TOOLBAR */}
          <div className="mt-12 pt-8 border-t border-[rgba(245,243,237,0.12)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const count = cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

                return (
                  <Tag
                    key={cat}
                    active={selectedCategory === cat}
                    onClick={() => handleCategoryChange(cat)}
                    size="md"
                    className="cursor-pointer"
                  >
                    {cat} <span className="opacity-60 ml-1">({count})</span>
                  </Tag>
                );
              })}
            </div>

            {/* View Mode & Sort Controls */}
            <div className="flex items-center gap-4 text-xs font-sans text-[#A3ADA7] shrink-0">
              
              {/* Year Sort Toggle */}
              <div className="flex items-center gap-2 border-r border-[rgba(245,243,237,0.15)] pr-4">
                <span className="uppercase tracking-wider text-[11px]">Sort:</span>
                <button
                  onClick={handleSortChange}
                  className="text-[#F5F3ED] font-semibold hover:text-[#C27D66] transition-colors uppercase tracking-wider flex items-center gap-1 min-h-[44px]"
                >
                  <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
                  {sortOrder === 'newest' ? <ArrowDownAZ className="w-3.5 h-3.5 text-[#C27D66]" /> : <ArrowUpZA className="w-3.5 h-3.5 text-[#C27D66]" />}
                </button>
              </div>

              {/* Layout Switcher */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 border rounded-[2px] transition-colors ${viewMode === 'grid' ? 'border-[#C27D66] bg-[#C27D66] text-[#1D211F]' : 'border-[rgba(245,243,237,0.15)] bg-[#242C28] text-[#A3ADA7] hover:text-[#F5F3ED]'}`}
                  title="3-Column Grid"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('large')}
                  className={`p-2 border rounded-[2px] transition-colors ${viewMode === 'large' ? 'border-[#C27D66] bg-[#C27D66] text-[#1D211F]' : 'border-[rgba(245,243,237,0.15)] bg-[#242C28] text-[#A3ADA7] hover:text-[#F5F3ED]'}`}
                  title="2-Column Large View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 border rounded-[2px] transition-colors ${viewMode === 'list' ? 'border-[#C27D66] bg-[#C27D66] text-[#1D211F]' : 'border-[rgba(245,243,237,0.15)] bg-[#242C28] text-[#A3ADA7] hover:text-[#F5F3ED]'}`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS GRID */}
      <section className="py-20 md:py-28 lg:py-32 bg-[#303A35] text-[#F5F3ED]">
        <div className="editorial-container">
          {filteredAndSortedProjects.length === 0 && (
            <div className="text-center py-24 space-y-4">
              <h2 className="font-editorial text-3xl text-[#F5F3ED] font-normal">No projects found in this category.</h2>
              <p className="text-[#A3ADA7] text-sm font-light">Try selecting another filter or viewing all projects.</p>
              <Button onClick={() => handleCategoryChange('All')} variant="outlineLight" size="sm">
                Show All Projects
              </Button>
            </div>
          )}

          {viewMode !== 'list' && (
            <div
              ref={gridContainerRef}
              className={`grid gap-6 sm:gap-8 lg:gap-12 ${
                viewMode === 'large'
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredAndSortedProjects.map((project) => (
                <div
                  key={project.id}
                  data-flip-id={project.id}
                  className="project-grid-item block"
                >
                  <article className="group block relative">
                    <Link to={`/projects/${project.slug}`} className="block">
                      
                      <div className={`img-zoom-wrapper relative w-full ${viewMode === 'large' ? 'aspect-[16/10]' : 'aspect-[4/3]'} bg-[#1D211F] overflow-hidden mb-4 border border-[rgba(245,243,237,0.12)] group-hover:border-[#C27D66] transition-colors duration-300 rounded-[2px]`}>
                        <img
                          src={project.thumbnail || project.heroImage}
                          alt={`${project.title} — ${project.category} in ${project.location}`}
                          loading="lazy"
                          className="w-full h-full object-cover max-w-full"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#1D211F]/90 via-[#1D211F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 z-20">
                          <div className="flex items-center justify-between text-white font-sans text-[11px] uppercase tracking-wider">
                            <span className="bg-[#EFEFEA] text-[#303A35] px-2.5 py-1 font-semibold text-[10px] rounded-[2px]">
                              {project.category}
                            </span>
                            <span className="text-[#A3ADA7]">{project.year}</span>
                          </div>

                          <div className="flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <div>
                              <p className="font-editorial text-2xl lg:text-3xl text-[#F5F3ED] font-normal leading-tight">
                                {project.title}
                              </p>
                              <p className="font-sans text-[11px] uppercase tracking-wider text-[#C27D66] mt-1">
                                {project.location} • {project.area}
                              </p>
                            </div>

                            <div className="w-10 h-10 bg-[#C27D66] text-[#1D211F] flex items-center justify-center shadow-lift shrink-0 ml-3 rounded-[2px]">
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#A3ADA7]">
                          <span>{project.location}</span>
                          <span className="text-[#C27D66] font-medium">{project.year}</span>
                        </div>

                        <h2 className="font-editorial text-2xl text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors leading-snug font-normal">
                          {project.title}
                        </h2>

                        {project.subtitle && (
                          <p className="text-xs sm:text-sm text-[#A3ADA7] line-clamp-1 font-light">
                            {project.subtitle}
                          </p>
                        )}
                      </div>

                    </Link>
                  </article>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div ref={gridContainerRef} className="divide-y divide-[rgba(245,243,237,0.12)] border-y border-[rgba(245,243,237,0.12)] bg-[#242C28] shadow-subtle rounded-[2px] overflow-hidden">
              {filteredAndSortedProjects.map((project) => (
                <div
                  key={project.id}
                  data-flip-id={project.id}
                  className="project-grid-item block"
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center hover:bg-[#303A35] px-6 transition-colors block"
                  >
                    <div className="md:col-span-2 font-editorial text-lg text-[#C27D66] font-normal">
                      {project.year}
                    </div>

                    <div className="md:col-span-4">
                      <h2 className="font-editorial text-2xl text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors font-normal">
                        {project.title}
                      </h2>
                      <p className="text-xs text-[#A3ADA7] font-light line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>

                    <div className="md:col-span-2 font-sans text-xs text-[#A3ADA7]">
                      {project.location}
                    </div>

                    <div className="md:col-span-2">
                      <span className="inline-block px-2.5 py-1 bg-[#1D211F] font-sans text-[10px] uppercase font-semibold tracking-wider text-[#F5F3ED] border border-[rgba(245,243,237,0.15)] rounded-[2px]">
                        {project.category}
                      </span>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end text-xs font-sans font-semibold uppercase tracking-wider text-[#F5F3ED] group-hover:text-[#C27D66]">
                      <span className="hidden sm:inline mr-2">View Project</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. BOTTOM INQUIRY PROMPT (Deep Forest Black #1D211F) */}
      <section className="bg-[#1D211F] text-[#F5F3ED] border-t border-[rgba(245,243,237,0.10)] py-16 sm:py-20 text-center">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="editorial-eyebrow text-[#C27D66]">Start Your Project</span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-normal">
            Ready to design your home or space?
          </h2>
          <p className="text-[#A3ADA7] text-sm sm:text-base font-light leading-relaxed">
            Our team is available for private design consultations in Mumbai, Bengaluru, or Hyderabad.
          </p>
          <div className="pt-2">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
