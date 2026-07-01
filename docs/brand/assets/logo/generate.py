#!/usr/bin/env python3
"""Horizon / VELO logo asset generator.

Emits the full logo kit (marks, wordmark lockups) as portable SVGs (mark = mask
geometry, wordmark text = traced outline paths, no font dependency) plus PNG
rasters and favicons. Mirrors the on-site logos:
  - Horizon mark  : src/app/icon0.svg + components/Logo/HorizonLogo.tsx
  - Horizon lockup: <HorizonWordmark/> (mark size-7, text 1.45rem semibold lowercase, gap-2.5)
  - VELO lockup   : components/velo/VeloHeader.tsx (VELO display + mono "by excentrix")

Fonts (Google Fonts, OFL) are fetched into ./fonts by fetch_fonts.sh.
"""
import os
import numpy as np
from PIL import Image, ImageFont, ImageDraw
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(HERE, "fonts")
OUT = os.environ.get("LOGO_OUT", os.path.join(HERE, "out"))

HEX = {"energy": "#EC5B13", "ink": "#212121", "cream": "#FAEDCD",
       "paper": "#FDF8EC", "white": "#FFFFFF", "charcoal": "#414141"}
def rgb(h): h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
def rgba(h, a=255): return rgb(h) + (a,)

BRIC = os.path.join(FONTS, "bricolage-600.ttf")
MONO = os.path.join(FONTS, "geist-mono-500.ttf")

# ------------------------------------------------------------------ the mark
MASK = ('    <mask id="b" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">\n'
        '      <circle cx="50" cy="50" r="46" fill="white"/>\n'
        '      <path d="M-8 70 Q50 24 108 70 L108 52 Q50 6 -8 52 Z" fill="black"/>\n'
        '    </mask>')

def mark_svg(color_hex, darkmode_hex=None):
    dm = (f'\n  <style>@media (prefers-color-scheme:dark){{#m{{fill:{darkmode_hex}}}}}</style>'
          if darkmode_hex else "")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">{dm}\n'
            f'  <defs>\n{MASK}\n  </defs>\n'
            f'  <rect id="m" width="100" height="100" fill="{color_hex}" mask="url(#b)"/>\n</svg>\n')

def mark_image(size, fill_hex, ss=4):
    """Rasterise the mark (circle r46 minus curved horizon band) via numpy, supersampled."""
    S = size*ss
    coords = (np.arange(S) + 0.5) / ss * (100.0 / size)
    X, Y = np.meshgrid(coords, coords)                       # 100-unit space
    inside = (X-50)**2 + (Y-50)**2 <= 46*46
    t1 = np.clip((X+8)/116.0, 0, 1);  y1 = 70 - 92*t1 + 92*t1*t1
    t2 = np.clip((108-X)/116.0, 0, 1); y2 = 52 - 92*t2 + 92*t2*t2
    lo, hi = np.minimum(y1, y2), np.maximum(y1, y2)
    band = (Y >= lo) & (Y <= hi)
    a = Image.fromarray((np.where(inside & ~band, 255, 0)).astype("uint8"), "L")
    a = a.resize((size, size), Image.LANCZOS)
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    img.paste(Image.new("RGBA", (size, size), rgba(fill_hex)), (0, 0), a)
    return img

# ------------------------------------------------------------ text -> outline
class Traced:
    def __init__(self, path_d, xmin, ymin, xmax, ymax, upm):
        self.d, self.xmin, self.ymin, self.xmax, self.ymax, self.upm = \
            path_d, xmin, ymin, xmax, ymax, upm

def trace(font_path, text, tracking_em=0.0):
    f = TTFont(font_path)
    gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f["head"].unitsPerEm
    svg = SVGPathPen(gs); bounds = BoundsPen(gs)
    x = 0.0
    for ch in text:
        gname = cmap[ord(ch)]; g = gs[gname]
        g.draw(TransformPen(svg, (1, 0, 0, 1, x, 0)))
        g.draw(TransformPen(bounds, (1, 0, 0, 1, x, 0)))
        x += g.width + tracking_em*upm
    xmin, ymin, xmax, ymax = bounds.bounds
    return Traced(svg.getCommands(), xmin, ymin, xmax, ymax, upm)

def text_svg_el(tr, fill, px_size, tx, baseline_y, opacity=None):
    s = px_size/tr.upm
    op = f' opacity="{opacity}"' if opacity is not None else ""
    return (f'<path d="{tr.d}" fill="{fill}"{op} '
            f'transform="translate({tx:.2f},{baseline_y:.2f}) scale({s:.5f},{-s:.5f})"/>')

# ------------------------------------------------------------------ lockups
# geometry (×10 of the CSS px so SVG numbers stay tidy)
H_MARK, H_TEXT, H_GAP = 280.0, 232.0, 100.0          # horizon: mark28 text23.2 gap10
V_VELO, V_TAG, V_GAP, V_TRACK = 400.0, 200.0, 100.0, 0.20  # velo: 40 / 20 / gap / .2em

