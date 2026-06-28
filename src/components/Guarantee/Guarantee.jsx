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

export default function Guarantee() {
  return (
    <section className={styles.guarantee} id="process">
      <div className={styles.inner} data-reveal>
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
