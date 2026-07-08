# Conversion Polish — WhatsApp-First Contact

**Date:** 2026-07-08
**Status:** Approved (design), pending implementation plan
**Scope:** Conversion-focused polish of the existing landing page. No full visual
redesign; only the sections on the contact/lead path change.

## Goal

Increase contact-request conversions for a single independent home-services
worker. The audience (WhatsApp-first, likely US-Hispanic given the NJ number)
converts better through one-tap messaging than through a long form. Make
WhatsApp the primary path everywhere, reduce form friction, and keep a
persistent contact affordance visible while scrolling.

## Constraints & principles

- Honor `PRODUCT.md`: no multi-worker/search language, no invented data
  (names, prices, experience, testimonials), blue = trust, orange = primary
  action, green = positive states.
- Preserve the existing design system: `_tokens.scss` tokens, `pressable` /
  `card-interactive` mixins, motion curves, scroll-reveal.
- Accessibility target WCAG 2.1 AA: AA contrast, visible focus, ≥44px (we use
  ≥56px) tap targets, `prefers-reduced-motion` respected, no color-only state.
- Bilingual: every new user-facing string added to **both** `es.json` and
  `en.json`, mirroring existing key structure.

## Contact source of truth (new)

Today the phone/WhatsApp/email values are hardcoded only inside `CTA.jsx`.
Introducing a WhatsApp button in the hero + a floating button would duplicate
them across four files and invite drift.

**New module: `src/config/contact.js`** — single export of contact primitives:

- `PHONE = "+19736518567"` (E.164)
- `WHATSAPP_TEXT` = pre-filled message: `"Hola, quiero pedir un presupuesto"`
- `whatsappUrl` = `https://wa.me/19736518567?text=<encoded WHATSAPP_TEXT>`
- `telUrl` = `tel:+19736518567`
- `mailUrl` = `mailto:papichiloco21@gmail.com`

`CTA.jsx`, `Hero.jsx`, and the new floating button all import from here. The
pre-filled WhatsApp text may be localized later; for now it stays the existing
Spanish string (unchanged behavior). No secrets involved — these are public
contact endpoints.

## Change 1 — Floating WhatsApp button

**New component: `src/components/FloatingContact/` (`.jsx` + `.module.scss`).**
Mounted once in `App.jsx`, after `<Footer />`.

- Fixed, bottom-right, above content (`z-index` above sections, below any modal).
- WhatsApp green `#25D366` fill, white glyph (`MessageCircle` from lucide, or an
  inline WhatsApp mark). Pill shape: icon + "WhatsApp" label on ≥`$bp-sm`,
  icon-only below.
- **Visibility:** hidden at top of page (hero already carries the CTA); fades +
  scales in once `scrollY` passes ~600px. Under `prefers-reduced-motion`, no
  transform/scale — it simply toggles visibility (opacity only, instant or
  minimal).
- Links to `contact.whatsappUrl`, `target="_blank"`, `rel="noreferrer"`.
- `aria-label` from `t('floating.aria')`. Tap target ≥56px. `:focus-visible`
  ring inherited from global. Uses `pressable` mixin for press feedback.
- Contrast: green button vs white page ≥3:1 (non-text graphic requirement met);
  white glyph is a recognizable brand mark on the green fill.

## Change 2 — Hero CTA reorder

In `Hero.jsx` / `Hero.module.scss`:

- **Primary** button becomes WhatsApp: label `t('hero.ctaWhatsapp')`
  ("Escríbenos por WhatsApp" / "Message us on WhatsApp"), `MessageCircle` icon,
  keeps the existing orange `.primary` styling, links to `contact.whatsappUrl`
  (external, new tab).
- **Secondary** buttons: "Pide tu presupuesto" → `#contact` (the form) and
  "Ver trabajos" → `#projects`. ("Ver servicios" may be dropped to keep the row
  to three; final count decided in plan — do not exceed three primary-row CTAs.)
- Add one trust microline under the CTA row: `t('hero.trust')` —
  "Respuesta rápida · Presupuesto sin compromiso" / "Fast reply · Free quote,
  no obligation." Muted, small, not a button.
