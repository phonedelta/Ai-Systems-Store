import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#tools', label: 'Tools' },
  { href: '#about', label: 'About' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-[var(--shadow)]' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-[4.25rem] items-center justify-between gap-4">
        <a href="#home" className="flex shrink-0 items-center">
          <Logo className="h-8 md:h-9" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)] transition hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://account.ai-systems-store.com/login"
            className="hidden text-sm font-semibold text-[var(--text-muted)] transition hover:text-brand-600 sm:inline"
          >
            Log in
          </a>
          <a href="#pricing" className="btn-primary hidden px-4 py-2.5 text-sm sm:inline-flex">
            Get Started
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass border-t border-[var(--border)] lg:hidden">
          <div className="container flex flex-col gap-3 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--bg-soft)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://account.ai-systems-store.com/login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--bg-soft)]"
            >
              Log in
            </a>
            <a href="#pricing" onClick={() => setOpen(false)} className="btn-primary mt-1 text-sm">
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
