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
      <ellipse className="glow" cx="14" cy="-6" rx="12" ry="10" fill={c.turmeric} opacity={0.35} />
      <path className="flicker" d="M14 -1 C9 -7 12 -11 14 -16 C16 -11 19 -7 14 -1Z" fill={c.turmeric} />
      <path d="M14 -2 C12 -6 13 -8 14 -10 C15 -8 16 -6 14 -2Z" fill={c.ivory} opacity={0.9} />
      <path d="M0 2 C2 14 26 14 28 2 C22 5 6 5 0 2Z" fill={c.marigold} stroke={c.goldDark} strokeWidth={0.8} />
      <path d="M2 4 Q14 9 26 4" fill="none" stroke={c.goldLight} strokeWidth={0.8} />
    </g>
  )
}

/** Barrel drum for Mehendi & Sangeet. Origin at the drum centre. */
export function Dholak({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g className="bob" transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="22" rx="15" ry="7" fill={c.skinDeep} stroke={c.goldDark} strokeWidth={0.8} />
      <path
        d="M-15 6 C-15 18 -9 22 0 22 C9 22 15 18 15 6 C15 -6 9 -10 0 -10 C-9 -10 -15 -6 -15 6Z"
        fill={c.maroon}
        stroke={c.goldDark}
        strokeWidth={1}
      />
      {[-10, -5, 0, 5, 10].map((lx) => (
        <path key={lx} d={`M${lx} -4 V18`} stroke={c.goldLight} strokeWidth={0.9} />
      ))}
      <ellipse cx="0" cy="6" rx="15" ry="7" fill={c.cream} stroke={c.goldDark} strokeWidth={1} />
      <ellipse cx="0" cy="6" rx="9" ry="4" fill={c.blush} />
      <path d="M-18 4 Q-28 -6 -22 -16" fill="none" stroke={c.goldDark} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M18 4 Q28 -6 22 -16" fill="none" stroke={c.goldDark} strokeWidth={1.6} strokeLinecap="round" />
    </g>
  )
}

