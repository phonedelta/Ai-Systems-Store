import { asset } from '../utils/asset'

type LogoProps = {
  className?: string
}

/** Official brand logo with transparent background */
export function Logo({ className = 'h-9' }: LogoProps) {
  return (
    <img
      src={asset('logos/logo-nav.png')}
      alt="AI Systems Store"
      className={`w-auto object-contain object-left ${className}`}
      style={{ background: 'transparent' }}
      draggable={false}
    />
  )
}
