import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Dynamic SEO Component
 * Manages document title, meta descriptions, Open Graph, and JSON-LD structured data.
 */
export function SEO({
  title,
  description,
  image,
  type = 'website',
  schema,
}) {
  const location = useLocation();
  const siteName = "ATELIER VAUQUELIN";
  const defaultDesc = "Award-winning architecture, interior design, and bespoke spatial masterplanning studio creating enduring residential, cultural, and hospitality environments.";
  const defaultImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85";

  const fullTitle = title ? `${title} — ${siteName}` : `${siteName} — Architecture & Spatial Interior Studio`;
  const metaDesc = description || defaultDesc;
  const metaImage = image || defaultImage;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attrName, attrVal, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('name', 'description', metaDesc);
    setMetaTag('name', 'author', siteName);

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:image', metaImage);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:site_name', siteName);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', metaImage);

    // 3. Inject Structured Data (JSON-LD) if provided
    let scriptTag = document.getElementById('json-ld-structured-data');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [fullTitle, metaDesc, metaImage, type, schema, location.pathname]);

  return null;
}

export default SEO;
