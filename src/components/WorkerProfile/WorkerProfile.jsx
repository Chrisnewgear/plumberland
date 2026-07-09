import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, ImageIcon, Play, VideoIcon, X, ZoomIn } from 'lucide-react'
import styles from './WorkerProfile.module.scss'

// Auto-load every asset in the media folders. Dropping a new file into
// src/assets/Images or /Videos adds it to the gallery — no code changes needed.
const imageMap = import.meta.glob('../../assets/Images/*.{jpeg,jpg,png,webp,avif}', {
  eager: true,
  import: 'default',
})
const videoMap = import.meta.glob('../../assets/Videos/*.{mp4,webm,mov,ogg}', {
  eager: true,
  import: 'default',
})

// Natural sort so "10" comes after "9" and Video1 < Video2 < Video10.
const byNaturalName = ([a], [b]) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })

const photos = Object.entries(imageMap)
  .sort(byNaturalName)
  .map(([path, src], i) => ({
    id: path,
    type: 'photo',
    src,
    n: i + 1,
  }))

const videos = Object.entries(videoMap)
  .sort(byNaturalName)
  .map(([path, src], i) => ({
    id: path,
    type: 'video',
    src,
    n: i + 1,
  }))

// Videos first so motion catches the eye, then the photo grid.
const media = [...videos, ...photos]

export default function WorkerProfile() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [filter, setFilter] = useState('all')
  const [activeIndex, setActiveIndex] = useState(null)
  const closeRef = useRef(null)
  const lastFocused = useRef(null)

  // Localized label for a media item, resolved at render so it follows the
  // active language.
  const labelFor = useCallback(
    (item) =>
      item.type === 'video'
        ? t('gallery.videoLabel', { number: item.n })
        : t('gallery.photoLabel', { number: item.n }),
    [t],
  )

  const filters = [
    { key: 'all', label: t('gallery.filters.all'), count: media.length },
    { key: 'photo', label: t('gallery.filters.photo'), count: photos.length },
    { key: 'video', label: t('gallery.filters.video'), count: videos.length },
  ]

  const items = useMemo(
    () => (filter === 'all' ? media : media.filter((m) => m.type === filter)),
    [filter],
  )

  const isOpen = activeIndex !== null
  const active = isOpen ? items[activeIndex] : null

  const open = useCallback((index) => {
    lastFocused.current = document.activeElement
    setActiveIndex(index)
  }, [])

  const close = useCallback(() => {
    setActiveIndex(null)
    // Restore focus to the tile that opened the lightbox.
    if (lastFocused.current) lastFocused.current.focus?.()
  }, [])

  const step = useCallback(
    (dir) => {
      setActiveIndex((i) => {
        if (i === null) return i
        return (i + dir + items.length) % items.length
      })
    },
    [items.length],
  )

  // Keyboard controls + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, step])

  return (
    <section className={styles.section} id="work-areas">
      <div className={styles.inner} data-reveal>
        <header className={styles.head}>
          <span className={styles.kicker}>{t('gallery.kicker')}</span>
          <h2>{t('gallery.title')}</h2>
          <p>{t('gallery.description')}</p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label={t('gallery.filterLabel')}>
            {filters.map(({ key, label, count }) => (
              <button
                key={key}
                type="button"
                className={styles.filter}
                data-active={filter === key}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
                <span className={styles.count}>{count}</span>
              </button>
            ))}
          </div>
          <a className={styles.contactLink} href="#contact">
            {t('gallery.contactLink')}
          </a>
        </div>

        {items.length === 0 ? (
          <p className={styles.empty}>{t('gallery.empty')}</p>
        ) : (
          <ul className={styles.grid}>
            {items.map((item, index) => (
              <li key={item.id} className={styles.cell}>
                <button
                  type="button"
                  className={styles.tile}
                  data-type={item.type}
                  onClick={() => open(index)}
                  aria-label={t('gallery.open', { label: labelFor(item) })}
                >
                  {item.type === 'photo' ? (
                    <img
                      className={styles.thumb}
                      src={item.src}
                      alt={labelFor(item)}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <video
                      className={styles.thumb}
                      src={`${item.src}#t=0.5`}
                      muted
                      playsInline
                      preload="metadata"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  )}

                  <span className={styles.badge}>
                    {item.type === 'video' ? <VideoIcon size={14} /> : <ImageIcon size={14} />}
                    {item.type === 'video' ? t('gallery.badgeVideo') : t('gallery.badgePhoto')}
                  </span>

                  <span className={styles.overlay} aria-hidden="true">
                    <span className={styles.action}>
                      {item.type === 'video' ? <Play size={22} /> : <ZoomIn size={22} />}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AnimatePresence>
        {isOpen && active && (
          <motion.div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={labelFor(active)}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={close}
              aria-label={t('gallery.close')}
            >
              <X size={22} />
            </button>

            {items.length > 1 && (
              <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label={t('gallery.prev')}
              >
                <ChevronLeft size={26} />
              </button>
            )}

            <motion.div
              className={styles.stage}
              onClick={(e) => e.stopPropagation()}
              initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              key={active.id}
            >
              {active.type === 'photo' ? (
                <img className={styles.stageMedia} src={active.src} alt={labelFor(active)} />
              ) : (
                <video
                  className={styles.stageMedia}
                  src={active.src}
                  controls
                  autoPlay
                  playsInline
                />
              )}
              <p className={styles.caption}>
                {labelFor(active)}
                <span>
                  {activeIndex + 1} / {items.length}
                </span>
              </p>
            </motion.div>

            {items.length > 1 && (
              <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label={t('gallery.next')}
              >
                <ChevronRight size={26} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
