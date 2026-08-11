import { z } from 'zod'
import { Router } from 'express'
import { existsSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { requireBlogSecret } from '../middleware/auth.js'
import { getBlogImagesDir, sanitizeSlugForFilename } from '../storage.js'
import {
  createPost,
  deletePost,
  getPostById,
  getPostBySlug,
  getRelatedPosts,
  listPublishedPosts,
  updatePost,
} from '../db.js'

export const blogRouter = Router()

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const postBodySchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .max(200)
    .regex(slugRegex, 'Slug must be lowercase kebab-case'),
  excerpt: z.string().trim().max(500).optional().default(''),
  content: z.string().trim().min(1, 'Content is required'),
  coverImage: z
    .union([z.string().trim().url(), z.literal('')])
    .optional()
    .default(''),
  coverImageAlt: z.string().trim().max(200).optional().default(''),
  category: z.string().trim().max(80).optional().default(''),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).optional().default([]),
  author: z.string().trim().max(100).optional().default('AI Systems Store'),
  publishedAt: z
    .string()
    .optional()
    .refine((v) => v === undefined || !Number.isNaN(Date.parse(v)), {
      message: 'Invalid publishedAt date',
    }),
  status: z.enum(['draft', 'published']).optional().default('published'),
  seoTitle: z.string().trim().max(200).optional(),
  seoDescription: z.string().trim().max(300).optional(),
  readingTimeMinutes: z.number().int().positive().max(120).optional(),
})

const updateBodySchema = postBodySchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field is required',
})

const uploadImageSchema = z.object({
  image: z.string().min(1, 'image is required'),
  slug: z.string().trim().min(1, 'slug is required').max(200),
})

function siteBase() {
  return (process.env.SITE_URL || 'https://phonedelta.github.io/Ai-Systems-Store').replace(/\/$/, '')
}

function postUrl(slug) {
  return `/blog/${slug}`
}

function absolutePostUrl(slug) {
  return `${siteBase()}/blog/${slug}`
}

function publicBaseUrl(req) {
  const proto = (req.get('x-forwarded-proto') || req.protocol || 'https').split(',')[0].trim()
  const host = (req.get('x-forwarded-host') || req.get('host') || '').split(',')[0].trim()
  return `${proto}://${host}`
}

function stripBase64Prefix(raw) {
  const value = String(raw || '').trim()
  const match = value.match(/^data:image\/[a-zA-Z0-9.+-]+;base64,(.+)$/s)
  return match ? match[1].replace(/\s/g, '') : value.replace(/\s/g, '')
}

/** Public list */
blogRouter.get('/', (req, res) => {
  const page = Number(req.query.page || 1)
  const limit = Number(req.query.limit || 9)
  const result = listPublishedPosts({ page, limit })
  res.json({ success: true, ...result })
})

/**
 * Public image serve — MUST be registered before GET /:slug
 * GET /api/blog/image/:filename
 */
blogRouter.get('/image/:filename', (req, res) => {
  try {
    const safeName = basename(req.params.filename || '')
    if (!safeName || safeName !== req.params.filename || !/^[a-zA-Z0-9._-]+$/.test(safeName)) {
      return res.status(400).json({ success: false, error: 'Invalid filename' })
    }

    const filePath = join(getBlogImagesDir(), safeName)
    if (!existsSync(filePath)) {
      return res.status(404).json({ success: false, error: 'Image not found' })
    }

    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return res.sendFile(filePath)
  } catch (error) {
    console.error('IMAGE SERVE ERROR:', error)
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to serve image',
    })
  }
})

/**
 * Protected image upload for n8n (OpenRouter base64)
 * POST /api/blog/upload-image
 */
blogRouter.post('/upload-image', requireBlogSecret, (req, res) => {
  try {
    const parsed = uploadImageSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.issues.map((i) => i.message).join('; '),
      })
    }

    const { slug } = parsed.data
    const base64 = stripBase64Prefix(parsed.data.image)
    if (!base64) {
      return res.status(400).json({ success: false, error: 'image is empty after parsing' })
    }

    let buffer
    try {
      buffer = Buffer.from(base64, 'base64')
    } catch (error) {
      console.error('IMAGE UPLOAD ERROR:', error)
      return res.status(400).json({ success: false, error: 'Invalid base64 image data' })
    }

    if (!buffer.length) {
      return res.status(400).json({ success: false, error: 'Decoded image is empty' })
    }

    // Basic sanity check: PNG/JPEG/WebP magic bytes (OpenRouter usually PNG/JPEG)
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50
    const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8
    const isWebp =
      buffer.length > 12 &&
      buffer.toString('ascii', 0, 4) === 'RIFF' &&
      buffer.toString('ascii', 8, 12) === 'WEBP'

    if (!isPng && !isJpeg && !isWebp) {
      console.warn('IMAGE UPLOAD WARNING: unrecognized image magic bytes, saving as PNG anyway')
    }

    const safeSlug = sanitizeSlugForFilename(slug)
    const filename = `${safeSlug}-${Date.now()}.png`
    const uploadDir = getBlogImagesDir()
    const filePath = join(uploadDir, filename)

    writeFileSync(filePath, buffer)

    const url = `${publicBaseUrl(req)}/api/blog/image/${filename}`
    console.log(`IMAGE UPLOAD OK: ${filename} (${buffer.length} bytes) → ${uploadDir}`)

    return res.status(201).json({
      success: true,
      filename,
      url,
    })
  } catch (error) {
    console.error('IMAGE UPLOAD ERROR:', error)
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image',
    })
  }
})

/** Public get by slug */
blogRouter.get('/:slug', (req, res) => {
  const post = getPostBySlug(req.params.slug)
  if (!post) {
    return res.status(404).json({ success: false, error: 'Post not found' })
  }
  const related = getRelatedPosts(post.slug, 3)
  return res.json({ success: true, post, related })
})

/** Create (n8n) */
blogRouter.post('/', requireBlogSecret, (req, res) => {
  const parsed = postBodySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.issues.map((i) => i.message).join('; '),
    })
  }

  try {
    const post = createPost(parsed.data)
    return res.status(201).json({
      success: true,
      post: {
        id: post.id,
        slug: post.slug,
        url: postUrl(post.slug),
        absoluteUrl: absolutePostUrl(post.slug),
      },
    })
  } catch (err) {
    if (err.code === 'SLUG_EXISTS') {
      return res.status(409).json({ success: false, error: 'Slug already exists' })
    }
    throw err
  }
})

/** Update by id */
blogRouter.put('/:id', requireBlogSecret, (req, res) => {
  const parsed = updateBodySchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.issues.map((i) => i.message).join('; '),
    })
  }

  try {
    const existing = getPostById(req.params.id)
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Post not found' })
    }
    const post = updatePost(req.params.id, parsed.data)
    return res.json({
      success: true,
      post: {
        id: post.id,
        slug: post.slug,
        url: postUrl(post.slug),
        absoluteUrl: absolutePostUrl(post.slug),
      },
    })
  } catch (err) {
    if (err.code === 'SLUG_EXISTS') {
      return res.status(409).json({ success: false, error: 'Slug already exists' })
    }
    throw err
  }
})

/** Delete by id */
blogRouter.delete('/:id', requireBlogSecret, (req, res) => {
  const ok = deletePost(req.params.id)
  if (!ok) {
    return res.status(404).json({ success: false, error: 'Post not found' })
  }
  return res.json({ success: true })
})
