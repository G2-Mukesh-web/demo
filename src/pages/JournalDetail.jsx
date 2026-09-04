import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Linkedin, Twitter, Mail } from 'lucide-react';
import Section from '../components/primitives/Section';
import Button from '../components/primitives/Button';
import JournalCard from '../components/cards/JournalCard';
import SEO from '../components/seo/SEO';
import { journalPosts } from '../data/studioData';

export function JournalDetail() {
  const { slug } = useParams();
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="editorial-container py-32 text-center">
        <SEO title="Article Not Found" description="The requested article does not exist." />
        <h1 className="font-editorial text-4xl text-ink-primary mb-4">Article Not Found</h1>
        <p className="text-ink-muted mb-8">The journal article you requested is not currently available.</p>
        <Button to="/journal" variant="primary">Return to Journal</Button>
      </div>
    );
  }

  const relatedArticles = journalPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Atelier Vauquelin",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ateliervauquelin.com/logo.png"
      }
    }
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Read this article on Atelier Vauquelin: ${window.location.href}`)}`;
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

      {/* 1. TOP BREADCRUMB STRIP (Deep Forest Black #1D211F) */}
      <div className="bg-[#1D211F] text-[#F5F3ED] border-b border-[rgba(245,243,237,0.10)] py-3.5">
        <div className="editorial-container flex flex-wrap items-center justify-between gap-2 font-sans text-xs">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-[#A3ADA7] hover:text-[#C27D66] transition-colors min-h-[44px] font-semibold uppercase tracking-wider text-[11px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C27D66]" />
            <span>All Articles</span>
          </Link>
          <div className="flex items-center gap-3 font-medium uppercase tracking-wider text-[11px]">
            <span className="text-[#C27D66] font-semibold">{post.category}</span>
            <span className="text-[#A3ADA7]">•</span>
            <span className="text-[#A3ADA7]">{post.date}</span>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER SECTION (Warm Linen #EFEFEA) */}
      <article className="bg-[#EFEFEA] text-[#303A35] pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="editorial-container max-w-4xl space-y-8">
          
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-[#5C6661]">
              <span className="px-3 py-1 bg-[#F5F5F0] border border-[rgba(48,58,53,0.12)] text-[#303A35] font-semibold uppercase tracking-widest text-[11px] rounded-[2px]">
                {post.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C27D66]" />
                {post.readTime}
              </span>
              <span>•</span>
              <span>{post.date}</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#303A35] font-normal leading-[1.12]">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-[#5C6661] leading-relaxed font-light pt-2">
              {post.excerpt}
            </p>

            <div className="pt-4 border-t border-[rgba(48,58,53,0.12)] flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C27D66]/15 border border-[#C27D66]/30 flex items-center justify-center font-editorial text-lg text-[#C27D66]">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-sans font-semibold text-[#303A35] uppercase tracking-wider text-[11px]">
                    {post.author}
                  </p>
                  <p className="text-[11px] text-[#5C6661]">Atelier Vauquelin</p>
                </div>
              </div>

              {/* Social Share Triggers */}
              <div className="flex items-center gap-2">
                <span className="text-[#5C6661] uppercase tracking-widest text-[10px] mr-1 hidden sm:inline">Share:</span>
                <button
                  onClick={shareOnLinkedIn}
                  className="w-11 h-11 border border-[rgba(48,58,53,0.12)] bg-[#F5F5F0] hover:border-[#C27D66] hover:text-[#C27D66] text-[#303A35] flex items-center justify-center transition-colors shadow-subtle rounded-[2px]"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="w-11 h-11 border border-[rgba(48,58,53,0.12)] bg-[#F5F5F0] hover:border-[#C27D66] hover:text-[#C27D66] text-[#303A35] flex items-center justify-center transition-colors shadow-subtle rounded-[2px]"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={shareViaEmail}
                  className="w-11 h-11 border border-[rgba(48,58,53,0.12)] bg-[#F5F5F0] hover:border-[#C27D66] hover:text-[#C27D66] text-[#303A35] flex items-center justify-center transition-colors shadow-subtle rounded-[2px]"
                  aria-label="Share via Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. HERO IMAGE FRAME */}
          <div className="aspect-[16/9] w-full bg-[#EAE8E1] overflow-hidden border border-[rgba(48,58,53,0.12)] shadow-subtle rounded-[2px]">
            <img
              src={post.image || post.coverImage || post.thumbnail || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"}
              alt={post.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";
              }}
              className="w-full h-full object-cover max-w-full"
            />
          </div>

          {/* 4. RICH ESSAY BODY */}
          <div className="space-y-8 pt-6 font-sans text-[#5C6661] text-base sm:text-lg leading-relaxed font-light">
            <p>
              The quality of a home begins with the materials you choose. When you select real stone, solid wood, and breathable wall finishes, you create spaces that feel calm, natural, and built to last.
            </p>

            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#303A35] font-normal pt-4">
              I. Natural Materials and Everyday Living
            </h2>

            <p>
              Natural materials regulate indoor temperature smoothly. Solid stone walls and proper insulation keep rooms cool during hot summer days and retain warmth in the winter without needing constant mechanical air conditioning.
            </p>

            {/* Pull Quote Block */}
            <blockquote className="my-8 p-6 sm:p-10 bg-[#F5F5F0] border-l-2 border-[#C27D66] space-y-3 shadow-subtle border border-[rgba(48,58,53,0.12)] rounded-[2px]">
              <p className="font-editorial text-xl sm:text-2xl lg:text-3xl text-[#303A35] italic leading-relaxed font-normal">
                "We believe true luxury is creating homes that feel natural, quiet, and comfortable for the people who live in them."
              </p>
              <cite className="font-sans text-xs font-semibold uppercase tracking-widest text-[#C27D66] block not-italic">
                — Camille Vauquelin, Founding Partner
              </cite>
            </blockquote>

            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#303A35] font-normal pt-4">
              II. Soft Light and Natural Wall Finishes
            </h2>

            <p>
              When daylight enters a room with natural lime plaster walls, light reflects softly throughout the space, creating a calm, relaxing atmosphere with gentle shadows.
            </p>

            <div className="aspect-[16/9] w-full bg-[#EAE8E1] overflow-hidden border border-[rgba(48,58,53,0.12)] my-8 rounded-[2px]">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
                alt="Natural materials and lighting"
                className="w-full h-full object-cover max-w-full"
              />
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#303A35] font-normal pt-4">
              III. Building Quality That Lasts
            </h2>

            <p>
              As our studio designs homes across India, our main goal is simple: to create comfortable, beautiful homes built with high craftsmanship that you and your family can enjoy for years to come.
            </p>
          </div>

          {/* 5. ARTICLE FOOTER */}
          <div className="pt-10 mt-10 border-t border-[rgba(48,58,53,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-sans text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#5C6661] uppercase tracking-wider text-[11px] mr-1">Filed under:</span>
              <span className="px-3 py-1 bg-[#F5F5F0] border border-[rgba(48,58,53,0.12)] uppercase tracking-wider font-semibold text-[10px] text-[#303A35] rounded-[2px]">
                {post.category}
              </span>
              <span className="px-3 py-1 bg-[#F5F5F0] border border-[rgba(48,58,53,0.12)] uppercase tracking-wider font-semibold text-[10px] text-[#303A35] rounded-[2px]">
                Architecture
              </span>
              <span className="px-3 py-1 bg-[#F5F5F0] border border-[rgba(48,58,53,0.12)] uppercase tracking-wider font-semibold text-[10px] text-[#303A35] rounded-[2px]">
                Interior Design
              </span>
            </div>

            <Button to="/journal" variant="outline" size="sm" arrow>
              Return to All Articles
            </Button>
          </div>

        </div>
      </article>

      {/* 6. RELATED ARTICLES MODULE (Deep Muted Forest #303A35) */}
      <section className="bg-[#303A35] text-[#F5F3ED] py-16 sm:py-24 border-t border-[rgba(245,243,237,0.10)]">
        <div className="editorial-container">
          <div className="mb-12">
            <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold mb-2 block">More Articles</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5F3ED] font-normal mb-3">Related Stories & Articles</h2>
            <p className="text-[#A3ADA7] text-sm sm:text-base font-light">Read more about design ideas, materials, and home tips.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedArticles.map((p) => (
              <JournalCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION (Deep Forest Black #1D211F) */}
      <section className="bg-[#1D211F] text-[#F5F3ED] border-t border-[rgba(245,243,237,0.10)] py-16 sm:py-24 text-center">
        <div className="editorial-container max-w-3xl space-y-6">
          <span className="font-sans text-xs uppercase tracking-widest text-[#C27D66] font-semibold block">Get in Touch</span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5F3ED] font-normal">
            Have a question about our design work?
          </h2>
          <p className="text-[#A3ADA7] text-sm sm:text-base font-light leading-relaxed">
            Reach out to our team to discuss project ideas or design consultations.
          </p>
          <div className="pt-2">
            <Button to="/contact" variant="primary" size="lg" arrow>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JournalDetail;
