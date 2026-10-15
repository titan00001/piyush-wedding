import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navIds } from '../config/wedding'
import type { NavId } from '../config/wedding'
import { useLanguage } from '../i18n/useLanguage'
import { CoupleMonogram } from './illustrations'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('home')
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Highlight the section currently in view.
  useEffect(() => {
    const targets = navIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  // Escape closes the mobile menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const labelFor = (id: NavId) => t.nav[id]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/40 bg-ivory/90 backdrop-blur-md">
      <nav aria-label={t.navAria} className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:px-6">
        <a href="#home" className="flex min-w-0 items-center gap-2 font-serif text-xl font-semibold text-maroon no-underline" onClick={() => setOpen(false)}>
          <CoupleMonogram
            aria-hidden="true"
            className="h-9 w-9 shrink-0 rounded-full border border-gold/70 shadow-sm"
            background="var(--color-paper)"
            primary="var(--color-maroon)"
            secondary="var(--color-blush-deep)"
          />
          <span className="truncate font-script text-2xl font-normal">Piyush &amp; Priya</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`rounded-full px-3 py-2 text-[0.95rem] font-medium no-underline transition-colors hover:bg-blush/60 ${
                  active === id ? 'bg-blush text-maroon' : 'text-ink'
                }`}
              >
                {labelFor(id)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <button
            ref={buttonRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold text-maroon lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-gold/30 bg-ivory lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-3 sm:hidden">
          <LanguageSwitcher />
        </div>
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
          {navIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? 'true' : undefined}
                className={`flex min-h-12 items-center rounded-lg px-3 text-lg font-medium no-underline ${
                  active === id ? 'bg-blush text-maroon' : 'text-ink'
                }`}
              >
                {labelFor(id)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
