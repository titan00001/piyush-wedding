import type { SVGProps } from 'react'
import { c } from './palette'
import { Leaf, Mandala, Marigold } from './Ornaments'

/** A turmeric root: rounded finger shape, rotated by the caller. */
function Root({ fill = c.marigold }: { fill?: string }) {
  return (
    <g>
      <path d="M0 0 C-6 -4 -6 -14 0 -20 C14 -26 36 -22 44 -12 C48 -6 44 2 34 4 C20 8 8 6 0 0Z" fill={fill} stroke={c.goldDark} strokeWidth="1" />
      <path d="M8 -12 q6 -4 12 -1 M22 -8 q6 -3 12 0" fill="none" stroke={c.goldDark} strokeWidth="0.9" strokeLinecap="round" />
    </g>
  )
}

/** Haldi: brass bowl of turmeric paste, marigolds, turmeric roots and mango leaves. */
export function HaldiIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="Illustration of a brass bowl of turmeric paste surrounded by marigolds, turmeric roots and mango leaves"
      {...props}
    >
      <Mandala x="50" y="-12" width="220" height="220" className="spin-slow" style={{ color: c.goldDark, opacity: 0.22 }} />

      {/* leaves */}
      {[[96, 176, -70], [112, 182, -40], [224, 176, 70], [208, 182, 40], [160, 170, 0]].map(([x, y, r]) => (
        <g key={`${x}${r}`} transform={`translate(${x} ${y}) rotate(${r})`}>
          <Leaf size={62} fill={c.sage} />
        </g>
      ))}

      {/* roots */}
      <g transform="translate(40 190) rotate(-8)"><Root /></g>
      <g transform="translate(66 204) rotate(6) scale(0.9)"><Root fill={c.turmeric} /></g>
      <g transform="translate(232 196) rotate(10)"><Root fill={c.turmeric} /></g>

      {/* bowl */}
      <path d="M88 118 H232 C232 170 204 192 160 192 C116 192 88 170 88 118Z" fill={c.goldLight} stroke={c.goldDark} strokeWidth="2" />
      <path d="M96 138 Q160 154 224 138" fill="none" stroke={c.goldDark} strokeWidth="1.2" />
      <path d="M104 156 Q160 172 216 156" fill="none" stroke={c.goldDark} strokeWidth="1" strokeDasharray="3 3" />
      <path d="M120 126 Q104 160 128 178" fill="none" stroke={c.ivory} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <path d="M128 192 H192 L198 202 H122Z" fill={c.goldDark} />
      <ellipse cx="160" cy="118" rx="72" ry="14" fill={c.goldDark} />
      <ellipse cx="160" cy="116" rx="68" ry="12" fill={c.turmeric} />
      {/* paste mound */}
      <path d="M100 116 C110 88 140 80 160 80 C182 80 212 88 220 116 C200 124 120 124 100 116Z" fill={c.turmeric} stroke={c.goldDark} strokeWidth="1" />
      <path d="M118 108 q14 -14 34 -16 M170 90 q22 4 36 18" fill="none" stroke={c.turmericLight} strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      {/* spoon */}
      <path d="M192 96 L246 40" stroke={c.goldDark} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="190" cy="98" rx="14" ry="8" fill={c.turmeric} stroke={c.goldDark} strokeWidth="1.4" transform="rotate(-42 190 98)" />

      {/* marigolds */}
      <Marigold x={64} y={140} r={17} />
      <Marigold x={92} y={160} r={13} />
      <Marigold x={256} y={142} r={18} />
      <Marigold x={228} y={166} r={13} />
      <Marigold x={160} y={52} r={13} />
      <Marigold x={44} y={92} r={9} />
      <Marigold x={282} y={96} r={9} />
    </svg>
  )
}
