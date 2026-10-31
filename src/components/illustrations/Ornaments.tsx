import { useId, type SVGProps } from 'react'
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

function useLotusIds() {
  return useId().replace(/:/g, '')
}

/** Golden padma: painted petals, stamens, optional water and lily pads. */
function GoldenLotusArtwork({ uid, water = true }: { uid: string; water?: boolean }) {
  const gBack = `${uid}-gBack`
  const gMid = `${uid}-gMid`
  const gFront = `${uid}-gFront`
  const gPad = `${uid}-gPad`
  const glow = `${uid}-glow`
  const petalBack = `${uid}-petalBack`
  const petalMid = `${uid}-petalMid`
  const petalFront = `${uid}-petalFront`
  const petalD = 'M0 0 C-27 -10 -31 -52 0 -88 C31 -52 27 -10 0 0Z'
  const veinD = 'M0 -8 Q-2 -44 0 -78'

  return (
    <>
      <defs>
        <linearGradient id={gBack} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b0680f" />
          <stop offset="0.55" stopColor="#e6b04c" />
          <stop offset="1" stopColor="#fbebbd" />
        </linearGradient>
        <linearGradient id={gMid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c58220" />
          <stop offset="0.6" stopColor="#f0c768" />
          <stop offset="1" stopColor="#fff4d6" />
        </linearGradient>
        <linearGradient id={gFront} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d99b33" />
          <stop offset="0.6" stopColor="#f8de92" />
          <stop offset="1" stopColor="#fffbee" />
        </linearGradient>
        <linearGradient id={gPad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5fa890" />
          <stop offset="1" stopColor="#2c6f5c" />
        </linearGradient>
        <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fbe29a" stopOpacity="0.65" />
          <stop offset="1" stopColor="#fbe29a" stopOpacity="0" />
        </radialGradient>
        <g id={petalBack}>
          <path d={petalD} fill={`url(#${gBack})`} stroke="#9c5a0a" strokeWidth="0.8" strokeLinejoin="round" />
          <path d={veinD} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.8" strokeLinecap="round" />
        </g>
        <g id={petalMid}>
          <path d={petalD} fill={`url(#${gMid})`} stroke="#ad6c12" strokeWidth="0.8" strokeLinejoin="round" />
          <path d={veinD} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.8" strokeLinecap="round" />
        </g>
        <g id={petalFront}>
          <path d={petalD} fill={`url(#${gFront})`} stroke="#c0842a" strokeWidth="0.8" strokeLinejoin="round" />
          <path d={veinD} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </defs>

      {water ? <circle cx="120" cy="105" r="92" fill={`url(#${glow})`} /> : null}

      {water ? (
        <g fill="none" stroke="#d9a441" strokeLinecap="round">
          <ellipse cx="120" cy="164" rx="104" ry="11" strokeOpacity="0.28" strokeWidth="1" />
          <ellipse cx="120" cy="164" rx="76" ry="8" strokeOpacity="0.42" strokeWidth="1.1" />
          <ellipse cx="120" cy="164" rx="48" ry="5" strokeOpacity="0.6" strokeWidth="1.2" />
        </g>
      ) : null}

      {water ? (
        <g>
          <ellipse cx="38" cy="172" rx="30" ry="8" fill={`url(#${gPad})`} />
          <path d="M38 172 L62 168" stroke="#1f5546" strokeOpacity="0.5" strokeWidth="0.8" />
          <ellipse cx="206" cy="176" rx="26" ry="7" fill={`url(#${gPad})`} />
          <path d="M206 176 L184 173" stroke="#1f5546" strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
      ) : null}

      <g transform="translate(120 158)">
        <use href={`#${petalBack}`} transform="rotate(-86) scale(0.95)" />
        <use href={`#${petalBack}`} transform="rotate(86) scale(0.95)" />
        <use href={`#${petalBack}`} transform="rotate(-64)" />
        <use href={`#${petalBack}`} transform="rotate(64)" />
        <use href={`#${petalMid}`} transform="rotate(-44) scale(1.02)" />
        <use href={`#${petalMid}`} transform="rotate(44) scale(1.02)" />
        <use href={`#${petalMid}`} transform="rotate(-24) scale(1.02)" />
        <use href={`#${petalMid}`} transform="rotate(24) scale(1.02)" />
        <use href={`#${petalFront}`} transform="scale(0.9)" />

        <g transform="translate(0 -44)">
          <g stroke="#9a3d12" strokeWidth="1.2" strokeLinecap="round">
            <path d="M0 0 L-17 -11" />
            <path d="M0 0 L-13 -17" />
            <path d="M0 0 L-7 -21" />
            <path d="M0 0 L0 -23" />
            <path d="M0 0 L7 -21" />
            <path d="M0 0 L13 -17" />
            <path d="M0 0 L17 -11" />
          </g>
          <g fill="#ffeeb8">
            <circle cx="-17" cy="-11" r="1.9" />
            <circle cx="-13" cy="-17" r="1.9" />
            <circle cx="-7" cy="-21" r="1.9" />
            <circle cx="0" cy="-23" r="1.9" />
            <circle cx="7" cy="-21" r="1.9" />
            <circle cx="13" cy="-17" r="1.9" />
            <circle cx="17" cy="-11" r="1.9" />
          </g>
          <ellipse cx="0" cy="-2" rx="9" ry="5.5" fill="#8a3a14" stroke="#5e2409" strokeWidth="0.8" />
          <ellipse cx="0" cy="-3.5" rx="5.5" ry="2.6" fill="#c9692b" />
        </g>

        <use href={`#${petalFront}`} transform="rotate(-34) scale(0.74)" />
        <use href={`#${petalFront}`} transform="rotate(34) scale(0.74)" />
      </g>
    </>
  )
}

/** Golden lotus floating on water. */
export function LotusDecoration({ className, ...rest }: SvgProps) {
  const uid = useLotusIds()
  return (
    <svg viewBox="0 48 240 148" className={className} fill="none" overflow="visible" {...deco} {...rest}>
      <GoldenLotusArtwork uid={uid} />
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
  const uid = useLotusIds()
  return (
    <svg viewBox="0 0 320 48" className={className} fill="none" overflow="visible" {...deco} {...rest}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 24 H108" strokeWidth="1" />
        <path d="M212 24 H310" strokeWidth="1" />
        <path d="M22 24 q8 -10 16 0 q8 10 16 0 q8 -10 16 0 q8 10 16 0" strokeWidth="1" opacity="0.7" />
        <path d="M218 24 q8 -10 16 0 q8 10 16 0 q8 -10 16 0 q8 10 16 0" strokeWidth="1" opacity="0.7" />
        <circle cx="112" cy="24" r="2.2" fill="currentColor" />
        <circle cx="208" cy="24" r="2.2" fill="currentColor" />
      </g>
      <g transform="translate(160 26) scale(0.26) translate(-120 -118)">
        <GoldenLotusArtwork uid={uid} water={false} />
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
