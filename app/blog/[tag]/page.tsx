import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectByTag, getPostsByTag } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './page.module.css'
import Header from '@/components/Home/Header/Header'

interface PageProps {
  params: {
    tag: string
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
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{decodedTag}</h1>
        
        {project && project.description && (
          <div className={styles.description}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
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

