import { useTranslation } from 'react-i18next'
import styles from './LangToggle.module.scss'

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

// Two-segment ES / EN pill. Reads/writes the active language through i18next;
// the language detector persists the choice to localStorage.
export default function LangToggle({ className }) {
  const { i18n, t } = useTranslation()
  const active = (i18n.resolvedLanguage || i18n.language || 'es').split('-')[0]

  return (
    <div
      className={`${styles.toggle} ${className ?? ''}`}
      role="group"
      aria-label={t('nav.language')}
    >
      {languages.map(({ code, label }) => {
        const isActive = active === code
        return (
          <button
            key={code}
            type="button"
            className={isActive ? styles.active : undefined}
            aria-pressed={isActive}
            lang={code}
            onClick={() => i18n.changeLanguage(code)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
