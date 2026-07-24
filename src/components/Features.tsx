import { FadeIn } from './FadeIn'
import { BarChart3, FileText, Megaphone, Zap } from 'lucide-react'
import { asset } from '../utils/asset'
import { ImageFrame } from './ImageFrame'

const features = [
  {
    icon: Zap,
    title: 'AI Tools Ready to Use',
    desc: 'Generate text, images, videos, and automate tasks instantly.',
  },
  {
    icon: Megaphone,
    title: 'Build Marketing Assets',
    desc: 'Create offers, landing pages, and presentations in minutes.',
  },
  {
    icon: FileText,
    title: 'Create Content with AI',
    desc: 'Produce copy, visuals, and media with powerful AI tools.',
  },
  {
    icon: BarChart3,
    title: 'Analyze & Optimize',
    desc: 'Analyze websites, generate reports, and improve performance.',
  },
]

export function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <FadeIn className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Powerful AI tools. Real business results.
          </p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl md:text-4xl">
            Everything you need to grow{' '}
            <span className="text-brand-600">faster and smarter</span>
          </h2>
          <p className="mt-4 text-sm text-[var(--text-muted)] sm:text-base">
            AI Systems Store is not just another AI platform. We provide ready-to-use tools,
            structured systems, and automation frameworks designed to solve real business problems —
            not just generate ideas. Everything is built to help you move faster, work smarter, and
            scale without complexity.
          </p>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeIn delay={0.08}>
            <ImageFrame
              src={asset('images/features-visual.png')}
              alt="AI features visual"
              variant="soft"
              imgClassName="media-shine aspect-[3/2]"
            />
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={0.1 + i * 0.06}>
                <article className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[var(--shadow)] sm:p-5">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-[var(--text)] sm:text-lg">
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
