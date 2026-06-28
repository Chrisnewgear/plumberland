import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import styles from "./CTA.module.scss";

// Configura EmailJS para recibir los mensajes en tu Gmail:
// 1. Crea una cuenta en https://www.emailjs.com y conecta tu Gmail
//    (Email Services → Add New Service → Gmail).
// 2. Crea una plantilla (Email Templates) usando las variables del formulario:
//    {{name}}, {{phone}}, {{email}}, {{service}}, {{description}}.
// 3. Copia los tres identificadores aquí abajo (Account → API Keys para la Public Key).
const EMAILJS_SERVICE_ID = "service_y2l8m8d";
const EMAILJS_TEMPLATE_ID = "template_xkndoap";
const EMAILJS_PUBLIC_KEY = "eEJgBXI40bcF3gLqO";

const contactOptions = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/19736518567?text=Hola%2C%20quiero%20pedir%20un%20presupuesto",
  },
  { icon: Phone, label: "Llamada", href: "tel:+19736518567" },
  { icon: Mail, label: "Correo", href: "mailto:papichiloco21@gmail.com" },
];

export default function CTA() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner} data-reveal>
        <div className={styles.card}>
          <span className={styles.topIcon} aria-hidden="true">
            <Send size={28} />
          </span>
          <h2>Pide tu presupuesto, sin compromiso</h2>
          <p>
            Dinos qué servicio necesitas y describe el problema o la mejora. Te
            respondemos para coordinar la visita por WhatsApp, llamada o correo.
          </p>

          {status === "success" ? (
            <div className={styles.success} role="status">
              <CheckCircle2 size={40} />
              <h3>¡Mensaje enviado!</h3>
              <p>
                Gracias por contactarnos. Te responderemos lo antes posible para
                coordinar la visita.
              </p>
              <button
                className={styles.secondary}
                type="button"
                onClick={() => setStatus("idle")}
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
              <label>
                Nombre
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  required
                />
              </label>
              <label>
                Teléfono
                <input
                  type="tel"
                  name="phone"
                  placeholder="Tu teléfono"
                  required
                />
              </label>
              <label>
                Correo
                <input
                  type="email"
                  name="email"
                  placeholder="Tu correo"
                  required
                />
              </label>
              <label>
                ¿Qué servicio necesitas?
                <select name="service" defaultValue="" required>
                  <option value="" disabled>
                    Selecciona un servicio
                  </option>
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
                Cuéntale el problema o la mejora
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Describe brevemente lo que necesitas"
                  required
                />
              </label>

              <button
                className={styles.primary}
                type="submit"
                disabled={status === "sending"}
              >
                <Send size={18} />
                {status === "sending" ? "Enviando…" : "Pedir presupuesto"}
              </button>

              {status === "error" && (
                <p className={styles.errorMsg} role="alert">
                  No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos
                  por WhatsApp.
                </p>
              )}
            </form>
          )}

          <div
            className={styles.contactOptions}
            aria-label="Canales de contacto"
          >
            {contactOptions.map(({ icon: Icon, label, href }) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={label}
                  className={styles.secondary}
                  href={href}
                  {...(external && { target: "_blank", rel: "noreferrer" })}
                >
                  <Icon size={18} />
                  {label}
                </a>
              );
            })}
          </div>

          <span className={styles.note}>
            Consultar no cuesta nada ni te compromete a nada.
          </span>
        </div>
      </div>
    </section>
  );
}
