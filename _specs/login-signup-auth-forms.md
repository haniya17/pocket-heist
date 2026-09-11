# Spec for login-signup-auth-forms

branch: claude/feature/login-signup-auth-forms
figma-component (if used): N/A

## Summary 

The `/login` and `/signup` pages currently show only a placeholder heading with no actual form. This feature adds a working authentication form to each page, sharing the same fields and layout, with an easy way for the user to switch between the two modes. Since there is no auth or data layer yet, submitting either form does not create an account or log a user in — it simply logs the submitted details to the console as a placeholder for future wiring.

## Functional Requirements

- The `/login` page displays a form with an email field, a password field, and a submit button labeled for logging in.
- The `/signup` page displays a form with the same email field, password field, and a submit button labeled for signing up.
- The password field has a "hide password" icon/control that toggles the password between hidden and visible text.
- Password is hidden (masked) by default; toggling reveals the plain text and can be toggled back.
- Each form includes a way to switch to the other form (e.g. a link or toggle from login to signup and vice versa), so a user can move between the two without needing to navigate away and back.
- Submitting a form (login or signup) does not perform any real authentication or navigation — it logs the submitted form details to the browser console.
- Both forms share the same visual style and field behavior, differing only in labeling/copy appropriate to login vs. signup.

## Figma Design Reference (only if referenced)

- Not applicable — no Figma design was referenced for this feature.

## Possible Edge Cases

- User submits the form with one or both fields empty.
- User enters an email in an invalid format.
- User toggles "hide password" multiple times in a row.
- User switches from login to signup (or vice versa) after having typed something into the fields — whether the previously entered values should be cleared or preserved.
- User submits the form multiple times in quick succession.

## Acceptance Criteria

- Visiting `/login` shows an email field, a password field, a hide/show password toggle, and a login submit button.
- Visiting `/signup` shows an email field, a password field, a hide/show password toggle, and a signup submit button.
- Toggling the hide/show password control changes the password field between masked and plain text.
- A visible control on each page allows switching to the other form.
- Submitting either form logs the entered email and password to the console and does not throw an error, redirect, or otherwise attempt real authentication.

## Open Questions

- Should switching between login and signup be a link that navigates between `/login` and `/signup`, or an in-page toggle that swaps the form without a full navigation? Swap.
- Should any client-side validation (e.g. required fields, email format) be enforced before allowing submission, or is validation out of scope for this pass? Light validation.
- Should submitted values be cleared from the form after logging to the console, or left as-is? Clear

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- Each page renders its email field, password field, hide/show password control, and correctly labeled submit button.
- Toggling the hide/show password control changes the password field's visibility state.
- Submitting the form triggers a console log with the entered values.
- The control to switch between login and signup is present and functions on both pages.
