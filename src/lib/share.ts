import type { Messages } from '../i18n'

/**
 * The URL to share. Uses VITE_SITE_URL when configured, otherwise the address the
 * page is actually being served from (so once deployed, it is the real URL).
 * No production URL is hardcoded.
 */
export function getShareUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '')
  if (configured) return `${configured}/`
  return `${window.location.origin}${window.location.pathname}`
}

export function buildShareMessage(t: Messages): string {
  return [t.share.intro, '', t.share.body, '', t.share.linkLabel, getShareUrl(), '', t.share.closing].join('\n')
}

export function getWhatsAppShareHref(t: Messages): string {
  return `https://wa.me/?text=${encodeURIComponent(buildShareMessage(t))}`
}
