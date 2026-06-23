import { Briefcase, PhoneCall, Zap } from 'lucide-react'
import styles from './CTA.module.scss'

export default function CTA() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner} data-reveal>
        <div className={styles.card}>
          <span className={styles.topIcon} aria-hidden="true">
            <Briefcase size={28} />
          </span>
          <h2>Ready to cross it off the list?</h2>
          <p>
            Tell us what needs fixing and we&apos;ll send a clear, no-obligation
            estimate — usually within two hours. No pressure, no surprise fees.
          </p>

          <a className={styles.call} href="tel:+15551234567">
            <span className={styles.callIcon}>
              <PhoneCall size={20} />
            </span>
            <span className={styles.callText}>
              <span>Call us directly</span>
              <strong>(555) 123-4567</strong>
            </span>
          </a>

          <button className={styles.primary} type="button">
            Request a Free Estimate
          </button>

          <span className={styles.note}>
            <Zap size={16} /> Fast, no-obligation quotes
          </span>
        </div>
      </div>
    </section>
  )
}
