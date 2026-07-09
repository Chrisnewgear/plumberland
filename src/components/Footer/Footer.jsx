import { useTranslation } from 'react-i18next'
import { Share2 } from 'lucide-react'
import BrandMark from '../BrandMark/BrandMark.jsx'
import styles from './Footer.module.scss'

const columns = [
  {
    key: 'page',
    links: [
      { key: 'home', href: '#top' },
      { key: 'about', href: '#about' },
      { key: 'services', href: '#services' },
      { key: 'contact', href: '#contact' },
    ],
  },
  {
    key: 'services',
    links: [
      { key: 'carpentry', href: '#services' },
      { key: 'plumbing', href: '#services' },
      { key: 'painting', href: '#services' },
      { key: 'electricity', href: '#services' },
    ],
  },
  {
    key: 'portfolio',
    links: [
      { key: 'done', href: '#projects' },
      { key: 'areas', href: '#work-areas' },
      { key: 'videos', href: '#work-areas' },
      { key: 'photos', href: '#work-areas' },
    ],
  },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <a className={styles.brand} href="#top">
            <BrandMark size={26} />
            {t('footer.brand')}
          </a>
          <p>{t('footer.tagline')}</p>
        </div>

        <div className={styles.cols}>
          {columns.map((col) => {
            const title = t(`footer.columns.${col.key}.title`)
            return (
              <nav key={col.key} className={styles.col} aria-label={title}>
                <h4>{title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.key}>
                      <a href={link.href}>{t(`footer.columns.${col.key}.links.${link.key}`)}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
          <a className={styles.share} href="#top" aria-label={t('footer.backToTop')}>
            <Share2 size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
