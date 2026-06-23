import { Share2 } from 'lucide-react'
import BrandMark from '../BrandMark/BrandMark.jsx'
import styles from './Footer.module.scss'

const columns = [
  { title: 'Services', links: ['Emergency Repairs', 'Plumbing', 'Electrical', 'Carpentry'] },
  { title: 'Company', links: ['About Us', 'Reviews', 'FAQ', 'Contact'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service'] },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <a className={styles.brand} href="#top">
            <BrandMark size={26} />
            ProFix
          </a>
          <p>The dependable local team for every repair and improvement around your home.</p>
        </div>

        <div className={styles.cols}>
          {columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>© {new Date().getFullYear()} ProFix Handyman Services. Licensed &amp; Insured.</span>
          <a className={styles.share} href="#" aria-label="Share">
            <Share2 size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
