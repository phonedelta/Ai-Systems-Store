import { FadeIn } from '../FadeIn'

export function BlogHero() {
  return (
    <section className="mesh-light relative overflow-hidden pt-28 pb-10 md:pt-32 md:pb-12">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-brand-600/15 blur-3xl" />

      <div className="container relative mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="mb-3 text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Blog
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
            Insights to grow{' '}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              faster with AI
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--text-muted)] sm:text-lg">
            Practical guides, automation ideas, and business systems to help you build, automate,
            and scale with AI.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
