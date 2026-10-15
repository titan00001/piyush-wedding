import { useEffect, useId, useRef, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import type { Representative } from '../config/wedding'
import { families, representatives } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { FamilyCard } from './FamilyCard'
import { LotusDecoration, PaisleyDecoration } from './illustrations'
import { SectionHeading } from './SectionHeading'

function formatPhone(digits: string): string {
  if (digits.length === 10) return `${digits.slice(0, 5)} ${digits.slice(5)}`
  return digits
}

function e164(digits: string): string {
  return `+91${digits}`
}

function RepresentativeRow({ person }: { person: Representative }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLLIElement>(null)
  const popupId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!person.phone) {
    return (
      <li className="flex items-center justify-center gap-3 font-serif text-2xl font-medium">
        <PaisleyDecoration className="h-6 w-4 text-gold" />
        {person.name}
        <PaisleyDecoration className="h-6 w-4 -scale-x-100 text-gold" />
      </li>
    )
  }

  const phone = person.phone
  const display = formatPhone(phone)
  const show = open

  return (
    <li
      ref={rootRef}
      className="group relative flex items-center justify-center gap-3 font-serif text-2xl font-medium"
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setOpen(true)
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setOpen(false)
      }}
    >
      <PaisleyDecoration className="h-6 w-4 text-gold" />
      <button
        type="button"
        className="cursor-pointer rounded-md border-0 bg-transparent p-0 font-serif text-2xl font-medium text-ink underline decoration-gold/50 decoration-1 underline-offset-4 transition-colors hover:text-maroon focus-visible:text-maroon"
        aria-expanded={show}
        aria-controls={popupId}
        title={t.families.contactHint}
        onClick={() => setOpen((v) => !v)}
      >
        {person.name}
      </button>
      <PaisleyDecoration className="h-6 w-4 -scale-x-100 text-gold" />

      <div
        id={popupId}
        role="tooltip"
        aria-hidden={!show}
        className={`absolute bottom-[calc(100%+0.6rem)] left-1/2 z-20 w-max max-w-[min(18rem,90vw)] -translate-x-1/2 rounded-xl border border-gold/60 bg-paper px-3 py-2.5 shadow-[0_12px_28px_-12px_rgb(110_20_35_/_0.45)] transition-opacity ${
          show ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center gap-3">
          <a
            href={`tel:${e164(phone)}`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/70 bg-ivory text-maroon no-underline transition-colors hover:bg-blush"
            aria-label={t.families.call(person.name)}
          >
            <Phone size={18} aria-hidden="true" />
          </a>
          <a
            href={`https://wa.me/91${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/70 bg-ivory text-maroon no-underline transition-colors hover:bg-blush"
            aria-label={t.families.whatsapp(person.name)}
          >
            <MessageCircle size={18} aria-hidden="true" />
          </a>
          <span className="pr-1 font-sans text-base font-semibold tabular-nums tracking-wide text-ink">{display}</span>
        </div>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full -mt-px h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-gold/60 bg-paper"
        />
      </div>
    </li>
  )
}

function NameList({ id, title, people }: { id: string; title: string; people: readonly Representative[] }) {
  return (
    <section aria-labelledby={id} className="frame px-6 py-8 text-center">
      <LotusDecoration className="mx-auto h-9 w-16 text-gold" />
      <h3 id={id} className="mt-2 font-script text-5xl font-normal text-maroon">
        {title}
      </h3>
      <ul className="m-0 mt-5 grid list-none gap-3 p-0">
        {people.map((person) => (
          <RepresentativeRow key={person.name} person={person} />
        ))}
      </ul>
    </section>
  )
}

export function FamilySection() {
  const { t } = useLanguage()

  return (
    <section id="families" aria-labelledby="families-title" className="bg-ivory px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="families-title" eyebrow={t.families.eyebrow} title={t.families.title}>
          {t.families.intro}
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          <FamilyCard family={families.bride} />
          <FamilyCard family={families.groom} />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <NameList id="rep-vineet" title="Vineet" people={representatives.vineet} />
          <NameList id="rep-darshanabhilashi" title="Darshanabhilashi" people={representatives.darshanabhilashi} />
        </div>
      </div>
    </section>
  )
}
