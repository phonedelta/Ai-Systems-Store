export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  coverImageAlt?: string
  category: string
  tags: string[]
  author: string
  status: 'draft' | 'published'
  publishedAt: string
  createdAt: string
  updatedAt: string
  seoTitle?: string
  seoDescription?: string
  readingTimeMinutes?: number
}

export type BlogListResponse = {
  success: boolean
  items: BlogPost[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
  error?: string
}

export type BlogPostResponse = {
  success: boolean
  post?: BlogPost
  related?: BlogPost[]
  error?: string
}

const API_BASE = (import.meta.env.VITE_BLOG_API_URL || '').replace(/\/$/, '')

function apiUrl(path: string) {
  return `${API_BASE}${path}`
}

export async function fetchBlogPosts(page = 1, limit = 9): Promise<BlogListResponse> {
  const res = await fetch(apiUrl(`/api/blog?page=${page}&limit=${limit}`))
  const data = (await res.json()) as BlogListResponse
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to load articles')
  }
  return data
}

export async function fetchBlogPost(slug: string): Promise<BlogPostResponse> {
  const res = await fetch(apiUrl(`/api/blog/${encodeURIComponent(slug)}`))
  const data = (await res.json()) as BlogPostResponse
  if (!res.ok || !data.success || !data.post) {
    throw new Error(data.error || 'Article not found')
  }
  return data
}

export function formatBlogDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
