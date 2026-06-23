import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Faq.module.scss'

const faqs = [
  {
    q: 'Are your handymen licensed and insured?',
    a: 'Absolutely. Every ProFix professional is fully licensed where required, background-checked, and covered by our liability insurance — so your home and your peace of mind are protected.',
  },
  {
    q: 'How do you charge for your services?',
    a: 'We provide clear, upfront estimates before any work begins. Depending on the job, we charge a flat project rate or an hourly rate, with no hidden fees or surprise charges.',
  },
  {
    q: 'Do I need to provide tools or materials?',
    a: 'No. Our technicians arrive fully equipped with professional-grade tools. If your project requires specific materials, we will source them or advise you in advance.',
  },
  {
    q: 'Do you guarantee your work?',
    a: 'Yes. All of our work is backed by the ProFix satisfaction guarantee. If something isn’t right, we’ll come back and make it right at no extra cost.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our services and processes.</p>
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
