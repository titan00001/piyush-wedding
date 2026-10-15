import { families, representatives } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { FamilyCard } from './FamilyCard'
import { LotusDecoration, PaisleyDecoration } from './illustrations'
import { SectionHeading } from './SectionHeading'

function NameList({ id, title, names }: { id: string; title: string; names: readonly string[] }) {
  return (
    <section aria-labelledby={id} className="frame px-6 py-8 text-center">
      <LotusDecoration className="mx-auto h-9 w-16 text-gold" />
      <h3 id={id} className="mt-2 font-script text-5xl font-normal text-maroon">
        {title}
      </h3>
      <ul className="m-0 mt-5 grid list-none gap-3 p-0">
        {names.map((name) => (
          <li key={name} className="flex items-center justify-center gap-3 font-serif text-2xl font-medium">
            <PaisleyDecoration className="h-6 w-4 text-gold" />
            {name}
            <PaisleyDecoration className="h-6 w-4 -scale-x-100 text-gold" />
          </li>
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
          <NameList id="rep-vineet" title="Vineet" names={representatives.vineet} />
          <NameList id="rep-darshanabhilashi" title="Darshanabhilashi" names={representatives.darshanabhilashi} />
        </div>
      </div>
    </section>
  )
}
