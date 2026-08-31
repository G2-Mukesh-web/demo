import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * Editorial Journal Card
 * Border: #EAE6DF -> #D4AF37 (0.3s transition)
 * Geometry: Sharp 2px corners
 */
export function JournalCard({ post, className = '' }) {
  if (!post) return null;

  return (
    <article className={`group block relative bg-[#FFFFFF] border border-[#EAE6DF] hover:border-[#D4AF37] transition-colors duration-300 rounded-[2px] shadow-subtle p-6 sm:p-7 flex flex-col justify-between ${className}`}>
      <Link to={`/journal/${post.slug}`} className="block flex-grow">
        {/* Cover Image with subtle zoom */}
        <div className="img-zoom-wrapper aspect-[16/10] bg-[#F7F3EB] overflow-hidden mb-5 border border-[#EAE6DF] rounded-[2px]">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-400"
          />
        </div>

        {/* Post Metadata */}
        <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#5F6470] mb-2.5">
          <span className="text-[#D4AF37] font-semibold">{post.category}</span>
          <span>{post.date}</span>
        </div>

        {/* Post Title */}
        <h3 className="font-editorial text-2xl text-[#1B2A47] group-hover:text-[#D4AF37] transition-colors duration-300 leading-snug mb-3">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-[#5F6470] line-clamp-2 leading-relaxed font-light mb-4">
          {post.excerpt}
        </p>
      </Link>

      {/* Read Article CTA Link */}
      <div className="pt-4 border-t border-[#EAE6DF] flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-wider text-[#1B2A47] group-hover:text-[#D4AF37] transition-colors duration-300">
        <span>Read Dispatch</span>
        <ArrowUpRight className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  );
}

export default JournalCard;
