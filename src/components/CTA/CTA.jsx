import { Mail, MessageCircle, Phone, Send } from 'lucide-react'
import styles from './CTA.module.scss'

const contactOptions = [
  { icon: MessageCircle, label: 'WhatsApp', href: '#contact' },
  { icon: Phone, label: 'Llamada', href: '#contact' },
  { icon: Mail, label: 'Correo', href: '#contact' },
]

export default function CTA() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner} data-reveal>
        <div className={styles.card}>
          <span className={styles.topIcon} aria-hidden="true">
            <Send size={28} />
          </span>
          <h2>Contactar al trabajador independiente</h2>
          <p>
            Envía una solicitud con el servicio requerido y una descripción del
            problema o mejora. Los canales visuales quedan listos para conectar
            datos reales de WhatsApp, llamada o correo.
          </p>

          <form className={styles.form}>
            <label>
              Nombre
              <input type="text" name="name" placeholder="Tu nombre" />
            </label>
            <label>
              Teléfono
              <input type="tel" name="phone" placeholder="Tu teléfono" />
            </label>
            <label>
              Correo
              <input type="email" name="email" placeholder="Tu correo" />
            </label>
            <label>
              Servicio requerido
              <select name="service" defaultValue="">
                <option value="" disabled>Selecciona un servicio</option>
                <option>Carpintería</option>
                <option>Fontanería</option>
                <option>Pintura</option>
                <option>Electricidad</option>
                <option>Albañilería</option>
                <option>Limpieza</option>
                <option>Jardinería</option>
                <option>Cerrajería</option>
                <option>Aire acondicionado</option>
                <option>Vidriería</option>
                <option>Tapicería</option>
                <option>Remodelaciones</option>
              </select>
            </label>
            <label className={styles.full}>
              Descripción del problema
              <textarea name="description" rows="4" placeholder="Describe brevemente lo que necesitas" />
            </label>
            <button className={styles.primary} type="button">
              <Send size={18} />
              Enviar solicitud
            </button>
          </form>

          <div className={styles.contactOptions} aria-label="Canales de contacto">
            {contactOptions.map(({ icon: Icon, label, href }) => (
              <a key={label} className={styles.secondary} href={href}>
                <Icon size={18} />
                {label}
              </a>
            ))}
          </div>

          <span className={styles.note}>
            No se muestran datos de contacto reales hasta que sean agregados al proyecto.
          </span>
        </div>
      </div>
    </section>
  )
}
