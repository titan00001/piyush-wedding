import { useEffect, useState } from 'react'
import { countdownDateISO, countdownTarget } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { formatDate, getTimeLeft } from '../lib/dates'

const TARGET_MS = Date.parse(countdownTarget)

const pad = (n: number) => String(n).padStart(2, '0')

export function Countdown() {
  const { lang, t } = useLanguage()
  const [left, setLeft] = useState(() => getTimeLeft(TARGET_MS))
  const label = formatDate(countdownDateISO, t)
  const labelClass = lang === 'en' ? 'uppercase tracking-[0.25em]' : 'tracking-wide'

  useEffect(() => {
    const tick = () => setLeft(getTimeLeft(TARGET_MS))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const units = [
    { key: 'days', label: t.countdown.days, value: String(left.days) },
    { key: 'hours', label: t.countdown.hours, value: pad(left.hours) },
    { key: 'minutes', label: t.countdown.minutes, value: pad(left.minutes) },
    { key: 'seconds', label: t.countdown.seconds, value: pad(left.seconds) },
  ]

  return (
    <div
      className="mx-auto w-full max-w-md"
      data-testid="countdown"
      data-target={countdownTarget}
      role="group"
      aria-label={t.countdown.aria(label)}
    >
      <p className={`mb-3 text-center text-sm font-semibold text-gold-dark ${labelClass}`}>
        {left.done ? t.countdown.begun : t.countdown.to(label)}
      </p>
      {!left.done && (
        <ol className="m-0 grid list-none grid-cols-4 gap-2 p-0 sm:gap-3">
          {units.map((u) => (
            <li key={u.key} className="frame grid place-items-center px-1 py-3">
              <span className="font-serif text-3xl font-semibold leading-none text-maroon tabular-nums sm:text-4xl" data-unit={u.key}>
                {u.value}
              </span>
              <span className={`mt-1 text-[0.7rem] font-semibold text-ink/70 sm:text-xs ${lang === 'en' ? 'uppercase tracking-widest' : ''}`}>{u.label}</span>
            </li>
          ))}
        </ol>
      )}
      {/* Announced once a minute rather than every second. */}
      <p className="sr-only" aria-live="off">
        {t.countdown.remaining(left.days, left.hours, left.minutes)}
      </p>
    </div>
  )
}
