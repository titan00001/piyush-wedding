import { useEffect, useState, type ReactNode } from 'react'
import { LanguageContext } from './context'
import { LANGS, STORAGE_KEY, locales } from './index'
import type { Lang } from './types'

function readStoredLang(): Lang {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw && (LANGS as string[]).includes(raw)) return raw as Lang
  } catch {
    /* private mode / blocked storage */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === 'undefined' ? 'en' : readStoredLang(),
  )

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    document.documentElement.lang = locales[lang].meta.htmlLang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: locales[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}
