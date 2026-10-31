const PETALS = [
  { left: '6%', delay: '0s', duration: '13s', color: 'var(--color-marigold)', size: 11, drift: 22 },
  { left: '18%', delay: '2.2s', duration: '16s', color: 'var(--color-rose)', size: 8, drift: -16 },
  { left: '29%', delay: '5s', duration: '14s', color: 'var(--color-sindoor)', size: 9, drift: 28 },
  { left: '41%', delay: '1.1s', duration: '18s', color: 'var(--color-gold-light)', size: 7, drift: -10 },
  { left: '54%', delay: '3.6s', duration: '15s', color: 'var(--color-marigold)', size: 10, drift: 14 },
  { left: '67%', delay: '0.8s', duration: '17s', color: 'var(--color-rose)', size: 9, drift: -24 },
  { left: '78%', delay: '4.4s', duration: '13s', color: 'var(--color-turmeric)', size: 8, drift: 18 },
  { left: '89%', delay: '2.8s', duration: '16s', color: 'var(--color-blush-deep)', size: 11, drift: -12 },
  { left: '12%', delay: '7s', duration: '15s', color: 'var(--color-marigold)', size: 7, drift: 8 },
  { left: '72%', delay: '6.2s', duration: '14s', color: 'var(--color-sindoor)', size: 8, drift: -20 },
] as const

/** A few marigold and rose petals drifting through the hero. CSS-only, clipped by the section. */
export function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {PETALS.map((petal, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.45,
            background: petal.color,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            ['--drift' as string]: `${petal.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
