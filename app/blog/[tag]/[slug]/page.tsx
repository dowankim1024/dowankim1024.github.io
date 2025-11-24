import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/blog'
import ReactMarkdown, { Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './page.module.css'
import Header from '@/components/Home/Header/Header'

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
    <>
      <Header />
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
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                const language = match ? match[1] : ''
                const isInline = !match
                
                if (!isInline && match) {
                  return (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={language}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  )
                }
                
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            } satisfies Components}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
      </article>
    </>
  )
}

