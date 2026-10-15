import { Home } from 'lucide-react'
import type { Family } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { FamilyEmblem, FloralCorner, FloralDivider } from './illustrations'

export function FamilyCard({ family }: { family: Family }) {
  const { lang, t } = useLanguage()
  const id = `family-${family.side}`
  const sideLabel = family.side === 'bride' ? t.families.brideFamily : t.families.groomFamily
  const sideClass = lang === 'en' ? 'uppercase tracking-[0.3em]' : 'tracking-wide'

  return (
    <article aria-labelledby={id} className="frame relative h-full overflow-hidden px-6 pb-8 pt-10 text-center sm:px-10">
      <FloralCorner className="pointer-events-none absolute -left-1 -top-1 h-24 w-24 opacity-80" />
      <FloralCorner className="pointer-events-none absolute -right-1 -top-1 h-24 w-24 -scale-x-100 opacity-80" />

      <FamilyEmblem letter={family.monogram} className="mx-auto h-28 w-28" />
      <p className={`mt-4 text-sm font-semibold text-gold-dark ${sideClass}`}>{sideLabel}</p>
      <h3 id={id} className="mt-1 font-script text-5xl font-normal text-maroon">
        {family.name}
      </h3>
      <FloralDivider className="mx-auto my-4 h-7 w-56 text-gold" />

      <dl className="m-0 grid gap-3">
        {family.members.map((m) => (
          <div key={m.relation}>
            <dt className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
              {t.families.relations[m.relation] ?? m.relation}
            </dt>
            <dd className="m-0 font-serif text-2xl font-medium text-ink">{m.name}</dd>
          </div>
        ))}
      </dl>

      <FloralDivider className="mx-auto my-5 h-7 w-56 text-gold" />
      <p className="mx-auto flex max-w-xs items-start justify-center gap-2 text-ink/90">
        <Home size={18} className="mt-1 shrink-0 text-burgundy" aria-hidden="true" />
        <span>
          <span className="sr-only">{t.families.address}</span>
          {family.address}
        </span>
      </p>
    </article>
  )
}
