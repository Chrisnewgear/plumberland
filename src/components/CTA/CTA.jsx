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

// The submitted <select> value stays in canonical Spanish regardless of UI
// language, so EmailJS always receives a consistent `service` field. Only the
// visible option label is localized (via serviceNames, aligned by index).
const CANONICAL_SERVICES = [
  "Carpintería",
  "Fontanería",
  "Pintura",
  "Electricidad",
  "Albañilería",
  "Limpieza",
  "Jardinería",
  "Cerrajería",
  "Aire acondicionado",
  "Vidriería",
  "Tapicería",
  "Remodelaciones",
];

export default function CTA() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const serviceNames = t("serviceNames", { returnObjects: true });
  const contactOptions = [
    {
      icon: MessageCircle,
      label: t("cta.contactWhatsapp"),
      href: "https://wa.me/19736518567?text=Hola%2C%20quiero%20pedir%20un%20presupuesto",
    },
    { icon: Phone, label: t("cta.contactCall"), href: "tel:+19736518567" },
    { icon: Mail, label: t("cta.contactEmail"), href: "mailto:papichiloco21@gmail.com" },
  ];

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
          <p>{t("cta.intro")}</p>

          {status === "success" ? (
            <div className={styles.success} role="status">
              <CheckCircle2 size={40} />
              <h3>{t("cta.successTitle")}</h3>
              <p>{t("cta.successBody")}</p>
              <button
                className={styles.secondary}
                type="button"
                onClick={() => setStatus("idle")}
              >
                {t("cta.reset")}
              </button>
            </div>
          ) : (
            <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
              <label>
                {t("cta.labelName")}
                <input
                  type="text"
                  name="name"
                  placeholder={t("cta.phName")}
                  required
                />
              </label>
              <label>
                {t("cta.labelPhone")}
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("cta.phPhone")}
                  required
                />
              </label>
              <label>
                {t("cta.labelEmail")}
                <input
                  type="email"
                  name="email"
                  placeholder={t("cta.phEmail")}
                  required
                />
              </label>
              <label>
                {t("cta.labelService")}
                <select name="service" defaultValue="" required>
                  <option value="" disabled>
                    {t("cta.servicePrompt")}
                  </option>
                  {CANONICAL_SERVICES.map((value, i) => (
                    <option key={value} value={value}>
                      {serviceNames[i]}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.full}>
                {t("cta.labelDescription")}
                <textarea
                  name="description"
                  rows="4"
                  placeholder={t("cta.phDescription")}
                  required
                />
              </label>

              <button
                className={styles.primary}
                type="submit"
                disabled={status === "sending"}
              >
                <Send size={18} />
                {status === "sending" ? t("cta.sending") : t("cta.submit")}
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
            aria-label={t("cta.channelsAria")}
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

          <span className={styles.note}>{t("cta.note")}</span>
        </div>
      </div>
    </section>
  );
}
