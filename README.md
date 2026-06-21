# Jarno Mommens — Portfolio

Personal portfolio built with **React 19**, **TypeScript**, and **Vite** (Rolldown),
deployed on **Cloudflare Pages**.

## Tech stack

| Layer          | Choice                                      |
| -------------- | ------------------------------------------- |
| Framework      | React 19                                    |
| Language       | TypeScript (strict)                         |
| Bundler        | Vite 7 (Rolldown)                           |
| Linting        | ESLint 9 (flat config, type-aware rules)    |
| Hosting        | Cloudflare Pages                            |
| PDF rendering  | pdfjs-dist (canvas-based, lazy-loaded)      |

## Project structure

```
src/
  app/             App shell, entry point
  features/
    hero/          Full-viewport hero with collapsed sticky nav
    projects/      Carousel (desktop) / feed (mobile) project showcase
    cv/            Lazy-loaded interactive PDF viewer
    shared/        Reusable components (ContentFrame, ErrorBoundary)
  data/            Static data (projects list, social links)
  types/           Ambient type declarations
  assets/          Images, icons, documents
```

## Getting started

```bash
npm install
npm run dev        # Start dev server
npm run build      # Type-check + production build
npm run preview    # Preview production build locally
```

## Deployment

Pushed to the `main` branch → auto-deploys to Cloudflare Pages.
Build command: `npm run build`
Output directory: `dist`

## Design decisions

- **No router** — URL hash-based navigation keeps the bundle tiny while
  preserving deep-linking and back-button support.
- **Sections stay mounted** — hidden with `display: none` instead of being
  torn down on tab switches, so heavy components like the PDF viewer are
  never re-initialized.
- **Lazy-loaded CV** — `pdfjs-dist` (~1.3 MB) is code-split with `React.lazy`
  so it never blocks the initial paint.
- **Carousel ↔ feed** — a `useMediaQuery` hook switches between a 3D-ish
  carousel on desktop and a stacked feed on mobile so neither experience
  feels compromised.
