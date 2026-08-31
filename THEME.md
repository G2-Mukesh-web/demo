# DESIGN SYSTEM & THEME SPECIFICATION
**Atelier Vauquelin — Architecture & Spatial Interior Studio**

This document establishes the single source-of-truth for visual design tokens, typography scales, layout grids, and component primitives across the web application.

---

## 1. Palette & Material Tones

The palette avoids generic "tech startup" blue/purple tones, relying on an architectural palette derived from limestone, patinated metals, dark basalt, and lime plaster.

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `--color-bg-primary` | `#FAF9F5` | Warm Alabaster / Calcaire Lime Off-White (default page background) |
| `--color-bg-surface` | `#FFFFFF` | Pure Mineral White (cards, modals, elevated surfaces) |
| `--color-bg-warm` | `#F1ECE3` | French Limestone / Travertine tone (hero bands, headers, callouts) |
| `--color-bg-dark` | `#121211` | Deep Obsidian / Dark Charcoal (manifesto strips, global footer) |
| `--color-bg-dark-surface` | `#1B1B19` | Dark Slate Charcoal (dark card containers) |
| `--color-ink-primary` | `#181816` | Deep Charcoal Ink (primary high-contrast headings & text) |
| `--color-ink-muted` | `#5F5E59` | Warm Graphite / Lead Pencil (body copy, subtitles) |
| `--color-ink-subtle` | `#8F8C83` | Muted Quarry Stone (metadata, dates, helper labels) |
| `--color-accent-brass` | `#B68648` | Aged Architectural Brass (CTAs, active pills, badges, accents) |
| `--color-accent-brass-hover` | `#9E7036` | Burnished Brass (hover states) |
| `--color-accent-terracotta` | `#B96646` | Tuscan Terracotta (error messages, secondary callouts) |
| `--color-accent-olive` | `#5B6350` | Nordic Olive (landscape & material tags) |
| `--color-border-light` | `rgba(24, 24, 22, 0.08)` | Light hairline borders and section dividers |
| `--color-border-medium` | `rgba(24, 24, 22, 0.16)` | Card and form input borders |
| `--color-border-dark` | `rgba(255, 255, 255, 0.12)` | Dark theme borders in footer & manifesto |

---

## 2. Typography Scale

Paired display serif for architectural grandeur with a crisp, geometric Grotesk for body reading and a technical monospace for ledger specifications.

- **Display / Heading Font**: `Cormorant Garamond`, serif
- **Body & UI Font**: `Plus Jakarta Sans`, sans-serif
- **Technical Ledger / Metadata Font**: `Space Mono`, monospace

### Type Scale Breakdown

| Role | Size Clamp / Value | Line Height | Letter Spacing | Font Family |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | `clamp(3.25rem, 6.5vw, 5.5rem)` (52–88px) | `1.06` | `-0.025em` | Serif Display |
| **Heading 1 (H1)** | `clamp(2.5rem, 4.5vw, 4.25rem)` (40–68px) | `1.08` | `-0.02em` | Serif Display |
| **Heading 2 (H2)** | `clamp(2rem, 3.2vw, 2.75rem)` (32–44px) | `1.18` | `-0.015em` | Serif Display |
| **Heading 3 (H3)** | `clamp(1.5rem, 2.2vw, 2rem)` (24–32px) | `1.25` | `-0.01em` | Serif Display |
| **Heading 4 (H4)** | `clamp(1.25rem, 1.6vw, 1.5rem)` (20–24px) | `1.3` | `0em` | Serif Display |
| **Body Large** | `1.125rem` (18px) | `1.65` | `-0.01em` | Grotesk Sans |
| **Body Regular** | `1rem` (16px) | `1.65` | `-0.01em` | Grotesk Sans |
| **Body Small** | `0.875rem` (14px) | `1.5` | `0em` | Grotesk Sans |
| **Eyebrow / Pill** | `0.75rem` (12px) | `1.2` | `0.15em` uppercase | Space Mono |
| **Technical Specs** | `0.6875rem – 0.75rem` (11–12px) | `1.4` | `0.08em` | Space Mono |

---

## 3. Layout, Spacing & 12-Column Grid

