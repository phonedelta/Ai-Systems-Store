import { randomUUID } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')
const DB_PATH = join(DATA_DIR, 'posts.json')

function emptyDb() {
  return { posts: [] }
}

export function ensureDb() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
  if (!existsSync(DB_PATH)) {
    writeFileSync(DB_PATH, JSON.stringify(emptyDb(), null, 2), 'utf8')
  }
}

function readDb() {
  ensureDb()
  try {
    const raw = readFileSync(DB_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.posts)) return emptyDb()
    return parsed
  } catch {
    return emptyDb()
  }
}

function writeDb(db) {
  ensureDb()
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8')
}

function estimateReadingTime(content) {
  const words = String(content || '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function isPubliclyVisible(post, now = new Date()) {
  if (!post || post.status !== 'published') return false
  const publishedAt = new Date(post.publishedAt)
  if (Number.isNaN(publishedAt.getTime())) return false
  return publishedAt.getTime() <= now.getTime()
}

export function toPublicPost(post) {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    category: post.category,
    tags: post.tags,
    author: post.author,
    status: post.status,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    readingTimeMinutes: post.readingTimeMinutes,
  }
}

export function listPublishedPosts({ page = 1, limit = 9 } = {}) {
  const db = readDb()
  const now = new Date()
  const published = db.posts
    .filter((p) => isPubliclyVisible(p, now))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  const total = published.length
  const safeLimit = Math.min(Math.max(Number(limit) || 9, 1), 50)
  const safePage = Math.max(Number(page) || 1, 1)
  const start = (safePage - 1) * safeLimit
  const items = published.slice(start, start + safeLimit).map(toPublicPost)

  return {
    items,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
      hasMore: start + safeLimit < total,
    },
  }
}

/** @returns {Array} all published posts (for sitemap / related) */
export function listPublishedPostsAll() {
  const db = readDb()
  const now = new Date()
  return db.posts
    .filter((p) => isPubliclyVisible(p, now))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .map(toPublicPost)
}

// Fix naming - index.js imports listPublishedPosts for sitemap expecting array
// I'll alias in index - actually I used listPublishedPosts() without args in sitemap.
// Let me fix index.js to use listPublishedPostsAll

export function getPostBySlug(slug, { includeDrafts = false } = {}) {
  const db = readDb()
  const post = db.posts.find((p) => p.slug === slug)
  if (!post) return null
  if (!includeDrafts && !isPubliclyVisible(post)) return null
  return toPublicPost(post)
}

export function getPostById(id) {
  const db = readDb()
  const post = db.posts.find((p) => p.id === id)
  return post ? toPublicPost(post) : null
}

export function createPost(input) {
  const db = readDb()
  if (db.posts.some((p) => p.slug === input.slug)) {
    const err = new Error('Slug already exists')
    err.code = 'SLUG_EXISTS'
    throw err
  }

  const now = new Date().toISOString()
  const post = {
    id: randomUUID(),
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt || '',
    content: input.content,
    coverImage: input.coverImage || '',
    coverImageAlt: input.coverImageAlt || input.title,
    category: input.category || '',
    tags: input.tags || [],
    author: input.author || 'AI Systems Store',
    status: input.status || 'published',
    publishedAt: input.publishedAt || now,
    createdAt: now,
    updatedAt: now,
    seoTitle: input.seoTitle || input.title,
    seoDescription: input.seoDescription || input.excerpt || '',
    readingTimeMinutes: input.readingTimeMinutes || estimateReadingTime(input.content),
  }

  db.posts.push(post)
  writeDb(db)
  return toPublicPost(post)
}

export function updatePost(id, input) {
  const db = readDb()
  const index = db.posts.findIndex((p) => p.id === id)
  if (index === -1) return null

  if (input.slug && input.slug !== db.posts[index].slug) {
    if (db.posts.some((p) => p.slug === input.slug)) {
      const err = new Error('Slug already exists')
      err.code = 'SLUG_EXISTS'
      throw err
    }
  }

  const current = db.posts[index]
  const next = {
    ...current,
    ...input,
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString(),
    tags: input.tags ?? current.tags,
    readingTimeMinutes:
      input.readingTimeMinutes ||
      estimateReadingTime(input.content ?? current.content),
  }

  db.posts[index] = next
  writeDb(db)
  return toPublicPost(next)
}

export function deletePost(id) {
  const db = readDb()
  const index = db.posts.findIndex((p) => p.id === id)
  if (index === -1) return false
  db.posts.splice(index, 1)
  writeDb(db)
  return true
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getPostBySlug(slug)
  if (!current) return []
  return listPublishedPostsAll()
    .filter((p) => p.slug !== slug)
    .filter((p) => !current.category || p.category === current.category || (p.tags || []).some((t) => (current.tags || []).includes(t)))
    .slice(0, limit)
}
