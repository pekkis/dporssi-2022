# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Diktaattoripörssi** ("The Dictator Exchange") — a community-driven dictator ranking/rating service live at https://www.diktaattoriporssi.com. Built with Next.js, Firebase, and Contentful CMS.

## Commands

```bash
pnpm dev          # Start development server (Webpack)
pnpm build        # Build production bundle (Webpack)
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

Bundle analysis: `ANALYZE=true pnpm build`

Docker: `docker compose up` (maps port 3550 → 3000 internally)

## Architecture

**Stack:**
- Next.js 16 with Webpack (not Turbopack)
- React 19 + TypeScript (strict mode)
- Firebase (Realtime DB + Auth) for user rankings and guestbook
- Contentful (GraphQL) as headless CMS for dictator profiles and content
- Tailwind CSS v4 (via `@tailwindcss/postcss`) for styling — configured in `src/styles/globals.css` with `@theme {}` block
- Zustand for client-side state (user rankings, auth)
- i18next for Finnish/English internationalization
- pnpm as package manager

**Path alias:** `@/*` → `./src/*`

**Key layers:**
- `src/pages/` — Next.js routes and API endpoints (`/api/auth`, `/api/ranking`, `/api/guestbook`, `/api/captcha`)
- `src/components/` — React components grouped by domain (`dictator/`, `dictator-search/`, `contentful/`, `taxonomy/`, `layout/`)
- `src/services/` — Business logic: `firebase.ts`, `firebase-admin.ts`, `state.ts` (Zustand), `graphql.ts` (Contentful client), `i18n.ts`, `config.ts`
- `src/types.ts` — All shared TypeScript types (`Dictator`, `Country`, `Continent`, `Tag`, `TaxonomyTerm`, `GuestBookEntry`, etc.)
- `src/bin/` — One-off data migration/import scripts (excluded from lint)

**Data flow:**
- Dictator profiles and content come from Contentful via GraphQL
- User rankings and guestbook entries are stored in Firebase Realtime DB
- API routes validate reCAPTCHA for user-submitted content
- Next.js standalone output used for Docker deployment

## Environment

The app requires secrets to be functional. See `.env.example` for required variables: Contentful token, Firebase credentials (service account), reCAPTCHA keys, and site URL.

## Conventions

- TypeScript build errors are ignored in `next.config.js` (`typescript.ignoreBuildErrors: true`)
- pnpm workspace with dependency minimum age enforcement (4320 min) except for Next.js ecosystem packages
- Non-root Docker user (`nextjs`) in production
