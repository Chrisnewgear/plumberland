import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Faq.module.scss'

const faqs = [
  {
    q: '¿Esta página pertenece a una empresa?',
    a: 'No. La página está enfocada en un único trabajador independiente de servicios para el hogar.',
  },
  {
    q: '¿Los videos y fotos ya son trabajos reales?',
    a: 'No necesariamente. Cuando no existan archivos reales, se muestran placeholders identificados como Video_1, Video_2, Foto_1 y Foto_2 por cada área.',
  },
  {
    q: '¿Qué información debo enviar en la solicitud?',
    a: 'Nombre, teléfono, correo, servicio requerido y una descripción general del problema o mejora del hogar.',
  },
  {
    q: '¿Se inventan precios, comentarios o datos de experiencia?',
    a: 'No. La página usa textos generales y placeholders cuando falta información real.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <h2>Preguntas frecuentes</h2>
          <p>Información general sobre la página personal de servicios del hogar.</p>
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
