import { FadeIn } from './FadeIn'
import { Compass, Lightbulb, Target, TrendingUp } from 'lucide-react'
import { asset } from '../utils/asset'
import { ImageFrame } from './ImageFrame'

const values = [
  {
    icon: Compass,
    title: 'Simplicity',
    desc: 'We make AI and automation simple, clear, and easy to adopt — without technical barriers.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We identify real business pain points and design AI-driven solutions aligned with growth.',
  },
  {
    icon: Target,
    title: 'Excellence',
    desc: 'Practical, results-driven AI that helps you maximize the value of your technology investments.',
  },
  {
    icon: TrendingUp,
    title: 'Real Impact',
    desc: 'Measurable outcomes by understanding your workflows, challenges, and business needs.',
  },
]

export function About() {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-10 sm:gap-12 lg:grid-cols-2">
        <FadeIn delay={0.08} className="order-2 lg:order-1">
          <ImageFrame
            src={asset('images/about-visual.png')}
            alt="AI Systems Store mission visual"
            variant="soft"
            imgClassName="media-shine aspect-[4/3] object-contain bg-white"
          />
        </FadeIn>

        <div className="order-1 lg:order-2">
          <FadeIn>
            <p className="mb-3 text-sm font-semibold text-brand-600">About us</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl md:text-4xl">
              Making AI accessible, practical, and profitable
            </h2>
            <p className="mt-4 text-sm text-[var(--text-muted)] sm:text-base">
              AI Systems Store empowers entrepreneurs, creators, and businesses with simple,
              effective, and smart AI tools. Our mission is to eliminate complexity and make
              automation accessible to everyone.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={0.08 + i * 0.05}>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
                  <value.icon className="mb-3 text-brand-600" size={20} />
                  <h3 className="font-display font-semibold text-[var(--text)]">{value.title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--text-muted)]">{value.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