def _svg(vb_x, vb_y, vb_w, vb_h, body, defs=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'viewBox="{vb_x:.2f} {vb_y:.2f} {vb_w:.2f} {vb_h:.2f}">\n'
            f'{defs}{body}\n</svg>\n')

def horizon_lockup_svg(mark_hex, text_hex):
    tr = trace(BRIC, "horizon")
    s = H_TEXT/tr.upm
    tx = H_MARK + H_GAP - tr.xmin*s
    baseline = H_MARK/2 + (tr.ymax+tr.ymin)/2*s      # center ink to mark center
    top = min(0.0, baseline - tr.ymax*s)
    bot = max(H_MARK, baseline - tr.ymin*s)
    maxx = tx + tr.xmax*s
    p = 12.0
    mark = (f'  <g transform="scale({H_MARK/100:.5f})">'
            f'<rect width="100" height="100" fill="{mark_hex}" mask="url(#b)"/></g>')
    text = "  " + text_svg_el(tr, text_hex, H_TEXT, tx, baseline)
    defs = f'  <defs>\n{MASK}\n  </defs>\n'
    return _svg(-p, top-p, (maxx)+2*p, (bot-top)+2*p, mark+"\n"+text, defs)

def velo_lockup_svg(velo_hex, tag_hex, tag_opacity=None):
    v = trace(BRIC, "VELO")
    t = trace(MONO, "BY EXCENTRIX", tracking_em=V_TRACK)
    sv, st = V_VELO/v.upm, V_TAG/t.upm
    center = 0.0
    v_tx = -v.xmin*sv
    v_base = center + (v.ymax+v.ymin)/2*sv
    v_maxx = v_tx + v.xmax*sv
    t_tx = v_maxx + V_GAP - t.xmin*st
    t_base = center + (t.ymax+t.ymin)/2*st
    t_maxx = t_tx + t.xmax*st
    top = min(v_base - v.ymax*sv, t_base - t.ymax*st)
    bot = max(v_base - v.ymin*sv, t_base - t.ymin*st)
    p = 12.0
    body = ("  " + text_svg_el(v, velo_hex, V_VELO, v_tx, v_base) + "\n  "
            + text_svg_el(t, tag_hex, V_TAG, t_tx, t_base, opacity=tag_opacity))
    return _svg(-p, top-p, t_maxx+2*p, (bot-top)+2*p, body)

# ----------------------------------------------------------- PNG rasterisers
def _draw_text(canvas, xy, text, font, fill, tracking_px=0.0):
    d = ImageDraw.Draw(canvas); x, y = xy
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill, anchor="ls")
        x += font.getlength(ch) + tracking_px
    return x

