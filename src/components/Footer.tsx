import { ArrowUp } from 'lucide-react'
import { couple, navIds } from '../config/wedding'
import type { NavId } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { FloralCorner, FloralDivider, LotusDecoration } from './illustrations'
import { ShareButton } from './ShareButton'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="on-dark pattern-lattice-light relative isolate overflow-hidden bg-maroon-deep px-5 pb-10 pt-16 text-center text-cream">
      <FloralCorner className="pointer-events-none absolute -left-3 -top-3 -z-10 h-32 w-32 opacity-70 sm:h-44 sm:w-44" />
      <FloralCorner className="pointer-events-none absolute -right-3 -top-3 -z-10 h-32 w-32 -scale-x-100 opacity-70 sm:h-44 sm:w-44" />

      <LotusDecoration className="mx-auto h-12 w-24 text-gold-light" />
      <p className="mt-4 font-serif text-xl italic">{t.footer.signoff}</p>
      <p className="mt-3 font-script text-6xl text-gold-light">
        {couple.groomFirst} &amp; {couple.brideFirst}
      </p>
      <p className="mt-1 font-serif text-2xl font-medium text-ivory">{t.hero.datesDisplay}</p>
      <FloralDivider className="mx-auto mt-4 h-8 w-64 text-gold-light" />

      <nav aria-label={t.footer.aria} className="mt-4">
        <ul className="m-0 flex list-none flex-wrap justify-center gap-x-2 gap-y-1 p-0">
          {navIds.map((id: NavId) => (
            <li key={id}>
              <a href={`#${id}`} className="inline-flex min-h-11 items-center rounded-full px-3 text-cream underline-offset-4 hover:text-gold-light hover:underline">
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mx-auto mt-6 max-w-md font-serif text-2xl italic text-ivory">{t.footer.closing}</p>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ShareButton className="btn btn-gold" />
        <a href="#home" className="btn border-gold-light text-gold-light hover:bg-gold-light hover:text-maroon-deep">
          <ArrowUp size={18} aria-hidden="true" />
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
