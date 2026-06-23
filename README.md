# ProFix Handyman — Modern Handyman Services Platform

A landing page built with **React + SASS (Vite)**, scaffolded from the Stitch
project _"Modern Handyman Services Platform"_.

> ⚠️ The visuals below are **placeholder content**. The actual Stitch screen
> (image + code) is gated behind Google login and could not be downloaded from
> the screen ID alone. Drop the real Stitch export in to finalize — see
> [Wiring in the Stitch design](#wiring-in-the-stitch-design).

## Stitch source

- **Project:** Modern Handyman Services Platform (`14157405647238363465`)
- **Screen:** ProFix Handyman – Complete Landing Page (`6f919d47ad584b43ada4e69e590948d8`)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Project structure

```
src/
  main.jsx                 # app entry, imports global.scss
  App.jsx                  # composes the landing-page sections
  styles/
    _tokens.scss           # design tokens + mixins (auto-injected into every module)
    global.scss            # resets + base element styles
  components/
    Navbar/                # Navbar.jsx + Navbar.module.scss
    Hero/
    Services/
    HowItWorks/
    Testimonials/
    CTA/
    Footer/
  assets/                  # drop Stitch image assets here
```

### SASS setup

- Each component owns a CSS-module SASS file (`*.module.scss`) for scoped styles.
- `src/styles/_tokens.scss` holds colors, spacing, radii, and mixins. It is
  auto-injected into every `*.module.scss` via `additionalData` in
  `vite.config.js`, so tokens like `$color-primary` and `@include container`
  are available without an explicit `@use`.
- `@` is aliased to `/src`.

## Wiring in the Stitch design

1. Export the screen from Stitch (Copy code / Export → Code) and save the image
   into `src/assets/`.
2. Update `src/styles/_tokens.scss` with the design's real colors and type scale.
3. Translate the Stitch markup into the corresponding component, replacing the
   placeholder hero image in `Hero.jsx` with the imported asset.
