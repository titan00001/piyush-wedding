import type { SVGProps } from 'react'
import { c } from './palette'
import { Flower, Garland, Marigold } from './Ornaments'

/** Wedding mandap: four pillars, a domed canopy, draped fabric and a sacred fire. */
export function MandapIllustration(props: SVGProps<SVGSVGElement>) {
  const pillars = [64, 106, 214, 256]
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="Illustration of a wedding mandap with four pillars, a domed canopy, flower garlands and a sacred fire"
      {...props}
    >
      {/* floor */}
      <path d="M20 196 H300 V208 H20Z" fill={c.maroonDeep} />
      <path d="M20 196 H300" stroke={c.gold} strokeWidth="2" />
      <path d="M70 196 L90 176 H230 L250 196Z" fill={c.burgundy} stroke={c.goldLight} strokeWidth="1" />

      {/* back drape */}
      <path d="M64 70 H256 V176 H64Z" fill={c.burgundy} opacity="0.55" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path key={i} d={`M${64 + i * 24} 70 V176`} stroke={c.goldLight} strokeWidth="0.8" opacity="0.5" />
      ))}

      {/* canopy */}
      <path d="M46 70 H274 L262 54 H58Z" fill={c.maroon} stroke={c.gold} strokeWidth="1.6" />
      <path d="M58 54 Q160 -4 262 54Z" fill={c.maroon} stroke={c.gold} strokeWidth="1.6" />
      <path d="M160 6 V54 M120 20 Q124 38 112 54 M200 20 Q196 38 208 54" fill="none" stroke={c.goldLight} strokeWidth="1.2" />
      <path d="M156 6 h8 l-4 -8z" fill={c.goldLight} />
      <circle cx="160" cy="8" r="3.4" fill={c.gold} />
      {/* scalloped valance */}
      <path
        d={`M46 70 ${Array.from({ length: 19 }, () => "q6 12 12 0").join(' ')}`}
        fill={c.goldLight}
        stroke={c.goldDark}
        strokeWidth="0.8"
        transform="translate(0 0)"
      />
      {Array.from({ length: 19 }, (_, i) => (
        <circle key={i} cx={52 + i * 12} cy={80} r="1.6" fill={c.rose} />
      ))}
      <Garland d="M64 70 Q85 112 106 70" width={6} />
      <Garland d="M214 70 Q235 112 256 70" width={6} />
      <Garland d="M106 70 Q160 130 214 70" width={6} color={c.rose} />

      {/* pillars */}
      {pillars.map((x) => (
        <g key={x}>
          <rect x={x - 6} y="70" width="12" height="106" fill={c.goldLight} stroke={c.goldDark} strokeWidth="1" />
          <rect x={x - 9} y="70" width="18" height="7" rx="2" fill={c.gold} />
          <rect x={x - 9} y="168" width="18" height="9" rx="2" fill={c.gold} />
          {[96, 120, 144].map((y) => (
            <path key={y} d={`M${x - 6} ${y} H${x + 6}`} stroke={c.goldDark} strokeWidth="1.6" />
          ))}
          <Marigold x={x} y={104} r={7} />
          <Marigold x={x} y={132} r={7} />
        </g>
      ))}

      {/* havan kund and fire */}
      <rect x="138" y="164" width="44" height="12" fill={c.goldLight} stroke={c.goldDark} strokeWidth="1" />
      <rect x="144" y="156" width="32" height="10" fill={c.marigold} stroke={c.goldDark} strokeWidth="1" />
      <path className="flicker" d="M160 156 C146 148 150 134 160 120 C170 134 174 148 160 156Z" fill={c.turmeric} />
      <path className="flicker" d="M160 154 C153 148 155 140 160 132 C165 140 167 148 160 154Z" fill={c.ivory} opacity="0.9" />

      {/* seats */}
      <g>
        <rect x="88" y="150" width="34" height="26" rx="6" fill={c.maroon} stroke={c.goldLight} strokeWidth="1.2" />
        <rect x="92" y="138" width="26" height="16" rx="5" fill={c.burgundy} stroke={c.goldLight} strokeWidth="1" />
        <rect x="198" y="150" width="34" height="26" rx="6" fill={c.maroon} stroke={c.goldLight} strokeWidth="1.2" />
        <rect x="202" y="138" width="26" height="16" rx="5" fill={c.burgundy} stroke={c.goldLight} strokeWidth="1" />
      </g>

      {/* flowers at the base */}
      <Flower x={40} y={188} r={11} petals={6} petal={c.rose} />
      <Flower x={280} y={188} r={11} petals={6} petal={c.rose} />
      <Marigold x={56} y={192} r={9} />
      <Marigold x={264} y={192} r={9} />
    </svg>
  )
}
