# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
pnpm dev
```
Launches Next.js with Turbopack at http://localhost:3000 with hot reload enabled.

**Production build:**
```bash
pnpm build
```
Creates optimized production bundle. Run before committing significant changes.

**Serve production build locally:**
```bash
pnpm start
```
Use to validate production behavior and deployment fixes.

**Lint code:**
```bash
pnpm lint
```
Runs ESLint with Next.js and TypeScript rules. Must pass before opening PRs.

## Architecture Overview

### Tech Stack
- **Framework:** Next.js 15.5 with App Router
- **CMS:** Sanity (headless CMS for content management)
- **Styling:** Tailwind CSS v4 with semantic tokens
- **Animation:** Motion library (motion/react)
- **Forms:** react-hook-form + Zod validation
- **Language:** TypeScript (strict mode)

### Directory Structure
```
src/
├── app/                  # Next.js App Router
│   ├── (main)/          # Main site route group
│   │   ├── aboutus/
│   │   ├── blogs/
│   │   ├── media/
│   │   ├── products/
│   │   ├── services/
│   │   ├── layout.tsx   # Main site layout
│   │   └── page.tsx     # Homepage
│   ├── studio/          # Sanity Studio admin interface
│   ├── layout.tsx       # Root layout with metadata & JSON-LD
│   └── globals.css      # Global styles & Tailwind config
├── components/          # Reusable React components (PascalCase)
│   ├── aboutus/
│   ├── blog/
│   ├── layout/          # Header, Footer, Navigation
│   ├── products/
│   ├── services/
│   └── [SharedComponents].tsx
├── hooks/               # Custom React hooks
│   ├── useSmoothScroll.ts
│   └── useViewTransition.ts
└── sanity/              # Sanity CMS integration
    ├── lib/             # Sanity client configuration
    ├── schemaTypes/     # Content type schemas
    ├── utils/           # Sanity utilities
    ├── env.ts           # Environment validation
    └── structure.ts     # Studio structure config
```

### Key Architectural Patterns

**Server Components by Default:**
- Build React Server Components (RSC) unless interactivity or browser APIs are required
- Only add `"use client"` when necessary (forms, animations, browser APIs)
- Server components can import server-side utilities directly

**Motion Library Usage:**
```tsx
// Client components
import { motion } from "motion/react"

// Server components
import * as motion from "motion/react-client"
```

**Path Aliases:**
Use `~/` for all imports from `src/`:
```tsx
import { Hero } from "~/components/Hero"
import { client } from "~/sanity/lib/client"
```
Never use relative paths like `../../components/Hero`.

**Sanity CMS Integration:**
- Content types defined in `src/sanity/schemaTypes/`
- Sanity Studio available at `/studio` route
- Client configured in `src/sanity/lib/client.ts`
- All Sanity queries use GROQ syntax

**Environment Variables:**
Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-20
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Coding Standards

**TypeScript:**
- Strict mode enabled
- Explicit types for props, hooks, utility returns
- No `any` types unless absolutely necessary

**React Components:**
- Functional components only
- PascalCase file naming (e.g., `HeroBanner.tsx`)
- Keep hooks near their usage site
- Prefer composition over prop drilling

**Styling:**
- Tailwind CSS v4 utilities preferred
- Use semantic tokens: `bg-accent`, `text-charcoal`, `bg-soft`
- Mobile-first responsive design
- Avoid custom inline CSS variables

**Component Organization:**
- Domain-specific components in subdirectories (`components/blog/`, `components/services/`)
- Shared components at root of `components/` directory
- Keep route-specific components colocated with routes when only used there

**Validation:**
- Use `react-hook-form` for form state management
- Use `zod` schemas for input validation
- Validate all user inputs and external data

## Commit Guidelines

**Commit Message Format:**
```
feat: Add passenger elevator specs
fix: Correct animation timing on Hero component
chore: Update dependencies
```

Use imperative mood with optional conventional commit prefixes (`feat:`, `fix:`, `chore:`).

**Pull Request Requirements:**
- Single-topic diffs
- Reference issues using `#123`
- Include before/after screenshots for UI changes
- Document manual verification steps
- Confirm `pnpm lint` and `pnpm build` succeed locally

## SEO & Metadata

**JSON-LD Structured Data:**
Root layout includes four JSON-LD blocks:
1. Organization with aggregate rating
2. Website with sitelinks searchbox
3. LocalBusiness (HomeAndConstructionBusiness) with service areas
4. BreadcrumbList for navigation

When adding new routes, maintain consistent metadata patterns using Next.js `metadata` export.

**Viewport & Theme:**
- Theme color: `#2ae394` (accent color)
- Viewport configured in root layout export
- Mobile-optimized with proper scaling

## Testing

- No automated test suite currently configured
- Manual testing required for all changes
- Use `pnpm lint` as primary quality gate
- Validate responsive behavior manually across breakpoints

## Important Notes

- **Never commit secrets** to the repository; use `.env.local`
- Sanity Studio configuration uses `"use client"` directive at top level
- ViewTransition wrapper in root layout enables native view transitions
- Route groups like `(main)` don't affect URL structure
- All media assets go in `public/` directory
- Optimize images before committing