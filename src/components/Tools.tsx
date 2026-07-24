import { Check, ArrowRight } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { asset } from '../utils/asset'
import { ImageFrame } from './ImageFrame'

const points = [
  'Save Time — no coding, no technical complexity',
  'Plug-and-Play Systems — everything is structured and pre-optimized',
  'AI-Enhanced Resources — built around efficiency and performance',
  'Weekly Updates — stay ahead of market changes every month',
  'Affordable Access — high-value tools without heavy investments',
]

export function Tools() {
  return (
    <section id="tools" className="section bg-[var(--bg-soft)]">
      <div className="container grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <p className="mb-3 text-sm font-semibold text-brand-600">Why Choose AI Systems Store?</p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl md:text-4xl">
            A platform built for{' '}
            <span className="text-brand-600">speed, simplicity, and real results</span>
          </h2>
          <p className="mt-4 text-sm text-[var(--text-muted)] sm:text-base">
            We provide ready-to-use tools, structured systems, and automation frameworks designed to
            solve real business problems — not just generate ideas.
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
          <a href="#ai-systems" className="btn-primary mt-8">
            View More
            <ArrowRight size={18} />
          </a>
        </FadeIn>

        <FadeIn delay={0.12}>
          <ImageFrame
            src={asset('images/tools-showcase.png')}
            alt="AI tools category showcase"
            variant="soft"
            imgClassName="media-shine aspect-[4/3] object-contain bg-white p-2 sm:p-3"
          />
        </FadeIn>
      </div>
    </section>
  )
}
