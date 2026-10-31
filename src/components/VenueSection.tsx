import type { ReactNode } from 'react'
import { Landmark, Navigation } from 'lucide-react'
import { eventById, events, venueLandmark } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { formatClock, formatDate } from '../lib/dates'
import { BaraatHorseIcon, LocationPinIcon } from './illustrations'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

interface PlaceProps {
  id: string
  icon: ReactNode
  label: string
  name: string
  lines: string[]
  landmark?: string
  mapUrl: string
  mapLabel: string
  note?: string
  landmarkText?: string
  mapAria: string
}

function Place({ id, icon, label, name, lines, landmark, mapUrl, mapLabel, note, landmarkText, mapAria }: PlaceProps) {
  const { lang } = useLanguage()
  const labelClass = lang === 'en' ? 'uppercase tracking-[0.2em]' : 'tracking-wide'

  return (
    <article aria-labelledby={id} className="frame flex h-full flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
      <span className="h-12 w-12 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold text-gold-dark ${labelClass}`}>{label}</p>
        <h3 id={id} className="text-2xl font-semibold sm:text-3xl">
          {name}
        </h3>
        <address className="m-0 mt-1 not-italic text-ink/90">
          {lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
          {landmark && landmarkText && (
            <span className="mt-1 flex items-start gap-2 text-ink/90">
              <Landmark size={18} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
              {landmarkText}
            </span>
          )}
          {note && <span className="mt-1 block text-sm text-ink/80">{note}</span>}
        </address>
      </div>
      <a
        className="btn btn-primary sm:self-center"
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={mapAria}
      >
        <Navigation size={18} aria-hidden="true" />
        {mapLabel}
      </a>
    </article>
  )
}

export function VenueSection() {
  const { t } = useLanguage()
  const shaadi = eventById('shaadi')
  const reception = eventById('reception')
  const aryaSamaj = eventById('mehendi')
  const baraat = shaadi.baraatStart!
  const shaadiCopy = t.events.byId.shaadi
  const receptionCopy = t.events.byId.reception
  const preEvents = events.filter((e) => e.venue === aryaSamaj.venue)
  const preNames = preEvents.map((e) => t.events.byId[e.id].name)
  const preNote = preEvents
    .map((e) => `${formatDate(e.dateISO, t)}${e.time ? ` · ${formatClock(e.time, t)}` : ''}`)
    .join(' · ')

  return (
    <section id="venue" aria-labelledby="venue-title" className="pattern-lattice bg-cream/60 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading id="venue-title" eyebrow={t.venue.eyebrow} title={t.venue.title}>
            {t.venue.intro}
          </SectionHeading>
        </Reveal>

        <div className="grid gap-4">
          <Reveal>
            <Place
              id="place-wedding"
              icon={<LocationPinIcon className="h-full w-full" />}
              label={t.venue.weddingVenue}
              name={shaadi.venue}
              lines={shaadi.addressLines}
              landmark={venueLandmark}
              landmarkText={t.events.landmark(venueLandmark)}
              mapUrl={shaadi.maps[1].url}
              mapLabel={shaadiCopy.maps[1]}
              mapAria={t.venue.mapAria(shaadiCopy.maps[1], shaadi.venue)}
              note={`${shaadiCopy.name} · ${formatDate(shaadi.dateISO, t)}`}
            />
          </Reveal>
          <Reveal delay={60}>
            <Place
              id="place-reception"
              icon={<LocationPinIcon className="h-full w-full" />}
              label={t.venue.receptionVenue}
              name={reception.venue}
              lines={reception.addressLines}
              landmark={reception.landmark}
              landmarkText={reception.landmark ? t.events.landmark(reception.landmark) : undefined}
              mapUrl={reception.maps[0].url}
              mapLabel={receptionCopy.maps[0]}
              mapAria={t.venue.mapAria(receptionCopy.maps[0], reception.venue)}
              note={`${receptionCopy.name} · ${formatDate(reception.dateISO, t)}${reception.time ? ` · ${formatClock(reception.time, t)}` : ''}`}
            />
          </Reveal>
          <Reveal delay={120}>
            <Place
              id="place-baraat"
              icon={<BaraatHorseIcon className="h-full w-full" />}
              label={t.venue.baraatLocation}
              name={baraat.address}
              lines={[]}
              mapUrl={shaadi.maps[0].url}
              mapLabel={shaadiCopy.maps[0]}
              mapAria={t.venue.mapAria(shaadiCopy.maps[0], baraat.address)}
              note={`${shaadiCopy.name} · ${formatDate(shaadi.dateISO, t)}${baraat.time ? ` · ${formatClock(baraat.time, t)}` : ''}`}
            />
          </Reveal>
          <Reveal delay={180}>
            <Place
              id="place-aryasamaj"
              icon={<LocationPinIcon className="h-full w-full" />}
              label={preNames.join(', ')}
              name={aryaSamaj.venue}
              lines={aryaSamaj.addressLines}
              mapUrl={aryaSamaj.maps[0].url}
              mapLabel={t.events.byId.mehendi.maps[0]}
              mapAria={t.venue.mapAria(t.events.byId.mehendi.maps[0], aryaSamaj.venue)}
              note={preNote}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
