'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthGuard from '@/components/AuthGuard'
import { getAllProjects, getAllTags, upsertProject } from '@/lib/blog'
import { logout } from '@/lib/auth'
import { Project } from '@/types/blog'

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDescription, setEditDescription] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [allProjects, allTags] = await Promise.all([
        getAllProjects(),
        getAllTags(),
      ])
      setProjects(allProjects)
      setTags(allTags)
    } catch (error) {
      console.error('데이터 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project | null, tag: string) => {
    // 프로젝트가 없을 때는 tag를 editingId로 사용
    setEditingId(project?.id || tag)
    setEditDescription(project?.description || '')
  }

  const handleSave = async (tag: string) => {
    try {
      await upsertProject(tag, editDescription)
      setEditingId(null)
      setEditDescription('')
      loadData()
    } catch (error) {
      console.error('저장 실패:', error)
      alert('저장 중 오류가 발생했습니다.')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditDescription('')
  }

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  // 프로젝트가 있는 태그와 없는 태그를 구분
  const projectMap = new Map(projects.map(p => [p.tag, p]))
  const allProjectTags = tags.map(tag => ({
    tag,
    project: projectMap.get(tag) || null,
  }))

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#050a13] text-white pt-32 px-4 pb-16">
        <div className="max-w-[1200px] mx-auto mb-12 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-4xl text-[#03e8f9] m-0">프로젝트 관리</h1>
          <div className="flex gap-4">
            <Link href="/admin/blog" className="px-6 py-3 rounded-lg text-base cursor-pointer transition-all duration-300 no-underline inline-block border-none bg-transparent text-[#03e8f9] border border-[#03e8f9] hover:bg-[#03e8f9] hover:text-[#050a13]">
              블로그 관리로
            </Link>
            <button onClick={handleLogout} className="px-6 py-3 rounded-lg text-base cursor-pointer transition-all duration-300 no-underline inline-block border-none bg-[#fd6413] text-white hover:bg-[#e55a0f]">
              로그아웃
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-xl text-[#03e8f9] py-16">로딩 중...</p>
        ) : (
          <div className="max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-8">
            {allProjectTags.map(({ tag, project }) => (
              <div key={tag} className="bg-[#1b1e26] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)]">
                <h2 className="text-2xl text-[#03e8f9] mb-6">{tag}</h2>
                {editingId === (project?.id || tag) ? (
                  <div className="flex flex-col gap-4">
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="bg-[#050a13] text-white border border-[rgba(3,232,249,0.3)] rounded-lg p-4 text-base font-inherit resize-y min-h-[150px] focus:outline-none focus:border-[#03e8f9]"
                      placeholder="프로젝트 소개글을 입력하세요 (마크다운 지원)"
                      rows={8}
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleSave(tag)}
                        className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 border-none text-base bg-[#03e8f9] text-[#050a13] hover:bg-[#02d4e3]"
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 border-none text-base bg-transparent text-white border border-white/30 hover:bg-white/10"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {project && project.description ? (
                      <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                        {project.description}
                      </p>
                    ) : (
                      <p className="text-white/50 italic">
                        아직 소개글이 없습니다.
                      </p>
                    )}
                    <button
                      onClick={() => handleEdit(project, tag)}
                      className="px-4 py-2 bg-transparent text-[#03e8f9] border border-[#03e8f9] rounded-lg cursor-pointer transition-all duration-300 self-start hover:bg-[#03e8f9] hover:text-[#050a13]"
                    >
                      {project ? '수정' : '소개글 추가'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

