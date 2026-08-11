import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { blogRouter } from './routes/blog.js'
import { ensureDb } from './db.js'

const PORT = Number(process.env.BLOG_API_PORT || 3005)
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

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ success: false, error: 'Internal server error' })
})

app.listen(PORT, () => {
  const secret = String(process.env.BLOG_API_SECRET || '').trim()
  console.log(`Blog API running on http://localhost:${PORT}`)
  console.log(`BLOG_API_SECRET loaded: ${secret ? `yes (${secret.length} chars)` : 'NO'}`)
})
