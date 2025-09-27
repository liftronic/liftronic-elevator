# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router entry points, route segments, and shared layout files. Keep route folders kebab-case and colocate `page.tsx`, `layout.tsx`, and segment-specific assets.
- `src/components/`: Reusable UI composed as functional React components in PascalCase files (e.g., `HeroBanner.tsx`). Import them with the `~/components/...` alias.
- `public/`: Static assets, favicons, and illustrations served from the root; optimize media before committing.
- Configuration lives at the repository root (`next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`). Sanity Studio resides under `src/app/studio` with supporting config in `sanity.config.ts`.

## Build, Test, and Development Commands
- `pnpm dev`: Launches the Next.js development server with Turbopack on `http://localhost:3000` and enables hot refresh.
- `pnpm build`: Produces an optimized production bundle; run before shipping significant changes.
- `pnpm start`: Serves the production build locally; validate deployment fixes here when needed.
- `pnpm lint`: Runs ESLint with Next.js and TypeScript rules; resolve warnings before opening a PR.

## Coding Style & Naming Conventions
- TypeScript is strict; define explicit types for props, hooks, and utility returns.
- Prefer functional components, `use client` boundaries only where required, and keep React hooks near usage.
- Follow Tailwind CSS v4 utilities; lean on semantic tokens such as `bg-accent` instead of custom inline variables.
- Use `~/` path aliases for anything under `src/`; avoid long relative paths.
- Maintain responsive layouts by default and document non-obvious styling choices with concise comments only when necessary.

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
- Never commit secrets or environment-specific credentials; use `.env.local` and document required keys in README onboarding sections.
- Validate inputs from forms or webhooks using the existing `react-hook-form` and `zod` patterns.
- Store large media under `public/` and prefer compressed formats to keep bundles lightweight.
