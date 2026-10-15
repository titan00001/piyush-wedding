/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public URL of the deployed site, e.g. https://example.com (used for sharing and og tags). */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
