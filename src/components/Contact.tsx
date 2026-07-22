import { useState, type FormEvent } from 'react'
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react'
import { FadeIn } from './FadeIn'

const fieldClass =
  'w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-brand-400 focus:ring-4 focus:ring-brand-500/15'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <FadeIn>
            <p className="mb-3 text-sm font-semibold text-brand-600">Contact</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
              We’re here to{' '}
              <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
                help
              </span>
            </h2>
            <p className="mt-4 max-w-md text-[var(--text-muted)]">
              Whether you need guidance, support, or more information — send us a message and our
              team will get back to you.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:contact@ai-systems-store.com"
                className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3.5 transition hover:border-brand-300"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                    Email
                  </p>
                  <p className="text-sm font-medium text-[var(--text)]">
                    contact@ai-systems-store.com
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3.5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                    Support
                  </p>
                  <p className="text-sm font-medium text-[var(--text)]">Available 24/7</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow)] sm:p-8"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-brand-600/10 blur-3xl" />

              <div className="relative grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-[var(--text-muted)]">
                    First name *
                  </span>
                  <input
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="John"
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-[var(--text-muted)]">
                    Last name *
                  </span>
                  <input
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Doe"
                    className={fieldClass}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-[var(--text-muted)]">
                    Email *
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="john@company.com"
                    className={fieldClass}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-[var(--text-muted)]">
                    Phone number
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+212 6 00 00 00 00"
                    className={fieldClass}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-[var(--text-muted)]">
                    Message *
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help…"
                    className={`${fieldClass} resize-y min-h-[120px]`}
                  />
                </label>
              </div>

              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send message
                  <Send size={16} />
                </button>
                {sent && (
                  <p className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                    <CheckCircle2 size={16} />
                    Message sent — we’ll reply soon.
                  </p>
                )}
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
