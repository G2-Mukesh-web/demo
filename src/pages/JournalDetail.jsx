import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Mail, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import JournalCard from '../components/cards/JournalCard';
import SEO from '../components/seo/SEO';
import { journalPosts } from '../data/studioData';

export function JournalDetail() {
  const { slug } = useParams();

  const post = journalPosts.find((p) => p.slug === slug || p.id === slug) || journalPosts[0];

  const relatedArticles = journalPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ateliervauquelin.com';

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Read this article from Atelier Vauquelin: ${currentUrl}`)}`;
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "datePublished": "2024-01-15",
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Atelier Vauquelin"
    },
    "description": post.excerpt
  };

  return (
    <div className="w-full overflow-x-hidden">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
        schema={articleSchema}
      />

      {/* 1. TOP BREADCRUMB STRIP (#F1ECE3 Warm Alternate Section) */}
      <div className="bg-bg-warm border-b border-border-warm/60 py-3.5">
        <div className="editorial-container flex flex-wrap items-center justify-between gap-2 font-sans text-xs">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-ink-muted hover:text-ink-primary transition-colors min-h-[44px] font-semibold uppercase tracking-wider text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Journal Archive</span>
          </Link>
          <div className="flex items-center gap-3 font-medium uppercase tracking-wider text-[11px]">
            <span className="text-accent-brass font-semibold">{post.category}</span>
            <span className="text-ink-subtle">•</span>
            <span className="text-ink-subtle">{post.date}</span>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER SECTION (#FAF9F5 Primary Background) */}
      <article className="pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="editorial-container max-w-4xl space-y-8">
          
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-ink-subtle">
              <span className="px-3 py-1 bg-bg-surface border border-border-light text-ink-primary font-semibold uppercase tracking-widest text-[11px]">
                {post.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-accent-brass" />
                {post.readTime}
              </span>
              <span>•</span>
              <span>{post.date}</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-ink-primary font-normal leading-[1.12]">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-ink-muted leading-relaxed font-light pt-2">
              {post.excerpt}
            </p>

            <div className="pt-4 border-t border-border-light flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-brass/10 border border-accent-brass/30 flex items-center justify-center font-editorial text-lg text-accent-brass">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-sans font-semibold text-ink-primary uppercase tracking-wider text-[11px]">
                    {post.author}
                  </p>
                  <p className="text-[11px] text-ink-subtle">Atelier Vauquelin Research</p>
                </div>
              </div>

              {/* Social Share Triggers */}
              <div className="flex items-center gap-2">
                <span className="text-ink-subtle uppercase tracking-widest text-[10px] mr-1 hidden sm:inline">Share:</span>
                <button
                  onClick={shareOnLinkedIn}
                  className="w-11 h-11 border border-border-light bg-bg-surface hover:border-accent-brass hover:text-accent-brass flex items-center justify-center transition-colors shadow-subtle"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="w-11 h-11 border border-border-light bg-bg-surface hover:border-accent-brass hover:text-accent-brass flex items-center justify-center transition-colors shadow-subtle"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={shareViaEmail}
                  className="w-11 h-11 border border-border-light bg-bg-surface hover:border-accent-brass hover:text-accent-brass flex items-center justify-center transition-colors shadow-subtle"
                  aria-label="Share via Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. HERO IMAGE FRAME (#FFFFFF Surface Frame) */}
          <div className="aspect-[16/9] w-full bg-bg-warm overflow-hidden border border-border-light shadow-card">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover max-w-full"
            />
          </div>

          {/* 4. RICH ESSAY BODY & EDITORIAL TYPOGRAPHY */}
          <div className="space-y-8 pt-6 font-sans text-ink-muted text-base sm:text-lg leading-relaxed font-light">
            <p>
              The permanence of an architectural structure is determined before the first stone is laid. When we examine the quarries of Burgundy, Istria, or Vals, we are confronting geologic strata formed over four hundred million years. Every sedimentary layer represents a biological epoch—a tactile record of atmospheric compression, calcium deposits, and mineral hydration.
            </p>

            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-ink-primary font-normal pt-4">
              I. The Thermal and Acoustic Memory of Raw Mineral Beds
            </h2>

            <p>
              Modern structural envelopes frequently rely on complex artificial membranes, synthetic foams, and mechanized air filtration to simulate domestic equilibrium. In contrast, massive stone construction exploits inherent thermal inertia. During the Mediterranean summer, a 60cm wall of Saint-Maximin limestone absorbs daylight solar radiation without transferring heat to the interior, releasing that stored warmth only during cool nocturnal hours.
            </p>

            {/* Editorial Pull Quote Block (#FFFFFF Surface Box) */}
            <blockquote className="my-8 p-6 sm:p-10 bg-bg-surface border-l-2 border-accent-brass space-y-3 shadow-subtle border border-border-light">
              <p className="font-editorial text-xl sm:text-2xl lg:text-3xl text-ink-primary italic leading-relaxed font-normal">
                "We do not decorate spaces with stone; we excavate spaces from the mountain, leaving behind only the voids required for human inhabitation."
              </p>
              <cite className="font-sans text-xs font-semibold uppercase tracking-widest text-accent-brass block not-italic">
                — Camille Vauquelin, Notes on Lithic Architecture (2023)
              </cite>
            </blockquote>

            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-ink-primary font-normal pt-4">
              II. Hand-Applied Lime Washes and Light Filtration
            </h2>

            <p>
              When light enters a room finished in mineral lime plaster, it behaves differently than when reflecting off synthetic polymer paint. Because slaked lime crystals are crystalline and porous, daylight is refracted multidirectionally, creating a velvety, soft ambient luminance that softens sharp shadow lines and produces genuine psychological calm.
            </p>

            <div className="aspect-[16/9] w-full bg-bg-warm overflow-hidden border border-border-light my-8">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
                alt="Plaster and Light Exploration"
                className="w-full h-full object-cover max-w-full"
              />
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-ink-primary font-normal pt-4">
              III. Conclusion: Toward an Architecture of Slow Patina
            </h2>

            <p>
              As our studio expands its commissions across Europe, our core commitment remains unchanged: to craft silent, tactile environments that honor craft traditions while solving modern climatic demands. True luxury is not novelty; it is longevity.
            </p>
          </div>

          {/* 5. ARTICLE FOOTER / TAGS / SHARING */}
          <div className="pt-10 mt-10 border-t border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-sans text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-ink-subtle uppercase tracking-wider text-[11px] mr-1">Filed under:</span>
              <span className="px-3 py-1 bg-bg-warm border border-border-light uppercase tracking-wider font-semibold text-[10px] text-ink-primary">
                {post.category}
              </span>
              <span className="px-3 py-1 bg-bg-warm border border-border-light uppercase tracking-wider font-semibold text-[10px] text-ink-primary">
                Architecture
              </span>
              <span className="px-3 py-1 bg-bg-warm border border-border-light uppercase tracking-wider font-semibold text-[10px] text-ink-primary">
                Tectonic Research
              </span>
            </div>

            <Button to="/journal" variant="outline" size="sm" arrow>
              Return to Journal Index
            </Button>
          </div>

        </div>
      </article>

      {/* 6. RELATED ARTICLES MODULE (#FFFFFF Surface Section with #FAF9F5 Cards) */}
      <Section
        variant="surface"
        eyebrow="Further Scholarship"
        title="Related Monograph Dispatches"
        subtitle="Explore further essays on craft provenance, stone restoration, and acoustic design."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {relatedArticles.map((p) => (
            <JournalCard key={p.id} post={p} />
          ))}
        </div>
      </Section>

      {/* 7. BOTTOM CALL TO ACTION (#181816 Dark Premium Section) */}
      <section className="bg-bg-dark text-white border-t border-border-dark py-16 sm:py-24 text-center">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="editorial-eyebrow text-accent-brass">Academic & Project Dialogues</span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-white font-normal">
            Engage with our research atelier.
          </h2>
          <p className="text-ink-subtle text-sm sm:text-base font-light leading-relaxed">
            We welcome collaborative research inquiries, lecture invitations, and architectural commissions across Europe.
          </p>
          <div className="pt-2">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Contact the Atelier
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JournalDetail;
