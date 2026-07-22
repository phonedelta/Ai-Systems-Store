import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  // Local: /  |  GitHub Pages: /Ai-Systems-Store/
  base: mode === 'production' ? '/Ai-Systems-Store/' : '/',
  plugins: [react(), tailwindcss()],
}))
