import type { SVGProps } from 'react'
import { c } from './palette'
import { Diya, Flower, Garland, Mandala } from './Ornaments'

/**
 * Original hero artwork: a groom (left) and bride (right) in traditional
 * wedding attire, hand in hand beneath a marigold-garlanded arch.
 */
export function WeddingCoupleIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 480"
      role="img"
      aria-label="Illustration of a bride and groom in traditional Indian wedding attire standing hand in hand beneath a floral arch"
      {...props}
    >
      {/* Arch backdrop */}
      <path d="M30 470 V200 A170 170 0 0 1 370 200 V470Z" fill={c.maroonDeep} stroke={c.gold} strokeWidth="3" />
      <path d="M44 470 V202 A156 156 0 0 1 356 202 V470Z" fill="none" stroke={c.goldLight} strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round" />
      <Mandala className="spin-slow" x="90" y="38" width="220" height="220" style={{ color: c.gold, opacity: 0.55 }} />
      <circle cx="200" cy="148" r="86" fill={c.maroon} opacity="0.55" />
      <Mandala className="spin-slow" x="102" y="50" width="196" height="196" style={{ color: c.goldLight, opacity: 0.5, animationDirection: 'reverse' }} />

      {/* Marigold garland along the arch */}
      <Garland d="M30 214 A170 170 0 0 1 370 214" width={9} />
      <Garland d="M46 232 A154 154 0 0 1 354 232" width={6} color={c.rose} />
      {[30, 370].map((x) => (
        <g key={x}>
          <Garland d={`M${x} 214 V330`} width={9} />
          <Garland d={`M${x === 30 ? 46 : 354} 232 V316`} width={6} color={c.rose} />
        </g>
      ))}
      <Flower x={200} y={32} r={18} petals={8} petal={c.rose} center={c.turmeric} />

      {/* Floor and diyas */}
      <path d="M30 440 H370 V470 H30Z" fill={c.maroon} />
      <path d="M30 440 H370" stroke={c.gold} strokeWidth="2" />
      <path d="M30 452 H370" stroke={c.goldLight} strokeWidth="1" strokeDasharray="2 6" strokeLinecap="round" />
      <Diya x={52} y={424} />
      <Diya x={320} y={424} />
      <ellipse cx="200" cy="444" rx="120" ry="7" fill="#000" opacity="0.28" />

      {/* ---------------------------- GROOM ---------------------------- */}
      <g>
        {/* churidar + shoes */}
        <path d="M120 326 L124 438 H141 L146 340 L151 438 H168 L170 326Z" fill={c.cream} stroke={c.goldDark} strokeWidth="1" />
        <path d="M118 438 q12 -6 25 0 v8 h-27z M149 438 q12 -6 25 0 v8 h-27z" fill={c.maroonDeep} stroke={c.gold} strokeWidth="1" />
        <path d="M118 446 h25 M149 446 h25" stroke={c.gold} strokeWidth="1.5" />
        {/* sherwani */}
        <path d="M104 204 Q146 188 188 204 L196 352 Q146 366 94 352Z" fill={c.cream} stroke={c.gold} strokeWidth="1.6" />
        <path d="M94 340 Q146 354 196 340 L196 352 Q146 366 94 352Z" fill={c.gold} />
        <path d="M146 198 V358" stroke={c.gold} strokeWidth="1.2" />
        {[218, 240, 262, 284, 306, 328].map((y) => (
          <circle key={y} cx="146" cy={y} r="3.2" fill={c.goldLight} stroke={c.goldDark} strokeWidth="0.8" />
        ))}
        <path d="M124 208 q22 24 44 0" fill="none" stroke={c.gold} strokeWidth="1.4" />
        {/* embroidery */}
        {[[118, 300], [172, 300], [114, 262], [178, 262]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill={c.gold} />
        ))}
        {/* dupatta across shoulders */}
        <path d="M104 206 Q146 222 188 206 L190 224 Q146 242 102 224Z" fill={c.burgundy} stroke={c.goldLight} strokeWidth="1.4" />
        <path d="M102 216 L90 336 H112 L118 224Z" fill={c.burgundy} stroke={c.goldLight} strokeWidth="1.4" />
        <path d="M90 326 H112" stroke={c.goldLight} strokeWidth="3" strokeDasharray="2 3" />
        {/* left arm (hangs) */}
        <path d="M104 210 Q92 262 96 316" fill="none" stroke={c.cream} strokeWidth="17" strokeLinecap="round" />
        <path d="M104 210 Q92 262 96 316" fill="none" stroke={c.gold} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <circle cx="96" cy="326" r="8" fill={c.skin} />
        {/* right arm reaching to bride */}
        <path d="M186 212 Q204 256 206 304" fill="none" stroke={c.cream} strokeWidth="17" strokeLinecap="round" />
        <path d="M204 290 v14" stroke={c.gold} strokeWidth="9" />
        {/* varmala */}
        <Garland d="M126 202 Q110 262 146 308 Q184 262 166 202" width={8} color={c.marigold} />
        {/* neck + head */}
        <rect x="139" y="176" width="14" height="22" rx="5" fill={c.skinDeep} />
        <circle cx="146" cy="160" r="20" fill={c.skin} />
        <path d="M134 166 q4 3 8 0 M150 166 q4 3 8 0" fill="none" stroke={c.hair} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M136 172 q10 12 20 0" fill="none" stroke={c.hair} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
        <path d="M138 175 q8 -6 16 0" fill="none" stroke={c.hair} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="146" cy="151" r="2" fill={c.red} />
        <circle cx="126" cy="162" r="3.5" fill={c.skinDeep} />
        <circle cx="166" cy="162" r="3.5" fill={c.skinDeep} />
        {/* safa (turban) */}
        <path d="M124 154 Q122 120 146 114 Q170 120 168 154 Q146 140 124 154Z" fill={c.turmeric} stroke={c.goldDark} strokeWidth="1.2" />
        <path d="M126 146 Q146 130 166 146 M127 136 Q146 120 165 136 M130 126 Q146 114 162 126" fill="none" stroke={c.goldDark} strokeWidth="1.1" opacity="0.7" />
        <path d="M122 156 Q146 144 170 156 Q170 148 164 144 Q146 136 128 144 Q122 148 122 156Z" fill={c.marigold} stroke={c.goldDark} strokeWidth="1" />
        {/* sarpech */}
        <path d="M146 138 c-5 -6 -4 -12 0 -16 c4 4 5 10 0 16z" fill={c.goldLight} stroke={c.goldDark} strokeWidth="0.8" />
        <circle cx="146" cy="134" r="2.4" fill={c.red} />
        <path d="M146 122 C150 110 160 106 166 108 C160 112 156 118 150 124" fill="none" stroke={c.goldLight} strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* ----------------------------- BRIDE ---------------------------- */}
      <g>
        {/* veil / dupatta behind */}
        <path
          d="M240 148 Q238 114 268 108 Q298 114 296 148 Q316 236 322 352 L286 340 Q290 232 270 196 Q246 232 248 340 L214 352 Q222 236 240 148Z"
          fill={c.red}
          stroke={c.goldLight}
          strokeWidth="2"
        />
        <path d="M222 346 L250 338 M292 338 L316 346" stroke={c.goldLight} strokeWidth="3" strokeDasharray="2 3" />
        {/* lehenga */}
        <path d="M244 262 Q226 350 200 440 H338 Q310 350 292 262Z" fill={c.red} stroke={c.goldLight} strokeWidth="1.4" />
        <path d="M206 420 Q268 432 334 420 L338 440 H200Z" fill={c.gold} />
        <path d="M210 408 Q268 420 330 408" fill="none" stroke={c.goldLight} strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />
        {[[246, 330], [268, 350], [290, 330], [258, 380], [282, 382], [230, 386], [306, 386]].map(([x, y]) => (
          <Flower key={`${x}${y}`} x={x} y={y} r={7} petals={6} petal={c.goldLight} center={c.maroon} stroke={c.goldDark} />
        ))}
        <path d="M242 258 Q268 270 294 258 V270 Q268 282 242 270Z" fill={c.gold} />
        {/* choli */}
        <path d="M246 204 Q268 194 290 204 L296 258 Q268 268 240 258Z" fill={c.goldLight} stroke={c.goldDark} strokeWidth="1.2" />
        <path d="M252 206 q16 14 32 0" fill="none" stroke={c.goldDark} strokeWidth="1.2" />
        {/* arms */}
        <path d="M246 210 Q226 256 212 298" fill="none" stroke={c.goldLight} strokeWidth="14" strokeLinecap="round" />
        <path d="M290 210 Q312 260 308 312" fill="none" stroke={c.goldLight} strokeWidth="14" strokeLinecap="round" />
        <path d="M214 284 l-5 10 M222 270 l-5 10" stroke={c.red} strokeWidth="3" />
        <path d="M303 296 h12 M303 302 h12" stroke={c.red} strokeWidth="3" />
        <circle cx="308" cy="322" r="7.5" fill={c.skin} />
        {/* joined hands */}
        <circle cx="206" cy="304" r="9.5" fill={c.skin} stroke={c.skinDeep} strokeWidth="1" />
        <path d="M200 306 q6 4 12 0" fill="none" stroke={c.skinDeep} strokeWidth="1" />
        {/* necklace */}
        <path d="M250 202 Q268 232 286 202" fill="none" stroke={c.gold} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M254 212 Q268 244 282 212" fill="none" stroke={c.goldDark} strokeWidth="1.4" strokeDasharray="1 4" strokeLinecap="round" />
        <circle cx="268" cy="236" r="3.6" fill={c.red} stroke={c.gold} strokeWidth="1" />
        {/* neck + head */}
        <rect x="261" y="178" width="14" height="22" rx="5" fill={c.skinDeep} />
        <circle cx="268" cy="162" r="19" fill={c.skin} />
        <path d="M250 158 Q250 138 268 136 Q286 138 286 158 Q276 146 268 146 Q260 146 250 158Z" fill={c.hair} />
        <path d="M256 164 q4 3 8 0 M272 164 q4 3 8 0" fill="none" stroke={c.hair} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M262 174 q6 5 12 0" fill="none" stroke={c.red} strokeWidth="2" strokeLinecap="round" />
        <circle cx="268" cy="157" r="1.9" fill={c.red} />
        <circle cx="272" cy="170" r="1.2" fill={c.gold} />
        {/* maang tikka + earrings */}
        <path d="M268 138 V148" stroke={c.gold} strokeWidth="1" />
        <circle cx="268" cy="150" r="2.8" fill={c.goldLight} stroke={c.goldDark} strokeWidth="0.8" />
        <circle cx="248" cy="170" r="2.6" fill={c.goldLight} />
        <circle cx="288" cy="170" r="2.6" fill={c.goldLight} />
        <path d="M248 173 v6 M288 173 v6" stroke={c.gold} strokeWidth="1.4" />
        {/* veil front edge over hair */}
        <path d="M246 150 Q250 124 268 122 Q286 124 290 150 Q282 130 268 130 Q254 130 246 150Z" fill={c.red} stroke={c.goldLight} strokeWidth="1.4" />
      </g>

      {/* drifting petals */}
      <g className="sway" style={{ transformOrigin: '60px 60px' }}>
        <ellipse cx="68" cy="92" rx="4" ry="7" fill={c.rose} transform="rotate(30 68 92)" />
        <ellipse cx="338" cy="104" rx="4" ry="7" fill={c.marigold} transform="rotate(-30 338 104)" />
        <ellipse cx="324" cy="170" rx="3" ry="6" fill={c.rose} transform="rotate(20 324 170)" />
      </g>
    </svg>
  )
}
