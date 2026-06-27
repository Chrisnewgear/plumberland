import { ArrowRight, Camera, FolderOpen, Video } from 'lucide-react'
import styles from './Projects.module.scss'

const projectGroups = [
  {
    icon: FolderOpen,
    title: 'Portafolio por servicio',
    desc: 'Los trabajos se organizan por área para reemplazar después cada placeholder con contenido real.',
  },
  {
    icon: Video,
    title: 'Videos por área',
    desc: 'Cada servicio incluye espacios Video_1 y Video_2 para mostrar procesos o resultados reales.',
  },
  {
    icon: Camera,
    title: 'Fotos por área',
    desc: 'Cada servicio incluye espacios Foto_1 y Foto_2 para documentar trabajos realizados.',
  },
]

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>Trabajos realizados</span>
            <h2>Portafolio personal organizado por áreas de servicio</h2>
            <p>
              Esta sección está preparada para mostrar trabajos reales del
              trabajador independiente, separados por carpintería, fontanería,
              pintura, electricidad y demás servicios del hogar.
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
