'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { getPostsByTagPaginated } from '@/lib/blog'
import { BlogPost } from '@/types/blog'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import styles from './page.module.css'

interface PostListProps {
  initialPosts: BlogPost[]
  tag: string
}

export default function PostList({ initialPosts, tag }: PostListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialPosts.length === 12) // 초기 데이터가 12개면 다음 페이지가 있을 수 있음
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true) // 첫 번째 로드인지 확인
  const observerRef = useRef<HTMLDivElement>(null)

  // 다음 페이지 로드
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      let result
      
      // 첫 번째 로드이고 초기 데이터가 12개인 경우
      if (isFirstLoad && initialPosts.length === 12) {
        // 초기 데이터를 다시 가져와서 lastDoc을 얻음 (중복 방지)
        const firstPageResult = await getPostsByTagPaginated(tag, 12)
        if (firstPageResult.lastDoc) {
          // 두 번째 페이지 가져오기
          result = await getPostsByTagPaginated(tag, 12, firstPageResult.lastDoc)
        } else {
          result = { posts: [], lastDoc: null, hasMore: false }
        }
        setIsFirstLoad(false)
      } else {
        // 일반적인 경우
        result = await getPostsByTagPaginated(tag, 12, lastDoc || undefined)
      }
      
      if (result.posts.length > 0) {
        setPosts(prev => [...prev, ...result.posts])
        setLastDoc(result.lastDoc)
        setHasMore(result.hasMore)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('포스트 로드 실패:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [tag, lastDoc, loading, hasMore, isFirstLoad, initialPosts.length])

  // Intersection Observer로 스크롤 감지
  useEffect(() => {
    const currentObserver = observerRef.current
    if (!currentObserver || !hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(currentObserver)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, loading, loadMore])

  return (
    <>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${encodeURIComponent(tag)}/${encodeURIComponent(post.slug || post.id || '')}`}
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
      
      {/* 스크롤 감지용 요소 */}
      {hasMore && (
        <div ref={observerRef} className={styles.observer}>
          {loading && <p className={styles.loading}>로딩 중...</p>}
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <p className={styles.noMore}>더 이상 포스트가 없습니다.</p>
      )}
    </>
  )
}

