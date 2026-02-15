import type { Metadata } from 'next'
import { getAllTags, getAllProjects, getPublishedPostsPaginated } from '@/lib/blog'
import Header from '@/components/Home/Header/Header'
import BlogViewClient from './BlogViewClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dowankim.site'

export const metadata: Metadata = {
  title: 'Projects',
  description: '프로젝트별 개발 과정을 블로그 형식으로 정리하였습니다.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'Projects',
    description: '프로젝트별 개발 과정을 블로그 형식으로 정리하였습니다.',
    url: `${siteUrl}/blog`,
    siteName: 'Dowan Kim Portfolio',
  },
}

// 항상 동적으로 렌더링하여 최신 데이터를 가져오도록 설정
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  const [tags, projects, initialResult] = await Promise.all([
    getAllTags(),
    getAllProjects(),
    getPublishedPostsPaginated(12),
  ])

  // Daily 태그("일상") 제외
  const filteredTags = tags.filter(tag => tag !== '일상')

  // 프로젝트 정보가 있는 태그와 없는 태그를 구분
  const projectMap = new Map(projects.map(p => [p.tag, p]))
  const projectTags = filteredTags.map(tag => ({
    tag,
    project: projectMap.get(tag) || null,
  }))

  return (
    <>
      <Header />
      <section className="min-h-screen bg-[#050a13] text-white pt-32 px-4 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-5xl text-white mb-4 text-center">Projects</h1>
          <p className="text-xl text-center mb-12 opacity-80">
            프로젝트별 개발 과정을 블로그 형식으로 정리하였습니다.
            <br />
            프로젝트 클릭 시 해당 프로젝트의 블로그 글을 확인할 수 있습니다.
          </p>
          <BlogViewClient projectTags={projectTags} initialAllPosts={initialResult.posts} />
        </div>
      </section>
    </>
  )
}

