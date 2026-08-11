import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { BlogContent } from '../components/blog/BlogContent'
import { RelatedPosts } from '../components/blog/RelatedPosts'
import { FadeIn } from '../components/FadeIn'
import { fetchBlogPost, formatBlogDate, type BlogPost } from '../lib/blog'
import { asset } from '../utils/asset'

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    fetchBlogPost(slug)
      .then((data) => {
        if (cancelled) return
        setPost(data.post || null)
        setRelated(data.related || [])
      })
      .catch((err: Error) => {
        if (cancelled) return
        setPost(null)
        setRelated([])
        setError(err.message || 'Article not found')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <section className="section pt-28">
        <div className="container max-w-3xl">
          <div className="h-10 w-40 animate-pulse rounded-full bg-brand-100" />
          <div className="mt-6 h-12 animate-pulse rounded-xl bg-[var(--bg-elevated)]" />
          <div className="mt-4 h-6 w-2/3 animate-pulse rounded-lg bg-[var(--bg-elevated)]" />
          <div className="mt-8 aspect-[16/9] animate-pulse rounded-2xl bg-[var(--bg-elevated)]" />
        </div>
      </section>
    )
  }

  if (error || !post) {
    return (
      <section className="section pt-28">
        <div className="container max-w-lg text-center">
          <FadeIn>
            <h1 className="font-display text-3xl font-bold text-[var(--text)]">Article not found</h1>
            <p className="mt-3 text-[var(--text-muted)]">{error || 'This article does not exist.'}</p>
            <Link to="/blog" className="btn-primary mt-8 inline-flex">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </FadeIn>
        </div>
      </section>
    )
  }

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt
  const canonical = `https://phonedelta.github.io/Ai-Systems-Store/blog/${post.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: post.coverImage || undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'AI Systems Store',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Systems Store',
    },
    mainEntityOfPage: canonical,
  }

  return (
    <>
      <Helmet>
        <title>{title} — AI Systems Store</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        {post.coverImage ? <meta property="og:image" content={post.coverImage} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {post.coverImage ? <meta name="twitter:image" content={post.coverImage} /> : null}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="pt-24 md:pt-28">
        <div className="container">
          <FadeIn>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <header className="mx-auto mt-6 max-w-3xl text-center">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
                {post.category ? (
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {post.category}
                  </span>
                ) : null}
                <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                {post.readingTimeMinutes ? <span>· {post.readingTimeMinutes} min read</span> : null}
                {post.author ? <span>· {post.author}</span> : null}
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl md:text-[2.6rem]">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">
                  {post.excerpt}
                </p>
              ) : null}
            </header>
          </FadeIn>

          {post.coverImage ? (
            <FadeIn delay={0.08} className="mx-auto mt-8 max-w-4xl">
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--shadow)]">
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            </FadeIn>
          ) : null}

          <FadeIn delay={0.12} className="section !pt-10">
            <BlogContent content={post.content} />
          </FadeIn>

          <FadeIn className="mx-auto mb-8 max-w-3xl">
            <div className="relative overflow-hidden rounded-[1.5rem] px-6 py-10 text-center text-white sm:px-10">
              <img
                src={asset('images/cta-banner-bg.png')}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-700/85 via-brand-600/80 to-brand-800/90" />
              <div className="relative">
                <h2 className="font-display text-2xl font-bold sm:text-3xl">
                  Ready to level up your business?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-white/85">Tools. Systems. Results.</p>
                <a
                  href="https://account.ai-systems-store.com/login"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-lg transition hover:-translate-y-0.5"
                >
                  Join the Platform
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>

      <RelatedPosts posts={related} />
    </>
  )
}
