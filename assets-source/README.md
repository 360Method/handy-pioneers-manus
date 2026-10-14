# assets-source

Masters. Nothing in here is served to the web.

`client/public/` holds the cropped, compressed files the site actually loads.
This folder holds the originals those crops were cut from, so a future re-crop
(a new aspect ratio, a different focal point, a bigger retina size) does not
mean hunting through a phone camera roll or someone's Downloads folder.

Rules:

- Long edge capped at 2400px. That is more than any web use needs and keeps the
  repo from carrying full phone originals.
- Date in the filename, so it is obvious when a photo is getting old.
- If you re-crop something, commit the new crop and leave the master alone.

## team/

| File | Cut into | Notes |
|---|---|---|
| `marcin-micek-shop-2026-08.jpg` | `client/public/images/team/marcin-micek.jpg` (4:5 portrait) and `marcin-micek-avatar.jpg` (square, framed on the face) | Marcin at the workbench in a branded polo. Chosen 2026-08-27 over a dressed-up outdoor headshot, which read too formal for a contractor and showed no tools. |
