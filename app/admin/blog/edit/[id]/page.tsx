import { getAllPosts } from '@/lib/blog'
import EditPostClient from './EditPostClient'

interface PageProps {
  params: {
    id: string
  }
}

// 정적 사이트 생성을 위한 경로 생성
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    return posts
      .filter(post => post.id)
      .map((post) => ({
        id: post.id || '',
      }))
      .filter(param => param.id)
  } catch (error) {
    console.error('Failed to generate static params for edit page:', error)
    return []
  }
}

export default function EditPostPage({ params }: PageProps) {
  return <EditPostClient postId={params.id} />
}

