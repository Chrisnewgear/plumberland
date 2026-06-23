import { CircleCheck } from 'lucide-react'
import styles from './About.module.scss'

const foundation = [
  { title: 'Integrity', desc: "We do what we say we're going to do, when we say we'll do it." },
  { title: 'Excellence', desc: "We don't cut corners. Quality craftsmanship is our standard." },
  { title: 'Community', desc: 'We are proud to serve and improve our local neighborhoods.' },
]

const imgOne =
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=640&q=80'
const imgTwo =
  'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=640&q=80'

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner} data-reveal>
        <div className={styles.media}>
          <img className={styles.imgOne} src={imgOne} alt="A ProFix craftsman fitting parts by hand" loading="lazy" />
          <img className={styles.imgTwo} src={imgTwo} alt="A well-kept rack of professional hand tools" loading="lazy" />
        </div>

        <div className={styles.copy}>
          <h2>Building Trust, One Fix at a Time</h2>
          <p>
            Finding a handyman who shows up on time, charges what they quoted,
            and does the job right shouldn&apos;t be this hard. We built ProFix
            to be the team we&apos;d want working on our own homes — clear about
            pricing, careful in your space, dependable from the first call.
          </p>
          <p>
            Our crew has spent 15 years and 12,000+ jobs earning that trust. We
            lay down drop cloths, clean up before we leave, and treat your home
            the way we&apos;d want ours treated.
          </p>

          <h3 className={styles.foundationTitle}>Our Foundation</h3>
          <ul className={styles.foundation}>
            {foundation.map((f) => (
              <li key={f.title}>
                <CircleCheck size={22} className={styles.check} />
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
