# Piyush & Priya — Wedding Invitation

Single-page wedding invitation: React 19 + Vite + TypeScript + Tailwind CSS 4 + Lucide icons.
All artwork is original, local inline SVG (no photos, no remote images).

## Commands

```bash
npm install
npm run dev       # local dev server
npm run lint      # oxlint
npm run build     # tsc -b && vite build -> dist/
npm run preview   # serve the production build
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/config/wedding.ts` | **All** names, dates, venues, addresses, map links, families. Edit facts here only. |
| `src/components/illustrations/` | SVG components (couple, mehendi, haldi, baraat, mandap, reception, ornaments, emblems, icons). Colours come from `palette.ts` → CSS variables in `src/index.css`. |
| `src/components/` | Navbar, HeroSection, Countdown, WeddingEvents, EventCard, FamilySection, FamilyCard, VenueSection, RSVPForm, Footer |
| `src/services/rsvp.ts` | RSVP submission service (demo / REST / Supabase) |
| `src/lib/` | `dates.ts` (countdown + date formatting), `share.ts` (WhatsApp link) |

Times for the Shaadi and Reception were not supplied, so none are shown. Add `time: '…'` to the event in `wedding.ts` when known.
The countdown targets `2026-12-03T00:00:00+05:30` (start of the ceremony day, IST); change `countdownTarget` once a ceremony time is fixed.

## Needs configuration before going live

Copy `.env.example` to `.env.local` (or set these in your host's build environment):

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
