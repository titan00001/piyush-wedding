import type { SVGProps } from 'react'
import { c } from './palette'
import { Leaf, Mandala } from './Ornaments'

/** One palm-up hand with henna designs, drawn in a 100 x 170 box. */
function Hand() {
  const henna = { stroke: c.maroonDeep, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <g>
      {/* wrist, palm, fingers */}
      <rect x="34" y="120" width="32" height="44" rx="8" fill={c.skin} />
      <g stroke={c.skin} strokeWidth="14" strokeLinecap="round">
        <path d="M27 70 V30" />
        <path d="M41 70 V18" />
        <path d="M56 70 V24" />
        <path d="M70 70 V38" />
        <path d="M20 112 L5 82" />
      </g>
      <rect x="18" y="58" width="60" height="72" rx="22" fill={c.skin} />
      {/* bangles */}
      <rect x="30" y="148" width="40" height="7" rx="3.5" fill={c.goldLight} stroke={c.goldDark} strokeWidth="0.8" />
      <rect x="30" y="157" width="40" height="7" rx="3.5" fill={c.rose} stroke={c.goldDark} strokeWidth="0.8" />
      {/* palm mandala */}
      <g {...henna} strokeWidth="1.1" transform="translate(48 98)">
        <circle r="5" />
        <circle r="11" strokeDasharray="1.5 2.5" />
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d="M0 -12 C-4 -17 -4 -22 0 -26 C4 -22 4 -17 0 -12Z" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="1.6" fill={c.maroonDeep} />
      </g>
      {/* finger lines and dots */}
      <g {...henna} strokeWidth="1">
        {[[27, 30, 62], [41, 18, 62], [56, 24, 62], [70, 38, 62]].map(([x, top, bottom]) => (
          <g key={x}>
            <path d={`M${x} ${top + 4} V${bottom}`} strokeDasharray="1 4" />
            <circle cx={x} cy={top + 1} r="1.4" fill={c.maroonDeep} />
            <path d={`M${x - 3} ${bottom - 8} q3 -4 6 0`} />
          </g>
        ))}
        <path d="M14 98 L8 86" strokeDasharray="1 3.5" />
        <path d="M30 70 q18 -10 36 0" />
        <path d="M26 128 q22 14 44 0" />
        <path d="M32 120 q16 8 32 0" />
        <circle cx="48" cy="136" r="1.6" fill={c.maroonDeep} />
        <circle cx="38" cy="132" r="1.2" fill={c.maroonDeep} />
        <circle cx="58" cy="132" r="1.2" fill={c.maroonDeep} />
      </g>
    </g>
  )
}

export function MehendiIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="Illustration of two hands decorated with intricate mehendi, with a henna cone and leaves"
      {...props}
    >
      <Mandala x="60" y="-6" width="200" height="200" className="spin-slow" style={{ color: c.sage, opacity: 0.5 }} />
      <circle cx="160" cy="96" r="84" fill={c.paper} opacity="0.55" />
      <circle cx="160" cy="96" r="84" fill="none" stroke={c.sageDeep} strokeWidth="1.4" strokeDasharray="2 6" strokeLinecap="round" />

      {/* leaf sprigs */}
      {[[40, 190, -35], [62, 200, 5], [280, 190, 35], [258, 200, -5], [34, 150, -65], [286, 150, 65]].map(([x, y, r]) => (
        <g key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
          <Leaf size={34} fill={c.sage} />
        </g>
      ))}

      {/* hands */}
      <g transform="translate(66 28) rotate(-9 50 90)"><Hand /></g>
      <g transform="translate(254 28) scale(-1 1) rotate(-9 50 90)"><Hand /></g>

      {/* henna cone */}
      <g transform="translate(150 150) rotate(-24)">
        <path d="M0 0 L22 0 L16 52 Q11 58 6 52Z" fill={c.maroon} stroke={c.goldDark} strokeWidth="1" />
        <path d="M0 0 Q11 -8 22 0" fill={c.maroonDeep} />
        <path d="M2 14 H20" stroke={c.goldLight} strokeWidth="2" strokeDasharray="2 2" />
        <path d="M7 52 L11 66 L15 52" fill={c.maroonDeep} />
        <path d="M11 66 q6 8 14 6" fill="none" stroke={c.maroonDeep} strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}
