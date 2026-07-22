import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so GitHub Pages works for project sites
  base: './',
  plugins: [react(), tailwindcss()],
})
