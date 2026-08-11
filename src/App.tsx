import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BackToTop } from './components/BackToTop'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'

function App() {
  return (
    <div className="min-h-svh overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
