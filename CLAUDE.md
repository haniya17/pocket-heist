# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
npm test         # run vitest test suite (watch mode by default)
```

Run a single test file: `npx vitest run tests/components/Navbar.test.tsx`
Run tests matching a name: `npx vitest run -t "renders the main heading"`

Formatting is automatic: a `PostToolUse` hook (`.claude/settings.json`) runs `prettier --write` on every file Claude writes or edits. `.prettierrc` sets `semi: false` to match the codebase's no-semicolon style — there is no separate `format` npm script.

## Architecture

Next.js 16 App Router project (React 19, TypeScript, Tailwind CSS v4). This is a starter/scaffold project for the Claude Code Masterclass, themed as a playful office-prank task manager ("heists" assigned between coworkers).

### Route groups

The app is split into two layout contexts under `app/`, using Next.js route groups (folder names in parens don't affect the URL):

- `app/(public)/` — unauthenticated pages (splash, login, signup, a `/preview` sandbox for trying new UI components in isolation). Layout wraps children in `<main className="public">`.
- `app/(dashboard)/` — authenticated app area (`/heists`, `/heists/create`, `/heists/[id]`). Layout renders the shared `Navbar` component above `<main>`.

The root `app/(public)/page.tsx` is intended purely as a splash/redirect page: logged-in users go to `/heists`, logged-out users go to `/login`. That redirect logic is not yet implemented — there is no auth or data layer in the project yet, only static placeholder UI, and `/login` and `/signup` (via the shared `AuthForm` component) only `console.log` submitted values rather than performing real authentication.

### Components

Components live one-per-folder under `components/<Name>/`, e.g. `components/Navbar/{Navbar.tsx, Navbar.module.css, index.ts}`, where `index.ts` re-exports the default so callers can `import Navbar from "@/components/Navbar"`. Styling mixes Tailwind utility classes with CSS Modules for component-scoped styles; some CSS modules use `@reference "../../app/globals.css"` + `@apply` (e.g. `Navbar.module.css`, `AuthForm.module.css`), others use raw `var(--color-*)` custom properties (e.g. `Skeleton.module.css`) — both patterns exist in the codebase.

The `@/*` import alias maps to the project root (configured in `tsconfig.json`, respected in tests via `vite-tsconfig-paths`).

Everything is a Server Component by default (no `"use client"` anywhere except `AuthForm`, which needs it for form state/interactivity). Add `"use client"` only when a component actually needs state, effects, or event handlers.

### Styling

Tailwind v4 is configured via `@tailwindcss/postcss` (no `tailwind.config.js` — theme is defined inline in `app/globals.css` using the `@theme` directive: color tokens like `--color-primary`, `--color-dark`, and `--font-sans`). Shared layout utility classes (`.page-content`, `.center-content`, `.form-title`, `.btn`) are also defined in `globals.css` and reused across pages rather than repeating Tailwind utilities inline.

### Testing

Vitest + Testing Library + jsdom, configured in `vitest.config.mts`. Tests mirror the `components/` structure under `tests/` (e.g. `tests/components/Navbar.test.tsx`). `globals: true` is set, so `describe`/`it`/`expect` don't need importing, but existing tests explicitly import them from `vitest`. `@testing-library/user-event` is available for simulating typing/clicks (see `AuthForm.test.tsx`).

### Spec-driven feature workflow

This project uses custom slash commands (`.claude/commands/`) to scaffold new feature work:

- `/spec <idea>` — turns a short idea into a detailed markdown spec under `_specs/<feature-slug>.md` (following the structure in `_specs/template.md`) and switches to a new `claude/feature/<feature-slug>` branch. It aborts if the working directory isn't clean.
- `/component <description>` — scaffolds a new UI component via TDD: writes a failing test under `tests/components/`, implements the component following the folder convention above, then adds it to the `/preview` page.
- `/commit-message` — drafts a commit message from currently staged changes, in an emoji-prefixed `<type>: <description>` format (see recent commit history for examples); it proposes but never auto-commits.

Plans produced from a spec (e.g. via Plan mode) are saved under `_plans/<feature-slug>.md` for later reference.

## Checking Documentation
- **important:** When implementing any lib/framework specific features, ALWAYS check the appropriate lib/framework documentation using the Context7 MCP server before writing any code.