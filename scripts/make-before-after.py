"""
Handy Pioneers before/after composite generator.

Turns two job photos into a branded side-by-side image for the gallery, the
blog, or a service page. Reproduces the template established by
client/public/images/kitchen-remodel-before-after-2026-07.webp:

  1536 x 1024 canvas
  navy #06213B top bar (94px) with HandyPioneers.com
  gold #896202 title box centred under the bar
  two photos side by side, 9px white divider
  navy corner label chips near the bottom of each panel

Which size to render:

  1536 x 1024 (3:2)  gallery project hero, project extras, blog hero.
                     ProjectDetail and BlogPost cap their hero at 600px, which
                     fits this whole. Do not go taller than 3:2 or the chrome
                     gets cropped again.
  1600 x 900 (16:9)  service pages only. ServicePage forces aspectRatio 16/9
                     with objectFit cover, so a 3:2 image loses its top bar
                     and labels there. Render a second cut instead of changing
                     that layout - every other service image is 1600x900.

Honesty rules, learned the hard way on the Camas porch job:

  Label a panel "Before" only when it really is the untouched state. A photo
  taken after demo is "Mid-Repair". If all you have is the mechanism rather
  than the outcome, "The Cause" / "The Fix" is a fair pair and often sells
  better anyway.

Requires Pillow (pip install pillow). Not wired into `pnpm build` on purpose:
this is run by hand when a job produces photos worth publishing.

Usage: edit the job calls at the bottom, run `python scripts/make-before-after.py`,
eyeball the output, then copy the .jpg/.webp pair into client/public/images/
with a fresh dated filename (cache busting) and reference it from
client/src/lib/projects.ts, blog.ts, or services.ts.
"""
from PIL import Image, ImageDraw, ImageFont, ImageOps

NAVY = (6, 33, 59)
GOLD = (137, 98, 2)
WHITE = (255, 255, 255)

F_BOLD = r"C:\Windows\Fonts\arialbd.ttf"

# Canvas geometry. Defaults match the 1536x1024 template established by the
# kitchen remodel composite. set_canvas() switches to another size (e.g. 1600x900
# for service page heroes, which are locked to a 16:9 aspect ratio) while keeping
# the chrome the same thickness so the brand reads identically.
def set_canvas(w=1536, h=1024, topbar=94, div_w=9):
    global W, H, TOPBAR_H, DIV_X, DIV_W, PHOTO_Y, PHOTO_H, LEFT_W, RIGHT_X, RIGHT_W
    W, H, TOPBAR_H, DIV_W = w, h, topbar, div_w
    DIV_X = (w - div_w) // 2
    PHOTO_Y = TOPBAR_H
    PHOTO_H = H - TOPBAR_H
    LEFT_W = DIV_X
    RIGHT_X = DIV_X + DIV_W
    RIGHT_W = W - RIGHT_X


set_canvas()


def font(size):
    return ImageFont.truetype(F_BOLD, size)


def text_size(draw, s, f):
    box = draw.textbbox((0, 0), s, font=f)
    return box[2] - box[0], box[3] - box[1]


def fit_crop(path, target_w, target_h, focus=(0.5, 0.5), zoom=1.0):
    """Crop `path` to the target aspect around a focal point, then resize.

    focus is (fx, fy) in 0..1 of the source image. zoom > 1 crops tighter.
    """
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)  # phone shots carry orientation tags
    im = im.convert("RGB")
    sw, sh = im.size
    target_ar = target_w / target_h
    src_ar = sw / sh

    if src_ar > target_ar:
        cw, ch = sh * target_ar, sh
    else:
        cw, ch = sw, sw / target_ar
    cw, ch = cw / zoom, ch / zoom

    cx, cy = focus[0] * sw, focus[1] * sh
    x0 = min(max(cx - cw / 2, 0), sw - cw)
    y0 = min(max(cy - ch / 2, 0), sh - ch)
    im = im.crop((int(x0), int(y0), int(x0 + cw), int(y0 + ch)))
    return im.resize((target_w, target_h), Image.LANCZOS)


