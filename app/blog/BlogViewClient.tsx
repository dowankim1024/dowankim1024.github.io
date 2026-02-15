'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types/blog'
import { Project } from '@/types/blog'
import AllPostsList from './AllPostsList'

interface BlogViewClientProps {
  projectTags: { tag: string; project: Project | null }[]
  initialAllPosts: BlogPost[]
}

export default function BlogViewClient({ projectTags, initialAllPosts }: BlogViewClientProps) {
  const [viewMode, setViewMode] = useState<'project' | 'all'>('project')

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* 왼쪽: 프로젝트별 / 전체글 전환 버튼 */}
      <aside className="lg:w-48 shrink-0">
        <div className="flex lg:flex-col gap-2">
          <button
            onClick={() => setViewMode('project')}
            className={`px-4 py-3 rounded-lg border transition-all duration-300 text-left ${
              viewMode === 'project'
                ? 'bg-[rgba(3,232,249,0.2)] border-[#03e8f9] text-white'
                : 'bg-[#1b1e26] border-[rgba(3,232,249,0.2)] text-white/70 hover:border-[rgba(3,232,249,0.4)]'
            }`}
          >
            프로젝트별
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-3 rounded-lg border transition-all duration-300 text-left ${
              viewMode === 'all'
                ? 'bg-[rgba(3,232,249,0.2)] border-[#03e8f9] text-white'
                : 'bg-[#1b1e26] border-[rgba(3,232,249,0.2)] text-white/70 hover:border-[rgba(3,232,249,0.4)]'
            }`}
          >
            전체글
          </button>
        </div>
      </aside>

      {/* 오른쪽: 컨텐츠 영역 */}
      <div className="flex-1 min-w-0">
        {viewMode === 'project' ? (
          projectTags.length === 0 ? (
            <p className="text-center text-xl opacity-60 py-16">아직 작성된 글이 없습니다.</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
              {projectTags.map(({ tag, project }) => (
                <Link
                  key={tag}
                  href={`/blog/${encodeURIComponent(tag)}`}
                  className="bg-[#1b1e26] p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] transition-all duration-300 no-underline text-inherit block hover:border-[#03e8f9] hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(3,232,249,0.2)]"
                >
                  <h2 className="text-2xl mb-4 text-white">{tag}</h2>
                  {project && project.description && (
                    <p className="text-base text-white/70 leading-relaxed">
                      {(() => {
                        const firstLine = project.description.split(/\r?\n/)[0] || ''
                        return firstLine.length > 100
                          ? `${firstLine.substring(0, 100)}...`
                          : firstLine
                      })()}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )
        ) : (
          initialAllPosts.length === 0 ? (
            <p className="text-center text-xl opacity-60 py-16">아직 작성된 글이 없습니다.</p>
          ) : (
            <AllPostsList initialPosts={initialAllPosts} />
          )
        )}
      </div>
    </div>
  )
}
