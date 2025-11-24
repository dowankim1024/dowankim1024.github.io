import { notFound } from 'next/navigation'
import { getProjectByTag, getPostsByTagPaginated } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './page.module.css'
import Header from '@/components/Home/Header/Header'
import PostList from './PostList'

interface PageProps {
  params: {
    tag: string
  }
}

export default async function TagPage({ params }: PageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const project = await getProjectByTag(decodedTag)
  
  const initialResult = await getPostsByTagPaginated(decodedTag, 12)
  const initialPosts = initialResult.posts

  if (initialPosts.length === 0) {
    notFound()
  }

  return (
    <>
      <Header />
      <section className={styles.section}>
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

        <PostList initialPosts={initialPosts} tag={decodedTag} />
      </div>
      </section>
    </>
  )
}

