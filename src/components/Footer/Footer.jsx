import { Share2 } from 'lucide-react'
import BrandMark from '../BrandMark/BrandMark.jsx'
import styles from './Footer.module.scss'

const columns = [
  {
    title: 'Página',
    links: [
      { label: 'Inicio', href: '#top' },
      { label: 'Sobre mí', href: '#about' },
      { label: 'Servicios', href: '#services' },
      { label: 'Contacto', href: '#contact' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Carpintería', href: '#services' },
      { label: 'Fontanería', href: '#services' },
      { label: 'Pintura', href: '#services' },
      { label: 'Electricidad', href: '#services' },
    ],
  },
  {
    title: 'Portafolio',
    links: [
      { label: 'Trabajos realizados', href: '#projects' },
      { label: 'Áreas de trabajo', href: '#work-areas' },
      { label: 'Videos por área', href: '#work-areas' },
      { label: 'Fotos por área', href: '#work-areas' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <a className={styles.brand} href="#top">
            <BrandMark size={26} />
            Servicios del Hogar
          </a>
          <p>Página personal de un trabajador independiente para reparaciones, mantenimiento e instalaciones del hogar.</p>
        </div>

        <div className={styles.cols}>
          {columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>© {new Date().getFullYear()} Servicios del Hogar. Trabajador independiente.</span>
          <a className={styles.share} href="#top" aria-label="Volver al inicio">
            <Share2 size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
