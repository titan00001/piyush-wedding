import type { ComponentType, SVGProps } from 'react'
import { CalendarDays, Clock, Landmark, Mail, MapPin, Navigation } from 'lucide-react'
import type { EventTheme, IllustrationKey, WeddingEvent } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { formatLongDate, formatSealDate } from '../lib/dates'
import {
  BaraatIllustration,
  HaldiIllustration,
  MandapIllustration,
  MehendiIllustration,
  ReceptionIllustration,
} from './illustrations'

const illustrations: Record<IllustrationKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  mehendi: MehendiIllustration,
  haldi: HaldiIllustration,
  baraat: BaraatIllustration,
  mandap: MandapIllustration,
  reception: ReceptionIllustration,
}

/** Each event gets its own colour identity. Classes are spelled out so Tailwind can see them. */
const themes: Record<EventTheme, { panel: string; seal: string; accent: string; dark: boolean }> = {
  sage: { panel: 'bg-sage-light', seal: 'bg-sage-deep text-ivory', accent: 'text-sage-deep', dark: false },
  blush: { panel: 'bg-blush', seal: 'bg-burgundy text-ivory', accent: 'text-burgundy', dark: false },
  turmeric: { panel: 'bg-turmeric-light', seal: 'bg-gold-dark text-ivory', accent: 'text-gold-dark', dark: false },
  maroon: { panel: 'bg-maroon', seal: 'bg-gold-light text-maroon-deep', accent: 'text-maroon', dark: true },
  burgundy: { panel: 'bg-burgundy', seal: 'bg-gold-light text-maroon-deep', accent: 'text-burgundy', dark: true },
}

export function EventCard({ event }: { event: WeddingEvent }) {
  const { t } = useLanguage()
  const copy = t.events.byId[event.id]
  const theme = themes[event.theme]
  const Art = illustrations[event.illustration]
  const seal = formatSealDate(event.dateISO, t)
  const titleId = `event-${event.id}`

  return (
    <article aria-labelledby={titleId} className="@container frame h-full overflow-hidden">
      <div className="flex h-full flex-col @2xl:flex-row">
        <div className={`relative shrink-0 ${theme.panel} px-4 pt-6 pb-4 @2xl:flex @2xl:w-5/12 @2xl:items-center ${theme.dark ? 'pattern-lattice-light' : 'pattern-lattice'}`}>
          <Art className="mx-auto h-auto w-full max-w-[22rem]" />
          <div
            aria-hidden="true"
            className={`absolute left-4 top-4 grid h-16 w-16 place-items-center rounded-full border-2 border-gold-light text-center leading-none shadow-md ${theme.seal}`}
          >
            <span>
              <span className="block font-serif text-2xl font-bold">{seal.day}</span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-widest">{seal.month}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <header>
            <h3 id={titleId} className="text-3xl font-semibold sm:text-4xl">
              {copy.name}
            </h3>
            {copy.subtitle && <p className={`mt-1 font-serif text-xl italic ${theme.accent}`}>{copy.subtitle}</p>}
          </header>

          <dl className="m-0 grid gap-3 text-[1.02rem]">
            <div className="flex gap-3">
              <dt className="sr-only">Date</dt>
              <CalendarDays size={20} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
              <dd className="m-0 font-medium">{formatLongDate(event.dateISO, t)}</dd>
            </div>

            {event.time && (
              <div className="flex gap-3">
                <dt className="sr-only">Time</dt>
                <Clock size={20} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
                <dd className="m-0 font-medium">{event.time}</dd>
              </div>
            )}

            {event.baraatStart && copy.baraatLabel && (
              <div className="flex gap-3">
                <dt className="sr-only">{copy.baraatLabel}</dt>
                <Navigation size={20} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
                <dd className="m-0">
                  <span className="block text-sm font-semibold uppercase tracking-wider text-gold-dark">{copy.baraatLabel}</span>
                  {event.baraatStart.address}
                </dd>
              </div>
            )}

            <div className="flex gap-3">
              <dt className="sr-only">Venue</dt>
              <MapPin size={20} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
              <dd className="m-0">
                {event.baraatStart && <span className="block text-sm font-semibold uppercase tracking-wider text-gold-dark">{t.events.banquet}</span>}
                <strong className="font-semibold text-maroon">{event.venue}</strong>
                {event.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>

            {event.landmark && (
              <div className="flex gap-3">
                <dt className="sr-only">Landmark</dt>
                <Landmark size={20} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
                <dd className="m-0">{t.events.landmark(event.landmark)}</dd>
              </div>
            )}

            {event.email && (
              <div className="flex gap-3">
                <dt className="sr-only">Venue email</dt>
                <Mail size={20} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
                <dd className="m-0 break-all">
                  <a className="font-medium text-burgundy underline underline-offset-4" href={`mailto:${event.email}`}>
                    {event.email}
                  </a>
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
            {event.maps.map((m, i) => {
              const label = copy.maps[i] ?? copy.maps[0]
              return (
                <a
                  key={m.url}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${i === 0 ? 'btn-primary' : 'btn-outline'}`}
                  aria-label={t.venue.mapAria(label, copy.name)}
                >
                  <Navigation size={18} aria-hidden="true" />
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </article>
  )
}
