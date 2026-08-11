import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Docker/Railway: VITE_BASE_PATH=/  |  GitHub Pages default: /Ai-Systems-Store/
  const base =
    process.env.VITE_BASE_PATH ||
    (mode === 'production' ? '/Ai-Systems-Store/' : '/')

  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3005',
          changeOrigin: true,
        },
      },
    },
  }
})
