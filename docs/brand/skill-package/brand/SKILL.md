---
name: brand
description: Apply and maintain the shared "first light" brand identity for the Horizon and VELO marketing sites (colours, typography, logos, components, motion). Trigger when the user types /brand, asks to build/restyle marketing UI, asks "what's our brand colour/font/logo", asks to check something is on-brand, or to sync/update the brand from the code.
---

# Brand Identity Co-Worker — "first light"

You keep the **Horizon** and **VELO** marketing sites visually consistent and on-brand. Both sites share
ONE identity ("first light"); they differ only in wordmark. This skill is **self-contained** — the brand
spec travels with it in `resources/`.

> **One mark, two wordmarks.** Same colour tokens, type, spacing, components, motion — and the **same
> sun-over-horizon mark**. The wordmark differs: **Horizon** = lowercase `horizon`; **VELO** = uppercase
> `VELO` + a small `by excentrix` mono byline for context. Both belong to **Excentrix · Bangalore**.

## Step 1 — Load the brand (always, every invocation)
Read the bundled spec before applying anything (this skill is self-contained — these travel with it):
- `resources/README.md` — the map + the one-identity-two-wordmarks model
- `resources/COLORS.md` — palette + semantic tokens (light/dark), hex + HSL, usage rules
- `resources/TYPOGRAPHY.md` — Bricolage Grotesque / Instrument Sans / Geist Mono, display scale, eyebrow
- `resources/LOGO.md` — the Horizon sun mark, both wordmarks, clear-space & don'ts
- `resources/COMPONENTS.md` — buttons, fields, grain, motion
- `resources/tokens.css` / `resources/tokens.json` — the canonical design tokens
- `resources/logo/` — the ready-to-use logo kit (marks, lockups, favicons, avatars; SVG + PNG) + its README

## Step 2 — Figure out the ask
- **`/brand`** (no arg) → the cheat-sheet: six colours, three fonts, two wordmarks, the feel.
- **`/brand <build/restyle request>`** → produce/adjust UI using the existing tokens + component classes.
- **`/brand check`** → audit the named file(s)/diff for violations (raw hexes, wrong fonts, off-palette,
  white instead of paper, missing dark-mode tokens, hand-built logos).
- **`/brand sync`** → **only meaningful inside the repo** (needs the source). Re-read the ground-truth
  files and update the brand docs + tokens + logo kit so the export matches the code. In a bare package
  (no repo), say so and work from `resources/` instead.

## Step 3 — The rules (non-negotiable)
- **One mark, two wordmarks.** Horizon and VELO share the SAME sun mark; the wordmark differs (`horizon`
  lowercase vs. `VELO` uppercase). The **VELO** lockup carries a `by excentrix` mono byline for context;
  the **Horizon** lockup never takes a tagline. Never swap case.
- **Tokens, never hexes.** Use semantic Tailwind classes (`bg-background`, `text-foreground`,
  `bg-primary`, `text-accent`) so dark mode holds. Literal hexes belong ONLY in `api/og/route.tsx`
  (next/og can't read CSS vars) and must match COLORS.md.
- **Paper, not white.** Page background is paper `#FDF8EC`; pure white is for cards only.
- **One accent.** Energy orange `#EC5B13` = the single attention colour (CTAs, the sun, `::selection`).
  Indigo `#5858CC` is primary/interactive; primary buttons are indigo, not orange.
- **Type:** Bricolage Grotesque (display/headings/wordmarks) · Instrument Sans (body) · Geist Mono
  (labels/eyebrows/metadata). Use `.display-xl/lg/md` and `.eyebrow`, not ad-hoc sizes.
- **Reuse the component layer** (`.btn-*`, `.field`, `.rule`, `.grain`, `.mask-line`) before writing CSS.
- **Motion = first light:** rise / reveal / warm. Respect `prefers-reduced-motion`; keep the theme-flash guard.
- **Never hand-draw logos.** Use the files in `resources/logo/` (or import the repo's `<HorizonMark>` /
  `<HorizonWordmark>` components). To add a variant/size, edit + re-run the kit generator in the repo.

## Step 4 — Colour palette (quick reference)
```
charcoal #414141   ink #212121   indigo #5858CC   energy #EC5B13   cream #FAEDCD   paper #FDF8EC
display: Bricolage Grotesque   body: Instrument Sans   mono: Geist Mono   radius: 1rem
```

## Output format
Build/restyle → copy-paste-ready JSX/CSS using existing classes, noting which tokens you used.
`check` → a short list of violations with the exact fix. `sync` → a diff summary. Lead with one line on
what you did; keep it tight.
