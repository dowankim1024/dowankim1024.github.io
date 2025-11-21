'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthGuard from '@/components/AuthGuard'
import { getAllPosts, deletePost } from '@/lib/blog'
import { logout } from '@/lib/auth'
import { BlogPost } from '@/types/blog'
import styles from './page.module.css'

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const allPosts = await getAllPosts()
      setPosts(allPosts)
      if (allPosts.length === 0) {
        console.warn('포스트가 없거나 권한이 없습니다.')
      }
    } catch (error) {
      console.error('포스트 로드 실패:', error)
      setPosts([]) // 에러 발생 시 빈 배열로 설정
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (post: BlogPost) => {
    if (!post.id) return
    
    if (!confirm(`"${post.title}" 글을 정말 삭제하시겠습니까?`)) {
      return
    }

    try {
      await deletePost(post.id, post.images || [])
      loadPosts()
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  return (
    <AuthGuard>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>블로그 관리</h1>
          <div className={styles.actions}>
            <Link href="/admin/blog/write" className={styles.writeButton}>
              새 글 작성
            </Link>
            <Link href="/admin/blog/projects" className={styles.projectsButton}>
              프로젝트 관리
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              로그아웃
            </button>
          </div>
        </div>

        {loading ? (
          <p className={styles.loading}>로딩 중...</p>
        ) : posts.length === 0 ? (
          <p className={styles.empty}>작성된 글이 없습니다.</p>
        ) : (
          <div className={styles.posts}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postInfo}>
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
                  <span className={post.published ? styles.published : styles.draft}>
                    {post.published ? '공개' : '비공개'}
                  </span>
                </div>
                <div className={styles.postActions}>
                  <Link 
                    href={`/admin/blog/edit/${post.id}`}
                    className={styles.editButton}
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(post)}
                    className={styles.deleteButton}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

