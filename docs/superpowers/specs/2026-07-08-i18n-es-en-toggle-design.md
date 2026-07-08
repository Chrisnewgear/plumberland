# Design — Spanish/English i18n with navbar toggle

**Date:** 2026-07-08
**Status:** Approved (design), pending implementation plan

## Goal

Add an English version of the marketing site alongside the existing Spanish
content, switchable at runtime via an **ES / EN pill toggle** in the navbar,
using the **i18next / react-i18next** stack. Spanish stays the default; the
user's choice is remembered across visits.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Library | `i18next` + `react-i18next` + `i18next-browser-languagedetector` |
| Default language | Spanish (`es`) |
| Detection | `localStorage` only → fallback `es`. **No** auto browser-language detection. |
| Persistence | `localStorage` key `lang`, restored on return visits |
| Toggle UI | Two-segment `ES / EN` pill in navbar (desktop actions + mobile panel) |
| English copy | Natural, fluent EN marketing copy (not literal), authored during implementation |

## Non-goals (YAGNI)

- No URL routing / `/en` paths — runtime state + localStorage only.
- No third language; structure allows adding one later but we don't build for it now.
- No translation of EmailJS backend templates. The contact form submits
  language-neutral field `name` attributes (`name`, `phone`, `email`, `service`,
  `description`) — those stay as-is. Only the visible form labels/placeholders
  are translated.

## Architecture

### File layout

```
src/i18n/
  index.js              # i18next init + config + language detector + <html lang> sync
  locales/
    es.json             # Spanish — source of truth (existing copy, verbatim)
    en.json             # English — natural marketing translation
```

### Initialization (`src/i18n/index.js`)

- Configure `i18next` with `react-i18next` and `i18next-browser-languagedetector`.
- Detector order: `['localStorage']`, caches: `['localStorage']`, lookup key `lang`.
- `fallbackLng: 'es'`, `supportedLngs: ['es', 'en']`.
- `interpolation.escapeValue: false` (React already escapes).
- Single default namespace (`translation`) with nested keys (see below). A
  namespace-per-component split is unnecessary for a site this size.
- On init and on every `languageChanged` event, set
  `document.documentElement.lang` to the active language and
  `document.title` to `t('meta.title')`.

### Wiring

- `src/main.jsx` imports `./i18n` **before** rendering `<App/>` so i18next is
  initialized first.
- Each content component gains `const { t } = useTranslation()` and replaces
  every inline Spanish literal with `t('<section>.<key>')`.
- Repeating/list content (services, faqs, steps, project groups, work areas,
  qualities) is stored as arrays in the JSON and read with
  `t('<section>.items', { returnObjects: true })`, then mapped. Icons stay in
  the component (not translatable) and are paired to items by index.
- Dynamic strings use interpolation:
  - `t('guarantee.stepLabel', { n })` → "Paso 1" / "Step 1"
  - `t('workAreas.consult', { area })` → "Consultar sobre Carpintería" / "Ask about Carpentry"
  - `t('workAreas.videoLabel', { n, area })`, `t('workAreas.photoLabel', { n, area })`

### Shared service names

The 12 trade names (Carpintería, Fontanería, Pintura, Electricidad, Albañilería,
Limpieza, Jardinería, Cerrajería, Aire acondicionado, Vidriería, Tapicería,
Remodelaciones) appear in **five** places: Hero chips, Services cards,
WorkerProfile areas, CTA `<select>` options, Footer links.

They live once under `serviceNames` (array, index-stable) in each locale file.
Components that need the localized trade name read from `serviceNames`; the
Services and WorkerProfile sections that also need descriptions keep those in
their own section arrays but align by the same index/order.

> Note: the CTA `<select>` **display text** is localized, but each `<option>`'s
> submitted value must stay identical in both languages (or map to a stable
> value) so EmailJS receives a consistent `service` field regardless of UI
> language. Implementation will set `value` to the Spanish canonical name and
> localize only the visible label.

### Toggle component

New `src/components/LangToggle/LangToggle.jsx` + `LangToggle.module.scss`.

- Renders two segments: `ES` and `EN`.
- Active segment styled highlighted; `aria-pressed={active}` on each button;
  group wrapped with an accessible label (`t('nav.language')`).
- `onClick` → `i18n.changeLanguage('es' | 'en')` (detector caches to localStorage).
- Rendered twice in `Navbar.jsx`: inside `styles.actions` (desktop) and inside
  the mobile `styles.panel`. Styling adapts via existing navbar SCSS patterns.

### `index.html`

- Static `lang="es"` and Spanish `<title>` remain as the pre-hydration default
  (correct for first paint since ES is the default). After hydration,
  `src/i18n/index.js` keeps `<html lang>` and `document.title` in sync with the
  active language.

## Translation key inventory (namespaces)

One entry per section; each holds the strings currently hardcoded in that component.

- `meta` — page title, meta description
- `nav` — 6 link labels, brand name, CTA button, menu aria labels, `language` label
- `hero` — badge, h1, intro paragraph, 3 CTA labels, search-box label, 3 commitment items (title+note), proof-panel heading/subtitle
- `stats` — 4 quality items (value + label), section aria-label
- `services` — kicker, h2, intro paragraph, single highlighted line, "Ver trabajos del área" link, 12 service descriptions
- `about` — kicker, h2, 2 paragraphs, "Forma de trabajo" heading, 3 qualities (title+desc), 2 image alt texts
- `projects` — kicker, h2, paragraph, gallery link, 3 groups (title+desc)
- `workAreas` — kicker, h2, paragraph, per-area consult link, "Videos del área"/"Fotos del área" headings, video/photo placeholder labels
- `guarantee` — badge, h2, paragraph, step label, 5 steps (title+desc)
- `faq` — h2, intro, 5 Q&A pairs
- `cta` — h2, paragraph, success block (heading, body, reset button), form labels/placeholders (name, phone, email, service prompt + "Selecciona un servicio", description), submit ("Pedir presupuesto") + sending ("Enviando…") states, error message, 3 contact-option labels, closing note
- `footer` — brand name, tagline, 3 column titles + their link labels, copyright line
- `serviceNames` — 12 trade names (shared)

## Error handling / edge cases

- Missing key → i18next falls back to `es` (fallbackLng), so a partial `en.json`
  degrades gracefully rather than showing raw keys.
- Language switch re-renders all consumers via context; framer-motion elements
  keyed by (now-translated) titles remount and replay entrance animation once —
  acceptable, and unaffected under reduced-motion.
- `returnObjects` arrays must have matching length/order across locales and match
  the icon arrays in components; a mismatch shows fallback content, caught in
  manual testing.

## Testing (manual)

1. Load site → renders Spanish; `<html lang="es">`.
2. Click `EN` → every section (nav, hero, stats, services, about, projects, work
   areas, guarantee, faq, cta, footer) switches to English; `<html lang="en">`;
   tab title updates.
3. Reload → English persists (localStorage).
4. Toggle back to `ES` → persists on reload.
5. Mobile: open hamburger panel → toggle present and functional.
6. Submit contact form in EN → EmailJS still receives correct `service` value.
7. Reduced-motion: no animation regressions on switch.

## Implementation order (for the plan)

1. Add deps; create `src/i18n/index.js` + empty locale scaffolding; import in `main.jsx`.
2. Populate `es.json` from existing copy (verbatim) + author `en.json`.
3. Build `LangToggle` component; mount in Navbar (desktop + mobile).
4. Migrate components to `t()` one at a time (Navbar → Hero → … → Footer).
5. Wire `<html lang>` + title sync.
6. Manual test pass across the checklist.
