import { Star, StarHalf } from 'lucide-react'
import styles from './Testimonials.module.scss'

const reviews = [
  {
    rating: 5,
    quote:
      "ProFix was a lifesaver! I had a laundry list of small repairs that I'd been putting off for months. They knocked them all out in a single afternoon. Very professional and the pricing was exactly what was quoted.",
    name: 'Sarah Jenkins',
    role: 'Homeowner',
    initials: 'SJ',
    tone: 'lavender',
  },
  {
    rating: 5,
    quote:
      'We hired them to replace a vanity and fix some drywall damage in our bathroom. The technician was incredibly polite, laid down drop cloths everywhere, and the finish work was flawless. Highly recommend!',
    name: 'Mark Ramirez',
    role: 'Bathroom Renovation',
    initials: 'MR',
    tone: 'peach',
  },
  {
    rating: 4.5,
    quote:
      "It's so hard to find reliable contractors these days. ProFix showed up on time, communicated clearly about the parts needed for my electrical issue, and got it fixed the next day. Will definitely use them again.",
    name: 'David Thompson',
    role: 'Property Manager',
    initials: 'DT',
    tone: 'lavender',
  },
]

function Stars({ rating, className }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className={className} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
      ))}
      {half && <StarHalf size={18} fill="currentColor" strokeWidth={0} />}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className={styles.testimonials} id="reviews">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <h2>What your neighbors say</h2>
          <div className={styles.summary}>
            <Stars rating={5} className={styles.summaryStars} />
            <span className={styles.score}>4.9</span>
          </div>
          <p>Based on over 500 verified reviews</p>
        </header>

        <div className={styles.grid}>
          {reviews.map((r) => (
            <figure key={r.name} className={styles.card}>
              <div className={styles.cardTop}>
                <Stars rating={r.rating} className={styles.cardStars} />
                <span className={styles.quoteMark} aria-hidden="true">99</span>
              </div>
              <blockquote>{r.quote}</blockquote>
              <figcaption>
                <span className={styles.avatar} data-tone={r.tone}>{r.initials}</span>
                <span className={styles.person}>
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
