import {
  ArrowRight,
  Building2,
  DoorClosed,
  Droplets,
  Hammer,
  KeyRound,
  Leaf,
  PaintRoller,
  Snowflake,
  Sparkles,
  Sofa,
  Wrench,
  Zap,
} from 'lucide-react'
import styles from './Services.module.scss'

const services = [
  { icon: Hammer, title: 'Carpintería', desc: 'Muebles, puertas, repisas, ajustes y trabajos generales en madera.' },
  { icon: Droplets, title: 'Fontanería', desc: 'Reparaciones, instalaciones, fugas, griferías y mantenimiento de tuberías.' },
  { icon: PaintRoller, title: 'Pintura', desc: 'Pintura interior, exterior, retoques, preparación de superficies y acabados.' },
  { icon: Zap, title: 'Electricidad', desc: 'Instalaciones, revisiones, luminarias, tomacorrientes y reparaciones básicas.' },
  { icon: Building2, title: 'Albañilería', desc: 'Paredes, pisos, enlucidos, reparaciones, cerámica y obra menor.' },
  { icon: Sparkles, title: 'Limpieza', desc: 'Limpieza profunda, post obra, mantenimiento y preparación de espacios.' },
  { icon: Leaf, title: 'Jardinería', desc: 'Poda, césped, riego, mantenimiento y recuperación de áreas verdes.' },
  { icon: KeyRound, title: 'Cerrajería', desc: 'Aperturas, cambios de cerradura, copias, seguridad y emergencias.' },
  { icon: Snowflake, title: 'Aire acondicionado', desc: 'Instalación, mantenimiento, limpieza y revisión general de equipos.' },
  { icon: DoorClosed, title: 'Vidriería', desc: 'Cambio de vidrios, mamparas, ventanas, espejos y ajustes de aluminio.' },
  { icon: Sofa, title: 'Tapicería', desc: 'Reparación, renovación y retapizado de muebles, sillas y cabeceros.' },
  { icon: Wrench, title: 'Remodelaciones', desc: 'Mejoras generales para baños, cocinas, habitaciones y espacios del hogar.' },
]

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <span className={styles.kicker}>Servicios</span>
          <h2>Todo lo que tu hogar necesita, en un mismo lugar</h2>
          <p>
            Carpintería, fontanería, pintura, electricidad y mucho más. Nos
            ocupamos de cada trabajo para que no tengas que buscar en varios
            lados.
          </p>
        </header>

        <p className={styles.single}>
          <span className={styles.singleIcon} aria-hidden="true">
            <Wrench size={20} />
          </span>
          <span>
            <strong>Estamos listos para el trabajo que necesites.</strong> Desde un
            arreglo pequeño hasta una mejora completa, nos encargamos de que quede
            bien hecho.
          </span>
        </p>

        <div className={styles.grid}>
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a className={styles.more} href="#work-areas">
                Ver trabajos del área <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
