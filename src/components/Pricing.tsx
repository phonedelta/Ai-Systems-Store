import { useState } from 'react'
import { Check } from 'lucide-react'
import { FadeIn } from './FadeIn'

const plans = [
  {
    name: 'Starter',
    monthly: 0,
    yearly: 0,
    desc: 'Perfect for exploring AI tools and understanding how automation can support your business.',
    features: ['AI Copy Generator', 'AI Systems Assistant', 'AI Offer Builder', 'Community access'],
    popular: false,
  },
  {
    name: 'Pro',
    monthly: 19,
    yearly: 179,
    desc: 'Designed for entrepreneurs ready to automate workflows and scale faster with AI.',
    features: [
      'All AI tools included',
      'AI Image Generator',
      'AI Video Generator',
      'Website Analyzer',
      'AI Presentation Builder',
      'Landing Page Generator',
    ],
    popular: true,
  },
  {
    name: 'Team',
    monthly: 49,
    yearly: 470,
    desc: 'For growing teams that need collaboration, priority support, and advanced systems.',
    features: [
      'Everything in Pro',
      'Team workspaces',
      'Priority support',
      'Custom workflows',
      'Training & updates',
      'Shared templates',
    ],
    popular: false,
  },
]

const ACCOUNT_LOGIN_URL = 'https://account.ai-systems-store.com/login'

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="section bg-[var(--bg-soft)]">
      <div className="container">
        <FadeIn className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold text-brand-600">Pricing</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Simple pricing for <span className="text-brand-600">everyone</span>
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Experience powerful AI systems without overpaying for features you don’t use.
          </p>

          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] p-1.5">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !yearly
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                yearly
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Yearly
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly
            const period = yearly ? '/year' : '/month'
            return (
              <FadeIn key={plan.name} delay={i * 0.08}>
                <article
                  className={`relative flex h-full flex-col rounded-[1.5rem] border bg-[var(--bg-elevated)] p-5 sm:p-7 ${
                    plan.popular
                      ? 'mt-3 border-brand-500 shadow-[0_24px_60px_-28px_rgba(124,58,237,0.55)] lg:mt-0 lg:-translate-y-2'
                      : 'border-[var(--border)]'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold text-[var(--text)]">{plan.name}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{plan.desc}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="font-display text-4xl font-extrabold text-[var(--text)]">
                      ${price}
                    </span>
                    <span className="pb-1 text-sm text-[var(--text-muted)]">{period}</span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                        <Check size={16} className="mt-0.5 shrink-0 text-brand-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={ACCOUNT_LOGIN_URL}
                    className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                      plan.popular
                        ? 'btn-primary'
                        : 'border border-[var(--border)] text-[var(--text)] hover:border-brand-300 hover:bg-[var(--bg-soft)]'
                    }`}
                  >
                    Choisir ce plan
                  </a>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
