# CanoSoftware website

Source for [canosoftware.net](https://canosoftware.net) — the CanoSoftware studio hub, support/FAQ page, and each app's marketing + privacy pages. Static HTML, no build step. Deployed via Cloudflare Pages, connected directly to this repo's `main` branch — pushing to `main` deploys.

## Structure

```
index.html          Studio hub: hero, app list, about, footer
support.html         Shared support/FAQ page for all four apps
icons/                App icons used on the hub page

onward/               Onward marketing + privacy pages
steward/               Steward marketing + privacy pages
roadworthy/             Roadworthy marketing + privacy pages
homestead/               Homestead marketing + privacy pages
```

Each app folder (`onward/`, `steward/`, `roadworthy/`, `homestead/`) is self-contained: its own `index.html`, `privacy.html`, `styles.css`, and `assets/`. These were migrated as-is from each app's original standalone marketing site (previously hosted on Vercel) — content and design are untouched, just relocated. Editing one app's folder has no effect on the others or on the hub page.

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
