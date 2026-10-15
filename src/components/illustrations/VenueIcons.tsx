import type { SVGProps } from 'react'
import { c } from './palette'

/**
 * Small, consistent roundel icons for the Venue & Travel section.
 * Same ring, same stroke weight; only the glyph inside changes.
 */
function Roundel({ children, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...rest}>
      <circle cx="32" cy="32" r="30" fill={c.ivory} stroke={c.gold} strokeWidth="1.6" />
      <circle cx="32" cy="32" r="25" fill="none" stroke={c.gold} strokeWidth="0.8" strokeDasharray="1.5 3" strokeLinecap="round" />
      <g fill="none" stroke={c.maroon} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  )
}

export function LocationPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Roundel {...props}>
      <path d="M32 50 C22 38 18 32 18 26 a14 14 0 0 1 28 0 C46 32 42 38 32 50Z" fill={c.blush} />
      <path d="M32 18 C29 21 29 25 32 28 C35 25 35 21 32 18Z" fill={c.maroon} />
      <path d="M26 27 C28 29 30 29 32 28 C34 29 36 29 38 27" />
    </Roundel>
  )
}

export function BaraatHorseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Roundel {...props}>
      <path d="M18 44 V34 C18 28 24 26 30 26 L36 20 L38 14 L42 19 L46 24 L44 29 L38 29 L34 33 V44" fill={c.blush} />
      <path d="M22 44 V38 M30 44 V38" />
      <circle cx="40" cy="22" r="0.8" fill={c.maroon} />
    </Roundel>
  )
}

export function TransportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Roundel {...props}>
      <path d="M16 38 L19 28 C20 26 22 25 24 25 H40 C42 25 44 26 45 28 L48 38 V44 H16Z" fill={c.blush} />
      <path d="M16 38 H48" />
      <circle cx="23" cy="44" r="3.4" fill={c.ivory} />
      <circle cx="41" cy="44" r="3.4" fill={c.ivory} />
      <path d="M22 32 H42" />
    </Roundel>
  )
}

export function StayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Roundel {...props}>
      <path d="M14 46 V22 M14 36 H50 V46 M50 36 V30 C50 27 48 26 46 26 H26 V36" fill={c.blush} />
      <circle cx="21" cy="30" r="4" fill={c.ivory} />
    </Roundel>
  )
}
