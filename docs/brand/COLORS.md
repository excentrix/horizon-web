# Colours — "first light"

Source of truth: [`src/app/(frontend)/globals.css`](../../src/app/(frontend)/globals.css) `:root` and
`[data-theme="dark"]`. Tailwind maps these in [`tailwind.config.mjs`](../../tailwind.config.mjs).
Machine-readable copies live in [assets/tokens.css](./assets/tokens.css) and [assets/tokens.json](./assets/tokens.json).

**How colour works here:** every colour is stored as a bare **HSL triple** (e.g. `240 53% 57%`) in a CSS
variable, and consumed with `hsl(var(--token))`. This is what lets opacity modifiers work
(`bg-accent/30`, `hsl(var(--hz-energy) / 0.25)`).

## Brand palette (the six)

| Name | Token | HSL triple | Hex | Role |
|---|---|---|---|---|
| Cream | `--hz-cream` | `43 82% 89%` | `#FAEDCD` | warm secondary surfaces, soft fills |
| Paper | `--hz-paper` | `42 71% 96%` | `#FDF8EC` | the default page background (warm near-white) |
| Charcoal | `--hz-charcoal` | `0 0% 25%` | `#414141` | default body text |
| Ink | `--hz-ink` | `0 0% 13%` | `#212121` | headlines, dark sections, max contrast |
| Indigo | `--hz-indigo` | `240 53% 57%` | `#5858CC` | **primary** — links, primary buttons, focus ring |
| Energy | `--hz-energy` | `20 85% 50%` | `#EC5B13` | **accent** — the rising-sun orange; CTAs, the logo mark, selection |

Tailwind exposes these directly as `cream`, `paper`, `charcoal`, `ink`, `indigo`, `energy`
(e.g. `text-energy`, `bg-cream`).

## Semantic tokens

These remap to the brand palette and **flip in dark mode** (`[data-theme="dark"]`). Always prefer the
semantic token (`bg-background`, `text-foreground`, `bg-primary`) over a raw brand colour so dark mode
and theming keep working.

| Token | Light | Dark | Tailwind |
|---|---|---|---|
| `--background` | paper `#FDF8EC` | `0 0% 10%` | `bg-background` |
| `--foreground` | charcoal `#414141` | `43 60% 92%` | `text-foreground` |
| `--primary` | indigo `#5858CC` | `240 60% 68%` | `bg-primary` / `text-primary` |
| `--primary-foreground` | `42 71% 96%` | `0 0% 10%` | `text-primary-foreground` |
| `--secondary` | cream `#FAEDCD` | `0 0% 16%` | `bg-secondary` |
| `--secondary-foreground` | ink `#212121` | `43 60% 92%` | — |
| `--accent` | energy `#EC5B13` | `20 85% 55%` | `bg-accent` / `text-accent` |
| `--accent-foreground` | `42 71% 96%` | `0 0% 10%` | — |
| `--muted` | `42 50% 91%` | `0 0% 18%` | `bg-muted` |
| `--muted-foreground` | `0 0% 42%` | `43 15% 65%` | `text-muted-foreground` |
| `--card` | white | `0 0% 13%` | `bg-card` |
| `--border` | `38 25% 82%` | `0 0% 24%` | `border-border` |
| `--input` | `38 25% 78%` | `0 0% 26%` | — |
| `--ring` | indigo | `240 60% 68%` | focus ring |
| `--destructive` | `0 72% 45%` | `0 62% 40%` | `bg-destructive` |

Status colours `--success` / `--error` / `--warning` are referenced by Tailwind (`success`, `error`,
`warning`) and the safelist; define them in `globals.css` if a surface needs them.

## Usage rules

- **Paper, not white.** The page background is warm paper `#FDF8EC`. Pure white is reserved for cards.
- **One accent.** Energy orange is the single attention colour — CTAs, the sun mark, `::selection`
  (`hsl(var(--hz-energy) / 0.25)`). Don't introduce a second accent hue.
- **Indigo is primary/interactive.** Primary buttons, links, focus ring. Energy is for the *one* action
  you most want clicked; indigo carries the rest.
- **Ink for headings, charcoal for body.** Headlines use ink `#212121`; running text uses charcoal.
- **Theme via tokens.** Never hard-code a hex in a component — use the semantic Tailwind class so dark
  mode and future re-skins hold.
- **OG images** are the one place explicit hexes appear in code
  ([`src/app/api/og/route.tsx`](../../src/app/api/og/route.tsx)) because `next/og` can't read CSS vars —
  keep those hexes matched to this table.
