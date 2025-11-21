import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import styles from './page.module.css'

interface PageProps {
  params: {
    tag: string
    slug: string
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const decodedSlug = decodeURIComponent(params.slug)
  const post = await getPostBySlug(decodedSlug)

  if (!post) {
    notFound()
  }

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.date}>
            {(() => {
              const date = post.createdAt instanceof Date 
                ? post.createdAt 
                : 'toDate' in post.createdAt 
                  ? (post.createdAt as { toDate: () => Date }).toDate()
                  : new Date(post.createdAt as string | number)
              return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            })()}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </header>
        
        <div className={styles.content}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  )
}

