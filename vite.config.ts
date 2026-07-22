import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Required for GitHub Pages project site: /Ai-Systems-Store/
  base: '/Ai-Systems-Store/',
  plugins: [react(), tailwindcss()],
})
