import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, Clock } from 'lucide-react'
import styles from './Hero.module.scss'

// Full-bleed background photo — handyman working (swap with the real asset in src/assets when available).
const heroImg =
  'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1400&q=80&auto=format&fit=crop'

// Soft, premium easing — confident, never bouncy.
const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduce = useReducedMotion()

  // Staggered entrance for the copy column. Reduced-motion → instant fade only.
  const container = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  }

  // Gentle, looping float for the image — disabled under reduced motion.
  const float = reduce
    ? {}
    : {
        y: [0, -12, 0],
        transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
      }

  return (
    <section className={styles.hero} id="top">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className={styles.badge} variants={item}>
            <ShieldCheck size={16} />
            Trusted by 12,000+ local homeowners
          </motion.span>

          <motion.h1 variants={item}>
            Reliable home repairs, done by{' '}
            <span className={styles.accent}>people you can trust</span>
          </motion.h1>

          <motion.p variants={item}>
            Licensed, insured, and usually back to you within two hours. One
            dependable team for every repair and improvement on your list.
          </motion.p>

          <motion.div className={styles.ctas} variants={item}>
            <button className={styles.primary} type="button">
              Request a Free Estimate
              <ArrowRight size={18} />
            </button>
            <a className={styles.secondary} href="tel:+15551234567">
              <Phone size={18} />
              Call (555) 123-4567
            </a>
          </motion.div>

          <motion.ul className={styles.proof} variants={item}>
            <li>Licensed &amp; insured</li>
            <li>Upfront pricing</li>
            <li>Workmanship guarantee</li>
          </motion.ul>
        </motion.div>

        <motion.div
          className={styles.media}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
        >
          <motion.div className={styles.photo} animate={float}>
            <img src={heroImg} alt="ProFix technician at work on a home repair" loading="eager" />
          </motion.div>

          <motion.div
            className={styles.chip}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
          >
            <Clock size={20} />
            <div>
              <strong>Within 2 hours</strong>
              <span>Typical response time</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
