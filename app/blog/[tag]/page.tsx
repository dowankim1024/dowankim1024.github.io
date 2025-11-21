import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectByTag, getPostsByTag, getAllTags } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './page.module.css'

interface PageProps {
  params: {
    tag: string
  }
}

// 정적 사이트 생성을 위한 경로 생성
export async function generateStaticParams() {
  try {
    const tags = await getAllTags()
    return tags.map((tag) => ({
      tag: encodeURIComponent(tag),
    }))
  } catch (error) {
    console.error('Failed to generate static params for tag page:', error)
    return []
  }
}

export default async function TagPage({ params }: PageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const project = await getProjectByTag(decodedTag)
  const posts = await getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>{decodedTag}</h1>
        
        {project && project.description && (
          <div className={styles.description}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.description}
            </ReactMarkdown>
          </div>
        )}

        <div className={styles.posts}>
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${encodeURIComponent(decodedTag)}/${encodeURIComponent(post.slug || post.id || '')}`}
              className={styles.postCard}
            >
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postDate}>
                {(() => {
                  const date = post.createdAt instanceof Date 
                    ? post.createdAt 
                    : 'toDate' in post.createdAt 
                      ? (post.createdAt as { toDate: () => Date }).toDate()
                      : new Date(post.createdAt as string | number)
                  return date.toLocaleDateString('ko-KR')
                })()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

