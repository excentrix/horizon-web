# Logos & Marks — "first light"

Source of truth: [`src/components/Logo/HorizonLogo.tsx`](../../src/components/Logo/HorizonLogo.tsx)
(Horizon), [`src/components/velo/VeloHeader.tsx`](../../src/components/velo/VeloHeader.tsx) +
[`VeloFooter.tsx`](../../src/components/velo/VeloFooter.tsx) (VELO), and the favicon at
[`src/app/icon0.svg`](../../src/app/icon0.svg).

**Ready-to-use files:** a full logo kit — marks, both wordmark lockups, favicons and avatars, in every
colour variant, as portable SVG + PNG — is in [assets/logo/](./assets/logo/) (see its
[README](./assets/logo/README.md)). It's generated from the code, so treat it as export, not source.

## The mark — a sun rising over the horizon

Horizon's symbol is a **rising sun clipped by the horizon line**: a circle with a curved band masked out
of its lower third, so the horizon shows through to any background. It's drawn in code (not a static
file) so it scales cleanly and inherits colour.

- **React:** `<HorizonMark />` — a `viewBox="0 0 100 100"` SVG filled with `currentColor` through a mask.
  Colour it by setting text colour (e.g. `className="text-energy"`). Default size `size-8`.
- **Favicon:** [assets/logo/mark/mark-color.svg](./assets/logo/mark/mark-color.svg) (= `src/app/icon0.svg`)
  — a standalone version filled **energy `#EC5B13`** in light, **cream `#FAEDCD`** in dark (via
  `prefers-color-scheme`).
- **Default colour:** energy orange. It may also render in `currentColor` (ink/charcoal/cream) when it
  needs to sit quietly in a lockup.

## Horizon wordmark

`<HorizonWordmark />` = the mark + lowercase **`horizon`** set in the display face.

- Wordmark text: `font-display`, `text-[1.45rem]`, `font-semibold`, **lowercase**, tight tracking.
- Mark + word gap: `2.5` (`gap-2.5`); mark sized `size-7` inside the lockup.
- In the header the mark is energy-orange and lifts slightly on hover
  (`text-energy ... group-hover:-translate-y-0.5`) — the sun "rising."
- Used in: header, footer, about, not-found, ComingSoon.

## VELO wordmark

VELO has **no pictorial mark** — it is a pure typographic wordmark.

- **`VELO`** in `font-display`, `font-semibold`, tight tracking, colour **ink** (`text-ink`).
  Header size `text-xl`; footer `text-lg`.
- Always paired with the mono tagline **`by excentrix`**: `font-mono`, `text-[10px]`, `uppercase`,
  `tracking-[0.2em]`, `text-muted-foreground`, gap `2.5`.
- Lockup:

  ```
  VELO  BY EXCENTRIX
  ▲display ▲mono, muted, wide-tracked
  ```

## App icons / favicons

Exported in [assets/logo/favicon/](./assets/logo/favicon/): `favicon.ico` (16/32/48/64), `icon.svg`
(color, dark-mode aware), `icon-96.png`, `apple-icon-180.png`, `manifest-192.png`, `manifest-512.png` —
mirroring the shipped `src/app/` icons.

PWA manifest ([`src/app/manifest.ts`](../../src/app/manifest.ts)): `theme_color #EC5B13`,
`background_color #FDF8EC`.

## Clear space & don'ts

- **Clear space:** keep at least the height of the mark (its diameter) clear around any lockup.
- **Don't** recolour the mark outside the palette (energy, ink, charcoal, cream, or `currentColor` only).
- **Don't** capitalise `horizon` or lowercase `VELO` — the case *is* the wordmark.
- **Don't** add a mark to VELO or a tagline to the Horizon lockup — keep them distinct.
- **Don't** stretch, rotate, or add effects to the mark; if you need a glow, use the OG-image sun
  treatment (radial `#FFB36B → #EC5B13`), not a filter on the icon.
- **Don't** rebuild the mark by hand — import `<HorizonMark>` / `<HorizonWordmark>` so every instance
  stays identical.
