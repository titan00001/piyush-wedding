/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public URL of the deployed site, e.g. https://example.com (used for sharing and og tags). */
  readonly VITE_SITE_URL?: string
  /** Generic REST endpoint that accepts a JSON POST for each RSVP. */
  readonly VITE_RSVP_ENDPOINT?: string
  /** Supabase project URL, e.g. https://abcd.supabase.co */
  readonly VITE_SUPABASE_URL?: string
  /** Supabase anon (public) key. Row Level Security must restrict it to inserts. */
  readonly VITE_SUPABASE_ANON_KEY?: string
  /** Supabase table name, defaults to "rsvps". */
  readonly VITE_SUPABASE_TABLE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
