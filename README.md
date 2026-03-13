# ML Agency

ML Agency is a bilingual marketing site and demo hub for a machine learning agency serving Mexico, Latin America, and English-speaking markets. The project is designed as both a production-facing website and a reference implementation for future web design and interactive demo work.

The site combines a high-end visual system, workflow-led positioning, and interactive machine learning demos. It is intentionally built to show how technical credibility, strong UI direction, and commercial clarity can live in the same product.

## Project Purpose

This project exists to demonstrate a modern agency website that:

- sells machine learning services through clear operational outcomes instead of generic AI language
- uses animation as ambient brand atmosphere, not as distraction
- supports bilingual experiences with route-based localization
- gives prospects interactive demos that connect directly to real service categories
- can serve as a reusable foundation for future agency, product, or demo-driven sites

## What the Site Includes

### Marketing Website

- Value-first homepage focused on workflow bottlenecks, operational leverage, and technical review as the main CTA
- Services section framed around practical use cases rather than abstract capabilities
- Delivery/process section designed to build trust without fake metrics or placeholder proof
- Contact flow centered on a technical review instead of a generic form funnel

### Bilingual Experience

- Spanish and English route-based localization
- Default locale set to Spanish
- Localized navigation, homepage, demos hub, and demo pages
- Language switching that preserves page context across locales

### Interactive Demo Hub

The demo area is positioned as workflow-led proof of capability rather than a gallery of isolated technical toys.

Included demo categories:

- Computer Vision
- NLP / RAG
- Deep Learning
- Predictive Analytics

Each demo page is built around:

- workflow framing
- expected outcomes
- best-fit and poor-fit scenarios
- implementation considerations
- a live or conceptual demo surface
- a consistent review-first CTA path

## Design Direction

This project is also a reference for future web design work.

Key design principles used here:

- bold visual identity with mathematical and computational ambient backgrounds
- layered gradients, grid patterns, and motion used as atmosphere
- clear hierarchy so content remains primary
- modern, editorial landing-page composition instead of generic SaaS layouts
- responsive layouts for desktop and mobile
- accessibility-aware interaction patterns, including reduced-motion support and clear focus handling

The animation system is a deliberate part of the brand language and should be preserved in future iterations, but always as background support for the message.

## Current Status

Implemented in the current version:

- bilingual route structure under `es` and `en`
- localized homepage and demos hub
- localized service demo pages
- translated Spanish demo framing using neutral LATAM Spanish
- preservation of technical terminology in English where it is the standard international reference
- updated metadata and structured data for the localized site structure
- regression coverage for localization and demo rendering behavior

## Stakeholder Review

For local review, start the development server:

```bash
npm install
npm run dev
```

Primary local routes:

- `http://localhost:3000/es`
- `http://localhost:3000/en`
- `http://localhost:3000/es/demos`
- `http://localhost:3000/en/demos`

The root route `/` redirects to the default locale, which is currently Spanish.

## Why This Matters as a Reference Project

This repository is useful beyond this single site because it demonstrates:

- how to structure bilingual marketing sites in Next.js App Router
- how to align visual sophistication with commercial messaging
- how to integrate interactive demos into a sales narrative
- how to keep a reusable UI system while adapting content across languages and service categories

It should be treated as a practical benchmark for future agency sites, landing pages, and demo-driven product experiences.

## Technical Appendix

### Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Vitest
- Playwright

### Key Architectural Notes

- Public pages are organized under `src/app/[locale]`
- Middleware handles locale-prefixed routing and redirects
- Shared marketing copy and localization helpers live in `src/lib/i18n.ts`
- Demo content and localized demo framing live in `src/lib/demo-data.ts`
- Shared section components are locale-aware and reused across the site
- Demo pages use a shared template with service-specific content and optional interactive demo components

### Core Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
npm run test
npm run test:run
npm run test:e2e
```

### Verification

Recommended validation sequence before handoff or deployment:

```bash
npm run type-check
npm run test:run
npm run build
```

### Git Hygiene

The repo ignores local artifacts such as:

- `.next/`
- `playwright-report/`
- `test-results/`
- `.cursor/`

This keeps the project clean for collaboration and future reuse.
