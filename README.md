# Piyush & Priya — Wedding Invitation

Single-page wedding invitation: React 19 + Vite + TypeScript + Tailwind CSS 4 + Lucide icons.
Deployed on **Cloudflare Workers** (static assets from `dist/`). All artwork is original, local inline SVG (no photos, no remote images).
UI copy is available in English, Hindi, and Bengali (`src/i18n/`).

## Commands

```bash
yarn install
yarn dev              # local dev server
yarn lint             # oxlint
yarn build            # tsc -b && vite build -> dist/
yarn preview          # serve the production build locally
yarn deploy           # build + wrangler deploy (production)
yarn deploy:preview   # build + wrangler versions upload
```

Use Node **24** (see `.nvmrc`) and **Yarn Classic** (`yarn@1.22`). Cloudflare detects `yarn.lock` automatically.

## Deploy on Cloudflare

### Option A — Git / Workers Builds (recommended)

1. Push this repo to GitHub/GitLab.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → connect the repo as a **Worker**.
3. Build settings:
   - **Build command:** `yarn build`
   - **Deploy command:** leave default (`npx wrangler deploy` / `yarn wrangler deploy`) — `wrangler.toml` points `[assets]` at `./dist`
   - **Root directory:** `/` (this folder is the app)
4. **Settings → Variables and Secrets** (or build env vars):
   - `VITE_SITE_URL` = `https://piyush-priya-wedding.<account>.workers.dev` (or your custom domain, no trailing slash) — must be available at **build** time
   - Optional: `NODE_VERSION` = `24`
5. Save and deploy. After the first deploy, set `VITE_SITE_URL` to the real URL and **retry deployment** so WhatsApp OG previews bake in the absolute `og:image`.

Do **not** use a classic Pages project with `pages_build_output_dir` while the CI runs `wrangler deploy` — that combination fails. This repo uses Workers static assets (`[assets]` in `wrangler.toml`).

### Option B — CLI

```bash
yarn wrangler login     # once
yarn deploy             # yarn build && wrangler deploy
```

Project name defaults to `piyush-priya-wedding` (`wrangler.toml`). Custom domain: Worker → Triggers / Custom Domains.

Headers in `public/_headers` are copied into `dist/` on build (security + long-cache for hashed assets).

## Where things live

| Path | Purpose |
| --- | --- |
| `src/config/wedding.ts` | **All** names, dates, venues, addresses, map URLs, families. Edit facts here only. |
| `src/i18n/` | English / Hindi / Bengali UI copy (event names, nav, share message). |
| `src/components/illustrations/` | SVG components. Colours come from `palette.ts` → CSS variables in `src/index.css`. |
| `src/components/` | Navbar, HeroSection, Countdown, WeddingEvents, EventCard, FamilySection, FamilyCard, VenueSection, Footer, LanguageSwitcher |
| `src/lib/` | `dates.ts` (countdown + localized dates), `share.ts` (WhatsApp link) |
| `wrangler.toml` | Cloudflare Worker name + `[assets]` → `dist` |

Times for the Shaadi and Reception were not supplied, so none are shown. Add `time: '…'` to the event in `wedding.ts` when known.
The countdown targets `2026-12-03T00:00:00+05:30` (start of the ceremony day, IST); change `countdownTarget` once a ceremony time is fixed.

## Needs configuration before going live

Copy `.env.example` to `.env.local` (or set these in the Cloudflare Worker build environment):

- `VITE_SITE_URL` — the deployed URL (no trailing slash). Used for the WhatsApp share link and for `og:image` / `og:url`. WhatsApp previews will **not** show the image until this is set at build time. If unset, the share button uses whatever URL the page is served from.

## Assets

`public/favicon.svg` (P & P monogram), `public/apple-touch-icon.png` (180×180), `public/og-image.png` (1200×630).
