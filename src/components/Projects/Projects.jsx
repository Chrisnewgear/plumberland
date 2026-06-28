import { ArrowRight, Camera, FolderOpen, Video } from 'lucide-react'
import styles from './Projects.module.scss'

const projectGroups = [
  {
    icon: FolderOpen,
    title: 'Ordenado por servicio',
    desc: 'Encuentra rápido el tipo de trabajo que necesitas, sin revolver entre todo.',
  },
  {
    icon: Video,
    title: 'Videos de cada área',
    desc: 'Mira el proceso y el resultado real, no solo una foto de catálogo.',
  },
  {
    icon: Camera,
    title: 'Fotos de trabajos terminados',
    desc: 'Comprueba el acabado con ejemplos reales antes de contactar.',
  },
]

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>Trabajos realizados</span>
            <h2>Mira trabajos reales antes de decidir</h2>
            <p>
              Antes de contactar, revisa fotos y videos de trabajos terminados,
              separados por carpintería, fontanería, pintura, electricidad y cada
              servicio del hogar.
            </p>
          </div>
          <a className={styles.gallery} href="#work-areas">
            Ver áreas de trabajo <ArrowRight size={18} />
          </a>
        </header>

        <div className={styles.grid}>
          {projectGroups.map(({ icon: Icon, title, desc }) => (
            <article key={title} className={styles.card}>
              <span className={styles.icon}><Icon size={24} /></span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
