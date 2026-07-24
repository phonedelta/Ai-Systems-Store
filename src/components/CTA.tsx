import { ArrowRight } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { asset } from '../utils/asset'

export function CTA() {
  return (
    <section id="cta" className="section !pt-2 !pb-10 md:!pb-12">
      <div className="container">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[1.5rem] px-5 py-12 text-center text-white sm:rounded-[2rem] sm:px-12 sm:py-16">
            <img
              src={asset('images/cta-banner-bg.png')}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-700/85 via-brand-600/80 to-brand-800/90" />
            <div className="relative">
              <p className="mb-3 text-sm font-semibold tracking-wide text-white/80 uppercase">
                Ready to level up your business?
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Take your business to the next level with AI
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 sm:text-base">
                Tools. Systems. Results.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#ai-systems"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-lg transition hover:-translate-y-0.5"
                >
                  Explore AI Tools
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
