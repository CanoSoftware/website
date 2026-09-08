# CanoSoftware website

Source for [canosoftware.net](https://canosoftware.net) — the CanoSoftware studio hub, support/FAQ page, and each app's marketing + privacy pages. Static HTML, no build step. Deployed via Cloudflare Pages, connected directly to this repo's `main` branch — pushing to `main` deploys.

## Structure

```
index.html          Studio hub: hero, app list, about, footer
everything.html      Unlisted page: all six apps, including Beacon
support.html         Shared support/FAQ page for all four apps
icons/                App icons used on the hub page

onward/               Onward marketing + privacy pages
steward/               Steward marketing + privacy pages
roadworthy/             Roadworthy marketing + privacy pages
homestead/               Homestead marketing + privacy pages
```

**`index.html` was redesigned 2026-09-08** from a Claude Design project
("Canosoftware Marketing Redesign" — `Home-Broadsheet.dc.html`), converted
by hand to plain HTML/CSS/vanilla JS (no build step, no framework). New
pieces, all in one inline `<script>` block: a sticky nav + scroll-progress
bar, a scroll-scaling serif hero with a fading app-icon row, a full-bleed
"Now / what I'm building" section, a full-bleed pine "for small businesses"
callout linking to `web.canosoftware.net`, and animated App-Store-count
stat tiles in the Studio section. `support.html` and the four app folders
below were not part of this pass — see the app-folder note further down
for what's planned next there.

**Beacon is not linked from the public hub page (`index.html`) or footer.** TJ doesn't
want coworkers who get the canosoftware.net link to see it, since it's a job-search tool
and its presence would signal he's job hunting. It's still fully live at
`beacon.canosoftware.net` (a separate Next.js web app, source: `CanoSoftware/beacon`,
deployed on its own Vercel project via custom domain — not a `canosoftware.net/beacon/`
subdirectory, since it's a multi-user app with its own auth/backend, not a static
marketing + privacy pair like the other four) — just not discoverable by browsing the
main site. `everything.html` is an unlisted page (not in nav, footer, or `sitemap.xml`;
`<meta name="robots" content="noindex, nofollow">`) with the full six-app list including
Beacon, meant for TJ to link directly to friends/family who won't misread it. If Beacon's
URL or status changes, update its card there, not on `index.html`.

**Ledger is also not a subdirectory of this repo — same reasoning as Beacon.** It's linked from
both `index.html` and `everything.html` (unlike Beacon, it's not hidden — Ledger isn't a
job-search tool), but its card on both pages links out to `https://ledger.canosoftware.net`
rather than a `/ledger/` path. Its source (marketing landing page, privacy policy, and the app's
`apple-app-site-association` file) lives in `CanoSoftware/Ledger`'s own `site/` directory,
deployed by its own Cloudflare project bound to that custom domain — added 2026-09-01, after
TJ decided Ledger should get its own subdomain like Beacon rather than a `canosoftware.net/ledger/`
path, since it's growing a real web-app component in v2. `sitemap.xml` doesn't list it, matching
Beacon's own omission — that's a different domain's sitemap's job. The one piece this repo still
provides for it: `functions/api/subscribe.js` (the shared newsletter signup) now answers CORS
preflight and allows any `https://*.canosoftware.net` origin, so Ledger's landing page can call it
cross-origin for its launch-email form. Any future `*.canosoftware.net` subdomain can reuse it
the same way, no further backend change needed.

**Web services is a B2B offering, linked but not hosted here.** `web.canosoftware.net` sells
website refresh/rebuild/from-scratch work to small businesses — a separate product line from
the four consumer apps above, with its own repo (`CanoSoftware/Web`) and its own Cloudflare
Worker deployment. Since 2026-09-07, `index.html`'s nav has a "Web services" pill (after
Support) and the footer has a fourth "Web services" column (Website refresh & rebuild,
Pricing, Get a quote), both linking out to `https://web.canosoftware.net`. Both use a new
`--accent-services` CSS variable (`#2E5B4C` light / `#7FAE9B` dark) instead of the site's
usual terracotta `--accent`, so the link visually reads as a distinct offering rather than a
fifth app card. `sitemap.xml` doesn't list it, matching Beacon/Ledger's own omission.

Each app folder (`onward/`, `steward/`, `roadworthy/`, `homestead/`) is self-contained: its own `index.html`, `privacy.html`, and `assets/`. They were originally migrated as-is from each app's standalone marketing site (previously hosted on Vercel), then all four were redesigned to share one inline-style design system (warm-neutral palette, serif headlines, shared CanoSoftware nav/footer using the root `assets/mark.svg` / `mark-dark.svg` and `icons/<app>-icon.png`). There's no shared stylesheet — each page's CSS lives in a `<style>` block in its own `<head>`. Editing one app's folder has no effect on the others or on the hub page.

