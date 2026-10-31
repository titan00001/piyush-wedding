import { events } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { formatSealDate } from '../lib/dates'

/** Compact date strip under the countdown: each ceremony, in order. */
export function CeremonyTimeline() {
  const { lang, t } = useLanguage()
  const monthClass = lang === 'en' ? 'uppercase tracking-wider' : ''

  return (
    <ol
      className="mx-auto mt-8 flex max-w-xl list-none flex-wrap items-center justify-center gap-y-3 p-0"
      aria-label={t.events.timelineAria}
    >
      {events.map((event, i) => {
        const seal = formatSealDate(event.dateISO, t)
        return (
          <li key={event.id} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="mx-2 h-px w-4 bg-gold/70 sm:mx-3 sm:w-7" />}
            <a
              href={`#event-${event.id}`}
              className="rounded-lg px-1.5 py-1 text-center no-underline transition-colors hover:bg-blush/50"
            >
              <span className={`block text-[0.65rem] font-semibold text-gold-dark ${monthClass}`}>
                {seal.day} {seal.month}
              </span>
              <span className="mt-0.5 block font-serif text-sm font-semibold leading-tight text-maroon sm:text-base">
                {t.events.byId[event.id].name}
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
