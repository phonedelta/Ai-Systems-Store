import { FadeIn } from './FadeIn'
import { Clock3, Headphones, Layers, Users } from 'lucide-react'

const stats = [
  { icon: Users, value: '10K+', label: 'Active Users' },
  { icon: Layers, value: '100+', label: 'AI Tools' },
  { icon: Clock3, value: '99.9%', label: 'Uptime' },
  { icon: Headphones, value: '24/7', label: 'Support' },
]

export function Stats() {
  return (
    <section className="section !py-8 md:!py-10">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-7 text-center shadow-sm">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <stat.icon size={18} />
                </div>
                <p className="font-display text-3xl font-bold text-[var(--text)]">{stat.value}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
