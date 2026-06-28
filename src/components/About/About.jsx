import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { CircleCheck } from 'lucide-react'
import styles from './About.module.scss'

const qualities = [
  { title: 'Responsabilidad', desc: 'Atención cuidadosa desde la revisión inicial hasta la entrega del trabajo.' },
  { title: 'Puntualidad', desc: 'Organización del tiempo y comunicación clara para coordinar cada visita.' },
  { title: 'Trabajo versátil', desc: 'Capacidad para apoyar en diferentes áreas de reparación, mantenimiento y mejora del hogar.' },
]

const imgOne =
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=640&q=80'
const imgTwo =
  'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?auto=format&fit=crop&w=640&q=80'

export default function About() {
  const reduce = useReducedMotion()

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
          <motion.img style={{ y: yOne }} className={styles.imgOne} src={imgOne} alt="Herramientas preparadas para servicios del hogar" loading="lazy" />
          <motion.img style={{ y: yTwo }} className={styles.imgTwo} src={imgTwo} alt="Materiales y herramientas para reparaciones y mejoras" loading="lazy" />
        </div>

        <div className={styles.copy}>
          <span className={styles.kicker}>Cómo trabajamos</span>
          <h2>Listos para las reparaciones y mejoras de tu hogar</h2>
          <p>
            Reparación, mantenimiento e instalación para el hogar, con atención
            directa y compromiso en cada trabajo, grande o pequeño.
          </p>
          <p>
            Aquí puedes ver las áreas en las que trabajamos, revisar fotos y
            videos de trabajos reales y pedir tu presupuesto en pocos pasos.
          </p>

          <h3 className={styles.foundationTitle}>Forma de trabajo</h3>
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
