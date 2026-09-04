import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/primitives/Section';
import Tag from '../components/primitives/Tag';
import Button from '../components/primitives/Button';
import JournalCard from '../components/cards/JournalCard';
import SEO from '../components/seo/SEO';
import { journalPosts } from '../data/studioData';

export function Journal() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Materials', 'Design Tips', 'News & Awards', 'Craftsmanship', 'Insights', 'Restoration'];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return journalPosts;
    return journalPosts.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  const leadPost = journalPosts[0];
  const gridPosts = filteredPosts.filter((p) => selectedCategory !== 'All' || p.id !== leadPost.id);

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        title="Journal & Articles"
        description="Design ideas, material research, and project stories from Atelier Vauquelin."
      />

      {/* 1. JOURNAL HERO BANNER (Deep Muted Forest #303A35) */}
      <section className="bg-[#303A35] text-[#F5F3ED] py-20 lg:py-28 border-b border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container">
          <div className="max-w-4xl">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-3 block">Journal & Articles</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#F5F3ED] mb-6">
              Design Stories, Material Ideas & Studio News
            </h1>
            <p className="text-[#A3ADA7] text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              Articles on design ideas, natural materials, home renovation tips, and project updates from our architecture studio.
            </p>
          </div>

          {/* 2. CATEGORY FILTERS */}
          <div className="mt-12 pt-8 border-t border-[rgba(245,243,237,0.10)] flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? journalPosts.length
                : journalPosts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

              return (
                <Tag
                  key={cat}
                  active={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  size="md"
                  className="cursor-pointer"
                >
                  {cat} <span className="opacity-60 ml-1">({count})</span>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LEAD FEATURED ARTICLE (Warm Linen #EFEFEA) */}
      {selectedCategory === 'All' && leadPost && (
        <section className="border-b border-[rgba(48,58,53,0.12)] bg-[#EFEFEA] text-[#303A35] py-12 lg:py-16">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7">
                <Link to={`/journal/${leadPost.slug}`} className="block group">
                  <div className="img-zoom-wrapper aspect-[16/10] bg-[#EAE8E1] overflow-hidden border border-[rgba(48,58,53,0.12)] shadow-subtle rounded-[2px]">
                    <img
                      src={leadPost.image || leadPost.coverImage || leadPost.thumbnail || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"}
                      alt={leadPost.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";
                      }}
                      className="w-full h-full object-cover max-w-full"
                    />
                  </div>
                </Link>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-wider text-[#5C6661]">
                  <span className="text-[#C27D66] uppercase tracking-widest font-semibold">
                    Featured Article
                  </span>
                  <span>•</span>
                  <span>{leadPost.date}</span>
                  <span>•</span>
                  <span>{leadPost.readTime}</span>
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#303A35] group-hover:text-[#C27D66] transition-colors leading-tight font-normal">
                  <Link to={`/journal/${leadPost.slug}`}>
                    {leadPost.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-[#5C6661] leading-relaxed font-light">
                  {leadPost.excerpt}
                </p>

                <div className="pt-2">
                  <Button to={`/journal/${leadPost.slug}`} variant="primary" size="md" arrow>
                    Read Full Article
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4. JOURNAL ARCHIVE GRID (Deep Muted Forest #303A35) */}
      <section className="bg-[#303A35] text-[#F5F3ED] py-16 sm:py-24">
        <div className="editorial-container">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <h2 className="font-editorial text-3xl text-[#F5F3ED] font-normal">No articles found in this category.</h2>
              <p className="text-[#A3ADA7] text-sm font-light">Select another topic above or view all articles.</p>
              <Button onClick={() => setSelectedCategory('All')} variant="outlineLight" size="sm">
                Show All Articles
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {gridPosts.map((post) => (
                <JournalCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. NEWSLETTER SUBSCRIPTION BANNER (Deep Forest Black #1D211F) */}
      <section className="bg-[#1D211F] text-[#F5F3ED] border-t border-[rgba(245,243,237,0.10)] py-16 sm:py-24 text-center">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold block">Newsletter</span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-normal">
            Subscribe to Studio Updates
          </h2>
          <p className="text-[#A3ADA7] text-sm sm:text-base font-light leading-relaxed">
            Get our latest articles on interior design, natural materials, and new project photos delivered straight to your inbox.
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

export default Journal;
