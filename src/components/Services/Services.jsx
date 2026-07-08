import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Building2,
  DoorClosed,
  Droplets,
  Hammer,
  KeyRound,
  Leaf,
  PaintRoller,
  Snowflake,
  Sparkles,
  Sofa,
  Wrench,
  Zap,
} from 'lucide-react'
import styles from './Services.module.scss'

// Icons pair to the shared service names / descriptions by index.
const icons = [
  Hammer, Droplets, PaintRoller, Zap, Building2, Sparkles,
  Leaf, KeyRound, Snowflake, DoorClosed, Sofa, Wrench,
]

export default function Services() {
  const { t } = useTranslation()
  const names = t('serviceNames', { returnObjects: true })
  const descriptions = t('services.descriptions', { returnObjects: true })
  const services = icons.map((icon, i) => ({ icon, title: names[i], desc: descriptions[i] }))

  return (
    <section className={styles.services} id="services">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <span className={styles.kicker}>{t('services.kicker')}</span>
          <h2>{t('services.title')}</h2>
          <p>{t('services.intro')}</p>
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
          {services.map(({ icon: Icon, title, desc }) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
