import { events } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { EventCard } from './EventCard'
import { SectionHeading } from './SectionHeading'

export function WeddingEvents() {
  const { t } = useLanguage()

  return (
    <section id="events" aria-labelledby="events-title" className="pattern-lattice bg-cream/60 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="events-title" eyebrow={t.events.eyebrow} title={t.events.title}>
          {t.events.intro}
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.id}
              className={event.id === 'shaadi' || event.id === 'reception' ? 'md:col-span-2' : ''}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
