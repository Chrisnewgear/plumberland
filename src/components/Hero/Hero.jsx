import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Hammer, Images, Mail, ShieldCheck } from 'lucide-react'
import styles from './Hero.module.scss'

const serviceAreas = ['carpintería', 'fontanería', 'pintura', 'electricidad', 'remodelaciones']
const commitments = [
  'Atención directa con el trabajador independiente',
  'Servicios de reparación, mantenimiento e instalación',
  'Espacios listos para agregar fotos y videos reales',
]
const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduce = useReducedMotion()

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
      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className={styles.badge} variants={item}>
            <ShieldCheck size={16} />
            Trabajador independiente para servicios del hogar
          </motion.span>

          <motion.h1 variants={item}>
            Soluciones confiables para reparaciones y mejoras del hogar
          </motion.h1>

          <motion.p variants={item}>
            Servicios de mantenimiento, reparación e instalación realizados con
            responsabilidad, experiencia y compromiso en distintas áreas del hogar.
          </motion.p>

          <motion.div className={styles.ctas} variants={item}>
            <a className={styles.primary} href="#services">
              Ver servicios
              <ArrowRight size={18} />
            </a>
            <a className={styles.secondary} href="#projects">
              <Images size={18} />
              Ver trabajos realizados
            </a>
            <a className={styles.secondary} href="#contact">
              <Mail size={18} />
              Contactar
            </a>
          </motion.div>

          <motion.div className={styles.searchBox} variants={item}>
            <label>Áreas disponibles</label>
            <div className={styles.examples} aria-label="Áreas de servicio">
              {serviceAreas.map((area) => (
                <a key={area} href="#services">{area}</a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.aside
          className={styles.proofPanel}
          aria-label="Resumen del trabajador independiente"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          <div className={styles.proofTop}>
            <span className={styles.avatar}>
              <Hammer size={24} />
            </span>
            <div>
              <strong>Profesional de servicios para el hogar</strong>
              <span>Atención personal y directa</span>
            </div>
          </div>

          <div className={styles.liveList}>
            {commitments.map((text) => (
              <div key={text} className={styles.liveItem}>
                <CheckCircle2 size={18} />
                <div>
                  <strong>{text}</strong>
                  <span>Información general del servicio</span>
                </div>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
