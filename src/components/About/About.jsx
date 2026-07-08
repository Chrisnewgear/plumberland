import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { CircleCheck } from 'lucide-react'
import styles from './About.module.scss'

const imgOne =
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=640&q=80'
const imgTwo =
  'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?auto=format&fit=crop&w=640&q=80'

export default function About() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const qualities = t('about.qualities', { returnObjects: true })

  // Gentle differential parallax: as the section passes, the two photos drift by
  // slightly different amounts to add depth. Off under reduced motion.
  const mediaRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ['start end', 'end start'],
  })
  const yOne = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [26, -26])
  const yTwo = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [56, -56])

  return (
    <section className={styles.about} id="about">
      <div className={styles.inner} data-reveal>
        <div className={styles.media} ref={mediaRef}>
          <motion.img style={{ y: yOne }} className={styles.imgOne} src={imgOne} alt={t('about.altOne')} loading="lazy" />
          <motion.img style={{ y: yTwo }} className={styles.imgTwo} src={imgTwo} alt={t('about.altTwo')} loading="lazy" />
        </div>

        <div className={styles.copy}>
          <span className={styles.kicker}>{t('about.kicker')}</span>
          <h2>{t('about.title')}</h2>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>

          <h3 className={styles.foundationTitle}>{t('about.foundationTitle')}</h3>
          <ul className={styles.foundation}>
            {qualities.map((quality) => (
              <li key={quality.title}>
                <CircleCheck size={22} className={styles.check} />
                <div>
                  <strong>{quality.title}</strong>
                  <span>{quality.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