/** Small shehnai (wedding pipe) held at an angle. Origin at the bell. */
export function Shehnai({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g className="sway" transform={`translate(${x} ${y}) scale(${scale}) rotate(-28)`}>
      <path d="M0 0 H52" stroke={c.gold} strokeWidth={3.2} strokeLinecap="round" />
      <ellipse cx="0" cy="0" rx="7" ry="4.5" fill={c.goldLight} stroke={c.goldDark} strokeWidth={0.8} />
      {[14, 24, 34].map((lx) => (
        <circle key={lx} cx={lx} cy="0" r="1.4" fill={c.maroonDeep} />
      ))}
      <rect x="50" y="-2.4" width="8" height="4.8" rx="1.2" fill={c.goldDark} />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Stand-alone ornaments                                               */
/* ------------------------------------------------------------------ */

/** Full ovate lotus petal standing on (0,0), softly pointed tip at (0, −h). */
function lotusPetalD(h: number, w: number) {
  const n = (v: number) => Number(v.toFixed(2))
  return [
    `M0 0`,
    `C${n(-w * 0.62)} ${n(-h * 0.16)} ${n(-w)} ${n(-h * 0.46)} ${n(-w * 0.38)} ${n(-h * 0.82)}`,
    `Q0 ${n(-h)} ${n(w * 0.38)} ${n(-h * 0.82)}`,
    `C${n(w)} ${n(-h * 0.46)} ${n(w * 0.62)} ${n(-h * 0.16)} 0 0Z`,
  ].join(' ')
}

interface LotusPetalSpec {
  rotate: number
  h: number
  w: number
  opacity: number
  vein?: boolean
}

function LotusPetal({ rotate, h, w, opacity, vein }: LotusPetalSpec) {
  return (
    <g transform={`rotate(${rotate})`}>
      <path d={lotusPetalD(h, w)} fill="currentColor" fillOpacity={opacity} />
      {vein ? (
        <path
          d={`M0 ${(-h * 0.1).toFixed(2)} C${(-w * 0.1).toFixed(2)} ${(-h * 0.42).toFixed(2)} 0 ${(-h * 0.7).toFixed(2)} 0 ${(-h * 0.88).toFixed(2)}`}
          fill="none"
          strokeWidth="0.55"
          opacity="0.42"
        />
      ) : null}
    </g>
  )
}

function LotusSeedPod({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  const seeds: Array<[number, number]> = [
    [0, -ry * 0.42],
    [-rx * 0.42, -ry * 0.18],
    [rx * 0.42, -ry * 0.18],
    [-rx * 0.22, ry * 0.08],
    [rx * 0.22, ry * 0.08],
    [-rx * 0.5, ry * 0.28],
    [0, ry * 0.22],
    [rx * 0.5, ry * 0.28],
    [-rx * 0.22, ry * 0.52],
    [rx * 0.22, ry * 0.52],
  ]
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="currentColor" fillOpacity="0.45" strokeWidth="1" />
      <ellipse cx={cx} cy={cy - ry * 0.12} rx={rx * 0.72} ry={ry * 0.62} fill="none" strokeWidth="0.55" opacity="0.65" />
      {seeds.map(([dx, dy]) => (
        <circle key={`${dx}-${dy}`} cx={cx + dx} cy={cy + dy} r={Math.max(0.55, rx * 0.08)} fill="currentColor" stroke="none" />
      ))}
    </g>
  )
}

/** Padma in bloom. Fill follows `color` (currentColor by default). */
export function LotusDecoration({ className, ...rest }: SvgProps) {
  const ox = 50
  const oy = 70
  const outer: LotusPetalSpec[] = [
    { rotate: -56, h: 36, w: 16.5, opacity: 0.14 },
    { rotate: -30, h: 48, w: 17, opacity: 0.18, vein: true },
    { rotate: 30, h: 48, w: 17, opacity: 0.18, vein: true },
    { rotate: 56, h: 36, w: 16.5, opacity: 0.14 },
  ]
  const mid: LotusPetalSpec[] = [
    { rotate: -42, h: 34, w: 15, opacity: 0.24 },
    { rotate: 42, h: 34, w: 15, opacity: 0.24 },
  ]
  const inner: LotusPetalSpec[] = [
    { rotate: -14, h: 40, w: 14.5, opacity: 0.34, vein: true },
    { rotate: 0, h: 54, w: 17.5, opacity: 0.44, vein: true },
    { rotate: 14, h: 40, w: 14.5, opacity: 0.34, vein: true },
  ]

  return (
    <svg viewBox="0 0 100 80" className={className} fill="none" {...deco} {...rest}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M50 70 C40 68 30 60 26 50 C32 58 42 66 50 70Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M50 70 C60 68 70 60 74 50 C68 58 58 66 50 70Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M34 68 C42 74.5 58 74.5 66 68 C58 71.5 42 71.5 34 68Z" fill="currentColor" fillOpacity="0.18" />

        <g transform={`translate(${ox} ${oy})`}>
          {outer.map((p) => (
            <LotusPetal key={`o${p.rotate}`} {...p} />
          ))}
          {mid.map((p) => (
            <LotusPetal key={`m${p.rotate}`} {...p} />
          ))}
          {inner.map((p) => (
            <LotusPetal key={`i${p.rotate}`} {...p} />
          ))}
        </g>

        <LotusSeedPod cx={ox} cy={oy - 16} rx={11.5} ry={6.4} />
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
        <g transform="translate(160 28)" strokeWidth="0.95">
          <g transform="rotate(-40)">
            <path d={lotusPetalD(18, 8)} fill="currentColor" fillOpacity="0.16" />
          </g>
          <g transform="rotate(40)">
            <path d={lotusPetalD(18, 8)} fill="currentColor" fillOpacity="0.16" />
          </g>
          <g transform="rotate(-18)">
            <path d={lotusPetalD(22, 7.4)} fill="currentColor" fillOpacity="0.26" />
          </g>
          <g transform="rotate(18)">
            <path d={lotusPetalD(22, 7.4)} fill="currentColor" fillOpacity="0.26" />
          </g>
          <path d={lotusPetalD(26, 8.2)} fill="currentColor" fillOpacity="0.4" />
          <ellipse cx="0" cy="-7" rx="4.2" ry="2.4" fill="currentColor" fillOpacity="0.5" />
          <circle cx="0" cy="-7.4" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="-1.6" cy="-6.2" r="0.55" fill="currentColor" stroke="none" />
          <circle cx="1.6" cy="-6.2" r="0.55" fill="currentColor" stroke="none" />
        </g>
      </g>
    </svg>
  )
}

/** Hanging toran of marigolds and mango leaves, for the top of a panel. */
export function Toran({ className, ...rest }: SvgProps) {
  const beads = Array.from({ length: 21 }, (_, i) => i)
  return (
    <svg viewBox="0 0 640 78" className={className} fill="none" {...deco} {...rest}>
      <path d="M0 10 Q160 32 320 10 Q480 32 640 10" stroke={c.gold} strokeWidth="2.2" />
      <path d="M0 14 Q160 36 320 14 Q480 36 640 14" stroke={c.mango} strokeWidth="1.2" opacity="0.7" />
      {beads.map((i) => {
        const x = 16 + i * 30.4
        const y = 10 + Math.sin((i / 20) * Math.PI) * 12
        return (
          <g key={i} className="sway" style={{ animationDelay: `${(i % 7) * 0.18}s` }} transform={`translate(${x} ${y})`}>
            {i % 2 === 0 ? (
              <Marigold x={0} y={16} r={9} />
            ) : (
              <g transform="translate(0 8) rotate(180)">
                <Leaf size={22} fill={c.mango} />
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/** Auspicious ॐ mark for the head of an Arya Samaj invitation. */
export function OmMark({ className, ...rest }: SvgProps) {
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" {...deco} {...rest}>
      <circle cx="36" cy="36" r="33" stroke={c.gold} strokeWidth="1.4" />
      <circle cx="36" cy="36" r="28" stroke={c.goldLight} strokeWidth="0.8" strokeDasharray="2 3" />
      <text
        x="36"
        y="44"
        textAnchor="middle"
        fill={c.goldDark}
        fontFamily="Tiro Devanagari Hindi, Cormorant Garamond, serif"
        fontSize="32"
      >
        ॐ
      </text>
    </svg>
  )
}
