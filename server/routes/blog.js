import { z } from 'zod'
import { Router } from 'express'
import { requireBlogSecret } from '../middleware/auth.js'
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

function siteBase() {
  return (process.env.SITE_URL || 'https://phonedelta.github.io/Ai-Systems-Store').replace(/\/$/, '')
}

function postUrl(slug) {
  return `/blog/${slug}`
}

function absolutePostUrl(slug) {
  return `${siteBase()}/blog/${slug}`
}

/** Public list */
blogRouter.get('/', (req, res) => {
  const page = Number(req.query.page || 1)
  const limit = Number(req.query.limit || 9)
  const result = listPublishedPosts({ page, limit })
  res.json({ success: true, ...result })
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
