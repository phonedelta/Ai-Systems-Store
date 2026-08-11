import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { Tools } from '../components/Tools'
import { ToolsGallery } from '../components/ToolsGallery'
import { About } from '../components/About'
import { Stats } from '../components/Stats'
import { Pricing } from '../components/Pricing'
import { FAQ } from '../components/FAQ'
import { Contact } from '../components/Contact'
import { CTA } from '../components/CTA'
import { Helmet } from 'react-helmet-async'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>AI Systems Store — Build, Automate, and Scale Your Business with AI</title>
        <meta
          name="description"
          content="Access ready-to-use AI tools, complete business systems, and high-value resources designed to accelerate your growth."
        />
        <link rel="canonical" href="https://phonedelta.github.io/Ai-Systems-Store/" />
      </Helmet>
      <Hero />
      <Features />
      <Tools />
      <ToolsGallery />
      <About />
      <Stats />
      <Pricing />
      <FAQ />
      <Contact />
      <CTA />
    </>
  )
}
