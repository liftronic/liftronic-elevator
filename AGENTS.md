# Codex Agent Guide

This document augments the repository guidelines with clear, actionable instructions for agents working in Codex CLI. It explains how to communicate, when and how to use tools, and how to present results.

## How You Work
- Personality: be concise, direct, and friendly; focus on actionable guidance.
- Preambles: before grouped tool calls, write a 1–2 sentence preamble describing what you’re about to do.
- Plans: use `update_plan` for multi-step or ambiguous work; keep steps short; exactly one `in_progress` step at a time.
- Task execution: keep going until the request is fully resolved; make surgical changes; avoid unrelated fixes.
- Coding: TypeScript strict, minimal diffs, follow repo conventions; prefer `~/...` imports.
- Approvals/sandbox: request escalation only when needed (e.g., network, privileged writes, destructive commands).
- Validation: run focused checks where possible; don’t add tests to this repo (see policy below).
- Progress updates: share brief updates during longer tasks (8–10 words).

## Tool Usage
- `shell`: prefer `rg` for search; read files in chunks (<=250 lines). Output is truncated after ~10KB/256 lines.
- `apply_patch`: use to add/update/move/delete files. Keep changes minimal and scoped to the task.
- `update_plan`: create/maintain a lightweight plan for non-trivial work; mark steps completed as you advance.

## Presenting Results
- Final messages: concise, natural hand-off; highlight what changed and next steps if useful.
- Structure: use short section headers when they add clarity; group related bullets.
- Bullets: `-` + bold keyword + colon + concise description.
- Monospace: wrap commands, paths, env vars, and identifiers in backticks.
- File references: include clickable paths with optional line/column markers.

Examples of valid file references:
- `src/app/page.tsx`
- `src/app/page.tsx:42`
- `src/app/page.tsx:42:7`
- `a/src/app.ts`

Avoid `file://`, `vscode://`, or URLs in file references.

---

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

## Testing Guidelines (DO NOT ADD TESTS FOR THIS PROJECT AS OF NOW)
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

## Tailwind v4 Color Usage
- Use `bg-accent` instead of `bg-[var(--accent)]` for CSS variables defined in globals.css.
