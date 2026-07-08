import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Mail, Menu, X } from 'lucide-react'
import BrandMark from '../BrandMark/BrandMark.jsx'
import LangToggle from '../LangToggle/LangToggle.jsx'
import langStyles from '../LangToggle/LangToggle.module.scss'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const headerRef = useRef(null)

  const links = t('nav.links', { returnObjects: true })

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
          {t('nav.brand')}
        </a>

        <nav className={styles.nav} aria-label={t('nav.ariaMain')}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.href === '#top' ? styles.active : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <LangToggle />
          <a className={styles.cta} href="#contact">
            <Mail size={18} />
            {t('nav.cta')}
          </a>
          <button
            type="button"
            className={styles.toggle}
            aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
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
            aria-label={t('nav.ariaMain')}
            initial={{ opacity: 0, y: reduce ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a className={styles.panelCta} href="#contact" onClick={() => setOpen(false)}>
              <Mail size={18} />
              {t('nav.cta')}
            </a>
            <LangToggle className={langStyles.panelToggle} />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
