# Brand Identity — "first light"

> Single source of truth for the visual identity shared by **both** marketing sites in
> `horizon-web/horizon`: **Horizon** (route group `(frontend)`) and **VELO** (route group `(velo)`).
>
> **Ground-truth rule:** the *code* is canonical. These docs mirror it. When they disagree, trust the
> code and re-sync the doc. The two files that matter most:
> - Tokens → [`src/app/(frontend)/globals.css`](../../src/app/(frontend)/globals.css)
> - Logos → [`src/components/Logo/HorizonLogo.tsx`](../../src/components/Logo/HorizonLogo.tsx) and the VELO wordmark in [`src/components/velo/VeloHeader.tsx`](../../src/components/velo/VeloHeader.tsx)

## One identity, two wordmarks

Horizon and VELO are **the same brand system** — identical colour tokens, type, spacing, components,
and motion. VELO's layout literally imports Horizon's stylesheet
(`import '../(frontend)/globals.css'`). They diverge in exactly one place: the **wordmark**.

| | Horizon | VELO |
|---|---|---|
| Wordmark | lowercase `horizon` + sun-over-horizon mark | uppercase `VELO`, no mark |
| Tagline lockup | — | `VELO` + mono `by excentrix` |
| Voice | the AI mentor that knows you | proof of work, not promises |
| Lives in | `(frontend)` route group | `(velo)` route group |

Both belong to **Excentrix · Bangalore**.

## What's in this folder

| File | What it covers |
|---|---|
| [COLORS.md](./COLORS.md) | Full palette — brand + semantic tokens, light & dark, hex + HSL, usage rules |
| [TYPOGRAPHY.md](./TYPOGRAPHY.md) | The three typefaces, display scale, headings, the `eyebrow` label |
| [LOGO.md](./LOGO.md) | The sun mark, the Horizon wordmark, the VELO wordmark, clear-space & don'ts |
| [COMPONENTS.md](./COMPONENTS.md) | The component layer — buttons, fields, rules, grain, marquee, motion |
| [assets/](./assets/) | `tokens.css`, `tokens.json` |
| [assets/logo/](./assets/logo/) | **Logo kit** — marks, both wordmark lockups, favicons, avatars (SVG + PNG, all colour variants) + the generator |

For **voice & messaging** (separate from visual identity) see [`../velo/VOICE.md`](../velo/VOICE.md).

## Quick reference

```
charcoal #414141   ink #212121   indigo #5858CC   energy #EC5B13   cream #FAEDCD   paper #FDF8EC
display: Bricolage Grotesque   body: Instrument Sans   mono: Geist Mono
radius: 1rem (--radius)        ::selection: energy @ 25%
```

## Maintaining this folder

Use the `brand` skill (`/brand`). It reads these docs, applies them when building UI, and — crucially —
**re-syncs them from the code** whenever a token, font, or wordmark changes. After any change to
`globals.css`, `tailwind.config.mjs`, the logo components, or the layouts' font setup, run `/brand sync`
so this export never goes stale.
