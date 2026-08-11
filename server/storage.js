import { existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Railway persistent volume is mounted on /data.
 * Locally we fall back to ./data so uploads still work in dev.
 */
export function getVolumeRoot() {
  if (process.env.RAILWAY_VOLUME_MOUNT_PATH) {
    return process.env.RAILWAY_VOLUME_MOUNT_PATH
  }
  if (process.env.BLOG_DATA_DIR) {
    return process.env.BLOG_DATA_DIR
  }
  if (existsSync('/data')) {
    return '/data'
  }
  return join(__dirname, '..', 'data')
}

export function getBlogImagesDir() {
  const dir = join(getVolumeRoot(), 'blog-images')
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function sanitizeSlugForFilename(slug) {
  const cleaned = String(slug || 'image')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return cleaned || 'image'
}

/**
 * Extract local filename from a coverImage URL that points to our API, e.g.
 * https://host/api/blog/image/my-slug-123.png
 * Returns null for external URLs (Unsplash, etc.) or empty values.
 */
export function extractLocalBlogImageFilename(coverImage) {
  if (!coverImage || typeof coverImage !== 'string') return null
  const match = coverImage.match(/\/api\/blog\/image\/([^/?#]+)/i)
  if (!match) return null
  try {
    const name = basename(decodeURIComponent(match[1]))
    if (!name || !/^[a-zA-Z0-9._-]+$/.test(name)) return null
    return name
  } catch {
    return null
  }
}

/**
 * Delete a local cover image if it belongs to blog-images.
 * Never throws; missing files and external URLs are ignored.
 */
export function tryDeleteLocalCoverImage(coverImage) {
  try {
    const filename = extractLocalBlogImageFilename(coverImage)
    if (!filename) return false

    const imagesDir = resolve(getBlogImagesDir())
    const filePath = resolve(imagesDir, basename(filename))
    const rel = relative(imagesDir, filePath)

    if (!rel || rel.startsWith('..') || isAbsolute(rel)) {
      console.warn('IMAGE DELETE blocked (outside blog-images):', filePath)
      return false
    }

    if (!existsSync(filePath)) {
      console.log(`IMAGE DELETE skip (missing): ${filename}`)
      return false
    }

    unlinkSync(filePath)
    console.log(`IMAGE DELETE OK: ${filename}`)
    return true
  } catch (error) {
    console.error('IMAGE DELETE ERROR:', error)
    return false
  }
}
