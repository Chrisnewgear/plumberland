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
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner} data-reveal>
        <div className={styles.media}>
          <img className={styles.imgOne} src={imgOne} alt="Herramientas preparadas para servicios del hogar" loading="lazy" />
          <img className={styles.imgTwo} src={imgTwo} alt="Materiales y herramientas para reparaciones y mejoras" loading="lazy" />
        </div>

        <div className={styles.copy}>
          <span className={styles.kicker}>Sobre mí</span>
          <h2>Trabajador independiente para reparaciones, mantenimiento e instalaciones</h2>
          <p>
            Esta página presenta los servicios de un profesional de servicios
            para el hogar que trabaja de forma independiente, con atención directa
            y compromiso en cada proyecto.
          </p>
          <p>
            El objetivo es mostrar las áreas de trabajo disponibles, organizar
            fotos y videos reales por servicio y facilitar que cada visitante
            pueda enviar una solicitud de contacto.
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
