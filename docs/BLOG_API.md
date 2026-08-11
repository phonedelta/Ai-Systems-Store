# Blog API — n8n integration

## Local development

```bash
npm run dev:all
```

- Frontend: http://localhost:2005
- Blog: http://localhost:2005/blog
- API: http://localhost:3005/api/blog

## Environment

Copy `.env.example` → `.env` and set `BLOG_API_SECRET`.

For production frontend (GitHub Pages), set `VITE_BLOG_API_URL` to your deployed API base URL (no trailing slash), then rebuild.

## n8n HTTP Request

- Method: `POST`
- URL: `https://YOUR-API-HOST/api/blog` (local: `http://localhost:3005/api/blog`)
- Header: `Authorization` = `Bearer YOUR_BLOG_API_SECRET`
- Header: `Content-Type` = `application/json`

### Upload cover image (Base64 from OpenRouter)

- Method: `POST`
- URL: `https://YOUR-RAILWAY-HOST/api/blog/upload-image`
- Header: `Authorization` = `Bearer YOUR_BLOG_API_SECRET`
- Body:

```json
{
  "image": "BASE64_WITHOUT_DATA_PREFIX",
  "slug": "article-slug"
}
```

Success:

```json
{
  "success": true,
  "filename": "article-slug-1786461234567.png",
  "url": "https://YOUR-RAILWAY-HOST/api/blog/image/article-slug-1786461234567.png"
}
```

Use `url` as `coverImage` when publishing the article.

Public image URL (no auth):

`GET /api/blog/image/:filename`

Images are stored on the Railway volume under `/data/blog-images`.

### Delete article by slug

- Method: `DELETE`
- URL: `https://YOUR-RAILWAY-HOST/api/blog/your-article-slug`
- Header: `Authorization` = `Bearer YOUR_BLOG_API_SECRET`

Success:

```json
{
  "success": true,
  "message": "Article deleted"
}
```

Local cover images (`/api/blog/image/...`) are removed from `/data/blog-images`.
External images (Unsplash, etc.) are left untouched.

### Example body

```json
{
  "title": "Titre de l'article",
  "slug": "titre-de-larticle",
  "excerpt": "Résumé court de l'article",
  "content": "## Section\n\nContenu markdown complet…",
  "coverImage": "https://example.com/cover.jpg",
  "coverImageAlt": "Description de l'image",
  "category": "Marketing",
  "tags": ["SEO", "Marketing", "Business"],
  "author": "AI Systems Store",
  "publishedAt": "2026-08-11T10:00:00.000Z",
  "status": "published",
  "seoTitle": "Titre optimisé SEO",
  "seoDescription": "Meta description optimisée SEO"
}
```

### Success response

```json
{
  "success": true,
  "post": {
    "id": "...",
    "slug": "...",
    "url": "/blog/...",
    "absoluteUrl": "https://.../blog/..."
  }
}
```
