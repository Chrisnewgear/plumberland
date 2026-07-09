import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Building2,
  Droplets,
  Hammer,
  PaintRoller,
  Wrench,
  Zap,
} from 'lucide-react'
import styles from './Services.module.scss'

const icons = [Hammer, Droplets, PaintRoller, Zap, Building2]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true })

  return (
    <section className={styles.services} id="services">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <span className={styles.kicker}>{t('services.kicker')}</span>
          <h2>{t('services.title')}</h2>
          <p>{t('services.description')}</p>
        </header>

        <p className={styles.single}>
          <span className={styles.singleIcon} aria-hidden="true">
            <Wrench size={20} />
          </span>
          <span>
            <strong>{t('services.singleStrong')}</strong> {t('services.singleRest')}
          </span>
        </p>

        <div className={styles.grid}>
          {items.map(({ title, desc }, i) => {
            const Icon = icons[i]
            return (
              <article key={title} className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={24} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <a className={styles.more} href="#work-areas">
                  {t('services.more')} <ArrowRight size={16} />
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
