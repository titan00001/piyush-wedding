import { MessageCircle } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { getWhatsAppShareHref } from '../lib/share'

export function ShareButton({ className = 'btn btn-outline' }: { className?: string }) {
  const { t } = useLanguage()

  return (
    <a
      className={className}
      href={getWhatsAppShareHref(t.share.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.share.aria}
    >
      <MessageCircle size={20} aria-hidden="true" />
      {t.share.label}
    </a>
  )
}
