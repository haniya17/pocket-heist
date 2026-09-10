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

## Architecture

Next.js 16 App Router project (React 19, TypeScript, Tailwind CSS v4). This is a starter/scaffold project for the Claude Code Masterclass, themed as a playful office-prank task manager ("heists" assigned between coworkers).

### Route groups

The app is split into two layout contexts under `app/`, using Next.js route groups (folder names in parens don't affect the URL):

- `app/(public)/` — unauthenticated pages (splash, login, signup, a `/preview` sandbox for trying new UI components in isolation). Layout wraps children in `<main className="public">`.
- `app/(dashboard)/` — authenticated app area (`/heists`, `/heists/create`, `/heists/[id]`). Layout renders the shared `Navbar` component above `<main>`.

The root `app/(public)/page.tsx` is intended purely as a splash/redirect page: logged-in users go to `/heists`, logged-out users go to `/login`. That redirect logic is not yet implemented — there is no auth or data layer in the project yet, only static placeholder UI.

### Components

Components live one-per-folder under `components/<Name>/`, e.g. `components/Navbar/{Navbar.tsx, Navbar.module.css, index.ts}`, where `index.ts` re-exports the default so callers can `import Navbar from "@/components/Navbar"`. Styling mixes Tailwind utility classes with CSS Modules for component-scoped styles.

The `@/*` import alias maps to the project root (configured in `tsconfig.json`, respected in tests via `vite-tsconfig-paths`).

### Styling

Tailwind v4 is configured via `@tailwindcss/postcss` (no `tailwind.config.js` — theme is defined inline in `app/globals.css` using the `@theme` directive: color tokens like `--color-primary`, `--color-dark`, and `--font-sans`). Shared layout utility classes (`.page-content`, `.center-content`, `.form-title`) are also defined in `globals.css` and reused across pages rather than repeating Tailwind utilities inline.

### Testing

Vitest + Testing Library + jsdom, configured in `vitest.config.mts`. Tests mirror the `components/` structure under `tests/` (e.g. `tests/components/Navbar.test.tsx`). `globals: true` is set, so `describe`/`it`/`expect` don't need importing, but the existing test explicitly imports them from `vitest`.
