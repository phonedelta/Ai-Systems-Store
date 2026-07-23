import { ArrowRight } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import { asset } from '../utils/asset'

type ToolCard = {
  title: string
  image?: string
  interactive?: 'before-after'
}

const tools: ToolCard[] = [
  {
    title: 'AI Copy Generator',
    image: 'images/tool-copy.png',
  },
  {
    title: 'AI Image Generator',
    interactive: 'before-after',
  },
  {
    title: 'AI Offer Builder',
    image: 'images/tool-offer.png',
  },
  {
    title: 'AI Presentation Builder',
    image: 'images/tool-presentation.png',
  },
  {
    title: 'AI Video Generator',
    image: 'images/tool-video.png',
  },
  {
    title: 'Website Analyzer',
    image: 'images/tool-analyzer.png',
  },
]

export function ToolsGallery() {
  return (
    <section id="ai-systems" className="section bg-[var(--bg)]">
      <div className="container">
        <FadeIn className="mx-auto mb-8 max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Ready-to-Use AI Systems for Your Business
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl lg:text-[2.1rem]">
            Optimize operations, automate workflows, and enhance performance with our plug-and-play{' '}
            <span className="text-brand-600">AI business systems</span>.
          </h2>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <FadeIn key={tool.title} delay={i * 0.05}>
              <article
                className={`group overflow-hidden rounded-2xl border shadow-[var(--shadow)] transition hover:-translate-y-0.5 ${
                  tool.interactive === 'before-after'
                    ? 'border-slate-800 bg-[#0b0b0f] ring-1 ring-brand-500/20'
                    : 'border-[var(--border)] bg-[var(--bg-elevated)] hover:border-brand-300'
                }`}
              >
                {tool.interactive === 'before-after' ? (
                  <BeforeAfterSlider
                    beforeSrc={asset('images/ai-image-1.webp')}
                    afterSrc={asset('images/ai-image-2.webp')}
                    alt="AI Image Generator"
                  />
                ) : (
                  <div className="aspect-[16/11] overflow-hidden bg-gradient-to-br from-brand-50 to-white">
                    <img
                      src={asset(tool.image!)}
                      alt={tool.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                )}
                <div
                  className={`px-3 py-3 sm:px-4 sm:py-3.5 ${
                    tool.interactive === 'before-after'
                      ? 'border-t border-white/10 bg-black'
                      : 'border-t border-[var(--border)] bg-[var(--bg-elevated)]'
                  }`}
                >
                  <h3
                    className={`font-display text-xs font-bold tracking-[0.1em] uppercase sm:text-sm sm:tracking-[0.12em] ${
                      tool.interactive === 'before-after' ? 'text-white' : 'text-[var(--text)]'
                    }`}
                  >
                    {tool.title}
                  </h3>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 flex justify-center">
          <a href="#pricing" className="btn-primary">
            Request a Demo
            <ArrowRight size={18} />
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
