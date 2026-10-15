import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// Social crawlers (WhatsApp, Facebook, X) need an absolute og:image URL.
// The production URL is not known yet, so it is read from VITE_SITE_URL at
// build time. If it is not set, the og:url tag is dropped and the image URL
// stays relative (previews will not resolve until the site is deployed with
// VITE_SITE_URL set).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'wedding-site-url',
        transformIndexHtml(html) {
          if (siteUrl) {
            return html
              .replaceAll('%SITE_URL%', siteUrl)
              .replace('<!--OG_URL-->', `<meta property="og:url" content="${siteUrl}/" />`)
          }
          return html.replaceAll('%SITE_URL%', '').replace('<!--OG_URL-->', '')
        },
      },
    ],
  }
})
