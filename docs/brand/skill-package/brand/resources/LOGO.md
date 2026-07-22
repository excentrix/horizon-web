# Logos & Marks — "first light"

Source of truth: [`src/components/Logo/HorizonLogo.tsx`](../../src/components/Logo/HorizonLogo.tsx)
(Horizon), [`src/components/velo/VeloWordmark.tsx`](../../src/components/velo/VeloWordmark.tsx) (VELO),
and the favicon at [`src/app/icon0.svg`](../../src/app/icon0.svg).

**One mark, two wordmarks.** Horizon and VELO share the **same** sun mark — only the wordmark differs
(`horizon` lowercase vs. `VELO` uppercase). Excentrix is **not** part of either lockup; it appears only in
the footer/legal.

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

`<VeloWordmark />` = the shared sun mark + uppercase **`VELO`** + the **`by excentrix`** byline. VELO uses
the **same mark as Horizon** (one brand identity); only the wordmark differs.

- Wordmark text: `font-display`, `text-xl`, `font-semibold`, **uppercase**, tight tracking, colour **ink**.
- **Byline:** `by excentrix` in `font-mono`, `text-[10px]`, `uppercase`, `tracking-[0.2em]`,
  `text-muted-foreground`, **baseline-aligned** to VELO (gap `2`). Gives an unknown brand context. Pass
  `showByline={false}` to drop it in tight spaces.
- Mark + word gap: `2.5` (`gap-2.5`); mark sized `size-7` (header) / `size-6` (footer).
- In the header the mark is energy-orange and lifts slightly on hover
  (`text-energy ... group-hover:-translate-y-0.5`) — same behaviour as Horizon.
- Used in: `VeloHeader`, `VeloFooter`. (Excentrix also appears in the footer copyright.)

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
- **Don't** add a tagline to the *Horizon* lockup — the `by excentrix` byline belongs to **VELO only**.
- **Don't** stretch, rotate, or add effects to the mark; if you need a glow, use the OG-image sun
  treatment (radial `#FFB36B → #EC5B13`), not a filter on the icon.
- **Don't** rebuild the mark by hand — import `<HorizonMark>` / `<HorizonWordmark>` / `<VeloWordmark>` so
  every instance stays identical.
