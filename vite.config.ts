import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative paths work for local + GitHub Pages
  base: './',
  plugins: [react(), tailwindcss()],
})
