import { useEffect, useState } from 'react'
import { countdownDateISO, countdownTarget } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { formatDate, getTimeLeft } from '../lib/dates'
import { localizeDigits } from '../lib/numerals'

const TARGET_MS = Date.parse(countdownTarget)

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
    { key: 'days', label: t.countdown.days, value: localizeDigits(left.days, t) },
    { key: 'hours', label: t.countdown.hours, value: localizeDigits(left.hours, t, 2) },
    { key: 'minutes', label: t.countdown.minutes, value: localizeDigits(left.minutes, t, 2) },
    { key: 'seconds', label: t.countdown.seconds, value: localizeDigits(left.seconds, t, 2) },
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
              <span
                key={`${u.key}-${u.value}`}
                className="countdown-tick font-serif text-3xl font-semibold leading-none text-maroon tabular-nums sm:text-4xl"
                data-unit={u.key}
              >
                {u.value}
              </span>
              <span className={`mt-1 text-[0.7rem] font-semibold text-ink/70 sm:text-xs ${lang === 'en' ? 'uppercase tracking-widest' : ''}`}>
                {u.label}
              </span>
            </li>
          ))}
        </ol>
      )}
      {/* Announced once a minute rather than every second. */}
      <p className="sr-only" aria-live="off">
        {t.countdown.remaining(localizeDigits(left.days, t), localizeDigits(left.hours, t), localizeDigits(left.minutes, t))}
      </p>
    </div>
  )
}
