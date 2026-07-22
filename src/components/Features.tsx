import { FadeIn } from './FadeIn'
import { Lock, Sparkles, LayoutGrid, Zap } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Powerful AI Tools',
    desc: 'Generate text, images, videos, and automate key tasks instantly — ready to use out of the box.',
  },
  {
    icon: LayoutGrid,
    title: 'Organized Workspace',
    desc: 'One clean dashboard for every tool, system, and template your team needs to move faster.',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    desc: 'Built with privacy-first workflows so your business data stays protected while you scale.',
  },
  {
    icon: Sparkles,
    title: 'Real Business Results',
    desc: 'Not just ideas — structured systems and automations designed to solve real business problems.',
  },
]

export function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <FadeIn className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold text-brand-600">Features</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Everything you need to work{' '}
            <span className="text-brand-600">smarter</span> with AI
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            AI Systems Store is not just another AI platform. We provide ready-to-use tools and
            frameworks designed for growth.
          </p>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeIn delay={0.08}>
            <img
              src="/images/features-visual.png"
              alt="AI features visual"
              className="w-full rounded-[1.75rem] border border-[var(--border)] shadow-[var(--shadow)]"
            />
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={0.1 + i * 0.06}>
                <article className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[var(--shadow)]">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--text)]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {feature.desc}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
