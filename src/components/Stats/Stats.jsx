import { useTranslation } from 'react-i18next'
import styles from './Stats.module.scss'

export default function Stats() {
  const { t } = useTranslation()
  const qualities = t('stats.items', { returnObjects: true })

  return (
    <section className={styles.stats} aria-label={t('stats.ariaLabel')}>
      <div className={styles.inner}>
        {qualities.map((item) => (
          <div key={item.value} className={styles.item}>
            <span className={styles.value}>{item.value}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
