import { ShieldCheck, Timer, ReceiptText, Award } from 'lucide-react'
import styles from './Guarantee.module.scss'

const guarantees = [
  {
    icon: Timer,
    title: 'On-Time Arrival',
    desc: 'We value your time. Our technicians arrive within the scheduled window, ready to work.',
  },
  {
    icon: ReceiptText,
    title: 'Upfront Pricing',
    desc: 'No hidden fees or surprise charges. We provide clear estimates before any work begins.',
  },
  {
    icon: Award,
    title: 'Expert Craftsmanship',
    desc: 'Our team consists of skilled, vetted professionals who take pride in doing the job right the first time.',
  },
]

const img =
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80'

export default function Guarantee() {
  return (
    <section className={styles.guarantee} id="guarantee">
      <div className={styles.inner} data-reveal>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <ShieldCheck size={16} />
            The ProFix Guarantee
          </span>
          <h2>Why Homeowners Trust ProFix</h2>
          <p>
            We understand that inviting someone into your home requires trust.
            That&apos;s why we&apos;ve built our business on reliability,
            transparency, and uncompromising quality.
          </p>

          <ul className={styles.features}>
            {guarantees.map(({ icon: Icon, title, desc }) => (
              <li key={title} className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.media}>
          <img src={img} alt="A ProFix pro shaking hands with a homeowner at the door" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
