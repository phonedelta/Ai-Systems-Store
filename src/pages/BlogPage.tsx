import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BlogHero } from '../components/blog/BlogHero'
import { BlogGrid } from '../components/blog/BlogGrid'
import { FadeIn } from '../components/FadeIn'
import { fetchBlogPosts, type BlogPost } from '../lib/blog'

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchBlogPosts(1, 9)
      .then((data) => {
        if (cancelled) return
        setPosts(data.items)
        setPage(1)
        setHasMore(data.pagination.hasMore)
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message || 'Failed to load articles')
        setPosts([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const loadMore = async () => {
    const next = page + 1
    setLoadingMore(true)
    try {
      const data = await fetchBlogPosts(next, 9)
      setPosts((prev) => [...prev, ...data.items])
      setPage(next)
      setHasMore(data.pagination.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more articles')
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Blog — AI Systems Store</title>
        <meta
          name="description"
          content="Practical AI guides, automation ideas, and business systems to help you build, automate, and scale."
        />
        <link rel="canonical" href="https://phonedelta.github.io/Ai-Systems-Store/blog" />
        <meta property="og:title" content="Blog — AI Systems Store" />
        <meta
          property="og:description"
          content="Practical AI guides, automation ideas, and business systems to help you build, automate, and scale."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <BlogHero />

      <section className="section !pt-2">
        <div className="container">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]"
                />
              ))}
            </div>
          ) : error ? (
            <FadeIn className="mx-auto max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8 text-center">
              <p className="font-display text-lg font-semibold text-[var(--text)]">
                Unable to load articles
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{error}</p>
              <p className="mt-4 text-xs text-[var(--text-muted)]">
                Make sure the Blog API is running (`npm run api`).
              </p>
            </FadeIn>
          ) : posts.length === 0 ? (
            <FadeIn className="mx-auto max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-8 text-center">
              <p className="font-display text-lg font-semibold text-[var(--text)]">
                No articles yet
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                New posts will appear here once published via the Blog API.
              </p>
            </FadeIn>
          ) : (
            <>
              <BlogGrid posts={posts} />
              {hasMore ? (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={loadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? 'Loading…' : 'Load more'}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  )
}
