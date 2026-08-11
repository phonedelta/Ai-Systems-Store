import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const base = import.meta.env.BASE_URL

const sectionLinks = [
  { href: `${base}#home`, hash: 'home', label: 'Home' },
  { href: `${base}#features`, hash: 'features', label: 'Features' },
  { href: `${base}#tools`, hash: 'tools', label: 'Tools' },
  { href: `${base}#about`, hash: 'about', label: 'About' },
  { href: `${base}#pricing`, hash: 'pricing', label: 'Pricing' },
  { href: `${base}#faq`, hash: 'faq', label: 'FAQ' },
  { href: `${base}#contact`, hash: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    const elements = sectionLinks
      .map((l) => document.getElementById(l.hash))
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
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isHome])

  const sectionLinkClass = (hash: string, mobile = false) => {
    const isActive = isHome && active === hash
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

  const blogLinkClass = (isActive: boolean, mobile = false) => {
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
        <Link to="/" className="flex min-w-0 shrink-0 items-center">
          <Logo className="h-7 sm:h-8 md:h-9" />
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {sectionLinks.map((link) => (
            <a key={link.hash} href={link.href} className={sectionLinkClass(link.hash)}>
              {link.label}
            </a>
          ))}
          <NavLink to="/blog" className={({ isActive }) => blogLinkClass(isActive)}>
            Blog
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://account.ai-systems-store.com/login"
            className="hidden text-sm font-semibold text-[var(--text-muted)] transition hover:text-brand-600 sm:inline"
          >
            Log in
          </a>
          <a href={`${base}#pricing`} className="btn-primary hidden px-4 py-2.5 text-sm sm:inline-flex">
            Join the Platform
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
            {sectionLinks.map((link) => (
              <a
                key={link.hash}
                href={link.href}
                onClick={() => setOpen(false)}
                className={sectionLinkClass(link.hash, true)}
              >
                {link.label}
              </a>
            ))}
            <NavLink
              to="/blog"
              onClick={() => setOpen(false)}
              className={({ isActive }) => blogLinkClass(isActive, true)}
            >
              Blog
            </NavLink>
            <a
              href="https://account.ai-systems-store.com/login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--bg-soft)]"
            >
              Log in
            </a>
            <a
              href={`${base}#pricing`}
              onClick={() => setOpen(false)}
              className="btn-primary mt-1 text-sm"
            >
              Join the Platform
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
