import type { BlogPost } from '../../lib/blog'
import { BlogCard } from './BlogCard'
import { FadeIn } from '../FadeIn'

type Props = {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: Props) {
  if (!posts.length) return null

  return (
    <section className="section !pt-4">
      <div className="container">
        <FadeIn>
          <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-[var(--text)]">
            Related articles
          </h2>
        </FadeIn>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
