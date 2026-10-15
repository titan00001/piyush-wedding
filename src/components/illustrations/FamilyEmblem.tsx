import type { SVGProps } from 'react'
import { c } from './palette'

/** Decorative family crest: lotus ring around a serif monogram. No portraits. */
export function FamilyEmblem({ letter, ...rest }: { letter: string } & SVGProps<SVGSVGElement>) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg viewBox="-60 -60 120 120" aria-hidden="true" focusable="false" {...rest}>
      <circle r="56" fill="none" stroke={c.gold} strokeWidth="1" strokeDasharray="1.5 3.5" strokeLinecap="round" />
      {petals.map((a) => (
        <path
          key={a}
          d="M0 -52 C-8 -44 -8 -36 0 -30 C8 -36 8 -44 0 -52Z"
          fill={c.blush}
          stroke={c.gold}
          strokeWidth="1"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="31" fill={c.maroon} stroke={c.gold} strokeWidth="2" />
      <circle r="26" fill="none" stroke={c.goldLight} strokeWidth="0.8" />
      <text
        y="12"
        textAnchor="middle"
        fontSize="34"
        fontWeight="600"
        fill={c.goldLight}
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {letter}
      </text>
    </svg>
  )
}
