import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * Editorial Project Card
 * Border: #EAE6DF -> #D4AF37 (0.3s transition)
 * Image: scale(1.02) on hover (0.4s transition)
 * Corners: Sharp 2px architectural geometry
 */
export function ProjectCard({
  project,
  aspectRatio = 'aspect-[4/3]',
  showSummary = false,
  className = '',
}) {
  if (!project) return null;

  return (
    <article className={`group block relative ${className}`}>
      <Link to={`/projects/${project.slug}`} className="block">
        {/* Photography Frame with Hover Border & Zoom */}
        <div className={`img-zoom-wrapper relative w-full ${aspectRatio} bg-[#F7F3EB] overflow-hidden mb-4 border border-[#EAE6DF] group-hover:border-[#D4AF37] transition-colors duration-300 rounded-[2px]`}>
          <img
            src={project.thumbnail || project.heroImage}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-400"
          />
          
          {/* Static Top Corner Category Badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-block bg-[#FFFFFF]/95 backdrop-blur-sm text-[#1B2A47] font-sans text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 border border-[#EAE6DF] rounded-[2px]">
              {project.category}
            </span>
          </div>

          {/* Full Dark Editorial Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A47]/90 via-[#1B2A47]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-20">
            <div className="flex items-center justify-between text-white font-sans text-[11px] uppercase tracking-wider">
              <span className="bg-[#FFFFFF] text-[#1B2A47] px-2.5 py-1 font-semibold text-[10px] rounded-[2px]">
                {project.category}
              </span>
              <span className="text-[#D9DCE2]">{project.year}</span>
            </div>

            <div className="flex items-end justify-between translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <div>
                <p className="font-editorial text-2xl text-[#FDFBF7] font-normal leading-tight">
                  {project.title}
                </p>
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#D4AF37] mt-1">
                  {project.location} {project.area ? `• ${project.area}` : ''}
                </p>
              </div>

              <div className="w-9 h-9 bg-[#D4AF37] text-[#1B2A47] flex items-center justify-center shadow-subtle shrink-0 ml-3 rounded-[2px]">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Below Card Static Ledger Info */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#5F6470]">
            <span>{project.location}</span>
            <span className="text-[#D4AF37] font-medium">{project.year}</span>
          </div>

          <h3 className="font-editorial text-2xl text-[#1B2A47] group-hover:text-[#D4AF37] transition-colors duration-300">
            {project.title}
          </h3>

          {project.subtitle && (
            <p className="text-xs sm:text-sm text-[#5F6470] line-clamp-1 font-light">
              {project.subtitle}
            </p>
          )}

          {showSummary && project.summary && (
            <p className="pt-1.5 text-xs sm:text-sm text-[#5F6470] line-clamp-2 leading-relaxed font-light">
              {project.summary}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
