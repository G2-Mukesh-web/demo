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

  const categories = ['All', 'Materiality', 'Philosophy', 'Press & Awards', 'Craft', 'Insights', 'Restoration'];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return journalPosts;
    return journalPosts.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  const leadPost = journalPosts[0];
  const gridPosts = filteredPosts.filter((p) => selectedCategory !== 'All' || p.id !== leadPost.id);

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        title="Monograph & Journal Dispatches"
        description="Scholarly essays, stone research, and project monographs from the architectural laboratories of Atelier Vauquelin."
      />

      {/* 1. JOURNAL HERO BANNER (#F1ECE3 Warm Alternate Section) */}
      <section className="bg-bg-warm py-20 lg:py-28 border-b border-border-warm/60">
        <div className="editorial-container">
          <div className="max-w-4xl">
            <span className="editorial-eyebrow mb-3 block">Studio Monograph & Dispatches</span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ink-primary mb-6">
              Essays, Material Inquiries & Architecture Notes
            </h1>
            <p className="text-ink-muted text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              A quarterly publication exploring raw geological memory, passive acoustic atmospheres, structural craftsmanship, and project monographs from our ateliers in Paris, London, and Geneva.
            </p>
          </div>

          {/* 2. CATEGORY FILTERS */}
          <div className="mt-12 pt-8 border-t border-border-warm/60 flex flex-wrap items-center gap-2 sm:gap-3">
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

      {/* 3. LEAD FEATURED MONOGRAPH ESSAY (#FFFFFF Surface Section) */}
      {selectedCategory === 'All' && leadPost && (
        <section className="border-b border-border-light bg-bg-surface py-12 lg:py-16">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7">
                <Link to={`/journal/${leadPost.slug}`} className="block group">
                  <div className="img-zoom-wrapper aspect-[16/10] bg-bg-warm overflow-hidden border border-border-light shadow-card">
                    <img
                      src={leadPost.image}
                      alt={leadPost.title}
                      className="w-full h-full object-cover max-w-full"
                    />
                  </div>
                </Link>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-wider text-ink-subtle">
                  <span className="text-accent-brass uppercase tracking-widest font-semibold">
                    Featured Monograph
                  </span>
                  <span>•</span>
                  <span>{leadPost.date}</span>
                  <span>•</span>
                  <span>{leadPost.readTime}</span>
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-ink-primary group-hover:text-accent-brass transition-colors leading-tight font-normal">
                  <Link to={`/journal/${leadPost.slug}`}>
                    {leadPost.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
                  {leadPost.excerpt}
                </p>

                <div className="pt-2">
                  <Button to={`/journal/${leadPost.slug}`} variant="primary" size="md" arrow>
                    Read Monograph Essay
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4. JOURNAL ARCHIVE GRID (#FAF9F5 with #FFFFFF Cards) */}
      <Section variant="default" spacing="loose">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <h2 className="font-editorial text-3xl text-ink-primary font-normal">No articles found in this category.</h2>
            <p className="text-ink-muted text-sm font-light">Select another topic above or view the complete monograph archive.</p>
            <Button onClick={() => setSelectedCategory('All')} variant="outline" size="sm">
              Show All Dispatches
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {gridPosts.map((post) => (
              <JournalCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </Section>

      {/* 5. MONOGRAPH REGISTRY SUBSCRIPTION BANNER (#181816 Dark Premium Section) */}
      <section className="bg-bg-dark text-white border-t border-border-dark py-16 sm:py-24 text-center">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="editorial-eyebrow text-accent-brass">Print & Digital Registry</span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-white font-normal">
            Subscribe to the Atelier Vauquelin Monograph.
          </h2>
          <p className="text-ink-subtle text-sm sm:text-base font-light leading-relaxed">
            Delivered quarterly to patrons, critics, and academic institutions — featuring archival essays, uncompressed plate photography, and geotechnical studies.
          </p>
          <div className="pt-2">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Join Academic Mailing Registry
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Journal;
