import { useEffect, useRef, useState } from 'react'
import styles from './Stats.module.scss'

const stats = [
  { value: 12000, suffix: '+', label: 'Jobs Completed' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Average Rating' },
  { value: 500, suffix: '+', label: 'Verified Reviews' },
  { value: 15, suffix: '+', label: 'Years Experience' },
]

const format = (n, decimals) =>
  decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString()

export default function Stats() {
  const ref = useRef(null)
  const [vals, setVals] = useState(() => stats.map(() => 0))

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      setVals(stats.map((s) => s.value))
      return
    }

    let raf
    const run = () => {
      const duration = 1400
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
        setVals(stats.map((s) => s.value * eased))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className={styles.stats} aria-label="ProFix by the numbers">
      <div className={styles.inner} ref={ref}>
        {stats.map((s, i) => (
          <div key={s.label} className={styles.item}>
            <span className={styles.value}>
              {format(vals[i], s.decimals)}
              {s.suffix}
            </span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
