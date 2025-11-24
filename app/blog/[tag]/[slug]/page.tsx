import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPostsByTag } from '@/lib/blog'
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
  const decodedTag = decodeURIComponent(params.tag)
  const post = await getPostBySlug(decodedSlug)

  if (!post) {
    notFound()
  }

  // 같은 태그의 모든 포스트 가져오기 (이전/다음 포스트 찾기용)
  const allPosts = await getPostsByTag(decodedTag)
  const currentIndex = allPosts.findIndex(p => p.id === post.id || p.slug === post.slug)
  
  // 이전 포스트 (더 최신 포스트, 인덱스가 작음)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  // 다음 포스트 (더 오래된 포스트, 인덱스가 큼)
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

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
        
        {/* 상단 네비게이션 */}
        {(prevPost || nextPost) && (
          <nav className={styles.navigation}>
            {prevPost ? (
              <Link 
                href={`/blog/${encodeURIComponent(decodedTag)}/${encodeURIComponent(prevPost.slug || prevPost.id || '')}`}
                className={styles.navButton}
              >
                <span className={styles.navArrow}>←</span>
                <div className={styles.navContent}>
                  <span className={styles.navLabel}>이전 글</span>
                  <span className={styles.navTitle}>{prevPost.title}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.navButton} style={{ visibility: 'hidden' }}></div>
            )}
            {nextPost ? (
              <Link 
                href={`/blog/${encodeURIComponent(decodedTag)}/${encodeURIComponent(nextPost.slug || nextPost.id || '')}`}
                className={styles.navButton}
              >
                <div className={styles.navContent}>
                  <span className={styles.navLabel}>다음 글</span>
                  <span className={styles.navTitle}>{nextPost.title}</span>
                </div>
                <span className={styles.navArrow}>→</span>
              </Link>
            ) : (
              <div className={styles.navButton} style={{ visibility: 'hidden' }}></div>
            )}
          </nav>
        )}
        
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
                      customStyle={{
                        background: 'transparent',
                        padding: 0,
                        margin: 0,
                        border: 'none',
                        boxShadow: 'none',
                      }}
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
        
        {/* 하단 네비게이션 */}
        {(prevPost || nextPost) && (
          <nav className={styles.navigation}>
            {prevPost ? (
              <Link 
                href={`/blog/${encodeURIComponent(decodedTag)}/${encodeURIComponent(prevPost.slug || prevPost.id || '')}`}
                className={styles.navButton}
              >
                <span className={styles.navArrow}>←</span>
                <div className={styles.navContent}>
                  <span className={styles.navLabel}>이전 글</span>
                  <span className={styles.navTitle}>{prevPost.title}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.navButton} style={{ visibility: 'hidden' }}></div>
            )}
            {nextPost ? (
              <Link 
                href={`/blog/${encodeURIComponent(decodedTag)}/${encodeURIComponent(nextPost.slug || nextPost.id || '')}`}
                className={styles.navButton}
              >
                <div className={styles.navContent}>
                  <span className={styles.navLabel}>다음 글</span>
                  <span className={styles.navTitle}>{nextPost.title}</span>
                </div>
                <span className={styles.navArrow}>→</span>
              </Link>
            ) : (
              <div className={styles.navButton} style={{ visibility: 'hidden' }}></div>
            )}
          </nav>
        )}
      </div>
      </article>
    </>
  )
}

