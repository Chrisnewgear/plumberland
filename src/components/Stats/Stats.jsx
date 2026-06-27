import styles from './Stats.module.scss'

const qualities = [
  { value: 'Directo', label: 'comunicación con el trabajador' },
  { value: 'Claro', label: 'alcance del servicio antes de iniciar' },
  { value: 'Ordenado', label: 'trabajos por área con fotos y videos' },
  { value: 'Responsable', label: 'cuidado del espacio y seguimiento' },
]

export default function Stats() {
  return (
    <section className={styles.stats} aria-label="Compromisos de trabajo">
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
