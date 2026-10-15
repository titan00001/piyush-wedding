import { FamilySection } from './components/FamilySection'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'
import { RSVPForm } from './components/RSVPForm'
import { VenueSection } from './components/VenueSection'
import { WeddingEvents } from './components/WeddingEvents'
import { useLanguage } from './i18n/useLanguage'

export default function App() {
  const { t } = useLanguage()

  return (
    <>
      <a
        href="#events"
        className="sr-only-focusable absolute left-3 top-3 z-[60] rounded-lg bg-maroon px-4 py-2 text-ivory"
      >
        {t.skipToCelebrations}
      </a>
      <Navbar />
      <main>
        <HeroSection />
        <WeddingEvents />
        <FamilySection />
        <VenueSection />
        <RSVPForm />
      </main>
      <Footer />
    </>
  )
}
