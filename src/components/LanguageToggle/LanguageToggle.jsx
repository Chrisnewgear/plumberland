import { useTranslation } from 'react-i18next'
import styles from './LanguageToggle.module.scss'

export default function LanguageToggle({ className }) {
  const { t, i18n } = useTranslation()
  const isEnglish = i18n.resolvedLanguage === 'en'

  const toggle = () => {
    i18n.changeLanguage(isEnglish ? 'es' : 'en')
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEnglish}
      aria-label={isEnglish ? t('nav.switchToSpanish') : t('nav.switchToEnglish')}
      title={t('nav.language')}
      className={`${styles.toggle} ${className ?? ''}`}
      onClick={toggle}
    >
      <span className={styles.option} data-active={!isEnglish} aria-hidden="true">
        ES
      </span>
      <span className={styles.option} data-active={isEnglish} aria-hidden="true">
        EN
      </span>
      <span className={styles.thumb} data-en={isEnglish} aria-hidden="true" />
    </button>
  )
}
