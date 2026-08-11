import 'dotenv/config'
import { readFileSync, writeFileSync } from 'node:fs'

const secret = String(process.env.BLOG_API_SECRET || '').trim()
const port = process.env.BLOG_API_PORT || 3005

if (!secret) {
  console.error('Missing BLOG_API_SECRET in .env')
  process.exit(1)
}

const slug = `mon-article-test-n8n-${Date.now()}`
const body = {
  title: 'Mon article test n8n',
  slug,
  excerpt: 'Résumé de test',
  content: '## Intro\n\nContenu généré pour tester le blog.',
  coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  category: 'AI',
  tags: ['AI', 'Automation'],
  author: 'AI Systems Store',
  publishedAt: new Date().toISOString(),
  status: 'published',
  seoTitle: 'Mon article test n8n',
  seoDescription: 'Meta description de test',
}

const res = await fetch(`http://localhost:${port}/api/blog`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${secret}`,
  },
  body: JSON.stringify(body),
})

const json = await res.json()
console.log('Status:', res.status)
console.log(JSON.stringify(json, null, 2))

if (json.success) {
  console.log('\nOK — ouvre: http://localhost:2005/blog')
  console.log('Article:', `http://localhost:2005/blog/${slug}`)
} else {
  process.exit(1)
}
