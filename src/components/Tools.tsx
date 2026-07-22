import { Check, ArrowRight } from 'lucide-react'
import { FadeIn } from './FadeIn'

const points = [
  '100+ specialized AI tools ready to use',
  'Complete business systems & frameworks',
  'Templates, prompts & workflows included',
  'Regularly updated with new capabilities',
]

export function Tools() {
  return (
    <section id="tools" className="section bg-[var(--bg-soft)]">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <p className="mb-3 text-sm font-semibold text-brand-600">AI Tools</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Built for <span className="text-brand-600">real work</span>, not just
            experiments
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Optimize operations, automate workflows, and enhance performance with plug-and-play AI
            systems designed for entrepreneurs and teams.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[var(--text)]">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-sm sm:text-base">{point}</span>
              </li>
            ))}
          </ul>
          <a href="#pricing" className="btn-primary mt-8">
            Explore All Tools
            <ArrowRight size={18} />
          </a>
        </FadeIn>

        <FadeIn delay={0.12}>
          <img
            src="/images/tools-showcase.png"
            alt="AI tools category showcase"
            className="w-full rounded-[1.75rem] border border-[var(--border)] shadow-[var(--shadow)]"
          />
        </FadeIn>
      </div>
    </section>
  )
}
