# Logo Kit

Standard, ready-to-use logo assets for **Horizon** and **VELO**. All files are generated from the
on-site logos (`src/app/icon0.svg`, `components/Logo/HorizonLogo.tsx`, `components/velo/VeloHeader.tsx`)
by [`generate.py`](./generate.py) — see [Regenerating](#regenerating). Spec + usage rules live in
[../../LOGO.md](../../LOGO.md).

SVGs are self-contained: the mark uses geometry, and wordmark text is **traced to outline paths** — no
font needs to be installed to render them.

## What's here

### `mark/` — the sun-over-horizon symbol (icon only)
| File | Use |
|---|---|
| `mark-color.svg` | **default** — energy orange, auto-swaps to cream in dark mode (`prefers-color-scheme`) |
| `mark-energy.svg` / `-ink.svg` / `-cream.svg` / `-white.svg` | fixed single-colour variants |
| `mark-energy-{16..1024}.png` | raster mark, orange, standard sizes |
| `mark-white-{256,512,1024}.png`, `mark-ink-{…}.png` | reversed / mono rasters |

### `horizon/` — Horizon wordmark lockup (mark + `horizon`)
| File | Use |
|---|---|
| `horizon-lockup-color.svg` | **default** — energy mark + ink wordmark (light backgrounds) |
| `horizon-lockup-ink.svg` | all-ink monochrome |
| `horizon-lockup-white.svg` / `-cream.svg` | reversed, for dark backgrounds |
| `horizon-lockup-color-{64,128,256}.png`, `-white-{…}.png` | rasters (height in px) |

### `velo/` — VELO lockup (shared sun mark + `VELO` + `by excentrix`)
VELO uses the **same mark as Horizon**; only the wordmark differs. The `by excentrix` byline gives context.
| File | Use |
|---|---|
| `velo-lockup-color.svg` | **default** — energy mark + ink wordmark (light backgrounds) |
| `velo-lockup-ink.svg` | all-ink monochrome |
| `velo-lockup-white.svg` / `-cream.svg` | reversed, for dark backgrounds |
| `velo-lockup-color-{64,128,256}.png`, `-white-{…}.png` | rasters (height in px) |

### `favicon/` — browser & app icons (mirror of `src/app/`)
`favicon.ico` (16/32/48/64) · `icon.svg` (color, dark-mode aware) · `icon-96.png` ·
`apple-icon-180.png` · `manifest-192.png` · `manifest-512.png`.

### `avatar/` — square social profile pictures (rounded)
`avatar-paper-{512,1024}.png` (energy mark on paper) · `avatar-ink-{512,1024}.png` (cream mark on ink).
Use for LinkedIn / X / GitHub org avatars.

## Picking a file
- **Light background →** `*-color` / `*-ink`. **Dark background →** `*-white` / `*-cream`.
- **Web/app icon →** prefer the SVG (`mark-color.svg`); it's crisp at any size and handles dark mode.
- **Raster needed (email, slides, social) →** use the PNG at ≥ the display size; don't upscale.
- **Need a colour/size that isn't here →** add it in `generate.py` and re-run, don't hand-edit.

## Regenerating
The kit is reproducible. Requires Python with `pillow`, `numpy`, `fonttools`:

```bash
cd docs/brand/assets/logo
./fetch-fonts.sh          # downloads Bricolage Grotesque + Geist Mono into ./fonts (git-ignored)
python3 generate.py       # writes all assets into this folder
```

Fonts are OFL and **not committed** (`.gitignore`) — `fetch-fonts.sh` pulls them from Google Fonts.
If the on-site logo, wordmark, or brand colours change, update `generate.py` to match and re-run, then
run `/brand sync`. The generated SVG/PNG files are safe to commit.
