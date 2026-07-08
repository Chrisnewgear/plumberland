import { useTranslation } from 'react-i18next'
import { Share2 } from 'lucide-react'
import BrandMark from '../BrandMark/BrandMark.jsx'
import styles from './Footer.module.scss'

export default function Footer() {
  const { t } = useTranslation()
  const serviceNames = t('serviceNames', { returnObjects: true })

  const columns = [
    {
      title: t('footer.colPage'),
      links: t('footer.pageLinks', { returnObjects: true }),
    },
    {
      title: t('footer.colServices'),
      links: serviceNames.slice(0, 4).map((label) => ({ label, href: '#services' })),
    },
    {
      title: t('footer.colPortfolio'),
      links: t('footer.portfolioLinks', { returnObjects: true }),
    },
  ]

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
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
          <a className={styles.share} href="#top" aria-label={t('footer.backToTop')}>
            <Share2 size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
