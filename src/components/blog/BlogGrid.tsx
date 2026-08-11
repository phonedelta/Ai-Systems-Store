import type { BlogPost } from '../../lib/blog'
import { BlogCard } from './BlogCard'

type Props = {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}
