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
- **Styling:** **vanilla-extract** (zero-runtime TS-in-JS) wired via
  `@vanilla-extract/next-plugin` in `next.config.js`. Tokens, sprinkles, and
  primitives live in `src/styles/` and `src/components/styled/`. The legacy
  `theme-ui`/`@emotion/react` stack has been removed — see "Styling" below.

## Layout

```
src/
  bin/         One-off scripts (Contentful migrations, slug rewrites). Excluded from lint.
  components/  React components. Layout primitives live in components/layout.
  data/        Static data (continent/country lookups, etc.).
  pages/       Next.js Pages Router. URLs are Finnish (diktaattorit, valeuutiset, ...).
  services/    Cross-cutting modules: graphql client, firebase, i18n, url helpers, cache.
  styles/      vanilla-extract foundation: theme.css.ts (token contract + globals),
               sprinkles.css.ts (responsive utility props), cx.ts.
  components/styled/  Shared primitives that replace what theme-ui's `Box`/`Flex`/
                      `Heading`/`Container`/form controls/`Button` used to provide.
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

The styling system is **vanilla-extract** (zero-runtime TS-in-JS, with
`@vanilla-extract/sprinkles` for responsive utility props and
`@vanilla-extract/recipes` for variant-driven components). The build is wired
via `@vanilla-extract/next-plugin` in `next.config.js`. The legacy `theme-ui` /
`@emotion/react` stack has been fully removed.

### Where things live

- `src/styles/theme.css.ts` — the token contract (`themeContract`) + the
  global CSS injected at app boot (replaces the old theme-ui `<Global/>`).
  Also exports `breakpoints` for the rare cases where a sprinkle isn't enough.
- `src/styles/sprinkles.css.ts` — the responsive sprinkles. Conditions are
  `mobile` / `tablet` / `desktop`, mirroring the legacy `[768, 992]`
  breakpoints. Property shorthands match what `theme-ui` used: `m`, `p`, `mx`,
  `my`, `mt`, `mb`, `ml`, `mr`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `bg`,
  `color`, `fontSize`, `fontWeight`, `display`, `alignItems`,
  `justifyContent`, `flexDirection`, `gap`.
- `src/components/styled/` — the primitives that replace `theme-ui`'s
  `Box`, `Flex`, `Heading`, `Container`, `Input`, `Textarea`, `Label`,
  `Radio`, `MenuButton`, `Button`. `Box`/`Flex` accept sprinkle props
  directly (`<Box mb="3" px="2" bg="primary" />`) and are polymorphic via
  `as=`. `Button` is a recipe with `primary` (default) / `secondary`
  variants. The link variants live in `src/components/styled/link.css.ts`
  (`default`, `menu`, `tag`, `footer`, `paginator`).

### How to write styles

For everything that fits sprinkles (margin, padding, color, fontSize,
display, basic flex), pass props on `Box`/`Flex` or call the `sprinkles`
function inline:

```tsx
import { Box } from "@/components/styled/Box";
import { sprinkles } from "@/styles/sprinkles.css";

<Box mt="3" px="2" bg="superLight">…</Box>
<FaIcon className={sprinkles({ mr: "1" })} />
```

For anything else (custom selectors, `gridTemplateAreas`, pseudo-elements,
descendant selectors), create a co-located `Foo.css.ts` next to `Foo.tsx`
using `style()`, `globalStyle()`, or `recipe()`. Reach for `themeContract.*`
to read tokens — never hard-code colours or spacing values.

```ts
// Foo.css.ts
import { style, globalStyle } from "@vanilla-extract/css";
import { themeContract } from "@/styles/theme.css";

export const card = style({
  padding: themeContract.space["3"],
  backgroundColor: themeContract.colors.superLight
});
globalStyle(`${card} h2`, { marginBottom: themeContract.space["2"] });
```

Note: vanilla-extract's `style()` does **not** allow descendant `& foo`
selectors. Use `globalStyle(\`${parent} foo\`, …)` for that.

### Tokens

The design tokens are the source of truth and were preserved verbatim during
the theme-ui migration:

- **Brand colour:** `#de0000` (the very specific shade of dictator red).
- **Greyscale ladder:** `superLight`, `extraLight`, `veryLight`, `light`,
  `notSoLight`, `veryDark` (yes, the names are like that on purpose).
- **Font:** Barlow, loaded via Google Fonts in `_document.tsx`.
- **Spacing:** `[0, 4, 8, 16, 32, 64, 128, 256, 512]` (px, indexed 0–8).
- **Font sizes:** `[12, 14, 16, 20, 24, 32, 48, 64]` (px, indexed 0–7).
- **Breakpoints:** `[768, 992]` (`mobile` / `tablet` / `desktop`).
- **Container max-width:** `1200px`.

If you need to add tokens, add them to `themeContract` in `theme.css.ts` —
don't scatter hex codes across components.

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
- Don't add a second styling library. vanilla-extract is the only sanctioned
  styling tool.
- Don't replace `pnpm` with another package manager.
- Don't reintroduce a CSS-in-JS runtime (theme-ui, emotion, styled-components).
  vanilla-extract is zero-runtime; keep it that way.
- Don't "helpfully" rewrite the Finnish UI strings into English. The site
  is Finnish.

## Styling migration history

The codebase used to be on `theme-ui` + `@emotion/react` with a `funk` preset
and a custom theme in `src/services/theme.ts`. That stack has been removed in
favour of vanilla-extract; tokens (colours, spacing, fontSizes, breakpoints,
font family) were preserved verbatim and visual diffs should be near-zero.
Greenfield work uses vanilla-extract directly — see the "Styling" section.
