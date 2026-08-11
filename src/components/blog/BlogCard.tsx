import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '../FadeIn'
import type { BlogPost } from '../../lib/blog'
import { formatBlogDate } from '../../lib/blog'

type Props = {
  post: BlogPost
}

export function BlogCard({ post }: Props) {
  return (
    <FadeIn>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[var(--shadow)]">
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
          <div className="aspect-[16/10] bg-gradient-to-br from-brand-50 to-white">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-semibold text-brand-600">
                AI Systems Store
              </div>
            )}
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
            {post.category ? (
              <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
                {post.category}
              </span>
            ) : null}
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            {post.readingTimeMinutes ? <span>· {post.readingTimeMinutes} min read</span> : null}
          </div>

          <h3 className="font-display text-lg font-bold tracking-tight text-[var(--text)]">
            <Link to={`/blog/${post.slug}`} className="transition hover:text-brand-600">
              {post.title}
            </Link>
          </h3>

          {post.excerpt ? (
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
              {post.excerpt}
            </p>
          ) : null}

          <Link
            to={`/blog/${post.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
          >
            Read article
            <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </FadeIn>
  )
}