The layout reflects high-end editorial architecture monographs:
- **Max Width**: `1440px` (`--container-max-width`)
- **Gutters**: `3rem` (48px desktop), `2rem` (32px tablet), `1.25rem` (20px mobile)
- **Grid**: Strict 12-column desktop layout (`grid-cols-12`) with 2rem/32px column gaps.
- **Vertical Rhythm**:
  - Compact: `py-12 md:py-16`
  - Normal: `py-20 md:py-28 lg:py-32` (80–128px)
  - Loose: `py-28 md:py-36 lg:py-44` (112–176px)

---

## 4. Component Primitives

1. **`Button` (`/src/components/primitives/Button.jsx`)**:
   - Variants: `primary` (brass fill), `dark` (obsidian ink), `outline` (border), `ghost` (text only), `subtle` (limestone fill).
   - Features: Smooth magnetic micro-interactions, uppercase tracking, optional `arrow` (`ArrowUpRight`) animation, router link (`to`) / anchor (`href`) / `button` polymorphism.

2. **`Tag` (`/src/components/primitives/Tag.jsx`)**:
   - Used for category filters (All, Residential, Restoration, Cultural, etc.), status badges, and project metadata chips.
   - Interactive button states or non-interactive badges.

3. **`Section` (`/src/components/primitives/Section.jsx`)**:
   - Enforces consistent vertical padding, container alignment, and backdrop theme switching (`default`, `surface`, `warm`, `dark`).
   - Integrated eyebrow + title + subtitle header block with optional right-aligned action button.

4. **`Card` (`/src/components/primitives/Card.jsx`) & Specialized Cards**:
   - `ProjectCard`: 4:3 / 16:9 photography container with subtle zoom hover (`scale(1.04)`), category pill, location/year metadata, and arrow reveal.
   - `TeamCard`: Black & white to color portrait transition on hover, credentials chip, atelier location badge, and bio.
   - `JournalCard`: Monograph layout with publish date, read-time calculator, category chip, and excerpt.

---

## 5. Global Layout Shell

- **`Header` (`/src/components/layout/Header.jsx`)**:
  - Studio wordmark left, desktop navigation center/right with active underline indicators, "Enquire" CTA button, and full-screen mobile slide drawer.
- **`Footer` (`/src/components/layout/Footer.jsx`)**:
  - Full studio address blocks for Paris, London, and Geneva ateliers.
  - Interactive newsletter / monograph dispatch subscription with validation and payload logging.
  - Complete 8-link secondary sitemap, social media links, copyright notice, and animated back-to-top button.
- **`Layout` (`/src/components/layout/Layout.jsx`)**:
  - Root layout with automatic window scroll-to-top on route change.

---

## 6. Page Routing Matrix (10 Primary Views + 404)

| # | Route Path | Component Name | Description |
| :--- | :--- | :--- | :--- |
| 1 | `/` | `Home` | Hero statement, featured projects, manifesto, services teaser, testimonials, recent monograph dispatches. |
| 2 | `/about`, `/studio` | `About` | Founding narrative, 4-step methodology, quarry & craft ethics, awards timeline. |
| 3 | `/projects`, `/portfolio` | `Projects` | Filterable 12-col portfolio grid with category pills. |
| 4 | `/projects/:slug` | `ProjectDetail` | Full case study template with specs ledger, concept text, credits, gallery, next/prev navigation, and related works. |
| 5 | `/services` | `Services` | 4 core disciplines (Architecture, Interiors, Turnkey FF&E, Restoration) with deliverables and FAQ accordion. |
| 6 | `/team` | `Team` | Leadership profiles, credentials, location badges, and careers callout. |
| 7 | `/journal`, `/news` | `Journal` | Monograph articles list with category filters and featured lead essay. |
| 8 | `/journal/:slug` | `JournalDetail` | Editorial article reader with reading time, author, date, and related articles. |
| 9 | `/careers` | `Careers` | Studio culture, values, open positions, and interactive job application form. |
| 10 | `/contact`, `/enquire` | `Contact` | Comprehensive project brief inquiry form (with validation & success state) and direct atelier contact details. |
| 11 | `*` | `NotFound` | Minimalist on-brand 404 page with navigation shortcuts. |
