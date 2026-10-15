import type { ReactNode } from 'react'
import { Landmark, Mail, Navigation } from 'lucide-react'
import { eventById, events, venueEmail, venueLandmark } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { formatDate } from '../lib/dates'
import { BaraatHorseIcon, LocationPinIcon, MandapIllustration, ReceptionIllustration, StayIcon, TransportIcon } from './illustrations'
import { SectionHeading } from './SectionHeading'

interface PlaceProps {
  id: string
  icon: ReactNode
  label: string
  name: string
  lines: string[]
  landmark?: string
  email?: string
  mapUrl: string
  mapLabel: string
  note?: string
  art?: ReactNode
  landmarkText?: string
  mapAria: string
}

function Place({ id, icon, label, name, lines, landmark, email, mapUrl, mapLabel, note, art, landmarkText, mapAria }: PlaceProps) {
  return (
    <article aria-labelledby={id} className="frame flex h-full flex-col gap-4 p-5 sm:p-6">
      {art && <div className="-mx-1 overflow-hidden rounded-xl bg-maroon px-4 pt-3">{art}</div>}
      <div className="flex items-center gap-3">
        <span className="h-12 w-12 shrink-0">{icon}</span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">{label}</p>
          <h3 id={id} className="text-2xl font-semibold sm:text-3xl">
            {name}
          </h3>
        </div>
      </div>
      <address className="m-0 not-italic">
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
        {note && <span className="mt-1 block text-ink/80">{note}</span>}
        {email && (
          <span className="mt-1 flex items-start gap-2 break-all">
            <Mail size={18} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
            <a className="font-medium text-burgundy underline underline-offset-4" href={`mailto:${email}`}>
              {email}
            </a>
          </span>
        )}
      </address>
      <a
        className="btn btn-primary mt-auto self-start"
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

function Placeholder({ icon, title, soon }: { icon: ReactNode; title: string; soon: string }) {
  return (
    <section aria-label={title} className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-gold/60 bg-paper/60 p-5">
      <span className="h-14 w-14 shrink-0">{icon}</span>
      <div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="m-0 text-ink/80">{soon}</p>
      </div>
    </section>
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
  const pre = events.filter((e) => e.venue === aryaSamaj.venue).map((e) => t.events.byId[e.id].name)

  return (
    <section id="venue" aria-labelledby="venue-title" className="pattern-lattice bg-cream/60 px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="venue-title" eyebrow={t.venue.eyebrow} title={t.venue.title}>
          {t.venue.intro}
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          <Place
            id="place-wedding"
            icon={<LocationPinIcon className="h-full w-full" />}
            label={t.venue.weddingVenue}
            name={shaadi.venue}
            lines={shaadi.addressLines}
            landmark={venueLandmark}
            landmarkText={t.events.landmark(venueLandmark)}
            email={venueEmail}
            mapUrl={shaadi.maps[1].url}
            mapLabel={shaadiCopy.maps[1]}
            mapAria={t.venue.mapAria(shaadiCopy.maps[1], shaadi.venue)}
            note={`${shaadiCopy.name} · ${formatDate(shaadi.dateISO, t)}`}
            art={<MandapIllustration className="mx-auto h-auto w-full max-w-xs" />}
          />
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
            note={`${receptionCopy.name} · ${formatDate(reception.dateISO, t)}`}
            art={<ReceptionIllustration className="mx-auto h-auto w-full max-w-xs" />}
          />
          <Place
            id="place-baraat"
            icon={<BaraatHorseIcon className="h-full w-full" />}
            label={t.venue.baraatLocation}
            name={baraat.address}
            lines={[]}
            mapUrl={shaadi.maps[0].url}
            mapLabel={shaadiCopy.maps[0]}
            mapAria={t.venue.mapAria(shaadiCopy.maps[0], baraat.address)}
            note={`${shaadiCopy.name} · ${formatDate(shaadi.dateISO, t)}`}
          />
          <Place
            id="place-aryasamaj"
            icon={<LocationPinIcon className="h-full w-full" />}
            label={pre.join(', ')}
            name={aryaSamaj.venue}
            lines={aryaSamaj.addressLines}
            mapUrl={aryaSamaj.maps[0].url}
            mapLabel={t.events.byId.mehendi.maps[0]}
            mapAria={t.venue.mapAria(t.events.byId.mehendi.maps[0], aryaSamaj.venue)}
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Placeholder icon={<StayIcon className="h-full w-full" />} title={t.venue.accommodation} soon={t.venue.comingSoon} />
          <Placeholder icon={<TransportIcon className="h-full w-full" />} title={t.venue.transport} soon={t.venue.comingSoon} />
        </div>
      </div>
    </section>
  )
}