- The existing `.searchBox` service chips and `.proofPanel` stay as-is.

## Change 3 — Contact section restructure (`CTA.jsx`)

Reorder the card so the WhatsApp path leads and the form is the secondary
"prefer to write it out" option.

New vertical order inside `.card`:

1. Top icon, `h2` title, intro `p` (unchanged copy, or lightly adjusted).
2. **Primary WhatsApp block** — prominent WhatsApp button
   (`t('cta.whatsappCta')`, e.g. "Escríbenos por WhatsApp") plus a short note
   `t('cta.whatsappNote')` ("Te respondemos para coordinar la visita.
   Respuesta rápida.") and the Call link beside/under it as a lighter option.
3. **Divider** — `t('cta.orDivider')` ("¿Prefieres escribirlo? Déjanos tus
   datos" / "Prefer to write it out? Leave your details").
4. **Form** — visually lighter/secondary treatment, same EmailJS submit logic
   (unchanged: owner notice + auto-reply). Field changes per Change 4.
5. Note `t('cta.note')`.

The three-equal-channel row at the bottom is absorbed: WhatsApp + Call are
promoted into the primary block; Email is covered by the form + can remain as a
minor link. EmailJS service/template/key constants and `handleSubmit` are
untouched.

## Change 4 — Form friction reduction

Required set becomes **name, phone, service, description**. Email optional.

- `email` input: remove `required`; label shows optional marker
  `t('cta.optional')` ("opcional" / "optional").
- Field order in the grid: **Name, Phone** (first row), **Service,
  Email (opcional)** (second row), **Description** (full width). Keeps
  highest-intent fields first.
- Validation otherwise unchanged. `service` select still submits canonical
  Spanish value regardless of UI language (existing behavior preserved).
- **Copy fix:** update the FAQ "¿Qué datos necesito?" / "What details do I need"
  answer in both `es.json` and `en.json` to stop stating email is required —
  reword to name, phone, service, and a short description (email optional).

## Change 5 — Trust signals

- Hero microline (Change 2).
- Contact WhatsApp note "Respuesta rápida" (Change 3).
- `Stats` and `Guarantee` already carry trust/how-it-works content — left
  unchanged.

## Navbar

Unchanged. CTA stays "Pide tu presupuesto" → `#contact`; that section now leads
with WhatsApp, and the floating button provides the persistent WhatsApp
affordance. Avoids navbar clutter.

## i18n keys to add (both es + en)

- `hero.ctaWhatsapp`
- `hero.trust`
- `cta.whatsappCta`
- `cta.whatsappNote`
- `cta.orDivider`
- `cta.optional`
- `floating.aria` (and `floating.label` if the visible pill label is localized)

Plus reworded `faq.items[3].a` (the "what details" answer) in both locales.

## Files

**New**
- `src/config/contact.js`
- `src/components/FloatingContact/FloatingContact.jsx`
- `src/components/FloatingContact/FloatingContact.module.scss`

**Edit**
- `src/App.jsx` (mount floating button)
- `src/components/Hero/Hero.jsx`, `Hero.module.scss`
- `src/components/CTA/CTA.jsx`, `CTA.module.scss`
- `src/i18n/locales/es.json`, `src/i18n/locales/en.json`

**Untouched**
- Navbar, Services, Projects, About, Footer, Stats, Guarantee, WorkerProfile,
  BrandMark, LangToggle, tokens/global styles.

## Testing / verification

- `npm run build` succeeds (no missing i18n keys, no SCSS errors).
- Manual (dev server): both languages render; WhatsApp links open wa.me with the
  pre-filled message; floating button appears only after scrolling past hero and
  hides at top; form submits with email left blank; required validation blocks
  empty name/phone/service/description.
- a11y spot-check: keyboard focus reaches the floating button with a visible
  ring; `prefers-reduced-motion` disables the button's scale-in and hero
  parallax stays disabled; contrast of new elements ≥ AA (text) / 3:1 (graphic).

## Out of scope

- Full visual redesign of untouched sections.
- Changing EmailJS templates or contact number/email values.
- Localizing the pre-filled WhatsApp message (may be a later follow-up).