**`onward/index.html` was redesigned 2026-09-08** from a Claude Design project
("Canosoftware Marketing Redesign" — `Onward-Final.dc.html`), converted by hand
to plain HTML/CSS/vanilla JS (no build step, no framework), same as the hub
page. New pieces, all in one inline `<script>` block: a sticky breadcrumb nav +
scroll-progress bar, an animated hero streak counter, an interactive 84-day
click-to-toggle heatmap with live stats ("The record"), a horizontal
screenshot rail, a full-bleed dark-ink privacy/bio panel, free-vs-Pro pricing
cards, and reveal-on-scroll + magnetic-hover motion on CTAs — all on the same
terracotta/cream tokens the other app pages already used, just restructured
into the newer editorial layout. `onward/privacy.html` was **not** touched in
this pass and still uses the earlier design. One fix made against the source
design file: its Privacy section spec'd `background:var(--surface-tile);
color:var(--page)`, which resolves to near-identical off-white-on-off-white in
light mode (invisible text) — changed to a fixed dark-ink background with
light-cream text instead, matching what the section's own already-hardcoded
border color implied was intended.

**`steward/index.html` was redesigned 2026-09-08** from the same Claude Design
project ("Canosoftware Marketing Redesign" — `Steward-Final.dc.html`),
converted by hand the same way as Onward: plain HTML/CSS/vanilla JS in one
inline `<script>` block, same terracotta/cream tokens and editorial layout. New
pieces: a sticky breadcrumb nav + scroll-progress bar, an interactive "What's
due" task list (click a row to mark it done — strikes the name, swaps its due
label to "Done today", and live-updates the Overdue/This week/This month/Done
counts above), a numbered "What it keeps" feature list, a horizontal
screenshot rail, and a full-bleed dark-ink privacy/bio panel. Also added a
touch of vertical padding to the sticky nav row's container on **both**
`onward/index.html` and `steward/index.html` — its wrapped second line (on
narrow phones, where the nav links drop below the breadcrumb) had no room
before the divider underneath it. `steward/privacy.html` was **not** touched in
this pass and still uses the earlier design.

**`roadworthy/` and `homestead/` have not been through the 2026-09-08 redesign
pass** (hub, Onward, or Steward) and still use their earlier design. TJ's
stated plan is to redesign them next, once more usage/budget is available —
treat that as the next phase, not yet started.

URLs:
- `canosoftware.net/onward/`, `/onward/privacy.html`
- `canosoftware.net/steward/`, `/steward/privacy.html`
- `canosoftware.net/roadworthy/`, `/roadworthy/privacy.html`
- `canosoftware.net/homestead/`, `/homestead/privacy.html`

## Old Vercel URLs

Each app previously lived on its own Vercel project (team `cano-apps`):

| App | Old URL | Vercel project |
|---|---|---|
| Onward | onwardapp-site.vercel.app | `onward-site` |
| Steward | steward-home.vercel.app | `steward-app` |
| Roadworthy | roadworthy-marketing-site-cano-apps.vercel.app | `roadworthy-marketing-site` |
| Homestead | homestead-hq.vercel.app | `homestead-marketing-site` |

Those projects are still live but now serve nothing but a redirect (`vercel.json`) to the matching `canosoftware.net/<app>/` path — root and `/privacy.html` both covered. This exists because Onward's App Store Connect **Marketing URL** is locked to its original domain until the next version submission; the redirect is the bridge in the meantime. Once every app's ASC listing points directly at `canosoftware.net/<app>/`, these Vercel projects can be deleted.

## Related repos

All under the [CanoSoftware](https://github.com/CanoSoftware) org:
- `Onward`, `Steward`, `Roadworthy`, `Homestead` — app source (Xcode projects)
- `onward-marketing-site`, `steward-marketing-site`, `roadworthy-marketing-site`,
  `homestead-marketing-site` — the original standalone sources each app folder above was
  migrated from. **Decided (2026-08-03): this repo is canonical going forward.** All four
  standalone repos are now **archived** (read-only) to prevent edits landing in a copy that
  doesn't actually deploy — that already happened once (a support-email fix was made in this
  repo but not in `onward-marketing-site`, so they briefly disagreed). Make all future
  marketing/privacy edits in this repo's app folders; the archived repos are kept only for
  history.
- `Beacon` — app source (Next.js), deployed on its own Vercel project at
  `beacon.canosoftware.net`.
- `Ledger` — app source (Xcode project). Its own `site/` directory (not this repo) holds the
  marketing landing page, privacy policy, and AASA file, deployed on its own Cloudflare project at
  `ledger.canosoftware.net`.
- `Web` (repo `web-services`) — the website-services product's full source (six pages: Home,
  Services, Work, Pricing, About, Contact), deployed as a Cloudflare Worker at
  `web.canosoftware.net`. Linked from this repo's `index.html` nav/footer but not hosted here.
