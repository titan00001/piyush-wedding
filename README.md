# Piyush & Priya — Wedding Invitation

Single-page wedding invitation: React 19 + Vite + TypeScript + Tailwind CSS 4 + Lucide icons.
Deployed on **Cloudflare Pages**. All artwork is original, local inline SVG (no photos, no remote images).
UI copy is available in English, Hindi, and Bengali (`src/i18n/`).

## Commands

```bash
yarn install
yarn dev              # local dev server
yarn lint             # oxlint
yarn build            # tsc -b && vite build -> dist/
yarn preview          # serve the production build locally
yarn deploy           # build + wrangler pages deploy (production)
yarn deploy:preview   # build + deploy a preview branch
```

Use Node **24** (see `.nvmrc`) and **Yarn Classic** (`yarn@1.22`). Cloudflare Pages detects `yarn.lock` automatically.

## Deploy on Cloudflare Pages

### Option A — Git (recommended)

1. Push this repo to GitHub/GitLab.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → connect the repo.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `yarn build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (this folder is the app)
4. **Settings → Environment variables** (Production):
   - `VITE_SITE_URL` = `https://piyush-priya-wedding.pages.dev` (or your custom domain, no trailing slash)
   - Optional: `NODE_VERSION` = `24`
   - Optional RSVP: `VITE_RSVP_ENDPOINT` or `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`
5. Save and deploy. After the first deploy, set `VITE_SITE_URL` to the real URL and **retry deployment** so WhatsApp OG previews bake in the absolute `og:image`.

### Option B — CLI

```bash
yarn wrangler login     # once
yarn deploy             # uses wrangler.toml project name
```

Project name defaults to `piyush-priya-wedding` (`wrangler.toml`). Custom domain: Pages → Custom domains.

Headers in `public/_headers` are copied into `dist/` on build (security + long-cache for hashed assets).

## Where things live

| Path | Purpose |
| --- | --- |
| `src/config/wedding.ts` | **All** names, dates, venues, addresses, map URLs, families. Edit facts here only. |
| `src/i18n/` | English / Hindi / Bengali UI copy (event names, nav, RSVP, share message). |
| `src/components/illustrations/` | SVG components. Colours come from `palette.ts` → CSS variables in `src/index.css`. |
| `src/components/` | Navbar, HeroSection, Countdown, WeddingEvents, EventCard, FamilySection, FamilyCard, VenueSection, RSVPForm, Footer, LanguageSwitcher |
| `src/services/rsvp.ts` | RSVP submission service (demo / REST / Supabase) |
| `src/lib/` | `dates.ts` (countdown + localized dates), `share.ts` (WhatsApp link) |
| `wrangler.toml` | Cloudflare Pages project name + output dir |

Times for the Shaadi and Reception were not supplied, so none are shown. Add `time: '…'` to the event in `wedding.ts` when known.
The countdown targets `2026-12-03T00:00:00+05:30` (start of the ceremony day, IST); change `countdownTarget` once a ceremony time is fixed.

## Needs configuration before going live

Copy `.env.example` to `.env.local` (or set these in Cloudflare Pages build environment):

- `VITE_SITE_URL` — the deployed URL (no trailing slash). Used for the WhatsApp share link and for `og:image` / `og:url`. WhatsApp previews will **not** show the image until this is set at build time. If unset, the share button uses whatever URL the page is served from.
- **RSVP backend** — until one is configured the form runs in clearly labelled **demo mode** and nothing is saved or sent.
  - REST: set `VITE_RSVP_ENDPOINT`; the form POSTs JSON `{ name, phone, attendees, attendance, events, dietary, message, submittedAt }`.
  - Supabase: set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (optionally `VITE_SUPABASE_TABLE`, default `rsvps`):

```sql
create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text,
  attendees int not null,
  attendance text not null check (attendance in ('accepts','declines')),
  events text[] not null default '{}',
  dietary text,
  message text
);
alter table public.rsvps enable row level security;
-- The public key may only insert; read responses from the Supabase dashboard.
create policy "anyone can submit an rsvp" on public.rsvps for insert to anon with check (true);
```

Anyone with the anon key can insert rows, so consider rate limiting / captcha if the link is widely shared.

## Assets

`public/favicon.svg` (P & P monogram), `public/apple-touch-icon.png` (180×180), `public/og-image.png` (1200×630).
Accommodation and Transport panels in *Venue & Travel* are placeholders to fill in later.
