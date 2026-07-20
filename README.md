# Happy Birthday, Maram 🎀

A single-page birthday website. No build step — every font, photo, and the song are self-hosted, so it runs from any static host (or straight off the filesystem).

**Live site:** https://cyrek-hub.github.io/Bday/

## What's on the page

1. **Intro gate** — "Do you love me?" with a Yes button and a No button that dodges the cursor (and taps, on mobile). Clicking Yes unlocks the site and starts the music.
2. **Hero** — shimmering "Happy Birthday, My Love, Maram" with floating hearts, sparkles, and glow.
3. **Calendar** — a real July 2026 grid with her photo glowing in the July 21 cell.
4. **Things I Love About You** — six polaroids that flip over in 3D to reveal a reason on the back.
5. **Gallery** — six photos in gold-ringed cards with bow accents.
6. **The letter** — sealed envelope that opens into the full birthday letter.
7. **Us, So Far** — live counter ticking days/hours/minutes/seconds since April 17, 2026.
8. Throughout: background music with a mute toggle, click-anywhere heart bursts, and a scroll-driven day-to-night sky that ends in a starry twilight at the footer.

## Files

- `index.html` — all page structure and content (letter text, captions, calendar)
- `style.css` — styling, animations, responsive layout, self-hosted `@font-face` declarations
- `script.js` — intro gate, music, scroll reveals, flips, envelope, counter, particles, sky
- `assets/fonts/` — Great Vibes, Cormorant Garamond, Poppins (woff2)
- `assets/images/` — gallery + polaroid photos, calendar photo, favicon
- `assets/audio/` — background song

## Publishing on GitHub Pages

Settings → Pages → Deploy from a branch → `claude/birthday-website-fiancee-uy5amo`, folder `/ (root)`. Every push to that branch redeploys automatically in about a minute.

## Common edits

- **Letter text**: the `note-text` paragraphs in `index.html`
- **Counter start date**: `data-start` on `#loveCounter` in `index.html`
- **Music volume**: `music.volume` in `script.js`
- **Palette**: the custom properties under `:root` in `style.css`
