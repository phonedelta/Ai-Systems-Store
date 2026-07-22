import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed right-5 bottom-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_12px_28px_-8px_rgba(124,58,237,0.65)] transition hover:-translate-y-0.5 hover:bg-brand-700 sm:right-8 sm:bottom-8"
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  )
}
