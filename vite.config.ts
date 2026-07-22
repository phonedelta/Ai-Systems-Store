import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Must match the GitHub repo name for project Pages URL
  base: '/Ai-Systems-Store/',
  plugins: [react(), tailwindcss()],
})
