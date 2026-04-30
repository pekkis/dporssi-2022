# AGENTS.md

Instructions for AI coding agents (and humans-pretending-to-be-one) working on
**Diktaattoripörssi 2022** — the one and only dictator ranking service since 1999.

If you skip this file and start hammering the keyboard, the puhemies will be
displeased and Pier Paolo Pasolini will haunt your test fixtures.

## Collaboration style

- **Direct and honest.** No sugarcoating, no performative politeness. Say what
  the code does and what it doesn't. Disagree when warranted, with reasons.
- **Respectful and non-malicious.** Snark at the code, never at the people.
- **Coding humor is welcome.** Liberally. This is a satire site about
  dictators; po-faced commit messages would be a tragedy.
- **Test/mock data subject:** when you need a recurring fake person, use
  **Pier Paolo Pasolini** (or close associates from his filmography). No
  `Foo Bar`, no `John Doe`, no `Lorem Ipsum` humans.

## Project at a glance

- **Framework:** Next.js (Pages Router, `--webpack`), React 19, TypeScript.
- **Package manager:** `pnpm` (`packageManager` field pins the version; use
  `corepack` to get it). **Do not** introduce `npm`/`yarn` lockfiles.
- **Node:** see `.nvmrc` (currently `24`).
- **Data:** Contentful (GraphQL) for content, Firebase (auth + Firestore) for
  user state, Google reCAPTCHA v3 for spam control. None of these work without
  secrets, which the public repo deliberately does not ship.
- **i18n:** `react-i18next` + `i18next`, Finnish by default
  (`NEXT_PUBLIC_LOCALE=fi`).
- **State:** `zustand` for client stores (see `src/components/dictator-search/store.ts`).
- **Styling — legacy:** `theme-ui` (with `@emotion/react`) using the `funk`
  preset, plus a custom theme in `src/services/theme.ts`. Components are
  liberally sprinkled with `/** @jsxImportSource theme-ui */` and the `sx`
  prop. **This is being migrated** — see "Styling" below.

## Layout

```
src/
  bin/         One-off scripts (Contentful migrations, slug rewrites). Excluded from lint.
  components/  React components. Layout primitives live in components/layout.
  data/        Static data (continent/country lookups, etc.).
  pages/       Next.js Pages Router. URLs are Finnish (diktaattorit, valeuutiset, ...).
  services/    Cross-cutting modules: graphql client, firebase, theme, i18n, url helpers, cache.
  styles/      Global CSS (globals.css) and legacy CSS modules.
  types.ts     Shared domain types (Dictator, Reign, ContentfulImageData, ...).
public/        Static assets.
docker/        Container assets used by compose.yml.
```

## Commands

| Task          | Command                       | Notes                                                 |
| ------------- | ----------------------------- | ----------------------------------------------------- |
| Install       | `corepack pnpm install`       | Use `corepack` so the pinned pnpm version is used.    |
| Dev server    | `corepack pnpm dev`           | `next dev --webpack`. Needs a populated `.env`.       |
| Build         | `corepack pnpm build`         | `next build --webpack`. Hits Contentful at build time. |
| Lint          | `corepack pnpm lint`          | ESLint flat config (`eslint.config.mjs`).             |
| Type-check    | `npx tsc --noEmit`            | `tsconfig.json` sets `ignoreBuildErrors: true`, so   |
|               |                               | the production build won't catch type regressions.    |

There is no test suite. If you change behaviour that nobody verifies, accept
that you are personally responsible for it.

### Build won't run for you

`next build` calls Contentful's GraphQL API during static generation. Without
the secrets in `.env`, builds fail with `ENOTFOUND graphql.contentful.com`.
That's expected; rely on `pnpm lint` and `tsc --noEmit` for validation. Don't
waste 10 minutes wondering why DNS hates you.

## Styling

The legacy stack is `theme-ui` + `@emotion/react`, configured in
`src/services/theme.ts`. The migration target is **vanilla-extract** (zero-runtime
TS-in-JS), already wired via `@vanilla-extract/next-plugin` in `next.config.js`.

Until the migration completes, both systems may coexist; greenfield work
should go straight to vanilla-extract. See "Migration in progress" at the
bottom of this file for current status.

### Tokens

Whatever the styling library, the **design tokens** are the source of truth
and should be preserved verbatim where possible:

- **Brand color:** `#de0000` (the very specific shade of dictator red).
- **Greyscale ladder:** `superLight`, `extraLight`, `veryLight`, `light`,
  `notSoLight`, `veryDark` (yes, the names are like that on purpose).
- **Font:** Barlow, loaded via Google Fonts in `_document.tsx`.
- **Spacing / fontSizes:** standard Theme UI scales (`[0, 4, 8, 16, 32, 64, 128, 256, 512]`
  for space; `[12, 14, 16, 20, 24, 32, 48, 64]` for font sizes).
- **Breakpoints:** `[768, 992]` (`src/services/theme.ts`).
- **Container max-width:** `1200px`.

If you need to add tokens, add them in one canonical place; don't scatter
hex codes across components.

## Conventions

- **Imports:** use the `@/*` alias (configured in `tsconfig.json`) for
  anything under `src/`. Don't write `../../../components/...`.
- **Files:** components are PascalCase `.tsx`. Pages mirror the URL structure
  (Finnish slugs: `diktaattorit`, `vieraskirja`, `keksipolitiikka`, ...).
- **Component primitives:** prefer the layout primitives in
  `src/components/layout/` over hand-rolled wrappers. `Container`, `Layout`,
  `ContentBox`, `Header`, `Footer` are the building blocks of every page.
- **Links:** use `InternalLink` for anything internal (it integrates with
  Next router and `isActive`), `ExternalLink` for outgoing — never raw `<a>`
  for site-internal navigation.
- **Markdown:** `Markdown` component renders Contentful copy through
  `react-markdown` with the renderers in `src/services/markdown.tsx`.
- **Prettier:** double quotes, no trailing commas, LF endings, 80 col
  (`.prettierrc`). Run lint to enforce.
- **TypeScript:** the codebase has many pre-existing `any`s and implicit
  `any`s. **Don't** start a fix-everything crusade in unrelated files; do
  improve types in the code you touch.

## Things not to do

- Don't commit anything from `.env` (yes, the repo currently ships an `.env`
  with real-looking secrets — that's a pre-existing situation; don't make it
  worse by adding more, and don't leak its contents in PR descriptions or
  logs).
- Don't add a second styling library on top of the two we already have.
- Don't replace `pnpm` with another package manager.
- Don't introduce a CSS-in-JS runtime; vanilla-extract is the only sanctioned
  styling tool going forward.
- Don't "helpfully" rewrite the Finnish UI strings into English. The site
  is Finnish.

## Migration in progress

This repository is currently undergoing a **theme-ui → vanilla-extract**
migration. Until it lands:

- **Status:** in progress. Both `theme-ui` and `vanilla-extract` may appear
  in the tree.
- **Goal:** move every `sx`-prop / `/** @jsxImportSource theme-ui */`
  consumer to vanilla-extract `.css.ts` files (with sprinkles for responsive
  utilities and recipes for variants), then delete `theme-ui`,
  `@theme-ui/*`, and `@emotion/react` from `package.json`.
- **Token preservation:** the colour names, spacing scale, font sizes,
  breakpoints, and font family above must stay identical across the
  migration. Visual diffs should be near-zero.
- **For new components:** use vanilla-extract directly. Do not add new
  `sx`-prop consumers.

This section will be updated as the migration completes.
