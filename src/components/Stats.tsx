import { FadeIn } from './FadeIn'
import { BarChart3, Briefcase, Puzzle, Rocket } from 'lucide-react'

const pillars = [
  {
    icon: Puzzle,
    title: 'Practical AI Solutions',
    desc: 'AI tools and automations that fit your workflows and deliver immediate, tangible results.',
  },
  {
    icon: Briefcase,
    title: 'Business-First Approach',
    desc: 'Every solution starts with your goals — focused on ROI, performance, and long-term impact.',
  },
  {
    icon: Rocket,
    title: 'Ready-Built & Custom',
    desc: 'From ready-built AI funnels to customized automations — easy to deploy, scale, and maintain.',
  },
  {
    icon: BarChart3,
    title: 'Measurable Growth',
    desc: 'Driven by data, performance tracking, and continuous optimization for lasting business growth.',
  },
]

export function Stats() {
  return (
    <section className="section !py-8 md:!py-10">
      <div className="container">
        <FadeIn className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold text-brand-600">Our Company</p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            We turn AI into{' '}
            <span className="text-brand-600">real business value</span>
          </h2>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <item.icon size={18} />
                </div>
                <h3 className="font-display text-base font-bold text-[var(--text)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
