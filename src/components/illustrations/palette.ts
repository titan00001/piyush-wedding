/**
 * Colour tokens for the illustrations. They resolve to the CSS variables
 * declared in src/index.css, so the whole artwork can be re-themed from one place.
 */
export const c = {
  maroon: 'var(--color-maroon, #6e1423)',
  maroonDeep: 'var(--color-maroon-deep, #4b0d18)',
  burgundy: 'var(--color-burgundy, #8d2036)',
  gold: 'var(--color-gold, #b8903b)',
  goldLight: 'var(--color-gold-light, #e2c57c)',
  goldDark: 'var(--color-gold-dark, #7a5b14)',
  ivory: 'var(--color-ivory, #fbf5e8)',
  cream: 'var(--color-cream, #f4ead3)',
  paper: 'var(--color-paper, #fffdf6)',
  blush: 'var(--color-blush, #f3d6d2)',
  blushDeep: 'var(--color-blush-deep, #e0a0a4)',
  rose: 'var(--color-rose, #d4587a)',
  sage: 'var(--color-sage, #8c9c7c)',
  sageLight: 'var(--color-sage-light, #dde5d0)',
  sageDeep: 'var(--color-sage-deep, #4f6144)',
  turmeric: 'var(--color-turmeric, #e0a526)',
  turmericLight: 'var(--color-turmeric-light, #f6e3a8)',
  marigold: 'var(--color-marigold, #e58a2b)',
  skin: 'var(--color-skin, #d8a07a)',
  skinDeep: 'var(--color-skin-deep, #be845c)',
  ink: 'var(--color-ink, #3b1d22)',
  red: '#b3203a',
  hair: '#2a1216',
} as const
