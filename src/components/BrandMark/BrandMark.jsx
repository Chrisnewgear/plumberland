import styles from './BrandMark.module.scss'

// Crossed hammer + wrench brand mark, drawn inline so it inherits currentColor.
export default function BrandMark({ size = 30, className = '' }) {
  return (
    <svg
      className={`${styles.mark} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* wrench */}
      <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.1-2.1 2.6-2.6Z" />
      {/* hammer */}
      <path d="M17.5 3.5 13 8l3 3 4.5-4.5a2.1 2.1 0 0 0-3-3Z" />
    </svg>
  )
}
