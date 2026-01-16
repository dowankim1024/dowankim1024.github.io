import { getProjectByTag, getPostsByTagPaginated } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from '@/components/Home/Header/Header'
import PostList from '@/app/blog/[tag]/PostList'

const DAILY_TAG = '일상'

// 항상 동적으로 렌더링하여 최신 데이터를 가져오도록 설정
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DailyPage() {
  const project = await getProjectByTag(DAILY_TAG)
  
  const initialResult = await getPostsByTagPaginated(DAILY_TAG, 12)
  const initialPosts = initialResult.posts

  return (
    <>
      <Header />
      <section className="min-h-screen bg-[#050a13] text-white pt-32 px-4 pb-16">
        <div className="max-w-[1200px] mx-auto">
        <h1 className="text-5xl text-white mb-4 text-center">Daily</h1>
        <p className="text-xl text-center mb-12 opacity-80">분야에 상관없이 일상에서 배운 점을 기록합니다.</p>
        
        {project && project.description && (
          <div className="bg-[#1b1e26] p-4 md:p-8 rounded-2xl border border-[rgba(3,232,249,0.2)] mb-12 leading-[1.8] overflow-hidden [&_h1]:text-[#03e8f9] [&_h1]:mt-6 [&_h1]:mb-4 [&_h1]:text-3xl [&_h2]:text-[#03e8f9] [&_h2]:mt-6 [&_h2]:mb-4 [&_h2]:text-2xl [&_h3]:text-[#03e8f9] [&_h3]:mt-6 [&_h3]:mb-4 [&_h3]:text-xl [&_p]:mb-4 [&_ul]:ml-8 [&_ol]:ml-8 [&_ul]:mb-4 [&_ol]:mb-4 [&_code]:bg-[rgba(3,232,249,0.1)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_pre]:bg-[rgba(3,232,249,0.05)] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ ...props }) => (
                  <a 
                    {...props} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      wordBreak: 'break-all',
                      overflowWrap: 'anywhere'
                    }}
                  />
                ),
              }}
            >
              {project.description}
            </ReactMarkdown>
          </div>
        )}

        {initialPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-xl">아직 글이 없습니다.</p>
          </div>
        ) : (
          <PostList initialPosts={initialPosts} tag={DAILY_TAG} />
        )}
      </div>
      </section>
    </>
  )
}