def horizon_lockup_png(height, mark_hex, text_hex, path, ss=4):
    H = int(height*ss)
    markH = int(H*(H_MARK/max(H_MARK, H_TEXT)))  # mark is tallest element
    m = mark_image(markH, mark_hex)
    fs = int(H*(H_TEXT/H_MARK)); gap = int(H*(H_GAP/H_MARK))
    fnt = ImageFont.truetype(BRIC, fs)
    asc, desc = fnt.getmetrics()
    tw = int(sum(fnt.getlength(c) for c in "horizon"))
    W = markH + gap + tw + ss*8
    cv = Image.new("RGBA", (W, markH), (0, 0, 0, 0))
    cv.alpha_composite(m, (0, 0))
    base = markH//2 + (asc-desc)//2
    _draw_text(cv, (markH+gap, base), "horizon", fnt, rgba(text_hex))
    cv = cv.crop(cv.getbbox())
    cv = cv.resize((max(1, cv.width//ss), max(1, cv.height//ss)), Image.LANCZOS)
    cv.save(path)

def velo_lockup_png(height, velo_hex, tag_hex, path, tag_alpha=255, ss=4):
    H = int(height*ss)
    fv = ImageFont.truetype(BRIC, H)
    ft = ImageFont.truetype(MONO, int(H*(V_TAG/V_VELO)))
    gap = int(H*(V_GAP/V_VELO)); track = (V_TAG/V_VELO)*H*V_TRACK
    av, dv = fv.getmetrics(); at, dt = ft.getmetrics()
    vw = int(fv.getlength("VELO"))
    tw = int(sum(ft.getlength(c) for c in "BY EXCENTRIX") + track*len("BY EXCENTRIX"))
    W = vw + gap + tw + ss*8; Hc = max(av, at) + ss*4
    cv = Image.new("RGBA", (W, Hc), (0, 0, 0, 0))
    center = Hc//2
    _draw_text(cv, (0, center+(av-dv)//2), "VELO", fv, rgba(velo_hex))
    _draw_text(cv, (vw+gap, center+(at-dt)//2), "BY EXCENTRIX", ft,
               rgba(tag_hex, tag_alpha), tracking_px=track)
    cv = cv.crop(cv.getbbox())
    cv = cv.resize((max(1, cv.width//ss), max(1, cv.height//ss)), Image.LANCZOS)
    cv.save(path)

# ------------------------------------------------------------------- avatars
def avatar_png(size, bg_hex, mark_hex, path, radius_frac=0.22):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size-1, size-1],
                                           radius=int(size*radius_frac), fill=255)
    bg = Image.new("RGBA", (size, size), rgba(bg_hex))
    img.paste(bg, (0, 0), mask)
    m = int(size*0.62); mk = mark_image(m, mark_hex)
    img.alpha_composite(mk, ((size-m)//2, (size-m)//2))
    img.save(path)

def write(path, text):
    with open(path, "w") as f: f.write(text)

def favicon_ico(path):
    base = mark_image(256, HEX["energy"])
    base.save(path, sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

# ---------------------------------------------------------------------- main
def main():
    d = OUT; os.makedirs(d, exist_ok=True)
    def P(*a): return os.path.join(d, *a)
    for sub in ("mark", "horizon", "velo", "favicon", "avatar"):
        os.makedirs(P(sub), exist_ok=True)

    # ---- MARK svg variants
    write(P("mark", "mark-color.svg"), mark_svg(HEX["energy"], darkmode_hex=HEX["cream"]))
    write(P("mark", "mark-energy.svg"), mark_svg(HEX["energy"]))
    write(P("mark", "mark-ink.svg"),   mark_svg(HEX["ink"]))
    write(P("mark", "mark-cream.svg"), mark_svg(HEX["cream"]))
    write(P("mark", "mark-white.svg"), mark_svg(HEX["white"]))
    # ---- MARK png (energy + white + ink) at standard sizes
    for sz in (16, 32, 48, 64, 128, 180, 192, 256, 512, 1024):
        mark_image(sz, HEX["energy"]).save(P("mark", f"mark-energy-{sz}.png"))
    for sz in (256, 512, 1024):
        mark_image(sz, HEX["white"]).save(P("mark", f"mark-white-{sz}.png"))
        mark_image(sz, HEX["ink"]).save(P("mark", f"mark-ink-{sz}.png"))

    # ---- HORIZON lockup
    write(P("horizon", "horizon-lockup-color.svg"), horizon_lockup_svg(HEX["energy"], HEX["ink"]))
    write(P("horizon", "horizon-lockup-ink.svg"),   horizon_lockup_svg(HEX["ink"], HEX["ink"]))
    write(P("horizon", "horizon-lockup-cream.svg"), horizon_lockup_svg(HEX["cream"], HEX["cream"]))
    write(P("horizon", "horizon-lockup-white.svg"), horizon_lockup_svg(HEX["white"], HEX["white"]))
    for h in (64, 128, 256):
        horizon_lockup_png(h, HEX["energy"], HEX["ink"], P("horizon", f"horizon-lockup-color-{h}.png"))
        horizon_lockup_png(h, HEX["cream"], HEX["cream"], P("horizon", f"horizon-lockup-white-{h}.png"))

    # ---- VELO lockup
    write(P("velo", "velo-lockup-ink.svg"),   velo_lockup_svg(HEX["ink"], HEX["charcoal"]))
    write(P("velo", "velo-lockup-white.svg"), velo_lockup_svg(HEX["white"], HEX["cream"], tag_opacity=0.6))
    write(P("velo", "velo-lockup-cream.svg"), velo_lockup_svg(HEX["cream"], HEX["cream"], tag_opacity=0.6))
    for h in (64, 128, 256):
        velo_lockup_png(h, HEX["ink"], HEX["charcoal"], P("velo", f"velo-lockup-ink-{h}.png"))
        velo_lockup_png(h, HEX["cream"], HEX["cream"], P("velo", f"velo-lockup-white-{h}.png"), tag_alpha=153)

    # ---- FAVICON + app icons
    favicon_ico(P("favicon", "favicon.ico"))
    write(P("favicon", "icon.svg"), mark_svg(HEX["energy"], darkmode_hex=HEX["cream"]))
    for sz, nm in ((96, "icon-96.png"), (180, "apple-icon-180.png"),
                   (192, "manifest-192.png"), (512, "manifest-512.png")):
        mark_image(sz, HEX["energy"]).save(P("favicon", nm))

    # ---- AVATARS (social profile pictures)
    for sz in (512, 1024):
        avatar_png(sz, HEX["paper"], HEX["energy"], P("avatar", f"avatar-paper-{sz}.png"))
        avatar_png(sz, HEX["ink"], HEX["cream"], P("avatar", f"avatar-ink-{sz}.png"))
    print("logo kit generated ->", d)

if __name__ == "__main__":
    main()
