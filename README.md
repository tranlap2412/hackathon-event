# DreamForge

DreamForge is a hackathon event platform: a landing site where developers, designers, and people who like building with technology can browse challenge tracks, a sample schedule, and registration flows.

**Slogan:** Build Ideas Into Reality

This is an independent personal portfolio project. It demonstrates frontend architecture, responsive layout, motion, and bilingual UI. It is not an official website or product of Pione Dream, Pione Group, or any other organization.

## Demo

There is no public deployment URL yet. Run the app locally with the steps below.

## Preview

Screenshot files are not stored in this repository. After you run the dev server, capture the pages you want to show and add them here, for example:

```text
docs/preview-desktop.png
docs/preview-mobile.png
```

The images already in `public/` are the site icon, the Open Graph card, and the background video used by the page. They are not full-page screenshots.

## Features

These are implemented in the current source:

- Single-page event site with hero, about, challenge tracks, a sample recognition board, timeline, registration, and contact
- English and Vietnamese copy, with locale routes at `/en` and `/vi` and a language switcher
- Desktop navigation and a mobile navigation dialog
- Opening animation, star field, scroll progress, and a background video below the large breakpoint
- Track cards that open a detail dialog
- Multi-step registration and project submission forms with client-side validation
- Contact form that stays on the page and does not send data to a server

Registration, submission, and contact are interface previews. Entries are not stored or delivered.

## Tech stack

Checked against `package.json` and the source:

- [Next.js](https://nextjs.org) 15 (App Router, static export, Turbopack in dev)
- React 19
- TypeScript
- Tailwind CSS 4
- [Lingui](https://lingui.dev) for English and Vietnamese
- Framer Motion and GSAP for animation
- React Three Fiber and Three.js for the star field
- React Hook Form and Yup for the registration and submission forms
- Radix UI and Ark UI primitives in the component set
- Lucide for icons
- Yarn 4

## Getting started

### Requirements

- Node.js 20 or newer (developed on Node.js 22)
- Yarn 4, available through Corepack

### Install and run

```bash
git clone <your-repository-url>
cd hackathon
corepack enable
yarn install
yarn dev
```

Open [http://localhost:8387](http://localhost:8387). The root route redirects to `/en`. Vietnamese is at `/vi`.

### Environment

No environment file is required to run the site. Canonical and Open Graph URLs use `NEXT_PUBLIC_BASE_URL` when it is set. If it is unset, they fall back to `http://localhost:8387`.

```bash
NEXT_PUBLIC_BASE_URL=https://your-domain.example
```

### Checks

```bash
yarn lint
yarn tsc --noEmit
yarn build
```

There is no test script in `package.json`.

`yarn extract` refreshes the Lingui catalogs after copy changes. `yarn compile` writes the TypeScript catalogs. The app loads the `.po` files directly.

`yarn build` writes a static export. `yarn start` serves a production build when you are not using the export output.

## Project structure

```text
src/app/                  Root redirect and locale layout, metadata, global styles
src/view/landing/         Page sections and registration / submission dialogs
src/components/layout/    Header, footer, navigation, preloader, progress bar
src/components/effects/   Star field and background video
src/components/ui/        Shared interface primitives
src/locales/              English and Vietnamese catalogs
src/middleware.ts         Locale redirect
public/                   Icons, Open Graph image, background video
```

## Possible next steps

These are not built yet:

- Persist registration and submission on a real backend
- Replace the sample schedule and challenge briefs with a live event, if one exists
- Add automated tests and an accessibility pass on the dialogs and forms
- Publish a deployment URL and page screenshots

## Disclaimer

This is an independent personal portfolio project created for demonstration and educational purposes. It is not an official website or product of Pione Dream, Pione Group, or any other organization.

Sample tracks, dates, and recognition tiers are fictional interface content. They are not a live competition, and nothing on the site has been awarded.
