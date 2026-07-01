# Typography — "first light"

Source of truth: font wiring in the two layouts
([`(frontend)/layout.tsx`](../../src/app/(frontend)/layout.tsx),
[`(velo)/layout.tsx`](../../src/app/(velo)/layout.tsx)); type rules in
[`globals.css`](../../src/app/(frontend)/globals.css); family mapping in
[`tailwind.config.mjs`](../../tailwind.config.mjs).

## The three typefaces

| Role | Family | Loaded as | CSS var | Tailwind |
|---|---|---|---|---|
| **Display** | **Bricolage Grotesque** | `next/font/google` | `--font-display` | `font-display` |
| **Body** | **Instrument Sans** | `next/font/google` | `--font-body` | `font-sans` (default) |
| **Mono** | **Geist Mono** | `geist/font/mono` | `--font-geist-mono` | `font-mono` |

All three are attached to `<html>` via the font `.variable`s in both layouts, so the same stack is live on
Horizon and VELO. Body text falls back to `ui-sans-serif, system-ui, sans-serif`; display falls back to
the body font then sans.

## Base settings (body)

- Family: `var(--font-body)`
- Size: `1.0625rem` (17px) · line-height `1.65`
- `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`, `scroll-behavior: smooth`

## Headings (`h1`–`h6`)

- Family: `var(--font-display)` (Bricolage Grotesque)
- Weight `600` · letter-spacing `-0.03em` · line-height `1.02`
- Colour: ink `#212121` in light, `--foreground` in dark
- `text-wrap: balance`

## Display scale (editorial, fluid)

Utility classes for hero/section type — fluid via `clamp()`:

| Class | font-size | line-height | tracking |
|---|---|---|---|
| `.display-xl` | `clamp(2.75rem, 8.5vw, 6.5rem)` | `0.98` | `-0.04em` |
| `.display-lg` | `clamp(2.25rem, 5.5vw, 4.25rem)` | `1` | `-0.035em` |
| `.display-md` | `clamp(1.625rem, 3.5vw, 2.75rem)` | `1.08` | — |

`.font-display` is also exposed as a utility to set the display family on any element.

## The eyebrow (signature label)

The small uppercase mono kicker above headings — a recurring brand signature:

```html
<p class="eyebrow"><span class="eyebrow-dot"></span> Proof of work</p>
```

- `.eyebrow` → `font-mono`, `text-[0.6875rem]`, `font-medium`, `uppercase`, `tracking-[0.22em]`,
  `text-muted-foreground`
- `.eyebrow-dot` → a `1.5` size energy-orange dot, used inline before the label

Mono (Geist Mono) is also the voice of **metadata**: nav labels, the `by excentrix` tag, footer fine
print, timestamps — small, uppercase, wide tracking.

## Rules

- **Bricolage for display, Instrument for reading, Geist Mono for labels.** Don't mix in other families.
- Headlines are tight (negative tracking, `~1.0` leading); body is airy (`1.65`).
- Prefer the display utilities (`.display-xl/lg/md`) over ad-hoc `text-[..]` so the scale stays consistent.
- VELO wordmark and Horizon wordmark both use `font-display` (see [LOGO.md](./LOGO.md)).
