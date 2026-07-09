import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, Menu, X } from 'lucide-react'
import BrandMark from '../BrandMark/BrandMark.jsx'
import LanguageToggle from '../LanguageToggle/LanguageToggle.jsx'
import styles from './Navbar.module.scss'

const links = [
  { key: 'home', href: '#top' },
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'areas', href: '#work-areas' },
  { key: 'contact', href: '#contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const headerRef = useRef(null)

  // While the menu is open, close it on Escape or a click outside the header.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <header className={styles.navbar} ref={headerRef}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" onClick={() => setOpen(false)}>
          <BrandMark size={28} />
          <span className={styles.brandText}>{t('nav.brand')}</span>
        </a>

        <nav className={styles.nav} aria-label={t('nav.principal')}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.href === '#top' ? styles.active : undefined}
            >
              {t(`nav.links.${link.key}`)}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageToggle />
          <a className={styles.cta} href="#contact">
            <Mail size={18} />
            {t('nav.cta')}
          </a>
          <button
            type="button"
            className={styles.toggle}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className={styles.panel}
            aria-label={t('nav.principal')}
            initial={{ opacity: 0, y: reduce ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {t(`nav.links.${link.key}`)}
              </a>
            ))}
            <a className={styles.panelCta} href="#contact" onClick={() => setOpen(false)}>
              <Mail size={18} />
              {t('nav.cta')}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
