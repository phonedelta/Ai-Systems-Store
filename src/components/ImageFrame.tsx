import type { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  src?: string
  alt?: string
  className?: string
  imgClassName?: string
  variant?: 'light' | 'dark' | 'soft'
}

/** Decorative frame: soft purple glow, floating orbs, rounded media */
export function ImageFrame({
  children,
  src,
  alt = '',
  className = '',
  imgClassName = '',
  variant = 'light',
}: Props) {
  const border =
    variant === 'dark'
      ? 'border-white/10 shadow-[0_20px_50px_-20px_rgba(124,58,237,0.55)]'
      : variant === 'soft'
        ? 'border-brand-100 shadow-[var(--shadow)]'
        : 'border-[var(--border)] shadow-[var(--shadow)]'

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-brand-400/30 via-brand-300/10 to-brand-700/20 blur-2xl" />
      <div className="pointer-events-none absolute -top-3 -right-2 h-14 w-14 rounded-full border border-brand-300/50 sm:h-16 sm:w-16" />
      <div className="pointer-events-none absolute top-8 -right-1 h-2.5 w-2.5 rounded-full bg-brand-500 float-soft" />
      <div className="pointer-events-none absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-brand-400/25 blur-md float-soft-delayed sm:h-14 sm:w-14" />
      <div className="pointer-events-none absolute bottom-10 -left-3 h-2 w-2 rounded-full bg-brand-300 float-soft-delayed" />

      {children ?? (
        <img
          src={src}
          alt={alt}
          className={`relative z-10 w-full rounded-[1.25rem] border bg-[var(--bg-elevated)] object-cover sm:rounded-[1.75rem] ${border} ${imgClassName}`}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )
}
