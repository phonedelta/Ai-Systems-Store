import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function Hero() {
  return (
    <section id="home" className="mesh-light relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-brand-600/15 blur-3xl" />

      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Your AI workspace, all in one place
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--text)] sm:text-5xl lg:text-[3.4rem]"
          >
            Run powerful AI tools to{' '}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              grow
            </span>{' '}
            your business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
          >
            Access ready-to-use AI tools, complete business systems, and high-value resources
            designed to accelerate your growth — without complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#pricing" className="btn-primary">
              Get Started For Free
              <ArrowRight size={18} />
            </a>
            <a href="#tools" className="btn-secondary">
              Explore Tools
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--text-muted)]"
          >
            {['No credit card', 'Free forever plan', 'Cancel anytime'].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-brand-600" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-400/30 via-transparent to-brand-700/20 blur-2xl" />
          <img
            src="/images/hero-illustration.png"
            alt="AI Systems Store workspace illustration"
            className="relative w-full rounded-[1.75rem] border border-[var(--border)] shadow-[var(--shadow)]"
          />
          <img
            src="/images/dashboard-mockup.png"
            alt="AI tools dashboard preview"
            className="absolute -bottom-6 -left-4 w-[58%] rounded-2xl border border-white/70 shadow-xl sm:-bottom-8 sm:-left-8"
          />
        </motion.div>
      </div>
    </section>
  )
}
