# Atelier Vauquelin — Client Handover & Review Package

**Project**: Atelier Vauquelin Editorial Website & Portfolio  
**Status**: Client-Facing Interactive Demo / Design Sign-Off Build  
**Stack**: React 18, Vite, Tailwind CSS, GSAP 3 (ScrollTrigger + Flip), React Router v6  
**Demo Build Artifacts**: `/dist`  

---

## 1. Executive Summary & Scope Overview

This interactive preview build represents the completed design system, structural architecture, and animation choreography for the new **Atelier Vauquelin** digital home. Built to mirror an editorial art monograph, the site showcases the studio's dual expertise in monumental architecture, historic restoration, and sensory interior design across Paris, London, and Geneva. All 10 core page layouts, dynamic project case study templates, filter systems, and interactive enquiry workflows are fully realized with production-grade interaction design.

> **Note on Content**: Curated high-resolution architectural photography from Unsplash, sample monographs, and representative team biographies currently serve as realistic placeholders pending final client asset delivery. All client-side forms validate inputs, reject spam bots via hidden honeypots, and log completed brief payloads to the browser console.

---

## 2. Deploying for Live Client Review

This repository is pre-configured with routing rules (`vercel.json`, `netlify.toml`, `public/_redirects`) for immediate 1-click deployment on any modern hosting provider:

### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy directly from the project directory
vercel --prod
```

### Option B: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy the pre-built dist folder
netlify deploy --dir=dist --prod
```

### Option C: GitHub Pages / Static Server
Run `npx serve dist` to preview the production build locally or host the `/dist` directory directly on any static server.

---

## 3. Targeted Feedback Questionnaire for Client Review

To streamline final sign-off, we invite your feedback on the following key areas:

1. **Hero Intro Sequence Pacing**: Does the opening logo and headline reveal on the [Home Overview](file:///c:/Users/ssmuk/OneDrive/Documents/Desktop/2nd%20web/src/pages/Home.jsx) feel suitably dramatic and slow-paced, or would you prefer a faster entrance?
2. **Portfolio Layout & Category Filters**: Test the category filter pills and 3 view modes (3-column, 2-column large, and tabular ledger) on the [Projects Page](file:///c:/Users/ssmuk/OneDrive/Documents/Desktop/2nd%20web/src/pages/Projects.jsx). Does the GSAP Flip animation transition smoothly on your target devices?
3. **Typography & Material Palette**: Confirm the visual balance of the serif display typeface (*Cormorant Garamond*), structural sans (*Plus Jakarta Sans*), warm alabaster background (`#FAF9F5`), and warm brass accent (`#B68648`).
4. **Project Detail Narrative Structure**: Review the 3-part case study narrative (**01 The Challenge**, **02 The Concept**, **03 The Solution**) and full-screen swipeable lightbox on any [Project Detail Page](file:///c:/Users/ssmuk/OneDrive/Documents/Desktop/2nd%20web/src/pages/ProjectDetail.jsx).
5. **Commission Inquiry Form**: Review the project brief questionnaire on the [Contact Page](file:///c:/Users/ssmuk/OneDrive/Documents/Desktop/2nd%20web/src/pages/Contact.jsx) (typology choices, budget tiers, site survey file upload) to ensure it captures all required data for your studio director.

---

## 4. Production Implementation Note

This prototype has been authored in **React + GSAP** as an interactive, functional specification for design/UX sign-off. Once your team approves the aesthetic and spatial direction, this design system can either:
- **Remain in this high-performance React codebase** (ready for headless CMS integration with Sanity, Strapi, or Contentful), OR
- **Be exported into Webflow / Framer** matching the exact typography scales, tokens, and GSAP micro-interactions specified in `THEME.md` and `src/styles/tokens.css`.

---

## 5. Structured Revision Loop

When your team provides consolidated review notes:
1. We log each item into [`REVISION_LOG.md`](file:///c:/Users/ssmuk/OneDrive/Documents/Desktop/2nd%20web/REVISION_LOG.md).
2. We reopen only the relevant phase (Phase 2 for content/copy, Phase 3 for animation timing, Phase 4 for mobile tweaks).
3. We re-run targeted verification without disrupting unrelated systems.
