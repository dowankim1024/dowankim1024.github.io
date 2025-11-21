import { notFound } from 'next/navigation'
import { getPostBySlug, getPublishedPosts } from '@/lib/blog'
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

// 정적 사이트 생성을 위한 경로 생성
export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts()
    const params: { tag: string; slug: string }[] = []
    
    for (const post of posts) {
      const slug = post.slug || post.id || ''
      if (!slug) continue
      
      // 각 태그마다 경로 생성
      if (post.tags && post.tags.length > 0) {
        for (const tag of post.tags) {
          params.push({
            tag: encodeURIComponent(tag),
            slug: encodeURIComponent(slug),
          })
        }
      } else {
        // 태그가 없으면 빈 태그로 처리
        params.push({
          tag: '',
          slug: encodeURIComponent(slug),
        })
      }
    }
    
    return params
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
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
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  )
}

