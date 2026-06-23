# Stitch assets

Drop exported Stitch image assets here.

## Pending: "Design System" screen

- **Project:** Modern Handyman Services Platform (`14157405647238363465`)
- **Screen:** Design System
- **Asset stub:** `asset-stub-assets_9742a0f2f138411db0f9019c394d42db`

This screen's image + code could **not** be downloaded automatically — every
`stitch.withgoogle.com` URL returns the app's login shell, so the export is
gated behind Google sign-in. The stub ID above is a placeholder, not a public
hosted URL.

### To finalize

1. Open the screen in Stitch while signed in.
2. **Export → Code** (and save the rendered image as
   `design-system.png` in this folder).
3. Reconcile the real values into `src/styles/_tokens.scss` and
   `src/components/DesignSystem/`. The current `DesignSystem` component renders
   a living style guide from the existing tokens as a stand-in.
