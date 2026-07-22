from PIL import Image

src = r"c:\Users\Pc\Desktop\AI Systems\logo\Asset 6.png"
out = r"c:\Users\Pc\Desktop\AI Systems\landing\public\logos\logo-nav.png"

img = Image.open(src).convert("RGBA")

# Shrink first for speed + crisp navbar size
max_w = 720
if img.width > max_w:
    ratio = max_w / img.width
    img = img.resize((max_w, int(img.height * ratio)), Image.Resampling.LANCZOS)

pixels = img.load()
w, h = img.size
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
        chroma = max(r, g, b) - min(r, g, b)
        if luma < 42 and chroma < 20:
            pixels[x, y] = (r, g, b, 0)

bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

pad = 16
canvas = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
canvas.paste(img, (pad, pad), img)

# Final navbar-friendly width
nav_w = 220
ratio = nav_w / canvas.width
nav = canvas.resize((nav_w, max(1, int(canvas.height * ratio))), Image.Resampling.LANCZOS)
nav.save(out, "PNG", optimize=True)
print("saved", out, nav.size)
