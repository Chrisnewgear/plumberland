import { Image, PlaySquare } from 'lucide-react'
import styles from './WorkerProfile.module.scss'

const areas = [
  'Carpintería',
  'Fontanería',
  'Pintura',
  'Electricidad',
  'Albañilería',
  'Limpieza',
  'Jardinería',
  'Cerrajería',
  'Aire acondicionado',
  'Vidriería',
  'Tapicería',
  'Remodelaciones',
]

function PlaceholderCard({ type, label }) {
  const Icon = type === 'video' ? PlaySquare : Image

  return (
    <article className={styles.placeholder} data-type={type}>
      <span className={styles.placeholderIcon} aria-hidden="true">
        <Icon size={22} />
      </span>
      <strong>{label}</strong>
    </article>
  )
}

export default function WorkerProfile() {
  return (
    <section className={styles.section} id="work-areas">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <span className={styles.kicker}>Áreas de trabajo</span>
          <h2>Trabajos realizados por área</h2>
          <p>
            Cada bloque está preparado para insertar videos y fotos reales del
            trabajador independiente. Por ahora se mantienen placeholders claros
            para reemplazarlos manualmente.
          </p>
        </header>

        <div className={styles.areas}>
          {areas.map((area) => (
            <article key={area} className={styles.areaBlock}>
              <header className={styles.areaHead}>
                <h3>{area}</h3>
                <a href="#contact">Consultar sobre {area}</a>
              </header>

              <div className={styles.mediaGroup}>
                <section>
                  <h4>Videos del área</h4>
                  <div className={styles.mediaGrid}>
                    <PlaceholderCard type="video" label={`Información Video_1 ${area}`} />
                    <PlaceholderCard type="video" label={`Información Video_2 ${area}`} />
                  </div>
                </section>

                <section>
                  <h4>Fotos del área</h4>
                  <div className={styles.mediaGrid}>
                    <PlaceholderCard type="photo" label={`Información Foto_1 ${area}`} />
                    <PlaceholderCard type="photo" label={`Información Foto_2 ${area}`} />
                  </div>
                </section>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
