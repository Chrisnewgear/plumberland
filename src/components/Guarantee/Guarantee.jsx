import { ClipboardList, Eye, MailCheck, SearchCheck, UserRound } from 'lucide-react'
import styles from './Guarantee.module.scss'

const steps = [
  {
    icon: UserRound,
    title: 'Conoce al trabajador independiente',
    desc: 'Revisa la presentación general, la forma de trabajo y las áreas en las que puede ayudar.',
  },
  {
    icon: SearchCheck,
    title: 'Revisa los servicios disponibles',
    desc: 'Explora las tarjetas de carpintería, fontanería, pintura, electricidad y demás servicios del hogar.',
  },
  {
    icon: Eye,
    title: 'Mira trabajos por área',
    desc: 'Entra a los bloques de cada área y usa los espacios Video_1, Video_2, Foto_1 y Foto_2 para contenido real.',
  },
  {
    icon: ClipboardList,
    title: 'Describe lo que necesitas',
    desc: 'Completa la solicitud con tus datos y una descripción general del problema o mejora que buscas.',
  },
  {
    icon: MailCheck,
    title: 'Envía la solicitud',
    desc: 'El formulario queda preparado para contactar directamente al trabajador cuando se conecte a un canal real.',
  },
]

export default function Guarantee() {
  return (
    <section className={styles.guarantee} id="process">
      <div className={styles.inner} data-reveal>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <SearchCheck size={16} />
            Flujo de la página
          </span>
          <h2>De la revisión de servicios al contacto directo</h2>
          <p>
            La experiencia está pensada para que el visitante conozca al
            trabajador independiente, revise sus áreas de servicio y decida si
            desea enviar una solicitud.
          </p>
        </div>

        <ol className={styles.features}>
          {steps.map(({ icon: Icon, title, desc }, index) => (
            <li key={title} className={styles.feature}>
              <span className={styles.featureIcon} aria-hidden="true">
                <Icon size={20} />
              </span>
              <div>
                <small>Paso {index + 1}</small>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
