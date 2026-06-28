import styles from './Stats.module.scss'

const qualities = [
  { value: 'Directo', label: 'comunicación cercana y directa contigo' },
  { value: 'Claro', label: 'conoces el alcance antes de empezar' },
  { value: 'Ordenado', label: 'ves fotos y videos reales por área' },
  { value: 'Responsable', label: 'cuida tu espacio y te da seguimiento' },
]

export default function Stats() {
  return (
    <section className={styles.stats} aria-label="Lo que puedes esperar">
      <div className={styles.inner}>
        {qualities.map((item) => (
          <div key={item.value} className={styles.item}>
            <span className={styles.value}>{item.value}</span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
