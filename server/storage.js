import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
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
