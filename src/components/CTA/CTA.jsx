import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import styles from "./CTA.module.scss";

// Configura EmailJS para enviar DOS correos por cada envío del formulario:
//   1. Aviso a TU inbox con los datos que escribió el cliente.
//   2. Auto-respuesta al correo que el cliente puso en el formulario.
// Variables disponibles: {{name}}, {{phone}}, {{email}}, {{service}}, {{description}}.
// IDs en el dashboard: Service (Email Services), Template (Email Templates),
// Public Key (Account → API Keys).
const EMAILJS_SERVICE_ID = "service_y2l8m8d";
// Plantilla "Contact Us": correo que llega a TU inbox con los datos del formulario.
const EMAILJS_TEMPLATE_OWNER = "template_7h32mpx";
// Plantilla "Auto-Reply": auto-respuesta al correo que escribió el cliente.
const EMAILJS_TEMPLATE_AUTOREPLY = "template_xkndoap";
const EMAILJS_PUBLIC_KEY = "eEJgBXI40bcF3gLqO";

const contactOptions = [
  {
    icon: MessageCircle,
    labelKey: "cta.whatsapp",
    href: "https://wa.me/19736518567?text=Hola%2C%20quiero%20pedir%20un%20presupuesto",
  },
  { icon: Phone, labelKey: "cta.call", href: "tel:+19736518567" },
  { icon: Mail, labelKey: "cta.mail", href: "mailto:papichiloco21@gmail.com" },
];

export default function CTA() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const serviceOptions = t("cta.services", { returnObjects: true });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      // 1) Aviso a tu inbox con los datos del formulario.
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_OWNER,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      // 2) Auto-respuesta al correo que escribió el cliente.
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_AUTOREPLY,
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
          <h2>{t("cta.title")}</h2>
          <p>{t("cta.description")}</p>

          {status === "success" ? (
            <div className={styles.success} role="status">
              <CheckCircle2 size={40} />
              <h3>{t("cta.successTitle")}</h3>
              <p>{t("cta.successText")}</p>
              <button
                className={styles.secondary}
                type="button"
                onClick={() => setStatus("idle")}
              >
                {t("cta.sendAnother")}
              </button>
            </div>
          ) : (
            <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
              <label>
                {t("cta.name")}
                <input
                  type="text"
                  name="name"
                  placeholder={t("cta.namePlaceholder")}
                  required
                />
              </label>
              <label>
                {t("cta.phone")}
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("cta.phonePlaceholder")}
                  required
                />
              </label>
              <label>
                {t("cta.email")}
                <input
                  type="email"
                  name="email"
                  placeholder={t("cta.emailPlaceholder")}
                  required
                />
              </label>
              <label>
                {t("cta.serviceLabel")}
                <select name="service" defaultValue="" required>
                  <option value="" disabled>
                    {t("cta.servicePlaceholder")}
                  </option>
                  {serviceOptions.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </label>
              <label className={styles.full}>
                {t("cta.descriptionLabel")}
                <textarea
                  name="description"
                  rows="4"
                  placeholder={t("cta.descriptionPlaceholder")}
                  required
                />
              </label>

              <button
                className={styles.primary}
                type="submit"
                disabled={status === "sending"}
              >
                <Send size={18} />
                {status === "sending" ? t("cta.submitting") : t("cta.submit")}
              </button>

              {status === "error" && (
                <p className={styles.errorMsg} role="alert">
                  {t("cta.error")}
                </p>
              )}
            </form>
          )}

          <div
            className={styles.contactOptions}
            aria-label={t("cta.channelsLabel")}
          >
            {contactOptions.map(({ icon: Icon, labelKey, href }) => {
              const external = href.startsWith("http");
              const label = t(labelKey);
              return (
                <a
                  key={labelKey}
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

          <span className={styles.note}>{t("cta.note")}</span>
        </div>
      </div>
    </section>
  );
}
