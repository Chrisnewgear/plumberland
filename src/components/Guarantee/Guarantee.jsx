import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ClipboardList, Eye, MailCheck, SearchCheck, UserRound } from 'lucide-react'
import styles from './Guarantee.module.scss'

const steps = [
  {
    icon: UserRound,
    title: 'Mira cómo trabajamos',
    desc: 'Conoce la forma de trabajo y qué puedes esperar, antes de tomar cualquier decisión.',
  },
  {
    icon: SearchCheck,
    title: 'Mira lo que puede hacer',
    desc: 'Desde carpintería hasta electricidad, revisa todos los servicios para tu hogar.',
  },
  {
    icon: Eye,
    title: 'Comprueba su trabajo',
    desc: 'Entra a cada área y mira el resultado con fotos y videos de trabajos reales.',
  },
  {
    icon: ClipboardList,
    title: 'Cuéntale qué necesitas',
    desc: 'Describe el problema o la mejora que buscas y deja tus datos de contacto.',
  },
  {
    icon: MailCheck,
    title: 'Pide tu presupuesto',
    desc: 'Envía tu solicitud y coordinamos juntos la visita para empezar el trabajo.',
  },
]

const STEP_MS = 2400

export default function Guarantee() {
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
            Cómo funciona
          </span>
          <h2>Pedir ayuda para tu hogar es así de simple</h2>
          <p>
            Sin registros ni complicaciones. Conoce cómo trabajamos, revisa el
            trabajo realizado y, cuando lo tengas claro, envía tu solicitud.
          </p>

          <div className={styles.progress} aria-hidden="true">
            <div className={styles.progressHead}>
              <span>
                Paso {active + 1} de {steps.length}
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
          {steps.map(({ icon: Icon, title, desc }, i) => {
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
                    aria-label={`Ver el paso ${i + 1}: ${title}`}
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
                  <small>Paso {i + 1}</small>
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
