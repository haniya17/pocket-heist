# Login/Signup Authentication Forms

## Context

`/login` and `/signup` currently render only a static heading (`app/(public)/login/page.tsx`, `app/(public)/signup/page.tsx`) — no actual form exists yet, and there's no auth/data layer in the project. Per [_specs/login-signup-auth-forms.md](../_specs/login-signup-auth-forms.md), we need a working (but non-functional-backend) form on both pages: email + password fields, a show/hide password toggle, a submit button, and an easy way to switch between login and signup modes **without a full page navigation** (confirmed via the spec's answered Open Questions: in-place swap, light validation, clear form after submit).

This will be the **first client component** in this codebase (`grep -rn '"use client"' app/ components/` returns zero matches today) since it needs interactive state (typed input, password visibility, mode toggle). There's also no existing `<input>` anywhere in the repo, so input styling is greenfield — it should visually match the existing `.btn` / `.form-title` theme rather than introduce a new visual language.

## Approach

Build one shared, self-contained client component, `AuthForm`, that owns all form state (email, password, show/hide, and current mode). Both `/login` and `/signup` render the same component with a different `initialMode` prop — the component's internal mode state means toggling between login/signup is instant client-side state, not a route change, satisfying "switch without navigation."

### New component: `components/AuthForm/`

Following the existing `components/Navbar` / `components/Avatar` folder convention exactly (no exceptions found in the codebase):

- `AuthForm.tsx` — the client component (`"use client"` as the first line)
- `AuthForm.module.css` — styled via `@reference "../../app/globals.css";` + `@apply`, matching `Navbar.module.css`'s pattern (not `Skeleton`'s raw-`var()` pattern, since this needs several Tailwind utilities composed together)
- `index.ts` — `export { default } from "./AuthForm"`

**Component behavior:**

- Props: `{ initialMode: "login" | "signup" }`
- Internal state: `mode` (seeded from `initialMode`), `email`, `password`, `showPassword`
- Renders: a heading reflecting the current mode (reusing the existing `.form-title` class), an email input (`type="email"`, `required`), a password input (`type={showPassword ? "text" : "password"}`, `required`) with a toggle button using `Eye`/`EyeOff` from `lucide-react` (same plain-import pattern already used for `Clock8` in `Navbar.tsx` / splash page), a submit button (reusing the existing `.btn` class, label follows `mode`), and a "switch mode" button (plain `<button type="button">`, not a link) that flips local `mode` state.
- Validation is deliberately "light": rely on native HTML validation (`required`, `type="email"`) rather than custom JS — the browser blocks submission until both fields are filled and the email looks valid. No extra library or manual regex needed.
- `onSubmit`: `preventDefault()`, `console.log` the submitted `{ mode, email, password }`, then clear `email`/`password` back to `""` (mode is left as-is).

### Page updates

- `app/(public)/login/page.tsx` — replace the static `<h2 className="form-title">` with `<AuthForm initialMode="login" />` (the component now owns the heading so it can change with mode). Also fixes the existing bug where this file's function is misnamed `SignupPage` — rename to `LoginPage`.
- `app/(public)/signup/page.tsx` — same change, `<AuthForm initialMode="signup" />`.
- Both keep their existing `center-content` / `page-content` wrapper divs — only the inner content changes.

### Styling (`AuthForm.module.css`)

New, minimal classes needed (no existing input styles to reuse since none exist yet):

- `.form` — flex column layout, constrained width, centered (`flex flex-col gap-4 max-w-sm mx-auto`)
- `.field` — input styling consistent with the dark theme (`bg-light`, `text-heading`, rounded, padded; a `border-primary` focus state to match `.btn`'s primary-color accent)
- `.passwordWrapper` — relative wrapper so the show/hide icon can sit inside the password input
- `.toggle` — absolutely positioned icon button inside `.passwordWrapper`
- `.switch` — small, muted, underlined text button for the mode-switch control (visually distinct from the primary `.btn`)

## Files to modify/create

- `components/AuthForm/AuthForm.tsx` (new)
- `components/AuthForm/AuthForm.module.css` (new)
- `components/AuthForm/index.ts` (new)
- `app/(public)/login/page.tsx` (modify — swap static heading for `<AuthForm>`, fix function name)
- `app/(public)/signup/page.tsx` (modify — swap static heading for `<AuthForm>`)
- `tests/components/AuthForm.test.tsx` (new)

## Testing

Per the spec's Testing Guidelines, one focused test file — `tests/components/AuthForm.test.tsx` — using Vitest + Testing Library (`render`/`screen`) and `@testing-library/user-event` (already a devDependency, currently unused elsewhere in the repo — this will be its first real usage):

1. Renders email field, password field, hide/show toggle, and a "Log In" submit button when `initialMode="login"`.
2. Renders a "Sign Up" submit button when `initialMode="signup"`.
3. Clicking the show/hide toggle changes the password input's `type` between `"password"` and `"text"`.
4. Typing values and submitting the form calls `console.log` with the entered email/password, and clears both fields afterward.
5. Clicking the mode-switch control flips the visible submit button label (e.g. "Log In" → "Sign Up") without any navigation/router call involved.

## Verification

1. `npm test tests/components/AuthForm.test.tsx` — confirm all new tests pass.
2. `npm run dev`, then visually check in the browser:
   - `/login` shows email/password fields, a working show/hide toggle, and a "Log In" button.
   - `/signup` shows the same, with a "Sign Up" button.
   - The mode-switch control flips the form in place (URL stays the same).
   - Submitting either form logs `{ mode, email, password }` to the browser console and clears the inputs.
3. `npm run lint` to confirm no ESLint issues (first client component + first real hooks usage in the repo).