def build(out_stem, title, subtitle, left, right, left_label, right_label,
          left_label_pos="center", right_label_pos="center"):
    canvas = Image.new("RGB", (W, H), WHITE)

    canvas.paste(fit_crop(**left, target_w=LEFT_W, target_h=PHOTO_H), (0, PHOTO_Y))
    canvas.paste(fit_crop(**right, target_w=RIGHT_W, target_h=PHOTO_H), (RIGHT_X, PHOTO_Y))

    d = ImageDraw.Draw(canvas)

    # Top bar
    d.rectangle([0, 0, W, TOPBAR_H], fill=NAVY)
    f_brand = font(58)
    tw, th = text_size(d, "HandyPioneers.com", f_brand)
    d.text((W / 2 - tw / 2, TOPBAR_H / 2 - th / 2 - 6), "HandyPioneers.com",
           font=f_brand, fill=WHITE)

    # Divider, drawn before the title box so the box reads as one solid band
    d.rectangle([DIV_X, PHOTO_Y, DIV_X + DIV_W - 1, H], fill=WHITE)

    # Gold title box
    f_title = font(46)
    f_sub = font(29)
    tw1, _ = text_size(d, title, f_title)
    tw2, _ = text_size(d, subtitle, f_sub)
    box_w = max(tw1, tw2) + 72
    box_h = 110
    bx0 = W / 2 - box_w / 2
    by0 = TOPBAR_H
    d.rectangle([bx0, by0, bx0 + box_w, by0 + box_h], fill=GOLD)
    d.text((W / 2 - tw1 / 2, by0 + 12), title, font=f_title, fill=WHITE)
    d.text((W / 2 - tw2 / 2, by0 + 70), subtitle, font=f_sub, fill=WHITE)

    # Corner labels
    f_label = font(38)
    panels = (
        (left_label, 0, LEFT_W, left_label_pos),
        (right_label, RIGHT_X, RIGHT_W, right_label_pos),
    )
    for label, panel_x, panel_w, pos in panels:
        lw, lh = text_size(d, label, f_label)
        bw = max(lw + 80, 200)
        bh = 72
        # "left"/"right" shift the chip off centre when centred would sit on top
        # of something in the photo (e.g. a dry-rot callout in a booking shot).
        if pos == "left":
            x0 = panel_x + 24
        elif pos == "right":
            x0 = panel_x + panel_w - bw - 24
        else:
            x0 = panel_x + panel_w / 2 - bw / 2
        y0 = H - 34 - bh
        d.rectangle([x0, y0, x0 + bw, y0 + bh], fill=NAVY)
        d.text((x0 + bw / 2 - lw / 2, y0 + bh / 2 - lh / 2 - 6), label,
               font=f_label, fill=WHITE)

    canvas.save(out_stem + ".jpg", quality=90, optimize=True)
    canvas.save(out_stem + ".webp", quality=88, method=6)
    print("wrote", out_stem + ".jpg/.webp", canvas.size)


# ---------------------------------------------------------------------------
# Job definitions. What follows is the Camas porch job (August 2026) kept as a
# worked example: it covers a mechanism pair, a curb-appeal pair, a 16:9 recut,
# and a genuine before/after built from a client booking photo. Replace these
# with your own when the next job produces photos worth publishing.
#
# SRC is wherever the job photos live (client folder on the shared drive). OUT
# is scratch - render there, look at the result, then copy the keepers into
# client/public/images/.
# ---------------------------------------------------------------------------

SRC = "h:\\My Drive\\08. \U0001f4c1 Client Files\\Malone\\"
OUT = ".\\"

# 1. The cause-and-fix detail. This is a genuine before/after: the failed post
#    base as found, then the standoff base that replaces it.
build(
    OUT + "porch-post-base-rot-camas",
    "Why Porch Posts Rot",
    "Set Straight Into Concrete vs. Raised on a Standoff Base",
    left=dict(path=SRC + "IMG_8648.JPG", focus=(0.62, 0.70), zoom=1.20),
    right=dict(path=SRC + "IMG_8647.JPG", focus=(0.45, 0.70), zoom=1.20),
    left_label="The Cause",
    right_label="The Fix",
)

# 2. The curb-appeal pair. The earliest photo we have is mid-repair (rotted wrap
#    already removed, structural post flashed), so the labels say so.
build(
    OUT + "porch-column-rot-repair-camas",
    "Porch Column Rot Repair",
    "Flashed Structural Posts, New Wraps & Paint in Camas, WA",
    left=dict(path=SRC + "IMG_8646.JPG", focus=(0.50, 0.47), zoom=1.0),
    right=dict(path=SRC + "IMG_8617.JPG", focus=(0.50, 0.50), zoom=1.0),
    left_label="Mid-Repair",
    right_label="Finished",
)

# 3. A 16:9 cut of the cause/fix pair for the rot repair service page, whose
#    hero is locked to aspect-ratio 16/9 and would otherwise crop the brand bar
#    and the labels off a 3:2 image.
set_canvas(1600, 900, topbar=88)
build(
    OUT + "porch-post-base-rot-camas-16x9",
    "Why Porch Posts Rot",
    "Set Straight Into Concrete vs. Raised on a Standoff Base",
    left=dict(path=SRC + "IMG_8648.JPG", focus=(0.62, 0.72), zoom=1.15),
    right=dict(path=SRC + "IMG_8647.JPG", focus=(0.45, 0.72), zoom=1.15),
    left_label="The Cause",
    right_label="The Fix",
)
set_canvas()

# 4. The genuine before/after: the post base as the client first showed it
#    (booking photo, our dry-rot markup on it) against the finished plinth.
#    Same subject on both sides, so "Before" and "After" are honest here.
#    The booking photos were phone shots OF A SCREEN, so they arrive letterboxed
#    in black with the real content in a band. before2_band.jpg is that band
#    cropped out (find it by scanning for rows whose mean luminance clears ~25).
#    Downscaling into a panel hides most of the moire.
BEFORE2 = OUT + "before2_band.jpg"
for stem, (w, h, top) in {
    "porch-post-before-after-camas": (1536, 1024, 94),
    "porch-post-before-after-camas-16x9": (1600, 900, 88),
}.items():
    set_canvas(w, h, topbar=top)
    build(
        OUT + stem,
        "Porch Post Rot Repair",
        "Rotted Base Rebuilt on a Standoff Base, Camas WA",
        left=dict(path=BEFORE2, focus=(0.43, 0.50), zoom=1.0),
        right=dict(path=SRC + "IMG_8619.JPG", focus=(0.453, 0.794), zoom=1.55),
        left_label="Before",
        right_label="After",
        left_label_pos="right",  # keeps the chip off the "Dry Rot" callout
    )
set_canvas()
