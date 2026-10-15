import type { SVGProps } from 'react'
import { c } from './palette'

type SvgProps = SVGProps<SVGSVGElement>

/** Decorative SVGs are hidden from assistive tech. */
const deco = { 'aria-hidden': true, focusable: false } as const

/* ------------------------------------------------------------------ */
/* Small building blocks (usable inside other illustrations)           */
/* ------------------------------------------------------------------ */

interface FlowerProps {
  x: number
  y: number
  r?: number
  petals?: number
  petal?: string
  center?: string
  stroke?: string
  rotate?: number
}

/** A simple round blossom: a ring of petals around a centre. */
export function Flower({
  x,
  y,
  r = 10,
  petals = 6,
  petal = c.blushDeep,
  center = c.goldLight,
  stroke = c.gold,
  rotate = 0,
}: FlowerProps) {
  const rays = Array.from({ length: petals }, (_, i) => (360 / petals) * i)
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      {rays.map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.62}
          rx={r * 0.38}
          ry={r * 0.62}
          fill={petal}
          stroke={stroke}
          strokeWidth={0.6}
          transform={`rotate(${a})`}
        />
      ))}
      <circle r={r * 0.28} fill={center} stroke={stroke} strokeWidth={0.6} />
    </g>
  )
}

/** Marigold: a denser, many-petalled flower. */
export function Marigold({ x, y, r = 8 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle
          key={i}
          cx={Math.cos((i * Math.PI) / 4) * r * 0.55}
          cy={Math.sin((i * Math.PI) / 4) * r * 0.55}
          r={r * 0.5}
          fill={i % 2 ? c.marigold : c.turmeric}
        />
      ))}
      <circle r={r * 0.4} fill={c.marigold} />
      <circle r={r * 0.16} fill={c.maroon} opacity={0.55} />
    </g>
  )
}

/** A leaf pointing up from (0,0); rotate/translate with a wrapping <g>. */
export function Leaf({ size = 20, fill = c.sage }: { size?: number; fill?: string }) {
  return (
    <path
      d={`M0 0 C${-size * 0.45} ${-size * 0.35} ${-size * 0.4} ${-size * 0.85} 0 ${-size} C${size * 0.4} ${-size * 0.85} ${size * 0.45} ${-size * 0.35} 0 0Z`}
      fill={fill}
      stroke={c.sageDeep}
      strokeWidth={0.6}
    />
  )
}

/** Dotted garland along an SVG path (marigold beads). */
export function Garland({ d, width = 7, color = c.marigold }: { d: string; width?: number; color?: string }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={c.sageDeep} strokeWidth={1} opacity={0.7} />
      <path d={d} stroke={color} strokeWidth={width} strokeDasharray={`0.1 ${width * 1.25}`} />
      <path
        d={d}
        stroke={c.goldLight}
        strokeWidth={width * 0.45}
        strokeDasharray={`0.1 ${width * 2.5}`}
        strokeDashoffset={width * 1.25}
      />
    </g>
  )
}

