import { Leaf, Marigold } from './illustrations'

const COUNT = 19

/** Full-width hanging toran: marigolds and mango leaves on a gold cord. */
export function ToranBanner() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-14 sm:top-16" aria-hidden="true">
      <svg className="absolute inset-x-0 top-2 h-3 w-full" viewBox="0 0 800 12" preserveAspectRatio="none">
        <path d="M0 3 Q200 11 400 3 Q600 11 800 3" fill="none" stroke="var(--color-gold)" strokeWidth="1.8" />
        <path d="M0 6 Q200 13 400 6 Q600 13 800 6" fill="none" stroke="var(--color-mango)" strokeWidth="1" opacity="0.65" />
      </svg>
      <div className="relative flex items-start justify-between px-2 sm:px-6">
        {Array.from({ length: COUNT }, (_, i) => (
          <span
            key={i}
            className="sway mt-3 inline-flex h-7 w-7 shrink-0 items-start justify-center sm:mt-4 sm:h-8 sm:w-8"
            style={{ animationDelay: `${(i % 7) * 0.16}s` }}
          >
            {i % 2 === 0 ? (
              <svg viewBox="-12 -12 24 24" className="h-full w-full">
                <Marigold x={0} y={0} r={9} />
              </svg>
            ) : (
              <svg viewBox="-12 -4 24 28" className="h-full w-full">
                <g transform="rotate(180)">
                  <Leaf size={18} fill="var(--color-mango, #5c7a38)" />
                </g>
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
