import { LANGS } from '../i18n'
import { useLanguage } from '../i18n/useLanguage'

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.language}
      className={`inline-flex items-center rounded-full border border-gold/70 bg-ivory/80 p-0.5 ${className}`}
    >
      {LANGS.map((code) => {
        const active = lang === code
        const label = localesLabel(code)
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`min-h-9 min-w-9 rounded-full px-2.5 text-sm font-semibold transition-colors ${
              active ? 'bg-maroon text-ivory' : 'text-maroon hover:bg-blush/70'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function localesLabel(code: (typeof LANGS)[number]): string {
  if (code === 'en') return 'EN'
  if (code === 'hi') return 'हिं'
  return 'বাং'
}
