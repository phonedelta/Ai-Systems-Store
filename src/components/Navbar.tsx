import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#tools', label: 'Tools' },
  { href: '#about', label: 'About' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

const sectionIds = links.map((l) => l.href.slice(1))

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id)
        }
      },
      {
        root: null,
        // Account for fixed navbar + pick section near top of viewport
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const linkClass = (href: string, mobile = false) => {
    const id = href.slice(1)
    const isActive = active === id
    if (mobile) {
      return `rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 ease-out ${
        isActive
          ? 'bg-brand-50 text-brand-700'
          : 'bg-transparent text-[var(--text)] hover:bg-[var(--bg-soft)]'
      }`
    }
    return `relative text-sm font-medium transition-colors duration-300 ease-out after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-brand-600 after:transition-transform after:duration-300 after:ease-out ${
      isActive
        ? 'text-brand-600 after:scale-x-100'
        : 'text-[var(--text-muted)] after:scale-x-0 hover:text-brand-600 hover:after:scale-x-100'
    }`
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-[var(--shadow)]' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-[4.25rem] items-center justify-between gap-4">
        <a href="#home" className="flex min-w-0 shrink-0 items-center">
          <Logo className="h-7 sm:h-8 md:h-9" />
        </a>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={linkClass(link.href)}>
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
                className={linkClass(link.href, true)}
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
