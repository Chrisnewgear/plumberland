import { useTranslation } from 'react-i18next'
import { ClipboardList, Eye, MailCheck, SearchCheck, UserRound } from 'lucide-react'
import styles from './Guarantee.module.scss'

const icons = [UserRound, SearchCheck, Eye, ClipboardList, MailCheck]

export default function Guarantee() {
  const { t } = useTranslation()
  const stepData = t('guarantee.steps', { returnObjects: true })
  const steps = icons.map((icon, i) => ({ icon, ...stepData[i] }))

  return (
    <section className={styles.guarantee} id="process">
      <div className={styles.inner} data-reveal>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <SearchCheck size={16} />
            {t('guarantee.badge')}
          </span>
          <h2>{t('guarantee.title')}</h2>
          <p>{t('guarantee.intro')}</p>
        </div>

        <ol className={styles.features}>
          {steps.map(({ icon: Icon, title, desc }, index) => (
            <li key={title} className={styles.feature}>
              <span className={styles.featureIcon} aria-hidden="true">
                <Icon size={20} />
              </span>
              <div>
                <small>{t('guarantee.stepLabel', { n: index + 1 })}</small>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
