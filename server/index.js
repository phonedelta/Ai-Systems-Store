import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { blogRouter } from './routes/blog.js'
import { ensureDb } from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Railway sets PORT. Local API uses BLOG_API_PORT (default 3005).
const PORT = Number(process.env.PORT || process.env.BLOG_API_PORT || 3005)
const HOST = process.env.HOST || '0.0.0.0'
const serveFrontend = process.env.SERVE_FRONTEND === 'true'

const app = express()

ensureDb()

app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok' })
})

app.use('/api/blog', blogRouter)

app.get('/api/sitemap.xml', async (_req, res) => {
  const { listPublishedPostsAll } = await import('./db.js')
  const siteUrl = (process.env.SITE_URL || 'https://phonedelta.github.io/Ai-Systems-Store').replace(
    /\/$/,
    '',
  )
  const posts = listPublishedPostsAll()

  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/blog`,
    ...posts.map((p) => `${siteUrl}/blog/${p.slug}`),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join('\n')}
</urlset>`

  res.type('application/xml').send(xml)
})

if (serveFrontend) {
  const distPath = join(__dirname, '..', 'dist')
  if (!existsSync(distPath)) {
    console.error(`SERVE_FRONTEND=true but dist not found at ${distPath}`)
    process.exit(1)
  }

  app.use(express.static(distPath, { index: false, maxAge: '7d' }))

  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    if (req.path.startsWith('/api')) return next()
    res.sendFile(join(distPath, 'index.html'), (err) => {
      if (err) next(err)
    })
  })
}

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ success: false, error: 'Internal server error' })
})

app.listen(PORT, HOST, () => {
  const secret = String(process.env.BLOG_API_SECRET || '').trim()
  console.log(`Server listening on http://${HOST}:${PORT}`)
  console.log(`Frontend: ${serveFrontend ? 'enabled' : 'disabled'}`)
  console.log(`BLOG_API_SECRET loaded: ${secret ? `yes (${secret.length} chars)` : 'NO'}`)
})