/** Lit diya (oil lamp), 28x20, origin top-left. */
export function Diya({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path className="flicker" d="M14 -1 C9 -7 12 -11 14 -16 C16 -11 19 -7 14 -1Z" fill={c.turmeric} />
      <path d="M14 -2 C12 -6 13 -8 14 -10 C15 -8 16 -6 14 -2Z" fill={c.ivory} opacity={0.9} />
      <path d="M0 2 C2 14 26 14 28 2 C22 5 6 5 0 2Z" fill={c.marigold} stroke={c.goldDark} strokeWidth={0.8} />
      <path d="M2 4 Q14 9 26 4" fill="none" stroke={c.goldLight} strokeWidth={0.8} />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Stand-alone ornaments                                               */
/* ------------------------------------------------------------------ */

/** Lotus in bloom. Fill follows `color` (currentColor by default). */
export function LotusDecoration({ className, ...rest }: SvgProps) {
  const petal = 'M50 54 C37 42 37 18 50 3 C63 18 63 42 50 54Z'
  return (
    <svg viewBox="0 0 100 62" className={className} fill="none" {...deco} {...rest}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <path d={petal} fill="currentColor" fillOpacity="0.12" transform="rotate(-72 50 54) scale(0.8) translate(12.5 13.5)" />
        <path d={petal} fill="currentColor" fillOpacity="0.12" transform="rotate(72 50 54) scale(0.8) translate(12.5 13.5)" />
        <path d={petal} fill="currentColor" fillOpacity="0.18" transform="rotate(-38 50 54) scale(0.92) translate(4.3 4.7)" />
        <path d={petal} fill="currentColor" fillOpacity="0.18" transform="rotate(38 50 54) scale(0.92) translate(4.3 4.7)" />
        <path d={petal} fill="currentColor" fillOpacity="0.28" />
        <path d="M50 50 C46 38 46 24 50 12 C54 24 54 38 50 50Z" fill="none" strokeWidth="0.8" />
        <path d="M20 56 Q50 62 80 56" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/** Paisley (boteh) motif. Pass `className="-scale-x-100"` to mirror. */
export function PaisleyDecoration({ className, ...rest }: SvgProps) {
  return (
    <svg viewBox="0 0 60 90" className={className} fill="none" {...deco} {...rest}>
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M30 86 C8 80 3 52 19 35 C31 22 34 11 27 2 C48 8 58 28 52 50 C48 68 41 80 30 86Z"
          fill="currentColor"
          fillOpacity="0.14"
        />
        <path d="M30 76 C16 70 14 52 24 41 C32 32 36 24 33 16" strokeWidth="1" />
        <path d="M33 70 C25 64 25 54 31 47" strokeWidth="1" />
        <circle cx="40" cy="44" r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx="45" cy="30" r="1.6" fill="currentColor" />
        <circle cx="38" cy="60" r="1.6" fill="currentColor" />
        <circle cx="40" cy="20" r="1.4" fill="currentColor" />
      </g>
    </svg>
  )
}

/** Concentric mandala, centred in a square viewBox. */
export function Mandala({ className, ...rest }: SvgProps) {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5)
  return (
    <svg viewBox="-100 -100 200 200" className={className} fill="none" {...deco} {...rest}>
      <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <circle r="96" strokeOpacity="0.5" />
        <circle r="90" strokeDasharray="1 5" strokeLinecap="round" strokeWidth="2.2" />
        {rays.map((a) => (
          <path key={`o${a}`} d="M0 -88 C-9 -76 -9 -62 0 -52 C9 -62 9 -76 0 -88Z" fill="currentColor" fillOpacity="0.1" transform={`rotate(${a})`} />
        ))}
        <circle r="50" />
        {rays.map((a) => (
          <path key={`m${a}`} d="M0 -48 C-6 -40 -6 -32 0 -26 C6 -32 6 -40 0 -48Z" fill="currentColor" fillOpacity="0.16" transform={`rotate(${a + 11.25})`} />
        ))}
        {rays.slice(0, 8).map((a) => (
          <path key={`i${a}`} d="M0 -26 C-8 -18 -8 -10 0 -4 C8 -10 8 -18 0 -26Z" fill="currentColor" fillOpacity="0.22" transform={`rotate(${a * 2})`} />
        ))}
        <circle r="5" fill="currentColor" fillOpacity="0.5" />
      </g>
    </svg>
  )
}

/** Corner spray of blossoms and leaves, anchored top-left; mirror with scale classes. */
export function FloralCorner({ className, ...rest }: SvgProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" {...deco} {...rest}>
      <path d="M4 4 C40 14 70 40 84 84 C98 120 120 140 156 156" stroke={c.sageDeep} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 4 C14 40 40 70 84 84" stroke={c.sageDeep} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <g transform="translate(34 24) rotate(60)"><Leaf size={26} /></g>
      <g transform="translate(58 46) rotate(110)"><Leaf size={24} /></g>
      <g transform="translate(24 52) rotate(20)"><Leaf size={22} /></g>
      <g transform="translate(86 96) rotate(150)"><Leaf size={24} /></g>
      <g transform="translate(104 118) rotate(95)"><Leaf size={22} /></g>
      <g transform="translate(70 70) rotate(20)"><Leaf size={20} /></g>
      <Flower x={18} y={18} r={17} petals={8} petal={c.maroon} center={c.goldLight} />
      <Flower x={64} y={52} r={13} petals={6} petal={c.blushDeep} />
      <Flower x={30} y={72} r={10} petals={6} petal={c.blush} />
      <Flower x={92} y={98} r={11} petals={6} petal={c.rose} />
      <Flower x={128} y={128} r={9} petals={5} petal={c.blush} />
      <circle cx="46" cy="30" r="2.2" fill={c.gold} />
      <circle cx="78" cy="74" r="2.2" fill={c.gold} />
      <circle cx="112" cy="108" r="2" fill={c.gold} />
    </svg>
  )
}

/** Horizontal ornamental divider with a lotus at its heart. */
export function FloralDivider({ className, ...rest }: SvgProps) {
  return (
    <svg viewBox="0 0 320 36" className={className} fill="none" {...deco} {...rest}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 18 H112" strokeWidth="1" />
        <path d="M208 18 H310" strokeWidth="1" />
        <path d="M22 18 q8 -10 16 0 q8 10 16 0 q8 -10 16 0 q8 10 16 0" strokeWidth="1" opacity="0.7" transform="translate(0 0)" />
        <path d="M218 18 q8 -10 16 0 q8 10 16 0 q8 -10 16 0 q8 10 16 0" strokeWidth="1" opacity="0.7" />
        <circle cx="116" cy="18" r="2.2" fill="currentColor" />
        <circle cx="204" cy="18" r="2.2" fill="currentColor" />
        <path d="M160 3 C148 10 146 24 160 33 C174 24 172 10 160 3Z" fill="currentColor" fillOpacity="0.22" strokeWidth="1.3" />
        <path d="M160 33 C140 30 128 22 126 14 C140 14 152 20 160 33Z" fill="currentColor" fillOpacity="0.14" strokeWidth="1.2" />
        <path d="M160 33 C180 30 192 22 194 14 C180 14 168 20 160 33Z" fill="currentColor" fillOpacity="0.14" strokeWidth="1.2" />
        <circle cx="160" cy="19" r="2.4" fill="currentColor" />
      </g>
    </svg>
  )
}

/** Hanging toran of marigold flowers and pennants, for the top of a panel. */
export function Toran({ className, ...rest }: SvgProps) {
  const flags = [30, 80, 130, 180, 230, 280, 330, 380, 430, 480, 530, 580]
  return (
    <svg viewBox="0 0 600 70" preserveAspectRatio="none" className={className} fill="none" {...deco} {...rest}>
      <path d="M0 6 Q150 30 300 6 Q450 30 600 6" stroke={c.gold} strokeWidth="2" />
      {flags.map((x, i) => {
        const y = 6 + Math.sin(((x % 300) / 300) * Math.PI) * 18 + (x % 300 === 0 ? 0 : 0)
        return (
          <g key={x} transform={`translate(${x} ${y})`}>
            <path d="M-12 0 H12 L0 34Z" fill={i % 3 === 0 ? c.maroon : i % 3 === 1 ? c.marigold : c.rose} stroke={c.goldLight} strokeWidth="1" />
            <circle cy="12" r="2.6" fill={c.goldLight} />
          </g>
        )
      })}
    </svg>
  )
}
