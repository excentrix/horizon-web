# Component Layer & Motion — "first light"

Source of truth: the `@layer components` / `@layer utilities` blocks in
[`globals.css`](../../src/app/(frontend)/globals.css). These primitives are shared by Horizon and VELO —
reach for them before inventing a new style.

## Buttons

Base `.btn` = pill (`rounded-full`), `font-medium`, 200ms transitions, ring focus state, disabled
handling. Variants:

| Class | Look | Use |
|---|---|---|
| `.btn-primary` | indigo fill, white text, indigo glow shadow, `active:scale-[0.98]` | the standard primary action |
| `.btn-ink` | foreground (ink) fill, paper text | high-contrast alt primary |
| `.btn-ghost` | transparent, bordered, subtle hover fill | secondary / tertiary |
| `.btn-cream` | cream fill, ink text | soft action on dark/photo sections |

Sizes: `.btn-lg` (height `3.25rem`, `px-7`, `text-base`) · `.btn-md` (`h-11`, `px-5`, `text-sm`).
Example: `<a class="btn-primary btn-md">Verify a project</a>` (VELO header).

> Energy orange is **not** a button fill by default — primary buttons are indigo. Use energy for the
> single most important CTA when you deliberately want it to dominate.

## Forms

- `.field` — light input: `rounded-xl`, `border-input`, `bg-card`, height `3.5rem`, indigo focus ring.
- `.field-dark` — for dark sections: translucent white fill, cream border/text, **energy** focus ring
  (`hsl(--hz-energy / 0.7)` border + `0.2` glow).

## Structural primitives

- `.eyebrow` + `.eyebrow-dot` — the signature mono kicker (see [TYPOGRAPHY.md](./TYPOGRAPHY.md)).
- `.rule` — a `1px` full-width hairline in `border` colour. The brand leans on thin rules, not heavy boxes.
- `.display-xl/lg/md`, `.font-display` — the display type scale.
- Radius scale from `--radius` (`1rem`): `rounded-lg` = radius, `md` = −2px, `sm` = −4px. Pills use
  `rounded-full`; inputs use `rounded-xl`.

## Texture & motion

- **Grain** — `.grain` (+ a positioning class like `relative`) overlays a 5%-opacity fractal-noise SVG to
  keep large flat paper/ink areas alive. It's the brand's signature "warm print" texture.
- **`::selection`** — energy orange at 25% opacity. (Brand detail; keep it.)
- **Marquee** — `.animate-marquee` (36s linear loop, `hz-marquee` keyframes); respects
  `prefers-reduced-motion`.
- **Word reveals** — `.mask-line` wraps each word in an overflow mask for GSAP line-reveal animations
  (the "sunrise" motion motif). Motion should feel like *light arriving* — rise, reveal, warm — never
  flashy.
- **Accordion** — `accordion-down/up` keyframes (Radix) at 0.2s.
- **Theme flash guard** — `html { opacity: 0 }` until `InitTheme` sets `data-theme`; don't remove it.

## Layout

- Container is centered, padded (`1rem` default → `2rem` from `md`), max width `86rem` at `2xl`
  (see [`tailwind.config.mjs`](../../tailwind.config.mjs)).
- Dark sections use `data-theme="dark"` scoping; never hard-code dark hexes — the tokens flip for you.

## The feel, in one line

Warm editorial paper, ink headlines, one orange sun, indigo for action, mono for the quiet metadata, a
whisper of grain, and motion that rises like first light.
