# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router (routes, `layout.tsx`, `page.tsx`, `globals.css`).
- `src/components/`: Reusable React components (PascalCase filenames).
- `public/`: Static assets (SVGs, media). Served from `/`.
- `eslint.config.mjs`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`: Tooling configs.
- Import alias: use `~/...` for paths under `src/` (see `tsconfig.json`).

## Build, Test, and Development Commands
- `pnpm dev`: Run the app locally with Turbopack at `http://localhost:3000`.
- `pnpm build`: Production build (Turbopack).
- `pnpm start`: Serve the production build.
- `pnpm lint`: Run ESLint using Next.js + TypeScript rules.
Example: `pnpm dev` then edit `src/app/page.tsx` to see hot reload.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true`). Prefer typed props and returns.
- Components: Functional React components, PascalCase filenames (e.g., `Navbar.tsx`).
- Routes: App Router segments are folder-based, kebab-case where applicable.
- Imports: Prefer `~/...` alias for local modules.
- Styling: Tailwind CSS v4 via PostCSS; co-locate UI behavior with components.
- Linting: ESLint `next/core-web-vitals` + `next/typescript`. Fix warnings when possible.

## Testing Guidelines
- No test runner is configured yet. If adding tests:
  - Unit: place under `src/__tests__/*.test.tsx` (Vitest + React Testing Library suggested).
  - E2E: `e2e/*.spec.ts` (Playwright suggested).
  - Add scripts like `"test": "vitest"` and enforce coverage for new code.

## Commit & Pull Request Guidelines
- Commits: Use clear, imperative subjects (e.g., "Add Navbar sticky behavior"). Optional prefixes: `feat:`, `fix:`, `chore:`.
- Scope small, focused changes; reference issues when relevant (`#123`).
- PRs: Include a concise description, before/after screenshots for UI changes, steps to verify locally, and any risk/rollback notes.
- Passing `pnpm lint` is required; include migration notes for breaking changes.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for environment variables.
- Validate external input (forms use `react-hook-form` + `zod` where applicable).
- Large media belongs in `public/` and should be optimized.

