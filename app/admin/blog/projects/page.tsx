'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthGuard from '@/components/AuthGuard'
import { getAllProjects, getAllTags, upsertProject } from '@/lib/blog'
import { logout } from '@/lib/auth'
import { Project } from '@/types/blog'
import styles from './page.module.css'

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
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>프로젝트 관리</h1>
          <div className={styles.actions}>
            <Link href="/admin/blog" className={styles.backButton}>
              블로그 관리로
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              로그아웃
            </button>
          </div>
        </div>

        {loading ? (
          <p className={styles.loading}>로딩 중...</p>
        ) : (
          <div className={styles.projects}>
            {allProjectTags.map(({ tag, project }) => (
              <div key={tag} className={styles.projectCard}>
                <h2 className={styles.projectTitle}>{tag}</h2>
                {editingId === (project?.id || tag) ? (
                  <div className={styles.editForm}>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className={styles.textarea}
                      placeholder="프로젝트 소개글을 입력하세요 (마크다운 지원)"
                      rows={8}
                    />
                    <div className={styles.editActions}>
                      <button
                        onClick={() => handleSave(tag)}
                        className={styles.saveButton}
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancel}
                        className={styles.cancelButton}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.projectContent}>
                    {project && project.description ? (
                      <p className={styles.projectDescription}>
                        {project.description}
                      </p>
                    ) : (
                      <p className={styles.noDescription}>
                        아직 소개글이 없습니다.
                      </p>
                    )}
                    <button
                      onClick={() => handleEdit(project, tag)}
                      className={styles.editButton}
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

