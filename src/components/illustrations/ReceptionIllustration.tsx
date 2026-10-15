import type { SVGProps } from 'react'
import { c } from './palette'
import { Flower, Leaf, Mandala } from './Ornaments'

/** Reception: a floral-arched stage with a loveseat, vases and string lights. */
export function ReceptionIllustration(props: SVGProps<SVGSVGElement>) {
  const bulbs = Array.from({ length: 13 }, (_, i) => 20 + i * 23.3)
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="Illustration of a decorated reception stage with a floral arch, a loveseat, flower vases and hanging lights"
      {...props}
    >
      {/* string lights */}
      <path d="M0 14 Q80 40 160 14 Q240 40 320 14" fill="none" stroke={c.goldLight} strokeWidth="1.2" />
      {bulbs.map((x, i) => {
        const t = (x % 160) / 160
        const y = 14 + Math.sin(t * Math.PI) * 13
        return (
          <g key={x}>
            <path d={`M${x} ${y} v6`} stroke={c.goldLight} strokeWidth="1" />
            <circle cx={x} cy={y + 10} r="4" fill={c.goldLight} opacity={i % 2 ? 0.95 : 0.7} />
            <circle cx={x} cy={y + 10} r="8" fill={c.goldLight} opacity="0.14" />
          </g>
        )
      })}

      {/* stage */}
      <path d="M26 200 H294 V210 H26Z" fill={c.maroonDeep} />
      <path d="M40 200 L52 182 H268 L280 200Z" fill={c.maroon} stroke={c.goldLight} strokeWidth="1.2" />
      <path d="M60 182 L66 172 H254 L260 182Z" fill={c.burgundy} stroke={c.goldLight} strokeWidth="1" />

      {/* arch backdrop */}
      <path d="M86 172 V92 A74 74 0 0 1 234 92 V172Z" fill={c.maroonDeep} stroke={c.gold} strokeWidth="2" />
      <Mandala x="104" y="38" width="112" height="112" className="spin-slow" style={{ color: c.goldLight, opacity: 0.45 }} />
      <path d="M96 172 V92 A64 64 0 0 1 224 92 V172" fill="none" stroke={c.goldLight} strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round" />
      {/* arch flowers */}
      {[[86, 150], [86, 124], [88, 98], [100, 70], [122, 50], [160, 42], [198, 50], [220, 70], [232, 98], [234, 124], [234, 150]].map(([x, y], i) => (
        <Flower key={`${x}${y}`} x={x} y={y} r={i % 2 ? 9 : 11} petals={i % 3 === 0 ? 8 : 6} petal={[c.rose, c.blush, c.blushDeep][i % 3]} center={c.goldLight} />
      ))}

      {/* loveseat */}
      <g>
        <rect x="116" y="130" width="88" height="36" rx="10" fill={c.red} stroke={c.goldLight} strokeWidth="1.4" />
        <rect x="108" y="146" width="104" height="26" rx="9" fill={c.maroon} stroke={c.goldLight} strokeWidth="1.4" />
        <rect x="104" y="136" width="18" height="38" rx="8" fill={c.burgundy} stroke={c.goldLight} strokeWidth="1.2" />
        <rect x="198" y="136" width="18" height="38" rx="8" fill={c.burgundy} stroke={c.goldLight} strokeWidth="1.2" />
        <path d="M130 142 H190" stroke={c.goldLight} strokeWidth="1" strokeDasharray="2 3" />
        <rect x="106" y="172" width="8" height="10" fill={c.goldDark} />
        <rect x="206" y="172" width="8" height="10" fill={c.goldDark} />
      </g>

      {/* vases */}
      {[48, 272].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          {[-26, 0, 26].map((r, i) => (
            <g key={r} transform={`translate(0 130) rotate(${r})`}>
              <Leaf size={i === 1 ? 54 : 44} fill={c.sage} />
            </g>
          ))}
          <path d="M-14 132 H14 L10 142 C22 154 20 178 12 190 H-12 C-20 178 -22 154 -10 142Z" fill={c.goldLight} stroke={c.goldDark} strokeWidth="1.2" />
          <path d="M-16 132 H16" stroke={c.goldDark} strokeWidth="2.4" strokeLinecap="round" />
          <Flower x={-14} y={116} r={12} petals={6} petal={c.rose} />
          <Flower x={14} y={112} r={12} petals={6} petal={c.blush} />
          <Flower x={0} y={96} r={13} petals={8} petal={c.blushDeep} />
        </g>
      ))}
    </svg>
  )
}
