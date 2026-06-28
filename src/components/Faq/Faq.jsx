import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Faq.module.scss'

const faqs = [
  {
    q: '¿Qué tipo de trabajos hacen?',
    a: 'Reparaciones, mantenimiento, instalaciones y mejoras en distintas áreas del hogar: carpintería, fontanería, pintura, electricidad, albañilería y más.',
  },
  {
    q: '¿Atienden arreglos pequeños o solo proyectos grandes?',
    a: 'Los dos. Estamos listos tanto para un arreglo puntual como para una mejora completa de tu hogar.',
  },
  {
    q: '¿Las fotos y los videos son trabajos reales?',
    a: 'Sí. Algunos espacios todavía están reservados para el material; a medida que se publican, verás fotos y videos reales de trabajos terminados por cada área.',
  },
  {
    q: '¿Qué datos necesito para pedir presupuesto?',
    a: 'Tu nombre, teléfono, correo, el servicio que necesitas y una breve descripción del problema o la mejora que buscas. Con eso basta para empezar.',
  },
  {
    q: '¿Por qué no veo precios en la página?',
    a: 'Porque cada trabajo es distinto. El precio se acuerda contigo según lo que necesites, y consultar no cuesta nada ni te compromete.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <h2>Preguntas frecuentes</h2>
          <p>Las dudas más comunes antes de pedir tu presupuesto.</p>
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
