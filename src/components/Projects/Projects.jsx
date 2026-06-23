import { ArrowRight } from 'lucide-react'
import styles from './Projects.module.scss'

const projects = [
  {
    tag: 'Carpentry & Plumbing',
    title: 'Kitchen Island Upgrade',
    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    tag: 'Plumbing & General Repair',
    title: 'Modern Vanity Installation',
    img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80',
  },
]

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <div>
            <h2>Recent Projects</h2>
            <p>A few recent jobs from around the neighborhood — the kind of work we&apos;d be glad to have in our own homes.</p>
          </div>
          <a className={styles.gallery} href="#">
            View full gallery <ArrowRight size={18} />
          </a>
        </header>

        <div className={styles.grid}>
          {projects.map((p) => (
            <article key={p.title} className={styles.card}>
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className={styles.overlay}>
                <span className={styles.tag}>{p.tag}</span>
                <h3>{p.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
