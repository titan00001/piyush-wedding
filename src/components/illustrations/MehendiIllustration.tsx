import type { SVGProps } from 'react'
import { c } from './palette'
import { Leaf, Mandala } from './Ornaments'

/*
 * The henna cone and the sketch on the left palm share ONE path (TRACE_D).
 *  - the sketch is revealed with CSS stroke-dashoffset along that path (a real pen stroke, no fade)
 *  - the cone rides the same path with CSS offset-path / offset-distance, tip at the path point
 * Both keyframes run 10s linear and hit the same percentages, so the tip stays at the end of the drawn line.
 *
 * Timeline (one loop):
 *   0%  - 60%  cone draws the mandala
 *   60% - 82%  cone lifts away, finished design is held
 *   82% - 95%  design is wiped out from the start (retracts, no fade)
 *   95% - 100% blank, then it repeats
 *
 * Class names use the mh- prefix so they can't collide with other motion rules.
 */
const CSS = `
.mh-trace{stroke-dasharray:1 2;stroke-dashoffset:1.01;animation:mh-trace 10s linear infinite}
.mh-dot{opacity:0;animation:mh-dot 10s linear infinite}
.mh-cone{opacity:0;transform-origin:0 0;offset-rotate:0deg;offset-anchor:0 0;
  animation:mh-move 10s linear infinite,mh-fade 10s linear infinite}
@keyframes mh-trace{0%{stroke-dashoffset:1.01}60%,82%{stroke-dashoffset:0}95%,100%{stroke-dashoffset:-1.01}}
@keyframes mh-dot{0%{opacity:0}1%,82%{opacity:1}95%,100%{opacity:0}}
@keyframes mh-move{0%{offset-distance:0%}60%,100%{offset-distance:100%}}
@keyframes mh-fade{0%{opacity:0}3%,60%{opacity:1}68%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){
  .mh-trace{animation:none;stroke-dashoffset:0}
  .mh-dot{animation:none;opacity:1}
  .mh-cone{animation:none;opacity:0}
}
`

const f = (n: number) => +n.toFixed(2)
const rot = (x: number, y: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180
  return [f(x * Math.cos(a) - y * Math.sin(a)), f(x * Math.sin(a) + y * Math.cos(a))]
}

/** One continuous pen stroke in palm-centre coordinates: centre -> rings -> petals. */
function buildTrace() {
  let d = 'M0 0 L0 -5 A5 5 0 1 1 0 5 A5 5 0 1 1 0 -5 L0 -11 A11 11 0 1 1 0 11 A11 11 0 1 1 0 -11 L0 -12'
  const petal = [
    [-4, -17, -4, -22, 0, -26],
    [4, -22, 4, -17, 0, -12],
  ]
  for (let i = 0; i < 8; i++) {
    const deg = i * 45
    if (i > 0) {
      const [sx, sy] = rot(0, -12, deg)
      d += ` A12 12 0 0 1 ${sx} ${sy}`
    }
    for (const p of petal) {
      const [x1, y1] = rot(p[0], p[1], deg)
      const [x2, y2] = rot(p[2], p[3], deg)
      const [x3, y3] = rot(p[4], p[5], deg)
      d += ` C${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`
    }
  }
  return d
}
const TRACE_D = buildTrace()

/** The cone, tip at (0,0), leaning right so the tip is the visible contact point. */
function HennaCone() {
  return (
    <g transform="rotate(28)">
      <path d="M0 0 L-8 -50 Q0 -57 8 -50 Z" fill={c.maroon} stroke={c.goldDark} strokeWidth="1" strokeLinejoin="round" />
      <path d="M-8 -50 Q0 -57 8 -50 Q0 -45 -8 -50Z" fill={c.maroonDeep} />
      <path d="M-5.6 -36 H5.6" stroke={c.goldLight} strokeWidth="2" strokeDasharray="2 2" />
      <path d="M-1.8 -7 L0 0 L1.8 -7Z" fill={c.maroonDeep} />
    </g>
  )
}

/** One palm-up hand with henna designs, drawn in a 100 x 170 box. */
function Hand({ trace = false }: { trace?: boolean }) {
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

      {/* palm mandala: drawn live by the cone on the traced hand, static on the other */}
      <g {...henna} strokeWidth="1.1" transform="translate(48 98)">
        {trace ? (
          <>
            <path className="mh-trace" d={TRACE_D} pathLength={1} />
            <circle className="mh-dot" r="1.6" fill={c.maroonDeep} stroke="none" />
          </>
        ) : (
          <>
            <circle r="5" />
            <circle r="11" />
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d="M0 -12 C-4 -17 -4 -22 0 -26 C4 -22 4 -17 0 -12Z" transform={`rotate(${i * 45})`} />
            ))}
            <circle r="1.6" fill={c.maroonDeep} />
          </>
        )}
      </g>

      {/* finger lines and dots (static) */}
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

      {/* cone lives inside the hand's own coordinate system, so it can never drift off the palm */}
      {trace && (
        <g transform="translate(48 98)">
          <g className="mh-cone" style={{ offsetPath: `path("${TRACE_D}")` }}>
            <HennaCone />
          </g>
        </g>
      )}
    </g>
  )
}

export function MehendiIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="Illustration of two hands decorated with intricate mehendi, with a henna cone tracing a pattern on the palm"
      {...props}
    >
      <style>{CSS}</style>
      <Mandala x="60" y="-6" width="200" height="200" className="spin-slow" style={{ color: c.sage, opacity: 0.5 }} />
      <circle cx="160" cy="96" r="84" fill={c.paper} opacity="0.55" />
      <circle cx="160" cy="96" r="84" fill="none" stroke={c.sageDeep} strokeWidth="1.4" strokeDasharray="2 6" strokeLinecap="round" />

      {/* leaf sprigs */}
      {[[40, 190, -35], [62, 200, 5], [280, 190, 35], [258, 200, -5], [34, 150, -65], [286, 150, 65]].map(([x, y, r]) => (
        <g key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
          <Leaf size={34} fill={c.sage} />
        </g>
      ))}

      {/* left hand: the cone draws the palm mandala */}
      <g transform="translate(66 28) rotate(-9 50 90)">
        <Hand trace />
      </g>
      <g transform="translate(254 28) scale(-1 1) rotate(-9 50 90)">
        <Hand />
      </g>
    </svg>
  )
}
