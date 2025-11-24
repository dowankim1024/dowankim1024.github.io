'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthGuard from '@/components/AuthGuard'
import { getAllPosts, deletePost } from '@/lib/blog'
import { logout } from '@/lib/auth'
import { BlogPost } from '@/types/blog'

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
      <div className="min-h-screen bg-[#050a13] text-white pt-32 px-4 pb-16">
        <div className="max-w-[1200px] mx-auto mb-12 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-4xl text-[#03e8f9]">블로그 관리</h1>
          <div className="flex gap-4">
            <Link href="/admin/blog/write" className="px-6 py-3 rounded-lg font-bold cursor-pointer transition-all duration-300 no-underline inline-block border-none text-base bg-[#03e8f9] text-[#050a13] hover:bg-transparent hover:text-[#03e8f9] hover:border hover:border-[#03e8f9]">
              새 글 작성
            </Link>
            <Link href="/admin/blog/projects" className="px-6 py-3 rounded-lg font-bold cursor-pointer transition-all duration-300 no-underline inline-block border-none text-base bg-transparent text-[#03e8f9] border border-[#03e8f9] hover:bg-[#03e8f9] hover:text-[#050a13]">
              프로젝트 관리
            </Link>
            <button onClick={handleLogout} className="px-6 py-3 rounded-lg font-bold cursor-pointer transition-all duration-300 no-underline inline-block border-none text-base bg-[#fd6413] text-white hover:bg-transparent hover:text-[#fd6413] hover:border hover:border-[#fd6413]">
              로그아웃
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-xl opacity-60 py-16">로딩 중...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-xl opacity-60 py-16">작성된 글이 없습니다.</p>
        ) : (
          <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#1b1e26] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] flex justify-between items-center gap-8 max-md:flex-col max-md:items-start">
                <div className="flex-1">
                  <h2 className="text-2xl mb-2 text-white">{post.title}</h2>
                  <p className="text-sm text-[#03e8f9] mb-2">
                    {(() => {
                      const date = post.createdAt instanceof Date 
                        ? post.createdAt 
                        : 'toDate' in post.createdAt 
                          ? (post.createdAt as { toDate: () => Date }).toDate()
                          : new Date(post.createdAt as string | number)
                      return date.toLocaleDateString('ko-KR')
                    })()}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded text-sm font-bold ${post.published ? 'bg-[rgba(3,232,249,0.2)] text-[#03e8f9]' : 'bg-[rgba(253,100,19,0.2)] text-[#fd6413]'}`}>
                    {post.published ? '공개' : '비공개'}
                  </span>
                </div>
                <div className="flex gap-4 max-md:w-full max-md:[&_button]:flex-1 max-md:[&_a]:flex-1">
                  <Link 
                    href={`/admin/blog/edit/${post.id}`}
                    className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 border-none text-sm no-underline inline-block bg-[#03e8f9] text-[#050a13] hover:bg-transparent hover:text-[#03e8f9] hover:border hover:border-[#03e8f9]"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(post)}
                    className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 border-none text-sm no-underline inline-block bg-[#fd6413] text-white hover:bg-transparent hover:text-[#fd6413] hover:border hover:border-[#fd6413]"
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

