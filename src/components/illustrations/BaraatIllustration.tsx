import type { SVGProps } from 'react'
import { c } from './palette'
import { Diya, Flower, Garland, Mandala } from './Ornaments'

const HORSE = '#f7f0e2'
const HORSE_SHADE = '#e0d3bb'

/** Baraat: the groom on a decorated white horse beneath festive bunting. */
export function BaraatIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="Illustration of the baraat: a groom in a turban riding a white horse decorated with a maroon and gold blanket"
      {...props}
    >
      <Mandala x="60" y="-20" width="200" height="200" className="spin-slow" style={{ color: c.goldLight, opacity: 0.3 }} />

      {/* bunting */}
      <path d="M0 8 Q80 30 160 8 Q240 30 320 8" fill="none" stroke={c.goldLight} strokeWidth="1.4" />
      {[22, 54, 86, 118, 150, 182, 214, 246, 278].map((x, i) => {
        const y = 8 + Math.sin(((x % 160) / 160) * Math.PI) * 15
        return (
          <path
            key={x}
            d={`M${x - 9} ${y} H${x + 9} L${x} ${y + 22}Z`}
            fill={[c.marigold, c.rose, c.goldLight][i % 3]}
            stroke={c.goldDark}
            strokeWidth="0.6"
          />
        )
      })}

      {/* ground */}
      <ellipse cx="160" cy="205" rx="130" ry="9" fill="#000" opacity="0.3" />
      <path d="M20 200 H300" stroke={c.gold} strokeWidth="1.5" />
      <Diya x={26} y={196} scale={0.8} />
      <Diya x={272} y={196} scale={0.8} />

      {/* tail + back legs (far) */}
      <path d="M96 118 C70 126 62 152 70 184 C76 170 78 150 94 136Z" fill={c.hair} />
      <path d="M130 140 L128 196 H140 L146 150Z" fill={HORSE_SHADE} stroke={c.goldDark} strokeWidth="0.8" />
      <path d="M190 140 L192 196 H204 L204 150Z" fill={HORSE_SHADE} stroke={c.goldDark} strokeWidth="0.8" />
      <path d="M126 196 h16 v6 h-17z M188 196 h17 v6 h-18z" fill={c.maroonDeep} />

      {/* body */}
      <path d="M92 112 C92 96 120 90 150 92 C184 92 206 98 208 116 C210 140 196 152 170 154 H122 C102 152 92 132 92 112Z" fill={HORSE} stroke={c.goldDark} strokeWidth="1.2" />
      {/* neck */}
      <path d="M186 104 C196 84 206 66 218 54 L240 64 C236 90 230 114 214 140 L196 138Z" fill={HORSE} stroke={c.goldDark} strokeWidth="1.2" />
      {/* mane */}
      <path d="M216 52 C204 66 196 84 186 104 L194 108 C204 90 212 76 222 62Z" fill={c.hair} />
      {/* head */}
      <path d="M216 52 C226 40 244 40 252 52 L272 92 C276 100 270 106 262 104 L246 98 C238 94 232 88 226 80 L226 70Z" fill={HORSE} stroke={c.goldDark} strokeWidth="1.2" />
      <path d="M252 52 L250 36 L244 50Z" fill={HORSE} stroke={c.goldDark} strokeWidth="1" />
      <circle cx="244" cy="60" r="2.4" fill={c.ink} />
      <circle cx="268" cy="98" r="1.6" fill={c.goldDark} />
      {/* bridle */}
      <path d="M226 72 L262 98 M236 56 L244 96 M226 72 Q232 78 226 82" fill="none" stroke={c.maroon} strokeWidth="2" />
      <path d="M244 96 L238 128" fill="none" stroke={c.goldLight} strokeWidth="1.6" strokeDasharray="2 2" />
      <circle cx="244" cy="76" r="3" fill={c.goldLight} stroke={c.goldDark} strokeWidth="0.8" />
      {/* forehead plume */}
      <path d="M232 44 C230 30 236 22 244 18 C242 28 244 36 240 46Z" fill={c.rose} stroke={c.goldDark} strokeWidth="0.8" />
      {/* garland on neck */}
      <Garland d="M200 116 Q216 110 226 84" width={6} />

      {/* blanket */}
      <path d="M118 96 Q150 88 182 98 L190 150 Q150 160 112 150Z" fill={c.maroon} stroke={c.goldLight} strokeWidth="1.6" />
      <path d="M122 108 Q150 100 178 110 M124 128 Q150 120 182 130" fill="none" stroke={c.goldLight} strokeWidth="1" strokeDasharray="2 3" />
      <Flower x={150} y={122} r={10} petals={8} petal={c.goldLight} center={c.maroon} stroke={c.goldDark} />
      {[118, 130, 142, 154, 166, 178].map((x) => (
        <path key={x} d={`M${x} 152 v10`} stroke={c.goldLight} strokeWidth="2.4" strokeLinecap="round" />
      ))}

      {/* legs (near) */}
      <path d="M110 142 L106 196 H120 L128 152Z" fill={HORSE} stroke={c.goldDark} strokeWidth="1" />
      <path d="M166 146 L168 196 H182 L186 152Z" fill={HORSE} stroke={c.goldDark} strokeWidth="1" />
      <path d="M104 196 h18 v6 h-19z M166 196 h18 v6 h-19z" fill={c.maroonDeep} />
      <path d="M106 190 h14 M168 190 h14" stroke={c.goldLight} strokeWidth="2" />

      {/* groom */}
      <g>
        <path d="M128 100 Q116 130 126 146 L146 142 Q140 120 148 100Z" fill={c.cream} stroke={c.goldDark} strokeWidth="0.8" />
        <path d="M132 76 Q150 68 168 76 L172 118 Q150 126 130 118Z" fill={c.cream} stroke={c.gold} strokeWidth="1.2" />
        <path d="M150 74 V122" stroke={c.gold} strokeWidth="1" />
        {[84, 94, 104, 114].map((y) => (
          <circle key={y} cx="150" cy={y} r="1.8" fill={c.goldLight} />
        ))}
        <path d="M130 80 Q150 92 170 80 L170 90 Q150 102 130 90Z" fill={c.burgundy} stroke={c.goldLight} strokeWidth="0.8" />
        <Garland d="M138 76 Q132 100 150 112 Q168 100 162 76" width={5} />
        <path d="M168 84 Q184 100 192 108" fill="none" stroke={c.cream} strokeWidth="10" strokeLinecap="round" />
        <circle cx="194" cy="110" r="5" fill={c.skin} />
        <rect x="145" y="62" width="10" height="14" rx="4" fill={c.skinDeep} />
        <circle cx="150" cy="52" r="14" fill={c.skin} />
        <path d="M143 53 q3 2 6 0 M153 53 q3 2 6 0" fill="none" stroke={c.hair} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M144 59 q6 4 12 0" fill="none" stroke={c.hair} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M133 50 Q132 28 150 25 Q168 28 167 50 Q150 42 133 50Z" fill={c.turmeric} stroke={c.goldDark} strokeWidth="1" />
        <path d="M134 44 Q150 34 166 44 M136 36 Q150 28 164 36" fill="none" stroke={c.goldDark} strokeWidth="0.9" opacity="0.7" />
        <path d="M150 34 c-4 -5 -3 -9 0 -12 c3 3 4 7 0 12z" fill={c.goldLight} stroke={c.goldDark} strokeWidth="0.6" />
      </g>

      {/* small flowers on the arch of the scene */}
      <Flower x={40} y={150} r={10} petals={6} petal={c.rose} />
      <Flower x={290} y={160} r={9} petals={6} petal={c.blushDeep} />
    </svg>
  )
}
