import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FadeIn } from './FadeIn'

const faqs = [
  {
    q: 'What types of businesses do you work with?',
    a: 'We work with startups, SMEs, coaches, consultants, and growing businesses looking to leverage AI and automation to improve efficiency, scale operations, and increase profitability.',
  },
  {
    q: 'Do I need technical knowledge to use your AI solutions?',
    a: 'No. All our solutions are designed to be user-friendly and easy to adopt. We handle the technical complexity so you can focus on running your business.',
  },
  {
    q: 'Are your AI tools ready to use or fully custom?',
    a: 'Both. We offer ready-built AI systems for fast deployment, as well as fully customized solutions tailored to your specific workflows and business objectives.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section bg-[var(--bg-soft)]">
      <div className="container max-w-3xl">
        <FadeIn className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold text-brand-600">Our FAQs</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <FadeIn key={faq.q} delay={i * 0.04}>
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-[var(--text)]">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-brand-600 transition ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--text-muted)]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
