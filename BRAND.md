# CanoSoftware Brand Book

Reference for anyone (human or AI) generating CanoSoftware-branded material — marketing copy, docs, decks, screenshots, App Store listings, new pages. Treat this as the source of truth; if a new asset contradicts it, fix the asset, not the doc.

Canonical design source: Claude Design project ["CanoSoftware studio logo design"](https://claude.ai/design/p/95872ba2-ad18-4883-9a9a-5c244ae4dcec). This file is the exported, implementation-ready summary of it.

---

## 1. Identity

**Name:** CanoSoftware — a one-person studio. Never "Cano Software" (two words) or "CanoSoft."

**Mark name:** "The Knot." Two interlocking rings: a knot in a string, and the two names woven inside "Cano." One geometry, one set of proportions — never redrawn per size, only recolored.

**Tagline:** "Software that remembers, so you don't have to."

**One-line description:** Apps that keep track of the things you'd rather not hold in your head — goals, house, car, family's week. Built by one person in Maryland. One-time pricing, no subscription trap.

**Studio bio (canonical, first person — reuse verbatim or adapt lightly):**
> I'm TJ. I live in Maryland, I work in corporate IT, and I build these apps at night and on weekends. Each one solved a problem in my own house first.

---

## 2. Voice & Tone

- **First person, singular.** "I build," not "we build" or "CanoSoftware builds." There is one person behind this.
- **Plain and direct.** No marketing superlatives ("revolutionary," "seamless," "game-changing"). Say what the app does in concrete terms.
- **Honest about money.** Always state pricing plainly, call out when something is a one-time purchase vs. subscription, and note when legacy users keep features for free.
- **Short sentences, low jargon.** Written to be read by a normal person deciding whether to download an app, not by a reviewer.
- **Self-deprecating restraint, not cuteness.** Confident but understated. No exclamation points in body copy.
- **Privacy is a selling point, stated factually.** No accounts, no analytics SDKs, no ad SDKs — say so explicitly wherever it's true, and name the one or two exceptions (e.g. Roadworthy → NHTSA VIN lookup, Homestead → WeatherKit) rather than glossing over them.

See [WRITING.md](WRITING.md) for the checklist of AI-generated-copy tells to strip out of any new marketing text before it ships.

---

## 3. Color

Defined as CSS custom properties; every surface must support both schemes via `prefers-color-scheme`. Never hardcode a hex value in new markup — reference the token.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F7F3EC` | `#17140F` | Page background |
| `--bg-alt` | `#EFE9DD` | `#211D17` | Secondary section background (e.g. signup box) |
| `--card` | `#FBF8F2` | `#1C1811` | Card / elevated surface background |
| `--text` | `#262220` | `#EDE6DA` | Primary text ("ink") |
| `--text-muted` | `#6B6259` | `#A79C8C` | Secondary text, captions, labels |
| `--accent` | `#B5563B` | `#E08863` | Links, primary badges, single accent stroke |
| `--accent-contrast` | `#FBF3EC` | `#17140F` | Text/icon color placed *on* `--accent` |
| `--border` | `#DDD4C4` | `#33291F` | Hairline dividers, card borders |
| `--border-strong` | `#C9BEA9` | `#463A2B` | Input borders, button borders, pill outlines |

```css
:root{
  --bg:#F7F3EC;--bg-alt:#EFE9DD;--card:#FBF8F2;
  --text:#262220;--text-muted:#6B6259;
  --accent:#B5563B;--accent-contrast:#FBF3EC;
  --border:#DDD4C4;--border-strong:#C9BEA9;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#17140F;--bg-alt:#211D17;--card:#1C1811;
    --text:#EDE6DA;--text-muted:#A79C8C;
    --accent:#E08863;--accent-contrast:#17140F;
    --border:#33291F;--border-strong:#463A2B;
  }
}
html{background:var(--bg);color-scheme:light dark;}
```

**Rules:**
- Exactly one accent color live on screen at a time. It marks the single most important thing (a live badge, a link, one stroke in an icon) — never used for large fills or decoration.
- No gradients, anywhere. Flat fills only. ("Drop the gradients, keep the cream ground" — settled decision, not a placeholder.)
- Selection color: `background: var(--accent); color: var(--accent-contrast);`

---

## 4. Typography

| Role | Stack | Weight | Notes |
|---|---|---|---|
| Display / H1 headlines | `ui-serif, Georgia, 'Iowan Old Style', 'Palatino Linotype', serif` (Source Serif 4 where webfonts are available) | 500 | `letter-spacing: -0.01em`, `line-height: 1.12`. Used for hero headlines and page titles only — not body copy. |
| UI / body / nav | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | 400–600 | Everything else: nav, body paragraphs, buttons, labels, badges. |

**Scale (marketing pages):**
- Hero H1: `clamp(2.1rem, 5vw + 1rem, 3.4rem)`, weight 500, serif
- Hero subhead / lede: `clamp(1.05rem, 2.5vw, 1.25rem)`, `--text-muted`
- Section eyebrow (e.g. "ABOUT THE STUDIO"): 12–13px, weight 600, `letter-spacing: 0.08em`, uppercase, `--text-muted`
- Card title: 17px, weight 600
- Body paragraph: 15.5–17px, `line-height: 1.6–1.7`
- Caption / meta: 12.5–14px, `--text-muted`
- Nav wordmark: 19px, weight 600, `letter-spacing: -0.01em` — **stays system sans**, never serif, even though it sits next to the serif-adjacent mark.

---

## 5. Logo — "The Knot"

Single vector geometry, recolored per context. Never redraw, skew, or add effects (no drop shadows, no gradients, no outlines beyond what's specified).

**Geometry** (`viewBox="3 14.5 54.5 35"`, two 14px-radius rings with a 7px stroke, woven via masked crossover strokes):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="3 14.5 54.5 35" width="54.5" height="35" fill="none">
  <circle cx="24" cy="32" r="14" stroke="#262220" stroke-width="7"></circle>
  <circle cx="40" cy="32" r="14" stroke="#B5563B" stroke-width="7"></circle>
  <path d="M36.08 18.56A14 14 0 0 0 27.68 25.35" stroke="#F7F3EC" stroke-width="9" stroke-linecap="butt"></path>
  <path d="M37.20 18.28A14 14 0 0 0 26.98 26.85" stroke="#B5563B" stroke-width="7" stroke-linecap="round"></path>
  <path d="M36.36 38.57A14 14 0 0 1 24.98 45.97" stroke="#F7F3EC" stroke-width="9" stroke-linecap="butt"></path>
  <path d="M36.98 37.24A14 14 0 0 1 23.51 45.99" stroke="#262220" stroke-width="7" stroke-linecap="round"></path>
</svg>
```

**Variants:**
- **`mark.svg`** — light-mode default: ink ring `#262220`, accent ring `#B5563B`, interlock gap `#F7F3EC` (matches `--bg`).
- **`mark-dark.svg`** — dark-mode: ink ring `#EDE6DA`, accent ring `#E08863`, interlock gap `#17140F` (matches dark `--bg`).
- Always ship both and toggle with `prefers-color-scheme` — never leave a light-only mark on a dark surface. **Toggle with CSS classes of equal specificity** (e.g. two single-class selectors), not a mix of tag+class and class-only selectors — a higher-specificity `display` rule on one variant will make both render at once regardless of media query. Verify with computed-style, not just eyeballing a screenshot in one color scheme.

**Placement:**
- Nav: mark at ~31×20px, immediately left of the "CanoSoftware" wordmark, `gap: 10px`, wordmark in system sans 19px/600.
- Footer: mark at ~22×14px, `opacity: .75`, left of the copyright line, same gap pattern.
- Minimum clear space: don't crop the mark tighter than its own viewBox padding; don't scale below ~16px tall (the interlock reads as mud below that).

**Don't:**
- Don't recolor the mark to the accent color alone (it needs the ink/accent pairing to read as two interlocked rings).
- Don't place it on a background that isn't `--bg`/`--card`-family — the interlock illusion depends on the gap stroke matching the surface behind it.

---

## 6. App Icon System

One shared rule set, one glyph and one accent stroke per app.

**Construction (all icons, all apps):**
- Canvas: square, glyph drawn in a `0 0 64 64` viewBox, exported at 1024×1024 for production.
- Ground: flat fill, no gradient, rounded square, **corner radius = 18.2% of the side** (`rx="11.6"` at 64px scale — same ratio used for the 88px cards on the website, `border-radius:16px`).
- Glyph: single ink-colored shape/stroke set (`#262220` light-mode ink).
- Accent: exactly one terracotta stroke or fill per icon (`#B5563B` light-mode accent) marking the one idea specific to that app.
- No gradients, no multi-color glyphs, no drop shadows.

**Per-app glyph direction (settled):**

| App | Glyph | Idea |
|---|---|---|
| Onward | Two stacked chevrons, ink chevron above an accent chevron | Momentum / progress upward |
| Steward | Roofline (house) + two underlines, lower one accent | The home, and what's "due" underneath it |
| Roadworthy | "R4" — a gauge arc with an accent needle | The dashboard gauge, flattened |
| Homestead | "H5" — a 2×2 calendar grid, one cell filled in accent | Today's cell on the shared calendar |

**Color variants (light / dark / tinted), per Apple's iOS 18+ multi-appearance icon system:**

| Variant | Ground | Ink glyph | Accent | Filenames (convention) |
|---|---|---|---|---|
| Light (default) | `#FBF3EC` | `#262220` | `#B5563B` | `AppIcon[-1024].png` |
| Dark | `#1C1811` | `#EDE6DA` | `#E08863` | `AppIcon[-1024]-dark.png` |
| Tinted | `#1A1A1A` | `#EDEDED` | `#9A9A9A` (grayscale, no chroma) | `AppIcon[-1024]-tinted.png` |

Tinted must be genuinely desaturated (equal R/G/B) — iOS applies the user's chosen tint color on top and expects grayscale input, not a dimmed version of the color icon.

**Production notes:**
- Xcode filename convention differs per app (`AppIcon-1024[.-dark/-tinted].png` vs `AppIcon[-dark/-tinted].png`) — match whatever `Contents.json` already declares in that target rather than standardizing the filename across apps.
- All three appearance slots must be wired into `Contents.json` under `appearances: [{appearance: "luminosity", value: "dark"|"tinted"}]`, each with its own `filename`. A slot with no `filename` key silently falls back to the light icon.
- Marketing-site card thumbnails (88×88, `border-radius:16px`, `object-fit:cover`) should always be a downscaled export of the **light** variant, kept in sync with the production app icon — never a separate, independently-drifting asset.

---

## 7. Layout & Components

- **Content width:** 1080px max for marketing/hub pages, 760px max for text-heavy pages (support/FAQ).
- **Horizontal padding:** 24px at the viewport edge, all breakpoints.
- **Section rhythm:** 56–72px vertical padding between major sections; 12–24px between a section's heading and its body.
- **Card:** `border:1px solid var(--border); border-radius:16px; background:var(--card); padding:24px;`
- **Pill / status badge:** `border-radius:20px; font-size:11px; font-weight:600; letter-spacing:0.02em; padding:4px 10px;`. Filled (`background:var(--accent); color:var(--accent-contrast)`) for the single "live/primary" state (e.g. "On the App Store"); outlined (`border:1px solid var(--border-strong); color:var(--text-muted)`) for everything else (e.g. "Coming soon").
- **Input / button:** `border-radius:10px; border:1px solid var(--border-strong); padding:12px 16-20px; font-size:15px;`. Buttons use `background:var(--bg)` (outline style), not a filled accent button — the accent is reserved for the one live badge/link per view.
- **Links:** `color:var(--accent); text-decoration:none;` with `opacity:.72` on hover — no underline, ever.
- **Grid of app cards:** `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:20px;`

---

## 8. Favicons & Meta

Every top-level HTML page (not just the hub) should carry:

```html
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16.png" />
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png" />
```

Favicon/touch-icon art is the studio mark (`mark.svg`), not any individual app's icon.

---

## 9. Source Files

All canonical assets live in `website/assets/`:

| File | Purpose |
|---|---|
| `mark.svg` / `mark-dark.svg` | The Knot, light/dark |
| `favicon-16.png`, `favicon-32.png` | Browser favicons |
| `apple-touch-icon.png` | 180×180, iOS home-screen bookmark icon |
| `mark-reversed.svg`, `mark-mono-ink.svg` | Reversed/mono variants for non-standard backgrounds (letterhead, single-color print) |
| `lockup-horizontal.svg` | Mark + wordmark as one locked unit, for contexts without live HTML (decks, PDFs) |
| `signature-mark-132.png`, `avatar-512.png`, `icon-512.png` / `icon-512-dark.png` | Larger raster exports for social/avatar use |

App icon masters (1024×1024, light/dark/tinted) live per-repo in each app's `Assets.xcassets/AppIcon.appiconset/`.

---

## 10. Quick Checklist for New Material

- [ ] Colors pulled from the token table, not eyeballed — and both light/dark defined
- [ ] No gradients
- [ ] Exactly one accent-colored element per view/component
- [ ] Serif only for hero/display headlines; everything else is system sans
- [ ] Copy is first person, plain, honest about price
- [ ] Mark included where the page has a nav/footer, with light+dark variants wired correctly (verify computed style, not just a screenshot)
- [ ] Any new app icon follows: flat cream ground, one ink glyph, one accent stroke, 18.2%-radius rounded square, light/dark/tinted all produced together
