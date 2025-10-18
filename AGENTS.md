# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js 15.5.2 App Router with React 19.1.0
  - `(main)/`: Main site route group containing all public pages
    - Route-specific layouts in each section (aboutus, blogs, media, products, services)
    - Dynamic routes: `/products/[slug]/[city]` for location-based SEO
    - Sitemaps per section for better SEO organization
  - `studio/`: Sanity Studio admin at `/studio` route
  - Root files: `layout.tsx`, `globals.css`, `not-found.tsx`, `robots.ts`, `sitemap.ts`
- `src/components/`: Organized by domain with PascalCase file naming
  - `aboutus/`, `blog/`, `homepage/`, `layout/`, `media/`, `products/`, `services/`
  - Shared components at root level for cross-domain usage
  - Import with `~/components/...` path alias
- `src/hooks/`: Custom React hooks
  - `useSmoothScroll.ts`: Smooth scrolling for anchor navigation
  - `useViewTransition.ts`: **DO NOT USE** - View transitions not utilized in this project
- `src/sanity/`: Comprehensive Sanity CMS integration
  - `lib/`: Type definitions (*Types.ts) and client configuration
  - `schemaTypes/`: 26 content schemas with validation rules
  - `utils/`: Data fetching utilities (get*.ts) and icon mapper
- `public/`: Static assets (logos, favicons, images)
- Config files: `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `sanity.config.ts`

## Build, Test, and Development Commands
- `pnpm dev`: Launches the Next.js development server with Turbopack on `http://localhost:3000` and enables hot refresh.
- `pnpm build`: Produces an optimized production bundle; run before shipping significant changes.
- `pnpm start`: Serves the production build locally; validate deployment fixes here when needed.
- `pnpm lint`: Runs ESLint with Next.js and TypeScript rules; resolve warnings before opening a PR.

## Coding Style & Naming Conventions
- **TypeScript:** Strict mode enabled; explicit types required for props, hooks, and utility returns. No `any` types.
- **React Components:** Functional components only. Use `use client` only when necessary (forms, animations, browser APIs, event handlers).
- **Server Components First:** Default to React Server Components (RSC). Use async/await for data fetching.
- **Motion Library:**
  - Client components: `import { motion } from "motion/react"`
  - Server components: `import * as motion from "motion/react-client"`
- **Styling:**
  - Tailwind CSS v4 utilities with semantic tokens: `bg-accent` (#2ae394), `text-charcoal`, `bg-soft`, `bg-brand`, `text-brand`
  - Use `clsx` and `tailwind-merge` for conditional classes
  - Glass morphism effects: `glass-solid`, `glass-transparent`
  - Mobile-first responsive design with `md:`, `lg:` breakpoints
- **Path Aliases:** Always use `~/` for imports from `src/`. Never use relative paths like `../../`.
- **Icons:** Use `~/sanity/utils/iconMapper.ts` for all backend-integrated icons (Sanity CMS controlled).
- **Component Naming:** PascalCase files (e.g., `HeroBanner.tsx`, `ProductCard.tsx`). One component per file.
- **Sanity Integration:**
  - Type definitions from `~/sanity/lib/*Types.ts`
  - Data fetching via `~/sanity/utils/get*.ts` utilities
  - GROQ queries for all Sanity data
  - Image optimization via `~/sanity/lib/image.ts`
- **Navigation:** Use `useSmoothScroll` hook for anchor links. **DO NOT use View Transition API.**

## Testing Guidelines
- Automated tests are not yet configured. Do not add new test suites unless aligning with an agreed tooling plan.
- If you must validate behavior locally, rely on manual checks or ad-hoc scripts kept outside the repo.
- Ensure `pnpm lint` passes as the primary guardrail before submitting work.

## Commit & Pull Request Guidelines
- Write commits in the imperative mood (e.g., `Add passenger elevator specs`), optionally prefixed with `feat:`, `fix:`, or `chore:`.
- Keep diffs focused on a single topic and reference issues using `#123` when applicable.
- Pull requests should explain intent, summarize key changes, and include before/after screenshots for UI work plus manual verification steps.
- Confirm builds and linting succeed locally; call out rollback notes when changes impact deployments or infrastructure.

## Security & Configuration Tips
- **Never commit secrets:** Use `.env.local` for all environment variables
- **Required Environment Variables:**
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
  - `NEXT_PUBLIC_SITE_URL`
- **Form Validation:** Use `react-hook-form` + `zod` schemas for all user inputs
- **Sanity Validation:** Schema-level validation rules defined in `schemaTypes/`
- **Media Assets:**
  - Static files in `public/` (optimize before commit)
  - CMS images via Sanity (automatic optimization)
  - DNS prefetch and preconnect for Sanity CDN
- **Deployment:** Cloudflare Pages with `@opennextjs/cloudflare` adapter

## Key Features & Patterns
- **Location-Based SEO:** Products support `/products/[slug]/[city]` with unique content requirements (min 1500 words)
- **Glass Morphism Navbar:** Adapts appearance on scroll with `glass-solid` / `glass-transparent` classes
- **Smooth Scrolling:** Custom hook for anchor navigation, works across pages
- **Active Route Detection:** Navbar highlights current section with visual indicators
- **Persistent UI Elements:**
  - WhatsApp button (dynamic phone from Sanity)
  - Catalog download button with modal
  - nextjs-toploader for page transitions
- **Modals:** Gallery modals, team member modals, certificate modals
- **Portable Text:** Rich content rendering from Sanity with custom components
- **Animations:** Motion library for entrance animations, carousels, and interactions
- **Typography:** DM Sans font with `display: swap` and preload optimization
