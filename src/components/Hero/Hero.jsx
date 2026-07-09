import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle2, Images, Mail, ShieldCheck, Wrench } from 'lucide-react'
import styles from './Hero.module.scss'

const serviceAreas = ['carpintería', 'fontanería', 'pintura', 'electricidad', 'albañilería']
const commitments = [
  { title: 'Listos para el trabajo que necesites', note: 'Desde un arreglo pequeño hasta una mejora completa' },
  { title: 'Todos los servicios en un solo lugar', note: 'Reparación, mantenimiento e instalación' },
  { title: 'Ves el trabajo antes de decidir', note: 'Fotos y videos reales por cada área' },
]
const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduce = useReducedMotion()

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
            Atención directa para tu hogar
          </motion.span>

          <motion.h1 variants={item}>
            Listos para reparar, mantener y mejorar tu hogar
          </motion.h1>

          <motion.p variants={item}>
            Carpintería, fontanería, pintura, electricidad y mucho más. Nos
            encargamos de la reparación, el mantenimiento y la instalación, de
            principio a fin.
          </motion.p>

          <motion.div className={styles.ctas} variants={item}>
            <a className={styles.primary} href="#contact">
              <Mail size={18} />
              Pide tu presupuesto
            </a>
            <a className={styles.secondary} href="#services">
              Ver servicios
              <ArrowRight size={18} />
            </a>
            <a className={styles.secondary} href="#work-areas">
              <Images size={18} />
              Ver trabajos
            </a>
          </motion.div>

          <motion.div className={styles.searchBox} variants={item}>
            <label>Listos para todos estos oficios</label>
            <div className={styles.examples} aria-label="Oficios que cubrimos">
              {serviceAreas.map((area) => (
                <a key={area} href="#services">{area}</a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.aside
          className={styles.proofPanel}
          aria-label="Lo que ofrecemos"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          <div className={styles.proofTop}>
            <span className={styles.avatar}>
              <Wrench size={24} />
            </span>
            <div>
              <strong>Listos para todo tu hogar</strong>
              <span>Atención directa en cada servicio</span>
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
