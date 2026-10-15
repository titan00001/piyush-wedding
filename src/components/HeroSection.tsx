import { CalendarDays, MapPin } from 'lucide-react'
import { couple } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { Countdown } from './Countdown'
import { ShareButton } from './ShareButton'
import { FloralCorner, FloralDivider, LotusDecoration, Mandala, PaisleyDecoration, WeddingCoupleIllustration } from './illustrations'

export function HeroSection() {
  const { lang, t } = useLanguage()
  const eyebrowClass = lang === 'en' ? 'uppercase tracking-[0.3em]' : 'tracking-wide'

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-gradient-to-b from-cream via-ivory to-ivory pt-24 pb-14 sm:pt-28 sm:pb-20">
      <div aria-hidden="true" className="pattern-lattice pointer-events-none absolute inset-0 -z-10" />
      <FloralCorner className="pointer-events-none absolute -left-6 top-12 -z-10 h-24 w-24 opacity-60 sm:-left-4 sm:top-14 sm:h-40 sm:w-40 sm:opacity-70" />
      <FloralCorner className="pointer-events-none absolute -right-6 top-12 -z-10 h-24 w-24 -scale-x-100 opacity-60 sm:-right-4 sm:top-14 sm:h-40 sm:w-40 sm:opacity-70" />
      <Mandala className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 text-gold opacity-[0.12]" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div className="hero-in text-center">
          <p className={`text-sm font-semibold text-gold-dark ${eyebrowClass}`}>{t.hero.celebrationsOf}</p>
          <h1 id="hero-title" className="mt-3 font-script text-[3.6rem] font-normal leading-[1.05] text-maroon sm:text-7xl lg:text-[4.75rem] xl:text-[5.5rem]">
            {couple.groomFirst} <span className="text-gold">&amp;</span> {couple.brideFirst}
          </h1>
          <h2 className="mt-2 font-serif text-3xl font-medium italic text-burgundy sm:text-4xl">{t.hero.heading}</h2>

          <FloralDivider className="mx-auto mt-4 h-8 w-64 text-gold" />

          <p className="mt-4 font-serif text-3xl font-semibold text-maroon sm:text-4xl">{t.hero.datesDisplay}</p>
          <p className="mt-1 flex items-center justify-center gap-2 text-lg text-ink">
            <MapPin size={18} className="text-burgundy" aria-hidden="true" />
            {t.hero.location}
          </p>

          <p className="mx-auto mt-6 max-w-lg font-serif text-xl italic leading-relaxed text-ink/90 sm:text-2xl">
            “{t.hero.invitation}”
          </p>

          <div className="mt-8">
            <Countdown />
          </div>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href="#events" className="btn btn-primary">
              <CalendarDays size={20} aria-hidden="true" />
              {t.hero.explore}
            </a>
            <ShareButton />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <PaisleyDecoration className="absolute -left-2 bottom-8 h-20 w-12 text-gold sm:-left-8 sm:h-28 sm:w-16" />
          <PaisleyDecoration className="absolute -right-2 bottom-8 h-20 w-12 -scale-x-100 text-gold sm:-right-8 sm:h-28 sm:w-16" />
          <WeddingCoupleIllustration className="relative mx-auto h-auto w-full drop-shadow-[0_18px_28px_rgba(75,13,24,0.35)]" />
          <LotusDecoration className="mx-auto -mt-3 h-12 w-28 text-gold" />
        </div>
      </div>
    </section>
  )
}
