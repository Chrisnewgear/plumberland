import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import styles from './Faq.module.scss'

export default function Faq() {
  const { t } = useTranslation()
  const faqs = t('faq.items', { returnObjects: true })
  const [open, setOpen] = useState(0)

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <h2>{t('faq.title')}</h2>
          <p>{t('faq.description')}</p>
        </header>

        <div className={styles.list}>
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.q}
                  <ChevronDown size={20} className={styles.chevron} />
                </button>
                {isOpen && <p className={styles.answer}>{item.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
