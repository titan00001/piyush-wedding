import type { ReactNode } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { FloralDivider } from './illustrations'

interface Props {
  id: string
  eyebrow?: string
  title: string
  children?: ReactNode
  onDark?: boolean
}

export function SectionHeading({ id, eyebrow, title, children, onDark }: Props) {
  const { lang } = useLanguage()
  const eyebrowTrack = lang === 'en' ? 'uppercase tracking-[0.28em]' : 'tracking-wide'

  return (
    <header className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && (
        <p className={`mb-2 text-sm font-semibold ${eyebrowTrack} ${onDark ? 'text-gold-light' : 'text-gold-dark'}`}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`text-4xl font-semibold sm:text-5xl ${onDark ? '!text-ivory' : ''}`}>
        {title}
      </h2>
      <FloralDivider className={`mx-auto mt-4 h-8 w-64 ${onDark ? 'text-gold-light' : 'text-gold'}`} />
      {children && <p className={`mt-4 text-lg ${onDark ? 'text-cream' : 'text-ink/80'}`}>{children}</p>}
    </header>
  )
}
