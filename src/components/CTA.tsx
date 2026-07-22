import { ArrowRight } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { asset } from '../utils/asset'

export function CTA() {
  return (
    <section id="cta" className="section !pt-2 !pb-10 md:!pb-12">
      <div className="container">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <img
              src={asset('images/cta-banner-bg.png')}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-700/85 via-brand-600/80 to-brand-800/90" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to supercharge your workflow?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">
                Take your business to the next level with AI tools, systems, and results — all in
                one place.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-lg transition hover:-translate-y-0.5"
                >
                  Get Started for Free
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#tools"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Tools
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
