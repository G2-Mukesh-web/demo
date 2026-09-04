import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/**
 * Editorial Journal Card
 * Border: rgba(44, 53, 49, 0.12) -> #C27D66 (0.3s transition)
 * Geometry: Sharp 2px corners
 */
export function JournalCard({ post, className = '' }) {
  if (!post) return null;

  return (
    <article className={`group block relative bg-[#303A35] border border-[rgba(245,243,237,0.12)] hover:border-[#C27D66] transition-colors duration-300 rounded-[2px] shadow-subtle p-6 sm:p-7 flex flex-col justify-between ${className}`}>
      <Link to={`/journal/${post.slug}`} className="block flex-grow">
        {/* Cover Image with subtle zoom */}
        <div className="img-zoom-wrapper aspect-[16/10] bg-[#242C28] overflow-hidden mb-5 border border-[rgba(245,243,237,0.12)] rounded-[2px]">
          <img
            src={post.image || post.coverImage || post.thumbnail || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"}
            alt={post.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";
            }}
            className="w-full h-full object-cover transition-transform duration-400"
          />
        </div>

        {/* Post Metadata */}
        <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-[#A3ADA7] mb-2.5">
          <span className="text-[#C27D66] font-semibold">{post.category}</span>
          <span>{post.date}</span>
        </div>

        {/* Post Title */}
        <h3 className="font-editorial text-2xl text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors duration-300 leading-snug mb-3 font-normal">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-[#A3ADA7] line-clamp-2 leading-relaxed font-light mb-4">
          {post.excerpt}
        </p>
      </Link>

      {/* Read Article CTA Link */}
      <div className="pt-4 border-t border-[rgba(245,243,237,0.12)] flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-wider text-[#F5F3ED] group-hover:text-[#C27D66] transition-colors duration-300">
        <span>Read Dispatch</span>
        <ArrowUpRight className="w-4 h-4 text-[#C27D66] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  );
}

export default JournalCard;
