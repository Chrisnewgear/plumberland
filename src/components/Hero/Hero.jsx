import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, CheckCircle2, Images, Mail, ShieldCheck, Wrench } from 'lucide-react'
import styles from './Hero.module.scss'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()

  const serviceAreas = t('hero.serviceAreas', { returnObjects: true })
  const commitments = t('hero.commitments', { returnObjects: true })

  // Parallax: the hero photo drifts down a fraction of the scroll distance so it
  // lags behind the page, creating depth. Disabled under reduced motion.
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 80])

  const container = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section className={styles.hero} id="top">
      <motion.div className={styles.heroBg} style={{ y: bgY }} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className={styles.badge} variants={item}>
            <ShieldCheck size={16} />
            {t('hero.badge')}
          </motion.span>

          <motion.h1 variants={item}>{t('hero.title')}</motion.h1>

          <motion.p variants={item}>{t('hero.description')}</motion.p>

          <motion.div className={styles.ctas} variants={item}>
            <a className={styles.primary} href="#contact">
              <Mail size={18} />
              {t('hero.ctaQuote')}
            </a>
            <a className={styles.secondary} href="#services">
              {t('hero.ctaServices')}
              <ArrowRight size={18} />
            </a>
            <a className={styles.secondary} href="#work-areas">
              <Images size={18} />
              {t('hero.ctaProjects')}
            </a>
          </motion.div>

          <motion.div className={styles.searchBox} variants={item}>
            <label>{t('hero.searchLabel')}</label>
            <div className={styles.examples} aria-label={t('hero.areasLabel')}>
              {serviceAreas.map((area) => (
                <a key={area} href="#services">{area}</a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.aside
          className={styles.proofPanel}
          aria-label={t('hero.proofLabel')}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          <div className={styles.proofTop}>
            <span className={styles.avatar}>
              <Wrench size={24} />
            </span>
            <div>
              <strong>{t('hero.proofTitle')}</strong>
              <span>{t('hero.proofSubtitle')}</span>
            </div>
          </div>

          <div className={styles.liveList}>
            {commitments.map(({ title, note }) => (
              <div key={title} className={styles.liveItem}>
                <CheckCircle2 size={18} />
                <div>
                  <strong>{title}</strong>
                  <span>{note}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
