import { CalendarDays, MapPin } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { CeremonyTimeline } from './CeremonyTimeline'
import { Countdown } from './Countdown'
import { FallingPetals } from './FallingPetals'
import { ShareButton } from './ShareButton'
import { FloralCorner, FloralDivider, LotusDecoration, Mandala, PaisleyDecoration, WeddingCoupleIllustration } from './illustrations'
import { ToranBanner } from './ToranBanner'

export function HeroSection() {
  const { lang, t } = useLanguage()
  const eyebrowClass = lang === 'en' ? 'uppercase tracking-[0.3em]' : 'tracking-wide'

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-turmeric-light/35 via-ivory to-ivory pt-24 pb-14 sm:pt-28 sm:pb-20"
    >
      <div aria-hidden="true" className="pattern-lattice pointer-events-none absolute inset-0 -z-10" />
      <FallingPetals />
      <ToranBanner />
      <FloralCorner className="pointer-events-none absolute -left-6 bottom-8 -z-10 hidden h-40 w-40 opacity-70 sm:block" />
      <FloralCorner className="pointer-events-none absolute -right-6 bottom-8 -z-10 hidden h-40 w-40 -scale-x-100 opacity-70 sm:block" />
      <Mandala className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 text-gold opacity-[0.12]" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div className="hero-in text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold bg-paper/80 sm:h-16 sm:w-16" aria-hidden="true">
            <span className="font-serif text-[1.85rem] leading-none text-gold-dark sm:text-[2.15rem]">ॐ</span>
          </div>
          <p className="sr-only">{t.hero.omLabel}</p>
          <p className={`mt-3 text-sm font-semibold text-gold-dark ${eyebrowClass}`}>{t.hero.celebrationsOf}</p>
          <h1
            id="hero-title"
            className={
              lang === 'en'
                ? 'mt-3 font-script text-[3.4rem] font-normal leading-[1.05] text-maroon sm:text-7xl lg:text-[4.75rem] xl:text-[5.5rem]'
                : 'mt-3 font-serif text-[2.75rem] font-semibold leading-[1.15] text-maroon sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]'
            }
          >
            {t.names.groomFirst} <span className="text-gold">{t.names.and}</span> {t.names.brideFirst}
          </h1>
          <h2 className="mt-2 font-serif text-3xl font-medium italic text-burgundy sm:text-4xl">{t.hero.heading}</h2>
          <p className="mt-2 font-serif text-xl italic text-gold-dark sm:text-2xl">{t.hero.cordiallyInvited}</p>

          <FloralDivider className="divider-draw mx-auto mt-4 h-12 w-72 text-gold" />

          <p className="mt-4 font-serif text-3xl font-semibold text-maroon sm:text-4xl">{t.hero.datesDisplay}</p>
          <p className="mt-1 flex items-center justify-center gap-2 text-lg text-ink">
            <MapPin size={18} className="text-burgundy" aria-hidden="true" />
            {t.hero.location}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xs sm:max-w-md lg:row-span-2 lg:max-w-lg">
          <PaisleyDecoration className="absolute -left-2 bottom-8 h-20 w-12 text-gold sm:-left-8 sm:h-28 sm:w-16" />
          <PaisleyDecoration className="absolute -right-2 bottom-8 h-20 w-12 -scale-x-100 text-gold sm:-right-8 sm:h-28 sm:w-16" />
          <WeddingCoupleIllustration className="relative mx-auto h-auto w-full drop-shadow-[0_18px_28px_rgba(75,13,24,0.35)]" />
          <LotusDecoration className="mx-auto -mt-1 h-28 w-44" />
        </div>

        <div className="hero-in text-center lg:col-start-1">
          <p className="mx-auto max-w-lg font-serif text-xl italic leading-relaxed text-ink/90 sm:text-2xl">
            “{t.hero.invitation}”
          </p>

          <div className="mt-8">
            <Countdown />
          </div>

          <CeremonyTimeline />

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href="#events" className="btn btn-primary">
              <CalendarDays size={20} aria-hidden="true" />
              {t.hero.explore}
            </a>
            <ShareButton />
          </div>
        </div>
      </div>
    </section>
  )
}
