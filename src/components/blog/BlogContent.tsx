import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

type Props = {
  content: string
}

marked.setOptions({
  gfm: true,
  breaks: true,
})

export function BlogContent({ content }: Props) {
  const html = useMemo(() => {
    const raw = marked.parse(content || '') as string
    return DOMPurify.sanitize(raw, {
      USE_PROFILES: { html: true },
    })
  }, [content])

  return (
    <div
      className="blog-prose mx-auto max-w-3xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
