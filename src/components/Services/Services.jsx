import {
  Droplets,
  Zap,
  PencilRuler,
  PaintRoller,
  Rows3,
  Wrench,
  ArrowRight,
  LayoutGrid,
} from 'lucide-react'
import styles from './Services.module.scss'

const services = [
  {
    icon: Droplets,
    title: 'Plumbing',
    desc: 'Leak repairs, fixture installations, pipe unclogging, and routine maintenance to keep your water flowing smoothly.',
  },
  {
    icon: Zap,
    title: 'Electrical',
    desc: 'Light fixture installation, outlet repairs, ceiling fan setup, and safe troubleshooting for minor electrical issues.',
  },
  {
    icon: PencilRuler,
    title: 'Carpentry',
    desc: 'Custom shelving, door repairs, trim installation, deck maintenance, and general woodwork to enhance your space.',
  },
  {
    icon: PaintRoller,
    title: 'Painting',
    desc: 'Interior and exterior touch-ups, accent walls, cabinet refinishing, and complete room repainting with precise edges.',
  },
  {
    icon: Rows3,
    title: 'Drywall',
    desc: 'Patching holes, repairing water damage, texturing, and finishing to ensure your walls look perfectly seamless.',
  },
  {
    icon: Wrench,
    title: 'General Repairs',
    desc: 'Furniture assembly, TV mounting, gutter cleaning, weatherstripping, and handling your entire to-do list.',
  },
]

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <h2>One team for everything on your list</h2>
          <p>
            From a leaky faucet to a full weekend of repairs, it&apos;s all
            handled by the same vetted crew. No job is too small.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a className={styles.more} href="#">
                Learn more <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>

        <div className={styles.footer}>
          <button className={styles.viewAll} type="button">
            View All Services <LayoutGrid size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
