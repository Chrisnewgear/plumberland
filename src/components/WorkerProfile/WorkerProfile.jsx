import { useTranslation } from 'react-i18next'
import { Image, PlaySquare } from 'lucide-react'
import styles from './WorkerProfile.module.scss'

function PlaceholderCard({ type, label }) {
  const Icon = type === 'video' ? PlaySquare : Image

  return (
    <article className={styles.placeholder} data-type={type}>
      <span className={styles.placeholderIcon} aria-hidden="true">
        <Icon size={22} />
      </span>
      <strong>{label}</strong>
    </article>
  )
}

export default function WorkerProfile() {
  const { t } = useTranslation()
  const areas = t('serviceNames', { returnObjects: true })

  return (
    <section className={styles.section} id="work-areas">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <span className={styles.kicker}>{t('workAreas.kicker')}</span>
          <h2>{t('workAreas.title')}</h2>
          <p>{t('workAreas.intro')}</p>
        </header>

        <div className={styles.areas}>
          {areas.map((area) => (
            <article key={area} className={styles.areaBlock}>
              <header className={styles.areaHead}>
                <h3>{area}</h3>
                <a href="#contact">{t('workAreas.consult', { area })}</a>
              </header>

              <div className={styles.mediaGroup}>
                <section>
                  <h4>{t('workAreas.videosTitle')}</h4>
                  <div className={styles.mediaGrid}>
                    <PlaceholderCard type="video" label={t('workAreas.videoLabel', { n: 1, area })} />
                    <PlaceholderCard type="video" label={t('workAreas.videoLabel', { n: 2, area })} />
                  </div>
                </section>

                <section>
                  <h4>{t('workAreas.photosTitle')}</h4>
                  <div className={styles.mediaGrid}>
                    <PlaceholderCard type="photo" label={t('workAreas.photoLabel', { n: 1, area })} />
                    <PlaceholderCard type="photo" label={t('workAreas.photoLabel', { n: 2, area })} />
                  </div>
                </section>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
