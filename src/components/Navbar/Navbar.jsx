import { Mail, Phone } from 'lucide-react'
import BrandMark from '../BrandMark/BrandMark.jsx'
import styles from './Navbar.module.scss'

const links = [
  { label: 'Inicio', href: '#top', active: true },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Trabajos realizados', href: '#projects' },
  { label: 'Áreas de trabajo', href: '#work-areas' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top">
          <BrandMark size={28} />
          Servicios del Hogar
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.active ? styles.active : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.callNow} href="#contact">
            <Phone size={18} />
            Contactar
          </a>
          <a className={styles.cta} href="#contact">
            <Mail size={18} />
            Enviar solicitud
          </a>
        </div>
      </div>
    </header>
  )
}
