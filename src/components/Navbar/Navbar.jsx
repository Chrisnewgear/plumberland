import { Phone } from 'lucide-react'
import BrandMark from '../BrandMark/BrandMark.jsx'
import styles from './Navbar.module.scss'

const links = [
  { label: 'Services', href: '#services', active: true },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top">
          <BrandMark size={28} />
          ProFix Handyman
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
          <a className={styles.callNow} href="tel:+15551234567">
            <Phone size={18} />
            Call Now
          </a>
          <button className={styles.cta} type="button">
            Free Estimate
          </button>
        </div>
      </div>
    </header>
  )
}
