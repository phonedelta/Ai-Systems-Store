import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Tools } from './components/Tools'
import { ToolsGallery } from './components/ToolsGallery'
import { About } from './components/About'
import { Stats } from './components/Stats'
import { Pricing } from './components/Pricing'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { BackToTop } from './components/BackToTop'

function App() {
  return (
    <div className="min-h-svh overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <main>
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
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
