import Link from 'next/link'
import { getAllTags, getAllProjects } from '@/lib/blog'
import Header from '@/components/Home/Header/Header'

export default async function BlogPage() {
  const tags = await getAllTags()
  const projects = await getAllProjects()
  
  // 프로젝트 정보가 있는 태그와 없는 태그를 구분
  const projectMap = new Map(projects.map(p => [p.tag, p]))
  const projectTags = tags.map(tag => ({
    tag,
    project: projectMap.get(tag) || null,
  }))

  return (
    <>
      <Header />
      <section className="min-h-screen bg-[#050a13] text-white pt-32 px-4 pb-16">
        <div className="max-w-[1200px] mx-auto">
        <h1 className="text-5xl text-white mb-4 text-center">Projects</h1>
        <p className="text-xl text-center mb-12 opacity-80">프로젝트별 개발 과정을 블로그 형식으로 정리하였습니다.<br/>프로젝트 클릭 시 해당 프로젝트의 블로그 글을 확인할 수 있습니다.</p>
        {projectTags.length === 0 ? (
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
                      // 첫 번째 줄만 가져오기 (엔터 전까지)
                      const firstLine = project.description.split(/\r?\n/)[0] || ''
                      // 필요시 길이 제한 (예: 100자)
                      return firstLine.length > 100 
                        ? `${firstLine.substring(0, 100)}...` 
                        : firstLine
                    })()}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
      </section>
    </>
  )
}

