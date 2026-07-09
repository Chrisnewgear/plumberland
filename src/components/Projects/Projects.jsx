import { useTranslation } from "react-i18next";
import { ArrowRight, Camera, FolderOpen, Video } from "lucide-react";
import styles from "./Projects.module.scss";

const icons = [FolderOpen, Video, Camera];

export default function Projects() {
  const { t } = useTranslation();
  const groups = t("projects.groups", { returnObjects: true });

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>{t("projects.kicker")}</span>
            <h2>{t("projects.title")}</h2>
            <p>{t("projects.description")}</p>
          </div>
          <a className={styles.gallery} href="#work-areas">
            {t("projects.gallery")} <ArrowRight size={18} />
          </a>
        </header>

        <div className={styles.grid}>
          {groups.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <article key={title} className={styles.card}>
                <span className={styles.icon}>
                  <Icon size={24} />
                </span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
