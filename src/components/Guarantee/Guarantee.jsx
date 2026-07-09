import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ClipboardList, Eye, MailCheck, SearchCheck, UserRound } from 'lucide-react'
import styles from './Guarantee.module.scss'

const icons = [UserRound, SearchCheck, Eye, ClipboardList, MailCheck]

const STEP_MS = 2400

export default function Guarantee() {
  const { t } = useTranslation()
  const steps = t('guarantee.steps', { returnObjects: true })
  const reduceMotion = useReducedMotion()
  const listRef = useRef(null)
  const inView = useInView(listRef, { amount: 0.35 })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-advance the highlighted step while the stepper is on screen. Pauses on
  // hover/focus so people can read at their own pace. Reduced-motion users get
  // every step shown as complete, with no looping animation.
  useEffect(() => {
    if (reduceMotion) {
      setActive(steps.length - 1)
      return
    }
    if (!inView || paused) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % steps.length)
    }, STEP_MS)
    return () => clearInterval(id)
  }, [inView, paused, reduceMotion])

  const progress = ((active + 1) / steps.length) * 100

  return (
    <section className={styles.guarantee} id="process">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <SearchCheck size={16} />
            {t('guarantee.badge')}
          </span>
          <h2>{t('guarantee.title')}</h2>
          <p>{t('guarantee.description')}</p>

          <div className={styles.progress} aria-hidden="true">
            <div className={styles.progressHead}>
              <span>
                {t('guarantee.stepCounter', { current: active + 1, total: steps.length })}
              </span>
              <strong>{steps[active].title}</strong>
            </div>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                animate={{ width: `${progress}%` }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>

        <ol
          ref={listRef}
          className={styles.steps}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {steps.map(({ title, desc }, i) => {
            const Icon = icons[i]
            const state = i === active ? 'active' : i < active ? 'done' : 'todo'
            return (
              <motion.li
                key={title}
                className={styles.step}
                data-state={state}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.rail}>
                  <motion.button
                    type="button"
                    className={styles.node}
                    onClick={() => setActive(i)}
                    aria-label={t('guarantee.viewStep', { number: i + 1, title })}
                    aria-current={state === 'active' ? 'step' : undefined}
                    animate={reduceMotion ? undefined : { scale: state === 'active' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  >
                    <Icon size={20} />
                  </motion.button>
                  {i < steps.length - 1 && (
                    <span className={styles.line}>
                      <span className={styles.lineFill} />
                    </span>
                  )}
                </div>

                <div className={styles.body}>
                  <small>{t('guarantee.stepLabel', { number: i + 1 })}</small>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
